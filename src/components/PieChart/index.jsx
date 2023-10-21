import React, { useRef, useEffect } from 'react';


export default function PieChart() {

    const canvasRef = useRef(null)

    let pieSlices = [
        {
        title: 'Cars',
        size: 38.1,
        color: 'blue'
        },
        {
        title:'Trucks',
        size: 19.0,
        color:'red'
        },
        {
        title:'Bus',
        size: 14.3,
        color:'green'
        },
        {
        title:'Motorcycle',
        size: 28.6,
        color: 'orange'
        }
    ]

    useEffect(() => {
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#cfd1ee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let counterClockwise = true
        var radius = 390/2.6;
        let totalSize = pieSlices.reduce((total, slice) => total + slice.size, 0);
        
        let currentAngle = -Math.PI / 2;//up
        //let currentAngle =  Math.PI * 2;//right
        //let currentAngle =  Math.PI / 2;//down
        //let currentAngle = Math.PI;//left
        
        pieSlices.forEach((slice) => {
            let sliceAngle = (slice.size / totalSize) * (2 * Math.PI);
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, counterClockwise ? currentAngle - sliceAngle : currentAngle + sliceAngle, counterClockwise);
            ctx.closePath();
            ctx.fillStyle = slice.color;
            ctx.fill();
            counterClockwise ? currentAngle -= sliceAngle : currentAngle += sliceAngle;
        });

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(centerX,centerY,radius,0,2*Math.PI);
        ctx.stroke();
        
      }, []);

    return <canvas ref={canvasRef} width={520} height={390}></canvas>
}

