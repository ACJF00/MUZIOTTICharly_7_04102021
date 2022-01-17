<template>
  <div class="editBio">
    <div class="editedBio">
      <form class="formCreate">
        <div class="formEditedBio">
          <textarea name="bio" placeholder="New bio" v-model="bio"></textarea>
          <br />
        </div>
        <button type="submit" @submit.prevent="editBio(bio)">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Bio",

  data() {
    return {
        bio: "",
    }
  },
  methods: {
  editBio() {
      this.bio = JSON.stringify(this.bio);
      const token = this.$store.state.user.token
      const userId = this.$store.state.user.userId 
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }
      axios
        .put(`http://localhost:3000/api/users/${userId}`, this.bio , { headers })
        .then((response) => {
            let rep = JSON.stringify(response.bio);
            console.log(rep);
            this.bio = false;
            window.location.assign('http://localhost:8080/Profile');
        })
        .catch((error) => {
         console.log(error)
         console.log("prout");
        })
    }/*
        editBio(bio) {
      this.activeEdit = bio
    }
    doneEdit(bio) {
      if (!this.activeEdit) {
        return
      }
      this.activeEdit = null
      bio = bio.trim()
    }
  }
 
  */
  }
 }
</script>