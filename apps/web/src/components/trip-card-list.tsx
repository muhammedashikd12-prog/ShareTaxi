import type { TripCard } from '@sharetaxi/shared';

export function TripCardList({ trips }: { trips: TripCard[] }) {
  return (
    <div className="trip-list">
      {trips.map((trip) => (
        <article key={trip.id} className="trip-card">
          <div className="trip-row">
            <div>
              <h3 className="trip-title">{trip.title}</h3>
              <div className="trip-meta">{trip.route}</div>
            </div>
            <div className="price-box">
              <strong>₹{trip.price}</strong>
              <small>per seat</small>
            </div>
          </div>

          <div className="trip-info">
            <div className="metric">
              <span>Departure</span>
              <strong>{trip.departure}</strong>
            </div>
            <div className="metric">
              <span>Arrival</span>
              <strong>{trip.arrival}</strong>
            </div>
            <div className="metric">
              <span>Seats</span>
              <strong>{trip.seatsLeft} left</strong>
            </div>
            <div className="metric">
              <span>Driver</span>
              <strong>{trip.driver}</strong>
            </div>
          </div>

          <div className="trip-actions">
            <button type="button" className="secondary-button">
              View driver
            </button>
            <button type="button" className="primary-button">
              Reserve seat
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
