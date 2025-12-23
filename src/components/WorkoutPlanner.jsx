import { useState } from "react";
import { Dumbbell } from "lucide-react";
import { generateWorkoutPlan } from "../services/geminiService";

const WorkoutPlanner = ({ apiKey }) => {
    const [formData, setFormData] = useState({
        gender: 'Female',
        weight: '60',
        goal: 'General Fitness',
        fitnessLevel: 'Beginner',
        duration: '1'
    });

    const [loading, setLoading] = useState(false);
    const [workoutPlan, setWorkoutPlan] = useState(null);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleGenerate = async ()=>{
        setLoading(true);
        try{
            const plan = await generateWorkoutPlan(formData,apiKey);
            setWorkoutPlan(plan);
        } catch(err){
            console.error("Error Generating Workout Plan:",err);
        } finally{
            setLoading(false);
        }
    }


    const formFields = [
        {
            name: 'gender',
            label: 'Gender',
            options: ['Female', 'Male', 'Non-binary']
        },
        {
            name: 'weight',
            label: 'Weight (kg)',
            type: 'number'
        },
        {
            name: 'goal',
            label: 'Goal',
            options: ['Weight Loss', 'Muscle Gain', 'General Fitness', 'Strength']
        },
        {
            name: 'fitnessLevel',
            label: 'Fitness Level',
            options: ['Beginner', 'Intermediate', 'Advanced']
        },
        {
            name: 'duration',
            label: 'Duration',
            options: [
                { v: '1', l: '1 Day' },
                { v: '3', l: '3 Days' },
                { v: '7', l: '7 Days' }
            ]
        }
    ];



    return (
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Workout Planner 🏋️
                </h2>
                <p className="text-gray-600">
                    Get a personalized workout routine tailored to your goals!
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {formFields.map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {field.label}
                        </label>

                        {field.type === 'number' ? (
                            <input
                                type="number"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        ) : (
                            <select
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                {field.options.map((opt) => (
                                    <option key={opt.v || opt} value={opt.v || opt}>
                                        {opt.l || opt}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                ))}

            </div>

            <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating workout...
                    </>
                ) : (
                    <>
                        <Dumbbell className="w-5 h-5" />
                        Generate Workout Plan
                    </>
                )}

            </button>

            {workoutPlan && (
                <div className="mt-8 space-y-4">
                    {workoutPlan.map((day, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-200"
                        >
                            <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-purple-300">
                                <h3 className="text-xl font-bold text-purple-900">
                                    🏋️ {day.day}
                                </h3>
                                <span className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full">
                                    {day.duration}
                                </span>
                            </div>

                            <div className="space-y-3">
                                {day.exercises.map((ex, eIdx) => (
                                    <div key={eIdx} className="bg-white rounded-xl p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-gray-800 flex-1">
                                                {ex.name}
                                            </p>
                                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-semibold ml-2">
                                                {ex.sets}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Rest: {ex.rest}
                                        </p>
                                        {ex.notes && (
                                            <p className="text-sm text-gray-500 italic mt-1">
                                                {ex.notes}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkoutPlanner