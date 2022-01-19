<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <h2> {{ user.username }} || {{ user.email }}</h2>
    <p id="bio" > {{ user.bio }} </p>
    <button class="btn-primary" v-on:click="isHidden = !isHidden">
  {{ isHidden ? 'Editer' : 'Cacher' }}
</button>
<p v-if="!isHidden"><Bio /></p>
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
      <button v-if="user.id == this.$store.state.user.userId" @click="deleteProfile(user)">Supprimer</button>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex'
import axios from "axios"
import Bio from "@/components/Bio"

export default {
  name: 'Profile',
  components: { Bio },

  data() {
    return {
      bio: "",
      isHidden: true
    }
  },
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
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }

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

<style lang="scss">
h2 {
text-align: center;
}

#bio{
font-style: italic;
margin-top: 2em;
display: flex;
font-size: 16px;
margin-left: 32px;
border-left: 4px solid #CCC;
padding-left: 8px;
}

.btn-primary{
  width: 13%;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  font-size: xx-small;
}
</style>>