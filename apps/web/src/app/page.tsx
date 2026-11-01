'use client';

import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Leaf,
  MapPin,
  Menu,
  Route,
  ShieldCheck,
  UsersRound,
  X
} from 'lucide-react';

const locations = [
  'Kochi',
  'Thiruvananthapuram',
  'Kozhikode',
  'Thrissur',
  'Palakkad',
  'Alappuzha',
  'Kannur'
];

const stops = [
  {
    name: 'Kochi',
    detail: 'Passenger A boards',
    description: 'Passenger A joins in Kochi for the ride to Thrissur.'
  },
  {
    name: 'Thrissur',
    detail: 'A exits · B & C board',
    description: 'Passenger A gets off. Passengers B and C join for Kozhikode.'
  },
  {
    name: 'Kozhikode',
    detail: 'Journey complete',
    description: 'Passengers B and C arrive in Kozhikode. Each shared only their route.'
  }
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand${inverse ? ' brand-inverse' : ''}`} href="#home" aria-label="ShareTaxxi home">
      <svg className="brand-mark" viewBox="0 0 42 42" role="img" aria-label="ShareTaxxi route mark">
        <rect x="1" y="1" width="40" height="40" rx="13" fill="currentColor" />
        <path d="M13 30c0-5.7 2.6-8.8 8-11.2 4.1-1.8 7-3.8 7-7.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="3.3 4.2" />
        <circle cx="13" cy="30" r="3.1" fill="#b9f1d5" />
        <circle cx="28" cy="11" r="3.1" fill="#b9f1d5" />
        <path d="M17 25h8.5l2 2.2v2.1h-12v-2.1l1.5-2.2Zm2-3 1.4-2h3.8l1.4 2" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="18.2" cy="29.1" r="1.2" fill="#fff" />
        <circle cx="25.1" cy="29.1" r="1.2" fill="#fff" />
      </svg>
      <span>share<span className="brand-accent">taxxi</span></span>
    </a>
  );
}

function HeroLandscape() {
  return (
    <div className="landscape" aria-label="Illustration of a shared ride on a Kerala road">
      <div className="landscape-topline">
        <span><MapPin size={14} /> KERALA, INDIA</span>
        <span className="scene-live"><i /> A better way, together</span>
      </div>
      <svg className="landscape-art" viewBox="0 0 760 510" role="img" aria-labelledby="landscape-title">
        <title id="landscape-title">A premium shared car travelling through a green Kerala landscape</title>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0" stopColor="#d4eadb" />
            <stop offset="1" stopColor="#edf1d9" />
          </linearGradient>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#536961" />
            <stop offset="1" stopColor="#243b35" />
          </linearGradient>
          <linearGradient id="carPaint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#e9f1eb" />
          </linearGradient>
          <filter id="carShadow" x="-30%" y="-50%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>
        <rect width="760" height="510" fill="url(#sky)" />
        <circle cx="596" cy="95" r="37" fill="#fff2c6" opacity=".8" />
        <path d="M0 204 72 153l56 31 71-72 66 64 91-91 74 97 64-49 90 76 63-39 113 73v99H0Z" fill="#b4d2b3" />
        <path d="m0 237 105-59 83 58 86-69 82 66 85-54 93 71 68-47 158 57v126H0Z" fill="#719b79" />
        <path d="M0 264c95-26 149-1 233 20s155-5 237-28 166 4 290 37v141H0Z" fill="#41775d" />
        <path d="M0 327c106-45 204-21 280 3 98 32 170 18 261-12 73-25 146-24 219 7v185H0Z" fill="#2b5b49" />
        <g fill="#1c493b">
          <path d="m40 315 26-112 26 112h-15l28 24H27l28-24Z" />
          <path d="m100 338 21-91 23 91h-13l23 20H90l24-20Z" />
          <path d="m653 306 28-130 28 130h-17l29 27h-82l30-27Z" />
          <path d="m711 333 21-94 22 94h-13l19 20h-65l22-20Z" />
        </g>
        <path d="M276 510c32-72 61-116 110-163 37-36 58-73 67-128h110c-11 88-38 140-92 191-37 34-62 65-82 100Z" fill="url(#road)" />
        <path d="M408 510c24-67 50-104 91-145 39-39 66-77 78-146" fill="none" stroke="#d6e5bb" strokeWidth="4" strokeDasharray="12 15" opacity=".82" />
        <path d="M404 360c-31 31-62 68-89 111" fill="none" stroke="#baf0d2" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 9" className="route-glow" />
        <g className="pickup-pin pickup-pin-one">
          <circle cx="407" cy="355" r="18" fill="#fff" opacity=".65" />
          <circle cx="407" cy="355" r="9" fill="#18a66a" />
          <circle cx="407" cy="355" r="3" fill="#fff" />
        </g>
        <g className="pickup-pin pickup-pin-two">
          <circle cx="349" cy="418" r="14" fill="#fff" opacity=".58" />
          <circle cx="349" cy="418" r="7" fill="#18a66a" />
          <circle cx="349" cy="418" r="2.5" fill="#fff" />
        </g>
        <ellipse cx="437" cy="377" rx="152" ry="19" fill="#172e28" opacity=".24" filter="url(#carShadow)" />
        <g className="hero-car">
          <path d="m284 342 17-44c5-13 15-21 29-24l48-10c15-3 31-1 44 7l40 24 48 10c13 3 22 12 26 24l8 28-9 16H278l-8-16 14-15Z" fill="url(#carPaint)" stroke="#d7e3da" strokeWidth="2" />
          <path d="m337 281 44-9c12-2 23-1 33 5l34 21H319l11-13c2-2 4-3 7-4Z" fill="#4a7263" />
          <path d="M382 273v25m-60 0h130" stroke="#d5e5dc" strokeWidth="3" />
          <path d="M287 339h255" stroke="#b7c8be" strokeWidth="3" />
          <path d="M278 342h17l-3 15h-17Zm245-13h20l5 16h-21Z" fill="#f3cf83" />
          <path d="M395 354h78" stroke="#19a56d" strokeWidth="4" strokeLinecap="round" opacity=".8" />
          <circle cx="333" cy="368" r="19" fill="#24332d" />
          <circle cx="333" cy="368" r="9" fill="#d9e3dc" />
          <circle cx="498" cy="368" r="19" fill="#24332d" />
          <circle cx="498" cy="368" r="9" fill="#d9e3dc" />
          <path d="M292 378h246" stroke="#fff" strokeWidth="2" opacity=".55" />
        </g>
        <g className="landscape-label label-kochi">
          <rect x="325" y="323" width="69" height="25" rx="12.5" fill="#fff" />
          <text x="359.5" y="340" textAnchor="middle" fill="#234a3b" fontSize="11" fontWeight="700">KOCHI</text>
        </g>
        <g className="landscape-label label-thrissur">
          <rect x="300" y="386" width="82" height="25" rx="12.5" fill="#fff" />
          <text x="341" y="403" textAnchor="middle" fill="#234a3b" fontSize="11" fontWeight="700">THRISSUR</text>
        </g>
      </svg>
      <div className="landscape-caption">
        <span className="caption-icon"><Route size={16} /></span>
        <span><strong>One route, shared.</strong><small>Better journeys start together.</small></span>
        <span className="caption-arrow"><ArrowUpRight size={17} /></span>
      </div>
      <div className="floating-note"><UsersRound size={17} /><span><strong>Going the same way?</strong><small>Make room for one more.</small></span></div>
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ['How it works', '#how-it-works'],
    ['Find a ride', '#find-ride'],
    ['Offer a ride', '#offer-ride'],
    ['Safety', '#safety'],
    ['About', '#about']
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
          {links.map(([label, target]) => (
            <a key={target} href={target} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <span className="nav-coming-soon">Rider app coming soon</span>
          <a className="nav-cta" href="#search" onClick={() => setMenuOpen(false)}>Find a ride <ArrowUpRight size={15} /></a>
        </nav>
      </div>
    </header>
  );
}

function RideSearch() {
  const [from, setFrom] = useState('Kochi');
  const [to, setTo] = useState('Kozhikode');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!from.trim() || !to.trim()) {
      setError('Enter both a starting point and destination.');
      return;
    }
    if (from === to) {
      setError('Choose two different places to search.');
      return;
    }
    if (!date) {
      setError('Choose a travel date to continue.');
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(`${date}T00:00:00`);
    if (selected < today) {
      setError('Choose today or a future date.');
      return;
    }
    setMessage(`Demo search: ${from} to ${to} for ${passengers} ${passengers === 1 ? 'passenger' : 'passengers'} on ${selected.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}. Live ride listings are not connected yet.`);
  }

  return (
    <section className="search-section" id="search" aria-labelledby="search-title">
      <div className="search-heading">
        <div><span className="eyebrow">A route worth sharing</span><h2 id="search-title">Where are you heading?</h2></div>
        <p>Start with a direction. We’ll take it from there.</p>
      </div>
      <form className="ride-search" onSubmit={submitSearch} noValidate>
        <label className="search-field">
          <span className="field-icon"><MapPin size={18} /></span>
          <span className="field-content"><span className="field-label">Leaving from</span>
            <input list="kerala-locations" value={from} onChange={(event) => setFrom(event.target.value)} aria-label="Starting location" autoComplete="off" />
          </span>
        </label>
        <button className="swap-button" type="button" aria-label="Swap starting point and destination" onClick={() => { setFrom(to); setTo(from); setMessage(''); setError(''); }}>
          <ArrowRight size={17} />
        </button>
        <label className="search-field">
          <span className="field-icon destination-icon"><MapPin size={18} /></span>
          <span className="field-content"><span className="field-label">Going to</span>
            <input list="kerala-locations" value={to} onChange={(event) => setTo(event.target.value)} aria-label="Destination" autoComplete="off" />
          </span>
        </label>
        <label className="search-field date-field">
          <span className="field-icon"><Clock3 size={18} /></span>
          <span className="field-content"><span className="field-label">Travel date</span>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Travel date" required />
          </span>
        </label>
        <label className="search-field passenger-field">
          <span className="field-icon"><UsersRound size={18} /></span>
          <span className="field-content"><span className="field-label">Passengers</span>
            <select value={passengers} onChange={(event) => setPassengers(Number(event.target.value))} aria-label="Number of passengers">
              {[1, 2, 3, 4, 5, 6].map((count) => <option value={count} key={count}>{count} {count === 1 ? 'person' : 'people'}</option>)}
            </select>
          </span>
          <ChevronDown className="field-chevron" size={15} />
        </label>
        <button className="search-submit" type="submit">Search rides <ArrowRight size={17} /></button>
        <datalist id="kerala-locations">{locations.map((location) => <option value={location} key={location} />)}</datalist>
      </form>
      <div className="search-feedback" aria-live="polite">
        {error ? <p className="feedback-error">{error}</p> : message ? <p className="feedback-message"><Check size={16} />{message}</p> : <p><span className="demo-dot" /> Demo search · Live ride listings are not connected yet.</p>}
      </div>
    </section>
  );
}

function SharedJourney() {
  const [activeStop, setActiveStop] = useState(0);
  const nextStop = () => setActiveStop((current) => (current + 1) % stops.length);

  return (
    <section className="journey-section section-pad" id="how-it-works">
      <div className="section-intro">
        <span className="eyebrow">The shared bit</span>
        <h2>Same direction.<br /><span>Different destinations.</span></h2>
        <p>Not everyone needs the whole journey. Share the part of the road that makes sense for you.</p>
        <a className="text-link" href="#find-ride">See how it works <ArrowRight size={16} /></a>
      </div>
      <div className="journey-demo">
        <div className="demo-topbar">
          <div><span className="demo-kicker">A shared ride, step by step</span><strong>Kochi <i /> Thrissur <i /> Kozhikode</strong></div>
          <span className="route-tag"><Route size={14} /> Example route</span>
        </div>
        <div className="route-visual">
          <div className="route-stroke"><span className="route-progress" style={{ width: `${activeStop * 50}%` }} /></div>
          <div className={`route-car-stop stop-${activeStop}`} aria-hidden="true">
          <div className="route-car"><span className={`rider rider-a${activeStop === 0 ? ' rider-visible' : ''}`}>A</span><span className={`rider rider-b${activeStop === 1 ? ' rider-visible' : ''}`}>B</span><span className={`rider rider-c${activeStop === 1 ? ' rider-visible' : ''}`}>C</span><span className="car-body" /></div>
          </div>
          <div className="route-stations">
            {stops.map((stop, index) => (
              <button key={stop.name} className={`route-station${activeStop === index ? ' station-active' : ''}${activeStop > index ? ' station-done' : ''}`} type="button" onClick={() => setActiveStop(index)} aria-pressed={activeStop === index}>
                <span className="station-dot">{activeStop > index ? <Check size={12} /> : null}</span>
                <strong>{stop.name}</strong><small>{stop.detail}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="journey-explainer">
          <div className="explainer-icon"><UsersRound size={19} /></div>
          <div><span className="explainer-label">AT {stops[activeStop].name.toUpperCase()}</span><p aria-live="polite">{stops[activeStop].description}</p></div>
          <button type="button" className="next-stop" onClick={nextStop}>Next stop <ArrowRight size={15} /></button>
        </div>
        <div className="seat-note"><span className="seat-dots"><i /><i /><i /><i /></span><span>Seats are shared only where routes overlap</span></div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: '01', icon: <MapPin size={20} />, title: 'Choose your route', text: 'Add your pickup, destination, and the day you want to travel.' },
    { number: '02', icon: <UsersRound size={20} />, title: 'Find your people', text: 'Look for journeys that overlap with the way you’re already going.' },
    { number: '03', icon: <Route size={20} />, title: 'Share the journey', text: 'Travel together for the part of the trip that works for everyone.' }
  ];
  return (
    <section className="steps-section section-pad" id="about">
      <div className="center-intro"><span className="eyebrow">A simpler way to get there</span><h2>Three steps. One better journey.</h2><p>Ride-sharing should feel as easy as deciding where to go.</p></div>
      <div className="steps-grid">
        {steps.map((step) => <article className="step-card" key={step.number}>
          <div className="step-top"><span className="step-icon">{step.icon}</span><span className="step-number">{step.number}</span></div>
          <h3>{step.title}</h3><p>{step.text}</p>
          <span className="step-rule" />
        </article>)}
      </div>
    </section>
  );
}

function Benefits() {
  const benefits = [
    { icon: <Leaf size={19} />, title: 'Spend less together', text: 'Share eligible journeys with people travelling in the same direction.' },
    { icon: <Route size={19} />, title: 'A route that fits', text: 'Find journeys shaped around your pickup, destination, and timing.' },
    { icon: <UsersRound size={19} />, title: 'Travel together', text: 'Make everyday and intercity trips feel a little less like going alone.' },
    { icon: <ShieldCheck size={19} />, title: 'Trust, by design', text: 'Identity checks and trip sharing are planned for the rider experience.' }
  ];
  return (
    <section className="benefits-section section-pad" id="safety">
      <div className="benefits-heading"><div><span className="eyebrow">Why share the ride</span><h2>More than a seat.<br /><span>A smarter way to move.</span></h2></div><p>ShareTaxxi is being built around the idea that the best route is the one more people can enjoy.</p></div>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => <article className="benefit-card" key={benefit.title}>
          <span className={`benefit-icon benefit-icon-${index}`}>{benefit.icon}</span><h3>{benefit.title}</h3><p>{benefit.text}</p>
          {index === 3 ? <span className="planned-label">Planned capability</span> : null}
        </article>)}
      </div>
    </section>
  );
}

function RideOptions() {
  return (
    <section className="options-section section-pad" id="find-ride">
      <div className="options-heading"><span className="eyebrow">Your next move</span><h2>Going somewhere?</h2></div>
      <div className="options-grid">
        <article className="option-card find-option">
          <span className="option-icon"><MapPin size={21} /></span><span className="option-label">FOR PASSENGERS</span>
          <h3>Your destination.<br />A smarter way to get there.</h3>
          <p>Find a compatible journey, review its route, and see how a shared ride could fit your plans.</p>
          <a href="#search" className="option-link">Explore the demo <ArrowUpRight size={17} /></a>
          <div className="option-route" aria-hidden="true"><span>KOCHI</span><i /><i /><i /><span>YOUR NEXT STOP</span></div>
        </article>
        <article className="option-card offer-option" id="offer-ride">
          <span className="option-icon"><Route size={21} /></span><span className="option-label">FOR DRIVERS</span>
          <h3>Already going somewhere?<br />Share the journey.</h3>
          <p>Publishing routes and matching with passengers are part of the product we’re working towards.</p>
          <a href="#launch" className="option-link">See what’s coming <ArrowUpRight size={17} /></a>
          <div className="offer-deco" aria-hidden="true"><span /><span /><span /><span /></div>
        </article>
      </div>
    </section>
  );
}

function LaunchSection() {
  return (
    <section className="launch-section section-pad" id="launch">
      <div className="launch-copy"><span className="eyebrow">The road ahead</span><h2>Your next shared journey is closer than ever.</h2><p>We’re getting ShareTaxxi ready for the journeys Kerala takes every day. The rider app and live ride listings are coming soon.</p>
        <span className="launch-badge"><span /> Coming soon</span>
      </div>
      <div className="phone-stage" aria-label="Preview illustration of the upcoming ShareTaxxi app">
        <div className="phone phone-back"><div className="phone-speaker" /><div className="phone-mini-head">Your journeys</div><div className="mini-trip"><i /><span><b>Kochi</b><small>Today · 8:30 AM</small></span></div><div className="mini-trip"><i /><span><b>Thrissur</b><small>Tomorrow · 10:15 AM</small></span></div><div className="mini-nav"><i /><i /><i /></div></div>
        <div className="phone phone-front"><div className="phone-speaker" /><span className="phone-greeting">GOOD MORNING</span><h3>Where to<br />today?</h3><div className="phone-field"><MapPin size={13} /><span>Kochi</span></div><div className="phone-field"><MapPin size={13} /><span>Kozhikode</span></div><div className="phone-date"><Clock3 size={13} /> Pick a travel date</div><div className="phone-search">Find a shared ride <ArrowRight size={12} /></div><div className="phone-map"><span /><i /><i /><i /></div></div>
        <div className="phone-float"><span><Check size={13} /></span> Thoughtfully on its way</div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div className="footer-brand"><Brand inverse /><p>Your Route. Our Ride.<br />Shared Together.</p><span className="footer-market"><MapPin size={14} /> Starting in Kerala, India</span></div>
        <div className="footer-links"><span className="footer-title">EXPLORE</span><a href="#home">Home</a><a href="#how-it-works">How it works</a><a href="#find-ride">Find a ride</a><a href="#offer-ride">Offer a ride</a></div>
        <div className="footer-links"><span className="footer-title">THE DETAILS</span><a href="#safety">Safety, by design</a><a href="#about">About ShareTaxxi</a><a href="#launch">Rider app — coming soon</a></div>
        <a href="#home" className="back-top">Back to top <ArrowUpRight size={16} /></a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ShareTaxxi</span><span>Better journeys, together.</span><span>Made for the way Kerala moves.</span></div>
    </footer>
  );
}

export default function HomePage() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('reveal-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    sections.forEach((section) => {
      section.classList.add('reveal-ready');
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="hero-copy">
              <span className="launching-pill"><span /> LAUNCHING IN KERALA, INDIA</span>
              <h1>Your journey.<br /><span>Better when shared.</span></h1>
              <p>Going the same way? Share your ride, split the cost, and make every journey more affordable.</p>
              <div className="hero-actions"><a className="button-primary" href="#search">Find a ride <ArrowRight size={17} /></a><a className="button-secondary" href="#offer-ride">Offer a ride <ArrowUpRight size={16} /></a></div>
              <div className="hero-reassurance"><span className="reassurance-icon"><UsersRound size={16} /></span><span>One road can bring more people together.</span></div>
            </div>
            <HeroLandscape />
          </div>
          <a href="#search" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>
        <div className="reveal-on-scroll"><RideSearch /></div>
        <div className="reveal-on-scroll"><SharedJourney /></div>
        <div className="reveal-on-scroll"><HowItWorks /></div>
        <div className="reveal-on-scroll"><Benefits /></div>
        <div className="reveal-on-scroll"><RideOptions /></div>
        <div className="reveal-on-scroll"><LaunchSection /></div>
      </main>
      <Footer />
    </>
  );
}
