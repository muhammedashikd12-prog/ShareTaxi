const benefits = ['Verified drivers', 'Transparent fares', 'Flexible payments', 'Daily commute support'];

export function BenefitStrip() {
  return (
    <div className="benefits-row" aria-label="Benefits">
      {benefits.map((benefit) => (
        <div key={benefit} className="benefit-item">
          {benefit}
        </div>
      ))}
    </div>
  );
}
