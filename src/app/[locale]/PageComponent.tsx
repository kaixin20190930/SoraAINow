'use client'
import {useRouter} from "next/navigation";
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import {useState} from "react";
import {randomVideo} from "~/data/openaiVideo";
import HeadInfo from "~/components/HeadInfo";
import {useCommonContext} from "~/context/common-context";
import Link from "next/link";

const PageComponent = ({
                           locale = '',
                           indexLanguageText,
                           initVideoList = [],
                           questionText,
                           authLanguageText
                       }) => {
    const router = useRouter();

    const [textStr, setTextStr] = useState('');
    const {setShowGeneratingModal, setShowLoadingModal, setShowLoginModal} = useCommonContext();
    const {userData} = useCommonContext();

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!textStr) {
            setVideoList(randomVideo(2));
            return;
        }

        if (!userData) {
            setShowLoginModal(true);
            return;
        }
        setShowGeneratingModal(true);
        const body = {
            prompt: textStr,
            user_id: userData?.user_id

        };
        const response = await fetch(`/${locale}/api/generate`, {
            method: 'POST',
            body: JSON.stringify(body)
        })
        const result = await response.json();
        setShowGeneratingModal(false);
        if (result.data) {
            if (!result.data[0].revised_prompt) {
                return
            }
            const video = {
                revised_prompt: result.data[0].revised_prompt,
                url: result.data[0].url
            }

            // add storage
            const videoHistoryListStr = localStorage.getItem('videoHistoryList');
            if (!videoHistoryListStr) {
                const videoHistoryList = [];
                videoHistoryList.unshift(video);
                localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
            } else {
                const videoHistoryList = JSON.parse(videoHistoryListStr);
                // check exist
                let exist = false;
                for (let i = 0; i < videoHistoryList.length; i++) {
                    const videoHistory = videoHistoryList[i];
                    if (videoHistory.revised_prompt == video.revised_prompt) {
                        exist = true;
                        localStorage.setItem('video', JSON.stringify(video));
                        router.push(`/${locale}/playground`)
                        return;
                    }
                }
                if (!exist) {
                    videoHistoryList.unshift(video);
                    // const newList = videoHistoryList.slice(0, 3);
                    localStorage.setItem('videoHistoryList', JSON.stringify(videoHistoryList));
                }
            }
            localStorage.setItem('video', JSON.stringify(video));
            router.push(`/${locale}/playground`)
        }
    }

    const [videoList, setVideoList] = useState(initVideoList);

    const handleMouseEnter = (event) => {
        event.target.play();
    };

    const handleMouseLeave = (event) => {
        event.target.pause();
    };

    return (
        <>
            <HeadInfo
                title={indexLanguageText.title}
                description={indexLanguageText.description}
                locale={locale}
                page={""}
            />
            <Header locale={locale} indexLanguageText={indexLanguageText} authLanguageText={authLanguageText}/>
            <div>
                <div className="block overflow-hidden bg-[#000000] bg-cover bg-center text-white"
                     style={{backgroundImage: 'https://assets.website-files.com/6502af467b2a8c4ee8159a5b/6502af467b2a8c4ee8159a77_Group%2047929.svg'}}>
                    <div className="mx-auto w-full max-w-7xl px-5 mb-5">
                        <div
                            className="mx-auto flex max-w-4xl flex-col items-center text-center py-10">
                            <h1 className="mb-4 text-2xl font-bold md:text-4xl">{indexLanguageText.title}</h1>
                            <div className="mb-5 max-w-[528px] lg:mb-8">
                                <p className="text-[#7c8aaa] text-xl">{indexLanguageText.pDescription}</p>
                            </div>
                        </div>
                        <div>
                            <div
                                className={"w-[90%] mx-auto rounded-tl-[30px] rounded-tr-[30px] border-[12px] rounded-bl-[30px] rounded-br-[30px] border-[#ffffff1f] object-fill"}>
                                <form onSubmit={handleSubmit} className="relative shadow-lg">
                                    <div
                                        className="overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500 rounded-tl-[20px] rounded-tr-[20px] ">
                    <textarea
                        rows={6}
                        name="description"
                        id="description"
                        className="block w-full resize-none border-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 text-lg pt-4 pl-4 bg-[#D3D3D3]"
                        placeholder={indexLanguageText.placeholderText}
                        value={textStr}
                        onChange={(e) => {
                            setTextStr(e.target.value);
                        }}
                        maxLength={1000}
                    />
                                    </div>
                                    <div
                                        className="overflow-hidden focus-within:ring-1 focus-within:ring-indigo-500 rounded-bl-[20px] rounded-br-[20px] bg-[#D3D3D3]">
                                        <div
                                            className="text-black pt-4 flex justify-end items-center px-2 py-2">0/1000
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="inset-x-px bottom-1 bg-[#000000]">
                            <form onSubmit={handleSubmit} className="relative shadow-lg">
                                <div
                                    className="flex justify-center items-center space-x-3 border-gray-200 px-2 py-2">
                                    <div className="pt-2 w-1/4">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center items-center rounded-md bg-[#2d6ae0] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800"
                                        >
                                            <div
                                                className="c-PJLV-eVVBcb-size-s2-bold c-PJLV-kGaJaF-size-b2-bold">
                                                {indexLanguageText.buttonText}
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="none">
                                                <g clip-path="url(#a)">
                                                    <path fill="#fff"
                                                          d="M8.578 9.753c.11.33.576.33.686 0l.645-1.937a2.89 2.89 0 0 1 1.829-1.828l1.936-.645a.361.361 0 0 0 0-.686l-1.937-.645a2.89 2.89 0 0 1-1.828-1.829L9.264.247a.361.361 0 0 0-.686 0l-.645 1.937a2.89 2.89 0 0 1-1.828 1.828l-1.937.645a.36.36 0 0 0 0 .686l1.937.645a2.89 2.89 0 0 1 1.828 1.828l.645 1.937Zm-3.863 5.099a.217.217 0 0 0 .412 0l.387-1.162a1.736 1.736 0 0 1 1.097-1.097l1.162-.387a.217.217 0 0 0 0-.412l-1.162-.387a1.734 1.734 0 0 1-1.097-1.097l-.387-1.162a.217.217 0 0 0-.412 0l-.387 1.162a1.734 1.734 0 0 1-1.097 1.097l-1.162.387a.217.217 0 0 0 0 .412l1.162.387a1.735 1.735 0 0 1 1.097 1.097l.387 1.162Z"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="a">
                                                        <path fill="#fff" d="M0 16h16V0H0z"></path>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>

                        <div className={"border-[14px] border-[#ffffff1f] object-fill w-[90%] mx-auto mt-8"}>
                            <div className={"mx-auto bg-white"}>
                                <div className={"pb-2 border-b-2"}>
                                    <h2
                                        className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{indexLanguageText.soraVideoExample}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4">
                                    {videoList.map((file) => (
                                        <div key={file.prompt}>
                                            <div
                                                className="rounded-xl flex justify-center items-start">
                                                <video
                                                    src={file.videoUrl}
                                                    controls={true}
                                                    autoPlay={false}
                                                    playsInline={true}
                                                    preload={"metadata"}
                                                    controlsList={"nodownload"}
                                                    onMouseOver={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                    style={{width: '90%', height: '270px'}}
                                                />
                                            </div>
                                            <div className={"flex justify-center items-center"}>
                                                <p
                                                    className="pointer-events-none mt-2 block text-sm font-medium text-gray-500 w-[90%]">{indexLanguageText.prompt}: {file.prompt}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div key={"more"} className={"px-6 py-4"}>
                                    <Link href={`/${locale}/videos`}
                                          className={"flex justify-center items-center text-xl text-red-400 hover:text-blue-600"}>
                                        {indexLanguageText.moreExample} {'>>'}
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={"border-[14px] border-[#ffffff1f] object-fill w-[90%] mx-auto mt-8"}>
                            <div className={"mx-auto bg-white py-8"}>
                                <div className={"pb-2 border-b-2"}>
                                    <h2
                                        className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_1}</h2>
                                </div>
                                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                                    <p>
                                        {questionText.h2_1_p1}
                                    </p>
                                    <p>
                                        {questionText.h2_1_p2}
                                    </p>
                                    <p>
                                        {questionText.h2_1_p3}
                                    </p>
                                    <p>{questionText.h2_1_p4}<Link
                                        href={"https://openai.com/sora"}
                                        className={"text-blue-500"}>https://openai.com/sora</Link>.</p>
                                </div>
                            </div>
                        </div>

                        <div className={"border-[14px] border-[#ffffff1f] object-fill w-[90%] mx-auto mt-8"}>
                            <div className={"mx-auto bg-white py-8"}>
                                <div className={"pb-2 border-b-2"}>
                                    <h2
                                        className={"text-blue-500 pt-4 text-4xl flex justify-center items-center"}>{questionText.h2_2}</h2>
                                </div>
                                <div className={"w-[96%] text-gray-700 prose mx-auto mt-4"}>
                                    <p>
                                        {questionText.h2_2_p1}
                                    </p>
                                    <p>
                                        {questionText.h2_2_p2}
                                    </p>
                                    <p>
                                        {questionText.h2_2_p3}
                                    </p>
                                    <p>
                                        {questionText.h2_2_p4a}<Link href={"https://soraainoew.com/"}
                                                                     className={"text-blue-500"}>https://sorawebui.com/</Link>.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer
                locale={locale}
                description={indexLanguageText.description}
            />
        </>
    )


}
export default PageComponent

