<template>
  <div>
    <div class="card" v-for="message in messages" :key="message">
      <h1 class="card__title" >{{ message.User.username }} </h1>
      <h3>{{ message.title}}</h3>
      <h3> {{ ago }} </h3>
      <p class="card__title">{{ message.content }}</p>
      <img :src="message.attachment" alt=""/>
    </div>
  </div>
</template>

<script>

import axios from "axios"
import moment from "moment"

export default {
  name: 'Feed',
  data() {
    return {
      messages: [],
    }
  },
   ago() {
      return moment(this.message.createdAt).fromNow()
  },
  mounted() {
    if (this.$store.state.user.userId == -1) { // if userId doesn't exist
      this.$router.push("/") //go back to login
      return
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/messages")
      .then((response) => {
        this.messages = response.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style></style>