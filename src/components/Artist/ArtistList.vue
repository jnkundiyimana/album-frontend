<template>
    <div class ="list row">
        <div class="col-md-5">
            <h4>Artist List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{active: index == currentIndex}"
                    v-for="(artist, index) in artists"
                    :key="index"
                    @click="setActiveArtist(artist, index)"
                >
                    {{artist.artistName}}
                </li>
            </ul>
            <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllArtist">Remove All</button> -->
        </div>
        <div class="col-md-4">
            <div v-if="currentArtist">
                <h4>Artist</h4>
                <div>
                    <label><strong>Artist:</strong></label>{{currentArtist.artistName}}
                </div>
                <router-link :to="'/artistDetail/' + currentArtist.id" class="badge badge-warning">Edit</router-link>
            </div>
            <div v-else>
                <br/>
                <p>Please click on a Artist..</p>
            </div>
        </div>
            <div class="col-md-3">
                <router-link :to="'/addArtist/'" type="button" class="btn btn-success">Create New Artist</router-link>
            </div>
    </div>
    
</template>

<script>
import ArtistDataService from '../../services/ArtistDataService.js';
export default {
    name: 'artistList',
    data(){
        return {
            artists: [],
            currentArtist: null,
            currentIndex: -1,
        };
    },
    methods:{
        retrieveArtists(){
            ArtistDataService.getAll().then(res =>{
                this.artists = res.data;
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            });
        },
        refreshList(){
            this.retrieveArtists();
            this.currentArtist = null;
            this.currentIndex = -1;
        },
        setActiveArtist(artist, index){
            this.currentArtist = artist;
            this.currentIndex = artist ? index : -1;
        },
     },
    mounted(){
        this.retrieveArtists();
    }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>