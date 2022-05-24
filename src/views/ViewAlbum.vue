<template>
  <h2>Album View</h2>
  <h4>{{ message }}</h4>
  <h3>{{ album.title }}</h3>
  <v-btn color="success" @click="goEditAlbum()">Edit</v-btn>
  <v-btn color="success" @click="goAddLesson(id)">Add A Track</v-btn>

  <v-row>
    <v-col cols="8" sm="2">
      <span class="text-h6">Track Name</span>
    </v-col>
    <v-col cols="8" sm="4">
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
    v-for="track in tracks"
    :key="track.id"
    :track="track"
    @deleteLesson="goDeleteLesson(lesson)"
    @updateLesson="goEditLesson(lesson)"
  />
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import LessonDataService from "../services/LessonDataService";
import TrackDisplay from "@/components/TrackDisplay.vue";
export default {
  name: "view-album",
  props: ["id"],
  components: {
    TrackDisplay,
  },
  data() {
    return {
      album: {
        id: 1,
        title: "Beach Boys Album 1",
        numberOfTracks: 10,
        artistId: 1,
      },
      tracks: [
        {
          id: 1,
          trackName: "Track 1",
          trackNumber: 1,
        },
        {
          id: 2,
          trackName: "Track 2",
          trackNumber: 3,
        },
        {
          id: 3,
          trackName: "Track 3",
          trackNumber: 3,
        },
        {
          id: 4,
          trackName: "Track 4",
          trackNumber: 4,
        },
      ],
      message: "Add, Edit or Delete Lessons",
    };
  },
  methods: {
    retrieveLessons() {
      TutorialDataService.get(this.id)
        .then((response) => {
          this.tutorial = response.data;
          LessonDataService.getAllLessons(this.id)
            .then((response) => {
              this.lessons = response.data;
            })
            .catch((e) => {
              this.message = e.response.data.message;
            });
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
  //   mounted() {
  //     this.retrieveLessons();
  //   },
};
</script>

<style>
</style>