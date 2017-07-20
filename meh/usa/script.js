(function() {
  'use strict';

  var img = document.getElementById('visit-map');
  var names = document.querySelectorAll('.name');

  function reset_name_styles() {
    names.forEach(function(x) {
      x.classList = 'name';
    });
  }

  function swap_map(li) {
    var idx = Number(li.getAttribute('data-idx'));
    reset_name_styles();
    li.classList = 'name active';
    var img_file = li.textContent.toLowerCase() + '_visit.png';
    img.src = img_file;
  }

  names.forEach(function(x) {
    x.addEventListener('click', function(e) {
      swap_map(this);
    });
  });

  function navigate(direction) {
    var nav_to = 0;

    if (direction === 'back') {
      for (var i=0; i<names.length; i++) {
        if (names[i].classList.contains('active')) {
          nav_to = i-1;
          if (i === 0) {
            nav_to = names.length-1;
          }
        }
      }
    }

    if (direction === 'forward') {
      for (var i=0; i<names.length; i++) {
        if (names[i].classList.contains('active')) {
          nav_to = i+1;
          if (i === names.length-1) {
            nav_to = 0;
          }
        }
      }
    }

    var target = names[nav_to];

    swap_map(target);

  }

  document.onkeydown = function(e) {
    if (e.key !== undefined) {
      if (e.key === 'ArrowRight') {
        navigate('forward');
      } else if (e.key === 'ArrowLeft') {
        navigate('back');
      }
    }
  }

})();  
 