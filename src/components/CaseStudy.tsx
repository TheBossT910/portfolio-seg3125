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
            <div className="h-[500px] bg-red-500 mb-10 flex border-8 border-blue-500 rounded-md">
                <div className="w-2/3 flex">
                    <div className={images.length > 1 ? 'h-full w-4/5' : 'h-full w-full'}>
                        <img
                            className="h-full w-full object-cover"
                            src={images[0]}
                            alt=""
                        />
                    </div>
                    {(images.length > 1) &&
                        <div className="h-full w-1/5">
                            <img
                                className="h-1/3 w-full object-cover"
                                src={images[1]}
                                alt=""
                            />
                            <img
                                className="h-1/3 w-full object-cover"
                                src={images[2]}
                                alt=""
                            />
                            <img
                                className="h-1/3 w-full object-cover"
                                src={images[3]}
                                alt=""
                            />
                        </div>
                    }
                </div>

                <div className="w-1/3">
                    <div className="bg-orange-500 h-2/3 px-5 py-5">
                        <span className="bowlby-one-regular text-2xl">{ title }</span>
                        <br />
                        { description }
                    </div>

                    <div className="bg-purple-500 h-1/3 px-5 py-5">
                        <a href={link} className="w-full h-full btn btn-primary">{linkBtn}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}