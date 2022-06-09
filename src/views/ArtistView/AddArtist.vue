<template>
<div class="submit-form">
    <div v-if="!submitted">
        <div class="row form-group">
            <label for="artistName">New artist name: </label>
            <input
              type="text"
              class="form-control"
              id="artistName"  
              required
              v-model="artist.artistName"           
              name="artistName"
              @input="checkArtist"
            />
        </div>
        <div class="row">
          <div class="col">
            <button @click="saveArtist" class="btn btn-primary">Submit</button>     
          </div>
          <div class="col">
            <button @click="cancelArtist" class="btn btn-danger">Cancel</button>
          </div>
        </div>
      <p style='color:red'>{{ message }}</p>
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
        id: null,
        message:''
      },
      artists: [],
      artistExist: false,
      submitted: false
    };
  },
  methods:{
    checkArtist(){
        if(this.artists.some(artist => artist.artistName.toLowerCase() === this.artist.artistName.toLowerCase())){
            this.artistExist = true;
        }
        console.log('Check artist invoked');
    },
    getAllArtist(){
      ArtistDataService.getAll().then(res =>{
        this.artists = res.data;       
        }).catch(err => {
           console.log(err);
      });
    },
    async saveArtist(){
      var newArtist = {artistName: this.artist.artistName};
      const value = await this.artists.filter(obj => obj.artistName.toLowerCase() === newArtist.artistName.toLowerCase())
      if(value.length > 0 )
      {
        alert('Artist name already exist')
      }
      else{
         ArtistDataService.create(newArtist).then(res => {
          //console.log('this is save artist res', res)
          this.submitted = true;
        })
      }
    },
    cancelArtist(){
      this.$router.push({name: 'artistList'});
    },
    newArtist(){
      this.submitted = false;
      this.artist ={};
    },
     },
    mounted(){
      this.getAllArtist();
  },
};
</script>

<style>
.submit-form{
  max-width: 300px;
  margin: auto;
}
</style>
