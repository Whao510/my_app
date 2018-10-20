import React,{Component} from 'react';
import { TabBar } from 'antd-mobile';
import './index.scss';

//Redirect
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';

//引入页面组件
import Home from '../Home';
import Classify from '../Classify';
import Cart from '../Cart';
import Mine  from '../Mine';

import NotFound from '../../commons/NotFound';



import octicons from 'octicons';
class Bottom extends Component{
    constructor(){
        super();
        this.state = {
            tabs:[
                {
                    title:'首页',
                    path:'/',
                    name:'home',
                    icon:'home'
                },
                {
                    title:'分类',
                    path:'/classify',
                    name:'classify',
                    icon:'three-bars'
                },
                {
                    title:'购物车',
                    path:'/cart',
                    name:'cart',
                    icon:'gift'
                },
                {
                    title:'我的',
                    path:'/mine',
                    name:'mine',
                    icon:'person'
                }
            ],
            currentTab:'home'
        }
    }
    handleChangeCurrent(tab){
        // console.log(this.props)
        this.setState({
            currentTab:tab.name
        })
        // 编程式导航
        // 获取history
        let {history} = this.props
        history.push(tab.path)
    }
    render(){
        return (
            <TabBar tintColor="#58bc58">
            {
              this.state.tabs.map(tab=>{
                return <TabBar.Item 
                title={tab.title} 
                key={tab.name} 
                icon={<div dangerouslySetInnerHTML={{__html:octicons[tab.icon].toSVG()}}/>}
                selectedIcon={<div className="selected" dangerouslySetInnerHTML={{__html:octicons[tab.icon].toSVG()}}/>}
                selected={tab.name === this.state.currentTab}
                onPress={this.handleChangeCurrent.bind(this,tab)}
                dot
                >
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                        <Route path='/classify' component={Classify}></Route>
                        <Route path='/cart' component={Cart}></Route>
                        <Route path='/mine' component={Mine}></Route>
                        <Route path='/not-found' component={NotFound}></Route>
                        {/* 重定向 */}
                        <Redirect from="*" to='/not-found' />
                    </Switch>  
                </TabBar.Item>
              })
            }
          </TabBar>

        ) 
    }
}
//高阶组件
Bottom = withRouter(Bottom);
export default Bottom


//history,location,match;
//exact;