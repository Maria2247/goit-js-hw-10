import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as n}from"./assets/vendor-77e16229.js";const c=document.querySelector(".form"),i=document.querySelector('input[name="delay"]'),l=document.querySelector('input[value="fulfilled"]'),r=document.querySelector('input[value="rejected"]');function s(e){return new Promise((t,o)=>{setTimeout(()=>{l.checked?(t(`✅ Fulfilled promise in ${e}ms`),n.show({message:`✅ Fulfilled promise in ${e}ms`})):r.checked&&(o(`❌ Rejected promise in ${e}ms`),n.error({message:`❌ Rejected promise in ${e}ms`}))},e)})}function u(e){e.preventDefault();const t=i.value;console.log("delay: ",t),s(t).then(o=>{console.log(o)}).catch(o=>{console.log(o)}).finally(()=>{c.reset()})}c.addEventListener("submit",u);
//# sourceMappingURL=commonHelpers2.js.map