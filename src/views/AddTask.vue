<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <form v-on:submit.prevent="submitForm">
        <div class="form-group">
          <label for="taskName">Task Name <span class="error">*</span></label>
          <input
            type="text"
            class="form-control"
            id="taskName"
            v-model="taskName"
          />
        </div>
        <div class="form-group">
          <label for="status">Status<span class="error">*</span></label>
          <select class="form-select" v-model="status">
            <option :value="status" v-for="status in $store.state.status">
              {{ status }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="dueDate">Due Date<span class="error">*</span></label>
          <input
            type="date"
            class="form-control"
            id="dueDate"
            v-model="dueDate"
          />
        </div>
        <div class="form-group" v-if="showErr">
          <span class="error"> * Please fill all the required fields</span>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import moment from "moment";
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      taskName: "",
      status: "",
      dueDate: "",
      taskID: this.$route.params.id ? this.$route.params.id : "",
      showErr: false,
      isDuplicate: false,
    };
  },
  beforeMount() {
    // In case of edit task - get the task ID and assign the values
    if (this.taskID) {
      var editValues = this.$store.state.tasks.filter(
        (task) => task.taskID == this.taskID
      );
      if (editValues.length > 0) {
        this.taskName = editValues[0].taskName;
        this.status = editValues[0].status;
        this.dueDate = editValues[0].dueDate;
      }
    }
    const route = useRoute();
    if (route.path.includes("duplicate-task")) {
      this.isDuplicate = true;
    }
  },
  methods: {
    submitForm() {
      if (this.taskName === "" || this.status === "" || this.dueDate === "") {
        this.showErr = true;
        return;
      } else {
        this.showErr = false;
      }
      let newData = {
        taskID: this.taskID ? this.taskID : this.$store.state.tasks.length + 1,
        taskName: this.taskName,
        status: this.status,
        dueDate: this.dueDate,
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      if (this.isDuplicate) {
        newData.taskID = this.$store.state.tasks.length + 1;
        this.$store.commit("addNewTask", newData);
      } else {
        if (this.taskID) {
          this.$store.commit("editTask", newData);
        } else {
          this.$store.commit("addNewTask", newData);
        }
      }

      this.$router.push("/");
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>