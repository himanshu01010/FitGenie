import { useState } from 'react'
import { Sparkles,Utensils,Dumbbell,Heart } from 'lucide-react'
import ApiKeySetup from './components/ApiKeySetup'
import CalorieTracker from './components/CalorieTracker'
import DietPlanner from './components/DietPlanner'
import WorkoutPlanner from './components/WorkoutPlanner'
import { saveApiKey, getApiKey } from './utils/apiKeyStorage'


function App() {
  const [apiKey, setApiKey] = useState(()=>getApiKey());
  const [activeTab, setActiveTab] = useState('calories');

  const tabs = [
    { 
      id: 'calories', 
      label: 'Calorie Tracker', 
      icon: Sparkles, 
      gradient: 'from-pink-500 to-orange-500' 
    },
    { 
      id: 'diet', 
      label: 'Diet Planner', 
      icon: Utensils, 
      gradient: 'from-green-500 to-teal-500' 
    },
    { 
      id: 'workout', 
      label: 'Workout Plan', 
      icon: Dumbbell, 
      gradient: 'from-purple-500 to-blue-500' 
    }
  ];

  const handleApiKeySubmit = (key) =>{
    saveApiKey(key);
    setApiKey(key);
  };

  if (!apiKey) {
    return <ApiKeySetup onKeySubmit={handleApiKeySubmit}/>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            FitGenie 🧞‍♂️
          </h1>
          <p className="text-lg text-gray-600">
            Your personal AI trainer & nutritionist!
          </p>
        </header>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all transform hover:-translate-y-0.5 flex items-center gap-2 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg scale-105`
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-10xl mx-auto">
          {activeTab === 'calories' && <CalorieTracker apiKey={apiKey} />}
          {activeTab === 'diet' && <DietPlanner apiKey={apiKey} />}
          {activeTab === 'workout' && <WorkoutPlanner apiKey={apiKey} />}
        </div>
      </div>
    </div>
  );
}

export default App;