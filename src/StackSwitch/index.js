import React, { Component } from 'react'
import { Switch, Route } from 'react-router-native'
import { View } from 'react-native'

import StackAnim from './StackAnim'

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
		}
	}

	componentWillMount() {
		// Fill the stack with initial route
		const newStack = this.state.stack
		newStack.push(this.props.history.location)
		this.setState({
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

		// We want to handle anything you can do to history
		// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md
		// Let's handle PUSH, POP and REPLACE. We make our `stack` state reflect the history
		if (nextProps.history.action === 'PUSH') {
			// We'll effectively remove the locations after our index here
			// Get until current location
			const newStack = [...stack.slice(0, nextProps.history.index - initialIndex), nextProps.location]
			this.setState({ stack: newStack, currentIndex: nextProps.history.index, animDirection: 1 })
		} else if (nextProps.history.action === 'REPLACE') {
			const newStack = [
				...stack.slice(0, Math.max(nextProps.history.index - initialIndex - 1, 0)),
				nextProps.location,
				...stack.slice(nextProps.history.index - initialIndex + 1),
			]
			this.setState({ stack: newStack, currentIndex: nextProps.history.index, animDirection: 0 })
		} else if (nextProps.history.action === 'POP') {
			// POP happens when go() is called. So goForward and goBack will end up here.
			// But we don't really care what happens since we're not doing anything to the stack.
			// The only thing we need to know here is what animation to play

			const step = nextProps.history.index - this.state.currentIndex

			if (step > 0) {
				this.setState({ currentIndex: nextProps.history.index, animDirection: 1 })
			} else {
				this.setState({ currentIndex: nextProps.history.index, animDirection: -1 })
			}
		}
		return
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* Here, we render every page(to maintain state) but only show the one currently active */}
				{this.state.stack.map((location, index) => {
					// We use a Switch here to know which Route to render by passing the location on the stack
					return (
						<StackAnim
							key={`anim_${index}`}
							animDirection={this.state.animDirection}
							currentScreen={this.props.history.index === this.state.initialIndex + index}
						>
							{/* The key will make sure PUSH creates a component instead of using old ones */}
							<Switch key={location.key} location={location}>
								{this.props.children}
							</Switch>
						</StackAnim>
					)
				})}
			</View>
		)
	}
}

// inject location as a prop so we can listen for changes
const RouteWrapper = props => (
	<Route children={({ history, location }) => <StackSwitch location={location} history={history} {...props} />} />
)

export default RouteWrapper
