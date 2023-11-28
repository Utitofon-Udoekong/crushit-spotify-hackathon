const HIDE_CLASS = 'hide';
const OPEN_CLASS = 'open'
const TASK_DONE = 'done';

// As a merchant, when I click on the notification bell, 
// I see a dropdown panel that shows me an empty list of notifications since I have none yet. 
// When I click on the notification bell again, this dropdown panel is closed.

const notificationBell = document.querySelector(".notification-bell");
const notificationDropDown = document.querySelector(".notifications");
const notificationMenuActions = notificationDropDown.querySelector(".title .actions").children;
const notificationMenuItems = Array.from(notificationMenuActions)

// Handle traversing through the notification menu dropdown with the arrow keys
const handleNotificationMenuItemTraverse = (event, index) => {
    const isFirstItem = index === 0;
    const isLastItem = notificationMenuItems.length - 1 === index;

    const nextItem = notificationMenuItems[index + 1]
    const previousItem = notificationMenuItems[index - 1]
    // If arrow right or down 
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        if (isLastItem) {
            // If on the last item, focus the first item
            notificationMenuItems[0].focus()
            return;
        }
        // focus the next item
        nextItem.focus()
    }

    // If arrow left or up focus the previous element
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        if (isFirstItem) {
            // If on the first item, focus the last item
            notificationMenuItems[notificationMenuItems.length - 1].focus()
            return;
        }
        // focus the next item
        previousItem.focus()
    }
}

const handleNotificationMenuEscapePress = (event) => {
    if (event.key === "Escape") {
        closeNotificationMenu()
    }
}

const openNotificationMenu = () => {
    notificationDropDown.classList.add(OPEN_CLASS)
    notificationBell.ariaExpanded = "true"
    notificationMenuItems[0].focus()
    // Close the notifications menu with the escape key
    notificationDropDown.addEventListener("keyup", (event) => handleNotificationMenuEscapePress(event))
    notificationMenuItems.forEach((item, index) => item.addEventListener("keyup", (event) => handleNotificationMenuItemTraverse(event, index)))
}
const closeNotificationMenu = () => {
    notificationDropDown.classList.remove(OPEN_CLASS)
    notificationBell.ariaExpanded = "false"
    notificationBell.focus()
}
const toggleNotificationMenu = () => {
    const isnotificationDropDownExpanded = notificationDropDown.classList.contains(OPEN_CLASS)

    if (isnotificationDropDownExpanded) {
        closeNotificationMenu()
    } else {
        openNotificationMenu()
    }
}
notificationBell.addEventListener("click", toggleNotificationMenu)


// As a merchant, when I click on the name of my store Davii Collections, 
// or on my profile image placeholder DC on the far right of the topbar menu, 
// I see a menu with a list of menu items as specified by the Figma design. 
// Clicking on this button again closes the menu
const profileBar = document.querySelector('.profile-bar')
const profileDropDown = document.querySelector(".profile-settings");
const profileMenuItems = profileDropDown.querySelectorAll('[role="menuitem"]')

// Handle traversing throught the profile settings menu dropdown with the arrow keys
const handleMenuItemTraverse = (event, index) => {
    const isFirstItem = index === 0;
    const isLastItem = profileMenuItems.length - 1 === index;

    const nextItem = profileMenuItems.item(index + 1)
    const previousItem = profileMenuItems.item(index - 1)
    // If arrow right or down 
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        if (isLastItem) {
            // If on the last item, focus the first item
            profileMenuItems.item(0).focus()
            return;
        }
        // focus the next item
        nextItem.focus()
    }

    // If arrow left or up focus the previous element
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        if (isFirstItem) {
            // If on the first item, focus the last item
            profileMenuItems.item(profileMenuItems.length - 1).focus()
            return;
        }
        // focus the next item
        previousItem.focus()
    }
}
// Handle closing a the profile menu when the escape key is pressed
const handleProfileMenuEscapePress = (event) => {
    if (event.key === "Escape") {
        closeProfileMenu()
    }
}

