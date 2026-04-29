import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Audio from '../models/Audio.js'
import Prompt from '../models/Prompt.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connected')

    await Audio.deleteMany({})
    await Prompt.deleteMany({})

    const audioTasks = [
      {
        title: 'Introduction to AI',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        correctTranscript:
          'Artificial Intelligence is revolutionizing the way we work and live. It is changing how we make decisions, solve problems, and interact with technology.',
        difficulty: 'easy',
      },
      {
        title: 'Climate Change Discussion',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        correctTranscript:
          'Climate change is one of the most pressing challenges of our time. We must take immediate action to reduce carbon emissions and protect our planet.',
        difficulty: 'medium',
      },
      {
        title: 'Advanced Technology',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        correctTranscript:
          'Blockchain technology and quantum computing are emerging as transformative technologies that will reshape industries and create new opportunities.',
        difficulty: 'hard',
      },
    ]

    await Audio.insertMany(audioTasks)
    console.log('✅ Audio tasks seeded')

    const prompts = [
      {
        prompt: 'Describe your favorite place in 150 words.',
        sampleAnswer:
          'My favorite place is the local botanical garden. It is a peaceful sanctuary where I can escape the hustle and bustle of city life. The garden is filled with colorful flowers, towering trees, and winding paths. I especially love the Japanese section with its traditional bridge and koi pond. Every time I visit, I feel rejuvenated and inspired. The fresh air and natural beauty provide the perfect setting for reflection and relaxation. Whether I am walking alone or with friends, the garden offers a sense of tranquility that is hard to find elsewhere.',
        keywords: ['favorite', 'place', 'peaceful', 'garden', 'nature', 'relax'],
        minWords: 100,
        difficulty: 'easy',
      },
      {
        prompt: 'Discuss the impact of social media on society.',
        sampleAnswer:
          'Social media has profoundly impacted modern society in both positive and negative ways. On the positive side, it has connected billions of people globally, enabling communication and community building. Businesses can reach customers efficiently, and social movements can gain momentum quickly. However, negative effects include mental health issues, misinformation spread, and reduced face-to-face interaction. Cyberbullying and privacy concerns are also significant problems. The addictive nature of social media platforms has raised questions about healthy technology use, especially among young people. Overall, while social media offers tremendous opportunities, society must address its drawbacks through regulation and digital literacy.',
        keywords: ['social media', 'impact', 'society', 'communication', 'positive', 'negative'],
        minWords: 150,
        difficulty: 'medium',
      },
      {
        prompt: 'Analyze the role of artificial intelligence in modern healthcare.',
        sampleAnswer:
          'Artificial Intelligence is revolutionizing healthcare by improving diagnosis accuracy, treatment planning, and patient care. AI algorithms can analyze medical images faster and often more accurately than human radiologists. Machine learning models predict disease outbreaks and patient readmission risks. Personalized medicine powered by AI tailors treatments to individual genetic profiles. However, implementing AI in healthcare presents challenges including data privacy concerns, the need for extensive validation, and potential job displacement. The cost of developing and maintaining AI systems is substantial. Additionally, there is a risk of algorithmic bias affecting patient care. Despite these challenges, the integration of AI in healthcare promises significant improvements in efficiency, accuracy, and patient outcomes. Healthcare institutions must balance innovation with ethical considerations and regulatory compliance.',
        keywords: [
          'AI',
          'healthcare',
          'diagnosis',
          'treatment',
          'innovation',
          'challenges',
          'patient',
        ],
        minWords: 200,
        difficulty: 'hard',
      },
      {
        prompt: 'What are your hobbies and why do you enjoy them?',
        sampleAnswer:
          'My hobbies include reading, painting, and playing chess. Reading expands my knowledge and imagination, allowing me to explore different worlds and perspectives. Painting is a creative outlet that helps me express emotions visually. Chess develops strategic thinking and problem-solving skills while providing a competitive challenge. These hobbies bring me joy, relaxation, and personal growth.',
        keywords: ['hobbies', 'enjoy', 'reading', 'painting', 'chess', 'creative', 'joy'],
        minWords: 80,
        difficulty: 'easy',
      },
      {
        prompt: 'Explain how you would handle a conflict with a colleague at work.',
        sampleAnswer:
          'When facing a conflict with a colleague, I would first take time to understand their perspective by listening actively. I would express my concerns calmly and respectfully without blaming. Finding common ground is essential to resolving the issue. If needed, I would involve a manager or HR professional to mediate. The goal is to reach a solution that benefits both parties and maintains a positive working relationship. Open communication and empathy are key to conflict resolution.',
        keywords: ['conflict', 'colleague', 'listen', 'respect', 'solution', 'communication'],
        minWords: 100,
        difficulty: 'medium',
      },
    ]

    await Prompt.insertMany(prompts)
    console.log('✅ Writing prompts seeded')

    console.log('✅ Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedData()