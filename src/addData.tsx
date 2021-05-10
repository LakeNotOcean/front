/* eslint-disable no-mixed-operators */


import React, {Component,  RefObject} from 'react';

// export interface InputPropsCallBack{
//     title:string;
//     inputType:string;
//     errorMessage:string;
//     inInputChange:(inputStr:string)=>void;
// }

export interface InputProps{
    title:string;
    inputType:string;
    errorMessage:string;
}

export interface InputState {
    isError:boolean;
    inputValue:string; 
}


export interface AddDataProps {
    childProps:Array<InputProps>;
    sendData:(data:Map<string,string>)=>void;
    title:string;   
    // updateExist:{(exist:Set<number>):void;}[];

    //children?:ReactElement<InputProps>[] | ReactElement<InputProps>
}

export interface AddDataState{
    displayAdd:boolean;
}

export class AddData extends Component<AddDataProps,AddDataState>{

    
    private _childElements:Array<RefObject<InputData>>;
    private _exist:Array<Set<number>>;

    constructor(props:AddDataProps){
        super(props)
        this.state={displayAdd:false}
        this.display=this.display.bind(this);
        this.checkData=this.checkData.bind(this);
        this.updateExist=this.updateExist.bind(this);
        //this.handleChange=this.handleChange.bind(this);
        this._childElements=[];
        this._exist=[];
        for (let i:number=0; i<this.props.childProps.length; ++i)
        {
            this._exist.push(new Set<number>());
            this._childElements.push(React.createRef<InputData>());
        }
    }
  

    // handleChange(input:string):void{
    //     this.setState({
    //         inputStr:input
    //     });
    //     console.log("input was changed",this.state.inputStr);
    // }

    render(){   
        return(
            <div className="AddData">
            <h1>{this.props.title} </h1>
            <button className="AddDataButton" onClick={this.display}>open fields</button>
            {this.state.displayAdd?
            <div className="DataFields">
                {this.props.childProps.map((element:InputProps,i) => (      
                <InputData title={element.title}
                    inputType={element.inputType}
                    errorMessage={element.errorMessage}
                    //onInputChange={this.handleChange}
                    ref={this._childElements[i]}
                    key={element.title}
                /> 
                ))}
                <button className="GetData" onClick={this.checkData}>submmit</button>
            </div>:
            null}   
            </div>
        );
    }
    
    display():void {
        this.setState({displayAdd:!this.state.displayAdd});
    }
    checkData():void{
        let isAccept:boolean=true;
        for (let i:number=0; i<this._childElements.length; ++i)
        {
            this._childElements[i].current?.notDisplayError();
            if (this._exist[i].has(+(this._childElements[i].current?.state.inputValue || ""))
            || this._childElements[i].current?.state.inputValue==="")
            {
                isAccept=false;
                this._childElements[i].current?.displayError();
            }
            else
                this._childElements[i].current?.notDisplayError();
        }
        if (isAccept)
        {
            let output=new Map<string,string>();
            this._childElements.forEach((element)=>{
                output.set( element.current?.props.title || "",element.current?.state.inputValue || "");
            })
            this._childElements.forEach((element)=>{
                element.current?.clearInput();
            }); 
            this.props.sendData(output);
        }

    }
    updateExist(i:number,data:Set<number>):void{
        console.log("updateExist is called")
        if (i>=this._exist.length)
            return;
        this._exist[i]=data;
        console.log("data was changed",i,data.size);
    }

}

 
export class InputData extends Component<InputProps,InputState>{

    
    constructor(props:InputProps,state:InputState){
        super(props)
        this.state=state;
        this.state={isError:false,inputValue:""};
        this.handleChange=this.handleChange.bind(this);
        this.displayError=this.displayError.bind(this);
        this.notDisplayError=this.notDisplayError.bind(this);
        this.clearInput=this.clearInput.bind(this);
    }

    handleChange(e:React.FormEvent<HTMLInputElement>):void{
        this.setState({inputValue:e.currentTarget.value})
        //this.props.onInputChange(e.currentTarget.value);
        console.log("input was changed",this.state.inputValue);
    }

    componentDidMount(){
        this.handleChange=this.handleChange.bind(this);
        this.displayError=this.displayError.bind(this);
        this.notDisplayError=this.notDisplayError.bind(this);
        this.clearInput=this.clearInput.bind(this);
        console.log("component was mounted");
    }

    render(){
        return (
            <div className={this.props.title}>
            <h2>{this.props.title}</h2>
            {this.state.isError?<p>{this.props.errorMessage}</p>:null}
            <input className="inputData" placeholder={"get "+this.props.title} type={this.props.inputType} value={this.state.inputValue}
                onChange={this.handleChange}/>
            </div>)
    }
    displayError():void{
       this.setState({isError:true}); 
    }
    notDisplayError():void{
        this.setState({isError:false});
    }
    clearInput():void{
        this.setState({inputValue:""});
    }

}

