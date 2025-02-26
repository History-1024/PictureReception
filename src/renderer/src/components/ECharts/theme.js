const defaultTheme = {
  color: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
  ],
  backgroundColor: 'rgba(0, 0, 0, 0)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#464646'
    },
    subtextStyle: {
      color: '#6E7079'
    }
  },
  line: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false
  },
  radar: {
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ccc'
    }
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  candlestick: {
    itemStyle: {
      color: '#eb5454',
      color0: '#47b262',
      borderColor: '#eb5454',
      borderColor0: '#47b262',
      borderWidth: 1
    }
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    },
    lineStyle: {
      width: 1,
      color: '#aaa'
    },
    symbolSize: 4,
    symbol: 'emptyCircle',
    smooth: false,
    color: [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc'
    ],
    label: {
      color: '#eee'
    }
  },
  map: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5
    },
    label: {
      color: '#000'
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1
      },
      label: {
        color: 'rgb(100,0,0)'
      }
    }
  },
  geo: {
    itemStyle: {
      areaColor: '#eee',
      borderColor: '#444',
      borderWidth: 0.5
    },
    label: {
      color: '#000'
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,215,0,0.8)',
        borderColor: '#444',
        borderWidth: 1
      },
      label: {
        color: 'rgb(100,0,0)'
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisLabel: {
      show: true,
      color: '#6E7079'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#E0E6F1']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisLabel: {
      show: true,
      color: '#6E7079'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#E0E6F1']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisLabel: {
      show: true,
      color: '#6E7079'
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#E0E6F1']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: '#6E7079'
      }
    },
    axisLabel: {
      show: true,
      color: '#6E7079'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#E0E6F1']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
      }
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999'
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#999999'
    }
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#ccc',
        width: 1
      },
      crossStyle: {
        color: '#ccc',
        width: 1
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#DAE1F5',
      width: 2
    },
    itemStyle: {
      color: '#A4B1D7',
      borderWidth: 1
    },
    controlStyle: {
      color: '#A4B1D7',
      borderColor: '#A4B1D7',
      borderWidth: 1
    },
    checkpointStyle: {
      color: '#316bf3',
      borderColor: 'fff'
    },
    label: {
      color: '#A4B1D7'
    },
    emphasis: {
      itemStyle: {
        color: '#FFF'
      },
      controlStyle: {
        color: '#A4B1D7',
        borderColor: '#A4B1D7',
        borderWidth: 1
      },
      label: {
        color: '#A4B1D7'
      }
    }
  },
  visualMap: {
    color: ['#bf444c', '#d88273', '#f6efa6']
  },
  dataZoom: {
    handleSize: 'undefined%',
    textStyle: {}
  },
  markPoint: {
    label: {
      color: '#eee'
    },
    emphasis: {
      label: {
        color: '#eee'
      }
    }
  }
}
const dark = {
  color: [
    '#13c2c2',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc'
  ],
  backgroundColor: 'rgba(41,52,65,0)',
  textStyle: {
    color: '#fff'
  },
  title: {
    textStyle: {
      color: '#ffffff'
    },
    subtextStyle: {
      color: '#dddddd'
    }
  },
  line: {
    itemStyle: {
      borderWidth: '4'
    },
    lineStyle: {
      width: '3'
    },
    symbolSize: '1',
    symbol: 'circle',
    smooth: true
  },
  radar: {
    itemStyle: {
      borderWidth: '4'
    },
    lineStyle: {
      width: '3'
    },
    symbolSize: '0',
    symbol: 'circle',
    smooth: true
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ffffff'
    }
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    }
  },
  candlestick: {
    itemStyle: {
      color: '#fc97af',
      color0: 'transparent',
      borderColor: '#fc97af',
      borderColor0: '#87f7cf',
      borderWidth: '2'
    }
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc'
    },
    lineStyle: {
      width: '1',
      color: '#ffffff'
    },
    symbolSize: '0',
    symbol: 'circle',
    smooth: true,
    color: ['#fc97af', '#87f7cf', '#f7f494', '#72ccff', '#f7c5a0', '#d4a4eb', '#d2f5a6', '#76f2f2'],
    label: {
      color: '#293441'
    }
  },
  map: {
    itemStyle: {
      areaColor: '#f3f3f3',
      borderColor: '#999999',
      borderWidth: 0.5
    },
    label: {
      color: '#893448'
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,178,72,1)',
        borderColor: '#eb8146',
        borderWidth: 1
      },
      label: {
        color: 'rgb(137,52,72)'
      }
    }
  },
  geo: {
    itemStyle: {
      areaColor: '#f3f3f3',
      borderColor: '#999999',
      borderWidth: 0.5
    },
    label: {
      color: '#893448'
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(255,178,72,1)',
        borderColor: '#eb8146',
        borderWidth: 1
      },
      label: {
        color: 'rgb(137,52,72)'
      }
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      show: true,
      color: '#ffffff'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#e6e6e6']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#ffffff'
      }
    },
    axisLabel: {
      show: true,
      color: '#ffffff'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#e6e6e6']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666666'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      color: '#aaaaaa'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#e6e6e6']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#666666'
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      color: '#aaaaaa'
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#e6e6e6']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999'
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#ffffff'
    }
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1
      },
      crossStyle: {
        color: '#cccccc',
        width: 1
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#87f7cf',
      width: 1
    },
    itemStyle: {
      color: '#87f7cf',
      borderWidth: 1
    },
    controlStyle: {
      color: '#87f7cf',
      borderColor: '#87f7cf',
      borderWidth: 0.5
    },
    checkpointStyle: {
      color: '#fc97af',
      borderColor: '#fc97af'
    },
    label: {
      color: '#87f7cf'
    },
    emphasis: {
      itemStyle: {
        color: '#f7f494'
      },
      controlStyle: {
        color: '#87f7cf',
        borderColor: '#87f7cf',
        borderWidth: 0.5
      },
      label: {
        color: '#87f7cf'
      }
    }
  },
  visualMap: {
    color: ['#fc97af', '#87f7cf']
  },
  dataZoom: {
    backgroundColor: 'rgba(255,255,255,0)',
    dataBackgroundColor: 'rgba(114,204,255,1)',
    fillerColor: 'rgba(114,204,255,0.2)',
    handleColor: '#72ccff',
    handleSize: '100%',
    textStyle: {
      color: '#333333'
    }
  },
  markPoint: {
    label: {
      color: '#293441'
    },
    emphasis: {
      label: {
        color: '#293441'
      }
    }
  }
}
export { dark, defaultTheme }
export default defaultTheme
