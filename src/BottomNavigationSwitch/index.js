import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, BackHandler, StyleSheet } from 'react-native'
import { withRouter, Route } from 'react-router-native'

import ShowIfMatch from './ShowIfMatch'

const propTypes = {
	lazy: PropTypes.bool,
}

const defaultProps = {
	lazy: false,
}

// TODO: We need to make this behave like switch (Only render one thing and one thing only)

class BottomNavigationSwitch extends Component {
	componentDidMount() {
		this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
			if (this.props.history.canGo(-1)) {
				this.props.history.goBack()
				return true
			}
			return false
		})
	}

	componentWillUnmount() {
		this.backHandler.remove()
	}

	render() {
		return (
			<View style={styles.flexFull}>
				{this.props.children.map((child, i) => (
					<Route
						key={`route_${i}`}
						path={child.props.path}
						exact={child.props.exact}
						strict={child.props.strict}
						sensitive={child.props.sensitive}
						children={({ match }) => (
							<ShowIfMatch match={!!match} lazy={this.props.lazy}>
								{/* We make the route always render by always matching the path */}
								{React.cloneElement(child, {
									location: { pathname: child.props.path },
								})}
							</ShowIfMatch>
						)}
					/>
				))}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	flexFull: {
		display: 'flex',
		flex: 1,
	},
})

BottomNavigationSwitch.propTypes = propTypes
BottomNavigationSwitch.defaultProps = defaultProps
export default withRouter(BottomNavigationSwitch)
