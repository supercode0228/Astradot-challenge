import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import Story from '../../components/Story';
import { IStory } from '../../types';
import './Home.css';

const pageSize = 10;

function Home() {
  const [storyIDs, setStoryIDs] = useState([]);
  const [stories, setStories] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(res => res.json())
    .then(data => {
      setStoryIDs(data);
    })
  }, []);

  const fetchStoryItem = async (id: number) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    let promises: (Promise<() => IStory>)[] = [];
    let newsIdArray = storyIDs.slice(offset * pageSize, (offset + 1) * pageSize);
    newsIdArray.forEach(id => {
      promises.push(
        fetchStoryItem(id)
      )
    });
    Promise.all(
      promises
    )
    .then(data => {
      setStories(data);
    })
  }, [storyIDs, offset]);

  return (
    <div>
      {
        stories.map((item: any, index: number) => (
          <Story
            key={index}
            story={item}
            index={index + 1 + offset*pageSize}
          />
        ))
      }
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageSize}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={data => setOffset(data.selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default Home;

