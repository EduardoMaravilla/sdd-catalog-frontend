import { AttributionComponent } from "../components/utils/AttributionComponent";
import { DesploymentComponent } from "../components/utils/DesploymentComponent";
import { DocumentationComponent } from "../components/utils/DocumentationComponent";

const AboutPage = () => {
  return (
    <>
      <AttributionComponent />
      <DesploymentComponent />
      <DocumentationComponent />
    </>
  );
};

export default AboutPage;
