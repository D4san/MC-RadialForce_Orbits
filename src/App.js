import React, { useState, useEffect, useRef } from 'react';
import Latex from 'react-latex';

// Definición de los potenciales disponibles
const potentials = {
  NEWTONIAN: 'Newtoniano',
  MODIFICADO: 'Modificado',
  RELATIVISTA: 'Relativista',
  COULOMB: 'Coulombiano',
};

function App() {
  const [selectedPotential, setSelectedPotential] = useState(potentials.NEWTONIAN);
  const [gm, setGm] = useState(1);
  const [exponente, setExponente] = useState(1.7);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [centerOnSun, setCenterOnSun] = useState(false);
  const [q1, setQ1] = useState(1);
  const [q2, setQ2] = useState(1);

  // Función para reiniciar parámetros
  const resetParameters = () => {
    setGm(1);
    setExponente(1.7);
    setSimulationSpeed(1);
    setZoom(1);
    setCenterOnSun(false);
    setQ1(1);
    setQ2(1);
  };

  // Función que genera las ecuaciones en LaTeX
  const renderEquations = () => {
    switch (selectedPotential) {
      case potentials.NEWTONIAN:
        return (
          <div>
            <h3>Ecuaciones</h3>
            <p>
              <Latex strict={false}>{`$V(r) = - \\frac{${gm}}{r}$`}</Latex>
            </p>
            <p>
              <Latex strict={false}>{`$F = - \\frac{${gm}}{r^2} \\hat{r}$`}</Latex>
            </p>
            <p>
              <Latex strict={false}>{`$a = - \\frac{${gm}\\,r}{r^3}$`}</Latex>
            </p>
          </div>
        );
      case potentials.MODIFICADO:
        return (
          <div>
            <h3>Ecuaciones</h3>
            <p>
              <Latex strict={false}>{`$V(r) = - \\frac{${gm}}{r^{${exponente}}}$`}</Latex>
            </p>
            <p>
              <Latex strict={false}>
                {`$F = - \\frac{${gm}\\cdot ${exponente}}{r^{${(exponente + 1).toFixed(2)}}} \\hat{r}$`}
              </Latex>
            </p>
            <p>
              <Latex strict={false}>
                {`$a = - \\frac{${gm}\\cdot ${exponente}\\,r}{r^{${(exponente + 2).toFixed(2)}}}$`}
              </Latex>
            </p>
          </div>
        );
      case potentials.RELATIVISTA:
        return (
          <div>
            <h3>Ecuaciones</h3>
            <p>
              <Latex strict={false}>
                {`$V(r) \\approx - \\frac{${gm}}{r} + \\frac{\\beta}{r^3}$`}
              </Latex>
            </p>
            <p>
              <Latex strict={false}>
                {`$F = - \\frac{${gm}}{r^2} \\hat{r} + \\frac{3\\beta}{r^4} \\hat{r}$`}
              </Latex>
            </p>
            <p>
              <Latex strict={false}>
                {`$a = - \\frac{${gm}\\,r}{r^3} + \\frac{3\\beta\\,r}{r^5}$`}
              </Latex>
            </p>
          </div>
        );
      case potentials.COULOMB:
        return (
          <div>
            <h3>Ecuaciones</h3>
            <p>
              <Latex strict={false}>{`$V(r) = \\frac{k\\,q_1\\,q_2}{r}$`}</Latex>
            </p>
            <p>
              <Latex strict={false}>{`$F = \\frac{k\\,q_1\\,q_2}{r^2} \\hat{r}$`}</Latex>
            </p>
            <p>
              <Latex strict={false}>{`$a = \\frac{k\\,q_1\\,q_2\\,r}{r^3}$`}</Latex>
            </p>
            <p>
              <Latex strict={false}>{`$k = 1$`}</Latex>
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        .slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: #ddd;
          outline: none;
          opacity: 0.8;
          transition: opacity 0.2s;
          border-radius: 3px;
          margin: 10px 0;
        }
        .slider:hover {
          opacity: 1;
        }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #4CAF50;
          cursor: pointer;
        }
        .control-panel select {
          width: 100%;
          padding: 5px;
          border-radius: 4px;
          border: none;
        }
        .reset-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
        }
        .reset-button:hover {
          background-color: #45a049;
        }
        .equations-overlay {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 10px;
          border-radius: 8px;
          max-width: 90%;
          font-family: monospace;
          font-size: 0.9em;
        }
      `}</style>
      <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <h1 style={{ textAlign: 'center' }}>Simulación de Órbitas Planetarias</h1>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {/* Contenedor del canvas con overlay para las ecuaciones */}
          <div style={{ position: 'relative', width: '600px', height: '600px' }}>
            <OrbitCanvas 
              potential={selectedPotential} 
              gm={gm}
              exponente={exponente} 
              simulationSpeed={simulationSpeed} 
              zoom={zoom}
              centerOnSun={centerOnSun}
              q1={q1}
              q2={q2}
            />
            <div className="equations-overlay">
              {renderEquations()}
            </div>
          </div>
          {/* Panel de controles */}
          <div className="control-panel" style={{ width: '300px', padding: '20px', backgroundColor: '#333', borderRadius: '8px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="potential-select" style={{ display: 'block', marginBottom: '5px' }}>
                Selecciona el potencial:
              </label>
              <select
                id="potential-select"
                value={selectedPotential}
                onChange={(e) => setSelectedPotential(e.target.value)}
              >
                <option value={potentials.NEWTONIAN}>Newtoniano</option>
                <option value={potentials.MODIFICADO}>Modificado</option>
                <option value={potentials.RELATIVISTA}>Relativista</option>
                <option value={potentials.COULOMB}>Coulombiano</option>
              </select>
            </div>

            {selectedPotential !== potentials.COULOMB && (
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="gm-range" style={{ display: 'block', marginBottom: '5px' }}>
                  Parámetro GM: {gm.toFixed(2)}
                </label>
                <input
                  id="gm-range"
                  type="range"
                  className="slider"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={gm}
                  onChange={(e) => setGm(parseFloat(e.target.value))}
                />
              </div>
            )}

            {selectedPotential === potentials.MODIFICADO && (
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="exponente-range" style={{ display: 'block', marginBottom: '5px' }}>
                  Exponente (p): {exponente.toFixed(2)}
                </label>
                <input
                  id="exponente-range"
                  type="range"
                  className="slider"
                  min="1.7"
                  max="2.2"
                  step="0.01"
                  value={exponente}
                  onChange={(e) => setExponente(parseFloat(e.target.value))}
                />
              </div>
            )}

            {selectedPotential === potentials.COULOMB && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="q1-range" style={{ display: 'block', marginBottom: '5px' }}>
                    Carga q₁: {q1.toFixed(2)}
                  </label>
                  <input
                    id="q1-range"
                    type="range"
                    className="slider"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={q1}
                    onChange={(e) => setQ1(parseFloat(e.target.value))}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="q2-range" style={{ display: 'block', marginBottom: '5px' }}>
                    Carga q₂: {q2.toFixed(2)}
                  </label>
                  <input
                    id="q2-range"
                    type="range"
                    className="slider"
                    min="-10"
                    max="10"
                    step="0.1"
                    value={q2}
                    onChange={(e) => setQ2(parseFloat(e.target.value))}
                  />
                </div>
              </>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="speed-range" style={{ display: 'block', marginBottom: '5px' }}>
                Velocidad de simulación: {simulationSpeed}x
              </label>
              <input
                id="speed-range"
                type="range"
                className="slider"
                min="0.1"
                max="5"
                step="0.1"
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(parseFloat(e.target.value))}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="zoom-range" style={{ display: 'block', marginBottom: '5px' }}>
                Zoom: {zoom.toFixed(2)}x
              </label>
              <input
                id="zoom-range"
                type="range"
                className="slider"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="center-toggle" style={{ display: 'block', marginBottom: '5px' }}>
                Centrar en el Sol:
              </label>
              <input
                id="center-toggle"
                type="checkbox"
                checked={centerOnSun}
                onChange={(e) => setCenterOnSun(e.target.checked)}
              />{" "}
              (Desmarcar para centrar en el planeta)
            </div>

            <button className="reset-button" onClick={resetParameters}>
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function OrbitCanvas({ potential, gm, exponente, simulationSpeed, zoom, centerOnSun, q1, q2 }) {
  const canvasRef = useRef(null);
  const width = 600;
  const height = 600;
  
  // Refs para mantener actualizados ciertos parámetros sin reiniciar la animación
  const simulationSpeedRef = useRef(simulationSpeed);
  const zoomRef = useRef(zoom);
  const centerOnSunRef = useRef(centerOnSun);
  
  useEffect(() => { simulationSpeedRef.current = simulationSpeed; }, [simulationSpeed]);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);
  useEffect(() => { centerOnSunRef.current = centerOnSun; }, [centerOnSun]);

  // Generar un campo estelar fijo
  const starsRef = useRef([]);
  useEffect(() => {
    const numStars = 200;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }
    starsRef.current = stars;
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Constantes físicas
    const beta = 0.01; // Para potencial relativista
    const k = 1;       // Para Coulomb

    // Condiciones iniciales del planeta
    let x = 200;
    let y = 0;
    let r = Math.sqrt(x * x + y * y);
    let v = Math.sqrt(gm / r);
    let vx = 0;
    let vy = v;
    
    const trail = [];
    let animationFrameId;

    function update() {
      r = Math.sqrt(x * x + y * y);
      const dt = 12.0 * simulationSpeedRef.current;
      let ax = 0, ay = 0;
      
      switch (potential) {
        case potentials.NEWTONIAN:
          ax = -gm * x / Math.pow(r, 3);
          ay = -gm * y / Math.pow(r, 3);
          break;
        case potentials.MODIFICADO:
          ax = -gm * exponente * x / Math.pow(r, exponente + 1);
          ay = -gm * exponente * y / Math.pow(r, exponente + 1);
          break;
        case potentials.RELATIVISTA:
          ax = -gm * x / Math.pow(r, 3) + 3 * beta * x / Math.pow(r, 5);
          ay = -gm * y / Math.pow(r, 3) + 3 * beta * y / Math.pow(r, 5);
          break;
        case potentials.COULOMB:
          ax = (k * q1 * q2) * x / Math.pow(r, 3);
          ay = (k * q1 * q2) * y / Math.pow(r, 3);
          break;
        default:
          break;
      }
      
      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;
      
      trail.push({ x, y, alpha: 1.0 });
      if (trail.length > 5000) {
        trail.shift();
      }
      trail.forEach((point, index) => {
        point.alpha = Math.pow(index / trail.length, 0.7);
      });
    }
    
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fill();
      });
      
      const cx = width / 2, cy = height / 2;
      let transform;
      if (centerOnSunRef.current) {
        transform = (pos) => ({
          x: cx + pos.x * zoomRef.current,
          y: cy + pos.y * zoomRef.current,
        });
      } else {
        transform = (pos) => ({
          x: cx + (pos.x - x) * zoomRef.current,
          y: cy + (pos.y - y) * zoomRef.current,
        });
      }
      
      const sunPos = transform({ x: 0, y: 0 });
      const sunGradient = ctx.createRadialGradient(
        sunPos.x, sunPos.y, 0,
        sunPos.x, sunPos.y, 20 * zoomRef.current
      );
      sunGradient.addColorStop(0, 'rgba(255,200,0,0.8)');
      sunGradient.addColorStop(1, 'rgba(255,200,0,0)');
      ctx.beginPath();
      ctx.fillStyle = sunGradient;
      ctx.arc(sunPos.x, sunPos.y, 20 * zoomRef.current, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'orange';
      ctx.arc(sunPos.x, sunPos.y, 10 * zoomRef.current, 0, 2 * Math.PI);
      ctx.fill();
      
      for (let i = 1; i < trail.length; i++) {
        const prev = transform({ x: trail[i - 1].x, y: trail[i - 1].y });
        const curr = transform({ x: trail[i].x, y: trail[i].y });
        ctx.beginPath();
        ctx.strokeStyle = `rgba(128, 128, 128, ${trail[i].alpha})`;
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.stroke();
      }
      
      const planetPos = centerOnSunRef.current ? transform({ x, y }) : { x: cx, y: cy };
      const earthGradient = ctx.createRadialGradient(
        planetPos.x, planetPos.y, 0,
        planetPos.x, planetPos.y, 12 * zoomRef.current
      );
      earthGradient.addColorStop(0, 'rgba(0,150,255,0.5)');
      earthGradient.addColorStop(1, 'rgba(0,150,255,0)');
      ctx.beginPath();
      ctx.fillStyle = earthGradient;
      ctx.arc(planetPos.x, planetPos.y, 12 * zoomRef.current, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.arc(planetPos.x, planetPos.y, 5 * zoomRef.current, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    function animate() {
      update();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [potential, gm, exponente, q1, q2]);
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid #555', background: '#000' }}
    />
  );
}

export default App;
