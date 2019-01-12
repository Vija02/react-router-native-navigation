import React, { Component } from 'react'
import BottomNavigationSwitch from '../BottomNavigationSwitch'
import { matchPath, withRouter } from 'react-router-native'
import { BottomNavigation } from 'react-native-material-ui'

class BottomNavigationIndex extends Component {
	render() {
		return (
			<React.Fragment>
				<BottomNavigationSwitch
					enableBackButton={false}
					lazy={false} // true
				>
					{this.props.renderTab.map((tab, i) =>
						React.cloneElement(tab.routeComponent, { key: `routeTab_${i}` }),
					)}
				</BottomNavigationSwitch>
				<BottomNavigation hidden={false}>
					{this.props.renderTab.map((tabData, i) => {
						const {
							icon,
							label,
							style,
							routeComponent: { props: { path, exact, strict, sensitive } },
							...tabProp
						} = tabData

						const historyFn =
							this.props.navigationMethod === 'push'
								? this.props.history.push
								: this.props.history.replace

						return (
							// We need React.Fragment to manually set the active prop
							<React.Fragment key={`bottomNavAction_${i}`}>
								<BottomNavigation.Action
									icon={icon}
									label={label}
									active={
										!!matchPath(this.props.location.pathname, { path, exact, strict, sensitive })
									}
									onPress={() => historyFn('/')}
									{...tabProp}
								/>
							</React.Fragment>
						)
					})}
				</BottomNavigation>
			</React.Fragment>
		)
	}
}

export default withRouter(BottomNavigationIndex)
