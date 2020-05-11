import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

export default function Table({headers, rows}){

  return (
    <View>
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
          renderItem={({item}, i) =>
            <View  style={styles.row} key={i}>
              {item.map((cv, idx)=>
                <Text key={cv} style={[styles.rowItem, idx===0&&styles.serialNumber]}>{cv}</Text>
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
    },
    serialNumber: {
      fontWeight: '500',
      color: 'green',
      textAlign: 'center'
    }
  }
)