import { Footer } from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import SearchInput from "@/components/searchInput/searchInput";
import TagsList from "@/components/tagsList/tagsList";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar />
      <SearchInput />
      <TagsList />
      <div className="px-4 py-3 md:px-8 max-w-7xl m-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
