Data = {
 "scopesForRole": {
   "Family": [
     "5df94f56-5e82-4882-adcd-bd0438bbbad4",
     "19a3e652-3085-4970-995e-9716c3dff9e0"
   ]
 },
 "accessScopes": {
   "5df94f56-5e82-4882-adcd-bd0438bbbad4": {
     "accessProfiles": [
       {
         "name": "Bedroom Lights",
         "pluginId": "org.ambientdynamix.contextplugins.hueplugin",
         "deviceProfiles": {
           "Max Lifx": [
             "SWITCH",
             "DISPLAY_COLOR"
           ]
         }
       },
       {
         "name": "Bedroom media",
         "pluginId": "org.ambientdynamix.contextplugins.ambientmedia",
         "deviceProfiles": {
           "Apple TV": [
             "DISPLAY_VIDEO",
             "PLAYBACK_PLAY_PAUSE",
             "PLAYBACK_FORWARD_SEEK",
             "PLAYBACK_BACKWARD_SEEK"
           ], 
           "Chromecast": [
             "DISPLAY_VIDEO",
             "PLAYBACK_PLAY_PAUSE"
           ]
         }
       }
     ],
     "name": "Bedroom",
     "ID": "5df94f56-5e82-4882-adcd-bd0438bbbad4",
     "scenes": []
   },
   "19a3e652-3085-4970-995e-9716c3dff9e0": {
     "accessProfiles": [
       {
         "name": "Kitchen Lights",
         "pluginId": "org.ambientdynamix.contextplugins.hueplugin",
         "deviceProfiles": {
           "Nirandika": [
             "SWITCH",
             "DISPLAY_COLOR"
           ],
           "Max Lifx": [
             "SWITCH",
             "DISPLAY_COLOR"
           ]
         }
       }
     ],
     "name": "Kitchen",
     "ID": "19a3e652-3085-4970-995e-9716c3dff9e0",
     "scenes": [
       "Bedtime", 
       "Good Morning!!"
     ]
   }
 },
 "scenes": {
   "Bedtime": {
     "name": "Bedtime",
     "commands": {
       "org.ambientdynamix.contextplugins.hueplugin": [
         {
           "deviceId": "Max Lifx",
           "commandType": "DISPLAY_COLOR",
           "extras": {
             "BLUE": "100",
             "TRANSITION": "50",
             "GREEN": "0",
             "RED": "200"
           }
         },
         {
           "deviceId": "Nirandika",
           "commandType": "DISPLAY_COLOR",
           "extras": {
             "BLUE": "200",
             "TRANSITION": "50",
             "GREEN": "0",
             "RED": "100"
           }
         }
       ]
     },
     "sceneGraphs": [
       "BedroomMediaGraph"
     ]
   }
 }
};

SharedData = {
  currentScopeId : null
};