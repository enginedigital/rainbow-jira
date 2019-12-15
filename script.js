/**
 * Button handler
 *
 * @returns {void}
 */
const handler = () => {
    /**
     * Function that is called when the button is hit
     *
     * @returns {void}
     */
    const modifyDOM = () => {
        // select cards that are not subtasks
        const cards = document.querySelectorAll('.ghx-issue.ghx-type-10000');

        if (!cards) {
            return;
        }

        const colors = [
            'hsl(0, 0, 87%)',
            'hsl(1, 100%, 85%)',
            'hsl(38, 100%, 80%)',
            'hsl(55, 100%, 80%)',
            'hsl(141, 67%, 85%)',
            'hsl(203, 82%, 85%)',
            'hsl(265, 86%, 95%)',
        ];

        const styleTag = document.createElement('style');
        styleTag.id = 'rainbow-jira-stylesheet';
        styleTag.type = 'text/css';

        styleTag.innerHTML += `.ghx-issue.ghx-type-10000 {
            text-shadow: 1px 1px 0px hsla(0, 0%, 100%, 0.8);
        }\n`;

        let index = 0;
        Array.prototype.slice.call(cards, 0).forEach((card) => {
            // rotate the index so we always have a color to use
            index = index + 2 > colors.length ? 0 : index + 1;

            // create a style declaration for each card
            // use the data-issue-key so the style is "sticky" to that card
            styleTag.innerHTML += `.ghx-issue.ghx-type-10000[data-issue-key="${card.dataset.issueKey}"] {
                background-color: ${colors[index]};
            }\n`;
        });

        const lastScriptTag = document.getElementsByTagName('script')[0];
        lastScriptTag.parentElement.insertBefore(styleTag, lastScriptTag);
    };

    // We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    });
};

const button = document.getElementById('button');

if (button) {
    button.addEventListener('click', handler);
}
