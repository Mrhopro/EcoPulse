import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ActivityChart from '../components/ActivityChart';
import LocalEcology from '../components/LocalEcology';
import MonthlyChart from '../components/MountlyChart';
import { fetchMe } from '../api/auth';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [challenges, setChallenges] = useState([]);
  const currentDate = moment().format('DD MMM');

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await fetchMe();
        setUser(data);
      } catch {
        setError('Не вдалося отримати дані користувача');
      }
    };
    getUser();

    // TODO: замінити на реальний запит до /challenges/last
    const fake = [
      { id: 1, title: 'Zero Plastic Week',    date: '2025-05-10', status: 'Completed' },
      { id: 2, title: 'Bike to Work Challenge', date: '2025-05-08', status: 'Completed' },
      { id: 3, title: 'Plant a Tree',           date: '2025-05-05', status: 'Missed' },
    ];
    setChallenges(fake);
  }, []);

  if (error) {
    return <div className="dashboard"><p className="dashboard__error">{error}</p></div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard__welcome">
        <h2 className="dashboard__title">
          Welcome{user ? `, ${user.name}` : ''}
        </h2>
        <p className="dashboard__subtitle">
          Today, {currentDate} you have <span className="dashboard__highlight">{user?.points ?? '—'}</span> points
        </p>
      </header>

      <section className="dashboard__stats">
        {[
          { title: 'Activities Completed', value: user?.activitiesCompleted },
          { title: 'Challenges Completed', value: user?.challengesCompleted },
          { title: 'Local Ecology Points', value: user?.localEcologyPoints },
          { title: 'Leaderboard Position', value: user?.leaderboardPosition },
        ].map((card, i) => (
          <div key={i} className="dashboard__card">
            <h3 className="dashboard__card-title">{card.title}</h3>
            <p className="dashboard__card-value">
              {card.value ?? 'Loading...'}
            </p>
          </div>
        ))}
      </section>

       <section className="dashboard__charts">
        <div className="dashboard__chart dashboard__chart--main">
          <h3 className="dashboard__section-title">Прогрес за останній тиждень</h3>
          <ActivityChart />
        </div>
        <div className="dashboard__chart dashboard__chart--secondary">
          <MonthlyChart />
        </div>
      </section>

      <section className="dashboard__ecology">
        <LocalEcology />
      </section>
      <section className="dashboard__last-challenges">
        <h3 className="dashboard__section-title">Last Challenges</h3>
        <div className="last-challenges__list">
          {challenges.map(ch => (
            <div key={ch.id} className="challenge-card">
              <h4 className="challenge-card__title">{ch.title}</h4>
              <p className="challenge-card__date">{moment(ch.date).format('DD MMM YYYY')}</p>
              <span className={`challenge-card__status challenge-card__status--${ch.status.toLowerCase()}`}>
                {ch.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
