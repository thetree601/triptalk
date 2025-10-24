export default function TripPostDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Trip Post Detail: {params.id}</h1>
    </div>
  );
}
