import { ClerkProvider } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";

const ClerkVIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "green",
          // colorText: "white",
        },
      }}
      localization={viVN}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkVIProvider;
