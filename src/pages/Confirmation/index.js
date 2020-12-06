import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import { GoBack } from '../../components'
import { ButtonAuth, CardInformation, CardPerson } from '../../elements'
import { Gap } from '../../utils'


export default function Confirmation({navigation}) {
    const [data,setData] = useState([])
    useEffect(() => {
        AsyncStorage.getItem('dataTransfer').then(res => {
            setData(JSON.parse(res))
        })
    }, [])
    return (
        <>
        <View style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <Gap height={20}/>
                    <GoBack page="Confirmation" onPress={() => navigation.goBack()} />
                    <Gap height={40}/>
                    <Text style={styles.title}>Transfer to</Text>
                    <Gap height={20}/>
                    <CardPerson phoneNumber={'+'+data.phone} name={data.name} img={data.photo}/>
                    <Gap height={40}/>
                    <Text style={styles.title}>Details</Text>
                    <Gap height={21}/>
                    <CardInformation title="Amount" content={'Rp'+data.amount}/>
                    <Gap height={20}/>
                    <CardInformation title="Balance Left" content={'Rp'+data.available}/>
                    <Gap height={20}/>
                    <CardInformation title="Date & Time" content={data.date}/>
                    <Gap height={20}/>
                    <CardInformation title="Notes" content={data.notes}/>
                    <Gap height={20}/>
                </View>
            </ScrollView>
            <View style={styles.wrapper}>
                <ButtonAuth title="Continue" active onPress={() =>navigation.navigate('PinConfirmation')}/>
                <Gap height={10}/>
            </View>
         
        </View>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'rgb(250,252,255)',
        flex:1
    },
    wrapper:{
        padding:16,
        backgroundColor:'rgb(250,252,255)',
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
         color:'#514F5B'
    },
    cardInformation:{
        padding:15,
        backgroundColor:'#fff',
        borderRadius:10,
        elevation:2
    },
    informationTitle:{
        marginBottom:10,
        fontSize:16,
        color:'#7A7886'
    },
    content:{
        color:'#514F5B',
        fontSize:22,
        fontWeight:'bold'
    }

    
})

