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

	/** Connect to dynamix, button click listener **/
    $('#btn-connect-dynamix').click(function(){

        var createContextHandler = function () {
        	$('#connect-log').text('Creating new context handler');
            var createNewHandlerCallback = function (status, handler) {
                switch (status) {
                    case Dynamix.Enums.SUCCESS :
        	        	$('#connect-log').text('Handler successfully created');
                        dynamixContextHandler = handler;
                        console.log("createNewHandlerCallback : " + dynamixContextHandler.id);

                        var listOfProfilesCallback = function (status) {
                            switch (status) {
                                case Dynamix.Enums.SUCCESS:
        				        	$('#connect-log').text('Requesting list of plugins');                        
                                    var contextRequestCallback = function (status, result) {
                                        switch (status) {
                                            case Dynamix.Enums.SUCCESS :
                                            console.log(result);
                                            var access_profiles = JSON.parse(result["ACCESS_PROFILES"]).accessProfiles;
                                            console.log(access_profiles);
                                            console.log(access_profiles.length + ' access profiles found');
                                            for(var i = 0; i < access_profiles.length; i++) {
                                                var profile = access_profiles[i];
                                                var profile_id = profile["id"]; //Bedroom
                                                console.log('Adding profile container :' + profile_id);
                                                window["DynamixWidgets"]["addProfileContainer"](profile_id);
                                                var plugin_access = profile["pluginAccess"];
                                                for (var j = 0; j < plugin_access.length; j++){
                                                    var plugin = plugin_access[j];
                                                    var device_id = plugin["deviceId"]; //Max Lifx
                                                    var device_name = plugin["name"]; //Bedroom Lights
                                                    var commands = plugin["commands"]; // SWITCH, DISPLAY_COLOR
                                                    var plugin_id = plugin["pluginId"];
                                                    window["DynamixWidgets"]["addDeviceControlsContainer"](profile_id, plugin_id, device_id, device_name);
                                                    for (var k = 0; k < commands.length; k++){
                                                        window["DynamixWidgets"]["addWidgetForCommand"](profile_id, plugin_id, device_id, commands[k]);
                                                        //Add container for a profile id. 
                                                        //Add container for a plugin id. 
                                                        //Add widgets inside that container for the particular profile.
                                                        // window["DynamixWidgets"]["addPluginContainer"](plugin.pluginId, plugin.name.replace(/\+/g,' '));
                                                    }
                                                }

                                            }

                                            $.mobile.changePage("#page-2");


                                            /*
        				        				$('#connect-log').text('List of plugins successfully fetched');                                                                    
                                                console.log("List of available plugins :");
                                                console.log(result.plugins);
                                                var plugins = result.plugins;
                                                var pluginIdArray = [];
                                                for (i = 0; i < plugins.length; i++) {
                                                    pluginIdArray.push(plugins[i].pluginId);
                                                }
                                                var addWidgets = function (plugins) {
													$('#connect-log').text('Adding widgets');                                                                                                                    	
                                                    console.log("Adding Widgets for the following Plugins :");
                                                    for (i = 0; i < plugins.length; i++) {
                                                        var plugin = plugins[i];
                                                        var commands = plugin.commands;
                                                        if (commands.length > 0) {
                                                            window["DynamixWidgets"]["addPluginContainer"](plugin.pluginId, plugin.name.replace(/\+/g,' '));
                                                            for (j = 0; j < commands.length; j++) {
                                                                var command = commands[j];
                                                                var methodName = DynamixWidgets.widgetsMap[command];
                                                                console.log("Context support for plugin added successfully");
                                                                console.log(command);
                                                                console.log(plugin.pluginId);
                                                                console.log(plugin.name);
                                                                window["DynamixWidgets"][methodName](plugin.pluginId);
                                                            }
                                                        }
                                                    }
                                                    $.mobile.changePage("#page-2");
                                                };

                                                var commaSeparatedPluginIds = pluginIdArray.join(",");
                                                console.log(commaSeparatedPluginIds);
                                                var addContextSupportCallback = function (status, result) {
                                                    console.log("Ambient control context support callback");
                                                    console.log("Status : " + status);
                                                    switch (status) {
                                                        case Dynamix.Enums.SUCCESS :
                                                            console.log("Context support approved for all ambient control plugins!");
                                                            addWidgets(plugins);
                                                            break;
                                                        case Dynamix.Enums.FAILURE:
                                                            console.log("Context support was not approved");
                                                            $('#container').append('<div style="color:#ffffff; text-align: center; background-color:#8db63d; margin: 0px; line-height:48px; height :48px"> Request was denied by the master phone </div>');
                                                            break;
                                                    }
                                                };
                                                $('#connect-log').text('Adding context supported for plugins for sending ambient control messages');
                                                dynamixContextHandler.addContextSupport(encodeURIComponent(commaSeparatedPluginIds), "org.ambientdynamix.contextplugins.ambientcontrol.controlmessage", {callback: addContextSupportCallback});
                                                */
                                                break;
                                        }
                                    };
                                    console.log("Context support granted successfully!");
                                    dynamixContextHandler.contextRequest("org.ambientdynamix.contextplugins.guigeneration",
                                            "org.ambientdynamix.contextplugins.guigeneration.accessprofiles", contextRequestCallback);
                                    break;
                            }
                        };

        	        	$('#connect-log').text('Requesting context support for available profiles');                        
                        dynamixContextHandler.addContextSupport("org.ambientdynamix.contextplugins.guigeneration",
                                "org.ambientdynamix.contextplugins.guigeneration.accessprofiles",
                                {callback: listOfProfilesCallback});

                        break;
                }
            };
            Dynamix.createContextHandler(createNewHandlerCallback);
            console.log("Dynamix.createContextHandler(createNewHandlerCallback)");
        };

        var openDynamixSession = function () {

        	$('#connect-log').text('Opening Session');

            var openSessionCallback = function (status) {
                console.log("OpenSessionCallback : " + status);
                switch (status) {
                    case Dynamix.Enums.SUCCESS :
                        $('#connect-log').text('Session successfully opened');
                        createContextHandler();
                        break;
                }
            };

            var sessionListener = function (status, result) {
                console.log("Session Listener : " + status);
                switch (status) {
                    case Dynamix.Enums.SESSION_OPENED :
                       	createContextHandler();
                        console.log(result);
                        break;
                    case Dynamix.Enums.SESSION_CLOSED :
                        document.getElementById("dynamixConnected").checked = false;
                        break;
                    case Dynamix.Enums.PLUGIN_UNINSTALLED :
                        console.log(result);
                        break;
                    case Dynamix.Enums.PLUGIN_INSTALLED :
                        console.log(result);
                        break;
                    case Dynamix.Enums.PLUGIN_ENABLED :
                        console.log(result);
                        break;
                    case Dynamix.Enums.PLUGIN_DISABLED :
                        console.log(result);
                        break;
                    case Dynamix.Enums.PLUGIN_ERROR :
                        console.log("Error Message : " + result.message);
                        console.log("Plugin name : " + result.plugin.pluginName);
                        console.log("Error Code : " + result.errorCode);
                        break;
                }
            };
            Dynamix.openDynamixSession({listener: sessionListener, callback: openSessionCallback});
            console.log("Dynamix.openDynamixSession();");
        };


        var bindDynamix = function () {
            $('#connect-log').text('Initiating Bind');

        	var bindListener = function (status) {
	            switch (status) {
	                case Dynamix.Enums.BOUND :
	                    $('#connect-log').text('Successfully Bound');
	                    console.log("Woohoo! We're bound!");
	                    openDynamixSession();
	                    break;
	                case Dynamix.Enums.BIND_ERROR :
	                    Dynamix.bind(bindListener)
	                    break;
	                case Dynamix.Enums.UNBOUND :
	                    break;
	            }
	        }

            Dynamix.bind(bindListener);
        };

        bindDynamix();
    });

});