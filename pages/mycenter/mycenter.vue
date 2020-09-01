<template>
	<view class="main">
		<!-- 头部 -->
		<view class="top_search" :style="{'margin-top':top,'height':h}">
			<text>书影音档案</text>
		</view>

		<scroll-view scroll-y="true" class="scroll_view">
			<!-- 登录 -->
			<view class="login_view">
				<button type="default" size="mini">登录</button>
			</view>

			<!-- 我的书影音 -->
			<view class="my_movie">
				<!-- title -->
				<view class="title_view">
					<text style="font-size: 20px;font-weight: bold;">我的书影音</text>
					<text style="color: #333333;"> 登录查看> </text>
				</view>

				<!-- 分析 -->
				<view class="Analysis" v-for="item in list" :key="item">
					<view class="left_view">
						<image :src="item.img" style="width: 30px;height: 30px;"></image>
						<view>
							<text>{{ item.title }}</text>
							<text>{{item.look}}看过</text>
						</view>
					</view>

					<view class="right_view">
						<view class="text_view">
							<text>标记0部影片</text>
							<text>开启观影分析</text>
						</view>

						<view class="btn_text">
							<button type="default" size="mini">立即开启</button><text>></text>
						</view>
					</view>

				</view>
			</view>
			<view class="version">
				版本 1.0.1
			</view>
		</scroll-view>

		




	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: '0px',
				h: '0px',
				list: [{id:0,title:'观影分析',img:'../../static/movie.png',look:'120',pos:'12'},
				 {id:1,title:'读书分析',img:'../../static/book.png',look:'90',pos:'75'}, 
				 {id:2,title:'音乐分析',img:'../../static/misc.png',look:'890',pos:'102'}]
			}
		},
		onLoad() {
			let gettop = uni.getMenuButtonBoundingClientRect()
			console.log(gettop)
			this.top = (gettop.top + 2) + 'px'
			this.h = gettop.height + 'px'
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	@base: #F0AD4E;

	.top_search {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: @base;
		color: #222222;
	}

	.login_view {
		width: 100%;
		height: 360rpx;
		background: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1109233631,1503222308&fm=26&gp=0.jpg) 0 -10px no-repeat;
		background-size: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		button {
			width: 120px;
			height: 40px;
			line-height: 40px;
			font-size: 20px;
			color: @base;
		}
	}

	.my_movie {
		.title_view {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 10px;
		}
	}


	.Analysis {
		display: flex;
		justify-content: space-between;
		padding: 10px 20px;
		font-size: 14px;
		color: #333333;

		.left_view {
			display: flex;
			align-items: flex-end;

			image {
				margin-bottom: 5px;
			}

			>view {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 5px;
			}
		}

		.right_view {
			display: flex;

			.text_view {
				display: flex;
				flex-direction: column;
				color: #999999;
			}

			.btn_text {
				display: flex;
				justify-content: center;
				align-items: center;

				button {
					margin: 0 5px;
				}
			}
		}
	}
	.scroll_view{
		position: relative;
	}
	.version{
		position: absolute;
		bottom: 0;
		text-align: center;
		width: 100%;
		color: #C0C0C0;
		font-size: 12px;
		margin-bottom: 5px;
		}
</style>
