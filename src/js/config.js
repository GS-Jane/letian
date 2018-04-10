require.config({
    paths:{
        'jquery':'../lib/jquery-3.2.1',
        'gscarousel':'../lib/jquery-gsCarousel/jquery.gsCarousel',
        'gdszoom':'../lib/jquery.gdsZoom/jquery.gdsZoom'
    
    },
    shim:{
        'gscarousel':['jquery'],
        'gdszoom':['jquery']
    }
})