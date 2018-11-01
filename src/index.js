import React from 'react';
import ReactDOM from 'react-dom';

const model= {
    running : false,
    time: 0
};

let view = (m) => {
    let mins = Math.floor(m.time / 60);
    let secs = m.time - mins * 60;
    let formattedSeconds = secs < 10 ? '0' + secs : secs;
    let stopStartHandler = (event) => {
        update(model, m.running ? 'STOP' : 'START');
    };
    let resetHandler = (event) => {
        update(model, 'RESET');
    };
    return (
        <div>
            <p>{mins}:{formattedSeconds}</p>
            <button onClick={stopStartHandler}>{m.running ? 'Stop' : 'Start'}</button>
            <button onClick={resetHandler}>Reset</button>
        </div>
    );
};

let intents = {
    TICK : 'TICK',
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET'
}

const getNewTime = (model) => {
    return model.running ? model.time + 1 : model.time;
}

const update = (model, intent) => {
    const updates = {
        'TICK':(model) => Object.assign(model, {time: getNewTime(model)}),
        'START':(model) => Object.assign(model, {running:true}),
        'STOP':(model) => Object.assign(model, {running:false}),
        'RESET':(model) => Object.assign(model, {
            running:false,
            time:0
        })
    };
    updates[intent](model);
    render();
}

let render = () => ReactDOM.render(view(model), document.getElementById('root'));

setInterval(() => {
    update(model, 'TICK');
}, 1000);

render();
