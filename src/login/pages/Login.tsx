import { useEffect, useRef, useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
// import { assert } from "keycloakify/tools/assert";
// import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
//import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import ODSButton from "oute-ds-button";
import ODSTextField from "oute-ds-text-field";
// import ODSLabel from "oute-ds-label";
import { googlelogo } from "../assets";
// import Icon from "oute-ds-icon";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    useEffect(() => {
        document.title = "Tiny Command";
    }, []);
    const getLogo = (name: unknown) => {
        switch (name) {
            case "google":
                return googlelogo;
            default:
                console.log("Invalid option");
        }
    };
    const paswordref = useRef(null);
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    // const { kcClsx } = getKcClsx({
    //     doUseDefaultCss,
    //     classes
    // });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            headerMsg="Login"
            subHeadermsg="Welcome back! Please enter your details"
            registerUrl={url.registrationUrl}
            // infoNode={
            //     // <div id="kc-registration-container">
            //     //     <div id="kc-registration">
            //     //         <span>
            //     //             {msg("noAccount")}{" "}
            //     //             <a tabIndex={8} href={url.registrationUrl}>
            //     //                 {msg("doRegister")}
            //     //             </a>
            //     //         </span>
            //     //     </div>
            //     // </div>

            // }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className="social-providers-btn">
                            {/* <h2>{msg("identity-provider-login-label")}</h2> */}
                            <ul
                                // className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}
                                style={{ display: "grid", gridAutoRows: "max-content", gap: "1.1rem" }}
                            >
                                {social.providers.map((...[p]) => (
                                    <li key={p.alias}>
                                        <a
                                            style={{ textDecoration: "none" }}
                                            id={`social-${p.alias}`}
                                            // className={kcClsx(
                                            //     "kcFormSocialAccountListButtonClass",
                                            //     providers.length > 3 && "kcFormSocialAccountGridItem"
                                            // )}
                                            // type="button"
                                            href={p.loginUrl}
                                        >
                                            {/* {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span> */}
                                            <ODSButton
                                                // startIcon={`${p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}`}
                                                label={`${kcContext.pageId == "login.ftl" ? "Sign In" : "Register"} with ${p.displayName}`}
                                                startIcon={<img src={getLogo(p.alias)} alt="Google Logo" style={{ height: "1.3rem" }} />}
                                                size="large"
                                                sx={{ color: "#000", fontFamily: "Inter" }}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </a>
                                        {/* <ODSButton
                                            // startIcon={`${p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}`}
                                            label={p.displayName}
                                            sx={{ color: "#000" }}
                                            fullWidth
                                            variant="outlined"
                                        /> */}
                                    </li>
                                ))}
                            </ul>
                            <div className="seperation-line">
                                <hr style={{ height: "0.5px" }} />
                                <p style={{ margin: "0px" }}>or</p>
                                <hr style={{ height: "0.5px" }} />
                            </div>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div>
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            className="login-form"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className="input-credentials">
                                    {/* <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                        {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")}
                                    </label> */}
                                    {/* <input
                                        tabIndex={2}
                                        id="username"
                                        className={kcClsx("kcInputClass")}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    /> */}
                                    {messagesPerField.existsError("username", "password")}
                                    <ODSTextField
                                        placeholder={
                                            !realm.loginWithEmailAllowed
                                                ? "Username"
                                                : !realm.registrationEmailAsUsername
                                                  ? "Username or Email"
                                                  : "Email"
                                        }
                                        defaultValue={login.username ?? ""}
                                        name="username"
                                        tabIndex={2}
                                        id="username"
                                        autoFocus
                                        fullWidth
                                        errorType="icon"
                                        error={messagesPerField.existsError("username", "password")}
                                        helperText={
                                            (messagesPerField.existsError("username", "password") &&
                                                kcSanitize(messagesPerField.getFirstError("username", "password"))) ||
                                            ""
                                        }
                                        sx={{
                                            marginBottom: "0.5rem",
                                            "& .MuiOutlinedInput-root": {
                                                backgroundColor: "#fff" // Set the background to white
                                                // height: {
                                                //     xl: "2.75rem",
                                                //     lg: "2.062rem",
                                                //     md: "2.0143rem",
                                                //     sm: "1.479rem"
                                                // }
                                            },
                                            "& .MuiInputBase-input": {
                                                fontWeight: 400, // Change the font weight (e.g., bold)
                                                color: "#607D8B",
                                                fontFamily: "Inter"
                                            }
                                        }}
                                    />
                                    <div className="password-block">
                                        <ODSTextField
                                            ref={paswordref}
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            tabIndex={3}
                                            id="password"
                                            fullWidth
                                            errorType="icon"
                                            error={messagesPerField.existsError("username", "password")}
                                            helperText={
                                                (messagesPerField.existsError("username", "password") &&
                                                    kcSanitize(messagesPerField.getFirstError("username", "password"))) ||
                                                ""
                                            }
                                            sx={{
                                                marginBottom: "0.5rem",
                                                fontFamily: "Inter",
                                                "& .MuiOutlinedInput-root": {
                                                    backgroundColor: "#fff" // Set the background to white
                                                    // height: {
                                                    //     xl: "2.75rem",
                                                    //     lg: "2.062rem",
                                                    //     md: "2.0143rem",
                                                    //     sm: "1.479rem"
                                                    // }
                                                }
                                            }}
                                            // aria-invalid={messagesPerField.existsError("username", "password")}
                                            // helperText={kcSanitize(messagesPerField.getFirstError("username", "password")) || ""}
                                        />

                                        <div className="forgot-password">
                                            {realm.resetPasswordAllowed && (
                                                <span>
                                                    <a
                                                        tabIndex={6}
                                                        href={url.loginResetCredentialsUrl}
                                                        style={{ textDecoration: "none", display: "inline-block" }}
                                                    >
                                                        <ODSButton
                                                            label={msg("doForgotPassword")}
                                                            variant="text"
                                                            sx={{
                                                                // fontSize: {
                                                                //     xl: "1rem",
                                                                //     lg: "0.75rem",
                                                                //     sm: "0.625rem"
                                                                // },
                                                                // fontSize: "1rem",
                                                                fontWeight: "400",
                                                                padding: "0rem",
                                                                color: "#2196F3",
                                                                fontFamily: "Inter"
                                                            }}
                                                        />
                                                    </a>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* {messagesPerField.existsError("username", "password") && (
                                        <span
                                            id="input-error"
                                            className={kcClsx("kcInputErrorMessageClass")}
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                            }}
                                        />
                                    )} */}
                                </div>
                            )}

                            {/* <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                    {msg("password")}
                                </label> */}

                            {/* <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        className={kcClsx("kcInputClass")}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper> */}
                            {/* {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )} */}

                            <div id="kc-form-buttons">
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <ODSButton
                                    type="submit"
                                    fullWidth
                                    children={msgStr("doLogIn")}
                                    disabled={isLoginButtonDisabled}
                                    tabIndex={4}
                                    size="large"
                                    sx={{
                                        fontFamily: "Inter"
                                        // height: {
                                        //     xl: "2.75rem",
                                        //     lg: "2.062rem",
                                        //     md: "1.956rem",
                                        //     sm: "1.4666rem"
                                        // }
                                    }}
                                />
                                {/* <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                /> */}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

// function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
//     const { kcClsx, i18n, passwordInputId, children } = props;

//     const { msgStr } = i18n;

//     const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

//     useEffect(() => {
//         const passwordInputElement = document.getElementById(passwordInputId);

//         assert(passwordInputElement instanceof HTMLInputElement);

//         passwordInputElement.type = isPasswordRevealed ? "text" : "password";
//     }, [isPasswordRevealed]);

//     return (
//         <div className={kcClsx("kcInputGroup")}>
//             {children}
//             <button
//                 type="button"
//                 className={kcClsx("kcFormPasswordVisibilityButtonClass")}
//                 aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
//                 aria-controls={passwordInputId}
//                 onClick={toggleIsPasswordRevealed}
//             >
//                 <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
//             </button>
//         </div>
//     );
// }
