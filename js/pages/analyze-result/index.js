import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {withRouter} from 'react-router';
import Chart from '../../components/chart';

export default withRouter(Result);
function Result(props) {
  let {peaks, rawData, filteredYarr} = props.history.location.state;
  const xArr = rawData.xArr;
  const yArrStack = {
    rawYArr: rawData.yArr,
    filteredYArr: [...filteredYarr],
  };
  filteredYarr = null;
  return (
    <SafeAreaView>
      <View>
        <Chart xArr={xArr} yArrStack={yArrStack} peaks={peaks} />
      </View>
    </SafeAreaView>
  );
}
