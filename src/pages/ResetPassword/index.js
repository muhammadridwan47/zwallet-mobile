import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useState } from 'react';
import {Text, View,ScrollView,StyleSheet} from 'react-native';
import { ButtonAuth, FormGroup} from '../../elements';
import { Gap } from '../../utils';

const ResetPassword = ({navigation}) => {
    const [email,setEmail] = useState('') 
    const forgot = () => {
      if (!email) {
        alert("Email is required!")
        return false
      }
      AsyncStorage.setItem('resetPassword',email)
      setEmail('')
      navigation.navigate('ResetNewPassword')
    }
  return (
    <>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Gap height={76}/>
        <Text style={styles.zwallet}>Zwallet</Text>
        <Gap height={61}/>
        <View style={styles.container}>
            <Gap height={40}/>
            <Text style={styles.heading}>Reset Password</Text>
            <Gap height={20}/>
            <Text style={styles.title}>Enter your Zwallet e-mail so we can send {'\n'}  you a password reset link.</Text>
            <Gap height={53}/>
            <FormGroup icon="mail" placeholder="Enter your email" value={email} onChangeText={e => setEmail(e)}/>
        </View>
      </ScrollView>
      <View style={styles.button}>
         <Gap height={30}/>
         <ButtonAuth title="Confirm" active onPress={() => forgot()}/>
         <Gap height={14}/>
      </View>


    </>
  );
};
 

export default ResetPassword;


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
        paddingHorizontal:16,
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
    },
    button:{
        paddingHorizontal:16,
        backgroundColor:'#fff'
    }



})


