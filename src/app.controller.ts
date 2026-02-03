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
        --success: #16a34a;
        --danger: #dc2626;
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
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      header h1 {
        margin: 0;
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
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .input-group {
        display: grid;
        gap: 6px;
        min-width: 220px;
      }
      label {
        font-size: 12px;
        color: var(--muted);
      }
      input,
      textarea,
      select,
      button {
        font-family: inherit;
        border-radius: 10px;
        border: 1px solid var(--border);
        padding: 10px 12px;
        font-size: 14px;
      }
      input:focus,
      textarea:focus,
      select:focus {
        outline: 2px solid rgba(37, 99, 235, 0.2);
        border-color: rgba(37, 99, 235, 0.5);
      }
      textarea {
        min-height: 96px;
        resize: vertical;
      }
      button {
        background: var(--accent);
        color: #fff;
        border: none;
        cursor: pointer;
        font-weight: 600;
      }
      button.secondary {
        background: #fff;
        color: var(--text);
        border: 1px solid var(--border);
      }
      .grid {
        display: grid;
        gap: 16px;
      }
      .request-card {
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 16px;
        display: grid;
        gap: 12px;
        background: #fbfcff;
      }
      .request-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }
      .badge {
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
      }
      .desc {
        margin: 0;
        color: var(--muted);
        font-size: 13px;
      }
      .row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
      }
      .response {
        border: 1px dashed var(--border);
        padding: 12px;
        border-radius: 12px;
        background: #fff;
        font-family: "JetBrains Mono", "SFMono-Regular", ui-monospace, monospace;
        font-size: 12px;
        color: var(--muted);
        white-space: pre-wrap;
      }
      .status {
        font-size: 12px;
        font-weight: 600;
      }
      .status.ok {
        color: var(--success);
      }
      .status.fail {
        color: var(--danger);
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
      <p>Простая админка для работы с API. Заполняйте формы и отправляйте запросы прямо отсюда.</p>
    </header>
    <main>
      <div class="note">Базовый URL и токен можно менять перед запросами. Ответы приходят ниже каждой формы.</div>

      <section class="section">
        <h2>Общие настройки</h2>
        <div class="toolbar">
          <div class="input-group">
            <label for="baseUrl">Base URL</label>
            <input id="baseUrl" type="text" value="http://127.0.0.1:3000" />
          </div>
          <div class="input-group">
            <label for="authToken">Bearer токен (опционально)</label>
            <input id="authToken" type="text" placeholder="eyJhbGciOi..." />
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Auth · Business</h2>
        <div class="grid">
          <form class="request-card" data-method="POST" data-path="/auth/business/register">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/auth/business/register</span>
            </div>
            <p class="desc">Регистрация бизнеса.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "email": "", "password": "", "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Отправить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="POST" data-path="/auth/business/login">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/auth/business/login</span>
            </div>
            <p class="desc">Логин бизнеса.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "email": "", "password": "" }</textarea>
              </div>
            </div>
            <button type="submit">Войти</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/auth/business/me">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/auth/business/me</span>
            </div>
            <p class="desc">Профиль бизнеса по query id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="query_id" type="text" placeholder="businessId" />
              </div>
            </div>
            <button type="submit">Получить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="POST" data-path="/auth/business/me">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/auth/business/me</span>
            </div>
            <p class="desc">Обновить профиль бизнеса (query id + JSON тело).</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="query_id" type="text" placeholder="businessId" />
              </div>
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Сохранить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/auth/business/verify">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/auth/business/verify</span>
            </div>
            <p class="desc">Проверка токена верификации (query token).</p>
            <div class="row">
              <div class="input-group">
                <label>token</label>
                <input name="query_token" type="text" placeholder="token" />
              </div>
            </div>
            <button type="submit">Проверить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
        </div>
      </section>

      <section class="section">
        <h2>Auth · User</h2>
        <div class="grid">
          <form class="request-card" data-method="POST" data-path="/auth/user/register">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/auth/user/register</span>
            </div>
            <p class="desc">Регистрация пользователя.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "email": "", "password": "", "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Отправить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="POST" data-path="/auth/user/login">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/auth/user/login</span>
            </div>
            <p class="desc">Логин пользователя.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "email": "", "password": "" }</textarea>
              </div>
            </div>
            <button type="submit">Войти</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/auth/user/me">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/auth/user/me</span>
            </div>
            <p class="desc">Профиль пользователя по query id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="query_id" type="text" placeholder="userId" />
              </div>
            </div>
            <button type="submit">Получить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="POST" data-path="/auth/user/me">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/auth/user/me</span>
            </div>
            <p class="desc">Обновить профиль пользователя (query id + JSON тело).</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="query_id" type="text" placeholder="userId" />
              </div>
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Сохранить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/auth/user/verify">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/auth/user/verify</span>
            </div>
            <p class="desc">Проверка токена верификации (query token).</p>
            <div class="row">
              <div class="input-group">
                <label>token</label>
                <input name="query_token" type="text" placeholder="token" />
              </div>
            </div>
            <button type="submit">Проверить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="POST" data-path="/auth/user/me/avatar" data-file="true">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/auth/user/me/avatar</span>
            </div>
            <p class="desc">Загрузка аватара (multipart file + query id).</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="query_id" type="text" placeholder="userId" />
              </div>
              <div class="input-group">
                <label>Файл</label>
                <input name="file" type="file" />
              </div>
            </div>
            <button type="submit">Загрузить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
        </div>
      </section>

      <section class="section">
        <h2>Company</h2>
        <div class="grid">
          <form class="request-card" data-method="POST" data-path="/company/create">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/company/create</span>
            </div>
            <p class="desc">Создать компанию.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "name": "", "address": "" }</textarea>
              </div>
            </div>
            <button type="submit">Создать</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="POST" data-path="/company/find">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/company/find</span>
            </div>
            <p class="desc">Поиск компаний по фильтру.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Найти</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/company/all">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/company/all</span>
            </div>
            <p class="desc">Список всех компаний.</p>
            <button type="submit">Получить список</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/company/:id">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/company/:id</span>
            </div>
            <p class="desc">Детали компании по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="companyId" />
              </div>
            </div>
            <button type="submit">Получить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="PATCH" data-path="/company/:id">
            <div class="request-header">
              <span class="badge">PATCH</span>
              <span class="path">/company/:id</span>
            </div>
            <p class="desc">Обновить компанию по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="companyId" />
              </div>
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Сохранить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="DELETE" data-path="/company/:id">
            <div class="request-header">
              <span class="badge">DELETE</span>
              <span class="path">/company/:id</span>
            </div>
            <p class="desc">Удалить компанию по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="companyId" />
              </div>
            </div>
            <button type="submit" class="secondary">Удалить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
        </div>
      </section>

      <section class="section">
        <h2>Package</h2>
        <div class="grid">
          <form class="request-card" data-method="POST" data-path="/package">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/package</span>
            </div>
            <p class="desc">Создать пакет.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "title": "", "price": 0 }</textarea>
              </div>
            </div>
            <button type="submit">Создать</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/package/by-company/:companyId">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/package/by-company/:companyId</span>
            </div>
            <p class="desc">Пакеты по компании.</p>
            <div class="row">
              <div class="input-group">
                <label>companyId</label>
                <input name="path_companyId" type="text" placeholder="companyId" />
              </div>
            </div>
            <button type="submit">Получить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/package/:id">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/package/:id</span>
            </div>
            <p class="desc">Детали пакета по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="packageId" />
              </div>
            </div>
            <button type="submit">Получить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="PATCH" data-path="/package/:id">
            <div class="request-header">
              <span class="badge">PATCH</span>
              <span class="path">/package/:id</span>
            </div>
            <p class="desc">Обновить пакет по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="packageId" />
              </div>
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "title": "" }</textarea>
              </div>
            </div>
            <button type="submit">Сохранить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="DELETE" data-path="/package/:id">
            <div class="request-header">
              <span class="badge">DELETE</span>
              <span class="path">/package/:id</span>
            </div>
            <p class="desc">Удалить пакет по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="packageId" />
              </div>
            </div>
            <button type="submit" class="secondary">Удалить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
        </div>
      </section>

      <section class="section">
        <h2>Order</h2>
        <div class="grid">
          <form class="request-card" data-method="POST" data-path="/order">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/order</span>
            </div>
            <p class="desc">Создать заказ.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "packageId": "", "userId": "" }</textarea>
              </div>
            </div>
            <button type="submit">Создать</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/order/:id">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/order/:id</span>
            </div>
            <p class="desc">Детали заказа по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="orderId" />
              </div>
            </div>
            <button type="submit">Получить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/order/find">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/order/find</span>
            </div>
            <p class="desc">Поиск заказов по фильтру (query).</p>
            <div class="row">
              <div class="input-group">
                <label>status</label>
                <input name="query_status" type="text" placeholder="pending" />
              </div>
              <div class="input-group">
                <label>userId</label>
                <input name="query_userId" type="text" placeholder="userId" />
              </div>
            </div>
            <button type="submit">Найти</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="PATCH" data-path="/order/:id">
            <div class="request-header">
              <span class="badge">PATCH</span>
              <span class="path">/order/:id</span>
            </div>
            <p class="desc">Обновить заказ по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="orderId" />
              </div>
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "status": "" }</textarea>
              </div>
            </div>
            <button type="submit">Сохранить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="DELETE" data-path="/order/:id">
            <div class="request-header">
              <span class="badge">DELETE</span>
              <span class="path">/order/:id</span>
            </div>
            <p class="desc">Удалить заказ по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="orderId" />
              </div>
            </div>
            <button type="submit" class="secondary">Удалить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
        </div>
      </section>

      <section class="section">
        <h2>User</h2>
        <div class="grid">
          <form class="request-card" data-method="POST" data-path="/user">
            <div class="request-header">
              <span class="badge">POST</span>
              <span class="path">/user</span>
            </div>
            <p class="desc">Создать пользователя.</p>
            <div class="row">
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "email": "", "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Создать</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/user">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/user</span>
            </div>
            <p class="desc">Список пользователей.</p>
            <button type="submit">Получить список</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="GET" data-path="/user/:id">
            <div class="request-header">
              <span class="badge">GET</span>
              <span class="path">/user/:id</span>
            </div>
            <p class="desc">Детали пользователя по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="userId" />
              </div>
            </div>
            <button type="submit">Получить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="PATCH" data-path="/user/:id">
            <div class="request-header">
              <span class="badge">PATCH</span>
              <span class="path">/user/:id</span>
            </div>
            <p class="desc">Обновить пользователя по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="userId" />
              </div>
              <div class="input-group">
                <label>JSON тело</label>
                <textarea name="body">{ "name": "" }</textarea>
              </div>
            </div>
            <button type="submit">Сохранить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
          <form class="request-card" data-method="DELETE" data-path="/user/:id">
            <div class="request-header">
              <span class="badge">DELETE</span>
              <span class="path">/user/:id</span>
            </div>
            <p class="desc">Удалить пользователя по id.</p>
            <div class="row">
              <div class="input-group">
                <label>id</label>
                <input name="path_id" type="text" placeholder="userId" />
              </div>
            </div>
            <button type="submit" class="secondary">Удалить</button>
            <div class="response" data-response>Ответ появится тут.</div>
          </form>
        </div>
      </section>
    </main>
    <script>
      const baseUrlInput = document.getElementById('baseUrl');
      const authTokenInput = document.getElementById('authToken');

      const buildUrl = (path, formData) => {
        let url = path;
        formData.forEach((value, key) => {
          if (!value) return;
          if (key.startsWith('path_')) {
            const token = key.replace('path_', '');
            url = url.replace(':' + token, encodeURIComponent(value));
          }
        });
        const query = [];
        formData.forEach((value, key) => {
          if (!value) return;
          if (key.startsWith('query_')) {
            const token = key.replace('query_', '');
            query.push(token + '=' + encodeURIComponent(value));
          }
        });
        if (query.length) {
          url += (url.includes('?') ? '&' : '?') + query.join('&');
        }
        return url;
      };

      const setResponse = (container, text, ok) => {
        container.textContent = text;
        container.classList.toggle('ok', ok);
        container.classList.toggle('fail', !ok);
      };

      document.querySelectorAll('.request-card').forEach((form) => {
        form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const responseBox = form.querySelector('[data-response]');
          const method = form.dataset.method || 'GET';
          const isFile = form.dataset.file === 'true';
          const formData = new FormData(form);
          const urlPath = buildUrl(form.dataset.path || '', formData);
          const url = (baseUrlInput.value || '').replace(/\\/$/, '') + urlPath;

          const headers = {};
          const token = authTokenInput.value.trim();
          if (token) {
            headers['Authorization'] = 'Bearer ' + token;
          }

          let body;
          if (method !== 'GET' && method !== 'DELETE') {
            if (isFile) {
              body = formData;
            } else {
              const raw = formData.get('body')?.toString() || '{}';
              body = raw;
              headers['Content-Type'] = 'application/json';
            }
          }

          setResponse(responseBox, 'Запрос отправляется...', true);
          try {
            const res = await fetch(url, {
              method,
              headers,
              body,
            });
            const text = await res.text();
            const pretty = (() => {
              try {
                return JSON.stringify(JSON.parse(text), null, 2);
              } catch {
                return text || '(пустой ответ)';
              }
            })();
            setResponse(
              responseBox,
              `Статус: ${res.status} ${res.statusText}\\n\\n${pretty}`,
              res.ok,
            );
          } catch (error) {
            setResponse(
              responseBox,
              `Ошибка запроса: ${error?.message || error}`,
              false,
            );
          }
        });
      });
    </script>
  </body>
</html>`;
  }
}
