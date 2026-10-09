let myChart = null;

function calculate() {
    const u = parseFloat(document.getElementById('u').value) || 0;
    const a = parseFloat(document.getElementById('a').value) || 0;
    const t = parseFloat(document.getElementById('t').value) || 0;
    const numSamples = parseInt(document.getElementById('interval').value) || 10;

    // คำนวณ ระยะทาง (s) ที่เวลา t
    const displacementAtT = (u * t) + (0.5 * a * t * t);
    document.getElementById('s').value = displacementAtT.toFixed(2);

    // ปรับเวลาสูงสุดเป็น 2 เท่าของ t เพื่อให้จุด t อยู่ตรงกลางกราฟพอดี
    const maxTime = t * 2;
    const timeStep = maxTime / numSamples;

    let timeData = [];
    let displacementData = [];
    let pointColors = [];
    let pointRadii = [];

    let targetIndex = -1;
    let minDiff = Infinity;

    // หาจุดที่ใกล้กับเวลา t มากที่สุดเพื่อใส่จุดสีแดง
    for (let i = 0; i <= numSamples; i++) {
        let currentTime = i * timeStep;
        let diff = Math.abs(currentTime - t);
        if (diff < minDiff) {
            minDiff = diff;
            targetIndex = i;
        }
    }

    for (let i = 0; i <= numSamples; i++) {
        let currentTime = i * timeStep;
        let currentS = (u * currentTime) + (0.5 * a * currentTime * currentTime);

        timeData.push(currentTime.toFixed(1));
        displacementData.push(currentS);

        if (i === targetIndex) {
            pointColors.push('red');
            pointRadii.push(6);
        } else {
            pointColors.push('#4bc0c0');
            pointRadii.push(3);
        }
    }

    // วาดกราฟใหม่
    const ctx = document.getElementById('myChart').getContext('2d');
    
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,
            datasets: [{
                label: 's = ut + (1/2)at^2',
                data: displacementData,
                borderColor: '#4bc0c0',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointBackgroundColor: pointColors,
                pointBorderColor: pointColors,
                pointRadius: pointRadii,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (t)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Displacement (s)'
                    }
                }
            }
        }
    });
}

// คำนวณครั้งแรกเมื่อโหลดหน้าเว็บ
window.onload = calculate;
