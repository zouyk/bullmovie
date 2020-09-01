<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	page{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.scroll_view{
		flex: 1;
		height: 750rpx;
		}
	
	.main{
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.fooder{
		border-top: 1px solid  #C0C0C0;
		text-align: center;
		height: 40px;
		margin-top: 40px;
		.fooder_text{
			position: relative;
			bottom: 12px;
			background-color: #FFFFFF;
		}
		
	}
	.show_view{
		width: 100%;height: 100%; position: absolute;background-color: #F1F1F1;
	}
	.big_main{
		flex: 1;
	}

	
</style>
