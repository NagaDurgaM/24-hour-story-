"use strict";

/* =========================================
   CONFIGURATION
========================================= */

const STORY_DURATION = 5000;

const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;


/* =========================================
   DEFAULT STORIES
========================================= */

let stories = [
    {
        id: 1,

        name: "Alex",

        avatar:
            "https://i.pravatar.cc/150?img=12",

        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",

        text:
            "Exploring beautiful places ✨",

        createdAt:
            Date.now() - 2 * 60 * 60 * 1000,

        viewed: false
    },

    {
        id: 2,

        name: "Sarah",

        avatar:
            "https://i.pravatar.cc/150?img=47",

        image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",

        text:
            "Working on something exciting!",

        createdAt:
            Date.now() - 4 * 60 * 60 * 1000,

        viewed: false
    },

    {
        id: 3,

        name: "Michael",

        avatar:
            "https://i.pravatar.cc/150?img=33",

        image:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",

        text:
            "Team meeting today 🚀",

        createdAt:
            Date.now() - 8 * 60 * 60 * 1000,

        viewed: false
    },

    {
        id: 4,

        name: "Emma",

        avatar:
            "https://i.pravatar.cc/150?img=44",

        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",

        text:
            "Weekend vibes 🌿",

        createdAt:
            Date.now() - 10 * 60 * 60 * 1000,

        viewed: false
    }
];


/* =========================================
   DOM ELEMENTS
========================================= */

const storyList =
    document.getElementById("storyList");

const emptyState =
    document.getElementById("emptyState");

const storyViewer =
    document.getElementById("storyViewer");

const storyImage =
    document.getElementById("storyImage");

const storyText =
    document.getElementById("storyText");

const viewerName =
    document.getElementById("viewerName");

const viewerAvatar =
    document.getElementById("viewerAvatar");

const viewerTime =
    document.getElementById("viewerTime");

const progressContainer =
    document.getElementById("progressContainer");

const storyCounter =
    document.getElementById("storyCounter");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const closeViewer =
    document.getElementById("closeViewer");

const addStoryBtn =
    document.getElementById("addStoryBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");

const storyModal =
    document.getElementById("storyModal");

const modalClose =
    document.getElementById("modalClose");

const publishStory =
    document.getElementById("publishStory");

const userName =
    document.getElementById("userName");

const imageUrl =
    document.getElementById("imageUrl");

const storyMessage =
    document.getElementById("storyMessage");

const backgroundColor =
    document.getElementById("backgroundColor");

const storyContent =
    document.getElementById("storyContent");


/* =========================================
   VIEWER STATE
========================================= */

let currentStoryIndex = 0;

let progressTimer = null;

let autoAdvanceTimer = null;

let isPaused = false;

let progressStartTime = 0;

let elapsedBeforePause = 0;


/* =========================================
   REMOVE EXPIRED STORIES
========================================= */

function removeExpiredStories() {

    const currentTime = Date.now();

    stories = stories.filter((story) => {

        return (
            currentTime - story.createdAt
            <
            TWENTY_FOUR_HOURS
        );

    });
}


/* =========================================
   RENDER STORIES
========================================= */

function renderStories() {

    removeExpiredStories();

    storyList.innerHTML = "";

    if (stories.length === 0) {

        emptyState.classList.remove("hidden");

        return;
    }

    emptyState.classList.add("hidden");


    stories.forEach((story, index) => {

        const storyItem =
            document.createElement("div");

        storyItem.className =
            "story-item";


        if (story.viewed) {

            storyItem.classList.add("viewed");
        }


        storyItem.innerHTML = `
            <div class="story-avatar-wrapper">

                <img
                    class="story-avatar"
                    src="${escapeHTML(story.avatar)}"
                    alt="${escapeHTML(story.name)}"
                >

            </div>

            <span class="story-name">
                ${escapeHTML(story.name)}
            </span>
        `;


        storyItem.addEventListener(
            "click",
            () => openStory(index)
        );


        storyList.appendChild(storyItem);

    });
}


/* =========================================
   OPEN STORY
========================================= */

