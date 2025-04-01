import{Data as o}from"./index-CO5fj62K.js";import"./index-Cn3SoNxE.js";function y(t,e,r){let n=0;do{const s=w(t,n,e,r);if(s!==null)n=s;else return!1}while(n<t.length);return!0}function w(t,e,r,n){for(const s of r){s.regex.lastIndex=e;const i=s.regex.exec(t);if(i&&i.index===e)return s.processor(i,n)?s.regex.lastIndex:null}return null}const m={kill:I,arena:x,area:E,enter:R,logout:b,waypoint:S,waypoint_get:$,portal:W,quest:O,quest_text:D,generic:P,reward_quest:T,reward_vendor:N,trial:j,ascend:M,crafting:q,dir:L,copy:G},v=[{regex:/( *#.*)/g,processor:()=>!0},{regex:/[^{#]+/g,processor:(t,{fragments:e})=>(e.push(t[0]),!0)},{regex:/\{(.+?)\}/g,processor:(t,e)=>{const r=t[1].split("|"),n=m[r[0]],s=n(r,e);return typeof s=="string"?e.logger.error(s):e.fragments.push(s.fragment),!0}}];function A(t,e,r){const n={state:e,fragments:[],logger:r};return y(t,v,n)||r.error("invalid syntax"),n.fragments}function f(t,e){e.is_town_area&&(t.lastTownAreaId=e.id,e.has_waypoint&&t.implicitWaypoints.add(e.id)),t.currentAreaId=e.id}const a="invalid format",g="area does not exist",_="area does not have a waypoint";function I(t,{state:e,logger:r}){if(t.length!=2)return a;const n=t[1],s=o.KillWaypoints[n];if(s)for(const i of s)e.implicitWaypoints.add(i);return{fragment:{type:"kill",value:n}}}function x(t,{state:e,logger:r}){return t.length!=2?a:{fragment:{type:"arena",value:t[1]}}}function E(t,{state:e,logger:r}){if(t.length!=2)return a;const n=o.Areas[t[1]];return n?{fragment:{type:"area",areaId:n.id}}:g}function R(t,{state:e,logger:r}){if(t.length!=2)return a;const n=o.Areas[t[1]];return n?(n.connection_ids.some(s=>s==e.currentAreaId)||r.warn("not connected to current area"),f(e,n),{fragment:{type:"enter",areaId:n.id}}):g}function b(t,{state:e,logger:r}){if(t.length!=1)return a;const n=o.Areas[e.lastTownAreaId];return f(e,n),e.portalAreaId=null,{fragment:{type:"logout",areaId:n.id}}}function S(t,{state:e,logger:r}){{if(t.length!=1&&t.length!=2)return a;if(t.length==2){const n=o.Areas[t[1]];if(!n)return g;!e.implicitWaypoints.has(n.id)&&!e.explicitWaypoints.has(n.id)&&r.warn("missing waypoint");const s=o.Areas[e.currentAreaId];return s.has_waypoint||r.warn(_),e.implicitWaypoints.add(s.id),e.usedWaypoints.add(n.id),f(e,n),{fragment:{type:"waypoint_use",dstAreaId:n.id,srcAreaId:s.id}}}return{fragment:{type:"waypoint"}}}}function $(t,{state:e,logger:r}){if(t.length!=1)return a;const n=o.Areas[e.currentAreaId];return n?(n.has_waypoint||r.warn(_),e.implicitWaypoints.has(n.id)&&r.warn("waypoint already acquired"),e.explicitWaypoints.add(n.id),{fragment:{type:"waypoint_get"}}):g}function W(t,{state:e,logger:r}){if(t.length!=2)return a;const n=o.Areas[e.currentAreaId];switch(t[1]){case"set":return n.is_town_area?"portal cannot be set":(e.portalAreaId=e.currentAreaId,{fragment:{type:"portal_set"}});case"use":{if(e.portalAreaId!=n.id&&!n.is_town_area&&(e.portalAreaId=n.id),!e.portalAreaId)return"portal not set";const s=o.Areas[e.portalAreaId];if(n.id==s.id){if(!n.parent_town_area_id)return"cannot use portal in this area";const i=o.Areas[n.parent_town_area_id];f(e,i)}else if(n.id==s.parent_town_area_id)f(e,s),e.portalAreaId=null;else return"can only use portal from town or portal area";return{fragment:{type:"portal_use",dstAreaId:e.currentAreaId}}}}return a}function T(t,{state:e,logger:r}){return t.length!=2?a:(o.Areas[e.currentAreaId].is_town_area||r.warn("quest_reward used outside of town"),{fragment:{type:"reward_quest",item:t[1]}})}function N(t,{state:e,logger:r}){return t.length!=2&&t.length!=3?a:(o.Areas[e.currentAreaId].is_town_area||r.warn("reward_vendor used outside of town"),{fragment:{type:"reward_vendor",item:t[1],cost:t.length==3?t[2]:void 0}})}function P(t,{state:e,logger:r}){return t.length!=2?a:{fragment:{type:"generic",value:t[1]}}}function q(t,{state:e,logger:r}){if(t.length>2)return a;let n;if(t.length==1)n=o.Areas[e.currentAreaId];else if(n=o.Areas[t[1]],!n)return g;return n.crafting_recipes.length==0&&r.warn(`no crafting recipe in area ${n.id}`),e.craftingAreas.add(n.id),{fragment:{type:"crafting",crafting_recipes:n.crafting_recipes}}}function L(t,{state:e,logger:r}){if(t.length!=2)return a;const n=Number.parseFloat(t[1]);if(Number.isNaN(n))return"dir value is not a number";let s=n%360;return s<0&&(s+=360),s%45!=0?"dir value must be in intervals of 45":{fragment:{type:"dir",dirIndex:Math.floor(s/45)}}}function O(t,{state:e,logger:r}){{if(t.length<2)return a;const n=t[1],s=o.Quests[n];if(!s)return"invalid quest id";let i;if(t.length==2)i=Object.keys(s.reward_offers);else{i=[];for(let u=2;u<t.length;u++)i.push(t[u])}return{fragment:{type:"quest",questId:t[1],rewardOffers:i}}}}function D(t,{state:e,logger:r}){return t.length!=2?a:{fragment:{type:"quest_text",value:t[1]}}}function j(t,{state:e,logger:r}){return t.length!=1?a:{fragment:{type:"trial"}}}function M(t,{state:e,logger:r}){if(t.length!=2)return a;const n="Labyrinth_Airlock";if(o.Areas[e.currentAreaId].id!=n){const u=o.Areas[n];r.warn(`must be in "${u.name}"`)}const i=o.Areas[e.lastTownAreaId];return f(e,i),{fragment:{type:"ascend",version:t[1]}}}function G(t,{state:e,logger:r}){return t.length<=1?a:{fragment:{type:"copy",text:t.slice(1).join("")}}}class Q{constructor(){this.scopes=[],this.logs=[]}pushScope(e){this.scopes.push(e)}popScope(){this.scopes.pop()}withScope(e,r){this.pushScope(e),r(),this.popScope()}buildPrefix(){return this.scopes.length>0?`${this.scopes.join(", ")}: `:""}warn(e){this.logs.push({type:"warning",msg:`${this.buildPrefix()}${e}`})}error(e){this.logs.push({type:"error",msg:`${this.buildPrefix()}${e}`})}drain(e){for(const r of this.logs)switch(r.type){case"warning":e.warn(r.msg);break;case"error":e.error(r.msg);break;default:e.log(r.msg);break}this.logs.length=0,this.scopes.length!==0&&e.warn(`expected 0 scopes got ${this.scopes.length}, ${this.scopes.join(", ")}`)}}const h="Default";function K(t){const e=[];for(const r of t){const n=r.split(/\r\n|\r|\n/g);for(let s=0;s<n.length;s++){const i=n[s],l=/^ *#section *(.*)/g.exec(i);if(l){const p=l[1]||h;e.push({name:p,contents:`#section ${p}`});continue}e.length==0&&e.push({name:h,contents:`#section ${h}`});const c=e[e.length-1];c.contents+=`
${i}`}}return e}function V(t){return t.map(e=>e.contents).join(`
`)}const U=[{regex:/^( *)#endif/g,processor:(t,{conditionalStack:e,logger:r})=>{const[,n]=t;return e.pop()===void 0&&r.warn("unexpected #endif"),d(n,e.length,r),!1}},{regex:/^( *)#ifdef *(.*)/g,processor:(t,{state:e,conditionalStack:r,logger:n})=>{const[,s,i]=t;return d(s,r.length,n),i&&r.push(e.preprocessorDefinitions.has(i)),!1}},{regex:/^( *)#ifndef *(.*)/g,processor:(t,{state:e,conditionalStack:r,logger:n})=>{const[,s,i]=t;return d(s,r.length,n),i&&r.push(!e.preprocessorDefinitions.has(i)),!1}},{regex:/^( *)#sub *(.*)/g,processor:(t,{state:e,section:r,conditionalStack:n,logger:s})=>{if(!(n.length==0||n[n.length-1]))return!1;const[,u,l]=t;d(u,n.length+1,s);const c=r.steps.length>0?r.steps[r.steps.length-1]:null;if(c===null)return s.warn("substep expected step"),!1;if(c.type!=="fragment_step")return s.warn("substep expected fragment_step"),!1;const p=A(l.trim(),e,s);return p.length>0&&c.subSteps.push({type:"fragment_step",parts:p,subSteps:[]}),!1}},{regex:/^( *)(.*)/g,processor:(t,{state:e,section:r,conditionalStack:n,logger:s})=>{if(!(n.length==0||n[n.length-1]))return!1;const[,u,l]=t;d(u,n.length,s);const c=A(l.trim(),e,s);return c.length>0&&r.steps.push({type:"fragment_step",parts:c,subSteps:[]}),!1}}];function d(t,e,r){const n=e*4;let s=0;const i=/^( *)/g.exec(t);i&&(s=i[1].length),s!==n&&r.warn(`expected ${n} whitespace, found ${s}`)}function z(t,e){const r=new Q,n=[];for(const s of t){const i=s.contents.split(/\r\n|\r|\n/g),u={name:s.name,steps:[]};n.push(u),r.pushScope(u.name);const l={state:e,section:u,conditionalStack:[],logger:r};for(let c=0;c<i.length;c++){const p=i[c];p&&(r.pushScope(`line ${c+1}`),y(p,U,l),r.popScope())}l.conditionalStack.length!=0&&r.warn("expected #endif"),r.popScope()}for(const s of e.explicitWaypoints)e.usedWaypoints.has(s)||r.warn(`unused waypoint ${s}`);for(const s in o.Areas){const i=o.Areas[s];i.crafting_recipes.length>0&&!e.craftingAreas.has(i.id)&&r.warn(`missing crafting area ${i.id}, ${i.crafting_recipes.join(", ")}`)}return r.drain(console),n}function Y(){return{implicitWaypoints:new Set,explicitWaypoints:new Set,usedWaypoints:new Set,craftingAreas:new Set,currentAreaId:"1_1_1",lastTownAreaId:"1_1_town",portalAreaId:null,preprocessorDefinitions:new Set}}export{V as buildRouteSource,K as getRouteFiles,Y as initializeRouteState,z as parseRoute};
