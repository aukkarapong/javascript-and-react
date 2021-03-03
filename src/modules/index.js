import { combineReducers } from "redux";

import post from "./post";
import about from "./about";

export default combineReducers({
  post: post.state,
  about: about.state,
});
