import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer'
import './index.css'

function App() {

  let [size, setSize] = useState(0)
  let [numRows, setNumRows] = useState(33)
  let [numCols, setNumCols] = useState(33)
  let [counter, setCounter] = useState(0)
  const [running, setRunning] = useState(false)
  const runningRef = useRef(running)
  runningRef.current = running

  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    ]

  const generateEmptyGrid = () => {
    const rows = []
      for (let i = 0; i < numRows; i++){
        rows.push(Array.from(Array(numCols), () => 0))
      }
      return rows
    }
 
  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i < numRows; i++){
      rows.push(Array.from(Array(numCols), () => 0))
    }
    return rows
  })

  const runSimulation = useCallback(() => {
    if (!runningRef.current){
      return
    }    
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++){
          for (let k = 0; k < numCols; k++){
            let neighbors = 0
            operations.forEach(([x,y]) => {
              const newI = i + x
              const newK = k + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
                neighbors += g[newI][newK]
              }
            })
            
            if (neighbors < 2 || neighbors > 3){
              gridCopy[i][k] = 0
            } else if (g[k][k] === 0 && neighbors ===3){
              gridCopy[i][k] = 1
            }            
          }
        }
      })
    }) 
    setCounter(counter++)
    setTimeout(runSimulation, 500)
  }, [])

  const runFastSimulation = useCallback(() => {
    if (!runningRef.current){
      return
    }    
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++){
          for (let k = 0; k < numCols; k++){
            let neighbors = 0
            operations.forEach(([x,y]) => {
              const newI = i + x
              const newK = k + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
                neighbors += g[newI][newK]
              }
            })
            
            if (neighbors < 2 || neighbors > 3){
              gridCopy[i][k] = 0
            } else if (g[k][k] === 0 && neighbors ===3){
              gridCopy[i][k] = 1
            }            
          }
        }
      })
    }) 
    setCounter(counter++)
    setTimeout(runFastSimulation, 100)
  }, [])

  const runSlowSimulation = useCallback(() => {
    if (!runningRef.current){
      return
    }    
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++){
          for (let k = 0; k < numCols; k++){
            let neighbors = 0
            operations.forEach(([x,y]) => {
              const newI = i + x
              const newK = k + y
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
                neighbors += g[newI][newK]
              }
            })
            
            if (neighbors < 2 || neighbors > 3){
              gridCopy[i][k] = 0
            } else if (g[k][k] === 0 && neighbors ===3){
              gridCopy[i][k] = 1
            }            
          }
        }
      })
    }) 
    setCounter(counter++)
    setTimeout(runSlowSimulation, 1000)
  }, [])

  const pinkMe = () => {
    var body = document.getElementById("fullBody");
    body.classList.toggle("body_toggle")
  }

  const rules = () => {
    window.open("https://docs.google.com/document/d/1lzFEJkdYtdykPgNplpbIguoJAXBvQwt6MIsZliJ2Ljg/edit?usp=sharing", '_blank')
  }

  // const reSize = (size) => {
  //   setNumCols(size)
  //   setGrid(generateEmptyGrid())
  // }

  return (
    <>
      <h1 style={{color:'white'}}>ΖΩΗ</h1>
      <div class="buttons-div">
      <button>Generation: {counter}</button>
      <button onClick={() => {
        setRunning(!running)
        if (!running){
          runningRef.current = true
          runSimulation()
        }
      }}>{running ? 'stop' : 'start'}
      </button>
      <button onClick={() => {
        setRunning(!running)
        if (!running){
          runningRef.current = true
          runFastSimulation()
        }
      }}>{'start fast'}
      </button>
      <button onClick={() => {
        setRunning(!running)
        if (!running){
          runningRef.current = true
          runSlowSimulation()
        }
      }}>{'start slow'}
      </button>
      <button onClick={() => {
        const rows = []
        for (let i = 0; i < numRows; i++){
          rows.push(Array.from(Array(numCols), () => Math.random() > .5 ? 1 : 0))
        }
        setGrid(rows)
      }}
      >
        random
      </button>
      <button onClick={() => {
        window.location.reload(true)
      }}
      >
        reset
      </button>
      <button onClick={pinkMe}>PINK ME!!!</button>
      <button onClick={rules}>about</button>
      </div>
      <h3 style={{color:'white', fontStyle:'italic'}}>to-do: click "random" button above or start clicking below to make your own design</h3>
      {/* <br />
      <label style={{color: 'white'}}>Set the Canvas Size </label>
      <input
        type="text"
        style={{backgroundColor:`#FFFFFF`}}
        value={size}
        onChange={e => setSize(e.target.value)}
      />
      <button onClick={() => {reSize(size)}}>update</button> */}
      <div style={{
        display:'grid',
        justifyContent:'center',
        gridTemplateColumns:`repeat(${numCols},20px)`
        }}>
        {grid.map((rows, i) => 
          rows.map((col, k) => (
            <div 
            key={`${i}-${k}`}
            onClick={() => {
              const newGrid = produce(grid, gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1
              })
              setGrid(newGrid)
              }}
              style={{
                width:20, 
                height:20, 
                backgroundColor: grid[i][k] ? 'white' : 'black',
                border: 'solid 1px black'
              }} 
            />
          ))
        )}
      </div>
    </>
  )
}

export default App;
