import Axios from 'axios';
import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { GoBack } from '../../components';
import { ButtonAuth, FormGroup } from '../../elements';
import { Gap, URI } from '../../utils';

export default function ChangePassword({navigation}) {
    const [currentPassword,setCurrentPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [repeatNewPassword,SetRepeatNewPassword] = useState('')
    const Auth = useSelector((s)=> s.Auth)

    const handleChangePassword = () =>
    {
        if (!currentPassword) {
            alert('Current password is Required')
            return false
        }
        if (!newPassword) {
            alert('New password is Required')
            return false
        }
        if (!repeatNewPassword) {
            alert('repeart password is Required')
            return false
        }
        if (repeatNewPassword === newPassword ) {
        
            let data = {
                password : currentPassword,
                newPassword : newPassword
            }
            const headers = { headers: {'Authorization': `${Auth.data.token.token}`}}    
            Axios.patch(`${URI}/user/change_password`,data,headers)
            .then(res => {
              console.log(res.data)
                    setCurrentPassword('')
                    setNewPassword('')
                    SetRepeatNewPassword('')
            })
            .catch(err => {
              console.log(err)
            });
        }else{
            alert('repeart password and New passsword must be same!')
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
            <FormGroup icon="password" placeholder="Current Password" value={currentPassword} onChangeText={(e) => setCurrentPassword(e)}/>
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="New Password" value={newPassword} onChangeText={(e) => setNewPassword(e)}/>
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="Repeat Password" value={repeatNewPassword} onChangeText={(e) => SetRepeatNewPassword(e)}/>
        </ScrollView>
        <View style={styles.wrapper}>
             <Gap height={40}/>
                 <ButtonAuth title="Change Password" onPress={() => handleChangePassword()}/>
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