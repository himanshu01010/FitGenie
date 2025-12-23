import { GoogleGenerativeAI } from "@google/generative-ai";


const fileToGeneratePart = async (file) =>{
    return new Promise ((resolve, reject)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>{
            const base64Data = reader.result.split(",")[1];
            resolve({
                inlineData:{
                    data:base64Data,
                    mimeType:file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};



export const analyzeFoodImage = async (imageFile,apiKey) =>{
    if(!apiKey) throw new Error("API key is missing!");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"});

    const prompt = `
    Analyze this food image and return a response in the following JSON format:
    {
        "foodName":"Name of food",
        "calories":"Estimated calories (e.g., 350 kcal)",
        "nutrition":"Brief breakdown (e.g., Protein: 10g, Carbs: 40g, Fat: 15g)",
        "description": "A cute, fun, and short description of the food!",
        "isFood": true
    },
    If the image is NOT food, set "isFood" to false and provide a playful error message in "description".
    Return ONLY valid JSON. Do not include markdown code block syntax.
    `;

    const imagePart = await fileToGeneratePart(imageFile);
    const result = await model.generateContent([prompt,imagePart]);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedText);
};



export const generateDietPlan = async (userDetails,apiKey)=>{
    if(!apiKey) throw new Error("API Key is missing");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({model:"gemini-2.0-flash"});

    const { gender, weight, goal, dietType, budget, duration } = userDetails;

    const prompt = `
        Create a ${duration}-day gym diet plan for a ${gender} weighing ${weight}Kg.
        Goal:${goal}
        Diet Preference: ${dietType}
        Budget: ${budget}

        Format the response as a structured JSON array where each item represents a day:
        [
        {
            "day": "Day 1",
            "meals": [
            { "time": "Breakfast", "food": "Oats with nuts", "calories": "300 kcal" },
            { "time": "Lunch", "food": "...", "calories": "..." },
            { "time": "Snack", "food": "...", "calories": "..." },
            { "time": "Dinner", "food": "...", "calories": "..." }
            ],
            "totalCalories": "Total for the day"
        },
        ...
    ]
    Start the response directly with the JSON array. Do not include markdown code block syntax.
    `
    const result = await model.generateContent(prompt);
    const response= await result.response;
    const text = response.text();
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanedText); 
};


export const generateWorkoutPlan = async (userDetails, apiKey) => {
  if (!apiKey) throw new Error("API Key is missing!");

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const { gender, weight, goal, fitnessLevel, duration } = userDetails;

  const prompt = `
    Create a ${duration}-day workout plan for a ${gender} weighing ${weight}kg.
    Goal: ${goal}
    Fitness Level: ${fitnessLevel}
    
    Format the response as a structured JSON array where each item represents a day:
    [
      {
        "day": "Day 1",
        "exercises": [
          { "name": "Push Ups", "sets": "3x12", "rest": "60s", "notes": "Keep back straight" },
          ...
        ],
        "duration": "45 min"
      },
      ...
    ]
    Start the response directly with the JSON array. Do not include markdown code block syntax.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

 
  const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleanedText);
};