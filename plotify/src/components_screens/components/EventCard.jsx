export default function EventCard() {
  return (
    <div className="border-solid border-1 border-custom-gray rounded-xl p-[0.75rem]">
      <h3>Event Name</h3>
      <div className="flex gap-[0.5rem]"><p>Date</p>
      <p>Time</p>
      <p>Location</p>
      <p>Capacity</p>
      </div>
    </div>
  );
}
