import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function App() {
  const [uploading, setUploading] = useState(false);
  const [uploadTask, setUploadTask] = useState();
  const [uploadTaskSnapshot, setUploadTaskSnapshot] = useState({});
  const [downloadURL, setDownloadURL] = useState();
  const [paused, setPaused] = useState(false);

  const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onMediaSelect);

  const onTakeVideo = () => launchCamera({ mediaType: 'video' }, onMediaSelect);

  const onSelectImagePress = () =>
    launchImageLibrary({ mediaType: 'image' }, onMediaSelect);

  const onSelectVideoPress = () =>
    launchImageLibrary({ mediaType: 'video' }, onMediaSelect);

  const togglePause = () => {
    if (paused) uploadTask.resume();
    else uploadTask.pause();
    setPaused((paused) => !paused);
  };

  const onMediaSelect = async (fileobj) => {
    // console.log(fileobj.assets[0].uri)
    const uploadTask =  storage().ref().child(`/profilePictures/${Date.now()}`).putFile(fileobj.assets[0].uri)
    console.log(fileobj.assets[0].uri)
    uploadTask.on('state_changed', 
     (snapshot) => {
        // console.log(snapshot)
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if(progress==100) alert('video uploaded')
        
    }, 
    (error) => {
        alert("error uploading image",error)
    }, 
    //For fetching uploaded photo url
    () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setDownloadURL(downloadURL)
        });
    }
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Firebase Storage</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onTakeVideo}>
          <Text style={styles.buttonText}>Record Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectVideoPress}>
          <Text style={styles.buttonText}>Pick a Video</Text>
        </TouchableOpacity>
      </View>
      {uploading && (
        <View style={styles.uploading}>
          {!paused && (
            <ActivityIndicator size={60} color="#47477b"></ActivityIndicator>
          )}
          <Text style={styles.statusText}>
            {!paused ? 'Uploading' : 'Paused'}
          </Text>
          <Text style={styles.statusText}>
            {`${(
              (uploadTaskSnapshot.bytesTransferred /
                uploadTaskSnapshot.totalBytes) *
              100
            ).toFixed(2)}% / 100%`}
          </Text>
          <TouchableOpacity style={styles.button} onPress={togglePause}>
            <Text style={styles.buttonText}>{paused ? 'Resume' : 'Pause'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#FFBD03',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  mediaButton: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 50,
    width: 300,
  },
  uploading: {
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    marginTop: 20,
    fontSize: 20,
  },
});