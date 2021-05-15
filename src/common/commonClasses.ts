export interface ICustomer {
  id_customer: number;
  fname: string;
  lname: string;
  date_of_birth: string;
  location: string;
}

export interface IModel {
  id_model: number;
  name: string;
  price: number;
  category: number;
  storage: number;
}

export interface IOrder {
  id_order: number;
  customer: number;
  type: number;
  date_of_order: string;
  date_of_delivery: string;
  delivery_type: string;
}

export interface ICategory {
  id_category: number;
  name: string;
}
