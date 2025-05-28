document.getElementById('userForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const gender = document.getElementById('gender').value;
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  const goalCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const goals = Array.from(goalCheckboxes).map(cb => cb.value);

  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const bmiRounded = bmi.toFixed(1);

  let bmiStatus = '';
  if (bmi < 18.5) bmiStatus = 'Underweight';
  else if (bmi < 24.9) bmiStatus = 'Normal weight';
  else if (bmi < 29.9) bmiStatus = 'Overweight';
  else bmiStatus = 'Obese';

  // Show BMI result
  const resultBox = document.getElementById('bmiResult');
  resultBox.style.display = 'block';
  resultBox.innerHTML = `
    <strong>Hi ${name}!</strong><br>
    Your BMI is <strong>${bmiRounded}</strong> (${bmiStatus}).<br>
    Goals: ${goals.join(', ') || 'None selected'}<br><br>
    <a href="profile.html"><button>Get Started with Workouts</button></a>
  `;

  // Store user data in localStorage
  localStorage.setItem('userData', JSON.stringify({
    name, gender, height, weight, bmi: bmiRounded, bmiStatus, goals
  }));
});
