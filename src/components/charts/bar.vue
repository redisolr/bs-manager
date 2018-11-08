<template>
    <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'

echarts.registerTheme('tdTheme', tdTheme)
export default {
	name: 'ChartBar',
	props: {
		value: Object,
		text: String,
		subtext: String
	},
	mounted() {
		this.$nextTick(() => {
			let xAxisData = this.value.map(_ => _.name)
			let seriesData = this.value.map(_ => _.value)
			let option = {
				title: {
					text: this.text,
					subtext: this.subtext,
					x: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: xAxisData
				},
				xAxis: {
					type: 'category',
					data: xAxisData
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					data: seriesData,
					type: 'bar'
				}]
			}
			let dom = echarts.init(this.$refs.dom, 'tdTheme')
			dom.setOption(option)
		})
	}
}
</script>

<style lang="less">
    .charts {
        //
    }
</style>
