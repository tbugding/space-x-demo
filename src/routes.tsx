import {createHashRouter} from "react-router-dom";
import Home from './pages/home'
import Details from "./pages/details";

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/details/:id",
        element: <Details />,
    },
]);

export default router