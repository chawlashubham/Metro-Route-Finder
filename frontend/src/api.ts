import axios from 'axios';
import type { Station, RouteResult } from './types';
import { API_BASE } from './constants';

const http = axios.create({ baseURL: API_BASE });

export async function fetchStations(): Promise<Station[]> {
  const { data } = await http.get<{ data: Station[] }>('/stations');
  return data.data;
}

export async function fetchRoute(from: string, to: string, optimize = 'time'): Promise<RouteResult> {
  const { data } = await http.get<{ data: RouteResult }>('/route', {
    params: { from, to, optimize },
  });
  return data.data;
}
