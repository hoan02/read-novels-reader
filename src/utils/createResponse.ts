const createResponse = (responseData: any | null, message: string, status: number) => {
  const parsedData = JSON.parse(JSON.stringify(responseData));
  return { status, message, data: parsedData };
};

export default createResponse;
