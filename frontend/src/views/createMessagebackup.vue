<template>
  <div class="card">
    <form class="createMessage">
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
      <button class="button" @click="submit(this.message)">Publier</button>
    </form>
        <div
      class="card"
      id="hoverCard"
      v-for="message in messages" :key="message.id">
      <div class="displayMessage">
        <div class="deletePost">
          <font-awesome-icon
            icon="times"
            v-if="message.UserId == this.$store.state.user.userId || this.$store.state.user.isAdmin == 1"
            @click="deleteMessage(message)"
          />
        </div>
        <router-link :to="{ name: 'OneMessage', params: { id: message.id } }">
          <div class="publishedBy">
            <p class="card__username">Publié par</p>
            <p id="username">{{ message.User.username }}</p>
          </div>
          <p id="datePost">
            Posté le
            {{
              message.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/")
            }}
          </p>
          <h1 class="msgCard__title">{{ message.title }}</h1>
          <p class="msgCard__content">{{ message.content }}</p>
          <img class="msgCard_attachment" :src="message.attachment" alt="" />
        </router-link>
        <div class="like">
          <font-awesome-icon
            id="likeIcon"
            icon="thumbs-up"
            @click="likePost(message)"
          />
          <p>{{ message.likes }}</p>
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

      if (this.title.length == 0 || this.content.length <= 5) {
        alert(
          "Le titre doit faire au minimum un caractère, le message au moins 5 caractères"
        );
      } else {
        axios
          .post("http://localhost:3000/api/messages/new", data, { headers })

          .then(() => {
            alert("Votre message a bien été envoyé !");
            this.$emit("postAdded", { message: this.message });
            this.messages = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
.createMessage {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-radius: 16px;
  padding: 5px;

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