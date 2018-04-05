import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Button } from 'react-native';

import { defaultContainerStyle } from '../styles/ContainerStyles';

import * as firebase from 'firebase';

import { Actions } from 'react-native-router-flux';

import newsAPI from '../model';

export default class NewsScreen extends Component {
    async componentWillMount() {
        // console.log(await newsAPI.getLatest())
    }

    render() {
        return (
            <SafeAreaView style={defaultContainerStyle.container}>
                <ScrollView>
                    <Text style={{ color: "white" }}>
                        login as {this.props.user.email}
                    </Text>
                    <Text>Power by News API</Text>
                </ScrollView>

                <View style={defaultContainerStyle.footer}>
                    <Button
                        title="Logout"
                        fontSize={23}
                        color="white"
                        large={true}
                        transparent={true}
                        rounded={true}
                        underlayColor="gray"
                        onPress={() => {
                            firebase.auth().signOut().then(() => {
                                Actions.home()
                            }).catch(err => {
                                console.warn(err);
                            })
                        }} />
                </View>
            </SafeAreaView>
        );
    }
}
