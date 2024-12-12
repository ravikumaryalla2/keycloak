import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import ODSLabel from "oute-ds-label";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <>
            <Template
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayInfo
                //headerNode={msg("emailVerifyTitle")}
                headerMsg={msg("emailVerifyTitle")}
                infoNode={
                    <ODSLabel className="instruction" variant="subtitle1">
                        {msg("emailVerifyInstruction2")}
                        <span style={{ marginLeft: "5px" }}>
                            <a href={url.loginAction}>{msg("doClickHere")}</a>
                        </span>
                        &nbsp;
                        {/* {msg("emailVerifyInstruction3")} */}
                    </ODSLabel>
                }
            >
                <ODSLabel className="instruction" variant="subtitle1">
                    {msg("emailVerifyInstruction1", user?.email ?? "")}
                </ODSLabel>
            </Template>
        </>
    );
}
