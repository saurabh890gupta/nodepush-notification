console.log("Service Worker Loaded...");

self.addEventListener('push', e=> {
const data =e.data.json();
console.log("push Recieved...");
self.registration.showNotification(data.title,{
    body:'Gmail send by saurabh!',
     icon:"http://tillusion.com/wp-content/uploads/2017/12/cropped-bg1.png"
    //  <a icon="https://icons8.com">Icon pack by Icons8</a>
});
})