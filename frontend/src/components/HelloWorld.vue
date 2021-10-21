<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="inscrites == 0">Aucune personne inscrite pour le moment 😥 </p>
    <p v-else-if="inscrites == 1">Une seule personne est inscrite</p>
    <p v-else>{{ inscrites }} personnes sont inscrites 🔥</p>
    <button v-on:click="register()">Inscrivez-vous</button>
    <div class="comment" v-for="(comment, idx) in comments" v-bind:key="idx">
    <h3>{{comment.nom}}</h3>
    <p>{{comment.commentaire}}</p>
    <div v-if="comment.note > 1">
    <span v-for="i in comment.note" v-bind:key="i">🍌</span>
    </div>
    <span v-else>💩</span>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
      inscrites: 0,
      comments: [{
        nom: 'Charly',
        commentaire: 'Premier message !',
        note: 0,
      },{
        nom: 'Lucie',
        commentaire: 'Et le deuxième !',
        note: 5,
      },{
        nom: 'Isaac',
        commentaire: 'Hello à tous',
        note: 1,
      }]
    }
  },
  methods: {
    register: function () {
      this.inscrites++;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
  font-size: 2em;
}
</style>
