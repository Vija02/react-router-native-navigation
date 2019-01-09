# React Router Native Navigation

## **This repo is still under development**

Navigation in react-native is hard. It shouldn't be that way. There are plenty of great libraries out there that can help you create good navigation. This package is the glue you wanted.

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

- [x] React Router goodness
- [x] Remembers previous screen states
- [x] Handles back button presses
- [x] Custom stack animations
- [ ] Allows nesting (I think this should work out of the box but not tested yet)
- [ ] Baked in UI
- [ ] Lifecycle
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
| mode | `string` | `card` | The animation mode. This is currently the only value so it's a bit useless. However, it will mirror the value in [react-navigation](https://reactnavigation.org/docs/en/stack-navigator.html). Namely, `modal` |
| transitionConfig | `function` | `null` | Custom animation config object. For more info, see the documentation down on [Custom Animation](#custom-animation) |

### \<BottomNavigationSwitch />

#### Usage

```js
```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| lazy | `boolean` | false | Should all routes load at the beginning?  |

> Note: The above components behaves a bit differently from `react-router`'s `Switch`. `StackSwitch` and `BottomNavigationSwitch` will render all of the route but only show the matching one. This shouldn't be a problem unless you're relying on it to work that way. If that's not the behaviour you want, simply using `react-router-native` alone should be sufficient.

### Custom Animation

React navigation, a popular library for navigation have their own way of specifying custom animation. This library tries as much as possible to make custom transitions compatible with this library.

There are a few core differences between the `react-navigation` history and `react-router` history. Because of this, [the API for custom transition](https://reactnavigation.org/docs/en/stack-navigator.html) won't be exactly the same as `react-navigation`. However, it might work right off the bat in some scenario. 

I personally don't have a need to make this very thorough. If you're willing to make this better, you're more than welcomed to send a PR!
We could pass sufficient data to the parameters and have a separate compatibility layer to map it to `react-navigation` (Something like [preact-compat](https://github.com/developit/preact-compat))

You could do a simple modification to make libraries such as [react-navigation-transitions](https://github.com/plmok61/react-navigation-transitions) work. 
Example: 
```js
const compat = config => {
	return {
		...config,
		screenInterpolator: props => {
			return config.screenInterpolator({ ...props, scene: { ...props.scene, index: 0 } })
		},
	}
}
```
And on your component
```js
...
render() {
  return (
    <StackSwitch 
      transitionConfig={() => compat(fromLeft())}
    >
      ...
    </StackSwitch>
  )
}
...
```

#### Differences

1. Parameters for function aren't the same for the most part. This can be documented better but for now, look at the `StackAnim.js` file

2. `transitionConfig` return value doesn't handle:
- `headerLeftInterpolator`
- `headerTitleInterpolator`
- `headerRightInterpolator`
> Header are not handled in this library. Look at [current limitation](#current-limitations)

3. The interpolation between screens happens from -1, 0 and 1 instead of between the indexes. Simply imagine `0` to be `index` and you're set. Look at the forked [StackViewTransitionConfigs](https://github.com/Vija02/react-router-native-navigation/tree/master/src/StackSwitch/StackViewTransitionConfigs) folder to see examples of modified configs to suit this library.

## Glueing it yourself (UI customization)

## Deep Linking

Simply use `<DeepLinking />` provided by [react-router-native](https://reacttraining.com/react-router/native/api/DeepLinking)

## Motivation

There are `react-navigation`, `react-router-navigation` along with countless other libraries out there. Most of them are pretty complicated and tries to do a lot of things. At the end of the day, the API can get pretty confusing and performance doesn't come easily.

## Aim

This package should provide a production ready default that can be inserted in any project. Adding to that, developers should be able to create their own glue by using the base component provided by the package.

User should be able to start developing with `react-router-native` and effortlessly create great navigation using this package.

Last but not least, it should remain simple but customizable!

## Current Limitations

The [history](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md) API can be a bit limiting for a complex navigation. For example, your history stack will get out of control if you don't configure it properly/never reset it. This is not great because all of the entries in the history stack will still be rendered even when it's not used. You can manually reset the stack by mutating the `history` object. But this will lead to inconsistency with this library. TODO: Perhaps we should add a method to allow changes from within the Switches component.

No Header support. One of the big decision when this library was made was whether it should support have its own header. In the spirit of keeping things simple, you will have to bring your own header component. There's an example TODO: [here]() that illustrates how to do just that.  
However, I'm aware there might be some demand for transitions inside the header itself. I'm open to suggestions on how best to implement it.

There are quite a few edge cases that might not be handled yet. Please report them if you find one!

## How it works

## TODO

- [ ] Lifecycle

## Roadmap

- [ ] Better animation config (Card shadows, etc)
- [ ] Web support
- [ ] TypeScript
- [ ] react-native-reanimated? 
> Right now we try to follow the API for custom animation with `react-navigation`. There are a bunch of components that we basically recreate in this package because the core history is different from `react-router`. In the future, it might be worth spending some time to see if we can reuse the components there. Namely: `<Transitioner />`, and custom animation. The reason this library still uses `Animated` instead of `react-native-reanimated` is because `react-navigation` doesn't support it yet.

## Credits

This library won't be possible without all the awesome libraries out there. Credits to `react-navigation`, `react-router-navigation`, `react-native-animated-router` and `react-router-transition` for basically doing all the work :). And special thanks to `react-native` and `react-router` for making all this possible!