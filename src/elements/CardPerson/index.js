import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProfileCard } from '../../assets'
import { Gap } from '../../utils'
import { URIIMAGE } from '../../utils/URI'

export default function CardPerson({phoneNumber,transfer,name,amount,onPress,img,idReceiver,idProfile,admin}) {
    
    
         const Card = () => {
             if (onPress) {
                    return (
                        <TouchableOpacity activeOpacity={0.8} style={styles.cardPerson} onPress={() => onPress()} >
                    
                        <View style={styles.cardPersonWrapper}>
                            <View style={styles.imageCard}>
                                {
                                img == '-' ? <Image source={{uri:'https://www.abc.net.au/cm/rimage/12049340-16x9-xlarge.png?v=2'}} style={styles.image} /> : <Image source={{uri:URIIMAGE+img}} style={styles.image} />
                                }
                                <Gap width={15}/>
                                <View>
                                    <Text style={styles.cardName}>{name}</Text>
                                    <Text style={styles.cardTitle}>{phoneNumber && phoneNumber}{transfer && transfer}</Text>
                                </View>
                            </View>
                            {
                                admin ? (
                                    <Text style={styles.cardMoneyAdmin}>Rp{amount}</Text>
                                )
                                :
                                (
                                    !phoneNumber ? idProfile !== idReceiver ? <Text style={styles.cardMoneyMin}>-Rp{amount}</Text> : <Text style={styles.cardMoneyPlus}>+Rp{amount}</Text> :<Text></Text>
            
                                )
                            }
                            
                            </View>    
                      </TouchableOpacity>
                    )
              }else{
                return (
                    <View  style={styles.cardPerson} >
                
                    <View style={styles.cardPersonWrapper}>
                        <View style={styles.imageCard}>
                            {
                            img == '-' ? <Image source={{uri:'https://www.abc.net.au/cm/rimage/12049340-16x9-xlarge.png?v=2'}} style={styles.image} /> : <Image source={{uri:URIIMAGE+img}} style={styles.image} />
                            }
                            <Gap width={15}/>
                            <View>
                                <Text style={styles.cardName}>{name}</Text>
                                <Text style={styles.cardTitle}>{phoneNumber && phoneNumber}{transfer && transfer}</Text>
                            </View>
                        </View>
                        {
                            admin ? (
                                <Text style={styles.cardMoneyAdmin}>Rp{amount}</Text>
                            )
                            :
                            (
                                !phoneNumber ? idProfile !== idReceiver ? <Text style={styles.cardMoneyMin}>-Rp{amount}</Text> : <Text style={styles.cardMoneyPlus}>+Rp{amount}</Text> :<Text></Text>
        
                            )
                        }
                        
                        </View>    
                  </View>
                )
              }

        }

    return (
        <Card />
    )
}

const styles = StyleSheet.create({
    cardPerson:{
        flexDirection:'row',
        paddingHorizontal:16,
        paddingVertical:20,
        backgroundColor:'#fff',
        elevation:3,
        borderRadius:10
    },
    cardPersonWrapper:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%'
    },
    imageCard:{
        flexDirection:'row',
        alignItems:'center'
    },
    cardName:{
        fontSize:16,
        fontWeight:'bold',
        color:'#4D4B57',
        marginBottom:9
    },
    cardTitle:{
        color:'#7A7886',
        fontSize:14
    },
    cardMoneyMin:{
        color:'#FF5B37',
        fontSize:18,
        fontWeight:'bold'
    },
    cardMoneyPlus:{
        color:'#1EC15F',
        fontSize:18,
        fontWeight:'bold'
    },
    cardMoneyAdmin:{
        color:'#6379F4',
        fontSize:18,
        fontWeight:'bold'
    },
    image:{
        width:56,
        height:56,
        borderRadius:10
    }

})