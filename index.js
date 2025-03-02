document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  taskForm.addEventListener("submit", addTask);

  function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
      <span class="task-text">${taskText}</span>
      <span class="check-icon">✔</span>
      <div class="task-buttons">
          <button class="task-button delete">Удалить</button>
          <button class="task-button edit">Редактировать</button>
          <button class="task-button complete">Выполнено</button>
      </div>
    `;

    li.querySelector(".complete").addEventListener("click", () => {
      li.classList.toggle("completed");
      li.querySelector(".check-icon").style.display =
        li.querySelector(".check-icon").style.display === "none"
          ? "inline-block"
          : "none";
    });

    taskList.appendChild(li);
    taskInput.value = "";

    li.querySelector(".delete").addEventListener("click", () => {
      taskList.removeChild(li);
    });

    li.querySelector(".complete").addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    li.querySelector(".edit").addEventListener("click", () => {
      openEditModal(li);
    });
  }

  function openEditModal(taskItem) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const taskText = taskItem.querySelector(".task-text").textContent;

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">Редактировать задачу</div>
        <div class="modal-body">
          <input type="text" id="edit-task-input" value="${taskText}" />
        </div>
        <div class="modal-footer">
          <button class="cancel">Отмена</button>
          <button class="save">Сохранить</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const editInput = modal.querySelector("#edit-task-input");
    const saveButton = modal.querySelector(".save");
    const cancelButton = modal.querySelector(".cancel");

    saveButton.addEventListener("click", () => {
      const newText = editInput.value.trim();
      if (newText !== "") {
        taskItem.querySelector(".task-text").textContent = newText;
      }
      closeModal(modal);
    });

    cancelButton.addEventListener("click", () => {
      closeModal(modal);
    });

    modal.style.display = "flex";
  }

  function closeModal(modal) {
    modal.style.display = "none";
    modal.remove();
  }
});
