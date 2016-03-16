$(document).ready(function(){

	ScopeUtils.loadDataIntoView();

    $(document).on("pageshow","#controls-page",function(event){ 
        console.log("pageshow devices page");
        Controls.loadDataIntoView();
    });
	
});