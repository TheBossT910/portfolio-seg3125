interface ExperienceCardProps {
    title: string;
    subtitle: string;
    link : string;
    image: string;
}

export default function ExperienceCard({ title, subtitle, link, image }: ExperienceCardProps) {

    // Created w/ AI assistance (Google Gemini)
    return (
        <a href={link} className="group block p-2 h-full transition">
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <img
                    src={image}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {title}
                    </h3>

                    <p className="text-gray-200 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {subtitle}
                    </p>
                </div>
            </div>
        </a>

    );
}