import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from './../Home';
import View from './../View';
import Edit from './../Edit';

import Add from './../Add';

const route =  () => (
     <BrowserRouter>
       <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/view/:id" component={View}/>
        <Route path="/edit/:id" component={Edit}/>
        <Route path="/add/" component={Add}/>

        </Switch>
    </BrowserRouter>
    )


export default route;   