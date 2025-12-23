# FitGenie

Your personal AI-powered trainer & nutritionist! Track calories, generate custom diet plans, and get personalized workout routines - all powered by Google's Gemini AI.

![AI Calorie Tracker](./assets/calorieTracker.png)
![Gym Diet Planner](./assets/GymDietPlan.png)
![Workout Planner](./assets/workoutPlan.png)

## ✨ Features

### 🍽️ AI Calorie Tracker
- Upload food images and get instant nutritional analysis
- Automatic food recognition and calorie estimation
- Detailed nutritional breakdown (protein, carbs, fats)
- Fun, engaging descriptions of your meals

### 💪 Gym Diet Planner
- Personalized meal plans based on your goals
- Customizable duration (1, 3, or 7 days)
- Multiple diet preferences (Vegetarian, Eggetarian, Non-Veg, Vegan)
- Budget-friendly options (Low, Medium, High)
- Complete daily meal breakdowns with calorie counts

### 🏋️ Workout Planner
- Custom workout routines tailored to your fitness level
- Goal-based training plans (Weight Loss, Muscle Gain, Strength, General Fitness)
- Detailed exercise instructions with sets, reps, and rest periods
- Progressive training schedules

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/himanshu01010/FitGenie.git
cd FitGenie
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔑 Getting Your API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and paste it in the app's setup screen

> **Note:** Your API key is encrypted and stored securely in your browser's local storage.

## 📦 Dependencies

### Core
- `react` - UI framework
- `vite` - Build tool and dev server
- `@google/generative-ai` - Google Gemini AI SDK

### UI Components
- `lucide-react` - Icon library
- `tailwindcss` - Utility-first CSS framework

### Security
- `crypto-js` - API key encryption

## 🛠️ Project Structure

```
ai-fitness-buddy/
├── src/
│   ├── components/
│   │   ├── ApiKeySetup.jsx       # API key input screen
│   │   ├── CalorieTracker.jsx    # Food image analysis
│   │   ├── DietPlanner.jsx       # Diet plan generator
│   │   └── WorkoutPlanner.jsx    # Workout plan generator
│   ├── services/
│   │   └── geminiService.js      # Gemini AI API calls
│   ├── utils/
│   │   └── apiKeyStorage.js      # Encrypted API key storage
│   ├── App.jsx                   # Main app component
│   └── main.jsx                  # App entry point
├── package.json
└── README.md
```

## 🎨 Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **AI:** Google Gemini 2.0 Flash
- **Icons:** Lucide React
- **Storage:** LocalStorage with AES encryption

## 🌟 Features in Detail

### Calorie Tracker
- Accepts image uploads in various formats
- Uses Gemini Vision AI for food recognition
- Provides instant nutritional estimates
- Detects non-food items with playful messages

### Diet Planner
- Considers gender, weight, and fitness goals
- Generates balanced meal plans
- Includes breakfast, lunch, snacks, and dinner
- Shows total daily calorie counts
- Respects dietary preferences and budget constraints

### Workout Planner
- Adapts to fitness level (Beginner, Intermediate, Advanced)
- Goal-oriented exercise selection
- Includes exercise notes and proper form tips
- Shows workout duration and rest periods
- Progressive difficulty scaling

## 🔒 Security

- API keys are encrypted using AES encryption
- Keys are stored only in browser's local storage
- No server-side storage of sensitive data
- All AI requests are made directly from the client

## 🎯 Usage Tips

1. **For Best Results:**
   - Use clear, well-lit food photos
   - Provide accurate weight and goal information
   - Start with shorter duration plans (1-3 days) to test

2. **Customization:**
   - Adjust form inputs to match your specific needs
   - Try different diet types and budgets
   - Experiment with various fitness goals

3. **Privacy:**
   - Your API key never leaves your browser
   - No personal data is stored on external servers
   - All AI processing happens through Google's secure API

## 🙏 Acknowledgments

- Google Gemini AI for powering the intelligence
- Lucide React for beautiful icons
- Tailwind CSS for styling utilities



