import { ListContext, app } from '@List';
import Node from './Node'

const Tree = ({
    entityType,
    data,
    itemActions,
    hasDelete,
    hasEdit,
    edit,
    create,
    upsert,
    setItem,
    reload,
    hasItemSelection,
    classProvider,
    showTopPagiation,
    noItemIsFoundStyle,
    expanded,
    show

}) => {
    return data.length === 0
        ?
        <div className={noItemIsFoundStyle}>{app.t("No item is found")}</div>
        :
        <ul className="w-full px-6">
            {
                data.map(entity => <Node
                    key={entity.id}
                    entity={entity}
                    expanded={expanded || true}
                    show={show}
                />)
            }
        </ul>
}

export default Tree

export { Tree }