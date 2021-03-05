import React from "react";

import { InputText } from "../components";

const renderUIInputField = (fieldData, onChange) => {
  if (fieldData.type === "text")
    return <InputText data={fieldData} onChange={onChange} />;

  return <InputText data={fieldData} onChange={onChange} />;
  /* switch (fieldData.type) {
    case "text":
      return <InputText data={fieldData} onChange={onChange} />;
    default:
      return <InputText data={fieldData} onChange={onChange} />;
  } */
};

export default renderUIInputField;
