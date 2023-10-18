// Minjun 2023

// blog-post 내에 AdSense in article 코드 삽입.
function insertAdInRandomLocation() {
    let adCode = 
    '<li class="post-preview adsense">' +
    '<article>' +
    '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1101850893094860" crossorigin="anonymous"><\/script>'+
    '<ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-d2-a+73-vo+fv" data-ad-client="ca-pub-1101850893094860" data-ad-slot="2708788380"><\/ins>' +
    '<script> (adsbygoogle = window.adsbygoogle || []).push({}); <\/script>'+
    '<\/article>' +
    '<\/li>' ; 

    // var adElement = document.createElement("div");
    // adElement.innerHTML = adCode;    

    var elements = document.querySelectorAll('.post-preview');

    var randomIndex = Math.floor(Math.random() * elements.length);
    var randomElement = elements[randomIndex];
    
    // randomElement.insertBefore(adElement, randomElement.firstChild);
    randomElement.insertAdjacentHTML('beforebegin', adCode)
}

document.addEventListener("DOMContentLoaded", insertAdInRandomLocation);