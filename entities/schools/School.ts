type SchoolData = {
  id: string;
  name: string;
  address: string;
}

export default class School {
  private _id: string;
  private _name: string;
  private _address: string;

  constructor(data: SchoolData) {
    this._id = data.id;
    this._name = data.name;
    this._address = data.address;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }
}