[{
	"id": "MARKDOWN-X7nbOEKN4U",
	"i": "MARKDOWN-X7nbOEKN4U",
	"key": "MARKDOWN-X7nbOEKN4U",
	"siblings": null,
	"type": "MARKDOWN",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "MARKDOWN-X7nbOEKN4U",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "上证综指报数板",
			"vizType": "markdown",
			"vizDataBase": null,
			"datasourceType": "markdown",
			"datasourceDefine": "<center style=\"margin-top: 15px\"><font color=#008000 size=4>上证综合指数</font></center>\r\n\r\n<center style=\"margin-top: 10px\"><font color=#008000 size=5>3539.12</font></center>\r\n\r\n<center style=\"margin-top: 5px\"><font color=#008000 size=3>-0.18 -0.01%</font></center>\r\n\r\n<center style=\"margin-top: 5px\"><font  size=2>截至2021年7月19日</font></center>"
		}
	},
	"w": 2,
	"h": 3.6,
	"x": 0,
	"y": 2
}, {
	"id": "MARKDOWN-usTyJkSAUj",
	"i": "MARKDOWN-usTyJkSAUj",
	"key": "MARKDOWN-usTyJkSAUj",
	"siblings": null,
	"type": "MARKDOWN",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "MARKDOWN-usTyJkSAUj",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "深证成指报数板",
			"vizType": "markdown",
			"vizDataBase": null,
			"datasourceType": "markdown",
			"datasourceDefine": "<center style=\"margin-top: 15px\"><font color=#FF0000 size=4>深证成分指数</font></center>\r\n\r\n<center style=\"margin-top: 10px\"><font color=#FF0000 size=5>14992.90</font></center>\r\n\r\n<center style=\"margin-top: 5px\"><font color=#FF0000 size=3>+20.69 +0.14%</font></center>"
		}
	},
	"w": 2,
	"h": 3.6,
	"x": 0,
	"y": 2
}, {
	"id": "MARKDOWN-UHYPr9DKb9",
	"i": "MARKDOWN-UHYPr9DKb9",
	"key": "MARKDOWN-UHYPr9DKb9",
	"siblings": null,
	"type": "MARKDOWN",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "MARKDOWN-UHYPr9DKb9",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "创业板指报数板",
			"vizType": "markdown",
			"vizDataBase": null,
			"datasourceType": "markdown",
			"datasourceDefine": "<center style=\"margin-top: 15px\"><font color=#FF0000 size=4>创业板指数</font></center>\r\n\r\n<center style=\"margin-top: 10px\"><font color=#FF0000 size=5>3449.53</font></center>\r\n\r\n<center style=\"margin-top: 5px\"><font color=#FF0000 size=3>+16.88 +0.49%</font></center>\r\n"
		}
	},
	"w": 2,
	"h": 3.6,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-Ywf3QHbanm",
	"i": "CHART-Ywf3QHbanm",
	"key": "CHART-Ywf3QHbanm",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-Ywf3QHbanm",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "市场走势",
			"vizType": "area",
			"vizDataBase": "option = {\n    title: {\n        text: '收盘',\n        show:false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 14\n        }\n    },\n    tooltip: {\n        trigger: 'axis',\n                textStyle: {          \n            fontFamily: 'Arial',\n            fontSize: 12     \n        },\n        axisPointer: {\n            type: 'cross',\n            label: {\n                backgroundColor: '#6a7985'\n            }\n        }\n    },\n    legend: {\n        data: ['上证综合指数', '深证成分指数', '创业板指数'],\n        selectedMode: true,\n        top: '1%',        \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12,\n        }        \n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '15%',\n        top: '15%',\n        containLabel: true\n    },\n    dataZoom: [{\n        show:true,\n        start: 80,\n        end: 100,\n        brushSelect: false,\n        bottom: '1%', \n        left:'15%',\n        right:'15%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],   \n    xAxis: [\n        {\n            type: 'category',\n            boundaryGap: false,\n            data: [ ]\n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '点',            \n            splitLine: {\n                show: false\n            },\n            axisLabel: {\n                formatter: '{value} '\n            }            \n        }\n    ],\n    series: [\n        {\n            name: '上证综合指数',\n            type: 'line',\n            areaStyle: {},\n        itemStyle: {\n            color: '#2dcacf',\n        },    \n            data: [ ]\n        },\n        {\n            name: '深证成分指数',\n            type: 'line',\n            areaStyle: {},\n            z:'1',\n            itemStyle: {\n            color: '#1283D5',\n        },        \n            data: [ ]\n        },\n        {\n            name: '创业板指数',\n            type: 'line',\n            areaStyle: {},\n            itemStyle: {\n            color: '#FFBF00',\n        },        \n            data: [ ]\n        }\n    ]\n};\n",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT dates as date, max( CASE WHEN choice_code = \"EMM00070245\" THEN ROUND(choice_value,2) ELSE NULL END  ) AS shang,max( CASE WHEN choice_code = \"EMM00070251\" THEN ROUND(choice_value,2) ELSE NULL END  ) AS shen,max( CASE WHEN choice_code = \"EMM00070257\" THEN ROUND(choice_value,2) ELSE NULL END  ) AS chuang FROM t_choice_invest_data WHERE choice_code IN (\"EMM00070245\",\"EMM00070251\",\"EMM00070257\") GROUP BY dates ORDER BY date"
		}
	},
	"w": 12,
	"h": 7.4,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-kg582niDox",
	"i": "CHART-kg582niDox",
	"key": "CHART-kg582niDox",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [{
			"id": 1,
			"chartId": "CHART-kg582niDox",
			"key": "cellStyle",
			"value": "{key: 'range',value: 'price,range'}"
		}],
		"chart": {
			"id": "CHART-kg582niDox",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "昨日收盘",
			"vizType": "table",
			"vizDataBase": "[{\n \ttitle: '名称',\n \tkey: 'name',\n                width: '120'\n },\n {\n \ttitle: '涨跌幅(%)',\n \tkey: 'range' ,\n                width: '90'\n },\n {\n \ttitle: '收盘价',\n \tkey: 'price'\n },\n {\n \ttitle: '成交额(亿)',\n \tkey: 'amount'\n },\n {\n \ttitle: '上涨家数',\n \tkey: 'rise',\n                className: 'font-color-red',\n                width: '70'\n }, {\n \ttitle: '下跌家数',\n \tkey: 'fall',\n                className: 'font-color-green',\n                width: '70'\n },\n {\n \ttitle: '平盘家数',\n \tkey: 'draw',\n                width: '70'\n }]",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT * FROM  t_markettable"
		}
	},
	"w": 12,
	"h": 11.4,
	"x": 0,
	"y": 2
}, {
	"id": "TABS-jsdVGp7mC8",
	"i": "TABS-jsdVGp7mC8",
	"h": 20,
	"w": 12,
	"x": 0,
	"y": 2,
	"type": "TABS",
	"children": [{
		"tabsKey": "TAB-g0pcdJMSaI",
		"subTabs": [{
			"id": "CHART-i-1pN53Jfw",
			"i": "CHART-i-1pN53Jfw",
			"key": "CHART-i-1pN53Jfw",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-i-1pN53Jfw",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "市盈率",
					"vizType": "multiple-bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n        }\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['市盈率最高值', '市盈率(TTM)'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom :'10%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: ['上证综合指数', '深证成分指数', '创业板指数', '科创50指数'],\r\n        axisLabel : {\r\n                formatter : function(params){\r\n                   var newParamsName = \"\";\r\n                            var paramsNameNumber = params.length;\r\n                            var provideNumber = 6;\r\n                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber);\r\n                            if (paramsNameNumber > provideNumber) {\r\n                                for (var p = 0; p < rowNumber; p++) {\r\n                                    var tempStr = \"\";\r\n                                    var start = p * provideNumber;\r\n                                    var end = start + provideNumber;\r\n                                    if (p == rowNumber - 1) {\r\n                                        tempStr = params.substring(start, paramsNameNumber);\r\n                                    } else {\r\n                                        tempStr = params.substring(start, end) + \"\\n\";\r\n                                    }\r\n                                    newParamsName += tempStr;\r\n                                }\r\n                            } else {\r\n                                newParamsName = params;\r\n                            }\r\n                            return newParamsName\r\n                }\r\n            },\r\n            axisPointer: {\r\n                type: 'shadow',\r\n                label:{\r\n                    show: true\r\n                },\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '',\r\n            min: 0,\r\n            max: 125,\r\n            interval: 25,               \r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '市盈率最高值',\r\n            type: 'bar',\r\n            itemStyle: {            \r\n            barBorderRadius: 0, \r\n            color: '#1283D5',            \r\n            },\r\n            barWidth: '45%',            \r\n            data: []\r\n        },\r\n        {\r\n            name: '市盈率(TTM)',\r\n            type: 'bar',\r\n            barGap: '-100%',\r\n            itemStyle: {            \r\n            barBorderRadius: 0, \r\n                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\r\n                        offset: 0,\r\n                        color: '#00FFE6'\r\n                    }, {\r\n                        offset: 1,\r\n                        color: '#1283D5'\r\n                    }]),            \r\n            },\r\n            barWidth: '45%',            \r\n            label: {\r\n                normal: {\r\n                    show: true,\r\n                    position: 'top',\r\n                    textStyle: {\r\n                        color: '#333'\r\n                    }\r\n                }\r\n            },             \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_valuation_pe"
				}
			},
			"w": 6,
			"h": 8,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-0sfG4wAKGT",
			"i": "CHART-0sfG4wAKGT",
			"key": "CHART-0sfG4wAKGT",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-0sfG4wAKGT",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "市净率",
					"vizType": "multiple-bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },   \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n        }\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['市净率最高值', '市净率(MRQ)'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom :'10%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: ['上证综合指数', '深证成分指数', '创业板指数', '科创50指数'],\r\n            axisPointer: {\r\n                type: 'shadow',\r\n                label:{\r\n                    show: true\r\n                },\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '',\r\n            min: 0,\r\n            max: 16,\r\n            interval: 4,                \r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '市净率最高值',\r\n            type: 'bar',\r\n            itemStyle: {            \r\n            barBorderRadius: 0, \r\n            color: '#1283D5',            \r\n            },\r\n            barWidth: '45%',            \r\n            data: []\r\n        },\r\n        {\r\n            name: '市净率(MRQ)',\r\n            type: 'bar',\r\n            barGap: '-100%',\r\n            itemStyle: {            \r\n            barBorderRadius: 0, \r\n                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\r\n                        offset: 0,\r\n                        color: '#00FFE6'\r\n                    }, {\r\n                        offset: 1,\r\n                        color: '#1283D5'\r\n                    }]),            \r\n            },\r\n            barWidth: '45%',            \r\n            label: {\r\n                normal: {\r\n                    show: true,\r\n                    position: 'top',\r\n                    textStyle: {\r\n                        color: '#333'\r\n                    }\r\n                }\r\n            },             \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_valuation_pb"
				}
			},
			"w": 6,
			"h": 8,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "市场估值-水位"
	}, {
		"tabsKey": "TAB-CFl2XhkFM",
		"subTabs": [{
			"id": "CHART-j1ZikkWWZi",
			"i": "CHART-j1ZikkWWZi",
			"key": "CHART-j1ZikkWWZi",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-j1ZikkWWZi",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "市盈率-趋势",
					"vizType": "line",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院整理',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '18%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上证综合指数','深证成分指数','创业板指数','科创50指数'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n    dataZoom: [{\r\n        show:true,\r\n        start: 80,\r\n        end: 100,\r\n        brushSelect: false,\r\n        bottom: '9%', \r\n        left:'18%',\r\n        right:'19%',\r\n        height: 20,\r\n            textStyle: {\r\n               fontFamily: 'Arial',\r\n               fontSize: 10\r\n            }               \r\n    }],        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [],\r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '',\r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },            \r\n        }\r\n    ],\r\n    series: [\r\n         {\r\n            name: '上证综合指数',\r\n            connectNulls: true,            \r\n            type: 'line',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            }\r\n         },\r\n       {\r\n            name: '深证成分指数',\r\n            type: 'line',\r\n            data: [],\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },    \r\n        },\r\n        {\r\n            name: '创业板指数',\r\n            type: 'line',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#2dcacf',\r\n        },   \r\n        },\r\n        {\r\n            name: '科创50指数',\r\n            type: 'line',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#F85858',\r\n        },   \r\n        }        \r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "Select pedate,shangpe,shenpe,chuangpe,kepe from(\r\nSELECT \r\n max( CASE WHEN colname = \"pedate\" THEN VALUE ELSE NULL END ) AS pedate,\r\n max( CASE WHEN colname = \"shangpe\" THEN round(VALUE,2) ELSE NULL END ) AS shangpe,\r\n max( CASE WHEN colname = \"shenpe\" THEN round(VALUE,2) ELSE NULL END ) AS shenpe,\r\n max( CASE WHEN colname = \"chuangpe\" THEN round(VALUE,2) ELSE NULL END ) AS chuangpe,\r\n max( CASE WHEN colname = \"kepe\" THEN VALUE + 0 ELSE NULL END ) AS kepe\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_pettm_test\" \r\n AND colname IN ( \"pedate\", \"shangpe\", \"shenpe\",\"chuangpe\",\"kepe\" ) \r\nGROUP BY\r\n rowlabel\r\norder by pedate) tmp\r\n"
				}
			},
			"w": 6,
			"h": 8,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-ajKYVyOXQm",
			"i": "CHART-ajKYVyOXQm",
			"key": "CHART-ajKYVyOXQm",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-ajKYVyOXQm",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "市净率-趋势",
					"vizType": "line",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院整理',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '18%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上证综合指数','深证成分指数','创业板指数','科创50指数'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n    dataZoom: [{\r\n        show:true,\r\n        start: 80,\r\n        end: 100,\r\n        brushSelect: false,\r\n        bottom: '9%', \r\n        left:'18%',\r\n        right:'19%',\r\n        height: 20,\r\n            textStyle: {\r\n               fontFamily: 'Arial',\r\n               fontSize: 10\r\n            }               \r\n    }],        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [],\r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '',\r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },            \r\n        }\r\n    ],\r\n    series: [\r\n         {\r\n            name: '上证综合指数',\r\n            connectNulls: true,            \r\n            type: 'line',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            }\r\n         },\r\n       {\r\n            name: '深证成分指数',\r\n            type: 'line',\r\n            data: [],\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },    \r\n        },\r\n        {\r\n            name: '创业板指数',\r\n            type: 'line',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#2dcacf',\r\n        },   \r\n        },\r\n        {\r\n            name: '科创50指数',\r\n            type: 'line',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#F85858',\r\n        },   \r\n        }        \r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "Select pbdate,shangpb,shenpb,chuangpb,kepb from(\r\nSELECT \r\n max( CASE WHEN colname = \"pbdate\" THEN VALUE ELSE NULL END ) AS pbdate,\r\n max( CASE WHEN colname = \"shangpb\" THEN round(VALUE,2) ELSE NULL END ) AS shangpb,\r\n max( CASE WHEN colname = \"shenpb\" THEN round(VALUE,2) ELSE NULL END ) AS shenpb,\r\n max( CASE WHEN colname = \"chuangpb\" THEN round(VALUE,2) ELSE NULL END ) AS chuangpb,\r\n max( CASE WHEN colname = \"kepb\" THEN VALUE + 0 ELSE NULL END ) AS kepb\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_pblf_manu\" \r\n AND colname IN ( \"pbdate\", \"shangpb\", \"shenpb\",\"chuangpb\",\"kepb\" ) \r\nGROUP BY\r\n rowlabel\r\norder by pbdate) tmp\r\n"
				}
			},
			"w": 6,
			"h": 8,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "市场估值-趋势"
	}],
	"ids": ["CHART-i-1pN53Jfw", "CHART-0sfG4wAKGT", "CHART-j1ZikkWWZi", "CHART-ajKYVyOXQm"]
}, {
	"id": "CHART-s5gn58YqZh",
	"i": "CHART-s5gn58YqZh",
	"key": "CHART-s5gn58YqZh",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-s5gn58YqZh",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "机构观点-中国股市",
			"vizType": "pie",
			"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：来自近一月公开发表的机构观点',  \n        bottom:'1%',          \n        subtextStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },  \n    color: ['#F85858','#FFBF00','#1283D5','#50E3C2','#7ED321'],\n    tooltip: {\n        trigger: 'item' ,\n\t        formatter: function(params) {\n\t        \t//return \"{a} <br/>{b}: {c} -{d}%\"\n\t        \treturn `${params.seriesName}<br/>\n            \t${params.marker}\n        \t\t${params.name} ：\n                ${params.value} — ${params.percent}%<br>`\n         },\n            textStyle: {          \n            fontFamily: 'Arial',\n            fontSize: 12\n        },        \n    },\n    legend: {\n        data:['乐观','偏乐观','中性','偏谨慎','谨慎'],\n        selectedMode: false,        \n        top: 'middle',\n        right: '5%',\n        orient: '',\n        itemGap: 20,\n        textStyle:{\n            fontSize: 12,\n            fontFamily: 'Arial'\n        }\n    },\n    series: [\n        {\n            name: '机构数量',\n            type: 'pie',\n            radius: ['40%', '60%'],\n            avoidLabelOverlap: false,\n            label: {\n                show: true,\n                position: 'outside',\n                formatter: function(params) {\n\t        \t//return \"{a} <br/>{b}: {c} -{d}%\"\n\t        \treturn `${params.name} ： ${params.percent}%`\n                },\n                alignTo:'labelLine',\n            },\n            labelLine: {\n                show: true\n            },\n            data: [\n                {value: '', name: ''},\n                {value: '', name: ''},\n                {value: '', name: ''},\n                {value: '', name: ''},\n                {value: '', name: ''}\n            ],\n            center: ['45%', '50%'], \n        }\n    ]\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT a,b FROM t_jigouguandian"
		}
	},
	"w": 6,
	"h": 9.4,
	"x": 0,
	"y": 2
}, {
	"id": "FEED--v3MgMb6Jt",
	"i": "FEED--v3MgMb6Jt",
	"key": "FEED--v3MgMb6Jt",
	"siblings": null,
	"type": "FEED",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "FEED--v3MgMb6Jt",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "最新发布",
			"vizType": "feed",
			"vizDataBase": null,
			"datasourceType": "feed",
			"datasourceDefine": "<font size=3>国泰君安</font>\r\n景气扩散背景下，创业板中盘蓝筹兼具高弹性与成长性，年初以来涨幅更高。往后看风险评价下行驱动持续，中盘蓝筹行情有望再上一层楼。（第一财经）\r\n<font size=2>7月19日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n受海外市场影响，短期市场或有调整，但国内整体政策相对友好，市场依然呈现区间震荡格局。（第一财经）\r\n<font size=2>7月19日</font>\r\n\r\n***\r\n\r\n<font size=3>财信证券</font>\r\nA股市场短期快速上行时期已经过去，后面A股市场大概率是震荡上行的结构型行情，总体呈现慢牛格局，市场并不缺乏投资机会。（新浪财经）\r\n<font size=2>7月18日</font>\r\n\r\n***\r\n\r\n<font size=3>安信证券</font>\r\n从整体上看，下半年A股市场整体还是震荡市，结构性容忍高估值，但并不是显著的估值扩张环境，任何一个共识方向极端演绎都不宜追高，可以考虑适度调整结构等待其回撤。（第一财经）\r\n<font size=2>7月18日</font>\r\n\r\n***\r\n\r\n<font size=3>中信证券</font>\r\n7月A股仍处于从平静期向共振上行期过渡的阶段，基本面复苏依然不均衡、不稳固，进入共振恢复期还需时间，同时，市场高波动和快轮动的背后是分歧，增量资金入场依然有限。交易与估值约束下，市场前期的极致分化将继续收敛，市场风格再平衡。（第一财经）\r\n<font size=2>7月18日</font>\r\n\r\n***\r\n\r\n<font size=3>兴业证券</font>\r\n经济处于潜在产出附近，第三产业修复速度相对较慢。短期内，市场乐观情绪可能被消化。（第一财经）\r\n<font size=2>7月16日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n创业板指创六年新高后仍然在高位震荡，量价走势良好，短期最为暴力的拉升也许告一段落。 （第一财经）\r\n<font size=2>7月15日</font>\r\n\r\n***\r\n\r\n<font size=3>光大证券</font>\r\n两市成交额持续在万亿以上，短线资金将依旧会选择那些业绩预期向好、赛道成长空间大、市场关注度高的品种做主攻。创业板运行在通道上涨格局，再次上涨需要踩实通道支撑更靠谱一点。（新浪财经）\r\n<font size=2>7月15日</font>\r\n\r\n***\r\n\r\n<font size=3>中信证券</font>\r\n市场保持在震荡状态中。由于经济活动呈现出结构性的变化，因此股票市场结构性行情持续。坚持景气主线，选择成长行业作为优先配置的方向。（新浪财经）\r\n<font size=2>7月14日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n总体看，大盘连续成交量破万亿，说明市场有转暖迹象，结构性轮动行情还将继续存在。大盘不会暴涨暴跌，创业板仍然大概率是主战场。（第一财经）\r\n<font size=2>7月13日</font>\r\n\r\n***\r\n\r\n<font size=3>华安证券</font>\r\n短期内，宽松格局维持，成长板块有业绩支撑，有望继续向上，但随着变化窗口越来越近，波动加大，建议围绕中报选择业绩高增长品种布局。（新浪财经）\r\n<font size=2>7月12日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n市场在情绪面提振催化下，短期或将持续震荡上攻。而从往期降准后市场走势的数据统计来看，其对A股市场中长线走势影响有限，之后或将逐步回归常态。（第一财经）\r\n<font size=2>7月12日</font>\r\n\r\n***\r\n\r\n<font size=3>东莞证券</font>\r\n央行降准超预期给市场带来新的催化剂，提升市场信心，在经济预期回升、企业盈利改善、货币政策微调、资金流动性支持等因素带动下，预计市场有望回暖，迎来企稳反弹走势。（新浪财经）\r\n<font size=2>7月11日</font>\r\n\r\n***\r\n\r\n<font size=3>华福证券</font>\r\n短期市场围绕3500-3550展开区间震荡的可能性大，建议投资者总体控仓下，把握节奏为主，轮动切换行情，回归基本面，寻找业绩支撑板块。（新浪财经）\r\n<font size=2>7月9日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n从技术上看，A股各指数尚处在慢牛行情中，且在沪指回补完下方缺口后，上行的压力开始减弱，这有利于指数维持强势。（第一财经）\r\n<font size=2>7月8日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n市场在回落至大中枢平台获得支撑后，反弹之势整体有望延续。操作上关注中报较确定性增长品种。（新浪财经）\r\n<font size=2>7月8日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n建议在3500点以下可适量低吸一些连续调整的主流热点品种，而逆势上涨的板块应以分批减仓为主。同时，在大盘持续回撤的情况下，两市交易额并未萎缩，持续突破万亿元，侧面证明各类机构对后市整体的行情仍保持较为乐观的态度。（第一财经）\r\n<font size=2>7月7日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n预计近期沪指围绕半年线震荡蓄势的可能性较大，建议投资者继续关注中报业绩超预期的相关行业的投资机会。（新浪财经）\r\n<font size=2>7月7日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n我们判断A股市场短期快速上行时期已经过去，后期A股市场大概率是震荡上行的结构型行情，总体呈现慢牛格局，市场并不缺乏投资机会。（第一财经）\r\n<font size=2>7月6日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n近期北向资金的持续流出及市场的下跌，主要是交易层面的行为，而非预期层面的扭转，看短、做短的投机性资金退潮加大了市场波动，在投资者情绪修复之后，或逐步回归常态。（第一财经）\r\n<font size=2>7月5日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n当前市场依然处于区间震荡，上下空间不大，市场轮动较快，需要把握阶段结构性机会。（东方财富网）\r\n<font size=2>7月5日</font>\r\n\r\n***\r\n\r\n<font size=3>国泰君安</font>\r\n展望后市，新的希望正在酝酿，伴随中报业绩预告披露窗口期的打开，博弈盈利将为市场注入新的活力。龙头策略不再躺赢，成长性强弱成为股价分化的主导因素。市场将聚焦盈利可持续增长的股票，高景气将是未来一段时间的投资主线。（新浪财经）\r\n<font size=2>7月4日</font>\r\n\r\n***\r\n\r\n<font size=3>兴业证券</font>\r\n展望7月份，结构性行情依然精彩，中报将是新亮点。总体而言，七月份行情没有大风险，政策预期的波动及局部存量风险的化解或形成阶段性扰动，但是，有惊无险。（新浪财经）\r\n<font size=2>7月4日</font>\r\n\r\n***\r\n\r\n<font size=3>中信证券</font>\r\n7月A股整体将处于从平静期向共振上行期转换的阶段，期间市场预期、驱动、主线都会出现转变。看短做短的博弈性资金退潮加大市场波动，风险扰动需要时间消化，投资者心态变化，未来基本面料将成为其新共识的基准，建议继续紧扣高景气主线，把握市场结构波动下的新入场时机。（第一财经）\r\n<font size=2>7月4日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n预计市场短期仍有下探需求，整体上升的趋势没有改变。策略上，轻指数重个股，以科技成长行业为中期投资主线，寻找细分行业投资机会。（第一财经）\r\n<font size=2>7月2日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n虽然创业板指数趋势良好，多板块轮动上涨格局仍在，量能也在保持温和放大，短期难言结束，但是投资者需要提防短期加速上涨之后，高位宽幅震荡带来的分化风险。（新浪财经）\r\n<font size=2>7月2日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n指数整体结构上仍保持较强结构，尤其是深指及创业板指，是当前多头主要进攻方向，结合当前进入半年报时间节点，在未出现明显调整前仍可继续做多。（新浪财经）\r\n<font size=2>7月1日</font>\r\n\r\n***\r\n\r\n<font size=3>东方证券</font>\r\n鉴于诸多权重板块尚处于低位，指数短线超跌的概率较小，更多可能将是反复震荡。（第一财经）\r\n<font size=2>7月1日</font>\r\n\r\n***\r\n\r\n<font size=3>银河证券</font>\r\n经济金融环境暂维持相对利好权益资产，但是A股市场已反弹至高位，增量资金进场缓慢，后续需谨慎追涨，适当降低预期。中报及中报预告披露期是关键窗口，把握业绩高增长的结构性机会。（第一财经）\r\n<font size=2>6月30日</font>\r\n\r\n***\r\n\r\n<font size=3>天风证券</font>\r\n市场自5月以来的反弹，主要推动因素是国内外流动性的超预期共振，展望三季度，市场缺乏指数性行情，中报行情不宜预期过高。（证券时报网）\r\n<font size=2>6月30日</font>\r\n\r\n***\r\n\r\n<font size=3>中金公司</font>\r\n成长风格在2021年下半年可能仍然是机会更多的领域。我们在4月开始着重强调成长板块的机会，未来成长风格可能仍然是市场的主要机会所在，但板块内部可能分化加大、轮动加快。（新浪财经）\r\n<font size=2>6月29日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n周期行业以及金融板块的回调，只是暂时延缓了股指上扬的脚步，未来市场板块轮动的格局不会轻易转变，场外增量资金稳步进场的趋势有望继续保持。（第一财经）\r\n<font size=2>6月29日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n在市场预期上升和业绩兑现引导下，市场将保持较高热度，市场或将在热门板块带动下，继续呈震荡温和上涨走势。（新浪财经）\r\n<font size=2>6月28日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n预计管理层会加大财政支出力度，央行会边际释放流动性，7月市场维持向上的概率较高。（东方财富网）\r\n<font size=2>6月28日</font>\r\n\r\n***\r\n\r\n<font size=3>中信证券</font>\r\n7月是市场从平静期向共振上行期的转换阶段。预计跨月期间博弈性资金退潮会导致市场结构性波动有所加大。从结构性过热的主题行情切换至中报高景气主线。（第一财经）\r\n<font size=2>6月27日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n企业盈利扩张中、微观资金仍在流入市场，牛市格局未变，当前市场情绪距高点仍有距离。市场奔向年内新高。（新浪财经）\r\n<font size=2>6月27日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n当前A股估值相对便宜，在“房住不炒”的政策下，居民财富配置有望向权益市场转移，存在增量资金入场的可能，A股有望迎来慢牛行情。（第一财经）\r\n<font size=2>6月27日</font>\r\n\r\n***\r\n\r\n<font size=3>安信策略</font>\r\n当前市场整体继续处于震荡阶段。从中长期来看，今年中报和下半年A股基本面大概率好于市场预期，企业的盈利能力和成长性将成为下一阶段市场的核心逻辑。（新浪财经）\r\n<font size=2>6月27日</font>\r\n\r\n***\r\n\r\n<font size=3>中信建投</font>\r\n由于盈利增速见顶，流动性环境难以继续推升估值，下半年A股整体或维持震荡态势，结构性机会的捕捉可以从短期高景气度、中期核心资产、长期优质成长赛道等思路入手。（新浪财经）\r\n<font size=2>6月25日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n近期沪指持续小幅上扬，已呈现六连阳的态势，两市成交量基本保持在万亿左右的水平，场外资金有序进场的特征较为显著。（第一财经）\r\n<font size=2>6月24日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n目前市场连续反弹，市场主线较为明朗，赚钱效应逐步提高，市场风格基本已经切换至题材概念的风格。 （第一财经）\r\n<font size=2>6月24日</font>\r\n\r\n***\r\n\r\n<font size=3>天风证券</font>\r\n短期内通胀对A股的冲击或大部分已消化，从估值角度看，A股当前估值不过分，今年的行情不悲观。（第一财经）\r\n<font size=2>6月23日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n目前主要指数受到外围金融市场大涨影响，出现一定的试探性上攻，整体行情有所回暖，板块轮动开始有序进行，市场做多氛围有所回暖。（新浪财经）\r\n<font size=2>6月23日</font>\r\n\r\n***\r\n\r\n<font size=3>天风证券</font>\r\n市场短期波动是正常的，无需特别担忧。总体来说，创业板和科创板持续强势，重个股轻大盘。（第一财经）\r\n<font size=2>6月22日</font>\r\n\r\n***\r\n\r\n<font size=3>安信证券</font>\r\n下半年增长放缓，但再宽松力度有限，整体市场依然不是趋势市。龙头躺赢策略逐步失效，核心资产分化加剧。（新浪财经）\r\n<font size=2>6月22日</font>\r\n\r\n***\r\n\r\n<font size=3>银河证券</font>\r\nA股市场仍在震荡上涨行情中，节奏把握的重要性更加突出，但需警惕美联储加息带来的拐点。（第一财经）\r\n<font size=2>6月21日</font>\r\n\r\n***\r\n\r\n<font size=3>国泰君安</font>\r\n往后看，尽管分子端盈利无明显亮点，但不确定性逐步落地推动风险评价下行，叠加无风险利率下降的可能，悲观预期逐步修正，如若市场继续下跌，将会出现难得的“黄金坑”。（新浪财经）\r\n<font size=2>6月20日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n中期来看，景气度维持高位的消费和科技板块依旧有较强的吸引力，整体市场将在相关板块带动下继续呈震荡向上走势。（第一财经）\r\n<font size=2>6月18日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n接下来的6月下半月依然是震荡整理巩固为主，为下半年打好基础，仍然期待下半年有年内新高的表现。（东方财富网）\r\n<font size=2>6月18日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n短期指数调整的空间或有限，可逢低关注核心资产为主的优质资产低吸机会。操作上，市场结构化行情仍为近期较为明显的市场表现，可积极关注资金介入较深、机构资金持续加仓的个股机会。（第一财经）\r\n<font size=2>6月17日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\nA股市场处于整固阶段、短期缺乏较大的上攻动能，观察市场回补3500点附近缺口后的企稳迹象。立足业绩和估值的匹配度，关注中报业绩是短中期的主要思路。（新浪财经）\r\n<font size=2>6月17日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n虽然沪指在3600点附近反复震荡，但是近期交易量仍保持万亿水平，说明市场处于谨慎做多情绪中，投资者需要保持耐心，合理控制仓位。中长期还是以成长制造板块作为关注重点，短期把握中报披露窗口期，重点关注高景气度、业绩超预期品种。（新浪财经）\r\n<font size=2>6月16日</font>\r\n\r\n***\r\n\r\n<font size=3>银河证券</font>\r\n目前两市处于牛市后半场，多数核心资产牛市秋天，不宜期待过高；本轮牛市没有结束，寻找科技大事件、资源涨价等机会。（第一财经）\r\n<font size=2>6月16日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n整体来看，最新一致预期数据大幅上涨效果有所显现，在市场预期大幅提升、整体估值随着业绩兑现下降的背景下，市场将保持较高热度，中期有望继续维持震荡向上走势。（新浪财经）\r\n<font size=2>6月15日</font>\r\n\r\n***\r\n\r\n<font size=3>国泰君安</font>\r\n市场关心的通胀问题正随预期曲线脱虚向实走向确定，估值挣脱负向束缚，市场将在震荡蓄力后继续拉升。（第一财经）\r\n<font size=2>6月15日</font>\r\n\r\n***\r\n\r\n<font size=3>安信证券</font>\r\n从中长期来看，今年中报和下半年A股基本面大概率好于市场预期，企业的盈利能力和成长性将成为下一阶段市场的核心逻辑。（东方财富网）\r\n<font size=2>6月14日</font>\r\n\r\n***\r\n\r\n<font size=3>申港证券</font>\r\n今年上证指数在3300~3800点之间震荡，目前在全A股盈利向上复苏阶段，经济复苏还将惯性持续6个月以上，市场尚未出现系统性风险。（第一财经）\r\n<font size=2>6月13日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\n下半年市场的主导因素将是盈利筑顶。当前处于盈利筑顶期，市场整体估值难提升，低估值和高景气行业占优。（东方财富网）\r\n<font size=2>6月11日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n市场情绪明显回暖，成交额维持在高位，同时由于处于业绩真空期，行业轮动明显加快。进入6月，随着中报业绩预告陆续披露，市场已经开始展开演绎中报业绩行情。（新浪财经）\r\n<font size=2>6月10日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n指数继续保持震荡格局，成交量还算稳定，趋势看并未走坏，但调整的时间空间或许还未到位，暂时仍建议谨慎追高。（新浪财经）\r\n<font size=2>6月9日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n目前市场处于快速上涨后的休整阶段，市场景气度回升较快板块短期或有所表现。中期来看，市场一致预期数据大幅上涨，成交量中枢抬升，市场热情有所增加。（东方财富网）\r\n<font size=2>6月8日</font>\r\n\r\n***\r\n\r\n<font size=3>华福证券</font>\r\n从技术分析看，股指维持高位震荡，多空继续围绕3600点关口进行争夺战，鉴于分时部分风险指标依然处于高位，预判在短期内继续宽幅震荡的可能性大。（新浪财经）\r\n<font size=2>6月8日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n持续看好市场中期向上趋势，操作上可提高风险偏好，注重行业成长性，重点挖掘想象空间大及估值弹性高的行业个股的中线投资机会。（第一财经）\r\n<font size=2>6月7日</font>\r\n\r\n***\r\n\r\n<font size=3>银河证券</font>\r\n市场整体节奏较慢，局部板块表现靓丽。长期来看，反弹行情确立，市场预计将在震荡中上行。（新浪财经）\r\n<font size=2>6月7日</font>\r\n\r\n***\r\n\r\n<font size=3>国泰君安</font>\r\n在通胀预期缓和、存量结构改善背景下，市场向上拉升的力量正在进一步积聚。短期海外节奏将会形成扰动，风险评价下降仍是中期趋势。（第一财经）\r\n<font size=2>6月7日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n指数在上周小幅震荡调整，短期看仍有调整回踩趋势线的可能，过短期调整不影响中期向上趋势。（新浪财经）\r\n<font size=2>6月7日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n全球通胀预期高位难以进一步上行，有助于增强A股成长股的胜率。当前仍处于健康的信用收缩阶段，盈利高位回落但有韧性，结构上突破来自于周转率或利润率的支撑。（新浪财经）\r\n<font size=2>6月6日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n预计经过充分蓄势之后，沪指有望继续稳步上扬，建议投资者密切关注政策面以及资金面的变化情况。（新浪财经）\r\n<font size=2>6月4日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n市场可能会出现高低位换挡的情况，意味着大众个股开始回暖，整体趋势逐渐向好，即使出现短期的回调也是暂时的。（新浪财经）\r\n<font size=2>6月4日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n预计短期或继续保持强势震荡格局，如出现非理性下跌，可逢低积极关注资金介入程度较深的题材。（第一财经）\r\n<font size=2>6月3日</font>\r\n\r\n***\r\n\r\n<font size=3>东方证券</font>\r\n短期看，指数虽高位震荡，但题材炒作较为火热，场内已累积较多短线浮盈盘，在目前震荡行情的思维惯性下，不排除部分资金高位兑现盈利。 （新浪财经）\r\n<font size=2>6月3日</font>\r\n\r\n***\r\n\r\n<font size=3>华福证券</font>\r\n流动性仍处宽松格局，利于市场风险偏好的提升，利于成长性风格占据优势。总体上可采取适度进攻的积极策略，重视市场风格轮动特征。（第一财经）\r\n<font size=2>6月2日</font>\r\n\r\n***\r\n\r\n<font size=3>银河证券</font>\r\n当前A股市场进入震荡反弹行情。国内经济的演变是A股核心驱动，而非人民币汇率升值。（新浪财经）\r\n<font size=2>6月1日</font>\r\n\r\n***\r\n\r\n<font size=3>中信证券</font>\r\nA股下半年将进入慢涨“三部曲”中的共振上行期，且四季度空间更大。国内政策密集落地，宏观流动性平稳，市场流动性充裕A股相对配置吸引力依然较强。（第一财经）\r\n<font size=2>6月1日</font>\r\n\r\n***\r\n\r\n<font size=3>中银证券</font>\r\n6月市场有望随着预期的阶段性缓和迎来反弹窗口。进入二季度，市场对于未来基本面持续性分歧加大。（第一财经）\r\n<font size=2>6月1日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n6月市场可能突破3-5月的区间震荡，向上挑战市场前期高点。建议关注金融、科技、消费领域的投资机会。（新浪财经）\r\n<font size=2>5月31日</font>\r\n\r\n***\r\n\r\n<font size=3>招商证券</font>\r\n进入6月，A股将会保持存量博弈的态势。主要指数有望呈现震荡走平，市场机会以阶段性局部机会为主。（第一财经）\r\n<font size=2>5月31日</font>\r\n\r\n***\r\n\r\n<font size=3>天风证券</font>\r\n从反弹持续性的角度出发，对于核心资产的反弹空间，重点关注6月公募基金发行热度能否恢复，若仍然较差，则核心资产估值较难突破震荡区间。（第一财经）\r\n<font size=2>5月31日</font>\r\n\r\n***\r\n\r\n<font size=3>国泰君安</font>\r\n分母端风险评价下行是本轮行情的核心驱动，市场将挑战四千点。当前经济增长预期、流动性预期、通胀预期以及政策预期从不确定性迈向确定，有力驱动风险评价下行。（新浪财经）\r\n<font size=2>5月30日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n人民币升值吸引外资加速流入A股，这有利于市场重拾信心，助力牛市重建。人民币升值本质上源于中国贸易顺差较大，升值有助于缓解原材料成本压力，强化外资流入趋势。（第一财经）\r\n<font size=2>5月30日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n人民币不断的升值的背景下，我国核心资产会受到追捧，对市场中长期趋势形成较好的资金基础。短期看市场趋势性行情已成，向上突破只是时间上的问题，而量能决定反弹的高度和持续性。（第一财经）\r\n<font size=2>5月28日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n当前市场焦点逐渐回归经济常态增长，成长风格可能重新成为市场主线。且大金融、大科技等板块重新走强，市场阶段性反弹行情有望延续，建议投资者持股为主。（第一财经）\r\n<font size=2>5月28日</font>\r\n\r\n***\r\n\r\n<font size=3>财信证券</font>\r\n目前A股估值整体较为合理，后市大概率继续上行，市场整体机会大于风险。预计后市机构抱团股仍为指数走高的重要推动力。（第一财经）\r\n<font size=2>5月27日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n操作上，以布局政策驱动题材为主。短期市场有高位整固需求，若有回调或是较好的加仓机会。（新浪财经）\r\n<font size=2>5月27日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\n短期风险偏好对市场影响偏正面，源于印度疫情缓解且七一临近，但后市不确定性仍存，因此我们认为后续市场短期或震荡偏强。（第一财经）\r\n<font size=2>5月27日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n整体来看，如果量能有效配合，短期有望走出一波指数行情，建议投资者不要轻易调仓换股，质地优良的标的可等待补涨轮动。（第一财经）\r\n<font size=2>5月26日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n考虑到美联储宽松政策延续并且近期市场利率与大宗商品价格下行，市场流动性总体宽裕，指数后续有望震荡向上，但是结构性行情仍将延续，市场做多情绪较高。（第一财经）\r\n<font size=2>5月26日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\n短期行情更可能是一次在特殊时间窗口并且在趋势指标改善驱动的脉冲性上攻行情；目前仍在这种脉冲上涨的趋势之中，即短期市场仍将活跃。（新浪财经）\r\n<font size=2>5月26日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n随着资金面持续向好，未来高景气的消费和科技板块依旧有较强的吸引力，整体市场将在相关板块带动下继续呈震荡向上走势。（第一财经）\r\n<font size=2>5月26日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n后市来看，市场在经历一季度的调整之后，近两个月基本维持W型震荡走势，市场的中期上涨格局并没有改变。且短期两市呈现权重护盘题材唱戏的局面，整体市场做多情绪较高，机会大于风险。（第一财经）\r\n<font size=2>5月25日</font>\r\n\r\n***\r\n\r\n<font size=3>中金公司</font>\r\n尽管疫情可能“长尾退出”，但伴随国内经济逐渐重回正轨，复苏和通胀预期下的周期板块行情在渐入尾声，市场焦点逐渐回归经济常态增长，成长风格可能重新成为市场主线。（新浪财经）\r\n<font size=2>5月25日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n总体而言，指数当前调整风险较小，大概率维持稳中有升的格局，因此，在指数不改当前趋势前，可积极把握市场机会。（第一财经）\r\n<font size=2>5月24日</font>\r\n\r\n***\r\n\r\n<font size=3>广发证券</font>\r\n由于一季度企业盈利回升与股价调整，市场估值较前期明显改善，整体处于中位数偏上的位置，同时信用仍然在下行周期，短期或以结构性机会为主，难言趋势性行情。（第一财经）\r\n<font size=2>5月24日</font>\r\n\r\n***\r\n\r\n<font size=3>国泰君安</font>\r\n横盘震荡不会长久，随着宏观与外围环境由不确定走向确定，风险评价将会下降，由此驱动行情从震荡走向拉升，挑战四千点。（第一财经）\r\n<font size=2>5月23日</font>\r\n\r\n***\r\n\r\n<font size=3>华泰证券</font>\r\n从成交额角度看，当前A股量能已从中期调整中走出，前期横盘区间上沿有望从压力位转为支撑位，市场投资主线日渐明晰。（第一财经）\r\n<font size=2>5月23日</font>\r\n\r\n***\r\n\r\n<font size=3>安信证券</font>\r\n短期A股对通胀担忧有限，经济预期开始逐步下行，但风险偏好处于偏高位置，流动性环境仍将支持A股市场震荡偏向上，依然存在一定的结构性行情操作时间窗口。（新浪财经）\r\n<font size=2>5月23日</font>\r\n\r\n***\r\n\r\n<font size=3>中泰证券</font>\r\n资本市场将回归主线。前期由于大宗商品价格不断创新高导致中游制造业成本预期快速提升，今年以来很多高端制造业行业的股票出现调整。随着大宗商品价格的回归，市场仍然会回到高端制造主线上来。（新浪财经）\r\n<font size=2>5月22日</font>\r\n\r\n***\r\n\r\n<font size=3>华鑫证券</font>\r\n目前创业板和深成指120分钟均已出现顶部结构。短周期而言指数调整或是高概率情形，但在中周期角度，调整则是配置的机会，投资者注意短期调整带来的机会。（第一财经）\r\n<font size=2>5月21日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n技术上沪指已突破前期震荡箱体上沿，打开了后市上攻空间。受量能制约，指数虽在冲高后有所调整，但并未出现恐慌性抛盘。（第一财经）\r\n<font size=2>5月20日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n沪弱深强延续分化，板块题材轮动加快。指数在连续拉升后迎来震荡整固，主要股指已运行至箱体上沿，后市若不能放量突破，市场大概率延续结构性行情。（新浪财经）\r\n<font size=2>5月20日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\n从市场运行来看，市场总体处于存量博弈、反复轮动的阶段；技术上，指数处于不进则退的状态，即要么显著上攻、打破3月中下旬以来的通道震荡格局，否则仍会面临再度回撤的风险。（第一财经）\r\n<font size=2>5月20日</font>\r\n\r\n***\r\n\r\n<font size=3>粤开证券</font>\r\n目前正处于业绩真空期，市场仍在寻找新的确定性，行业间热点轮动速度较快，但量能未见明显释放，投资者应保持均衡配置策略，寻找结构性机会。（新浪财经）\r\n<font size=2>5月20日</font>\r\n\r\n***\r\n\r\n<font size=3>中信证券</font>\r\n商品价格上涨趋缓，国内通胀预期阶段性回落，货币收紧预期缓解，增量资金逐步入场，存量资金调仓导致行情扩散，A股市场周期逻辑阶段性淡化，成长板块料将迎来一轮月度级别估值修复行情。（新浪财经）\r\n<font size=2>5月19日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\n近期核心资产的反弹来自于美国实际利率的下行，背后是疫情反复导致的财政货币预期有所增强。部分投资者认为机构重仓股后续可能重演春节前的抱团大涨，但我们认为当下环境和前期差异较大，预计难重演。（第一财经）\r\n<font size=2>5月19日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n行业轮动依然是当前市场运行的主要特征之一。未来核心资产、金融行业以及周期行业能否有序轮动，带动股指稳步走高仍需观察。预计沪指短线小幅上扬的可能性较大，创业板市场短线继续挑战新高的可能较大。（第一财经）\r\n<font size=2>5月18日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n展望后市，在“稳货币紧信用”的基调下，预计A股的流动性将保持稳定，叠加处于业绩真空期，因此有望维持震荡上行。当然目前指数也不存在快速拉升的基础，主要还是会受到上方套牢盘以及估值压力的限制。（第一财经）\r\n<font size=2>5月18日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n目前A股整体的性价比较高，全球疫情边际变化将导致大宗商品价格快速上涨格局被打破，有利于部分资金回流A股，市场下跌空间有限，中期有望重回震荡向上走势，市场不乏结构性投资机会。（第一财经）\r\n<font size=2>5月17日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n技术上，沪指第三次来到3月中旬形成的盘整箱体上沿，预计在经济数据利好的提振下，短期内市场有望继续出现中阳或长阳的反弹行情，但能否有效突破密切关注量能释放水平。（第一财经）\r\n<font size=2>5月17日</font>\r\n\r\n***\r\n\r\n<font size=3>兴业证券</font>\r\n目前无论是国内政策环境还是国际环境总体而言都较为平稳。因此阶段性而言，到7月1日之前，A股市场有个阶段性的修复的时间窗口。中期而言，到今年年底，大概率仍是震荡市。（第一财经）\r\n<font size=2>5月16日</font>\r\n\r\n***\r\n\r\n<font size=3>安信证券</font>\r\n继续维持市场整体震荡格局的判断，短期市场风险偏好可能处于偏高位置，存在一定的结构性行情操作时间窗口。（第一财经）\r\n<font size=2>5月16日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n时间上看，各路资金或期待七月“百年大庆”的上涨行情，那么五月下旬或是较好的布局期。操作上，以逢低布局为主，沪指3380点附近或有较好的加仓机会。（第一财经）\r\n<font size=2>5月14日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n接下来一直到6月底，指数都将可能围绕3400点防线展开震荡整固，期间个股活跃度相对更高，各类题材股轮换表现，对于中长线机会来说是个难得的建仓时间段。（第一财经）\r\n<font size=2>5月14日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n市场自3月9日下探至近期低点以来已持续超两月箱体震荡，近期沪指在60分钟K线第四次触趋势线底部后如期反弹，后期在量能的配合下有望开启新一轮上涨。（新浪财经）\r\n<font size=2>5月13日</font>\r\n\r\n***\r\n\r\n<font size=3>国金证券</font>\r\n短期来看，量能不足依旧制约上行空间，大盘仍以震荡为主。建议稳健投资者维持七成左右仓位。（东方财富网）\r\n<font size=2>5月13日</font>\r\n\r\n***\r\n\r\n<font size=3>东吴证券</font>\r\n指数继续维持在3500点下方震荡反复，市场活跃度不低，待资源类股调整到位后，市场风格或将再度变换，这种节奏需要注意把握。（东方财富网）\r\n<font size=2>5月13日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n在市场预期大幅提升、整体估值随着业绩兑现下降的背景下，A股整体的性价比凸显，结合近期成交量来看，市场情绪稳定，对市场未来表现呈乐观态度，A股中期将有震荡向上走势。（东方财富网）\r\n<font size=2>5月12日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n市场经过长期宽幅震荡，人气不减，每次探底都能一举收回，资金承接力超强。一旦市场打破宽幅震荡格局向上突破，所有热点均能吸引不少增量资金介入。（新浪财经）\r\n<font size=2>5月12日</font>\r\n\r\n***\r\n\r\n<font size=3>山西证券</font>\r\n未来整体宏观环境边际变化不大，市场震荡行情持续，拥有较高景气度的周期和消费题材或将继续轮动。资本市场改革持续推进，长期看好我国资本市场发展。（第一财经）\r\n<font size=2>5月11日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n预计近期A股市场核心资产继续震荡的可能性较大，投资者可适当股关注顺周期行业，以及部分存在补涨机会的相关板块的投资机会。（新浪财经）\r\n<font size=2>5月11日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\n目前指数震荡且缺乏显著上攻动能的特征尚难改变，短期市场多重底且再起大行情的概率不大。一般而言，指数胜率较高的介入时机或在5月末至6月中上旬，在此之前更多还是防御中的结构性机会。（新浪财经）\r\n<font size=2>5月11日</font>\r\n\r\n***\r\n\r\n<font size=3>国信证券</font>\r\n对股票市场而言，通胀具有两面性，一方面通胀推升利率会使股市估值承压，另一方面通胀对上市公司盈利总体是利好的。在当前企业盈利快速回升的过程中，通胀后者的重要性要高于前者，股市整体趋势依然向上，红五月可期。（第一财经）\r\n<font size=2>5月10日</font>\r\n\r\n***\r\n\r\n<font size=3>国金证券</font>\r\n短期A股市场不具备持续反弹的动力，仍面临二次探底的风险。从政策角度来看，信用趋紧叠加货币政策的不确定性对市场风险偏好仍有所压制，部分高估值板块仍面临调整压力，同时这也意味着边际增量资金相对有限。（第一财经）\r\n<font size=2>5月10日</font>\r\n\r\n***\r\n\r\n<font size=3>天风证券</font>\r\nA股表观同比增速见顶，而2年复合增速年内趋势仍向上。但过去几次经验来看，指数整体走势与表观增速更加相关，指数很快再创出新高的难度较大。（第一财经）\r\n<font size=2>5月10日</font>\r\n\r\n***\r\n\r\n<font size=3>东北证券</font>\r\n当前资金结构难以支撑连续上涨的成交额。在节后资金并未显著回流的背景下，A股当前的行业轮动格局正在加快。（新浪财经）\r\n<font size=2>5月10日</font>\r\n\r\n***\r\n\r\n<font size=3>粤开证券</font>\r\n对于后市，指数震荡调整不改看多红五月观点，上涨初期筹码充分换手更有利于后续指数走稳，继续看多红五月震荡上行。（第一财经）\r\n<font size=2>5月9日</font>\r\n\r\n***\r\n\r\n<font size=3>国盛证券</font>\r\n四月底政治局会议提出的政策“不急转弯”、重调结构的温和表态符合预期，在一定程度上缓解了市场对流动性进一步收紧的担忧，利于节后市场做多情绪的持续修复。待蓄势整理结束，如量能跟进有力，指数仍有望继续上攻，“红五月”可期。（第一财经）\r\n<font size=2>5月7日</font>\r\n\r\n***\r\n\r\n<font size=3>国信证券</font>\r\n短期股指在下方的支撑较强，市场仍以结构活跃为主。随着业绩披露结束，可相应调整持仓结构，精选行业景气度向上且估值偏低的绩优标的。（新浪财经）\r\n<font size=2>5月7日</font>\r\n\r\n***\r\n\r\n<font size=3>招商证券</font>\r\n在流动性中性偏紧及经济增速面临回落的大环境下，市场仍较难出现趋势性的大级别反弹，但自前期估值回调后，安全边际较前几个月已有明显抬升，因此，5月市场仍是中期耐心调整持仓结构的时间窗口。（新浪财经）\r\n<font size=2>5月7日</font>\r\n\r\n***\r\n\r\n\r\n<font size=3>国盛证券</font>\r\n长假过后资金将逐步回流，A股迎来两个月的业绩真空期，业绩披露对个股的扰动已经结束。操作上，沪指三次回探，均被托盘资金撑住，从大级别看低点逐步抬高，未来A股以向上突破终结震荡行情的概率更大。（第一财经）\r\n<font size=2>5月6日</font>\r\n\r\n***\r\n\r\n<font size=3>中泰证券</font>\r\n多数行业延续了年初以来的高景气度，随着业绩披露期的结束，5月依然是不错的交易窗口，预计指数易涨难跌。（第一财经）\r\n<font size=2>5月6日</font>\r\n\r\n***\r\n\r\n<font size=3>方正证券</font>\r\n4月份防守反击，5月份又到逢高减仓时，核心在于三方面，一是去年二季度以来的经济增长动力逐渐进入到衰减阶段；二是国内流动性边际趋紧；三是市场结构性高估仍存，风险偏好难以全面抬升。（第一财经）\r\n<font size=2>5月6日</font>\r\n\r\n***\r\n\r\n<font size=3>华安证券</font>\r\n市场难以形成趋势性预期，因此整体震荡行情中挖掘高景气、低估值、疫后修复等结构性机会。（新浪财经）\r\n<font size=2>5月6日</font>\r\n\r\n***\r\n\r\n<font size=3>中原证券</font>\r\n5月市场维持震荡或向下的概率较高，上证综指可能下探3300点。建议仓位降低至5成左右。（新浪财经）\r\n<font size=2>5月6日</font>\r\n\r\n***\r\n\r\n<font size=3>中信证券</font>\r\n本轮阶段性通胀对基本面的冲击和对流动性的制约都有限，对估值的压制也将被逐步消化；5月市场结构博弈加剧，估值将替代业绩成为主要驱动，但市场整体将波澜不惊，建议提前布局通胀和利率见顶后估值弹性较高的品种。（第一财经）\r\n<font size=2>5月5日</font>\r\n\r\n***\r\n\r\n<font size=3>海通证券</font>\r\n2019年初开始的牛市没结束，今年市场仍将实现正收益，因为盈利趋势向上、估值矛盾不大，经历春节以来的调整后，市场正在重建中。（新浪财经）\r\n<font size=2>5月5日</font>\r\n\r\n***\r\n\r\n<font size=3>国泰君安</font>\r\n估值与筹码的压力仍在，信用收缩放缓的背景下，市场震荡行情不改。市场进入业绩空窗期，继续拥抱具有盈利动能的中盘蓝筹股。（第一财经）\r\n<font size=2>5月5日</font>\r\n\r\n***\r\n\r\n<font size=3>华金证券</font>\r\n短周期流动性预期趋向于中性，为市场活跃提供了基础；但由于整体的一季度业绩高点可能已经得到确认，且估值困境依旧存在，市场或更多呈现结构性机会。（新浪财经）\r\n<font size=2>5月5日</font>\r\n\r\n***\r\n"
		}
	},
	"w": 6,
	"h": 9.4,
	"x": 0,
	"y": 2
}, {
	"id": "TABS-fbvOzXKTIc",
	"i": "TABS-fbvOzXKTIc",
	"h": 20,
	"w": 12,
	"x": 0,
	"y": 2,
	"type": "TABS",
	"children": [{
		"tabsKey": "TAB-W-Z_gERiaJ",
		"subTabs": [{
			"id": "CHART-cFGL1eoNsR",
			"i": "CHART-cFGL1eoNsR",
			"key": "CHART-cFGL1eoNsR",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-cFGL1eoNsR",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "",
					"vizType": "mix-line-bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：NewBanker研究院',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n      tooltip: {\n          trigger: 'axis',\n          width: 80,\n          borderWidth: 5,\n          padding: 5,\n          hideDelay: 200,\n          enterable: true,\n          formatter: '{a0}: {c0}<br />{a2}: {c2}<br />{a1}: <br />{c1}',\n              textStyle: {          \n              fontFamily: 'Arial',\n              fontSize: 12,\n              width: 50,\n              overflow: 'break'\n          },\n          extraCssText:'width:180px; white-space:pre-wrap',\n          \n          axisPointer: {\n              type: 'cross'\n          }\n      },\n    dataZoom: [{\n        show:true,\n        start: 0,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],     \n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n      legend: {\n          data: ['重要政策数量',  '上证综合指数'],\n          selectedMode: false,\n          top: '1%',        \n          textStyle: {\n              fontFamily: 'Arial',\n              fontSize: 12,\n          }        \n      },\n      xAxis: [\n          {\n              type: 'category',\n              data: [],\n              axisPointer: {\n                  type: 'shadow'\n              }\n          }\n      ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '重要政策数量',\n            min: 0,\n            max: 6,\n            axisLine: {\n                show: false,\n        },        \n            splitLine: {\n                show: false\n            },\n            axisLabel: {\n                formatter: '{value} '\n            }\n        },\n        {\n            type: 'value',\n            name: '收盘',\n            min: 0,\n            max: 6000,\n            axisLine: {\n                show: false,\n        },        \n            splitLine: {\n                show: false,\n            },\n            axisLabel: {\n                formatter: '{value} 点'\n            }\n        }\n    ],\n      series: [\n          {\n              name: '重要政策数量',\n              type: 'bar',\n              barWidth: 5,\n        itemStyle: {\n            color: '#1283D5',\n        },  \n              data: []\n          },  \n  \n          {\n              name: '政策名称',\n              type: 'bar',\n                barWidth: 0,\n              data: []\n          },\n          {\n              name: '上证综合指数',\n              type: 'line',\n              connectNulls: true,             \n              yAxisIndex: 1,\n              itemStyle: {\n                  color: '#FFBF00',\n              },\n              data: []\n          }\n      ]\n  };",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_zhengce"
				}
			},
			"w": 8,
			"h": 17.4,
			"x": 0,
			"y": 2
		}, {
			"id": "FEED-Dxk6eFEfvr",
			"i": "FEED-Dxk6eFEfvr",
			"key": "FEED-Dxk6eFEfvr",
			"siblings": null,
			"type": "FEED",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "FEED-Dxk6eFEfvr",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "",
					"vizType": "feed",
					"vizDataBase": null,
					"datasourceType": "feed",
					"datasourceDefine": "<p style=\"margin-top: 1px\"><font size=3>中国股市也被称为“强政策市场”，把握政策脉搏，是判断A股市场走向的一个重要基点。回顾A股历史，1999年7月，《中华人民共和国证券法》正式实施，标志着我国证券市场法制化建设步入新阶段。2004年1月，“老国九条”出台，奠定了2005年至2007年股权分制改革牛市基础。2014年是中国经济全面深化改革“元年”，“新国九条”出台，资本市场改革得以推进。2019年至今，注册制从试点到全面落地、新证券法实施增加法制供给、退市制度不断完善，资本市场改革持续深化。今年3月，政府工作报告定调2021资本市场改革发展，明确提出稳步推进注册制改革，完善常态化退市机制，更好发挥多层次资本市场作用，拓展市场主体融资渠道。为今年资本市场改革指明了方向、奠定了基调。</font></p>"
				}
			},
			"w": 4,
			"h": 17.4,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "政策面"
	}, {
		"tabsKey": "TAB-4yhfSmMGg",
		"subTabs": [{
			"id": "CHART-Qter-LMmy3",
			"i": "CHART-Qter-LMmy3",
			"key": "CHART-Qter-LMmy3",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-Qter-LMmy3",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "",
					"vizType": "radar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：NewBanker研究院整理，当期值截至2021年5月31日',  \n        bottom:'1%',          \n        subtextStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },  \n    tooltip: {\n        trigger: 'item',\n        confine: true,\n        hideDelay: 200,\n        enterable: true\n    },\n    legend: {\n        data: ['当期值','上期值', '上年同期值' ],\n                top: 'middle',\n        right: '0%',\n        orient: '',\n        itemGap: 30,\n        textStyle:{\n            fontSize: 12,\n            fontFamily: 'Arial'\n        }\n    },\n    radar: [\n        {\n            indicator: [\n                { text: '月度：新增投资者数量(万人)' },\n                { text: '月度：公募基金发行规模(亿份)' },\n                { text: '月度：北向资金净买入(当月累计/万元)' },\n            ],\n            center: ['50%', '50%'],\n            shape: 'circle',\n            radius: 110,\n            startAngle: 90,\n            splitNumber: 4,\n            name: {\n                formatter: '{value}',\n                textStyle: {\n                    color: '#333333',\n                    fontFamily: 'Arial',\n                    verticalAlign: 'middle',\n                    Align: 'right',\n                    fontSize: 12,\n                    padding: 0\n                }\n            },\n            splitArea: {\n                areaStyle: {\n                    color: ['#FFFFFF',\n                        '#F2F2F2', '#FFFFFF',\n                        '#F2F2F2', '#FFFFFF'],\n                    shadowColor: 'rgba(0, 0, 0, 0)',\n                    shadowBlur: 0\n                }\n            },\n            axisLine: {\n                lineStyle: {\n                    color: '#AAAAAA'\n                }\n            },\n            splitLine: {\n                lineStyle: {\n                    color: 'rgba(255, 255, 255, 0.5)'\n                }\n            }\n        }\n    ],\n    series: [\n        {\n            name: '雷达图',\n            type: 'radar',\n            emphasis: {\n                lineStyle: {\n                    width: 4\n                }\n            },\n            data: [\n                {\n                    value: [],\n                    name: '当期值',\n                    symbol: 'rect',\n                    symbolSize: 5,\n                    lineStyle: {\n                        type: 'line',\n                        width: 4    \n                    },\n                    itemStyle: {\n                        color: '#FFBF00',\n                    }, \n                        emphasis: {\n                            lineStyle: {\n                                 width: 6\n                            }\n                        },                 \n                },\n                {\n                    value: [],\n                    name: '上期值',\n                    symbol: 'rect',\n                    symbolSize: 5,\n                    lineStyle: {\n                        type: 'line'\n                    },\n                    itemStyle: {\n                        color: '#1283D5',\n                    },   \n                },\n                {\n                    value: [],\n                    name: '上年同期值',\n                    symbol: 'rect',\n                    symbolSize: 5,\n                    itemStyle: {\n                        color: '#2dcacf',\n                    },                         \n                    areaStyle: {\n                       color: 'rgba(255, 255, 255, 0.5)'\n                    }\n                }\n            ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM  t_zijin_radar"
				}
			},
			"w": 8,
			"h": 9,
			"x": 0,
			"y": 2
		}, {
			"id": "FEED-XPL_G5CI23",
			"i": "FEED-XPL_G5CI23",
			"key": "FEED-XPL_G5CI23",
			"siblings": null,
			"type": "FEED",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "FEED-XPL_G5CI23",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "",
					"vizType": "feed",
					"vizDataBase": null,
					"datasourceType": "feed",
					"datasourceDefine": "<p style=\"margin-top: 1px\"><font size=3>2020年市场交投活跃度提升明显，全年市场新增投资者1802.25万，较2019年增长了36%。此外，2020年各类公募基金合计发行1441只，创1998年以来历史新高。2021年投资者“跑步入场”积极性依旧高涨，3月单月新增投资者数量创出2015年7月以来新高。A股投资者数量也于今年2月突破1.8亿大关。与此同时，基金发行规模仍保持在相对高位。2021年一季度共成立422只新基金，合计募集资金1.07万亿元，为史上新基金发行“最牛”季度。</font></p>"
				}
			},
			"w": 4,
			"h": 9,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART--qdfh-47NO",
			"i": "CHART--qdfh-47NO",
			"key": "CHART--qdfh-47NO",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART--qdfh-47NO",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "新增投资者数量",
					"vizType": "bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：中国证券登记结算公司',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当月值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },        \n    dataZoom: [{\n        show:true,\n        start: 0,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],  \n    xAxis: [\n        {\n            type: 'category',\n            data: [ ],\n            axisPointer: {\n                type: 'shadow'\n            }            \n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '万人', \n            splitLine: {\n                show: false\n            },              \n        }\n    ],\n    series: [\n        {\n            name: '当月值',\n            type: 'bar',\n            barWidth: '60%',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n            data: [ ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT dates as date, round(choice_value,2) as value FROM t_choice_invest_data WHERE choice_code=\"EMM00988895\" ORDER BY date"
				}
			},
			"w": 4,
			"h": 8,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-MdB0logmu2",
			"i": "CHART-MdB0logmu2",
			"key": "CHART-MdB0logmu2",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-MdB0logmu2",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "股票型公募基金发行规模",
					"vizType": "bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：wind',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当月值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },        \n    dataZoom: [{\n        show:true,\n        start: 0,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],       \n    xAxis: [\n        {\n            type: 'category',\n            data: [ ],\n            axisPointer: {\n                type: 'shadow'\n            }            \n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '亿份', \n            splitLine: {\n                show: false\n            },              \n        }\n    ],\n    series: [\n        {\n            name: '当月值',\n            type: 'bar',\n            barWidth: '60%',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n            data: [ ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_fundamount ORDER BY date"
				}
			},
			"w": 4,
			"h": 8,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-Zt5axziXoK",
			"i": "CHART-Zt5axziXoK",
			"key": "CHART-Zt5axziXoK",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-Zt5axziXoK",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "北向资金净买入",
					"vizType": "bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：wind',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当日值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },        \n    dataZoom: [{\n        show:true,\n        start: 0,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],    \n    xAxis: [\n        {\n            type: 'category',\n            data: [ ],\n            axisPointer: {\n                type: 'shadow'\n            }            \n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '亿元', \n            splitLine: {\n                show: false\n            },              \n        }\n    ],\n    series: [\n        {\n            name: '当日值',\n            type: 'bar',\n            barWidth: '60%',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n            data: [ ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT date, ROUND(`value`,2) FROM t_radar_define_data WHERE chartname = \"t_wind_estate\" AND colname=\"M0329532\"  ORDER BY date"
				}
			},
			"w": 4,
			"h": 8,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "资金面"
	}, {
		"tabsKey": "TAB-IZiu7FO6m",
		"subTabs": [{
			"id": "CHART-Pntp9_k1gy",
			"i": "CHART-Pntp9_k1gy",
			"key": "CHART-Pntp9_k1gy",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-Pntp9_k1gy",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "",
					"vizType": "radar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：NewBanker研究院整理，当期值截至2021年7月12日',  \n        bottom:'1%',          \n        subtextStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },  \n    tooltip: {\n        trigger: 'item',\n        confine: true,\n        hideDelay: 200,\n        enterable: true\n    },\n    legend: {\n        data: ['当期值','上期值', '上年同期值' ],\n                top: 'middle',\n        right: '0%',\n        orient: '',\n        itemGap: 30,\n        textStyle:{\n            fontSize: 12,\n            fontFamily: 'Arial'\n        }\n    },\n    radar: [\n        {\n            indicator: [\n                { text: '周度：融资余额(亿元)' },\n                { text: '周度：融券余额(亿元)' ,min:70,max:1700 },\n                { text: '周度：百度搜索指数-股票' ,min:9000,max:22000},\n            ],\n            center: ['50%', '50%'],\n            shape: 'circle',\n            radius: 110,\n            startAngle: 90,\n            splitNumber: 4,\n            name: {\n                formatter: '{value}',\n                textStyle: {\n                    color: '#333333',\n                    fontFamily: 'Arial',\n                    verticalAlign: 'middle',\n                    Align: 'right',\n                    fontSize: 12,\n                    padding: 0\n                }\n            },\n            splitArea: {\n                areaStyle: {\n                    color: ['#FFFFFF',\n                        '#F2F2F2', '#FFFFFF',\n                        '#F2F2F2', '#FFFFFF'],\n                    shadowColor: 'rgba(0, 0, 0, 0)',\n                    shadowBlur: 0\n                }\n            },\n            axisLine: {\n                lineStyle: {\n                    color: '#AAAAAA'\n                }\n            },\n            splitLine: {\n                lineStyle: {\n                    color: 'rgba(255, 255, 255, 0.5)'\n                }\n            }\n        }\n    ],\n   series: [\n        {\n            name: '雷达图',\n            type: 'radar',\n            emphasis: {\n                lineStyle: {\n                    width: 4\n                }\n            },\n            data: [\n                {\n                    value: [],\n                    name: '当期值',\n                    symbol: 'rect',\n                    symbolSize: 5,\n                    lineStyle: {\n                        type: 'line',\n                        width: 4    \n                    },\n                    itemStyle: {\n                        color: '#FFBF00',\n                    }, \n                        emphasis: {\n                            lineStyle: {\n                                 width: 6\n                            }\n                        },                 \n                },\n                {\n                    value: [],\n                    name: '上期值',\n                    symbol: 'rect',\n                    symbolSize: 5,\n                    lineStyle: {\n                        type: 'line'\n                    },\n                    itemStyle: {\n                        color: '#1283D5',\n                    },   \n                },\n                {\n                    value: [],\n                    name: '上年同期值',\n                    symbol: 'rect',\n                    symbolSize: 5,\n                    itemStyle: {\n                        color: '#2dcacf',\n                    },                         \n                    areaStyle: {\n                       color: 'rgba(255, 255, 255, 0.5)'\n                    }\n                }\n            ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM  t_morale_radar"
				}
			},
			"w": 8,
			"h": 9,
			"x": 0,
			"y": 2
		}, {
			"id": "FEED-cgXhw8gl1y",
			"i": "FEED-cgXhw8gl1y",
			"key": "FEED-cgXhw8gl1y",
			"siblings": null,
			"type": "FEED",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "FEED-cgXhw8gl1y",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "",
					"vizType": "feed",
					"vizDataBase": null,
					"datasourceType": "feed",
					"datasourceDefine": "<p style=\"margin-top: 1px\"><font size=3>2020年全年A股的融资融券余额为1.62万亿元，同比增长了59%，市场热度及投资者参与度高涨。2021年一季度，A股两融余额较2020年末小幅增长，市场情绪整体平稳。此外，对于“股票”一词的百度搜索热度近两年来呈现出增长趋势，投资者对于A股市场的关注度在持续提升。</font></p>"
				}
			},
			"w": 4,
			"h": 9,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-jgIQAg7_nC",
			"i": "CHART-jgIQAg7_nC",
			"key": "CHART-jgIQAg7_nC",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-jgIQAg7_nC",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "两市合计融资余额",
					"vizType": "bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：wind',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当日值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },        \n    dataZoom: [{\n        show:true,\n        start: 80,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],  \n    xAxis: [\n        {\n            type: 'category',\n            data: [ ],\n            axisPointer: {\n                type: 'shadow'\n            }            \n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '亿元', \n            splitLine: {\n                show: false\n            },              \n        }\n    ],\n    series: [\n        {\n            name: '当日值',\n            type: 'bar',\n            barWidth: '60%',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n            data: [ ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT date,  round(value / 100000000, 4)  FROM t_margin_trading"
				}
			},
			"w": 4,
			"h": 8,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-pL6HVz_8UC",
			"i": "CHART-pL6HVz_8UC",
			"key": "CHART-pL6HVz_8UC",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-pL6HVz_8UC",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "两市合计融券余额",
					"vizType": "bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：wind',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当日值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },        \n    dataZoom: [{\n        show:true,\n        start: 80,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],    \n    xAxis: [\n        {\n            type: 'category',\n            data: [ ],\n            axisPointer: {\n                type: 'shadow'\n            }            \n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '亿元', \n            splitLine: {\n                show: false\n            },              \n        }\n    ],\n    series: [\n        {\n            name: '当日值',\n            type: 'bar',\n            barWidth: '60%',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n            data: [ ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT date,  round(value / 100000000, 4)  FROM t_short_selling"
				}
			},
			"w": 4,
			"h": 8,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-bsjo4DoNdU",
			"i": "CHART-bsjo4DoNdU",
			"key": "CHART-bsjo4DoNdU",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-bsjo4DoNdU",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "百度搜索指数-股票",
					"vizType": "line",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：百度',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },   \n    tooltip: {\n        show: 'true',\n        trigger: 'axis',\n        axisPointer: { \n            type: 'cross' \n        }\n    },    \n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当周值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    dataZoom: [{\n        show:true,\n        start: 80,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],   \n    xAxis: {\n        type: 'category',\n        \n        data: [ ]\n    },\n    yAxis: {\n        type: 'value',\n        name: '',  \n        axisLabel: {\n            formatter: '{value} '\n        },\n        splitLine: {\n            show: false\n        },          \n    },\n    series: [{\n        name: '当周值',\n        connectNulls: true,\n        data: [ ],\n        type: 'line',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n        smooth: true        \n    }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_baiduindex"
				}
			},
			"w": 4,
			"h": 8,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "情绪面"
	}, {
		"tabsKey": "TAB-WRZkS3Ka6",
		"subTabs": [{
			"id": "CHART-795JWgVAwD",
			"i": "CHART-795JWgVAwD",
			"key": "CHART-795JWgVAwD",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-795JWgVAwD",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "行业结构占比",
					"vizType": "horizontal-bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：wind，截至2021年5月31日',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '9%',\n        top: '5%',        \n        containLabel: true\n    }, \n    legend: {\n        top: '1%',        \n        data: ['2021', '2010'],\n        selectedMode: true,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    yAxis: {\n        type: 'category',\n        axisLabel:{\n            interval:0,\n            rotate:0\n        },\n        data: []\n    },\n    xAxis: [\n        {\n            type: 'value',\n            name: '',\n            \n            axisLabel: {\n                formatter: '{value} %'\n            },\n            splitLine: {\n                show: false\n            },           \n        }\n    ],\n    series: [{\n        name:'2021',\n        data: [],\n        type: 'bar',\n        itemStyle: {\n            color: '#FFBF00',\n        },             \n    },\n    {\n        name:'2010',        \n        data: [],\n        type: 'bar',\n            itemStyle: {\n            color: '#1283D5',\n        },  \n    }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_structure"
				}
			},
			"w": 4,
			"h": 17.4,
			"x": 0,
			"y": 2
		}, {
			"id": "FEED-xtJAxZck8R",
			"i": "FEED-xtJAxZck8R",
			"key": "FEED-xtJAxZck8R",
			"siblings": null,
			"type": "FEED",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "FEED-xtJAxZck8R",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "",
					"vizType": "feed",
					"vizDataBase": null,
					"datasourceType": "feed",
					"datasourceDefine": "<p style=\"margin-top: 1px\"><font size=3>近年来中国经济结构调整提速，高质量发展的特征日益凸显，新兴行业的占比提升全面改善市场估值体系。与此同时，注册制改革与退市制度改革互相配合，共同打造资本市场高质量的“出口”和“入口”，上市公司质量整体提升。</font></p>"
				}
			},
			"w": 12,
			"h": 6.4,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-XtBYgLwiD4",
			"i": "CHART-XtBYgLwiD4",
			"key": "CHART-XtBYgLwiD4",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-XtBYgLwiD4",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "IPO数量",
					"vizType": "bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：中国证券监督管理委员会',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },    \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当月值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },        \n    dataZoom: [{\n        show:true,\n        start: 0,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],    \n    xAxis: [\n        {\n            type: 'category',\n            data: [ ],\n            axisPointer: {\n                type: 'shadow'\n            }            \n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '家', \n            splitLine: {\n                show: false\n            },              \n        }\n    ],\n    series: [\n        {\n            name: '当月值',\n            type: 'bar',\n            barWidth: '60%',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n            data: [ ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_IPO where date>\"1999-12-01\""
				}
			},
			"w": 6,
			"h": 10.6,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-EEvsH2_l4U",
			"i": "CHART-EEvsH2_l4U",
			"key": "CHART-EEvsH2_l4U",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-EEvsH2_l4U",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "退市数量",
					"vizType": "bar",
					"vizDataBase": "option = {\n    title: {\n        text: '',\n        show:true,\n        subtext:'数据来源：中国证券监督管理委员会',  \n        bottom:'0%',          \n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },     \n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {            \n            type: 'cross',\n            crossStyle: {\n                color: '#999'\n            }\n        }\n    },\n    grid: {\n        left: '5%',\n        right: '5%',\n        bottom: '18%',\n        top: '15%',        \n        containLabel: true\n    },\n    legend: {\n        top: '1%',        \n        data: ['当年值'],\n        selectedMode: false,\n        textStyle: {\n            fontFamily: 'Arial',\n            fontSize: 12\n        }\n    },   \n    dataZoom: [{\n        show:true,\n        start: 0,\n        end: 100,\n        brushSelect: false,\n        bottom: '9%', \n        left:'18%',\n        right:'19%',\n        height: 20,\n            textStyle: {\n               fontFamily: 'Arial',\n               fontSize: 10\n            }               \n    }],      \n    xAxis: [\n        {\n            type: 'category',\n            data: [ ],\n            axisPointer: {\n                type: 'shadow'\n            }            \n        }\n    ],\n    yAxis: [\n        {\n            type: 'value',\n            name: '件', \n            splitLine: {\n                show: false\n            },              \n        }\n    ],\n    series: [\n        {\n            name: '当年值',\n            type: 'bar',\n            barWidth: '60%',\n        itemStyle: {\n            color: '#1283D5',\n        },  \n            data: [ ]\n        }\n    ]\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT * FROM t_dropout"
				}
			},
			"w": 6,
			"h": 10.6,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "资产面"
	}],
	"ids": ["CHART-cFGL1eoNsR", "FEED-Dxk6eFEfvr", "CHART-Qter-LMmy3", "FEED-XPL_G5CI23", "CHART--qdfh-47NO", "CHART-MdB0logmu2", "CHART-Zt5axziXoK", "CHART-Pntp9_k1gy", "FEED-cgXhw8gl1y", "CHART-jgIQAg7_nC", "CHART-pL6HVz_8UC", "CHART-bsjo4DoNdU", "CHART-795JWgVAwD", "FEED-xtJAxZck8R", "CHART-XtBYgLwiD4", "CHART-EEvsH2_l4U"]
}, {
	"id": "TABS-fclIwqPlNS",
	"i": "TABS-fclIwqPlNS",
	"h": 20,
	"w": 12,
	"x": 0,
	"y": 2,
	"type": "TABS",
	"children": [{
		"tabsKey": "TAB-CpBgtA1j6M",
		"subTabs": [{
			"id": "CHART-zCJjpvGyt1",
			"i": "CHART-zCJjpvGyt1",
			"key": "CHART-zCJjpvGyt1",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-zCJjpvGyt1",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "月度上涨概率",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上涨概率'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [ ],\r\n            name: ' ',  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '上涨概率',\r\n            type: 'bar',\r\n            barWidth: '60%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "Select name,value from(\r\nSELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"value\" THEN round(VALUE,2) ELSE NULL END ) VALUE,\r\n  max( CASE WHEN colname = \"rank\" THEN VALUE + 0 ELSE NULL END ) AS rank\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_rate_month\" \r\n AND colname IN ( \"name\",\"value\",\"rank\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rank) tmp"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-TYsuMuBzie",
			"i": "CHART-TYsuMuBzie",
			"key": "CHART-TYsuMuBzie",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-TYsuMuBzie",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "月度涨跌幅",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n      title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },   \r\n tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            // 坐标轴指示器，坐标轴触发有效\r\n            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'\r\n        },\r\n    },\r\n    legend: {\r\n        data: ['平均涨幅', '最大涨幅', '最大跌幅'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',             \r\n            splitLine: {\r\n                show: false\r\n            }, \r\n            axisLine: {\r\n                show: false\r\n            },             \r\n        }\r\n    ],\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            axisTick: {\r\n                show: false\r\n            },\r\n            axisLine: {\r\n                show: false\r\n            },  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            },  \r\n            data: []\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '平均涨幅',\r\n            type: 'scatter',\r\n            label: {\r\n                show: false,\r\n                position: 'right'\r\n            },\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大涨幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false\r\n            },\r\n            barWidth: '9%',             \r\n            itemStyle: {\r\n            color: '#F85858',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大跌幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false,\r\n                position: 'left'\r\n            },\r\n        itemStyle: {\r\n            color: '#008000',\r\n        },              \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "Select name,average,max,min from(\r\nSELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) AS name,\r\n max( CASE WHEN colname = \"average\" THEN round(VALUE,2) ELSE NULL END ) AS average,\r\n max( CASE WHEN colname = \"max\" THEN round(VALUE,2) ELSE NULL END ) AS max,\r\n max( CASE WHEN colname = \"min\" THEN round(VALUE,2) ELSE NULL END ) AS min,\r\n max( CASE WHEN colname = \"rank\" THEN VALUE + 0 ELSE NULL END ) AS rank\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_range_month\" \r\n AND colname IN ( \"name\", \"average\", \"max\",\"min\",\"rank\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rank) tmp\r\n"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "月度涨跌数据统计"
	}, {
		"tabsKey": "TAB-EkgL14jqs",
		"subTabs": [{
			"id": "CHART-xgC2CZvudz",
			"i": "CHART-xgC2CZvudz",
			"key": "CHART-xgC2CZvudz",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-xgC2CZvudz",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "季度上涨概率",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上涨概率'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [ ],\r\n            name: ' ',  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '上涨概率',\r\n            type: 'bar',\r\n            barWidth: '20%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"value\" THEN round(VALUE,2) ELSE NULL END ) value\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_rate_season\" \r\n AND colname IN ( \"name\",\"value\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-C_WNRuyAG4",
			"i": "CHART-C_WNRuyAG4",
			"key": "CHART-C_WNRuyAG4",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-C_WNRuyAG4",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "季度涨跌幅",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            // 坐标轴指示器，坐标轴触发有效\r\n            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'\r\n        },\r\n    },\r\n    legend: {\r\n        data: ['平均涨幅', '最大涨幅', '最大跌幅'],\r\n        selectedMode: false,\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',             \r\n            splitLine: {\r\n                show: false\r\n            }, \r\n            axisLine: {\r\n                show: false\r\n            },             \r\n        }\r\n    ],\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            axisTick: {\r\n                show: false\r\n            },\r\n            axisLine: {\r\n                show: false\r\n            },  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            },  \r\n            data: []\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '平均涨幅',\r\n            type: 'scatter',\r\n            label: {\r\n                show: false,\r\n                position: 'right'\r\n            },\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大涨幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false\r\n            },\r\n            barWidth: '3%',             \r\n            itemStyle: {\r\n            color: '#F85858',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大跌幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false,\r\n                position: 'left'\r\n            },\r\n        itemStyle: {\r\n            color: '#008000',\r\n        },              \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"average\" THEN round(VALUE,2) ELSE NULL END ) average,\r\n max( CASE WHEN colname = \"max\" THEN round(VALUE,2) ELSE NULL END ) max,\r\n max( CASE WHEN colname = \"min\" THEN round(VALUE,2) ELSE NULL END ) min\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_range_season\" \r\n AND colname IN ( \"name\", \"average\", \"max\",\"min\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "季度涨跌数据统计"
	}],
	"ids": ["CHART-zCJjpvGyt1", "CHART-TYsuMuBzie", "CHART-xgC2CZvudz", "CHART-C_WNRuyAG4"]
}, {
	"id": "CHART-NsHW2upTfu",
	"i": "CHART-NsHW2upTfu",
	"key": "CHART-NsHW2upTfu",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-NsHW2upTfu",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "重大节假日后一个月上涨概率",
			"vizType": "bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },   \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上涨概率'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [ ],\r\n            name: ' ',  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '上涨概率',\r\n            type: 'bar',\r\n            barWidth: '20%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"value\" THEN round(VALUE,2) ELSE NULL END ) value\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_rate_holiday\" \r\n AND colname IN ( \"name\",\"value\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
		}
	},
	"w": 6,
	"h": 7,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-W8OIm6pS35",
	"i": "CHART-W8OIm6pS35",
	"key": "CHART-W8OIm6pS35",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-W8OIm6pS35",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "重大节假日后一个月涨跌幅",
			"vizType": "bar",
			"vizDataBase": "option = {\r\n     title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            // 坐标轴指示器，坐标轴触发有效\r\n            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'\r\n        },\r\n    },\r\n    legend: {\r\n        data: ['平均涨幅', '最大涨幅', '最大跌幅'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',             \r\n            splitLine: {\r\n                show: false\r\n            }, \r\n            axisLine: {\r\n                show: false\r\n            },             \r\n        }\r\n    ],\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            axisTick: {\r\n                show: false\r\n            },\r\n            axisLine: {\r\n                show: false\r\n            },  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            },  \r\n            data: []\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '平均涨幅',\r\n            type: 'scatter',\r\n            label: {\r\n                show: false,\r\n                position: 'right'\r\n            },\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大涨幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false\r\n            },\r\n            barWidth: '3%',             \r\n            itemStyle: {\r\n            color: '#F85858',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大跌幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false,\r\n                position: 'left'\r\n            },\r\n        itemStyle: {\r\n            color: '#008000',\r\n        },              \r\n            data: []\r\n        }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"average\" THEN round(VALUE,2) ELSE NULL END ) average,\r\n max( CASE WHEN colname = \"max\" THEN round(VALUE,2) ELSE NULL END ) max,\r\n max( CASE WHEN colname = \"min\" THEN round(VALUE,2) ELSE NULL END ) min\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_range_holiday\" \r\n AND colname IN ( \"name\", \"average\", \"max\",\"min\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
		}
	},
	"w": 6,
	"h": 7,
	"x": 0,
	"y": 2
}, {
	"id": "TABS-UGoO0IxZBr",
	"i": "TABS-UGoO0IxZBr",
	"h": 20,
	"w": 12,
	"x": 0,
	"y": 2,
	"type": "TABS",
	"children": [{
		"tabsKey": "TAB-RXSaP_ysyU",
		"subTabs": [{
			"id": "CHART-jCYlk5HbLI",
			"i": "CHART-jCYlk5HbLI",
			"key": "CHART-jCYlk5HbLI",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-jCYlk5HbLI",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤10%买入后上涨概率-上证综合指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指数近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上涨概率'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [ ],\r\n            name: ' ',  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '上涨概率',\r\n            type: 'bar',\r\n            barWidth: '20%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"value\" THEN round(VALUE,2) ELSE NULL END ) value\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_rate_shang_10\" \r\n AND colname IN ( \"name\",\"value\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-bYzfkEAEkj",
			"i": "CHART-bYzfkEAEkj",
			"key": "CHART-bYzfkEAEkj",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-bYzfkEAEkj",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤10%买入后涨跌幅-上证综合指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n     title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n   tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            // 坐标轴指示器，坐标轴触发有效\r\n            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'\r\n        },\r\n    },\r\n    legend: {\r\n        data: ['平均涨幅', '最大涨幅', '最大跌幅'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',             \r\n            splitLine: {\r\n                show: false\r\n            }, \r\n            axisLine: {\r\n                show: false\r\n            },             \r\n        }\r\n    ],\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            axisTick: {\r\n                show: false\r\n            },\r\n            axisLine: {\r\n                show: false\r\n            },  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            },  \r\n            data: []\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '平均涨幅',\r\n            type: 'scatter',\r\n            label: {\r\n                show: false,\r\n                position: 'right'\r\n            },\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大涨幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false\r\n            },\r\n            barWidth: '3%',             \r\n            itemStyle: {\r\n            color: '#F85858',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大跌幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false,\r\n                position: 'left'\r\n            },\r\n        itemStyle: {\r\n            color: '#008000',\r\n        },              \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"average\" THEN round(VALUE,2) ELSE NULL END ) average,\r\n max( CASE WHEN colname = \"max\" THEN round(VALUE,2) ELSE NULL END ) max,\r\n max( CASE WHEN colname = \"min\" THEN round(VALUE,2) ELSE NULL END ) min\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_range_shang_10\" \r\n AND colname IN ( \"name\", \"average\", \"max\",\"min\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-ic3YCLLxj8",
			"i": "CHART-ic3YCLLxj8",
			"key": "CHART-ic3YCLLxj8",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-ic3YCLLxj8",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤20%买入后上涨概率-上证综合指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指数近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上涨概率'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [ ],\r\n            name: ' ',  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '上涨概率',\r\n            type: 'bar',\r\n            barWidth: '20%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"value\" THEN round(VALUE,2) ELSE NULL END ) value\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_rate_shang_20\" \r\n AND colname IN ( \"name\",\"value\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-BlHNMw7mzu",
			"i": "CHART-BlHNMw7mzu",
			"key": "CHART-BlHNMw7mzu",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-BlHNMw7mzu",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤20%买入后涨跌幅-上证综合指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n     title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于上证综指近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            // 坐标轴指示器，坐标轴触发有效\r\n            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'\r\n        },\r\n    },\r\n    legend: {\r\n        data: ['平均涨幅', '最大涨幅', '最大跌幅'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',             \r\n            splitLine: {\r\n                show: false\r\n            }, \r\n            axisLine: {\r\n                show: false\r\n            },             \r\n        }\r\n    ],\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            axisTick: {\r\n                show: false\r\n            },\r\n            axisLine: {\r\n                show: false\r\n            },  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            },  \r\n            data: []\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '平均涨幅',\r\n            type: 'scatter',\r\n            label: {\r\n                show: false,\r\n                position: 'right'\r\n            },\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大涨幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false\r\n            },\r\n            barWidth: '3%',             \r\n            itemStyle: {\r\n            color: '#F85858',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大跌幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false,\r\n                position: 'left'\r\n            },\r\n        itemStyle: {\r\n            color: '#008000',\r\n        },              \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"average\" THEN round(VALUE,2) ELSE NULL END ) average,\r\n max( CASE WHEN colname = \"max\" THEN round(VALUE,2) ELSE NULL END ) max,\r\n max( CASE WHEN colname = \"min\" THEN round(VALUE,2) ELSE NULL END ) min\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_range_shang_20\" \r\n AND colname IN ( \"name\", \"average\", \"max\",\"min\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "上证综合指数涨跌统计"
	}, {
		"tabsKey": "TAB-nhMxUlxdT",
		"subTabs": [{
			"id": "CHART-lk8ih9zl4E",
			"i": "CHART-lk8ih9zl4E",
			"key": "CHART-lk8ih9zl4E",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-lk8ih9zl4E",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤10%买入后上涨概率-中证股票基金指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于中证股票型基金指数近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上涨概率'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [ ],\r\n            name: ' ',  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '上涨概率',\r\n            type: 'bar',\r\n            barWidth: '20%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"value\" THEN round(VALUE,2) ELSE NULL END ) value\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_rate_stock_10\" \r\n AND colname IN ( \"name\",\"value\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-chQuO0HOPf",
			"i": "CHART-chQuO0HOPf",
			"key": "CHART-chQuO0HOPf",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-chQuO0HOPf",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤10%买入后涨跌幅-中证股票基金指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n     title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于中证股票基金指数近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            // 坐标轴指示器，坐标轴触发有效\r\n            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'\r\n        },\r\n    },\r\n    legend: {\r\n        data: ['平均涨幅', '最大涨幅', '最大跌幅'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',             \r\n            splitLine: {\r\n                show: false\r\n            }, \r\n            axisLine: {\r\n                show: false\r\n            },             \r\n        }\r\n    ],\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            axisTick: {\r\n                show: false\r\n            },\r\n            axisLine: {\r\n                show: false\r\n            },  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            },  \r\n            data: []\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '平均涨幅',\r\n            type: 'scatter',\r\n            label: {\r\n                show: false,\r\n                position: 'right'\r\n            },\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大涨幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false\r\n            },\r\n            barWidth: '3%',             \r\n            itemStyle: {\r\n            color: '#F85858',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大跌幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false,\r\n                position: 'left'\r\n            },\r\n        itemStyle: {\r\n            color: '#008000',\r\n        },              \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"average\" THEN round(VALUE,2) ELSE NULL END ) average,\r\n max( CASE WHEN colname = \"max\" THEN round(VALUE,2) ELSE NULL END ) max,\r\n max( CASE WHEN colname = \"min\" THEN round(VALUE,2) ELSE NULL END ) min\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_range_10\" \r\n AND colname IN ( \"name\", \"average\", \"max\",\"min\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-mWUNgoc4hb",
			"i": "CHART-mWUNgoc4hb",
			"key": "CHART-mWUNgoc4hb",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-mWUNgoc4hb",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤20%买入后上涨概率-中证股票基金指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于中证股票基金指数近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上涨概率'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [ ],\r\n            name: ' ',  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '上涨概率',\r\n            type: 'bar',\r\n            barWidth: '20%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"value\" THEN round(VALUE,2) ELSE NULL END ) value\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_rate_stock_20\" \r\n AND colname IN ( \"name\",\"value\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}, {
			"id": "CHART-GzX4zEdEkn",
			"i": "CHART-GzX4zEdEkn",
			"key": "CHART-GzX4zEdEkn",
			"siblings": null,
			"type": "CHART",
			"chartStyle": {
				"style": [],
				"chart": {
					"id": "CHART-GzX4zEdEkn",
					"timeCreated": null,
					"timeLastUpdated": null,
					"title": "高点回撤20%买入后涨跌幅-中证股票基金指数",
					"vizType": "bar",
					"vizDataBase": "option = {\r\n     title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind，基于中证股票基金指数近30年行情数据计算得出',  \r\n        bottom:'1%',          \r\n        subtextStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            // 坐标轴指示器，坐标轴触发有效\r\n            type: 'cross'        // 默认为直线，可选为：'line' | 'shadow'\r\n        },\r\n    },\r\n    legend: {\r\n        data: ['平均涨幅', '最大涨幅', '最大跌幅'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',             \r\n            splitLine: {\r\n                show: false\r\n            }, \r\n            axisLine: {\r\n                show: false\r\n            },             \r\n        }\r\n    ],\r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            axisTick: {\r\n                show: false\r\n            },\r\n            axisLine: {\r\n                show: false\r\n            },  \r\n            axisPointer: {\r\n                type: 'shadow'\r\n            },  \r\n            data: []\r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '平均涨幅',\r\n            type: 'scatter',\r\n            label: {\r\n                show: false,\r\n                position: 'right'\r\n            },\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大涨幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false\r\n            },\r\n            barWidth: '3%',             \r\n            itemStyle: {\r\n            color: '#F85858',\r\n            },              \r\n            data: []\r\n        },\r\n        {\r\n            name: '最大跌幅',\r\n            type: 'bar',\r\n            stack: '总量',\r\n            label: {\r\n                show: false,\r\n                position: 'left'\r\n            },\r\n        itemStyle: {\r\n            color: '#008000',\r\n        },              \r\n            data: []\r\n        }\r\n    ]\r\n};",
					"datasourceType": "sql",
					"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"average\" THEN round(VALUE,2) ELSE NULL END ) average,\r\n max( CASE WHEN colname = \"max\" THEN round(VALUE,2) ELSE NULL END ) max,\r\n max( CASE WHEN colname = \"min\" THEN round(VALUE,2) ELSE NULL END ) min\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_withdraw_range_10\" \r\n AND colname IN ( \"name\", \"average\", \"max\",\"min\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
				}
			},
			"w": 6,
			"h": 7,
			"x": 0,
			"y": 2
		}],
		"children": [],
		"text": "中证股票基金指数涨跌统计"
	}],
	"ids": ["CHART-jCYlk5HbLI", "CHART-bYzfkEAEkj", "CHART-ic3YCLLxj8", "CHART-BlHNMw7mzu", "CHART-lk8ih9zl4E", "CHART-chQuO0HOPf", "CHART-mWUNgoc4hb", "CHART-GzX4zEdEkn"]
}, {
	"id": "CHART-s2lxR3rU89",
	"i": "CHART-s2lxR3rU89",
	"key": "CHART-s2lxR3rU89",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [{
			"id": 2,
			"chartId": "CHART-s2lxR3rU89",
			"key": "cellStyle",
			"value": "['t1r','t2r','t3r','t4yrange','t41profit','t4peper','t4pbper']"
		}],
		"chart": {
			"id": "CHART-s2lxR3rU89",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "行业轮动-发现低估行业",
			"vizType": "table",
			"vizDataBase": "[{\r\n                        title: '行业',\r\n                        key: 'value',\r\n                        align: 'center',\r\n                        width: 130\r\n                    },\r\n                            {\r\n                                title: '四月',\r\n                                align: 'center',\r\n                                children: [\r\n                                    {\r\n                                        title: '行业排名',\r\n                                        key: 't1rank',\r\n                                        align: 'center',\r\n                                        width: 100\r\n                                    },\r\n                                    {\r\n                                        title: '涨幅',\r\n                                        align: 'center',\r\n                                        key: 't1r',\r\n                                        align: 'center',\r\n                                        width: 100\r\n                                    }\r\n                                ]\r\n                            },\r\n                            {\r\n                                title: '五月',\r\n                                align: 'center',\r\n                                children: [\r\n                                    {\r\n                                        title: '行业排名',\r\n                                        key: 't2rank',\r\n                                        align: 'center',\r\n                                        width: 100\r\n                                    },\r\n                                    {\r\n                                        title: '涨幅',\r\n                                        align: 'center',\r\n                                        key: 't2r',\r\n                                        align: 'center',\r\n                                        width: 100\r\n                                    }\r\n                                ]\r\n                            },\r\n                            {\r\n                                title: '六月',\r\n                                align: 'center',\r\n                                children: [\r\n                                    {\r\n                                        title: '行业排名',\r\n                                        key: 't3rank',\r\n                                        align: 'center',\r\n                                        width: 100\r\n                                    },\r\n                                    {\r\n                                        title: '涨幅',\r\n                                        align: 'center',\r\n                                        key: 't3r',\r\n                                        align: 'center',\r\n                                        width: 100\r\n                                    }\r\n                                ]\r\n                    },\r\n                    {\r\n                        title: '年初至今累计涨幅',\r\n                        key: 't4yrange',\r\n                        align: 'center',\r\n\r\n                    },\r\n                    {\r\n                        title: '市盈率百分位',\r\n                        key: 't4peper',\r\n                        align: 'center',\r\n\r\n                    },\r\n                    {\r\n                        title: '市净率百分位',\r\n                        key: 't4pbper',\r\n                        align: 'center',\r\n\r\n                    },\r\n                    {\r\n                        title: '2021年第一季度行业归母净利润同比增长',\r\n                        key: 't41profit',\r\n                        align: 'center',\r\n\r\n                    }\r\n                ]\r\n\r\n",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT\r\n smap.value,\r\n tmp211.MONTH AS t1m,\r\n tmp211.rank AS t1rank,\r\n tmp211.ratio AS t1r,\r\n tmp212.MONTH AS t2m,\r\n tmp212.rank AS t2rank,\r\n tmp212.ratio AS t2r,\r\n tmp213.MONTH AS t3m,\r\n tmp213.rank AS t3rank,\r\n tmp213.ratio AS t3r,\r\n tmp214.yrange AS t4yrange,\r\n tmp214.1profit AS t41profit,\r\n tmp214.rank AS t4rank,\r\n tmp214.peper AS t4peper,\r\n tmp214.pbper AS t4pbper\r\nFROM\r\n (\r\n SELECT\r\n  DATE_FORMAT( date, \"%Y-%m\" ) AS MONTH,\r\n  LEFT ( rowlabel, 6 ) AS indu,\r\n  max( CASE WHEN colname = \"rank\" THEN VALUE + 0 ELSE NULL END ) AS rank,\r\n  max( CASE WHEN colname = \"ratio\" THEN Round(VALUE * 100, 2) ELSE NULL END ) AS ratio \r\n FROM\r\n  t_radar_define_data \r\n WHERE\r\n  chartname = \"t_shenwanyiji_rise_rank\" \r\n  AND rowlabel LIKE \"%2021-04\" \r\n GROUP BY\r\n  date,\r\n  LEFT ( rowlabel, 6 ) \r\n ) tmp211\r\n JOIN (\r\n SELECT\r\n  DATE_FORMAT( date, \"%Y-%m\" ) AS MONTH,\r\n  LEFT ( rowlabel, 6 ) AS indu,\r\n  max( CASE WHEN colname = \"rank\" THEN VALUE + 0 ELSE NULL END ) AS rank,\r\n  max( CASE WHEN colname = \"ratio\" THEN Round(VALUE * 100, 2) ELSE NULL END ) AS ratio \r\n FROM\r\n  t_radar_define_data \r\n WHERE\r\n  chartname = \"t_shenwanyiji_rise_rank\" \r\n  AND rowlabel LIKE \"%2021-05\" \r\n GROUP BY\r\n  date,\r\n  LEFT ( rowlabel, 6 ) \r\n ) tmp212 ON tmp211.indu = tmp212.indu\r\n JOIN (\r\n SELECT\r\n  DATE_FORMAT( date, \"%Y-%m\" ) AS MONTH,\r\n  LEFT ( rowlabel, 6 ) AS indu,\r\n  max( CASE WHEN colname = \"rank\" THEN VALUE + 0 ELSE NULL END ) AS rank,\r\n  max( CASE WHEN colname = \"ratio\" THEN Round(VALUE * 100, 2) ELSE NULL END ) AS ratio \r\n FROM\r\n  t_radar_define_data \r\n WHERE\r\n  chartname = \"t_shenwanyiji_rise_rank\" \r\n  AND rowlabel LIKE \"%2021-06\" \r\n GROUP BY\r\n  date,\r\n  LEFT ( rowlabel, 6 ) \r\n ) tmp213 ON tmp211.indu = tmp213.indu\r\n JOIN ( SELECT rowlabel, `value` FROM t_radar_define_data WHERE chartname = \"shenwan_mapper\" ) smap ON tmp213.indu = smap.rowlabel   \r\n JOIN ( \r\nSELECT \r\n  LEFT ( rowlabel, 6 ) AS indu,\r\n  max( CASE WHEN colname = \"yrange\" THEN Round(VALUE, 2) ELSE NULL END ) AS yrange,\r\n  max( CASE WHEN colname = \"peper\" THEN Round(VALUE, 2) ELSE NULL END ) AS peper,\r\n  max( CASE WHEN colname = \"pbper\" THEN Round(VALUE, 2) ELSE NULL END ) AS pbper,\r\n   max( CASE WHEN colname = \"1profit\" THEN Round(VALUE * 100, 2) ELSE NULL END ) AS 1profit,\r\n  max( CASE WHEN colname = \"rank\" THEN VALUE + 0 ELSE NULL END ) AS rank\r\n FROM\r\n  t_radar_define_data \r\n WHERE\r\n  chartname = \"t_shenwanyiji_manu\" \r\n  GROUP BY\r\n indu,\r\n LEFT ( rowlabel, 6 )\r\n) tmp214 on tmp213.indu = tmp214.indu \r\nORDER BY tmp214.rank\r\n"
		}
	},
	"w": 12,
	"h": 12.4,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-8Fgs3cYrNB",
	"i": "CHART-8Fgs3cYrNB",
	"key": "CHART-8Fgs3cYrNB",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-8Fgs3cYrNB",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "行业估值-市盈率",
			"vizType": "horizontal-bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '6%',\r\n        top: '7%',        \r\n        containLabel: true\r\n    }, \r\n    legend: {\r\n        top: '1%',        \r\n        data: ['市盈率(TTM)', '市盈率中位数'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    yAxis: {\r\n        type: 'category',\r\n        axisLabel:{\r\n            interval:0,\r\n            rotate:0\r\n        },\r\n        data: []\r\n    },\r\n    xAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '',\r\n            \r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },           \r\n        }\r\n    ],\r\n    series: [{\r\n        name:'市盈率(TTM)',\r\n        data: [],\r\n        type: 'bar',\r\n        itemStyle: {\r\n            color: '#FFBF00',\r\n        },             \r\n    },\r\n    {\r\n        name:'市盈率中位数',        \r\n        data: [],\r\n        type: 'bar',\r\n            itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n    }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT\r\n t2.value, t1.PETTM, t1.PEMIDTTM\r\nFROM\r\n (\r\nSELECT LEFT\r\n ( rowlabel, 6 ) AS CODE,\r\n max( CASE WHEN colname = \"PETTM\" THEN VALUE ELSE NULL END ) PETTM,\r\n max( CASE WHEN colname = \"PEMIDTTM\" THEN VALUE ELSE NULL END ) PEMIDTTM \r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_shenwanyiji_industry\" \r\n AND colname IN ( \"PETTM\", \"PEMIDTTM\" ) \r\n AND date = ( SELECT MAX( date ) FROM t_radar_define_data WHERE colname = \"PETTM\" ) \r\nGROUP BY\r\n LEFT(rowlabel, 6) \r\n ) t1\r\n left JOIN ( SELECT rowlabel, VALUE FROM t_radar_define_data WHERE chartname = \"shenwan_mapper\" ) t2  ON t1.CODE = t2.rowlabel"
		}
	},
	"w": 6,
	"h": 14.4,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-OnmmfJLm_z",
	"i": "CHART-OnmmfJLm_z",
	"key": "CHART-OnmmfJLm_z",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-OnmmfJLm_z",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "行业估值-市净率",
			"vizType": "horizontal-bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '6%',\r\n        top: '7%',        \r\n        containLabel: true\r\n    }, \r\n    legend: {\r\n        top: '1%',        \r\n        data: ['市净率(MRQ)', '市净率中位数'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    yAxis: {\r\n        type: 'category',\r\n        axisLabel:{\r\n            interval:0,\r\n            rotate:0\r\n        },\r\n        data: []\r\n    },\r\n    xAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '',\r\n            \r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },           \r\n        }\r\n    ],\r\n    series: [{\r\n        name:'市净率(MRQ)',\r\n        data: [],\r\n        type: 'bar',\r\n        itemStyle: {\r\n            color: '#FFBF00',\r\n        },             \r\n    },\r\n    {\r\n        name:'市净率中位数',        \r\n        data: [],\r\n        type: 'bar',\r\n            itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n    }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT\r\n t2.value, t1.PBMRQ, t1.PBMIDMRQ\r\nFROM\r\n (\r\nSELECT LEFT\r\n ( rowlabel, 6 ) AS CODE,\r\n max( CASE WHEN colname = \"PBMRQ\" THEN VALUE ELSE NULL END ) PBMRQ,\r\n max( CASE WHEN colname = \"PBMIDMRQ\" THEN VALUE ELSE NULL END ) PBMIDMRQ \r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_shenwanyiji_industry\" \r\n AND colname IN ( \"PBMRQ\", \"PBMIDMRQ\" ) \r\n AND date = ( SELECT MAX( date ) FROM t_radar_define_data WHERE colname = \"PBMRQ\" ) \r\nGROUP BY\r\n LEFT(rowlabel, 6) \r\n ) t1\r\n left JOIN ( SELECT rowlabel, VALUE FROM t_radar_define_data WHERE chartname = \"shenwan_mapper\" ) t2  ON t1.CODE = t2.rowlabel"
		}
	},
	"w": 6,
	"h": 14.4,
	"x": 0,
	"y": 2
}, {
	"id": "DIVIDER-YiV1LFd8RK",
	"i": "DIVIDER-YiV1LFd8RK",
	"key": "DIVIDER-YiV1LFd8RK",
	"siblings": null,
	"type": "DIVIDER",
	"w": 1,
	"h": 1,
	"x": 0,
	"y": 2
}, {
	"id": "HEADER-K7A5QteTcN",
	"i": "HEADER-K7A5QteTcN",
	"key": "HEADER-K7A5QteTcN",
	"siblings": null,
	"type": "HEADER",
	"w": 1,
	"h": 1,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-y7C18xvfSn",
	"i": "CHART-y7C18xvfSn",
	"key": "CHART-y7C18xvfSn",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-y7C18xvfSn",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "A股散户平均亏损",
			"vizType": "bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院整理',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {            \r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '8%',\r\n        right: '8%',\r\n        bottom: '15%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['当年值'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },        \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [],\r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }            \r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '万元', \r\n            splitLine: {\r\n                show: false\r\n            },              \r\n        }\r\n    ],\r\n    series: [\r\n        {\r\n            name: '当年值',\r\n            type: 'bar',\r\n            barWidth: '60%',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n            data: []\r\n        }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT * FROM t_loss_per_head"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "FEED-uRYAI02uhG",
	"i": "FEED-uRYAI02uhG",
	"key": "FEED-uRYAI02uhG",
	"siblings": null,
	"type": "FEED",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "FEED-uRYAI02uhG",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "",
			"vizType": "feed",
			"vizDataBase": null,
			"datasourceType": "feed",
			"datasourceDefine": "<p style=\"margin-top: 1px\"><font size=3>2020年A股主要指数全线上涨，上证指数年度涨幅为13.87%。据统计，2020年近半数股民年内的收益为负；而2020年运作满一年的公募基金中超97%取得正收益；全年取得正收益的私募基金占比也接近90%。相较于个人投资者，机构投资者拥有强大的专业、信息及资金优势，并具有组合投资、分散风险的能力。机构投资者长期投资的平均收益率远高于个人投资者。</font></p>"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-d_-7sAoUZa",
	"i": "CHART-d_-7sAoUZa",
	"key": "CHART-d_-7sAoUZa",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-d_-7sAoUZa",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "上证综合指数VS公募/私募收益率",
			"vizType": "bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院整理',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '6%',\r\n        right: '6%',\r\n        bottom: '10%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上证综合指数','公募基金-股票型','私募基金-股票型(20亿规模以上)'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [],\r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',\r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },            \r\n        }\r\n    ],\r\n    series: [\r\n         {\r\n            name: '上证综合指数',\r\n            connectNulls: true,            \r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            }\r\n         },\r\n       {\r\n            name: '公募基金-股票型',\r\n            type: 'bar',\r\n            data: [],\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },    \r\n        },\r\n        {\r\n            name: '私募基金-股票型(20亿规模以上)',\r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#2dcacf',\r\n        },   \r\n        }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT * FROM t_profit_comparison"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-g6mCNBVQIz",
	"i": "CHART-g6mCNBVQIz",
	"key": "CHART-g6mCNBVQIz",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-g6mCNBVQIz",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "上证综合指数VS公募/私募最大回撤",
			"vizType": "bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院整理',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '6%',\r\n        right: '6%',\r\n        bottom: '10%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['上证综合指数','公募基金-股票型','私募基金-股票型(20亿规模以上)'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [],\r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',\r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },            \r\n        }\r\n    ],\r\n    series: [\r\n         {\r\n            name: '上证综合指数',\r\n            connectNulls: true,            \r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            }\r\n         },\r\n       {\r\n            name: '公募基金-股票型',\r\n            type: 'bar',\r\n            data: [],\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },    \r\n        },\r\n        {\r\n            name: '私募基金-股票型(20亿规模以上)',\r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#2dcacf',\r\n        },   \r\n        }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT * FROM t_withdraw_comparison"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-o-_Av0Ubg8",
	"i": "CHART-o-_Av0Ubg8",
	"key": "CHART-o-_Av0Ubg8",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-o-_Av0Ubg8",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "不同持有期限正收益概率",
			"vizType": "bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院整理',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '6%',\r\n        right: '6%',\r\n        bottom: '10%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['股票型基金指数','混合型基金指数','中长期纯债基金指数'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [],\r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',\r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },            \r\n        }\r\n    ],\r\n    series: [\r\n         {\r\n            name: '股票型基金指数',\r\n            connectNulls: true,            \r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            }\r\n         },\r\n       {\r\n            name: '混合型基金指数',\r\n            type: 'bar',\r\n            data: [],\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },    \r\n        },\r\n        {\r\n            name: '中长期纯债基金指数',\r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#2dcacf',\r\n        },   \r\n        }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"stock\" THEN VALUE ELSE NULL END ) stock,\r\n max( CASE WHEN colname = \"mix\" THEN VALUE ELSE NULL END ) mix,\r\n max( CASE WHEN colname = \"bond\" THEN VALUE ELSE NULL END ) bond\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_positive_profit\" \r\n AND colname IN ( \"stock\", \"mix\", \"bond\",\"name\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
		}
	},
	"w": 4,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-cBsDjlNhPi",
	"i": "CHART-cBsDjlNhPi",
	"key": "CHART-cBsDjlNhPi",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-cBsDjlNhPi",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "不同持有期限平均总收益",
			"vizType": "bar",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind、NewBanker研究院整理',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },     \r\n    tooltip: {\r\n        trigger: 'axis',\r\n        axisPointer: {\r\n            type: 'cross',\r\n            crossStyle: {\r\n                color: '#999'\r\n            }\r\n        }\r\n    },\r\n    grid: {\r\n        left: '6%',\r\n        right: '6%',\r\n        bottom: '10%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['股票型基金指数','混合型基金指数','中长期纯债基金指数'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },  \r\n    xAxis: [\r\n        {\r\n            type: 'category',\r\n            data: [],\r\n            axisPointer: {\r\n                type: 'shadow'\r\n            }\r\n        }\r\n    ],\r\n    yAxis: [\r\n        {\r\n            type: 'value',\r\n            name: '%',\r\n            axisLabel: {\r\n                formatter: '{value} '\r\n            },\r\n            splitLine: {\r\n                show: false\r\n            },            \r\n        }\r\n    ],\r\n    series: [\r\n         {\r\n            name: '股票型基金指数',\r\n            connectNulls: true,            \r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#FFBF00',\r\n            }\r\n         },\r\n       {\r\n            name: '混合型基金指数',\r\n            type: 'bar',\r\n            data: [],\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },    \r\n        },\r\n        {\r\n            name: '中长期纯债基金指数',\r\n            type: 'bar',\r\n            data: [],\r\n            itemStyle: {\r\n            color: '#2dcacf',\r\n        },   \r\n        }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT \r\n max( CASE WHEN colname = \"name\" THEN VALUE ELSE NULL END ) name,\r\n max( CASE WHEN colname = \"stock\" THEN VALUE ELSE NULL END ) stock,\r\n max( CASE WHEN colname = \"mix\" THEN VALUE ELSE NULL END ) mix,\r\n max( CASE WHEN colname = \"bond\" THEN VALUE ELSE NULL END ) bond\r\nFROM\r\n t_radar_define_data \r\nWHERE\r\n chartname = \"t_average_profit\" \r\n AND colname IN ( \"stock\", \"mix\", \"bond\",\"name\" ) \r\nGROUP BY\r\n rowlabel\r\norder by rowlabel"
		}
	},
	"w": 4,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-tq40suVaMa",
	"i": "CHART-tq40suVaMa",
	"key": "CHART-tq40suVaMa",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-tq40suVaMa",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "国债到期收益率：10年",
			"vizType": "line",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：中国债券信息网',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },      \r\n    tooltip: {\r\n        show: 'true',\r\n        trigger: 'axis',\r\n        axisPointer: { \r\n            type: 'cross' \r\n        }\r\n    },    \r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '18%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['当月值'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    dataZoom: [{\r\n        show:true,\r\n        start: 80,\r\n        end: 100,\r\n        brushSelect: false,\r\n        bottom: '9%', \r\n        left:'18%',\r\n        right:'19%',\r\n        height: 20,\r\n            textStyle: {\r\n               fontFamily: 'Arial',\r\n               fontSize: 10\r\n            }               \r\n    }],  \r\n    xAxis: {\r\n        type: 'category',\r\n        \r\n        data: [ ]\r\n    },\r\n    yAxis: {\r\n        type: 'value',\r\n        name: '%',  \r\n        axisLabel: {\r\n            formatter: '{value} '\r\n        },\r\n        splitLine: {\r\n            show: false\r\n        },          \r\n    },\r\n    series: [{\r\n        name: '当月值',\r\n        connectNulls: true,\r\n        data: [ ],\r\n        type: 'line',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n        smooth: true        \r\n    }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT dates as date, round(choice_value,2) as value FROM t_choice_invest_data WHERE choice_code=\"EMM01015295\" ORDER BY date"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-qkzwJGxvbR",
	"i": "CHART-qkzwJGxvbR",
	"key": "CHART-qkzwJGxvbR",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-qkzwJGxvbR",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "货币基金平均7日年化收益率",
			"vizType": "line",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },      \r\n    tooltip: {\r\n        show: 'true',\r\n        trigger: 'axis',\r\n        axisPointer: { \r\n            type: 'cross' \r\n        }\r\n    },    \r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '18%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['当月值'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    dataZoom: [{\r\n        show:true,\r\n        start: 80,\r\n        end: 100,\r\n        brushSelect: false,\r\n        bottom: '9%', \r\n        left:'18%',\r\n        right:'19%',\r\n        height: 20,\r\n            textStyle: {\r\n               fontFamily: 'Arial',\r\n               fontSize: 10\r\n            }               \r\n    }],  \r\n    xAxis: {\r\n        type: 'category',\r\n        \r\n        data: [ ]\r\n    },\r\n    yAxis: {\r\n        type: 'value',\r\n        name: '%',  \r\n        axisLabel: {\r\n            formatter: '{value} '\r\n        },\r\n        splitLine: {\r\n            show: false\r\n        },          \r\n    },\r\n    series: [{\r\n        name: '当月值',\r\n        connectNulls: true,\r\n        data: [ ],\r\n        type: 'line',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n        smooth: true        \r\n    }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT dates as date, round(choice_value,2) as value FROM t_choice_invest_data WHERE choice_code=\"EMI01516342\" ORDER BY date"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-oRni74_vv_",
	"i": "CHART-oRni74_vv_",
	"key": "CHART-oRni74_vv_",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-oRni74_vv_",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "理财产品预期年收益率",
			"vizType": "line",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：wind',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },      \r\n    tooltip: {\r\n        show: 'true',\r\n        trigger: 'axis',\r\n        axisPointer: { \r\n            type: 'cross' \r\n        }\r\n    },    \r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '18%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['当月值'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    dataZoom: [{\r\n        show:true,\r\n        start: 80,\r\n        end: 100,\r\n        brushSelect: false,\r\n        bottom: '9%', \r\n        left:'18%',\r\n        right:'19%',\r\n        height: 20,\r\n            textStyle: {\r\n               fontFamily: 'Arial',\r\n               fontSize: 10\r\n            }               \r\n    }],  \r\n    xAxis: {\r\n        type: 'category',\r\n        \r\n        data: [ ]\r\n    },\r\n    yAxis: {\r\n        type: 'value',\r\n        name: '%',  \r\n        axisLabel: {\r\n            formatter: '{value} '\r\n        },\r\n        splitLine: {\r\n            show: false\r\n        },          \r\n    },\r\n    series: [{\r\n        name: '当月值',\r\n        connectNulls: true,\r\n        data: [ ],\r\n        type: 'line',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n        smooth: true        \r\n    }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT dates as date, round(choice_value,2) as value FROM t_choice_invest_data WHERE choice_code=\"EMI01516303\" ORDER BY date"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "CHART-_3hmdZWk8o",
	"i": "CHART-_3hmdZWk8o",
	"key": "CHART-_3hmdZWk8o",
	"siblings": null,
	"type": "CHART",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "CHART-_3hmdZWk8o",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "一年期存款基准利率",
			"vizType": "line",
			"vizDataBase": "option = {\r\n    title: {\r\n        text: '',\r\n        show:true,\r\n        subtext:'数据来源：中国人民银行',  \r\n        bottom:'0%',          \r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },      \r\n    tooltip: {\r\n        show: 'true',\r\n        trigger: 'axis',\r\n        axisPointer: { \r\n            type: 'cross' \r\n        }\r\n    },    \r\n    grid: {\r\n        left: '5%',\r\n        right: '5%',\r\n        bottom: '18%',\r\n        top: '15%',        \r\n        containLabel: true\r\n    },\r\n    legend: {\r\n        top: '1%',        \r\n        data: ['当月值'],\r\n        selectedMode: false,\r\n        textStyle: {\r\n            fontFamily: 'Arial',\r\n            fontSize: 12\r\n        }\r\n    },    \r\n    dataZoom: [{\r\n        show:true,\r\n        start: 0,\r\n        end: 100,\r\n        brushSelect: false,\r\n        bottom: '9%', \r\n        left:'18%',\r\n        right:'19%',\r\n        height: 20,\r\n            textStyle: {\r\n               fontFamily: 'Arial',\r\n               fontSize: 10\r\n            }               \r\n    }],  \r\n    xAxis: {\r\n        type: 'category',\r\n        \r\n        data: [ ]\r\n    },\r\n    yAxis: {\r\n        type: 'value',\r\n        name: '%',  \r\n        axisLabel: {\r\n            formatter: '{value} '\r\n        },\r\n        splitLine: {\r\n            show: false\r\n        },          \r\n    },\r\n    series: [{\r\n        name: '当月值',\r\n        connectNulls: true,\r\n        data: [ ],\r\n        type: 'line',\r\n        itemStyle: {\r\n            color: '#1283D5',\r\n        },  \r\n        smooth: true        \r\n    }\r\n    ]\r\n};",
			"datasourceType": "sql",
			"datasourceDefine": "SELECT dates as date, round(choice_value,2) as value FROM t_choice_invest_data WHERE choice_code=\"EMM00167378\" ORDER BY date"
		}
	},
	"w": 6,
	"h": 8.8,
	"x": 0,
	"y": 2
}, {
	"id": "MARKDOWN-hD7NznyOOJ",
	"i": "MARKDOWN-hD7NznyOOJ",
	"key": "MARKDOWN-hD7NznyOOJ",
	"siblings": null,
	"type": "MARKDOWN",
	"chartStyle": {
		"style": [],
		"chart": {
			"id": "MARKDOWN-hD7NznyOOJ",
			"timeCreated": null,
			"timeLastUpdated": null,
			"title": "免责声明-雷达",
			"vizType": "markdown",
			"vizDataBase": null,
			"datasourceType": "markdown",
			"datasourceDefine": "<p style=\"margin-top: 0.5px\"><font size=1><center>免责声明</font></p ></center>\r\n<p style=\"margin-top: 0.5px\"><font size=1><div style=\"text-align: left\">数据和信息内容来源：Wind、国家统计局、中国人民银行、中国财政部、中国人力资源和社会保障部、国家知识产权局、中国海关总署、中国证券监督管理委员会、中国银行保险监督管理委员会、中国证券登记结算公司、中国基金业协会、新华社、央视网、证券时报网、东方财富网、金融界、同花顺、中金在线、新浪财经、第一财经、腾讯财经、和讯财经、网易财经、环球网、上海证券报、21世纪经济报道、财新、财经、界面新闻、每日经济新闻、财联社、经济日报、中新经纬、首席商业评论、功夫财经、泽平宏观、叶檀财经、百度、高盛、NewBanker研究院等。</font></p >\r\n<p style=\"margin-top: 0.5px\"><font size=1><div style=\"text-align: left\">以上数据内容仅供参考，对客户的适用性取决于多项因素，我司对以上内容和任何报告文件不收取费用，亦不对此承担任何责任。</font></p >\r\n<p style=\"margin-top: 0.5px\"><font size=1><div style=\"text-align: left\">以上页面的计算和图表结果只供说明用途，仅作参考。没有说明或代表任何真实产品、或者是市场未来状况。相关数据和测算仅作参考，不能被理解为财务咨询。在未来的投资行为中，客户必须行使自己的判断能力，不应该以建议或图表为准。此外，客户须针对自己特定的投资需求，向专业人士寻求专业咨询。</font></p >\r\n<p style=\"margin-top: 0.5px\"><font size=1><div style=\"text-align: left\">本页面主要作为说明用途，并非想要试图要约，或征求要约出售或购买/认购任何产品，包括投资产品。在任何情况下，它也不能被视为是我司给予的咨询。我司将不会对客户所选择信赖的资料包括这里面所载的资料负责。因此，客户必须使用自己的独立判断能力，如果有任何疑问，您须另外寻求独立的咨询。</font></p >"
		}
	},
	"w": 12,
	"h": 8.4,
	"x": 0,
	"y": 2
}]
"