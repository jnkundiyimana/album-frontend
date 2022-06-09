<template>
  <div v-if="currentArtist" class="edit-form">
    <h1>Edit Artist</h1> 
      <div class="form-group">
        <label for="artistName">Artist Name: </label>
        <input type="text" class="form-control" id="artistName"
          v-model="currentArtist.artistName" @input="checkArtist"
        />
      </div>
     <button class="badge badge-danger mr-2"
      @click="cancelUpdate"
    >
      Cancel
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateArtist"
    >
      Update
    </button>
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
          console.log(response.data);
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
        //console.log('initial artist name: ', this.initialArtist)
        const artistsList = res.data.filter(obj => obj.artistName != this.initialArtist);
        if(artistsList.some(artist => artist.artistName.toLowerCase() === this.currentArtist.artistName.toLowerCase())){
            this.message = 'Artist already exist'
        }else{
           this.message = ''
        }
      });
    },
    //deleteArtist() {
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