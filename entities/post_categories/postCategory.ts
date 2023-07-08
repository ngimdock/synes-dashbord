export type postCategory = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

class PostCategory {
  private id: string;
  private name: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date; 

  public constructor(payload: postCategory) {
    this.id = payload.id;
    this.name = payload.name;
    this.description = payload.description;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdated(): Date {
    return this.updatedAt;
  }
}

export default PostCategory