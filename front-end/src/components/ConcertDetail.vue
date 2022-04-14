<template> 
<div class="wrapper">
	<div class="concert">
		<div class="info">
		
			<div class="col-8 output" id="output_display" style="display: inline-block;">
				<h1>
					<span class="artist_name">{{concert.title}}</span>, in concert
				</h1>
				Your concert is scheduled for: {{concert.start}}<br />
				<img id="artist_image" v-bind:src="this.$data.artist_data.image_url"> 
				<h2>
					<span class="artist_name">{{concert.title}}</span> has <span id="event_count">{{this.$data.artist_data.upcoming_event_count}}</span> events coming up. 
				</h2>
				<a v-bind:href='this.$data.artist_data.url' id="find_events" target="_blank" style="display: inline-block;">Click here to see them</a><br/>
				<br />
				<a v-bind:href='this.$data.artist_data.facebook_page_url' target='_blank'>Visit Facebook Page</a><br />
				<div v-if="this.$data.artist_data.website">
					<a v-bind:href='this.$data.artist_data.website.url' target="_blank">Visit their website</a> 
				</div>
				<div v-else>
				</div>
			</div>
		</div>
	</div>
</div>
</template> 

<style scoped>
.wrapper {
/*   display: flex; */
  align-items: center;
  justify-content: center;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>


<script>

import axios from 'axios';

export default {
  name: 'ConcertDetail',
  props: {
    concert: Object
  },
  created() {
    this.getArtistInfo();
  },
  data() {
    return {
     artist_data: {},
    }
  },  
  
  methods: {
	async getArtistInfo() {
		try {
			const url = "https://rest.bandsintown.com/artists/id_" + this.concert.artist_id + "/?app_id=2f221d342f2ec16b6fade96e55fff099";
			let response = await axios.get(url);
			this.artist_data = response.data;
			
			// get the website url
			if (this.artist_data.links != undefined)
			{
				this.artist_data.website = this.artist_data.links.find(x=>x.type == "website")
			}
			else
			{
				this.artist_data.website = "";
			}
			
			return true;
		} catch (error) {
		console.log(error);
		}
	},

  }
}
</script>

