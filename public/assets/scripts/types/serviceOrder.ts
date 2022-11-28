import { ServicesItem } from "./servicesItem";

export type ServiceOrder = {
    scheduledAt: Date;
    services: ServicesItem[];
}