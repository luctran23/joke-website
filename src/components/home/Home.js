import './index.css';
import LeftLogo from '../../assets/images/logo.jpg';
import RightLogo from '../../assets/images/right_logo.jpg';
import { mockJokes, footerData } from './services/mock-data';
import { useEffect, useState } from 'react';

const Home = () => {
    const [jokes, setJokes] = useState(mockJokes);
    const [selectedJoke, setSelectedJoke] = useState(null);
    const [votedJokes, setVotedJokes] = useState([]);

    const setCurrentJoke = (jokes) => {
        const unVotedJoke = jokes.find(joke => !joke.isVoted);
        setSelectedJoke(unVotedJoke);
    }

    const getSavedJokes = (cookies) => {
        const arrayOfCookies = cookies.split('=');
        const jokes = JSON.parse(arrayOfCookies[arrayOfCookies.length - 1]);
        return jokes;
    }

    useEffect(() => {
        if (document.cookie.length !== 0) {
            const savedVotedJokes = getSavedJokes(document.cookie);
            setVotedJokes(savedVotedJokes);
            for (let i = 0; i < savedVotedJokes.length; i++) {
                const joke = jokes.find(item => item.id === savedVotedJokes[i]);
                joke.isVoted = true;
            }
            setJokes(jokes);
            setCurrentJoke(jokes);
        } else {
            setCurrentJoke(jokes)
        }
    }, []);

    const handleFunny = (isFunny) => {
        const votedJokeIndex = jokes.indexOf(selectedJoke);
        if (votedJokeIndex !== -1) {
            votedJokes.push(selectedJoke.id);
            setVotedJokes(votedJokes);
            const expireTime = new Date();
            expireTime.setHours(23,59,59);
            document.cookie = `voted_jokes=${JSON.stringify(votedJokes)}; expires=${expireTime}; path=/`;
            jokes[votedJokeIndex].isVoted = true;
            setJokes(jokes);
            const unVotedJoke = jokes.find(joke => !joke.isVoted);
            setSelectedJoke(unVotedJoke);
        }
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
                    <button className='btn__primary' onClick={() => handleFunny(true)}>This is funny</button>
                    <button className='btn__info' onClick={() => handleFunny(false)}>This is not funny</button>
                </div>
                <div className='footer'>
                    <p>
                        {footerData.description}
                    </p>
                    <p className='copyright'>{footerData.title}</p>
                </div>
            </div>
        </>
    )
}
export default Home;