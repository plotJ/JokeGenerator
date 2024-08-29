# JokeGenerator

Welcome to JokeGenerator! This project uses OpenAI's GPT-3.5 Turbo model to create custom jokes based on user-specified parameters.

![JokeGenerator Interface](https://github.com/plotJ/JokeGenerator/raw/main/jokegenerator.png)

## Features

- Generate jokes with customizable topics, tones, and types
- Adjustable creativity level using a temperature slider
- Real-time joke generation using AI
- Responsive web interface built with Next.js and Tailwind CSS

## Tech Stack

- Next.js 13 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- OpenAI API for joke generation

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/plotJ/JokeGenerator.git
   cd JokeGenerator
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Select or enter a topic for your joke.
2. Choose a tone (e.g., Witty, Sarcastic, Silly).
3. Pick a joke type (e.g., Pun, Knock-Knock, Story).
4. Adjust the creativity level using the temperature slider.
5. Click "Generate Joke" to create your custom joke.

The AI will generate a joke based on your inputs and provide ratings for humor, appropriateness, and cleverness.

## Project Structure

- `app/`: Contains the main application code (Next.js 13 App Router)
- `components/`: Reusable React components
- `lib/`: Utility functions and configurations
- `public/`: Static assets

## Deployment

This project is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- OpenAI for providing the GPT-3.5 Turbo model
- Next.js team for the amazing framework
- shadcn for the UI components
- All contributors and users of this project

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

Enjoy your AI-generated jokes!
