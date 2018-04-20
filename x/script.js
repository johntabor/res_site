$('.link').hover(
    () => {
        $('#bar').animate({ width: '30px' }, 400, 'swing')
    },
    () => {
        $('#bar').animate({ width: '0px' }, 300, 'swing'); 
});