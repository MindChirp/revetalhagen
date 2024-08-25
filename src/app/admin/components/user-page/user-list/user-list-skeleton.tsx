import { Skeleton } from "@/components/ui/skeleton";

export default function UserListSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2.5">
      {new Array(6).fill(0).map((_, i) => (
        <Skeleton key={i} className="w-full h-60" />
      ))}
    </div>
  );
}
