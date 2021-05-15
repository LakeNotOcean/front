import { ICustomer, IOrder, IModel, ICategory } from "./commonClasses";
import { idType, SendType } from "./enumTypes";

export interface IFrontHandler {
  notifyPushCustomer(cust: ICustomer): void;
  notifyPushOrder(IOrder: IOrder): void;
  notifyPushModel(model: IModel): void;
  notifyPushCategory(cat: ICategory): void;
  idCheck(data: Map<idType, boolean>, type: SendType): void;
}
