import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FormInput } from "../types";
import InputMask, { Props } from "react-input-mask";

const schema = yup
  .object({
    name: yup.string().required("Insira seu nome").min(3, "Nome muito curto"),
    email: yup.string().email("Email invalido").required("Insira seu email"),
    cellphone: yup
      .string()
      .required("Insira seu número de celular com DDD")
      .matches(
        /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/,
        "Número de celular inválido"
      ),
    registration: yup.string(),
    role: yup.string().required("Insira seu papel no evento"),
  })
  .required();

const Form: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    // console.log(data);
    const res = await axios.post("/api/form", data);
    // console.log(res);
  };

  return (
    <form
      className="mt-3 grid grid-cols-2 gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-2 mb-5">
        <label className="label">
          <span className="label-text text-white">Seu nome</span>
        </label>
        <input
          type="text"
          placeholder=""
          className="input input-bordered w-full"
          {...register("name")}
        />
        <p className="mt-2 text-error">{errors.name?.message}</p>
      </div>

      <div className="col-span-2 mb-5">
        <label className="label">
          <span className="label-text text-white">Seu email</span>
        </label>
        <input
          type="email"
          placeholder="usuario@gmail.com"
          className="input input-bordered w-full"
          {...register("email")}
        />
        <p className="mt-2 text-error">{errors.email?.message}</p>
      </div>
      <div className="mb-5">
        <label className="label">
          <span className="label-text text-white">Seu número de celular</span>
        </label>
        <Controller
          name="cellphone"
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => (
            <InputMask
              className="input input-bordered w-full"
              mask="(99) 99999-9999"
              onBlur={onBlur}
              onChange={onChange}
              inputRef={ref}
              maskChar=" "
            />
          )}
        />
        <p className="mt-2 text-error">{errors.cellphone?.message}</p>
      </div>

      <div className="mb-5">
        <label className="label">
          <span className="label-text text-white">Sua matrícula</span>
        </label>
        <input
          type="text"
          placeholder="20213007777"
          className="input input-bordered w-full"
          {...register("registration")}
        />
        <p className="mt-2 text-error">{errors.registration?.message}</p>
      </div>

      <div className="col-span-2 mb-5">
        <label className="label">
          <span className="label-text text-white">Seu papel no evento</span>
        </label>
        <select className="select select-bordered w-full" {...register("role")}>
          <option>Visitante</option>
          <option>Competidor</option>
        </select>
        <p className="mt-2 text-error">{errors.role?.message}</p>
      </div>

      <button className="btn btn-primary col-span-2" type="submit">
        Enviar respostas
      </button>
    </form>
  );
};

export default Form;
