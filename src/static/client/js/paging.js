$(function() {
    $(".paging").pagination({
        items: 800,
        itemsOnPage: 10,
        displayedPages: 5,
        edges: 4,
        currentPage:1,
        onPageClick:function(pageNumber, event){
          console.log('pageing');
          console.log(pageNumber);
          console.log(event);
        },
        cssStyle: 'light-theme'
    });
});
