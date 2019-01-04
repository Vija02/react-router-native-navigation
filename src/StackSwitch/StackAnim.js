import React, { Component } from 'react'
import { Animated, Dimensions } from 'react-native'

// TODO:PROPTYPES
// This Component gets info through props and is responsible to handle all the animation
export default class StackAnim extends Component {
	constructor(props) {
		super(props)
		this.state = { animationValue: new Animated.Value(0) }

		this.runAnimation = this.runAnimation.bind(this)
	}

	componentDidMount() {
		this.runAnimation(this.props.animDirection, 0, this.props.animationProp)
	}

	componentDidUpdate(prevProps) {
		if (this.props.currentScreen !== prevProps.currentScreen) {
			if (this.props.currentScreen) {
				this.runAnimation(this.props.animDirection, 0, this.props.animationProp)
			} else {
				// Else, this is not current screen anymore. But it was, so value = 0
				this.runAnimation(0, -this.props.animDirection, this.props.animationProp)
			}
		}
	}

	runAnimation(initialValue, toValue, animationProp) {
		const { animatedFunction, config } = animationProp
		this.state.animationValue.setValue(initialValue)
		animatedFunction(this.state.animationValue, {
			toValue,
			...config,
		}).start()
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
					},
					this.props.animationProp.style(this.state.animationValue),
				]}
			>
				{children}
			</Animated.View>
		)
	}
}
