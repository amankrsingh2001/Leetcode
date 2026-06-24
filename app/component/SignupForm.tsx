'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/app/component/ui/button'
import { ThemeChanger } from './ThemeChanger'
import axios from "axios"

interface SignupFormProps {
  onBack: () => void
}

export default function SignupForm({ onBack }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      setIsLoading(false)
      return
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      setIsLoading(false)
      return
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      setIsLoading(false)
      return
    }



    // Simulate API call
    
    const createUser = await axios.post("http://localhost:3000/api/signup", formData)

  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome to SignLink!</h2>
              <p className="text-muted-foreground">
                Check your email to verify your account. You&apos;ll be able to start using SignLink in minutes.
              </p>
            </div>
            <Button 
              onClick={onBack}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-8 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join thousands of teams using SignLink to power their communications
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder-muted-foreground"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder-muted-foreground"
            />
          </div>

          

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all text-foreground placeholder-muted-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Must be at least 8 characters long
            </p>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex items-start gap-3">
            <input
              id="terms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-5 h-5 mt-0.5 rounded border-border bg-card accent-primary cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5"
          >
            {isLoading ? 'Creating Account...' : 'Get Started Free'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              Sign in
            </a>
          </p>
        </form>

        <div className="mt-8 pt-8 border-t border-border/20">
          <p className="text-xs text-muted-foreground text-center mb-4">
            We never share your data. See our{' '}
            <a href="#" className="text-primary hover:underline">privacy policy</a>
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>🔒 Encrypted</span>
            <span>•</span>
            <span>✓ SOC 2 Certified</span>
            <span>•</span>
            <span>⚡ Fast Setup</span>
          </div>
        </div>
      </div>
    </div>
  )
}
