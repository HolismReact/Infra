import EventManager from "./EventManager";
import Validation from "./Validation";
import Push from './Push';
import Account from './Account';
import Holism from "./Holism";
import Messaging from "./Messaging";
import List from "./List";
import Globalization from './Globalization';

const app = {
    ...EventManager,
    ...Validation,
    ...Push,
    ...Account,
    ...Messaging,
    ...List,
    ...Holism,
    ...Globalization
};

export default app;

export { app };