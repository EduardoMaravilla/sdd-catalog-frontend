import { Form, Spinner } from "react-bootstrap";

const SpinnerComponent = () => {
  return (
    <Form.Group>
      <Form.Label
          column={true}
        htmlFor="spinnerComponent"
        className="d-flex justify-content-center align-items-center"
      >
        <Spinner id="spinnerComponent" animation="border" variant="primary" />
      </Form.Label>
    </Form.Group>
  );
};

export default SpinnerComponent;
