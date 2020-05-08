import React,{useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  findNodeHandle,
  Dimensions,
  UIManager,
  Modal,
  TouchableHighlight,
  ScrollView} from 'react-native';
import Accordion from 'react-native-collapsible-accordion';
import api from '../../api';

import spreadImg from '../../assets/imgs/spread.png';
import spread1Img from '../../assets/imgs/spread1.png';
import shrinkImg from '../../assets/imgs/shrink.png';

import Markdown from 'react-native-markdown-display';

const screenHeight = Math.round(Dimensions.get('window').height);

export default function PrjIntro() {
  const dirContainer = useRef()
  const [introDir, setIntroDir] = useState(null)
  const [showFileName, setShowFileName] = useState('')
  const [showFileContent, setShowFileContent] = useState('')
  const [mdContainerHeight, setMdContainerHeight] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    getintroDir()
  }, [])
  async function getintroDir(){
    let res = await api.get('/prj-intro-dir')
    if(res.code===0){
      //console.log(res.data)
      setIntroDir(res.data.introDir)
    }
  }
  async function pickFile(dir, name){
    //autoSize()
    setShowFileName(`${dir} > ${name}`)
    let res = await api.get('/prj-intro-file',{introDir: dir, introJsonFileName: name})
    if(res.code===0){
      setShowFileContent(res.data.jsonFileContent)
    }
  }
  function autoSize(){
    //console.log(dirContainer)
    const handle = findNodeHandle(dirContainer.current)
    UIManager.measure(handle,(x, y, width, height, pageX, pageY)=>{
      //console.log('相对父视图位置x:', x);
      //console.log('相对父视图位置y:', y);
      //console.log('组件宽度width:', width);
      //console.log('组件高度height:', height);
      //console.log('距离屏幕的绝对位置x:', pageX);
      //console.log('距离屏幕的绝对位置y:', pageY);
      setMdContainerHeight(screenHeight - 100 - height -40 - 5) // 100 是底部tab高,，40 是头部高度
    })
   
  }
  return (
    <View>
       <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}>
          <SafeAreaView>
            <View style={styles.mdContent}>
              <View style={{display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center', marginBottom: 10}}>
                <TouchableHighlight 
                onPress={()=>setShowModal(false)} 
                underlayColor='white'>
                  <Image source={shrinkImg} style={{width: 20, height: 20}}/>
                </TouchableHighlight>
                <Text style={{fontSize: 20, color: 'rgb(72,145,115)', marginLeft: 30}}>{showFileName.replace('.md', '')}</Text>
              </View>
              <Markdown>{showFileContent}</Markdown>
            </View>
          </SafeAreaView>
        </Modal>
      <View style={styles.header}>
        <Text style={{color: 'white', padding: 10, fontSize: 20}}>项目介绍</Text>
      </View>
      <View ref={dirContainer}>
        {introDir && introDir.map(obj=>
        <Accordion key={Object.keys(obj)[0]}
          renderHeader={()=>
            <View style={styles.accordion_header}>
              <Text
                style={{
                  fontSize: 18
                }}
              >{Object.keys(obj)[0]}</Text>
              <Image source={spreadImg} style={{width: 20, height: 20}}/>
            </View>
          }
          renderContent={()=>
            <View style={styles.accordion_content}>
              {
                Object.values(obj)[0].map(title=>
                  <TouchableHighlight 
                  key={title}
                  underlayColor="#eee"
                  style={{
                    padding: 5
                  }}
                  onPress={()=>{
                    pickFile(Object.keys(obj)[0], title)
                  }}
                  >
                    <Text style={{
                      fontSize: 16
                    }}>{ String.prototype.replace.call(title, '.md','')}</Text>
                  </TouchableHighlight>
                )
              }
            </View>
          }
          onChangeVisibility={(value) => {
            autoSize()
          }}
        >
        </Accordion>
        )}
      </View>
      <ScrollView style={[styles.mdContent, {height: mdContainerHeight}]}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: 'center', marginBottom: 10}}>
          {
            showFileContent!=='' ?
            <TouchableHighlight onPress={()=>setShowModal(true)} underlayColor='white'>
              <Image source={spread1Img} style={{width: 20, height: 20}}/>
            </TouchableHighlight>
            :null
          }
          <Text style={{fontSize: 20, color: 'rgb(72,145,115)', marginLeft: 30}}>{showFileName.replace('.md', '')}</Text>
        </View>
        <Markdown>{showFileContent}</Markdown>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgb(72,145,115)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection:'row',
    height: 40,
  },
  accordion_header: {
    backgroundColor: '#ddd',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  accordion_content: {
    display: 'flex',
    padding: 10,
    backgroundColor: '#eee'
  },
  mdContent: {
    padding: 10,
    paddingBottom:50,
    marginBottom: 10
    //borderStyle: 'solid',
    //borderColor: '#aaa',
    //borderWidth: 1,
  }
})