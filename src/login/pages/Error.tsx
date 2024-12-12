import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./Error.css";
import ODSButton from "oute-ds-button";
import ODSLabel from "oute-ds-label";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;
    console.log(client);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div className="errorbg"></div>
            <div id="kc-error-message" className="errordetails">
                <ODSLabel
                    variant="body2"
                    color="danger"
                    children={kcSanitize(message.summary)}
                    sx={{
                        color: "#607D8B",
                        fontFamily: "Inter"
                    }}
                />

                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <p>
                        <a id="backToApplication" href={client.baseUrl} style={{ textDecoration: "none" }}>
                            <ODSButton
                                variant="text"
                                children={"BACK TO APPLICATION"}
                                size="small"
                                fullWidth
                                sx={{
                                    fontFamily: "Inter"
                                }}
                            />
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
