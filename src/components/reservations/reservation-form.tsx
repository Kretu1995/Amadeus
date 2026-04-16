"use client";

export function ReservationForm() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-card border border-border">
      <iframe
        src="https://restomanager.net/en/also-a-widget-on-your-website?utm_source=widget"
        title="RestoManager Reservation Widget"
        className="w-full border-0"
        style={{ minHeight: "700px" }}
        allow="payment"
      />
    </div>
  );
}
