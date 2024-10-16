import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import styled from 'styled-components';
import img from './assets/queue.jpg';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="card">
        <img className="card-img-top" src={img} alt="Card image cap" />
        <div className='image'></div>
        <div className="card-body">
          <h5 className="card-title">FCFS</h5>
          <div className="card-text">The First-Come, First-Served (FCFS) CPU scheduling algorithm processes tasks in the order they arrive. It is non-preemptive, meaning once a process starts executing, it runs until completion. While simple to implement, it may lead to longer waiting times if a lengthy process arrives before shorter ones other process has to wait.</div>
          <button onClick={() => navigate('/fcfs')} className='btn btn-primary'>Demo</button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  .card{
    width: 200px;
    height: auto;
    img{
      height:  200px;
      width: 200px;
    }
    .card-body{
      .card-text{
        font-size: 8px;
      }
      button{
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
`;


export default App
