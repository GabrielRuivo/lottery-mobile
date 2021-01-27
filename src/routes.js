import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

import TabRoutes from './routes/home.routes';

export default function Routes () {
    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}} >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} /> 
                <Stack.Screen name="Home" component={TabRoutes} /> 
            </Stack.Navigator>
        </>
    )
}