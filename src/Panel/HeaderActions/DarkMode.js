import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import app from '../../Base/App'
import { HeaderAction } from './HeaderAction';
import useLocalStorageState from '../../Base/UseLocalStorageState';

const DarkMode = () => {
    const [isDark, setIsDark] = useLocalStorageState(false, `isDark_${app.userGuid()}`);

    return <HeaderAction
        title={isDark ? 'Go light' : 'Go dark'}
        icon={isDark ? LightModeIcon : DarkModeIcon}
        action={() => {
            setIsDark(!isDark);
        }}
    />
}

export default DarkMode;