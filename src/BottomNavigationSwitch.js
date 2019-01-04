import React, { Component } from 'react'
import { View, BackHandler, StyleSheet } from 'react-native'
import { withRouter, Route } from 'react-router-native'

// TODO: Proptypes

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

export default withRouter(BottomNavigationSwitch)

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
