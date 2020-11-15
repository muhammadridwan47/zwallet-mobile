import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { GoBack } from '../../components';
import { ButtonAuth } from '../../elements';
import { Gap, URI } from '../../utils';
import { IcPhone } from '../../assets';
import { useSelector,useDispatch } from 'react-redux';
import Axios from 'axios';
import { GetUsers } from '../../redux/actions/Users';
import { showMessage} from "react-native-flash-message";

export default function AddPhoneNumber({navigation}) {
    const [active,setActive] = useState(false)
    const [phone,setPhone] = useState()
    const Auth = useSelector((s)=> s.Auth)
    const dispacth = useDispatch();
    
    const onHandlePhone = (e) =>
    {
        setPhone(e);
        e.length != 0 ? setActive(true) : setActive(false)
    }       

    const addPhone = () =>
    {
        if (!phone) {
            showMessage({
                message: "Number Phone is Required",
                type: "danger",
            });
            return false;
        }
        let data = {
            phoneNumber : '62'+phone
        }
        const headers = { headers: {'Authorization': `${Auth.data.token.token}`}}   
        Axios.patch(`${URI}/user/patch_user`,data,headers)
        .then(res => {
            dispacth(GetUsers({token:Auth?.data?.token?.token}));
            navigation.navigate('ManagePhoneNumber');
        })
        .catch(err => {
        //   console.log('error dari delete phoneNumber',err)
        });

    }

    return (
    <>
        <View style={styles.container}>
            <Gap height={20}/>
            <GoBack page="Add Phone Number" onPress={() => navigation.navigate('Profile')}/>
            <Gap height={40}/>
            <Text style={styles.title}>Add at least one phone number for the transfer ID so you can start transfering your money to another user.</Text>
            <Gap height={53}/>
            <View>
                 <TextInput keyboardType={'numeric'} placeholder="Enter your phone number" value={phone} onChangeText={e => onHandlePhone(e)} style={{borderBottomWidth:1.5,borderColor:'rgba(169, 169, 169, 0.6)',paddingLeft:80,paddingBottom:11,fontSize:16}}/>
                 <IcPhone style={{position:'absolute',bottom:14}}/>
                 <Text style={{color:'#3A3D42',fontSize:16,position:'absolute',bottom:14,fontWeight:'600',left:36}}>+62</Text>
            </View>
        </View>
        <View style={styles.wrapper}>
            <ButtonAuth title="Submit" active={active} onPress={() => addPhone()}/>
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