const LoginLayout = ({ children }) => {
    return (
        <>
            <div>
                <div className="container">
                    <div className="content">{children}</div>
                </div>
            </div>
        </>
    );
};

export default LoginLayout;
