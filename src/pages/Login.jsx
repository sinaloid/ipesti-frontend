import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

import request from "../services/request";
import endPoint from "../services/endPoint";
import { useFormik } from "formik";
import { Input } from "../components/Input";
import { useContext, useEffect } from "react";
import { AppContext } from "../services/context";
import { AppLink } from "../routes/AppLink";

const initLogin = {
    login: "",
    password: "",
};
export const Login = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AppContext);
    const { user, onUserChange } = authCtx;
    useEffect(() => {
        isAuth();
    }, [user.isAuth]);
    const formik = useFormik({
        initialValues: initLogin,
        onSubmit: (values) => {
            login({
                email: values.login,
                number: values.login,
                password: values.password,
            });
        },
    });

    const login = (values) => {
        request
            .post(endPoint.login, values)
            .then((res) => {
                onUserChange({
                    isAuth: true,
                    type: "",
                    name: res.data.user.lastname + " " + res.data.user.firstname,
                    photo: res.data.user.image,
                    role: res.data.user.type,
                    isActive: res.data.user.isActive,
                    //roles: res.data.roles,
                    token: res.data.access_token,
                    //refreshToken: res.data.refreshToken,
                });
                isAuth();
                console.log(res.data);

            })
            .catch((error) => {
                console.log(error);
            });
    };

    const isAuth = () => {
        if (user.isAuth === true && user.token != null && user.token !== "") {
            console.log(`connexion reussi, isAuth: ${user}`);
            console.log(user);

            return navigate("/dashboard/" + AppLink.actualites_dashboard);
        }
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-3 mx-auto">
                    <div className="h-100 pt-5 position-relative">
                        <div className="text-start">
                            <img width="100px" src={logo} alt="login image" />
                            <h1>Connexion</h1>
                            <p>Heureux de vous revoir</p>
                        </div>
                        <Input
                            type={"text"}
                            placeholder="Email"
                            name={"login"}
                            formik={formik}
                        />
                        <Input
                            type={"password"}
                            placeholder="Mot de passe"
                            name={"password"}
                            formik={formik}
                        />
                        <button
                            className="btn btn-primary w-100"
                            onClick={formik.handleSubmit}
                        >
                            Se connecter
                        </button>
                        <p className="text-start mt-3">
                            En cas de perte du mot de passe, veuillez contacter
                            un administrateur
                        </p>
                        <p className="position-absolute1 bottom-01 mt-5">
                            © 2023 IPESTI. Tous droits reservés.
                        </p>
                    </div>
                </div>
                {/**
           * <div className="d-none d-md-block col-md-9 px-0">
          <div className="login-img-container overflow-hidden">
            <img className="login-img" src={login} alt="login image" />
          </div>
        </div>
           */}
            </div>
        </div>
    );
};
