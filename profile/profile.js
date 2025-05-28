document.addEventListener('DOMContentLoaded', () => {
  // Display user profile data
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const up = document.getElementById('userProfileData');
  if (userData.name) {
    up.innerHTML = `
      <h1>Welcome, ${userData.name}!</h1>
      <p><strong>Gender:</strong> ${userData.gender || 'Not specified'}</p>
      <p><strong>Height:</strong> ${userData.height} cm</p>
      <p><strong>Weight:</strong> ${userData.weight} kg</p>
      <p><strong>BMI:</strong> ${userData.bmi} (${userData.bmiStatus})</p>
      <p><strong>Goals:</strong> ${(userData.goals || []).join(', ') || 'None'}</p>
    `;
  } else {
    up.innerHTML = `<p>No profile data found. <a href="index.html">Go back</a> to set up your profile.</p>`;
  }

  // Display workout history
  const workoutList = document.getElementById('workoutList');
  function showHistory() {
    const logs = JSON.parse(localStorage.getItem('workoutLogs')) || [];
    if (!logs.length) {
      workoutList.innerHTML = '<li>No workouts logged yet.</li>';
      return;
    }
    workoutList.innerHTML = logs.map(log =>
      `<li>${log.workout} on ${log.date} at ${log.time}` +
       (log.duration ? ` — Duration: ${log.duration}` : '') +
      `</li>`
    ).join('');
  }
  showHistory();

  // Proceed button logic
  const workoutSelect = document.getElementById('workoutType');
  const proceedBtn = document.getElementById('continueWorkoutBtn');

  proceedBtn.addEventListener('click', () => {
    const selected = workoutSelect.value;
    if (!selected) {
      alert('Please select a workout type before proceeding.');
      return;
    }
    const logEntry = {
      workout: selected,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      planned: true,
      completed: false,
      duration: 0,
      exercises: []  // Placeholder for future exercise details
    };
    
    const logs = JSON.parse(localStorage.getItem('workoutLogs')) || [];
    logs.push(logEntry);
    localStorage.setItem('workoutLogs', JSON.stringify(logs));

    // Redirect to exercises page
    window.location.href = 'exercises.html';
  });
});

document.getElementById('viewProgressBtn').addEventListener('click', () => {
  window.location.href = 'progress.html';
});


 function logout() {
window.location.href = 'index.html';

    localStorage.removeItem('userData');
    localStorage.removeItem('workoutLogs');
    window.location.href = 'index.html';
  }
