import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Chart from 'react-google-charts';
function App() {

  return (
    <Chart
      chartType="Timeline"
      data={[
        [
          { type: 'string', label: 'Process' },
          { type: 'string', label: 'Label' },
          { type: 'date', label: 'Start' },
          { type: 'date', label: 'End' }
        ],
        [
          "President",
          "George Washington",
          0,
          1000,
        ],
      ]}
      width="100%"
      height="400px"
    />
  );
}

export default App
