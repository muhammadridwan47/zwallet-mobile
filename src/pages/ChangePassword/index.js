import Axios from 'axios';
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { GoBack } from '../../components';
import { ButtonAuth, FormGroup } from '../../elements';
import { Gap, URI } from '../../utils';
import { showMessage} from "react-native-flash-message";
export default function ChangePassword({navigation}) {
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [repeatNewPassword,SetRepeatNewPassword] = useState('')
    const [active,SetActive] = useState(false)
    const Auth = useSelector((s)=> s.Auth)
    const [showKey1,setShowKey1] = useState(true)
    const [showKey2,setShowKey2] = useState(true)
    const [showKey3,setShowKey3] = useState(true)

    const showPassword1 = (value) => 
    {
        const key = value === false ? true : false
        setShowKey1(key)
    }
    const showPassword2 = (value) => 
    {
        const key = value === false ? true : false
        setShowKey2(key)
    }
    const showPassword3 = (value) => 
    {
        const key = value === false ? true : false
        setShowKey3(key)
    }
    
    const repeatPass = (e) => 
    {
        
        e ? SetActive(true) : SetActive(false)
        SetRepeatNewPassword(e)
    }
    const handleChangePassword = () =>
    {
        if (!currentPassword) {
            showMessage({
                message: "Current password is Required",
                type: "danger",
            });
            return false
        }
        if (!newPassword) {
            showMessage({
                message: "New password is Required",
                type: "danger",
            });
            return false
        }
        if (!repeatNewPassword) {
            showMessage({
                message: "repeart password is Required",
                type: "danger",
            });
            return false
        }
        if (repeatNewPassword === newPassword ) {
            
            if (newPassword.length <= 7 ) {
                showMessage({
                    message: "password min length 8",
                    type: "danger",
                  });
                return false
            }

            let data = {
                password : currentPassword,
                newPassword : newPassword
            }
            const headers = { headers: {'Authorization': `${Auth.data.token.token}`}}    
            Axios.patch(`${URI}/user/change_password`,data,headers)
            .then(res => {
            //   console.log(res.data)
                    setCurrentPassword('')
                    setNewPassword('')
                    SetRepeatNewPassword('')
                    showMessage({
                        message: "The Password have been changed!",
                        type: "success",
                    });
            })
            .catch(err => {
              showMessage({
                message: "Wrong Current password!",
                type: "danger",
            });
            // console.log(err)
            });
        }else{
            showMessage({
                message: "repeart password and New passsword must be same!",
                type: "danger",
            });
            return false
        }
    }
    return (
    <>
        <ScrollView style={styles.container}>
            <Gap height={40}/>
            <GoBack page="Change Password" onPress={()=> navigation.goBack()} />
            <Gap height={40}/>
            <Text style={styles.title}>
                 You must enter your current password and then type your new password twice.
            </Text>
            <Gap height={53}/>
            <FormGroup icon="password" placeholder="Current Password" value={currentPassword} onChangeText={(e) => setCurrentPassword(e)} secureTextEntry={showKey1}  showPassword={() => showPassword1(showKey1)}/>
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="New Password" value={newPassword} onChangeText={(e) => setNewPassword(e)} secureTextEntry={showKey2}  showPassword={() => showPassword2(showKey2)}/>
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="Repeat Password" value={repeatNewPassword} onChangeText={(e) => repeatPass(e)} secureTextEntry={showKey3}  showPassword={() => showPassword3(showKey3)}/>
        </ScrollView>
        <View style={styles.wrapper}>
             <Gap height={40}/>
                 <ButtonAuth title="Change Password" active={active} onPress={() => handleChangePassword()}/>
            <Gap height={20}/>
        </View>
        
    </> 
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    wrapper: {
      paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    title:{
        lineHeight:27,
        fontSize:16,
        color:'#7A7886'
    }
});