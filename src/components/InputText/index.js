import React from 'react'
import Input from 'glud-component/lib/Input'

const InputText = ({ data, onChange }) => (
  <Input {...data} onChange={(e) => onChange(e.target.value)} isError={data.message !== ''} />
)

export default InputText
