import React, { useEffect, useState } from 'react'
import './App.css'

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">
          <span className="logo-accent">&lt;</span>
          Ayush
          <span className="logo-accent"> /&gt;</span>
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero reveal-on-scroll" id="about">
      <div className="hero-content">
        <span className="badge">Welcome to my space</span>
        <h1>Hi, I'm <span className="gradient-text">Ayush Kumar</span></h1>
        <p className="hero-subtext">
          Frontend Developer building fast, accessible, and visually stunning web experiences.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#projects">Explore Work</a>
          <a className="btn btn-secondary" href="#contact">Get In Touch</a>
        </div>
      </div>
    </header>
  )
}

function Projects() {
  const items = [
    { 
      title: 'Expense Tracker', 
      desc: 'A full-featured personal finance application with dynamic metrics and spending insights.',
      tags: ['Mern Stack', 'React', 'Node.js', 'MongoDB'],
      link: 'https://expense-tracker-web-pearl.vercel.app/'
    },
    { 
      title: 'Interactive Dashboard', 
      desc: 'Analytics platform rendering real-time metrics and dynamic visual data graphs.',
      tags: ['React', 'JavaScript', 'APIs'],
      link: '#'
    },
    { 
      title: 'Web Application', 
      desc: 'Modern web solution engineered for performance, responsiveness, and clean UX.',
      tags: ['React', 'Node.js', 'UI Design'],
      link: '#'
    }
  ]

  return (
    <section className="projects-section" id="projects">
      <div className="section-header reveal-on-scroll">
        <h2>Featured <span className="gradient-text">Projects</span></h2>
        <p>A selection of recent applications and dynamic visual interface tools I've built.</p>
      </div>

      <div className="grid">
        {items.map((p, i) => (
          <article key={i} className="card reveal-on-scroll">
            <div className="card-header">
              <h3>{p.title}</h3>
            </div>
            <p className="card-desc">{p.desc}</p>
            <div className="tag-group">
              {p.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="card-link">
              View Project <span>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  const [result, setResult] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    setResult("Sending...")

    const formData = new FormData(event.target)

    // 👇 AAPKI ACCESS KEY YAHAN PASTE KAREIN
    formData.append("access_key", "48f456e8-ea6c-4d9b-9376-b7f144711f9c")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setResult("Message Sent Successfully! ✅")
        event.target.reset()
      } else {
        setResult("Failed to send message. ❌")
      }
    } catch (error) {
      setResult("Something went wrong. Please try again! ❌")
    }
  }

  return (
    <section className="contact-section reveal-on-scroll" id="contact">
      <div className="contact-card">
        <div className="section-header">
          <h2>Let's <span className="gradient-text">Connect</span></h2>
          <p>Have a question or want to work together? Leave a message below.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button className="btn btn-primary btn-block" type="submit">Send Message</button>
        </form>
        {result && (
          <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
            {result}
          </p>
        )}
      </div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal-on-scroll')
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="app-container">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ayush Kumar. Built with React.</p>
      </footer>
    </div>
  )
}