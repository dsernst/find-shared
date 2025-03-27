export function Header() {
  return (
    <div className="mb-2 w-full text-center">
      <div className="relative inline-block">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
        <div className="relative space-y-1">
          <div className="text-sm font-light tracking-widest text-white/40">PRIVATELY</div>
          <h1 className="bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Find Shared
          </h1>
          <h3 className="text-sm font-light tracking-widest text-white/40">INTERESTS</h3>
        </div>
      </div>
    </div>
  )
}
