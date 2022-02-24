<template>
  <div class="editBio">
    <div class="editedBio">
      <form class="formCreate">
        <div class="formEditedBio">
          <textarea
            id="bioEditingTxt"
            name="bio"
            placeholder="Nouvelle bio"
            v-model="bio"
          ></textarea>
          <br />
        </div>
        <div class="form-row">
          <button class="button" type="submit" @click="editBio()">
            Soumettre
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Bio",

  data() {
    return {
      bio: "",
    };
  },
  methods: {
    editBio() {
      const bio = this.bio;
      const token = this.$store.state.user.token;
      const userId = this.$store.state.user.userId;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .put(
          `http://localhost:3000/api/users/${userId}/edit`,
          { bio },
          { headers }
        )
        .then((response) => {
          JSON.stringify(response.bio),
            window.location.assign("http://localhost:8080/Profile");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.formEditedBio {
  display: flex;
  justify-content: center;
  height: 3em;
  padding-top: 0.5em;

  #bioEditingTxt {
    width: 80%;
    padding-left: 0.5em;
    resize: none;
    border-radius: 8px;
  }
}
</style>
