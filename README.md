# 🖼️ ArtIstry Wishlist App by Jessy The 🎨

- [The assignment](#the-assignment)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Run the app](#run-the-app)
  - [Continued development](#continued-development)

🔨Tech Stack
🛠 Built With
🖼 Next.js 13 (App Router) – Server-side rendering & optimized performance.
🎨 TailwindCSS – Utility-first styling framework.
📦 Zustand – Lightweight state management.
💾 LocalStorage – Persist wishlist data.
⏳ Lodash.debounce – Debounced updates to avoid excessive writes.
🎭 Framer Motion – Smooth animations for wishlist interactions.
🧪 Cypress – End-to-end testing for functionality.

💪Features  
✔ Add/Remove Items – Click the heart icon to toggle wishlist state.  
✔ Wishlist Panel – Opens a side panel to view items.  
✔ Quantity Management – Increase/decrease quantity within wishlist.  
✔ LocalStorage Persistence – Wishlist remains after page reloads.  
✔ Performance Optimizations – Minimized re-renders & debounced updates.  
✔ Optimize Performance – Reduce unnecessary re-renders & improve state management.
✔ Ensure Smooth UX – Use animations, transitions, and accessible UI.
✔ Write End-to-End Tests – Use Cypress to verify wishlist functionality

🎨 UI & UX
• Animated Wishlist Panel – Smooth opening & closing.  
• Button Animations – Hover effects, animated heart icon.  
• Item Removal Fade-out Effect – Items fade when deleted.

🛠️ Performance Enhancements  
• Zustand Selectors
• Lodash.debounce (300ms)
• React.memo & Framer Motion
• Next.js Image Optimization

---

🛠️ My Process
💠 Step 1: Planning & MVP Definition
Analysed the assessment
Abstracted core features & extra features
Deconstructed the App Process
From Frontend to Functionality To Data.
Decided on Tech Stack
Made a planning
Reverse engineered my goals.

💠 Step 2: Made wireframes + design
Did research for sources of inspiration
Made structure of components.

💠 Step 3: Building the skeleton
Created JSON file and ProductGallery.
Built the Header, Card, WishlistPanel.
Built all the functionality first

💠 Step 4: Managing State with Zustand
Used Zustand for lightweight state management.
Added localStorage persistence to keep wishlist items after reload.
Debounced updates to localStorage to avoid performance issues.

💠 Step 5: Adding Animations & UX Enhancements
Used Framer Motion for smooth wishlist opening/closing animations.
Animated item removal when clicking the trash icon.

💠 Step 6: Performance Optimization
Lots of testing of functionality and scenario's
Minimized re-renders with React.memo & Zustand selectors.
Used useShallow from Zustand to optimize reactivity.
Lazy-loaded images for better performance.

💠 Step 7: Testing Responsiveness for devices
Adjusted styling everywhere
Checking in browsers + clicking

💠 Step 8: Testing with Cypress
Created Cypress end-to-end tests for:
Adding/removing wishlist items.
Ensuring wishlist persistence.
UI updates after interactions.

💠 Step 9: Code Cleanup & Final Testing
Reviewed & refactored the code for better structure.
Verified responsiveness for different screen sizes.
Final Cypress test run before submission.

---

🚀 Run the App
1️⃣ Clone the Repository
git clone https://github.com/jyse/divotion-jessy-the.git
cd divotion-jessy-the
2️⃣ Install Dependencies
npm install # or yarn install
3️⃣ Start the Development Server
npm run dev # or yarn dev
🔗 Open http://localhost:3000 to see the app in action.

🧪 Cypress Testing
1️⃣ Open Cypress in Interactive Mode
npx cypress open
Click E2E Testing
Choose a browser (Chrome/Firefox)
Run wishlist.cy.js
2️⃣ Run Cypress in Headless Mode (CI/CD)
npx cypress run
✅ Runs all tests in the terminal for continuous integration.

📌 Continued Development
For future improvements, I would explore:
👉 Dark Mode – Implement Tailwind dark mode & theme toggle.
👉 Skeleton Loading – Add shimmer loading states for wishlist items.
👉 Server-Side Wishlist Sync – Store wishlist in a database for cross-device access.
👉 Enhance Debounce Logic – Use request cancellation techniques for better efficiency.
👉 Integrate CI/CD – Automate Cypress tests with GitHub Actions.

🎯 Final Notes
This project highlights:
✅ Efficient state management with Zustand.
✅ Optimized UI interactions with Framer Motion.
✅ Performance-focused development using debouncing & memoization.
✅ Animations with Framer-motions
✅ Testing with Cypress.

If you have feedback or ideas for improvement, feel free to open an issue or contribute! 🚀

Thank you! 🙏✨
