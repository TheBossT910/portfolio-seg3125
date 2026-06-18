export default function Footer() {

    return (
      <footer className="bg-[#003049] text-[#aed9e0] border-t-8 border-[#c1121f] pt-10 pb-6 px-8 mt-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#c1121f] p-1.5 rounded-lg">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-black text-white">MotorMemory</span>
            </div>
            <p className="text-sm text-[#aed9e0]/70 leading-relaxed">A cognitive challenge disguised as an automotive quiz. Test the limits of your short-term memory.</p>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4">Academic</h3>
            <ul className="space-y-2 text-sm text-[#aed9e0]/80">
              <li>Course: SEG 3125</li>
              <li>Professor: Caroline Barrière</li>
              <li>Institution: University of Ottawa</li>
              <li className="text-white font-bold">Designer: Taha Rashid (300403833)</li>
            </ul>
          </div>
        </div>
      </footer>
    );
}