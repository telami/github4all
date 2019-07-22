<template>
    <view>
        <view class="cu-bar bg-white margin-top">
            <view class="action">
                <text class="cuIcon-title text-orange "></text> 侧边抽屉
            </view>
            <view class="action">
                <button class="cu-btn bg-blue shadow margin-left" @tap="showModal" data-target="DrawerModalR">Right</button>
            </view>
        </view>

        <view class="cu-modal drawer-modal justify-between" :class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
            <view class="cu-dialog basis-lg" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
                    <scroll-view  scroll-y="true" style="height: 740px">
                        <view class="flex flex-wrap justify-between">
                            <view v-for="(item,index) in languages" :key="index">
                                <view class="padding flex flex-direction">
                                    <button @tap.stop="selectLang(item.urlParam)" class="cu-btn bg-blue lg">{{item.name}}</button>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
    const EVENT_SELECT = 'select'

	export default {
		name: "modal",
        props: {
            languages: {
                type: Array,
                default () {
                    return []
                }
            },
        },
        data() {
            return {
                CustomBar: this.CustomBar,
                modalName: null
            }
        },
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
            selectLang(lang){
                this.$emit(EVENT_SELECT, lang)
                this.hideModal()
            }
		}
	}
</script>

<style scoped>

</style>
