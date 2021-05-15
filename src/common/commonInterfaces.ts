import { ICustomer, IOrder, IModel, ICategory } from "./commonClasses";
import { idType, SendType } from "./enumTypes";

export interface IFrontHandler {
  pushCustomer(cust: ICustomer): void;
  pushOrder(IOrder: IOrder): void;
  pushModel(model: IModel): void;
  pushCategory(cat: ICategory): void;
  idChecked(data: Map<idType, boolean>, type: SendType): void;
}
