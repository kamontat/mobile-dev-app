import React, { Component } from 'react';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

import FormScreen from './FormScreen';

import { Actions } from 'react-native-router-flux';

import { defaultContainerStyle } from '../styles/ContainerStyles';
import { registerScreenStyle } from '../styles/ScreenStyles';

import * as firebase from 'firebase';

export default class RegisterScreen extends FormScreen {
    headerImage() {
        return require('../assets/cat.jpg')
    }

    formCreator() {
        return (<GiftedForm
            formName='signupForm'
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
                title="Register"
                onSubmit={this.submitForm} />

            <GiftedForm.NoticeWidget
                title='By signing up, you agree to the Terms of Service and Privacy Policity.' />
        </GiftedForm>)
    }

    submitForm(isValid, values, validationResults, postSubmit = null, modalNavigator = null) {
        if (isValid === true) {
            firebase.auth().createUserWithEmailAndPassword(values.email, values.password).then((obj) => {
                console.log(obj.uid)
                postSubmit()
                Actions.login(obj.uid)
            }).catch((error) => {
                // Handle Errors here.
                postSubmit([error.code, error.message])
            });
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