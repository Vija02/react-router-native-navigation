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

						return this.props.children.map((child, i) => {
							let elementToRender = () => null

							if (!!child.props.component) {
								elementToRender = props => <child.props.component {...props} />
							} else if (!!child.props.render) {
								elementToRender = props => child.props.render(props)
							} else {
								elementToRender = props => child.props.children(props)
							}

							return (
								<Route
									key={`route_${i}`}
									path={child.props.path}
									exact={child.props.exact}
									strict={child.props.strict}
									sensitive={child.props.sensitive}
									children={props => {
										const { match } = props

										let isMatched = false

										// We do this so only the first matched route renders
										if (!matched && !!match) {
											isMatched = true
											matched = true
										}
										return (
											<ShowIfMatch match={isMatched} lazy={this.props.lazy}>
												{elementToRender(props)}
											</ShowIfMatch>
										)
									}}
								/>
							)
						})
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
