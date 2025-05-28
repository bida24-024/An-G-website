document.addEventListener('DOMContentLoaded', () => {
    const workoutSelect = document.getElementById('workoutType');
    const continueBtn = document.getElementById('continueWorkoutBtn');
  
    continueBtn.addEventListener('click', () => {
      const selectedWorkout = workoutSelect.value;
  
      if (!selectedWorkout) {
        alert('Please select a workout type before proceeding.');
        return;
      }
  
      let userData = JSON.parse(localStorage.getItem('userData')) || {};
  
      // Save the selected workoutType (lowercase for consistency with exercises.js)
      userData.workoutType = selectedWorkout.toLowerCase();
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // Redirect to the exercises page
      window.location.href = 'exercises.html';
    });
  });
  