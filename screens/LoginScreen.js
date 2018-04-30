import React, { Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

import FormScreen from './FormScreen';

import { Actions } from 'react-native-router-flux';

import { defaultContainerStyle } from '../styles/ContainerStyles';
import { registerScreenStyle } from '../styles/ScreenStyles';

import * as firebase from 'firebase';

export default class LoginScreen extends FormScreen {
    headerImage() {
        return require('../assets/dog.jpg')
    }

    formCreator() {
        return (<GiftedForm
            formName='loginForm'
            validators={this.validator()}
            style={defaultContainerStyle.formContainer}
            scrollEnabled={true}>

            <GiftedForm.SeparatorWidget />

            <GiftedForm.TextInputWidget
                name='email' // mandatory
                title='Email address'
                placeholder='user@example.com'
                keyboardType='email-address'
                clearButtonMode='while-editing'
                autoCapitalize='none'
                image={require('../assets/icons/email.png')} />

            <GiftedForm.TextInputWidget
                name='password' // mandatory
                title='Password'
                placeholder='******'
                image={require('../assets/icons/lock.png')}
                clearButtonMode='while-editing'
                secureTextEntry={true} />

            <GiftedForm.ErrorsWidget />

            <GiftedForm.SubmitWidget
                title="Login"
                onSubmit={this.submitForm} />

            <GiftedForm.NoticeWidget
                style={{ textAlign: "center", }}
                title='forgot password' />
        </GiftedForm>)
    }

    bypass() {
        const user = firebase.auth().currentUser
        if (!user) {
            console.log("No user login");
            return
        }
        console.log(`login as ${user.email}`)
        Actions.main({ user: user })
    }

    submitForm(isValid, values, validationResults, postSubmit = null, modalNavigator = null) {
        if (isValid === true) {
            firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((obj) => {
                console.log(`login as ${obj.email}`)
                postSubmit()
                Actions.main({ user: obj })
            }).catch((error) => {
                // Handle Errors here.
                postSubmit([error.code, error.message])
            })
        }
    }

    validator() {
        return {
            password: {
                title: 'Password',
                validate: [{
                    validator: 'isLength',
                    arguments: [6, 16],
                    message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
                }]
            },
            email: {
                title: 'Email address',
                validate: [{
                    validator: 'isLength',
                    arguments: [6, 255],
                }, {
                    validator: 'isEmail',
                }]
            }
        }
    }
}