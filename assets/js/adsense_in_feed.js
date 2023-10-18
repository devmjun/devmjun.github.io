// Minjun 2023

// blog-post 내에 AdSense in feed 코드 삽입.
function insertAdInRandomLocation() {
    var elements = document.querySelectorAll('.post-preview');
    var randomIndex = Math.floor(Math.random() * elements.length);
    var randomElement = elements[randomIndex];

    let selectedElementWidth = randomElement.clientWidth;
    let selectedElementHeight = randomElement.clientHeight; 

    let adCode = 
    `<li class="post-preview" id="ad-container"> 
      <article>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1101850893094860" 
          crossorigin="anonymous"> </script>
        <ins class="adsbygoogle" 
          style="display:block; width: ${selectedElementWidth}px; height: ${selectedElementHeight}px" 
          data-ad-format="fluid" 
          data-ad-layout-key="-d2-a+73-vo+fv" 
          data-ad-client="ca-pub-1101850893094860" 
          data-ad-slot="2708788380">
        </ins>
        <script> 
          (adsbygoogle = window.adsbygoogle || []).push({}) 
        </script>
      </article>
    </li>`

    randomElement.insertAdjacentHTML('beforebegin', adCode);

    
    var adContainer = document.getElementById('ad-container'); 
    adContainer.style.height = `${selectedElementHeight}px`
}

document.addEventListener("DOMContentLoaded", insertAdInRandomLocation);
