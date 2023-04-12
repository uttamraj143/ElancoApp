import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

const baseURLFromEnv = "https://engineering-task.elancoapps.com/api";
class FetchElanco {
  public async getApplications(application: string): Promise<any> {
    const requestObject: AxiosRequestConfig = {
      method: "GET",
      url: `${baseURLFromEnv}/applications/${application||""}`,
      headers: { contentType: "application/json" },
    };
    const responseAccessToken: AxiosResponse = await axios(requestObject);
    return responseAccessToken.data;
  }
}
export default FetchElanco;
