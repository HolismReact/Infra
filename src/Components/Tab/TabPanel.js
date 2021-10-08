import PropTypes from 'prop-types';

export default function TabPanel({ children, value, index, ...other }) 
{
    return (
        <>
            {
                value === index && (children)
            }
        </>
    );
}
        
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
