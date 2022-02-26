<template>
  <div class="general">
    <button class="button" v-on:click="isHidden = !isHidden">
      {{ isHidden ? "Nouveau message" : "Cacher" }}
    </button>
    <transition name="fade">
      <form
        v-if="!isHidden"
        id="msg__transition"
        class="createMessage"
        @submit.prevent="submit()"
      >
        <div class="item">
          <div>
            <input
              id="fillBlock"
              type="text"
              placeholder="Titre (Min 1 caractère)"
              v-model="title"
            />
          </div>
        </div>
        <div class="item">
          <textarea
            id="fillBlock"
            placeholder="Nouveau message (Min 5 caracère)"
            v-model="content"
          ></textarea>
        </div>
        <div class="item">
          <input
            id="chooseFile"
            type="file"
            ref="file"
            @change="onFileSelected(message)"
          />
        </div>
        <div class="message-erreur">{{ errorMessage }}</div>
        <button class="button">Publier</button>
      </form>
    </transition>
    <div
      class="card"
      id="hoverCard"
      v-for="newMessage in newMessages"
      :key="newMessage.id"
    >
      <div class="displayMessage">
        <div class="publishedBy">
          <p class="card__username">Publié par</p>
          <p id="username">{{ newMessage.username }}</p>
        </div>
        <p id="datePost">
          Posté le
          {{
            newMessage.createdAt
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/")
          }}
        </p>
        <h1 class="msgCard__title">{{ newMessage.title }}</h1>
        <p class="msgCard__content">{{ newMessage.content }}</p>
        <img class="msgCard_attachment" :src="newMessage.attachment" alt="" />
        <div class="like">
          <font-awesome-icon
            id="likeIcon"
            icon="thumbs-up"
            @click="likePost(message)"
          />
          <p>{{ newMessage.likes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "message",
  data() {
    return {
      message: {
        title: "",
        content: "",
        attachment: null,
      },
      title: "",
      content: "",
      newMessages: [],
      isHidden: true,
      errorMessage: "",
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
  },
  methods: {
    onFileSelected() {
      this.attachment = this.$refs.file.files[0];
    },
    submit() {
      // POST request using axios with set headers
      const token = this.$store.state.user.token;
      const data = new FormData();
      if (this.attachment !== null) {
        data.append("title", this.title);
        data.append("content", this.content);
        data.append("attachment", this.attachment);
      } else {
        data.append("title", this.title);
        data.append("content", this.content);
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const today = new Date();
      const getMonth =
        (today.getMonth() + 1).toString().length === 1
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1;
      const currentDate =
        today.getDate() + "/" + getMonth + "/" + today.getFullYear();

      if (this.title.length == 0 || this.content.length <= 5) {
        alert(
          "Le titre doit faire au minimum un caractère, le message au moins 5 caractères"
        );
      } else if (this.attachment == null) {
        this.newMessages.push({
          title: this.title,
          content: this.content,
          createdAt: currentDate,
          username: this.$store.state.user.username,
        });
        axios
          .post("http://localhost:3000/api/messages/new", data, { headers })
          .catch((error) => {
            this.errorMessage = error.response.data.error;
          });
      } else {
        axios
          .post("http://localhost:3000/api/messages/new", data, { headers })
          .then(() => {
            alert("Votre message a bien été envoyé !");
            this.$router.go();
          })
          .catch((error) => {
            this.errorMessage = error.response.data.error;
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

.createMessage {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 30%;
  border-radius: 16px;
  padding: 5px;
  background: $card-color;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

  h1 {
    text-align: center;
  }
}

.item {
  padding: 5px;
  width: 80%;
}

.item #fillBlock {
  width: 100%;
  border-radius: 8px;
  resize: none;
  padding-left: 0.5em;
  display: flex;
  text-align: center;
}

input#chooseFile {
  width: 95%;
  cursor: pointer;
}
</style>
