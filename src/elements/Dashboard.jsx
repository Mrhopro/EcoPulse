import React from 'react';
import moment from 'moment/moment';
import ActivityChart from '../components/ActivityChart';
import { fetchMe } from '../api/auth'
import { useEffect, useState } from 'react'

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const currentDate  = moment().format('DD MMM');

    useEffect(() => {
        const getUser = async () => {
            try {
                const {data} = await fetchMe();
                setUser(data);
            } catch (err) {
                setError('Не вдалося отримати дані користувача');
            }
        };

        getUser();
    }, []);
    if (error) {
        return <div className="page-container">{error}</div>;
    }


  return (
    <div className="page-container">
        <div className="Welcome-section">
        <h2 className='Welcome'>Welcome {user ? `, ${user.name}` : ''}!</h2>
        <p className='Sub-Welcome'>Today, {currentDate} you have `number` points</p>
        </div>
        <div className="Dashboard-stats">
            <div className="Dashboard-card">
                <h3 className='Card-title'>Total Points</h3>
                <p className='Card-value'>{user ? user.points : 'Loading...'}</p>
            </div>
            <div className="Dashboard-card">
                <h3 className='Card-title'>Activities Completed</h3>
                <p className='Card-value'>{user ? user.activitiesCompleted : 'Loading...'}</p>
            </div>
            <div className="Dashboard-card">
                <h3 className='Card-title'>Challenges Completed</h3>
                <p className='Card-value'>{user ? user.challengesCompleted : 'Loading...'}</p>
            </div>
            <div className="Dashboard-card">
                <h3 className='Card-title'>Local Ecology Points</h3>
                <p className='Card-value'>{user ? user.localEcologyPoints : 'Loading...'}</p>
            </div>
            <div className="Dashboard-card">
                <h3 className='Card-title'>Leaderboard Position</h3>
                <p className='Card-value'>{user ? user.leaderboardPosition : 'Loading...'}</p>
            </div>
        </div>
        <div className="page-container">
      <h2>Привіт, {user?.name}!</h2>
      <p>Ласкаво просимо до EcoPulse Dashboard.</p>

      <section>
        <h3>Прогрес за останній тиждень</h3>
        <ActivityChart />
      </section>
    </div>
    </div>
  )
}

export default Dashboard