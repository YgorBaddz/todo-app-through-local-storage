document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item);
});

const itemsArr = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

function displayItems() {
  let items = "";

  for (let i = 0; i < itemsArr.length; i++) {
    items += `  <div class="item">
                    <div class="input_controller">
                    <textarea disabled>${itemsArr[i]}</textarea>
                    <div class="edit_controller">
                        <span class="deleteBtn">&#9986;</span>
                        <span class="editBtn">&#9998;</span>
                    </div>
                    </div>

                    <div class="update_controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`;
  }

  document.querySelector(".todo_list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((button, i) => {
    button.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  itemsArr.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArr));
  location.reload();
}

function activateEditListeners() {
  let editBtn = document.querySelectorAll(".editBtn");
  let updateController = document.querySelectorAll(".update_controller");
  let inputs = document.querySelectorAll(".input_controller textarea");

  editBtn.forEach((button, i) => {
    button.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  let saveBtn = document.querySelectorAll(".saveBtn");
  let inputs = document.querySelectorAll(".input_controller textarea");

  saveBtn.forEach((button, i) => {
    button.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function updateItem(text, i) {
  itemsArr[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArr));
  location.reload();
}

function activateCancelListeners() {
  let cancelBtn = document.querySelectorAll(".cancelBtn");
  let updateController = document.querySelectorAll(".update_controller");
  let inputs = document.querySelectorAll(".input_controller textarea");

  cancelBtn.forEach((button, i) => {
    button.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}

function createItem(item) {
  itemsArr.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArr));
  location.reload();
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
  displayDate();
  displayItems();
};
