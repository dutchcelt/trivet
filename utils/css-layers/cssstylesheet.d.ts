/**
 * cssstylesheet.d.ts
 * trivet
 *
 * @author dutchcelt
 */
export interface CSSStyleSheet {
	readonly styleSheet: CSSStyleSheet;
	readonly CSSRule:
	| CSSRule
	| CSSLayerBlockRule
	| CSSImportRule
	| CSSLayerStatementRule;
	readonly nameList: Array<String> | Map<String, String>;
	readonly CSSLayerStatementRule: CSSLayerStatementRule;
	readonly cssRules: CSSRuleList | Array<CSSRule>;
	readonly CSSRuleList: Map<String, String> | Array<CSSRule>;
	readonly CSSLayerBlockRule: CSSRuleList | CSSRule;
	readonly CSSImportRule: CSSStyleSheet | CSSRule;
	//readonly rule: CSSLayerBlockRule | CSSImportRule | CSSLayerStatementRule | CSSRule;
	readonly ownerRule: CSSRule | null;
	readonly rules: CSSRuleList;
	readonly name: string | null;
	readonly cssText: string | null;
	readonly layerName: string | null;
	forEach(CSSRule: any): void; //FIX: Don't use the type any here. Add the Correct type or create a new typeDef
	//addRule(selector?: string, style?: string, index?: number): number;
	//deleteRule(index: number): void;
	//insertRule(rule: string, index?: number): number;
	//removeRule(index?: number): void;
	//replace(reset_style: string | CSSStyleSheet): Promise<void>;
	//replaceSync(reset_style: string | CSSStyleSheet): void;
}
