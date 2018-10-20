import React,{Component} from 'react';
import './index.scss';

import Swiper from 'swiper';

import HomeBanner from './HomeBanner';
import NewGoods from './NewGoods';
import CategoryGoods from './CategoryGoods';
import Recommend from './Recommend';

class Home extends Component{
    render(){
        return (
            <div className="home">
                <div ref={el=>this.el=el} className="swiper-container">
                    <div className="swiper-wrapper">
                        <div className="refresh">释放刷新</div>
                            <div className="swiper-slide">
                                <HomeBanner />
                                <NewGoods />
                                <CategoryGoods />
                                <Recommend />
                            </div>
                            </div>
                        {/* <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div>
                        <div className="swiper-slide"></div> */}
                        <div className="loadmore">加载更多</div>
                    </div>
                <div className="swiper-scrollbar"></div>
            </div>
           
        )
    }
    componentDidUpdate(){
        let refreshEnd= false;
        let times=0;//加载次数
        let oriSpeed=300;
        if(!this.swiper){
            this.swiper = new Swiper(this.el,{
                speed: oriSpeed,
                slidesPerView: 'auto',
                freeMode: true,
                direction: 'vertical',
                setWrapperSize: true,
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                on:{
                    //下拉释放刷新
                    touchEnd: function(){
                        this.swiper=this
                        var refreshText=this.swiper.$el.find('.refresh');
                        if(this.translate>100){
                            this.swiper.setTransition(this.params.speed);
                            this.swiper.setTranslate(100);
                            this.swiper.touchEventsData.isTouched=false;//跳过touchEnd事件后面的跳转(4.0.5)
                            refreshText.html('刷新中')
                            
                            this.swiper.allowTouchMove=false;
                            setTimeout(function(){//模仿AJAX
                                this.swiper.removeAllSlides();
                                for(var i=0;i<20;i++){
                                this.swiper.appendSlide('<div class="swiper-slide">New Slide'+(i+1)+'</div>');
                                refreshText.html('刷新完成');
                                refreshEnd=true;
                                this.swiper.allowTouchMove=true;
                                }
                            },1000)
                            
                         }
                    },
                    touchStart: function(){
                        if(refreshEnd==true){
                            this.$el.find('.refresh').html('释放刷新');
                            refreshEnd=false;
                        }
                    },
                }
               
            })
        }
        
    }

}
export default Home