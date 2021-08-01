let tasks = [];

const loadTasks = function() {

}

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
    
    if (currentHour.isAfter(time)) {
        $('.description').addClass('past');
    } else if (currentHour.isBefore(time)) {
        $('.description').addClass('future');
    } else {
        $('.description').addClass('present');
    }
}

const buttonHandler = function(event) {
    // Time and description of clicked row
    const time = $(this).parent().siblings('.hour').find('p').text();
    const description = $(this).parent().siblings('.description').find('p').text();

    const taskObject = {
        time: time,
        description: description
    };

    createTask(taskObject);
}

const createTask = function(taskObject) {
    tasks.push(taskObject);
    saveTasks();
}

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
};

// Check the hours
setInterval(function() {
    $('.container .hour').each(function(index, element) {
        auditRow(element);
        console.log(element);
    });
}, (1000*60)*15);

// Check the rows on document load
$(document).ready(function(){
    $('.container .hour').each(function(index, element) {
        auditRow(element);
        console.log(element);
    });
});

$('.saveBtn').click(buttonHandler);

