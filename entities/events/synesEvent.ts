export type synesEvent = {
  description: string;
  photo: string;
  file: string;
  createdAt: Date
};

class SynesEvent {
  private description: string;
  private file: string;
  private photo: string;
  private createdAt: Date; 

  public constructor(payload: synesEvent) {
    this.description = payload.description;
    this.file = payload.file;
    this.photo = payload.photo;
    this.createdAt = payload.createdAt;
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
}

export default SynesEvent;
