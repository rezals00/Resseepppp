import React,{Component} from 'react';
import Api from './Service/Api';
import {Link} from 'react-router-dom';
export default class Edit extends Component {
    constructor(){
        super();
        this.state = {
            title:"",
            body:"",
            login:false,
        }
    }
    componentWillMount(){
        var isLogin = (window.sessionStorage.getItem("login") == "true" ? true : false);
       this.setState({
           login:isLogin
       })
       Api.Info(this.props.match.params.id).then((res) => {
        window.document.title = res.title;
        this.setState({
            title:res.title,
            body:res.body
        })
        })
    }
    Update(){
        Api.Update(this.props.match.params.id,this.state.title,this.state.body).then((res) => {
            if(res.status){
                window.location.assign("/");
                alert('Added');
            } else {
                alert('Failed');
            }
        })
    }
    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
                 <div className="container row">
                 <br/>
                       <br/>
                    <div className="col-lg-3">
                       
                       <Link to={"/"} className="btn btn-link">Back</Link>
                    </div>
                    <div className="col-lg-9">
                    <div className="panel panel-primary">
                    <div className="panel-heading">Tambah Resep</div>
                    <div className="panel-body">
                       <label>Judul</label>
                       <input type="text" value={this.state.title} onChange={(e) => { this.setState({title:e.target.value}) }} className="form-control" />
                       <label>Tulis Resep Dan Cara Memasak</label>
                       <textarea value={this.state.body} onChange={(e) => { this.setState({body:e.target.value}) }} className="form-control" row="5"/>
                       <br/>
                       <br/>
                       <button type="button" onClick={this.Update.bind(this)} className="btn btn-success">Tambah</button>
                    </div>
                 </div>
                    </div>
                  </div>
            </div>
        )
    }
}