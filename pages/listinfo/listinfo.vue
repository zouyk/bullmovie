<template>
		<view class="big_main">
	
			<view v-if="show" class="show_view">
			</view>
	
	
	<view class="main" v-else>
		<!-- 顶部搜索 -->
				<view class="top_search" :style="{'margin-top':top,'height':h}">
				<text class="left_text" @tap="backpage"> 返回 </text>	<text>  {{ name }} </text> <text class="left_text"></text>
				</view>
				
				<scroll-view class="movie_cont scroll_view" scroll-y  @scrolltolower='reachButton' >
					<view class="title_view">
						<title>{{ name }}</title>
					</view>	
						
					<view class="movie_info" v-for="item in tablist" :key='item.id' @tap = 'jumptoinfo(item.id,item.title)'>
							<image :src="item.images.large"></image>
							<view class="right_view">
								<view>
									<text>{{ item.title }}</text> <text> {{ item.rating.average}} </text>
								</view>
								<text style="margin: 5px 0;">{{ item.title }}</text>
								<text class="bottom_text">导演：{{ item.casts[0].name }}</text>
							</view>
					</view>
				</scroll-view>
			
	</view>
	
	</view>	
	
</template>

<script>
	export default {
		data() {
			return {
				top:'0px',
				h:'0px',
				name:'',
				api:'',
				start:0,
				count:10,
				tablist:[],
				show:true,
			}
		},
		onLoad(obj) {
			
			
			console.log(obj)
			this.name = obj.name  
			this.api = obj.api
			
			
			let gettop = uni.getMenuButtonBoundingClientRect()
			console.log(gettop)
			this.top = (gettop.top + 2) + 'px'
			this.h = gettop.height + 'px'
			
			//发送请求
			this.request()
			
			
			
		},
		methods: {
			backpage(){
				uni.navigateBack()
			},
			request(){
				uni.showLoading({
					title:'玩命加载中'
				})
				
				uni.request({
					url:this.api,
					data:{
					apikey:'0df993c66c0c636e29ecbb5344252a4a',
					start:this.start,
					count:this.count
					},
					success:res=>{
						console.log(res.data)
						this.tablist = this.tablist.concat(res.data.subjects) 
						uni.hideLoading()
						this.show =false
					}
				})
			},
			reachButton(){
				this.start+=this.count
				 this.request()
			},
			jumptoinfo(id , title){
				console.log(id,title)
				uni.navigateTo({
					url:'../movieinfo/movieinfo?id='+id+'&title='+ title
				})
			}
		},
		
	}
</script>

<style lang="less"  scoped>
	@base: #F0AD4E;
	
	.top_search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: @base;
		color: #fff;
		padding: 0 10px;
		.left_text{
			width: 60px;
			color: #fff;
		}
		}
		
	.movie_cont{
		.title_view{
			margin: 20px 0 ;
			font-size: 24px;
			color: #555555;
		}
		.movie_info{
			display: flex;
			padding: 0 20px;
			image{
				width: 100px;
				height: 120px;
			}
			.right_view{
				display: flex;
				flex-direction: column;
				padding: 15px 10px;
				margin-top: 20px;
				justify-content: center;
				flex: 1;
				color: #808080;
				font-size: 12px;
				>view{
					display: flex;
					justify-content: space-between;
					text:nth-child(1){
						font-size: 24px;
						color: #333333;
						font-weight: bold;
						width: 120px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					text:nth-child(2){
						font-size: 24px;
						color: #DD524D;
					}
				}
				.bottom_text{
					font-size: 20px;
				}
			}
		}
	}	
		
</style>
