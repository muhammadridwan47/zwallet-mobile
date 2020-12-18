import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet,Image, ScrollView, TouchableOpacity,Button,Switch } from 'react-native'
import { useSelector,useDispatch } from 'react-redux';
import { IcEditProfile, IcArrowRight,IcAddImage } from '../../assets';
import { GoBack} from '../../components'
import { AuthLogout } from '../../redux/actions/Auth';
import { Gap } from '../../utils';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { FormGroup } from '../../elements';
import API from '../../service';
import { GetUsers } from '../../redux/actions/Users';
import { showMessage} from "react-native-flash-message";
import { URIIMAGE } from '../../utils/URI';
import messaging from '@react-native-firebase/messaging';

export default function Profile({navigation}) {
    const User = useSelector((s)=> s.Users)
    const Auth = useSelector((s)=> s.Auth)
    const [profileData,setProfileData] = useState([]);
    const [logout,setLogout] = useState(true);
    const [modal,setModal] = useState(false)
    const [photo,setPhoto] = useState()
    const [fullName,setFullName] = useState('')
    const dispacth = useDispatch();


    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        logout && User?.data && setProfileData(User?.data)
    }, [User])

    const handleLogout = () => 
    {
        setLogout(false)
        dispacth(AuthLogout())
    }
    const ImageLibrary = () => 
    {
        ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel || response.error) {
                showMessage({
                    message: "oops, you don't chouse image!",
                    type: "danger",
                });
            }else{
                const formData = new FormData()
                formData.append('images',{
                    uri: response.uri,
                    name: response.fileName,
                    type: response.type
                })   
                formData.append(
                    'fullName', !fullName ? profileData?.fullName : fullName,
                )  
                API.UploadImage(formData).then(res => {
                    let image = `data:${response.type};base64,${response.data}`
                    setPhoto(image)
                    dispacth(GetUsers({token:Auth?.data?.token?.token}))
                    setFullName('')
                    showMessage({
                        message: "Success change image",
                        type: "success",
                    });
                   setModal(false)
                })
                .catch(err => {
                    alert('gagal')
                    setModal(false)
                })
               
            }
        });
    }
    

    const rename = () => 
    {
       API.rename({fullName:fullName})
       .then(res => {
        dispacth(GetUsers({token:Auth?.data?.token?.token}));
        setModal(false);
        setFullName('');
        showMessage({
            message: "Name have been changed",
            type: "success",
        });
       })
       
    }

    const switchChange = (value) =>
    {
        if (value === false) {
            API.FCM({tokenFcm:'-'})
        }else{
            messaging().getToken().then(token => {
                API.FCM({tokenFcm:token})
            })
        }
        setIsEnabled(value)
    }

    return (
    <>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Gap height={10}/>
            <GoBack onPress={()=> navigation.goBack()}/>
            <Gap height={24}/>
            <View style={styles.wrapper}>
                {
                    profileData?.img == '-' ? <Image style={styles.image} source={{uri:'https://www.abc.net.au/cm/rimage/12049340-16x9-xlarge.png?v=2'}}/> : <Image style={styles.image} source={{uri:URIIMAGE+profileData?.img}}/>
                }
                <Gap height={10}/>
                <TouchableOpacity style={styles.edit} onPress={() => setModal(true)}>
                    <IcEditProfile/>
                    <Text style={styles.editTitle}>Edit</Text>
                </TouchableOpacity>
                <Text style={styles.name}>{profileData?.fullName}</Text>
                <Text style={styles.phoneNumber}>{profileData?.phoneNumber && '+'+profileData?.phoneNumber}</Text>
            </View>
            <Gap height={45}/>
            <TouchableOpacity activeOpacity={0.6} style={styles.cardProfile} onPress={() => navigation.navigate('PersonalInformation')}>
                <Text style={styles.heading}>Personal Information</Text>
                <IcArrowRight/>
            </TouchableOpacity>
            <Gap height={25}/>
            <TouchableOpacity activeOpacity={0.6} style={styles.cardProfile} onPress={() => navigation.navigate('ChangePassword')}>
                <Text style={styles.heading}>Change Password</Text>
                <IcArrowRight/>
            </TouchableOpacity>
            <Gap height={25}/>
            <TouchableOpacity activeOpacity={0.6} style={styles.cardProfile} onPress={() => navigation.navigate('ChangePin')}>
                <Text style={styles.heading}>Change PIN</Text>
                <IcArrowRight/>
            </TouchableOpacity>
            <Gap height={25}/>
            <View style={styles.cardProfile}>
                <Text style={styles.heading}>Notification</Text>
                <Switch
                    trackColor={{ false: "rgba(169, 169, 169, 0.4)", true: "#6379F4" }}
                    thumbColor={isEnabled ? "#fff" : "#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    style={{height:26,width:48}}
                    value={isEnabled}
                    onValueChange={value => switchChange(value)}
                />
            </View>
            <Gap height={25}/>
            <TouchableOpacity activeOpacity={0.6} style={styles.cardProfile} onPress={() => handleLogout() }>
                <Text style={styles.heading}>Logout</Text>
            </TouchableOpacity>
            <Gap height={35}/>
        </ScrollView>
        <Modal isVisible={modal}>
         <View style={{flex:1,backgroundColor:'white',borderRadius:10,padding:20}}>
            <ScrollView style={{flex: 1}}>
                <Gap height={100}/>
                <TouchableOpacity style={{alignItems:'center'}} onPress={ImageLibrary} >
                    {!photo ? <IcAddImage/> : <Image style={styles.image} source={{uri:photo}}/>}
                </TouchableOpacity >
                <Gap height={40}/>
                <View style={{paddingHorizontal:20}}>
                    <FormGroup icon="username" placeholder="Your Name" value={fullName} onChangeText={e => setFullName(e) }  />
                </View>
            </ScrollView>
            <Button title="Rename" onPress={() => rename()} />
            <Gap height={10} />
            <Button title="close" onPress={() => setModal(false)} />
          </View>
        </Modal>
    </>
    )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingHorizontal:16,
      backgroundColor:'rgb(250,252,255)'
    },
    wrapper:{
        alignItems:'center'
    },
    edit:{
        flexDirection:'row',
        alignItems:'center'
    },
    editTitle:{
        marginLeft:11,
        fontSize:16,
        color:'#7A7886'
    },
    name:{
        fontSize:24,
        color:'#4D4B57',
        fontWeight:'bold',
        marginTop:15
    },
    phoneNumber:{
        fontSize:16,
        color:'#7A7886',
        marginTop:10
    },
    cardProfile:{
        paddingVertical:15,
        paddingHorizontal:20,
        backgroundColor:'#E5E8ED',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    heading:{
        color:'#4D4B57',
        fontWeight:'bold',
        fontSize:16
    },
    image:{
        height:80,
        width:80,
        borderRadius:10
    }

  });