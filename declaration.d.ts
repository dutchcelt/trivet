/* Prevent CSS Module imports showing an error */
declare module '*.css';
/* Prevent JSON Module imports showing an error */
declare module '*.json';

interface CSSRule {
  nameList: string[];
}
declare module '@trvt/styles';

// TODO: Try to remove some more ignore/expect error comments
