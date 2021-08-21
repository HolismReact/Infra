import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
