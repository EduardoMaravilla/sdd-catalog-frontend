import { FC } from "react";
import { Card } from "react-bootstrap";
import { TermAndConditionsComponent } from "../components/utils/TermAndConditionsComponent";

type TermAndConditionsPageProps = {
    t : (Key : string) => string;
}

export const TermAndConditionsPage: FC<TermAndConditionsPageProps> = ({t}) => {
  return (
    <Card className="profile-card border border-primary-subtle">
        <Card.Header className="text-light fw-bold">
            <h2>{t("termsAndConditionsTitle")}</h2>
        </Card.Header>
        <Card.Body className="text-light">
            <TermAndConditionsComponent t={t} />
        </Card.Body>
    </Card>
  )
}
