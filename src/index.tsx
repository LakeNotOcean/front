
import { Category, Customer, Order,Item } from './common/commonClasses';
import { IDataBaseController, IView, } from './common/commonInterfaces';
import { NotifyType } from './common/enumTypes';
import {frontClass} from './frontClass';



class TestDataBaseController implements IDataBaseController{

    private _dataBase:TestDataBase;
    constructor(dataBase:TestDataBase){
        this._dataBase=dataBase;
    }
    notifyPushCustomer(cust: Customer): void{
        console.log("customer was pushed");
    }
    notifyPushOrder(order: Order): void{
        console.log("order was pushed");
    }
    notifyPushModel(model:Item):void{
        console.log("model was pushed");
    }
    notifyPushCategory(cat:Category):void{
        console.log("category was pushed");
    }
    notify(notifies:Array<NotifyType>): void{
        for (let i=0; i<notifies.length; ++i)
            switch(notifies[i]){
                case NotifyType.idOfCustomers:
                    this._dataBase.sendId(NotifyType.idOfCustomers);
                    console.log("get id of customers was notify");
                    break;
                case NotifyType.idOfModels:
                    this._dataBase.sendId(NotifyType.idOfModels);
                    console.log("get id of model was notify");
                    break;
                case NotifyType.idOfOrders:
                    this._dataBase.sendId(NotifyType.idOfOrders);
                    console.log("get id of orders was notify");
                    break;
                case NotifyType.listOfCust:
                    this._dataBase.sendListOfCustomers();
                    console.log("get list of customers was notify");
                    break;
                case NotifyType.idOfCat:
                    this._dataBase.sendId(NotifyType.idOfCat);
                    console.log("get id of categories was notify");
                    break;
            }
    }
}

class TestViewController implements IView{

    private _view:frontClass;
    constructor(view:frontClass){
        this._view=view;
    }
    updateId(data:Set<number>,type:NotifyType){
        this._view.updateId(data,type);
    }
    updateCustomers(data: Customer[]): void {
        this._view.updateCustomers(data);
    }
    updateCategories(data: Category[]): void {
        this._view.updateCategories(data);
    }
    
}

class TestDataBase{
    private _front?:frontClass;
    public alice = new Customer(
        123, "Alice", "Alice", "27.18.2818", "Nowhere"
    );
    public bob = new Customer(
        321, "Bob", "Bob", "27.18.2818", "Nowhere"
    );  
    setFront(front:frontClass):void{
        this._front=front;
    }
    sendListOfCustomers():void{
        this._front?.updateCustomers([this.alice,this.bob]);
    }
    sendId(type:NotifyType):void{
        this._front?.updateId(new Set<number>().add(1234),type);
    }

}

let dataBase=new TestDataBase();
let dataBaseContr=new TestDataBaseController(dataBase);
let front=new frontClass(dataBaseContr);
dataBase.setFront(front);

front.render();

