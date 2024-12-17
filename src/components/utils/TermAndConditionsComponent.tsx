import { FC } from "react";

type TermAndConditionsComponentProps = {
  t: (key: string) => string;
};

export const TermAndConditionsComponent: FC<
  TermAndConditionsComponentProps
> = ({ t }) => {
  return (
    <>
      <ul>
        <li>
          <p>{t("termsAndConditionsIntro")}</p>
        </li>
        <li>
          <p>{t("termsAndConditionsAcceptance")}</p>
        </li>
        <li>
          <p>{t("termsAndConditionsChanges")}</p>
        </li>
      </ul>
      <hr />
      <ol>
        <li>
          <strong>{t("termsAndConditionsSection1Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection1Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection2Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection2Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection3Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection3Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection4Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection4Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection5Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection5Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection6Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection6Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection7Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection7Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection8Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection8Content")}
          </p>
        </li>
        <li>
          <strong>{t("termsAndConditionsSection9Title")}</strong>
          <p style={{ textAlign: "justify" }}>
            {t("termsAndConditionsSection9Content")}
          </p>
        </li>
      </ol>
    </>
  );
};
