import TripPostDetail from '../../../components/tripposts-detail';

export default function TripPostDetailPage({ params }: { params: { id: string } }) {
  return <TripPostDetail id={params.id} />;
}
