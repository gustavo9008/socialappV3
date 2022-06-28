import React from 'react';
import Card from '@/components/ui/Container';
import Spinner from '@/components/ui/Spinner';
import Link from 'next/link';
import { appToastContext } from "@/context/state"

function ReadingList(Props) {
    const { useFetch, userSession, showToast } =
        React.useContext(appToastContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [readingList, setReadingList] = React.useState(null);
    const deleteBookMark = useFetch;
    const setList = (rL, func) => {
        setReadingList(rL);
        setIsLoading(false);
    }
    async function updateLocalStorage(updatedList) {
        // let currentList = localStorage.getItem("reading_list");
        localStorage.setItem("user_lists", JSON.stringify(updatedList));
        // localStorage.setItem("reading_list", JSON.stringify(updatedList));
        return;
    }
    const deleteBookmarkHandler = async (id) => {
        const data = {
            bookmark: id,
            user: userSession.user.id,
            type: "DELETE_BOOKMARK_POST",
        };
        const res = await deleteBookMark("PUT", "/api/user/updateuserprofile", data);

        res.data.success === true &&
            res.data.message &&
            (await showToast("success", res.data.message),
                await updateLocalStorage(res.data.reading_list), setReadingList(res.data.reading_list.readingList.reverse()))
    };

    React.useEffect(() => {
        let list = JSON.parse(localStorage.getItem("user_lists"));
        // console.log(list.readingList.length);
        // console.log(list.readingList.length);
        list.readingList.length > 0 && setList(list.readingList.reverse(), "array has value");
        !list.readingList.length && setList([], "array has no value");

    }, []);
    return (
        <Card>
            <div>
                <p className="text-2xl text-gray-50">Reading List (<span className="px-1">{readingList !== null && readingList.length}</span>)</p>
                {
                    isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            {console.log(readingList)}
                            {!readingList.length ? (
                                <h2 className="text-5xl text-center">
                                    Nothing to see here.
                                </h2>

                            ) : (
                                <>
                                    {
                                        readingList.map((article, i) => (
                                            <article key={i} className="Psm:w-screen flex flex-col flex-wrap Psm:border-l-0 Psm:border-r-0 flex-auto border border-gray-500 Psm:rounded-none rounded-md overflow-hidden">
                                                {/* <h3 className="p-2 pl-6">Reading List</h3> */}

                                                <div className="flex">
                                                    <Link href={`/post/${article.postId}`}>
                                                        <a className="w-full bg-gray-800 hover:bg-gray-600 border-b border-gray-900 overflow-hidden p-4"> <h6>{article.title}  </h6></a>
                                                    </Link>

                                                    <button onClick={() => deleteBookmarkHandler(article.postId)} id="delete-article-list" className="delete-article-list bg-gray-700 block w-14 p-4 font-medium border-b border-gray-900 text-gray-300 hover:bg-gray-600" aria-label="Delete post from reading list">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>



                                            </article>
                                        ))
                                    }
                                </>

                            )}

                        </>
                    )
                }

            </div>
        </Card>

    )
}

export default ReadingList;