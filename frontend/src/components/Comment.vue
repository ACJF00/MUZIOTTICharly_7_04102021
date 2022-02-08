<template>
  <div class="general" id="comment">
    <div class="createComment">
      <textarea
        rows="2"
        cols="60"
        v-model="content"
        placeholder="Votre commentaire"
      ></textarea>
      <font-awesome-icon
        icon="arrow-circle-right"
        id="sendComment"
        @click="createComment(content)"
      />
    </div>
        <div
      class="card"
      v-for="newComment in newComments"
      :key="newComment.id"
      @listComments="listComments"
    >
      <div class="displayMessage">
        <div class="publishedBy">
          <p class="card__username">Publié par</p>
          <p id="username">{{ newComment.username }}</p>
        </div>
        <p id="datePost">
          Posté le
          {{
            newComment.createdAt
              ?.slice(0, 10)
              .split("-")
              .reverse()
              .join("/")
          }}
        </p>
        <p class="oneComment">{{ newComment.content }}</p>
      </div>
    </div>
    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
      @listComments="listComments"
    >
      <div class="displayMessage">
        <div class="deletePost">
          <font-awesome-icon
            icon="times"
            v-if="comment.UserId == this.$store.state.user.userId"
            @click="deleteComment(comment)"
          />
          <font-awesome-icon
            icon="times"
            v-else-if="this.$store.state.user.isAdmin == 1"
            @click="deleteComment(comment)"
          />
        </div>
        <div class="publishedBy">
          <p class="card__username">Publié par</p>
          <p id="username">{{ comment.username }}</p>
        </div>
        <p id="datePost">
          Posté le
          {{
            comment.createdAt
              ?.slice(0, 10)
              .split("-")
              .reverse()
              .join("/")
          }}
        </p>
        <p class="oneComment">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "createComment",
  data() {
    return {
      comments: [],
      newComments: [],
    };
  },
  mounted() {
    this.listComments();
  },
  methods: {
    createComment(content) {
      // Headers
      const token = this.$store.state.user.token;
      const messageId = this.$route.params.id;
      const today = new Date()
      const getMonth = (today.getMonth() + 1).toString().length === 1 ? `0${today.getMonth() + 1}`:today.getMonth() + 1 
      const currentDate = today.getDate() +"/"+ getMonth +"/"+today.getFullYear();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      if (!content == "") {
        this.newComments.push({
          content: this.content,
          createdAt: currentDate,
          username: this.$store.state.user.username,
        });
        axios.post(
          `http://localhost:3000/api/messages/${messageId}/comment/new`,
          { content },
          { headers }
        );
      } else {
        alert("Votre commentaire est vide");
      }
    },

    listComments() {
      const messageId = this.$route.params.id;
      axios
        .get(`http://localhost:3000/api/messages/${messageId}/comments/`)
        .then((response) => {
          this.comments = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment(comment) {
      const token = this.$store.state.user.token;
      const id = comment.id;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(`http://localhost:3000/api/messages/comment/${id}`, { headers })
        .then((res) => {
          if (res) {
            this.$router.go();
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

#comment {
  padding-top: 2em;
  margin-top: 1em;
  background-color: #d14f59;
  border-radius: 0px 0px 16px 16px;
}

.createComment {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 1em;

  textarea {
    padding-top: 1.5em;
    padding-left: 0.5em;
    resize: none;
    width: 80%;
    border-radius: 8px;
  }
  #sendComment {
    font-size: 2.5em;
    color: white;
    cursor: pointer;
  }
}
</style>
