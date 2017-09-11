$(document).ready(function() {
    $("li").click(function () {
        if ($(this).hasClass('highlight')) {
            $(this).removeClass('highlight');
        } else {
            $(this).addClass('highlight');
        }
    });
});

$(document).ready(function () {
    $("#submitbtn").click(function (e) {
        $('li').each(function () {
            if($(this).hasClass('highlight')) {
                $(this).removeClass('highlight');
                $('#currentSubjects').append($(this));



            }
        });
        e.preventDefault();
    });
});




