import React,{Component} from 'react';
import Api from './Service/Api';
import ListRecipe from './Components/ListRecipe';
import Login from './Components/Login';
import MenuLogin from './Components/MenuLogin';

export default class Home extends Component {
    constructor(){
        super();
        this.state = {
            post:[],
            login:false,
            error_login:"",
            username:"",
            password:""
        }
    }
    componentWillMount(){
        var isLogin = (window.sessionStorage.getItem("login") == "true" ? true : false);
        this.setState({
            login: isLogin
        })
        Api.List().then((res) => {
            this.setState({
                post:res.data,
            })
        })        
    }
    componentDidMount(){
        window.document.title = "Recipe List";
    }

    renderList(){
        var view = [];
        if(this.state.post.length > 0){
            this.state.post.map((v,i) => {
                view.push(<ListRecipe
                title={v.title}
                login={this.state.login}
                id={v._id}
                key={v._id}
                />);
            });
            return view;
        } else {
            return(<center><h3>0 Recipe</h3></center>);
        }
          
    }
    Login(){    
        if(this.state.username == "user" && this.state.password == "1234"){
            window.sessionStorage.setItem("login",true);
            window.location.assign("/");
        } else {
            this.setState({
                error_login:"Invalid username or password"
            })
        }
    }
    
    renderMenu(){
        if(this.state.login == true){
            return (<MenuLogin/>);
        } else {
            return(<Login
                username={(e) => { this.setState({username:e.target.value})}}
                password={(e) => { this.setState({password:e.target.value})}}
                submit={() => { this.Login()}}
                error={this.state.error_login}
                />);
        }
    }
    render(){
        return(<div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
              <br/>
              <br/>
              <div className="container">
                 <div className="col-lg-4">
                   {this.renderMenu()}
                 </div>
                 <div className="col-lg-8">
                    {this.renderList()}
                 </div>
              </div>
            </div>)
    }
}