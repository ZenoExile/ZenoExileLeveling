import{Data as u}from"./index-CO5fj62K.js";import"./index-Cn3SoNxE.js";function C(c,n,t,s,e){const a=u.Quests[c.questId],r=[];for(const f of c.rewardOffers){const o=a.reward_offers[f];if(!o)continue;const d=h(n,t,s,o.quest);d!==null&&r.push({type:"gem_step",requiredGem:t[d],rewardType:"quest",count:1})}for(const f of c.rewardOffers){const o=a.reward_offers[f];if(!o)continue;const d=w(n,t,s,e,o.vendor);for(const i of d){let l=t[i];r.push({type:"gem_step",requiredGem:l,rewardType:"vendor",count:l.count-(s.has(i)?1:0)})}}return r}function g(c,n,t){const s=u.Characters[c.characterClass];for(let e=0;e<n.length;e++){const a=n[e];t.has(e)||(s.start_gem_id===a.id&&t.add(e),s.chest_gem_id===a.id&&t.add(e))}}function h(c,n,t,s){for(let e=0;e<n.length;e++){const a=n[e];if(t.has(e))continue;const r=s[a.id];if(!r)continue;if(r.classes.length==0||r.classes.some(o=>o==c.characterClass))return t.add(e),e}return null}function w(c,n,t,s,e){const a=[];for(let r=0;r<n.length;r++){const f=n[r];if(f.count===1&&t.has(r)||s.has(r))continue;const o=e[f.id];if(!o)continue;(o.classes.length===0||o.classes.some(i=>i==c.characterClass))&&(s.add(r),a.push(r))}return a}export{C as buildGemSteps,g as findCharacterGems};
