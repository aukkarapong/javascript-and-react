import { createActionWithFetching } from "../utils";
import { fetchUsers } from "../api/users";
import aboutModule from "../modules/about";

const getUsers = () => {
  const callAction = async (dispatch) => {
    const params = {};
    const { data } = await fetchUsers(params);

    dispatch(
      aboutModule.set({
        key: "users",
        value: data,
      })
    );
  };

  return createActionWithFetching({
    loadingMessage: "Fetching data..",
    successMessage: "Success",
    callAction,
  });
};

export { getUsers };
