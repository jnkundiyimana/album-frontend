<template>
    <v-row>
        <v-col cols="9" sm="5">
            <span>{{artist.artistName}}</span>     
        </v-col>
        <v-col cols="9" sm="2">
            <v-btn size="x-small" icon="mdi-pencil" @click="updateArtist"/>
        </v-col>
        <v-col cols="9" sm="2">
            <v-btn size="x-small" icon="mdi-trash-can" @click="deleteArtist"/>
        </v-col>
    </v-row>
</template>

<script>
export default{
    props:{
        artist: Object,
    },
    data(){
        return{};
    },
    methods:{
        updateArtist(){
            this.$emit('updateArtist');
        },
        deleteArtist(){
            this.$emit('deleteArtist');
        },
    },
};

</script>
