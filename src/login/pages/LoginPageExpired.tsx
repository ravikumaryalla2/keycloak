import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./LoginPageExpired.css";
import ODSLabel from "oute-ds-label";
import ODSButton from "oute-ds-button";
import { GenericError } from "../assets";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    // const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            // headerNode={msg("pageExpiredTitle")}
        >
            {/* <p id="instruction1" className="instruction">
                {msg("pageExpiredMsg1")}
                <a id="loginRestartLink" href={url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </a>{" "}
                .<br />
                <a id="loginContinueLink" href={url.loginAction}>
                    {msg("doClickHere")}
                </a>{" "}
                .
            </p> */}

            <div className="page-expired">
                <div className="error-image">
                    <img src={GenericError} alt="Error" style={{ width: "100%", objectFit: "contain" }} />
                </div>
                <div className="error-text">
                    <ODSLabel variant="body1" sx={{ color: "#607D8B", fontFamily: "Inter" }}>
                        Your login session has timed out due to inactivity.
                    </ODSLabel>
                </div>
                <div className="error-button">
                    <a href={url.loginAction}>
                        <ODSButton variant="text" size="large" sx={{ fontFamily: "Inter" }}>
                            GO BACK TO LOGIN{" "}
                        </ODSButton>
                    </a>
                </div>
            </div>
        </Template>
    );
}
