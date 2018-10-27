var metricIsEnabled = true;




function updateIcon() {
    if (metricIsEnabled===true)
        {
            browser.browserAction.setIcon({
                path: {
                    16: "icons/everything-metric-16.png",
                    32: "icons/everything-metric-32.png",
                  48: "icons/everything-metric-48.png",
                    128: "icons/everything-metric-128.png"
                }
            });        
            browser.browserAction.setTitle({title: "Automatic Metric/SI conversion is ON"});            
        }
    else
        {
             browser.browserAction.setIcon({
                 path: {
                    16: "icons/everything-metric-16-off.png",
                    32: "icons/everything-metric-32-off.png",
                  48: "icons/everything-metric-48-off.png",
                    128: "icons/everything-metric-128-off.png"
                 }
             });
            browser.browserAction.setTitle({title: "Automatic Metric/SI conversion is OFF"});           
            }
        }  



function toggleMetric() {
  if (metricIsEnabled===true) {
    metricIsEnabled=false;
  } else {
    metricIsEnabled=true;
  }
    updateIcon();    
}

var useComma ;//= localStorage.getItem('metricIsEnabled');
var useMM  ;//localStorage.getItem('useMM');
var useRounding ;//= local
var useMO;
var useGiga;
var useSpaces;


browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {   
        console.log("Is metric enabled");
        if (request.message==="Is metric enabled")
            {
                var response = {};
                response.metricIsEnabled = metricIsEnabled;
                response.useComma = useComma;
                response.useMM = useMM;
                response.useRounding = useRounding;
                response.useMO = useMO;
                response.useGiga = useGiga;
                response.useSpaces = useSpaces;
                
                sendResponse(response);
            }
        else { //request to reload
            restore_options();
            sendResponse("ok");
        }
    }
);

function restore_options() {
  //  console.log("restoring options");
  browser.storage.sync.get({
  useComma:false,
  useMM:false,
  useRounding:true,
  isFirstRun:true,
  useMO:false,
  useGiga:false,
  useSpaces:true
  }, function(items) {    
    useComma = items.useComma;
    useMM = items.useMM;
    useRounding = items.useRounding; 
    useMO = items.useMO;
    useGiga = items.useGiga;
    useSpaces = items.useSpaces;
      if (items.isFirstRun===true) 
          {
              console.log("firstrun");
              try {
                  browser.storage.sync.set({ isFirstRun: false });
                  var openingPage = browser.runtime.openOptionsPage();
              } catch(err) {}
          }
      //if (useComma===undefined) useComma = false;
      //if (useMM===undefined) useMM = false;
      //if (useRounding===undefined) useRounding = true;
      //console.log("restored options");
  }); 
}
restore_options();

browser.browserAction.onClicked.addListener(function(tab){

    toggleMetric();
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.reload(tabs[0].id);
    });

    
});
    