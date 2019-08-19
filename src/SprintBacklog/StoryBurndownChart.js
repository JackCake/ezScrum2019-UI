import React from "react";
import Chart from 'chart.js';

class StoryBurndownChart extends React.Component {
    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps.storyRealPoints) !== JSON.stringify(this.props.storyRealPoints)){
            var ctx = document.getElementById("storyBurndownChart");
            new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [{
                        label: "Real Point",
                        data: this.props.storyRealPoints, 
                        borderColor: "red", 
                        fill: false
                    }, {
                        label: "Ideal Point",
                        data: this.props.storyIdealPoints, 
                        borderColor: "blue", 
                        fill: false
                    }],
                    labels: this.props.storySprintDates
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
                <canvas id="storyBurndownChart"></canvas>
            </div>
        );
    };
}

export default StoryBurndownChart;