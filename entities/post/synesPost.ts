import User from "../../entities/users/User";

export type synesPost = {
  description: string;
  photos: string[];
  files: string[];
  programDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  owner: User;
};

abstract class SynesPost {
  private description: string;
  private files: string[];
  private photos: string[];
  private createdAt: Date;
  private programDate?: Date;
  private updatedAt: Date;
  private owner: User;

  public constructor(payload: synesPost) {
    this.description = payload.description;
    this.files = payload.files;
    this.photos = payload.photos;
    this.programDate = payload.programDate;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
    this.owner = payload.owner;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPhotos(): string[] {
    return this.photos;
  }

  public getFiles(): string[] {
    return this.files;
  }

  public getProgramDate(): Date | undefined {
    return this.programDate;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getOwner(): User {
    return this.owner;
  }
}

export default SynesPost;
