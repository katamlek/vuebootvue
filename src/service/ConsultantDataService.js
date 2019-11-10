import axios from "axios";

const API_URL = "http://localhost:8080";
const CONSULTANTS_API_URL = `${API_URL}/consultants`;

class ConsultantDataService {
    retrieveAllConsultants() {
        return axios.get(`${CONSULTANTS_API_URL}`);
    }

    deleteConsultant(id) {
        return axios.delete(`${CONSULTANTS_API_URL}/${id}`);
    }

    retrieveConsultant(id) {
        return axios.get(`${CONSULTANTS_API_URL}/${id}`);
    }

    updateConsultant(id, consultant) {
        return axios.put(`${CONSULTANTS_API_URL}/${id}`, consultant);
    }

    createConsultant(consultant) {
        return axios.post(`${CONSULTANTS_API_URL}/consultants/`, consultant);
    }
}


export default new ConsultantDataService();