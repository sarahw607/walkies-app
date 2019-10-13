export interface RouteLocation {
    latitude: number;
    longitude: number;
    altitude: number;
}

export interface WalkRoute {
    id: number;
    name: string;
    locations?: RouteLocation[];
}