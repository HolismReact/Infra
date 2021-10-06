import EventManager from "./EventManager";
import Validation from "./Validation";
import Push from './Push';
import Account from './Account';
import Holism from "./Holism";

const app = {
    ...EventManager,
    ...Validation,
    ...Push,
    ...Account,
    ...Holism
};

export default app;

export { app };