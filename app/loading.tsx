export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50/50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-blue-600"></div>
        <p className="text-sm font-medium text-neutral-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
