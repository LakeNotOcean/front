import { Customer, Order, Item, Category } from "./commonClasses";

export interface IDataBaseController {
  notifyPushCustomer(cust: Customer): void;
  notifyPushOrder(order: Order): void;
  //notifyGetOrderInfo(orderId: number): void;
  //notifyGetItemInfo(itemId: number): void;
  //notifyGetListOfItems(): void;
  //notifyGetCustomerOrders(custId: number): void;
  notifyGetListOfCustomers(): void;
  notifyGetIdOfCustomers(): void;
  notifyGetIdOfModels(): void;
  notifyGetIdOfOrders(): void;
}

export interface IView {
  //updateOrderInfo(order: Order): void;
  //updateItemInfo(item: Item): void;
  //updateListOfItems(items: Array<Item>): void;
  //updateCustomerOrders(orders: Array<Order>): void;
  updateIdOfCustomers(data: Set<number>): void;
  updateIdOfOrders(data: Set<number>): void;
  updateIdOfModels(data: Set<number>): void;
  updateCustomers(data: Array<Customer>): void;
  updateCategories(data: Array<Category>): void;
}
