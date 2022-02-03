<template>
  <div class="general">
    <div class="card">
      <h1 class="card__title">Espace Perso</h1>
      <p class="card__subtitle">Voilà donc qui je suis...</p>
      <h2>{{ user.username }} || {{ user.email }}</h2>
      <div class="form-row">
        <p v-if="user.bio != ''" id="bio">{{ user.bio }}</p>
        <p v-else id="bio">Vous n'avez pas encore de bio</p>
        <button class="button" v-on:click="isHidden = !isHidden">
          {{ isHidden ? "Editer" : "Cacher" }}
        </button>
      </div>
      <transition name="fade">
        <p v-if="!isHidden"><Bio /></p>
      </transition>
      <hr />
      <div class="form-row">
        <button @click="logout()" class="button">Déconnexion</button>
        <button
          class="button"
          v-if="user.id == this.$store.state.user.userId"
          @click="deleteProfile(user)"
        >
          Supprimer le compte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import Bio from "@/components/Bio";

export default {
  name: "Profile",
  components: { Bio },

  data() {
    return {
      bio: "",
      isHidden: true,
    };
  },
  mounted: function() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    logout: function() {
      this.$store.commit("logout");
      this.$router.push("/");
    },
    deleteProfile(user) {
      const token = this.$store.state.user.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      if (confirm("Etes-vous sûr ?"))
        axios
          .delete(`http://localhost:3000/api/users/${user.id}`, { headers })
          .then((res) => {
            if (res) {
              this.logout();
              this.$router.push("/");
              alert("Votre profil a bien été supprimé !");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

h2 {
  text-align: center;
}

#bio {
  font-style: italic;
  margin-top: 2em;
  display: flex;
  border-left: 4px solid #ccc;
  padding-left: 8px;
  background-color: #ebeaea;
  width: 60%;
  overflow-x: auto;
  height: 3em;
  align-items: center;
  border-radius: 8px;
}

.btn-primary {
  display: flex;
  justify-content: center;
  align-self: center;
  font-size: xx-small;
  background-color: $btn-color;
  color: white;
  border-radius: 8px;
  transition: 0.4s background-color;
  margin-top: 1em;
  padding: 0.2em;
  font-size: 15px;
  font-weight: 800;
}
.btn-primary:hover {
  cursor: pointer;
  background: $btn-hover;
}
</style>
