$('.link').hover(
    () => {
        $('#bar').animate({ width: '30px' }, 400, 'swing')
    },
    () => {
        $('#bar').animate({ width: '0px' }, 300, 'swing'); 
});

$('.link').click(
    () => {
        const e = $('#info');
        e.children().hide();
        e.animate({ width: '98vw' }, 2000, 'swing', () => {
            e.children().fadeIn(800);
        });
        e.mouseleave(
            () => {
                e.animate({ width: '97vw' }, 200, 'swing', () => {
                    $('*:not(.info)').on('click.info', () => {
                        e.children().fadeOut(400);
                        e.animate({ width: '0vw' }, 2000, 'swing');
                        e.off();
                        $('*:not(.info)').off('click.info');
                    });
                    e.mouseenter(() => e.animate({ width: '98vw' }, 200, 'swing', () => $('*:not(.info)').off('click.info')));
                });
                
            });
        
});