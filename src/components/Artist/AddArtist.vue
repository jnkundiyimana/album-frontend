<template>
<div class="submit-form">
    <div v-if="!submitted">
        <div class="form-group">
            <label for="artistName">Artist Name: </label>
            <input
              type="text"
              class="form-control"
              id="artistName"  
              required
              v-model="artist.artistName"           
              name="artistName"
            />
        </div>
        <button @click="saveArtist" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newArtist">Add</button>
    </div>
</div>
</template>

<script>
import ArtistDataService from '../../services/ArtistDataService.js';
export default{
  name:'addArtist',
  data(){
    return{
      artist:{
        artistName: '',
        id: null
      },
      submitted: false
    };
  },
  methods:{
    saveArtist(){
      var data = {artistName: this.artist.artistName};
      ArtistDataService.create(data).then(res => {
        this.artist.id = res.data.id;
        console.log(res.data);
        this.submitted= true;
      }).catch(err => {
        console.log(err);
      });
    },
    newArtist(){
      this.submitted = false;
      this.artist ={};
    }
  }
};
</script>

<style>
.submit-form{
  max-width: 300px;
  margin: auto;
}
</style>
