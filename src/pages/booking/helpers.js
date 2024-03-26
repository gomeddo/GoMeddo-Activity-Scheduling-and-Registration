import { Reservation } from "@gomeddo/sdk";
/**
 * Helper function to build a new Reservation object in absence of the
 * constructor for Reservation within the SDK.
 * 
 * @param {Object} obj - The input object; expects fields matching the Reservation attributes.
 * @returns {Reservation} - The new Reservation object.
 */  

export function buildReservationObj(obj) {
    //Create a new Reservation object
    const reservation = new Reservation();

    //Assign properties from the input object to the Reservation object
    reservation.contact = obj.contact;
    reservation.customProperties = obj.customProperties;
    reservation.endDateTime = obj.endDateTime;
    reservation.id = obj.id;
    reservation.lead = obj.lead;
    reservation.relatedRecords = obj.relatedRecords;
    reservation.removedRelatedRecords = obj.removedRelatedRecords;
    reservation.resource = obj.resource;
    reservation.serviceReservations = obj.serviceReservations;
    reservation.startDateTime = obj.startDateTime;

    //Return the newly constructed Reservation Object
    return reservation;
}