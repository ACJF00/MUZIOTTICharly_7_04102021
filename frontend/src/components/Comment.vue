<template>
  <div class="comment">
   <div class="createComment">
          <textarea rows="2" cols="60" v-model="content" placeholder="Votre commentaire"></textarea>
        </div>
    <font-awesome-icon icon="arrow-circle-right" id="sendComment" @click="createComment(content)" /> 
  </div>
   <div class="feedComments" v-for="comment in comments" :key="comment.id" @listComments="listComments">
   <div class="displayComment">
        <font-awesome-icon icon="times" v-if="comment.UserId == this.$store.state.user.userId" @click="deleteComment(comment)" /> 
        <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteComment(comment)" />
        <h3 class="oneComment">{{ comment.content }} </h3> 
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
if (!content == "") {
       axios.post(`http://localhost:3000/api/messages/${messageId}/comment/new`, { content }, { headers })
   .then((response) => 
      {
          this.content = response.data
          location.reload()
      })
    .catch((error) => 
      {
          console.log(error)
      })
    } else{
      alert("Votre commentaire est vide")
    }
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

<style lang="scss">

@import "src/scss/_variables.scss";

.comment {
    display: flex;
    justify-content: space-around;
    align-items: center;

textarea {
    margin-left: -1em;
    padding-top: 1.5em;
    padding-left: 0.5em;
    resize: none;
    width: 100%;
    border-radius: 8px;
  }
    #sendComment{
      font-size: 2.5em;
      color: $blue;
      cursor: pointer;
    }
}
.feedComments {
    display: flex;
    justify-content: center;
}

.displayComment{
    display: flex;
    justify-content: center;
    border: solid 0.1px;
    border-radius: 8px;
    margin: 0.5em;
    background-color: #B5EBF7;
    width: 80%;
    flex-direction: row-reverse;

.oneComment{
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: normal;
    max-width: 20em;
    padding-left: 1em;
    overflow-y: scroll;
}
    #clickDelete{
      margin-right: 0.3em;
      margin-bottom: auto;
    }
}

/*@media (min-width: 360px) and (max-width: 850px) {
.createComment {
    display: flex;
    flex-direction: column;
    height: 10em;
}
textarea{
  width: 20em;
}
#sendComment{
      display: flex;
      justify-content: center;
    }
}*/
</style>