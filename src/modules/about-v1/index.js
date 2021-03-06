import { createModule } from "redux-modux";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  message: "",
};

const setPosts = (state, action) => ({
  ...state,
  list: action.list,
});

const handlers = {
  setPosts,
};

export default createModule({ moduleName: "about-v1", initialState, handlers });
