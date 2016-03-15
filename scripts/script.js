$(document).ready(function(){

	$("input:radio[name=theme-radio-btn]").click(function() {
    	var theme_value = $(this).val();

        switch(theme_value){
            case "dark":
                console.log("Setting dark theme");
                $("#jquery-ui-stylesheet").attr({href : "https://code.jquery.com/ui/1.11.4/themes/ui-darkness/jquery-ui.css"});
                $("#jqm-ui-stylesheet").attr({href : "css/dark-theme/dark-theme.min.css"});
                $("#jqm-icon-stylesheet").attr({href : "css/dark-theme/jquery.mobile.icons.min.css"});
                break;
            case "light":
                console.log("Setting light theme");
                $("#jquery-ui-stylesheet").attr({href : "https://code.jquery.com/ui/1.11.4/themes/overcast/jquery-ui.css"});
                $("#jqm-ui-stylesheet").attr({href : "css/light-theme/light-theme.min.css"});
                $("#jqm-icon-stylesheet").attr({href : "css/light-theme/jquery.mobile.icons.min.css"});    
                break;            
        }
	});

    ScopeUtils.loadDataIntoView();
	
});