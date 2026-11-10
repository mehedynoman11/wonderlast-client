import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center gap-6">
        <Skeleton className="w-16 h-16 rounded-xl mb-4" />

        <h2 className="text-xl font-medium text-gray-900">Loading...</h2>

        <p className="text-muted-foreground text-sm">
          Please wait while we fetch your destinations
        </p>

        <Skeleton className="w-32 h-4 rounded-md mb-3" />

        <Skeleton className="w-24 h-4 rounded-md" />
      </div>
    </section>
  );
}
