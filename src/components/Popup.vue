<template>
        <v-row class="popup">
            <div class="popup-inner">
                 <slot/>
                <v-btn
                    class="ma-1"
                    color="grey"
                    @click="selectCancel"
                >
                    Cancel
                </v-btn>
                <v-btn 
                    class="ma-1"
                    color="error"
                    @click="selectConfirm"
                >
                    Confirm
                </v-btn>
            </div>
        </v-row>   
</template>

<script>
export default{
    name:'popup',
    methods:{
        selectCancel(){
            this.$emit('cancel')
        },
        selectConfirm(){
            this.$emit('confirm')
        }
    }
}
</script>

<style>
.popup{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-inner{
    background: #fff;
    padding: 42px;
    border-radius:15px;
}
</style>
