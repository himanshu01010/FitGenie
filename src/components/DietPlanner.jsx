import { useState } from "react";
import { Utensils } from "lucide-react";
import { generateDietPlan } from "../services/geminiService";

import React from 'react'

const DietPlanner = ({ apiKey }) => {
    const [formData, setFormData] = useState({
        gender: 'female',
        weight: '60',
        goal: 'Maintenance',
        diteType: 'Vegetarian',
        budget: 'Medium',
        duration: '1'
    });

    const [loading, setLoading] = useState(false);
    const [dietPlan, setDietPlan] = useState(null);

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleGenerate = async()=>{
        setLoading(true);
        try{
            const plan = await generateDietPlan(formData,apiKey);
            setDietPlan(plan);
        }catch (err){
            console.error('Error generating diet plan',err);
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
            options: ['Weight Loss', 'Muscle Gain', 'Maintenance']
        },
        {
            name: 'dietType',
            label: 'Diet Type',
            options: ['Vegetarian', 'Eggetarian', 'Non-Veg', 'Vegan']
        },
        {
            name: 'budget',
            label: 'Budget',
            options: ['Low (Student Friendly)', 'Medium', 'High (Premium)']
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
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    Gym Diet Planner 💪
                </h2>

                <p className="text-gray-600">
                    Tell me your goals, and I'll create your perfect diet!
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
                                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
                            />
                        ) : (
                            <select
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none transition-colors"
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
                className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Cooking up plan...
                    </>
                ) : (
                    <>
                        <Utensils className="w-5 h-5" />
                        Generate Diet Plan
                    </>
                )}
            </button>

            {dietPlan && (
                <div className="mt-8 space-y-4">
                    {dietPlan.map((day, idx) => (
                        <div
                            key={idx}
                            className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200"
                        >
                            <h3 className="text-xl font-bold text-green-900 mb-4 pb-2 border-b-2 border-green-300">
                                📅 {day.day}
                            </h3>

                            <div className="space-y-3">
                                {day.meals.map((meal, mIdx) => (
                                    <div key={mIdx} className="flex items-start gap-3">
                                        <div className="bg-teal-500 text-white px-3 py-1 rounded-lg text-sm font-semibold min-w-[100px] text-center">
                                            {meal.time}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-800">{meal.food}</p>
                                            <p className="text-sm text-gray-600">{meal.calories}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t-2 border-dashed border-green-300 text-right">
                                <span className="font-bold text-green-700">
                                    Total: {day.totalCalories}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>



    )
}

export default DietPlanner