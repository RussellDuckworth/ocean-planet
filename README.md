# Ocean Planet Game

Game Closure Coding Challenge
"Adventure Capitalist" Idle Game


## PLAY GAME:
https://russduckworth.com:4243/


## TIME CONSTRAINTS

### Problem:
- Minimal time to complete project.

### Solution:
- Make it a simple web app.
- Use React for reusable UI components.
- Use NodeJS/Express for quick server.
- Avoid complex server component.


## THE METAPHOR

### Problem:
- Business metaphor doesn't scale logically. One cannot own twenty thousand hockey teams, nor may one own 42 billion lemonade stands.
- "Manager"

###  Solution:
- Number of lifeforms inhabiting the Ocean planet scales in a more satisfying and believable way.
- "Robot"


## PERFORMANCE

###  Problem:
- Avoid making frequent update calls.

### Solution:
- Use CSS animations when possible.
- Use one second timeout for time remaining display.

### Issue:
- Animation can potentially get out of sync with timer?

### Conclusion:
- CSS animations have a greater likelihood of being an accelerated process in the browser and should be used when possible to achieve smoother frame rates and cooler devices.
- Infrequent one second timeout for each species seems like a reasonable amount of JS code execution given potential N species.


## "IDLE" FUNCTIONALITY

### Problem:
- Appearance that system is "working" (generating resources) while not loaded or on screen.
- Harvests in progress must be restarted at page load.

### Solution:
- Save game state in local storage.
    - total currency earned
    - species quantity
    - species has robot helper
    - species time harvest begin
- Load state on app start.

### Issues:
- No server data collection means we cannot understand how users are playing the game.
- No mechanisms to ensure that the user is not cheating.

### Conclusion:
- Omitting server component allowed for more rapid development.


## ADDITIONS?

### Some things I would add if I had more time:

- Server component with high scores.
 - Optimize code for better performance.
- Sounds.
- Particle effects on generate and spend.
- Remove magic numbers from code.
- Avoid integer overflow for energy.
- Tweak and Optimize styles. Use clipping path for progress.
- Clean project. Remove unused resources. Production settings.
- Slowly update look of planet as life grows.

