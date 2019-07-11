var request=require('request');

const geocode=function(address,georesult)
{
    var url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmFpc2hha2giLCJhIjoiY2p4bmlqaHEwMGYxdjNtcWhkMHJ2MjBkMiJ9.bl6TLau4IhRuauP9CzUw5g&limit=1';
    request({url:url,json:true},function(error,response){
    if(error){
        georesult('unable to connect to network',undefined);

    }
     else if(response.body.features.length==0)
     {
         georesult('coundlt find the location',undefined);
     }
     else
     {
         var data={
             long:response.body.features[0].center[0],
             lat:response.body.features[0].center[1],
             loc:response.body.features[0].place_name
         }
         georesult(undefined,data);
     }
})
}

const darksky=function(address1,darkresult)
 {
     request({url:address1,json:true},function(error,response)
     {
if(error)
{
    darkresult('Unable to connect to network',undefined);
}
else if(response.body.error)
{
    darkresult(response.body.error,undefined);
}
else
{
data={
    temp:response.body.currently.temperature,
    rain:response.body.currently.precipProbability,
    summary:response.body.daily.data[0].summary,
  //  location:loc
}
darkresult(undefined,data);
}

 }
     )}
module.exports=
{
    geocode :geocode,
    darksky :darksky
}