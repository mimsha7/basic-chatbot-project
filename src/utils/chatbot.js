import axios from 'axios';

const OPENWEATHER_API_KEY = 'b2230fa132d2bb89457a4487743a8660';
const DEFAULT_CITY = 'Thakurgaon';

const responses = {
  date: () => new Date().toLocaleDateString(),
  day: () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  },
  weather: async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );
      const { temp, feels_like, humidity } = response.data.main;
      const { sunrise, sunset } = response.data.sys;
      const condition = response.data.weather[0].description;
      // Converting sunrise/sunset timestamps to local time
      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });

      return `It's ${condition} in ${DEFAULT_CITY} with a temperature of ${Math.round(temp)}°C. ` 
      +
        `Feels like ${Math.round(feels_like)}°C. ` + `Humidity ${humidity}%. ` 
      +
        `Sunrise at ${sunriseTime} and sunset at ${sunsetTime}.`;
    } 
  catch (error) 
    {
      return `Sorry, I couldn't fetch the weather information at the moment. : ${error.message}`;
    }
  },
  coin: () => Math.random() < 0.5 ? 'heads' : 'tails',
  greeting: () => 'Hello! How can I help you?',
  default: () => "I'm not sure how to respond to that. Could you try asking something else? or, Type \"help\" to see what I can do.",
  help: () => `I can assist you with the following commands:\n` +
    `- "date": Get today's date.\n` +
    `- "day": Get the current day of the week.\n` +
    `- "weather": Get the current weather in ${DEFAULT_CITY}.\n` +
    `- "coin": Flip a coin.\n` +
    `- "roll": Roll a six-sided die.\n` +
    `- "help": List available commands.`
};

export class Chatbot {
  static async getResponse(input) {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('date')) {
      return responses.date();
    }
    if (lowercaseInput.includes('day')) {
      return `Today is ${responses.day()}`;
    }
    if (lowercaseInput.includes('weather') || (lowercaseInput.includes('temperature'))) {
      return await responses.weather();
    }
    if (lowercaseInput.includes('flip') && lowercaseInput.includes('coin')) {
      return `You got ${responses.coin()}!`;
    }
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return responses.greeting();
    }
    if (lowercaseInput.includes('thank') || lowercaseInput.includes('thanks')) {
      return "You're welcome!";
    }
    
    return responses.default();
  }
}
