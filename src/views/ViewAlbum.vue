<template>
  <div v-if="album">
    <h2>Album View</h2>
    <h4>{{ message }}</h4>
    <h3>{{ album.title }}</h3>
    <v-btn color="success" @click="goEditAlbum()">Edit</v-btn>
    <v-btn color="success" @click="goAddLesson(id)">Add A Track</v-btn>

    <v-row>
      <v-col cols="8" sm="2">
        <span class="text-h6">Track Name</span>
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
      @deleteTrack="goDeleteLesson(track)"
      @updateTrack="goEditLesson(track)"
    />
  </div>
  <div v-else>Loading</div>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import TrackDisplay from "@/components/TrackDisplay.vue";
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
    goEditTutorial() {
      this.$router.push({ name: "edit", params: { id: this.id } });
    },
    goEditLesson(lesson) {
      this.$router.push({
        name: "editLesson",
        params: { tutorialId: this.id, lessonId: lesson.id },
      });
    },
    goAddLesson() {
      this.$router.push({ name: "addLesson", params: { tutorialId: this.id } });
    },

    goDeleteLesson(lesson) {
      LessonDataService.deleteLesson(lesson.tutorialId, lesson.id)
        .then(() => {
          this.retrieveLessons();
        })
        .catch((e) => {
          this.message = e.response.data.message;
        });
    },
    cancel() {
      this.$router.push({ name: "tutorials" });
    },
  },
  mounted() {
    this.retrieveTracks();
  },
};
</script>

<style>
</style>