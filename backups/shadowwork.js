const prompt = document.getElementById('js-swprompt');
const headers = new Headers();

async function getPrompt() {
    let thisdate = new Date();
    let today = thisdate.toISOString();

    prompt.innerText = 'Finding prompt...';
    headers.append("Content-Type", "application/json");
    const response = await fetch("https://eo32youz5g33tfn.m.pipedream.net", {
        method: 'POST',
        body: new URLSearchParams({
        "date": today
        }),
        error: function (status) {
            saveStatus.innerText = 'What is a negative emotion you experienced this week? What caused it? How did it feel to experience it?';
            saveEvent.removeAttribute('disabled');
            saveCancel.removeAttribute('disabled');
        }
    })
    const saveResponse = await response.json();
    if (saveResponse.prompt != null) {
        prompt.innerText = saveResponse.prompt;
    } else {
        prompt.innerText = 'What is a negative emotion you experienced this week? What caused it? How did it feel to experience it?';
    }
};

window.addEventListener('DOMContentLoaded', (event) => {
    getPrompt();
});