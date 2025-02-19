export default function Skeleton() {
    return (
        <div className="flex flex-col justify-between h-92 w-80 outline outline-2 outline-gray-300 rounded-md">
            <div className="skeleton w-full h-48 rounded-t-md rounded-b-none"></div>
            <div className="bg-slate-100 pt-4">
                <div className="skeleton h-8 w-40 rounded-sm ml-4 mb-4"></div>
                <div className="skeleton h-4 w-60 rounded-sm ml-4"></div>
                <div className="flex gap-4 justify-around items-center my-8">
                    <div className="skeleton h-9 w-16 rounded-md"></div>
                    <div className="skeleton h-9 w-16 rounded-md"></div>
                    <div className="skeleton h-9 w-16 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}
