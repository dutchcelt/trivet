export const dataBus: EventDataBus;
/**
 * @class EventDataBus
 * Event bus with data store based on registered events
 */
declare class EventDataBus {
    store: {};
    /**
     * Register custom event
     * @param {string} event
     * @param {Function|any} callback - FIX: May not need 'any'
     */
    register(event: string, callback: Function | any): void;
    /**
     * Removed custom event
     * @param {string} event
     * @param {Function|any} callback - FIX: May not need 'any'
     */
    remove(event: string, callback: Function | any): void;
    /**
     * trigger custom event with 'detail' payload
     * @param {string} event
     * @param {Object} [detail={}]
     */
    fire(event: string, detail?: Object | undefined): void;
    #private;
}
export {};
//# sourceMappingURL=dataBus.d.ts.map