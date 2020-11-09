import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import React,{ useState } from 'react';
import {Text, View,ScrollView,StyleSheet} from 'react-native';
import { ButtonAuth, FormGroup} from '../../elements';
import { Gap, URI } from '../../utils';

const ResetPassword = () => {
  const [newPassword,setNewPassword] = useState()
  const [confirmPassword,setConfirmPassword] = useState()

  const handleResetPassword = () =>
  {
    if (!newPassword) {
      alert('Field new password is required!')
      return false
    }
    if (!confirmPassword) {
      alert('Field confirm password is required!')
      return false
    }
    if (newPassword !== confirmPassword ) {
        alert('The password must be same!')
    }else{
      if (newPassword.length > 7 ) {

        AsyncStorage.getItem('resetPassword').then(res =>{
          let data = {
            email: res,
            password: confirmPassword,
          }
          Axios.patch(`${URI}/auth/reset_password`,data)
          .then(res => {
            setConfirmPassword('')
            setNewPassword('')
            alert('Reset password successfully')
          }).catch(err => {
            console.error(err)
          });
        })

      }else{
        alert('password min length 8')
      }
      
    }
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
            <FormGroup icon="password" placeholder="Create new password" secureTextEntry value={newPassword} onChangeText={e => setNewPassword(e)}/>
            <Gap height={63}/>
            <FormGroup icon="password" placeholder="Confirm new password" secureTextEntry value={confirmPassword} onChangeText={e => setConfirmPassword(e)}/>
         <Gap height={165}/>
        </View>
        
      </ScrollView>
      <View style={{paddingHorizontal:16}}>
        <ButtonAuth title="Reset Password" active onPress={() => handleResetPassword()}/>
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
        paddingHorizontal:16
    }



})


