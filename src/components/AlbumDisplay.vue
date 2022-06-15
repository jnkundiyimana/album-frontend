<template>
  <v-row>
    <v-col cols="9" sm="2">
      <span
        ><router-link
          class="album_title"
          :to="{ name: 'viewAlbum', params: { id: album.id } }"
          >{{ album.title }}</router-link
        ></span
      >
    </v-col>
    <v-col cols="9" sm="4">
      <span> {{ album.numberOfTracks }}</span>
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-pencil" @click="updateAlbum" />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn
        size="x-small"
        icon="mdi-format-list-bulleted-type"
        @click="viewAlbum"
      />
    </v-col>
    <v-col cols="9" sm="1">
      <v-btn size="x-small" icon="mdi-trash-can" @click="deleteAlbum" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    album: Object,
  },
  data() {
    return {};
  },
  methods: {
    deleteAlbum() {
      this.$emit("deleteAlbum");
    },
    updateAlbum() {
      this.$emit("updateAlbum");
    },
    viewAlbum() {
      this.$emit("viewAlbum");
    },
  },
};
</script>

<style>
.album_title {
  color: black;
  text-decoration: none;
}
.album_title:hover {
  color: rgb(77, 75, 75);
  text-decoration: underline;
}
</style>
