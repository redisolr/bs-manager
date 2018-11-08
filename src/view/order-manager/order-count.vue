<template>
    <Card>
        <p slot="title">
            <Icon type="ios-keypad"></Icon>
            订单统计
        </p>
        <div class="margin-top-10">
            <RadioGroup v-model="phone">
                <Radio label="1">
                    <span>饼状图</span>
                </Radio>
                <Radio label="2">
                    <span>折线图</span>
                </Radio>
                <Radio label="3">
                    <span>柱状图</span>
                </Radio>
            </RadioGroup>
            <chart-pie v-if="phone === '1'" style="height: 300px;" :value="data" :text="title"/>
            <chart-line v-if="phone === '2'" style="height: 300px;" :value="data" :text="title"/>
            <chart-bar v-if="phone === '3'" style="height: 300px;" :value="data" :text="title"/>
        </div>
    </Card>
</template>

<script>
import {ChartPie, ChartBar, ChartLine} from '_c/charts'
import {countByStatus} from '../../api/order.js';
export default {
	name: "order-count",
	components: {
		ChartPie,
		ChartBar,
		ChartLine
	},
	data() {
		return {
			phone: '1',
            title: '订单状态统计',
			data: []
		}
	},
	methods: {
		_countByStatus() {
			countByStatus().then(res => {
				let data = res.result;
				data.map(item => {
					if (item.name === 0){
						item.name = '未付款';
                    } else if (item.name === 1) {
						item.name = '已付款';
					} else if (item.name === 3) {
						item.name = '已发货';
					} else if (item.name === 2) {
						item.name = '未发货';
					} else if (item.name === 4) {
						item.name = '交易成功';
					} else if (item.name === 5) {
						item.name = '交易关闭';
					} else if (item.name === 6) {
						item.name = '交易失败';
					} else if (item.name === 7) {
						item.name = '删除';
					}
					this.data.push(item);
                });
			});
        }
    },
	mounted() {
		this._countByStatus();
	}
}
</script>

<style scoped>

</style>