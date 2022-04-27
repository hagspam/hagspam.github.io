const data = [
{
    setup: 'It doesn\'t matter how much you push the envelope.',
    punchline: 'It\'ll still be stationary.'
},
{
    setup: 'I walked into my sister\'s room and tripped on a bra.',
    punchline: 'It was a booby-trap.'
},
{
    setup: 'A book just fell on my head.',
    punchline: 'I only have my shelf to blame.'
},
{
    setup: 'What is the leading cause of divorce in long-term marriages?',
    punchline: 'A stalemate.'
},
{
    setup: 'What did the mermaid wear to her math class?',
    punchline: 'An algae bra.'
},
{
    setup: 'I tried to catch some fog earlier.',
    punchline: 'I mist.'
},
{
    setup: 'I stayed up all night wondering where the sun went.',
    punchline: 'Then it dawned on me.'
},
{
    setup: 'You wanna hear a joke about pizza?',
    punchline: 'Never mind, it was too cheesy.'
},
{
    setup: 'What did the green grape say to the purple grape?',
    punchline: 'Breathe, you idiot!'
},
{
    setup: 'Why did the scarecrow get an award?',
    punchline: 'He was outstanding in his field.'
}
]


function makePun(setup, punchline) {
    const section = document.createElement('section');
    const setupDiv = document.createElement('div');
    setupDiv.textContent = setup;
    setupDiv.classList.add('setup');
    const button = document.createElement('button');
    button.textContent = "Show Punchline";
    button.togglePun = function () {
        const punchline = this.parentNode.nextElementSibling;
        if(punchline.classList.toggle('hidden')){
            this.textContent = 'Show Punchline';
            clearTimeout(this.timer);
        }else{
            this.textContent = 'Hide Punchline'; 
            this.timer = setTimeout(function () { button.togglePun(); }, 5000);
            }
        
    }
    button.addEventListener('click', button.togglePun);
    setupDiv.appendChild(button);
    section.appendChild(setupDiv);
    const punchDiv = document.createElement('div');
    punchDiv.textContent = punchline;
    punchDiv.classList.add('punchline');
    punchDiv.classList.add('hidden');
    section.appendChild(punchDiv);
    return section;
}

const startPuns = document.querySelector('div#startPuns');

for (pun of data){
    const section = makePun (
        pun.setup,
        pun.punchline);
    startPuns.appendChild(section);
}   
