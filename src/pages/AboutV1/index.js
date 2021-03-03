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

export default () => {
  const dispatch = useDispatch();

  const firstname = useSelector((state) => state.aboutV1.firstname);
  const lastname = useSelector((state) => state.aboutV1.lastname);
  const email = useSelector((state) => state.aboutV1.email);
  const phone = useSelector((state) => state.aboutV1.phone);
  const message = useSelector((state) => state.aboutV1.message);

  useEffect(() => {}, []);

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

  // input firstname
  const isErrorInputFirstname = firstname === "";
  const isErrorInputFirstnameMessage =
    firstname === "" ? "This field invalid" : "";

  // input lastname
  const isErrorInputLastname = lastname === "";
  const isErrorInputLastnameMessage =
    firstname === "" ? "This field invalid" : "";

  // input email
  const isErrorInputEmailRule = () => {
    if (email === "") return true;
    return !validation.isEmail(email);
  };
  const isErrorInputEmail = isErrorInputEmailRule();
  const isErrorInputEmailMessageRule = () => {
    if (email === "") return "This field invalid";
    if (validation.isEmail(email) === false) return "invalid email";
    return "";
  };
  const isErrorInputEmailMessage = isErrorInputEmailMessageRule();

  // input phone
  const isErrorInputPhoneRule = () => {
    if (phone === "") return true;
    return !validation.isThaiMobile(phone);
  };
  const isErrorInputPhone = isErrorInputPhoneRule();
  const isErrorInputPhoneMessageRule = () => {
    if (phone === "") return "This field invalid";
    if (validation.isThaiMobile(phone) === false) return "invalid phone";
    return "";
  };
  const isErrorInputPhoneMessage = isErrorInputPhoneMessageRule();

  // input message
  const isErrorInputMessage = message === "";
  const isErrorInputMessageMessage = message === "" ? "This field invalid" : "";

  // button send
  const isDisabledSendBTNRule = () => {
    if (firstname === "") return true;
    if (lastname === "") return true;
    if (email === "") return true;
    if (phone === "") return true;
    if (message === "") return true;
    if (validation.isEmail(email) === false) return true;
    if (validation.isThaiMobile(phone) === false) return true;
    return false;
  };
  const isDisabledSendBTN = isDisabledSendBTNRule();

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
              <Input
                label="Firstname"
                placeholder="Text input"
                message={isErrorInputFirstnameMessage}
                isRequired
                isError={isErrorInputFirstname}
                value={firstname}
                onChange={(e) =>
                  handleOnChangeInput({
                    key: "firstname",
                    value: e.target.value,
                  })
                }
              />
            </Column>
            <Column D={6} M={12}>
              <Input
                label="Lastname"
                placeholder="Text input"
                message={isErrorInputLastnameMessage}
                isRequired
                isError={isErrorInputLastname}
                value={lastname}
                onChange={(e) =>
                  handleOnChangeInput({
                    key: "lastname",
                    value: e.target.value,
                  })
                }
              />
            </Column>
          </Row>
          <Row>
            <Column D={6} M={12}>
              <Input
                label="Email"
                placeholder="Text input"
                message={isErrorInputEmailMessage}
                isRequired
                isError={isErrorInputEmail}
                value={email}
                onChange={(e) =>
                  handleOnChangeInput({
                    key: "email",
                    value: e.target.value,
                  })
                }
              />
            </Column>
            <Column D={6} M={12}>
              <Input
                label="Phone"
                placeholder="Text input"
                message={isErrorInputPhoneMessage}
                isRequired
                isError={isErrorInputPhone}
                value={phone}
                onChange={(e) =>
                  handleOnChangeInput({
                    key: "phone",
                    value: e.target.value,
                  })
                }
              />
            </Column>
          </Row>
          <Row>
            <Column D={12} M={12}>
              <TextArea
                label="Message"
                placeholder="Text input"
                message={isErrorInputMessageMessage}
                isRequired
                isError={isErrorInputMessage}
                value={message}
                onChange={(e) =>
                  handleOnChangeInput({
                    key: "message",
                    value: e.target.value,
                  })
                }
              />
            </Column>
          </Row>
          <Row className="padding-top-20" justified>
            <Column D={3} M={6}>
              <Button fullwidth onClick={gotoHomePage}>
                Back
              </Button>
            </Column>
            <Column D={3} M={6}>
              <Button primary fullwidth disabled={isDisabledSendBTN}>
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
