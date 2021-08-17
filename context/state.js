import { createContext, useContext } from 'react';

const CommentContext = createContext();

export function CommentsWrapper({children}){
    let commentState = false;
    return (
        <CommentContext.Provider value={commentState}>
            {children}
        </CommentContext.Provider>
    )
}

export function useCommentContext(){
    return useContext(CommentContext);
}