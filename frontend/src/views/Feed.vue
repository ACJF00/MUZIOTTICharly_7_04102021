<template>
  <div>
  <Message />
    <div class="card" v-for="message in messages" :key="message.id">
    <div class="deletePost">
      <font-awesome-icon icon="times" v-if="message.UserId == this.$store.state.user.userId" @click="deleteMessage(message)" /> 
      <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteMessage(message)" /> 
      </div>
      <router-link :to="{ name: 'OneMessage', params: { id: message.id }}">
      <h1 class="card__title">{{ message.title}}</h1>
      <h3 class="card__username" > By {{ message.User.username }} </h3>
      <p class="card__content">{{ message.content }}</p>
      <img :src="message.attachment" alt=""/>
      </router-link>
      <p id="datePost">Posté le {{ message.createdAt.slice(0,10).split("-").reverse().join("/")}} </p>
    </div>
  </div>
</template>

<script>

import axios from "axios"
import Message from "@/components/Message"

export default {
  name: 'Feed',
  components: { Message },

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
    },
}
}
</script>

<style>
a { 
  text-decoration: none; 
  }
.card__username {
  font-size: 0.7em;
  display: flex;
  justify-content: right;
  width: 90%;
  font-weight: normal;
}
.card__title{
  font-size: 2em;
} 
.card__content{
  font-size: 1.5em;
  text-align: center;
  margin: 20px;
} 

.deletePost {
  display: flex;
  justify-content: right;
  width: 100%;
  margin: -1em;
}

#datePost{
  font-size: 0.7em;
  justify-content: right;
  display: flex;
  margin: 0;
}
</style>

