<template>
	<view class="container">
		<modal :languages="languages" @language="onLanguage" @since="onSince"></modal>
		<loading v-if="loading"></loading>
		<view class="trending-wrapper">
			<view class="trending padding-xs margin-sm flex bg-white radius shadow-warp" v-for="(item,index) in projects" :key="index">
				<view class="detail-wrapper flex flex-direction justify-between flex-treble">
					<view class="text-df text-blue padding-xs margin-xs">
						<text @click="goUrl('https://github.com/'+item.author)">{{item.author}}</text>
						/
						<text @click="goUrl(item.url)" class="text-bold animation-fade">{{item.name}}</text>
					</view>
					<view class="cu-avatar-group padding-xs margin-xs">
						<text class="padding-right">Built by</text>
						<view class="cu-avatar round sm" v-for="(author,index) in item.builtBy" :key="index" @click="goUrl(author.href)"
						 :style="[{ backgroundImage:'url(' + author.avatar + ')' }]"></view>
					</view>
					<view class="desc padding-left-xs margin-xs">{{item.description}}</view>
					<view class="bottom-wrapper text-sm flex justify-between padding-xs margin-xs">
						<view v-if="item.language" class="language-wrapper">
							<view :style="{'background-color':item.languageColor}" class="circle margin-right-xs"></view>
							<text>{{item.language}}</text>
						</view>
						<text>
							<text class="cuIcon-favorfill margin-right-xs"></text>
							<text>{{item.stars}}</text>
						</text>
						<text>
							<text class="cuIcon-fork margin-right-xs"></text>
							<text>{{item.forks}}</text>
						</text>
						<text>
							<text class="cuIcon-hotfill margin-right-xs"></text>
							<text>{{item.currentPeriodStars}}</text>
						</text>
					</view>
				</view>
				<view class="image-wrapper" @click="goUrl('https://github.com/'+item.author)">
					<image lazy-load="true" class="round margin-xs" :src="item.avatar"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loading from '@/components/loading/loading.vue'
	import modal from '@/components/modal/modal.vue'
	import {
		getRepositories,
		getLanguages
	} from '@/api/api'

	export default {
		data() {
			return {
				projects: [],
				currentLanguage: '',
				currentSince: '',
				loading: true,
				languages: []
			}
		},
		onLoad() {
			this._getRepositories()
			this._getLanguages()
		},
		methods: {
			_getRepositories(language, since) {
				this.loading = true
				this.projects = []
				getRepositories(language, since).then((res) => {
					this.projects = res
					this.loading = false
				})
			},
			_getLanguages() {
				getLanguages().then((res) => {
					this.languages = res
				})
			},
			goUrl(url) {
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifdef MP
				uni.navigateTo({
					url: '/pages/web-view/web-view?url=' + url
				});
				// #endif
			},
			onLanguage(lang) {
				this.currentLanguage = lang === 'all' ? '' : lang
			},
			onSince(since) {
				this.currentSince = since
			}
		},
		components: {
			loading,
			modal
		},
		watch: {
			currentLanguage() {
				this._getRepositories(this.currentLanguage,this.currentSince)
			},
			currentSince() {
				this._getRepositories(this.currentLanguage,this.currentSince)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.trending-wrapper {
			.trending {

				.detail-wrapper {
					.desc {
						width: 70%;
						text-overflow: ellipsis;
						overflow: hidden;
						color: #000;
						text-overflow: -o-ellipsis-lastline;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
					}

					.bottom-wrapper {
						.language-wrapper {
							.circle {
								border-radius: 50%;
								display: inline-block;
								height: 24rpx;
								position: relative;
								top: 4rpx;
								width: 24rpx;
							}
						}
					}
				}

				.image-wrapper {

					position: absolute;
					right: 30rpx;
					bottom: 80rpx;

					image {
						width: 150rpx;
						height: 150rpx;
					}
				}
			}
		}
	}
</style>
