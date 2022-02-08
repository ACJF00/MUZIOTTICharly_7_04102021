<template>
  <div class="field">
    <div class="content">
      <h3>Liste des utilisateurs</h3>
      <hr />

      <div class="card" v-for="user in users" :key="user.id">
        <div class="displayMessage">
          <div class="deletePost">
            <font-awesome-icon
              icon="times"
              v-if="this.$store.state.user.isAdmin == 1"
              @click="deleteProfile(user)"
            />
            <br />
          </div>
          <span class="title font-weight-bold">
            Créé le : <p id="userDetails">
            {{
              user.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/")
            }}
          </p>
          </span>
          <span class="title font-weight-bold"
            >Username : <p id="userDetails">{{ user.username }}</p></span
          >
          <span class="title font-weight-bold">Email : <p id="userDetails">{{ user.email }}</p></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UsersList",

  data() {
    return {
      user: "",
      users: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/users", {
        headers: { Authorization: "Bearer " + localStorage.token },
      })
      .then((response) => (this.users = response.data.users))
      .catch((err) => console.log(err));
  },

  methods: {
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
              this.$router.push("/UsersList");
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
.content {
  h3 {
    text-align: center;
  }
  span{
    display: flex;
  #userDetails {
    color: $btn-color;
    font-weight: bold;
    padding-left: 0.5em;
  }
  }
}
</style>
