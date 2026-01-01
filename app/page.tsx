'use client'

import { useState } from 'react'

interface Insight {
  id: string
  title: string
  content: string
  category: string
  items?: string[]
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const defaultInsights: Insight[] = [
    {
      id: '1',
      title: 'Technology Trends for 2026',
      category: 'Technology',
      content: 'The year 2026 is set to witness revolutionary technological advancements that will reshape how we live and work.',
      items: [
        'AI Integration: Artificial intelligence becomes deeply embedded in daily life, with personalized AI assistants becoming mainstream',
        'Quantum Computing: Commercial quantum computers begin solving complex problems in drug discovery and climate modeling',
        'Extended Reality (XR): Mixed reality devices become as common as smartphones, blending physical and digital worlds',
        'Sustainable Tech: Green technology dominates innovation with carbon-neutral data centers and eco-friendly devices',
        '6G Networks: Early deployment begins, promising speeds 100x faster than 5G'
      ]
    },
    {
      id: '2',
      title: 'Global Economy Outlook',
      category: 'Economy',
      content: 'Economic forecasts for 2026 indicate significant shifts in global markets and financial systems.',
      items: [
        'Digital Currencies: Central bank digital currencies (CBDCs) gain widespread adoption across major economies',
        'Remote Work Evolution: Hybrid work models become the standard, reshaping urban development and real estate',
        'Green Economy: Sustainable investments reach $50 trillion globally as climate action accelerates',
        'Automation Impact: 85 million jobs displaced but 97 million new roles emerge in AI, data, and sustainability sectors',
        'Emerging Markets: India and Southeast Asia lead global GDP growth'
      ]
    },
    {
      id: '3',
      title: 'Health & Wellness Revolution',
      category: 'Health',
      content: 'Healthcare in 2026 embraces personalized medicine and preventive care through advanced technology.',
      items: [
        'Personalized Medicine: AI-driven genetic analysis enables treatments tailored to individual DNA profiles',
        'Telemedicine: Virtual healthcare becomes the primary care method for 60% of consultations',
        'Mental Health Focus: Mental wellness apps and digital therapy platforms achieve mainstream acceptance',
        'Longevity Research: Anti-aging treatments show promising results, potentially extending healthy lifespan',
        'Wearable Health Tech: Advanced biosensors continuously monitor health metrics and predict potential issues'
      ]
    },
    {
      id: '4',
      title: 'Climate & Sustainability',
      category: 'Environment',
      content: '2026 marks a critical year in climate action with ambitious targets and innovative solutions.',
      items: [
        'Renewable Energy: Solar and wind power supply 50% of global electricity needs',
        'Carbon Capture: Large-scale carbon removal projects extract billions of tons of CO2 annually',
        'Electric Vehicles: EVs represent 40% of new car sales globally, with improved battery technology',
        'Sustainable Food: Lab-grown meat and vertical farming reduce agricultural emissions by 30%',
        'Circular Economy: Major corporations adopt zero-waste manufacturing processes'
      ]
    },
    {
      id: '5',
      title: 'Social & Cultural Shifts',
      category: 'Society',
      content: 'Social dynamics and cultural norms continue evolving in response to technological and environmental changes.',
      items: [
        'Digital Communities: Virtual worlds host millions in persistent digital societies with their own economies',
        'Education Transformation: Personalized AI tutors and immersive learning environments replace traditional classrooms',
        'Work-Life Integration: Four-day work weeks become standard in many developed nations',
        'Generation Alpha: The first fully digital-native generation enters the workforce, bringing new perspectives',
        'Cultural Renaissance: Digital art, NFTs, and virtual experiences create new forms of creative expression'
      ]
    },
    {
      id: '6',
      title: 'Space Exploration Milestones',
      category: 'Space',
      content: '2026 represents a landmark year for humanity\'s expansion beyond Earth.',
      items: [
        'Lunar Base: Permanent human presence established on the Moon for the first time',
        'Mars Mission: NASA and SpaceX launch crewed missions toward Mars arrival in 2028',
        'Space Tourism: Orbital hotels host thousands of tourists, making space accessible to more people',
        'Asteroid Mining: First commercial asteroid mining operations begin extracting rare metals',
        'Space Manufacturing: Zero-gravity factories produce advanced materials impossible to create on Earth'
      ]
    }
  ]

  const handleSearch = async () => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (searchQuery.trim()) {
        // Filter insights based on search query
        const filtered = defaultInsights.filter(insight =>
          insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          insight.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          insight.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          insight.items?.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
        )

        if (filtered.length === 0) {
          setError('No insights found matching your search. Showing all insights instead.')
          setInsights(defaultInsights)
        } else {
          setInsights(filtered)
        }
      } else {
        setInsights(defaultInsights)
      }
    } catch (err) {
      setError('Failed to fetch insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>New Year 2026 Insights</h1>
        <p>Discover trends, predictions, and insights for the year ahead</p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search for insights (e.g., technology, health, economy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>

      {loading && <div className="loading">Loading insights...</div>}

      {!loading && insights.length > 0 && (
        <div className="insights-container">
          {insights.map((insight) => (
            <div key={insight.id} className="insight-card">
              <h2>{insight.title}</h2>
              <p>{insight.content}</p>
              {insight.items && (
                <ul>
                  {insight.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && insights.length === 0 && !error && (
        <div className="loading">Search for insights about New Year 2026</div>
      )}
    </div>
  )
}
