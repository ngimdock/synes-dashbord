export type synesCommunique = {
  description: string;
  photo: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
};

class Communique {
  private description: string;
  private file: string;
  private photo: string;
  private createdAt: Date;
  private updatedAt: Date;

  public constructor(payload: synesCommunique) {
    this.description = payload.description;
    this.file = payload.file;
    this.photo = payload.photo;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }

  public getDesciption(): string {
    return this.description;
  }

  public getPhoto(): string {
    return this.photo;
  }

  public getFile(): string {
    return this.file;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdated(): Date {
    return this.updatedAt;
  }
}

export default Communique;
