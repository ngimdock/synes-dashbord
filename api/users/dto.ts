export enum Sexe {
  Male = "male",
  Female = "female",
}

export type CreateUserDto = {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  specialization: string;
  sexe: Sexe;
  memberAt: Date;
  establishmentId: string;
};
