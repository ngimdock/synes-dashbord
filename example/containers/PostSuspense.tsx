import PostSkeleton from "example/components/Skeleton/PostSkeleton"

type PostSuspenseType = {
  loading: boolean,
  children: JSX.Element
}

const PostSuspense = ({ loading, children }: PostSuspenseType): JSX.Element => {
  return (
    loading ? 
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    :
      <>{children}</>
  )
}

export default PostSuspense