<template>
	<view class="container">
		<view class="trending-wrapper">
			<view class="trending padding-xs margin-tb-sm flex bg-white radius" v-for="(item,index) in projects" :key="index">
				<view class="detail-wrapper flex flex-direction justify-between flex-treble">
					<view class="text-lg text-blue padding-xs margin-xs">
						<text>{{item.author}}</text>/
						<text class="text-bold">{{item.name}}</text>
					</view>
					<view class="cu-avatar-group padding-xs margin-xs">
						<text class="padding-right">Built by</text>
						<view class="cu-avatar round sm" v-for="(author,index) in item.builtBy" :key="index" :style="[{ backgroundImage:'url(' + author.avatar + ')' }]"></view>
					</view>
					<view class="desc padding-left-xs margin-xs">{{item.description}}</view>
					<view class="star-wrapper text-sm flex justify-between padding-xs margin-xs">
						<text v-if="item.language" class="cuIcon-round" :style="{color:item.languageColor}">{{item.language}}</text>
						<text class="cuIcon-favorfill">{{item.stars}}</text>
						<text class="star cuIcon-activityfill">{{item.forks}}</text>
						<text class="star cuIcon-hotfill">{{item.currentPeriodStars}}</text>
					</view>
				</view>
				<view class="image-wrapper flex-sub flex flex-direction justify-center">
					<image lazy-load="true" class="round margin-xs" :src="item.avatar"></image>
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

				.detail-wrapper {
					.desc {
						text-overflow: ellipsis;
						overflow: hidden;
						color: #000;
						text-overflow: -o-ellipsis-lastline;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}
				}

				.image-wrapper {

					image {
						width: 160rpx;
						height: 160rpx;
					}
				}
			}
		}
	}
</style>
