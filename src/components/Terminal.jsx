import { useState, useEffect, useRef } from 'react'

/*
  Each line is an object:
  { parts: [{ cls, text }], delay: ms before this line starts typing }

  cls options: tc (comment) | tp (prompt) | to (output) |
               ta (info)    | tx (crit)   | ts (success/done)
*/

const LINES = [
  { parts: [{ cls: 'tc', text: '# Target: api.target.com — full scope' }], delay: 0 },
  { parts: [],                                                               delay: 300 },
  { parts: [{ cls: 'tp', text: '$ ' }, { cls: 'to', text: './recon --mode passive --out subs.txt' }], delay: 600 },
  { parts: [{ cls: 'ta', text: '[ INFO ] ' }, { cls: 'to', text: '312 subdomains enumerated' }],      delay: 1400 },
  { parts: [{ cls: 'ta', text: '[ INFO ] ' }, { cls: 'to', text: '47 live hosts confirmed' }],         delay: 2000 },
  { parts: [],                                                                                          delay: 2500 },
  { parts: [{ cls: 'tp', text: '$ ' }, { cls: 'to', text: './probe --fuzz auth --endpoints api_routes.txt' }], delay: 2800 },
  { parts: [{ cls: 'tx', text: '[ CRIT ] ' }, { cls: 'to', text: 'IDOR @ /api/v2/account/{id} — no ownership check' }], delay: 3700 },
  { parts: [{ cls: 'tx', text: '[ CRIT ] ' }, { cls: 'to', text: 'JWT alg:none accepted — auth bypass confirmed' }],    delay: 4400 },
  { parts: [{ cls: 'tx', text: '[ HIGH ] ' }, { cls: 'to', text: 'SSRF via webhook param — AWS metadata exposed' }],    delay: 5000 },
  { parts: [],                                                                                          delay: 5500 },
  { parts: [{ cls: 'tp', text: '$ ' }, { cls: 'to', text: './report --severity p1 --format cvss' }],  delay: 5800 },
  { parts: [{ cls: 'ts', text: '[ DONE ] ' }, { cls: 'to', text: 'CVSS scores: 9.8 / 8.6 / 8.1' }],  delay: 6600 },
  { parts: [{ cls: 'ts', text: '[ DONE ] ' }, { cls: 'to', text: 'Vendor notified — 72h SLA clock started' }], delay: 7200 },
  { parts: [],                                                                                          delay: 7700 },
  { parts: [{ cls: 'tp', text: '$ ' }],                                                                delay: 8000, cursor: true },
]

const CHAR_SPEED = 28 // ms per character

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState([])
  const [started, setStarted]           = useState(false)
  const containerRef                    = useRef(null)
  const timersRef                       = useRef([])

  // Start animation when terminal scrolls into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    LINES.forEach((line, idx) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, { ...line, typed: '', index: idx, done: line.parts.length === 0 }])

        // If line has no parts (empty line), mark done immediately
        if (line.parts.length === 0) return

        // Build full text of last part to typewrite
        const lastPart = line.parts[line.parts.length - 1]
        const fullText = lastPart.text
        let charIdx = 0

        const typeChar = () => {
          charIdx++
          setVisibleLines(prev =>
            prev.map(l =>
              l.index === idx
                ? { ...l, typed: fullText.slice(0, charIdx), done: charIdx >= fullText.length }
                : l
            )
          )
          if (charIdx < fullText.length) {
            const tt = setTimeout(typeChar, CHAR_SPEED)
            timersRef.current.push(tt)
          }
        }

        const tt = setTimeout(typeChar, CHAR_SPEED)
        timersRef.current.push(tt)
      }, line.delay)

      timersRef.current.push(t)
    })

    return () => timersRef.current.forEach(clearTimeout)
  }, [started])

  return (
    <div className="terminal reveal" ref={containerRef}>
      <div className="term-bar">
        <span className="dot dot-r" />
        <span className="dot dot-y" />
        <span className="dot dot-g" />
        <span className="term-title">jotunn :: recon v2.4</span>
      </div>

      {visibleLines.map((line, i) => {
        // Empty line
        if (line.parts.length === 0) return <div className="tl" key={i}>&nbsp;</div>

        const allButLast = line.parts.slice(0, -1)
        const lastPart   = line.parts[line.parts.length - 1]

        return (
          <div className="tl" key={i}>
            {allButLast.map((p, j) => (
              <span className={p.cls} key={j}>{p.text}</span>
            ))}
            <span className={lastPart.cls}>{line.typed}</span>
            {/* blinking cursor on last visible line while typing */}
            {!line.done && i === visibleLines.length - 1 && (
              <span className="term-cursor" />
            )}
            {/* permanent cursor on the final prompt line */}
            {line.cursor && line.done && <span className="term-cursor" />}
          </div>
        )
      })}
    </div>
  )
}
