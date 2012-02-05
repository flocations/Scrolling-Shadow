/* Style the listing based on inner scrolling: top and bottom shadows
	@DOMelement: jQuery selector (eg. #elementID )
	@ shadowParameters : obj { shadowX, shadowY, shadowBlur , shadowPosition , shadowColor  }
		@ shadowX : suggested at 0, otherwise shadows appear on the side on the elemtn
		
	example of call, on a <ul id="elementID"> list 
	scrollingShadows(  '#elementID' , { } );
	
	
	Roadmap:
	- add bottom shadow only if needed (ie element has really a scroll ability: bigger than container)
	- add shadow for other browser?
	- default value manage number (ie. auto add 'px' if needed)
*/
scrollingShadows = {

	load : function( DOMelement , shadowParameters ){
	
		//Make sure there is no listener previously
		$( DOMelement ).unbind( 'scroll' );
		
		/////////// Default parameters
		if( typeof shadowParameters.shadowX == "undefined" )
			shadowParameters.shadowX = 0;
		if( typeof shadowParameters.shadowY == "undefined" )
			shadowParameters.shadowY = '15px';
		if( typeof shadowParameters.shadowBlur == "undefined" )
			shadowParameters.shadowBlur = '20px';
		if( typeof shadowParameters.shadowPosition == "undefined" )
			shadowParameters.shadowPosition = shadowParameters.shadowBlur ; //Good effect when equal the position
		if( typeof shadowParameters.shadowColor == "undefined" )
			shadowParameters.shadowColor = '#000';
			
		///////// Shadows variable
		var shadowTop = shadowParameters.shadowX + ' ' + shadowParameters.shadowY + ' ' + shadowParameters.shadowBlur + ' -' + shadowParameters.shadowPosition + ' ' + shadowParameters.shadowColor + ' inset';
		var shadowBottom = shadowParameters.shadowX + ' -' + shadowParameters.shadowY + ' ' + shadowParameters.shadowBlur + ' -' + shadowParameters.shadowPosition + ' ' + shadowParameters.shadowColor + ' inset';
		
		///////// Shadows update on scrolling
		$( DOMelement ).scroll( function(){
			
			// Scroll is at the top: shadow at bottom (NO SHADOW AT TOP)
			if( $( DOMelement ).scrollTop() == 0 )
			{
				$( DOMelement ).css( 'box-shadow' , shadowBottom );
			}
			else if( $( DOMelement ).height() - ( $( '' + DOMelement + ' li:last-child' ).height() + $( '' + DOMelement + ' li:last-child' ).position().top ) > 0 )
			{
				// Scroll is approximately at the bottom: NO SHADOW AT BOTTOM, but at Top
				$( DOMelement ).css('box-shadow' ,  shadowTop );
			}
			else
			{
				//Otherwise: Show both shadows
				$( DOMelement ).css('box-shadow' , shadowTop + ', ' + shadowBottom );
			}
		});
		
		// Add a bottom shadow a load time
		$( DOMelement ).css('box-shadow' ,  shadowBottom );

	}
}