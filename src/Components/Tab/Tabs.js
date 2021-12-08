import React from 'react';
import MuiTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from './TabPanel';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const createComponents = ((component, params) => {
	if (typeof component !== "undefined") {
		return React.createElement(component, {
			params: params,
		});
	}
});

const Tabs = ({ params, itemTabs }) => {
	const [tabNumber, setTabNumber] = React.useState(0);
	const handleChange = (event, newValue) => {
		setTabNumber(newValue);
	};
	return (
		<div>
			<MuiTabs
				value={tabNumber}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="on"
				indicatorColor="primary"
				textColor="primary"
				aria-label="scrollable force tabs example">

				{itemTabs.map((item, index) => {
					return <Tab key={index} label={item.title} {...a11yProps(index)} />
				})}
			</MuiTabs>
			{
				itemTabs.map((item, index) => {
					return <TabPanel key={index} value={tabNumber} index={index}>
						{createComponents(item.component, params)}
					</TabPanel>
				})
			}
		</div>
	);
}

export { Tabs }