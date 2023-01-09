import './spinner.css';

export default function Spinner({ message }) {
  return (
    <div className='fetching-div'>
      <div className='spinner'></div>
      <p className='spinner-message'>{message}</p>
    </div>
  );
}
