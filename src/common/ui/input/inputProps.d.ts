import { HTMLInputTypeAttribute } from "react";

interface IFormInputProps<I> {
  className?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  keyname?: Path<I>;
  defaultValue?: string | undefined;
  disabled?: boolean;
}
