<template>
  <div>
    <div class="card" v-for="message in messages" :key="message">
      <h1 class="card__title" >{{ message.User.username }} </h1>
      <h3>{{ message.title}}</h3>
      <p class="card__title">{{ message.content }}</p>
      <p>Posté le {{ message.createdAt.slice(0,10).split("-").reverse().join("/")}} </p>
      <img :src="message.attachment" alt=""/>
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
  }
}
</script>

<style></style>