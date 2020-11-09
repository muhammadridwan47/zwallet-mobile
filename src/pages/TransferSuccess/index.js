import React from 'react'
import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import { IcSuccess } from '../../assets'
import { ButtonAuth, CardInformation, CardPerson } from '../../elements'
import { Gap } from '../../utils'


export default function TransferSuccess() {
    return (
        <>
        <View style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <Gap height={40}/>
                    <View style={{alignItems:'center'}}>
                        <IcSuccess/>
                        <Gap height={30}/>
                        <Text style={styles.informationTitle}>Transfer Success</Text>
                    </View>
                    <Gap height={40}/>
                    <Text style={styles.title}>Details</Text>
                    <Gap height={21}/>
                    <CardInformation title="Amount" content="Rp100.000"/>
                    <Gap height={20}/>
                    <CardInformation title="Balance Left" content="Rp20.000"/>
                    <Gap height={20}/>
                    <CardInformation title="Date & Time" content="May 11, 2020 - 12.20"/>
                    <Gap height={20}/>
                    <CardInformation title="Notes" content="For buying some socks"/>
                    <Gap height={40}/>
                    <Text style={styles.title}>Transfer to</Text>
                    <Gap height={20}/>
                    <CardPerson phoneNumber="79798"/>
                    <Gap height={10}/>
                </View>
            </ScrollView>
            <View style={styles.wrapper}>
                <ButtonAuth title="Back to Home" active/>
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
    informationTitle:{
        color:'#4D4B57',
        fontSize:22,
        fontWeight:'bold'
    }

    
})

