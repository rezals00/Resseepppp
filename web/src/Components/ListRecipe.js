import React,{PureComponent} from 'react';
import {Link} from 'react-router-dom';
import Api from './../Service/Api';
export default class ListRecipe extends PureComponent {

    render(){
        function Delete(id){
        
            if(window.confirm("Are You Sure Delete This ?")){
                Api.Delete(id).then((res) => {
                    window.location.assign("/");
                })  
            }
        
            
        }
        function renderLoginMenu(props){
            if(props.login){
                return(<div>
                <button className="btn pull-right btn-danger" onClick={() => { Delete(props.id) }}>D</button>
                <Link className="btn pull-right btn-success"  to={"/edit/"+props.id}>E</Link>
                </div>)
            }
        }
        return(<div className="panel panel-default">
        <div className="panel-body">
          <h2>{this.props.title} {renderLoginMenu(this.props)}</h2>
          <br/>
          <Link to={'/view/'+this.props.id} className="btn btn-link">Klik Untuk Lihat Lengkap</Link>
        </div>
      </div>)
    }
}