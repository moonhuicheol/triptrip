import { FieldValues, useFormContext } from "react-hook-form";
import { IFormInputProps } from "./inputProps";

export default function FormInput<F extends FieldValues>({
  className,
  type,
  placeholder,
  keyname,
}: IFormInputProps<F>) {
  const { register } = useFormContext<F>();
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      {...register(keyname)}
    />
  );
}
