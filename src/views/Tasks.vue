<template>
  <div class="row">
    <div class="col-md-8"></div>
    <div class="col-md-2">
      <select class="form-select" v-model="filter" @change="filterTasks">
        <option value="">Filter By status</option>
        <option :value='status' v-for="status in $store.state.status">{{ status }}</option>
      </select>
    </div>
    <div class="col-md-3"></div>
  </div>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8">
      <table class="table-responsive table table-striped">
        <tr>
          <th>#</th>
          <th>Task Name</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
        <tr v-if="allTasks == 0" class="text-center">
          <td colspan="5">No Tasks Found</td>
        </tr>
        <tr v-for="task in allTasks" :class="task.highlight ? 'highlight' : ''">
          <td>{{ task.taskID }}</td>
          <td>{{ task.taskName }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.created_at }}</td>
          <td>
            <router-link
              :to="{ name: 'update-task', params: { id: task.taskID } }"
            >
              Update
            </router-link>
            <a href="javascript:;" @click="toggleModal(task.taskID)">Delete </a>
            <router-link
              :to="{ name: 'duplicate-task', params: { id: task.taskID } }"
            >Duplicate </router-link>
            <a href="javascript:;" v-if="task.status != 'Complete'" @click="markComplete(task.taskID)">Complete</a>
          </td>
        </tr>
      </table>
    </div>
    <div class="col-md-2"></div>
  </div>
  <div class="del-modal-div" v-if="$store.state.showModal">
    <DeleteModal />
  </div>
</template>

<script>
import DeleteModal from "./DeleteModal.vue";

export default {
  name: "tasks",
  components: { DeleteModal },
  data() {
    return {
        filter: '',
        allTasks : this.$store.state.tasks
    }
  },
  methods: {
    toggleModal(taskID) {
      this.$store.commit("toggleModal", taskID);
    },
    filterTasks() {
        this.allTasks = this.$store.state.tasks;
        if (this.filter != '') {
            this.allTasks = this.allTasks.filter(task => {
                return task.status.includes(this.filter);
            })
        }
    },
    markComplete(taskID) {
        this.allTasks.map(task => {
            if(taskID === task.taskID) {
                task.status = 'Complete';
                task.highlight = false;
            }
            return task;
        })
    }
  },
};
</script>

<style>
    .highlight {
        background-color: red;
        color:white;
    }
</style>