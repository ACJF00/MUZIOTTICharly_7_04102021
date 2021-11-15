<template>
  <div>
    <div class="card">
    <div class="deletePost">
      <font-awesome-icon icon="times" v-if="message.UserId == this.$store.state.user.userId" @click="deleteMessage" /> 
      <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteMessage" /> 
      </div>
      <h1 class="card__username">{{ message.User }}</h1>
      <h1 class="card__title">{{ message.title }}</h1>
      <h3 class="card__content">{{ message.content }}</h3>
      <img :src="message.attachment" alt=""/>
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


<style>

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
</style>