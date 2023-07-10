import { useActions, useSignal } from "@dilane3/gx";
import { getPostCategories } from "api/posts_categories";
import PostCategory, { postCategory } from "../entities/post_categories/postCategory";
import { PostCategoryState } from "gx/signals/post_categories";
import { useCallback, useEffect } from "react"

export const useSynesPostsCategories = (): {postCategories: PostCategory[]} => {

  const {postCategories} = useSignal<PostCategoryState>("postCategories");

  const {loadPostCategories} = useActions("postCategories");

  const cachedLoadPostCategories = useCallback( async () => {
    const result = await getPostCategories();

    let postCategories: PostCategory[] = [];

    if(result.data.count > 0) { 
      console.log(result.data.data);
      postCategories = result.data.data.map((postCategory: postCategory) => {        
        return new PostCategory(postCategory)
      })
    }

    loadPostCategories(postCategories);
  },[loadPostCategories]);

  useEffect(() => {
    if(postCategories.length < 1) {
      cachedLoadPostCategories();
    }
  }, []);

  return {
    postCategories: postCategories
  }
}