import renderUIInputField from "../../utils/renderUIInputField";
import aboutModule from "../../modules/about";
import validation from "../../utils/validation";
// import setDateValue from "../../../utils/setDateValue";

const formData = (state) => {
  let theForm = {
    firstname: {
      name: "firstname",
      type: "input",
      label: "Firstname",
      placeholder: "- Please Enter -",
      value: state.about.firstname,
      disabled: false,
      isRequired: true,
      rules: [
        {
          message: "ระบุข้อมูล",
          rule: (value) => value !== "",
        },
      ],
    },
    email: {
      name: "email",
      type: "input",
      label: "Email",
      placeholder: "- Please Enter -",
      value: state.about.email,
      disabled: false,
      isRequired: true,
      rules: [
        {
          message: "ระบุข้อมูล",
          rule: (value) => value !== "",
        },
        {
          message: "อีเมล์ไม่ถูกต้อง",
          rule: (value) => validation.isEmail(value),
        },
      ],
    },
  };
  return Object.assign(theForm);
};

const inputOnlyNumberField = ["firstname"];

const action = ({ key, value }) => (dispatch, getState) => {
  if (inputOnlyNumberField.includes(key)) {
    if (!validation.isNumber(value)) {
      return false;
    }
  }

  dispatch(aboutModule.set({ key, value }));
};

const options = {
  action,
  formData,
  renderUIInputField,
};

export default {
  options,
};
