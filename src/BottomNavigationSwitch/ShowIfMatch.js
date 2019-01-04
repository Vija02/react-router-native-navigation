import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import UpdateIfMatch from '../utils/UpdateIfMatch'

const propTypes = {
	match: PropTypes.bool,
	lazy: PropTypes.bool,
}

const defaultProps = {
	match: false,
	lazy: false,
}

class ShowIfMatch extends Component {
	constructor(props) {
		super(props)
		this.state = { rendered: false }
	}

	componentDidUpdate() {
		if (this.props.match && !this.state.rendered) {
			this.setState({ rendered: true })
		}
	}

	render() {
		const match = this.props.match
		if (!match && this.props.lazy && !this.state.rendered) {
			return null
		}
		return (
			<UpdateIfMatch match={match}>
				<View style={match ? styles.flexFull : styles.displayNone}>{this.props.children}</View>
			</UpdateIfMatch>
		)
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

ShowIfMatch.propTypes = propTypes
ShowIfMatch.defaultProps = defaultProps
export default ShowIfMatch
