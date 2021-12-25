import MuiTab from '@mui/material/Tab';

const Tab = ({ title, icon, panel }) => {
    const Icon = icon;
    return <MuiTab
        label={title}
        icon={<Icon />}
    />
}

export default Tab
export { Tab }