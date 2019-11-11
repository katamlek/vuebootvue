<template>
    <div class="container">
        <h3>All Skills</h3>
        <div v-if="message" class="alert alert-success">
            {{message}}
        </div>
        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="skill in skills" v-bind:key="skill.id">
                    <td>{{skill.id}}</td>
                    <td>{{skill.name}}</td>
                    <td>{{skill.level}}</td>
                    <td>
                        <button class="btn btn-success" v-on:click="updateSkillClicked(skill.id)">Update</button>
                    </td>
                    <td>
                        <button class="btn btn-warning" v-on:click="deleteSkillClicked(skill.id)">Delete</button>
                    </td>
                </tr>
                </tbody>
                <div class="row">
                    <button class="btn btn-success" v-on:click="addSkillClicked()">Add</button>
                    <button class="btn btn-warning" v-on:click="viewConsultants()">View Available Consultants</button>
                </div>
            </table>
        </div>
    </div>
</template>

<script>
    import SkillDataService from "../service/SkillDataService";

    export default {
        name: "SkillsList",
        data() {
            return {
                skills: [],
                message: null,
            };
        },
        methods: {
            refreshSkills() {
                SkillDataService.retrieveAllSkills()
                    .then(response => {
                        this.skills = response.data;
                    });
            },
            deleteSkillClicked(id) {
                SkillDataService.deleteSkill(id).then(response => { // eslint-disable-line no-unused-vars
                    this.message = `Delete of skill ${id} Successful`;
                    this.refreshSkills();
                });
            },
            updateSkillClicked(id) {
                this.$router.push(`/skills/${id}`);
            },
            addSkillClicked() {
                this.$router.push(`/skills/-1`);
            },
            viewConsultants() {
                this.$router.push(`/consultants`)
            }
        },
        created() {
            this.refreshSkills();
        }
    };
</script>

<style></style>