import React,{Component} from 'react';
class NotFound extends Component{
    render(){
        // console.log(this.props)
        // let {location,match,history} = this.props
        return (
            <div className="notfound">
                你访问的当前页面(<strong style={{color:'red'}}>{window.location.href}</strong>)不存在
            </div>
        )
    }
}
export default NotFound