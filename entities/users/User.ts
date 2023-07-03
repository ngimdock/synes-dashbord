import Contribution from "entities/contributions/Contribution";

enum Sexe {
  MALE = "male",
  FEMALE = "female",
}

type UserData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  sexe: Sexe;
  specialization: string;
  memberAt: Date;
  contributions: Contribution[];
};

export default class User {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _name: string;
  private _email: string;
  private _avatar: string;
  private _phone: string;
  private _sexe: Sexe;
  private _specialization: string;
  private _memberAt: Date;
  private _contributions: Contribution[];

  constructor(data: UserData) {
    this._id = data.id;
    this._createdAt = data.createdAt;
    this._updatedAt = data.updatedAt;
    this._name = data.name;
    this._email = data.email;
    this._avatar = data.avatar;
    this._phone = data.phone;
    this._sexe = data.sexe;
    this._specialization = data.specialization;
    this._memberAt = data.memberAt;
    this._contributions = data.contributions;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get avatar(): string {
    return this._avatar;
  }

  get phone(): string {
    return this._phone;
  }

  get sexe(): Sexe {
    return this._sexe;
  }

  get specialization(): string {
    return this._specialization;
  }

  get memberAt(): Date {
    return this._memberAt;
  }

  get contributions(): Contribution[] {
    return this._contributions;
  }
}
