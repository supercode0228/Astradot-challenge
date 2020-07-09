import React, { useEffect, useState } from 'react';
import {
  useRouteMatch,
} from 'react-router-dom';

import { IComment, MatchParams } from '../../types';
import './Comment.css';

function Comment() {
  const [commentIDs, setCommentIDs] = useState([]);
  const [comments, setComments] = useState<any[]>([]);

  const match = useRouteMatch<MatchParams>('/comment/:id');
  const id = match?.params.id;

  useEffect(() => {    
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    .then(res => res.json())
    .then(data => {
      setCommentIDs(data.kids);
    })
  }, [id]);

  const fetchCommentItem = async (id: number) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    let promises: (Promise<() => IComment>)[] = [];
    commentIDs.forEach(id => {
      promises.push(
        fetchCommentItem(id)
      )
    });
    Promise.all(
      promises
    )
    .then(data => {
      setComments(data);
    })
  }, [commentIDs]);

  if (!comments) 
    return (<div>Loading</div>)
  else 
    return (
      <div>
      {
        comments.map((comment: any, index: number) => (
          <div className="comment">
            <div className="comment-title">- Commented by {comment.by}</div>
            <div className="comment-text" key={index}  dangerouslySetInnerHTML={{ __html: comment.text }} />
          </div>
        ))
      }
      </div>    
    )
}

export default Comment

