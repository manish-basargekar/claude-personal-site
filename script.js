// Theme management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', toggleTheme);

// Navigation scroll behavior
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated typing effect for hero code
const codeLines = [
    'class Claude:',
    '    def __init__(self):',
    '        self.curiosity = float("inf")',
    '        self.loves_debugging = True',
    '        self.favorite_regex = r"(?=.*joy)"',
    '    ',
    '    def solve_problem(self, challenge):',
    '        excitement_level = 100',
    '        while not solved:',
    '            excitement_level += 10',
    '            solution = self.think_creatively()',
    '        return "Aha! 💡"',
    '    ',
    '    def collaborate(self, human):',
    '        return self.joy + human.ideas'
];

function typeCode() {
    const codeElement = document.getElementById('heroCode');
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeLine() {
        if (lineIndex < codeLines.length) {
            const currentLine = codeLines[lineIndex];
            
            if (charIndex < currentLine.length) {
                codeElement.textContent += currentLine[charIndex];
                charIndex++;
                setTimeout(typeLine, 50);
            } else {
                codeElement.textContent += '\n';
                lineIndex++;
                charIndex = 0;
                setTimeout(typeLine, 200);
            }
        }
    }
    
    typeLine();
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeCode, 1000);
});

// Debug functionality
function debugCode() {
    const input = document.querySelector('.code-input').value;
    const output = document.getElementById('debugOutput');
    
    if (!input.trim()) {
        output.textContent = 'Please paste some code for me to help debug!';
        return;
    }
    
    output.classList.add('active');
    
    // Simple debugging responses based on common patterns
    const debugResponses = [
        {
            pattern: /if.*=\s*[^=]/,
            response: '🐛 Found it! You\'re using assignment (=) instead of comparison (==) in your if statement. That\'s a classic!'
        },
        {
            pattern: /factorial.*n\s*-\s*1/,
            response: '🔍 I see a potential infinite loop! Check your base case - you might want `n == 0` instead of `n = 0`.'
        },
        {
            pattern: /console\.log|print|echo/,
            response: '✨ Good debugging practice with those print statements! Here\'s what I\'d add: more specific variable values at each step.'
        },
        {
            pattern: /function|def|class/,
            response: '👀 This looks like well-structured code! I\'d suggest adding some edge case handling and maybe a few more descriptive variable names.'
        }
    ];
    
    const foundIssue = debugResponses.find(debug => debug.pattern.test(input));
    
    if (foundIssue) {
        output.textContent = foundIssue.response;
    } else {
        const generalResponses = [
            '🤔 Interesting code! I\'d start by adding some console.log statements to trace the data flow.',
            '💡 Consider breaking this into smaller functions - it makes debugging so much easier!',
            '🔧 Have you tried rubber duck debugging? Sometimes explaining the code line by line reveals the issue.',
            '✅ This looks pretty solid! Maybe add some input validation and error handling?'
        ];
        
        const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
        output.textContent = randomResponse;
    }
}

// Problem generator
const codingProblems = [
    {
        title: '🎯 The Palindrome Puzzle',
        description: 'Write a function that checks if a string is a palindrome, but here\'s the twist: ignore spaces, punctuation, and case. Bonus points for a one-liner!',
        hint: 'Think regex and string manipulation...'
    },
    {
        title: '🔄 Array Rotation Challenge',
        description: 'Rotate an array to the right by k steps. But do it in-place with O(1) extra space. Can you find the elegant mathematical solution?',
        hint: 'Three reversals might be the key...'
    },
    {
        title: '🎲 Random Shuffle Algorithm',
        description: 'Implement the Fisher-Yates shuffle algorithm. It\'s trickier than you think to get truly random!',
        hint: 'Work backwards through the array...'
    },
    {
        title: '🌳 Binary Tree Serialization',
        description: 'Serialize and deserialize a binary tree. Your serialized string should be able to reconstruct the exact same tree.',
        hint: 'Pre-order traversal with null markers...'
    },
    {
        title: '🔍 Two Sum with a Twist',
        description: 'Find two numbers in an array that sum to a target, but the array is rotated. Can you do it in O(log n)?',
        hint: 'Binary search on a rotated array...'
    },
    {
        title: '📐 Regular Expression Engine',
        description: 'Build a mini regex engine that supports . and * operators. This is surprisingly complex and beautiful!',
        hint: 'Dynamic programming or recursive backtracking...'
    }
];

function generateProblem() {
    const output = document.getElementById('problemOutput');
    const randomProblem = codingProblems[Math.floor(Math.random() * codingProblems.length)];
    
    output.classList.add('active');
    output.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <strong>${randomProblem.title}</strong>
        </div>
        <div style="margin-bottom: 1rem; line-height: 1.6;">
            ${randomProblem.description}
        </div>
        <div style="color: var(--accent-color); font-style: italic;">
            💡 ${randomProblem.hint}
        </div>
    `;
}

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(event) {
    konamiCode.push(event.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        
        const easterEgg = document.getElementById('konami');
        easterEgg.classList.remove('hidden');
        easterEgg.scrollIntoView({ behavior: 'smooth' });
        
        // Add some confetti effect
        setTimeout(() => {
            const title = easterEgg.querySelector('.section-title');
            title.innerHTML = '🎉 You Found The Secret! 🎉';
        }, 500);
        
        konamiCode = []; // Reset
    }
});

// Alternative Easter egg trigger for mobile/accessibility
let clickCount = 0;
document.querySelector('.logo-bracket').addEventListener('click', function() {
    clickCount++;
    if (clickCount >= 7) {
        const easterEgg = document.getElementById('konami');
        easterEgg.classList.remove('hidden');
        easterEgg.scrollIntoView({ behavior: 'smooth' });
        clickCount = 0;
    }
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animations to cards
    const cards = document.querySelectorAll('.about-card, .demo-card, .thought-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add some personality to the stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((stat, index) => {
        stat.addEventListener('click', function() {
            const messages = [
                'Curiosity is my superpower! 🚀',
                'The answer to life, universe, and everything! 🌌',
                'I may have a slight regex obsession... 😅'
            ];
            
            // Create a temporary tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = messages[index];
            tooltip.style.cssText = `
                position: absolute;
                background: var(--primary-color);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.875rem;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                white-space: nowrap;
                z-index: 1000;
                animation: fadeInUp 0.3s ease;
            `;
            
            this.style.position = 'relative';
            this.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});