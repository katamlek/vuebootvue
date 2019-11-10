<template v-if>
    <div class="container">
        <h3>All Consultants</h3>
        <div v-if="message" class="alert alert-success">
            {{message}}
        </div>
        <div class="container">
            <table class="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="consultant in consultants" v-bind:key="consultant.id">
                    <td>{{consultant.id}}</td>
                    <td>{{consultant.name}}</td>
                    <td>
                        <button class="btn btn-success" v-on:click="updateConsultantClicked(consultant.id)">Update
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-warning" v-on:click="deleteConsultantClicked(consultant.id)">Delete
                        </button>
                    </td>
                </tr>
                </tbody>
                <div class="row">
                    <button class="btn btn-success" v-on:click="addConsultantClicked()">Add</button>
                </div>
            </table>
        </div>
    </div>
</template>

<script>
    import ConsultantDataService from "../service/ConsultantDataService";

    export default {
        name: "ConsultantsList",
        data() {
            return {
                consultants: [],
                message: null,
            };
        },
        methods: {
            refreshConsultants() {
                ConsultantDataService.retrieveAllConsultants()
                    .then(response => {
                        this.consultants = response.data;
                    });
            },
            deleteConsultantClicked(id) {
                ConsultantDataService.deleteConsultant(id).then(response => { // eslint-disable-line no-unused-vars
                    this.message = `Delete of consultant ${id} Successful`;
                    this.refreshConsultants();
                });
            },
            updateConsultantClicked(id) {
                this.$router.push(`/consultants/${id}`);
            },
            addConsultantClicked() {
                this.$router.push(`/consultants/-1`);
            },
        },
        created() {
            this.refreshConsultants();
        }
    };
</script>

<style></style>