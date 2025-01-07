import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import ODSButton from "oute-ds-button";
import ODSTextField from "oute-ds-text-field";
import "./LoginResetPassword.css";
export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        url,
        //  realm,
        auth,
        messagesPerField
    } = kcContext;

    const {
        // msg,
        msgStr
    } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            // infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerMsg={"Forgot Your Password?"}
            subHeadermsg={"Enter your email address and well send you a link to reset your password."}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        {/* <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                            {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmail")
                                  : msg("email")}
                        </label> */}
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        {/* <input
                            type="text"
                            id="username"
                            name="username"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        /> */}
                        <ODSTextField
                            fullWidth
                            type="text"
                            id="username"
                            name="username"
                            placeholder={"Email"}
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        />
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        {/* <input
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            type="submit"
                            value={msgStr("doSubmit")}
                        /> */}
                        <ODSButton
                            type="submit"
                            children={msgStr("doSubmit")}
                            fullWidth
                            sx={{
                                fontFamily: "Inter"
                            }}
                        />
                    </div>

                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className="back-tologin">
                            <span>
                                {/* <a href={url.loginUrl}>{msg("backToLogin")}</a> */}
                                <a href={url.loginUrl} style={{ textDecoration: "none" }}>
                                    <ODSButton
                                        variant="text"
                                        children="BACK TO LOGIN"
                                        size="small"
                                        fullWidth
                                        sx={{
                                            fontFamily: "Inter"
                                        }}
                                    />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
