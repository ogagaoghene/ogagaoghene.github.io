if ( 'serviceWorker' in navigator ) {
    navigator
        .serviceWorker
            .register('sw.js', { scope: './' }
).then( (registration) => {
   console.log("Registered: ", registration);
}).catch( (error) => {
    console.log("Registration failed: ", error);   
});
} else {
    console.log("Unavailable");
}