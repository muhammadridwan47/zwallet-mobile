import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {Text, View,ScrollView,StyleSheet} from 'react-native'
import { useDispatch,useSelector } from 'react-redux';
import { LinkAuth } from '../../components';
import { ButtonAuth, FormGroup } from '../../elements';
import { SignUpAction } from '../../redux/actions/Auth';
import { Gap} from '../../utils';
import { showMessage} from "react-native-flash-message";

const SignUp = ({navigation}) => {
  const [userName,setUserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [active,setActive] = useState(false)
  const [showKey,setShowKey] = useState(true)
  const {status} = useSelector(state => state.SignUp)

  const dispacth = useDispatch();

  const onHandle = (e) =>
  {
      setPassword(e)
      e.length != 0 ? setActive(true) : setActive(false)
  }

  const onRegister = () => {
    if (!userName) {
      showMessage({
        message: "Username is required",
        type: "danger",
      });
      return false
    }

    if (!email) {
      showMessage({
        message: "Email is required",
        type: "danger",
      });
      return false
    }

    if (!password) {
      showMessage({
        message: "Password is required",
        type: "danger",
      });
      return false
    }
    
    if (password.length <= 7 ) {
      showMessage({
          message: "password min length 8",
          type: "danger",
        });
      return false
    }

    let data = {
      email: email,
      password: password,
      fullName: userName,
    }

    dispacth(SignUpAction(data))

    AsyncStorage.setItem('emailRegister',email)
    setPassword('')
    setEmail('')
    setUserName('')
    status && navigation.navigate('CreatePin')
  }
  const showPassword = (value) => 
  {
      const key = value === false ? true : false
      setShowKey(key)
  }
  return (
    <>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Gap height={76}/>
        <Text style={styles.zwallet}>Zwallet</Text>
        <Gap height={61}/>
        <View style={styles.container}>
            <Gap height={40}/>
            <Text style={styles.heading}>Sign Up</Text>
            <Gap height={20}/>
            <Text style={styles.title}>Create your account to access Zwallet.</Text>
            <Gap height={53}/>
            <FormGroup icon="username" placeholder="Enter your username" value={userName} onChangeText={(e) => setUserName(e)} />
            <Gap height={60}/>
            <FormGroup icon="mail" placeholder="Enter your e-mail"  value={email} onChangeText={(e) => setEmail(e)}/>
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="Create your password" value={password} onChangeText={(e) => onHandle(e)} secureTextEntry  secureTextEntry={showKey}  showPassword={() => showPassword(showKey)}/>
            <Gap height={15}/>
            <Gap height={75}/>
            <ButtonAuth title="Sign Up" onPress={() => onRegister()} active={active}/>
            <Gap height={25}/>
            <LinkAuth title="Already have an account? Let’s " active="Login" onPress={() => navigation.navigate('Login')}/>
            <Gap height={25}/>
        </View>
      </ScrollView>

    </>
  );
};

export default SignUp;


const styles = StyleSheet.create({
    scroll:{
        flex:1,
        backgroundColor:'rgb(250,252,255)'
    },
    zwallet:{
        textAlign:'center',
        fontSize:26,
        color:'#6379F4',
        fontWeight:'bold'
    },
    container:{
        backgroundColor:'#fff',
        flex:1,
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        shadowOpacity:0.75,
        elevation:75,
        paddingHorizontal:16
    },
    heading:{
        fontSize:24,
        color: '#3A3D42',
        fontWeight:'bold',
        textAlign:'center'
    },
    title:{
        textAlign:'center',
        color:'rgba(58, 61, 66, 0.6)',
        fontSize:16,
        lineHeight:23
    }



})


