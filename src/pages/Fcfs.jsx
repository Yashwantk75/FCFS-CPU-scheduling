import { useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import ProcessDetail from '../components/ProcessDetail';
import Chart from 'react-google-charts';
export default function Fcfs() {
    const inputCount = useRef();
    const cstimeRef = useRef();
    const [queue, addqueue] = useState([]);
    const [processInputs, setProcessInputs] = useState([]);
    const [processArray, setProcessArray] = useState([[]]);
    const [visible, setVisible] = useState(false);
    function addProcess(item) {
        // Add the item to the queue state
        addqueue(prevQueue => [...prevQueue, item]);

        // Update the state with the filtered array
        setProcessInputs((processInputs) => {
            const updatedProcessInputs = processInputs.filter((entry) => entry.props.id != item.Id);
            return updatedProcessInputs
        });
    }

    function resetAll() {
        addqueue([]);
        setProcessInputs([]);
        setProcessArray([[]]);
        setVisible(false);
        inputCount.current.value = "";
        cstimeRef.current.value = "";
    }

    function handleClick() {
        const array = [];
        const count = parseInt(inputCount.current.value, 10)
        for (let index = 0; index < count; index++) {
            array.push(<ProcessDetail key={index} id={index} addProcess={addProcess}></ProcessDetail>)
        }
        setProcessInputs((processInputs) => processInputs = array); //for using set state function asynchronous use this call back where it takes previous state and update it this ensures that our state is most up to date and update it there itself async..
    }

    function compute() {
        const cstime = parseInt(cstimeRef.current.value);
        if (cstime < 0 || isNaN(cstime)) { alert("Enter valid context switch time"); return; }
        queue.sort((a, b) => a.Arrival - b.Arrival);
        console.log(queue);
        const arrayOfProcesses = [
            [
                { type: 'string', label: 'Process' },
                { type: 'string', label: 'Label' },
                { type: 'date', label: 'Start' },
                { type: 'date', label: 'End' }
            ]
        ]; // Define header for the Timeline chart
        let startTime = 0;
        queue.forEach((process, ind) => {
            const arrivalTime = process.Arrival;
            const burstTime = process.Burst;
            let startDate, endDate;

            if (arrivalTime <= startTime) {
                startDate = startTime;
                endDate = startTime + burstTime;
                startTime += burstTime;
            } else {
                startDate = arrivalTime;
                endDate = arrivalTime + burstTime;
                startTime = arrivalTime + burstTime;
            }

            arrayOfProcesses.push([
                "P" + process.Id,
                "P" + process.Id,
                startDate * 1000,
                endDate * 1000
            ]);
            startDate = startTime;
            endDate = startTime + cstime;
            startTime += cstime
            if (ind < (queue.length - 1)) {
                console.log(ind < (arrayOfProcesses.length - 1));

                arrayOfProcesses.push([
                    "CS",
                    "CS",
                    startDate * 1000,
                    endDate * 1000,
                ])
            }
        });

        setProcessArray(arrayOfProcesses);
        console.log(arrayOfProcesses);
        setVisible(true);
    }


    return (
        <Container>
            <div className="count-input-div">
                <div className="text">Enter Number of Process</div>
                <div className="count-input">
                    <input className='form-control' type="number" id="processcount" name='processcount' ref={inputCount} min={1} autoComplete='off' />
                    <button className='btn btn-primary add-process' onClick={handleClick}>Add process</button>
                </div>
            </div>
            <div className="added-process-div">
                {queue.map((item, ind) => <div className='added-process' key={ind}>
                    <span>Process Id: {item.Id}</span>
                    <span>Arrival Time: {item.Arrival}</span>
                    <span>Burst Time: {item.Burst}</span>
                </div>)}
            </div>
            {processInputs.map((item, ind) => <div className='process_input' key={ind}>{item}</div>)}
            <div className='context-switch'>
                <label htmlFor="context-switch-time">Context Switch Time: </label>
                <input type='number' min={0} autoComplete='off' id='context-switch-time' ref={cstimeRef}></input>
            </div>
            <button className='btn btn-primary calculate' onClick={compute}>Calculate</button>
            <button className="btn btn-primary reset" onClick={resetAll}>Reset</button>
            {processArray.length > 0 && <div className={visible ? "" : "hide"}><Chart
                chartType="Timeline"
                data={processArray}
                width="99%"
            /></div>}
        </Container>
    )
}

const Container = styled.div`
    .count-input-div{
        padding-left: 5px;
        margin-bottom: 1rem;
        .text{
            font-family: 'Courier New', Courier, monospace;
            font-size: 20px;
        }
        .count-input{
            padding: 2px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            input{
                width: 300px;
                display: inline;
                border: 2px solid black;
            }
        }
    }
    .added-process-div{
        border: 2px solid black;
        .added-process{
            display: flex;
            gap: 1rem;
        }
    }
    .context-switch{
        margin: 10px 0 0 0;
    }
    .calculate{
        margin: 10px 0;
    }
    .reset{
        margin-left: 5px;
    }
    .chart-container{
        overflow-x: auto;
    }
    .hide{
        display: none;
    }
`;