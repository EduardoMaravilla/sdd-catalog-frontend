import { Card, Col, Image, Row } from "react-bootstrap";

export const DesploymentComponent = () => {
  return (
    <Card className="my-4 profile-card border border-success-subtle">
      <Card.Header as="h4" className="text-center text-light fw-bold">
        Deployment Platforms
      </Card.Header>
      <Card.Body>
        <Row className="d-flex align-items-center justify-content-center my-4">
          {/* Netlify */}
          <Col
            xs={4}
            sm={3}
            className="d-flex align-items-center justify-content-center my-2"
          >
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="images/logos/path-to-netlify-logo.png"
                alt="Netlify"
                fluid
                className="logo-img p-2 rounded-4"
                style={{ backgroundColor: "white" }}
              />
            </a>
          </Col>

          {/* Docker Hub */}
          <Col
            xs={4}
            sm={3}
            className="d-flex align-items-center justify-content-center my-2"
          >
            <a
              href="https://hub.docker.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="images/logos/path-to-docker-logo.png"
                alt="Docker Hub"
                fluid
                className="logo-img"
                
              />
            </a>
          </Col>

          {/* Railway */}
          <Col
            xs={4}
            sm={3}
            className="d-flex align-items-center justify-content-center my-2"
          >
            <a
              href="https://railway.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="images/logos/path-to-railway-logo.png"
                alt="Railway"
                fluid
                className="logo-img rounded-4"
              />
            </a>
          </Col>

          {/* Supabase */}
          <Col
            xs={4}
            sm={3}
            className=" d-flex align-items-center justify-content-center my-2"
          >
            <a
              href="https://supabase.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="images/logos/path-to-supabase-logo.png"
                alt="Supabase"
                fluid
                className="logo-img"
              />
            </a>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
