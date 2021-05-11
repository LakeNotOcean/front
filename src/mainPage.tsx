import React, {Component} from 'react';
import {Link} from 'react-router-dom';



export class MainPage extends Component{
    render(){
    return(
        <div>
            <h3>Welcome to the store database</h3>
            <small>Main Page</small>
            <Link to="/inputData" >Add some data</Link>
            <Link to="/outputData" >Find some data</Link>
        </div>)
    }
}
