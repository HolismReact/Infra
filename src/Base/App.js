import EventManager from "./EventManager";
import Validation from "./Validation";

const app = {
    ...EventManager,
    ...Validation,
};

export default app;

export { app };