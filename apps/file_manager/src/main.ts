import "./app.css";
import App from "./App.svelte";

const app = new App({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target: document.getElementById("app"),
});

export default app;
