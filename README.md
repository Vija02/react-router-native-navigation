# React Router Native Navigation

## **This repo is still under development**

Navigation is hard. It shouldn't be that way. There are plenty of great libraries out there that can help you create good navigation. This package is the glue you wanted.

As the name suggest, this package is heavily influenced by React Router. The aim is to make it a drop-in replacement for react-router-native as much as possible.

## Demo

TODO: Expo Demo and screenshot

## Sneak Peak

TODO: Change example to full blown 
```js
import React from 'react'
import { View, Text } from 'react-native'
import { NativeRouter } from 'react-router-native'
import { BottomNavigationSwitch } from 'react-router-native-navigation'

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <BottomNavigationSwitch>
          <Route exact path="/" render={() => <View><Text>Home</Text></View>} />
          <Route path="/settings" render={() => <View><Text>Settings</Text></View>} />
        </BottomNavigationSwitch>
        <Link to="/"><Text>Home</Text></Link>
        <Link to="/settings"><Text>Settings</Text></Link>
      </NativeRouter>
    );
  }
}
```

## Features

- [ ] Stack Navigation 
- [ ] Bottom Navigation 

## Installation

This package is purely JavaScript so you only need to run:
```shell
yarn add react-router-native-navigation
```

## Docs

## Glueing it yourself (UI customization)

## Aim

This package should provide a production ready default that can be inserted in any project. Adding to that, developers should be able to create their own glue by using the base component provided by the package.

User should be able to start developing with `react-router-native` and effortlessly create great navigation using this package.

## How it works

## Roadmap
- [] Web support