import Countdown from '../components/Countdown'

function AsiaTrip() {
  const targetDate = new Date("2027-01-10T00:00:00Z");

  return <Countdown targetDate={targetDate} />;
}

export default AsiaTrip
