import './index.css';
import LeftLogo from '../../assets/images/logo.jpg';
import RightLogo from '../../assets/images/right_logo.jpg';
import { mockJokes } from './services/mock-data';
import { useEffect, useState } from 'react';

const Home = () => {
    const [jokes, setJokes] = useState(mockJokes);
    const [selectedJoke, setSelectedJoke] = useState(mockJokes[0]);

    useEffect(() => {
        const unVotedJoke = jokes.find(joke => joke.isFunny === null);
        setSelectedJoke(unVotedJoke);
    }, []);

    const handleFunny = () => {
        const votedJokeIndex = jokes.indexOf(selectedJoke)
        if (votedJokeIndex !== -1) {
            jokes[votedJokeIndex].isFunny = true;
            setJokes(jokes);
            const unVotedJoke = jokes.find(joke => joke.isFunny === null);
            setSelectedJoke(unVotedJoke);
        }
        console.log('selected joke', selectedJoke, votedJokeIndex)
    }

    const handleNotFunny = () => {

    }
    return (
        <>
            <div className='container'>
                <div className='header'>
                    <img src={LeftLogo} alt='' />
                    <img src={RightLogo} alt='' />
                </div>
                <div className='banner'>
                    <h1>A joke a day keeps the doctor away</h1>
                    <p>If you joke wrong way, your teeth have to pay. (Serious)</p>
                </div>
                <div className='joke__section'>
                    <p>
                        {selectedJoke ? selectedJoke.value : `That's all the jokes for today! Come back another day!`}
                    </p>
                </div>
                <div className='btn__group'>
                    <button className='btn__primary' onClick={handleFunny}>This is funny</button>
                    <button className='btn__info' onClick={handleNotFunny}>This is not funny</button>
                </div>
                <div className='footer'>
                    <p>
                        This website is created as apart of HLsolutions program. The materials contained on this website are provided
                        for general information only and do not constitute any form of advice. HLS assumes no responsibility for the accuracy
                        of any particular statement and accepts no liability for any loss or damage which may be arise from reliance on the
                        information contained on this site.
                    </p>
                    <p className='copyright'>Copyright 2021 HLS</p>
                </div>
            </div>
        </>
    )
}
export default Home;