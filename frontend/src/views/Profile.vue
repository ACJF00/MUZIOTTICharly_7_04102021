<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <h2> {{ user.username }} || {{ user.email }}</h2>
    <p> {{ user.bio }} </p>
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
      <button v-if="user.id == this.$store.state.user.userId" @click="deleteProfile(user)">Supprimer</button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import axios from "axios"

export default {
  name: 'Profile',
  mounted: function () {

    if (this.$store.state.user.userId == -1) {
      this.$router.push('/');
      return ;
    }
    this.$store.dispatch('getUserInfos');
  },
  computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    deleteProfile(user) {
      const token = this.$store.state.user.token
      //const isAdmin = this.$store.state.user.isAdmin
      //const userId = this.$store.state.user.userId
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }
      console.log(user.id)

      axios
              .delete(`http://localhost:3000/api/users/${user.id}`, { headers })
          .then((res) => {
              if (res)       {
                  this.logout()
                  this.$router.push("/");
          alert("Votre profil a bien été supprimé !");
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

<style scoped>
h2 {
text-align: center;
}
</style>>