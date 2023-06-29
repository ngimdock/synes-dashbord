export type synesComplain = {
  content: string;
  photo: string[];
  file: string[];
  createdAt: Date,
  updatedAt: Date,
};

class SynesComplain {
  private content: string;
  private file: string[];
  private photo: string[];
  private createdAt: Date; 
  private updatedAt: Date; 

  public constructor(payload: synesComplain) {
    this.content = payload.content;
    this.file = payload.file;
    this.photo = payload.photo;
    this.createdAt = payload.createdAt;
    this.updatedAt = payload.updatedAt;
  }

  public getContent(): string {
    return this.content;
  }

  public getPhoto(): string[] {
    return this.photo;
  }

  public getFile(): string[] {
    return this.file;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public geUpdatedAt(): Date {
    return this.updatedAt;
  }
}

export default SynesComplain;
