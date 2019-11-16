<template>
    <view class="container">
        <view class="cu-bar">
            <view class="action">
                <button class="cu-btn bg-gradual-blue shadow-warp" @tap="showModal" data-target="SinceModal">{{currentSince}}
                </button>
            </view>
            <view class="action">
                <button class="cu-btn bg-gradual-blue shadow brown" @tap="showModal" data-target="LanguageModal">{{currentLanguage}}
                </button>
            </view>
        </view>

        <view class="cu-modal" :class="modalName==='SinceModal'?'show':''" @tap="hideModal">
            <view class="cu-dialog" @tap.stop="">
                <radio-group class="block" @change="sinceChange">
                    <view class="cu-list menu text-left">
                        <view class="cu-item" v-for="(item,index) in sinces" :key="index">
                            <label class="flex justify-between align-center flex-sub">
                                <view class="flex-sub">{{item.name}}</view>
                                <radio class="round" :checked="radio=='radio' + index?true:false"
                                       :value="item.urlParam"></radio>
                            </label>
                        </view>
                    </view>
                </radio-group>
            </view>
        </view>

        <view class="cu-modal" :class="modalName==='LanguageModal'?'show':''" @tap="hideModal">
            <view class="cu-dialog" @tap.stop="">
                <radio-group class="block" @change="languageChange">
                    <view class="cu-list menu text-left">
                        <view class="cu-item" v-for="(item,index) in languages" :key="index">
                            <label class="flex justify-between align-center flex-sub">
                                <view class="flex-sub">{{item.name}}</view>
                                <radio class="round" :checked="radio=='radio' + index?true:false"
                                       :value="item.urlParam"></radio>
                            </label>
                        </view>
                    </view>
                </radio-group>
            </view>
        </view>
    </view>
</template>

<script>
    const EVENT_LANGUAGE = 'language'
    const EVENT_SINCE = 'since'

    export default {
        name: "modal",
        props: {},
        data() {
            return {
                CustomBar: this.CustomBar,
                modalName: '',
                currentLanguage: 'All language',
                currentSince: 'Daily',
                radio: 'radio0',
                sinces: [
                    {urlParam: "daily", name: "Daily"},
                    {urlParam: "weekly", name: "Weekly"},
                    {urlParam: "monthly", name: "Monthly"}
                ],

                languages: [
                    {urlParam: "all", name: "All language"},
                    {urlParam: "java", name: "Java"},
                    {urlParam: "dart", name: "Dart"},
                    {urlParam: "go", name: "Go"},
                    {urlParam: "python", name: "Python"},
                    {urlParam: "vue", name: "Vue"},
                    {urlParam: "c", name: "C"},
                    {urlParam: "c++", name: "C++"},
                    {urlParam: "php", name: "PHP"},
                    {urlParam: "javascript", name: "Javascript"},
                    {urlParam: "ruby", name: "Ruby"},
                    {urlParam: "css", name: "Css"},
                    {urlParam: "shell", name: "Shell"},
                    {urlParam: "html", name: "Html"},
                    {urlParam: "lua", name: "Lua"}
                ]
            }
        },
        methods: {
            showModal(e) {
                this.modalName = e.currentTarget.dataset.target
            },
            hideModal(e) {
                this.modalName = null
            },
            languageChange(e) {
                this.currentLanguage = this.getLanguageName(e.detail.value)
                this.$emit(EVENT_LANGUAGE, e.detail.value)
                this.hideModal()
            },
            sinceChange(e) {
                this.currentSince = this.getSinceName(e.detail.value)
                this.$emit(EVENT_SINCE, e.detail.value)
                this.hideModal()
            },
            getLanguageName(urlParam) {
                for (let language of this.languages) {
                    if (urlParam === language.urlParam) {
                        return language.name
                    }
                }
            },
            getSinceName(urlParam) {
                for (let since of this.sinces) {
                    if (urlParam === since.urlParam) {
                        return since.name
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        .lang-select {
            width: 100%;
            position: fixed;
            z-index: 1000;
        }
    }

</style>
