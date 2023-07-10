import SynesPost, { synesPost } from "../post/synesPost";

export type synesCommunique = synesPost;

class Communique extends SynesPost {
  constructor(payload: synesCommunique) {
    super(payload);
  }
}

export default Communique;
