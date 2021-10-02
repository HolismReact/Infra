import EventManager from "./EventManager";
import Validation from "./Validation";
import Push from './Push';
import Account from './Account';

const app = {
    ...EventManager,
    ...Validation,
    ...Push,
    ...Account
};

export default app;

export { app };