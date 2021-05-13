import { Customer, Order, Item, Category } from "./commonClasses";
import { NotifyType } from "./enumTypes";

export interface IDataBaseController {
  notifyPushCustomer(cust: Customer): void;
  notifyPushOrder(order: Order): void;
  notifyPushModel(model: Item): void;
  notifyPushCategory(cat: Category): void;
  //notifyGetOrderInfo(orderId: number): void;
  //notifyGetItemInfo(itemId: number): void;
  //notifyGetListOfItems(): void;
  //notifyGetCustomerOrders(custId: number): void;
  // notifyGetListOfCustomers(): void;
  // notifyGetIdOfCustomers(): void;
  // notifyGetIdOfModels(): void;
  // notifyGetIdOfOrders(): void;
  notify(notifies: Array<NotifyType>): void;
}

export interface IView {
  //updateOrderInfo(order: Order): void;
  //updateItemInfo(item: Item): void;
  //updateListOfItems(items: Array<Item>): void;
  //updateCustomerOrders(orders: Array<Order>): void;
  updateId(data: Set<number>, type: NotifyType): void;
}
