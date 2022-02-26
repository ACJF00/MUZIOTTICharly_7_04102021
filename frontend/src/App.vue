<template>
  <div class="general">
    <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
    <header>
      <div class="overlay">
        <img
          alt="Groupomania banner"
          src="./assets/icon-left-font-monochrome-white.png"
        />
        <hr />
        <h3>Bienvenue sur le réseau social de Groupomania</h3>
        <br />
      </div>
      <nav>
        <router-link to="/Profile">Profil</router-link> |
        <router-link to="/feed">Mur de messages</router-link>
        <router-link to="/UsersList" v-if="this.$store.state.user.isAdmin == 1">
          | Liste des utilisateurs</router-link
        >
      </nav>
    </header>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Footer },
};
</script>

<style lang="scss">
@import "src/scss/_variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

header {
  text-align: center;
  width: 100%;
  height: auto;
  .overlay {
    width: 100%;
    height: 100%;
    color: #fff;
    text-shadow: 1px 1px 1px #333;
    background-color: $header-color;
    border-radius: 16px;
    box-shadow: 2px 2px 5px black;
    padding: 10px;
    img {
      max-height: 10em;
      height: auto;
    }
    h3 {
      font-size: xx-large;
    }
    hr {
      border-top-color: #bbb;
      opacity: 0.5;
      margin: 1em;
    }
  }

  header h1 {
    font-size: 80px;
    margin-bottom: 30px;
  }

  header h3,
  p {
    margin-bottom: 30px;
  }
}

nav {
  padding: 20px;
  a {
    text-decoration: none;
    color: $nav-txt-color;
  }
  a:hover {
    text-decoration: underline;
  }
}
body {
  background-color: $main-color;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
}
img {
  max-width: 100%;
  border-radius: 8px;
  height: 10em;
  width: auto;
}
.general {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  background: $card-color;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin: 1em;
  width: 90%;
  color: $card-txt;
  max-width: 34em;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);

  transition: border-left 300ms ease-in-out, padding-left 300ms ease-in-out;

  a {
    text-decoration: none;
    color: $nav-txt-color;
  }

  .card__username {
    display: flex;
    justify-content: right;
    font-weight: normal;
  }

  .card__content {
    font-size: 1.5em;
    text-align: center;
    margin: 20px;
    font-weight: normal;
  }

  .card__title {
    text-align: center;
    font-weight: 800;
    font-size: 2em;
  }
  .card__subtitle {
    text-align: center;
    font-weight: 500;
    padding: 1em;
  }

  .displayMessage {
    display: flex;
    flex-direction: column;
    padding: 1em;
    img {
      height: auto;
      padding-top: 1em;
      padding-bottom: 1em;
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 70%;
      border-radius: 36px;
    }
    .publishedBy {
      display: flex;
      font-size: 0.7em;
      width: 100%;
      #username {
        color: #d14f59;
        font-weight: bold;
        padding-left: 1%;
      }
    }
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
  .card__action {
    color: $btn-color;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor: pointer;
  }
  .button:hover {
    cursor: pointer;
    background: $btn-hover;
  }

  .deletePost {
    display: flex;
    justify-content: right;
    width: 100%;
  }

  #datePost {
    font-size: 0.7em;
    justify-content: right;
    display: flex;
  }

  .attachment {
    img {
      width: 100%;
      height: auto;
    }
  }
}
#hoverCard:hover {
  padding-left: 0.5rem;
  border-left: 0.5rem solid $header-color;
}

#hoverCard > :first-child {
  margin-top: 0;
}

#hoverCard > :last-child {
  margin-bottom: 0;
}
.pixel-spinner,
.pixel-spinner * {
  box-sizing: border-box;
}

.pixel-spinner {
  height: 70px;
  width: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pixel-spinner .pixel-spinner-inner {
  width: calc(70px / 7);
  height: calc(70px / 7);
  background-color: #ff1d5e;
  color: #ff1d5e;
  box-shadow: 15px 15px 0 0, -15px -15px 0 0, 15px -15px 0 0, -15px 15px 0 0,
    0 15px 0 0, 15px 0 0 0, -15px 0 0 0, 0 -15px 0 0;
  animation: pixel-spinner-animation 2000ms linear infinite;
}

@keyframes pixel-spinner-animation {
  50% {
    box-shadow: 20px 20px 0px 0px, -20px -20px 0px 0px, 20px -20px 0px 0px,
      -20px 20px 0px 0px, 0px 10px 0px 0px, 10px 0px 0px 0px, -10px 0px 0px 0px,
      0px -10px 0px 0px;
  }
  75% {
    box-shadow: 20px 20px 0px 0px, -20px -20px 0px 0px, 20px -20px 0px 0px,
      -20px 20px 0px 0px, 0px 10px 0px 0px, 10px 0px 0px 0px, -10px 0px 0px 0px,
      0px -10px 0px 0px;
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
