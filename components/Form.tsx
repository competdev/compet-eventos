import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

enum Role {
  visitor = "visitor",
  competitor = "competitor",
}
export interface FormInput {
  name: String;
  email: String;
  cellphone: String;
  registration: String;
  role: Role;
};

const schema = yup
  .object({
    name: yup.string().required("Insira seu nome").min(3, "Nome muito curto"),
    email: yup.string().email("Email invalido").required("Insira seu email"),
    cellphone: yup
      .string()
      .required("Insira seu número de celular com DDD")
      .matches(
        /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}\b/,
        "Número de celular inválido"
      ),
    registration: yup.string().required("Insira seu número de matrícula"),
    role: yup.string().required("Insira seu papel no evento"),
  })
  .required();

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="mt-3 grid grid-cols-2 gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-span-2 mb-5">
        <label className="label">
          <span className="label-text">Seu nome</span>
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
          <span className="label-text">Seu email</span>
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
          <span className="label-text">Seu número de celular</span>
        </label>
        <input
          type="text"
          placeholder="3199999999"
          className="input input-bordered w-full"
          {...register("cellphone")}
        />
        <p className="mt-2 text-error">{errors.cellphone?.message}</p>
      </div>

      <div className="mb-5">
        <label className="label">
          <span className="label-text">Sua matrícula</span>
        </label>
        <input
          type="text"
          placeholder="Matrícula"
          className="input input-bordered w-full"
          {...register("registration")}
        />
        <p className="mt-2 text-error">{errors.registration?.message}</p>
      </div>

      <div className="col-span-2 mb-5">
        <label className="label">
          <span className="label-text">Seu papel no evento</span>
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
