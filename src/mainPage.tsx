import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './styles/mainPage.module.css'



export class MainPage extends Component{
    render(){
    return(
        <section className={styles.mainPage}>
            <section className={styles.info}>
                <h3 className={`${styles.greeting}`}>Welcome to the mus store database</h3>
                <small>What do you want to do?</small>
                <div className={styles.links}>
                <Link to="/inputData" className={styles.link}>Add some data</Link>
                <Link to="/outputData" className={styles.link}>Find some data</Link>
                </div>
            </section>
        </section>)
    }
}
