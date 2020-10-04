import axios from "axios";

class BackendClient {
    backendUrl = process.env.VUE_APP_BASEURL;

    loadAllStudents = () => {
        return axios.get(this.backendUrl);
    };

}

export const BEClient = new BackendClient();