import { Formattable } from "./Formattable";

export class Customer extends Formattable {
  constructor(
    private _id: number,
    private _firstName: string = "None",
    private _lastName: string = "None",
    private _birthDate: string = "01/01/1900",
    private _location: string = "Karaganda"
  ) {
    super();
  }

  get firstName(): string {
    return this._firstName;
  }
  get lastName(): string {
    return this._lastName;
  }
  get birthDate(): string {
    return this._birthDate;
  }
  get location(): string {
    return this._location;
  }
  get id(): number {
    return this._id;
  }

  set firstName(str: string) {
    this._firstName = str;
  }
  set lastName(str: string) {
    this._lastName = str;
  }
  set birthDate(str: string) {
    this._birthDate = str;
  }
  set location(str: string) {
    this._location = str;
  }
}

export class Item extends Formattable {
  constructor(
    private _id: number,
    private _name: string = "None",
    private _price: number = 0,
    private _categoryId: number,
    private _storage: number
  ) {
    super();
  }

  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get categoryId(): number {
    return this._categoryId;
  }
  get price(): number {
    return this._price;
  }

  set name(str: string) {
    this._name = str;
  }
  set categoryId(n: number) {
    this._categoryId = n;
  }
  set price(n: number) {
    this._price = n;
  }
}

export class Category extends Formattable {
  constructor(private _id: number, private _name: string = "None") {
    super();
  }
  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  set name(str: string) {
    this._name = str;
  }
}

export class Order extends Formattable {
  private _sum: number;
  constructor(
    private _orderId: number,
    private _custId: number,
    private _items: number,
    private _orderDate: string = "None",
    private _deliveryDate: string = "None",
    private _delivery: string = "None"
  ) {
    super();
    this._sum = 0;
  }
  // pushItem(item: Item): void {
  //   this._items.push(Object.assign({}, item));
  //   this._sum += item.price;
  // }
  get sum(): number {
    return this._sum;
  }
  get ordDate(): string {
    return this._orderDate;
  }
  get delDate(): string {
    return this._deliveryDate;
  }
  get del(): string {
    return this._delivery;
  }
}
