<template>
  <div class="editBio">
    <div class="editedBio">
      <form class="formCreate">
        <div class="formEditedBio">
          <textarea id="bioEditingTxt"  name="bio" placeholder="New bio" v-model="bio"></textarea>
          <br />
        </div>
        <div id="btn-submitEdit">
        <button class="btn-primary" type="submit" @click="editBio()">Submit</button>
        </div>
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
      bio: ""
    }
  },
  methods: {
  editBio() {
      const bio = JSON.stringify(this.bio);
      const token = this.$store.state.user.token
      const userId = this.$store.state.user.userId 
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }
      axios
        .put(`http://localhost:3000/api/users/${userId}/edit`, { bio } , { headers })
        .then((response) => {
            let rep = JSON.parse(response.data);
            console.log(rep);
            window.location.assign('http://localhost:8080/Profile');
        })
        .catch((error) => {
         console.log(error)
        })
    }
  }
 }
</script>

<style lang="scss">
.formEditedBio{
  display: flex;
  justify-content: center;
  height: 3em;
  padding-top: 0.5em;
  
  #bioEditingTxt{
    width: 80%;
    height: 90%;
}
}

#btn-submitEdit{
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>>