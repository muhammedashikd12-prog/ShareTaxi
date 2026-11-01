import { SearchBar } from '@/components/search-bar';
import { TripCardList } from '@/components/trip-card-list';
import { RideModeSelector } from '@/components/ride-mode-selector';
import { BenefitStrip } from '@/components/benefit-strip';
import { BookingSummary } from '@/components/booking-summary';
import { cities, tripCards } from '@sharetaxi/shared';

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Kerala ride-sharing platform</span>
          <h1>Your route. Shared.</h1>
          <p>
            Discover scheduled intercity seating, reliable local ride pooling, and recurring
            commute options built around your everyday travel needs.
          </p>
          <SearchBar cities={cities} />
        </div>
        <div className="hero-visual">
          <div className="mini-card location-card">
            <span className="label">From</span>
            <strong>Kochi</strong>
            <small>Departure • Today, 7:30 AM</small>
          </div>
          <div className="mini-card route-card">
            <span className="label">Route</span>
            <strong>Kochi → Bengaluru</strong>
            <small>3 seats left</small>
          </div>
          <div className="mini-card stats-card">
            <span className="label">Avg. ride time</span>
            <strong>7h 28m</strong>
            <small>4.8 rating • Verified drivers</small>
          </div>
        </div>
      </section>

      <RideModeSelector />
      <BenefitStrip />

      <section className="content-grid">
        <div className="left-column">
          <div className="section-header">
            <div>
              <span className="eyebrow">Best matches</span>
              <h2>Available trips</h2>
            </div>
            <button className="ghost-button">Filter</button>
          </div>
          <TripCardList trips={tripCards} />
        </div>

        <aside className="right-column">
          <BookingSummary />
        </aside>
      </section>
    </main>
  );
}
