import { ICustomer, IOrder, IModel, ICategory } from "../common/commonClasses";
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

    
    notifyPushCustomer(cust: ICustomer): void {
        this.checkCustomer(cust);
    }
    notifyPushOrder(order: IOrder): void {
        this.checkOrder(order);
    }
    notifyPushModel(model: IModel): void {
        this.checkModel(model);
    }
    notifyPushCategory(cat: ICategory): void {
        this.checkCategory(cat);
    }

    idCheck(data: Map<idType, boolean>, type: SendType): void {
        this._front?.idCheck(data,type);
    }

    // функции для теста
    private checkCustomer(cust:ICustomer):void{
        this._checkedId=new Map<idType,boolean>();
        if (cust.id_customer===1234)
            this._checkedId.set(idType.customer,false);
        else
            this._checkedId.set(idType.customer,true);
        setTimeout(_=>{ this.idCheck(this._checkedId,SendType.customer);  },3000);   
    }


    private checkOrder(order:IOrder):void{
        this._checkedId=new Map<idType,boolean>();
        if (order.id_order===1234)
            this._checkedId.set(idType.order,false);
        else 
            this._checkedId.set(idType.order,true);
        if (order.type===1234)
            this._checkedId.set(idType.model,false);
        else 
            this._checkedId.set(idType.model,true);
        if (order.customer===1234)
            this._checkedId.set(idType.customer,false);
        else 
            this._checkedId.set(idType.customer,true);
        console.log(order.date_of_order);
        setTimeout(_=>{this.idCheck(this._checkedId,SendType.order);},3000);    
    }


    private checkModel(model:IModel):void{
        this._checkedId=new Map<idType,boolean>();
        if (model.id_model===1234)
            this._checkedId.set(idType.model,false);
        else
            this._checkedId.set(idType.model,true);
        if (model.id_model===1234)
            this._checkedId.set(idType.category,false);
        else
            this._checkedId.set(idType.category,true);  
        setTimeout(_=>{this.idCheck(this._checkedId,SendType.model); },3000);  
    }
    private checkCategory(cat:ICategory):void{
        this._checkedId=new Map<idType,boolean>();
        if (cat.id_category===1234)
            this._checkedId.set(idType.category,false);
        else
            this._checkedId.set(idType.category,true);
        setTimeout(_=>{this.idCheck(this._checkedId,SendType.category);},3000);      
    }

}

