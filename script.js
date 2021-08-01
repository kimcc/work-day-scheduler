let tasks = [];

// Create the starter schedule
const createSchedule = function() {
    $('.row').each(function() {
        const rowTime = parseInt($(this).attr('data-time'));

        const taskObject = {
            time: rowTime,
            description: ''
        };
        tasks.push(taskObject);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load in the tasks from localStorage
const loadTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    $(tasks).each(function(index, element) {
        const taskHour = tasks[index].time;
        const taskDescription = tasks[index].description;

       $('[data-time=' + taskHour + ']').children('.description').find('p').text(taskDescription);
    });
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

// Check the times for the rows and attach color classes
const auditRow = function() {

    const currentHour = moment().hour();

    $('.row').each(function() {
        const hourText = $(this).children('.hour').find('p').text();

        let rowTime = parseInt(hourText);

        // Add 12 for PM times, except for 12PM
        if (hourText !== '12PM' && hourText.includes('PM')) {
            rowTime += 12;
        }

        // Add or remove the classes based on if the current hour is before, after or the same
        if (currentHour < rowTime) {

            $(this).children('.description').removeClass('present');
            $(this).children('.description').removeClass('past');
            $(this).children('.description').addClass('future');
        }   
        else if (currentHour === rowTime) {
            $(this).children('.description').removeClass('past');
            $(this).children('.description').removeClass('future');
            $(this).children('.description').addClass('present');
            
        } else {
            $(this).children('.description').removeClass('present');
            $(this).children('.description').removeClass('past');
            $(this).children('.description').addClass('past');
        }
    });
}

// Add to localStorage when button clicked
const buttonHandler = function() {
    // Time and description of clicked row
    const newTime = $(this).parent().parent().attr("data-time");
    const newDescription = $(this).parent().siblings('.description').find('p').text();

    console.log(newTime);
    console.log(newDescription);

    $(tasks).each(function(index) {
        if (tasks[index].time == newTime) {
            tasks[index].description = newDescription;
        }
    });    

    // Save to localstorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Check the hours on a set interval
setInterval(function() {
    auditRow();
}, (1000*60)*15);

// Check the rows on document load
$(document).ready(function(){

    const currentDay = moment().format("MMM Do YYYY");   
    // Populate with the current day
    $('#currentDay').text(currentDay);

    auditRow();

    // If tasks is null, create the starter schedule
    if(localStorage.getItem("tasks") === null) {
        createSchedule();
    }

    // Load from localStorage
    loadTasks();
});

$('.saveBtn').click(buttonHandler);

