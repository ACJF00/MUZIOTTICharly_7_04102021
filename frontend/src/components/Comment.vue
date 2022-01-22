<template>
  <div class="general" id="comment">
   <div class="createComment">
          <textarea rows="2" cols="60" v-model="content" placeholder="Votre commentaire"></textarea>
    <font-awesome-icon icon="arrow-circle-right" id="sendComment" @click="createComment(content)" /> 
    </div>
  <div class="displayMessage" id="displayComment">
   <div class="feedComments" v-for="comment in comments" :key="comment.id" @listComments="listComments">
     <div class="deletePost">
        <font-awesome-icon icon="times" v-if="comment.UserId == this.$store.state.user.userId" @click="deleteComment(comment)" /> 
        <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteComment(comment)" />
      </div>
      <div class="publishedBy">
      <p class="card__username" >Publié par</p> 
      <p id="username">{{ comment.username }}</p>
      </div>
      <p id="datePost">Posté le {{ comment.createdAt?.slice(0,10).split("-").reverse().join("/")}} </p>
        <p class="oneComment">{{ comment.content }} </p>  
      </div>
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

#comment {
    padding-top: 2em;
    margin-top: 1em;
    background-color: #d14f59;
    border-radius: 0px 0px 16px 16px;
}

    .createComment {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 1em;
    
    textarea {
    padding-top: 1.5em;
    padding-left: 0.5em;
    resize: none;
    width: 80%;
    border-radius: 8px;
  }
    #sendComment{
      font-size: 2.5em;
      color: white;
      cursor: pointer;
    }
}

.feedComments {
    display: flex;
    justify-content: center;
    width: 100%;

    div.displayComment {
    display: flex;
    justify-content: center;
    border-radius: 8px;
    margin: 0.4em;
    background-color: white;
    width: 80%;
    flex-direction: column;
    padding: 0.4em;
    box-shadow: 0px 0px 2px 1px white;
}

.oneComment{
    width: 100%;
    display: flex;
    font-weight: normal;
    max-width: 20em;
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