const openProfileMenu = () => {
    profileDropDown.classList.add(OPEN_CLASS)
    profileBar.ariaExpanded = "true"
    profileMenuItems.item(0).focus()
    // Close the profile key with the escape key
    profileDropDown.addEventListener("keyup", (event) => handleProfileMenuEscapePress(event))
    profileMenuItems.forEach((item, index) => item.addEventListener("keyup", (event) => handleMenuItemTraverse(event, index)))
}
const closeProfileMenu = () => {
    profileDropDown.classList.remove(OPEN_CLASS)
    profileBar.ariaExpanded = "false"
    profileBar.focus()
}
const toggleProfileMenu = () => {
    const isProfileDropdownExpanded = profileDropDown.classList.contains(OPEN_CLASS)

    if (isProfileDropdownExpanded) {
        closeProfileMenu()
    } else {
        openProfileMenu()
    }
}
profileBar.addEventListener("click", toggleProfileMenu)



// As a merchant, when I click on the dismiss button of the trial callout, 
// the trial callout is immediately removed from the page.
const banner = document.querySelector('.banner')
const closeBannerBtn = banner.querySelector('.action .close-btn')
const closeBanner = () => banner.classList.add(HIDE_CLASS)
closeBannerBtn.addEventListener("click", closeBanner)


const taskDropdownButton = document.querySelector('.setup-guide .header .dropdown');
const taskDropdown = document.querySelector('.setup-guide .header')
const taskContents = document.querySelector('.setup-guide .content')

const taskList = Array.from(document.querySelectorAll(".task"));
const taskHeaders = Array.from(document.querySelectorAll(".task .head .task-title"))
const progressTitle = document.querySelector('.progress p')
const progressBar = document.querySelector('.progress-bar .value')

//Handle setting completion state of tasks
let progressTextContent = document.getElementById('current-progress')
let currentProgress = 0

// As a merchant, when I click the "Arrow Up" icon on the top right of the Setup guide card, 
// it closes the card. When I click again, it reopens the card.
const showTasks = () => {
    taskContents.classList.toggle(OPEN_CLASS);
    taskDropdown.classList.toggle(OPEN_CLASS)
}
taskDropdownButton.addEventListener('click', showTasks)



