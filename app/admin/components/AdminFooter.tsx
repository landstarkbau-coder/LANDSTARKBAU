// app/admin/components/AdminFooter.tsx
export default function AdminFooter() {
  return (
    <footer className="border-t border-line bg-surface-card py-4 mt-auto">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm text-ink-muted">
        <p>© {new Date().getFullYear()} Admin Panel. Всі права захищені.</p>
        <p>v1.0.0</p>
      </div>
    </footer>
  )
}