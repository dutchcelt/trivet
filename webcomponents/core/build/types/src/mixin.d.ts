export function apply(superclass: Function, mixin: MixinFunction): Function;
export function isApplicationOf(proto: Object, mixin: MixinFunction): boolean;
export function hasMixin(o: Object, mixin: MixinFunction): boolean;
export function wrap(mixin: MixinFunction, wrapper: MixinFunction): MixinFunction;
export function unwrap(wrapper: MixinFunction): MixinFunction;
export function Cached(mixin: MixinFunction): MixinFunction;
export function DeDupe(mixin: MixinFunction): MixinFunction;
export function HasInstance(mixin: MixinFunction): MixinFunction;
export function BareMixin(mixin: MixinFunction): MixinFunction;
export function Mixin(mixin: MixinFunction): MixinFunction;
export function mix(superclass?: Function | undefined): MixinBuilder;
/**
 * A function that returns a subclass of its argument.
 */
export type MixinFunction = Function;
declare class MixinBuilder {
    constructor(superclass: any);
    superclass: any;
    /**
     * Applies `mixins` in order to the superclass given to `mix()`.
     *
     * @param {Array.<Mixin>} mixins
     * @return {Function} a subclass of `superclass` with `mixins` applied
     */
    with(...mixins: Array<(mixin: Function) => Function>): Function;
}
export {};
//# sourceMappingURL=mixin.d.ts.map