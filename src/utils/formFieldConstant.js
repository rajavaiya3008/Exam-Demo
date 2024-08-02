
export const createInputField = (type, id, name, label) => {
  return {
    type,
    id,
    name,
    label,
  };
};

export const createDropDownField = (type,style,dropDownOptions,name) => {
  return {
    type,
    style,
    dropDownOptions,
    name,
  }
}