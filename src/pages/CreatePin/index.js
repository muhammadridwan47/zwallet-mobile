import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {Text, View,ScrollView,StyleSheet} from 'react-native'
import { showMessage } from 'react-native-flash-message';
import { ButtonAuth, FormPin} from '../../elements';
import API from '../../service';
import { Gap } from '../../utils';

const CreatePin = ({navigation}) => {
    const [pin1,setPin1] = useState('')
    const [pin2,setPin2] = useState('')
    const [pin3,setPin3] = useState('')
    const [pin4,setPin4] = useState('')
    const [pin5,setPin5] = useState('')
    const [pin6,setPin6] = useState('')
    const [active,setActive] = useState(false)
    const onHandlePin = (e) =>
    {
        setPin6(e)
        e.length == 0 ? setActive(false) : setActive(true)
    }
    const handlePin = () =>
    {
        if (!pin1||!pin2||!pin3||!pin4||!pin5||!pin6) {
            showMessage({
                message: "Pin is required",
                type: "danger",
              });
            return false   
        }else{
            AsyncStorage.getItem('emailRegister').then(res =>{
                const pin = pin1+pin2+pin3+pin4+pin5+pin6;
                setPin1('')
                setPin2('')
                setPin3('')
                setPin4('')
                setPin5('')
                setPin6('')
                let data = {
                    email:res,
                    pin: pin,
                }
                    API.createPin(data)
                    .then(res => {
                        navigation.navigate('PinSuccess')
                    }).catch(err => {
                    //   console.log(err)
                    });
            })

               
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
            <Text style={styles.heading}>Create Security PIN</Text>
            <Gap height={20}/>
            <Text style={styles.title}>Create a PIN that’s contain 6 digits number for{'\n'}security purpose in Zwallet.</Text>
            <Gap height={50}/>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <FormPin onChangeText={(e) => setPin1(e)} value={pin1}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin2(e)} value={pin2}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin3(e)} value={pin3}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin4(e)} value={pin4}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => setPin5(e)} value={pin5}/>
                <Gap width={10}/>
                <FormPin onChangeText={(e) => onHandlePin(e)} value={pin6}/>
            </View>
        </View>
      </ScrollView>
      <View style={styles.button}>
         <Gap height={50}/>
         <ButtonAuth title="Confirm" active={active} onPress={() => handlePin()}/>
         <Gap height={14}/>
      </View>


    </>
  );
};
 

export default CreatePin;


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


