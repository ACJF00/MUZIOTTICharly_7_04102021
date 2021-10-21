<template>
  <div class="createPost">

        <h2>Enter you text here :</h2>
        <div class="newPost">
            <form class="formCreate" v-on:submit.prevent="createMessage">

                <div class="formNewPost">
                    <label for="title"></label>
                    <input name="title" class="contentNewPost" placeholder="Message title here" required v-model="title"><br>
                </div>

                <div class="formNewPost">
                    <label for="content"></label>
                    <textarea name="content" class="contentNewPost" placeholder="Text content here" required v-model="content"></textarea> <br>
                </div>

                <div class="formNewPost">
                    <label for="image">
                        <input class="imageNewPost" type="file" name="image" ref="image" v-on:change="upload"> <br>
                    </label>
                </div>

                <button type="submit">Publier</button>

            </form>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'Message',
  data() {
    return {
      title: '',
      content: '',
    }
  },
  mounted() {
    if (this.$store.state.user.userId == -1) { // if userId doesn't exist
      this.$router.push("/") //go back to login
      return
    }
  },

  methods: {
    createMessage() {
      const formCreate = document.getElementsByClassName("formCreate")[0]
      const token = this.$store.state.user.token
      let data = new FormData(formCreate)
         
      axios
      .post("http://localhost:3000/api/messages/new", data, {
          headers: {
              "Content-Type" : "application/json",
              "Authorization": `Bearer ${token}`
          }
      })
      .then ((response) => 
      {
          if (response) 
          {
              this.$router.push("/feed")
          }
      })
      .catch ((err) => 
      {
          console.log(err)
      })
    }
  }
}
</script>