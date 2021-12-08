<template>
  <div class="comment">
   <div class="createComment">
          <textarea v-model="content"></textarea>
        </div>
    <button @click="createComment(content)">Commenter</button>
  </div>
   <div class="feedComments" v-for="comment in comments" :key="comment.id" @listComments="listComments">
   <div class="displayComment">
        <font-awesome-icon icon="times" v-if="comment.UserId == this.$store.state.user.userId" @click="deleteComment(comment)" /> 
        <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteComment(comment)" />
        <h1 class="oneComment">{{ comment.content }} </h1> 
      </div>
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
      this.$emit('listComments', content)
   .then((response) => 
      {
          this.content = response.data.push
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
    deleteComment(comment) {
      const token = this.$store.state.user.token
      const id = comment.id
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }

      axios
              .delete(`http://localhost:3000/api/messages/comment/${id}`, { headers })
          .then((res) => {
              if (res)       {
                    this.$router.go()	
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

<style>

.newMessage{
  box-shadow: 3px 3px 3px black;
  border-radius: 10px;
}
.displayComment{
  font-size: 0.6em;
  font-weight: normal;
  display: flex;
  justify-content: center;
  border: solid 0.5px;
  border-radius: 10px;
  margin: 1em;
  flex-direction: row;
  background-color: #E8EDF3;
  width: 80%;
  align-items: center;
}
</style>