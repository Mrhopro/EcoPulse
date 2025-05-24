import React, { useEffect, useState } from 'react';
import moment from 'moment';
import ActivityChart from '../components/ActivityChart';
import LocalEcology from '../components/LocalEcology';
import MonthlyChart from '../components/MountlyChart';
import { fetchMe } from '../api/auth';
import { fetchLastChallenges,completeChallenge } from '../api/challenges';

export default function Dashboard() {
  const [user, setUser]         = useState(null);
  const [error, setError]       = useState('');
  const [challenges, setChallenges] = useState([]);
  const currentDate = moment().format('DD MMM');

  useEffect(() => {
    (async () => {
      try {
        const { data: me } = await fetchMe();
        setUser(me);
      } catch {
        setError('Не вдалося отримати дані користувача');
      }
      try {
        const { data } = await fetchLastChallenges();
        setChallenges(data);
      } catch {
        console.error("Не вдалося завантажити Last Challenges");
      }
    })();
  }, []);

  if (error) {
    return (
      <div className="dashboard">
        <p className="dashboard__error">{error}</p>
      </div>
    );
  }

  // Підрахунок завершених челенджів
  const completedCount = challenges.filter(c => c.status === "Completed").length;

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <header className="dashboard__welcome">
        <h2 className="dashboard__title">
          Welcome{user ? `, ${user.name}` : ''}
        </h2>
        <p className="dashboard__subtitle">
          Today, {currentDate} you have{' '}
          <span className="dashboard__highlight">
            {user?.points ?? '—'} points
          </span>
        </p>
      </header>

      {/* Stats Cards */}
      <section className="dashboard__stats">
        {[
          { title: 'Total Points',         value: user?.points },
          { title: 'Activities Completed', value: user?.activitiesCompleted },
          { title: 'Challenges Completed', value: completedCount },
          { title: 'Local Ecology Points', value: user?.localEcologyPoints },
          { title: 'Leaderboard Position', value: user?.leaderboardPosition },
        ].map((card, idx) => (
          <div key={idx} className="dashboard__card">
            <h3 className="dashboard__card-title">{card.title}</h3>
            <p className="dashboard__card-value">
              {card.value ?? 'Loading...'}
            </p>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="dashboard__charts">
        <div className="dashboard__chart dashboard__chart--main">
          <h3 className="dashboard__section-title">
            Прогрес за останній тиждень
          </h3>
          <ActivityChart />
        </div>
        <div className="dashboard__chart dashboard__chart--secondary">
          <MonthlyChart />
        </div>
      </section>

      {/* Local Ecology */}
      <section className="dashboard__ecology">
        <LocalEcology />
      </section>

      {/* Last Challenges */}
      <section className="dashboard__last-challenges">
        <h3 className="dashboard__section-title">Last Challenges</h3>
        <div className="last-challenges__list">
          {challenges.map(ch => (
            <div key={ch.id} className="challenge-card">
              <h4 className="challenge-card__title">{ch.title}</h4>
              <p className="challenge-card__date">
                {moment(ch.date).format('DD MMM YYYY')}
              </p>
              <span
                className={
                  `challenge-card__status challenge-card__status--${ch.status.toLowerCase()}`
                }
              >
                {ch.status}
              </span>
              {ch.status !== "Completed" && (
                <button
                  className="challenge-card__complete-btn"
                  onClick={async () => {
                    await completeChallenge(ch.id);
                    // оновити дані
                    const [{ data: updatedChallenges }, { data: me }] = await Promise.all([
                      fetchLastChallenges(),
                      fetchMe()
                    ]);
                    console.log("👤 fetchMe returned:", me);
                    setChallenges(updatedChallenges);
                    setUser(me);
                  }}
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
