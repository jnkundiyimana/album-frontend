<template>
  <v-app>
    <v-app-bar>
      <v-img
        class="mx-2"
        :src="logo"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-app-bar-title>Album Tracker</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="goArtistList"> Artists </v-btn>
        <v-btn variant="text" @click="goAlbumList"> Albums </v-btn>
        <v-btn variant="text" @click="goAdd"> Add </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import logo from "./assets/album-logo.png";
export default {
  name: "App",

  data: () => ({
    logo,
  }),
  methods: {
    goArtistList(){
      this.$router.push({name: "artistList"})
    },
    goAdd() {
      this.$router.push({ name: "add" });
    },
    goAlbumList() {
      this.$router.push({ name: "albums" });
    },
  },
};
</script>

