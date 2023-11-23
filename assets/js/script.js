$(function () {
  // Get the current hour
  let currentHour = dayjs().hour();

  // Function to load and display tasks from local storage
  function loadTasks() {
    let savedTask = JSON.parse(localStorage.getItem('savedTask')) || [];

    savedTask.forEach(function (task) {
      $("#" + task.hour + " .description").val(task.task);
    });
  }

  // Function to update colors for time-blocks based on the current hour
  function updateColor() {
    for (let hourId = 9; hourId < 18; hourId++) {
      let timeBlock = $("#" + hourId);

      if (hourId < currentHour) {
        timeBlock.removeClass('future present').addClass('past');
      } else if (hourId === currentHour) {
        timeBlock.removeClass('past future').addClass('present');
      } else {
        timeBlock.removeClass('past present').addClass('future');
      }
    }
  }

  // Load tasks and update time-block classes when the page is ready
  loadTasks();
  updateColor();

  // Event handler for the save button
  $('.saveBtn').on('click', function () {
    let saveButton = $(this);
    let taskText = saveButton.siblings('.description').val();
    let hourId = saveButton.closest('.time-block').attr('id');
    let task = {
      hour: hourId,
      task: taskText
    };

    // Retrieve existing tasks from local storage
    let savedTask = JSON.parse(localStorage.getItem('savedTask')) || [];

    // Store the updated array back in local storage
    savedTask.push(task);
    localStorage.setItem('savedTask', JSON.stringify(savedTask));

    // Load and display tasks after saving
    loadTasks();
    updateColor();
  });

  // Display the current day at the top of the page
  let today = dayjs();
  $('#currentDay').text(today.format('dddd, MMM D'));
});
