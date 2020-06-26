/********************************************************************************
 * Copyright (c) 2020 Cedalo AG
 *
 * This program and the accompanying materials are made available under the 
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 ********************************************************************************/
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default class ResourceHeaderButton extends React.Component {
	static propTypes = {
		icon: PropTypes.func.isRequired,
		state: PropTypes.bool,
		onChange: PropTypes.func,
		label: PropTypes.object
	};

	static defaultProps = {
		state: false,
		label: '',
		onChange: () => console.log('state handle'),
	};

	render() {
		const MyIcon = this.props.icon;
		const {label, state, onChange} = this.props;
		return (
			<Tooltip
				enterDelay={300}
				title={label}
			>
				<div
					style={{
						display: 'inline',
					}}
				>
					<IconButton
						onClick={onChange}
						disabled={state === true}
						style={{
							// marginTop: '5px',
							color: state === true
								? 'grey' : 'white',
							width: '30px',
							height: '30px',
							padding: '0px',
						}}
					>
						<MyIcon/>
					</IconButton>
				</div>
			</Tooltip>
		);
	}
}
