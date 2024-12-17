import { Card, Table } from "react-bootstrap";
import { FC } from "react";

interface HomePageProps {
  t: (key: string) => string;
}

const HomePage: FC<HomePageProps> = ({ t }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="police-lights">{t("hPTitle")}</h1>
        <hr className="mx-2"/>
        <p className="fs-5 text-light mx-2">{t("hPSubtitle")}</p>
      </div>
      <div className="row w-100 row-cols-1 row-cols-md-3">
        <div className="col">
          <Card className="h-100 profile-card">
            <Card.Header className="text-color-change fw-bold fs-4">
              {t("hpTitleResume")}
            </Card.Header>
            <Card.Body className="text-light fw-medium">
              <p
                style={{
                  textAlign: "justify",
                }}
              >
                {t("hpResume1")}
              </p>
              <p
                style={{
                  textAlign: "justify",
                }}
              >
                {t("hpResume2")}
              </p>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card className="h-100 profile-card">
            <Card.Header className="text-color-change fw-bold fs-4">
              {t("hpTricksTitle")}
            </Card.Header>
            <Card.Body>
              <Table
                striped
                bordered
                hover
                className="border border-primary-subtle"
              >
                <thead>
                  <tr>
                    <th
                      className="text-light fw-bold"
                      style={{ backgroundColor: "transparent" }}
                    >
                      {t("hpTrickTitle")}
                    </th>
                    <th
                      className="text-light fw-bold"
                      style={{ backgroundColor: "transparent" }}
                    >
                      {t("hpTrickDescription")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      className="text-light fw-bold"
                      style={{
                        textAlign: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      {t("hpTrick1Title")}
                    </td>
                    <td
                      className="text-light fw-medium"
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                      }}
                    >
                      {t("hpTrick1Desc")}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="text-light fw-bold"
                      style={{
                        textAlign: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      {t("hpTrick2Title")}
                    </td>
                    <td
                      className="text-light fw-medium"
                      style={{
                        textAlign: "justify",
                        backgroundColor: "transparent",
                      }}
                    >
                      {t("hpTrick2Desc")}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
        <div className="col">
          <Card className="h-100 profile-card">
            <Card.Header className="text-color-change fw-bold fs-4">
              {t("hpTutorialTitle")}
            </Card.Header>
            <Card.Body className="text-light fw-medium">
              <p style={{ textAlign: "justify" }}>{t("hpTutorial1")}</p>
              <p style={{ textAlign: "justify" }}>{t("hpTutorial2")}</p>
              <p style={{ textAlign: "justify" }}>{t("hpTutorial3")}</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
