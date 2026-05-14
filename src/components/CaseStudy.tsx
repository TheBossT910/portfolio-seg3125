interface CaseStudyProps {
    title : string;
    description : string;
    link : string;
    linkBtn : string;
    images: string[];
}

export default function CaseStudy({ title, description, link, linkBtn, images }: CaseStudyProps) {

    return (
        <div>
            <div className="h-[500px] mb-10 flex border-8 border-[#219EBC] bg-[#219EBC] rounded-2xl">
                <div className="w-2/3 flex">
                    <div className={images.length > 1 ? 'h-full w-4/5' : 'h-full w-full'}>
                        <img
                            className={images.length > 1 ? 'h-full w-full object-cover rounded-l-2xl' : 'h-full w-full object-cover rounded-2xl'}
                            src={images[0]}
                            alt=""
                        />
                    </div>
                    {(images.length > 1) &&
                        <div className="h-full w-1/5">
                            <img
                                className="h-1/3 w-full object-cover rounded-tr-2xl"
                                src={images[1]}
                                alt=""
                            />
                            <img
                                className="h-1/3 w-full object-cover"
                                src={images[2]}
                                alt=""
                            />
                            <img
                                className="h-1/3 w-full object-cover rounded-br-2xl"
                                src={images[3]}
                                alt=""
                            />
                        </div>
                    }
                </div>

                <div className="w-1/3 bg-[#8ECAE6] ml-2 rounded-2xl">
                    <div className="h-2/3 px-5 py-5">
                        <span className="bowlby-one-regular text-2xl underline decoration-[#FB8500]">{ title }</span>
                        <br />
                        { description }
                    </div>

                    <div className="h-1/3 px-5 py-5">
                        <a href={link} className="w-full h-full btn border-[#FB8500] bg-[#FFB703] rounded-xl">{linkBtn}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}