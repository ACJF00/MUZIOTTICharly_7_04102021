<template>
 <div class="newMessage">
      <form>
        <h1>Poster un nouveau message</h1>
        <div class="item">
          <p>Title</p>
          <div>
            <input type="text" name="title" placeholder="Title" v-model="title"/>
          </div>
        </div>
        <div class="item">
          <p>Message</p>
          <textarea v-model="content"></textarea>
        </div>
        <div class="test">
          <button @click="submit()">Publier</button>
        </div>
      </form>
    </div>
</template>

<script>


export default {
    data() {
        return {
            title: "",
            content: "",
        }
    },
  methods: {
   submit(){
       console.log(this.content);
    }
   }
}
</script>