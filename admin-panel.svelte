<script lang="ts">
  import { onMount } from 'svelte';

  type Company = {
    _id: string;
    name: string;
    category?: string;
    region?: string;
    rating?: number;
    description?: string;
  };

  type User = {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    rating?: number;
  };

  type Order = {
    _id: string;
    company: string;
    user: string;
    package: string;
    count: number;
    price?: number;
    status: string;
    description?: string;
  };

  type ProductPackage = {
    _id: string;
    company: string;
    name: string;
    category?: string;
    price?: number;
    count?: number;
    active?: boolean;
  };

  const api = {
    baseUrl: 'http://127.0.0.1:3000',
    company: {
      all: '/company/all',
      create: '/company/create',
      find: '/company/find'
    },
    user: {
      all: '/user'
    },
    order: {
      create: '/order',
      byId: '/order/:id'
    },
    package: {
      create: '/package',
      byCompany: '/package/by-company/:companyId'
    },
    auth: {
      userLogin: '/auth/user/login',
      businessLogin: '/auth/business/login'
    }
  };

  let loading = false;
  let error = '';
  let success = '';

  let companies: Company[] = [];
  let users: User[] = [];
  let orders: Order[] = [];
  let packages: ProductPackage[] = [];

  let selectedCompanyId = '';
  let selectedUserId = '';

  let companyForm = {
    name: '',
    photo: '',
    OpenTime: '',
    CloseTime: ''
  };

  let packageForm = {
    companyId: '',
    name: '',
    description: '',
    category: '',
    count: 1,
    price: 0,
    getTime: 30,
    active: true
  };

  let orderForm = {
    package: '',
    company: '',
    description: '',
    count: 1,
    coordinationLat: 41.3111,
    coordinationLng: 69.2797
  };

  let authForm = {
    email: '',
    password: ''
  };

  const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(`${api.baseUrl}${path}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      ...init
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
  };

  const resetMessages = () => {
    error = '';
    success = '';
  };

  const loadInitialData = async () => {
    resetMessages();
    loading = true;

    try {
      const [companyData, userData] = await Promise.all([
        request<Company[]>(api.company.all),
        request<User[]>(api.user.all)
      ]);

      companies = companyData;
      users = userData;

      if (companyData.length > 0) {
        selectedCompanyId = companyData[0]._id;
        packageForm.companyId = companyData[0]._id;
        orderForm.company = companyData[0]._id;
        await loadPackagesByCompany(companyData[0]._id);
      }

      if (userData.length > 0) {
        selectedUserId = userData[0]._id;
      }

      success = 'Данные загружены: компании и пользователи.';
    } catch (e) {
      error = `Ошибка загрузки: ${(e as Error).message}`;
    } finally {
      loading = false;
    }
  };

  const loadPackagesByCompany = async (companyId: string) => {
    if (!companyId) return;

    try {
      packages = await request<ProductPackage[]>(
        api.package.byCompany.replace(':companyId', companyId)
      );

      if (packages.length > 0) {
        orderForm.package = packages[0]._id;
      }
    } catch (e) {
      error = `Не удалось загрузить пакеты: ${(e as Error).message}`;
    }
  };

  const loadOrderById = async (id: string) => {
    if (!id.trim()) return;

    resetMessages();
    try {
      const found = await request<Order>(api.order.byId.replace(':id', id.trim()));
      orders = [found, ...orders.filter((item) => item._id !== found._id)].slice(0, 10);
      success = `Заказ ${found._id} загружен.`;
    } catch (e) {
      error = `Не удалось получить заказ: ${(e as Error).message}`;
    }
  };

  const createCompany = async () => {
    resetMessages();
    try {
      await request<Company>(api.company.create, {
        method: 'POST',
        body: JSON.stringify(companyForm)
      });
      await loadInitialData();
      success = 'Компания создана.';
    } catch (e) {
      error = `Ошибка создания компании: ${(e as Error).message}`;
    }
  };

  const createPackage = async () => {
    resetMessages();

    if (!packageForm.companyId) {
      error = 'Выберите companyId для пакета.';
      return;
    }

    try {
      await request<ProductPackage>(api.package.create, {
        method: 'POST',
        body: JSON.stringify({
          company: packageForm.companyId,
          name: packageForm.name,
          description: packageForm.description,
          category: packageForm.category,
          count: Number(packageForm.count),
          price: Number(packageForm.price),
          getTime: Number(packageForm.getTime),
          active: packageForm.active
        })
      });

      await loadPackagesByCompany(packageForm.companyId);
      success = 'Пакет создан.';
    } catch (e) {
      error = `Ошибка создания пакета: ${(e as Error).message}`;
    }
  };

  const createOrder = async () => {
    resetMessages();

    try {
      const created = await request<Order>(api.order.create, {
        method: 'POST',
        body: JSON.stringify({
          package: orderForm.package,
          company: orderForm.company,
          description: orderForm.description,
          count: Number(orderForm.count),
          coordination: [Number(orderForm.coordinationLat), Number(orderForm.coordinationLng)]
        })
      });

      orders = [created, ...orders].slice(0, 10);
      success = 'Заказ создан.';
    } catch (e) {
      error = `Ошибка создания заказа: ${(e as Error).message}`;
    }
  };

  const loginUser = async (business = false) => {
    resetMessages();

    try {
      const endpoint = business ? api.auth.businessLogin : api.auth.userLogin;
      const payload = await request<{ token?: string; accessToken?: string }>(endpoint, {
        method: 'POST',
        body: JSON.stringify(authForm)
      });

      success = `Авторизация успешна (${business ? 'business' : 'user'}). Токен: ${payload.token ?? payload.accessToken ?? 'получен'}`;
    } catch (e) {
      error = `Ошибка авторизации: ${(e as Error).message}`;
    }
  };

  onMount(loadInitialData);
</script>

<svelte:head>
  <title>API Admin Panel</title>
</svelte:head>

<main class="dashboard">
  <header>
    <h1>Admin panel под новые API</h1>
    <p>Быстрый интерфейс для проверки эндпоинтов backend.</p>
  </header>

  <section class="config card">
    <label>
      API Base URL
      <input bind:value={api.baseUrl} placeholder="http://127.0.0.1:3000" />
    </label>
    <button on:click={loadInitialData} disabled={loading}>{loading ? 'Loading...' : 'Reload data'}</button>
  </section>

  {#if error}
    <p class="message error">{error}</p>
  {/if}
  {#if success}
    <p class="message success">{success}</p>
  {/if}

  <div class="grid">
    <section class="card">
      <h2>Companies ({companies.length})</h2>
      <div class="form-grid">
        <input bind:value={companyForm.name} placeholder="Company name" />
        <input bind:value={companyForm.photo} placeholder="Photo URL" />
        <input bind:value={companyForm.OpenTime} placeholder="OpenTime (ISO)" />
        <input bind:value={companyForm.CloseTime} placeholder="CloseTime (ISO)" />
      </div>
      <button on:click={createCompany}>Create company</button>
      <ul>
        {#each companies as company}
          <li>
            <button class="link" on:click={() => { selectedCompanyId = company._id; packageForm.companyId = company._id; orderForm.company = company._id; loadPackagesByCompany(company._id); }}>
              {company.name} <small>{company._id}</small>
            </button>
          </li>
        {/each}
      </ul>
    </section>

    <section class="card">
      <h2>Packages ({packages.length})</h2>
      <div class="form-grid">
        <input bind:value={packageForm.companyId} placeholder="companyId" />
        <input bind:value={packageForm.name} placeholder="Package name" />
        <input bind:value={packageForm.description} placeholder="Description" />
        <input bind:value={packageForm.category} placeholder="Category" />
        <input type="number" bind:value={packageForm.count} placeholder="Count" />
        <input type="number" bind:value={packageForm.price} placeholder="Price" />
        <input type="number" bind:value={packageForm.getTime} placeholder="Get Time" />
      </div>
      <label class="row"><input type="checkbox" bind:checked={packageForm.active} /> Active</label>
      <button on:click={createPackage}>Create package</button>

      <ul>
        {#each packages as item}
          <li>
            <button class="link" on:click={() => (orderForm.package = item._id)}>
              {item.name} — ${item.price ?? 0} <small>{item._id}</small>
            </button>
          </li>
        {/each}
      </ul>
    </section>

    <section class="card">
      <h2>Users ({users.length})</h2>
      <ul>
        {#each users as user}
          <li>
            <button class="link" on:click={() => (selectedUserId = user._id)}>
              {user.name} ({user.email ?? 'no-email'}) <small>{user._id}</small>
            </button>
          </li>
        {/each}
      </ul>

      <h3>Auth test</h3>
      <div class="form-grid">
        <input bind:value={authForm.email} placeholder="Email" />
        <input type="password" bind:value={authForm.password} placeholder="Password" />
      </div>
      <div class="row">
        <button on:click={() => loginUser(false)}>User login</button>
        <button on:click={() => loginUser(true)}>Business login</button>
      </div>
    </section>

    <section class="card full">
      <h2>Create order + get by id</h2>
      <div class="form-grid">
        <input bind:value={orderForm.package} placeholder="package id" />
        <input bind:value={orderForm.company} placeholder="company id" />
        <input bind:value={orderForm.description} placeholder="Description" />
        <input type="number" bind:value={orderForm.count} placeholder="Count" />
        <input type="number" bind:value={orderForm.coordinationLat} placeholder="Lat" />
        <input type="number" bind:value={orderForm.coordinationLng} placeholder="Lng" />
      </div>
      <button on:click={createOrder}>Create order</button>

      <div class="row top-gap">
        <input id="findOrder" placeholder="Order id" />
        <button on:click={() => {
          const input = document.getElementById('findOrder') as HTMLInputElement | null;
          loadOrderById(input?.value ?? '');
        }}>Find order by id</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>company</th>
            <th>package</th>
            <th>status</th>
            <th>count</th>
          </tr>
        </thead>
        <tbody>
          {#each orders as order}
            <tr>
              <td>{order._id}</td>
              <td>{order.company}</td>
              <td>{order.package}</td>
              <td>{order.status}</td>
              <td>{order.count}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </section>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, sans-serif;
    background: #0f172a;
    color: #e2e8f0;
  }
  .dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 16px;
  }
  .card {
    background: #1e293b;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 16px;
  }
  .card.full {
    grid-column: 1 / -1;
  }
  .config {
    display: flex;
    gap: 12px;
    align-items: end;
    margin-bottom: 12px;
  }
  .form-grid {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    background: #0b1220;
    border: 1px solid #334155;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 8px 10px;
    box-sizing: border-box;
  }
  button {
    background: #2563eb;
    color: white;
    border: 0;
    border-radius: 8px;
    padding: 8px 12px;
    cursor: pointer;
  }
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .top-gap {
    margin-top: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
    display: grid;
    gap: 6px;
  }
  .link {
    text-align: left;
    background: #0b1220;
    width: 100%;
  }
  small {
    display: block;
    color: #94a3b8;
    margin-top: 2px;
    font-size: 11px;
    word-break: break-all;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 13px;
  }
  th,
  td {
    border-bottom: 1px solid #334155;
    padding: 8px;
    text-align: left;
    word-break: break-all;
  }
  .message {
    border-radius: 8px;
    padding: 10px;
    margin: 10px 0;
  }
  .error {
    background: rgba(220, 38, 38, 0.2);
    color: #fecaca;
  }
  .success {
    background: rgba(22, 163, 74, 0.2);
    color: #bbf7d0;
  }
</style>
