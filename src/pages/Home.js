import { useDispatch, useSelector } from "react-redux";
import Button from "glud-component/lib/Button";
import React, { useEffect, useCallback } from "react";
import styled from "@emotion/styled";

import { getPostList } from "../actions/action";
import { useStateLoading } from "../hooks";
import Demo from "../components/Demo";
import history from "../utils/history";

export default () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.list);
  const [loading, callAction] = useStateLoading(["getPost"]);

  const getPost = useCallback(() => {
    callAction("getPost", () => dispatch(getPostList()));
  }, [callAction, dispatch]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  console.log("Posts", posts);
  console.log("ENV", process.env);
  console.log("Loading", loading);

  // const handleOnClickGotoAboutPageBTN = () => {
  //   history.push("/about");
  // };

  const handleGotoAblutPageV1 = () => {
    history.push("/about-v1");
  };

  return (
    <Style>
      <Demo name="React" />
      <Button loading={loading.getPost} onClick={getPost}>
        Get Posts
      </Button>

      <Button onClick={handleGotoAblutPageV1}>goto about page v1</Button>

      {/* <Button loading={loading.getPost} onClick={handleOnClickGotoAboutPageBTN}>
        Go to About Page
      </Button> */}
    </Style>
  );
};

const Style = styled("div")`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
