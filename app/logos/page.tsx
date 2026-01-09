export default function LogosPage() {
  return (
    <div className="min-h-screen bg-black text-terminal-green font-mono">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">TheCloudbox Logos</h1>

        <div className="space-y-12">
          {/* Logo Option 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-terminal-yellow">Logo Option 1 - Terminal Window</h2>
            <p className="mb-6 text-gray-400">Terminal window with command prompt and cloud output</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-terminal-green p-6 rounded bg-gray-900">
                <h3 className="text-lg mb-4">Dark Background</h3>
                <div className="bg-black p-8 rounded mb-4">
                  <img src="/terminal-window-with---cloud-text-green-on-black.jpg" alt="Logo Option 1" className="w-full" />
                </div>
                <a
                  href="/terminal-window-with---cloud-text-green-on-black.jpg"
                  download="thecloudbox-logo1-dark.svg"
                  className="inline-block px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-yellow transition"
                >
                  Download SVG
                </a>
              </div>

              <div className="border border-terminal-green p-6 rounded bg-gray-900">
                <h3 className="text-lg mb-4">Light Background</h3>
                <div className="bg-white p-8 rounded mb-4">
                  <img src="/terminal-window-with---cloud-text-dark-terminal-th.jpg" alt="Logo Option 1 Light" className="w-full" />
                </div>
                <a
                  href="/terminal-window-with---cloud-text-dark-terminal-th.jpg"
                  download="thecloudbox-logo1-light.svg"
                  className="inline-block px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-yellow transition"
                >
                  Download SVG
                </a>
              </div>
            </div>
          </section>

          {/* Logo Option 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-terminal-yellow">Logo Option 2 - Command Transform</h2>
            <p className="mb-6 text-gray-400">Command-line transformation visual</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-terminal-green p-6 rounded bg-gray-900">
                <h3 className="text-lg mb-4">Dark Background</h3>
                <div className="bg-black p-8 rounded mb-4">
                  <img src="/command-line-transformation-with-arrows-and-cloud-.jpg" alt="Logo Option 2" className="w-full" />
                </div>
                <a
                  href="/command-line-transformation-with-arrows-and-cloud-.jpg"
                  download="thecloudbox-logo2-dark.svg"
                  className="inline-block px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-yellow transition"
                >
                  Download SVG
                </a>
              </div>

              <div className="border border-terminal-green p-6 rounded bg-gray-900">
                <h3 className="text-lg mb-4">Light Background</h3>
                <div className="bg-white p-8 rounded mb-4">
                  <img src="/command-line-transformation-dark-colors-suitable-f.jpg" alt="Logo Option 2 Light" className="w-full" />
                </div>
                <a
                  href="/command-line-transformation-dark-colors-suitable-f.jpg"
                  download="thecloudbox-logo2-light.svg"
                  className="inline-block px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-yellow transition"
                >
                  Download SVG
                </a>
              </div>
            </div>
          </section>

          {/* Icon Only */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-terminal-yellow">Icon Only</h2>
            <p className="mb-6 text-gray-400">Square icon for favicons and app icons</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-terminal-green p-6 rounded bg-gray-900">
                <h3 className="text-lg mb-4">512x512</h3>
                <div className="bg-black p-8 rounded mb-4">
                  <img src="/terminal-window-icon-square-green.jpg" alt="Icon 512" className="w-full" />
                </div>
                <a
                  href="/terminal-window-icon-square-green.jpg"
                  download="thecloudbox-icon-512.svg"
                  className="inline-block px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-yellow transition"
                >
                  Download
                </a>
              </div>

              <div className="border border-terminal-green p-6 rounded bg-gray-900">
                <h3 className="text-lg mb-4">256x256</h3>
                <div className="bg-black p-8 rounded mb-4">
                  <img src="/terminal-window-icon-square-green.jpg" alt="Icon 256" className="w-full" />
                </div>
                <a
                  href="/terminal-window-icon-square-green.jpg"
                  download="thecloudbox-icon-256.svg"
                  className="inline-block px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-yellow transition"
                >
                  Download
                </a>
              </div>

              <div className="border border-terminal-green p-6 rounded bg-gray-900">
                <h3 className="text-lg mb-4">128x128</h3>
                <div className="bg-black p-8 rounded mb-4">
                  <img src="/terminal-window-icon-square-green.jpg" alt="Icon 128" className="w-full" />
                </div>
                <a
                  href="/terminal-window-icon-square-green.jpg"
                  download="thecloudbox-icon-128.svg"
                  className="inline-block px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-yellow transition"
                >
                  Download
                </a>
              </div>
            </div>
          </section>

          {/* Brand Guidelines */}
          <section className="border border-terminal-green p-8 rounded bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-terminal-yellow">Brand Guidelines</h2>

            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="font-bold text-white mb-2">Colors</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Terminal Green: #10b981</li>
                  <li>Terminal Yellow: #fbbf24</li>
                  <li>Background: #000000</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-white mb-2">Typography</h3>
                <p>Primary Font: Geist Mono (monospace)</p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-2">Clear Space</h3>
                <p>Maintain minimum clear space around logo equal to the height of the terminal prompt symbol ($)</p>
              </div>

              <div>
                <h3 className="font-bold text-white mb-2">Minimum Size</h3>
                <p>Do not scale logo smaller than 100px wide for digital use</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
