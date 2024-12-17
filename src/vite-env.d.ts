/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
  /*Authentication*/
  readonly VITE_API_URL_Auht_Auht: string;
  readonly VITE_API_URL_Auht_Logout: string;
  readonly VITE_API_URL_Auht_Validtoken: string;
  readonly VITE_API_URL_Auht_Profile: string;
  readonly VITE_API_URL_Auht_Contact: string;
  /*Racer*/
  readonly VITE_API_URL_Reset_Password: string;
  readonly VITE_API_URL_Racer_Register : string;
  readonly VITE_API_URL_Racer_Update: string;
  readonly VITE_API_URL_Validate_Email: string;
  readonly VITE_API_URL_Update_Password: string;
  readonly VITE_API_URL_Verify_token_ReCaptcha: string;
  readonly VITE_API_URL_Profile_Password_Update: string;
  /*Racer Car Configuration */
  readonly VITE_API_URL_Save_Racer_Car: string;
  readonly VITE_API_URL_Update_Racer_Car: string;
  readonly VITE_API_URL_Delete_Racer_Car: string;
  readonly VITE_API_URL_Get_All_Racer_Car: string;
  /*Auxiliaries*/
  readonly VITE_API_URL_Auxiliaries: string;
  /*CarConfig*/
  readonly VITE_API_URL_Car_Config: string;
  readonly VITE_API_URL_Car_Config_filter: string;
  /*Cars*/
  readonly VITE_API_URL_Cars: string;
  /*Classes*/
  readonly VITE_API_URL_Classes: string;
  /*Engines*/
  readonly VITE_API_URL_Engines: string;
  /*Gear*/
  readonly VITE_API_URL_Gears: string;
  /*InitSkids*/
  readonly VITE_API_URL_InitSkids: string;
  /*Levels*/
  readonly VITE_API_URL_Levels: string;
  /*Makers*/
  readonly VITE_API_URL_Makers: string;
  /*StreetTypes*/
  readonly VITE_API_URL_StreetTypes: string;
  /*Suspensions*/
  readonly VITE_API_URL_Suspensions: string;
  /*Tires*/
  readonly VITE_API_URL_Tires: string;
  /*Turbos*/
  readonly VITE_API_URL_Turbos: string;
  /*TurboTypes*/
  readonly VITE_API_URL_TurboTypes: string;

  /*ReCaptcha Public_Key*/
  readonly VITE_API_Public_Key_ReCaptcha: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
