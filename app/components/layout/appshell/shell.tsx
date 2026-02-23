import CDRHeader from "../header/header";
import CDRFooter from "../footer/footer";
import CustomCursor from "../../cursor/CustomCursor";


export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomCursor />
      <CDRHeader />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <CDRFooter />
      
    </div>
  );
}