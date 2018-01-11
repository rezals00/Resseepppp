import config from '../Config/config';

const Api =  {
    List: function(){
        var header = {
            mode:'cors'
        };
        return fetch(config.api_url+"list",header).then(res => res.json());
    },
    Info: function(id){
        var header = {
            mode:'cors',
            method:"POST",
            body:"id="+id,
            headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
          };
        return fetch(config.api_url+"info",header).then(res => res.json());
    },
    Delete: function(id){
        var header = {
            mode:'cors',
            method:"POST",
            body:"id="+id,
            headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
          };
        return fetch(config.api_url+"delete",header).then(res => res.json());
    },
    Insert: function(author,title,body){
        var header = {
            mode:'cors',
            method:"POST",
            body:"author="+author+"&body="+body+"&title="+title,
            headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
          };
        return fetch(config.api_url+"insert",header).then(res => res.json());
    },
    Update: function(id,title,body){
        var header = {
            mode:'cors',
            method:"POST",
            body:"id="+id+"&body="+body+"&title="+title,
            headers: {
              'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
              },
          };
        return fetch(config.api_url+"update",header).then(res => res.json());
    }
}
export default Api;