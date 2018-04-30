import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Text, } from 'react-native';

import { Button } from 'react-native-elements';

import { defaultContainerStyle } from '../styles/ContainerStyles'

import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

export default class LogoutScreen extends Component {
    render() {
        return (
            <SafeAreaView style={defaultContainerStyle.container}>
                {/* <ScrollView>
                </ScrollView> */}
                <View style={defaultContainerStyle.footer}>
                    <Button
                        large
                        rounded
                        title="logout"
                        buttonStyle={{ width: "100%" }}
                        icon={{ name: 'sign-out', type: 'font-awesome' }}
                        onPress={() => {
                            firebase.auth().signOut().then(() => {
                                Actions.home()
                            }).catch(err => {
                                console.warn(err);
                            })
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
