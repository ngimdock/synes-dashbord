import { createSignal } from "@dilane3/gx";
import PostCategory, { postCategory } from "entities/post_categories/postCategory";
import { asynchronousEmulation } from "utils";

export type PostCategoryState = {
  loading: boolean,
  error: boolean,
  postCategories: PostCategory[],
  postCategory: PostCategory | null,
}

const postCategoriesSignal = createSignal<PostCategoryState>({
  name: "postCategories",
  state: {
    loading: false,
    error: false,
    postCategories: [],
    postCategory: null,
  },
  actions: {
    loadPostCategories: (state, payload: PostCategory[]) => {
      state.loading = true;

      console.log(payload);

      asynchronousEmulation();

      state.loading = false ;      
      return {
        ...state,
        postCategories: payload
      }
    },
    addPostCategory: (state, payload: PostCategory) => {
      return { ...state, postCategories: [...state.postCategories, payload] } 
    },
    selectPostCategory: (state, payload: PostCategory) => {
      return { ...state, postCategory: payload } 
    }
  }
})

export default postCategoriesSignal