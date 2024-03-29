import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập",
};

const SignInPage = () => {
  return (
    <>
      <SignIn />
    </>
  );
};
export default SignInPage;
