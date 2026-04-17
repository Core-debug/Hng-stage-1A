'use strict'
const card = document.querySelector('.task')
const editbtn = document.querySelector('.edit');
const deletebtn = document.querySelector('.delete')
const titler = document.querySelector('.todo-title');
const mainCard = document.querySelector('.main')
const container = document.querySelector(".container")
const descriptionor = document.querySelector('.description')
const stauser = document.querySelector(".status-tag")
const prioriter = document.querySelector(".priority-tag")
const dueDater = document.querySelector('[data-testid="test-todo-due-date"]')
const dueRemaining = document.querySelector('[data-testid="test-todo-time-remaining"]')
const dropdown = document.querySelector('#status')
const dateRemain = document.querySelector('.date-remain')

let todoState = {
    title: "Finish Stage 1",
    description: "Extend the Stage 0 card with stateful logic...",
    status: "Pending",
    priority: "High",
    dueDate: "2026-04-17T00:37",
    isExpanded: false
};
dropdown.addEventListener('change', function () {
    if (dropdown.value === 'Done') {
        card.checked = true;
        titler.style.textDecoration = "line-through";
        container.style.opacity = 0.65;
        dateRemain.textContent = '✅ Completed';
        container.style.borderStyle = "solid";
    }
    else {
        card.checked = false;
        titler.style.textDecoration = "none";
        container.style.opacity = 1;
        ManageDateRemaining(".date-now");
        dateRemain.innerHTML = dueRemaining.innerHTML;

        if (dropdown.value === 'In Progress') {
            container.style.borderStyle = "dashed";
        } else {
            container.style.borderStyle = "solid";
        }
    }
});
const managestatus = function () {
    if (prioriter.textContent === "Medium".trim()) {
        prioriter.style.backgroundColor = '#f8e9cf'
        prioriter.style.color = '#865b4d'
    }
    else if (prioriter.textContent === "Low".trim()) {
        prioriter.style.backgroundColor = '#84af7136'
        prioriter.style.color = '#4f864d'
    }
    else if (prioriter.textContent === "High".trim()) {
        prioriter.style.backgroundColor = '#fee2e2'
        prioriter.style.color = '#b91c1c'
    }
}
managestatus()
card.addEventListener('change', function () {
    if (this.checked) {
        dropdown.value = "Done";
        titler.style.textDecoration = "line-through";
        container.style.opacity = 0.65;
        dateRemain.textContent = '✅ Completed';
    }
    else {
        dropdown.value = "Pending";
        titler.style.textDecoration = "none";
        container.style.opacity = 1;
        ManageDateRemaining(".date-now");
        dateRemain.innerHTML = dueRemaining.innerHTML;
    }
});

const ManageDateDue = function (mine) {
    const FormDate = document.querySelector(mine).value
    console.log(FormDate);
    const date = new Date(FormDate)
    if (isFinite(date)) {
        const final = (Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date))
        console.log(final);
        dueDater.innerText = `Due ${final}`
    }
    else {
        dueDater.innerText = `Due --`
    }
}

