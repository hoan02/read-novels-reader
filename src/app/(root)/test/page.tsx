import formatDate from "@/utils/formatDate";

const page = () => {
  const date = new Date();
  return <div>{formatDate(date)}</div>;
};

export default page;
