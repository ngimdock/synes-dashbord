import SynesPost, { synesPost } from "../post/synesPost";

export type synesComplain = synesPost;

class SynesComplain extends SynesPost {
  constructor(payload: synesComplain) {
    super(payload);
  }
}

export default SynesComplain;
