import EventManager from "./EventManager";
import Validation from "./Validation";
import Push from './Push';
import Account from './Account';
import Holism from "./Holism";
import Messaging from "./Messaging";
import List from "./List";
import Form from "./Form";
import Globalization from './Globalization';
import Url from './Url';

const app = {
    ...EventManager,
    ...Validation,
    ...Push,
    ...Account,
    ...Messaging,
    ...List,
    ...Form,
    ...Holism,
    ...Globalization,
    ...Url
};

export default app;

export { app };