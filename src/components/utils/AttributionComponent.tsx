import { Card, Col, Image, Row } from "react-bootstrap";

export const AttributionComponent = () => {
  return (
    <Card className="my-4 profile-card border border-primary-subtle">
      <Card.Header as="h4" className="text-center text-light fw-bold">
        Technologies Used
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <h5 className="text-center text-light fw-medium">Frontend</h5>
            <Row className="justify-content-center my-4">
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-html-logo.png"
                    alt="HTML"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-css-logo.png"
                    alt="CSS"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-js-logo.png"
                    alt="JavaScript"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-ts-logo.png"
                    alt="TypeScript"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-react-logo.png"
                    alt="React"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://vitejs.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-vite-logo.png"
                    alt="Vite"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://www.hcaptcha.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-hcaptcha-logo.svg"
                    alt="HCaptcha"
                    fluid
                    className="logo-img p-2 rounded-4"
                    style={{ backgroundColor: "white" }}
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://getbootstrap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-bts-logo.png"
                    alt="Bootstrap"
                    fluid
                    className="logo-img p-2 rounded-4"
                    style={{ backgroundColor: "white" }}
                  />
                </a>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <h5 className="text-center text-light fw-medium">Backend</h5>
            <Row className="justify-content-center my-4 ">
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://www.oracle.com/java/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-java-logo.png"
                    alt="Java"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://spring.io/projects/spring-boot"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-sb-logo.png"
                    alt="Spring Boot"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://spring.io/projects/spring-security"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-sbs-logo.png"
                    alt="Spring Security"
                    fluid
                    className="logo-img rounded-4"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://www.hcaptcha.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-hcaptcha-logo.svg"
                    alt="HCaptcha"
                    fluid
                    className="logo-img p-2 rounded-4"
                    style={{ backgroundColor: "white" }}
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://www.mailjet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-mailjet-logo.png"
                    alt="Mailjet"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://www.mysql.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-mysql-logo.png"
                    alt="MySQL"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://www.postgresql.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-postgres-logo.webp"
                    alt="PostgreSQL"
                    fluid
                    className="logo-img"
                  />
                </a>
              </Col>
              <Col xs={4} sm={3} className="my-2">
                <a
                  href="https://swagger.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="images/logos/path-to-swagger-logo.svg"
                    alt="Swagger"
                    fluid
                    className="logo-img p-2 rounded-4"
                    style={{ backgroundColor: "white" }}
                  />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
