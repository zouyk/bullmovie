<template>
	<view class="big_main">
		
		<view v-if="show" class="show_view">
			
		</view>	
	
		<view v-else  class="main">
			<!-- 头部 -->
				<view class="top_search" :style="{'margin-top':top,'height':h}">
				    <text @tap="backpages" style="width: 50px;"> 返回 </text>   <text style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ title }}</text> <text style="width: 50px;"></text>
				</view>
					
					<scroll-view scroll-y class="scroll_view" >
						<!-- 电影信息 -->
						<view class="movie_title">
							<image :src="moviedata.images.large" mode=""></image>
							<view class="right_view">
								<text style="font-size: 20px;font-weight: bold;color: #333333;">{{ moviedata.title +'('+ moviedata.year+')'}}</text>
								<text style="font-size: 16px;">  {{ moviedata.title +'('+ moviedata.year+')'}} </text>
								<view style="margin: 20px 0;"> <text v-for="item in moviedata.genres">{{ item }}/ </text>  片长{{ 1  }}分钟</view>
								<view class="btn_view">
									<button size="mini" type="default"> 想看 </button>
									<button size="mini" type="default" style="margin-left: 20px;"> 看过 </button>
								</view>
							</view>
						</view>
						
						<!-- 豆瓣评分 -->
						<view class="rage_view">
							<view class="rage_title"> 
								 <text>豆瓣评分 </text>
								 <text>  >> </text>
							 </view>
							<view class="rage_bottom">
								<text style="font-size: 24px;font-weight: bold;"> {{ moviedata.rating.average }} </text>
								<uniRate size='20'  v-model="moviedata.rating.average/2" />
							</view>
							 
						</view>
						
						
						<!-- 简介 -->
						<view class="take_view">
							<text style="font-size: 18px; font-weight: bold;margin-bottom: 15px;">简介</text>
							<view style="widht:100%"> {{ moviedata.summary }} </view>
						</view>
						
						<!-- 提示 -->
						<view class="take_view">
							<text style="font-size: 18px; font-weight: bold;margin-bottom: 15px;">提示：</text>
							<view style="widht:100%"> {{ moviedata.warning }} </view>
						</view>
							
					</scroll-view>
		
		</view>
		
	
		
		
		
	</view>
</template>

<script>
	import {uniRate} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				top:'0px',
				h:'0px',
				title:'',
				moviedata:[],
				show:true
			}
		},
		components:{
			uniRate,
		},
		onLoad(obj) {
					console.log(obj)
			//加载等待
			uni.showLoading({
			    title: '玩命加载中...'
			});
			this.title = obj.title
			
			let gettop = uni.getMenuButtonBoundingClientRect()
			console.log(gettop)
			this.top = (gettop.top + 2) + 'px'
			this.h = gettop.height + 'px'
	
			// 发送请求
			setTimeout(()=>{
				uni.request({
					url:'http://t.yushu.im/v2/movie/subject/'+obj.id,
					data:{
						apikey:'0df993c66c0c636e29ecbb5344252a4a'
					},
					success:res=>{
						console.log(res.data)
						this.moviedata = res.data
						
						uni.hideLoading()
						this.show= false
					}
				})
				
			},1000)
			
			
		},
		methods: {
			backpages(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	@base: #F0AD4E;
	

	
	.top_search {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: @base;
		color: #fff;
		padding: 0  10px;
	}
	.scroll_view{
		padding: 0 10px;
		box-sizing: border-box;
	}
	.movie_title{
		display: flex;
		padding: 15rpx;
		image{
			width: 120px;
			height: 160px;
		}
		.right_view{
			color: #808080;
			display: flex;
			font-size: 12px;
			flex-direction: column;
			padding:10px 20px;
			flex: 1;
			button{
				background: @base;
				color: #fff;
			}
		}
	}
	
	.rage_view{
		padding: 10px;
		background: #F1F1F1;
		border-radius: 5px;
		margin-top: 10px;
		.rage_title{
			display: flex;
			justify-content: space-between;
		}
		.rage_bottom{
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
	}
	.take_view{
		display: flex;
		margin-top: 20px;
		flex-direction: column;
		white-space: normal;
	}

</style>
