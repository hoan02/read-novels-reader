import { getOrder } from "@/lib/data/order.data";

const ResultPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const id = searchParams?.id as string;
  const order = await getOrder(id);
  console.log(order);
  return <div>{id}</div>;
};

export default ResultPage;
