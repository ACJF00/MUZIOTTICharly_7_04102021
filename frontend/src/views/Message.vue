<template>
 <div class="newMessage">
      <form class="createMessage">
        <h1>Poster un nouveau message</h1>
        <div class="item">
          <div>
            <input type="text" placeholder="Title" v-model="title"/>
          </div>
        </div>
        <div class="item">
          <textarea placeholder="Message" v-model="content"></textarea>
        </div>
       <div class="item">
        <p>Ajouter une image</p>
        <input type="file" ref="file" @change="onFileSelected()">
        </div>
      </form>
          <div class="test">
          <button @click="submit">Publier</button>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
  name: "message",
    data() {
        return {
            title: "",
            content: "",
            attachment: null
        }
    },
     mounted() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/")
      return
    }
  },
  methods: {
onFileSelected() {
   this.attachment = this.$refs.file.files[0];
},
submit() {
  // POST request using axios with set headers
  const token = this.$store.state.user.token
  const data =  new FormData() 
      if (this.attachment !== null) {
      data.append('title', this.title)
      data.append('content', this.content)
      data.append('attachment', this.attachment)      
      } else {
      data.append('title', this.title)
      data.append('content', this.content)
      }
   const headers = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }

       axios.post("http://localhost:3000/api/messages/new", data, { headers })

   .then(() => 
      {
          alert("Votre message a bien été envoyé !");
          this.$router.push("/feed");
      })
    .catch((error) => 
      {
          console.log(error)
      })
    }
  }
}
</script>