import React, { useState } from 'react';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Panel from './Panel';


const Tabs = ({ tabs }) => {

	const [tabNumber, setTabNumber] = useState(0);
	var tabsArray = React.Children.toArray(tabs)[0].props.children;

	return <div>
		<div
			style={{ maxWidth: '100vw' }}
			className="overflow-x-auto flex justify-center"
		>
			<MuiTabs
				value={tabNumber}
				onChange={(event, number) => setTabNumber(number)}
				variant="scrollable"
				scrollButtons="auto"
			>

				{
					tabsArray.map(tab => {
						const Icon = tab.props.icon
						return <MuiTab
							key={tab.props.title}
							label={tab.props.title}
							icon={tab.props.icon ? <Icon /> : null}
						/>
					})
				}
			</MuiTabs>
		</div>
		<div>
			{
				tabsArray.map((tab, index) => {
					return <Panel
						key={index}
						value={tabNumber}
						index={index}
					>
						{tab.props.panel}
					</Panel>
				})
			}
		</div>
	</div>
}

export { Tabs }