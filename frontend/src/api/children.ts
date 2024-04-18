import axios from "axios";
import { Child } from "../types/models";

const axiosInstance = axios.create({
  baseURL: "https://app.famly.co/api",
});

// Adds `accessToken` to every request
axiosInstance.interceptors.request.use((config) => {
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

  switch (config.method?.toUpperCase()) {
    case "GET":
      config.params = { ...config.params, accessToken };
      break;

    case "POST":
      config.data = { ...config.data, accessToken };
      break;

    default:
      break;
  }

  return config;
});

export type ChildrenListPayload = {
  signal: AbortSignal;
  groupId: string;
  institutionId: string;
};

export type ChildrenListResponse = {
  children: Child[];
};

// Calls GET https://app.famly.co/api/daycare/tablet/group
export async function childrenList(payload: ChildrenListPayload) {
  try {
    const response = await axiosInstance.get("/daycare/tablet/group", {
      params: {
        groupId: payload.groupId,
        institutionId: payload.institutionId,
      },
      signal: payload.signal,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to list children. ${error}`);
  }
}

export type ChildCheckInPayload = {
  childId: string;
  pickupTime: string;
};

export type ChlidCheckInResponse = unknown;

// Calls POST https://app.famly.co/api/v2/children/<childId>/checkins
export async function childCheckIn(payload: ChildCheckInPayload) {
  try {
    const response = await axiosInstance.post<ChlidCheckInResponse>(
      `/v2/children/${payload.childId}/checkins`,
      {
        pickupTime: payload.pickupTime,
      }
    );

    return response;
  } catch (error) {
    // {"error":"Pickup time must be later than now","errorCode":1423656701,"statusCode":400,"log":false}
    throw new Error(`Failed to check in child with ID '${payload.childId}'`);
  }
}

export type ChildCheckOutPayload = { childId: string };

export type ChlidCheckOutResponse = unknown;

// Calls POST https://app.famly.co/api/v2/children/<childId>/checkout
export async function childCheckOut(payload: ChildCheckOutPayload) {
  try {
    const response = await axiosInstance.post<ChlidCheckOutResponse>(
      `/v2/children/${payload.childId}/checkout`
    );

    return response;
  } catch (error) {
    throw new Error(`Failed to check out child with ID '${payload.childId}'`);
  }
}
