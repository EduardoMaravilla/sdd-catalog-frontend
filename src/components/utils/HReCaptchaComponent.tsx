import HCaptcha from "@hcaptcha/react-hcaptcha";
import { FC, useRef } from "react";
import { Form } from "react-bootstrap";
import { useRacerValidateReCaptchaService } from "../../services/racer/useRacerValidateReCaptchaService";
import { isApiResponseError } from "../../utilities/funcionExport";
import { ValidTokenResponse } from "../../types/TypesUserLogin";

type HReCaptchaComponentProps = {
  t:(key:string) => string;
  onVerify: (isValid:boolean) => void;
};

const HReCaptchaComponent: FC<HReCaptchaComponentProps> = ({t, onVerify }) => {
  const captchaService = useRacerValidateReCaptchaService();
  const captchaRef = useRef<HCaptcha | null>(null);

  const handleCaptchaLoad = () => {
    
  };

  const onVerifyCaptcha = async (captchaToken: string | null) => {

    if (!captchaToken) {
      alert(t("captchaAlertError"));
      onVerify(false);
      return;
    }else {
      captchaService.chargeCaptchaTokenInOptions(captchaToken);
    }    
    const captchaResponse = await captchaService.getFetch();
    if (isApiResponseError(captchaResponse.data)) {
      resetCaptcha();
      alert(t("captchaValidationError"));
      onVerify(false);
      return;
    }
    const validCaptcha = captchaResponse.data as ValidTokenResponse;
    if (!validCaptcha.valid) {
      resetCaptcha(); 
      alert(t("captchaValidationError"));
      onVerify(false);
      return;
    }
    onVerify(true);
  };

  const resetCaptcha = () => {
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
    }
  };

  return (
    <Form.Group className="d-flex justify-content-center align-items-center my-4">
      <HCaptcha
        theme="dark"
        sitekey={import.meta.env.VITE_API_Public_Key_ReCaptcha}
        onVerify={onVerifyCaptcha}
        ref={captchaRef}
        onLoad={handleCaptchaLoad}
      />
    </Form.Group>
  );
};

export default HReCaptchaComponent;
