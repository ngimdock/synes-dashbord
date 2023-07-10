import User from "entities/users/User";

export enum ContributionType {
  Year = "YEAR",
  Member = "MEMBER",
}

type ContributionData = {
  id: string;
  amount: number;
  description?: string;
  type: ContributionType;
  owner: User;
  createdAt: Date;
}

export default class Contribution {
  private _id: string;
  private _amount: number;
  private _description?: string;
  private _type: ContributionType;
  private _owner: User;
  private _createdAt: Date;

  constructor(data: ContributionData) {
    this._id = data.id;
    this._amount = data.amount;
    this._description = data.description;
    this._type = data.type;
    this._owner = data.owner;
    this._createdAt = data.createdAt;
  }

  get id() {
    return this._id;
  }

  get amount() {
    return this._amount;
  }

  get description() {
    return this._description;
  }

  get type() {
    return this._type;
  }

  get owner() {
    return this._owner;
  }

  get createdAt() {
    return this._createdAt;
  }
}