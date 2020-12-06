import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image,TouchableOpacity } from 'react-native'
import { GoBack } from '../../components'
import { IcSearch} from '../../assets'
import { Gap, URI } from '../../utils'
import { CardPerson, CardQuickAccess } from '../../elements'
import { useSelector,useDispatch } from 'react-redux'
import { GetTransferById } from '../../redux/actions/Transfer'
import API from '../../service'

export default function FindReceiver({navigation}) {
    const [quickAccess,setQuickAccess] = useState([])
    const [profiles,setProfiles] = useState([])
    const [limit,setLimit] = useState(6)
    const [max,setMax] = useState(0)
    const dataQuickAccess = useSelector((s)=> s.Transfer)
    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    },[])
    const getData = () =>
    {
        dataQuickAccess?.data && setQuickAccess(dataQuickAccess?.data)
        API.GetDataTransfer(limit)
        .then(res => {
            setProfiles(res);
        })
        API.MaxData()
        .then(result => {
            setMax(result);
        })
    }
   const onHandleInput = query =>
    {
        if (!query) {
            getData();
        }
        API.SearchReceiver(query,limit)
        .then(result => {
            setProfiles(result);
            setLimit(limit+4);
            setMax(result.length);
        })

    }

    const fetchMoreData = () => {
        API.MoreData(limit)
        .then(result => {
            setProfiles(result);
            setLimit(limit+4);
        })
    }

    const getTransferDetail = (id) =>
    {
        dispatch(GetTransferById(id))
        navigation.navigate('AmountInput')

    }


    return (
        <>
         <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <GoBack page="Find Receiver" onPress={() => navigation.goBack()}/>
                <Gap height={40}/>
                <View>
                  <TextInput placeholder="Search receiver here" style={styles.search} onChangeText={(e) => onHandleInput(e)}/>
                  <IcSearch style={styles.IcSearch}/>
                </View>
                <Gap height={40}/>
                <Text style={styles.title}>Quick Access</Text>
                <Gap height={5}/>
            </View>
                <ScrollView horizontal style={styles.scrollHorizontal} showsHorizontalScrollIndicator={false}>
                    <Gap width={16} />
                   <View style={styles.scrollHorizontalWrapper}>
                       {
                           quickAccess.map((result,index) =>{
                               return(
                                   <View key={index} style={{flexDirection:'row'}}>
                                        <CardQuickAccess  fullName={result.fullName} img={result.img} number={result.phoneNumber} onPress={() => getTransferDetail(result.id)}/>
                                        <Gap width={20}/>
                                   </View>
                               )
                           })
                            
                       }
                  
                   </View>
                </ScrollView>

                <View style={styles.wrapperContant}>
                    <Gap height={20}/>
                    <Text style={styles.title}>All Contacts</Text>
                    <Gap height={10}/>
                    <Text style={styles.contact}>{profiles.length} Contact Founds</Text>
                </View>
            <Gap height={25}/>
            {
                profiles.map((result,index) => {
                    return(
                        <View key={index}>
                            <CardPerson phoneNumber={'+'+result.phoneNumber} img={result.img} name={result.fullName} onPress={() => getTransferDetail(result.id)} />
                            <Gap height={20}/>
                        </View>
                    )
                })
            }
            {
                    limit < max &&
                    profiles.length !== 0 && 
                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',marginBottom:20}} onPress={() => fetchMoreData()}>
                        <View style={{paddingVertical:10,backgroundColor:'rgba(58, 61, 66, 0.1)',width:160,borderRadius:10}}>
                            <Text style={{fontSize:16,fontWeight:'bold',color:'#7C7895',textAlign:'center'}}>Load More</Text>
                        </View>
                     </TouchableOpacity>
            }
          

         </ScrollView>

        </>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'rgb(250,252,255)',
        
    },
    container:{
        paddingHorizontal:16,
        backgroundColor:'rgb(250,252,255)',
    },
    title:{
        color:'#514F5B',
        fontSize:18,
        fontWeight:'bold'
    },
    search:{
        borderRadius:12,
        backgroundColor:"rgba(58, 61, 66, 0.1)",
        paddingVertical:15.5,
        paddingLeft:54,
        fontSize:16
    },
    IcSearch:{
        position:'absolute',
        top:17,
        left:18
    },
    scrollHorizontal:{
        flexDirection:'row'
    },
    scrollHorizontalWrapper:{
        marginVertical:20,
        flexDirection:'row'
    },
    wrapperContant:{
        paddingHorizontal:16
    },
    contact:{
        color:'#8F8F8F',
        fontSize:14
    }

 
})
