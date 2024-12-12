import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import "../login/pages/Template.css";
import ODSIcon from "oute-ds-icon";
import ODSButton from "oute-ds-button";
import ODSLabel from "oute-ds-label";
import { showAlert } from "oute-ds-alert";
import "oute-tokens/dist/tokens.css";

function injectCustomCSS() {
    const css = `
        body {
            transform: scale(1) !important;
        }
        @media screen and (min-width: 2560px) {
            body {
                transform: scale(1) !important;
            }
        }
        @media screen and (min-width: 3840px) {
            body {
                transform: scale(1) !important;
            }
        }
        @media screen and (min-width: 5120px) {
            body {
                transform: scale(1) !important;
            }
        }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = css;
    document.head.appendChild(styleSheet);
}

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        headerMsg,
        subHeadermsg,
        headerNode,
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        socialProvidersNode = null,
        infoNode = null,
        registerUrl,

        // documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = `Tiny Command`;
    }, []);

    useEffect(() => {
        injectCustomCSS();
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? ""
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className={"custom-body"}>
            {displayMessage &&
                message !== undefined &&
                (message.type !== "warning" || !isAppInitiatedAction) &&
                // <div
                //     className={clsx(
                //         `alert-${message.type}`,
                //         kcClsx("kcAlertClass"),
                //         `pf-m-${message?.type === "error" ? "danger" : message.type}`
                //     )}
                // >
                //     <div className="pf-c-alert__icon">
                //         {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                //         {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                //         {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                //         {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                //     </div>
                //     <span
                //         className={kcClsx("kcAlertTitleClass")}
                //         dangerouslySetInnerHTML={{
                //             __html: kcSanitize(message.summary)
                //         }}
                //     />
                // </div>

                showAlert({
                    type: message.type,
                    message: kcSanitize(message.summary),
                    showProgress: false
                })}
            <div className="tinylogo">
                <ODSIcon
                    outeIconName="TINY"
                    outeIconProps={{
                        sx: { color: "#1C3693", height: "4.688rem", width: "12.5rem" }
                    }}
                />
            </div>

            <div className={"form-card"}>
                <div className="login-main">
                    <header className={kcClsx("kcFormHeaderClass")}>
                        {/* {enabledLanguages.length > 1 && (
                        <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                            <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                    <button
                                        tabIndex={1}
                                        id="kc-current-locale-link"
                                        aria-label={msgStr("languages")}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-controls="language-switch1"
                                    >
                                        {currentLanguage.label}
                                    </button>
                                    <ul
                                        role="menu"
                                        tabIndex={-1}
                                        aria-labelledby="kc-current-locale-link"
                                        aria-activedescendant=""
                                        id="language-switch1"
                                        className={kcClsx("kcLocaleListClass")}
                                    >
                                        {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                            <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )} */}
                        {(() => {
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                <div className="login-heading">
                                    <ODSLabel
                                        children={headerMsg || headerNode}
                                        variant="h4"
                                        sx={{
                                            // fontSize: {
                                            //     xl: "2rem",
                                            //     lg: "1.5rem",
                                            //     md: "1.375rem",
                                            //     sm: "1.125rem"
                                            // },
                                            color: "#263238",
                                            fontWeight: "700",
                                            fontFamily: "Inter"
                                        }}
                                    />
                                    <ODSLabel
                                        children={subHeadermsg}
                                        variant="body1"
                                        sx={{
                                            color: "#607D8B",
                                            fontFamily: "Inter"
                                            // fontSize: {
                                            //     xl: "1rem",
                                            //     lg: "0.75rem",
                                            //     sm: "0.625rem"
                                            // }
                                        }}
                                    />
                                </div>
                            ) : (
                                <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                    <a
                                        id="reset-login"
                                        href={url.loginRestartFlowUrl}
                                        aria-label={msgStr("restartLoginTooltip")}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="kc-login-tooltip">
                                            <i className={kcClsx("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            );

                            if (displayRequiredFields) {
                                return (
                                    <div className={kcClsx("kcContentWrapperClass")}>
                                        <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                            <span className="subtitle">
                                                <span className="required">*</span>
                                                {msg("requiredFields")}
                                            </span>
                                        </div>
                                        <div className="col-md-10">{node}</div>
                                    </div>
                                );
                            }

                            return node;
                        })()}
                    </header>
                    <div id="kc-content">
                        {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
                        {/* {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div
                                    className={clsx(
                                        `alert-${message.type}`,
                                        kcClsx("kcAlertClass"),
                                        `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                    )}
                                >
                                    <div className="pf-c-alert__icon">
                                        {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                        {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                        {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                        {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                    </div>
                                    <span
                                        className={kcClsx("kcAlertTitleClass")}
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(message.summary)
                                        }}
                                    />
                                </div>
                            )} */}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        style={{ textDecoration: "none" }}
                                        href="#"
                                        id="try-another-way"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as never].submit();
                                            return false;
                                        }}
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </div>
                            </form>
                        )}
                        {socialProvidersNode}
                        {displayInfo && infoNode}
                        {kcContext.pageId == "login.ftl" && (
                            <div className="terms-and-policy">
                                <a href="https://www.tinycommand.com/terms-of-use" target="_blank" style={{ textDecoration: "none" }}>
                                    <ODSLabel
                                        children="Terms of Service"
                                        variant="body2"
                                        sx={{
                                            // fontSize: {
                                            //     sm: "0.6rem", // Small
                                            //     md: "0.7rem", // Medium
                                            //     lg: "0.75rem", // Large
                                            //     xl: "0.8rem" // Extra large
                                            // },
                                            // fontSize: "0.8rem",
                                            fontWeight: "400",
                                            color: "#2196F3",
                                            fontFamily: "Inter"
                                        }}
                                    />
                                </a>
                                <span className="terms-line"></span>
                                <a href="https://www.tinycommand.com/privacy-policy" target="_blank" style={{ textDecoration: "none" }}>
                                    <ODSLabel
                                        children="Privacy Policy"
                                        variant="body2"
                                        sx={{
                                            // fontSize: {
                                            //     sm: "0.6rem", // Small
                                            //     md: "0.7rem", // Medium
                                            //     lg: "0.75rem", // Large
                                            //     xl: "0.8rem" // Extra large
                                            // },
                                            // fontSize: "0.8rem",
                                            fontWeight: "400",
                                            color: "#2196F3",
                                            fontFamily: "Inter"
                                        }}
                                    />
                                </a>
                            </div>
                        )}
                    </div>

                    {(kcContext.pageId == "login.ftl" || kcContext.pageId == "register.ftl") && (
                        <div className={"footer"}>
                            <div className={"already-have-acc"}>
                                <ODSLabel
                                    children={kcContext.pageId == "login.ftl" ? "Do not have an account ? " : "Already have an account?"}
                                    variant="body2"
                                    sx={{
                                        // fontSize: {
                                        //     sm: "0.6rem", // Small
                                        //     md: "0.7rem", // Medium
                                        //     lg: "0.75rem", // Large
                                        //     xl: "0.8rem" // Extra large
                                        // },
                                        fontSize: "0.8rem",
                                        fontWeight: "400",
                                        fontFamily: "Inter"
                                    }}
                                />
                                <a
                                    tabIndex={8}
                                    href={kcContext.pageId == "login.ftl" ? registerUrl : url.loginUrl}
                                    style={{ textDecoration: "none" }}
                                >
                                    <ODSButton
                                        variant="text"
                                        children={kcContext.pageId == "login.ftl" ? "Sign Up" : "Sign In"}
                                        sx={{
                                            fontSize: "0.8rem",
                                            fontWeight: "400",
                                            color: "#2196F3",
                                            padding: "0rem",
                                            fontFamily: "Inter"
                                        }}
                                        // sx={{
                                        //     fontSize: "0.8rem",
                                        //     fontWeight: "400",
                                        //     padding: "0px",
                                        //     "&:hover": {
                                        //         backgroundColor: "#fff"
                                        //     }
                                        // }}
                                    />
                                    {/* <ODSButton
                                        variant="text"
                                        label="Sign Up"
                                        size="small"
                                        sx={{
                                            padding: "0px",

                                            fontWeight: "400"
                                            // fontSize: {
                                            //     sm: "0.6rem", // Small
                                            //     md: "0.7rem", // Medium
                                            //     lg: "0.75rem", // Large
                                            //     xl: "0.8rem" // Extra large
                                            // }
                                        }}
                                    /> */}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
