<template>
<div>
  <div class="wrapper">
    <div class="row">
      <div class="search col-md-6">
          <input v-model="searchText" placeholder="Search for an artist" /><button @click="getArtistInfo()" >GO!</button>
      </div>
    </div>
<div v-if="show_artist_info" class="results">
    <div class="row">
      <div class="search col-md-6">
          <div class="info">
          	{{ artist_data.name }} has {{ artist_data.upcoming_event_count }} upcoming concerts. <a v-bind:href='this.$data.artist_data.url' target="_blank">Click here</a> to find a date.<br/>
          	What date will you see {{ artist_data.name }}?:
          </div>
        </div>
      </div>
    <div class="row">
      <div class="search col-md-6 align-center">
          <datepicker :disabled-dates="this.$data.disabled_dates" v-model="concert_date"></datepicker><br/>
          <button @click="addToCalendar()">Add to my Calendar!</button>
        </div>
      </div>
</div>
<div v-else></div>
    
  </div>
</div>
</template>



<style scoped>

.vdp-datepicker
{
	text-align: center !important;
}

.wrapper {
  /* display: flex; */
  align-items: center;
  justify-content: center;
}

.search {
  margin: 40px 40px 20px 30px;
}

input
{
  text-align: center;
}

.cell.day
{
	color: black !important;
}

button 
{
	width: fill;
	background-color: #61892F;
	border: none;
}
button:hover
{
	background-color: #86C232;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}

.results
{
  text-align: center;
  font-size: 25px;
}

.info
{
  color: white;
}


</style>

<script>

import Datepicker from 'vuejs-datepicker';

import axios from 'axios';

export default {
  name: 'Home',
  components: {
     Datepicker
  },
  data() {
    return {
    	searchText: '',
      artist_data: null,
      concert_date:'',
      show_artist_info:false,
      disabled_dates: {to: new Date(Date.now() - 8640000)},
    }
  },
  computed: {
  },
  methods:{

    async addToCalendar(){

      try {
            let concert_info = await axios.post('/api/concerts', {
                title:this.artist_data.name,
                start:this.$moment(this.concert_date).format("YYYY-MM-DD"),
                artist_id:this.artist_data.id,
                friends_coming: this.friends_coming,
            });

        // this.$root.loadConcertCount();
        this.show_artist_info = false;
        this.searchText = "";
      } catch (error) {
        console.log(error);
      }

    },

    async getArtistInfo() {
      try {
        const url = "https://rest.bandsintown.com/artists/" + this.searchText + "/?app_id=2f221d342f2ec16b6fade96e55fff099";
        let response = await axios.get(url);
        this.artist_data = response.data;
        this.show_artist_info = true;
        return true;
      } catch (error) {
      console.log(error);
      }
    },

  }
}
</script>