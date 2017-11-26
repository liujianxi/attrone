<template>
	<div class="header">
		<div class="container-fluid">
			<svg width="100%">
			    <text text-anchor="middle" x="50%" y="50%" class="text text-1" @click="goHome()">
			        T-one
			    </text>
			    <text text-anchor="middle" x="50%" y="50%" class="text text-2" @click="goHome()">
			        T-one
			    </text>
			    <text text-anchor="middle" x="50%" y="50%" class="text text-3" @click="goHome()">
			        T-one
			    </text>
			    <text text-anchor="middle" x="50%" y="50%" class="text text-4" @click="goHome()">
			        T-one
			    </text>
			</svg> 
		</div>
	</div>
</template>
<script>
	export default {
		methods:{
			goHome(){
				this.$router.push({ path: '/home'});
			},
		}
	}
</script>
<style>
@import "../assets/global.scss";
.text{
	cursor: pointer;
    font-size: 32px;
    font-weight: bold;
    /*text-transform: uppercase;*/
    fill: none;
    stroke-width: 2px;
    stroke-dasharray: 90 310;
    animation: stroke 8s infinite linear;
}
.text-1{
    stroke: #3498db;
    text-shadow: 0 0 5px #3498db;
    animation-delay: -2s;
}
.text-2{
    stroke: #f39c12;
    text-shadow: 0 0 5px #f39c12;
    animation-delay: -4s;
}
.text-3{
    stroke: #e74c3c;
    text-shadow: 0 0 5px #e74c3c;
    animation-delay: -6s;
}
.text-4{
    stroke: #9b59b6;
    text-shadow: 0 0 5px #9b59b6;
    animation-delay: -8s;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
</style>