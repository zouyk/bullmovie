<template>
	<view class="big_main">

		<view v-if="show" class="show_view">

		</view>


		<view class="main" v-else>

			<!-- 头部样式 -->
			<view class="top_search" :style="{'margin-top':top,'height':h}">
				<text class="right_text" @tap="jumpback"> 返回</text>
				<text>{{ obj.title }}</text>
				<text class="right_text"></text>
			</view>


			<scroll-view scroll-y class="scroll_view">

				<view class="banner">
					<image :src="obj.img"></image>
				</view>

				<view class="cont_view">
					<view class="title">
						<text> 看过122部 / 共250部 </text>
						<navigator class="login_btn" @tap="getlogininfo"> 登录查看成就 </navigator>
					</view>

					<view class="movie_rank" v-for="(item,index) in tablist " :key='item.id'  @tap = 'jumptoinfo(item.id,item.title)'>
						<view class="movie_top"> No.{{index+1}}</view>
						<view class="movie_middle">
							<image :src="item.images.large" mode=""></image>
							<view class="inner_center">
								<text>{{ item.title }}</text>
								<view class="rate">
									<uniRate size='15' v-modle='item.rating.average' /><text>{{ item.rating.average }}</text>
								</view>
								<view class="">
									<text>{{item.countries[0]}}/</text>
									<text v-for="i in item.genres">{{i}}/</text>
									<text v-for="child in item.casts">{{child.name}}/</text>


								</view>
							</view>

							<view class="right_view">
								<uniRate size='15' max='1' />
								<text>看过</text>
							</view>
						</view>
						<text class="buttom_text"> 希望让人自由 </text>


					</view>

					<view class="fooder">
						<text class="fooder_text">没有更多了</text>
					</view>


				</view>



			</scroll-view>
		</view>


	</view>
</template>

<script>
	import {
		uniRate
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				top: '0px',
				h: '0px',
				obj: {},
				tablist: [],
				show: true
			}
		},
		components: {
			uniRate,
		},
		onLoad(obj) {
			uni.showLoading({
				title: '玩命加载中...'
			});
			console.log(obj.url)
			let gettop = uni.getMenuButtonBoundingClientRect()
			console.log(gettop)
			this.top = (gettop.top + 2) + 'px'
			this.h = gettop.height + 'px'
			this.obj = obj

			//发送请求
			uni.request({
				url: obj.url,
				data: {
					apikey: '0df993c66c0c636e29ecbb5344252a4a',
					start: 2,
					count: 10,

				},
				success: res => {
					console.log(res)
					this.tablist = res.data.subjects
					uni.hideLoading()
					this.show = false
				}
			})



		},
		methods: {
			jumpback() {
				uni.navigateBack()
			},
			jumptoinfo(id , title){
				console.log(id,title)
				uni.navigateTo({
					url:'../movieinfo/movieinfo?id='+id+'&title='+ title
				})
			},
			getlogininfo(){
				uni.showLoading({
					title:'正在获取登录信息,请稍等!'
				})
				
				setTimeout( ()=>{
					
					uni.hideLoading()
				},3000 )
				
			}
		}
	}
</script>

<style lang="less" scoped>
	@base: #F0AD4E;

	.top_search {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: @base;
		color: #fff;

		.right_text {
			width: 80px;
			padding: 0 10px;
		}
	}

	.banner {
		image {
			width: 100%;
			height: 400rpx;
		}
	}

	.cont_view {
		display: flex;
		flex-direction: column;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 0;
			color: #a16c23;

			.login_btn {
				width: 100px;
				padding: 5px;
				background-color: @base ;
				border-radius: 5px;
			}
		}


		.movie_rank {
			display: flex;
			flex-direction: column;

			.movie_top {
				width: 80px;
				height: 30px;
				background-color: @base;
				line-height: 30px;
				text-align: center;
				border-radius: 5px;
			}

			.movie_middle {
				display: flex;
				justify-content: space-between;
				padding: 10px 0;

				image {
					width: 100px;
					height: 140px;
				}

				.right_view {
					width: 100px;
					height: 140px;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					color: @base;
				}

				.inner_center {
					flex: 1;
					padding: 5px 10px;
					box-sizing: border-box;

					.rate {
						display: flex;
						align-items: center;
						margin: 10px 0;
					}
				}
			}

			.buttom_text {
				width: 100%;
				height: 30px;
				background-color: #F1F1F1;
				color: #C0C0C0;
				padding: 10px 5px;
				margin-bottom: 10px;
			}
		}



	}
</style>
