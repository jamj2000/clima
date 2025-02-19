export default function Skeleton() {
    return (
      <div className="flex flex-col justify-between h-82 w-80 outline outline-2 outline-gray-300 rounded-md">
        <div className="bg-slate-100 pt-10 border-b-2 py-6">
          <div className="skeleton h-8 w-40 rounded-sm ml-6 mb-2"></div>
          <div className="skeleton h-4 w-60 rounded-sm ml-6 mt-2"></div>
          <div className="skeleton h-4 w-60 rounded-sm ml-6 mt-2"></div>
        </div>
        <div className="bg-slate-100 h-15">
          <div className="flex justify-around items-center my-4">
            <div className="skeleton h-9 w-16 rounded-md"></div>
            <div className="skeleton h-9 w-16 rounded-md"></div>
            <div className="skeleton h-9 w-16 rounded-md"></div>
          </div>
        </div>
      </div>
    )
  }