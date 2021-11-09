<template>
  <div>
    <div class="card" v-for="message in messages" :key="message.id">
      <h1 class="card__title" > {{ message.User.username }} </h1>
      <router-link :to="{ name: 'OneMessage', params: { id: message.id }}">
      <h3>{{ message.title}}</h3>
      <p class="card__title">{{ message.content }}</p>
      <p>Posté le {{ message.createdAt.slice(0,10).split("-").reverse().join("/")}} </p>
      <p>id = {{ message.id }}</p>
      <p> user id = {{ message.UserId }}</p>
      <img :src="message.attachment" alt=""/>
      </router-link>
      <button v-if="message.UserId == this.$store.state.user.userId" @click.prevent="deleteMessage(message)">Supprimer</button>
      <button v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteMessage">Supprimer</button>
    </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'Feed',
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
  }
}
}
</script>

<style></style>

