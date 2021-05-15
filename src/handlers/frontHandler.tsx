import { Customer, Order, Item, Category } from "../common/commonClasses";
import { IFrontHandler } from "../common/commonInterfaces";
import { idType, SendType } from "../common/enumTypes";
import { frontClass } from "../frontClass";

export class FrontHandler implements IFrontHandler{

    private _front?:frontClass;
    private _checkedId: Map<idType, boolean>; //поле для теста
    
    constructor(){
        this._checkedId=new Map<idType,boolean>();
    }

    setFront(front:frontClass){
        this._front=front;
    }

    
    notifyPushCustomer(cust: Customer): void {
        this.checkCustomer(cust);
    }
    notifyPushOrder(order: Order): void {
        this.checkOrder(order);
    }
    notifyPushModel(model: Item): void {
        this.checkModel(model);
    }
    notifyPushCategory(cat: Category): void {
        this.checkCategory(cat);
    }

    idCheck(data: Map<idType, boolean>, type: SendType): void {
        this._front?.idCheck(data,type);
    }

    // функции для теста
    private checkCustomer(cust:Customer):void{
        this._checkedId=new Map<idType,boolean>();
        if (cust.id===1234)
            this._checkedId.set(idType.customer,false);
        else
            this._checkedId.set(idType.customer,true);
        setTimeout(_=>{ this.idCheck(this._checkedId,SendType.customer);  },3000);   
    }


    private checkOrder(order:Order):void{
        this._checkedId=new Map<idType,boolean>();
        if (order.id===1234)
            this._checkedId.set(idType.order,false);
        else 
            this._checkedId.set(idType.order,true);
        if (order.item===1234)
            this._checkedId.set(idType.model,false);
        else 
            this._checkedId.set(idType.model,true);
        if (order.cust===1234)
            this._checkedId.set(idType.customer,false);
        else 
            this._checkedId.set(idType.customer,true);
        setTimeout(function(){ alert("Hello"); },3000);
        this.idCheck(this._checkedId,SendType.order);    
    }


    private checkModel(model:Item):void{
        this._checkedId=new Map<idType,boolean>();
        if (model.id===1234)
            this._checkedId.set(idType.model,false);
        else
            this._checkedId.set(idType.model,true);
        if (model.categoryId===1234)
            this._checkedId.set(idType.category,false);
        else
            this._checkedId.set(idType.category,true);  
        setTimeout(function(){ alert("Hello"); },3000);  
        this.idCheck(this._checkedId,SendType.model);    
    }
    private checkCategory(cat:Category):void{
        this._checkedId=new Map<idType,boolean>();
        if (cat.id===1234)
            this._checkedId.set(idType.category,false);
        else
            this._checkedId.set(idType.category,true);
        setTimeout(function(){ alert("Hello"); },3000);
        this.idCheck(this._checkedId,SendType.category);    
    }

}


