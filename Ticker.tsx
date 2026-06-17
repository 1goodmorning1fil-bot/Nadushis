export function Ticker() {
  const items = [
    'Бесплатная доставка от 5 000 ₽',
    'Оригинальная парфюмерия',
    'Более 4 000 ароматов',
    'Консультация парфюмера',
    'Подарочная упаковка',
    'Возврат 30 дней',
    'Флаконы-пробники',
    'Loyalty программа',
  ]

  const repeated = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-2"
      style={{ background: '#1E6B5E' }}
    >
      <div className="ticker-inner">
        {repeated.map((item, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', letterSpacing: '0.15em', color: '#F5EDDC', textTransform: 'uppercase', paddingRight: '60px' }}>
            <span style={{ color: '#C9A96E', marginRight: '20px' }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
