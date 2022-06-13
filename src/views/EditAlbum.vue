<template>
  <h1>Album Edit</h1>
  <h4>{{ message }}</h4>
  <v-form>
    <v-text-field label="Title" v-model="album.title" />
    <v-text-field label="Number Of Tracks" v-model="album.numberOfTracks" />
    <v-select
      :items="artists"
      label="Artist"
      item-title="artistName"
      item-value="id"
      v-model="album.artistId"
    ></v-select>
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveAlbum()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "add-album",
  data() {
    return {
      album: {
        id: null,
        title: "",
        numberOfTracks: "",
        artistId: "",
      },
      message: "Enter data and click save",
      artists: [],
    };
  },
  methods: {
    saveAlbum() {
      var data = {
        title: this.album.title,
        numberOfTracks: this.album.numberOfTracks,
        artistId: this.album.artistId,
      };
      AlbumDataService.update(this.album.id, data)
        .then((response) => {
          this.album.id = response.data.id;
          console.log("add ", JSON.stringify(response.data));
          this.$router.push({ name: "albums" });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "albums" });
    },
  },
  mounted() {
    ArtistDataService.getAll()
      .then((response) => {
        this.artists = response.data;
        console.log("artists:: ", response.data);
        //  console.log(this.artists.[0].name);
      })
      .catch((e) => {
        this.message = e.response.data.message;
      });

    AlbumDataService.get(this.$route.params.id)
      .then((response) => {
        this.album = response.data;
        console.log("album:: ", response.data);
        //  console.log(this.artists.[0].name);
      })
      .catch((e) => {
        this.message = e.response.data.message;
      });
  },
};
</script>
<style>
</style>