function openStory(index) {

    if (
        index < 0 ||
        index >= stories.length
    ) {
        return;
    }


    currentStoryIndex = index;

    elapsedBeforePause = 0;

    isPaused = false;


    storyViewer.classList.remove("hidden");


    document.body.style.overflow = "hidden";


    loadStory(currentStoryIndex);

}


/* =========================================
   LOAD STORY
========================================= */

function loadStory(index) {

    clearTimers();


    const story =
        stories[index];


    if (!story) {

        closeStory();

        return;
    }


    story.viewed = true;


    viewerName.textContent =
        story.name;


    viewerAvatar.src =
        story.avatar;


    viewerAvatar.alt =
        `${story.name} profile picture`;


    storyImage.src =
        story.image;


    storyImage.alt =
        `${story.name}'s story`;


    storyText.textContent =
        story.text;


    storyContent.style.background =
        backgroundColor.value;


    viewerTime.textContent =
        getTimeAgo(story.createdAt);


    storyCounter.textContent =
        `${index + 1} / ${stories.length}`;


    createProgressBars();


    updateNavigationButtons();


    startProgress();


    renderStories();
}


/* =========================================
   PROGRESS BARS
========================================= */

function createProgressBars() {

    progressContainer.innerHTML = "";


    stories.forEach((story, index) => {

        const bar =
            document.createElement("div");

        bar.className =
            "progress-bar";


        const fill =
            document.createElement("div");

        fill.className =
            "progress-fill";


        if (index < currentStoryIndex) {

            fill.style.width = "100%";

        } else {

            fill.style.width = "0%";
        }


        bar.appendChild(fill);

        progressContainer.appendChild(bar);

    });
}


/* =========================================
   START PROGRESS
========================================= */

function startProgress() {

    clearTimers();


    const progressBars =
        document.querySelectorAll(
            ".progress-fill"
        );


    const currentFill =
        progressBars[currentStoryIndex];


    if (!currentFill) {
        return;
    }


    progressStartTime =
        Date.now();


    elapsedBeforePause = 0;


    currentFill.style.width = "0%";


    function updateProgress() {

        if (isPaused) {
            return;
        }


        const elapsed =
            elapsedBeforePause +
            (Date.now() - progressStartTime);


        const percentage =
            Math.min(
                (elapsed / STORY_DURATION) * 100,
                100
            );


        currentFill.style.width =
            `${percentage}%`;


        if (percentage >= 100) {

            goToNextStory();

            return;
        }


        progressTimer =
            requestAnimationFrame(
                updateProgress
            );

    }


    progressTimer =
        requestAnimationFrame(
            updateProgress
        );

}


/* =========================================
   NEXT STORY
========================================= */

function goToNextStory() {

    clearTimers();


    if (
        currentStoryIndex
        <
        stories.length - 1
    ) {

        currentStoryIndex++;

        elapsedBeforePause = 0;

        loadStory(currentStoryIndex);

    } else {

        closeStory();
    }
}


/* =========================================
   PREVIOUS STORY
========================================= */

function goToPreviousStory() {

    clearTimers();


    if (currentStoryIndex > 0) {

        currentStoryIndex--;

        elapsedBeforePause = 0;

        loadStory(currentStoryIndex);

    } else {

        elapsedBeforePause = 0;

        loadStory(currentStoryIndex);
    }
}


/* =========================================
   NAVIGATION BUTTONS
========================================= */

function updateNavigationButtons() {

    previousBtn.style.visibility =
        currentStoryIndex === 0
            ? "hidden"
            : "visible";

}


/* =========================================
   CLOSE STORY
========================================= */

function closeStory() {

    clearTimers();

    storyViewer.classList.add("hidden");

    document.body.style.overflow = "";

    isPaused = false;

    renderStories();
}


/* =========================================
   CLEAR TIMERS
========================================= */

function clearTimers() {

    if (progressTimer) {

        cancelAnimationFrame(
            progressTimer
        );

        progressTimer = null;
    }


    if (autoAdvanceTimer) {

        clearTimeout(
            autoAdvanceTimer
        );

        autoAdvanceTimer = null;
    }

}


/* =========================================
   PAUSE STORY
========================================= */

function pauseStory() {

    if (isPaused) {
        return;
    }


    isPaused = true;


    elapsedBeforePause +=
        Date.now() - progressStartTime;
}


