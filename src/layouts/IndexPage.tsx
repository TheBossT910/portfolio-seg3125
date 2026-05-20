import CaseStudy from "../components/CaseStudy";
import ExperienceCard from "../components/ExperienceCard";

interface CaseStudyProps {
  title: string;
  description: string;
  link: string;
  linkBtn: string;
  images: string[];
}

interface ExperienceCardProps {
  title: string;
  subtitle: string;
  link: string;
  image: string;
}

const caseStudies: CaseStudyProps[] = [
  {
    title: "Service Site",
    description: "Case Study 1 - (coming soon)",
    link: "",
    linkBtn: "x",
    images: [
      "https://media.magnetomagazine.com/app/uploads/2025/12/05165623/JAS-TENSEI-03-1000x500.jpg",
      "https://hips.hearstapps.com/hmg-prod/images/whattobuy-2007hondas2000-jan2023-008-1671295199.jpg",
      "https://www.acura.com/-/media/Acura-Platform/Vehicle-Pages/INTEGRA/2026/features-page/Performance/geared-for-performance/Type-S/2026_Acura_Integra_Features_Performance_Type-S_S.jpg",
      "https://www.mugen-power.com/files/user/carparts/product/news/XPD20260108_%E3%82%A8%E3%82%A2%E3%83%AD%20%E3%82%B9%E3%83%9D%E3%83%BC%E3%83%84%E3%82%A8%E3%82%AD%E3%82%BE%E3%83%BC%E3%82%B9%E3%83%88%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E7%99%BA%E8%A1%A8/Prelude_Rear_1200x800.jpg",
    ],
  },
  {
    title: "Memory Game",
    description: "Case Study 2 - (coming soon)",
    link: "",
    linkBtn: "x",
    images: [
      "https://media.istockphoto.com/id/171357703/photo/head-on-chalkboard-with-light-bulb-notes-inside.jpg?s=612x612&w=0&k=20&c=mOW2sZ96mRxqvRkvjROf-l8CcqkNHgdMT-5TKSM46vA=",
    ],
  },
  {
    title: "e-Commerce Site",
    description: "Case Study 3 - (coming soon)",
    link: "",
    linkBtn: "x",
    images: ["https://cmsmart.net/images/community/8382/banner.jpg"],
  },
  {
    title: "Analytics Site",
    description: "Case Study 4 - (coming soon)",
    link: "",
    linkBtn: "x",
    images: [
      "https://images.squarespace-cdn.com/content/v1/5caed8960cf57d49530e8c60/1608143215492-4E1V3B85A16EGTJJM3X3/art-mg-hondansxrgt6.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/5caed8960cf57d49530e8c60/1608143200141-4CQD30YERVW4YNHJ0FZU/art-mg-hondansxrgt2.jpg?format=2500w",
      "https://images.squarespace-cdn.com/content/v1/5caed8960cf57d49530e8c60/1608143235742-5JZ9PD2OGPGS7SOT3O41/art-mg-hondansxrgt5.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/5caed8960cf57d49530e8c60/1608143215492-4E1V3B85A16EGTJJM3X3/art-mg-hondansxrgt6.jpg?format=2500w",
    ],
  },
];

const experienceCards: ExperienceCardProps[] = [
  // col 1
  { title: "Koyomi", subtitle: "AnimeTracker iOS/MacOS app", link: "https://taharashid.com/experiences/", image: "/experiences/col_1/home.png" },
  { title: "Koyomi", subtitle: "AnimeTracker iOS/MacOS app", link: "https://taharashid.com/experiences/", image: "/experiences/col_1/schedule.png" },
  { title: "Koyomi", subtitle: "AnimeTracker iOS/MacOS app", link: "https://taharashid.com/experiences/", image: "/experiences/col_1/user.png" },
  // col 2
  { title: "Koyomi", subtitle: "AnimeTracker iOS/MacOS app", link: "https://github.com/TheBossT910/AnimeTracker", image: "/experiences/col_2/list.png" },
  { title: "Koyomi", subtitle: "AnimeTracker iOS/MacOS app", link: "https://github.com/TheBossT910/AnimeTracker", image: "/experiences/col_2/home.png" },
  { title: "Koyomi", subtitle: "AnimeTracker iOS/MacOS app", link: "https://github.com/TheBossT910/AnimeTracker", image: "/experiences/col_2/main.jpeg" },
  // col 3
  { title: "SavePoint", subtitle: "Fullstack video game management and tracker", link: "https://savepoint.ca/", image: "/experiences/col_3/detail.png" },
  { title: "SavePoint", subtitle: "Fullstack video game management and tracker", link: "https://savepoint.ca/", image: "/experiences/col_3/games.png" },
  { title: "SavePoint", subtitle: "Fullstack video game management and tracker", link: "https://savepoint.ca/", image: "/experiences/col_3/search.png" },
  // col 4
  { title: "Persona 3 Dual", subtitle: "Custom Nintendo DS C++ engine, demake of Persona 3", link: "https://github.com/TheBossT910/persona-3-dual", image: "/experiences/col_4/main.png" },
  { title: "Market Analysis System", subtitle: "AI-driven multi-agent financial investment advisor, built for uOttaHack8", link: "https://github.com/Tony-octopus/UOttaHack8", image: "/experiences/col_4/mas.png" },
  { title: "PerfectFit", subtitle: "Mock clothes-fitting website, built for SEG2900", link: "https://seg-perfect-fit.github.io/perfect-fit-site/", image: "/experiences/col_4/perfectfit.png" },
];

