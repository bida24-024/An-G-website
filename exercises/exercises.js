document.addEventListener('DOMContentLoaded', () => {
  const routineContainer = document.getElementById('routineContainer');
  const startButtons = {};
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const workoutType = userData.workoutType || 'full body';
  const goal = userData.goals || 'stay fit';

  const routines = {
    cardio: [ "Warm-Up Walk – 10 mins", "Jogging – 25 mins", "Jump Rope – 10 mins", "Cycling – 30 mins", "Stair Climb – 10 mins", "Cooldown Walk – 10 mins" ],
    HIIT: [ "Jumping Jacks – 50 reps", "Burpees – 20 reps", "Mountain Climbers – 30 secs x 4", "High Knees – 60 secs", "Plank Jacks – 45 secs", "Push-Up to Plank – 10 reps", "Cool Down Stretch – 5 mins" ],
    yoga: [ "Sun Salutation – 10 mins", "Tree Pose – 2 mins", "Warrior Series – 8 mins", "Seated Forward Bend – 4 mins", "Child's Pose – 5 mins", "Breathing Exercise – 10 mins" ],
    'strength training': [ "Push-Ups – 3 sets of 15", "Squats – 3 sets of 20", "Lunges – 3 sets of 12 each leg", "Dumbbell Rows – 3 sets of 10", "Deadlifts – 3 sets", "Cool Down – 5 mins" ],
    core: [ "Plank – 90 secs", "Sit-Ups – 30 reps", "Russian Twists – 40 reps", "Leg Raises – 3 sets of 15", "Bicycle Crunches – 3 sets", "Plank to Push-Up – 10 reps" ],
    'full body': [ "Warm-Up Jog – 5 mins", "Burpees – 20 reps", "Push-Ups – 15 reps", "Squats – 25 reps", "Mountain Climbers – 3 sets", "Plank – 60 secs", "Cool Down – 5 mins" ]
  };

  const goalModifiers = {
    "lose weight": ["Jump Rope – 15 mins", "Burpees – 30 reps", "High Knees – 90 secs"],
    "build muscle": ["Deadlifts – 3 sets", "Bench Press – 3 sets", "Chin-Ups – 10 reps"],
    "stay fit": ["Dynamic Stretching – 5 mins", "Jogging – 20 mins", "Plank – 60 secs"]
  };

  const chosenRoutine = [...routines[workoutType]];
  if (Array.isArray(goal)) {
    goal.forEach(g => {
      if (goalModifiers[g]) {
        chosenRoutine.push(...goalModifiers[g]);
      }
    });
  } else {
    if (goalModifiers[goal]) {
      chosenRoutine.push(...goalModifiers[goal]);
    }
  }

  const weeklyRoutine = {
    Monday: chosenRoutine,
    Tuesday: chosenRoutine,
    Wednesday: chosenRoutine,
    Thursday: chosenRoutine,
    Friday: chosenRoutine,
    Saturday: chosenRoutine,
    Sunday: chosenRoutine
  };

  const renderRoutine = () => {
    routineContainer.innerHTML = '';
    Object.keys(weeklyRoutine).forEach(day => {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day-block';

      const dayTitle = document.createElement('h3');
      dayTitle.textContent = day;
      dayDiv.appendChild(dayTitle);

      const list = document.createElement('ul');
      weeklyRoutine[day].forEach((exercise) => {
        const li = document.createElement('li');

        const input = document.createElement('input');
        input.type = 'text';
        input.value = exercise;
        input.className = 'exercise-input';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'exercise-complete';

        li.appendChild(input);
        li.appendChild(checkbox);
        list.appendChild(li);
      });

      const startBtn = document.createElement('button');
      startBtn.textContent = 'Start Session';
      startBtn.className = 'start-session-btn';
      startBtn.dataset.day = day;

      const timerDisplay = document.createElement('p');
      timerDisplay.id = `timer-${day}`;
      timerDisplay.textContent = 'Duration: 0s';

      const doneBtn = document.createElement('button');
      doneBtn.textContent = 'Done';
      doneBtn.className = 'done-session-btn';
      doneBtn.dataset.day = day;

      dayDiv.appendChild(list);
      dayDiv.appendChild(startBtn);
      dayDiv.appendChild(doneBtn);
      dayDiv.appendChild(timerDisplay);

      routineContainer.appendChild(dayDiv);

      startButtons[day] = {
        startBtn,
        timerDisplay,
        doneBtn,
        startTime: null,
        intervalId: null
      };

      startBtn.addEventListener('click', () => {
        if (!startButtons[day].intervalId) {
          startButtons[day].startTime = Date.now();
          startButtons[day].intervalId = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startButtons[day].startTime) / 1000);
            startButtons[day].timerDisplay.textContent = `Duration: ${elapsed}s`;
          }, 1000);
        }
      });

      doneBtn.addEventListener('click', () => {
        const timeTaken = Math.floor((Date.now() - startButtons[day].startTime) / 1000);
        clearInterval(startButtons[day].intervalId);
        startButtons[day].intervalId = null;

        const inputs = [...list.querySelectorAll('.exercise-input')];
        const checkboxes = [...list.querySelectorAll('.exercise-complete')];

        const exercises = inputs.map(input => input.value);
        const completed = checkboxes.every(cb => cb.checked);

        const logs = JSON.parse(localStorage.getItem('workoutLogs')) || [];
        logs.push({
          date: new Date().toLocaleDateString(),
          workout: workoutType,
          exercises,
          planned: true,
          completed,
          duration: Math.round(timeTaken / 60)
        });
        localStorage.setItem('workoutLogs', JSON.stringify(logs));

        alert(`Workout for ${day} completed in ${timeTaken} seconds.`);
      });
    });
  };

  renderRoutine();
});

document.getElementById('viewProgressBtn').addEventListener('click', () => {
  window.location.href = 'progress.html';
});
