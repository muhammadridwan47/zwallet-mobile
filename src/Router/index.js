import React, { useEffect,useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector,useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { 
    Splash,
    Login,
    SignUp,
    CreatePin,
    PinSuccess,
    ResetPassword,
    ResetNewPassword,
    Dashboard,
    DetailTransaction,
    History,
    FindReceiver,
    AmountInput,
    Confirmation,
    PinConfirmation,
    TransferSuccess,
    TopUp,
    Profile,
    PersonalInformation,
    ChangePassword,
    ChangePin,
    AddPhoneNumber,
    ManagePhoneNumber,
    Notification,
    Admin
    
} from '../pages';
import { GetUsers } from '../redux/actions/Users';
const Stack = createStackNavigator();


export default function Router({navigation}) {
    const Auth = useSelector((s)=> s.Auth)
    const dispacth = useDispatch();
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState('Dashboard');
    useEffect(() => {
        dispacth(GetUsers({token:Auth?.data?.token?.token}))
        // Assume a message-notification contains a "type" property in the data payload of the screen to open
        messaging().onNotificationOpenedApp(remoteMessage => {
            // console.log(
            //   'Notification caused app to open from background state:',
            //   remoteMessage.notification,
            // );
            navigation.navigate('SignUp');
          });
      
          // Check whether an initial notification is available
          messaging()
            .getInitialNotification()
            .then(remoteMessage => {
              if (remoteMessage) {
                // console.log(
                //   'Notification caused app to open from quit state:',
                //   remoteMessage.notification,
                // );
                setInitialRoute('SignUp'); // e.g. "Settings"
              }
              setLoading(false);
            });    


    },[Auth])
    if (loading) {
        return null;
    }

    return (
     <Stack.Navigator initialRouteName={initialRoute} >

            {
                Auth?.data?.token?.role ? (
                    
                    <>
                    {
                        Auth?.data?.token?.role == '100' ? 
                            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
                        :   <Stack.Screen name="Admin" component={Admin} options={{headerShown:false}} />
           
                    }
                    <Stack.Screen name="DetailTransaction" component={DetailTransaction} options={{headerShown:false}} />
                    <Stack.Screen name="History" component={History} options={{headerShown:false}} />
                    <Stack.Screen name="FindReceiver" component={FindReceiver} options={{headerShown:false}} />
                    <Stack.Screen name="AmountInput" component={AmountInput} options={{headerShown:false}} />
                    <Stack.Screen name="Confirmation" component={Confirmation} options={{headerShown:false}} />
                    <Stack.Screen name="PinConfirmation" component={PinConfirmation} options={{headerShown:false}} />
                    <Stack.Screen name="TransferSuccess" component={TransferSuccess} options={{headerShown:false}} />
                    <Stack.Screen name="TopUp" component={TopUp} options={{headerShown:false}} />
                    <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />
                    <Stack.Screen name="PersonalInformation" component={PersonalInformation} options={{headerShown:false}} />
                    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}} />
                    <Stack.Screen name="ChangePin" component={ChangePin} options={{headerShown:false}} />
                    <Stack.Screen name="AddPhoneNumber" component={AddPhoneNumber} options={{headerShown:false}} />
                    <Stack.Screen name="ManagePhoneNumber" component={ManagePhoneNumber} options={{headerShown:false}} />
                    <Stack.Screen name="Notification" component={Notification} options={{headerShown:false}} />
                    </>
                ) : (
                    <>
                    <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
                    <Stack.Screen name="CreatePin" component={CreatePin} options={{headerShown:false}} />
                    <Stack.Screen name="PinSuccess" component={PinSuccess} options={{headerShown:false}} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown:false}} />
                    <Stack.Screen name="ResetNewPassword" component={ResetNewPassword} options={{headerShown:false}} />
                    </>
                )
            }


           
     </Stack.Navigator>
    )
}


