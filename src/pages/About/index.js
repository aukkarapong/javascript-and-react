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

import aboutModule from "../../modules/about";
import validation from "../../utils/validation";
import history from "../../utils/history";

export default () => {
  const dispatch = useDispatch();
  const firstname = useSelector((state) => state.about.firstname);
  const lastname = useSelector((state) => state.about.lastname);
  const email = useSelector((state) => state.about.email);
  const phone = useSelector((state) => state.about.phone);
  const message = useSelector((state) => state.about.message);

  useEffect(() => {}, []);

  // input firstname
  const inputFirstnameIsError = firstname === "";
  const inputFirstnameMessage = firstname === "" ? "This field invalid" : "";

  // input lastname
  const inputLastnameIsError = lastname === "";
  const inputLastnameMessage = lastname === "" ? "This field invalid" : "";

  // input email
  const inputEmailIsErrorRule = () => {
    if (email === "") return true;
    return !validation.isEmail(email);
  };
  const inputEmailIsError = inputEmailIsErrorRule();
  const inputEmailMessageRule = () => {
    if (email === "") return "This field invalid";
    if (validation.isEmail(email) === false) return "invalid email";
    return "";
  };
  const inputEmailMessage = inputEmailMessageRule();

  // input phone
  const inputPhoneIsErrorRule = () => {
    if (phone === "") return true;
    return !validation.isThaiMobile(phone);
  };
  const inputPhoneIsError = inputPhoneIsErrorRule();
  const inputPhoneMessageRule = () => {
    if (phone === "") return "This field invalid";
    if (validation.isThaiMobile(phone) === false) return "invalid phone";
    return "";
  };
  const inputPhoneMessage = inputPhoneMessageRule();

  // input message
  const inputMessageIsError = message === "";
  const inputMessageMessage = message === "" ? "This field invalid" : "";

  // button send
  const isDisableSendBTNRule = () => {
    if (firstname === "") return true;
    if (lastname === "") return true;
    if (email === "") return true;
    if (phone === "") return true;
    if (message === "") return true;
    if (validation.isEmail(email) === false) return true;
    if (validation.isThaiMobile(phone) === false) return true;
    return false;
  };
  const isDisableSendBTN = isDisableSendBTNRule();

  const handleInputOnChange = ({ key, value }) => {
    dispatch(
      aboutModule.set({
        key: key,
        value: value,
      })
    );
  };

  const handleOnClickButtonBack = () => {
    history.push("/");
  };

  return (
    <Style>
      <Container maxWidth={1240}>
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
                value={firstname}
                message={inputFirstnameMessage}
                isRequired
                isError={inputFirstnameIsError}
                onChange={(e) =>
                  handleInputOnChange({
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
                value={lastname}
                message={inputLastnameMessage}
                isRequired
                isError={inputLastnameIsError}
                onChange={(e) =>
                  handleInputOnChange({
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
                value={email}
                message={inputEmailMessage}
                isRequired
                isError={inputEmailIsError}
                onChange={(e) =>
                  handleInputOnChange({
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
                value={phone}
                message={inputPhoneMessage}
                isRequired
                isError={inputPhoneIsError}
                onChange={(e) =>
                  handleInputOnChange({
                    key: "phone",
                    value: e.target.value,
                  })
                }
              />
            </Column>
          </Row>
          <Row>
            <Column D={12}>
              <TextArea
                label="Message"
                placeholder="Text input"
                value={message}
                message={inputMessageMessage}
                isRequired
                isError={inputMessageIsError}
                onChange={(e) =>
                  handleInputOnChange({
                    key: "message",
                    value: e.target.value,
                  })
                }
              />
            </Column>
          </Row>
          <Row className="padding-top-20" justified>
            <Column D={3} M={6}>
              <Button fullwidth onClick={handleOnClickButtonBack}>
                Back
              </Button>
            </Column>
            <Column D={3} M={6}>
              <Button primary fullwidth disabled={isDisableSendBTN}>
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

  .padding-bottom-20 {
    padding-bottom: 20px;
  }
  .padding-top-20 {
    padding-top: 20px;
  }
`;
