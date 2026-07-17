/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EngineeringModule = 'design' | 'analysis' | 'test';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export interface BOMItem {
  id: string;
  partNumber: string;
  name: string;
  material: string;
  weight: number;
  quantity: number;
  status: 'valid' | 'invalid' | 'warning';
}

export interface AnalysisResult {
  id: string;
  caseName: string;
  maxStress: number;
  safetyFactor: number;
  status: 'safe' | 'critical' | 'fail';
}

export interface TestSignal {
  id: string;
  timestamp: number;
  value: number;
}

export interface TestEvent {
  id: string;
  type: string;
  timestamp: number;
  magnitude: number;
  description: string;
}
