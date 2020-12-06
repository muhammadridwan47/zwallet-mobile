import React, { useState,useEffect } from 'react'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { GoBack } from '../../components';
import CardInformation from '../../elements/CardInformation';
import { Gap } from '../../utils';
import { useSelector } from 'react-redux';

export default function PersonalInformation({navigation}) {
    const User = useSelector((s)=> s.Users)
    const [profileData,setProfileData] = useState([]);

    useEffect(() => {
        User?.data && setProfileData(User?.data)
        return () => {
            User?.data && setProfileData(User?.data)
        }
    }, [User])

    const manage = () => 
    {
        profileData?.phoneNumber == 0 ? navigation.navigate('AddPhoneNumber') : navigation.navigate('ManagePhoneNumber')
        
    }
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <GoBack page="Personal Information" onPress={()=> navigation.goBack()}/>
            <Gap height={40}/>
            <Text style={styles.title}>We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</Text>
            <Gap height={40}/>
            <CardInformation title="First Name" content={profileData?.fullName && profileData?.fullName.split(' ')[0]}/>
            <Gap height={20}/>
            <CardInformation title="Last Name" content={profileData?.fullName && profileData?.fullName.split(' ')[1]}/>
            <Gap height={20}/>
            <CardInformation title="Verified E-mail" content={profileData?.email}/>
            <Gap height={20}/>
            <CardInformation title="Phone Number" content={profileData?.phoneNumber && '+'+profileData?.phoneNumber} manage={() => manage()}/>
            <Gap height={40}/>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    title:{
        lineHeight:27,
        fontSize:16,
        color:'#7A7886'
    }

  });