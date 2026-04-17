##

Advanced Todo Card - Stage 1A
An interactive, stateful Todo Card component built with vanilla JavaScript, HTML, and CSS. This project extends the initial Stage 0 design into a functional, app-like component capable of handling real-time data updates and user interactions.

🚀 Key Changes from Stage 0
Editing Mode: Users can now click the edit icon to swap the static card for a dynamic form, allowing updates to the title, description, priority, and due date.

Stateful Status Logic: Added a status dropdown and task checkbox that are bidirectionally synced.

Granular Time Tracking: The time-remaining indicator now updates every 30 seconds and provides specific human-readable strings (e.g., "Overdue by 2 hours" or "Due in 45 minutes").

Collapsible Content: Long descriptions are now truncated by default to maintain a clean UI, with a toggle to reveal full content.

Visual Priority Indicators: Added a dynamic left-border accent that changes color based on the selected priority level (Low, Medium, High).

🎨 Design Decisions
Status-Sync Pattern: To ensure data integrity, unchecking a "Done" task automatically reverts the status to "Pending." Manually selecting "In Progress" adds a dashed border to the card for a distinct visual "active" state.

Focus Management: For a better user experience, focus is automatically returned to the "Edit" button after saving or canceling the edit form.

Overdue Styling: When a task passes its deadline, the time indicator switches to a bold red font and prepends an alert emoji (🚨) to grab user attention immediately.

Dynamic Time Formatting: Used Intl.DateTimeFormat for localized, readable date strings and Math.abs logic to handle both "Remaining" and "Overdue" time calculations granularly.

♿ Accessibility Notes
Keyboard Navigation: All interactive elements (buttons, inputs, dropdowns) are focusable and navigable via keyboard.

ARIA Attributes: The expand/collapse toggle uses aria-expanded and aria-controls to inform screen reader users of the hidden content's state.

Focus Trapping: When entering Edit Mode, the user's focus is managed to ensure they don't accidentally navigate "behind" the form.

Semantic HTML: Used <article>, <time>, and <label> tags to ensure the document structure is meaningful to assistive technologies.

🛠️ Known Limitations
Local Storage: Currently, the card state does not persist after a page refresh (Stage 1 requirements focus on interactive logic rather than data persistence).

Single Instance: The current script is optimized for a single Todo Card on the page.
