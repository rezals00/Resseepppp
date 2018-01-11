import React, { Component } from 'react';
import './App.css';
import { setTimeout } from 'timers';
class App extends Component {
  constructor(){
    super();
    this.state = {
      post:[],
      login:false,
      username:'',
      password:'',
      show:false,
      loginmsg:{
        hidden:true,
        success:'error',
        msg:''
      },
      menu:'main',
      view:false,
      id:0,
      title_add:"",
      body_add:"",
      update:false
    }
 
  }
  componentDidMount(){
    document.title = "Studi Kasus Resep Makanan"
  }
  ViewResep(id){
    document.title = this.state.post[id].title;
    this.setState({
      view:true,
      id:id
    });
  }
  UnViewResep(){
    document.title = "Studi Kasus Resep Makanan";
    this.setState({
      view:false
    });
  }
  componentWillMount(){

    this.callList()
    
 
 
  }
  callList(){
    this.setState({
      post:[],
      
    })
    fetch('http://localhost:2000/list',{mode:'cors'})
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        post:res.data,
        show:true,
        menu:'main'
      })
    }).catch((err) => {
      console.log(err);
      
    })
  }
  login(){
    if(this.state.username === "user" && this.state.password === "1234"){
       this.setState({
         login:false,
         loginmsg:{
           hidden:false,
           success:true,
           msg:'Login Berhasil Selamat Datang user,tunggu sebentar ...'
         }
       })
       setTimeout(() => {
         this.setState({
           login:true
         })
       },1000);
    } else {
      this.setState({
        login:false,
        loginmsg:{
          hidden:false,
          success:false,
          msg:'Login Gagal Username / Password Salah'
        }
      })
    }
    setTimeout(() => {
      this.setState({
        loginmsg:{
          hidden:true,
          success:false,
          msg:''
        }
      })
    },3000);
  }
  errorMessage(){
    if(!this.state.loginmsg.hidden){
       var loginmsg = this.state.loginmsg;
       if(loginmsg.success){
         return(<div className="alert alert-success">{loginmsg.msg}</div>);
       } 
       return(<div className="alert alert-danger">{loginmsg.msg}</div>);
    }
  }
  logout(){
    this.setState({
      login:false,
      username:'',
      password:'',
      loginmsg:{
        hidden:true,
        success:false,
        msg:''
      }
    })
  }
  handleMenu(menu){
     this.setState({
       menu:menu
     })
  }
  showMenu(){
    if(this.state.view){
      return (<button className="btn btn-link" onClick={() => {this.UnViewResep()}}>Kembali</button>);
  }
     if(this.state.login){
      return (<div className="panel panel-primary">
      <div className="panel-heading">Menu User</div>
      <div className="panel-body">
         <button type="button" className="btn btn-default btn-block" onClick={() => { this.handleMenu('main') }}>Halaman Utama</button>
         <button type="button" className="btn btn-default btn-block"  onClick={() => { this.handleMenu('add') }}>Tambah Resep</button>
         <br/>
         <br/>
         <button type="button" onClick={this.logout.bind(this)} className="btn btn-danger btn-block">Keluar</button>
      </div>
   </div>);
     } 
    
     return (<div className="panel panel-primary">
     <div className="panel-heading">Masuk Sebagai User</div>
     <div className="panel-body">
     {this.errorMessage()}
     <label>Username</label>
        <input type="text" id="username" onChange={(e) => { this.setState({username:e.target.value}) }} className="form-control" placeholder="user" />
        <label>Password</label>
        <input type="password" id="password" onChange={(e) => { this.setState({password:e.target.value})} } className="form-control" placeholder="1234"/>
        <br/>
        <button onClick={this.login.bind(this)} className="btn btn-primary">Masuk</button>
      
        </div>

  </div>);
  }
  callAddApi(){
    fetch('http://localhost:2000/insert',{
      mode:'cors',
      method:"POST",
      body:"author="+this.state.username+"&body="+this.state.body_add+"&title="+this.state.title_add,
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
    })
    .then((res) => res.json())
    .then((res) => {
      this.callList();
      this.setState({
        menu:'main'
      })
        window.alert('Resep Telah Di tambahkan')
    });
  }
  renderAdd(){
    return(<div className="panel panel-primary">
      <div className="panel-heading">Tambah Resep</div>
      <div className="panel-body">
         <label>Judul</label>
         <input type="text" onChange={(e) => { this.setState({title_add:e.target.value}) }} className="form-control" />
         <label>Tulis Resep Dan Cara Memasak</label>
         <textarea onChange={(e) => { this.setState({body_add:e.target.value}) }} className="form-control" row="5"/>
         <br/>
         <br/>
         <button type="button" onClick={this.callAddApi.bind(this)} className="btn btn-success">Tambah</button>
      </div>
   </div>);
  }
  tes(){
    alert('OK')
  }
  Delete(id){
    if(window.confirm("Anda yakin menghapus ini ?")){
      fetch('http://localhost:2000/delete',{
            mode:'cors',
            method:"POST",
            body:"id="+id,
            headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
          })
          .then((res) => res.json())
          .then((res) => {
              this.callList();
            
            window.alert("Telah di hapus")
          });
    }
  }
  renderUpdate(id){
    if(this.state.menu !== "update"){
      this.setState({
        menu:"update",
        title_add:this.state.post[id].title,
        body_add:this.state.post[id].body,
        id:this.state.post[id]._id
      });
    }
    return(<div className="panel panel-primary">
      <div className="panel-heading">Update Resep</div>
      <div className="panel-body">
         <label>Judul</label>
         <input type="text" value={this.state.title_add} onChange={(e) => { this.setState({title_add:e.target.value}) }} className="form-control" />
         <label>Tulis Resep Dan Cara Memasak</label>
         <textarea value={this.state.body_add} onChange={(e) => { this.setState({body_add:e.target.value}) }} className="form-control" row="5"/>
         <br/>
         <br/>
         <button type="button" onClick={() => { this.updateApi()}} className="btn btn-success">Tambah</button>
      </div>
   </div>);

  }
  updateApi(){
    fetch('http://localhost:2000/update',{
      mode:'cors',
      method:"POST",
      body:"id="+this.state.id+"&author="+this.state.username+"&body="+this.state.body_add+"&title="+this.state.title_add,
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
    })
    .then((res) => res.json())
    .then((res) => {
      this.callList();
      this.setState({
        menu:'main'
      })
        window.alert('Resep Telah Di Update')
    });
  }
  renderList(){
    if(this.state.post.length === 0){
      return (<center><h2>Belum Ada Resep</h2></center>)
    } else {
    var view = [];
    var ti = this;
    if(this.state.login){
      this.state.post.map((v,i) => {
        const a = i;
        view.push(<div className="panel panel-default">
        <div className="panel-body">
          <h2>{v.title} <button className="btn pull-right btn-danger" onClick={ () =>  { this.Delete(v._id) }}>D</button>   <button className="btn pull-right btn-success"  onClick={ () =>  { this.renderUpdate(a) }}>E</button></h2>
          <br/>
          <p onClick={ () => {  this.ViewResep(a) } } className="btn btn-link">Klik untuk lihat lengkap</p>
        </div>
      </div>);
      });
      return(view);
    } else {
      this.state.post.map((v,i) => {
        const a = i;
      
        view.push(<div className="panel panel-default">
        <div className="panel-body">
          <h2>{v.title}</h2>
          <br/>
          <p onClick={ () => {  this.ViewResep(a) } } className="btn btn-link">Klik untuk lihat lengkap</p>

        </div>
      </div>);
      });
      return(view);
    }
  }
  }
  renderViewResep(){
     if(this.state.view){
       var v = this.state.post[this.state.id];
       if(v !== null){
        return(<div className="panel panel-default" onClick={ () => alert('OK') }>
        <div className="panel-body">
          <h2>{v.title}</h2>
          <br/>
          <p>{v.body}</p>
        </div>
     </div>);
       }
     }
  }
  renderMain(){
    if(this.state.view){
      return this.renderViewResep();
    } else {
      return this.renderList();
    }
  }
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
          <br/>
          <br/>

          {(this.state.show ? 
          <div className="container">
             <div className="col-lg-4">
                {this.showMenu()}
             </div>
             <div className="col-lg-8">
                 {(this.state.menu === "main" ? this.renderMain() : null)}
                 {(this.state.menu === "add" ? this.renderAdd() : null)}
                 {(this.state.menu === "update" ? this.renderUpdate() : null)}
             </div>
          </div>
          : null )}
        </div>
          
    );
  }
}

export default App;
