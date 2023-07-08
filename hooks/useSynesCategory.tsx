import { useSignal } from "@dilane3/gx";
import { PostCategoryState } from "gx/signals/post_categories";
import { useMemo } from "react"

export const useSynesCategory = (categoryName: string): {categoryId: string | undefined } => {

  const { postCategories } = useSignal<PostCategoryState>("postCategories");
  const postCategorie = useMemo(() => postCategories.find((e) => e.getName() === categoryName), [postCategories, categoryName]);

  return {
    categoryId: postCategorie?.getId()
  }
}