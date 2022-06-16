<template>
    <v-row>
        <v-col cols="11" sm="5">
            <span class="text-h6">Artist List</span>
        </v-col>
        <v-col cols="11" sm="2">
            <span class="text-h6">Edit</span>
        </v-col>
        <v-col cols="11" sm="2">
            <span class="text-h6">Delete</span>
        </v-col>
        <v-col cols="11" sm="2">
            <v-btn color="success" @click="addArtist">Add Artist</v-btn>
        </v-col>
    </v-row>
    <Popup v-show="isVisible=deleteItemPopupVisible" @cancel="deleteItemPopupVisible=false" @confirm ="goDelete(currentArtist)">
        <h6>Confirmation:</h6>
        <p>Delete this Artist?</p>
        <p class="text-danger">{{message}}</p>
    </Popup>
    <ArtistDisplay
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
        @updateArtist="goEdit(artist)"
        @deleteArtist="confirmDeleteArtist(artist)"
        
    />
</template>

<script>
import ArtistDataService from '@/services/ArtistDataService';
import ArtistDisplay from '@/components/ArtistDisplay.vue';
import Popup from '../../components/Popup.vue';
export default{
    name: 'artistList',
    
    data(){
        return {
            artists: [],
            currentArtist: null,
            currentIndex: -1,
            deleteItemPopupVisible: false,
            message : '',
            selectedArtist: null
        };
        
    },
    components:{
        ArtistDisplay,
        Popup
    },
    methods:{
        addArtist(){
            this.$router.push({name: 'addArtist'});
        },
        goEdit(artist){
            this.$router.push({name:'editArtist', params:{id: artist.id}});
        },
        confirmDeleteArtist(artist){
            this.deleteItemPopupVisible = true;
            this.currentArtist = artist;
            ArtistDataService.getArtistAlbums(artist.id).then(res => {
                if(res.data.length > 0){
                    this.message = artist.artistName + ' has album, this will delete all its albums.';
                }
                else
                {
                    this.message = artist.artistName;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        goDelete(artist){
            console.log('this artist is deleted',artist.id);
            ArtistDataService.delete(artist.id).then(() =>{
                  this.retrieveArtists()  
            }).catch(err =>{
                console.log(err.response.data.message);
            })
            this.deleteItemPopupVisible = false;
        },
        retrieveArtists(){
            ArtistDataService.getAll().then(res =>{
                this.artists = res.data;
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
    },
};
</script>