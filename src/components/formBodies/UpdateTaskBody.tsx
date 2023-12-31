"use client";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";

interface UpdateTaskBodyProps {
  register: UseFormRegister<any>;
  formState: FormState<FieldValues>;
}

const UpdateTaskBody = ({ register, formState }: UpdateTaskBodyProps) => {
  const { errors } = formState;

  return (
    <div className="flex flex-col h-full w-full gap-4 text-zinc-100">
      <div className="h-svh">
        <textarea
          {...register("description")}
          className="h-full"
          placeholder="Descrição"
        />
        <p className="text-sm">{errors.title?.message as string}</p>
      </div>
    </div>
  );
};

export default UpdateTaskBody;
