import React, { Component } from 'react'
import { View, SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native'

import { Button, List, ListItem, Avatar } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import Modal from "react-native-modal"

import DatabaseApi from '../database'
import { black } from 'ansi-colors'

export default class DatabaseScreen extends Component {
    state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        ref: null,
        form: {
            id: "",
            name: "",
            email: "",
            picture: ""
        },
        formError: {
            id: null,
            name: null,
            email: null,
            picture: null
        },
        refreshing: false,
        overlay: false
    }

    async componentWillMount() {
        this.setState({ loading: true })

        try {
            this.setState({ ref: await DatabaseApi.getLatest() })

            this.state.ref.on('value', (snapshot) => {
                this.setState({
                    data: snapshot.val(),
                    loading: false
                })
            })
        } catch (e) {
            this.setState({
                loading: false,
                error: e
            })
        }
    }

    isInvalid(text) {
        // console.log(text)
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(text) ? false : true
    }

    isEmpty(t) {
        return t === "" || t === undefined || t === null
    }

    setForm(key, value) {
        let json = this.state.form
        json[key] = value

        this.setState({ form: json })
    }

    setFormError(key, error) {
        let json = this.state.formError
        json[key] = error
        this.setState({ formError: json })
    }

    async submitForm() {
        const result = await DatabaseApi.write(this.state.form)
        console.log(result)
        this.setState({ overlay: false })
    }

    render() {
        if (this.state.data.length > 0 && this.state.loading == false) {
            return (
                <SafeAreaView>
                    <Modal isVisible={this.state.overlay}
                        onSwipe={() => this.setState({ overlay: !this.state.overlay })}
                        swipeDirection="down">
                        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                            <FormLabel>ID</FormLabel>
                            <FormInput onChangeText={id => this.setForm("id", id)} />
                            <FormValidationMessage >{this.state.formError.id}</FormValidationMessage>
                            <FormLabel>Name</FormLabel>
                            <FormInput onChangeText={name => this.setForm("name", name)} />
                            <FormValidationMessage >{this.state.formError.name}</FormValidationMessage>
                            <FormLabel>Email</FormLabel>
                            <FormInput onChangeText={email => this.setForm("email", email)} />
                            <FormValidationMessage >{this.state.formError.email}</FormValidationMessage>
                            <FormLabel>Picture</FormLabel>
                            <FormInput onChangeText={picture => this.setForm("picture", picture)} />
                            <FormValidationMessage >{this.state.formError.picture}</FormValidationMessage>

                            <Button
                                title='Submit'
                                onPress={() => {
                                    this.setFormError("id", this.isEmpty(this.state.form.id) && "Id cannot empty" || null)
                                    this.setFormError("name", this.isEmpty(this.state.form.name) && "Name cannot empty" || null)
                                    this.setFormError("email", this.isEmpty(this.state.form.email) && "Email cannot empty" || null)

                                    // this.setFormError("id", Number.isInteger(this.state.form.id) || "Id must be number")
                                    this.setFormError("email", this.isInvalid(this.state.form.email) && "Invalided email" || null)

                                    // console.log(this.state.formError)
                                    if (this.isEmpty(this.state.formError.id) &&
                                        this.isEmpty(this.state.formError.name) &&
                                        this.isEmpty(this.state.formError.email) &&
                                        this.isEmpty(this.state.formError.picture)) {
                                        this.submitForm()
                                    }
                                }} />
                        </SafeAreaView>
                    </Modal>

                    <Button
                        title='ADD'
                        onPress={() => {
                            this.setState({ overlay: true })
                        }}
                    />
                    <Text>{this.state.error}</Text>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, height: "100%" }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={
                                ({ item }) => (
                                    <ListItem
                                        roundAvatar
                                        title={item.name}
                                        subtitle={item.email}
                                        avatar={<Avatar
                                            rounded
                                            source={item.picture && { uri: item.picture }}
                                            title={item.name[0]}
                                        />}
                                        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                                    />
                                )
                            }
                            keyExtractor={item => item.id}
                        />
                    </List>
                </SafeAreaView>
            )
        }

        return <SafeAreaView><Text>Please wait~</Text></SafeAreaView>
    }
}
