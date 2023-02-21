import { createStore } from 'vuex';
import moment from "moment";

export default createStore({
  state: {
    tasks: [],
    showModal: false,
    delTaskID: '',
    status: ['Pending', 'Due', 'Complete'],
    highlight: false
  },
  getters: {
  },
  mutations: {
    addNewTask(state, data) {
      var selectedDate = moment(data.dueDate).format("YYYYMMDD")
      var currentDate = moment().format("YYYYMMDD")
      if (data.status != 'Complete' && selectedDate < currentDate) {
        data.highlight = true;
      }
      state.tasks.push(data)
    },
    editTask(state, data) {
      var editValues = state.tasks.filter(task => task.taskID == data.taskID)
      if (editValues.length > 0) {
        var selectedDate = moment(data.dueDate).format("YYYYMMDD")
        var currentDate = moment().format("YYYYMMDD")
        if (data.status != 'Complete' && selectedDate < currentDate) {
          data.highlight = true;
        }
        
        editValues[0].highlight = this.commit('checkHighlight', data);
        editValues[0].taskName = data.taskName
        editValues[0].status = data.status
        editValues[0].dueDate = data.dueDate
        editValues[0].highlight = data.highlight
      }
    },
    toggleModal(state, taskID) {
      state.showModal = !state.showModal;
      state.delTaskID = taskID;
    },
    deleteTask(state) {
      const taskIndex = state.tasks.findIndex(x => x.taskID === state.delTaskID);
      state.tasks.splice(taskIndex, 1);
      state.showModal = false;
    },
  },
  actions: {
  },
  modules: {
  }
})
