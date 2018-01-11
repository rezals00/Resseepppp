import React,{PureComponent} from 'react';
import {Link} from 'react-router-dom'

export default class Login extends PureComponent {
    render(){
        function Logout(){
            window.sessionStorage.setItem("login",false);
            window.location.assign("/");
        }
        return(
            <div className="panel panel-primary">
      <div className="panel-heading">Menu User</div>
      <div className="panel-body">
         <Link to={"/"} className="btn btn-default btn-block">Halaman Utama</Link>
         <Link to={"/add"} className="btn btn-default btn-block">Tambah Resep</Link>
         <br/>
         <br/>
         <button type="button" onClick={() => { Logout() }} className="btn btn-danger btn-block">Keluar</button>
      </div>
   </div>);
    }
}