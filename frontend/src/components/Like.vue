<template>
  <div class="like">
    <button @click="createLike">Liker</button>
    <p>Likes {{ messages.likes }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Like",
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    const messageId = this.$route.params.id

    axios
      .get(`http://localhost:3000/api/messages/${messageId}`)
      .then((response) => {
        this.messages = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    createLike() {
      const messageId = this.$route.params.id
    
      const token = this.$store.state.user.token
      const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }

      axios
        .post(
          `http://localhost:3000/api/messages/${messageId}/vote/like`, {}, { headers })
        .then((response) => {
          if (response.data.message == "Message liked !") {
            alert("Message liked !")
            this.$router.push("/feed");
          } else if (response.data.message == "I no longer like this message !") {
            alert("Message no longer liked !")
            this.$router.push("/feed");
          }
        })
        .catch((error) => {
          console.log(error)
          alert("unable to like message !")
        })
    },
  },
}
</script>

<style scoped>
.like {
  color: red;
  font-size: 2rem;
  transform-style: 4s;
}
.unlike {
  color: green;
  font-size: 2rem;
  transform-style: 4s;
}
</style>