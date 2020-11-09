import React from 'react'
import { View, Text } from 'react-native'
import { Gap } from '../../utils'

export default function CardTopUp({order,content}) {
    return (
        <View style={{flexDirection:'row',backgroundColor:'#fff',borderRadius:10,elevation:2,alignItems:'center',paddingHorizontal:20,paddingVertical:20,height:88}}>
            <Text style={{color:'#6379F4',fontSize:18,fontWeight:'bold'}}>{order}</Text>
            <Gap width={25}/>
            <Text style={{fontSize:16,color:'#7A7886',lineHeight:27,flexWrap:'wrap'}}>{content}</Text>
        </View>
    )
}
