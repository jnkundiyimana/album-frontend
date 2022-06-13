<template>
  <div v-if="album">
    <h2>Album View</h2>
    <h4>{{ message }}</h4>
    <h3>{{ album.title }}</h3>
    <v-btn color="success" @click="goEditAlbum()">Edit</v-btn>
    <v-btn color="success" @click="goAddTrack(id)">Add A Track</v-btn>

    <v-row>
      <v-col cols="8" sm="2">
        <span class="text-h6">Track Name</span>
      </v-col>
      <v-col cols="8" sm="2">
        <span class="text-h6">Track Number</span>
      </v-col>
      <v-col cols="8" sm="1">
        <span class="text-h6">Edit</span>
      </v-col>
      <v-col cols="8" sm="1">
        <span class="text-h6">Delete</span>
      </v-col>
    </v-row>
    <TrackDisplay
      v-for="track in album.tracks"
      :key="track.id"
      :track="track"
      @deleteTrack="deleteTrack(track)"
      @editTrack="editTrack(track)"
    />
  </div>
  <div v-else>Loading</div>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import TrackDisplay from "@/components/TrackDisplay.vue";
import TrackDataService from "../services/TrackDataService";
export default {
  name: "view-album",
  props: ["id"],
  components: {
    TrackDisplay,
  },
  data() {
    return {
      album: null,
    };
  },
  methods: {
    retrieveTracks() {
      AlbumDataService.getTracksForAlbum(this.id)
        .then((response) => {
          this.album = response.data;
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    goEditAlbum() {
      this.$router.push({ name: "edit", params: { id: this.id } });
    },
    editTrack(track) {
      this.$router.push({
        name: "editTrack",
        params: { trackId: track.id, albumId: this.id },
      });
    },
    goAddTrack() {
      this.$router.push({ name: "addTrack", params: { albumId: this.id } });
    },

    deleteTrack(track) {
      TrackDataService.deleteTrack(track.albumId, track.id)
        .then(() => {
          this.retrieveTracks();
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
    this.retrieveTracks();
  },
};
</script>

<style>
</style>