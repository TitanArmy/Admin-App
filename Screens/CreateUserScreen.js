import React,{useState, useEffect} from 'react'
import { View, Text ,TextInput,Image,StyleSheet,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import {launchImageLibrary} from 'react-native-image-picker';

import auth, { firebase,database } from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage'
import { requestUserPermission, notificationListner} from '../util/NotificationServices';
import LinearGradient from 'react-native-linear-gradient';

import * as yup from 'yup';
import { Formik } from 'formik';



export default function EmptyScreens ({navigation}) {


  useEffect(() =>{
    requestUserPermission()
    notificationListner()
  }, []);
    
  
  const [downloadurl, setDownloadurl] = useState("https://reactjs.org/logo-og.png")



    //open library and upload pic to firebase
    const pickImageAndUpload = ()=>{
        launchImageLibrary({quality:0.5},(fileobj)=>{
        //    console.log(fileobj.assets[0].uri)
         const uploadTask =  storage().ref().child(`/profilePictures/${Date.now()}`).putFile(fileobj.assets[0].uri)
                uploadTask.on('state_changed', 
                 (snapshot) => {
  
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if(progress==100) alert('image uploaded')
                    
                }, 
                (error) => {
                    alert("error uploading image",error)
                }, 
                //For fetching uploaded photo url
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setDownloadurl(downloadURL)
                    });
                }
                );
        })
    }

    //Form validation YUP Schema
    const loginValidationSchema = yup.object().shape({
      name: yup.string().min(3, 'must be at least 3 characters long'),
      phone: yup.string().required("Phone Number must be required")
      ,email: yup.string().email("Enter a valid E-mail address"),
      password: yup.string().min(8,"Password must be at least 8 characters long")
                .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
      
    }); 

    //Create user in rnFirebase
    const createUser=(values)=>{ 
      
      const newReference = firebase.database().ref('/User/').push();
      
      //Pass all input field as an object to .set() for creating user
      const ids = newReference.key;
      const userData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password, 
        id: ids,
        image: downloadurl,
  video:downloadurl
      }
      //Creating refernce in rnFirebase
      newReference.set(userData)
      .then(() => console.log('Data updated.'))
      .then(()=> navigation.navigate('HomeScreen'))
    }  

    return (
      <Formik
      initialValues={{name:'', email: '',phone:'+91',password:''}}
      validateOnMount={true}
      onSubmit={
        values => {createUser(values)} 
        // console.log(values.email)
      }
      validationSchema={loginValidationSchema}
    >
     {({ handleChange, handleBlur, handleSubmit, values,touched,errors,isValid }) => (
      <ScrollView style={styles.main}>
      <View style={{backgroundColor:'#2e4057'}}>
              <Image
              style={{height:170,width:170,borderWidth:2,borderColor:"dodgerblue",borderRadius:85,marginHorizontal:120,marginVertical:29}}
              source={{uri:downloadurl}}/>

            <View style={styles.box2}>
               
               
                <TouchableOpacity style={styles.tco} onPress={()=>pickImageAndUpload()}>
                    <Image 
                      style={styles.cty}
                      source={require('../assets/Img/plus.png')}/>
                </TouchableOpacity>
               

            </View>
      </View>
          
         <View style={{backgroundColor:'#2e4057'}}>

            <Text style={styles.Texts}>Enter Name :</Text>
            <TextInput
              style={styles.input}
              placeholder="XYZ"
              autoCapitalize='none'
              // value={name}
              // onChangeText={text => setName(text)}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {(errors.name && touched.name) && 
              <Text style={styles.ErrorText}>{errors.name}</Text>
            }


            <Text  style={styles.Texts}>Enter Mobile :</Text>
            <TextInput
              style={styles.input}
              maxLength={13}
              placeholder="1234567890"
              keyboardType="phone-pad"
              // value={phone}
              // onChangeText={number => setPhone(number)}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {(errors.phone && touched.phone) && 
              <Text style={styles.ErrorText}>{errors.phone}</Text>
            }



            <Text  style={styles.Texts}>Enter E-mail :</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              placeholder="xyz@gmail.com"
              keyboardType="email-address"
              // value={email}
              // onChangeText={text => setEmail(text)}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {(errors.email && touched.email) && 
              <Text style={styles.ErrorText}>{errors.email}</Text>
            }


            <Text  style={styles.Texts}>Enter Password :</Text>
            <TextInput
              style={styles.input}
              placeholder="yash*vinove6004"
              keyboardType="default"
              secureTextEntry
              // onChangeText={text => setPassword(text)}
              // value={password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {(errors.password && touched.password) && 
              <Text style={styles.ErrorText}>{errors.password}</Text>
            }

            <TouchableWithoutFeedback  onPress={handleSubmit}>
          
              <View style={styles.button}>
                <Text style={{color:'white'}}>Create User</Text>
              </View>

            </TouchableWithoutFeedback>
         </View>
       
         </ScrollView>
         )}

</Formik>

    
    )
}


const styles = StyleSheet.create({
    text:{
        fontSize:22,
        color:"dodgerblue",
        margin:20,
       
    },
  
    box2:{
        paddingHorizontal:40,
        justifyContent:"space-evenly",
        
        
    },
    input: {
      height: 40,
      width:350,
      margin: 12,
      borderWidth: 1,
      borderRadius:50,padding:11,
      
  
    },
    Texts:{
        marginTop:10,
      marginLeft:20,
      color:'#fff',
      
    },
    button: {
      justifyContent:'center',
      alignItems: "center",
      backgroundColor: 'black',
      padding: 10,
      width:150,
      borderRadius:50,
      marginTop:40,
      marginLeft:115,
  
    },
    ErrorText:{
      marginLeft:20,
      marginTop:-10,
      color:'red'
    },
 
  mod:{
    color:'dodgerblue',
    margin:20,
    flexDirection:'row',
    justifyContent:'space-around'
   

  },
  tco:{
    flex:1,
    color:'dodgerblue'
  },
  cty:{
    position:'absolute',
    justifyContent:'center',
    alignItems: "center",
    padding: 1,
    marginLeft:140,
    // marginTop:30,
    bottom:15,
    left:60,
    height:35,
    width:35,
    backgroundColor:'#fff',
    borderRadius:20,
    borderColor:"dodgerblue",
    borderWidth:2
    
  },
  main:{
    marginBottom:60
  }
 });








