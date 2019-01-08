import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions } from 'react-native'
import { withRouter } from 'react-router-native'

const { height } = Dimensions.get('window')

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
		const { transitionSpec } = transitionConfig()

		this.state.animationValue.setValue(initialValue)
		transitionSpec
			.timing(this.state.animationValue, {
				toValue,
				...transitionSpec,
			})
			.start(this.props.onFinishedAnimating)
	}

	render() {
		const { children } = this.props

		const shouldShow = this.props.currentScreen || this.props.animating
		const viewStyle = shouldShow
			? {
					display: 'flex',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}
			: {
					display: 'none',
				}

		return (
			<Animated.View
				pointerEvents={this.props.animating ? 'none' : 'auto'}
				style={[
					viewStyle,
					this.props.transitionConfig().containerStyle || {},
					this.props.transitionConfig().screenInterpolator({
						layout: {
							isMeasured: true,
							initHeight: height,
						},
						history: this.props.history,
						position: this.state.animationValue,
						scenes: this.props.history.entries,
						scene: this.props.location,
						index: this.props.history.index,
					}),
				]}
			>
				{children}
			</Animated.View>
		)
	}
}

StackAnim.propTypes = propTypes
StackAnim.defaultProps = defaultProps
export default withRouter(StackAnim)
