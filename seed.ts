import { PrismaClient, Gender, Concentration } from '@prisma/client'
import bcrypt from 'bcryptjs'
import slugify from 'slugify'

const prisma = new PrismaClient()

const brands = [
  { name: 'Maison Francis Kurkdjian', country: 'Франция', founded: 2009 },
  { name: 'Creed', country: 'Франция', founded: 1760 },
  { name: 'Tom Ford', country: 'США', founded: 2006 },
  { name: 'Byredo', country: 'Швеция', founded: 2006 },
  { name: 'Le Labo', country: 'США', founded: 2006 },
  { name: 'Diptyque', country: 'Франция', founded: 1961 },
  { name: 'Acqua di Parma', country: 'Италия', founded: 1916 },
  { name: 'Amouage', country: 'Оман', founded: 1983 },
  { name: 'Serge Lutens', country: 'Франция', founded: 1992 },
  { name: 'Frederic Malle', country: 'Франция', founded: 2000 },
  { name: 'Xerjoff', country: 'Италия', founded: 2003 },
  { name: 'Nishane', country: 'Турция', founded: 2012 },
  { name: 'Initio', country: 'Франция', founded: 2015 },
  { name: 'Roja Parfums', country: 'Великобритания', founded: 2004 },
  { name: 'Parfums de Marly', country: 'Франция', founded: 2009 },
  { name: 'Tiziana Terenzi', country: 'Италия', founded: 2000 },
  { name: 'Memo Paris', country: 'Франция', founded: 2007 },
  { name: 'Rasasi', country: 'ОАЭ', founded: 1979 },
  { name: 'Montale', country: 'Франция', founded: 2003 },
  { name: 'Bvlgari', country: 'Италия', founded: 1884 },
]

const categories = [
  { name: 'Цветочные', slug: 'floral' },
  { name: 'Восточные', slug: 'oriental' },
  { name: 'Древесные', slug: 'woody' },
  { name: 'Свежие', slug: 'fresh' },
  { name: 'Фужерные', slug: 'fougere' },
  { name: 'Шипровые', slug: 'chypre' },
  { name: 'Гурманские', slug: 'gourmand' },
  { name: 'Акватические', slug: 'aquatic' },
]

const topNotesList = ['Бергамот', 'Лимон', 'Мандарин', 'Грейпфрут', 'Апельсин', 'Черная смородина', 'Яблоко', 'Ананас', 'Малина', 'Персик', 'Кардамон', 'Перец', 'Имбирь', 'Базилик', 'Мята']
const heartNotesList = ['Роза', 'Жасмин', 'Ирис', 'Пион', 'Туберо', 'Нероли', 'Герань', 'Фиалка', 'Ландыш', 'Магнолия', 'Лаванда', 'Oud', 'Амбра', 'Кедр', 'Сандал']
const baseNotesList = ['Ваниль', 'Мускус', 'Амбра', 'Сандаловое дерево', 'Ветивер', 'Пачули', 'Бензоин', 'Кашемировое дерево', 'Ладан', 'Мирра', 'Дубовый мох', 'Цибет', 'Бобы тонка', 'Кожа', 'Смола']
const moods = ['Романтичный', 'Деловой', 'Чувственный', 'Свежий', 'Таинственный', 'Уверенный', 'Игривый', 'Утонченный']
const seasons = ['Весна', 'Лето', 'Осень', 'Зима']
const occasions = ['Вечер', 'День', 'Офис', 'Свидание', 'Особый случай', 'Повседневно']

const adjectives = ['Золотой', 'Таинственный', 'Утренний', 'Вечерний', 'Лунный', 'Солнечный', 'Морской', 'Лесной', 'Цветочный', 'Пряный', 'Дымчатый', 'Хрустальный', 'Бархатный', 'Шелковый', 'Жемчужный', 'Янтарный', 'Рубиновый', 'Изумрудный', 'Сапфировый', 'Опаловый']
const nouns = ['Рассвет', 'Закат', 'Ночь', 'Мечта', 'Огонь', 'Лёд', 'Ветер', 'Волна', 'Тайна', 'Душа', 'Сердце', 'Миг', 'Вечность', 'Легенда', 'Элегия', 'Симфония', 'Поэма', 'Нектар', 'Эссенция', 'Аура']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function randomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min) * 100
}

