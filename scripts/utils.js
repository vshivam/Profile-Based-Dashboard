Handlebars.getTemplate = function(name) {
	if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
	    $.ajax({
	        url : 'templates/' + name + '.handlebars',
	        success : function(data) {
	            if (Handlebars.templates === undefined) {
	                Handlebars.templates = {};
	            }
	            Handlebars.templates[name] = Handlebars.compile(data);
	        },
	        async : false, 
	        cache: false
	    });
	}
	return Handlebars.templates[name];
};

/*** http://stackoverflow.com/a/14521217/1239966 ***/
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
};

/*** http://stackoverflow.com/a/25867509/1239966 ***/
jQuery.getCss = function(urls, callback, nocache){
    if (typeof nocache=='undefined') nocache=false; // default don't refresh
    $.when.apply($,
        $.map(urls, function(url){
            if (nocache) url += '?_ts=' + new Date().getTime(); // refresh? 
            return $.get(url, function(){                    
                $('<link>', {rel:'stylesheet', type:'text/css', 'href':url}).appendTo('head');                    
            });
        })
    ).then(function(){
        if (typeof callback=='function') callback();
    });
};

PageUtils = {
	loadJs : function(urls, success) {
		var count = 0;
		$.each(urls, function(index, url){
			var callback = function(){
				count++;
				if(count == urls.length){
					success();
				}
			};
			$.loadScript(url, callback);
		});
	}
};

ScopeUtils = {
	loadDataIntoView : function(){
		var that = this;
		var scopeName = "Family";
		var accessScopeIds = Data["scopesForRole"][scopeName];
		var accessScopes = [];
		$.each(accessScopeIds, function(index, scopeId){
			var accessScope = Data["accessScopes"][scopeId];
			accessScopes.push({name : accessScope.name, scopeId : scopeId});
		});
		var scopesListTemplate = Handlebars.getTemplate('scopes-list');
		var html = scopesListTemplate({accessScopes : accessScopes});
		console.log(html);
		$('#scopes-page').find('.ui-content').append(html);
		$('#scopes-list').listview().listview('refresh');
		$('#scopes-list').on('click', 'a.scope-listitem', function(event){
			var scopeId = $(this).data('id');
			that.openScopeViewer();
		});
	}, 

	openScopeViewer : function(){
		$.mobile.pageContainer.pagecontainer("change", "#controls-page");
	}
};

DeviceUtils = {
	loadDataIntoView : function() {
		
	}
}