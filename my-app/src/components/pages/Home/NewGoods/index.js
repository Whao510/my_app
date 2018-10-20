import React,{Component} from 'react';
import './index.scss';
import Swiper from 'swiper';
const SlideItems = (props)=>{
    let {data} = props
    return (
        <div className="swiper-slide">
            <img width="100%" src={data.s_url} alt="" />
            <p className="detail">{data.products.name}</p>
            <div className="price">

                {data.products.mktprice ? <span className="nowprice2">￥{Number(data.products.price).toFixed()}</span> : <span className="nowprice">￥{Number(data.products.price).toFixed()}</span> }
                
                {data.products.mktprice ? <span className="mktprice">￥{Number(data.products.mktprice).toFixed()}</span> : ''}
            </div>
        </div>
    )
}
class GoodsList extends Component{
    constructor(props){
        super(props);
        this.state = {
            NewGoods:[]
        }
    }
    //https://www.muji.com.cn/ec-api/api?method=mapi.goods.goods.get_goods_gallery
    getNewGoods(){
        this.$http.get('https://www.muji.com.cn/ec-api/api',{
            params:{
                app_key: 'mujiryohin',
                method: 'mapi.goods.goods.get_goods_gallery',
                cat_id: 0,
                req_pages: 1,
                req_number: 10,
                p_order: 'uptime desc',
                sign: 'DE1600A055625CA7018D2CE03E6D9BF5'
            }
        }).then(res=>{
            // console.log(res.data.data.response.goods_list)
            this.setState({NewGoods:res.data.data.response.goods_list})
        })
    }
    componentDidUpdate(){
        if(!this.swiper){
            this.swiper = new Swiper(this.el,{
                slidesPerView: 'auto'
            })
        }
    }
    //执行方法
    componentDidMount(){
        this.getNewGoods()
    }
    renderSlideItems(){
        let {NewGoods} = this.state
        return NewGoods.map(item=>(<SlideItems key={item.goods_id} data={item} />))
    }
    render(){
        return (
            <div className="newgoods">
                <div className="newtitle">
                    <div className="p1">新到商品</div>
                    <div className="p2"><a href="javescript:;">查看全部</a></div>
                </div>
                <div ref={el=>this.el=el} className="goodsbox swiper-container">
                    <div className="goodslist swiper-wrapper">
                        {this.renderSlideItems()}
                    </div>
                </div>
            </div>
        )
    }
}

export default GoodsList