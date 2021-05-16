import { ICustomer, IOrder, IModel, ICategory } from "../common/commonClasses";
import { IFrontHandler } from "../common/commonInterfaces";
import { idType, SendType } from "../common/enumTypes";
import { frontClass } from "../frontClass";



export class FrontHandler implements IFrontHandler{

    private _front?:frontClass;
    readonly url="https://mus-market.herokuapp.com/func";
    private _checkedId: Map<idType, boolean>; //поле для отладки
    
    constructor(){
        this._checkedId=new Map<idType,boolean>();
    }

    setFront(front:frontClass){
        this._front=front;
    }

    //функции, вызываемые при отправке данных
    pushCustomer(cust: ICustomer): void {
        let res=this.getResult('add_customer',[`${cust.id_customer}`,`${cust.fname}`,
        `${cust.lname}`,`${cust.fname}`,`${cust.location}`]);

        let resMap=new Map<idType,boolean>();
        resMap.set(idType.customer,res['id']);
        console.log(resMap);
        this.idChecked(resMap,SendType.customer);
    }
    pushOrder(order: IOrder): void {
        console.log(JSON.stringify(order));
        let res=this.getResult('add_order',[`${order.id_order}`,`${order.customer}`,
        `${order.type}`,`${order.date_of_order}`,`${order.date_of_delivery}`]);
        
        let resMap=new Map<idType,boolean>();
        resMap.set(idType.order,res['id']);
        resMap.set(idType.customer,res['customer']);
        resMap.set(idType.model,res['model']);
        console.log(resMap);
        this.idChecked(resMap,SendType.order);
    }
    pushModel(model: IModel): void {
        console.log(JSON.stringify(model));

        let res=this.getResult('add_model',[`${model.id_model}`,`${model.name}`,
        `${model.price}`,`${model.category}`,`${model.storage}`]);
        
        let resMap=new Map<idType,boolean>();
        resMap.set(idType.model,res['id']);
        resMap.set(idType.category,res['category']);
        this.idChecked(resMap,SendType.model);
    }
    pushCategory(cat: ICategory): void {
        console.log(JSON.stringify(cat));
        
        let res=this.getResult('add_category',[`${cat.id_category}`,`${cat.name}`]);
        
        let resMap=new Map<idType,boolean>();
        resMap.set(idType.category,res['id']);
        this.idChecked(resMap,SendType.category);
    }

    //вызывакется при получении данных
    idChecked(data: Map<idType, boolean>, type: SendType): void {
        this._front?.idCheck(data,type);
    }

    private getResult(command:string,listOfArgs:Array<string>):any{
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", '/func', false );
        xmlHttp.setRequestHeader('command', command);
        for (let i=1; i<=listOfArgs.length; ++i)
            xmlHttp.setRequestHeader(`arg${i}`,listOfArgs[i-1]);
        xmlHttp.send( null );
        console.log(xmlHttp.responseText);
        let res=JSON.parse(xmlHttp.response)["RESULT"];
        console.log(res);
        return res;
    }

    // функции для отладки
    // private checkCustomer(cust:ICustomer):void{
    //     this._checkedId=new Map<idType,boolean>();
    //     if (cust.id_customer===1234)
    //         this._checkedId.set(idType.customer,false);
    //     else
    //         this._checkedId.set(idType.customer,true);
    //     setTimeout(_=>{ this.idChecked(this._checkedId,SendType.customer);  },3000);   
    // }


    // private checkOrder(order:IOrder):void{
    //     this._checkedId=new Map<idType,boolean>();
    //     if (order.id_order===1234)
    //         this._checkedId.set(idType.order,false);
    //     else 
    //         this._checkedId.set(idType.order,true);
    //     if (order.type===1234)
    //         this._checkedId.set(idType.model,false);
    //     else 
    //         this._checkedId.set(idType.model,true);
    //     if (order.customer===1234)
    //         this._checkedId.set(idType.customer,false);
    //     else 
    //         this._checkedId.set(idType.customer,true);
    //     console.log(order.date_of_order);
    //     setTimeout(_=>{this.idChecked(this._checkedId,SendType.order);},3000);    
    // }


    // private checkModel(model:IModel):void{
    //     this._checkedId=new Map<idType,boolean>();
    //     if (model.id_model===1234)
    //         this._checkedId.set(idType.model,false);
    //     else
    //         this._checkedId.set(idType.model,true);
    //     if (model.id_model===1234)
    //         this._checkedId.set(idType.category,false);
    //     else
    //         this._checkedId.set(idType.category,true);  
    //     setTimeout(_=>{this.idChecked(this._checkedId,SendType.model); },3000);  
    // }
    // private checkCategory(cat:ICategory):void{
    //     this._checkedId=new Map<idType,boolean>();
    //     if (cat.id_category===1234)
    //         this._checkedId.set(idType.category,false);
    //     else
    //         this._checkedId.set(idType.category,true);
    //     setTimeout(_=>{this.idChecked(this._checkedId,SendType.category);},3000);      
    // }

}


