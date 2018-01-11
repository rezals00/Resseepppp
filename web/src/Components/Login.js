import React,{PureComponent} from 'react';


export default class Login extends PureComponent {
    render(){
        function message(props){
            if(props.error === null || props.error === ""){
                return null;
            }
             return(<div className="alert alert-danger">{props.error}</div>)
            
        }
        return(
        <div className="panel panel-primary">
        <div className="panel-heading">Log In</div>
        <div className="panel-body">
        {message(this.props)}
        <label>Username</label>
            <input type="text" id="username" onChange={this.props.username} className="form-control" placeholder="user" />
            <label>Password</label>
            <input type="password" id="password" onChange={this.props.password} className="form-control" placeholder="1234"/>
            <br/>
            <button onClick={this.props.submit} className="btn btn-primary">Masuk</button>
        
            </div>

    </div>);
    }
}