// As a merchant, when I click on any of the 5 onboarding steps, it expands the panel, 
// showing the content of the onboarding step, and closes the previously opened one. 
// When I click on an opened onboarding step, nothing happens.
const toggleTaskVisibility = (task) => {
    if (task.classList.contains(OPEN_CLASS)) {
        return;
    } else {
        let openTask = taskList.find((task) => task.classList.contains(OPEN_CLASS))
        if (openTask) {
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

const toggleTaskCompletion = (taskBodyImage, taskHeaderImage, task, index) => {
    /// Code is not optimal
    // TODO: Refactorcode to change only one instance of taskImage
    const bodyNotCompletedIcon = taskBodyImage.querySelector('.unchecked')
    const bodyCompletedIcon = taskBodyImage.querySelector('.checked')
    const bodyLoadingIcon = taskBodyImage.querySelector('.loading')
    const headNotCompletedIcon = taskHeaderImage.querySelector('.unchecked')
    const headCompletedIcon = taskHeaderImage.querySelector('.checked')
    const headLoadingIcon = taskHeaderImage.querySelector('.loading')
    const isTaskDone = task.classList.contains(TASK_DONE)
    if (isTaskDone) {
        // Mark task as not done
        bodyCompletedIcon.classList.remove(OPEN_CLASS)
        headCompletedIcon.classList.remove(OPEN_CLASS)
        bodyLoadingIcon.classList.add(OPEN_CLASS)
        headLoadingIcon.classList.add(OPEN_CLASS)
        setTimeout(() => {
            bodyLoadingIcon.classList.remove(OPEN_CLASS)
            headLoadingIcon.classList.remove(OPEN_CLASS)
            bodyNotCompletedIcon.classList.add(OPEN_CLASS)
            headNotCompletedIcon.classList.add(OPEN_CLASS)
            task.classList.remove(TASK_DONE)
            taskBodyImage.ariaLabel = taskBodyImage.ariaLabel.replace("as not done", "as done")
            taskHeaderImage.ariaLabel = taskHeaderImage.ariaLabel.replace("as not done", "as done")
            decrementProgress()
        }, 2000)
    } else {
        // Mark task as done
        bodyNotCompletedIcon.classList.remove(OPEN_CLASS)
        headNotCompletedIcon.classList.remove(OPEN_CLASS)
        bodyLoadingIcon.classList.add(OPEN_CLASS)
        headLoadingIcon.classList.add(OPEN_CLASS)
        setTimeout(() => {
            bodyLoadingIcon.classList.remove(OPEN_CLASS)
            headLoadingIcon.classList.remove(OPEN_CLASS)
            bodyCompletedIcon.classList.add(OPEN_CLASS)
            headCompletedIcon.classList.add(OPEN_CLASS)
            task.classList.add(TASK_DONE)
            taskBodyImage.ariaLabel = taskBodyImage.ariaLabel.replace("as done", "as not done")
            taskHeaderImage.ariaLabel = taskHeaderImage.ariaLabel.replace("as done", "as not done")
            incrementProgress()

            //Focus the next incomplete step
            const nextIncompleteTask = taskList[index + 1];
            const previousIncompleteTask = taskList[index - 1];

            if (index === taskList.length - 1) {
                const closestIncompleteTask = taskList.find((t) => t.classList.contains(TASK_DONE) === false);
                toggleTaskVisibility(closestIncompleteTask);
            } else if (nextIncompleteTask.classList.contains(TASK_DONE) === false) {
                toggleTaskVisibility(nextIncompleteTask);
            } else if (previousIncompleteTask.classList.contains(TASK_DONE) === false) {
                toggleTaskVisibility(previousIncompleteTask);
            } else {
                toggleTaskVisibility(taskList[taskList.length - 1]);
            }
        }, 2000)
    }

}


for (var index = 0; index < taskHeaders.length; index++) {
    let header = taskHeaders[index];
    let task = header.parentElement.parentElement
    header.addEventListener("click", () => {
        toggleTaskVisibility(task)
    })
    let taskBodyImage = task.querySelector('.task-image')
    let taskHeaderImage = task.querySelector('.task-header-image')
    taskBodyImage.addEventListener("click", () => toggleTaskCompletion(taskBodyImage,taskHeaderImage, task, taskList.indexOf(task)))
    taskHeaderImage.addEventListener("click", () => toggleTaskCompletion(taskBodyImage,taskHeaderImage, task, taskList.indexOf(task)))
}

/// Click event listener that listens for clicks outside of the notification and profile dropdown
// menus. If regsitered, it closes the corresponding menu
document.addEventListener(
    "click",
    function (event) {
        const isProfileDropdownExpanded = profileDropDown.classList.contains(OPEN_CLASS)
        const isnotificationDropDownExpanded = notificationDropDown.classList.contains(OPEN_CLASS)
        // Check if the notifications dropdown is open
        if (isnotificationDropDownExpanded) {
            if (
                // Check if the target is not the notification dropdown or the notification-bar
                !event.target.closest("#notifications") && !event.target.closest(".notification-bar")
                ) {
                closeNotificationMenu()
            } 
            return;
        }
        // Check if the profile dropdown is open
        if (isProfileDropdownExpanded) {
            // Check if the target is not the profile dropdown or the notification-bar
            if (!event.target.closest('#profile-settings') && !event.target.closest(".notification-bar")) {
                closeProfileMenu()
            }
            return;
        }
    },
)