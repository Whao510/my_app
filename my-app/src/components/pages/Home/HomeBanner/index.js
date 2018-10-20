import React,{Component} from 'react';
import './index.scss';
import Swiper from 'swiper';
//https://m.maizuo.com/v4/api/billboard/home?__t=1533886411865
//https://www.muji.com.cn/ec-api/api?method=mapi.mobilead.ad.slideshow
//无状态组件，本质是一个函数，用于某些不需要自己的状态，只是用来显示数据的地方
const SlideItem = (props)=>{
    let {data} = props
    return (
        <div className="swiper-slide">
            <img width="100%" src={data.addr} alt=""/>
        </div>
    )
}
class HomeBanner extends Component{
    constructor(props){
        super(props)
        this.state = {
            banners:[]
        }
    }
    //获取轮播图数据
    getBanners(){
        this.$http.get('https://www.muji.com.cn/ec-api/api',{
            params: {
                method: 'mapi.mobilead.ad.slideshow',
                app_key: 'mujiryohin',
                getType: 'slidedata',
                sign: '428FFE5728F2E7B7F22EF57C23E6A5EE'
             }}).then(res=>{
                // console.log(res.data.data.response)
                this.setState({banners:res.data.data.response})
            })
    }
    //实例化
    componentDidUpdate(){
        if(!this.swiper){
            this.swiper = new Swiper(this.el,{
                pagination:{
                    el:'.swiper-pagination',
                    clickable:true, //点击分页器切换图片
                },
                loop: true,
                autoplay:{
                    delay:3000, 
                    stopOnLastSlide:false,
                    disableOnInteraction:false, //滑动图片后也能自动轮播
                }
            })
        }
    }
    //执行方法
    componentDidMount(){
        this.getBanners()
    }
    renderSlideItems(){
        let {banners} = this.state
        return banners.map((item,i)=>(<SlideItem key={i} data={item} />))
    }
    render(){
        return (
            <div ref={el=>this.el=el} className="homebanner swiper-container">
                <div className="swiper-wrapper">
                    {this.renderSlideItems()}
                </div>
                <div className="swiper-pagination"></div>
            </div>
        )
    }
}
export default HomeBanner