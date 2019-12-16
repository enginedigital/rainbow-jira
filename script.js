/**
 * Button handler
 *
 * @returns {void}
 */
const handler = () => {
    const style = Array.from(inputs).find(el => el.checked === true).value;
    /**
     * Function that is called when the button is hit
     *
     * @returns {void}
     */
    const modifyDOM = (style) => {
        // select cards that are not subtasks
        const cards = document.querySelectorAll('.ghx-issue.ghx-type-10000');

        if (!cards) {
            return;
        }

        const opacity = style === 'backgrounds' ? 0.5 : 1;
        const styling = style === 'backgrounds' ? 'background-color: ' : 'border: 10px solid ';

        const colors = [
            `hsl(0, 0, 74%, ${opacity})`,
            `hsl(1, 100%, 72%, ${opacity})`,
            `hsl(38, 100%, 67%, ${opacity})`,
            `hsl(55, 100%, 67%, ${opacity})`,
            `hsl(141, 67%, 72%, ${opacity})`,
            `hsl(203, 82%, 72%, ${opacity})`,
            `hsl(265, 86%, 82%, ${opacity})`,
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
                ${styling} ${colors[index]};
            }\n`;
        });

        const lastScriptTag = document.getElementsByTagName('script')[0];
        lastScriptTag.parentElement.insertBefore(styleTag, lastScriptTag);
    };

    // We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: '(' + modifyDOM + ')( "' + style + '" );' //argument here is a string but function.toString() returns function's code
    });
};

const button = document.getElementById('button');
const inputs = document.querySelectorAll('input');

if (button) {
    button.addEventListener('click', handler);
}
