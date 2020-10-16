/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,  { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';


import { writeFile, readFile } from 'react-native-fs';
import XLSX from 'xlsx';
import Share from 'react-native-share';


const App = () => {

  // we need to allow permssion (storage) first !!!!! add permission on requestpermission at service

  const create = () => { 

    // second trigger doesnt work

    var data = [
      {"no":"12", "status": "done"},
      {"no":"23", "status": "pending"},
      {"no":"34", "status": "done"}
      ];
    
    // refer docs XLSX for this lol

    var ws = XLSX.utils.json_to_sheet(data);
    
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Prova");
  
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

    // old import
    var RNFS = require('react-native-fs');

    var file = RNFS.DownloadDirectoryPath + '/test.xlsx'; // mime @ base64

    writeFile(file, wbout, 'ascii')
    .then((response)=>{
      alert('File Creation : ' + file)
      // setExcelPath(file)

      // do not set state and listen using hooks
      // maybe because of both share = async (file) and useeffect concept
      share(file)
    }).
    catch((e)=>{
      alert(JSON.stringify(e))
    });
  }

  const share = async (filePath) => {
    // share multiple times will fail (do not use hooks)
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      saveToFiles: true,
      url: 'file://' + filePath, // check on IOS !!!! inspired by : https://github.com/react-native-share/react-native-share/issues/440
    };

    try {
      const ShareResponse = await Share.open(shareOptions);  
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  return (
    <View style={{ flex:1, justifyContent: 'center' }}>
      <TouchableOpacity style={{ padding: 20, margin: 10, backgroundColor: 'red', borderRadius: 5 }}
        onPress={() => create()}>
        <Text style={{ color: 'white' }}> Create EXCEL and SHARE </Text>
      </TouchableOpacity>   
    </View>
  );
};

export default App;
