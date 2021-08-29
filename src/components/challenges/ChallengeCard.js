import React from 'react'
import { Link } from 'react-router-dom'
import DifficultyBar from './DifficultyBar'
import { Image, Placeholder } from 'cloudinary-react';
import Badge from '../smallComponents/Badge';

const ChallengeCard = ({ challenge, challengelist, btnTitle }) => {
    const link = challengelist ? '/challenge/' + challenge.id : '/submit/' + challenge.id;
    return (
        <div className="flex flex-col max-w-sm rounded-md shadow-2xl bg-gray-800 overflow-hidden">
            <div className="h-auto">
                <Image className="w-full h-full" cloudName="di5hmgowi" alt="challenge design" loading="lazy" public-id={challenge.image[0]}>
                    <Placeholder type="pixelate" />
                </Image>
            </div>
            <div className="flex flex-col justify-between">
                <div>
                    <div className="px-4 pt-4">
                        {challenge.tags.map(tag => (
                            <Badge key={tag} name={tag} badgeColor="purple" />
                        ))}
                    </div>
                    <h3 className="font-semibold font-heading text-2xl text-white px-4 pb-1 leading-6">{challenge.title}</h3>
                    <p className="text-base text-gray-400 px-4 py-2">{challenge.description}</p>
                </div>
                <div className="mt-4">
                    <DifficultyBar difficultyLevel={challenge.difficulty} />
                    <Link to={link} className="block rounded-t-none mt-4 w-full bg-gradient-to-br from-purple-500 to-indigo-500 text-purple-200 font-semibold font-heading text-lg text-center px-5 py-5">{btnTitle}</Link>
                </div>
            </div>
        </div>
    )
}

export default ChallengeCard