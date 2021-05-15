import { Customer, Order, Item, Category } from "./commonClasses";
import { idType, SendType } from "./enumTypes";

export interface IFrontHandler {
  notifyPushCustomer(cust: Customer): void;
  notifyPushOrder(order: Order): void;
  notifyPushModel(model: Item): void;
  notifyPushCategory(cat: Category): void;
  idCheck(data: Map<idType, boolean>, type: SendType): void;
}
