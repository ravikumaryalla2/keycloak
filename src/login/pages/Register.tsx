import { useEffect, useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import ODSButton from "oute-ds-button";
import ODSLabel from "oute-ds-label";
import "./Register.css";

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    useEffect(() => {
        document.title = "Tiny Command";
    }, []);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const isReferral = urlParams.get("referrer") !== null && urlParams.get("referrer") !== "";
    const referrer = urlParams.get("referrer");

    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerMsg={isReferral ? `${referrer} has invited you!` : "Sign up"}
            subHeadermsg="Create account for free"
            displayMessage={messagesPerField.exists("global")}
        >
            <form id="kc-register-form" className={kcClsx("kcFormClass")} action={url.registrationAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
                {termsAcceptanceRequired && (
                    <TermsAcceptance
                        i18n={i18n}
                        kcClsx={kcClsx}
                        messagesPerField={messagesPerField}
                        areTermsAccepted={areTermsAccepted}
                        onAreTermsAcceptedValueChange={setAreTermsAccepted}
                    />
                )}
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                        </div>
                    </div>
                )}{" "}
                <div className="kc-form-footer">
                    <span className="terms">
                        <ODSLabel
                            variant="body2"
                            sx={{
                                fontWeight: "400",
                                fontSize: "0.8rem",
                                fontFamily: "Inter"
                            }}
                        >
                            By creating an account, you agree to the{" "}
                            <span>
                                <a href="https://www.tinycommand.com/terms-of-use" target="_blank" style={{ textDecoration: "none" }}>
                                    Terms of Service{" "}
                                </a>
                            </span>
                            <span>and </span>
                            <span>
                                <a href="https://www.tinycommand.com/privacy-policy" target="_blank" style={{ textDecoration: "none" }}>
                                    Privacy Policy.
                                </a>
                            </span>
                        </ODSLabel>
                    </span>
                    <div className={kcClsx("kcFormGroupClass")}>
                        {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                <button
                                    className={clsx(
                                        kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                        "g-recaptcha"
                                    )}
                                    data-sitekey={recaptchaSiteKey}
                                    data-callback={() => {
                                        (document.getElementById("kc-register-form") as HTMLFormElement).submit();
                                    }}
                                    data-action={recaptchaAction}
                                    type="submit"
                                >
                                    {msg("doRegister")}
                                </button>
                            </div>
                        ) : (
                            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                {/* <input
                                disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                type="submit"
                                value={msgStr("doRegister")}
                            /> */}

                                <ODSButton
                                    type="submit"
                                    label={msgStr("doRegister")}
                                    sx={{
                                        fontFamily: "Inter"
                                        // height: {
                                        //     xl: "2.75rem",
                                        //     lg: "2.062rem",
                                        //     md: "1.956rem",
                                        //     sm: "1.4666rem"
                                        // }
                                    }}
                                    fullWidth
                                    disabled={!isFormSubmittable || (termsAcceptanceRequired && !areTermsAccepted)}
                                />
                            </div>
                        )}
                        {/* <div className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                            
                        </div>
                    </div> */}
                    </div>
                </div>
            </form>
        </Template>
    );
}

function TermsAcceptance(props: {
    i18n: I18n;
    kcClsx: KcClsx;
    messagesPerField: Pick<KcContext["messagesPerField"], "existsError" | "get">;
    areTermsAccepted: boolean;
    onAreTermsAcceptedValueChange: (areTermsAccepted: boolean) => void;
}) {
    const { i18n, kcClsx, messagesPerField, areTermsAccepted, onAreTermsAcceptedValueChange } = props;

    const { msg } = i18n;

    return (
        <>
            <div className="form-group">
                <div className={kcClsx("kcInputWrapperClass")}>
                    {msg("termsTitle")}
                    <div id="kc-registration-terms-text">{msg("termsText")}</div>
                </div>
            </div>
            <div className="form-group">
                <div className={kcClsx("kcLabelWrapperClass")}>
                    <input
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        className={kcClsx("kcCheckboxInputClass")}
                        checked={areTermsAccepted}
                        onChange={e => onAreTermsAcceptedValueChange(e.target.checked)}
                        aria-invalid={messagesPerField.existsError("termsAccepted")}
                    />
                    <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
                        {msg("acceptTerms")}
                    </label>
                </div>
                {messagesPerField.existsError("termsAccepted") && (
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <span
                            id="input-error-terms-accepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(messagesPerField.get("termsAccepted"))
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
