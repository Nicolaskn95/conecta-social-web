interface ProductDetailProps {
  params: {
    eventId: string;
  };
}
export default function ProductDetail({ params }: ProductDetailProps) {
  console.log(params);
  return <h1>details{params.eventId}</h1>;
}
