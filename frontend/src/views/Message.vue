<template>
 <div class="newMessage">
      <form class="createMessage">
        <h1>Poster un nouveau message</h1>
        <div class="item">
          <p>Title</p>
          <div>
            <input type="text" placeholder="Title" v-model="title"/>
          </div>
        </div>
        <div class="item">
          <p>Message</p>
          <textarea v-model="content"></textarea>
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
submit() {
  // POST request using axios with set headers
  const token = this.$store.state.user.token
  const data = {
    title: this.title,
    content: this.content,
    attachment: 0
    }
    console.log(data)
  const headers = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  }

       axios.post("http://localhost:3000/api/messages/new", data, { headers })

   .then((response) => 
      {
          console.log(response) 
          {
              this.$router.push("/feed")
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