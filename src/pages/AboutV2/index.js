import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import styled from "@emotion/styled";

import Container from "glud-component/lib/Container";
import Box from "glud-component/lib/Box";
import Row from "glud-component/lib/Row";
import Column from "glud-component/lib/Column";
import Title from "glud-component/lib/Title";
import Input from "glud-component/lib/Input";
import TextArea from "glud-component/lib/TextArea";
import Button from "glud-component/lib/Button";

import history from "../../utils/history";
import aboutV1Module from "../../modules/about-v1";
import validation from "../../utils/validation";

import { useReduxFormCC } from "redux-form-cc";
import formElement from "./formElement";

export default () => {
  const dispatch = useDispatch();

  const firstname = useSelector((state) => state.aboutV1.firstname);
  const lastname = useSelector((state) => state.aboutV1.lastname);
  const email = useSelector((state) => state.aboutV1.email);
  const phone = useSelector((state) => state.aboutV1.phone);
  const message = useSelector((state) => state.aboutV1.message);

  useEffect(() => {}, []);

  const { form, firstError } = useReduxFormCC(formElement.options);

  const gotoHomePage = () => {
    history.push("/");
  };

  const handleOnChangeInput = ({ key, value }) => {
    dispatch(
      aboutV1Module.set({
        key,
        value,
      })
    );
  };

  return (
    <Style>
      <Container>
        <Box className="bg-red">
          <Row>
            <Column D={12}>
              <Title className="padding-bottom-20">Title Heading</Title>
            </Column>
          </Row>
          <Row>
            <Column D={6} M={12}>
              {form.firstname}
            </Column>
            <Column D={6} M={12}>
              {form.lastname}
            </Column>
          </Row>
          <Row>
            <Column D={6} M={12}>
              {form.email}
            </Column>
            <Column D={6} M={12}>
              {form.phone}
            </Column>
          </Row>
          <Row>
            <Column D={12} M={12}>
              {form.message}
            </Column>
          </Row>
          <Row className="padding-top-20" justified>
            <Column D={3} M={6}>
              <Button fullwidth onClick={gotoHomePage}>
                Back
              </Button>
            </Column>
            <Column D={3} M={6}>
              <Button primary fullwidth disabled={firstError !== ""}>
                Send
              </Button>
            </Column>
          </Row>
        </Box>
      </Container>
    </Style>
  );
};

const Style = styled("div")`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .bg-red {
    /* background-color: red;
    color: white; */
  }

  .padding-top-20 {
    padding-top: 20px;
  }
`;
