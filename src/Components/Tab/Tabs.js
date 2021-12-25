import React, { useState } from 'react';
import MuiTabs from '@mui/material/Tabs';
import Tab from './Tab';
import Panel from './Panel';

const Tabs = ({ tabs }) => {

	const [tabNumber, setTabNumber] = useState(0);

	return <div>
		<div style={{ maxWidth: '100vw' }} className="overflow-x-auto flex justify-center">
			<MuiTabs
				value={tabNumber}
				onChange={(event, number) => setTabNumber(number)}
				variant="scrollable"
				scrollButtons="on"
				indicatorColor="primary"
				textColor="primary">

				{tabs.map((item, index) => {
					return <Tab
						key={index}
						title={item.title}
						icon={item.icon}
					/>
				})}
			</MuiTabs>
		</div>
		<div>
			{
				tabs.map((item, index) => {
					return <Panel key={index} value={tabNumber} index={index}>
						{item.panel}
					</Panel>
				})
			}
		</div>
	</div>
}

export { Tabs }