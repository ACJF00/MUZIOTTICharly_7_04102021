<template>
  <div class="general">
  <CreateMessage />
    <div class="card" v-for="message in messages" :key="message.id">
    <div class="displayMessage">
    <div class="deletePost">
      <font-awesome-icon icon="times" v-if="message.UserId == this.$store.state.user.userId" @click="deleteMessage(message)" /> 
      <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteMessage(message)" /> 
      </div>
      <router-link :to="{ name: 'OneMessage', params: { id: message.id }}">
        <div class="publishedBy">
      <p class="card__username" > Publié par</p> <p id="username">{{ message.User.username }}</p>
        </div>
        <p id="datePost">Posté le {{ message.createdAt.slice(0,10).split("-").reverse().join("/")}} </p>
      <h1 class="msgCard__title">{{ message.title}}</h1>
      <p class="msgCard__content">{{ message.content }}</p>
      <img class="msgCard_attachment" :src="message.attachment" alt=""/>
      </router-link>
      <div class="displayLikes">
      <font-awesome-icon icon="thumbs-up" @click="likePost(message)" /> 
      <p> {{ message.likes }}</p>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import axios from "axios"
import CreateMessage from "@/components/CreateMessage"

export default {
  name: 'Feed',
  components: { CreateMessage },

  data() {
    return {
      messages: [],
      userId: this.$store.state.user.userId,
    }
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/")
      return
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/messages")
      .then((response) => {
        this.messages = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
methods: {        
        deleteMessage(message) {
      const token = this.$store.state.user.token
      const messageId = message.id
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }

      axios
              .delete(`http://localhost:3000/api/messages/${messageId}`, { headers })
          .then((res) => {
              if (res)       {
              this.$router.go()
              alert("Votre message a bien été supprimé !");
          }
      })
    .catch((error) => 
      {
          console.log(error)
      })
  },
      likePost(message) {
      const messageId = message.id
    
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
            message.likes ++
          } else if (response.data.message == "I no longer like this message !") {
            message.likes --
          }
        })
        .catch((error) => {
          console.log(error)
          alert("unable to like message !")
        })
    },
       /* likePost(message) {
      const userId = this.$store.state.user.userId;
      const token = this.$store.state.user.token
      const messageId = message.id
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }
      this.$store

           axios
              .post(`http://localhost:3000/api/messages/${messageId}/vote/like`, { headers })
        .dispatch("addLikes", {
          userId: userId,
          messageId: message.id,
          like: 1,
        })
        .then((response) => console.log(response));
    },*/
}
}
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

  .msgCard__title {
    font-size: 1.3em;
  }

  .msgCard__content {
    margin-top: 20px;
    font-size: 0.8em;
  }

  .msgCard__datePost {
    font-size: x-small;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }


</style>

