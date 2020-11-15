import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { GoBack } from '../../components';
import {CardInformation } from '../../elements';
import { Gap, URI } from '../../utils';
import { useSelector,useDispatch } from 'react-redux';
import Axios from 'axios';
import { GetUsers } from '../../redux/actions/Users';


export default function ManagePhoneNumber({navigation}) {
    const User = useSelector((s)=> s.Users)
    const Auth = useSelector((s)=> s.Auth)
    const dispacth = useDispatch();
    const [profileData,setProfileData] = useState([]);

    useEffect(() => {
        User?.data?.data[0] && setProfileData(User?.data?.data[0])
        return () => {
            User?.data?.data[0] && setProfileData(User?.data?.data[0])

        }
    }, [User,profileData])
    const phone = () => 
    {
        let data = {
            phoneNumber : 0
        }
        const headers = { headers: {'Authorization': `${Auth.data.token.token}`}}   
        Axios.patch(`${URI}/user/patch_user`,data,headers)
        .then(res => {
             dispacth(GetUsers({token:Auth?.data?.token?.token}))
             navigation.navigate('AddPhoneNumber')
        })
        .catch(err => {
        //   console.log('error dari delete phoneNumber',err)
        });
    }
    
    return (
        
    <>
        <View style={styles.container}>
            <Gap height={20}/>
            <GoBack page="Manage Phone Number" onPress={() => navigation.navigate('Profile')}/> 
            <Gap height={40}/>
            <Text style={styles.title}>You can only delete the phone number and then you must add another phone number.</Text>
            <Gap height={53}/>
            <CardInformation title="Primary" content={profileData?.phoneNumber && '+'+profileData?.phoneNumber} phone={() => phone()}/>
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
        color:'#7A7886',
        textAlign:'center'

    }
});