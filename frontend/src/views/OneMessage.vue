<template>
  <div>
    <div class="card">
    <div class="deletePost">
      <font-awesome-icon icon="times" v-if="message.UserId == this.$store.state.user.userId" @click="deleteMessage" /> 
      <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteMessage" /> 
      </div>
      <h1 class="card__username">By {{ message.User?.username }}</h1>
      <h1 class="card__title">{{ message.title }}</h1>
      <h3 class="card__content">{{ message.content }}</h3>
      <div class="attachment" v-if="message.attachment !== null">
      <img :src="message.attachment" alt=""/>
      </div>
            <Like />
            <Comment />
            <p id="datePost">Posté le {{ message.createdAt?.slice(0,10).split("-").reverse().join("/")}} </p>
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

.card__title{
  font-size: 2em;
} 
.card__content{
  font-size: 1.5em;
  text-align: center;
  margin: 20px;
} 
.attachment{
  img{
  width: 100%;
  height: auto;
  }
}
/** .deletePost {
  display: flex;
  justify-content: right;
  width: 100%;
  margin: -1em;
}
  */
</style>