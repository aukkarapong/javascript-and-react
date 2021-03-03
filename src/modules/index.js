import { combineReducers } from "redux";

import post from "./post";
import about from "./about";
import aboutV1 from "./about-v1";

export default combineReducers({
  post: post.state,
  about: about.state,
  aboutV1: aboutV1.state,
});