export default function IndexPage() {
  return (
    <>
      {/* Navbar based from https://daisyui.com/components/navbar/ */}
      <div className="max-lg:collapse bg-base-200 shadow-sm w-full rounded-md sticky top-0 z-50">
        <input id="navbar-1-toggle" className="peer hidden" type="checkbox" onChange={() => {}} />
        <label
          htmlFor="navbar-1-toggle"
          className="fixed inset-0 hidden max-lg:peer-checked:block"
        />
        <div className="collapse-title navbar">
          <div className="navbar-start">
            <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <button className="btn btn-ghost text-xl">Taha Rashid</button>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a href="#home">Home</a></li>
              <li><a href="#experiences">Experiences</a></li>
              <li>
                <details>
                  <summary>Case Studies</summary>
                  <ul className="p-2 bg-base-100 w-40 z-1">
                    <li><a href="#case-studies-1">1 - Service Site</a></li>
                    <li><a href="#case-studies-2">2 - Memory Game</a></li>
                    <li><a href="#case-studies-3">3 - e-Commerce Site</a></li>
                    <li><a href="#case-studies-4">4 - Analytics Site</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="navbar-end" />
        </div>

        <div className="collapse-content lg:hidden z-1">
          <ul className="menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#experiences">Experiences</a></li>
            <li>
              <details>
                <summary>Case Studies</summary>
                <ul>
                  <li><a href="#case-studies-1">1 - Service Site</a></li>
                  <li><a href="#case-studies-2">2 - Memory Game</a></li>
                  <li><a href="#case-studies-3">3 - e-Commerce Site</a></li>
                  <li><a href="#case-studies-4">4 - Analytics Site</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>

      {/* Hero */}
      <div id="home" className="flex h-[50%]">
        {/* Left */}
        <div className="bg-[#8ECAE6] w-[50%] pl-15 py-10">
          <div className="bowlby-one-regular text-7xl">
            Hey!
            <br />
            I'm Taha Rashid,
          </div>
          <div className="pt-5">
            <span className="text-2xl underline decoration-[#FB8500] open-sans-bold">
              2nd Year Software Engineering Student
            </span>
            <br />
            <span>@ uOttawa, ON, Canada • Car Enthusiast &amp; Gamer</span>
          </div>
        </div>

        {/* Right */}
        <div className="bg-[#219EBC] flex w-[50%] px-15 py-5">
          <img
            className="w-full object-cover border-8 border-[#FFB703] rounded-2xl"
            src="https://taharashid.com/pfp.jpg"
            alt="Taha Rashid profile photo"
          />
        </div>
      </div>

      {/* Excerpt taken from my real personal portfolio site, taharashid.ca */}
      <div className="mx-15 mt-10">
        <p>
          I previously did a co-op at{" "}
          <a href="https://www.ciena.com/" className="link text-[#FB8500]">
            Ciena
          </a>
          , developing embedded software on their 6500 optical networking platform with C, Python, and XML.
        </p>
        <br />
        <p className="open-sans-bold">Here's what I've been doing lately:</p>
        <ul>
          <li>
            - Currently building{" "}
            <a href="https://github.com/TheBossT910/persona-3-ds" className="link text-[#FB8500]">
              Persona 3 Dual
            </a>
            , a Nintendo DS game engine demake of Persona 3 in C++ targeting ARM9 hardware.
          </li>
          <li>
            - Previously worked on{" "}
            <a href="https://savepoint.ca" className="link text-[#FB8500]">
              SavePoint
            </a>{" "}
            using Nuxt/Vue, .NET/MS SQL, and Tailwind CSS
          </li>
          <li>
            - Last hackathon @{" "}
            <a href="https://2026.uottahack.ca" className="link text-[#FB8500]">
              uOttaHack8
            </a>
            , where me and my team built{" "}
            <a href="https://devpost.com/software/uottahack-8" className="link text-[#FB8500]">
              Market Analysis System (MAS)
            </a>
            , an AI-powered multi-agent financial investment advisor and dashboard
          </li>
        </ul>
        <br />
        <p>
          I'm especially interested in embedded systems and firmware for silicon, automotive, and XR.
          Think low-level software like compatibility layers (Rosetta, Proton, FEX) that enables cool tech!
        </p>
      </div>

      {/* Experiences */}
      {/* Image collage inspired from https://flowbite.com/docs/components/gallery/ */}
      <div id="experiences" className="mx-15 mt-10">
        <div className="bowlby-one-regular text-2xl">Experiences</div>
        <div>
          I'm currently taking a UX/UI course (SEG3125 @ uOttawa) to help me grow as a developer.
          <br />
          I have informal experience as a UX/UI designer from my various projects + internships
          <br /><br />
          <span className="open-sans-bold">My (informal) workflow:</span>
          <ul>
            <li>1. Look at the project, and take notes about its central themes, reasons, and call to actions</li>
            <li>2. Look for examples from similar projects/competitors online &amp; create a collage of design elements I liked</li>
            <li>3. Select theming, fonts, colours</li>
            <li>4. Hop onto Figma to create a low-fidelity design and figure out the flow, interactivity, ease-of-use, and other UX elements of the design whilst gathering feedback to refine my work</li>
            <li>5. Create a high-fidelity concept, and implement!</li>
          </ul>
          <br />
          <span className="open-sans-bold">My tools include:</span>
          <ul>
            <li>- Figma</li>
            <li>- Gimp</li>
            <li>- Pen &amp; Paper</li>
          </ul>
          <br />
          Feel free to take a look at my work &amp; case studies below!
        </div>
      </div>

      {/* Experiences collage */}
      <div className="p-11">
        <div className="bg-[#8ECAE6] rounded-2xl flex h-[800px]">
          {/* Col 1 */}
          <div className="w-1/4">
            <div className="h-3/7"><ExperienceCard {...experienceCards[0]} /></div>
            <div className="h-2/7"><ExperienceCard {...experienceCards[1]} /></div>
            <div className="h-2/7"><ExperienceCard {...experienceCards[2]} /></div>
          </div>
          {/* Col 2 */}
          <div className="w-1/4">
            <div className="h-2/7"><ExperienceCard {...experienceCards[3]} /></div>
            <div className="h-3/7"><ExperienceCard {...experienceCards[4]} /></div>
            <div className="h-2/7"><ExperienceCard {...experienceCards[5]} /></div>
          </div>
          {/* Col 3 */}
          <div className="w-1/4">
            <div className="h-3/7"><ExperienceCard {...experienceCards[6]} /></div>
            <div className="h-2/7"><ExperienceCard {...experienceCards[7]} /></div>
            <div className="h-2/7"><ExperienceCard {...experienceCards[8]} /></div>
          </div>
          {/* Col 4 */}
          <div className="w-1/4">
            <div className="h-2/7"><ExperienceCard {...experienceCards[9]} /></div>
            <div className="h-3/7"><ExperienceCard {...experienceCards[10]} /></div>
            <div className="h-2/7"><ExperienceCard {...experienceCards[11]} /></div>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="mx-15 my-10">
        <div className="bowlby-one-regular text-2xl">Case Studies</div>
        <div className="h-full">
          <div id="case-studies-1" className="h-[500px] mb-10">
            <CaseStudy {...caseStudies[0]} />
          </div>
          <div id="case-studies-2" className="h-[300px] mb-10">
            <CaseStudy {...caseStudies[1]} />
          </div>
          <div id="case-studies-3" className="h-[300px] mb-10">
            <CaseStudy {...caseStudies[2]} />
          </div>
          <div id="case-studies-4" className="h-[500px] mb-10">
            <CaseStudy {...caseStudies[3]} />
          </div>
        </div>
      </div>
    </>
  );
}