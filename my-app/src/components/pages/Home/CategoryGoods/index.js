import React,{Component} from 'react';
import './index.scss';
class CategoryGoods extends Component{
    constructor(){
        super();
        this.state = {
            Category:[]
        }
    }
    renderCategory(){
        return this.state.Category.map(item=>(
            <div className="categorybox" key={item.virtual_cat_id}>
                <div className="categorytitle">
                    <div className="p1">{item.virtual_cat_name}</div>
                    <div className="p2"><a href="javescript:;">查看全部</a></div>
                </div>
                <div className="listbox">
                    <ul className="list">
                        {item.child_catlist.map(data=>(
                            <li key={data.virtual_cat_id} className="item">
                                <div className="item-box">
                                    <img src={data.icon} alt=""/>
                                    <div className="item-title">
                                        {data.virtual_cat_name}
                                    </div>
                                </div>
                            </li>
                         ))}
                    </ul>
                </div>
            </div>
        ))
    }
    render(){
        return (
            <div className="bigbox">
                    {this.renderCategory()}
            </div>
        )
    }
    //https://www.muji.com.cn/ec-api/api?method=mapi.goods.cat.get_goods_virtual_category
    //获取
    getCategoryGoods(){
        this.$http.get('https://www.muji.com.cn/ec-api/api',{
            params:{
                app_key: 'mujiryohin',
                method: 'mapi.goods.cat.get_goods_virtual_category',
                virtual_cat_id: 0,
                sign: '077ECBF9138BF16C3E3B9CD94833590D'
            }
        }).then(res=>{
            // console.log(res.data.data.response)
            this.setState({Category:res.data.data.response})

        })
    }
    //执行
    componentDidMount(){
        this.getCategoryGoods()
    }
}

export default CategoryGoods