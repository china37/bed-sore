const heatmapInstance = h337.create({
    container: document.getElementById('heatmapContainer'),
    radius: 40,
    maxOpacity: 0.7,
    minOpacity: 0,
    blur: 0.9,
    gradient: {
      '.3': 'green',
      '.6': 'yellow',
      '1.0': 'red'
    }
  });
  
  // ฟังก์ชันดึงข้อมูลความดันจาก ESP32
  function fetchPressureData() {
    fetch('http://your_esp32_ip_address/pressure')  // ระบุ IP ของ ESP32
      .then(response => response.json())
      .then(data => {
        const pressure = data.pressure;
  
        // แสดงผลข้อมูลใน Heatmap
        const heatmapData = {
          max: 200,
          min: 0,
          data: [{
            x: Math.random() * 600,  // กำหนดตำแหน่ง X ของจุดใน heatmap
            y: Math.random() * 600,  // กำหนดตำแหน่ง Y ของจุดใน heatmap
            value: pressure
          }]
        };
  
        heatmapInstance.setData(heatmapData);  // อัปเดต heatmap ด้วยข้อมูลใหม่
      })
      .catch(error => console.error('Error fetching pressure data:', error));
  }
  
  // เรียกฟังก์ชันทุกๆ 1 วินาที
  setInterval(fetchPressureData, 1000);