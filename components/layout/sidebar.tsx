const Sidebar = () => {
  return (
    <aside className="border-ui-border-base w-sidebar relative hidden h-full border-r lg:block">
      <div className="sticky inset-x-0 bottom-0 top-[56px] h-screen max-h-[calc(100vh-56px)] w-full">
        <div className="h-full w-full overflow-hidden">
          <div className="h-full w-full p-6">
            <p className="text-ui-fg-muted mb-0.5 rounded-md px-3 py-1.5 text-xs font-medium uppercase leading-5">
              Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
