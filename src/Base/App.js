import EventManager from "./EventManager";
import Validation from "./Validation";
import Pusher from './Pusher';

const app = {
    ...EventManager,
    ...Validation,
};

export default app;

export { app };