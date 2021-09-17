import Icon from '@material-ui/core/Icon';

const HolismIcon = ({ icon }) => {
    console.log(icon);
    switch (typeof icon) {
        case 'object':
            const iconType = typeof icon?.type;
            if (
                iconType === 'function'
                || (iconType === 'object' && typeof icon.type?.render ===
                    'function')) {
                const Icon = icon
                return <Icon />;
            }
            if (icon.props) {
                return icon;
            }
            return <>{icon}</>;
        case 'function':
            return icon()
        case 'string':
            if (icon.indexOf('svg') > -1) {
                return icon;
            }
            return <Icon>{icon}</Icon>;
        default:
            return <span>Iconless</span>;
    }
}

export default HolismIcon;