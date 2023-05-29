type post = {
  description: string;
  photo: string;
  file: string;
};

class Post {
  private description: string;
  private file: string;
  private photo: string;

  public constructor(payload: post) {
    this.description = payload.description;
    this.file = payload.file;
    this.photo = payload.photo;
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
}

export default Post;
