import SkekeletonProyecto from "@/components/skeletons/proyecto"

export default function Skeleton() {
  return (
      <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
        <SkekeletonProyecto />
        <SkekeletonProyecto />
        <SkekeletonProyecto />
      </div>

  )
}