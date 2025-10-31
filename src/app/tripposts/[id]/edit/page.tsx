import TripPostsEdit from '@/components/tripposts-edit/index';

interface PageProps { params: { id: string } }

export default function Page({ params }: PageProps) {
  const id = params.id;
  return <TripPostsEdit id={id} />;
}


