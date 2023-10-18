// Minjun 2023

// posts-list 마지막에 AdSense 삽입
function insertAdInRandomLocation() {
    var element = document.querySelector('.posts-list');
    // var randomIndex = Math.floor(Math.random() * elements.length);
    // var randomElement = elements[randomIndex];

    let adCode = 
    `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1101850893094860" 
          crossorigin="anonymous"> </script>
    <ins class="adsbygoogle" 
          style="display:block" 
          data-ad-format="fluid" 
          data-ad-layout-key="-d2-a+73-vo+fv" 
          data-ad-client="ca-pub-1101850893094860" 
          data-ad-slot="2708788380">
    </ins>
    <script> 
          (adsbygoogle = window.adsbygoogle || []).push({}) 
    </script>`
    

    element.insertAdjacentHTML('beforeend', adCode);
}

document.addEventListener("DOMContentLoaded", insertAdInRandomLocation);
