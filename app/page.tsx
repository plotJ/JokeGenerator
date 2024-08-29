"use client";

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export default function Home() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('')
  const [jokeType, setJokeType] = useState('')
  const [temperature, setTemperature] = useState(0.7)

  const { complete, completion, isLoading } = useCompletion({
    api: '/api/generate-joke',
  })

  const generateJoke = () => {
    if (!topic || !tone || !jokeType) {
      alert("Please fill in all fields (topic, tone, and joke type) before generating a joke.");
      return;
    }
    const prompt = JSON.stringify({ topic, tone, type: jokeType, temperature })
    complete(prompt)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Joke Generator</h1>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="#" className="hover:underline">Home</Link>
            <Link href="#" className="hover:underline">About</Link>
            <Link href="#" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 bg-background text-foreground py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Customize Your Joke</h2>
              <div className="space-y-2">
                <label htmlFor="topic" className="block font-medium">Topic</label>
                <div className="flex flex-wrap gap-2">
                  {['Work', 'People', 'Animals', 'Food', 'Television'].map((t) => (
                    <Button key={t} variant="outline" onClick={() => setTopic(t)}>{t}</Button>
                  ))}
                  <Input 
                    id="topic" 
                    value={topic} 
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter custom topic" 
                    className="flex-1" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="tone" className="block font-medium">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {['Witty', 'Sarcastic', 'Silly', 'Dark', 'Goofy'].map((t) => (
                    <Button key={t} variant="outline" onClick={() => setTone(t)}>{t}</Button>
                  ))}
                  <Input 
                    id="tone" 
                    value={tone} 
                    onChange={(e) => setTone(e.target.value)}
                    placeholder="Enter custom tone" 
                    className="flex-1" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="type" className="block font-medium">Joke Type</label>
                <div className="flex flex-wrap gap-2">
                  {['Pun', 'Knock-Knock', 'Story'].map((t) => (
                    <Button key={t} variant="outline" onClick={() => setJokeType(t)}>{t}</Button>
                  ))}
                  <Input 
                    id="type" 
                    value={jokeType} 
                    onChange={(e) => setJokeType(e.target.value)}
                    placeholder="Enter custom joke type" 
                    className="flex-1" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="temperature" className="block font-medium">Creativity (Temperature)</label>
                <Slider 
                  id="temperature" 
                  min={0} 
                  max={1} 
                  step={0.1} 
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                  className="w-full" 
                />
                <div className="text-sm text-gray-500">{temperature.toFixed(1)}</div>
              </div>
              <Button
                onClick={generateJoke}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Joke'}
              </Button>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Your Joke</h2>
              <div className="bg-card text-card-foreground p-6 rounded-lg shadow min-h-[200px]">
                {completion ? (
                  <p className="text-2xl">{completion}</p>
                ) : (
                  <p className="text-2xl font-bold text-center">Click 'Generate' to get a joke!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted text-muted-foreground py-4 px-6 mt-auto">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm">&copy; 2023 AI Joke Generator. All rights reserved.</p>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Feedback</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}