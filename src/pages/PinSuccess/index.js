import React from 'react';
import {Text, View,ScrollView,StyleSheet} from 'react-native'
import { IcSuccess } from '../../assets/Icons';
import { ButtonAuth} from '../../elements';
import { Gap } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PinSuccess = ({navigation}) => {

  const back = () =>
  {
    AsyncStorage.clear()
    navigation.replace('Login')
  }

  return (
    <>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Gap height={76}/>
        <Text style={styles.zwallet}>Zwallet</Text>
        <Gap height={133}/>
        <View style={styles.container}>
            <Gap height={40}/>
            <IcSuccess/>
            <Gap height={30}/>
            <Text style={styles.heading}>PIN Successfully Created</Text>
            <Gap height={20}/>
            <Text style={styles.title}>Your PIN was successfully created and you can {'\n'} now access all the features in Zwallet. Login to {'\n'} your new account and start exploring!</Text>
            <Gap height={50}/>
        </View>
      </ScrollView>
      <View style={styles.button}>
         <Gap height={30}/>
         <ButtonAuth title="Login Now" active onPress={() => back()}/>
         <Gap height={14}/>
      </View>


    </>
  );
};
 

export default PinSuccess;


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
        alignItems:'center'
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


