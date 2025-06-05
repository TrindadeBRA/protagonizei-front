export default async function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <div className="flex justify-center items-center gap-4">
          <p>&copy; {new Date().getFullYear()} TTW</p>
        </div>
      </div>
    </footer>
  )
}
