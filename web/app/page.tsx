export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let message = 'Loading...';
  try {
    if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL not set');
    const res = await fetch(`${apiUrl}hello`, { cache: 'no-store' });
    const data = await res.json();
    message = data.message;
  } catch (e: any) {
    message = `Error: ${e.message}`;
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 24 }}>
      <h1>UF r/place</h1>
      <p>API says: {message}</p>
    </main>
  );
}
