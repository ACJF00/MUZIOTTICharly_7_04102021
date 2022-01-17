<template>
    <div class="field">
        <div class="content">
            <h3>Liste des utilisateurs</h3>
            <hr />

            <div class="card" v-for="user in users" :key="user.id">
                <p class="title font-weight-bold">Créé le : {{ user.createdAt.slice(0,10).split("-").reverse().join("/") }}</p>
                <span class="title font-weight-bold">Username : {{ user.username }}</span>
                <p class="title font-weight-bold">Email : {{ user.email }}</p>
                <font-awesome-icon icon="times" v-if="user.UserId == this.$store.state.user.userId" @click="deleteProfile(user)" /> 
                <font-awesome-icon icon="times" v-else-if="this.$store.state.user.isAdmin == 1" @click="deleteProfile(user)" /> 
                <br />
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios"
export default {
  name: 'UsersList',

  data() {
    return {
            user: "",
            users: [],
      }
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
      const token = this.$store.state.user.token
      const headers = { 
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      }

      axios
              .delete(`http://localhost:3000/api/users/${user.id}`, { headers })
          .then((res) => {
              if (res) {
                  this.$router.push("/UsersList");
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