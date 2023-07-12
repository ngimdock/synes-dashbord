function PostSkeleton() {
  return (
    <div className="p-4 bg-white shadow-lg border rounded-lg animate-pulse">
      <div className="flex space-x-4">
        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="h-3 bg-gray-400 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
      <div className="space-y-4 py-4">
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export default PostSkeleton;