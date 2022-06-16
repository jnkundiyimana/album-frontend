<template>
  <h1>Edit Track</h1>
  <h4>{{ message }}</h4>
  <h4>Album : {{ albumId }} Track : {{ trackId }}</h4>

  <v-form>
    <v-text-field label="Title" v-model="track.trackName" />
    <v-text-field label="Track Number" v-model="track.trackNumber" />
    <v-row justify="center">
      <v-col col="2"> </v-col>
      <v-col col="2">
        <v-btn color="success" @click="saveTrack()">Save</v-btn>
      </v-col>
      <v-col col="2">
        <v-btn color="info" @click="cancel()">Cancel</v-btn>
      </v-col>
      <v-col col="2"> </v-col>
    </v-row>
  </v-form>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
export default {
  name: "edit-track",
  props: { albumId: String, trackId: String },
  data() {
    return {
      track: Object,
      message: "Enter data and click save",
    };
  },
  methods: {
    retrieveTrack() {
      TrackDataService.getTrack(this.albumId, this.trackId)
        .then((response) => {
          this.track = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    saveTrack() {
      var data = {
        trackName: this.track.trackName,
        trackNumber: this.track.trackNumber,
        albumId: this.track.albumId,
      };
      TrackDataService.editTrack(this.track.albumId, this.track.id, data)
        .then((response) => {
          this.track.id = response.data.id;

          this.$router.push({
            name: "viewAlbum",
            params: { id: this.track.albumId },
          });
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({
        name: "viewAlbum",
        params: { id: this.track.albumId },
      });
    },
  },
  mounted() {
    this.retrieveTrack();
  },
};
</script>
<style>
</style>