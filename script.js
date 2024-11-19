// Toggle script
const toggle = document.querySelector('.toggle');
const slider = document.querySelector('.slider');
const body = document.body;

// Initial state
let activeIndex = 0;

// Function to update slider position and body class
function updateToggle(index) 
{
    activeIndex = index;
    slider.style.left = `${index * 30 + 2}px`;
    body.className = `theme${index + 1}`;
}

// Event listener for the toggle
toggle.addEventListener('click', () => 
{
    const nextIndex = (activeIndex + 1) % 3;
    updateToggle(nextIndex);
});

// Initialize the toggle
updateToggle(activeIndex);

// Calc script
const resultDisplay = document.getElementById('res');
const buttons = document.querySelectorAll('.btn');
let currentExpression = '';

// format numbers with commas
function formatNumberWithCommas(number) 
{
    if (isNaN(number)) return number;
    return parseFloat(number).toLocaleString();
}

// Function to update the display with formatted numbers
function updateDisplay(expression) 
{
    const formattedExpression = expression.replace(/(\d+(\.\d+)?)/g, match =>
        formatNumberWithCommas(match)
    );
    resultDisplay.innerText = formattedExpression;
}

// Button click handling
buttons.forEach(button => 
{
button.addEventListener('click', () => 
    {
        const buttonId = button.id;
        if (buttonId === 'cls') 
        {
            currentExpression = '';
            resultDisplay.innerText = '';
        } 
        else if (buttonId === 'del') 
        {
            currentExpression = currentExpression.slice(0, -1);
            updateDisplay(currentExpression || '0');
        } 
        else if (buttonId === 'eq') 
        {
            try 
            {
                const result = eval(currentExpression.replace('&divide;', '/'));
                resultDisplay.innerText = formatNumberWithCommas(result);
                currentExpression = result.toString();
            } 
            catch 
            {
                resultDisplay.innerText = 'Error';
            }
        } 
        else 
        {
            const buttonContent = button.innerText;
            currentExpression += buttonContent === '÷' ? '/' : buttonContent;
            updateDisplay(currentExpression);
        }
    });
});

// On-click visual effect
buttons.forEach(button => 
{
    button.addEventListener('mousedown', () => 
    {
        button.classList.add('clicked');
    });
    button.addEventListener('mouseup', () => 
    {
        button.classList.remove('clicked');
    });
    button.addEventListener('mouseleave', () => {
        button.classList.remove('clicked');
    });
});
