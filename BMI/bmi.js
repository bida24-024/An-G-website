document.getElementById('bmiForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);

  if (!weight || !height || weight <= 0 || height <= 0) {
    alert('Please enter valid numbers!');
    return;
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const bmiRounded = bmi.toFixed(1);

  document.getElementById('bmiValue').textContent = bmiRounded;

  let status = '';
  if (bmi < 18.5) {
    status = 'Underweight';
  } else if (bmi < 25) {
    status = 'Normal';
  } else if (bmi < 30) {
    status = 'Overweight';
  } else {
    status = 'Obese';
  }

  document.getElementById('bmiStatus').textContent = status;
  document.getElementById('bmiResult').classList.remove('hidden');


  localStorage.setItem('latestBMI', bmiRounded);
});

userData.bmi = calculatedBMI;
localStorage.setItem("userData", JSON.stringify(userData));


