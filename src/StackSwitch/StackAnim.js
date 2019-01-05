import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'

const propTypes = {
	transitionConfig: PropTypes.func,
}

const defaultProps = {
	transitionConfig: null,
}

// This Component gets info through props and is responsible to handle all the animation
class StackAnim extends Component {
	constructor(props) {
		super(props)
		this.state = { animationValue: new Animated.Value(0) }

		this.runAnimation = this.runAnimation.bind(this)
	}

	componentDidMount() {
		this.runAnimation(this.props.animDirection, 0, this.props.transitionConfig)
	}

	componentDidUpdate(prevProps) {
		if (this.props.currentScreen !== prevProps.currentScreen) {
			if (this.props.currentScreen) {
				this.runAnimation(this.props.animDirection, 0, this.props.transitionConfig)
			} else {
				// Else, this is not current screen anymore. But it was, so value = 0
				this.runAnimation(0, -this.props.animDirection, this.props.transitionConfig)
			}
		}
	}

	runAnimation(initialValue, toValue, transitionConfig) {
		const { animatedFunction, config } = transitionConfig
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
					this.props.transitionConfig.style(this.state.animationValue),
				]}
			>
				{children}
			</Animated.View>
		)
	}
}

StackAnim.propTypes = propTypes
StackAnim.defaultProps = defaultProps
export default StackAnim
