import { combineReducers } from "redux";

import post from "./post";
import aboutV1 from "./about-v1";

export default combineReducers({
  post: post.state,
  aboutV1: aboutV1.state,
});
