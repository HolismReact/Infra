import { HeaderAction } from "./HeaderAction"
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Holism from "../../Base/Holism";

const Maximize = () => {
    return <HeaderAction
        title="Maximize"
        icon={ExpandLessIcon}
        action={() => Holism.emit(Holism.makeRoom)}
    />
}

export { Maximize }