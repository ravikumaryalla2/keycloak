import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import ODSLabel from "oute-ds-label";
import "../pages/LoginIdpLinkEmail.css";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailLinkIdpTitle", idpAlias)}
        >
            <ODSLabel variant="body1" sx={{ color: "#607D8B" }}>
                {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
            </ODSLabel>
            <ODSLabel variant="body1">
                {`Haven't received a verification code in your email? `}{" "}
                <a href={url.loginAction} style={{ textDecoration: "none" }}>
                    {msg("doClickHere")}
                </a>
            </ODSLabel>
            <ODSLabel variant="body1">
                <a href={url.loginAction} style={{ textDecoration: "none" }}>
                    {msg("doClickHere")}
                </a>{" "}
                {` if you have already verified the email in different browser`}
            </ODSLabel>
        </Template>
    );
}
