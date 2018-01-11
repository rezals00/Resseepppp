import React,{Component} from 'react';
import Api from './Service/Api';
import {Link} from 'react-router-dom';
export default class View extends Component {
    constructor(){
        super();
        this.state = {
            title:"",
            body:""
        }
    }
    componentWillMount(){
        Api.Info(this.props.match.params.id).then((res) => {
            window.document.title = res.title;
            this.setState({
                title:res.title,
                body:res.body
            })
        })
    }
    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
                 <div className="container row">
                    <div className="col-lg-3">
                       <br/>
                       <br/>
                       <Link to={"/"} className="btn btn-link">Kembali</Link>
                    </div>
                    <div className="col-lg-9">
                        <h2>{this.state.title}</h2>
                        <hr/>
                        {this.state.body}
                    </div>
                  </div>
            </div>
        )
    }
}