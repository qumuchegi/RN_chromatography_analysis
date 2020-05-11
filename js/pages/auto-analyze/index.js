/* eslint-disable jsx-quotes */
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Image,
  Alert,
  Modal,
  Button,
  ActivityIndicator,
} from 'react-native';
import {withRouter} from 'react-router';

import Back from '../../components/back';
import downloadImg from '../../assets/imgs/download.png';
import txt1Img from '../../assets/imgs/txt1.png';
import Picker from '../../components/picker';
import addImg from '../../assets/imgs/add.png';

import NumberInput from '../../components/numberInput';

import api from '../../api';
import {baseUrl} from '../../config';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default withRouter(Auto);
function Auto(props) {
  const {history} = props;
  const [txtFiles, setTxtFiles] = useState([]);
  const [selectedTxtFile, setSelectedTxtFile] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [filterWin, setFilterWin] = useState(null);
  const [peakIdentType, setPeakIdentType] = useState(null);
  const [peakIdentWin, setPeakIdentWin] = useState(null);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [showPCUploadModal, setShowPCUploadModal] = useState(false);

  async function readFiles() {
    setLoadingFiles(true);
    let res = await api.get('/read-assets-dir');
    setTxtFiles(res.data.dir);
    setLoadingFiles(false);
  }

  function pickFile(filename) {
    if (selectedTxtFile === filename) {
      return Alert.alert('已加载当前文件');
    }
    console.log({filename});
    setSelectedTxtFile(filename);
  }
  function uploadFileByPCPoind() {
    setShowPCUploadModal(true);
  }
  function pickFilterType(value) {
    setFilterType(value);
  }
  function inputFilterWin(value) {
    setFilterWin(value);
  }
  function pickPeakIdentType(value) {
    setPeakIdentType(value);
  }
  function inputPeakIdentWin(value) {
    setPeakIdentWin(value);
  }
  async function submit() {
    if (!selectedTxtFile) {
      return Alert.alert('请选择文件');
    }
    if (!filterWin) {
      return Alert.alert('请输入滤波窗口');
    }
    if (!filterType) {
      return Alert.alert('请选择滤波方法');
    }
    if (!peakIdentWin) {
      return Alert.alert('请输入峰识别窗口');
    }
    if (!peakIdentType) {
      return Alert.alert('请选择峰识别方法');
    } else {
      setLoadingAnalyze(true);
      //txtfilename, filterWin, filterType, peakIdentWin, peakIdentType
      let formData = new FormData();
      formData.append('txtfilename', selectedTxtFile);
      formData.append('filterWin', filterWin);
      formData.append('filterType', filterType);
      formData.append('peakIdentWin', peakIdentWin);
      formData.append('peakIdentType', peakIdentType);

      let res = await api.post('/auto-analyze', formData);
      if (res.code === 0) {
        setLoadingAnalyze(false);
        let {peaks, rawData, filteredYarr} = res.data;
        history.push('/analyze-result', {peaks, rawData, filteredYarr, chartName: selectedTxtFile});
      }
    }
  }
  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showPCUploadModal}>
        <SafeAreaView style={styles.modalView}>
          <View>
            <Text style={{ 
              textAlign: 'center',
              fontSize: 20 
              }}>拷贝以下链接至PC浏览器，在跳出网页中上传文件</Text>
            <Text style={{ 
              textAlign: 'center',
              paddingTop: 100,
              paddingBottom: 100,
              color:'rgb(72,145,115)',
              fontSize: 20 }}>{baseUrl}/pc-upload-file</Text>
            <Button title='好的' onPress={()=>setShowPCUploadModal(false)}/>
          </View>
        </SafeAreaView>
      </Modal>
      <View>
        <Back history={history} curTitle="自动分析" />
      </View>
      <ScrollView style={{height: screenHeight}}>
      <View>
        {
          selectedTxtFile ?
          <Text style={{textAlign:'center', padding: 10, color:'green'}}>
            已选取文件：{selectedTxtFile}
          </Text>
          :
          <TouchableHighlight
          onPress={readFiles}
          underlayColor="#eee"
          style={{
            borderWidth: 2,
            borderColor: '#bbb',
            borderStyle: 'dashed',
            borderRadius: 3,
            margin: 10,
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={downloadImg} style={{width: 30, height: 30}} />
            <Text style={{fontSize: 20, textAlign: 'center', margin: 10}}>
              选取远端色谱原始文件
            </Text>
          </View>
          </TouchableHighlight>
        }
        {txtFiles.length > 0 ? (
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexWrap:'wrap',
              flexDirection: 'row',
            }}>
            {txtFiles.map((filename) => (
              <TouchableHighlight
                underlayColor="#eee"
                key={filename}
                onPress={() => pickFile(filename)}
                style={[styles.fileDownloadItem, { borderColor: selectedTxtFile === filename ? 'green' : 'white',}]}>
                <View>
                  <Image source={txt1Img} style={{width: 30, height: 30}} />
                  <Text>{filename}</Text>
                </View>
              </TouchableHighlight>
            ))}
            <TouchableHighlight
              underlayColor="white"
              onPress={uploadFileByPCPoind}
              style={[styles.fileDownloadItem, {borderColor: '#aaa', borderStyle:'dashed'}]}>
              <View style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                <Image source={addImg} style={{width: 30, height: 30}}/>
                <Text>从电脑端上传新文件</Text>
              </View>
            </TouchableHighlight>
          </View>
        ) : loadingFiles ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null}
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <Picker
            pickLabel="选择滤波方法"
            placeholderContent="点击选择"
            onPick={pickFilterType}
            pickedValue={filterType}
            items={[
              {label: '移动平均滤波', value: '平均滤波', key: '平均滤波'},
              {label: '中值滤波', value: '中值滤波', key: '中值滤波'},
              {label: '多项式滤波', value: '多项式滤波', key: '多项式滤波'},
            ]}
          />
          <NumberInput inputLabel="输入滤波窗口大小" onInput={inputFilterWin} />
          <Picker
            pickLabel="选择滤波方法"
            placeholderContent="点击选择"
            onPick={pickPeakIdentType}
            pickedValue={peakIdentType}
            items={[
              {
                label: '一阶导数峰识别法',
                value: '一阶导数法',
                key: '一阶导数法',
              },
            ]}
          />
          <NumberInput
            inputLabel="输入峰识别窗口大小"
            onInput={inputPeakIdentWin}
          />
        </View>
        <View
          style={{
            marginTop: 40,
          }}>
          {loadingAnalyze ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null}
          <Button
              title="提交分析"
              onPress={submit}
              color="#5A8F75"
              disabled={loadingAnalyze} />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  fileDownloadItem: {
    margin: 10,
    padding: 3,
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 1,
  },
  modalView: {
    marginTop: 100,
  },
});
