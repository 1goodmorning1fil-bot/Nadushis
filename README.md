# На Душись — Парфюмерный Дом

Production-ready интернет-магазин премиальной нишевой парфюмерии. Next.js 14 (App Router), PostgreSQL (Prisma), Supabase Storage, NextAuth, Zustand, TanStack Query.

---

## 📦 Что внутри

- **Frontend + Backend** в одном Next.js проекте (API Routes)
- **4000+ товаров** — сидируется автоматически, постраничная загрузка по 24/30 шт., фильтры по индексам БД (без лагов)
- **Админ-панель** — товары (CRUD, инлайн-редактирование цены), импорт CSV/JSON, заказы со сменой статуса
- **8 страниц магазина**: Главная (анимация распыления на canvas), Каталог, Товар (пирамида ароматов), Бренды, Избранное, Корзина, Checkout, О нас
- **NextAuth** (credentials) для входа в админку
- **Zustand + persist** для корзины/избранного на клиенте (без лишних запросов к серверу)

---

## 🗂 Структура проекта

```
nadushis/
├── app/
│   ├── shop/                  # Публичная часть магазина (layout с Header/Footer/Ticker)
│   │   ├── page.tsx           # Главная (hero + spray canvas)
│   │   ├── catalog/           # Каталог с фильтрами и пагинацией
│   │   ├── product/[slug]/    # Страница товара (пирамида ароматов)
│   │   ├── brands/            # Бренды
│   │   ├── favorites/         # Избранное
│   │   ├── cart/               # Корзина
│   │   ├── checkout/          # Оформление заказа + success
│   │   └── about/              # О нас / Контакты
│   ├── admin/                  # Админ-панель (защищена ролью ADMIN)
│   │   ├── page.tsx           # Дашборд со статистикой
│   │   ├── products/           # Список товаров + инлайн-редактирование
│   │   ├── orders/              # Заказы + смена статуса
│   │   └── import/              # Drag&drop импорт CSV/JSON
│   ├── api/                    # API Routes (backend)
│   │   ├── products/           # GET (фильтры/пагинация), POST, PUT, DELETE
│   │   ├── brands/, categories/
│   │   ├── orders/              # Создание + список + обновление статуса
│   │   ├── upload/              # CSV/JSON bulk import
│   │   ├── admin/stats/        # Статистика для дашборда
│   │   └── auth/[...nextauth]/ # NextAuth handler
│   └── login/                   # Вход в админку
├── components/
│   ├── layout/                  # Header, Footer, Ticker (бегущая строка)
│   └── shop/                    # ProductCard
├── lib/
│   ├── prisma.ts                # Prisma singleton
│   ├── auth.ts                  # NextAuth config
│   ├── supabase.ts              # Supabase Storage helper
│   ├── store.ts                 # Zustand cart/favorites
│   └── utils.ts                 # formatPrice и пр.
├── prisma/
│   ├── schema.prisma            # Полная схема БД
│   └── seed.ts                  # Генератор 4200 товаров + 20 брендов
├── styles/globals.css           # Дизайн-система (изумруд/золото/крем)
├── tailwind.config.js
├── vercel.json
└── .env.example
```

---

## 🚀 Локальный запуск

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения
```bash
cp .env.example .env.local
```
Заполните `DATABASE_URL` (см. раздел про БД ниже) и `NEXTAUTH_SECRET` (любая случайная строка 32+ символов, можно сгенерировать: `openssl rand -base64 32`).

### 3. База данных — Supabase (рекомендуется, бесплатный план)
1. Зарегистрируйтесь на **https://supabase.com**
2. Создайте новый проект (Database Password запомните)
3. Откройте **Project Settings → Database → Connection string → URI**
4. Скопируйте строку вида:
   ```
   postgresql://postgres.xxxxx:[PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres
   ```
5. Вставьте в `.env.local` как `DATABASE_URL`
6. Для Storage (фото товаров): **Storage → New bucket** → создайте bucket `products` (Public)
7. Скопируйте `NEXT_PUBLIC_SUPABASE_URL` и `NEXT_PUBLIC_SUPABASE_ANON_KEY` из **Project Settings → API**

