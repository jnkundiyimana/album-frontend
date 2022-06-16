<template>
  <div v-if="currentArtist" class="edit-form">
    <h1>Edit Artist</h1> 
      <div class="form-group">
        <label for="artistName">Artist Name: </label>
        <input type="text" class="form-control" id="artistName"
          v-model="currentArtist.artistName" @input="checkArtist"
        />
      </div>
      <div class="row">
          <div class="col-md-6">
        <button type="submit" class="btn btn-primary btn-sm"
              @click="updateArtist"
        >
         Update
        </button>
      </div>
      <div class="col-md-6 text-right">
        <button class="btn btn-danger btn-sm"
          @click="cancelUpdate"
        >
          Cancel
        </button>
      </div>
      </div>
      
    
    
    <p style='color:red'>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Artist...</p>
  </div>
</template>
<script>
import ArtistDataService from "../../services/ArtistDataService";
export default {
  name: "artistDetail",
  data() {
    return {
      currentArtist: null,
      initialArtist: null,
      message: ''
    };
  },
  methods: {
    getArtist(id) {
      ArtistDataService.get(id)
        .then(response => {
          this.currentArtist = response.data;
          this.initialArtist = response.data.artistName;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateArtist() {
      if(this.message.length<1){
        ArtistDataService.update(this.currentArtist.id, this.currentArtist)
        .then(response => {
          console.log("artist has been deleted",response.data);
          this.$router.push({ name: "artistList" });
        })
        .catch(e => {
          console.log(e);
        });
      }else{
        this.message='Please, enter Non-existing Artist!!'
      }
       
    },
    checkArtist(){
      ArtistDataService.getAll().then(res => {
        const artistsList = res.data.filter(obj => obj.artistName != this.initialArtist);
        if(artistsList.some(artist => artist.artistName.toLowerCase() === this.currentArtist.artistName.toLowerCase())){
            this.message = 'Artist already exist'
        }else{
           this.message = ''
        }
      });
    },
    cancelUpdate(){
      this.$router.push({ name: "artistList" });
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