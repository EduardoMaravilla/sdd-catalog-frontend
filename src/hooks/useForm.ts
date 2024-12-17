import { ChangeEvent, useState } from "react";

export const useForm = <T>(initialForm: T) => {
  const [formState, setFormState] = useState<T>(initialForm);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newValue = value.trimStart();
    const newValue2 = newValue.replace(/\s+/g, ' ');
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: newValue2,
    }));
  };

  const resetForm = () => {
    setFormState(initialForm);
  };

  return { formState, onInputChange, resetForm };
};
