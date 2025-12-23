import { useState } from 'react';
import { Sparkles, Utensils } from 'lucide-react';
import { analyzeFoodImage } from '../services/geminiService';

const CalorieTracker = ({ apiKey }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const analysis = await analyzeFoodImage(file, apiKey);
      setResult(analysis);
    } catch (err) {
      console.error('Error analyzing food:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
          AI Calorie Tracker ⚖️
        </h2>
        <p className="text-gray-600">
          Snap a pic, and I'll tell you what's on your plate!
        </p>
      </div>

      <div className="space-y-6">
        
        <label className="relative block w-full h-64 border-4 border-dashed border-pink-300 rounded-2xl cursor-pointer hover:border-pink-500 transition-colors overflow-hidden group">
          {image ? (
            <img 
              src={image} 
              alt="Food Preview" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-pink-600 group-hover:text-pink-700">
              <Utensils className="w-16 h-16 mb-2" />
              <p className="font-semibold">Tap to Upload Food Photo</p>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="hidden" 
          />
        </label>
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> 
              Analyze Calories
            </>
          )}
        </button>

        {result && (
          <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-6 border-2 border-pink-200">
            {result.isFood ? (
              <>
                <h3 className="text-2xl font-bold text-pink-900 mb-4">
                  {result.foodName}
                </h3>
                
                <div className="bg-white rounded-xl p-4 mb-4">
                  <p className="text-3xl font-bold text-orange-600">
                    {result.calories}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {result.nutrition}
                  </p>
                </div>
                
                <p className="text-gray-700 italic">
                  {result.description}
                </p>
              </>
            ) : (
              <p className="text-center text-gray-700">
                {result.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieTracker;