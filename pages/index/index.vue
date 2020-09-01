<template>

	<view class="big_main">

		<view v-if="show" class="show_view">
		</view>


		<view class="main" v-else>
			<!-- 顶部搜索 -->
			<view class="top_search" :style="{'margin-top':top,'height':h}">
				<input @focus="searchJump" placeholder="电影/导演/演员"></input>
			</view>

			<scroll-view scroll-y class="scroll_view">
				<!-- 影院热映 -->
				<view class="hot_movie" v-for="(item , index) in tablist" :key='index'>
					<!-- 标题 -->
					<view class="title_view">
						<text>{{ item.name }}</text>
						<navigator :url="'../listinfo/listinfo?api=' + item.api+'&name='+item.name ">查看更多></navigator>
					</view>
					<!-- 电影 -->
					<scroll-view class="cont_movie" scroll-x>
						<view class="cont_view" v-for="i in item.children" :key='i.id'>
							<navigator :url="'../movieinfo/movieinfo?id='+ i.id +'&title=' + i.title ">
								<image :src="i.images.large"></image>
								<view class="text_show">
									<text>{{ i.title }}</text>
								</view>
								<uniRate v-model='i.rating.average/2' size='15' />
							</navigator>
						</view>
					</scroll-view>
				</view>

				<view class="fooder">
					<text class="fooder_text">没有更多了</text>
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
				show: true,
				hotlist: [],
				tablist: [{
						id: 0,
						api: 'http://t.yushu.im/v2/movie/in_theaters',
						name: '影院热映',
						params: {
							apikey: '0df993c66c0c636e29ecbb5344252a4a',
							start: 1,
							count: 10
						},
						children: []
					}, {
						id: 1,
						api: 'http://t.yushu.im/v2/movie/top250',
						name: '牛评热门',
						params: {
							apikey: '0df993c66c0c636e29ecbb5344252a4a',
							start: 30,
							count: 10
						},
						children: []
					}, {
						id: 2,
						api: 'http://t.yushu.im/v2/movie/coming_soon',
						name: '近期热门',
						children: [],
						params: {
							apikey: '0df993c66c0c636e29ecbb5344252a4a',
							start: 1,
							count: 10
						}
					},
					{
						id: 3,
						api: 'http://t.yushu.im/v2/movie/top250',
						name: '近期热门',
						children: [],
						params: {
							apikey: 'http://t.yushu.im/v2/movie/in_theaters',
							start: 40,
							count: 10
						}
					},
					{
						id: 4,
						api: 'http://t.yushu.im/v2/movie/top250',
						name: '近期热门',
						children: [],
						params: {
							apikey: '0df993c66c0c636e29ecbb5344252a4a',
							start: 30,
							count: 10
						}
					}
				]
			}
		},
		components: {
			uniRate,
		},
		onLoad() {
			uni.showLoading({
				title: '玩命加载中...'
			})
			let gettop = uni.getMenuButtonBoundingClientRect()
			console.log(gettop)
			this.top = (gettop.top + 2) + 'px'
			this.h = gettop.height + 'px'
			//调用接口

			for (let i = 0; i < this.tablist.length; i++) {
				this.request(this.tablist[i])
			}
			uni.hideLoading()
			this.show = false	
			
		},
		methods: {
			request(obj) {
				uni.request({
					url: obj.api,
					data: obj.params,
					success(res) {
						obj.children = res.data.subjects
					}
				});
			},
			searchJump() {
				uni.navigateTo({
					url: '../sreach/sreach'
				})
			}


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

		input {
			background-color: #fff;
			height: 30px;
			border-radius: 10px;
			margin-left: -60px;
			width: 400rpx;
			padding-left: 10px;
			box-sizing: border-box;
		}
	}

	.hot_movie {
		padding: 0 20rpx;

		.title_view {
			padding: 20px 0;
			display: flex;
			justify-content: space-between;

			navigator {
				color: @base;
			}

			text {
				font-weight: bold;
			}
		}

		.cont_movie {
			width: 100%;
			white-space: nowrap;

			.cont_view {
				display: inline-block;
				margin: 0 10px;
				width: 100px;

				image {
					width: 100px;
					height: 140px;
				}



			}
		}

		.text_show {
			overflow: hidden;
			width: 80px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
