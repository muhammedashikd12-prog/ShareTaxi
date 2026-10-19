import { fareBreakdown } from '@sharetaxi/shared';

export function BookingSummary() {
  return (
    <aside className="booking-summary">
      <h3>Booking summary</h3>
      <div className="summary-card">
        <div className="summary-row">
          <span>Ride</span>
          <strong>Kochi → Bengaluru</strong>
        </div>
        <div className="summary-row">
          <span>Date</span>
          <span>25 Oct 2026</span>
        </div>
        <div className="summary-row">
          <span>Passengers</span>
          <span>2</span>
        </div>
        {fareBreakdown.map((item) => (
          <div className="summary-row" key={item.label}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
        <div className="total-row">
          <span>Total</span>
          <span>₹1,110</span>
        </div>
      </div>
      <button className="primary-button" type="button">
        Confirm booking
      </button>
    </aside>
  );
}
