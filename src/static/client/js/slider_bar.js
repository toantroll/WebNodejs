$(document).ready(function(){
							 $( "#slider-range" ).slider({
										range: true,
										min: 0,
										max: 900000,
										values: [ 300000, 700000 ],
										slide: function( event, ui ) {  $( "#amount" ).val( "VND" + ui.values[ 0 ] + " - VND" + ui.values[ 1 ] );
										}
							 });
							$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );

							});//]]>
