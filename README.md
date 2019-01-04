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

- [x] Remembers previous screen states
- [ ] Handles back button presses
- [ ] Allows nesting
- [ ] Custom animations
- [ ] Baked in UI
- [x] Stack Navigation 
- [x] Bottom Navigation 

## Installation

This package is purely JavaScript so you only need to run:
```shell
yarn add react-router-native-navigation
```

## Docs

## *Switches*

These component are the core of this library. They make navigation behave like they should.

### **\<StackSwitch />**

#### Usage

```js

```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| animation | `string`\|`object`\|`function` | 'default' | The animation that will be run. For more info, see the documentation down on [Custom Animation](#custom-animation) |

### \<BottomNavigationSwitch />

#### Usage

```js
```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| lazy | `boolean` | false | Should the routes load before opened? |

> Note: The above components behaves a bit differently from `react-router`'s `Switch`. `StackSwitch` and `BottomNavigationSwitch` will render all of the route but only show the matching one. This shouldn't be a problem unless you're relying on it to work that way. If that's not the behaviour you want, simply using `react-router-native` alone should be sufficient.

### Custom Animation

TODO: Make this better

`-1 <===> 0 <===> 1`  
When the animation value is `0`, the style should animate to show on the screen.  
`-1` and `1` is used to indicate whether we are doing PUSH or POP. This will allow us to show different animation.

Let's imagine 2 screens `A` and `B`. The first screen is `A` and we can push `B` to the stack.
When we push `B`, the animation value will go from  
`0 --> -1` for screen `A`  
`1 --> 0` for screen `B` 

## Glueing it yourself (UI customization)

## Motivation

There are `react-navigation`, `react-router-navigation` along with countless other libraries out there. Most of them are pretty complicated and tries to do too much. At the end of the day, the API can get pretty confusing and performance doesn't come easily.

## Aim

This package should provide a production ready default that can be inserted in any project. Adding to that, developers should be able to create their own glue by using the base component provided by the package.

User should be able to start developing with `react-router-native` and effortlessly create great navigation using this package.

## Current Limitations

The [history](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md) API can be a bit limiting for a complex navigation. For example, your history stack will get out of control if you don't configure it properly/never reset it. This is not great because all of the entries in the history stack will still be rendered even when it's not used. You can manually reset the stack by mutating the `history` object. But this will lead to inconsistency with this library. TODO: Perhaps we should add a method to allow changes from within the Switches component.

There are quite a few edge cases that might not be handled yet. Please report them if you find one!

## How it works

## Roadmap
- [] Web support