/* =========================================
   RESUME STORY
========================================= */

function resumeStory() {

    if (!isPaused) {
        return;
    }


    isPaused = false;

    progressStartTime =
        Date.now();


    startProgress();
}


/* =========================================
   TIME AGO
========================================= */

function getTimeAgo(timestamp) {

    const difference =
        Date.now() - timestamp;


    const minutes =
        Math.floor(
            difference / 60000
        );


    if (minutes < 1) {

        return "Just now";

    }


    if (minutes < 60) {

        return `${minutes}m ago`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {

        return `${hours}h ago`;

    }


    return "Expired";
}


/* =========================================
   ADD STORY MODAL
========================================= */

function openModal() {

    storyModal.classList.remove(
        "hidden"
    );

    userName.focus();
}


function closeModal() {

    storyModal.classList.add(
        "hidden"
    );
}


/* =========================================
   PUBLISH STORY
========================================= */

function createNewStory() {

    const name =
        userName.value.trim();


    const image =
        imageUrl.value.trim();


    const message =
        storyMessage.value.trim();


    const bgColor =
        backgroundColor.value;


    if (!name) {

        alert(
            "Please enter your name."
        );

        return;
    }


    if (!message && !image) {

        alert(
            "Please add an image or story text."
        );

        return;
    }


    const newStory = {

        id:
            Date.now(),

        name:
            name,

        avatar:
            `https://i.pravatar.cc/150?u=${Date.now()}`,

        image:
            image ||
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80",

        text:
            message ||
            "My new story!",

        background:
            bgColor,

        createdAt:
            Date.now(),

        viewed:
            false
    };


    stories.unshift(
        newStory
    );


    renderStories();


    resetForm();

    closeModal();


    alert(
        "Story published successfully!"
    );

}


/* =========================================
   RESET FORM
========================================= */

function resetForm() {

    userName.value = "";

    imageUrl.value = "";

    storyMessage.value = "";

    backgroundColor.value =
        "#667eea";
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================
   EVENT LISTENERS
========================================= */

nextBtn.addEventListener(
    "click",
    goToNextStory
);


previousBtn.addEventListener(
    "click",
    goToPreviousStory
);


closeViewer.addEventListener(
    "click",
    closeStory
);


addStoryBtn.addEventListener(
    "click",
    openModal
);


emptyAddBtn.addEventListener(
    "click",
    openModal
);


modalClose.addEventListener(
    "click",
    closeModal
);


publishStory.addEventListener(
    "click",
    createNewStory
);


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

storyModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === storyModal
        ) {

            closeModal();

        }

    }
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            storyViewer.classList.contains(
                "hidden"
            )
        ) {
            return;
        }


        if (event.key === "ArrowRight") {

            goToNextStory();

        }


        if (event.key === "ArrowLeft") {

            goToPreviousStory();

        }


        if (event.key === "Escape") {

            closeStory();

        }


        if (event.key === " ") {

            event.preventDefault();


            if (isPaused) {

                resumeStory();

            } else {

                pauseStory();

            }

        }

    }
);


/* =========================================
   MOUSE HOLD TO PAUSE
========================================= */

storyContent.addEventListener(
    "mousedown",
    pauseStory
);


storyContent.addEventListener(
    "mouseup",
    resumeStory
);


storyContent.addEventListener(
    "mouseleave",
    resumeStory
);


/* =========================================
   TOUCH HOLD TO PAUSE
========================================= */

storyContent.addEventListener(
    "touchstart",
    pauseStory,
    {
        passive: true
    }
);


storyContent.addEventListener(
    "touchend",
    resumeStory,
    {
        passive: true
    }
);


/* =========================================
   IMAGE ERROR HANDLING
========================================= */

storyImage.addEventListener(
    "error",
    () => {

        storyImage.src =
            "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=80";

    }
);


/* =========================================
   AUTO REMOVE EXPIRED STORIES
========================================= */

setInterval(
    () => {

        const oldLength =
            stories.length;


        removeExpiredStories();


        if (
            stories.length !== oldLength
        ) {

            renderStories();

        }

    },
    60 * 1000
);


/* =========================================
   INITIALIZE APPLICATION
========================================= */

removeExpiredStories();

renderStories();
