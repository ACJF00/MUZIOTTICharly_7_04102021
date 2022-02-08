<template>
  <div class="general">
    <CreateMessage />
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";

export default {
  name: "message",
  components: { CreateMessage },

  data() {
    return {
      messages: [],
      userId: this.$store.state.user.userId,
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
  },
  methods: {},
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";
</style>
