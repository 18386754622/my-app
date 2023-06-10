<script>
import * as echarts from 'echarts'
export default {
    data() {
        return {
            option: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    },
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line'
                    },
                ]
            }
        }
    },
    mounted() {
        let chartDom = this.$refs.chart
        let myChart = echarts.init(chartDom)
        this.option && myChart.setOption(this.option)
    }, methods: {

    }
}
</script>

<template>
    <div ref="chart" style="height: 500px;"></div>
</template>

<style scoped lang='scss'></style>