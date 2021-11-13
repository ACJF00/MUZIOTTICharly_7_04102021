<template>
  <div class="comment">
   <div class="feedComments" v-for="comment in comments" :key="comment.id">
        <h1>{{ comment.content }}</h1>
      <button v-if="comment.UserId == this.$store.state.user.userId" @click="deleteComment">Supprimer</button>
      <button v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteComment">Supprimer</button>
      </div>
  <div class="createComment">
          <p>Commentaire</p>
          <textarea v-model="content"></textarea>
        </div>
    <button @click="createComment(content)">Commenter</button>
  </div>
</template>

<script>

import axios from "axios"


export default {
  name: "createComment",
    data() {
        return {
          content: "",
          comments: []
            }
    },
      mounted() {
    this.listComments()
    },
  methods: {
createComment(content) {
  // Headers
  const token = this.$store.state.user.token
  const messageId = this.$route.params.id

   const headers = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }

       axios.post(`http://localhost:3000/api/messages/${messageId}/comment/new`, { content }, { headers })

   .then((response) => 
      {
          this.comment = response.data
          alert("Votre commentaire a bien été envoyé !");
          this.$router.push("/feed");
      })
    .catch((error) => 
      {
          console.log(error)
      })
    },
  listComments() {
    const messageId = this.$route.params.id
    axios
      .get(`http://localhost:3000/api/messages/${messageId}/comments/`)
      .then((response) => {
        this.comments = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },
         deleteComment() {
      const token = this.$store.state.user.token
      const comment = this.comments.data
      const id = comment.id
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }

      axios
              .delete(`http://localhost:3000/api/messages/comment/${id}`, { headers })
          .then((res) => {
              if (res)       {
                    this.$router.push("/feed");
          alert("Votre commentaire a bien été supprimé !");
          }
      })
    .catch((error) => 
      {
          console.log(error)
      })
  },
}
}

</script>