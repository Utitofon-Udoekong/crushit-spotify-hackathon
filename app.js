const HIDE_CLASS = 'hide';
const OPEN_CLASS = 'open'
const TASK_DONE = 'done';
// As a merchant, when I click on the notification bell, 
// I see a dropdown panel that shows me an empty list of notifications since I have none yet. 
// When I click on the notification bell again, this dropdown panel is closed.

const notificationBell = document.querySelector(".notification-bell");
const notificationDropDown = document.querySelector(".notifications");
const showNotifications = () => notificationDropDown.classList.toggle(OPEN_CLASS);
notificationBell.addEventListener("click",showNotifications)

// As a merchant, when I click on the name of my store Davii Collections, 
// or on my profile image placeholder DC on the far right of the topbar menu, 
// I see a menu with a list of menu items as specified by the Figma design. 
// Clicking on this button again closes the menu

const profileDropDown = document.querySelector(".profile-settings");
const profileBar = document.querySelector('.profile-bar')
const showProfileSettings = () => profileDropDown.classList.toggle(OPEN_CLASS)
profileBar.addEventListener("click",showProfileSettings)




// As a merchant, when I click on the dismiss button of the trial callout, 
// the trial callout is immediately removed from the page.
const banner = document.querySelector('.banner')
const closeBannerBtn = banner.querySelector('.action .close-btn')
const closeBanner = () => banner.classList.add(HIDE_CLASS)
closeBannerBtn.addEventListener("click",closeBanner)

const taskDropdownButton = document.querySelector('.setup-guide .header .dropdown');
const taskHeader = document.querySelector('.setup-guide .header')
const taskContents = document.querySelector('.setup-guide .content')

// As a merchant, when I click the "Arrow Up" icon on the top right of the Setup guide card, 
// it closes the card. When I click again, it reopens the card.
const showTasks = () => {
    taskContents.classList.toggle(OPEN_CLASS);
    taskHeader.classList.toggle(OPEN_CLASS)
}
taskDropdownButton.addEventListener('click',showTasks)

//Handle setting completion state of tasks
const tasks = document.querySelectorAll(".task")
const taskList = Array.from(tasks);
const progressTitle = document.querySelector('.progress p')
const progressBar = document.querySelector('.progress-bar .value')
let progressTextContent = document.getElementById('current-progress')
let currentProgress = 0
// As a merchant, when I click on any of the 5 onboarding steps, it expands the panel, 
// showing the content of the onboarding step, and closes the previously opened one. 
// When I click on an opened onboarding step, nothing happens.
const toggleTaskVisibility = (task) => {
    if(task.classList.contains(OPEN_CLASS)){
        return;
    }else{
        let openTask = taskList.find((task)=>task.classList.contains(OPEN_CLASS))
        if(openTask){
            openTask.classList.remove(OPEN_CLASS);
        }
        task.classList.add(OPEN_CLASS)
    }
}

// As I mark steps as completed or incomplete, I see the onboarding progress bar 
// showing the correct progress.
const incrementProgress = () => {
    currentProgress += 1;
    progressTextContent.textContent = currentProgress
    const progress = (currentProgress / 5) * 100;
    progressBar.style.width = `${progress}%`
}
const decrementProgress = () => {
    currentProgress -= 1;
    progressTextContent.textContent = currentProgress
}

// As a merchant, when I click on the circle checkbox (empty) on the 
// left side of an onboarding step title, it marks that step as completed, 
// and expands the next incomplete step. If I click again, it marks the step as incomplete. 

const toggleTaskCompletion = (taskImage, task, index) => {
    const notCompletedIcon = taskImage.querySelector('.unchecked')
    const completedIcon = taskImage.querySelector('.checked')
    const loadingIcon = taskImage.querySelector('.loading')
    const isTaskDone = task.classList.contains(TASK_DONE)
    if(isTaskDone){
        // Mark task as not done
        completedIcon.classList.remove(OPEN_CLASS)
        loadingIcon.classList.add(OPEN_CLASS)
        setTimeout(() => {
            loadingIcon.classList.remove(OPEN_CLASS)
            notCompletedIcon.classList.add(OPEN_CLASS)
            task.classList.remove(TASK_DONE)
            taskImage.ariaLabel = taskImage.ariaLabel.replace("as not done", "as done")
            decrementProgress()
        }, 2000)
    }else{
        // Mark task as done
        notCompletedIcon.classList.remove(OPEN_CLASS)
        loadingIcon.classList.add(OPEN_CLASS)
        setTimeout(() => {
            loadingIcon.classList.remove(OPEN_CLASS)
            completedIcon.classList.add(OPEN_CLASS)
            task.classList.add(TASK_DONE)
            taskImage.ariaLabel = taskImage.ariaLabel.replace("as done", "as not done")
            incrementProgress()

            //Focus the next incomplete step
            const nextIncompleteTask = taskList[index+1];
            const previousIncompleteTask = taskList[index-1];

            if(index === taskList.length - 1){
                const closestIncompleteTask = taskList.find((t) => t.classList.contains(TASK_DONE) === false);
                toggleTaskVisibility(closestIncompleteTask);
            }else if(nextIncompleteTask.classList.contains(TASK_DONE) === false){
                toggleTaskVisibility(nextIncompleteTask);
            }else if(previousIncompleteTask.classList.contains(TASK_DONE) === false){
                toggleTaskVisibility(previousIncompleteTask);
            }else{
                toggleTaskVisibility(taskList[taskList.length - 1]);
            }
        }, 2000)
    }

}



for(var index = 0; index < taskList.length; index++){
    let task = taskList[index];
    task.addEventListener("click",() => {
        toggleTaskVisibility(task)
    })
    let taskImage = task.querySelector(".body #task-image")
    taskImage.addEventListener("click", () => toggleTaskCompletion(taskImage, task, taskList.indexOf(task)))
}

