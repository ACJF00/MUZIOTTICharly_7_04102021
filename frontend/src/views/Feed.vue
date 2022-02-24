<template>
  <div class="general">
    <CreateMessage />
    <div
      class="card"
      id="hoverCard"
      v-for="(message) in messages" :key="message.id">
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
import CreateMessage from "@/components/CreateMessage";

export default {
  name: "Feed",
  components: { CreateMessage },


  data() {
    return {
      messages: [],
      userId: this.$store.state.user.userId,
      rows: 0,
      perPage: 10,
      currentPage: 1,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
    };
  },
  mounted() {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
  },
  created() {
    axios
      .get("http://localhost:3000/api/messages")
      .then((response) => {
        this.messages = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteMessage(message) {
      const token = this.$store.state.user.token;
      const messageId = message.id;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      if (confirm("Etes-vous sûr ?"))
        axios
          .delete(`http://localhost:3000/api/messages/${messageId}`, {
            headers,
          })
          .then((res) => {
            if (res) {
              this.$router.go();
              alert("Votre message a bien été supprimé !");
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    likePost(message) {
      const messageId = message.id;

      const token = this.$store.state.user.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      axios
        .post(
          `http://localhost:3000/api/messages/${messageId}/vote/like`,
          {},
          { headers }
        )
        .then((response) => {
          if (response.data.message == "Message liked !") {
            message.likes++;
          } else if (
            response.data.message == "I no longer like this message !"
          ) {
            message.likes--;
          }
        })
        .catch((error) => {
          console.log(error);
          alert("unable to like message !");
        });
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";

.msgCard__title {
  font-size: 1.3em;
}

.msgCard__content {
  margin-top: 20px;
  font-size: 1em;
}

.msgCard__datePost {
  font-size: x-small;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.button {
  background: $btn-color;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  padding: 16px;
  transition: 0.4s background-color;
}

.button:hover {
  cursor: pointer;
  background: $btn-hover;
}

.fade-enter-active,
.fade-leave-active {
  transition: max-height 0.5s ease-in-out;
  max-height: 400px;
}

.fade-enter,
.fade-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>

