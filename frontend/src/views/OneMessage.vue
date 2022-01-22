<template>
  <div class="general">
    <div class="card">
    <div class="displayMessage">
    <div class="deletePost">
      <font-awesome-icon icon="times" v-if="message.UserId == this.$store.state.user.userId" @click="deleteMessage" /> 
      <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteMessage" /> 
      </div>
      <div class="publishedBy">
      <p class="card__username">Publié par</p> 
      <p id="username">{{ message.User?.username }}</p>
      </div>
      <p id="datePost">Posté le {{ message.createdAt?.slice(0,10).split("-").reverse().join("/")}} </p>
      <h1 class="card__title">{{ message.title }}</h1>
      <h3 class="card__content">{{ message.content }}</h3>
      <div class="attachment" v-if="message.attachment !== null">
      <img :src="message.attachment" alt=""/>
      </div>
            <Like />
    </div>
                <Comment />
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
  /*modifyMessage() {
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
    }*/
  },
}
</script>


<style lang="scss">

@import "src/scss/_variables.scss";

</style>