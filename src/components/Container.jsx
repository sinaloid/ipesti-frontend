export const Container = ({children}) => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-10 mx-auto my-1 my-md-5">{children}</div>
            </div>
        </>
    );
};
