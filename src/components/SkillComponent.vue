<template>
    <div>
        <h3>Enter Skill Data</h3>
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
                <fieldset class="form-group">
                    <label>Level</label>
                    <input type="text" class="form-control" v-model="level">
                </fieldset>
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </div>
</template>

<script>
    import SkillDataService from '../service/SkillDataService';

    export default {
        name: "skillDetails",
        data() {
            return {
                name: "",
              level: "",
                errors: []
            };
        },
        computed: {
            id() {
                return this.$route.params.id;
            }
        },
        methods: {
            refreshSkillDetails() {
                SkillDataService.retrieveSkill(this.id).then(res => {
                    this.name = res.data.name;
                });
            },
            validateAndSubmit(e) {
                e.preventDefault();
                this.errors = [];
                if (!this.name) {
                    this.errors.push("Enter valid values");
                } else if (this.name.length < 5) {
                    this.errors.push("Enter at least 5 characters in Description");
                }

                if (this.errors.length === 0) {
                    if (this.id === -1) {
                        SkillDataService.createSkill(this.name, {
                            level: this.level
                        }).then(() => {
                            this.$router.push("/skills");
                        });
                    } else {
                        SkillDataService.updateSkill(this.id, {
                            id: this.id,
                            name: this.name,
                            level: this.level
                        }).then(() => {
                            this.$router.push("/skills");
                        });
                    }
                }
            }
        },
        created() {
            this.refreshSkillDetails();
        }
    };
</script>
<style>
</style>