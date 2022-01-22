<template>
 <div class="card">
      <form class="createMessage">
        <div class="item">
          <div>
            <input id="fillBlock" type="text" placeholder="Title" v-model="title"/>
          </div>
        </div>
        <div class="item">
          <textarea id="fillBlock" placeholder="Nouveau message" v-model="content"></textarea>
        </div>
       <div class="item">
        <input id="chooseFile" type="file" ref="file" @change="onFileSelected(message)">
        </div>
        <button class="button" @click="submit(this.message)">Publier</button>
      </form>
    </div>
</template>

<script>

import axios from "axios"

export default {
  name: "message",
    data() {
        return {
          message: {
           'title': "",
           'content': "",
           'attachment': null
        }
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

<style lang="scss">


.createMessage {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width:100%;
    border-radius: 20px;
    padding: 5px;

    h1{
      text-align: center;
    }
}

.item {
    padding: 5px;
}

.item #fillBlock {
    width: 100%;
    border-radius: 5px;
    resize: none;
    padding-left: 0.5em;
}

input#chooseFile {
    width: 95%;
}

</style>