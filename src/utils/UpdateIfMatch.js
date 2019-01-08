import { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
	match: PropTypes.bool,
}

const defaultProps = {
	match: false,
}
// We don't want the screen/page to keep updating even when nothing's happening there
// This component just checks if there's changes and block it if there's none
class UpdateIfMatch extends Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.match !== this.props.match || nextProps.children !== this.props.children
	}

	render() {
		return this.props.children
	}
}

UpdateIfMatch.propTypes = propTypes
UpdateIfMatch.defaultProps = defaultProps
export default UpdateIfMatch
