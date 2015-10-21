(function($) {
    $.common = function(el, options) {
        var $common = $(el);
        $common.methods = {
            init: function() {
                $common.page=null;
                 try{$common.page=new $.page();$common.page.init();}catch(e){};//异步执行每个view页面的入口
                 var $interface=new $.interface({page:$common.page});
                 $common.dev=$interface.dev({});
                 $common.pro=$interface.pro({});
                 //加载页面上所有的data-htmlfile
                 $common.loadHtml.setup(function(){$common.methods.run();});
            },
            run:function(){
                try{$(".numChangeBox").proNumChange({callback:function(num,parent,el){$common.numChangeCart(num,parent,el);}});}catch(e){};//数字加减
                try{$(".countDownBox").countDown({mode:'day',show:false,callback:function(data,obj){$common.countDown(data,obj,"progress");},endCallBack:function(data,obj){$common.countDown(data,obj,"complete");}});}catch(e){}//初始化倒计时-天
                try{$(".video").video({append:".video"});}catch(e){};//初始添加视频
                try{$(".playVideo").video({append:".video",button:true});}catch(e){};//点击播放视频
                this.event();//公共事件
            },
            event:function(){
                //添加购物车
                $(".addCart").bind("click",function(){$common.addCart(this);return false;});
                //删除购物车
                $(".deleteCart").bind("click",function(){$common.deleteCart(this);return false;});
                //加载更多数据
                $(".loadMore").bind("click",function(){$common.listLoad(this);return false;});
                //加载弹层
                $(".loadPopup").bind("click",function(){$common.popupLoad(this);return false;});
            }
        };
        //添加购物车
        $common.addCart=function(el){
            $common.pro.proCart({el:el,type:"add",
                showLoading:function(){},
                hideLoading:function(){},
                complete:function(){}
            });
        };
        //删除购物车
        $common.deleteCart=function(el){
            $common.pro.proCart({el:el,type:"del",
                showLoading:function(){},
                hideLoading:function(){},
                complete:function(){}
            });
        };
        //数字加减购物车
        $common.numChangeCart=function(num,parent,el){
            $common.pro.proCart({el:el,type:"num",
                showLoading:function(){},
                hideLoading:function(){},
                complete:function(){}
            });
        };
        //弹层异步加载
        $common.popupLoad=function(el){
            $common.pro.proPopup({el:el,close:true,content:"body",
                 closeComplete:function(){},
                 complete:function(data){}
            });
        };
        //列表异步加载
        $common.listLoad=function(el){
            $common.pro.proAjax({el:el,
                showLoading:function(){},
                hideLoading:function(){},
                complete:function(){}
            });
        };
        //倒计时
        $common.countDown=function(data,obj,status){
            $common.pro.proCountDown(data,obj,status);
        };
        //平台分享
        $common.share={
            weixin:function(url,width,height){new $.customShare().getWeixinShare(url,width,height);},
            weibo:function(key,url,title,pic){new $.customShare().getShare(key,{url:url,title:title,pic:pic});}
        };
        //loading
        $common.loading={
            show:function(dom,mask,test){
                new $.loading().show({dom:dom,mask:mask});
                if(test){setTimeout(function(){$common.loading.hide();},1000);}
            },
            hide:function(){new $.loading().hide();}
        };   
        /*************************************加载外部html**********************/
        $common.loadHtml={
            setup:function(callback){
                this.callback=callback||null;
                this.total=$("[data-htmlfile]").size();
                if(this.total==0){if(callback)callback();return;}
                this.count=0;
                this.run();
            },
            run:function(){
                $("[data-htmlfile]").each(function(index, element) {
                    $common.loadHtml.load($(this),$(this).attr("data-htmlfile"),function(){
                           $common.loadHtml.count++;
                           if($common.loadHtml.count==$common.loadHtml.total){if($common.loadHtml.callback)$common.loadHtml.callback();};
                     });
                });
            },
            load:function(el,url,callback){
                $.ajax({url:url,data:null,type:"GET",dataType:"html",success:function(data){el.replaceWith(data);if(callback)callback();},error:function(){if(callback)callback();}});
            }
        };
        return $common;
    };
})(jQuery);
var $common=null;
jQuery(function(){$common=new jQuery.common();$common.methods.init();});