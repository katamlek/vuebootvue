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
      errors: []
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
        });
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