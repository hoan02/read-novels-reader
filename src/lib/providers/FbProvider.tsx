"use client";

import { FacebookProvider } from "react-facebook";

const FbProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FacebookProvider language="vi_VN" appId="441783921770773">
      {children}
    </FacebookProvider>
  );
};

export default FbProvider;
