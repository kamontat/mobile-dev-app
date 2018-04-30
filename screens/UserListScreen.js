import React, { Component } from 'react';
import { View, SafeAreaView, Text, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import RandomUser from '../random';
import { black } from 'ansi-colors';

export default class UserListScreen extends Component {
    state = {
        loading: false,
        data: [],
        page: 1,
        seed: 1,
        error: null,
        refreshing: false
    }

    async componentWillMount() {
        this.setState({ loading: true })

        try {
            const json = await RandomUser.getLatest("us", 20, this.state.page, this.state.seed)
            this.setState({
                data: this.state.data.concat(json.results),
                loading: false
            })
        } catch (e) {
            this.setState({
                loading: false,
                error: e
            })
        }
    }

    render() {
        if (this.state.data.length > 0 && this.state.loading == false) {
            return (
                <SafeAreaView>
                    <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
                        <FlatList
                            data={this.state.data}
                            renderItem={
                                ({ item }) => (
                                    <ListItem
                                        roundAvatar
                                        title={item.name.first + " " + item.name.last}
                                        subtitle={item.email}
                                        avatar={{ uri: item.picture.thumbnail }}
                                        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
                                    />
                                )
                            }
                            keyExtractor={item => item.email}
                        />
                    </List>
                </SafeAreaView>
            );
        }

        return <SafeAreaView><Text>Please wait~</Text></SafeAreaView>
    }
}
