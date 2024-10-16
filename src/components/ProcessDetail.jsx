import PropTypes from 'prop-types';
import { useRef } from 'react';
import styled from 'styled-components';
export default function ProcessDetail({ id, addProcess }) {
    const arrival = useRef();
    const burst = useRef();
    function handleClick() {
        const arrivalTime = parseInt(arrival.current.value);
        const burstTime = parseInt(burst.current.value);

        if (isNaN(arrivalTime) || isNaN(burstTime) || arrivalTime < 0 || burstTime < 1) {
            console.log(isNaN(arrivalTime), isNaN(burstTime));
            alert("Enter valid entries");
        }
        else addProcess({ "Id": id, "Arrival": (arrivalTime), "Burst": (burstTime) });
    }
    return (
        <Container>
            <div className="id">
                <span htmlFor="processId">Process Id: </span>
                <span>{id}</span>
            </div>
            <div className="arrival-time">
                <label htmlFor="arrivalTime"> Arrival Time: </label>
                <input type="number" id="arrivalTime" ref={arrival} autoComplete='off' min={1} />
            </div>
            <div className="burst-time">
                <label htmlFor="burstTime">BurstTime: </label>
                <input type="number" id="burstTime" ref={burst} autoComplete='off' min={1} />
            </div>



            {/* <div className="addIoCpu">
                <button className='addIo' onClick={addIo}>+</button>
                <button className='addIo' onClick={subIo}>-</button>
            </div> */}
            <button onClick={handleClick}>Add process</button>
        </Container>
    )
}

ProcessDetail.propTypes = {
    id: PropTypes.any.isRequired,
    addProcess: PropTypes.any.isRequired,
}

const Container = styled.div`
    display: flex;
    gap: 1rem;
    input{
        width: 50px;
    }
    .addIoCpu{
        display: flex;
        gap: 0.2rem;
        button{
            border-radius: 10%;
        }
    }
`;