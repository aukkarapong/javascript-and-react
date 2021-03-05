import { combineReducers } from "redux";

import post from "./post";
import aboutV1 from "./about-v1";
import about from "./about";

export default combineReducers({
  post: post.state,
  aboutV1: aboutV1.state,
  about: about.state,
});
