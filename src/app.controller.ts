import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/admin')
  @Header('Content-Type', 'text/html')
  getAdmin(): string {
    return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SrokGo Admin</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f6f7fb;
        --card: #ffffff;
        --text: #1f2937;
        --muted: #6b7280;
        --accent: #2563eb;
        --border: #e5e7eb;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--text);
      }
      header {
        padding: 32px 24px 12px;
      }
      header h1 {
        margin: 0 0 8px;
        font-size: 28px;
      }
      header p {
        margin: 0;
        color: var(--muted);
      }
      main {
        padding: 16px 24px 40px;
        display: grid;
        gap: 20px;
      }
      .section {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
      }
      .section h2 {
        margin: 0 0 12px;
        font-size: 20px;
      }
      .grid {
        display: grid;
        gap: 12px;
      }
      .endpoint {
        display: grid;
        grid-template-columns: 92px 1fr;
        gap: 12px;
        padding: 12px;
        border-radius: 12px;
        border: 1px solid var(--border);
        background: #fbfcff;
      }
      .method {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        border-radius: 999px;
        padding: 6px 10px;
        background: rgba(37, 99, 235, 0.1);
        color: var(--accent);
        border: 1px solid rgba(37, 99, 235, 0.2);
      }
      .path {
        font-family: "JetBrains Mono", "SFMono-Regular", ui-monospace, monospace;
        font-size: 14px;
        margin-bottom: 6px;
      }
      .desc {
        margin: 0;
        color: var(--muted);
        font-size: 13px;
      }
      .note {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 12px;
        border: 1px dashed var(--border);
        color: var(--muted);
        background: #fdfdff;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>SrokGo Admin</h1>
      <p>Сводка всех API. Минималистичный обзор для админа без интерфейса Postman.</p>
    </header>
    <main>
      <div class="note">Базовый URL: <strong>/</strong>. Авторизация и параметры см. в сервисах.</div>

      <section class="section">
        <h2>Auth · Business</h2>
        <div class="grid">
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/auth/business/register</div>
              <p class="desc">Регистрация бизнеса.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/auth/business/login</div>
              <p class="desc">Логин бизнеса.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/auth/business/me?id=</div>
              <p class="desc">Профиль бизнеса.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/auth/business/me?id=</div>
              <p class="desc">Обновить профиль бизнеса.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/auth/business/verify?token=</div>
              <p class="desc">Верификация токена.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Auth · User</h2>
        <div class="grid">
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/auth/user/register</div>
              <p class="desc">Регистрация пользователя.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/auth/user/login</div>
              <p class="desc">Логин пользователя.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/auth/user/me?id=</div>
              <p class="desc">Профиль пользователя.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/auth/user/me?id=</div>
              <p class="desc">Обновить профиль пользователя.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/auth/user/verify?token=</div>
              <p class="desc">Верификация токена.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/auth/user/me/avatar?id=</div>
              <p class="desc">Загрузка аватара (multipart file).</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Company</h2>
        <div class="grid">
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/company/create</div>
              <p class="desc">Создать компанию.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/company/find</div>
              <p class="desc">Поиск компаний по фильтру.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/company/all</div>
              <p class="desc">Список всех компаний.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/company/:id</div>
              <p class="desc">Детали компании по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">PATCH</div>
            <div>
              <div class="path">/company/:id</div>
              <p class="desc">Обновить компанию по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">DELETE</div>
            <div>
              <div class="path">/company/:id</div>
              <p class="desc">Удалить компанию по id.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Package</h2>
        <div class="grid">
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/package</div>
              <p class="desc">Создать пакет.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/package/by-company/:companyId</div>
              <p class="desc">Пакеты по компании.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/package/:id</div>
              <p class="desc">Детали пакета по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">PATCH</div>
            <div>
              <div class="path">/package/:id</div>
              <p class="desc">Обновить пакет по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">DELETE</div>
            <div>
              <div class="path">/package/:id</div>
              <p class="desc">Удалить пакет по id.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Order</h2>
        <div class="grid">
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/order</div>
              <p class="desc">Создать заказ.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/order/:id</div>
              <p class="desc">Детали заказа по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/order/find</div>
              <p class="desc">Поиск заказов по фильтру.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">PATCH</div>
            <div>
              <div class="path">/order/:id</div>
              <p class="desc">Обновить заказ по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">DELETE</div>
            <div>
              <div class="path">/order/:id</div>
              <p class="desc">Удалить заказ по id.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>User</h2>
        <div class="grid">
          <div class="endpoint">
            <div class="method">POST</div>
            <div>
              <div class="path">/user</div>
              <p class="desc">Создать пользователя.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/user</div>
              <p class="desc">Список пользователей.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">GET</div>
            <div>
              <div class="path">/user/:id</div>
              <p class="desc">Детали пользователя по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">PATCH</div>
            <div>
              <div class="path">/user/:id</div>
              <p class="desc">Обновить пользователя по id.</p>
            </div>
          </div>
          <div class="endpoint">
            <div class="method">DELETE</div>
            <div>
              <div class="path">/user/:id</div>
              <p class="desc">Удалить пользователя по id.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`;
  }
}
