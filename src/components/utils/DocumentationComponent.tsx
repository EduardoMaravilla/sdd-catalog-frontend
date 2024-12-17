import { Card, Col, Image, Row } from "react-bootstrap";

export const DocumentationComponent = () => {
  return (
    <Card className="my-4 profile-card border border-info-subtle">
      <Card.Header as="h4" className="text-center text-light fw-bold">
        Documentation & Repositories
      </Card.Header>
      <Card.Body>
        <Row>
          {/* Frontend Repository */}
          <Col xs={12} md={4} className="my-3">
            <div className="text-center">
            <Image
                src="images/logos/path-to-web-logo.png"
                alt="React"
                fluid
                className="logo-img"
              />
              <h5 className="fw-medium text-light">Frontend Repository</h5>
              <p className="text-light">
                Explore the React + Vite application, built with TypeScript and
                SWC for fast and modern web experiences.
              </p>
              <a
                href="https://github.com/your-username/frontend-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                View Repository
              </a>
            </div>
          </Col>

          {/* Backend Repository */}
          <Col xs={12} md={4} className="my-3">
            <div className="text-center">
              <Image
                src="images/logos/path-to-server-logo.png"
                alt="React"
                fluid
                className="logo-img"
              />
              <h5 className="fw-medium text-light">Backend Repository</h5>
              <p className="text-light">
                Discover the backend logic, powered by Java Spring Boot to
                deliver secure and robust APIs.
              </p>
              <a
                href="https://github.com/EduardoMaravilla/sdd-catalog-backend"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                View Repository
              </a>
            </div>
          </Col>

          {/* Database Repository */}
          <Col xs={12} md={4} className="my-3">
            <div className="text-center">
            <Image
                src="images/logos/path-to-db-logo.png"
                alt="React"
                fluid
                className="logo-img"
              />
              <h5 className="fw-medium text-light">Database Repository</h5>
              <p className="text-light">
                Review the database schema and configuration, optimized for
                relational data management using MySQL or PostgreSQL.
              </p>
              <a
                href="https://github.com/EduardoMaravilla/sdd-database-desing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                View Repository
              </a>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
