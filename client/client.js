const publicVapidKey='BF7_w8t-IHxKLuyqZf2nhnUi0rwbynKnZVv7hohp1SCztyWvBcMZyEauhi-OYnJIbJHts_YpdHSp3Kgc7cNy9eI';
//

if('serviceWorker' in navigator) {
send().catch(err => console.error(err));  

}

async function send() {
    console.log('registering service worker...');
    const register =await navigator.serviceWorker.register("/worker.js",{
   scope: '/' 
    });
    console.log('Service Worker Registered...');
//Register Push
console.log("Registering Push ....");
const subscription =await register.pushManager.subscribe({
userVisibleOnly:true,
applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
});
console.log(" Push Registered....");

//send Push Notification
console.log(" sending Push....");
await fetch('/subscribe',{
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {  
        'content-type': 'application/json'
    }

}) .then(function(response) {
    return response.json();
    console.log("hel json format path",response);
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
  
// .then(function(result){
//     console.log("the result is find",result);
// })
console.log('push sent ...');



}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
