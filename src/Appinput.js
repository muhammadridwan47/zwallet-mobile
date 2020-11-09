import React from 'react';
import {Text, View,ScrollView} from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { IcMail,IcLock,IcEyeErossed} from './assets/Icons';
import { FormGroup } from './elements';

// import { NavigationContainer } from '@react-navigation/native';

// import Router from './Router';
import { Splash } from './pages';
import { Gap } from './utils';

const App = () => {
  return (
    <>
      <ScrollView style={{flex:1,backgroundColor:'rgb(250,252,255)'}} showsVerticalScrollIndicator={false}>
        <Gap height={76}/>
        <Text style={{textAlign:'center',fontSize:26,color:'#6379F4',fontWeight:'bold'}}>Zwallet</Text>
        <Gap height={61}/>
        
        <View style={{backgroundColor:'#fff',flex:1,borderTopLeftRadius:35,borderTopRightRadius:35,shadowOpacity:0.75,elevation:75,paddingHorizontal:16}}>
            <Gap height={40}/>
            <Text style={{fontSize:24,color: '#3A3D42',fontWeight:'bold',textAlign:'center'}}>Login</Text>
            <Gap height={20}/>
            <Text style={{textAlign:'center',color:'rgba(58, 61, 66, 0.6)',lineHeight:23}}>Login to your existing account to access {'\n'} all the features in Zwallet.</Text>
            <Gap height={53}/>

            {/* <View style={{position:'relative'}}>
              <TextInput placeholder="Enter your e-mail" style={{borderBottomWidth:1.5,borderColor:'rgba(169, 169, 169, 0.6)',paddingLeft:39,paddingBottom:11,fontSize:16}}/>
              <IcMail style={{position:'absolute',bottom:13}}/>
            </View> */}
            <FormGroup icon="mail" placeholder="Enter your e-mail" />
            <Gap height={60}/>
            <FormGroup icon="password" placeholder="Enter your password" />

            {/* <View style={{position:'relative'}}>
              <TextInput placeholder="Enter your password" style={{borderBottomWidth:1.5,borderColor:'rgba(169, 169, 169, 0.6)',paddingLeft:39,paddingBottom:11,fontSize:16}}/>
              <IcLock style={{position:'absolute',bottom:13}}/>
              <IcEyeErossed style={{position:'absolute',bottom:13,right:0}}/>
            </View> */}

            <Gap height={15}/>
            <Text style={{textAlign:'right',color:'rgba(58, 61, 66, 0.8)',fontSize:14}}>Forgot password?</Text>
            <Gap height={75}/>
            <View style={{backgroundColor:'#DADADA',paddingVertical:16,borderRadius:12,shadowOpacity:0.05,elevation:0.05,shadowColor:'rgba(100, 87, 87, 0.05)'}}>
                <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'#88888F'}}>Login</Text>
            </View>
            <Gap height={25}/>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Text style={{fontSize:16}}>Don’t have an account? Let’s </Text><Text style={{fontSize:16,color:'#6379F4'}}>Sign Up</Text>
            </View>
            <Gap height={25}/>
        </View>
      </ScrollView>





      {/* <Splash/> */}
     {/* <NavigationContainer>
        <Router/>
      </NavigationContainer> */}
    </>
  );
};


export default App;


