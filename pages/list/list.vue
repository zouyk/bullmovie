<template>
	<view class="main">
		<!-- 头部 -->
		<view class="top_search" :style="{'margin-top':top,'height':h}">
			<text>榜单</text>
		</view>

		<scroll-view scroll-y class="scroll_view">
			<!-- 内容 -->
			<view class="movie_img">
				<image v-for="item in imagelist" :key='item' :src="item"></image>
			</view>

			<!-- 分类排行榜 -->
			<view class="rank_view" v-for=" item in tablist" :key='item.id' @tap='jumppage(item.url,item.title,item.img)'>
				<image :src="item.img "></image> 
				<view class="inner_view">
					<view v-for="(child,index) in item.children" :key='child.id' class="inner_right_view">
						<text class="first_text"> {{ index+'.'+child.title  }} </text>
						<text style="color:#F0AD4E ;margin-left: 5px;"> {{ child.rating.average }}分</text>
					</view>
				</view>
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
				imagelist: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1068558312,754499646&fm=26&gp=0.jpg',
					'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3826214037,3841664267&fm=26&gp=0.jpg'
				],
				tablist: [{
						id: 0,
						url: 'http://t.yushu.im/v2/movie/top250',
						img: '../../static/top250.jpg',
						children: [],
						title:'TOP250'
					},
					{
						id: 1,
						url: 'http://t.yushu.im/v2/movie/in_theaters',
						img: '../../static/hot.jpg',
						children: [],
						title:'牛评热映'
					},
					{
						id: 2,
						url: 'http://t.yushu.im/v2/movie/top250',
						img: '../../static/rank.jpg',
						children: [],
						title:'近期热门'
					},
				]
			}
		},
		onLoad() {
			let gettop = uni.getMenuButtonBoundingClientRect()
			console.log(gettop)
			this.top = (gettop.top + 2) + 'px'
			this.h = gettop.height + 'px'

			//发送请求
			for (let i = 0; i < this.tablist.length; i++) {
				this.request(this.tablist[i])
			}

		},
		methods: {
			request(obj) {
				uni.request({
					url: obj.url,
					data: {
						apikey: '0df993c66c0c636e29ecbb5344252a4a',
						start: 2,
						count: 3,
					},
					success: res => {
						obj.children = res.data.subjects
					}
				})
			},
			jumppage(url,title,img){
				uni.navigateTo({
					url:'../ranking/ranking?url='+url+'&title='+title+'&img='+img
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
		color: #fff;
	}

	.movie_img {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 700rpx;
			height: 350rpx;
			margin-top: 15px;

		}
	}

	.rank_view {
		display: flex;
		padding: 20px;
		box-sizing: border-box;
		image {
			width: 120px;
			height: 120px;
			flex: none;
		}

		.inner_view {
			display: flex;
			flex: 1;
			overflow: hidden;
			flex-direction: column;
			justify-content: center;
			padding: 10px;
			box-sizing:border-box;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 14px;
			border: 1px solid #ccc;
			.inner_right_view{
				display: flex;
				.first_text{
				width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;	
					}
			}
		}
	}
</style>
