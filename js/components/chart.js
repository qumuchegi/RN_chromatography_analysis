/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React,{useState, useEffect} from 'react';
import {View, Text, Image, Dimensions, TouchableHighlight, ScrollView} from 'react-native';
import api from '../api';
import {withRouter} from 'react-router';
import Table from './table';
import backhomeImg from '../assets/imgs/back.png';

import {baseUrl as baseServerUrl} from '../config';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default withRouter(Chart);

function Chart(props) {
  const {history} = props;
  const {xArr, yArrStack, peaks} = props;
  const [option, setOption] = useState(null);
  const [chartImg, setChartImg] = useState(null);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    const {rawYArr, filteredYArr} = yArrStack;
    let headers = [
      {
        name: '组分',
        reference_key: "name",
      },
      {
        name:"保留时间 min",
        reference_key:"retention_time",
      },
      {
        name:"起点  min",
        reference_key:"startPoint_time",
      },
      {
        name:"终点  min",
        reference_key:"endPoint_time",
      },
      {
        name:"峰高   mv",
        reference_key:"heighestPoint_voltage",
      },
      {
        name:"面积  mv*min",
        reference_key:"areaPeak",
      },
      {
        name:"含量 %",
        reference_key:"ratio",
      },
    ];
    setTableHeaders(headers)
    let rows = [];

    let allPeaksArea = peaks.reduce((prevArea, peak)=>prevArea+Number(peak.state.areaPeak),0)
    peaks.forEach((peak,i)=>{
      rows.push([
        i+1,
        Number(peak.state.retention_time).toFixed(6),
        Number(peak.state.startPoint_time).toFixed(6),
        Number(peak.state.endPoint_time).toFixed(6),
        Number(peak.state.heighestPoint_voltage).toFixed(3),
        peak.state.areaPeak,
        `${(100*Number(peak.state.areaPeak)/allPeaksArea).toFixed(2)} %`,
      ])
    } )
    setTableRows(rows)
    
    let markPoints = getMarkPoints_peak(peaks);
    let yArr_stack=[
      {name: '原始谱图', value: rawYArr},
      {name: '滤波谱图', value: filteredYArr, markPoints},
    ]
    //
    let option = printChart(xArr, yArr_stack);
    console.log({option});
    renderChart(option);
    //setOption(option);
    option=null
  }, []);

  async function renderChart(option){
    let res = await api.post('/server-render-chart', {option});
    if (res.code === 0) {
      let imgUrl = baseServerUrl + res.data.url
      setChartImg(imgUrl);
    }
  }
  const printChart = (xArr, yArr_stack) => {
    var option = {
      legend: {
        data: yArr_stack.map(yArr=>yArr.name)
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
          type: 'category',
          data: xArr,
          name: '时间 / min'
      },
      yAxis: {
          type: 'value',
          name: '电压 / mv'
      },
      series: yArr_stack.map(yArr=>
          ({
            name: yArr.name,
            data: yArr.value,
            type: 'line',
            smooth: true,
            markPoint:{
              symbol:'triangle',
              symbolKeepAspect: false,
              symbolSize: 10,
              data: yArr.markPoints
            },
          })
        )
    }
    return option
  }

  const getMarkPoints_peak = (peaks) => {
    console.log('peaks:', peaks)
    let markPoints = []
    peaks.forEach((peak,i)=>{
      markPoints.push(
        {
          value:i+1+'顶点',
          coord:[`${Number(peak.state.retention_time).toFixed(6)}`, peak.state.heighestPoint_voltage]
        }
      )
    })

    return markPoints;
  }
  return (
    <ScrollView height={screenHeight-50}>
      <View>
        <Text style={{
            textAlign: 'center',
            fontSize: 20,
            height: 30,
            backgroundColor: 'rgb(72,145,115)',
            color:'white',
            padding: 6
          }}>
          分析结果
        </Text>
      </View>
      <ScrollView>
      <View>
        { chartImg && <Image style={{ width: 400, height: 300}} source={{uri: chartImg}}/>}
      </View>
      <View>
        <Table headers={tableHeaders} rows={tableRows} />
      </View>
      <View style={{
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
         margin: 10
        }}>
        <TouchableHighlight
          underlayColor="#eee"
          style={{
            borderRadius: 4,
            borderWidth: 2,
            borderStyle: 'solid',
            padding: 3,
            borderColor: 'rgb(72,145,115)',
          }}
          onPress={() => history.push('/home')}>
          <View
            style={{
              display:'flex',
              flexDirection:'row',
              alignItems:'center',
              justifyContent: 'center',
            }}
          >
            <Image source={backhomeImg} style={{width: 20, height: 20}}/>
            <Text 
              style={{
                color: 'rgb(72,145,115)',
              }}>返回首页</Text>
          </View>
        </TouchableHighlight>
      </View>
      </ScrollView>
    </ScrollView>
  );
}
