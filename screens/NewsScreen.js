import React, { Component } from 'react'

import { StyleSheet, Dimensions } from 'react-native'
import { View, SafeAreaView, ScrollView } from 'react-native'
import { Text, Button, FlatList } from 'react-native'

import { List, ListItem } from 'react-native-elements'

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view'

import { defaultContainerStyle } from '../styles/ContainerStyles'

import * as firebase from 'firebase'

import { Actions } from 'react-native-router-flux'

import newsAPI from '../model'

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
}

export default class NewsScreen extends Component {

    render() {
        return (
            <SafeAreaView style={defaultContainerStyle.container}>
                <ScrollView>
                    <Text style={{ color: "white" }}>
                        login as {this.props.user.email}
                    </Text>
                    <Text style={{ color: "white" }}>Power by News API</Text>
                </ScrollView>

                {/* <View style={defaultContainerStyle.footer}>
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
                </View> */}
            </SafeAreaView>
        );
    }
}
