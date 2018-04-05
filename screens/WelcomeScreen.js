import React, { Component } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';

import { defaultContainerStyle } from '../styles/ContainerStyles';
import { welcomeScreenStyle, registerScreenStyle } from '../styles/ScreenStyles';

import { Actions } from 'react-native-router-flux';

import SwipeImageComponent from '../components/SwipeComponent';

import newsAPI from '../model';
import SwipeComponent from '../components/SwipeComponent';

export default class WelcomeScreen extends Component {
    state = {
        isLoading: true,
    }

    generateFooter() {
        return (
            <View style={defaultContainerStyle.footer}>
                <Button
                    title="Register"
                    fontSize={23}
                    color="white"
                    large={true}
                    transparent={true}
                    rounded={true}
                    underlayColor="gray"
                    onPress={() => {
                        Actions.register()
                    }} />
                <Button
                    title="Login"
                    fontSize={23}
                    color="white"
                    large={true}
                    transparent={true}
                    rounded={true}
                    underlayColor="gray"
                    onPress={() => {
                        Actions.login()
                    }} />
            </View>
        )
    }

    async componentDidMount() {
        result = await newsAPI.getLatest("th", "", 10)
        if (result.status == "ok") {
            this.setState({
                isLoading: false,
                articles: result.articles
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (<SafeAreaView style={defaultContainerStyle.container}>
                <Swiper>
                    <View style={welcomeScreenStyle.slide1}>
                        <Text style={welcomeScreenStyle.text}>
                            Loading...
                        </Text>
                    </View>
                </Swiper>

                {this.generateFooter()}
            </SafeAreaView>)
        }

        if (!this.state.articles) {
            return (<SafeAreaView style={defaultContainerStyle.container}>
                <Swiper>
                    <View style={welcomeScreenStyle.slide1}>
                        <Text style={welcomeScreenStyle.text}>
                            Error!...
                        </Text>
                    </View>
                </Swiper>

                {this.generateFooter()}
            </SafeAreaView>)
        }

        return (
            <SafeAreaView style={defaultContainerStyle.container}>
                <Swiper showsPagination={false} loop={false} showsButtons={true} bounces>
                    {this.state.articles.map(art => {
                        if (art.urlToImage) {
                            return (<SwipeComponent key={art.url} style={welcomeScreenStyle.slide1} newsTitle={art.title} textStyle={welcomeScreenStyle.text} image={art.urlToImage} imageStyle={registerScreenStyle.img} />)
                        }
                    }).filter(e => e != null && e != undefined)}
                </Swiper>
                {this.generateFooter()}
            </SafeAreaView>
        );
    }
}