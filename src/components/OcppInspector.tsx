import React, { useState, useEffect } from 'react'
import { Activity, Zap, CheckCircle2, AlertTriangle, RefreshCw, Terminal as TerminalIcon, ShieldCheck, Radio } from 'lucide-react'

interface OcppFrame {
  id: string
  timestamp: string
  direction: 'IN' | 'OUT'
  action: 'MeterValues' | 'Heartbeat' | 'StatusNotification' | 'BootNotification' | 'FaultTimeout'
  rawJson: string
  explanation: string
  status: 'ok' | 'alert' | 'info'
}

export const OcppInspector: React.FC = () => {
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0)
  const [powerKw, setPowerKw] = useState<number>(128.4)
  const [socPct, setSocPct] = useState<number>(64)
  const [voltage, setVoltage] = useState<number>(402)
  const [current, setCurrent] = useState<number>(319)
  const [connectionStatus, setConnectionStatus] = useState<'ONLINE' | 'SIMULATING_ALERT' | 'HEALTHY'>('HEALTHY')
  const [alertFired, setAlertFired] = useState<boolean>(false)

  const sampleFrames: OcppFrame[] = [
    {
      id: 'msg-882194',
      timestamp: '14:28:02.114',
      direction: 'IN',
      action: 'MeterValues',
      rawJson: JSON.stringify(
        [
          2,
          'msg-882194',
          'MeterValues',
          {
            connectorId: 1,
            transactionId: 98124,
            meterValue: [
              {
                timestamp: '2026-09-23T14:28:02.110Z',
                sampledValue: [
                  { value: '128.4', unit: 'kW', measurand: 'Power.Active.Import' },
                  { value: '402.0', unit: 'V', measurand: 'Voltage' },
                  { value: '319.4', unit: 'A', measurand: 'Current.Import' },
                  { value: '64', unit: 'Percent', measurand: 'SoC' },
                  { value: '42890', unit: 'Wh', measurand: 'Energy.Active.Import.Register' },
                ],
              },
            ],
          },
        ],
        null,
        2
      ),
      explanation:
        'C# Backend receives high-frequency telemetry. Deserializes JSON-RPC via System.Text.Json, calculates power ramp delta, and stores time-series metric via asynchronous batch queue.',
      status: 'ok',
    },
    {
      id: 'msg-882195',
      timestamp: '14:28:07.410',
      direction: 'IN',
      action: 'StatusNotification',
      rawJson: JSON.stringify(
        [
          2,
          'msg-882195',
          'StatusNotification',
          {
            connectorId: 1,
            errorCode: 'NoError',
            status: 'Charging',
            info: 'DC Fast Charge Session In Progress — CCS1 200A',
            timestamp: '2026-09-23T14:28:07.408Z',
          },
        ],
        null,
        2
      ),
      explanation:
        'Finite State Machine (FSM) verification. Station state confirmed as "Charging". Updates GraphQL subscription event bus to inform front-office portal users with zero page reload.',
      status: 'ok',
    },
    {
      id: 'msg-882196',
      timestamp: '14:28:12.890',
      direction: 'IN',
      action: 'Heartbeat',
      rawJson: JSON.stringify([2, 'msg-882196', 'Heartbeat', {}], null, 2),
      explanation:
        'Periodic keepalive ping. Central system records station timestamp in in-memory watchdog dictionary and replies with synchronized UTC server time (Round-trip: 18ms).',
      status: 'ok',
    },
    {
      id: 'msg-882197',
      timestamp: '14:28:18.002',
      direction: 'IN',
      action: 'BootNotification',
      rawJson: JSON.stringify(
        [
          2,
          'msg-882197',
          'BootNotification',
          {
            chargePointVendor: 'ABB',
            chargePointModel: 'Terra 184 UL',
            chargePointSerialNumber: 'ABB-184-CA-0042',
            firmwareVersion: 'v4.2.1-ZIE-NET8',
            iccid: '8901410321159821389',
          },
        ],
        null,
        2
      ),
      explanation:
        'New hardware handshake. Validates site-specific tenant authorization, reads active configuration keys, and responds with registration status "Accepted" with 60s heartbeat interval.',
      status: 'ok',
    },
    {
      id: 'msg-882198',
      timestamp: '14:28:24.770',
      direction: 'OUT',
      action: 'FaultTimeout',
      rawJson: JSON.stringify(
        {
          event: 'TIMEOUT_TRIGGERED',
          stationId: 'ABB-184-CA-0042',
          missingHeartbeatWindowSec: 90,
          diagnostic: 'Connection abruptly dropped (TCP Reset / LTE Signal Lost)',
          automatedResponse: {
            alertDispatched: true,
            recipient: 'noc-operations@zeroimpactenergy.com',
            stationStatus: 'OfflineUnhealthy',
            retryQueueScheduled: 'ExponentialBackoff(5s, 15s, 60s)',
          },
        },
        null,
        2
      ),
      explanation:
        'Simulated Field Outage: Backend watchdog detects missing heartbeat beyond tolerance threshold. Invokes automated exception handling and dispatches urgent NOC alert email without blocking worker threads.',
      status: 'alert',
    },
  ]

  const currentFrame = sampleFrames[activeFrameIndex]

  // Simulate slight live telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      if (connectionStatus === 'HEALTHY' && activeFrameIndex === 0) {
        setPowerKw((prev) => +(prev + (Math.random() * 2 - 1)).toFixed(1))
        setCurrent((prev) => Math.round(prev + (Math.random() * 4 - 2)))
      }
    }, 2800)
    return () => clearInterval(interval)
  }, [connectionStatus, activeFrameIndex])

  const selectFrame = (index: number) => {
    setActiveFrameIndex(index)
    if (sampleFrames[index].action === 'FaultTimeout') {
      setConnectionStatus('SIMULATING_ALERT')
      setAlertFired(true)
    } else {
      setConnectionStatus('HEALTHY')
      setAlertFired(false)
      if (index === 0) {
        setPowerKw(128.4)
        setSocPct(64)
      } else if (index === 1) {
        setPowerKw(135.0)
        setSocPct(68)
      }
    }
  }

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#0c1017] p-4 sm:p-6 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Console Diagnostic Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
            <Radio className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tracking-wider text-slate-400 uppercase">Interactive Inspector</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                OCPP 1.6-J
              </span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              EVOLV Telemetry Engine Simulator
              <span className="text-xs font-mono font-normal text-slate-500 hidden sm:inline">
                [ABB-184-CA-0042 • 1,000+ Concurrency Layer]
              </span>
            </h3>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {connectionStatus === 'HEALTHY' ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 px-2.5 py-1 text-emerald-400 border border-emerald-800/60">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              WEBSOCKET: ACTIVE (18ms)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-950/80 px-2.5 py-1 text-amber-400 border border-amber-800/60">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
              WATCHDOG: ALERT DISPATCHED
            </span>
          )}
        </div>
      </div>

      {/* Frame Trigger Buttons */}
      <div className="mb-4">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
          <span>Select Packet to Inject & Observe Backend Handling:</span>
          <span className="text-slate-500 text-[10px] hidden md:inline">Click any message type below</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {sampleFrames.map((frame, idx) => {
            const isSelected = activeFrameIndex === idx
            return (
              <button
                key={frame.id}
                onClick={() => selectFrame(idx)}
                className={`flex flex-col text-left p-2.5 rounded-lg border text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? frame.action === 'FaultTimeout'
                      ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow-md shadow-amber-950/50'
                      : 'border-cyan-500 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-950/50'
                    : 'border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] opacity-70">0{idx + 1}</span>
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
                </div>
                <span className="font-semibold truncate">{frame.action}</span>
                <span className="text-[10px] opacity-60 truncate">
                  {frame.action === 'FaultTimeout' ? 'Watchdog Alert' : frame.action === 'MeterValues' ? '128 kW Telemetry' : 'Protocol Frame'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main split inspection screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: JSON Packet Inspector */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-3.5 w-3.5 text-cyan-400" />
              <span>RAW OCPP 1.6 FRAME</span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-cyan-400">{currentFrame.direction === 'IN' ? '▲ CLIENT_PAYLOAD' : '▼ SERVER_DISPATCH'}</span>
            </div>
            <span className="text-slate-500 text-[11px]">{currentFrame.timestamp} UTC</span>
          </div>

          <div className="p-3.5 font-mono text-xs overflow-x-auto text-slate-300 max-h-72 leading-relaxed bg-[#070a0f]">
            <pre className="text-cyan-300/90 selection:bg-cyan-900/50">
              <code>{currentFrame.rawJson}</code>
            </pre>
          </div>

          {/* Backend Handling Explanation */}
          <div className="border-t border-slate-800/80 bg-slate-900/40 p-3 text-xs">
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[11px] font-semibold text-emerald-300 block mb-0.5">
                  .NET Core Backend Ingestion Architecture:
                </span>
                <p className="text-slate-400 leading-normal">{currentFrame.explanation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Hardware Telemetry Gauges */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Station Live Gauges</span>
              <span className="text-[10px] font-mono text-slate-500">Node: ABB-184 kW DCFC</span>
            </div>

            {/* Metric Displays */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Zap className="h-3 w-3 text-cyan-400" /> Active Power
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">kW</span>
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                  {connectionStatus === 'SIMULATING_ALERT' ? '0.0' : powerKw}
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${connectionStatus === 'SIMULATING_ALERT' ? 0 : Math.min(100, (powerKw / 180) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Activity className="h-3 w-3 text-emerald-400" /> State of Charge
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">%</span>
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                  {connectionStatus === 'SIMULATING_ALERT' ? '--' : `${socPct}%`}
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${connectionStatus === 'SIMULATING_ALERT' ? 0 : socPct}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 mb-1">Voltage (DC Bus)</div>
                <div className="text-xl font-bold font-mono text-slate-200 tabular-nums">
                  {connectionStatus === 'SIMULATING_ALERT' ? '0 V' : `${voltage} V`}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">400V Class Pack</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 mb-1">Current (Amps)</div>
                <div className="text-xl font-bold font-mono text-slate-200 tabular-nums">
                  {connectionStatus === 'SIMULATING_ALERT' ? '0 A' : `${current} A`}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Liquid-Cooled Cable</div>
              </div>
            </div>

            {/* Protocol Spec verification */}
            <div className="rounded-lg bg-slate-950/40 p-3 border border-slate-800/60 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px]">Heartbeat Interval:</span>
                <span className="text-slate-300">60 seconds</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px]">Serialization:</span>
                <span className="text-cyan-400">System.Text.Json (zero-alloc)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px]">Network Reliability:</span>
                <span className="text-emerald-400">99.98% Uptime</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Production Architecture: Zero Impact Energy</span>
            <button
              onClick={() => selectFrame(0)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="h-3 w-3" /> Reset Flow
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
