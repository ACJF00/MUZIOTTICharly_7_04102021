<template>
  <div class="like">
    <font-awesome-icon id="likeIcon" icon="thumbs-up" @click="createLike" />
    <p>{{ likes }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Like",
  data() {
    return {
      likes: [],
    };
  },
  mounted() {
    const messageId = this.$route.params.id;

    axios
      .get(`http://localhost:3000/api/messages/${messageId}`)
      .then((response) => {
        this.likes = response.data.likes;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    createLike() {
      const messageId = this.$route.params.id;

      const token = this.$store.state.user.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .post(
          `http://localhost:3000/api/messages/${messageId}/vote/like`,
          {},
          { headers }
        )
        .then((response) => {
          if (response.data.message == "Message liked !") {
            this.likes++;
          } else if (
            response.data.message == "I no longer like this message !"
          ) {
            this.likes--;
          }
        })
        .catch((error) => {
          console.log(error);
          alert("unable to like message !");
        });
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

.like {
  color: $btn-color;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  p {
    padding-left: 0.5em;
  }
  #likeIcon:hover {
    cursor: pointer;
    color: $btn-hover;
  }
}
</style>
