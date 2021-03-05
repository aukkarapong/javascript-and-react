import React from "react";
import TextArea from "glud-component/lib/TextArea";

const InputTextArea = ({ data, onChange }) => (
  <TextArea
    {...data}
    onChange={(e) => onChange(e.target.value)}
    isError={data.message !== ""}
  />
);

export default InputTextArea;
