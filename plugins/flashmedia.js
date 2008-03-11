// uses http://www.jeroenwijering.com/?item=JW_FLV_Media_Player
PO.L.FlashMedia = {
	
	options:{
		player						: 'plugins/flash/mediaplayer.swf',
		auto_fix_path 				: true, // fixes the src path so it is treated as relative to the html document. only applies if the src url doesn't contain http at the start of the url
		auto_fix_fullscreen 		: true, // fixes the fullscreen so that it is singley determined by variables.showfsbutton
		auto_adjust_display_height 	: true, // auto adjust the display height by 20px so the bar shows at the bottom of the flash movie
		use_type_mapping			: true  // automagically maps file extensions to specifc types.
	},
// 	for more information on the variables you should use this page http://www.jeroenwijering.com/?item=Supported_Flashvars
	variables	: {
		width			: null,
		height			: null,
		displaywidth	: null,
		displayheight	: null,
		image			: null,
		logo			: null,
		thumbsinplaylist: false,
		overstretch		: false,
		showicons		: true,
		transition		: 'fade',
		shownavigation	: false,
		showstop		: false,
		showdigits		: true,
		showdownload	: false,
		link			: null,
		linkfromdisplay	: false,
		linktarget		: null,
		recommendations	: null,
		usefullscreen	: true,
		showfsbutton	: true,
		autoscroll		: false,
		autostart		: false,
		audio			: null,
		bufferlength	: 5,
		captions		: null,
		fallback		: null,
		repeat			: false,
		rotatetime		: 10,
		shuffle			: false,
		volume			: 60,
		callback		: null,
		enablejs		: false,
		javascriptid	: null,
		captions		: null,
		streamscript	: null,
		type			: null,
		backcolor		: '0x000000',
		frontcolor		: '0xFFFFFF',
		lightcolor		: '0xCCCCCC'
	},
	params: {},
	attributes: {},
	typemap:{
		mp3	: 'mp3', 
		flv	: 'flv', 
		swf : 'swf', 
		jpg	: 'jpg',
		jpeg: 'jpg',
		gif	: 'gif', 
		png	: 'png', 
		mpg	: 'h264',
		mpeg: 'h264'
	},
	
	create: function(src, o, p)
	{
		var fo = PO.U.merge(PO.L.Flash.options, PO.L.FlashMedia.options), h = document.location.href;
		o = PO.U.merge(o, fo);
		if(o.auto_fix_path && src.indexOf('http') === -1) 
		{
			src = h.substr(0, h.lastIndexOf('/')+1) + src;
		}
		
		var fa = PO.U.merge(PO.L.Flash.attributes, PO.L.FlashMedia.attributes);
		o.attributes = PO.U.merge(o.attributes || {}, fa);
		
		var fv = PO.U.merge(PO.L.Flash.variables, PO.L.FlashMedia.variables);
		o.variables = PO.U.merge(o.variables || {}, fv);
		o.variables.file = src;
		if(!o.variables.width) 				o.variables.width			= o.width;
		if(!o.variables.height) 			o.variables.height			= o.height;
		if(!o.variables.displaywidth) 		o.variables.displaywidth	= o.width;
		if(!o.variables.displayheight) 		o.variables.displayheight	= o.height;
		if(o.auto_adjust_display_height) 	o.variables.displayheight  -= 20;
		if(o.auto_fix_fullscreen && o.variables.usefullscreen != o.variables.showfsbutton) o.variables.usefullscreen = o.variables.showfsbutton;
		if(o.use_type_mapping && o.variables.type === null)
		{
			var e = src.split('.').pop().toLowerCase();
			if(PO.L.FlashMedia.typemap[e]) o.variables.type = PO.L.FlashMedia.typemap[e];
		}
		for(var a in o.variables)
		{
			if(o.variables[a] === null) delete o.variables[a];
		}
		
		var fp = PO.U.merge(PO.L.Flash.params, PO.L.FlashMedia.params);
		o.params = PO.U.merge(o.params || {}, PO.L.FlashMedia.params);
		if(o.auto_fix_fullscreen && o.variables.usefullscreen)
		{
			o.params.allowfullscreen = true;
		}
		o.bgcolour = o.variables.backcolor;
		
		if(!o.variables.javascriptid) o.variables.javascriptid = o.force_id ? o.force_id : 'PluginObject-'+PO.U.hash(8)+'-'+(new Date()).getTime();
		
		if(o.placeholder && o.placeholder_autoplay) o.variables.autostart = true;

		return PO.L.Flash.create(o.player, o, PO.Plugins.Flash, p);
	}
};
PO.Plugins.FlashMedia.loaded = 1;