const dateRemainManger = function (diffInMs) {
    const isOverdue = diffInMs < 0;
    const absDiff = Math.abs(diffInMs);

    const diffInMin = Math.floor(absDiff / 60000);
    const diffInHours = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    let timeString = "";
    if (diffInDays > 0) timeString = `${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
    else if (diffInHours > 0) timeString = `${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
    else timeString = `${diffInMin} minute${diffInMin > 1 ? 's' : ''}`;

    if (isOverdue) {
        dueRemaining.innerHTML = `
        <span class="over" data-testid="test-todo-overdue-indicator">🚨 Overdue by ${timeString}</span>`;
    } else {
        dueRemaining.innerText = `⏳ ${timeString} left`;
    }
}

const ManageDateRemaining = function (mine) {
    const dueDateElement = document.querySelector(mine);
    if (!dueDateElement) return;

    if (dueDateElement.value) {
        const dueTimestamp = new Date(dueDateElement.value).getTime();
        const now = Date.now();
        const diffInMs = dueTimestamp - now;
        dateRemainManger(diffInMs);
    } else {
        const cleanText = dueDateElement.textContent.replace(/[📅⏳]|Due/g, "").trim();
        const dueTimestamp = Date.parse(cleanText);
        const now = Date.now();
        const diffInMs = dueTimestamp - now;
        dateRemainManger(diffInMs);
        console.log("Parsed from HTML:", cleanText, "Diff:", diffInMs);
    }
}
const priorityIndicator = function () {
    const status = prioriter.textContent;
    container.classList.remove('priority-high', 'priority-medium', 'priority-low');
    if (status === 'High') container.classList.add('priority-high');
    else if (status === 'Medium') container.classList.add('priority-medium');
    else if (status === 'Low') container.classList.add('priority-low');
}

const managingSave = function () {
    const FormTitle = document.querySelector("#input-title").value;
    const FormDescription = document.querySelector("#input-description").value;
    const FormPriority = document.querySelector("#select-priority").value;
    const FormDate = document.querySelector("#input-due").value;
    titler.innerText = FormTitle;
    descriptionor.innerText = FormDescription;
    prioriter.innerText = FormPriority;

    todoState.title = FormTitle;
    todoState.description = FormDescription;
    todoState.priority = FormPriority;
    todoState.dueDate = FormDate;
};
const expandCollapse = function () {
    const expandBtn = document.querySelector('.col-btn');
    const collapsibleSection = document.querySelector('.Collaspe-container');
    if (!expandBtn || !collapsibleSection) return;
    expandBtn.onclick = function () {
        const isCurrentlyCollapsed = collapsibleSection.classList.toggle('collapsed');
        this.innerText = isCurrentlyCollapsed ? "Show More" : "Show Less";
        this.setAttribute('aria-expanded', !isCurrentlyCollapsed);
    };
}

expandCollapse();



const updateUI = function () {
    managingSave()
    ManageDateDue("#input-due")
    ManageDateRemaining("#input-due")
    priorityIndicator()
    managestatus()
    expandCollapse();

}


const render = function (data) {
    return `
    <article class="edit-form-container" data-testid="test-todo-edit-form">
         <form action="#">
             <div class="field-group">
                 <label for="input-title">Title</label>
                 <input id="input-title" data-testid="test-todo-edit-title-input" type="text"
                    value="${data.title}">
                 </div>

             <div class="field-group">
                 <label for="input-description">Description</label>
                 <textarea id="input-description"
                    data-testid="test-todo-edit-description-input">${data.description}</textarea>
                 </div>

             <div class="field-group">
                 <label for="select-priority">Priority</label>
                 <select id="select-priority" data-testid="test-todo-edit-priority-select">
                     <option value="High" ${data.priority === 'High' ? 'selected' : ''}>High
                    </option>
                     <option value="Medium" ${data.priority === 'Medium' ? 'selected' : ''}>
                        Medium</option>
                      <option value="Low" ${data.priority === 'Low' ? 'selected' : ''}>Low
                    </option>
                     </select>
                 </div>

             <div class="field-group">
                 <label for="input-due">Due Date</label>
                 <input id="input-due" type="datetime-local"
                    data-testid="test-todo-edit-due-date-input" value="${data.dueDate}">
                 </div>

             <div class="form-buttons">
                 <button type="button" class="btn-save"
                    data-testid="test-todo-save-button">Save</button>
                 <button type="button" class="btn-cancel"
                    data-testid="test-todo-cancel-button">Cancel</button>
                 </div>
            </form>
        </article>`
}
editbtn.addEventListener('click', function () {

    container.classList.toggle("hide")
    mainCard.insertAdjacentHTML('beforeend', render(todoState));

    const saveBtn = document.querySelector('.btn-save');
    const formContainer = document.querySelector('.edit-form-container');
    const cancelBtn = document.querySelector('.btn-cancel')

    saveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        updateUI();
        formContainer.remove();
        container.classList.toggle("hide");
        editbtn.focus();
    });

    cancelBtn.addEventListener('click', function (e) {
        e.preventDefault();
        formContainer.remove();
        container.classList.toggle("hide");
        editbtn.focus();
    });
})

deletebtn.addEventListener('click', function () {
    alert('Delete Clicked');
})

window.addEventListener('load', function () {
    priorityIndicator()
    ManageDateRemaining(".date-now")
})

setInterval(() => {

    if (dropdown.value !== "Done") {
        ManageDateRemaining(".date-now");
        dateRemain.innerHTML = dueRemaining.innerHTML;
    }
}, 30000);
