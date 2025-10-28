// https://github.com/szimek/signature_pad

function DigitalSignaute(container) {

	var input = container.find("textarea");
		
	var self = this;
	self.update = function() {
		input.val( self.signaturePad.toDataURL() );
		};

	self.canvas = container.find("canvas").get(0);
	var fullwidth = container.attr("data-full-width");
	if (!fullwidth || fullwidth=="") fullwidth = null;
	
	// console.log("DigitalSignaute",fullwidth);
	
	if (fullwidth) {
		$(self.canvas).attr("width",$(self.canvas).width());
		$(self.canvas).css("width","auto");
		}
		
	setTimeout(function(){
		self.signaturePad = new SignaturePad(self.canvas,{
			penColor: container.attr("data-penColor"),
			onEnd:function(){
				self.update();
				},
			});
		self.signaturePad.clear();	
		} , 100);
	
	container.find(".dsclear").on("click",function(){
		self.signaturePad.clear();	
		input.val("");
		});
	
	}


// console.log("DigitalSignaute.load");
$(document).on("ready",function(){
	// console.log("DigitalSignaute.ready");
	setTimeout(function(){
		$("div[data-DigitalSignaute]").each(function(){
			//console.log("DigitalSignaute.found");
			var el = $(this);
			setTimeout(function(){
				new DigitalSignaute(el);
				},200);
			});
		},200);
});

