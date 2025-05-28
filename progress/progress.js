document.addEventListener('DOMContentLoaded', () => {
  const historyTableBody = document.getElementById('historyTableBody');
  const completionRate = document.getElementById('completionRate');
  const averageDuration = document.getElementById('averageDuration');

  const logs = JSON.parse(localStorage.getItem('workoutLogs')) || [];

  if (logs.length === 0) {
    historyTableBody.innerHTML = '<tr><td colspan="5">No workout history yet.</td></tr>';
    completionRate.textContent = '0%';
    averageDuration.textContent = '0 minutes';
    return;
  }

  let completedCount = 0;
  let totalDuration = 0;

  logs.forEach(log => {
    const row = document.createElement('tr');

    const exercisesStr = (log.exercises && log.exercises.length > 0)
      ? log.exercises.join(', ')
      : 'Unnamed';

    const duration = typeof log.duration === 'number' ? log.duration : 0;

    row.innerHTML = `
      <td>${log.date || "Unknown"}</td>
      <td>${log.workout || "Unknown"}<br><small>${exercisesStr}</small></td>
      <td>${log.planned ? '✅' : '❌'}</td>
      <td>${log.completed ? '✅' : '❌'}</td>
      <td>${duration} min</td>
    `;

    historyTableBody.appendChild(row);

    if (log.completed) {
      completedCount++;
      totalDuration += duration;
    }
  });

  const rate = Math.round((completedCount / logs.length) * 100);
  const average = completedCount > 0 ? Math.round(totalDuration / completedCount) : 0;

  completionRate.textContent = `${rate}%`;
  averageDuration.textContent = `${average} minutes`;
});
