import React, {useState, useRef} from 'react';
import {StyleSheet, View, Platform, Text, FlatList} from 'react-native';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-video';

const VideoPlayer = () => {
  const DATA = [
    {
      id: 1,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name: 'user1 ',
      video: './PocVideo.mp4',
    },
    {
      id: 2,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name: 'user2 ',
      video: './PocVideo.mp4',
    },
    {
      id: 3,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name: 'user3 ',
      video: './PocVideo.mp4',
    },
    {
      id: 4,
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      name: 'user4 ',
    },
    //   {
    //     id: 5,
    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //   },
    //   {
    //     id: 6,
    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     name: 'user6 ',
    //   },
    //   {
    //     id: 7,
    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     name: 'user7',
    //   },
    //   {
    //     id: 8,
    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     name: 'user8 ',
    //   },
    //   {
    //     id: 9,
    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     name: 'user9',
    //   },
    //   {
    //     id: 10,
    //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //     name: 'user10',
    //   },
  ];
  
  // The video we will play on the player.
  // const video = require('./PocVideo.mp4');

  return (
    <>
    
      <FlatList
        data={DATA}
        renderItem={({item}) => {
          return (
            <>
              <View style={styles.videoCard}>
                <View>
                  <Video
                    paused={false}
                    source={{uri: item.url}}
                    style={styles.backgroundVideo}
                   
                  />
                </View>
                <View style={styles.videoDes}>
                  <Text style={styles.videoDesText}>User Name: {item.name}</Text>
                  <Text>User email : {item.id}</Text>
                  <Text>User Phone :{item.url}</Text>
                </View>
              </View>
            </>
          );
        }}
      />
      
    </>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    width: '100%',
    borderWidth: 5,
    overflow: 'hidden',
  },
  videoCard: {
    // backgroundColor: 'red',
    borderWidth: 4,
    marginBottom: 5,
    borderColor: 'black',
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  mediaControls: {
    height: '100%',
    flex: 1,
    alignSelf: 'center',
  },
  videoDes:{
      padding: 5
    },
    videoDesText:{
        color: 'black'
    },
});

export default VideoPlayer;