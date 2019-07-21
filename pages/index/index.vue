<template>
	<view class="container">
		<view class="trending-wrapper">
			<view class="trending padding-xs margin-xs flex bg-white radius" v-for="(item,index) in projects" :key="index">
				<view class="detail-wrapper flex flex-direction justify-between flex-treble">
					<view class="name text-bold padding-xs margin-xs">{{item.name}}</view>
					<view class="desc padding-lr-xs margin-xs">{{item.description}}</view>
					<view class="star-wrapper flex justify-between padding-xs margin-xs">
						<text class="star cuIcon-favorfill">{{item.stars}}</text>
						<text class="star cuIcon-activityfill">{{item.forks}}</text>
						<text class="star cuIcon-hotfill">{{item.currentPeriodStars}}</text>
					</view>
				</view>
				<view class="image-wrapper flex-sub radius">
					<image lazy-load="true" class="padding-xs margin-xs" :src="item.avatar"></image>
					<view class="author margin-xs">{{item.author}}</view>
					<view class="cu-avatar-group padding-xs margin-xs">
						<view class="cu-avatar round sm" v-for="(author,index) in item.builtBy" :key="index" :style="[{ backgroundImage:'url(' + author.avatar + ')' }]"></view>
					</view>
				</view>
			</view>
		</view>
		<loading v-if="loading"></loading>
	</view>
</template>

<script>
	import loading from '@/components/loading.vue'
	import {
		getRepositories
	} from '@/api/api'
	export default {
		data() {
			return {
				projects: [],
				loading: true
			}
		},
		onLoad() {
			this._getRepositories()
		},
		methods: {
			_getRepositories() {
				getRepositories().then((res) => {
					this.projects = res
					this.loading = false
				})
			}
		},
		components: {
			loading
		}
	}
</script>

<style lang="scss">
	.container {
		.trending-wrapper {
			.trending {
				height: 350rpx;

				.image-wrapper {
					width: 160rpx;
					height: 160rpx;

					image {
						width: 160rpx;
						height: 160rpx;
					}

					.author {
						text-overflow: ellipsis;
						overflow: hidden;
						color: #000;
						text-overflow: -o-ellipsis-lastline;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}

				.detail-wrapper {
					.desc {
						text-overflow: ellipsis;
						overflow: hidden;
						color: #000;
						text-overflow: -o-ellipsis-lastline;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
			}
		}
	}
</style>
