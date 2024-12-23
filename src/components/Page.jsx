import { Footer } from "./Footer";
import { Header } from "./Header";

export const Page = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};
