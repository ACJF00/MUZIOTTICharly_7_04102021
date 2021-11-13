<template>
  <div>
    <div class="card">
    <h1>{{ message.User }}</h1>
      <h1>{{ message.title }}</h1>
      <h3>{{ message.content }}</h3>
      <img :src="message.attachment" alt=""/>
      <button v-if="message.UserId == this.$store.state.user.userId" @click="deleteMessage">Supprimer</button>
      <button v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteMessage">Supprimer</button>
            <Comment />
      <Like />
    </div>
  </div>
</template>

<script>

import axios from "axios"
import Like from "@/components/Like"
import Comment from "@/components/Comment"

export default {
  name: 'OneMessage',
  components: { Like, Comment },
  data() {
    return {
      message: [],
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
        this.message = response.data
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
  },
  modifyMessage() {
      const token = this.$store.state.user.token
      const messageId = this.$route.params.id
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }

      axios
        .put(`http://localhost:3000/api/messages/${messageId}`, { headers })
        .then((res) => {
          if (res) {
            alert("Votre message a été modifié")
          }
        })
        .catch((error) => {
         console.log(error.message)
        })
    }
  },
}
</script>
