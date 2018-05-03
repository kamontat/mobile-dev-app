import * as React from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import { defaultContainerStyle } from '../styles/ContainerStyles'

import DatabaseScreen from './DatabaseScreen'
import LogoutScreen from './LogoutScreen'
import UserListScreen from './UserListScreen'

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class MainScreen extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'user', title: 'Users' },
            { key: 'database', title: 'Databases' },
            { key: 'setting', title: 'Settings' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar {...props} />;

    _renderScene = SceneMap({
        user: () => <UserListScreen {...this.props} />,
        database: () => <DatabaseScreen {...this.props} />,
        setting: () => <LogoutScreen {...this.props} />
    });

    render() {
        return (
            <TabViewAnimated
                navigationState={this.state}
                renderScene={this._renderScene}
                renderFooter={this._renderHeader}
                onIndexChange={this._handleIndexChange}
                initialLayout={initialLayout}
            />
        );
    }
}