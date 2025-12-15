import Countdown from '../components/Countdown'

function SFSidequest() {
  const targetDate = new Date("2026-03-07T00:00:00Z");

  return <Countdown targetDate={targetDate} caption="(SF spring break sidequest)" />;
}

export default SFSidequest
