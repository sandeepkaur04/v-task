<template>
  <div class="del-modal">
    <div class="modal-container">
      <div class="modal-body">
        <span class="modal-close" @click="toggleModal">🗙</span>
        <h2>Are you sure you want to delete the task?</h2>
        <div class="modal-action p-2">
          <button class="modal-button" @click="deleteTask">Confirm</button>
          <button class="modal-button" @click="toggleModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #cececeb5;
}
.modal-body {
  background-color: #fff;
  border: 2px solid #74a2cf;
  border-radius: 10px;
  text-align: center;
  padding: 20px 40px;
  max-width: 400px;
}
.modal-action {
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
}
.modal-button {
  cursor: pointer;
  height: 30px;
  padding: 0 25px;
  border: 2px solid #74a2cf;
  border-radius: 5px;
  background-color: #80b2e4;
  color: #fff;
}
.modal-close {
  cursor: pointer;
  position: relative;
  align-self: end;
  right: -44%;
  top: 0;
}
.del-modal h2 {
  font: 1em;
}
</style>

<script>

export default {
  name: "deleteModal",
  methods: {
    deleteTask() {
        this.$store.commit('deleteTask')
    },
    toggleModal() {
        this.$store.commit('toggleModal', '')
    }
  }
};
</script>