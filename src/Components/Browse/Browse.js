import Filtering from "../List/Filtering";
import Sorting from "../List/Sorting";
import Items from "../List/Items";

const Browse = ({ sorts, filters, row, card, entity, headers }) => {
    return <div>
        <Filtering filters={filters} />
        <Sorting sorts={sorts} />
        <Items
            entity={entity}
            headers={headers}
            row={row}
            card={card}
        />
    </div>
}

export { Browse };
export { Text } from '../List/Filters/Text';
export { Enum } from '../List/Filters/Enum';
export { Ascending } from '../List/Sorts/Ascending';