### 4. Применить схему БД и засеять данные
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```
Это создаст 20 брендов, 8 категорий и **4200 товаров**, а также администратора:
```
Email: admin@nadushis.ru
Пароль: Admin@NaDushis2024
```
⚠️ Смените пароль после первого входа через Prisma Studio (`npm run db:studio`) или добавьте страницу смены пароля.

### 5. Запуск
```bash
npm run dev
```
Откройте **http://localhost:3000** — магазин. **http://localhost:3000/admin** — админ-панель (после входа на `/login`).

---

## ☁️ Деплой на Vercel

### Шаг 1 — GitHub
```bash
git init
git add .
git commit -m "Initial commit: На Душись"
git branch -M main
git remote add origin https://github.com/ВАШ_АККАУНТ/nadushis.git
git push -u origin main
```

### Шаг 2 — Подключение к Vercel
1. Зайдите на **https://vercel.com** → **Add New → Project**
2. Выберите **Import Git Repository** → укажите ваш репозиторий `nadushis`
3. Vercel автоматически определит фреймворк **Next.js**
4. В разделе **Environment Variables** добавьте все переменные из `.env.example`:

| Переменная | Значение |
|---|---|
| `DATABASE_URL` | строка подключения Supabase |
| `NEXTAUTH_SECRET` | случайная строка 32+ символов |
| `NEXTAUTH_URL` | `https://ваш-домен.vercel.app` (потом замените на свой домен) |
| `NEXT_PUBLIC_SUPABASE_URL` | из Supabase API settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | из Supabase API settings |
| `SUPABASE_SERVICE_ROLE_KEY` | из Supabase API settings (для серверных загрузок) |

5. Нажмите **Deploy**

Build command уже настроен в `vercel.json`:
```
prisma generate && prisma db push && next build
```
Это автоматически применит схему БД при каждом деплое.

### Шаг 3 — Засеять продакшн-БД (один раз)
После первого деплоя выполните локально, указав продакшн `DATABASE_URL`:
```bash
DATABASE_URL="ваша_продакшн_строка" npm run db:seed
```

### Шаг 4 — Проверка
Откройте выданный Vercel URL (`https://nadushis-xxxx.vercel.app`) — магазин должен работать с 4000+ товарами.

---

## 🌐 Подключение собственного домена

### В Vercel
1. **Project → Settings → Domains** → введите ваш домен (например `nadushis.ru`)
2. Vercel покажет, какие DNS-записи нужно добавить

### DNS-записи у вашего регистратора домена

**Вариант А — корневой домен (nadushis.ru):**
| Тип | Имя | Значение |
|---|---|---|
| A | @ | `76.76.21.21` |

**Вариант Б — поддомен (www.nadushis.ru):**
| Тип | Имя | Значение |
|---|---|---|
| CNAME | www | `cname.vercel-dns.com` |

**Рекомендуется добавить оба** — корневой домен с A-записью и `www` с CNAME, а в Vercel настроить редирект www → корневой домен (или наоборот) в **Domains → Edit**.

После добавления записей подождите 5–60 минут на распространение DNS. Vercel автоматически выпустит SSL-сертификат (Let's Encrypt) — никаких дополнительных действий не требуется.

### Обновите NEXTAUTH_URL
После подключения домена обновите переменную окружения в Vercel:
```
NEXTAUTH_URL=https://nadushis.ru
```
И передеплойте проект (**Deployments → ⋯ → Redeploy**).

---

## 🔐 Безопасность перед продакшеном

- [ ] Смените пароль администратора (`admin@nadushis.ru`)
- [ ] Сгенерируйте новый `NEXTAUTH_SECRET` для продакшена (не используйте тот же, что в `.env.local`)
- [ ] Ограничьте `/admin/*` и мутирующие API-роуты (`POST/PUT/DELETE /api/products`) проверкой сессии и роли `ADMIN` на сервере — в текущей версии проверка роли реализована на фронтенде (`AdminLayout`); для продакшена добавьте middleware-проверку на уровне API роутов
- [ ] Включите Row Level Security в Supabase, если используете Storage с прямой загрузкой с клиента

---

## 🛠 Технологии

Next.js 14 · TypeScript · Prisma · PostgreSQL · Supabase Storage · NextAuth · Tailwind CSS · Framer Motion · Zustand · TanStack Query · React Hook Form + Zod

---

## 📞 Поддержка

Вопросы по архитектуре — открывайте issue в репозитории. Все основные сущности (товары, бренды, категории, заказы) описаны в `prisma/schema.prisma`.
