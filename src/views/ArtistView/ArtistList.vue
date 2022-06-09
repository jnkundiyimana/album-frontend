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
    <ArtistDisplay
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
        @updateArtist="goEdit(artist)"
        @deleteArtist="goDelete(artist)"
    />
</template>

<script>
import ArtistDataService from '@/services/ArtistDataService';
import AlbumDataService from '@/services/AlbumDataService';
import ArtistDisplay from '@/components/ArtistDisplay.vue';
export default{
    name: 'artistList',
    data(){
        return {
            artists: [],
            currentArtist: null,
            currentIndex: -1,
        };
    },
    components:{
        ArtistDisplay
    },
    methods:{
        addArtist(){
            this.$router.push({name: 'addArtist'});
        },
        goEdit(artist){
            this.$router.push({name:'editArtist', params:{id: artist.id}});
        },
        goDelete(artist){
            console.log('this is artist',artist);
            console.log('this is artist',artist.id);
            AlbumDataService.get(artist.id).then(res =>{
                const albumTitle =  res.data.title;
                console.log('this is the albumTitle', albumTitle);
                console.log('this is the data:', res.data)
            })
            
            // ArtistDataService.delete(artist.id)
            // .then(() => {
            //     this.refreshList()
            // })
            // .catch(e => {
            //     console.log(e.data);
            // });
        },
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
    },
};
</script>