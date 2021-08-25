import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import MuiTabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './TabPanel';
import { makeStyles } from '@material-ui/core/styles';


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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '900px',
		backgroundColor: theme.palette.background.paper,
	},
}));


const Tabs = ({ params, itemTabs }) => {
	const [tabNumber, setTabNumber] = React.useState(0);
	const classes = useStyles();
	const handleChange = (event, newValue) => {
		setTabNumber(newValue);
	};
	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
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
			</AppBar>

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