import renderUIInputField from "../../utils/renderUIInputField";
import aboutModule from "../../modules/about";
import validation from "../../utils/validation";

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
    lastname: {
      name: "lastname",
      type: "input",
      label: "Lastname",
      placeholder: "- Please Enter -",
      value: state.about.lastname,
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
    phone: {
      name: "phone",
      type: "input",
      label: "Phone",
      placeholder: "- Please Enter -",
      value: state.about.phone,
      disabled: false,
      isRequired: true,
      rules: [
        {
          message: "ระบุข้อมูล",
          rule: (value) => value !== "",
        },
        {
          message: "หมายเลขโทรศัพท์ไม่ถูกต้อง",
          rule: (value) => validation.isThaiMobile(value),
        },
      ],
    },
    message: {
      name: "message",
      type: "textarea",
      label: "Message",
      placeholder: "- Please Enter -",
      value: state.about.message,
      disabled: false,
      isRequired: true,
      rules: [
        {
          message: "ระบุข้อมูล",
          rule: (value) => value !== "",
        },
      ],
    },
  };
  return Object.assign(theForm);
};

const inputOnlyNumberField = ["phone"];

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
