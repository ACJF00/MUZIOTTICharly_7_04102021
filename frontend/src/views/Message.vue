<template>
 <div class="general">
<CreateMessage />
    </div>
</template>

<script>

import axios from "axios"
import CreateMessage from "@/components/CreateMessage"

export default {
  name: "message",
  components: { CreateMessage },
  
  data() {
    return {
      messages: [],
      userId: this.$store.state.user.userId,
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

@import "src/scss/_variables.scss";

</style>