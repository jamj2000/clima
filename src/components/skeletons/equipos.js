import SkekeletonEquipo from "@/components/skeletons/equipo"

export default function Skeleton() {
  return (

      <div className="flex flex-wrap gap-5 sm:gap-10 items-center justify-center">
        <SkekeletonEquipo />
        <SkekeletonEquipo />
        <SkekeletonEquipo />
      </div>

  )
}