import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import ODSButton from "oute-ds-button";
import "./Info.css";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
                    }}
                />
            }
        >
            <div id="kc-info-message">
                <p
                    className="instruction"
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary;

                                if (requiredActions) {
                                    html += "<b>";

                                    html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <ODSButton fullWidth>
                                <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                            </ODSButton>
                        );
                    }
                    if (actionUri) {
                        return (
                            <a href={actionUri}>
                                {" "}
                                <ODSButton fullWidth>{msg("proceedWithAction")} </ODSButton>
                            </a>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <a href={client.baseUrl}>
                                <ODSButton fullWidth>{msg("backToApplication")} </ODSButton>
                            </a>
                        );
                    }
                })()}
            </div>
        </Template>
    );
}
