import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { BackButton, withRouter, Route } from 'react-router-native'

import ShowIfMatch from './ShowIfMatch'

const propTypes = {
	lazy: PropTypes.bool,
}

const defaultProps = {
	lazy: false,
}

class BottomNavigationSwitch extends Component {
	render() {
		return (
			<BackButton>
				<View style={styles.flexFull}>
					{(() => {
						let matched = false

						return this.props.children.map((child, i) => (
							<Route
								key={`route_${i}`}
								path={child.props.path}
								exact={child.props.exact}
								strict={child.props.strict}
								sensitive={child.props.sensitive}
								children={({ match }) => {
									let isMatched = false

									if (!matched && !!match) {
										isMatched = true
										matched = true
									}
									return (
										<ShowIfMatch match={isMatched} lazy={this.props.lazy}>
											{/* We make the route always render by always matching the path */}
											{React.cloneElement(child, {
												location: { pathname: child.props.path },
											})}
										</ShowIfMatch>
									)
								}}
							/>
						))
					})()}
				</View>
			</BackButton>
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
