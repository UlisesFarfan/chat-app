import { useParams } from 'react-router-dom';

export default function PerfileCard({ data, current, setCurrent }: { data: any, current: any, setCurrent: any }) {

  const { id } = useParams<{ id: string }>();

  return (
    <div className="px-5 py-4 flex items-center   cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100">
      <img src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500"
        className="h-12 w-12 border-2 border-white rounded-full" alt="" />
      <div className="ml-4">
        <p x-text="user.name" className="text-md font-semibold text-slate-600 m-0 p-0">
          Yaroslav Zubkp
        </p>
        <p className="text-xs text-slate-400 -mt-0.5 font-semibold" x-text="user.email">
          is is long ipsum avaliable...
        </p>
      </div>
    </div>
  )
}

//"px-5 py-4   flex items-center   cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"