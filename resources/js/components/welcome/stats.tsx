const stats = [
  { id: 1, name: 'Años de excelencia en el mercado', value: '+ 38' },
  { id: 2, name: 'Clientes satisfechos', value: '+ 5.000' },
  { id: 3, name: 'Entregas a tiempo', value: '99.9%' },
]

export default function Example() {
  return (
    <div className="bg-white shadow-xl py-5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/1 text-gray-900 font-semibold">{stat.name}</dt>
              <dd className="order-first text-3xl font-black tracking-tight text-sky-600 sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
