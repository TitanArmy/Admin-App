import React, {useEffect, useState} from 'react';
import {View, LogBox,StyleSheet, Text, Image,Button,style,TouchableOpacity,TextInput,ImageBackground} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import database, {firebase} from '@react-native-firebase/database';
import { back } from 'react-native/Libraries/Animated/Easing';
import {Picker} from '@react-native-picker/picker';
import ActionButton from "react-native-action-button";
import { color } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
export default function App({navigation,props}) {
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    readUserData()
    return () => {
      
    }
  }, [])
  

  const [itemArray, setItemArray] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState();

  //LogOut from ReactNativeFirebase phone Authentication
  const LogOut = () =>{    
      firebase.auth().signOut()
      console.log('User signed out!');
      navigation.replace('LoginScreen');
  }

  //ReadUser data from rnFirebase realtime DB
  const readUserData = async () => {
   database().ref('/User/')
   .on('value', snapshot => {
    setItemArray(Object.values(snapshot.val()))
    setFilteredData(Object.values(snapshot.val()))
    // console.log(setItemArray)
  });
  };

  const EditUser = (item) => {
    // alert("error")
    navigation.navigate('EditUserScreen',
      {
        name: item.name,
        email: item.email,
        phone:item.phone,
        password:item.password,
        id: item.id, 
        image:item.image
      }
    )
  }

  //filter data for serach input
  const SearchBtn = 
    // alert(search)
    filteredData.filter((val) =>{
      if (search == ''){
        return(val)
       }else if (
         val.name.toLowerCase().includes(search.toLowerCase()) || 
         val.email.toLowerCase().includes(search.toLowerCase()) || 
         val.phone.toString().toLowerCase().includes(search.toString().toLowerCase()) 
       ){
          return(val) 
       }
    })                  

    // For A-Z sorting 
    const A_Z = () => {
      let newList = [...itemArray];
      newList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0));
      setFilteredData(newList);
    };

     // For A-Z sorting 
     const Z_A = () => {
      let newList = [...itemArray];
      newList.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? 1 : b.name.toLowerCase() < a.name.toLowerCase() ? -1 : 0));
      setFilteredData(newList);
    };

     // For A-Z sorting 
     const emailSort = () => {
      let newList = [...itemArray];
      newList.sort((a, b) => (a.email.toLowerCase() > b.email.toLowerCase() ? 1 : b.email.toLowerCase() > a.email.toLowerCase() ? -1 : 0));
      setFilteredData(newList);
    };
    

  
  
  return (
  
      
    <LinearGradient colors={['#dbcbd8','#2e4057']} style={{marginBottom:130,paddingBottom:5}} >
    
    
    <View style={{flexDirection:'row'}}>
      
        <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  placeholder="Search here"
                  keyboardType="email-address"
                  onChangeText={(text)=>{setSearch(text)}}
                  value={search}
                  // onBlur={handleBlur('email')}
        />  
        <View style={{marginTop:10,marginRight:50,borderRadius:10,height:50,borderWidth:1,width:110,justifyContent:'center',alignContent:'center'}}>
       
       <Picker
          style={{width:120, marginTop:10, marginBottom: 10,borderRadius:10}}
          // mode="dropdown"
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) =>{ 
            setSelectedLanguage(itemValue)
            if(itemValue == "A-Z"){
              A_Z()
            }else if(itemValue == "Z-A"){
              Z_A()
            }else if(itemValue == "email"){
              emailSort()
            }
            }            
          }>         
      
          <Picker.Item label="Filter" enabled={false}  value="sortBy" />
          <Picker.Item label="A-Z" value="A-Z" />
          <Picker.Item label="Z-A"  value="Z-A" />
          <Picker.Item label="email" onPress={emailSort} value="email" /> 
        </Picker>
 </View>
 
    </View>
 {/* <Button title='wq '
 onPress={emailSort}/>        */}
        
        <FlatList
            data={SearchBtn}
            renderItem={({item})=>

            <View style={styles.Card}>
                <Image
                    style={styles.CardImg}
                    source={{uri:item.image}}/>
                <View style={styles.CardItem}>
                    <Text style={{color:'#000',fontSize:15,}}> Name :   {item.name}</Text>
                    <Text style={{color:'#000',fontSize:15,}}> E-mail :  {item.email}</Text>
                    <Text style={{color:'#000',fontSize:15,}}> Phone-Number :  {item.phone}</Text>
                    <TouchableOpacity 
                      onPress={()=>EditUser(item)} 
                      style={{backgroundColor:'#2e4057',width:70,marginTop:10,borderRadius:5}}>
                      <Text style={{padding:7}}>Edit user</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            }
            
          />
       

              
       <ActionButton buttonColor="#dbcbd8" size={50} spacing={6} bgColor='white' offsetY={20}>
            <ActionButton.Item buttonColor='#fff' title="ReadUser"  onPress={readUserData}>
              
            <Image source={require('../assets/Img/read.png')} style={{height:5,width:4,padding:11}}/>
          </ActionButton.Item>
            <ActionButton.Item buttonColor='#fff' title="Create" onPress={() => navigation.navigate('CreateUserScreen')}>
            <Image source={require('../assets/Img/create.png')} style={{height:5,width:4,padding:11}}/>
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#fff' title="LogOut" onPress={LogOut}>
            <Image source={require('../assets/Img/Logoutt.png')} style={{height:5,width:4,padding:10}}/>
            </ActionButton.Item>
            
          </ActionButton>
    </LinearGradient>
    

  );

}

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'green',
    marginBottom: 20,
    paddingLeft: 15,
  },
  input: {
    height: 50,
    width:250,
    margin: 10,
    borderWidth: 1,
    borderRadius:5,
    padding:11

  },
  tapLogin:{
    backgroundColor: 'dodgerblue',
    width:100,
    margin:100,
    color:'#fff',
    lineHeight:40,
    fontSize:20,
    textAlign:'center'
  },
  lgt:{
    backgroundColor:'dodgerblue',
    justifyContent:'center',
    alignItems: 'center',
    width:100,
    height:40,
    borderRadius:25,
    // bottom:0,
    // left:5,
    fontSize:5,
    
  },
  Card:{
    color:'black',
    marginTop:10,
    marginStart:15,
    marginEnd:15,
    padding:5,
    borderWidth:2,
    borderColor:'#000',
    flexDirection:"row",
    alignItems:'center',
    borderRadius:10,
    shadowColor:'green',
    shadowOpacity:1,
    shadowRadius:20,
    shadowOffset:{
      width:100,
      height:100
    },
    // flexWrap: 'wrap',
    flex:1
    // backgroundColor:'#000'
  },
  CardImg:{
    height:100,
    width:100,
    borderWidth:2,
    borderColor:"#000",
    borderRadius:75
  },
  CardItem:{
    padding:5,
    color:"black"
  }
});

