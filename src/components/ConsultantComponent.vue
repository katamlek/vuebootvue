<template>
    <div>
        <h3>Enter Consultant Data</h3>
        <div class="container">
            <form @submit="validateAndSubmit">
                <fieldset class="form-group">
                    <label>Id</label>
                    <input type="text" class="form-control" v-model="id" disabled>
                </fieldset>
                <fieldset class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="name">
                </fieldset>
                <h4>Consultant Skills</h4>
                <div class="container">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Level</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="skill in skills" v-bind:key="skill.id">
                            <td>{{skill.name}}</td>
                            <td>{{skill.level}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Add skill
                    </button>
                </div>
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
    import consultantDataService from '../service/ConsultantDataService';

    export default {
        name: "consultantDetails",
        data() {
            return {
                name: "",
                errors: [],
                skills: []
            };
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            refreshConsultantDetails() {
                consultantDataService.retrieveConsultant(this.id).then(res => {
                    this.name = res.data.name;
                    this.skills = consultantDataService.retrieveConsultantSkills(this.id);
                });
            },
            addConsultantSkillClicked() { //todo
                this.$router.push(`/skills/-1`);
            },
            validateAndSubmit(e) {
                e.preventDefault();
                this.errors = [];
                if (!this.name) {
                    this.errors.push("Enter valid values");
                } else if (this.name.length < 5) {
                    this.errors.push("Enter at least 5 characters in name");
                }

                if (this.errors.length === 0) {
                    if (this.id === -1) {
                        consultantDataService.createConsultant({
                            name: this.name
                        }).then(() => {
                            this.$router.push("/consultants");
                        });
                    } else {
                        consultantDataService.updateConsultant(this.id, {
                            id: this.id,
                            name: this.name
                        }).then(() => {
                            this.$router.push("/consultants");
                        });
                    }
                }
            }
        },

        created() {
            this.refreshConsultantDetails();
        }

    };
</script>
<style>
</style>