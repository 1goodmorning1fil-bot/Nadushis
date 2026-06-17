import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: '#134940', color: '#F5EDDC' }}>
      {/* Top ornament */}
      <div className="text-center py-6" style={{ borderBottom: '1px solid rgba(201, 169, 110, 0.2)' }}>
        <span style={{ color: '#C9A96E', fontSize: '20px', letterSpacing: '12px' }}>✦ ✦ ✦</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: '#F5EDDC' }}>
              На Душись
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: '1.8', color: 'rgba(245, 237, 220, 0.65)' }}>
            Парфюмерный дом с безупречным вкусом. Мы собрали лучшие ароматы мира для тех, кто ценит настоящую роскошь.
          </p>
          <div className="mt-6 flex gap-4">
            {['ВК', 'TG', 'WA'].map(s => (
              <button key={s} style={{ width: '36px', height: '36px', border: '1px solid rgba(201, 169, 110, 0.4)', color: '#C9A96E', fontSize: '11px', fontFamily: 'var(--font-mono)', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#134940' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C9A96E' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Каталог */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
            Каталог
          </h4>
          {['Новинки', 'Бестселлеры', 'Женские', 'Мужские', 'Унисекс', 'Подборки'].map(item => (
            <Link key={item} href={`/shop/catalog?gender=${item}`} className="block mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(245, 237, 220, 0.65)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5EDDC')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245, 237, 220, 0.65)')}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Информация */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
            Информация
          </h4>
          {['О нас', 'Доставка', 'Возврат', 'Оплата', 'Контакты', 'Блог'].map(item => (
            <Link key={item} href={`/shop/about`} className="block mb-3" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(245, 237, 220, 0.65)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5EDDC')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245, 237, 220, 0.65)')}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Контакты */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '20px' }}>
            Контакты
          </h4>
          <div className="space-y-4" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(245, 237, 220, 0.65)', lineHeight: '1.6' }}>
            <p>Москва, ул. Кузнецкий Мост, 3</p>
            <p>+7 (495) 123-45-67</p>
            <p>info@nadushis.ru</p>
            <p>Пн–Вс: 10:00–21:00</p>
          </div>
          <div className="mt-6">
            <input type="email" placeholder="Ваш email" className="input-luxury text-xs mb-3" style={{ fontSize: '12px', background: 'transparent', borderColor: 'rgba(201, 169, 110, 0.3)', color: '#F5EDDC' }} />
            <button className="btn-gold w-full text-xs" style={{ fontSize: '11px' }}>Подписаться</button>
          </div>
        </div>
      </div>

      <div className="border-t py-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-6" style={{ borderColor: 'rgba(201, 169, 110, 0.2)' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(245, 237, 220, 0.4)' }}>
          © 2024 На Душись. Все права защищены.
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(245, 237, 220, 0.4)' }}>
          Парфюмерный Дом
        </span>
      </div>
    </footer>
  )
}
