import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BackButton, Switch, Route } from 'react-router-native'
import { View } from 'react-native'
import cloneDeep from 'clone-deep'

import StackAnim from './StackAnim'
import UpdateIfMatch from '../utils/UpdateIfMatch'

import { getTransitionConfig } from './StackViewTransitionConfigs'

const propTypes = {
	mode: PropTypes.oneOf(['card', 'modal']),
	transitionConfig: PropTypes.func,
}

const defaultProps = {
	mode: 'card',
	transitionConfig: null,
}

// This component handles the behaviour of Stack. Informations are processed then passed to StackAnim.
class StackSwitch extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// The `stack` state is an array of `location` object
			// We can know which Route to render from that object through Switch
			// This will allow us to keep track of `Pages` on the screen
			stack: [],
			// We need initialIndex for nesting since it could start from !== 0 (Used to pad stack)
			initialIndex: 0,
			// Used to see what the POP action actually means
			currentIndex: 0,
			animDirection: 0, // [-1,0,1]
			currentHistory: cloneDeep(this.props.history),
			prevHistory: cloneDeep(this.props.history),
		}
	}

	componentWillMount() {
		// Fill the stack with initial route
		const newStack = this.state.stack
		newStack.push(this.props.history.location)
		this.setState({
			animating: true,
			stack: newStack,
			initialIndex: this.props.history.index,
			currentIndex: this.props.history.index,
		})
	}

	// When prop is changed, we need to know what action it is and handle accordingly
	componentWillReceiveProps(nextProps) {
		// This happens when other prop change, go(0) or iindexf there's no history in the stack(goes out of bound, eg: go(-999)).
		if (nextProps.location === this.props.location) {
			return
		}

		// Something to take note here:
		// History is mutable. so nextProps.history and this.props.history is the same

		const { stack, initialIndex } = this.state

		let stateToUpdate = {
			animating: true,
		}

		// Here we try to get the last history and current history. Again, because history is mutable
		const deepClonedHistory = cloneDeep(this.props.history)
		if (deepClonedHistory !== this.state.currentHistory) {
			stateToUpdate = {
				...stateToUpdate,
				prevHistory: this.state.currentHistory,
				currentHistory: deepClonedHistory,
			}
		}

		// We want to handle anything you can do to history
		// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md
		// Let's handle PUSH, POP and REPLACE. We make our `stack` state reflect the history
		if (nextProps.history.action === 'PUSH') {
			// We'll effectively remove the locations after our index here
			// Get until current location
			const newStack = [...stack.slice(0, nextProps.history.index - initialIndex), nextProps.location]
			this.setState({
				...stateToUpdate,
				stack: newStack,
				currentIndex: nextProps.history.index,
				animDirection: -1,
			})
		} else if (nextProps.history.action === 'REPLACE') {
			const newStack = [
				...stack.slice(0, Math.max(nextProps.history.index - initialIndex - 1, 0)),
				nextProps.location,
				...stack.slice(nextProps.history.index - initialIndex + 1),
			]
			this.setState({
				...stateToUpdate,
				animating: false,
				stack: newStack,
				currentIndex: nextProps.history.index,
				animDirection: 0,
			})
		} else if (nextProps.history.action === 'POP') {
			// POP happens when go() is called. So goForward and goBack will end up here.
			// But we don't really care what happens since we're not doing anything to the stack.
			// The only thing we need to know here is what animation to play

			const step = nextProps.history.index - this.state.currentIndex

			if (step > 0) {
				this.setState({ ...stateToUpdate, currentIndex: nextProps.history.index, animDirection: -1 })
			} else {
				this.setState({ ...stateToUpdate, currentIndex: nextProps.history.index, animDirection: 1 })
			}
		}
		return
	}

	render() {
		return (
			<BackButton>
				<View style={{ flex: 1 }}>
					{/* Here, we render every page(to maintain state) but only show the one currently active */}
					{this.state.stack.map((location, index) => {
						return (
							<UpdateIfMatch
								key={`stack_${index}`}
								match={this.props.history.index === this.state.initialIndex + index}
							>
								<StackAnim
									// TODO: Here, we can improve performance by not updating those that doesn't need to be animated
									// key={`stack_anim_${index}`}
									animating={this.state.animating}
									onFinishedAnimating={() => {
										if (this.state.animating) {
											this.setState({ animating: false })
										}
									}}
									transitionConfigObject={getTransitionConfig(
										this.props.transitionConfig,
										this.state.currentHistory,
										this.state.prevHistory,
										this.props.mode === 'modal',
									)}
									animDirection={this.state.animDirection}
									currentScreen={this.props.history.index === this.state.initialIndex + index}
								>
									{/* We use a Switch here to know which Route to render by passing the location on the stack */}
									{/* The key will make sure PUSH creates a component instead of using old ones */}
									<Switch key={location.key} location={location}>
										{this.props.children}
									</Switch>
								</StackAnim>
							</UpdateIfMatch>
						)
					})}
				</View>
			</BackButton>
		)
	}
}

StackSwitch.propTypes = propTypes
StackSwitch.defaultProps = defaultProps

// inject location as a prop so we can listen for changes
const RouteWrapper = props => (
	<Route children={({ history, location }) => <StackSwitch location={location} history={history} {...props} />} />
)

export default RouteWrapper
