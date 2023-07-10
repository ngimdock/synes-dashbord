export type CreatePostDto = {
  description: string;
  programDate?: Date;
  files?: string[];
  categoryId: string;
};
