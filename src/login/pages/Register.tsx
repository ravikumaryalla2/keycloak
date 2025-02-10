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
import { googlelogo } from "../assets";

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

    const { url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired, social } =
        kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    const getLogo = (name: unknown) => {
        switch (name) {
            case "google":
                return googlelogo;
            default:
                console.log("Invalid option");
        }
    };

    //     useEffect(() => {
    //         // Fetch social providers from the Keycloak API
    //         fetch(` /admin/realms/${realm}/identity-provider/instances/google
    // `)
    //             .then(res => res.json())
    //             .then(data => {
    //                 const providers = data.map((provider: { alias: string; displayName: string; authorizationUrl: string }) => ({
    //                     alias: provider.alias,
    //                     displayName: provider.displayName,
    //                     loginUrl: provider.authorizationUrl
    //                 }));
    //                 console.log(providers, "providers");
    //                 // setSocialProviders(providers);
    //             })
    //             .catch(err => console.error("Failed to fetch social providers:", err));
    //     }, []);
    // console.log(kcContext?.social, "social");
    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerMsg={isReferral ? `${referrer} has invited you!` : "Sign up"}
            subHeadermsg="Create account for free"
            displayMessage={messagesPerField.exists("global")}
            socialProvidersNode={
                <>
                    {social?.providers !== undefined && social.providers.length !== 0 && (
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
                                                label={`${kcContext.pageId == "register.ftl" ? "Register" : "Login"} with ${p.displayName}`}
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