async function main() {
  console.log('🌱 Seeding database...')

  // Admin user
  const hashedPassword = await bcrypt.hash('Admin@NaDushis2024', 10)
  await prisma.user.upsert({
    where: { email: 'admin@nadushis.ru' },
    update: {},
    create: {
      email: 'admin@nadushis.ru',
      name: 'Администратор',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  // Categories
  const createdCategories = await Promise.all(
    categories.map(cat =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      })
    )
  )

  // Brands
  const createdBrands = await Promise.all(
    brands.map(async brand => {
      const slug = slugify(brand.name, { lower: true, strict: true })
      return prisma.brand.upsert({
        where: { slug },
        update: {},
        create: {
          ...brand,
          slug,
          featured: Math.random() > 0.5,
          description: `${brand.name} — легендарный парфюмерный дом, основанный в ${brand.country}. Каждый аромат — это произведение искусства, созданное лучшими мастерами.`,
        },
      })
    })
  )

  console.log(`✅ Created ${createdBrands.length} brands`)

  // Products — generate 4000+
  const genders: Gender[] = ['MALE', 'FEMALE', 'UNISEX']
  const concentrations: Concentration[] = ['PARFUM', 'EAU_DE_PARFUM', 'EAU_DE_TOILETTE', 'EAU_DE_COLOGNE']
  const volumes = [[30, 50, 100], [50, 100], [30, 50, 100, 200], [50, 75, 100]]

  let productCount = 0
  const batchSize = 100

  for (let i = 0; i < 42; i++) {
    const batch = []
    for (let j = 0; j < batchSize; j++) {
      const adj = pick(adjectives)
      const noun = pick(nouns)
      const brand = pick(createdBrands)
      const category = pick(createdCategories)
      const baseName = `${adj} ${noun}`
      const suffix = `${i * batchSize + j + 1}`
      const name = `${baseName} No.${suffix}`
      const slug = slugify(`${brand.name} ${name}`, { lower: true, strict: true }) + `-${suffix}`
      const price = randomPrice(8, 85)
      const comparePrice = Math.random() > 0.7 ? price * 1.2 : null

      batch.push({
        name,
        slug,
        brandId: brand.id,
        categoryId: category.id,
        description: `${name} — это исключительный аромат от ${brand.name}. Уникальная парфюмерная композиция, созданная для тех, кто ценит роскошь и утонченность. Каждая нота раскрывается постепенно, создавая неповторимый ольфактивный портрет.`,
        story: `История этого аромата начинается в ${brand.country}, где мастера парфюмерии создали нечто совершенное. Вдохновением послужили ${pick(['древние восточные базары', 'цветущие сады Прованса', 'горные вершины Кавказа', 'берега Средиземного моря', 'таинственные леса Сибири'])}.`,
        price,
        comparePrice,
        images: [
          `https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80`,
          `https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80`,
          `https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80`,
        ],
        volume: pick(volumes),
        gender: pick(genders),
        concentration: pick(concentrations),
        topNotes: pickN(topNotesList, 3),
        heartNotes: pickN(heartNotesList, 3),
        baseNotes: pickN(baseNotesList, 3),
        moods: pickN(moods, 2),
        season: pickN(seasons, 2),
        occasions: pickN(occasions, 2),
        featured: Math.random() > 0.85,
        newArrival: Math.random() > 0.8,
        bestseller: Math.random() > 0.88,
        inStock: Math.random() > 0.05,
        stockQty: Math.floor(Math.random() * 200) + 1,
        rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(2)),
        reviewCount: Math.floor(Math.random() * 500),
      })
    }

    await prisma.product.createMany({ data: batch, skipDuplicates: true })
    productCount += batch.length
    console.log(`✅ Products: ${productCount}`)
  }

  console.log(`\n🎉 Seeding complete!`)
  console.log(`📦 Total products: ${productCount}`)
  console.log(`🏷️ Brands: ${createdBrands.length}`)
  console.log(`📂 Categories: ${createdCategories.length}`)
  console.log(`\n🔐 Admin: admin@nadushis.ru / Admin@NaDushis2024`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
