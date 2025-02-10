// components/WeeklySalesChart.tsx
import ReactECharts from 'echarts-for-react';

const WeeklySalesChart = () => {
  const data = [
    { name: 'W1', value: 47 },
    { name: 'W2', value: 42 },
    { name: 'W3', value: 45 },
    { name: 'W4', value: 39 },
    { name: 'W5', value: 35 },
    { name: 'W6', value: 32 },
    { name: 'W7', value: 40 },
  ];

  const option = {
    grid: {
      top: '5%',
      right: '1%',
      left: '1%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.name),
      show: false // 隱藏 X 軸
    },
    yAxis: {
      type: 'value',
      show: false // 隱藏 Y 軸
    },
    series: [
      {
        data: data.map(item => item.value),
        type: 'bar',
        itemStyle: {
          color: '#2c7be5',
          borderRadius: [3, 3, 0, 0] // 設置柱狀圖頂部圓角
        },
        barWidth: '30%' // 調整柱子寬度
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const dataIndex = params[0].dataIndex;
        return `${data[dataIndex].name}: $${data[dataIndex].value}K`;
      }
    }
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: '100px', width: '100%' }}
      opts={{ renderer: 'svg' }} // 使用 SVG 渲染器以獲得更好的清晰度
    />
  );
};

export default WeeklySalesChart;