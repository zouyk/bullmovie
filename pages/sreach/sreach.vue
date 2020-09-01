<template>




		<view class="main" v-else>
			<!-- 搜索框 -->
			<view class="search_view" :style="{'margin-top':top,'height':h}">
				<input v-model="value" @blur="jumpSearch" :style="{'height':h}" type="text" value="" placeholder="输入电影/演员" />
				<text :style="{'line-height':h}" @tap="backpage"> 取消</text>
			</view>

			<scroll-view scroll-y="true" class="scroll_view">
				<view style="font-size: 20px;color: #808080;margin: 20px 0;">搜索信息:</view>
				<!-- 电影列表 -->
				<view v-if="list.length>0">
					<view class="movelist" v-for="item in list" :key='item.id' @tap='checkMoveInfo(item.id,item.title)'>
						<image :src="item.images.large"></image>
						<view class="right_view">
							<view class="inner_view" style="font-size: 18px;font-weight:bold;display: flex;justify-content: space-between;">
								<text>{{item.title}}</text>
								<text style="color: red;"> {{ item.rating.average }} </text>
							</view>
							<text style="font-size: 12px;color: #808080;">{{item.title}}</text>
							<text style="font-size: 16px;color: #808080;">导演:{{item.casts[0].name}}</text>
						</view>
					</view>
				</view>
				<view v-else style="font-size: 30px;text-align: center; padding: 40px 0;"> 暂无信息 </view>
			</scroll-view>


		</view>
</template>

<script>
	export default {
		data() {
			return {
				top: '0px',
				h: '0px',
				value: '',
				list: [],
			}
		},

		onLoad() {
			let gettopInfo = uni.getMenuButtonBoundingClientRect()
			this.top = (gettopInfo.top - 1) + 'px'
			this.h = gettopInfo.height + 'px'
		},
		methods: {
			backpage() {
				uni.navigateBack()

			},
			jumpSearch() {
				console.log(this.value)
				// 发送请求
				uni.showLoading({
					title:'拼命搜索中...'
				})
				
				uni.request({
					url: 'http://t.yushu.im/v2/movie/search?apikey=0df993c66c0c636e29ecbb5344252a4a&q=' + this.value +
						'&start=0&count=10',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res.data.subjects)
						this.list = res.data.subjects
						uni.hideLoading()
						
					},
				});

			},
			checkMoveInfo(id, title) {
				console.log(id)
				uni.navigateTo({
					url: "/pages/movieinfo/movieinfo?id=" + id + "&title=" + title
				})
			}
		}
	}
</script>

<style>
	.search_view {
		display: flex;
		background-color: #F0AD4E;
		padding: 2px;
		padding-left: 20px;
	}

	.search_view text {
		width: 60px;
		padding: 0 10px;
		text-align: center;
		color: #fff;
		font-weight: bold;
	}

	.search_view input {
		background-color: #fff;
		wdith: 80%;
		border-radius: 15px;
		padding-left: 10px;

	}

	/* 电影列表 */
	.movelist {
		display: flex;
		padding: 0 20px;
		margin-top: 20px;
		margin-bottom: 10px;
	}

	.movelist image {
		width: 80px;
		height: 100px;
	}

	.movelist .right_view {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 20px;
		padding-right: 0;
		box-sizing: border-box;
	}
</style>
