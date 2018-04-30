import React from 'react';
import ReactNative from "react-native";

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import { StyleSheet, Text, View } from 'react-native';
import { Router, Stack, Scene, Modal } from 'react-native-router-flux';

import * as firebase from 'firebase';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MainScreen from './screens/MainScreen';

firebase.initializeApp(require("./cert.json").firebase);

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Modal
                    key="modal"
                    hideNavBar
                >
                    <Stack
                        key="root"
                        navigationOptions={{ gesturesEnabled: true }}
                        transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forVertical })}
                    >
                        <Scene key="home" hideNavBar component={WelcomeScreen} initial init={true} />
                        <Scene key="login" hideNavBar component={LoginScreen} title="Login" />
                        <Scene key="register" hideNavBar component={RegisterScreen} title="Register" />
                    </Stack>
                    <Scene key="main" component={MainScreen} title="Main" init={true} />
                </Modal>
            </Router >
        );
    }
}
