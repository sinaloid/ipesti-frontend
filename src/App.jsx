import { useEffect } from "react";
import AppRoute from "./routes/AppRoute";
//import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const App = () => {
    const location = useLocation();
    useEffect(() => {
        
        //ReactGA.send(location.pathname + location.search);
        //ReactGA.send({ hitType: "pageview", page: location.pathname + location.search, title: "Custom Title" })
        console.log(location.pathname + location.search);
    }, [location]);

    //function handleClick() {
        // Track a custom event
        /*ReactGA.event({
            category: "Button Click",
            action: "Compteur de click",
            label: "Page d'accueil",
        });*/
        // Continue with your button's click handler
        //setCount((count) => count + 1);
   // }
    return (
        <>
            <AppRoute type={"app"} />
        </>
    );
};

export default App;
