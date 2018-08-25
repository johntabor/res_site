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

function submitPitch() {
    $('[type=submit]').attr({'value':'...', 'disabled':true})
    let email = $('[name=email]').val()
    let pitch = $('[name=pitch]').val()
    let j = '<p style="background-color:red; color: white;" id="submitError">There was an error submitting your application. Please try again.</p>'
    let r = '<p id="submitSuccess">Thanks for submitting! We\'ll be in contact soon.</p>'
    $.get('https://us-central1-rutrep-27e19.cloudfunctions.net/internal/x/new/'+email+'/'+pitch).then(res => {
        $('form').hide().after(r)
    }).catch(e => {
        $('form').after(j)
        $('[type=submit]').removeAttr('disabled').attr('value','Submit')
    })
}