import React from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
		<div className="hi" style={{ width: 'calc(100vw - 2.5rem - 18rem)' }}>
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