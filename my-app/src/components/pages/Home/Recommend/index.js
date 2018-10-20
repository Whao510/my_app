import React,{Component} from 'react';
import './index.scss';

class Recommend extends Component{
    constructor(){
        super();
        this.state ={
            Recommend:[]
        }
    }
    renderRecommend(){
        return this.state.Recommend.map(item=>(
            <li className="item" key={item.goods_id}>
                <div className="item-box">
                    <div className="div-img">
                        <img width="100%" src={item.image} alt=""/>
                    </div>
                    
                    <div className="title-p">{item.name}</div>

                    {item.promotion.goods.map((data,i)=>(
                        <div key={i} className="discounts">
                            <p className="dis-p">{data.label}</p> 
                        </div>
                    ))}
                    
                    <div>
                        <p className="nowprice">￥{Number(item.price).toFixed()}</p>
                    </div>
                </div>
            </li>
        ))
    }
    render(){
        return (
            <div className="RecommendBox">
                <div className="big-box">
                    <div className="little-box">
                        <div className="list-title">
                            <div className="p1">推荐商品</div>
                            <div className="p2"><a href="javescript:;">查看全部</a></div>
                        </div>       
                        <div className="list-box">
                            <ul className="list-goods">
                                {this.renderRecommend()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //https://www.muji.com.cn/ec-api/api?method=mapi.mobilead.ad.recommended
    getRecommendGoods(){
        this.$http.get('https://www.muji.com.cn/ec-api/api',{
            params:{
                app_key: 'mujiryohin',
                method: 'mapi.mobilead.ad.recommended',
                get_type: 'virtual_cat',
                page: 1,
                size: 10,
                sign: '0050AD6779A27B888F8FCEFEF349D621'
            }
        }).then(res=>{
            console.log(res.data.data.response)
            this.setState({
                Recommend:res.data.data.response
            })
        })
    }
    //执行
    componentDidMount(){
        this.getRecommendGoods()
    }
}

export default Recommend