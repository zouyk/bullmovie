(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/movieinfo/movieinfo"],{"2c86":function(t,n,e){"use strict";e.r(n);var o=e("5c02"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=u.a},"5c02":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){e.e("node-modules/@dcloudio/uni-ui/lib/uni-rate/uni-rate").then(function(){return resolve(e("389a"))}.bind(null,e)).catch(e.oe)},u={data:function(){return{top:"0px",h:"0px",title:"",moviedata:[],show:!0}},components:{uniRate:o},onLoad:function(n){var e=this;console.log(n),t.showLoading({title:"玩命加载中..."}),this.title=n.title;var o=t.getMenuButtonBoundingClientRect();console.log(o),this.top=o.top+2+"px",this.h=o.height+"px",setTimeout((function(){t.request({url:"http://t.yushu.im/v2/movie/subject/"+n.id,data:{apikey:"0df993c66c0c636e29ecbb5344252a4a"},success:function(n){console.log(n.data),e.moviedata=n.data,t.hideLoading(),e.show=!1}})}),1e3)},methods:{backpages:function(){t.navigateBack()}}};n.default=u}).call(this,e("543d")["default"])},"5ca9":function(t,n,e){"use strict";var o,u=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}))},6297:function(t,n,e){},"6e50":function(t,n,e){"use strict";e.r(n);var o=e("5ca9"),u=e("2c86");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("7a65");var a,c=e("f0c5"),r=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,"237be5a0",null,!1,o["a"],a);n["default"]=r.exports},"7a65":function(t,n,e){"use strict";var o=e("6297"),u=e.n(o);u.a},c7d8:function(t,n,e){"use strict";(function(t){e("fe98");o(e("66fd"));var n=o(e("6e50"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["c7d8","common/runtime","common/vendor"]]]);