let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const now = new Date();

  tasks.forEach((task, index) => {
    const deadline = new Date(task.deadline);
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.innerHTML = `${task.text} <br><small>⏰ ${deadline.toLocaleString()}</small>`;
    span.onclick = () => toggleComplete(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Hapus";
    delBtn.onclick = () => deleteTask(index);

    // Alert reminder 10 menit sebelum deadline
    if (!task.completed && deadline - now < 10 * 60 * 1000 && deadline > now && !task.alerted) {
      alert(`Pengingat: Tugas "${task.text}" akan jatuh tempo dalam 10 menit!`);
      task.alerted = true;
    }

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("Tugas-baru");
  const deadlineInput = document.getElementById("deadlineInput");

  const text = input.value.trim();
  const deadline = deadlineInput.value;

  if (text && deadline) {
    tasks.push({ text, deadline, completed: false, alerted: false });
    input.value = "";
    deadlineInput.value = "";
    renderTasks();
  } else {
    alert("Mohon isi tugas dan deadline-nya!");
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Cek deadline setiap 30 detik
setInterval(renderTasks, 30000);

renderTasks();
