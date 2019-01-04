import React, { Component } from 'react'
import { Animated, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

// This Component gets info through props and is responsible to handle all the animation
export default class StackAnim extends Component {
	constructor(props) {
		super(props)
		this.state = { animationValue: new Animated.Value(0) }
	}

	componentDidMount() {
		Animated.sequence([
			Animated.timing(this.state.animationValue, {
				useNativeDriver: true,
				duration: 0,
				toValue: this.props.animDirection,
			}),
			Animated.timing(this.state.animationValue, { useNativeDriver: true, toValue: 0, duration: 200 }),
		]).start()
	}

	componentDidUpdate(prevProps) {
		if (this.props.currentScreen !== prevProps.currentScreen) {
			if (this.props.currentScreen) {
				Animated.sequence([
					Animated.timing(this.state.animationValue, {
						useNativeDriver: true,
						duration: 0,
						toValue: this.props.animDirection,
					}),
					Animated.timing(this.state.animationValue, { useNativeDriver: true, toValue: 0, duration: 200 }),
				]).start()
			} else {
				// Else, this is not current screen anymore. But it was, so value = 0
				Animated.sequence([
					Animated.timing(this.state.animationValue, {
						useNativeDriver: true,
						duration: 0,
						toValue: 0,
					}),
					Animated.timing(this.state.animationValue, {
						useNativeDriver: true,
						toValue: -this.props.animDirection,
						duration: 200,
					}),
				]).start()
			}
		}
	}

	render() {
		const { children } = this.props
		return (
			<Animated.View
				style={[
					{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						transform: [
							{
								translateX: this.state.animationValue.interpolate({
									inputRange: [-1, 0, 1],
									outputRange: [-width, 0, width],
								}),
							},
						],
					},
				]}
			>
				{children}
			</Animated.View>
		)
	}
}
