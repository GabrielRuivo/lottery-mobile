import React from 'react';

import Games from '../pages/Games';

import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerCart from '../pages/DrawerCart'

const Drawer = createDrawerNavigator();

export default function CartRoutes () {

    return (
        <>
            <Drawer.Navigator 
                initialRouteName="Games" 
                drawerPosition="right"
                drawerContent={props => <DrawerCart {...props} />}
            >
                <Drawer.Screen name="Cart" component={Games} />
            </Drawer.Navigator>
        </>
    )
}