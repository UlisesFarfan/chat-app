export default function Message({
  message,
  user,
}: any) {

  if (user !== "Me") {
    return (
      <div className="w-full flex flex-start">
        <div className="w-1/2">
          <div className="flex items-center">
            {/* <img className="h-5 w-5 overflow-hidden rounded-full"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
            alt="" /> */}
            <p className="font-semibold text-sm text-slate-600">{user}</p>
          </div>

          <div className="mt-3 max-w-max bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
            <p className="text-sm text-slate-900">
              {message}
            </p>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-full flex justify-end mt-3">
        <div className="w-1/2 ">
          <div className="flex items-center justify-end">
            <p className="font-semibold mr-3 text-sm text-slate-600">{user}</p>
            {/* <img className="h-5 w-5 overflow-hidden rounded-full"
              src="https://source.unsplash.com/random/500x500/?face"
              alt="" /> */}
          </div>
          <div className="flex items-center justify-end">
            <div className="mt-3 max-w-max justify-end bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
              <p className="text-sm text-white">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
      <div className="text-center  my-5">
        <hr className="-mb-3" />
        <span className="text-xs text-slate-300 font-medium bg-white px-3 -mt-3">
          Wednesday, Feburary 5
        </span>
      </div>
      <div className="w-full flex flex-start overflow-y-auto">
        <div className="w-1/2">
          <div className="flex items-center">
            <img className="h-5 w-5 overflow-hidden rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
              alt="" />
            <p className="font-semibold ml-3 text-sm text-slate-600">Mircel Jones <span
              className="text-slate-400 text-xs">3:21 PM</span></p>
          </div>

          <div className="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
            <p className=" text-sm text-slate-500">
              Hey all,
              There are many variation of passages of Lorem ipsum avaliable, but the jority have alternation in some form , by injected humor, or randomise words which don't look even slightly believable.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-3">
        <div className="w-1/2 ">
          <div className="flex items-center justify-end">
            <p className="font-semibold mr-3 text-sm text-slate-600">Me <span
              className="text-slate-400 text-xs">3:25 PM</span></p>

            <img className="h-5 w-5 overflow-hidden rounded-full"
              src="https://source.unsplash.com/random/500x500/?face"
              alt="" />

          </div>

          <div className="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
            <p className=" text-sm text-white">
              Hey,
              we are own hidden lake forest which is netural lake are generaly found in mountain.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center  my-5">
        <hr className="-mb-3" />
        <span className="text-xs text-slate-300 font-medium bg-white px-3 -mt-3">Today, 2:15 AM
          5</span>
      </div>
      <div className="w-full flex flex-start">
        <div className="w-1/2">
          <div className="flex items-center">
            <img className="h-5 w-5 overflow-hidden rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
              alt="" />
            <p className="font-semibold ml-3 text-sm text-slate-600">Mircel Jones <span
              className="text-slate-400 text-xs">3:21 PM</span></p>
          </div>

          <div className="mt-3  bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
            <p className=" text-sm text-slate-500">
              ok, Thanks
            </p>
          </div>
        </div>
      </div>
 */