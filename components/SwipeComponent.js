import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export default class SwipeImageComponent extends Component {
    constructor(props) {
        super(props)
    }

    renderTitle() {
        if (this.props.newsTitle)
            return (
                <Text numberOfLines={5} style={this.props.textStyle}>
                    {this.props.newsTitle}
                </Text>
            )
    }

    renderImage() {
        if (this.props.image) {
            return (
                <Image style={this.props.imageStyle} source={{ uri: this.props.image }} />
            )
        }
    }

    render() {
        if (this.props.image) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {this.renderTitle()}
                    {this.renderImage()}
                </View>
            )
        }
    }
}
