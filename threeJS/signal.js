var Signal = signals.Signal;


var signalObject = {
    started : new Signal(),
    stopped : new Signal()
};


function onStarted(param1, param2) {
    alert(param1 + param2);
}


signalObject.started.dispatch('foo','bar');


signalObject.started.add(function(){
    
});
signalObject.started.remove(onStarted);






