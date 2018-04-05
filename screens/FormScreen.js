import React, { Component } from 'react';

import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

import { defaultContainerStyle } from '../styles/ContainerStyles';
import { registerScreenStyle } from '../styles/ScreenStyles';

export default class FormScreen extends Component {

    headerImage() { }

    bypass() { }

    formCreator() { }

    componentWillMount() {
        this.bypass(this.props);
    }

    render() {
        return (
            <SafeAreaView style={defaultContainerStyle.container}>
                <Image source={this.headerImage()} style={registerScreenStyle.img} />
                {this.formCreator()}
            </SafeAreaView>
        );
    }
}
