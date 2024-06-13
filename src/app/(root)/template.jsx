"use client";

import Script from "next/script";

export default function Template({ children }) {
  return (
    <>
      {children}
      <Script
        src="https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.2/libs/oversea/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.CozeWebSDK) {
            new CozeWebSDK.WebChatClient({
              config: {
                bot_id: "7374387242338746375",
              },
              componentProps: {
                title: "Novel Guru",
              },
            });
          }
        }}
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4651272415173333"
        crossOrigin="anonymous"
      />
    </>
  );
}
