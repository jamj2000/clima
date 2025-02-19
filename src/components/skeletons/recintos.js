import SkekeletonRecinto from "@/components/skeletons/recinto"

export default function Skeleton() {
  return (
    
    <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
      <SkekeletonRecinto />
      <SkekeletonRecinto />
      <SkekeletonRecinto />
    </div>

  )
}