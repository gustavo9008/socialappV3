import React from 'react';
import Card from '@/components/ui/globalUI/Container';
import Spinner from '@/components/ui/loaders/Spinner';
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
        if (list !== null) {
            list.readingList.length > 0 && setList(list.readingList.reverse(), "array has value");
        }
        if (list === null) {
            setList([], "array has no value");

        }

    }, []);
    return (
        <Card>
            {userSession !== null && (<div>
                <p className="text-2xl">Reading List (<span className="px-1">{readingList !== null && readingList.length}</span>)</p>
                {
                    isLoading ? (
                        <Spinner />
                    ) : (
                        <>

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
                                                    <Link legacyBehavior href={`/post/${article.postId}`}>
                                                        <a className="w-full bg-gray-100 dark:bg-gray-800 hover:dark:bg-gray-600 hover:bg-gray-300 border-b border-gray-900 overflow-hidden p-4"> <h6>{article.title}  </h6></a>
                                                    </Link>

                                                    <button onClick={() => deleteBookmarkHandler(article.postId)} id="delete-article-list" className="delete-article-list bg-gray-400 dark:bg-gray-700 block w-14 p-4 font-medium border-b border-gray-900 hover:dark:bg-gray-600 hover:bg-gray-500" aria-label="Delete post from reading list">
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

            </div>)}
            {userSession === null && (
                <p className="text-center font-semibold text-3xl p-10">You must be login.</p>
            )}
        </Card>

    )
}

export default ReadingList;