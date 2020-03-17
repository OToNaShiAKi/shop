<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { InitUser } from "@/store/mutations-type";

export default {
  name: "App",
  methods: {
    ...mapActions([InitUser])
  },
  created() {
    this.InitUser(InitUser);
  }
};
</script>

<style lang="less" scoped>
#app {
  background-color: #f5f5f5;
}
</style>