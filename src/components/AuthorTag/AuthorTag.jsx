import React from 'react'

const AuthorTag = ({authorImage=null, authorName, date}) => {
    const colors = ["#eb4034", "#520a05", "#076ca3", "#1f7d5f", "#ad1a9f", "#ad971a"];
    const randomColor = colors[Math.floor(Math.random()*6)]
    return (
        <div className='AuthorTag bg-[var(--bgPrimary)] p-2.5 rounded-lg flex gap-2.5'>
            <div className="imageContainer">
                {
                    authorImage ?
                    <img className='image w-11 h-11 rounded-lg' src={authorImage} alt='cardImage' />
                    :
                    <div className='image w-11 h-11 rounded-lg flex justify-center items-center text-white' style={{backgroundColor:randomColor}}>{authorName.slice(0,1).toUpperCase()}</div>
                }
            </div>
            <div className="text flex flex-col gap-1">
                <h1 className='H6'>{authorName}</h1>
                <p className='P3'>{date}</p>
            </div>
        </div>
    )
}

export default AuthorTag