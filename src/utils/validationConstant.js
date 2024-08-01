export const emailValidation = [
  { required: true, message: "Please Enter Email" },
  {
    pattern: /^[a-zA-Z0-9]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/,
    message: "Enter Valid Email",
  },
];

export const confirmPasswordValidation = [
  { required: true, message: "Please Enter Password" },
  { length: 6, message: "Password Must be 6 char" },
];

export const passwordValidation = [
  ...confirmPasswordValidation,
  { pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/, message: "Enter Valid Password" },
];

const examValidationData = (requireMsg,validMsg) => {
  return [
    { required: true, message: requireMsg },
    { pattern: /^([a-zA-Z0-9]+\s?)*\S$/, message: validMsg },
  ]
}
export const nameValidation = [...examValidationData("Please Enter Name","Enter Valid Name or Space not allowed"),{ length: 3, message: "username Must be 3 char" }]

const opRequireMsg = 'Option Required'
const opValidMsg = 'Enter Valid Option'

const createOptionsValidation = (numOptions) => {
  const optionsValidation = {};
  for (let i = 1; i <= numOptions; i++) {
    optionsValidation[`op${i}`] = examValidationData(opRequireMsg,opValidMsg);
  }
  return optionsValidation;
};

export const examValidation = {
  subjectName: examValidationData('Please Enter Subject','Enter Valid Subject'),
  question: examValidationData('Please Enter Question','Enter Valid Question'),
  ...createOptionsValidation(4),
  answer: [{ required: true, message: "Answer Required" }],
};

