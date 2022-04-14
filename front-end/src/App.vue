<template> 

<div id="app">
	<nav class="navbar-custom">

			<router-link to="/"> 
			<div class="menu-item browse" id="header">
				<p>CONCERT FINDER</p>
			</div>
			</router-link>
			<router-link to="/calendar"> 
			<div class="menu-item browse">
				<p>
					My Concert Calendar
				</p>
			</div>
			</router-link>
	</nav>
	<router-view /> 
	
	<div class="navbar fixed-bottom">
	<div class="container-fluid">
		<a class="navbar-brand" href="https://github.com/jxngeary/Creative-Project-3">Github</a><i class="fa fa-github"></i> 
	</div>
</div>
</div>
</template> 

<style>
* {
  box-sizing: border-box;
}

body {
	background-color: #222629 !important;
}

#app {

  background-color: #222629;

}

.navbar-custom
{
	font-size: 50px;
	background-color: #61892F;
}

#header
{
  font-size: 50px;
  padding: 20px 0px 0px 20px;
}

.menu-item.browse 
{
  text-decoration: none;
  font-size: 30px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  color: white;
  padding-left: 20px;
  margin-top: 0px;
}

a:hover
{
  text-decoration: none !important;
}

.menu-item.browse:hover
{
  background-color: #86C232;
}



</style>


<script>

import axios from 'axios';


export default {
  name: 'Main',
  data() {
	  return {
		concert_count:0,
		current_concerts:[],
	  }
  },

  computed: {
    root_concert_list() {
      console.log("in root_concert_list");
      return this.$root.$data.current_concerts;
    }
  },


  created(){
	  this.loadConcerts();
  },
  methods: {
    async loadConcerts() {
      console.log("getting concerts");
      try {
        let response = await axios.get("/api/concerts");
        this.$root.$data.current_concerts = response.data;
        console.log(this.$root.$data.current_concerts);
        return true;
      } catch (error) {
      console.log(error);
      }
  	},

    async loadConcertCount() {
		console.log("running loadConcertCount");
      try {
        let response = await axios.get("/api/concerts/count");
        this.$root.$data.concert_count = response.data.count;
        return true;
      } catch (error) {
      console.log(error);
      }
  	},
  }
 }
</script>