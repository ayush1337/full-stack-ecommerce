import Search from './Search';

export default async function SearchPage({ searchParams }) {
  try {
    return <Search searchParams={searchParams} />;
  } catch (error) {
    return <div>Oppss... Something Went Wrong</div>;
  }
}
