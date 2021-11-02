<template>
  <div>
    <div class="card">
      <h1>{{ messages.title }}</h1>
      <h3>{{ messages.content }}</h3>
      <img :src="messages.attachment" alt=""/>
      <button @click="deleteMessage">Supprimer</button>
    </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'OneMessage',
  data() {
    return {
      messages: [],
    }
  },
  mounted() {
    this.PickOneMessage()
    },
  methods:{
 PickOneMessage() {
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
        deleteMessage() {
      const token = this.$store.state.user.token
      const messageId = this.$route.params.id
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }

      axios
              .delete(`http://localhost:3000/api/messages/${messageId}`, { headers })
          .then((res) => {
              if (res)       {
                    this.$router.push("/feed");
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
