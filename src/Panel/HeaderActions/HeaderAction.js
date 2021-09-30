import HolismIcon from "../../Components/HolismIcon"
import Tooltip from '@material-ui/core/Tooltip';

const HeaderAction = ({ icon, title, url, action, component }) => {
    return <>
        <Tooltip title={title || ""}>
            <div
                onClick={() => {
                    action && typeof action === 'function'
                        ?
                        action()
                        :
                        null
                }}
                className={("ml-6 ") + 'text-gray-600 cursor-pointer hover:text-blue-500'}
            >
                <HolismIcon icon={icon} />
            </div>
        </Tooltip>
    </>
}

export { HeaderAction }