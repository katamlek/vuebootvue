import axios from "axios";

const API_URL = "http://localhost:8080";
const SKILLS_API_URL = `${API_URL}/skills`;

class SkillDataService {
    retrieveAllSkills() {
        return axios.get(`${SKILLS_API_URL}`);
    }

    deleteSkill(id) {
        return axios.delete(`${SKILLS_API_URL}/${id}`);
    }

    retrieveSkill(id) {
        return axios.get(`${SKILLS_API_URL}/${id}`);
    }

    updateSkill(id, skill) {
        return axios.put(`${SKILLS_API_URL}/${id}`, skill);
    }

    createSkill(skill) {
        return axios.post(`${SKILLS_API_URL}`, skill);
    }
}


export default new SkillDataService();