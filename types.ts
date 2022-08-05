enum Role {
  visitor = "visitor",
  competitor = "competitor",
}

export interface FormInput {
  name: string;
  email: string;
  cellphone: string;
  registration: string;
  role: Role;
}
