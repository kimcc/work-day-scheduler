// Replace p with textarea when clicked
$('.description').on('click', 'p', function() {
    const text = $(this)
        .text()
        .trim();
    const textInput = $('<textarea>')
        .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger('focus');
});

// Replace textarea with p when unfocused
$('.description').on('blur', 'textarea', function() {
    const text = $(this)
        .val()
        .trim();

    const descriptionP = $('<p>')
        .text(text);
    
    $(this).replaceWith(descriptionP);
});

const auditRow = function(element) {
    const rowTime = parseInt($(element).find("p").text());

    const currentHour = moment({
        h: moment().hour(),
        s: 0
    });

    const time = moment({
        h: rowTime,
        s: 0
    });

    console.log(time);
    
    if (currentHour.isAfter(time)) {
        $('.description').addClass('past');
    } else if (currentHour.isBefore(time)) {
        $('.description').addClass('future');
    } else {
        $('.description').addClass('present');
    }
}

auditRow($('.hour'));
