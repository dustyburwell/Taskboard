(function() {
  function makeSelectable(selector){
    selector.click(function() {
      var selected = $('.selected');
      
      if (selected[0] == this) {
        selected.removeClass('selected');
        $('details').hide();
      } else  {
        selected.removeClass('selected');
        $(this).addClass('selected');
        //$('details').show();
      }
    });
  }
  
  $(document).ready(function () {
    var cols = $('ol.tasklist > li > ol');
    var tasks = $('ol.tasklist > li > ol > li');
    
    cols.bind('dragenter', function () {
      $(this).addClass('dragover');
    }).bind ('dragleave', function () {
      $(this).removeClass('dragover');
    }).bind('dragover', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      
      e.originalEvent.dataTransfer.dropEffect = 'move';
      return false;
    }).bind('drop', function(e) {
      if (e.stopPropogation) {
        e.stopPropogation();
      }
      
      $(this).removeClass('dragover');
      
//    this.innerHTML = e.originalEvent.dataTransfer.getData('text/html');
      var newItem = 
        $(e.originalEvent.dataTransfer.getData('text/html'))
          .bind('dragstart', function(e) {
            e.originalEvent.dataTransfer.effectAllowed = 'move';
            e.originalEvent.dataTransfer.setData('text/html', this.outerHTML);      
            
            $(this).addClass('dragged-item');
          }).bind('dragend', function (e) {
            $(this).removeClass('dragged-item');
          });
      
      $(this).append(newItem);
      makeSelectable(newItem);
      $('.dragged-item').remove();
      
      return false;
    });
    
    tasks.bind('dragstart', function(e) {      
      e.originalEvent.dataTransfer.effectAllowed = 'move';
      e.originalEvent.dataTransfer.setData('text/html', this.outerHTML);
      
      $(this).addClass('dragged-item');
    }).bind('dragend', function (e) {
      $(this).removeClass('dragged-item');
    });
    
    makeSelectable($('ol.tasklist > li > ol > li'));
  });
})();