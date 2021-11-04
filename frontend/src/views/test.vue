  submit(){
     
  // POST request using axios with set headers
  const formCreate = document.getElementsByClassName("createMessage")[0] 
  const token = this.$store.state.user.token
  let data = new FormData(formCreate)
  const headers = { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
  axios.post("http://localhost:3000/api/messages/new", data, { headers })
   .then(res => 
      {
          if (res) 
          {
              this.$router.push("/feed")
          }
      })
      .catch(error => 
      {
          console.log( error.message )
      })
    }
  }
}


######PROFILE INFO########

<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <h2> {{ user.username }} || {{ user.email }}</h2>
    <p> {{ user.bio }} </p>
    <div class="form-row">
      <button @click="logout()" class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>

import axios from "axios"

export default {
  name: 'ProfileInfos',
  data() {
    return {
          username: this.username,
          email: this.email,
          bio: this.bio
    }
  },
  mounted() {
    this.GetProfileInfos()
    },

  methods: {
GetProfileInfos() {
      const userId = user.userId

    axios
      .get(`http://localhost:3000/api/users/${userId}`)
      .then((user) => {
        user.username,
      })
      .catch((error) => {
        console.log(error)
      })
  },
  }
}
</script>










