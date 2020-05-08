import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {withRouter} from 'react-router';

import bgImg from '../../assets/imgs/home-bg.jpeg';
import autoImg from '../../assets/imgs/auto.png';

export default withRouter(Home);

const links = [{name:'自动分析', img: autoImg, path: '/auto-analyze'}];

function Home(props) {
  function navTo(name, path) {
    let {history} = props;
    history.push(path);
  }
  return (
    <View>
      <View style={styles.header}>
        <ImageBackground source={bgImg} style={{width: '100%', height: 300}}>
          <Text style={{color:'#fff',fontSize: 20, fontWeight: 'bold', padding: 10,}}>色谱分析 移动端</Text>
        </ImageBackground>
      </View>
      <View style={{marginTop: 0}}>
        {
          links.map(link=>
            <TouchableHighlight
              key={link.name}
              underlayColor={'#fff'}
              onPress={()=>navTo(link.name, link.path)}>
                <View style={styles.linkItem}>
                  <Image source={link.img} style={{width: 30,height: 30, marginRight: 30}}/>
                  <Text style={styles.linkFont}>{link.name}</Text>
                </View>
              </TouchableHighlight>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
   height: 300,
  },
  linkItem:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'flex-start',
    height:50,
    marginTop: 20,
    paddingLeft:100,
    backgroundColor: '#ddd'
  },
  linkFont:{
    fontSize: 20
  }

})
