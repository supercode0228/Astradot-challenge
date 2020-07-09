import React from 'react'
import { IStory } from '../../types';
import { Link } from 'react-router-dom';

import "./Story.css";

interface Props {
  story: IStory,
  index: number,
}

function Story(props: Props) {
  const { story, index } = props;
  return (
    <div className="story__item">
      <div className="story__item__title">
        <a href={story.url}>{index}.&nbsp;&nbsp;{story.title}</a>
      </div>
      <div className="story__item__content">
        <span className="story__item__content__points">{story.score} points</span>
        <Link to={`/comment/${story.id}`}><span className="story__item__content__comments">{story.descendants} comments</span></Link>
      </div>
    </div>
  )
}

export default Story

