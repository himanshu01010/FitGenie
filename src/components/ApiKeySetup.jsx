import { useState } from "react";
import { Key,Sparkles } from "lucide-react";

const ApiKeySetup = ({onKeySubmit}) => {
    const [apiKey, setApiKey] = useState('');

    const handleSubmit = ()=>{
        if(apiKey.trim()){
            onKeySubmit(apiKey);
        }
    };

    const handleKeyPress = (e)=>{
        if(e.key == 'Enter'){
            handleSubmit();
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
                <Sparkles className="w-12 h-12 text-white"/>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Let's Get Started! 🚀 
            </h2>
            <p className="text-grey-600">
                Enter your API key to unlock AI-powered fitness
            </p>
        </div>

        <div className="space-y-4">
            <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                <input
                    type="password"
                    placeholder="Paste your API key here...."
                    value={apiKey}
                    onChange={(e)=>setApiKey(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
                />
            </div>

            <button 
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
                Start My Journey
            </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
            Get your key from{' '}
            <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-purple-600 underline"
            >
                Google AI Studio 
            </a>
        </p>    
        </div>
    </div>
  )
}

export default ApiKeySetup