import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Route } from 'react-router-native'

// TODO: Proptypes

export default class BottomNavigationSwitch extends Component {
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
							<ShowIfMatch match={match}>
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

class ShowIfMatch extends Component {
	// This will prevent update calls to the component if it's not matched
	shouldComponentUpdate(nextProps) {
		return nextProps.match !== this.props.match
	}

	render() {
		const match = this.props.match
		return <View style={match ? styles.flexFull : styles.displayNone}>{this.props.children}</View>
	}
}

const styles = StyleSheet.create({
	flexFull: {
		display: 'flex',
		flex: 1,
	},
	displayNone: {
		display: 'none',
	},
})
