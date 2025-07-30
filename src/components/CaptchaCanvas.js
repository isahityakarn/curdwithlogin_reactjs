import React, { useEffect, useRef, useCallback, useState } from "react";

const CaptchaCanvas = ({ onCaptchaGenerated }) => {
  const canvasRef = useRef();
  const callbackRef = useRef(onCaptchaGenerated);
  const [timeLeft, setTimeLeft] = useState(60);
  
  // Update the ref when the callback changes
  useEffect(() => {
    callbackRef.current = onCaptchaGenerated;
  }, [onCaptchaGenerated]);

  const drawCaptcha = useCallback((text) => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Safety check
    
    const ctx = canvas.getContext("2d");

    // Clear and set background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add lines as noise
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(0,0,0,${Math.random()})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Add dots as noise
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
    }

    // Draw characters with rotation
    for (let i = 0; i < text.length; i++) {
      const fontSize = 28 + Math.random() * 6;
      ctx.font = `${fontSize}px Verdana`;
      ctx.fillStyle = `rgb(${Math.random()*100},${Math.random()*50},${Math.random()*100})`;

      ctx.save();
      const angle = (Math.random() - 0.5) * 0.5; // Rotate -0.25 to +0.25 radians
      ctx.translate(20 + i * 30, 35);
      ctx.rotate(angle);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  }, []);

  const generateCaptcha = useCallback(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    let generated = "";
    for (let i = 0; i < 6; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    drawCaptcha(generated);
    if (callbackRef.current) callbackRef.current(generated);
  }, [drawCaptcha]);

  useEffect(() => {
    generateCaptcha();
    setTimeLeft(60); // Reset timer
    
    // Countdown timer - update every second
    const countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 60; // Reset to 60 when it reaches 0
        }
        return prev - 1;
      });
    }, 1000);
    
    // Auto-refresh CAPTCHA every 1 minute (60000 ms)
    const refreshInterval = setInterval(() => {
      generateCaptcha();
      setTimeLeft(60); // Reset timer when CAPTCHA refreshes
    }, 60000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(countdownInterval);
      clearInterval(refreshInterval);
    };
  }, [generateCaptcha]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
        <span style={{ fontSize: "14px", color: "#666" }}>
          Auto-refresh in: <strong style={{ color: timeLeft <= 10 ? "#ff4444" : "#007acc" }}>{timeLeft}s</strong>
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={200}
        height={50}
        style={{ border: "1px solid #ccc", borderRadius: "5px", background: "#fff" }}
      />
      <button 
        onClick={() => {
          generateCaptcha();
          setTimeLeft(60); // Reset timer on manual refresh
        }} 
        style={{ marginTop: "5px", padding: "5px 10px", fontSize: "14px" }}
      >
        &#x21bb; Reload CAPTCHA
      </button>
    </div>
  );
};

export default CaptchaCanvas;