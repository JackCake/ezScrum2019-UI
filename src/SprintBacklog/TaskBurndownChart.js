import React from "react";
import Chart from 'chart.js';

class TaskBurndownChart extends React.Component {
    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps.taskRealPoints) !== JSON.stringify(this.props.taskRealPoints)){
            var ctx = document.getElementById("taskBurndownChart");
            new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [{
                        label: "Real Point",
                        data: this.props.taskRealPoints, 
                        borderColor: "red", 
                        fill: false
                    }, {
                        label: "Ideal Point",
                        data: this.props.taskIdealPoints, 
                        borderColor: "blue", 
                        fill: false
                    }],
                    labels: this.props.taskSprintDates
                }, 
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }, 
                    elements: {
                        line: {
                            tension: 0
                        }
                    }
                }
            });
        }
    }

    render(){
        return(
            <div style={{width: "50%"}}>
                <canvas id="taskBurndownChart"></canvas>
            </div>
        );
    };
}

export default TaskBurndownChart;