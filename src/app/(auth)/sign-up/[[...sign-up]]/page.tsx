import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: "Đăng ký",
  description: "Đăng ký",
};

const SignUpPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};
export default SignUpPage;
