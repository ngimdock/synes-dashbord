export type CreatePostDto = {
  description: string;
  programDate?: Date;
  createdAt: Date;
  files?: string[];
  categoryId: string;
};
