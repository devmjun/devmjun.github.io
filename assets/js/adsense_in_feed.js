// Minjun 2023

// blog-post 내에 AdSense in article 코드 삽입.
function insertAdInRandomLocation() {
    var adCode = 
    '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1101850893094860" crossorigin="anonymous"><\/script>' +
    '<ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-format="fluid" data-ad-layout-key="-fb+5w+4e-db+86" data-ad-client="ca-pub-1101850893094860" data-ad-slot="3903322695"><\/ins>' + 
    '<script> (adsbygoogle = window.adsbygoogle || []).push({}); <\/script>';

    var adElement = document.createElement("div");
    adElement.innerHTML = adCode    

    var elements = document.querySelectorAll('.post-preview');

    var randomIndex = Math.floor(Math.random() * elements.length);
    var randomElement = elements[randomIndex];
    
    // 광고 코드를 삽입
    randomElement.insertBefore(adElement, randomElement.firstChild);
}

document.addEventListener("DOMContentLoaded", insertAdInRandomLocation);