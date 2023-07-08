export type synesPost = {
  description: string;
  photos: string;
  files: string;
  programDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

abstract class SynesPost {
  private description: string;
  private files: string;
  private photos: string;
  private createdAt: Date;
  private programDate: Date;
  private updatedAt: Date;

  public constructor(payload: synesPost) {
    this.description = payload.description;
    this.files = payload.files;
    this.photos = payload.photos;
    this.programDate = payload.programDate;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPhoto(): string {
    return this.photos;
  }

  public getFile(): string {
    return this.files;
  }

  public getProgramDate(): Date {
    return this.programDate;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdated(): Date {
    return this.updatedAt;
  }
}

export default SynesPost;
