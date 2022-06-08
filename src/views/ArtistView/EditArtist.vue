<template>
  <div v-if="currentArtist" class="edit-form">
    <h1>Edit Artist</h1>
    <v-form>
      <v-row>
        <v-col cols="12" sm="4">
          <v-label>
            <span class="text-h8">Artist Name: </span>
          </v-label>
        </v-col>
        <v-col cols="12" sm="8">
          <v-text-field
            v-model="currentArtist.artistName"
          />
        </v-col>
      </v-row>
      
      
      <div class="form-group">
        <label for="artistName">Artist Name </label>
        <input type="text" class="form-control" id="artistName"
          v-model="currentArtist.artistName"
        />
      </div>
    </v-form>
     <button class="badge badge-danger mr-2"
      @click="deleteArtist"
    >
      Delete
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateArtist"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Artist...</p>
  </div>
</template>
<script>
import ArtistDataService from "../../services/ArtistDataService";
//import AlbumDataService from "../../services/AlbumDataService";
export default {
  name: "artistDetail",
  data() {
    return {
      currentArtist: null,
      message: ''
    };
  },
  methods: {
    getArtist(id) {
      ArtistDataService.get(id)
        .then(response => {
          this.currentArtist = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateArtist() {
       ArtistDataService.update(this.currentArtist.id, this.currentArtist)
        .then(response => {
          console.log("artist has been deleted",response.data);
          this.message = 'The artist was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteArtist() {
    //    var objs = [];
    //    AlbumDataService.getAll().then(res =>{
    //    objs = res.data;
    //    }).catch(err => {
    //      console.log(err);
    //    });
    //    console.log("this is an object", obj);
    //    for( i = 0; i<= objs.length; i++){
    //      if(objs[i].artistId == this.currentArtist.id){
    //        this.message = 'Artist album should be deleted first to delete Artist';
    //        return;
    //      }
         ArtistDataService.delete(this.currentArtist.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "artistList" });
        })
        .catch(e => {
          console.log(e);
        });
      //}
    },
  },
  mounted() {
    this.message = '';
    this.getArtist(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>