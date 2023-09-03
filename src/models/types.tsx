export enum typeEnum {
  radio = "radio",
  text = "text",
  number = "number",
  checkbox = "checkbox"
}

export enum TypeCategory {
  FINANCE = "Finance",
  RRHH = "RRHH",
  OPERATIONS = "Operations",
  ESTRATEGY = "Estrategy"
}

export interface FeedbackType {
  max: number;
  min: number;
  longFeedback: string[];
  shortFeedback: string[];
}

export interface CategoryEnum {
  feedback: string[];
  name: TypeCategory;
}

export interface OptionsType {
  _id: string;
  name: string;
  points: number;
}

export interface IQuestion {
  _id: string;
  type: typeEnum;
  question_text: string;
  placeholder: string;
  category: CategoryEnum;
  options: OptionsType[];
}

export interface QuestionComponentProps {
  questionList: IQuestion[];
  idForm: string;
}

export interface AnswerType {
  answer: string[];
  question_text: string;
}

export interface Submission {
  form: string;
  answers: AnswerType[];
}

export interface Feedback {
  submissionId: string;
  global: {
    points: number;
    maxPoints: number;
    globalFeedback: string[];
  };
  categories: CategoryData[];
}

export interface CategoryData {
  name: string;
  points: number;
  maxPoints: number;
  feedback: {
    shortText: string[];
    longText: string[];
  };
}

export interface InfoContextData {
  userMail: string;
  submissionId: string;
  feedback: Feedback;
  setSubmissionId: (submissionId: string) => void;
  setUserMail: (userMail: string) => void;
  setFeedback: (feedback: Feedback) => void;
}

export interface ButtonProps {
  text: string;
  color?: "primary" | "secondary";
  disabled?: boolean;
  onClick: () => void;
  type?: "next" | "previous" | "finish";
}

export interface GlobalProps {
  global: {
    maxPoints: number;
    points: number;
    globalFeedback: string[];
  };
}

export interface CategoryProps {
  name: string;
  points: number;
  maxPoints: number;
  feedback: {
    shortText: string[];
    longText: string[];
  };
}

export interface SelectButtonProps {
  name: string;
  type: typeEnum;
  value: string;
  isChecked: boolean | undefined;
  onChange: () => void;
}

export interface InputProps {
  question: IQuestion;
  value: string;
  onChange: (id: string, value: string) => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
