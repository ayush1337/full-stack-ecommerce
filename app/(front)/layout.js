import InitializeCartState from '@/components/InitializeCartState';

export default function FrontLayout({ children }) {
  return (
    <main className="w-screen overflow-x-hidden">
      <InitializeCartState />
      {children}
    </main>
  );
}
