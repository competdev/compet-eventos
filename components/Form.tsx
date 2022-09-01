import { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FormInput } from "../types";
import InputMask from "react-input-mask";

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
    course: yup.string().required("Insira o nome do curso").min(5, "Curso muito curto"),
    pet: yup.string().required("Insira o sigla do seu PET"),
    unity: yup.string().required("Escolha a unidade em que você estuda"),
  })
  .required();

const Form: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const res = await axios.post("/api/form", data);
    if (res.status == 200) {
      alert("Formulário enviado com sucesso!");
    } else {
      alert("Erro ao enviar formulário");
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col mt-24">
      <header className="font-bold text-center text-[#19DD39] text-xl mb-5">
        <p>Workshop - Desenvolvimento de jogos da nova</p>
        <p>geração para o ambiente de realidade virtual.</p>
      </header>
      <form
        className="grid grid-cols-3 gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-3">
          <label className="label">
            <span className="label-text text-white text-xl">Nome Completo</span>
          </label>
          <input
            type="text"
            placeholder="Anthony Roberto Santos"
            className="input input-bordered w-full"
            {...register("name")}
          />
          <p className="mt-2 text-error">{errors.name?.message}</p>
        </div>

        <div className="col-span-2">
          <label className="label">
            <span className="label-text text-white text-xl">Email</span>
          </label>
          <input
            type="email"
            placeholder="usuario@gmail.com"
            className="input input-bordered w-full"
            {...register("email")}
          />
          <p className="mt-2 text-error">{errors.email?.message}</p>
        </div>

        <div className="col-span-1">
          <label className="label">
            <span className="label-text text-white text-xl">Celular</span>
          </label>
          <Controller
            name="cellphone"
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => (
              <InputMask
                placeholder="(99) 99999-9999"
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

        <div className="col-span-1">
          <label className="label">
            <span className="label-text text-white text-xl">Grupo PET</span>
          </label>
          <input
            type="text"
            placeholder="COMPET"
            className="input input-bordered w-full"
            {...register("pet")}
          />
          <p className="mt-2 text-error">{errors.unity?.message}</p>
        </div>

        <div className="col-span-2">
          <label className="label">
            <span className="label-text text-white text-xl">Campus</span>
          </label>
          <select className="select select-bordered w-full" {...register("unity")}>
            <option>Nova Gameleira</option>
            <option>Nova Suíça</option>
            <option>Araxá</option>
            <option>Contagem</option>
            <option>Curvelo</option>
            <option>Divinopolis</option>
            <option>Leopoldina</option>
            <option>Nepomuceno</option>
            <option>Timóteo</option>
            <option>Varginha</option>
          </select>
          <p className="mt-2 text-error">{errors.unity?.message}</p>
        </div>

        <div className="col-span-3">
          <label className="label">
            <span className="label-text text-white text-xl">Curso</span>
          </label>
          <input
            type="text"
            placeholder="Engenharia de Computação"
            className="input input-bordered w-full"
            {...register("course")}
          />
          <p className="mt-2 text-error">{errors.course?.message}</p>
        </div>

        <button className="btn btn-primary col-span-3 justify-self-center" type="submit">
          Enviar respostas
        </button>
      </form>
    </div>

  );
};

export default Form;
