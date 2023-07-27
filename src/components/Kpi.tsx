export default function Kpi({
  title,
  number,
  second_title,
  second_number
}: {
  title: string;
  number: number;
  second_title?: string;
  second_number?: number;
}) {
  return (
    <div className="w-96 min-w-96 bg-white rounded-md h-56 shadow-xl flex flex-col p-6 gap-1 justify-center items-center">
      <h3 className="text-2xl font-semibold text-slate-600">
        {title}
      </h3>
      <span className="text-6xl font-semibold text-slate-600">
        {number === null ?
          "----"
          :
          number
        }
      </span>
      {second_number || second_title ?
        <>
          <h3 className="text-2xl font-semibold text-lime-500">
            {second_title}
          </h3>
          <span className="text-6xl font-semibold text-lime-500">
            {second_number === null ?
              "----"
              :
              second_number
            }
          </span>
        </>
        :
        null
      }
    </div>
  )
}