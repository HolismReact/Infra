import EventManager from "./EventManager";
import Validation from "./Validation";
import Push from './Push';
import Account from './Account';
import Holism from "./Holism";
import Messaging from "./Messaging";

const app = {
    ...EventManager,
    ...Validation,
    ...Push,
    ...Account,
    ...Messaging,
    ...Holism
};

export default app;

export { app };