import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

export default function Table({headers, rows}){

  return (
    <View>
      <Text>共监测到{rows.length}个谱峰</Text>
      <View style={styles.header}>
        {headers.map(
          column=>
          <Text key={column.name} style={styles.headerItem}>{column.name}</Text>
        )}
      </View>
      <View>
        <FlatList
          data={rows}
          inverted={false}
          renderItem={({item}) =>
            <View  style={styles.row} key={JSON.stringify(item)}>
              {item.map(cv=>
                <Text key={cv} style={styles.rowItem}>{cv}</Text>
              )}
            </View>
        }
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create(
  {
    header:{
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      backgroundColor: '#eee',
      padding: 4
    },
    headerItem:{
      flex: 1,
      textAlign: 'center'
    },
    row:{
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      padding: 4
    },
    rowItem:{
      height: 20,
      lineHeight: 20,
      flex:1,
      textAlign: 'left',
      fontSize:9.9
    }
  }
)