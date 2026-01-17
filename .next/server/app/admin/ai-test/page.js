(()=>{var e={};e.id=676,e.ids=[676],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1178:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>x,pages:()=>c,routeModule:()=>p,tree:()=>d}),t(8659),t(1506),t(5866);var a=t(3191),i=t(8716),r=t(7922),n=t.n(r),o=t(5231),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(s,l);let d=["",{children:["admin",{children:["ai-test",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8659)),"/Users/ondrej/Documents/moje-weby/lymfaflow/app/admin/ai-test/page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,1506)),"/Users/ondrej/Documents/moje-weby/lymfaflow/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/ondrej/Documents/moje-weby/lymfaflow/app/admin/ai-test/page.tsx"],x="/admin/ai-test/page",m={require:t,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/admin/ai-test/page",pathname:"/admin/ai-test",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},6911:(e,s,t)=>{Promise.resolve().then(t.bind(t,4438))},4438:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>x});var a=t(326),i=t(7577),r=t(8301),n=t(4159),o=t(1515),l=t(8646),d=t(9147),c=t(1899);function x(){let[e,s]=(0,i.useState)("davinci"),[t,x]=(0,i.useState)(""),[m,p]=(0,i.useState)(""),[u,h]=(0,i.useState)(!1),[v,y]=(0,i.useState)("chat"),g=(0,o.kT)(e),j=t&&d.Lh[t]||[],b=m?j.find(e=>e.id===m):void 0,k=function(e,s){var t;let a=`Jsi ${e.name}, ${e.era}. ${e.tagline}

TVOJE OSOBNOST:
- Formalita: ${e.personality.formality}/5 (1=velmi neform\xe1ln\xed, 5=velmi form\xe1ln\xed)
- Komplexita: ${e.personality.complexity}/5 (1=velmi jednoduch\xe9, 5=expertn\xed)
${e.personality.humor?"- Použ\xedv\xe1š humor a vtipn\xe9 pozn\xe1mky":"- Jsi sp\xedše v\xe1žn\xfd a seri\xf3zn\xed"}
${e.personality.useAnalogies?"- R\xe1d použ\xedv\xe1š analogie z běžn\xe9ho života":""}
${e.personality.useEtymology?"- Vysvětluješ etymologii slov":""}
${e.personality.useStories?"- Vypr\xe1v\xedš př\xedběhy a historky":""}
${e.personality.askQuestions?"- Vedeš studenta ot\xe1zkami (sokratovsk\xe1 metoda)":""}
${e.personality.useVisuals?"- Popisuješ věci vizu\xe1lně, jako bys kreslil":""}
${e.personality.useExperiments?"- Navrhuješ praktick\xe9 experimenty a cvičen\xed":""}

TVOJE TYPICK\xc9 FR\xc1ZE:
${e.signaturePhrases.map(e=>`- "${e}"`).join("\n")}

METODA V\xddUKY: ${e.teachingMethod}
${(t=e.teachingMethod,({visual:`Jako vizu\xe1ln\xed učitel:
- Popisuj koncepty jako obr\xe1zky a diagramy
- Použ\xedvej prostorov\xe9 analogie
- Ř\xedkej "Představ si...", "Nakresli si v hlavě..."
- Vysvětluj vztahy mezi č\xe1stmi`,storytelling:`Jako storyteller:
- Vypr\xe1věj př\xedběhy a historky
- Použ\xedvej metafory z běžn\xe9ho života
- Dej věcem kontext a historii
- Spoj abstraktn\xed koncepty s konkr\xe9tn\xedmi př\xedběhy`,socratic:`Jako sokratovsk\xfd učitel:
- Veď studenta ot\xe1zkami k odpovědi
- Neptej se př\xedmo, ale nav\xe1děj
- Oceň studentovo uvažov\xe1n\xed
- Pomoz studentovi naj\xedt odpověď s\xe1m`,debugging:`Jako debugger:
- Rozlož probl\xe9m na kroky
- Jdi systematicky od zač\xe1tku
- Identifikuj, kde přesně je probl\xe9m
- Vysvětli logiku krok za krokem`,experimental:`Jako experiment\xe1tor:
- Navrhuj praktick\xe9 pokusy
- Ptej se "Co se stane když...?"
- Oceňuj chyby jako souč\xe1st učen\xed
- Propoj teorii s prax\xed`})[t]||"")}

PRAVIDLA:
1. Odpov\xeddej vždy v češtině
2. Zůstaň v charakteru - jsi ${e.shortName}, ne AI asistent
3. Použ\xedvej sv\xe9 typick\xe9 fr\xe1ze přirozeně
4. Přizpůsob složitost odpovědi \xfarovni studenta
5. Pokud nev\xedš odpověď, přiznej to a navrhni, kdo by mohl pomoci
6. Buď povzbuzuj\xedc\xed, ale upř\xedmn\xfd
7. Kr\xe1tk\xe9 odpovědi pro jednoduch\xe9 ot\xe1zky, delš\xed pro komplexn\xed
8. Nikdy nezmiňuj, že jsi AI nebo jazykov\xfd model

${e.systemPrompt||""}`,i="";return s?.lessonTitle&&(i+=`

AKTU\xc1LN\xcd KONTEXT:
Student se pr\xe1vě uč\xed lekci: "${s.lessonTitle}"
${s.lessonContent?`Obsah lekce: ${s.lessonContent.slice(0,500)}...`:""}`),s?.studentLevel&&(i+=`
\xdaroveň studenta: ${s.studentLevel}/8 (1=nov\xe1ček, 8=mistr)`),a+i}(g,{lessonTitle:b?.title,lessonContent:b?.human_explanation,studentLevel:3});return a.jsx(r.lq,{title:"AI Test Console",subtitle:"Testov\xe1n\xed AI profesorů a system promptů",children:(0,a.jsxs)("div",{className:"grid lg:grid-cols-2 gap-6",children:[(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)(r.Zb,{title:"V\xfdběr profesora",children:[a.jsx("div",{className:"grid grid-cols-5 gap-2",children:o.Uh.map(t=>(0,a.jsxs)("button",{onClick:()=>s(t.id),className:`
                    flex flex-col items-center gap-2 p-3 rounded-xl transition-all
                    ${t.id===e?"bg-[#7A9E8E] text-white":"bg-gray-100 hover:bg-gray-200"}
                  `,children:[a.jsx("div",{className:"w-10 h-10 rounded-xl flex items-center justify-center",style:{backgroundColor:t.id===e?"rgba(255,255,255,0.2)":`${t.accentColor}15`},children:a.jsx(c.qR,{professorId:t.id,className:"w-7 h-7",color:t.id===e?"#fff":t.accentColor})}),a.jsx("span",{className:"text-xs font-medium",children:t.shortName})]},t.id))}),(0,a.jsxs)("div",{className:"mt-4 p-4 bg-gray-50 rounded-lg",children:[(0,a.jsxs)("div",{className:"flex items-center gap-3 mb-2",children:[a.jsx("h4",{className:"font-semibold text-gray-900",children:g.name}),a.jsx(r.Ct,{children:g.teachingMethod})]}),a.jsx("p",{className:"text-sm text-gray-600 mb-2",children:g.tagline}),(0,a.jsxs)("div",{className:"flex flex-wrap gap-2",children:[a.jsx(r.Ct,{variant:"info",children:g.primaryField}),g.secondaryFields.map(e=>a.jsx(r.Ct,{children:e},e))]})]})]}),a.jsx(r.Zb,{title:"Kontext (voliteln\xe9)",children:(0,a.jsxs)("div",{className:"space-y-4",children:[a.jsx(r.Ph,{label:"T\xe9ma/Kurz",value:t,onChange:e=>{x(e.target.value),p("")},options:[{value:"",label:"-- Ž\xe1dn\xe9 t\xe9ma --"},...l.Nl.map(e=>({value:e.id,label:e.title}))]}),j.length>0&&a.jsx(r.Ph,{label:"Lekce",value:m,onChange:e=>p(e.target.value),options:[{value:"",label:"-- Ž\xe1dn\xe1 lekce --"},...j.map(e=>({value:e.id,label:e.title}))]}),b&&(0,a.jsxs)("div",{className:"p-3 bg-gray-50 rounded-lg text-sm",children:[a.jsx("p",{className:"font-medium text-gray-700 mb-1",children:b.title}),a.jsx("p",{className:"text-gray-500 line-clamp-2",children:b.human_explanation})]})]})}),a.jsx(r.Zb,{title:"Režim testu",children:(0,a.jsxs)("div",{className:"flex gap-2",children:[a.jsx(r.zx,{variant:"chat"===v?"primary":"secondary",onClick:()=>y("chat"),children:"\uD83D\uDCAC Chat"}),a.jsx(r.zx,{variant:"prompt"===v?"primary":"secondary",onClick:()=>y("prompt"),children:"\uD83D\uDCDD System Prompt"})]})}),"prompt"===v&&a.jsx(r.Zb,{title:"System Prompt",subtitle:"Aktu\xe1lně generovan\xfd prompt",children:(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between",children:[(0,a.jsxs)("span",{className:"text-sm text-gray-500",children:[k.length," znaků"]}),a.jsx(r.zx,{variant:"ghost",size:"sm",onClick:()=>navigator.clipboard.writeText(k),children:"\uD83D\uDCCB Kop\xedrovat"})]}),a.jsx("pre",{className:"text-xs text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-lg max-h-96 overflow-auto",children:k})]})}),a.jsx(r.Zb,{title:"API Status",children:(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded-lg",children:[a.jsx("span",{className:"text-sm",children:"Anthropic API"}),a.jsx(r.Ct,{variant:process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY?"success":"warning",children:process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY?"Nakonfigurov\xe1no":"Mock režim"})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between p-3 bg-gray-50 rounded-lg",children:[a.jsx("span",{className:"text-sm",children:"Model"}),a.jsx(r.Ct,{variant:"info",children:"claude-sonnet-4-20250514"})]}),a.jsx("p",{className:"text-xs text-gray-500 mt-2",children:"\uD83D\uDCA1 V mock režimu vrac\xed API předpřipraven\xe9 odpovědi podle osobnosti profesora."})]})})]}),a.jsx("div",{children:"chat"===v?a.jsx("div",{className:"h-[700px]",children:a.jsx(n.zL,{initialProfessorId:e,lessonContext:b?{lessonId:b.id,lessonTitle:b.title,lessonContent:b.human_explanation}:void 0,className:"h-full"},`${e}-${m}`)}):a.jsx(r.Zb,{title:"Personality breakdown",children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{children:[a.jsx("h4",{className:"font-medium text-gray-900 mb-2",children:"Osobnost"}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-2 text-sm",children:[(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Formalita: ",g.personality.formality,"/5"]}),(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Komplexita: ",g.personality.complexity,"/5"]}),(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Humor: ",g.personality.humor?"✅":"❌"]}),(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Analogie: ",g.personality.useAnalogies?"✅":"❌"]}),(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Etymologie: ",g.personality.useEtymology?"✅":"❌"]}),(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Př\xedběhy: ",g.personality.useStories?"✅":"❌"]}),(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Ot\xe1zky: ",g.personality.askQuestions?"✅":"❌"]}),(0,a.jsxs)("div",{className:"p-2 bg-gray-50 rounded",children:["Vizu\xe1ly: ",g.personality.useVisuals?"✅":"❌"]})]})]}),(0,a.jsxs)("div",{children:[a.jsx("h4",{className:"font-medium text-gray-900 mb-2",children:"Typick\xe9 fr\xe1ze"}),a.jsx("ul",{className:"space-y-1",children:g.signaturePhrases.map((e,s)=>(0,a.jsxs)("li",{className:"text-sm text-gray-600 p-2 bg-gray-50 rounded",children:['"',e,'"']},s))})]}),(0,a.jsxs)("div",{children:[a.jsx("h4",{className:"font-medium text-gray-900 mb-2",children:"Intro zpr\xe1va"}),a.jsx("p",{className:"text-sm text-gray-600 p-3 bg-gray-50 rounded italic",children:g.introMessage})]})]})})})]})})}},8659:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>a});let a=(0,t(8570).createProxy)(String.raw`/Users/ondrej/Documents/moje-weby/lymfaflow/app/admin/ai-test/page.tsx#default`)}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),a=s.X(0,[276,471,434,553,536,515,899,159],()=>t(1178));module.exports=a})();