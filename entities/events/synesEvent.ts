import SynesPost, { synesPost } from "../post/synesPost";

export type synesEvent = synesPost

class SynesEvent extends SynesPost {
  constructor(payload: synesEvent) {
    super(payload);
  }
}

export default SynesEvent;
