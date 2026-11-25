const data={
 "Australia":{intake:"February and July (some universities also offer November)",test:"IELTS, PTE or TOEFL"},
 "United Kingdom":{intake:"September (main) and January",test:"IELTS (UKVI where required), PTE or other accepted tests"},
 "Canada":{intake:"September (main), January and May",test:"IELTS, PTE or TOEFL"},
 "USA":{intake:"Fall (Aug/Sep) and Spring (Jan)",test:"TOEFL, IELTS or Duolingo; some courses ask for SAT/GRE/GMAT"},
 "New Zealand":{intake:"February and July",test:"IELTS, PTE or TOEFL"},
 "Ireland":{intake:"September (main) and January",test:"IELTS, PTE or TOEFL"},
 "Netherlands":{intake:"September (main); February at some universities",test:"IELTS or TOEFL"},
 "Europe":{intake:"Winter (Sep/Oct) and summer (Feb/Mar) semesters, by country",test:"IELTS or TOEFL; some courses need German, French or another local language"},
 "South Korea":{intake:"Spring (March) and fall (September)",test:"IELTS or TOEFL for English-taught courses; TOPIK for Korean-taught courses"},
 "Malaysia":{intake:"Several a year, often Jan/Feb, May and September",test:"IELTS, PTE, TOEFL or university test"},
 "Türkiye":{intake:"Fall (Sep/Oct); spring (Feb) at some universities",test:"IELTS, TOEFL or the university's own test; Turkish certificate for Turkish-taught courses"},
 "China":{intake:"September (main); March at some universities",test:"IELTS or TOEFL for English-taught courses; HSK for Chinese-taught courses"}
};
const docs={
 "Undergraduate":"SSC and HSC (or O/A Level) certificates and transcripts, passport, English test result",
 "Postgraduate":"Bachelor's certificate and transcripts, CV, statement of purpose, references, passport, English test result",
 "Diploma / Foundation":"SSC/HSC or O-Level results, passport, English test result"
};
function plan(){
  const d=document.getElementById('fd').value,l=document.getElementById('fl').value;
  document.getElementById('fres').innerHTML=`<dl><dt>Typical intakes</dt><dd>${data[d].intake}</dd><dt>English test</dt><dd>${data[d].test}</dd><dt>Documents</dt><dd>${docs[l]}</dd></dl>`;
}
if(document.getElementById('fgo')){document.getElementById('fgo').addEventListener('click',plan);plan();}



const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',e=>{
  const wasOpen=nav.classList.contains('open');
  nav.classList.remove('open');menu.setAttribute('aria-expanded','false');
  // on phones the open menu changes the page height, so scroll after it has closed
  const h=a.getAttribute('href')||'';const t=h.startsWith('#')&&h.length>1&&document.getElementById(h.slice(1));
  if(wasOpen&&t){e.preventDefault();requestAnimationFrame(()=>{t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});history.pushState(null,'',h);});}
}));

function copyText(t,btn){
  const done=()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',1500)};
  try{navigator.clipboard.writeText(t).then(done).catch(()=>sel(btn))}catch(e){sel(btn)}
}
function sel(btn){const el=btn.previousElementSibling.querySelector('span,a');const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);btn.textContent='Selected'}
document.querySelectorAll('.copy').forEach(b=>b.addEventListener('click',()=>copyText(document.getElementById(b.dataset.copy).textContent,b)));

try{(function(){
  const M=()=>typeof IE_MARKETING!=='undefined'?IE_MARKETING:{}, TOf=()=>M().CONTACT_EMAIL||'info.independentedu@gmail.com', KEYf=()=>String(M().WEB3FORMS_KEY||'').trim(), okKey=()=>/^[0-9a-f-]{30,}$/i.test(KEYf());
  window.IEmailHref=(subject,body)=>'mailto:'+TOf()+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  window.IEmailBtn=(box,subject,body)=>{try{const ok=box&&box.querySelector('.ok');if(!ok||ok.querySelector('a[href^="mailto:"]'))return;
    const a=document.createElement('a');a.className='btn btn-line';a.href=IEmailHref(subject,body);a.textContent='Send by email';a.style.marginTop='8px';
    const row=ok.querySelector('.sendrow,.chatgo');(row||ok).appendChild(a);}catch(e){}};
  window.IEmail=(subject,body,replyto)=>{
    if(!okKey())return Promise.resolve(false);
    const d={access_key:KEYf(),subject:subject+' | Independent Education website',from_name:'Independent Education website',message:body,botcheck:''};
    if(replyto&&/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(replyto))d.email=replyto;
    return fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d),credentials:'omit'})
      .then(r=>r.json()).then(j=>!!(j&&j.success)).catch(()=>false);};
  Object.defineProperty(window.IEmail,'on',{get:okKey});
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
document.getElementById('lead').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('n').value.trim(),p=document.getElementById('p').value.trim(),out=document.getElementById('formout');
  if(!n||!p){out.innerHTML='<div class="ok" style="border-color:var(--sun)">Please enter your name and phone number so a counsellor can reach you.</div>';return}
  const msg=`Counselling request\nName: ${n}\nPhone: ${p}\nDestination: ${document.getElementById('d').value}\nLevel: ${document.getElementById('lv').value}\nMessage: ${document.getElementById('m').value.trim()||'-'}${window.IEsrc&&IEsrc()?'\nHeard about us via: '+IEsrc():''}`;
  const wa='https://wa.me/8801913179498?text='+encodeURIComponent(msg);
  window.IEtrack&&IEtrack('lead',{content_name:'Contact form',content_category:document.getElementById('d').value,destination:document.getElementById('d').value,study_level:document.getElementById('lv').value});
  const manualC=()=>{
  out.innerHTML=`<div class="ok">Your request is ready. Send it to us in one tap on WhatsApp, or copy it and send it on Messenger or by email to <b>info.independentedu@gmail.com</b>.<pre id="msgtxt" style="white-space:pre-wrap;font:500 .85rem var(--body);margin:10px 0">${msg.replace(/</g,'&lt;')}</pre><div class="sendrow"><a class="btn btn-sun soc-wa" href="${wa}" target="_blank" rel="noopener"><svg class="si" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg>Send on WhatsApp</a><a class="btn btn-line" id="msgr" href="https://m.me/IndependentEducation?ref=website_chat" target="_blank" rel="noopener"><svg class="si" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/></svg>Copy &amp; open Messenger</a><button type="button" class="copy" id="cm">Copy request</button></div></div>`;
    const cp=b=>{try{navigator.clipboard.writeText(msg).then(()=>{if(b)b.textContent='Copied'}).catch(()=>{})}catch(_){}};
    document.getElementById('cm').addEventListener('click',ev=>cp(ev.currentTarget));
    document.getElementById('msgr').addEventListener('click',()=>cp(null));
    IEmailBtn(out,'Counselling request: '+n,msg);};
  const btnC=e.target.querySelector('button[type=submit]');
  if(!IEmail.on){manualC();return;}
  if(btnC){btnC.disabled=true;}
  out.innerHTML='<div class="ok">Sending…</div>';
  IEmail('Counselling request: '+n,msg).then(ok=>{
    if(btnC)btnC.disabled=false;
    if(!ok){manualC();return;}
    out.innerHTML=`<div class="ok"><b>Thank you, ${n.replace(/</g,'&lt;')}! Your message has been sent to our team.</b> A counsellor will contact you soon. For a faster reply, message us on WhatsApp.<div class="sendrow" style="margin-top:10px"><a class="btn btn-sun soc-wa" href="${wa}" target="_blank" rel="noopener">Message on WhatsApp</a></div></div>`;
    e.target.reset();
  });
});

const UNIS=[["University of Melbourne", "Melbourne", "Australia"], ["University of Sydney", "Sydney", "Australia"], ["Australian National University", "Canberra", "Australia"], ["UNSW Sydney", "Sydney", "Australia"], ["Monash University", "Melbourne", "Australia"], ["University of Queensland", "Brisbane", "Australia"], ["RMIT University", "Melbourne", "Australia"], ["Deakin University", "Geelong and Melbourne", "Australia"], ["University of Western Australia", "Perth", "Australia"], ["Australian Catholic University (ACU)", "Several campuses, including Sydney, Melbourne and Brisbane", "Australia"], ["Basair Aviation College", "Sydney", "Australia"], ["Bond University", "Gold Coast", "Australia"], ["Canberra Institute of Technology", "Canberra", "Australia"], ["Canterbury Business College (CBC)", "", "Australia"], ["Charles Darwin University (CDU)", "Darwin and other campuses", "Australia"], ["Charles Sturt University (CSU)", "Several regional New South Wales campuses", "Australia"], ["ECA College", "", "Australia"], ["Edith Cowan College", "Perth", "Australia"], ["Engineering Institute of Technology (EIT)", "Perth (also online)", "Australia"], ["Excelsia University College", "Sydney", "Australia"], ["TAFE Queensland", "Many campuses across Queensland", "Australia"], ["Melbourne Polytechnic", "Melbourne", "Australia"], ["Box Hill Institute", "Melbourne", "Australia"], ["Australian Institute of Business", "Adelaide (also online)", "Australia"], ["Australian Institute of Higher Education", "", "Australia"], ["Australian Institute of Professionals (AIP)", "", "Australia"], ["Sydney Institute of Business and Technology", "Sydney", "Australia"], ["Melbourne Institute of Technology", "Melbourne and Sydney", "Australia"], ["Holmesglen Institute", "Melbourne", "Australia"], ["William Angliss Institute", "Melbourne", "Australia"], ["Australian College of Applied Professions", "Several campuses, including Sydney and Melbourne", "Australia"], ["Stanley College", "Perth", "Australia"], ["Academies Australasia", "Several cities, including Sydney and Melbourne", "Australia"], ["Kaplan Business School", "Several cities, including Sydney and Melbourne", "Australia"], ["Torrens University Australia", "Several cities, including Adelaide, Sydney and Melbourne", "Australia"], ["International College of Management, Sydney", "Sydney", "Australia"], ["Le Cordon Bleu Australia", "Several cities, including Adelaide and Sydney", "Australia"], ["Aviation Australia", "Brisbane", "Australia"], ["Australian Maritime College", "Launceston, Tasmania", "Australia"], ["University of Oxford", "Oxford", "United Kingdom"], ["University of Cambridge", "Cambridge", "United Kingdom"], ["Imperial College London", "London", "United Kingdom"], ["University College London (UCL)", "London", "United Kingdom"], ["King's College London", "London", "United Kingdom"], ["University of Edinburgh", "Edinburgh", "United Kingdom"], ["University of Manchester", "Manchester", "United Kingdom"], ["University of Birmingham", "Birmingham", "United Kingdom"], ["University of Glasgow", "Glasgow", "United Kingdom"], ["University of Lincoln", "Lincoln", "United Kingdom"], ["University of Westminster", "London", "United Kingdom"], ["University of Cumbria", "Carlisle, Lancaster and other campuses", "United Kingdom"], ["University of Buckingham", "Buckingham", "United Kingdom"], ["University of Portsmouth", "Portsmouth", "United Kingdom"], ["University of Brighton", "Brighton", "United Kingdom"], ["University of Toronto", "Toronto", "Canada"], ["University of British Columbia", "Vancouver", "Canada"], ["McGill University", "Montreal", "Canada"], ["University of Alberta", "Edmonton", "Canada"], ["University of Waterloo", "Waterloo", "Canada"], ["McMaster University", "Hamilton", "Canada"], ["University of Ottawa", "Ottawa", "Canada"], ["Western University", "London, Ontario", "Canada"], ["Seneca Polytechnic", "Toronto", "Canada"], ["Humber Polytechnic", "Toronto", "Canada"], ["George Brown Polytechnic", "Toronto", "Canada"], ["Centennial College", "Toronto", "Canada"], ["Conestoga College", "Kitchener", "Canada"], ["Algonquin College", "Ottawa", "Canada"], ["Niagara College", "Welland and Niagara-on-the-Lake", "Canada"], ["Durham College", "Oshawa", "Canada"], ["British Columbia Institute of Technology (BCIT)", "Burnaby (Vancouver)", "Canada"], ["Southern Alberta Institute of Technology (SAIT)", "Calgary", "Canada"], ["Northern Alberta Institute of Technology (NAIT)", "Edmonton", "Canada"], ["Saskatchewan Polytechnic", "Saskatoon, Regina, Moose Jaw and Prince Albert", "Canada"], ["Harvard University", "Cambridge, Massachusetts", "USA"], ["Massachusetts Institute of Technology (MIT)", "Cambridge, Massachusetts", "USA"], ["Stanford University", "Stanford, California", "USA"], ["University of California, Berkeley", "Berkeley, California", "USA"], ["University of California, Los Angeles (UCLA)", "Los Angeles, California", "USA"], ["University of Michigan", "Ann Arbor, Michigan", "USA"], ["New York University (NYU)", "New York", "USA"], ["Arizona State University", "Tempe, Arizona", "USA"], ["University of Auckland", "Auckland", "New Zealand"], ["University of Otago", "Dunedin", "New Zealand"], ["Victoria University of Wellington", "Wellington", "New Zealand"], ["University of Canterbury", "Christchurch", "New Zealand"], ["Massey University", "Palmerston North", "New Zealand"], ["Auckland University of Technology (AUT)", "Auckland", "New Zealand"], ["University of Waikato", "Hamilton", "New Zealand"], ["Lincoln University", "Lincoln", "New Zealand"], ["Ara Institute of Canterbury", "Christchurch and Canterbury region", "New Zealand"], ["Otago Polytechnic", "Dunedin and Central Otago", "New Zealand"], ["Southern Institute of Technology (SIT)", "Invercargill", "New Zealand"], ["Manukau Institute of Technology (MIT)", "Auckland", "New Zealand"], ["Unitec Institute of Technology", "Auckland", "New Zealand"], ["Nelson Marlborough Institute of Technology (NMIT)", "Nelson and Blenheim", "New Zealand"], ["Toi Ohomai Institute of Technology", "Rotorua and Tauranga", "New Zealand"], ["Eastern Institute of Technology (EIT)", "Hawke's Bay and Gisborne", "New Zealand"], ["Waikato Institute of Technology (Wintec)", "Hamilton", "New Zealand"], ["Open Polytechnic of New Zealand", "Online (distance learning)", "New Zealand"], ["Whitireia and WelTec", "Wellington region", "New Zealand"], ["Trinity College Dublin", "Dublin", "Ireland"], ["University College Dublin", "Dublin", "Ireland"], ["University of Galway", "Galway", "Ireland"], ["University College Cork", "Cork", "Ireland"], ["University of Limerick", "Limerick", "Ireland"], ["Dublin City University", "Dublin", "Ireland"], ["Maynooth University", "Maynooth", "Ireland"], ["Technological University of the Shannon (TUS)", "Limerick, Athlone and other campuses", "Ireland"], ["Technological University Dublin (TU Dublin)", "Dublin", "Ireland"], ["Technical University of Munich", "Munich, Germany", "Europe"], ["LMU Munich", "Munich, Germany", "Europe"], ["Heidelberg University", "Heidelberg, Germany", "Europe"], ["Constructor University", "Bremen, Germany", "Europe"], ["Delft University of Technology", "Delft, Netherlands", "Europe"], ["University of Amsterdam", "Amsterdam, Netherlands", "Europe"], ["The Hague University of Applied Sciences", "The Hague, Netherlands", "Europe"], ["University of Twente", "Enschede, Netherlands", "Europe"], ["Maastricht School of Management (MSM)", "Maastricht, Netherlands (part of Maastricht University)", "Europe"], ["KU Leuven", "Leuven, Belgium", "Europe"], ["Sorbonne University", "Paris, France", "Europe"], ["Politecnico di Milano", "Milan, Italy", "Europe"], ["University of Milan (La Statale)", "Milan, Italy", "Europe"], ["University of Milano-Bicocca", "Milan, Italy", "Europe"], ["Bocconi University", "Milan, Italy", "Europe"], ["Università Cattolica del Sacro Cuore", "Milan and other campuses, Italy", "Europe"], ["KTH Royal Institute of Technology", "Stockholm, Sweden", "Europe"], ["University of Oslo (UiO)", "Oslo, Norway", "Europe"], ["Norwegian University of Science and Technology (NTNU)", "Trondheim, Gjøvik and Ålesund, Norway", "Europe"], ["University of Bergen (UiB)", "Bergen, Norway", "Europe"], ["UiT The Arctic University of Norway", "Tromsø and other campuses, Norway", "Europe"], ["OsloMet – Oslo Metropolitan University", "Oslo, Norway", "Europe"], ["University of Helsinki", "Helsinki, Finland", "Europe"], ["University of Debrecen", "Debrecen, Hungary", "Europe"], ["Corvinus University of Budapest", "Budapest, Hungary", "Europe"], ["Institute of Tourism Studies (ITS)", "Malta", "Europe"], ["International European University, Malta Campus", "Malta", "Europe"], ["Global College Malta", "SmartCity Malta, Ricasoli (Kalkara), Malta", "Europe"], ["American University of Malta", "Cospicua (Bormla), Malta", "Europe"], ["University of Central Lancashire (UCLan Cyprus)", "Larnaca, Cyprus", "Europe"], ["Neapolis University Pafos", "Paphos (Pafos), Cyprus", "Europe"], ["Vilnius Gediminas Technical University (VILNIUS TECH)", "Vilnius, Lithuania", "Europe"], ["Vytautas Magnus University (VMU)", "Kaunas, Lithuania", "Europe"], ["Kaunas University of Technology (KTU)", "Kaunas, Lithuania", "Europe"], ["ISM University of Management and Economics", "Vilnius, Lithuania", "Europe"], ["Klaipeda University", "Klaipėda, Lithuania", "Europe"], ["Utena University of Applied Sciences (Utenos kolegija)", "Utena, Lithuania", "Europe"], ["VIA University College", "Aarhus, Horsens and other campuses, Denmark", "Europe"], ["University College of Northern Denmark (UCN)", "Aalborg, Denmark", "Europe"], ["Business Academy Aarhus", "Aarhus, Denmark", "Europe"], ["EHL Hospitality Business School", "Lausanne, Switzerland", "Europe"], ["Glion Institute of Higher Education", "Glion (Montreux) and Bulle, Switzerland", "Europe"], ["Les Roches Global Hospitality Education", "Crans-Montana, Switzerland", "Europe"], ["César Ritz Colleges Switzerland", "Le Bouveret, Brig and Lucerne, Switzerland", "Europe"], ["Culinary Arts Academy Switzerland", "Lucerne and Le Bouveret, Switzerland", "Europe"], ["Medical University of Gdańsk (MUG)", "Gdańsk, Poland", "Europe"], ["Pomeranian Medical University (PUM)", "Szczecin, Poland", "Europe"], ["Vistula University", "Warsaw, Poland", "Europe"], ["SWPS University", "Warsaw and other cities, Poland", "Europe"], ["New Bulgarian University (NBU)", "Sofia, Bulgaria", "Europe"], ["Varna Free University (VFU)", "Varna, Bulgaria", "Europe"], ["Medical University of Plovdiv", "Plovdiv, Bulgaria", "Europe"], ["Medical University of Varna (MU-Varna)", "Varna, Bulgaria", "Europe"], ["University of Eastern Finland (UEF)", "Joensuu and Kuopio, Finland", "Europe"], ["University of Oulu", "Oulu, Finland", "Europe"], ["University of Vaasa", "Vaasa, Finland", "Europe"], ["JAMK University of Applied Sciences", "Jyväskylä, Finland", "Europe"], ["Metropolia University of Applied Sciences", "Helsinki, Espoo and Vantaa, Finland", "Europe"], ["LAB University of Applied Sciences", "Lahti and Lappeenranta, Finland", "Europe"], ["Karelia University of Applied Sciences", "Joensuu, Finland", "Europe"], ["Lapland University of Applied Sciences", "Rovaniemi, Kemi and Tornio, Finland", "Europe"], ["Häme University of Applied Sciences (HAMK)", "Hämeenlinna and other campuses, Finland", "Europe"], ["Vaasa University of Applied Sciences (VAMK)", "Vaasa, Finland", "Europe"], ["Kajaani University of Applied Sciences (KAMK)", "Kajaani, Finland", "Europe"], ["Seoul National University", "Seoul", "South Korea"], ["KAIST", "Daejeon", "South Korea"], ["Yonsei University", "Seoul", "South Korea"], ["Korea University", "Seoul", "South Korea"], ["POSTECH", "Pohang", "South Korea"], ["Sungkyunkwan University", "Seoul and Suwon", "South Korea"], ["Hanyang University", "Seoul", "South Korea"], ["Kyungdong University Global (KDU Global)", "Goseong, Gangwon", "South Korea"], ["Universiti Malaya", "Kuala Lumpur", "Malaysia"], ["Universiti Putra Malaysia", "Serdang", "Malaysia"], ["Universiti Kebangsaan Malaysia", "Bangi", "Malaysia"], ["Universiti Sains Malaysia", "Penang", "Malaysia"], ["Universiti Teknologi Malaysia", "Johor Bahru", "Malaysia"], ["Taylor's University", "Subang Jaya", "Malaysia"], ["Monash University Malaysia", "Bandar Sunway", "Malaysia"], ["University of Nottingham Malaysia", "Semenyih", "Malaysia"], ["SEGi University", "Kota Damansara, Selangor", "Malaysia"], ["Universiti Tun Abdul Razak (UNIRAZAK)", "Kuala Lumpur", "Malaysia"], ["Universidad Nacional de Colombia (UNAL)", "Bogotá (main campus), Colombia", "Colombia"], ["Universidad de Antioquia (UdeA)", "Medellín, Colombia", "Colombia"], ["Universidad de los Andes (Uniandes)", "Bogotá, Colombia", "Colombia"], ["Universidad EAFIT (EAFIT University)", "Medellín, Colombia", "Colombia"], ["İstanbul Nişantaşı University", "Istanbul, Türkiye", "Türkiye"], ["Özyeğin University", "Istanbul, Türkiye", "Türkiye"], ["Yüksek İhtisas University", "Ankara, Türkiye", "Türkiye"], ["İstanbul Medipol University", "Istanbul, Türkiye", "Türkiye"], ["Üsküdar University", "Istanbul, Türkiye", "Türkiye"], ["İstanbul Ticaret University", "Istanbul, Türkiye", "Türkiye"], ["Beihang University", "Beijing, China", "China"], ["University of Science and Technology Beijing (USTB)", "Beijing, China", "China"], ["Northwest A&F University", "Yangling, Shaanxi, China", "China"], ["Henan University of Science and Technology", "Luoyang, Henan, China", "China"], ["Anhui Normal University", "Wuhu, Anhui, China", "China"], ["Liaoning University", "Shenyang, Liaoning, China", "China"], ["Nanjing Forestry University", "Nanjing, Jiangsu, China", "China"]];
const SUBJ_AREAS=["Business", "Accounting & Finance", "Economics", "IT & Computing", "Data Science", "Engineering", "Architecture & Design", "Construction", "Medicine & Health", "Nursing", "Pharmacy", "Dentistry", "Veterinary", "Psychology", "Law", "Arts & Humanities", "Languages", "Social Sciences", "International Relations", "Social Work", "Education", "Media & Communication", "Creative Arts", "Fashion", "Music & Performing Arts", "Science", "Environment", "Agriculture", "Hospitality & Tourism", "Culinary Arts", "Events", "Sport", "Aviation", "Maritime", "Transportation", "Project Management", "Property", "Theology", "Trades"];
const USUBJ={"University of Melbourne":[[0,2,3,5,6,8,12,14,15,16,17,24,25,26,27],"https://study.unimelb.edu.au/how-to-apply/international-exchange-and-study-abroad/what-you-can-study"],"University of Sydney":[[0,2,3,5,6,8,14,15,17,19,20,24,25],"https://www.sydney.edu.au/study.html"],"Australian National University":[[0,2,3,5,8,13,14,15,17,18,25],"https://study.anu.edu.au/study-options"],"UNSW Sydney":[[0,3,4,5,6,8,14,15,17,19,20,21,22,25,26],"https://www.unsw.edu.au/study/postgraduate"],"Monash University":[[0,3,5,6,8,9,10,14,15,17,20,22,25],"https://www.monash.edu/study/courses"],"University of Queensland":[[0,2,3,5,6,8,14,15,17,20,21,25,26,27],"https://study.uq.edu.au/study-options/browse-study-areas"],"RMIT University":[[0,3,5,6,8,13,14,19,20,21,22,23,25,26,32],"https://www.rmit.edu.au/study-with-us/levels-of-study/postgraduate-study"],"University of Western Australia":[[0,3,4,5,6,8,13,14,15,17,20,22,24,25],"https://www.uwa.edu.au/study/explore-courses/study-areas"],"Deakin University":[[0,3,4,5,6,8,9,13,14,15,19,20,21,22,25,26,31],"https://www.deakin.edu.au/study/find-a-course/undergraduate-courses"],"Australian Catholic University (ACU)":[[0,3,8,9,13,14,15,17,20,22,31,37],"https://www.acu.edu.au/study-at-acu/find-a-course"],"Basair Aviation College":[[32],"https://www.oneuedu.com/en-US/schools/basair-aviation-college-bac-01552D","Diplomas of Aviation (commercial pilot licence, instrument rating)"],"Bond University":[[0,4,6,8,13,14,15,17,18,21,31],"https://bond.edu.au/study"],"Canberra Institute of Technology":[[0,1,3,8,20,22,25,28,29,38],"https://cit.edu.au/study/course-guide"],"Canterbury Business College (CBC)":[[0,3,7,28,29,35],"https://www.oneuedu.com/en-US/schools/canterbury-business-college-cbc-01899K"],"Charles Darwin University (CDU)":[[0,1,3,5,6,8,9,13,14,15,16,19,20,22,25,26,28,29,31],"https://www.cdu.edu.au/study"],"Charles Sturt University (CSU)":[[0,3,8,12,13,15,19,21,26,27,37],"https://study.csu.edu.au/international/courses"],"ECA College":[[0,3,5,35],"https://www.eca.edu.au/courses-colleges-partners/eca-college/"],"Edith Cowan College":[[0,3,5,8,21,22,28],"https://www.edithcowancollege.edu.au/courses/diplomas/"],"Engineering Institute of Technology (EIT)":[[5],"https://www.eit.edu.au/course-types/bachelors/","Civil, mechanical, electrical, industrial automation and process control engineering"],"Excelsia University College":[[0,13,19,20,22,24],"https://excelsia.edu.au/study/"],"TAFE Queensland":[[0,3,5,8,20,22,25,26,28,38],"https://tafeqld.edu.au/international/courses"],"Melbourne Polytechnic":[[0,1,3,5,6,7,19,20,21,22,24,27,28,38],"https://www.melbournepolytechnic.edu.au/students/international-students/"],"Box Hill Institute":[[3,8,9,19,24,28],"https://www.boxhill.edu.au/international-students/international-courses/"],"Australian Institute of Business":[[0],"https://www.aib.edu.au/courses/","MBA (finance, HR, supply chain, marketing, entrepreneurship), management and doctoral degrees"],"Australian Institute of Higher Education":[[0,1,3,4,28,35],"https://www.aih.edu.au"],"Australian Institute of Professionals (AIP)":[[0,7,38],"https://search.studyaustralia.gov.au/provider/australian-institute-of-professionals-aip/fcc9f6b6f63523e24e99ba9517b83a0b/courses"],"Sydney Institute of Business and Technology":[[0,3,5,8,17,21,22],"https://sibt.nsw.edu.au/courses/diploma/"],"Melbourne Institute of Technology":[[0,1,3,4,5],"https://www.mit.edu.au/"],"Holmesglen Institute":[[0,1,3,6,7,8,9,20,22,26,28,31],"https://www.holmesglen.edu.au/study-with-us/international-student-study/study-options"],"William Angliss Institute":[[28,29,30],"https://www.angliss.edu.au/","Foods, tourism, hospitality, events and hotel management"],"Australian College of Applied Professions":[[0,13,14],"https://www.acap.edu.au/courses/","Applied psychology, management, law and justice"],"Stanley College":[[0,3,8,9,19,20,28,29],"https://www.stanleycollege.edu.au/international-students/"],"Academies Australasia":[[0,1,3,16,19,20,27,28,29,31,35],"https://academies.edu.au/wp-content/uploads/2026/07/Academies-Australasia-Brief.pdf"],"Kaplan Business School":[[0,1,3,4,28,35],"https://www.kbs.edu.au/courses"],"Torrens University Australia":[[0,3,6,8,20,28],"https://www.torrens.edu.au/courses"],"International College of Management, Sydney":[[0,1,3,23,28,30,31,36],"https://www.icms.edu.au/courses/undergraduate/"],"Le Cordon Bleu Australia":[[0,28,29],"https://www.cordonbleu.edu/australia/programmes/en"],"Aviation Australia":[[5,32],"https://aviationaustralia.aero/courses/","Aircraft maintenance engineering, pilot, cabin crew, ground operations, remote pilot"],"Australian Maritime College":[[5,33],"https://www.amc.edu.au/study","Maritime engineering, maritime operations and seafaring"],"University of Oxford":[[0,2,3,5,15,16,17,22,25],"https://www.ox.ac.uk/admissions/undergraduate/courses/undergraduate-course-listing-a-z"],"University of Cambridge":[[2,3,5,6,8,12,13,14,15,16,17,20,24,25,37],"https://www.undergraduate.study.cam.ac.uk/courses"],"Imperial College London":[[0,3,5,8,25],"https://www.imperial.ac.uk/study/courses/"],"University College London (UCL)":[[5,6,8,13,15,17,20,25],"https://www.ucl.ac.uk/study/prospective-students/undergraduate/courses"],"King's College London":[[0,1,2,3,5,8,9,10,11,13,14,15,16,18,21,25,26,31,37],"https://www.kcl.ac.uk/study/undergraduate/subject-areas"],"University of Edinburgh":[[0,1,2,3,5,6,8,9,12,13,14,15,16,17,19,20,22,24,25,26,31],"https://study.ed.ac.uk/programmes/undergraduate-subjects"],"University of Manchester":[[0,2,5,6,8,14,15,16,17,20,24,25],"https://www.humanities.manchester.ac.uk/about/subjects/"],"University of Birmingham":[[0,1,2,3,5,8,11,13,14,15,16,18,19,20,24,25,26,31,37],"https://www.birmingham.ac.uk/study/undergraduate/subjects"],"University of Glasgow":[[0,1,2,3,4,5,8,9,11,12,13,14,15,16,18,20,21,24,25,26,31,37],"https://www.gla.ac.uk/undergraduate/degrees/"],"University of Lincoln":[[0,1,2,3,5,6,8,10,13,14,15,17,18,20,21,22,24,25,28,31],"https://www.lincoln.ac.uk/media/universityoflincoln/prospectus/document/pdf/undergraduate/ugp-2025-web.pdf"],"University of Westminster":[[0,1,2,3,4,5,6,7,8,13,14,15,16,18,21,22,23,24,25,28],"https://www.westminster.ac.uk/study/subjects"],"University of Cumbria":[[0,3,5,8,9,13,14,16,19,20,21,22,25,26,28,31],"https://www.cumbria.ac.uk/study/course-list/"],"University of Buckingham":[[0,1,2,3,8,13,14,15,18,20,21],"https://www.buckingham.ac.uk/study/"],"University of Portsmouth":[[0,1,2,3,4,5,6,8,13,14,15,16,18,19,20,21,22,23,24,25,26,31],"https://www.port.ac.uk/study/subject-area"],"University of Brighton":[[0,1,2,3,4,5,6,7,8,9,10,13,14,15,17,20,21,22,24,25,26,31],"https://www.brighton.ac.uk/courses/course-list.aspx"],"University of Toronto":[[0,3,5,6,8,9,13,15,17,21,22,24,25,31],"https://www.utoronto.ca/academics/undergraduate-programs"],"University of British Columbia":[[0,2,5,8,9,14,15,16,17,20,21,22,25,26,31],"https://you.ubc.ca/programs/"],"McGill University":[[0,5,8,9,11,14,15,20,24,25,26,27],"https://www.mcgill.ca/study/2020-2021/faculties-schools"],"University of Alberta":[[0,5,8,9,10,11,14,15,20,25,26,27,31],"https://www.ualberta.ca/en/admissions/media-library/uai-assets/docs/viewbook-2025-26/uofa_undergrad_2025-26.pdf"],"University of Waterloo":[[1,2,3,4,5,8,10,15,25,26],"https://uwaterloo.ca/future-students/programs/by-faculty"],"McMaster University":[[0,5,8,15,17,25],"https://registrar.mcmaster.ca/wp-content/uploads/2025/06/ug-calendar-covers-web.pdf"],"University of Ottawa":[[0,5,8,14,15,17,20,25],"https://catalogue.uottawa.ca/en/programs/"],"Western University":[[0,5,8,11,14,15,17,20,21,24,25],"https://international.uwo.ca/learning/come_to_western/incoming_exchange_students/academics.html"],"Seneca Polytechnic":[[0,3,5,6,8,14,19,20,21,22,23,25,32],"https://www.senecapolytechnic.ca/programs.html"],"Humber Polytechnic":[[0,5,6,8,15,19,21,22,25],"https://humber.ca/brand/sites/default/files/publications/2026-27_Humber_Viewbook.pdf"],"George Brown Polytechnic":[[0,5,7,8,19,22,25,29],"https://www.georgebrown.ca/international/future-students/program-availability-international-students"],"Centennial College":[[0,5,8,19,22,25,34,38],"https://www.centennialcollege.ca/about-centennial/schools"],"Conestoga College":[[0,3,5,8,19,22,25,28,29,38],"https://www.conestogac.on.ca/fulltime?deliveryGroupFilterIds=IN"],"Algonquin College":[[0,3,8,19],"https://www.algonquincollege.com/international/programs/"],"Niagara College":[[0,3,5,8,19,27,29],"https://international.niagaracollege.ca/programs/availability"],"Durham College":[[0,1,3,4,5,6,7,8,9,14,19,20,21,22,24,25,28,29,31,38],"https://www.durhamcollege.ca/info-for/international/study-dc/international-programs"],"British Columbia Institute of Technology (BCIT)":[[0,3,5,7,8,21,26,34],"https://www.bcit.ca/about/schools/"],"Southern Alberta Institute of Technology (SAIT)":[[0,1,3,4,5,7,8,20,28,29,32,34],"https://www.sait.ca/assets/documents/international-students/noc-program-list.pdf"],"Northern Alberta Institute of Technology (NAIT)":[[0,3,5,7,8,21,25,34],"https://www.nait.ca/nait/admissions/programs/program-availability-international"],"Saskatchewan Polytechnic":[[0,3,5,7,8,9,19,20,21,22,25,26,27,28,34],"https://saskpolytech.ca/programs-and-courses/resources/documents/viewbook.pdf"],"Harvard University":[[2,3,5,15,16,17,22,25],"https://college.harvard.edu/academics/liberal-arts-sciences/concentrations"],"Massachusetts Institute of Technology (MIT)":[[0,3,5,6,15,17,25],"https://catalog.mit.edu/schools/"],"Stanford University":[[2,3,4,5,8,13,15,16,17,18,20,22,24,25,26],"https://majors.stanford.edu/majors"],"University of California, Berkeley":[[0,3,4,5,6,8,14,15,19,20,21,25,26],"https://www.berkeley.edu/academics/schools-colleges/"],"University of California, Los Angeles (UCLA)":[[5,6,8,9,15,17,20,22,24,25],"https://admission.ucla.edu/apply/majors"],"University of Michigan":[[0,3,5,6,8,9,10,11,15,20,22,24,25,31],"https://admissions.umich.edu/academics-majors/majors-degrees"],"New York University (NYU)":[[0,5,9,11,15,19,20,22,24,25],"https://www.nyu.edu/admissions/undergraduate-admissions/majors-and-programs/campuses-schools-and-colleges.html"],"Arizona State University":[[0,3,5,6,7,8,14,15,17,20,21,22,25,26],"https://admission.asu.edu/academics/majors-degrees"],"University of Auckland":[[0,1,2,3,4,5,6,7,8,9,14,15,16,20,22,24,25,26,31],"https://www.auckland.ac.nz/en/study/study-options/find-a-study-option.html"],"University of Otago":[[0,2,3,4,8,14,15,16,17,20,24,25,26,27,31,37],"https://www.otago.ac.nz/subjects"],"Victoria University of Wellington":[[0,5,6,8,13,14,15,17,20,25],"https://www.wgtn.ac.nz/about/campuses-facilities/faculties-schools"],"University of Canterbury":[[0,5,8,14,15,20,25],"https://www.canterbury.ac.nz/study/academic-study"],"Massey University":[[0,8,15,17,22,25],"https://www.massey.ac.nz/study/find-a-subject-course-or-qualification/"],"Auckland University of Technology (AUT)":[[0,2,3,5,6,8,9,14,15,17,20,21,22,25,26,28,31],"https://www.aut.ac.nz/about/faculties-and-schools"],"University of Waikato":[[0,3,5,8,13,14,17,20,21,22,25,26,31],"https://www.waikato.ac.nz/int/study/options/subject-areas/"],"Lincoln University":[[0,6,25,26,27],"https://www.lincoln.ac.nz/about-us/academic-departments/","Agribusiness and commerce, agriculture and life sciences, environment, society and design"],"Ara Institute of Canterbury":[[0,3,5,6,8,16,20,21,22,24,25,28,29],"https://www.ara.ac.nz/study/priority-learner-groups/international/mainstream-programmes/"],"Otago Polytechnic":[[0,1,3,5,6,7,8,9,12,19,20,22,23,27,28,29,31,38],"https://www.op.ac.nz/international/courses-and-programmes"],"Southern Institute of Technology (SIT)":[[0,3,5,6,7,8,9,12,19,20,21,22,24,26,27,28,29,31,35],"https://www.sit.ac.nz/study-at-sit/subjects/"],"Manukau Institute of Technology (MIT)":[[0,3,5,8,9,16,19,20,28,29,31,33,38],"https://www.manukau.ac.nz/study/international-students/areas-of-study/"],"Unitec Institute of Technology":[[0,3,5,6,7,8,19,20,22,26,31,38],"https://www.unitec.ac.nz/career-and-study-options/"],"Nelson Marlborough Institute of Technology (NMIT)":[[0,3,5,7,9,17,22,24,26,27,28,29,32,33,38],"https://www.nmit.ac.nz/study/our-study-areas"],"Toi Ohomai Institute of Technology":[[0,1,3,5,6,7,8,9,12,19,20,22,25,26,28,29,31,38],"https://www.toiohomai.ac.nz/study/international-courses-list"],"Eastern Institute of Technology (EIT)":[[0,3,8,9,12,17,20,21,22,23,24,26,27,28,31,38],"https://www.eit.ac.nz/subject-areas/"],"Waikato Institute of Technology (Wintec)":[[0,3,9,21,22],"https://www.wintec.ac.nz/international"],"Open Polytechnic of New Zealand":[[0,1,3,5,6,7,8,10,13,14,19,20,21,26,36],"https://www.openpolytechnic.ac.nz/qualifications-and-courses/"],"Whitireia and WelTec":[[0,3,7,9,22,29],"https://www.whitireiaweltec.ac.nz/international-students/international-study-programmes"],"Trinity College Dublin":[[0,3,5,8,9,14,15,17,24,25],"https://www.tcd.ie/courses/undergraduate/a-z-of-ug-courses/"],"University College Dublin":[[0,1,3,5,6,8,12,14,15,17,25,26,27],"https://www.ucd.ie/myucd/courses/"],"University of Galway":[[0,5,8,14,15,17,25,28],"https://www.universityofgalway.ie/media/registry/admissions/files/2026-Quick-Guide.pdf"],"University College Cork":[[0,5,8,9,14,15,17,25],"https://www.ucc.ie/en/study/undergrad/courses/"],"University of Limerick":[[0,5,8,15,17,20,25],"https://www.ul.ie/courses/courses-discipline"],"Dublin City University":[[0,3,5,8,15,17,20,25],"https://www.dcu.ie/studentrecruitment/dcufaculties"],"Maynooth University":[[0,1,2,3,5,9,13,14,15,16,17,20,21,24,25,31],"https://www.courses.maynoothuniversity.ie/"],"Technological University of the Shannon (TUS)":[[0,3,5,6,7,8,9,13,17,21,22,24,25,28,31],"https://tus.ie/app/uploads/StudentRecruitment/TUS_SummaryGuide-2025.pdf"],"Technological University Dublin (TU Dublin)":[[0,3,4,5,6,7,8,14,15,16,17,20,21,22,24,25,28,29,31],"https://www.tudublin.ie/study/find-a-course/"],"Technical University of Munich":[[0,3,5,6,8,17,25],"https://www.tum.de/en/studies/application/master"],"LMU Munich":[[0,2,3,4,8,13,14,15,17,21,25,26],"https://www.lmu.de/en/study/all-degrees-and-programs/international-degree-programs/"],"Heidelberg University":[[0,3,5,8,14,15,16,17,22,24,25,31,37],"https://www.uni-heidelberg.de/en/study/all-subjects"],"Constructor University":[[0,2,3,4,5,13,18,25,26],"https://constructor.university/programs/undergraduate-education"],"Delft University of Technology":[[0,3,5,6,8,25,26,33],"https://www.tudelft.nl/en/education/programmes/bachelors"],"University of Amsterdam":[[0,2,8,11,13,14,15,17,25],"https://www.uva.nl/en/about-the-uva/organisation/graduate-schools-and-colleges/teaching-organisation.html"],"The Hague University of Applied Sciences":[[0,3,5,6,14,18,21],"https://www.thuas.com/programmes/bachelors/applied-computer-science"],"University of Twente":[[0,3,5,6,8,13,17,21,22,25],"https://www.utwente.nl/en/education/bachelor/programmes/"],"Maastricht School of Management (MSM)":[[0,35],"https://academy.maastrichtuniversity.nl/unit/msm/","MBA, Master in Management, executive education"],"KU Leuven":[[0,2,3,4,5,6,8,10,13,14,15,16,17,20,25,26,27,31,37],"https://www.kuleuven.be/brochures/files/PDF/International_programmes_at_KU_Leuven.pdf"],"Sorbonne University":[[3,5,8,15,16,25],"https://www.sorbonne-universite.fr/en/education/study-sorbonne-university/degree-seeking-students/bachelors-and-masters-programs"],"Politecnico di Milano":[[5,6],"https://www.polimi.it/en/education"],"University of Milan (La Statale)":[[2,3,8,10,14,15,16,17,18,25,27],"https://www.unimi.it/en/international/coming-abroad/enrol-programme/programmes-english"],"University of Milano-Bicocca":[[3,4,14,17,20,25,26],"https://en.unimib.it/education/teaching/bachelors-and-masters-degrees/sciences-masters-degree-programmes"],"Bocconi University":[[0,1,2,3,4,14,18,22],"https://www.unibocconi.it/en/programs/bachelor-science-programs"],"Università Cattolica del Sacro Cuore":[[0,1,2,8,13,16,17,18,21,27],"https://international.unicatt.it/ucscinternational-undergraduate-programmes"],"KTH Royal Institute of Technology":[[0,3,5,6,8,25],"https://www.kth.se/en/studies/master/programmes/subjects"],"University of Oslo (UiO)":[[0,2,3,8,13,14,15,16,17,20,21,22,24,25,37],"https://www.uio.no/english/studies/programmes/"],"Norwegian University of Science and Technology (NTNU)":[[0,3,5,6,15,17,22,24,25,26,33,35],"https://www.ntnu.edu/studies/international/master"],"University of Bergen (UiB)":[[2,3,5,6,8,13,14,15,16,17,20,21,22,24,25,26],"https://www4.uib.no/en/studies/programmes?teachinglanguage=english"],"UiT The Arctic University of Norway":[[3,5,8,13,14,15,16,17,22,24,25,26,33],"https://en.uit.no/education"],"OsloMet – Oslo Metropolitan University":[[3,5,6,7,17,20,22],"https://www.oslomet.no/en/study/master"],"University of Helsinki":[[2,3,4,8,10,14,15,16,17,20,21,25,26,27,29],"https://www.helsinki.fi/en/admissions-and-education/apply-bachelors-and-masters-programmes/apply-international-masters-programmes/explore-our-international-masters-programmes"],"University of Debrecen":[[0,2,3,4,5,8,9,10,11,13,14,15,16,19,20,21,24,25,26,27],"https://edu.unideb.hu/p/programs-a-z"],"Corvinus University of Budapest":[[0,1,2,3,4,17,18,21,31,35],"https://www.uni-corvinus.hu/post/landing-page/programmes/?lang=en"],"Institute of Tourism Studies (ITS)":[[0,16,28,29,30],"https://www.app.its.edu.mt/courses"],"International European University, Malta Campus":[[0,8],"https://campusmalta.ieu.edu.ua","Doctor of Medicine (MD), Bachelor of Management, Master of Management and Business Administration"],"Global College Malta":[[0,1,3,8,13,28,30],"https://www.fede.education/en/ecoles/global-college-malta/"],"American University of Malta":[[0,1,3,5,6,22,28],"https://aum.edu.mt/wp-content/uploads/2025/11/AUM-Generic-leaflet-Spring-2026FINLRforsite.pdf"],"University of Central Lancashire (UCLan Cyprus)":[[0,3,5,8,14,16,21,22,25,28],"https://www.uclancyprus.ac.cy/study/our-programmes-courses/"],"Neapolis University Pafos":[[0,1,3,4,5,6,13,14,18,21,26,36],"https://www.nup.ac.cy/on-campus-courses/"],"Vilnius Gediminas Technical University (VILNIUS TECH)":[[0,3,5,17,22,25],"https://vilniustech.lt/for-international-students/programmes-in-english-20252026/undergraduate-studies-/50783"],"Vytautas Magnus University (VMU)":[[0,2,3,5,14,15,16,17,18,20,22,24,25,26,27,37],"https://www.vdu.lt/en/studies/degree-studies/possibilities/"],"Kaunas University of Technology (KTU)":[[0,2,3,5,6,15,17,22,25],"https://admissions.ktu.edu/programmes/"],"ISM University of Management and Economics":[[0,1,2,4,18,21],"https://www.ism.lt/en/bachelor-studies/"],"Klaipeda University":[[0,2,15,16,25,26,28,33],"https://www.ku.lt/en/bachelors-degree/fall-intake/management-1"],"Utena University of Applied Sciences (Utenos kolegija)":[[0,1,3,5,8,9,11,14,19,23,26,27,28,30,34],"https://www.utenos-kolegija.lt/en/studies-programs"],"VIA University College":[[0,5,6,7,22],"https://en.via.dk/programmes/bachelor"],"University College of Northern Denmark (UCN)":[[3,6,7,8,20,28],"https://www.ucn.dk/english/education-and-programmes/"],"Business Academy Aarhus":[[0,6,21],"https://www.baaa.dk/programmes/","English-taught: Multimedia Design, Digital Concept Development"],"EHL Hospitality Business School":[[0,28,36],"https://www.ehl.edu/"],"Glion Institute of Higher Education":[[0,28,36],"https://www.glion.edu/programs/","Hospitality business, luxury business, real estate and hotel development"],"Les Roches Global Hospitality Education":[[0,28,29,30,31,32],"https://lesroches.edu/programs/masters-degrees/"],"César Ritz Colleges Switzerland":[[0,28],"https://cesarritzcolleges.edu/en/page/programs","Hotel and tourism management, hospitality business management, leadership, wine business"],"Culinary Arts Academy Switzerland":[[0,29],"https://www.culinaryartsswitzerland.com/en/culinary-courses/","Culinary arts, pastry, bakery and chocolate arts, culinary business management"],"Medical University of Gdańsk (MUG)":[[8,9,10],"https://admission.mug.edu.pl/"],"Pomeranian Medical University (PUM)":[[8,11],"https://apply.pum.edu.pl/courses/browse"],"Vistula University":[[0,1,2,3,4,5,6,13,16,18,21,28,34,35],"https://apply.vistula.edu.pl/"],"SWPS University":[[0,3,6,13,16,17],"https://english.swps.pl/academics/our-programs"],"New Bulgarian University (NBU)":[[3,6,13,15,16,17,24],"https://nbu.bg/en/prospective-students/admission-to-undergraduate-programs/how-to-apply-bp"],"Varna Free University (VFU)":[[0,1,4,5,22,30,35],"https://www.vfu.bg/admissions/master/programs-in-english-2.html","English-taught master's programmes"],"Medical University of Plovdiv":[[8,9,10,11],"https://mu-plovdiv.bg/en/admission-info/"],"Medical University of Varna (MU-Varna)":[[8,11],"https://www.mu-varna.bg/EN/AboutUs/Pages/Specialties.aspx"],"University of Eastern Finland (UEF)":[[0,1,3,8,14,15,16,17,20,25,26,27,28,37],"https://www.uef.fi/en/international-masters-degree-programmes"],"University of Oulu":[[0,3,5,6,8,20,25],"https://www.oulu.fi/en/apply/international-programmes"],"University of Vaasa":[[0,1,3,5,17,21],"https://www.uwasa.fi/en/education"],"JAMK University of Applied Sciences":[[0,3,5,8,19,20,22,26,28],"https://www.jamk.fi/en/apply-to-jamk"],"Metropolia University of Applied Sciences":[[0,3,5,8,19,22],"https://www.metropolia.fi/en"],"LAB University of Applied Sciences":[[0,5,6,8,28],"https://lab.fi/en/studies/bachelors-degree-programmes"],"Karelia University of Applied Sciences":[[0,2,3,5,8,9,19,21,26,27,28],"https://www.karelia.fi/en/bachelors-degrees/"],"Lapland University of Applied Sciences":[[0,4,5,9,28,31],"https://lapinamk.fi/en/studies/bachelors-degrees/"],"Häme University of Applied Sciences (HAMK)":[[0,3,5,6,7,9,20,26,27],"https://www.hamk.fi/en/come-to-study/how-do-i-apply-or-register-for-the-studies/january-joint-application/"],"Vaasa University of Applied Sciences (VAMK)":[[0,3,5,8,9,35],"https://www.vamk.fi/en/applicant/programmes"],"Kajaani University of Applied Sciences (KAMK)":[[0,3,28,31],"https://opinto-opas.kamk.fi/68148/en?lang=en"],"Seoul National University":[[0,5,8,9,10,12,15,17,20,22,24,25,27],"https://en.snu.ac.kr/admission/undergraduate/application"],"KAIST":[[0,3,5,6,15,25],"https://www.kaist.ac.kr/en/html/edu/03.html"],"Yonsei University":[[0,2,5,8,9,10,11,14,15,17,20,24,25,37],"https://www.yonsei.ac.kr/en_sc/2245/subview.do"],"Korea University":[[0,2,3,5,6,8,13,15,18,20,21,22,25],"https://oia.korea.ac.kr/_res/oia/etc/Application_Guide_for_Fall_2026_Freshman(ENG).pdf"],"POSTECH":[[0,3,5,15,25],"https://www.postech.ac.kr/eng/academics/department_info.do"],"Sungkyunkwan University":[[0,2,3,5,8,10,15,17,20,22,25,31],"https://www.skku.edu/eng/edu/education.do"],"Hanyang University":[[0,1,2,3,5,8,9,15,17,18,20,24,25,31],"https://www.hanyang.ac.kr/web/eng/s_college_department-info"],"Kyungdong University Global (KDU Global)":[[0,3,4,16,21,22,28],"https://www.readkong.com/page/22ac871af340edb8af9f7a61fa3b0c74-4957606","English-taught degrees in artificial intelligence, international business, hotel management, smart computing and media and film; Korean studies is taught in Korean"],"Universiti Malaya":[[0,1,2,3,5,6,8,11,14,15,16,17,20,22,24,25,31,37],"https://studyabroad.um.edu.my/inbound-attachment-placement"],"Universiti Putra Malaysia":[[2,3,5,6,8,12,16,17,20,25,26,27],"https://visa.educationmalaysia.gov.my/universiti-putra-malaysia-upm.html"],"Universiti Kebangsaan Malaysia":[[0,2,3,5,6,8,10,11,14,15,17,20,25,37],"https://www.ukm.my/studyukm/find-your-programme/"],"Universiti Sains Malaysia":[[0,3,5,6,7,8,10,11,15,16,17,20,21,22,25],"https://www.usm.my/faq"],"Universiti Teknologi Malaysia":[[0,3,5,6,15,17,25,36],"https://international.utm.my/about/faculties/"],"Taylor's University":[[0,3,5,6,7,8,10,14,15,16,20,21,22,25,28,29,30],"https://university.taylors.edu.my/en/study/faculties-and-schools.html"],"Monash University Malaysia":[[0,3,5,8,10,15,17,25],"https://www.monash.edu.my/mumgro/future-students/links-to-schools"],"University of Nottingham Malaysia":[[0,2,3,5,10,13,15,17,18,20,25,26],"https://www.nottingham.edu.my/Departments/index.aspx"],"SEGi University":[[0,1,3,5,6,7,8,9,10,11,13,14,20,21,22,24,28],"https://www.segi.edu.my/?p=990413"],"Universiti Tun Abdul Razak (UNIRAZAK)":[[0,1,2,3,13,17,19,20,31],"https://unirazak.edu.my/?p=5329"],"Universidad Nacional de Colombia (UNAL)":[[2,5,8,9,11,12,14,15,17,22,25,27],"https://estadisticas.unal.edu.co/fileadmin/user_upload/2022_Brochure_principal.pdf","Faculties at the Bogotá campus; most courses are taught in Spanish"],"Universidad de Antioquia (UdeA)":[[0,1,2,5,6,8,11,12,13,14,15,16,17,18,20,21,22,25,26,27,31],"https://www.timeshighereducation.com/world-university-rankings/universidad-de-antioquia","Checked on another website, not the university's own, so confirm current courses with a counsellor. Most courses are taught in Spanish.",1],"Universidad de los Andes (Uniandes)":[[0,2,5,6,8,14,15,17,18,20,25],"https://uniandes.smartcatalogiq.com/en/2026/catalogo/school-of-social-sciences","Most courses are taught in Spanish"],"Universidad EAFIT (EAFIT University)":[[0,1,2,5,14,15,17,25],"https://www.eafit.edu.co/academic-programs","Most courses are taught in Spanish"],"İstanbul Nişantaşı University":[[0,2,5,6,8,11,17,22],"https://en.wikipedia.org/wiki/Istanbul_Ni%C5%9Fanta%C5%9F%C4%B1_University","Checked on another website, not the university's own, so confirm current courses with a counsellor.",1],"Özyeğin University":[[0,5,6,14,17,32],"https://www.ozyegin.edu.tr/en/node/5656"],"Yüksek İhtisas University":[[8,31],"https://en.wikipedia.org/wiki/Y%C3%BCksek_%C4%B0htisas_University","Medicine, health sciences and sports sciences. Checked on another website, not the university's own, so confirm current courses with a counsellor.",1],"İstanbul Medipol University":[[0,1,2,3,5,6,8,9,10,11,13,17,18,20,21,32],"https://www.medipol.edu.tr/en/node/602"],"Üsküdar University":[[3,5,8,9,11,13,15,16,17,18,19,21,22,25],"https://international.uskudar.edu.tr/en/undergraduate-programs"],"İstanbul Ticaret University":[[0,1,2,3,5,6,13,14,17,18,21,22,23,28,32,34],"https://erasmusoffice.ticaret.edu.tr/faculties-and-departments/"],"Beihang University":[[0,2,3,5,14,15,16,17,22,25,32,34],"https://ev.buaa.edu.cn/Academics/Schools___Colleges.htm","Best known for aeronautics, astronautics and engineering"],"University of Science and Technology Beijing (USTB)":[[0,2,3,5,15,16,17,25,26],"https://en.wikipedia.org/wiki/University_of_Science_and_Technology_Beijing","Best known for metallurgy, materials and mining engineering. Checked on another website, not the university's own, so confirm current courses with a counsellor.",1],"Northwest A&F University":[[0,2,3,5,6,10,12,15,16,17,22,25,26,27],"https://en.nwafu.edu.cn/collegesandinstitutes/index.htm","Best known for agriculture, forestry and food science"],"Henan University of Science and Technology":[[0,2,5,8,14,15,20,25,27],"https://en.wikipedia.org/wiki/Henan_University_of_Science_and_Technology","Checked on another website, not the university's own, so confirm current courses with a counsellor.",1],"Anhui Normal University":[[0,2,3,14,15,16,17,18,20,22,25],"https://www.academicjobs.com/employers/anhui-normal-university/5840/faculties","Checked on another website, not the university's own, so confirm current courses with a counsellor.",1],"Liaoning University":[[0,2,5,14,15,22,25],"https://en.lnu.edu.cn/About_LNU.htm"],"Nanjing Forestry University":[[0,2,3,5,6,15,17,22,25,26,34],"https://eng.njfu.edu.cn/Admissions/Graduate/index.html","Best known for forestry, materials and design"]};
try{(function(){
  const list=document.getElementById('ulist'),count=document.getElementById('ucount'),q=document.getElementById('uq'),sort=document.getElementById('usort');
  const usel=document.getElementById('usubj'); SUBJ_AREAS.forEach((n,i)=>{const o=document.createElement('option');o.value=i;o.textContent=n;usel.appendChild(o);});
  const subjNames=u=>(USUBJ[u[0]]?USUBJ[u[0]][0].map(i=>SUBJ_AREAS[i]).join(' '):'');
  const UCH=6;
  const chips=[...document.querySelectorAll('#find-university .chip[data-c]')];
  const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const UCOL={'Australia':'linear-gradient(145deg,#ffa25a,#f0702a)','United Kingdom':'linear-gradient(145deg,#4f8cff,#1f4fc0)','Canada':'linear-gradient(145deg,#ff6b6b,#c9303a)','USA':'linear-gradient(145deg,#5a6b8c,#24324f)','New Zealand':'linear-gradient(145deg,#3ccf9a,#118a64)','Ireland':'linear-gradient(145deg,#8fdc5a,#3f9a2a)','Europe':'linear-gradient(145deg,#6f7dff,#3a3fc2)','South Korea':'linear-gradient(145deg,#ff7aa8,#c4386e)','Malaysia':'linear-gradient(145deg,#ffc94a,#e08a12)','Colombia':'linear-gradient(145deg,#ffd447,#c99400)','Türkiye':'linear-gradient(145deg,#ff5f5f,#b5161d)','China':'linear-gradient(145deg,#ff7a45,#c41e1e)'};
  const STOP=new Set(['of','and','the','de','&','in','at','for','university','université']);
  const ULOGO_H={"Beihang University":56,"Nanjing Forestry University":44,"Liaoning University":50,"Anhui Normal University":56,"Henan University of Science and Technology":56,"Northwest A&F University":26,"University of Science and Technology Beijing (USTB)":42,"OsloMet – Oslo Metropolitan University":60,"UiT The Arctic University of Norway":34,"University of Bergen (UiB)":40,"Norwegian University of Science and Technology (NTNU)":30,"University of Oslo (UiO)":48,"İstanbul Ticaret University":62,"Üsküdar University":48,"İstanbul Medipol University":52,"Yüksek İhtisas University":60,"Özyeğin University":40,"İstanbul Nişantaşı University":48,"Corvinus University of Budapest":48,"American University of Malta":40,"Global College Malta":36,"Università Cattolica del Sacro Cuore":44,"Bocconi University":44,"University of Milano-Bicocca":60,"University of Milan (La Statale)":56,"Politecnico di Milano":44,"KU Leuven":40,"Maastricht School of Management (MSM)":36,"University of Twente":42,"The Hague University of Applied Sciences":38,"Technological University Dublin (TU Dublin)":58,"Technological University of the Shannon (TUS)":40,"Kajaani University of Applied Sciences (KAMK)":60,"Vaasa University of Applied Sciences (VAMK)":40,"Häme University of Applied Sciences (HAMK)":44,"Karelia University of Applied Sciences":40,"Universidad EAFIT (EAFIT University)":44,"Universidad de los Andes (Uniandes)":44,"Universidad de Antioquia (UdeA)":36,"Universidad Nacional de Colombia (UNAL)":44,"Constructor University":40,"University of Vaasa":40,"LAB University of Applied Sciences":40,"JAMK University of Applied Sciences":34,"University of Oulu":40,"University of Eastern Finland (UEF)":60,"University of Helsinki":56,"University of Buckingham":40,"University of Cumbria":46,"Medical University of Varna (MU-Varna)":60,"Varna Free University (VFU)":50,"New Bulgarian University (NBU)":50,"Vistula University":60,"SWPS University":54,"Pomeranian Medical University (PUM)":50,"Medical University of Gdańsk (MUG)":54,"Culinary Arts Academy Switzerland":60,"César Ritz Colleges Switzerland":60,"Les Roches Global Hospitality Education":30,"Glion Institute of Higher Education":40,"EHL Hospitality Business School":60,"VIA University College":44,"University College of Northern Denmark (UCN)":54,"Business Academy Aarhus":54,"Seneca Polytechnic":50,"Humber Polytechnic":40,"Niagara College":54,"Conestoga College":46,"Northern Alberta Institute of Technology (NAIT)":46,"George Brown Polytechnic":56,"Centennial College":60,"Algonquin College":44,"Durham College":46,"British Columbia Institute of Technology (BCIT)":42,"Southern Alberta Institute of Technology (SAIT)":40,"Saskatchewan Polytechnic":52,"POSTECH":60,"Sungkyunkwan University":60,"Hanyang University":60,"Korea University":44,"Yonsei University":60,"Seoul National University":60,"Utena University of Applied Sciences (Utenos kolegija)":46,"Klaipeda University":46,"ISM University of Management and Economics":46,"Kaunas University of Technology (KTU)":52,"Vytautas Magnus University (VMU)":48,"Vilnius Gediminas Technical University (VILNIUS TECH)":40,"Kyungdong University Global (KDU Global)":44,"Universiti Teknologi Malaysia":44,"Taylor's University":52,"Monash University Malaysia":46,"University of Nottingham Malaysia":48,"Universiti Tun Abdul Razak (UNIRAZAK)":46,"SEGi University":54,"Neapolis University Pafos":66,"University of Central Lancashire (UCLan Cyprus)":50,"International European University, Malta Campus":54,"Institute of Tourism Studies (ITS)":44,"University of Debrecen":84,"Maynooth University":66,"Dublin City University":46,"University of Limerick":62,"University College Cork":70,"University of Galway":62,"Trinity College Dublin":52,"University College Dublin":80,"Charles Sturt University (CSU)":50,"Australian Maritime College":32,"Aviation Australia":44,"Le Cordon Bleu Australia":46,"Torrens University Australia":56,"Kaplan Business School":44,"Academies Australasia":48,"Stanley College":50,"Australian College of Applied Professions":56,"William Angliss Institute":68,"Holmesglen Institute":64,"Melbourne Institute of Technology":46,"Sydney Institute of Business and Technology":52,"Australian Institute of Professionals (AIP)":56,"Australian Institute of Higher Education":50,"Australian Institute of Business":80,"Box Hill Institute":50,"Melbourne Polytechnic":46,"TAFE Queensland":72,"Excelsia University College":50,"Engineering Institute of Technology (EIT)":52,"Edith Cowan College":50,"ECA College":50,"Charles Darwin University (CDU)":62,"Canterbury Business College (CBC)":54,"Canberra Institute of Technology":46,"Bond University":56,"Basair Aviation College":50,"Australian Catholic University (ACU)":54,"Whitireia and WelTec":70,"Open Polytechnic of New Zealand":42,"Waikato Institute of Technology (Wintec)":52,"Eastern Institute of Technology (EIT)":70,"Toi Ohomai Institute of Technology":44,"Nelson Marlborough Institute of Technology (NMIT)":46,"Unitec Institute of Technology":60,"Manukau Institute of Technology (MIT)":58,"Southern Institute of Technology (SIT)":50,"Otago Polytechnic":84,"Ara Institute of Canterbury":62,"Lincoln University":52,"University of Lincoln":46,"University of Waikato":50,"Auckland University of Technology (AUT)":72,"Massey University":72,"University of Canterbury":84,"Victoria University of Wellington":46,"University of Otago":62,"University of Auckland":54,"McGill University":50,"University of British Columbia":80,"University of Toronto":56,"University of Glasgow":50,"University of Birmingham":44,"University of Manchester":62,"University of Edinburgh":42,"King's College London":80,"University College London (UCL)":40,"Imperial College London":44,"University of Cambridge":38,"University of Oxford":46,"University of Western Australia":48,"Deakin University":46,"RMIT University":48,"University of Queensland":44,"Monash University":42,"UNSW Sydney":50,"Australian National University":50,"University of Melbourne":42,"University of Sydney":80};
  const ULOGO={"Beihang University":"img/cn-beihang.svg","Nanjing Forestry University":"img/cn-njfu.webp","Liaoning University":"img/cn-lnu.webp","Anhui Normal University":"img/cn-ahnu.webp","Henan University of Science and Technology":"img/cn-haust.webp","Northwest A&F University":"img/cn-nwafu.webp","University of Science and Technology Beijing (USTB)":"img/cn-ustb.webp","OsloMet – Oslo Metropolitan University":"img/no-oslomet.webp","UiT The Arctic University of Norway":"img/no-uit.svg","University of Bergen (UiB)":"img/no-uib.svg","Norwegian University of Science and Technology (NTNU)":"img/no-ntnu.svg","University of Oslo (UiO)":"img/no-uio.webp","İstanbul Ticaret University":"img/tr-ticaret.webp","Üsküdar University":"img/tr-uskudar.webp","İstanbul Medipol University":"img/tr-medipol.webp","Yüksek İhtisas University":"img/tr-yiu.webp","Özyeğin University":"img/tr-ozyegin.webp","İstanbul Nişantaşı University":"img/tr-nisantasi.webp","Corvinus University of Budapest":"img/hu-corvinus.svg","American University of Malta":"img/mt-aum.webp","Global College Malta":"img/mt-gcm.webp","Università Cattolica del Sacro Cuore":"img/it-cattolica.webp","Bocconi University":"img/it-bocconi.webp","University of Milano-Bicocca":"img/it-bicocca.webp","University of Milan (La Statale)":"img/it-statale.webp","Politecnico di Milano":"img/it-polimi.webp","KU Leuven":"img/be-kuleuven.svg","Maastricht School of Management (MSM)":"img/nl-msm.webp","University of Twente":"img/nl-twente.webp","The Hague University of Applied Sciences":"img/nl-hhs.webp","Technological University Dublin (TU Dublin)":"img/ie-tudublin.webp","Technological University of the Shannon (TUS)":"img/ie-tus.webp","Kajaani University of Applied Sciences (KAMK)":"img/fi-kamk.webp","Vaasa University of Applied Sciences (VAMK)":"img/fi-vamk.svg","Häme University of Applied Sciences (HAMK)":"img/fi-hamk.svg","Karelia University of Applied Sciences":"img/fi-karelia.webp","Universidad EAFIT (EAFIT University)":"img/co-eafit.webp","Universidad de los Andes (Uniandes)":"img/co-uniandes.webp","Universidad de Antioquia (UdeA)":"img/co-udea.webp","Universidad Nacional de Colombia (UNAL)":"img/co-unal.svg","Constructor University":"img/logo-constructor.webp","University of Vaasa":"img/logo-vaasa.webp","LAB University of Applied Sciences":"img/logo-lab.svg","JAMK University of Applied Sciences":"img/logo-jamk.webp","University of Oulu":"img/logo-oulu.svg","University of Eastern Finland (UEF)":"img/logo-uef.webp","University of Helsinki":"img/logo-helsinki.webp","University of Buckingham":"img/logo-buckingham.webp","University of Cumbria":"img/logo-cumbria.webp","Medical University of Varna (MU-Varna)":"img/logo-mu-varna.webp","Varna Free University (VFU)":"img/logo-vfu.webp","New Bulgarian University (NBU)":"img/logo-nbu.webp","Vistula University":"img/logo-vistula.webp","SWPS University":"img/logo-swps.svg","Pomeranian Medical University (PUM)":"img/logo-pum.svg","Medical University of Gdańsk (MUG)":"img/logo-mug.svg","Culinary Arts Academy Switzerland":"img/logo-caa.webp","César Ritz Colleges Switzerland":"img/logo-cesar-ritz.svg","Les Roches Global Hospitality Education":"img/logo-lesroches.webp","Glion Institute of Higher Education":"img/logo-glion.svg","EHL Hospitality Business School":"img/logo-ehl.webp","VIA University College":"img/logo-via.webp","University College of Northern Denmark (UCN)":"img/logo-ucn.webp","Business Academy Aarhus":"img/logo-baaa.webp","Seneca Polytechnic":"img/logo-seneca.webp","Humber Polytechnic":"img/logo-humber.webp","Niagara College":"img/logo-niagara.svg","Conestoga College":"img/logo-conestoga.svg","Northern Alberta Institute of Technology (NAIT)":"img/logo-nait.svg","George Brown Polytechnic":"img/logo-georgebrown.webp","Centennial College":"img/logo-centennial.webp","Algonquin College":"img/logo-algonquin.webp","Durham College":"img/logo-durham.webp","British Columbia Institute of Technology (BCIT)":"img/logo-bcit.webp","Southern Alberta Institute of Technology (SAIT)":"img/logo-sait.webp","Saskatchewan Polytechnic":"img/logo-saskpoly.webp","POSTECH":"img/logo-postech.svg","Sungkyunkwan University":"img/logo-skku.webp","Hanyang University":"img/logo-hanyang.webp","Korea University":"img/logo-korea-univ.webp","Yonsei University":"img/logo-yonsei.webp","Seoul National University":"img/logo-snu.webp","Utena University of Applied Sciences (Utenos kolegija)":"img/logo-utena.svg","Klaipeda University":"img/logo-klaipeda.webp","ISM University of Management and Economics":"img/logo-ism.webp","Kaunas University of Technology (KTU)":"img/logo-ktu.svg","Vytautas Magnus University (VMU)":"img/logo-vmu.webp","Vilnius Gediminas Technical University (VILNIUS TECH)":"img/logo-vilnius-tech.webp","Kyungdong University Global (KDU Global)":"img/logo-kdu.webp","Universiti Teknologi Malaysia":"img/logo-utm.webp","Taylor's University":"img/logo-taylors.webp","Monash University Malaysia":"img/logo-monash.svg","University of Nottingham Malaysia":"img/logo-nottingham-my.webp","Universiti Tun Abdul Razak (UNIRAZAK)":"img/logo-unirazak.webp","SEGi University":"img/logo-segi.webp","Neapolis University Pafos":"img/logo-neapolis.webp","University of Central Lancashire (UCLan Cyprus)":"img/logo-uclan-cyprus.webp","International European University, Malta Campus":"img/logo-ieu-malta.webp","Institute of Tourism Studies (ITS)":"img/logo-its-malta.webp","University of Debrecen":"img/logo-debrecen.webp","Maynooth University":"img/2d203efa68.webp","Dublin City University":"img/534f87b4c7.webp","University of Limerick":"img/d031d6bbef.webp","University College Cork":"img/c28bbb6e16.webp","University of Galway":"img/123d243158.webp","Trinity College Dublin":"img/930d615553.webp","University College Dublin":"img/a9c95e0174.svg","Charles Sturt University (CSU)":"img/09879928a7.svg","Australian Maritime College":"img/704f969826.svg","Aviation Australia":"img/cfaf655489.svg","Le Cordon Bleu Australia":"img/c5e4e5c10b.webp","Torrens University Australia":"img/2e2ed02d88.webp","Kaplan Business School":"img/0acdafde72.webp","Academies Australasia":"img/beac3da682.webp","Stanley College":"img/b40f01d105.webp","Australian College of Applied Professions":"img/9c6ec3e347.webp","William Angliss Institute":"img/75577c597f.webp","Holmesglen Institute":"img/692861e285.svg","Melbourne Institute of Technology":"img/8ddd8c5c7f.webp","Sydney Institute of Business and Technology":"img/8c306b01e1.svg","Australian Institute of Professionals (AIP)":"img/e8318d2df1.webp","Australian Institute of Higher Education":"img/0039918b7d.svg","Australian Institute of Business":"img/1a770e33a3.svg","Box Hill Institute":"img/b497f58c21.webp","Melbourne Polytechnic":"img/912843d5cc.webp","TAFE Queensland":"img/75ebb30ec4.svg","Excelsia University College":"img/0d9fb48f2e.webp","Engineering Institute of Technology (EIT)":"img/91169db735.webp","Edith Cowan College":"img/6abf8fcc3d.svg","ECA College":"img/b0fc6b7b44.webp","Charles Darwin University (CDU)":"img/d16a551d0e.webp","Canterbury Business College (CBC)":"img/34afdf492b.webp","Canberra Institute of Technology":"img/91928c5252.webp","Bond University":"img/12de0b35ad.webp","Basair Aviation College":"img/e2a5f5b53e.webp","Australian Catholic University (ACU)":"img/c8c2288200.svg","Whitireia and WelTec":"img/8520c2ff33.webp","Open Polytechnic of New Zealand":"img/9edc80d820.svg","Waikato Institute of Technology (Wintec)":"img/ea9aa862c3.svg","Eastern Institute of Technology (EIT)":"img/885c0c3a07.webp","Toi Ohomai Institute of Technology":"img/59c60030b0.webp","Nelson Marlborough Institute of Technology (NMIT)":"img/6db977037f.svg","Unitec Institute of Technology":"img/9cbaee93bb.webp","Manukau Institute of Technology (MIT)":"img/4cad8f3071.webp","Southern Institute of Technology (SIT)":"img/3f1ad7093e.webp","Otago Polytechnic":"img/7507f8ac23.svg","Ara Institute of Canterbury":"img/155a25b083.webp","Lincoln University":"img/5af744ff11.webp","University of Lincoln":"img/95c4314ec6.webp","University of Waikato":"img/72eea07261.webp","Auckland University of Technology (AUT)":"img/240845c76c.webp","Massey University":"img/16a6bfd3c1.webp","University of Canterbury":"img/4edb0ab602.webp","Victoria University of Wellington":"img/c885483b35.webp","University of Otago":"img/838432ce45.webp","University of Auckland":"img/942aa27780.webp","McGill University":"img/2f03b480cf.webp","University of British Columbia":"img/ddacbbd871.webp","University of Toronto":"img/558d214827.webp","University of Glasgow":"img/aac51da0d8.webp","University of Birmingham":"img/44befb2b69.webp","University of Manchester":"img/5fb1da2cf6.webp","University of Edinburgh":"img/adabb269be.svg","King's College London":"img/2eef050128.webp","University College London (UCL)":"img/c47f921f85.svg","Imperial College London":"img/4622d7f097.webp","University of Cambridge":"img/27e1f28450.webp","University of Oxford":"img/0f5ce16653.webp","University of Western Australia":"img/a8dad57144.webp","Deakin University":"img/ec1dbb3f71.webp","RMIT University":"img/670ce3e8df.webp","University of Queensland":"img/9720db08a7.webp","Monash University":"img/ff707ab408.webp","UNSW Sydney":"img/98b430ce61.webp","Australian National University":"img/2549a0a807.webp","University of Sydney":"img/3726705030.webp","University of Melbourne":"img/deda2803bd.webp"};
  const MONO={"University of Vaasa":"UV","JAMK University of Applied Sciences":"JAMK","Metropolia University of Applied Sciences":"MET","LAB University of Applied Sciences":"LAB","Karelia University of Applied Sciences":"KAR","Lapland University of Applied Sciences":"LUAS","University of Westminster":"UoW","University of Portsmouth":"UoP","University of Brighton":"UoB","Medical University of Plovdiv":"MUP","Vistula University":"VU","EHL Hospitality Business School":"EHL","Glion Institute of Higher Education":"GL","Les Roches Global Hospitality Education":"LR","César Ritz Colleges Switzerland":"CR","Culinary Arts Academy Switzerland":"CAA","VIA University College":"VIA","Business Academy Aarhus":"BAA","Seneca Polytechnic":"SEN","Humber Polytechnic":"HUM","George Brown Polytechnic":"GBC","Centennial College":"CEN","Conestoga College":"CON","Algonquin College":"ALG","Niagara College":"NC","Durham College":"DC","Saskatchewan Polytechnic":"SP","University of Debrecen":"UD","TAFE Queensland":"TQ","Melbourne Polytechnic":"MP","Box Hill Institute":"BHI","Australian Institute of Business":"AIB","Australian Institute of Higher Education":"AIHE","Sydney Institute of Business and Technology":"SIBT","Melbourne Institute of Technology":"MIT","Holmesglen Institute":"HI","William Angliss Institute":"WAI","Australian College of Applied Professions":"ACAP","Stanley College":"SC","Academies Australasia":"AA","Kaplan Business School":"KBS","Torrens University Australia":"TUA","International College of Management, Sydney":"ICMS","Le Cordon Bleu Australia":"LCB","Aviation Australia":"AvA","Australian Maritime College":"AMC","ECA College":"ECA","Edith Cowan College":"ECC","Excelsia University College":"EUC","Basair Aviation College":"BAC","Bond University":"Bond","Canberra Institute of Technology":"CIT","Ara Institute of Canterbury":"Ara","Otago Polytechnic":"OP","Unitec Institute of Technology":"Unitec","Toi Ohomai Institute of Technology":"TOI","Waikato Institute of Technology (Wintec)":"Wintec","Open Polytechnic of New Zealand":"OPNZ","Whitireia and WelTec":"W+W","Arizona State University": "ASU", "University College Dublin": "UCD", "University College Cork": "UCC", "Dublin City University": "DCU", "Trinity College Dublin": "TCD", "Australian National University": "ANU", "University of Queensland": "UQ", "University of Western Australia": "UWA", "University of British Columbia": "UBC", "LMU Munich": "LMU", "KU Leuven": "KU", "KTH Royal Institute of Technology": "KTH", "Seoul National University": "SNU", "RMIT University": "RMIT","University of Melbourne": "UoM", "University of Sydney": "USyd", "UNSW Sydney": "UNSW", "Monash University": "MU", "Deakin University": "DU", "University of Oxford": "Ox", "University of Cambridge": "Cam", "Imperial College London": "ICL", "King's College London": "KCL", "University of Edinburgh": "UoE", "University of Manchester": "UoM", "University of Birmingham": "UoB", "University of Glasgow": "UoG", "University of Toronto": "UofT", "McGill University": "McG", "University of Alberta": "UA", "University of Waterloo": "UW", "McMaster University": "Mac", "University of Ottawa": "uO", "Western University": "WU", "Harvard University": "HU", "Stanford University": "SU", "University of California, Berkeley": "UCB", "University of Michigan": "UM", "University of Auckland": "UoA", "University of Otago": "UO", "Victoria University of Wellington": "VUW", "University of Canterbury": "UC", "Massey University": "MU", "University of Waikato": "UoW", "Lincoln University": "LU", "University of Galway": "UoG", "University of Limerick": "UL", "Maynooth University": "MU", "Technical University of Munich": "TUM", "Heidelberg University": "HU", "Delft University of Technology": "TUD", "University of Amsterdam": "UvA", "Sorbonne University": "SU", "Politecnico di Milano": "PoliMi", "University of Helsinki": "UH", "KAIST": "KAIST", "Yonsei University": "YU", "Korea University": "KU", "POSTECH": "POS", "Sungkyunkwan University": "SKKU", "Hanyang University": "HYU", "Universiti Malaya": "UM", "Universiti Putra Malaysia": "UPM", "Universiti Kebangsaan Malaysia": "UKM", "Universiti Sains Malaysia": "USM", "Universiti Teknologi Malaysia": "UTM", "Taylor's University": "TU", "Monash University Malaysia": "MUM", "University of Nottingham Malaysia": "UNM"};
  function mono(n){if(MONO[n])return MONO[n];const p=n.match(/\(([A-Z]{2,})\)/);if(p)return p[1];
    const w=n.replace(/[(),]/g,' ').split(/\s+/).filter(Boolean);if(/^[A-Z]{2,}$/.test(w[0]))return w[0].slice(0,5);
    return w.filter(x=>!STOP.has(x.toLowerCase())).map(x=>x[0].toUpperCase()).join('').slice(0,4)||'U';}
  const ULIM=12; let showAll=false;
  const more=document.createElement('button'); more.type='button'; more.className='btn btn-line umore'; more.hidden=true;
  list.after(more); more.addEventListener('click',()=>{showAll=true;render();});
  function usubjHtml(n){const x=USUBJ[n];
    if(!x)return '<p class="usub-none">Subjects: ask a counsellor.</p>';
    const sv=usel.value, names=x[0].map(i=>SUBJ_AREAS[i]);
    if(sv!==''){const k=names.indexOf(SUBJ_AREAS[+sv]);if(k>0){names.unshift(names.splice(k,1)[0]);}}
    const li=(t,i)=>`<li${i>=UCH?' class="xtra" hidden':''}${sv!==''&&t===SUBJ_AREAS[+sv]?' class="on"':''}>${esc(t)}</li>`;
    return `<div class="usub"><span class="mini">Main subject areas</span><ul class="usubs">${names.map(li).join('')}</ul>${names.length>UCH?`<button type="button" class="umore-s" aria-expanded="false">+${names.length-UCH} more</button>`:''}${x[2]?`<p class="usnote">${esc(x[2])}</p>`:''}${x[3]?`<a class="ucourses" href="${esc(x[1])}" target="_blank" rel="noopener">Where this list comes from<span class="vh"> for ${esc(n)} (opens another website)</span> ↗</a>`:`<a class="ucourses" href="${esc(x[1])}" target="_blank" rel="noopener">See all courses<span class="vh"> at ${esc(n)} (opens the university's website)</span> ↗</a>`}</div>`;}
  function render(){
    const sel=chips.filter(c=>c.getAttribute('aria-pressed')==='true').map(c=>c.dataset.c);
    const fold=t=>t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i').replace(/[øØ]/g,'o').replace(/[æÆ]/g,'ae').replace(/ß/g,'ss').replace(/[łŁ]/g,'l').replace(/[đĐ]/g,'d').toLowerCase(); const term=fold(q.value.trim());
    const sv=usel.value;
    let r=UNIS.filter(u=>(!sel.length||sel.includes(u[2]))&&(sv===''||(USUBJ[u[0]]&&USUBJ[u[0]][0].includes(+sv)))&&(!term||fold(u[0]+' '+u[1]+' '+u[2]+' '+subjNames(u)).includes(term)));
    if(sort.value==='az') r=r.slice().sort((a,b)=>a[0].localeCompare(b[0]));
    const total=r.length, limited=!showAll&&!term&&sv===''&&total>ULIM;
    if(limited) r=r.slice(0,ULIM);
    count.textContent=total+' of '+UNIS.length+' universities and institutes'+(limited?' · showing '+ULIM:'');
    more.hidden=!limited; more.textContent='Show all '+total+' →';
    list.innerHTML=r.length?r.map(u=>`<div class="card uni"><div class="utop">${ULOGO[u[0]]?`<span class="ulogo"><img style="height:${ULOGO_H[u[0]]||44}px" src="${ULOGO[u[0]]}" alt="${esc(u[0])} logo" loading="lazy" decoding="async"></span>`:`<span class="umono${mono(u[0]).length>4?' long':''}" style="--uc:${UCOL[u[2]]||'var(--blue)'}" aria-hidden="true">${mono(u[0])}</span>`}<span class="tag">${esc(u[2])}</span></div><h3>${esc(u[0])}</h3>${u[1]?`<p class="loc">${esc(u[1])}</p>`:''}${usubjHtml(u[0])}<button type="button" class="ask" data-u="${esc(u[0])}" data-c="${esc(u[2])}">Ask about this university →</button></div>`).join(''):'<p class="uempty">No universities match your search. Try a different spelling, clear the filters, or ask a counsellor for suggestions.</p>';
  }
  chips.forEach(c=>c.addEventListener('click',()=>{c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true');showAll=false;render()}));
  document.getElementById('uclear').addEventListener('click',()=>{chips.forEach(c=>c.setAttribute('aria-pressed','false'));q.value='';usel.value='';showAll=false;render()});
  q.addEventListener('input',render); sort.addEventListener('change',render);
  usel.addEventListener('change',()=>{showAll=false;render();});
  list.addEventListener('click',e=>{const b=e.target.closest('.umore-s');if(!b)return;const box=b.closest('.usub');const open=b.getAttribute('aria-expanded')==='true';box.querySelectorAll('.xtra').forEach(li=>li.hidden=open);b.setAttribute('aria-expanded',open?'false':'true');b.textContent=open?'+'+box.querySelectorAll('.xtra').length+' more':'Show fewer';});
  list.addEventListener('click',e=>{const b=e.target.closest('.ask');if(!b)return;
    const d=document.getElementById('d'); [...d.options].forEach(o=>{if(o.text===b.dataset.c)d.value=o.text});
    const m=document.getElementById('m'); m.value='I would like to know more about '+b.dataset.u+'.';
    document.getElementById('contact').scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('n').focus({preventScroll:true}),400);});
  render();
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

const SUBJ=[["Business & Management", "Learn how organisations work, from strategy and marketing to operations and leadership.", "MBA, international business, marketing, supply chain, human resources", "Australia, UK, Canada, USA"], ["Accounting & Finance", "Build skills in financial reporting, investment, banking and risk.", "Accounting, finance, banking, actuarial science, fintech", "UK, Australia, Canada"], ["Computer Science & IT", "Design software, systems and networks that power the digital world.", "Software engineering, cyber security, AI, cloud computing, networking", "USA, Canada, Australia, Ireland"], ["Data Science & Analytics", "Turn data into decisions using statistics, programming and machine learning.", "Data science, business analytics, statistics, machine learning", "UK, Ireland, USA, Australia"], ["Engineering", "Apply maths and science to design and build solutions.", "Civil, mechanical, electrical, chemical, software, engineering management", "Australia, Canada, Germany, USA"], ["Health & Medicine", "Prepare for careers that improve people's health.", "Public health, pharmacy, biomedical science, physiotherapy, health management", "UK, Australia, Ireland"], ["Nursing", "Train for a hands-on, in-demand profession in hospitals and communities.", "Bachelor of Nursing, Master of Nursing, midwifery, aged care", "Australia, New Zealand, Canada, UK"], ["Law", "Understand legal systems and prepare for legal and policy careers.", "LLB, LLM, international law, commercial law, human rights", "UK, Australia, Ireland"], ["Architecture & Design", "Combine creativity and technical skill to shape spaces and products.", "Architecture, graphic design, interior design, UX design, fashion", "UK, Italy, Australia"], ["Media & Communication", "Learn to create and manage content across media and digital platforms.", "Journalism, digital media, public relations, film and television", "UK, Australia, Ireland"], ["Education & Teaching", "Prepare to teach and lead in schools and other learning settings.", "Teaching, TESOL, educational leadership, early childhood", "Australia, UK, New Zealand"], ["Hospitality & Tourism", "Train for careers in hotels, events, travel and food services.", "Hospitality management, tourism, events, culinary arts", "Australia, Canada, Malaysia"], ["Natural & Life Sciences", "Explore how the natural world works through research and lab work.", "Biology, chemistry, physics, biotechnology, environmental science", "UK, Germany, South Korea, USA"], ["Agriculture & Environment", "Work on food, farming and the sustainability challenges of the future.", "Agriculture, food science, sustainability, renewable energy", "New Zealand, Australia, Europe"], ["Social Sciences & Humanities", "Study people, societies and ideas, and build strong research and writing skills.", "Psychology, economics, international relations, sociology, history", "UK, Europe, USA"]];
try{(function(){
  const list=document.getElementById('slist'),count=document.getElementById('scount'),q=document.getElementById('sq');
  const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const SIMG={"Business & Management": "business", "Accounting & Finance": "finance", "Computer Science & IT": "computing", "Data Science & Analytics": "data", "Engineering": "engineering", "Health & Medicine": "health", "Nursing": "nursing", "Law": "law", "Architecture & Design": "architecture", "Media & Communication": "media", "Education & Teaching": "education", "Hospitality & Tourism": "hospitality", "Natural & Life Sciences": "sciences", "Agriculture & Environment": "agriculture", "Social Sciences & Humanities": "social"};
  function render(){
    const t=q.value.trim().toLowerCase();
    const r=SUBJ.filter(x=>!t||x.join(' ').toLowerCase().includes(t));
    count.textContent=r.length+' of '+SUBJ.length+' subject areas';
    list.innerHTML=r.length?r.map(x=>`<div class="card subj">${SIMG[x[0]]?`<img class="simg" src="img/subj/${SIMG[x[0]]}.svg" alt="" width="320" height="180" loading="lazy" decoding="async">`:''}<h3>${esc(x[0])}</h3><p>${esc(x[1])}</p><dl><dt>Specialisations</dt><dd>${esc(x[2])}</dd><dt>Popular destinations</dt><dd>${esc(x[3])}</dd></dl><button type="button" class="ask" data-s="${esc(x[0])}">Ask about ${esc(x[0])} →</button></div>`).join(''):'<p class="uempty">No subjects match your search. Try a broader word, or ask a counsellor for help.</p>';
  }
  q.addEventListener('input',render);
  list.addEventListener('click',e=>{const b=e.target.closest('.ask');if(!b)return;
    document.getElementById('m').value='I am interested in studying '+b.dataset.s.replace('&amp;','&')+'. Which courses and countries would suit me?';
    document.getElementById('contact').scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('n').focus({preventScroll:true}),400);});
  render();
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

const SCH=[["Chevening Scholarships", "UK government (FCDO)", "United Kingdom", ["Postgraduate"], "Government", "Fully funded one-year master's degree in the UK for future leaders. Bangladesh is a Chevening country.", {"covers": ["Full tuition fees for an eligible one-year master's course", "Monthly living allowance", "Return economy flight to the UK", "Visa application fee and TB test", "Arrival and departure allowances"], "eligible": ["Citizen of a Chevening-eligible country, such as Bangladesh", "Undergraduate degree that qualifies you for a UK master's", "At least 2,800 hours (about two years) of work experience after graduating", "Apply to three eligible UK master's courses and hold an unconditional offer by the July deadline", "Return to your home country for at least two years after your degree"], "apply": ["Apply online on the Chevening website", "Write four essays: leadership, networking, why the UK and your courses, and career plan", "Provide two references", "Shortlisted candidates are interviewed, usually at the British High Commission in Dhaka"], "when": "Applications usually open in early August and close in early October. The 2027/28 round closed on 6 October 2026, so the next round is expected to open around August 2027. Check the official site for confirmed dates.", "link": "https://www.chevening.org/"}], ["Commonwealth Scholarships", "Commonwealth Scholarship Commission in the UK", "United Kingdom", ["Postgraduate", "Doctorate"], "Government", "Master's and PhD scholarships in the UK for talented students from eligible Commonwealth countries, including Bangladesh.", {"covers": ["Tuition fees", "Return airfare", "Monthly living allowance", "Other allowances, such as a thesis grant, where they apply"], "eligible": ["Citizen of an eligible Commonwealth country", "Usually at least an upper second-class (2:1) honours degree or equivalent", "Unable to afford UK study without the scholarship", "Intend to return home and contribute to your country's development"], "apply": ["Most awards require a nomination from your country's nominating agency (in Bangladesh, check with the University Grants Commission and the Ministry of Education)", "Complete the CSC online application as well", "Provide academic references and a development impact statement"], "when": "Usually opens in September and closes in October. The 2027/28 round closed on 20 October 2026. Nominating agencies set earlier internal deadlines, so start in mid-year.", "link": "https://cscuk.fcdo.gov.uk/"}], ["Fulbright Foreign Student Program", "US government", "USA", ["Postgraduate", "Doctorate"], "Government", "Graduate study and research in the United States, run in Bangladesh through the US Embassy in Dhaka.", {"covers": ["Tuition fees", "Return airfare", "Living stipend", "Health and accident coverage"], "eligible": ["Bangladeshi citizen with a bachelor's degree", "Strong English skills (TOEFL or IELTS)", "Leadership potential and a clear study plan", "Usually must return home for two years after the program (J-1 visa rule)"], "apply": ["Watch for the call for applications from the US Embassy Dhaka", "Submit essays, references and transcripts", "Shortlisted applicants are interviewed"], "when": "Usually announced once a year, more than a year before the program starts. Check the US Embassy Dhaka website for the current call.", "link": "https://bd.usembassy.gov/"}], ["Australia Awards Scholarships", "Australian government (DFAT)", "Australia", ["Postgraduate"], "Government", "Full-time postgraduate study in Australia for emerging Bangladeshi leaders in priority development fields.", {"covers": ["Full tuition fees", "Return airfare", "Establishment allowance", "Contribution to living expenses", "Overseas Student Health Cover (OSHC)", "Pre-course English training, if needed"], "eligible": ["Bangladeshi citizen living in Bangladesh", "Meet the program's work experience and priority-field criteria", "Must return to Bangladesh after the scholarship", "Women, people with disability and people from marginalised groups are encouraged to apply"], "apply": ["Apply online during the intake round announced by Australia Awards Bangladesh", "Shortlisted applicants complete an interview and English test"], "when": "One intake round a year. The latest round we found closed on 30 April 2026. Check the official site for the next one.", "link": "https://australiaawardsbangladesh.org/"}], ["Government of Ireland International Education Scholarships", "Higher Education Authority (HEA), Ireland", "Ireland", ["Postgraduate", "Doctorate"], "Government", "One year of funded study in Ireland for high-achieving non-EU students.", {"covers": ["Full tuition fee waiver for one year", "Stipend of €10,000 for one year"], "eligible": ["Non-EU/EEA student", "Hold a conditional or final offer from an eligible Irish higher education institution", "Strong academic record", "Around 60 awards nationally for 2026/27"], "apply": ["Get an offer from an eligible Irish institution first", "Apply online through the HEA with your offer, statement and reference"], "when": "Usually opens in January and closes in March. The 2026 round closed on 12 March 2026.", "link": "https://hea.ie/"}], ["Erasmus Mundus Joint Masters", "European Union", "Europe", ["Postgraduate"], "Government", "Fully funded joint master's programmes studied in two or more European countries. Open to students worldwide.", {"covers": ["Participation (tuition) costs", "Travel and installation costs", "Monthly living allowance for the full programme"], "eligible": ["Bachelor's degree or equivalent", "Open to students from any country, including Bangladesh", "Each programme sets its own academic and English requirements"], "apply": ["Choose programmes from the Erasmus Mundus catalogue", "Apply directly to each programme's consortium. There is no official limit on how many you apply to, but choose carefully, as each application takes work"], "when": "Most deadlines fall between October and January for a September start.", "link": "https://www.eacea.ec.europa.eu/"}], ["DAAD Scholarships", "German Academic Exchange Service (DAAD)", "Europe", ["Postgraduate", "Doctorate"], "Government", "Master's and PhD funding in Germany, including development-related postgraduate courses (EPOS) open to Bangladeshi applicants.", {"covers": ["Monthly stipend", "Health insurance", "Travel allowance", "Many public universities in Germany charge little or no tuition"], "eligible": ["Bachelor's degree (master's for PhD funding)", "Usually some relevant work experience for EPOS courses", "Requirements vary by programme, so check each listing"], "apply": ["Search the DAAD scholarship database", "Apply through the DAAD portal or directly to the chosen course, as stated"], "when": "Deadlines vary by programme. Many EPOS deadlines fall between August and October.", "link": "https://www.daad.de/en/"}], ["Global Korea Scholarship (GKS)", "Korean government (NIIED)", "South Korea", ["Undergraduate", "Postgraduate", "Doctorate"], "Government", "Fully funded degree study in South Korea, usually including a year of Korean language training.", {"covers": ["Full tuition fees", "Return airfare", "Monthly living allowance", "One year of Korean language training", "Settlement support"], "eligible": ["Citizen of an eligible country, including Bangladesh", "Meet the program's age limits and minimum grades", "Good health, and not holding Korean citizenship"], "apply": ["Embassy track: apply through the Embassy of the Republic of Korea in Dhaka", "University track: apply directly to a participating Korean university", "Details are published on the Study in Korea website"], "when": "Graduate programs usually open around February to March. Undergraduate programs usually open around September to October.", "link": "https://www.studyinkorea.go.kr/"}], ["Türkiye Scholarships (Türkiye Bursları)", "Government of Türkiye (YTB)", "Türkiye", ["Undergraduate", "Postgraduate", "Doctorate"], "Government", "Fully funded associate, bachelor's, master's and PhD study in Türkiye, open to students from all countries.", {"covers": ["Tuition fees", "Monthly stipend", "Accommodation", "Health insurance", "A Turkish language course", "A one-time flight ticket"], "eligible": ["Open to applicants from all countries, including Bangladesh", "Meet the age limit and minimum grades for your study level", "Strong academic record (the programme is competitive and merit-based)"], "apply": ["Apply online on the official Türkiye Scholarships website (applying is free)", "Choose your preferred universities and programmes in the application", "Shortlisted applicants are invited to an interview"], "when": "Applications usually open in January and close in February. The 2026 round ran from 10 January to 20 February 2026, so the 2027 round is expected around the same time. Check the official site for confirmed dates.", "link": "https://www.turkiyeburslari.gov.tr/"}], ["Chinese Government Scholarship (CSC)", "Government of China (China Scholarship Council)", "China", ["Undergraduate", "Postgraduate", "Doctorate"], "Government", "Full or partial scholarships for bachelor's, master's and PhD study at Chinese universities.", {"covers": ["Tuition fees (full scholarship)", "University accommodation or an accommodation allowance", "Monthly stipend", "Comprehensive medical insurance", "Partial scholarships cover only some of these"], "eligible": ["Not a Chinese citizen, and in good health", "Academic qualifications for your study level (HSC or equivalent for bachelor's, a bachelor's degree for master's)", "Within the age limits set for each study level in the current call", "Meet the language requirement of the course (English or Chinese)"], "apply": ["Route A: apply through the Chinese Embassy in Bangladesh or your home country's dispatching authority", "Route B: apply directly to a Chinese university that offers CSC places", "Most applicants also complete the online form on the Campus China website"], "when": "Applications usually open around December to January for a September start, and deadlines differ by route and university (often between January and April). Check the Chinese Embassy in Bangladesh and each university for confirmed dates.", "link": "https://www.campuschina.org/"}], ["Lester B. Pearson International Scholarship", "University of Toronto", "Canada", ["Undergraduate"], "University", "One of Canada's most prestigious undergraduate scholarships, for outstanding international school-leavers.", {"covers": ["Tuition fees", "Books and incidental fees", "Full residence support", "For four years of undergraduate study"], "eligible": ["International student in the final year of school (or graduated no earlier than the June before)", "Outstanding academic results and leadership", "Must be nominated by your school (one student per school)", "About 37 scholarships each year"], "apply": ["Ask your school to nominate you", "Apply for admission to the University of Toronto", "Submit the scholarship application and documents"], "when": "For a September 2027 start, the deadlines were 9 October 2026 (school nomination), 16 October 2026 (admission application) and 6 November 2026 (scholarship application). For a September 2028 start, expect similar dates in October and November 2027. Check the official page for confirmed dates.", "link": "https://www.future.utoronto.ca/pearson"}], ["Manaaki New Zealand Scholarships", "New Zealand government (MFAT)", "New Zealand", ["Undergraduate", "Postgraduate", "Doctorate"], "Government", "Fully funded study in New Zealand for citizens of selected countries. Bangladesh is not currently on the published list for full-degree scholarships.", {"covers": ["Full tuition fees", "Return airfare and travel insurance", "Living allowance", "Establishment allowance", "Medical insurance"], "eligible": ["Only citizens of eligible countries can apply", "Based on the published list, Bangladesh is not currently eligible for full-degree scholarships", "The programme currently focuses on Pacific and ASEAN countries"], "apply": ["Check the official eligible-country list before applying", "Bangladeshi students should look at New Zealand university scholarships instead (ask a counsellor)"], "when": "For eligible countries, applications usually open around March each year. Check the official site for dates.", "link": "https://www.nzscholarships.govt.nz/"}], ["University merit scholarships", "Individual universities", "All destinations", ["Undergraduate", "Postgraduate"], "University", "Many universities give international students awards or tuition discounts for strong academic results.", {"covers": ["Usually a partial tuition discount or a fixed amount", "A few cover full tuition"], "eligible": ["Strong academic results (SSC, HSC, A Level or degree)", "Sometimes a minimum English test score", "Offered to new international students"], "apply": ["Some are given automatically with your offer", "Others need a separate application or essay", "Check each university's scholarship page"], "when": "Usually alongside your admission application. Apply early, as funding is often limited.", "link": ""}], ["University need-based support", "Individual universities", "All destinations", ["Undergraduate", "Postgraduate"], "University", "Financial aid based on your family's financial situation, mainly at universities in the USA.", {"covers": ["Grants that reduce tuition and living costs, depending on need"], "eligible": ["Show genuine financial need", "Meet the university's admission requirements", "Only some universities offer need-based aid to international students"], "apply": ["Submit the university's financial aid forms (for example, the CSS Profile) with your application", "Provide family income and bank documents"], "when": "Same deadlines as the admission application.", "link": ""}]];
try{(function(){
  const list=document.getElementById('sclist'),count=document.getElementById('sccount'),q=document.getElementById('scq'),d=document.getElementById('scd');
  const lv=[...document.querySelectorAll('#find-scholarship .chip.lvl')];
  const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const ul=a=>'<ul class="ticks small">'+a.map(i=>'<li>'+esc(i)+'</li>').join('')+'</ul>';
  const det=d=>!d?'':'<details class="schd"><summary>View full details</summary>'
    +'<h4>What it covers</h4>'+ul(d.covers)+'<h4>Who can apply</h4>'+ul(d.eligible)+'<h4>How to apply</h4>'+ul(d.apply)
    +'<h4>When to apply</h4><p>'+esc(d.when)+'</p>'
    +(d.link?'<a class="schlink" href="'+d.link+'" target="_blank" rel="noopener">Official website ↗</a>':'')+'</details>';
  function render(){
    const sl=lv.filter(c=>c.getAttribute('aria-pressed')==='true').map(c=>c.dataset.l), t=q.value.trim().toLowerCase(), dv=d.value;
    const r=SCH.filter(x=>(dv==='All destinations'||x[2]===dv||x[2]==='All destinations')&&(!sl.length||x[3].some(l=>sl.includes(l)))&&(!t||(x[0]+' '+x[1]+' '+x[2]+' '+x[3].join(' ')+' '+x[5]+' '+JSON.stringify(x[6]||'')).toLowerCase().includes(t)));
    count.textContent=r.length+' of '+SCH.length+' scholarships';
    list.innerHTML=r.length?r.map(x=>`<div class="card uni sch"><div class="meta"><span class="tag${x[4]==='Government'?' gov':''}">${x[4]}</span><span class="tag">${esc(x[2])}</span></div><h3>${esc(x[0])}</h3><span class="by">${esc(x[1])}</span><p>${esc(x[5])}</p><p><b>Level:</b> ${x[3].join(', ')}</p>${det(x[6])}<button type="button" class="ask" data-u="${esc(x[0])}">Ask about this scholarship →</button></div>`).join(''):'<p class="uempty">No scholarships match your filters. Try clearing them, or ask a counsellor for suggestions.</p>';
  }
  lv.forEach(c=>c.addEventListener('click',()=>{c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true');render()}));
  document.getElementById('scclear').addEventListener('click',()=>{lv.forEach(c=>c.setAttribute('aria-pressed','false'));q.value='';d.value='All destinations';render()});
  q.addEventListener('input',render); d.addEventListener('change',render);
  list.addEventListener('click',e=>{const b=e.target.closest('.ask');if(!b)return;
    document.getElementById('m').value='I would like help applying for the '+b.dataset.u+'.';
    document.getElementById('contact').scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.getElementById('n').focus({preventScroll:true}),400);});
  render();
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}



try{(function(){
  const A=document.getElementById('la'),R=document.getElementById('lr'),Y=document.getElementById('ly');
  if(!A)return;
  const fmt=n=>'৳ '+Math.round(n).toLocaleString('en-IN');
  function calc(){
    const p=+A.value||0, r=(+R.value||0)/1200, n=Math.round((+Y.value||0)*12);
    if(p<=0||n<=0){document.getElementById('lpay').textContent='—';document.getElementById('lsum').innerHTML='';return}
    const m=r?p*r/(1-Math.pow(1+r,-n)):p/n, tot=m*n;
    document.getElementById('lpay').textContent=fmt(m);
    document.getElementById('lsum').innerHTML='<dt>Total repaid</dt><dd>'+fmt(tot)+'</dd><dt>Total interest</dt><dd>'+fmt(tot-p)+'</dd><dt>Number of payments</dt><dd>'+n+'</dd>';
  }
  [A,R,Y].forEach(e=>e.addEventListener('input',calc)); calc();
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const D={"Australia": "Student visa holders must have Overseas Student Health Cover (OSHC) for the whole length of their stay. You usually need to show it when you apply for your visa.", "United Kingdom": "Most students pay the Immigration Health Surcharge as part of the visa application. This gives access to the National Health Service (NHS) during your stay.", "USA": "Most universities require students to have health insurance, and many automatically enrol you in their student health plan unless you show equivalent cover.", "Canada": "Rules depend on the province. Some provinces include international students in public health plans, while others require a university or private plan.", "New Zealand": "International students must hold acceptable medical and travel insurance for the whole time they study in New Zealand.", "Ireland": "Non-EU students need private medical insurance that meets immigration requirements before registering with immigration.", "Europe": "Most European countries require health insurance for a student visa or residence permit. Some, such as Germany, require enrolment in a recognised health insurance scheme.", "South Korea": "International students are generally required to join Korea's National Health Insurance, and universities often explain the process at enrolment.", "Malaysia": "International students must have medical insurance that meets the requirements of the student pass application process.", "Türkiye": "To get a student residence permit you need valid health insurance for your whole stay. Many students use a private policy or, after enrolling, the state General Health Insurance (GSS/SGK), which usually has to be applied for within three months of university registration.", "China": "International students must have medical insurance for their whole stay. Many universities ask you to buy the Comprehensive Insurance & Protection Scheme for Foreigners Staying in China through them after you arrive; check the cover and price with your university."}, chips=[...document.querySelectorAll('#se-insurance .chip.ins')];
  function show(k){chips.forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===k?'true':'false'));document.getElementById('insk').textContent=k;document.getElementById('insv').textContent=D[k];}
  chips.forEach(c=>c.addEventListener('click',()=>show(c.dataset.k))); show(chips[0].dataset.k);
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const D={"Australia": "Popular choices include purpose-built student apartments, university colleges and homestays. Rent is usually quoted per week, and big cities such as Sydney and Melbourne cost more.", "United Kingdom": "Many universities offer halls of residence for first-year and international students. Private student halls and shared houses are common, and London is usually the most expensive.", "Canada": "Students choose between on-campus residences, homestays and shared rentals. Residence places can be limited, so apply as soon as you accept your offer.", "USA": "Many first-year students live in on-campus dormitories, often with a meal plan. Off-campus apartments are common in later years.", "New Zealand": "Universities run halls of residence, often with meals included, and homestays are popular with younger students.", "Ireland": "Student housing is in high demand, especially in Dublin. Book early and consider purpose-built student accommodation or a homestay for your first months.", "Europe": "Options vary by country, from student residences to shared flats. In some cities, such as Amsterdam or Munich, housing is very competitive, so start your search early.", "South Korea": "Many universities offer on-campus dormitories for international students. Off-campus options include studio rooms near campus.", "Malaysia": "Universities often have on-campus hostels, and many private condominiums near campus are rented by students.", "Türkiye": "Many universities have on-campus or partner dormitories, and private dormitories and shared flats are common. Rents in Istanbul have risen quickly in recent years, so budget carefully and book early.", "China": "Most universities have dormitories for international students on campus, which is usually the easiest first option. Where living off campus is allowed, you must register your address with the local police, usually within 24 hours of moving in."}, chips=[...document.querySelectorAll('#se-housing .chip.hs')];
  function show(k){chips.forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===k?'true':'false'));document.getElementById('hsk').textContent=k;document.getElementById('hsv').textContent=D[k];}
  chips.forEach(c=>c.addEventListener('click',()=>show(c.dataset.k))); show(chips[0].dataset.k);
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const D={"Australia": "Several major Australian banks let international students start opening an account online before they arrive, then confirm their identity at a branch after landing.", "Canada": "Some Canadian banks offer student packages for newcomers, and some let you begin the process before you arrive.", "United Kingdom": "Some UK banks and digital banks let international students open an account before or soon after arrival. You'll usually need your passport, visa and a university enrolment letter.", "USA": "Most students open an account after arriving, with their passport, I-20 and university documents. Some banks have branches on or near campus.", "New Zealand": "Some banks let international students apply online before arrival and complete the process in a branch.", "Ireland": "Students usually open an account after arrival, often needing proof of address and a letter from their university.", "Europe": "Rules vary by country. In some places, such as Germany, students may need a special account for proof of funds before applying for a visa.", "South Korea": "Students usually open an account after arrival, often once they have their residence card. Some universities have bank branches on campus.", "Malaysia": "Students usually open an account after arrival with their passport, student pass and university documents.", "Türkiye": "Students usually open an account after arrival with their passport and a Turkish tax number (which foreigners can get from a tax office or online). Some banks also ask for a residence permit.", "China": "Students usually open an account at a Chinese bank after arrival, with their passport and often the residence permit or admission notice. Mobile payments (Alipay and WeChat Pay) are used almost everywhere; both can be set up with a Chinese bank account."}, chips=[...document.querySelectorAll('#se-banking .chip.bk')];
  function show(k){chips.forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===k?'true':'false'));document.getElementById('bkk').textContent=k;document.getElementById('bkv').textContent=D[k];}
  chips.forEach(c=>c.addEventListener('click',()=>show(c.dataset.k))); show(chips[0].dataset.k);
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const D={"Australia": "Students under 18 must have approved welfare arrangements before they arrive. This is usually either a parent or eligible relative approved as a guardian, or accommodation and welfare arranged by the education provider.", "United Kingdom": "Under-18 students usually need written consent from their parents, and many schools and colleges require a UK-based guardian. Some ask for an accredited guardianship organisation.", "Canada": "Students who are minors in their province usually need a custodian, often a relative or an approved person, and a custodianship declaration may be required.", "USA": "Some first-year students are still 17. Universities set their own rules for under-18 students, such as parental consent forms or approved housing, so check with the school.", "New Zealand": "Students under 18 must live in accommodation approved by their school or with a designated caregiver, and schools must follow the national code of practice for student wellbeing.", "Ireland": "Schools and colleges usually require a local guardian for students under 18, and students must live in suitable, approved accommodation.", "Europe": "Rules differ by country and institution. Most universities expect students to be 18, so younger students should check the requirements carefully.", "South Korea": "Most universities expect students to be adults. Younger students should check with the university about guardian and housing requirements.", "Malaysia": "Students under 18 usually need a guardian, and the university or school may ask for guardian details as part of the application.", "Türkiye": "Most universities expect students to be 18. Younger students should check guardian, parental consent and housing requirements with the university.", "China": "Students under 18 usually need a guardian who lives in China, and universities ask for guardian and parent consent documents. Check each university's rules before you apply."}, chips=[...document.querySelectorAll('#se-guardian .chip.gd')];
  function show(k){chips.forEach(c=>c.setAttribute('aria-pressed',c.dataset.k===k?'true':'false'));document.getElementById('gdk').textContent=k;document.getElementById('gdv').textContent=D[k];}
  chips.forEach(c=>c.addEventListener('click',()=>show(c.dataset.k))); show(chips[0].dataset.k);
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const WA='8801913179498', panel=document.getElementById('chatpanel'), open=document.getElementById('chatopen');
  let msg='Hello Independent Education, I would like free study abroad counselling.';
  function toggle(v){panel.hidden=!v;open.setAttribute('aria-expanded',v);}
  open.addEventListener('click',()=>toggle(panel.hidden));
  document.getElementById('chatclose').addEventListener('click',()=>toggle(false));
  document.querySelectorAll('#qts .qt').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#qts .qt').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');
    msg='Hello Independent Education, I would like help with: '+b.dataset.t+'.';
    document.getElementById('gowa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
    document.getElementById('chatnext').hidden=false;document.getElementById('chatgo').hidden=false;
  }));
  document.getElementById('goms').addEventListener('click',()=>{try{navigator.clipboard.writeText(msg).catch(()=>{})}catch(_){};document.getElementById('chatnote').hidden=false;});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(false)});
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

if(!document.documentElement.lang)document.documentElement.lang='en';
try{localStorage.removeItem('ie-lang')}catch(e){}

try{(function(){
  /* light / dark theme */
  const root=document.documentElement, btn=document.getElementById('themebtn');
  function cur(){return root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}
  let saved=null; try{saved=localStorage.getItem('ie-theme')}catch(e){}
  if(saved==='dark'||saved==='light') root.setAttribute('data-theme',saved);
  btn&&btn.addEventListener('click',()=>{const t=cur()==='dark'?'light':'dark';const go=()=>{root.setAttribute('data-theme',t);try{localStorage.setItem('ie-theme',t)}catch(err){}};
    if(!document.startViewTransition||matchMedia('(prefers-reduced-motion: reduce)').matches){go();return}
    const r=btn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    try{document.startViewTransition(go).ready.then(()=>{root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+R+'px at '+x+'px '+y+'px)']},{duration:550,easing:'ease-in-out',pseudoElement:'::view-transition-new(root)'})}).catch(()=>{})}catch(err){go()}});
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(async function(){
  /* AI study abroad assistant (shown only where the viewer can use it) */
  if(!window.claude||!window.claude.use) return;
  let sample=null; try{sample=await window.claude.use('sample')}catch(e){}
  if(!sample) return;
  const wrap=document.getElementById('aiwrap'), log=document.getElementById('ailog'), form=document.getElementById('aiform'),
        q=document.getElementById('aiq'), send=document.getElementById('aisend'), stop=document.getElementById('aistop');
  wrap.hidden=false;
  const RULES="You are the friendly AI assistant on the website of Independent Education, a study abroad consultancy in Dhaka, Bangladesh (CEO: Md. Mijanur Rahman). "
   +"Help Bangladeshi students and parents with general questions about studying abroad: choosing countries (Australia, UK, Canada, USA, New Zealand, Ireland, Netherlands, Europe, South Korea, Malaysia, Türkiye, China, Colombia), courses, applications, IELTS and other English tests, scholarships, student visas, costs, accommodation and student life. "
   +"Rules: reply in the same language as the question (Bangla or English). Keep answers short and practical: at most about 120 words, plain text, short lines or simple dashes, no markdown headings or tables. "
   +"Visa rules, fees, scores and deadlines change, so say when something should be checked with the university, the official immigration website or an Independent Education counsellor. Never guarantee admission, visas or scholarships, and never invent specific figures you are unsure of. "
   +"Where useful, suggest booking free counselling with Independent Education: phone/WhatsApp +8801913179498, email info.independentedu@gmail.com. If a question is unrelated to studying abroad, politely say you can only help with study abroad topics.";
  const turns=[]; let ctl=null;
  function bubble(cls,text){const d=document.createElement('div');d.className=cls;d.textContent=text;log.appendChild(d);d.scrollIntoView({block:'nearest'});return d}
  const COPY={rate_limited:'Too many questions right now. Please wait a moment and try again, or message us on WhatsApp.',session_expired:'Please sign in again to use the AI assistant.',refused:'Sorry, I can\'t help with that. Please ask a counsellor instead.',empty_completion:'I couldn\'t find an answer. Try rephrasing your question.'};
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const text=q.value.trim(); if(!text||ctl) return;
    q.value=''; bubble('q',text);
    const a=bubble('a','Thinking…');
    turns.push({role:'user',content:text}); while(turns.length>10) turns.shift();
    ctl=new AbortController(); send.disabled=true; stop.hidden=false;
    try{
      const r=await sample([{role:'user',content:RULES},...turns],{modelTier:'quick',cache:false,signal:ctl.signal,onText:({text})=>{a.textContent=text;}});
      turns.push({role:'assistant',content:r.text});
      if(r.truncated) a.textContent+='\n…';
    }catch(err){
      turns.pop();
      if(['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(err.code)){ a.remove(); wrap.hidden=true; }
      else if(err.code==='cancelled'){ a.textContent=err.text||'Stopped.'; }
      else { a.textContent=err.text||''; if(!err.text) a.remove(); bubble('a err',COPY[err.code]||'Something went wrong. Please try again, or contact us on WhatsApp.'); }
    }finally{ ctl=null; send.disabled=false; stop.hidden=true; }
  });
  stop.addEventListener('click',()=>ctl&&ctl.abort());
  q.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();form.requestSubmit();}});
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
/* ===== Marketing settings =====
   Paste your own IDs below to switch on analytics. Leave a value empty ("") to keep it off.
   GA4_ID looks like "G-XXXXXXXXXX" (Google Analytics 4).
   META_PIXEL_ID is a number like "123456789012345" (Meta / Facebook Pixel).
   SERVER_ENDPOINT is the address of track.php on your hosting, e.g. "/track.php".
   When it is set, key events (enquiries, WhatsApp/Messenger/phone/email clicks, shares)
   are also sent from your server to Meta and Google (server-side tracking).
   Tracking only starts after the visitor accepts the cookie notice. */
const IE_MARKETING={
  GA4_ID:"",                    // Google Analytics 4, e.g. G-XXXXXXXXXX
  META_PIXEL_ID:"",             // Meta (Facebook/Instagram) Pixel ID
  SERVER_ENDPOINT:"",           // e.g. /server-tracking/track.php (server-side tracking)
  LEAD_ENDPOINT:"",             // e.g. /server-tracking/lead.php (saves enquiries + emails you)
  GOOGLE_ADS_ID:"",             // Google Ads tag, e.g. AW-123456789
  GOOGLE_ADS_LEAD_LABEL:"",     // conversion label for "Lead", e.g. AbC-D_efG-h12_34-567
  TIKTOK_PIXEL_ID:"",           // TikTok Ads pixel ID
  LINKEDIN_PARTNER_ID:"",       // LinkedIn Insight Tag partner ID
  LINKEDIN_LEAD_CONVERSION_ID:"",// LinkedIn conversion ID for leads
  LINKEDIN_CONTACT_CONVERSION_ID:"",// LinkedIn conversion ID for WhatsApp / phone / Messenger / email clicks
  CLARITY_ID:"",
  GTM_ID:"",                    // Google Tag Manager container, e.g. GTM-XXXXXXX (use GTM OR the GA4/Ads IDs above, not both for the same tags)
  GOOGLE_SITE_VERIFICATION:"",  // Search Console "HTML tag" code (also paste the tag into <head>, see GOOGLE-SETUP.txt)
  GOOGLE_ADS_CONTACT_LABEL:"",  // Google Ads conversion label for WhatsApp / phone / Messenger clicks
  LEAD_VALUE_BDT:0,             // optional: average value of one lead in Taka, for Google Ads / GA4 bidding (0 = off)
  GOOGLE_PLACE_ID:"",           // Google Business Profile place ID - shows a "Review us on Google" button
  META_DOMAIN_VERIFICATION:"",  // code from Meta Business Settings > Brand safety > Domains (also paste the tag into <head>, see META-SETUP.txt)
  FB_PAGE_EMBED:true,           // "Latest from Facebook" box in the contact section (loads only when the visitor clicks)                // Microsoft Clarity project ID (heatmaps, session recordings)
  ENHANCED_MATCHING:true,       // send hashed email/phone with leads to ad platforms (after cookie consent)
  MICROSOFT_UET_ID:"",          // Microsoft Advertising (Bing Ads) UET tag ID, e.g. 187654321
  BING_SITE_VERIFICATION:"",    // Bing Webmaster Tools "meta tag" code (msvalidate.01)
  X_PIXEL_ID:"",                // X (Twitter) Ads pixel ID, e.g. o1abc
  X_LEAD_EVENT_ID:"",           // X conversion event ID for leads, e.g. tw-o1abc-o1def
  X_CONTACT_EVENT_ID:"",        // X conversion event ID for WhatsApp / phone / Messenger / email clicks
  NEWSLETTER_ENDPOINT:"",       // e.g. /server-tracking/subscribe.php (email newsletter sign-up)
  APPLY_ENDPOINT:"",            // online applications: "/server-tracking/apply.php" (see PORTAL-SETUP.txt)
  PORTAL_ENDPOINT:"",           // student portal: "/server-tracking/portal.php"
  CONTACT_EMAIL:"info.independentedu@gmail.com", // where website messages go
  WEB3FORMS_KEY:"",             // free key from web3forms.com (made with CONTACT_EMAIL): forms then email you directly. See MAIL-SETUP.txt
  WELCOME_POPUP:true,           // welcome pop-up with photo, free counselling, "Book now" and WhatsApp (first visit, then not again for 7 days)
  WELCOME_POPUP_DELAY:6,        // seconds after arrival before the welcome pop-up opens
  LEAD_POPUP:true,              // pop-up form "Get free study abroad advice" (once per visit, not on booking/apply/portal pages)
  LEAD_POPUP_DELAY:20,          // seconds on the site before the pop-up opens
  BOOKING_URL:"",               // online booking page (Calendly, Google Calendar appointment page, Zoho Bookings...)
  WEB_VITALS:true,              // send page-speed scores (Core Web Vitals) to GA4 / GTM, after cookie consent
  TAWK_PROPERTY_ID:"",          // Tawk.to live chat: Administration > Chat Widget > Direct Chat Link https://tawk.to/chat/PROPERTY_ID/WIDGET_ID
  TAWK_WIDGET_ID:"default",     // usually "default" or the second part of that link
  TAWK_LOAD:"click",            // "click" = load Tawk.to only when a visitor opens Live chat (privacy-friendly); "consent" = also load after cookie consent
  HOTJAR_ID:"",                 // Hotjar Site ID (numbers only), e.g. 5123456 (after cookie consent)
  JOTFORM_URL:""                // Jotform form link for a student registration form, e.g. https://form.jotform.com/251234567890123
};
try{(function(){
  const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  const ss={get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
  // campaign source (UTM) capture
  try{
    const q=new URLSearchParams(location.search);
    const parts=['utm_source','utm_medium','utm_campaign'].map(k=>q.get(k)).filter(Boolean);
    const ref=(q.get('ref')||'').replace(/[^\p{L}\p{M}\p{N} ._@-]/gu,'').slice(0,40);
    if(ref) ss.set('ie-src','referral: '+ref+(parts.length?' / '+parts.join(' / '):''));
    else if(parts.length) ss.set('ie-src',parts.join(' / ').slice(0,120));
    else if(!ss.get('ie-src')&&document.referrer){const h=new URL(document.referrer).hostname;if(h&&h!==location.hostname)ss.set('ie-src',h);}
  }catch(e){}
  window.IEsrc=()=>ss.get('ie-src')||'';
  // full campaign attribution: UTM tags and ad click IDs (Google, Microsoft, Meta, TikTok, X, LinkedIn), kept for this visit
  try{
    const q=new URLSearchParams(location.search),A={};
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','msclkid','fbclid','ttclid','twclid','li_fat_id','ref'].forEach(k=>{const v=q.get(k);if(v)A[k]=v.replace(/[^\p{L}\p{M}\p{N} ._~@:/-]/gu,'').slice(0,150);});
    if(Object.keys(A).length){A.landing=location.pathname;A.at=new Date().toISOString().slice(0,16);ss.set('ie-attr',JSON.stringify(A));}
  }catch(e){}
  window.IEattr=()=>{let last={},first={};try{last=JSON.parse(ss.get('ie-attr')||'{}')}catch(e){}try{first=JSON.parse(store.get('ie-attr1')||'{}')}catch(e){}return {last,first};};
  // analytics loader (consent based)
  if(IE_MARKETING.GOOGLE_SITE_VERIFICATION){const gv=document.createElement('meta');gv.name='google-site-verification';gv.content=IE_MARKETING.GOOGLE_SITE_VERIFICATION;document.head.appendChild(gv);}
  if(IE_MARKETING.META_DOMAIN_VERIFICATION){const mv=document.createElement('meta');mv.name='facebook-domain-verification';mv.content=IE_MARKETING.META_DOMAIN_VERIFICATION;document.head.appendChild(mv);}
  if(IE_MARKETING.BING_SITE_VERIFICATION){const bv=document.createElement('meta');bv.name='msvalidate.01';bv.content=IE_MARKETING.BING_SITE_VERIFICATION;document.head.appendChild(bv);}
  const M=IE_MARKETING, has=M.GTM_ID||M.GA4_ID||M.META_PIXEL_ID||M.GOOGLE_ADS_ID||M.TIKTOK_PIXEL_ID||M.LINKEDIN_PARTNER_ID||M.CLARITY_ID||M.MICROSOFT_UET_ID||M.X_PIXEL_ID||M.HOTJAR_ID;
  let on=false;
  // Google Consent Mode v2: everything starts as "denied"; it switches to "granted" only after the visitor accepts cookies
  window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};
  gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
  gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
  function load(){
    if(on)return; on=true;
    gtag('consent','update',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
    if(M.GTM_ID){
      dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
      const t=document.createElement('script');t.async=true;t.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(M.GTM_ID);document.head.appendChild(t);
    }
    if(M.GA4_ID||M.GOOGLE_ADS_ID){
      const g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(M.GA4_ID||M.GOOGLE_ADS_ID);document.head.appendChild(g);
      gtag('js',new Date());
      if(M.GA4_ID)gtag('config',M.GA4_ID);
      if(M.GOOGLE_ADS_ID)gtag('config',M.GOOGLE_ADS_ID,{allow_enhanced_conversions:!!M.ENHANCED_MATCHING});
    }
    if(M.TIKTOK_PIXEL_ID){
      !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};}(window,document,'ttq');
      ttq.load(M.TIKTOK_PIXEL_ID);ttq.page();
    }
    if(M.LINKEDIN_PARTNER_ID){
      window._linkedin_partner_id=M.LINKEDIN_PARTNER_ID;window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(M.LINKEDIN_PARTNER_ID);
      if(!window.lintrk){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[];}
      const l=document.createElement('script');l.async=true;l.src='https://snap.licdn.com/li.lms-analytics/insight.min.js';document.head.appendChild(l);
    }
    if(M.CLARITY_ID){
      (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",M.CLARITY_ID);
    }
    if(M.HOTJAR_ID&&/^\d{5,10}$/.test(String(M.HOTJAR_ID))){ // Hotjar heatmaps, recordings and feedback
      (function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:Number(M.HOTJAR_ID),hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    }
    // first-touch attribution (only stored after consent)
    try{if(!store.get('ie-attr1')){const l=ss.get('ie-attr');store.set('ie-attr1',l||JSON.stringify({utm_source:IEsrc()||'direct',landing:location.pathname,at:new Date().toISOString().slice(0,16)}));}}catch(e){}
    if(M.MICROSOFT_UET_ID){ // Microsoft Advertising (Bing) UET tag
      window.uetq=window.uetq||[];window.uetq.push('consent','default',{ad_storage:'granted'});
      (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:String(M.MICROSOFT_UET_ID),enableAutoSpaTracking:true};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","https://bat.bing.com/bat.js","uetq");
    }
    if(M.X_PIXEL_ID){ // X (Twitter) pixel
      !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
      twq('config',M.X_PIXEL_ID);
    }
    if(M.WEB_VITALS&&(M.GA4_ID||M.GTM_ID)){ // Core Web Vitals (page speed seen by real visitors)
      import('https://unpkg.com/web-vitals@4.2.4/dist/web-vitals.js').then(wv=>{
        const rep=x=>{const p={metric_id:x.id,metric_value:Math.round(x.name==='CLS'?x.value*1000:x.value),metric_rating:x.rating,non_interaction:true};
          try{M.GA4_ID&&gtag('event',x.name,Object.assign({value:Math.round(x.name==='CLS'?x.delta*1000:x.delta)},p))}catch(e){}
          try{M.GTM_ID&&dataLayer.push(Object.assign({event:'ie_web_vitals',metric_name:x.name},p))}catch(e){}};
        wv.onLCP(rep);wv.onINP(rep);wv.onCLS(rep);wv.onFCP(rep);wv.onTTFB(rep);
      }).catch(()=>{});
    }
    if(IE_MARKETING.META_PIXEL_ID){
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init',IE_MARKETING.META_PIXEL_ID,{external_id:visitorId()});const pv=newId();fbq('track','PageView',{},{eventID:pv});toServer('page_view',pv);
    }
  }
  const cookie=n=>{try{const m=document.cookie.match('(?:^|; )'+n+'=([^;]*)');return m?decodeURIComponent(m[1]):''}catch(e){return ''}};
  // anonymous visitor ID (random, created only after cookie consent) - helps Meta match browser and server events
  function visitorId(){let v=store.get('ie-vid');if(!v){v=newId();store.set('ie-vid',v);}return v;}
  const newId=()=>{try{return crypto.randomUUID().replace(/-/g,'')}catch(e){return Date.now().toString(36)+Math.random().toString(36).slice(2)}};
  // TikTok click ID from ad links (?ttclid=...), kept for this visit
  try{const tc=new URLSearchParams(location.search).get('ttclid');if(tc)ss.set('ie-ttclid',tc.slice(0,200));}catch(e){}
  function fbcValue(){
    const c=cookie('_fbc'); if(c) return c;
    try{const id=new URLSearchParams(location.search).get('fbclid'); if(id){const v='fb.1.'+Date.now()+'.'+id; ss.set('ie-fbc',v); return v;}}catch(e){}
    return ss.get('ie-fbc')||'';
  }
  function gaClientId(){const g=cookie('_ga');const m=g.match(/^GA\d\.\d\.(\d+\.\d+)$/);return m?m[1]:'';}
  function toServer(ev,id,extra){
    if(!IE_MARKETING.SERVER_ENDPOINT)return;
    const body=JSON.stringify(Object.assign({event:ev,event_id:id,url:location.href.split('#')[0],source:IEsrc(),external_id:on?visitorId():'',fbp:cookie('_fbp'),fbc:fbcValue(),ga_client_id:gaClientId(),ttp:cookie('_ttp'),ttclid:ss.get('ie-ttclid')||'',referrer:document.referrer||''},extra||{}));
    try{fetch(IE_MARKETING.SERVER_ENDPOINT,{method:'POST',body,keepalive:true,headers:{'Content-Type':'text/plain'},credentials:'omit'}).catch(()=>{})}catch(e){}
  }
  const sha=async t=>{try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return ''}};
  window.IEids=()=>({fbp:cookie('_fbp'),fbc:fbcValue(),ga_client_id:gaClientId(),ttp:cookie('_ttp')});
window.IEtrack=function(ev,extra){
    if(!on)return;
    extra=Object.assign({},extra||{}); const user=extra._user; delete extra._user;
    if(user&&M.ENHANCED_MATCHING&&ev==='lead'){ // enhanced / advanced matching for leads
      const em=(user.email||'').trim().toLowerCase(), ph=(user.phone||'').replace(/\D/g,''), fn=(user.fn||'').trim().toLowerCase(), ln=(user.ln||'').trim().toLowerCase();
      try{window.gtag&&M.GOOGLE_ADS_ID&&gtag('set','user_data',{email:em,phone_number:ph?'+'+ph:'',address:{first_name:fn,last_name:ln}})}catch(e){}
      Promise.all([sha(em),sha(ph),sha(fn),sha(ln),sha(ph?'+'+ph:'')]).then(([hem,hph,hfn,hln,htph])=>{
        try{window.ttq&&ttq.identify({sha256_email:hem,sha256_phone_number:htph?htph:undefined,external_id:visitorId()})}catch(e){}
        send(ev,extra,{em:hem,ph:hph,fn:hfn,ln:hln,tph:htph});
      });
      return;
    }
    send(ev,extra,null);
  };
  function send(ev,extra,hashed){
    const map={lead:['generate_lead','Lead','SubmitForm'],whatsapp:['contact_whatsapp','Contact','Contact'],messenger:['contact_messenger','Contact','Contact'],phone:['contact_phone','Contact','Contact'],email:['contact_email','Contact','Contact'],share:['share',null,null],
      view_content:['view_section','ViewContent','ViewContent'],search:['search','Search','Search'],university_interest:['university_interest','FindLocation','ViewContent'],
      scroll:['scroll_depth',null,null],engaged:['engaged_visit',null,null],
      schedule:['book_counselling','Schedule','Contact'],destination:['view_destination','ViewContent','ViewContent'],nudge:['nudge_view',null,null],directions:['get_directions','FindLocation','Contact'],review_click:['review_click',null,null],
      subscribe:['sign_up','Subscribe','Subscribe'],live_chat:['live_chat_start','Contact','Contact'],registration_form:['registration_form_open',null,null],live_chat_open:['live_chat_open',null,null],referral:['referral_link_created',null,null],booking:['book_appointment','Schedule','Contact']};
    // Meta custom events (for retargeting audiences)
    const custom={scroll:extra&&extra.percent===90?'DeepScroll':null,engaged:'EngagedVisit',nudge:'CounsellingNudgeView'};
    const m=map[ev]||[ev,null,null], id=newId(), srv=!!M.SERVER_ENDPOINT;
    const metaData={}; if(extra){['content_name','content_category','search_string','destination','study_level','start_time'].forEach(k=>{if(extra[k])metaData[k]=extra[k];});}
    // GA4: when the server endpoint is on, the server sends this event instead (avoids double counting)
    const gaParams=Object.assign({source:IEsrc()},extra||{});
    if(gaParams.search_string){gaParams.search_term=gaParams.search_string;delete gaParams.search_string;}
    if(ev==='lead'&&M.LEAD_VALUE_BDT>0){gaParams.value=Number(M.LEAD_VALUE_BDT);gaParams.currency='BDT';}
    if(!srv&&M.GA4_ID){try{gtag('event',m[0],gaParams)}catch(e){}}
    // Google Tag Manager: every event is also pushed to the dataLayer as "ie_<event>"
    if(M.GTM_ID){try{dataLayer.push(Object.assign({event:'ie_'+ev,ie_event_id:id},gaParams))}catch(e){}}
    if(['whatsapp','phone','messenger','email'].includes(ev)&&M.LINKEDIN_CONTACT_CONVERSION_ID){try{window.lintrk&&lintrk('track',{conversion_id:Number(M.LINKEDIN_CONTACT_CONVERSION_ID)})}catch(e){}}
    if(['whatsapp','phone','messenger','email'].includes(ev)&&M.GOOGLE_ADS_ID&&M.GOOGLE_ADS_CONTACT_LABEL){try{gtag('event','conversion',{send_to:M.GOOGLE_ADS_ID+'/'+M.GOOGLE_ADS_CONTACT_LABEL})}catch(e){}}
    // Meta: browser Pixel and server both send, with the same event ID so Meta keeps only one
    try{window.fbq&&m[1]&&fbq('track',m[1],metaData,{eventID:id})}catch(e){}
    try{window.fbq&&!m[1]&&custom[ev]&&fbq('trackCustom',custom[ev],metaData,{eventID:id})}catch(e){}
    // TikTok, Google Ads and LinkedIn conversions
    try{window.ttq&&m[2]&&ttq.track(m[2],{content_name:extra.content_name||ev},{event_id:id})}catch(e){}
    if(ev==='lead'){
      try{window.gtag&&M.GOOGLE_ADS_ID&&M.GOOGLE_ADS_LEAD_LABEL&&gtag('event','conversion',Object.assign({send_to:M.GOOGLE_ADS_ID+'/'+M.GOOGLE_ADS_LEAD_LABEL,transaction_id:id},M.LEAD_VALUE_BDT>0?{value:Number(M.LEAD_VALUE_BDT),currency:'BDT'}:{}))}catch(e){}
      try{window.lintrk&&M.LINKEDIN_LEAD_CONVERSION_ID&&lintrk('track',{conversion_id:Number(M.LINKEDIN_LEAD_CONVERSION_ID)})}catch(e){}
      try{window.clarity&&clarity('set','lead','yes')}catch(e){}
    }
    try{if(window.hj&&M.HOTJAR_ID)hj('event','ie_'+ev)}catch(e){}
    // Microsoft Advertising (UET) and X conversions
    const isContact=['whatsapp','phone','messenger','email'].includes(ev);
    if(window.uetq&&M.MICROSOFT_UET_ID){
      try{
        if(ev==='lead')uetq.push('event','submit_lead_form',Object.assign({event_category:'lead',event_label:(extra&&extra.content_name)||''},M.LEAD_VALUE_BDT>0?{revenue_value:Number(M.LEAD_VALUE_BDT),currency:'BDT'}:{}));
        else if(isContact)uetq.push('event','contact',{event_category:'contact',event_label:ev});
        else if(ev==='subscribe')uetq.push('event','subscribe',{event_category:'newsletter'});
        else if(ev==='booking'||ev==='schedule')uetq.push('event','book_appointment',{event_category:'booking'});
      }catch(e){}
    }
    if(window.twq&&M.X_PIXEL_ID){
      try{
        if(ev==='lead'&&M.X_LEAD_EVENT_ID)twq('event',M.X_LEAD_EVENT_ID,{conversion_id:id});
        else if((isContact||ev==='booking')&&M.X_CONTACT_EVENT_ID)twq('event',M.X_CONTACT_EVENT_ID,{conversion_id:id});
      }catch(e){}
    }
    toServer(ev,id,hashed?Object.assign({},extra,{user_hash:hashed}):extra);
  }
  if(has){
    const c=store.get('ie-consent');
    if(c==='yes')load();
    else if(c!=='no'){
      const b=document.createElement('div');b.className='consent';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookie notice');
      b.innerHTML='<p>We use cookies to understand how visitors find and use this website, so we can improve it. Is that okay? <a href="privacy.html" class="openprivacy">Privacy policy</a></p><div class="row"><button type="button" class="btn btn-sun" data-c="yes">Accept</button><button type="button" class="btn btn-line" data-c="no">Decline</button></div>';
      document.body.appendChild(b);
      b.addEventListener('click',e=>{const v=e.target.dataset&&e.target.dataset.c;if(!v)return;store.set('ie-consent',v);b.remove();if(v==='yes')load();});
    }
  }
  // engagement: scroll depth (50% / 90%) and an engaged visit (60 seconds with the tab visible)
  (function(){
    const done={};
    addEventListener('scroll',()=>{const h=document.documentElement,p=((window.scrollY||h.scrollTop)+innerHeight)/Math.max(h.scrollHeight,document.body.scrollHeight)*100;[50,90].forEach(t=>{if(p>=t&&!done[t]){done[t]=1;IEtrack('scroll',{percent:t});}});},{passive:true});
    let secs=0;const iv=setInterval(()=>{if(document.visibilityState==='visible'&&++secs>=60){clearInterval(iv);IEtrack('engaged',{seconds:60});}},1000);
  })();
  // destination interest: "Ask about <country>" buttons (builds per-country audiences)
  document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.country a.btn');if(!a)return;const h=a.closest('.country').querySelector('h3');const c=h?h.textContent.trim():'';if(c)IEtrack('destination',{content_name:'Ask about '+c,content_category:c,destination:c});},true);
  // click tracking for contact links
  document.addEventListener('click',e=>{
    const a=e.target.closest&&e.target.closest('a');if(!a)return;const h=a.getAttribute('href')||'';
    if(a.hasAttribute('data-wa-picker'))return;
    if(h.includes('wa.me'))IEtrack('whatsapp',{content_name:'WhatsApp '+(h.match(/wa\.me\/(\d+)/)||[,''])[1]});else if(h.includes('m.me'))IEtrack('messenger');else if(h.startsWith('tel:'))IEtrack('phone');else if(h.startsWith('mailto:'))IEtrack('email');
  },true);
  // Pixel: which topics visitors look at (ViewContent, once per section per visit)
  const SECTIONS={'destinations':['Study destinations','Destinations'],'find-university':['Find a university','Courses'],'course-advice':['Course advice','Courses'],'subjects':['Explore subjects','Courses'],
    'find-scholarship':['Scholarships','Scholarships'],'ielts-what':['IELTS','IELTS'],'services':['Our services','Services'],'how-to-apply':['How to apply','Study abroad steps'],
    'student-essentials':['Student essentials','Student essentials'],'contact':['Contact','Contact']};
  if('IntersectionObserver' in window){
    const seen=new Set();
    const io=new IntersectionObserver(es=>es.forEach(en=>{
      if(!en.isIntersecting||!on)return; const id=en.target.id; if(seen.has(id))return; seen.add(id);
      IEtrack('view_content',{content_name:SECTIONS[id][0],content_category:SECTIONS[id][1]}); io.unobserve(en.target);
    }),{rootMargin:'-35% 0px -45% 0px',threshold:0});
    Object.keys(SECTIONS).forEach(id=>{const el=document.getElementById(id); if(el)io.observe(el);});
  }
  // Pixel: university search (Search) and "Ask about this university" (interest)
  const uq=document.getElementById('uq'); let st;
  if(uq)uq.addEventListener('input',()=>{clearTimeout(st);const v=uq.value.trim();if(v.length<3)return;st=setTimeout(()=>IEtrack('search',{search_string:v.slice(0,60)}),1200);});
  document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('#ulist .ask');if(b)IEtrack('university_interest',{content_name:b.dataset.u,content_category:b.dataset.c});},true);
  document.querySelectorAll('#find-university .chip[data-c]').forEach(c=>c.addEventListener('click',()=>{if(c.getAttribute('aria-pressed')==='true')IEtrack('view_content',{content_name:'Universities in '+c.dataset.c,content_category:'Destinations'});}));
  // share buttons
  const pageUrl=()=>{const u=new URL(location.href);u.hash='';['utm_source','utm_medium','utm_campaign'].forEach(k=>u.searchParams.delete(k));return u.toString();};
  const withSrc=(src)=>{const u=new URL(pageUrl());u.searchParams.set('utm_source',src);u.searchParams.set('utm_medium','share');return u.toString();};
  const text='Free study abroad counselling for Bangladeshi students — Independent Education';
  const links={
    whatsapp:()=>'https://wa.me/?text='+encodeURIComponent(text+' '+withSrc('whatsapp')),
    facebook:()=>'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(withSrc('facebook')),
    linkedin:()=>'https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(withSrc('linkedin')),
    x:()=>'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)+'&url='+encodeURIComponent(withSrc('x')),
    telegram:()=>'https://t.me/share/url?url='+encodeURIComponent(withSrc('telegram'))+'&text='+encodeURIComponent(text)
  };
  document.querySelectorAll('[data-share]').forEach(el=>{
    const k=el.dataset.share;
    if(links[k]){el.href=links[k]();el.addEventListener('click',()=>IEtrack('share',{method:k}));}
    if(k==='messenger'){ // Messenger send dialog needs an app id; fall back to opening the page link on mobile
      el.href='fb-messenger://share/?link='+encodeURIComponent(withSrc('messenger'));
      if(!/Android|iPhone|iPad/i.test(navigator.userAgent))el.hidden=true;
    }
    if(k==='native'&&navigator.share){el.hidden=false;el.addEventListener('click',()=>{navigator.share({title:'Independent Education',text,url:withSrc('native')}).then(()=>IEtrack('share',{method:'native'})).catch(()=>{});});}
    if(k==='copy')el.addEventListener('click',()=>{
      const u=withSrc('copy');
      const done=()=>{el.textContent='Link copied';setTimeout(()=>el.textContent='Copy link',1800);IEtrack('share',{method:'copy'});};
      (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(done).catch(()=>{const t=document.createElement('textarea');t.value=u;document.body.appendChild(t);t.select();try{document.execCommand('copy');done()}catch(e){}t.remove();});
    });
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
try{(function(){
  function openP(){const d=document.querySelector('#privacy details');if(d)d.open=true;}
  document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.openprivacy'))openP();});
  if(location.hash==='#privacy')openP();
  const r=document.getElementById('cookiereset');
  if(r)r.addEventListener('click',()=>{try{localStorage.removeItem('ie-consent')}catch(e){}location.reload();});
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
(function(){try{var m={dest:document.querySelectorAll('#fd option').length,unis:(typeof UNIS!=='undefined'?UNIS.length:0),sch:(typeof SCH!=='undefined'?SCH.length:0)};
document.querySelectorAll('[data-count]').forEach(function(b){var n=m[b.dataset.count];if(n)b.textContent=n;});}catch(e){}})();

try{(function(){
  const panel=document.getElementById('chatpanel'),f=document.getElementById('enq'),q=document.getElementById('qchat'),te=document.getElementById('tab-enq'),tc=document.getElementById('tab-chat');
  if(!f)return;
  function tab(enq){f.hidden=!enq;q.hidden=enq;te.setAttribute('aria-pressed',enq);tc.setAttribute('aria-pressed',!enq);panel.classList.toggle('wide',enq);}
  te.addEventListener('click',()=>tab(true));tc.addEventListener('click',()=>tab(false));tab(true);
  document.getElementById('ef-pp').addEventListener('click',()=>{const d=document.querySelector('#privacy details');if(d)d.open=true;});
  const $=id=>document.getElementById(id);
  function err(id,m){const el=$(id),e=$(id+'-e');if(e)e.textContent=m||'';el.setAttribute('aria-invalid',m?'true':'false');return !m;}
  const req={'ef-fn':'Please enter your first name.','ef-ln':'Please enter your last name.','ef-de':'Please choose a study destination.','ef-st':'Please choose when you would like to start.','ef-md':'Please choose how you would like counselling.','ef-fu':'Please choose how you will fund your studies.','ef-lv':'Please choose a study level.'};
  function mob(){let v=$('ef-mb').value.replace(/[\s-]/g,'').replace(/^\+?880/,'').replace(/^0/,'');return v;}
  function check(){
    let ok=true,first=null;
    const mark=(id,m)=>{if(!err(id,m)){ok=false;first=first||id;}};
    for(const id in req)mark(id,$(id).value.trim()?'':req[id]);
    const em=$('ef-em').value.trim();mark('ef-em',!em?'Please enter your email address.':/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)?'':'Please enter a valid email address, e.g. name@gmail.com.');
    const m=mob();mark('ef-mb',!m?'Please enter your mobile number.':/^1[3-9]\d{8}$/.test(m)?'':'Please enter a valid Bangladesh mobile number, e.g. 1712345678.');
    mark('ef-c1',$('ef-c1').checked?'':'Please agree to the privacy policy to continue.');
    mark('ef-c2',$('ef-c2').checked?'':'Please allow us to contact you about your enquiry.');
    return first;
  }
  f.querySelectorAll('input,select').forEach(el=>el.addEventListener('change',()=>{if(el.getAttribute('aria-invalid')==='true')check();}));
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const bad=check(),out=$('enqout');
    if(bad){out.innerHTML='';$(bad).focus();return;}
    const v=id=>$(id).value.trim();
    const msg=`Counselling enquiry\nName: ${v('ef-fn')} ${v('ef-ln')}\nEmail: ${v('ef-em')}\nMobile: +880${mob()}\nDestination: ${v('ef-de')}\nStart: ${v('ef-st')}\nCounselling: ${v('ef-md')}\nFunding: ${v('ef-fu')}\nStudy level: ${v('ef-lv')}\nNews and offers: ${$('ef-c3').checked?'Yes':'No'}${window.IEsrc&&IEsrc()?'\nHeard about us via: '+IEsrc():''}`;
    const wa='https://wa.me/8801913179498?text='+encodeURIComponent(msg);
    const ml='mailto:info.independentedu@gmail.com?subject='+encodeURIComponent('Counselling enquiry: '+v('ef-fn')+' '+v('ef-ln'))+'&body='+encodeURIComponent(msg);
    const fn=v('ef-fn').replace(/</g,'&lt;');
    const manual=()=>{out.innerHTML=`<div class="ok">Thank you, ${fn}. Your enquiry is ready. Tap a button below to send it to us. It is not sent until you do.<pre style="white-space:pre-wrap;font:500 .82rem var(--body);margin:10px 0">${msg.replace(/</g,'&lt;')}</pre><div class="chatgo"><a class="btn btn-sun soc-wa" href="${wa}" target="_blank" rel="noopener">Send on WhatsApp</a><a class="btn btn-line" href="${ml}">Send by email</a></div></div>`;out.scrollIntoView({block:'nearest'});};
    const track=()=>{const det={content_category:v('ef-de'),destination:v('ef-de'),study_level:v('ef-lv'),start_time:v('ef-st')};window.IEtrack&&IEtrack('lead',Object.assign({content_name:'Chat enquiry form',_user:{email:v('ef-em'),phone:'880'+mob(),fn:v('ef-fn'),ln:v('ef-ln')}},det));window.IEtrack&&IEtrack('schedule',Object.assign({content_name:v('ef-md')},det));try{sessionStorage.setItem('ie-lead','1')}catch(_){}};
    const ep=(typeof IE_MARKETING!=='undefined'?IE_MARKETING:{}).LEAD_ENDPOINT;
    const manualE=()=>{manual();IEmailBtn(out,'Counselling enquiry: '+v('ef-fn')+' '+v('ef-ln'),msg);};
    if(!ep){track();
      if(!IEmail.on){manualE();return;}
      const b2=f.querySelector('button[type=submit]');b2.disabled=true;b2.textContent='Sending…';
      IEmail('Counselling enquiry: '+v('ef-fn')+' '+v('ef-ln'),msg,v('ef-em')).then(ok=>{b2.disabled=false;b2.textContent='Submit enquiry';
        if(!ok){manualE();return;}
        out.innerHTML=`<div class="ok"><b>Thank you, ${fn}! Your enquiry has been sent to our team.</b> A counsellor will contact you soon.<div class="chatgo" style="margin-top:10px"><a class="btn btn-sun soc-wa" href="${wa}" target="_blank" rel="noopener">Message on WhatsApp</a></div></div>`;
        f.querySelectorAll('input:not([type=checkbox]),select').forEach(x=>{x.value=''});});
      return;}
    const btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Sending…';
    const data={first_name:v('ef-fn'),last_name:v('ef-ln'),email:v('ef-em'),mobile:'+880'+mob(),destination:v('ef-de'),start:v('ef-st'),mode:v('ef-md'),funding:v('ef-fu'),level:v('ef-lv'),marketing_optin:$('ef-c3').checked,source:window.IEsrc?IEsrc():'',attribution:window.IEattr?IEattr():{},ids:window.IEids?IEids():{},page:location.href.split('#')[0],website:$('ef-web').value};
    fetch(ep,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(data),credentials:'omit'}).then(r=>r.ok?r.json():Promise.reject()).then(j=>{
      if(!j||!j.ok)throw 0; track();
      out.innerHTML=`<div class="ok"><b>Thank you, ${fn}! We've received your enquiry.</b> A counsellor will contact you soon. For a faster reply, you can also message us on WhatsApp.<div class="chatgo" style="margin-top:10px"><a class="btn btn-sun soc-wa" href="${wa}" target="_blank" rel="noopener">Message on WhatsApp</a></div></div>`;
      f.querySelectorAll('input:not([type=checkbox]),select').forEach(x=>{x.value=''});out.scrollIntoView({block:'nearest'});
    }).catch(()=>{track();manualE();}).finally(()=>{btn.disabled=false;btn.textContent='Submit enquiry';});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

/* ===== Welcome pop-up: photo, free counselling, Book now / WhatsApp. First visit, then not again for 7 days ===== */
try{(function(){
  const M=typeof IE_MARKETING!=='undefined'?IE_MARKETING:{}, $=id=>document.getElementById(id), dlg=$('welpop');
  if(!dlg||M.WELCOME_POPUP===false)return;
  const ss={get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
  const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  const canModal=typeof dlg.showModal==='function';let opener=null;
  function open(why){
    if(dlg.open||document.querySelector('dialog[open]'))return;
    opener=document.activeElement;ss.set('ie-pop','welcome');ls.set('ie-welcome',String(Date.now()));
    const n=$('nudge');if(n&&!n.hidden)n.hidden=true;
    if(canModal)dlg.showModal();else dlg.setAttribute('open','');
    setTimeout(()=>{const t=$('wpttl');t.setAttribute('tabindex','-1');t.focus({preventScroll:true});},60);
    window.IEtrack&&IEtrack('popup_open',{content_name:'Welcome pop-up',trigger:why||'timer'});
  }
  function close(){if(!dlg.open)return;if(canModal)dlg.close();else dlg.removeAttribute('open');try{opener&&opener.focus&&opener.focus()}catch(e){}}
  window.IEwelcome={open:()=>open('button'),close};
  $('wpx').addEventListener('click',close);
  dlg.addEventListener('cancel',e=>{e.preventDefault();close();});
  dlg.addEventListener('click',e=>{if(e.target===dlg)close();});
  document.addEventListener('click',e=>{const t=e.target.closest('[data-popup="welcome"]');if(t){e.preventDefault();open('button');}});
  $('wpbook').addEventListener('click',()=>{window.IEtrack&&IEtrack('popup_click',{content_name:'Welcome pop-up: Book'});});
  $('wpwa').addEventListener('click',()=>{window.IEtrack&&IEtrack('whatsapp',{content_name:'Welcome pop-up WhatsApp'});close();});
  $('wpcall').addEventListener('click',()=>{close();if(window.IEpopup)setTimeout(()=>IEpopup.open(),150);});
  // automatic: first visit only (then again after 7 days), never after an enquiry, not on form pages
  const busy=$('bookf')||$('ap-submit')||$('pl-ref');
  const seen=+ls.get('ie-welcome')||0;
  if(busy||ss.get('ie-pop')||ss.get('ie-lead')||Date.now()-seen<7*864e5)return;
  const delay=Math.max(2,+M.WELCOME_POPUP_DELAY||6)*1000;
  setTimeout(function chk(){
    const p=$('chatpanel'),typing=document.activeElement&&/^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement.tagName);
    if(ss.get('ie-lead')||ss.get('ie-pop'))return;
    if((p&&!p.hidden)||typing||document.querySelector('dialog[open]')){setTimeout(chk,6000);return;}
    open('timer');
  },delay);
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

/* ===== Lead form pop-up: name, mobile, destination -> lead.php, or email (Web3Forms), or WhatsApp ===== */
try{(function(){
  const M=typeof IE_MARKETING!=='undefined'?IE_MARKETING:{}, $=id=>document.getElementById(id), dlg=$('leadpop');
  if(!dlg||M.LEAD_POPUP===false)return;
  const ss={get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
  const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const bdMobile=v=>{const d=String(v).replace(/\D/g,'');if(/^01[3-9]\d{8}$/.test(d))return'+88'+d;if(/^8801[3-9]\d{8}$/.test(d))return'+'+d;return'';};
  const canModal=typeof dlg.showModal==='function';
  let opener=null;
  function open(why){
    if(dlg.open)return;
    opener=document.activeElement;
    ss.set('ie-pop','1');
    if(canModal)dlg.showModal();else{dlg.setAttribute('open','');}
    setTimeout(()=>{const coarse=matchMedia('(pointer:coarse)').matches;const f=coarse?$('lpttl'):$('lp-n');if(coarse)f.setAttribute('tabindex','-1');if(f)f.focus({preventScroll:true});},60);
    window.IEtrack&&IEtrack('popup_open',{content_name:'Lead pop-up',trigger:why||'timer'});
  }
  function close(){if(!dlg.open)return;if(canModal)dlg.close();else dlg.removeAttribute('open');ls.set('ie-pop-closed',String(Date.now()));try{opener&&opener.focus&&opener.focus()}catch(e){}}
  window.IEpopup={open:()=>open('button'),close};
  $('lpx').addEventListener('click',close);
  dlg.addEventListener('cancel',e=>{e.preventDefault();close();});
  dlg.addEventListener('click',e=>{if(e.target===dlg)close();});   // click on the dark backdrop
  document.addEventListener('click',e=>{const t=e.target.closest('[data-popup="lead"]');if(t){e.preventDefault();open('button');}});
  $('lpwa').addEventListener('click',()=>{window.IEtrack&&IEtrack('whatsapp',{content_name:'Lead pop-up WhatsApp'});});
  // automatic opening: once per visit, not again for 3 days after closing, not after an enquiry,
  // and not on pages that already are a form (booking, application, student portal)
  const busyPage=$('bookf')||$('ap-submit')||$('pl-ref');
  const closedAt=+ls.get('ie-pop-closed')||0;
  const auto=!busyPage&&!ss.get('ie-pop')&&!ss.get('ie-lead')&&(Date.now()-closedAt>3*864e5);
  if(auto){
    const delay=Math.max(5,+M.LEAD_POPUP_DELAY||20)*1000;
    setTimeout(function chk(){
      const p=$('chatpanel'), typing=document.activeElement&&/^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement.tagName);
      if(ss.get('ie-lead')||ss.get('ie-pop'))return;
      if((p&&!p.hidden)||typing||document.querySelector('dialog[open]')){setTimeout(chk,8000);return;}
      const n=$('nudge');if(n&&!n.hidden)n.hidden=true;
      open('timer');
    },delay);
  }
  // sending
  const f=$('lpform'),err=$('lp-err'),out=$('lpout');
  const bad=(el,m)=>{el.setAttribute('aria-invalid','true');err.textContent=m;err.className='nfmsg err';el.focus();return false;};
  f.addEventListener('submit',e=>{
    e.preventDefault();
    f.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));err.textContent='';err.className='nfmsg';
    const name=$('lp-n').value.trim(), mob=bdMobile($('lp-p').value);
    if(!name)return bad($('lp-n'),'Please enter your name.');
    if(!mob)return bad($('lp-p'),'Please enter a Bangladesh mobile number, for example 01712345678.');
    if(!$('lp-ok').checked)return bad($('lp-ok'),'Please tick the box so we can contact you.');
    const dest=$('lp-d').value, lvl=$('lp-l').value, first=name.split(/\s+/)[0];
    const msg=`Call-back request (website pop-up)\nName: ${name}\nMobile: ${mob}\nDestination: ${dest}\nStudy level: ${lvl}${window.IEsrc&&IEsrc()?'\nHeard about us via: '+IEsrc():''}`;
    const wa='https://wa.me/8801913179498?text='+encodeURIComponent(msg);
    const track=()=>{try{window.IEtrack&&IEtrack('lead',{content_name:'Lead pop-up',content_category:dest,destination:dest,study_level:lvl,_user:{phone:mob.replace('+',''),fn:first}})}catch(x){}};
    const thanks=()=>{ss.set('ie-lead','1');f.hidden=true;out.innerHTML=`<div class="ok"><b>Thank you, ${esc(first)}! We've received your request.</b> A counsellor will call or WhatsApp you on ${esc(mob)}, usually within one working day.</div><button type="button" class="btn btn-line" id="lpdone" style="margin:0 0 14px">Close</button>`;$('lpdone').addEventListener('click',close);$('lpdone').focus();};
    const manual=()=>{f.hidden=true;out.innerHTML=`<div class="ok">Your request is ready. Send it to us in one tap; it is not sent until you do.<pre style="white-space:pre-wrap;font:500 .85rem var(--body);margin:10px 0">${esc(msg)}</pre><div class="sendrow"><a class="btn btn-sun soc-wa" href="${wa}" target="_blank" rel="noopener">Send on WhatsApp</a></div></div>`;window.IEmailBtn&&IEmailBtn(out,'Call-back request: '+name,msg);ss.set('ie-lead','1');};
    const btn=f.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Sending…';
    const done=()=>{btn.disabled=false;btn.textContent='Call me back for free';};
    const EP=M.LEAD_ENDPOINT||'';
    const viaEmail=()=>window.IEmail&&IEmail.on?IEmail('Call-back request: '+name,msg).then(ok=>{done();track();ok?thanks():manual();}):(done(),track(),manual());
    if(!EP){viaEmail();return;}
    const d={form:'contact',full_name:name,mobile:mob,destination:dest,level:lvl,mode:'Call-back (website pop-up)',message:'Website pop-up: please call me back',website:$('lp-web').value,
      source:window.IEsrc?IEsrc():'',attribution:window.IEattr?IEattr():{},ids:window.IEids?IEids():{},page:location.href.split('#')[0]};
    fetch(EP,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d),credentials:'omit'}).then(r=>r.ok?r.json():Promise.reject()).then(j=>{if(!j||!j.ok)throw 0;done();track();thanks();}).catch(()=>{viaEmail();});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const n=document.getElementById('nudge'),ss={get(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
  if(!n||ss.get('ie-nudge')||ss.get('ie-lead'))return;
  let shown=false,start=Date.now();
  function show(){
    if(shown||ss.get('ie-lead')||ss.get('ie-pop'))return;const p=document.getElementById('chatpanel');if(p&&!p.hidden)return;const lp=document.getElementById('leadpop');if(lp&&lp.open)return;
    shown=true;ss.set('ie-nudge','1');n.hidden=false;window.IEtrack&&IEtrack('nudge',{content_name:'Counselling nudge'});
  }
  const hide=()=>{n.hidden=true;};
  document.getElementById('nudgex').addEventListener('click',hide);
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!n.hidden)hide();});
  document.getElementById('nudgego').addEventListener('click',()=>{hide();const o=document.getElementById('chatopen');const p=document.getElementById('chatpanel');if(o&&p&&p.hidden)o.click();const t=document.getElementById('tab-enq');if(t)t.click();const fn=document.getElementById('ef-fn');if(fn)setTimeout(()=>fn.focus(),50);});
  // desktop: when the pointer leaves through the top of the window (exit intent), after 15 seconds on the page
  document.addEventListener('mouseout',e=>{if(!e.relatedTarget&&e.clientY<=0&&Date.now()-start>15000)show();});
  // all devices: after 45 seconds and most of a screen of scrolling
  setTimeout(function chk(){if(shown)return;if(scrollY>innerHeight*1.5)show();else setTimeout(chk,5000);},45000);
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const b=document.getElementById('fbload'),box=document.getElementById('fbbox');
  if(!b||!box)return;
  if(typeof IE_MARKETING!=='undefined'&&IE_MARKETING.FB_PAGE_EMBED===false){box.hidden=true;return;}
  b.addEventListener('click',()=>{
    const w=Math.min(500,Math.max(180,Math.floor(box.clientWidth-32)));
    const f=document.createElement('iframe');f.title='Independent Education Facebook page';f.loading='lazy';
    f.src='https://www.facebook.com/plugins/page.php?href='+encodeURIComponent('https://www.facebook.com/IndependentEducation')+'&tabs=timeline%2Cevents&width='+w+'&height=520&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true';
    f.setAttribute('allow','encrypted-media');b.replaceWith(f);
    window.IEtrack&&IEtrack('view_content',{content_name:'Facebook page box',content_category:'Social'});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const M=typeof IE_MARKETING!=='undefined'?IE_MARKETING:{};
  const r=document.getElementById('greview');
  if(r&&M.GOOGLE_PLACE_ID){r.href='https://search.google.com/local/writereview?placeid='+encodeURIComponent(M.GOOGLE_PLACE_ID);r.hidden=false;r.addEventListener('click',()=>window.IEtrack&&IEtrack('review_click'));}
  const b=document.getElementById('mapload');
  if(b)b.addEventListener('click',()=>{
    const f=document.createElement('iframe');f.title='Map of the Independent Education office in Banani, Dhaka';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';
    f.src='https://www.google.com/maps?q='+encodeURIComponent('89/2 Siraj Tower, New Airport Road, Kakoli, Banani, Dhaka 1213, Bangladesh')+'&output=embed';
    b.closest('.gbox').insertBefore(f,b.closest('.gbtns'));b.remove();
    window.IEtrack&&IEtrack('view_content',{content_name:'Office map',content_category:'Contact'});
  });
  const d=document.getElementById('gdir');if(d)d.addEventListener('click',()=>window.IEtrack&&IEtrack('directions'));
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const b=document.querySelector('.fab-wa[data-wa-picker]'),p=document.getElementById('wapick');
  if(!b||!p)return;
  const set=v=>{p.hidden=!v;b.setAttribute('aria-expanded',v);if(v){const cp=document.getElementById('chatpanel');if(cp&&!cp.hidden){const o=document.getElementById('chatopen');o&&o.click();}p.querySelector('.waopt').focus();}};
  b.addEventListener('click',e=>{e.preventDefault();set(p.hidden);});
  document.addEventListener('click',e=>{if(!p.hidden&&!p.contains(e.target)&&!b.contains(e.target))set(false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!p.hidden){set(false);b.focus();}});
  p.querySelectorAll('.waopt').forEach(a=>a.addEventListener('click',()=>setTimeout(()=>set(false),100)));
  const o=document.getElementById('chatopen');if(o)o.addEventListener('click',()=>{if(!p.hidden)set(false);});
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  const f=document.getElementById('fq'),out=document.getElementById('fqres');if(!f)return;
  // general tendencies only, kept deliberately broad; rules, costs and scholarships change
  const D={
   'Australia':{work:3,rank:2,sch:1,cost:0,near:2,why:['Post-study work visa options for eligible graduates','Wide choice of universities and colleges','Popular with Bangladeshi students']},
   'United Kingdom':{work:2,rank:3,sch:2,cost:1,near:1,why:['Many master\'s degrees take one year','Graduate route for eligible students','Scholarships such as Chevening (very competitive)']},
   'Canada':{work:3,rank:2,sch:1,cost:1,near:0,why:['Work options for eligible graduates','Colleges and universities to choose from','Check study permit rules, which have changed recently']},
   'USA':{work:1,rank:3,sch:3,cost:0,near:0,why:['Largest choice of universities','Many universities offer scholarships and assistantships','Practical training options for some graduates']},
   'New Zealand':{work:2,rank:1,sch:1,cost:1,near:1,why:['Post-study work options for eligible graduates','Smaller, friendly study environment']},
   'Ireland':{work:2,rank:1,sch:1,cost:1,near:0,why:['English-speaking EU country','Stay-back options for eligible graduates']},
   'Europe':{work:1,rank:2,sch:2,cost:3,near:1,why:['Some countries have low or no tuition at public universities','Many English-taught programmes','Requirements differ a lot between countries']},
   'South Korea':{work:1,rank:1,sch:3,cost:2,near:2,why:['Government scholarships such as GKS (competitive)','Strong in technology and engineering']},
   'Malaysia':{work:0,rank:1,sch:1,cost:3,near:3,why:['Lower tuition and living costs','Close to Bangladesh','Branch campuses of UK and Australian universities']},
   'Türkiye':{work:1,rank:1,sch:2,cost:3,near:2,why:['Often lower tuition and living costs than Western Europe','Government Türkiye Scholarships (competitive)','Many English-taught programmes in Istanbul and Ankara']},
   'China':{work:0,rank:2,sch:3,cost:2,near:2,why:['Chinese Government Scholarship (CSC) and many university scholarships','Strong in engineering, technology and medicine','Close to Bangladesh']}
  };
  f.addEventListener('change',e=>{if(e.target.name==='pr'){const c=[...f.querySelectorAll('input[name=pr]:checked')];if(c.length>2)e.target.checked=false;}});
  f.addEventListener('submit',e=>{
    e.preventDefault();const err=document.getElementById('fqerr');
    const v=n=>{const x=f.querySelector('input[name='+n+']:checked');return x?x.value:''};
    const pr=[...f.querySelectorAll('input[name=pr]:checked')].map(x=>x.value);
    if(!v('lv')||!v('bu')||!v('en')||!v('st')||!pr.length){err.textContent='Please answer all five questions (choose at least one priority).';return;}
    err.textContent='';
    const bu=v('bu');
    const sc=Object.entries(D).map(([k,d])=>{let s=0;pr.forEach(p=>s+=d[p]*2);if(bu==='low')s+=d.cost*2;if(bu==='mid')s+=d.cost;if(bu==='high')s+=d.rank;return [k,s,d]}).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    const tips=[];if(v('en')==='no')tips.push('Book an English test early: most universities and visas need a score.');
    if(v('st')==='6')tips.push('Starting within 6 months is tight: talk to a counsellor soon about deadlines.');
    out.innerHTML='<div class="fqres">'+sc.map(([k,_,d],i)=>`<div class="fqcard${i?'':' top'}"><small>${i?'Also worth considering':'Best starting match'}</small><b>${esc(k)}</b><ul>${d.why.map(w=>'<li>'+esc(w)+'</li>').join('')}</ul><div class="row"><a class="btn btn-sun" href="#contact" data-fqdest="${esc(k)}">Ask about ${esc(k)}</a><a class="btn btn-line" href="find-a-university.html" data-fqunis="${esc(k)}">See universities</a></div></div>`).join('')+'</div>'+
      (tips.length?'<p class="fqnote"><b>Tips:</b> '+tips.map(esc).join(' ')+'</p>':'')+
      '<p class="fqnote">This is general guidance based on your answers, not advice about your eligibility. Visa rules, costs and scholarships change often, so a counsellor will check the latest rules for your case.</p>';
    window.IEtrack&&IEtrack('view_content',{content_name:'Destination quiz result',content_category:sc[0][0],destination:sc[0][0]});
  });
  out.addEventListener('click',e=>{
    const a=e.target.closest('a');if(!a)return;
    if(a.dataset.fqdest){const d=document.getElementById('d');if(d){[...d.options].forEach(o=>{if(o.text===a.dataset.fqdest)d.value=o.value||o.text})}
      window.IEtrack&&IEtrack('destination',{content_name:'Quiz: ask about '+a.dataset.fqdest,content_category:a.dataset.fqdest,destination:a.dataset.fqdest});}
    if(a.dataset.fqunis){const c=document.querySelector('#find-university .chip[data-c="'+a.dataset.fqunis+'"]');if(c&&c.getAttribute('aria-pressed')!=='true')setTimeout(()=>c.click(),50);}
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
try{(function(){
  const L=document.getElementById('dclist');if(!L)return;
  const base=[['Valid passport','At least 6 months beyond your planned stay is commonly required'],['English test result','IELTS, PTE, TOEFL or another accepted test'],['Statement of purpose (SOP)','Why this course, this university and your goals'],['CV or resume','Education, work, projects and achievements'],['Passport-size photos','Check each country\'s photo rules'],['Financial documents','Bank statements, sponsor letter or loan sanction letter'],['Birth certificate or national ID','Sometimes needed for visa forms']];
  const L2={ug:[['SSC and HSC certificates and mark sheets','Or O/A level results'],['Two recommendation letters','Usually from teachers']],
           pg:[['Bachelor\'s degree certificate and transcript','Plus SSC and HSC certificates'],['Two recommendation letters','From professors or employers'],['Work experience letters','If you have work experience'],['Research proposal or portfolio','For research degrees or creative courses']],
           dip:[['SSC and HSC certificates and mark sheets','Or your highest qualification so far'],['One recommendation letter','Sometimes optional']]};
  function render(lv){L.innerHTML=[...L2[lv],...base].map(([t,n],i)=>`<li><label><input type="checkbox" id="dc${i}"> <span>${t}<small>${n}</small></span></label></li>`).join('');}
  document.querySelectorAll('#docchk .chip').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#docchk .chip').forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');render(b.dataset.lv);window.IEtrack&&IEtrack('view_content',{content_name:'Document checklist '+b.dataset.lv,content_category:'Tools'});}));
  document.getElementById('dcprint').addEventListener('click',()=>{window.print();window.IEtrack&&IEtrack('view_content',{content_name:'Checklist printed',content_category:'Tools'});});
  render('ug');
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
try{(function(){
  /* voice search (Web Speech API) - shown only in browsers that support it */
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR) return;
  document.querySelectorAll('.micbtn').forEach(b=>{
    const inp=document.getElementById(b.dataset.for); if(!inp) return;
    b.hidden=false; let rec=null;
    b.addEventListener('click',()=>{
      if(rec){rec.stop();return}
      try{rec=new SR()}catch(e){return}
      rec.lang='en-GB'; rec.interimResults=true; rec.maxAlternatives=1;
      b.classList.add('on'); b.setAttribute('aria-label','Listening, tap to stop');
      rec.onresult=ev=>{let t='';for(const r of ev.results)t+=r[0].transcript;inp.value=t.replace(/[.?!]$/,'');inp.dispatchEvent(new Event('input',{bubbles:true}))};
      const end=()=>{b.classList.remove('on');b.setAttribute('aria-label','Search by voice');rec=null;inp.focus()};
      rec.onend=end; rec.onerror=end;
      try{rec.start();window.IEtrack&&IEtrack('voice_search',{field:b.dataset.for})}catch(e){end()}
    });
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
try{(function(){
  /* installable app (PWA) + offline page - only runs on the real https website */
  if('serviceWorker' in navigator && location.protocol==='https:' && window.top===window){
    addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
  }
  const ib=document.getElementById('installbtn'); let deferred=null;
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;if(ib)ib.hidden=false});
  ib&&ib.addEventListener('click',async()=>{if(!deferred)return;deferred.prompt();const c=await deferred.userChoice.catch(()=>null);window.IEtrack&&IEtrack('pwa_install_prompt',{outcome:(c&&c.outcome)||'unknown'});deferred=null;ib.hidden=true});
  addEventListener('appinstalled',()=>{if(ib)ib.hidden=true;window.IEtrack&&IEtrack('pwa_installed',{})});
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
try{(function(){
  const M=(typeof IE_MARKETING!=='undefined')?IE_MARKETING:{}, track=(e,x)=>{try{window.IEtrack&&IEtrack(e,x)}catch(err){}};
  /* online booking button (only when BOOKING_URL is set) */
  const bb=document.getElementById('bookbtn');
  if(bb&&M.BOOKING_URL&&/^https:\/\//.test(M.BOOKING_URL)){
    let u=M.BOOKING_URL;try{const x=new URL(u);x.searchParams.set('utm_source','website');x.searchParams.set('utm_medium','booking_button');u=x.toString()}catch(e){}
    bb.href=u;bb.hidden=false;bb.addEventListener('click',()=>track('booking',{content_name:'Online booking'}));
  }
  /* Jotform student registration form (only when JOTFORM_URL is set) */
  const jb=document.getElementById('jotbtn');
  if(jb&&M.JOTFORM_URL&&/^https:\/\/([a-z0-9-]+\.)*(jotform\.com|jotform\.eu|jotform\.me|jotform\.us)\//i.test(M.JOTFORM_URL)){
    let u=M.JOTFORM_URL;try{const x=new URL(u);x.searchParams.set('utm_source','website');x.searchParams.set('utm_medium','registration_button');const src=window.IEsrc?IEsrc():'';if(src)x.searchParams.set('ie_source',src);u=x.toString()}catch(e){}
    jb.href=u;jb.hidden=false;jb.addEventListener('click',()=>track('registration_form',{content_name:'Jotform registration'}));
  }
  /* refer a friend: personal share link */
  const rf=document.getElementById('refer'),ro=document.getElementById('refout');
  if(rf)rf.addEventListener('submit',e=>{
    e.preventDefault();
    const nm=document.getElementById('refname').value.trim().replace(/[^\p{L}\p{M}\p{N} ._-]/gu,'').slice(0,40);
    if(!nm){ro.innerHTML='<p class="nfmsg err">Please type your name first.</p>';document.getElementById('refname').focus();return;}
    const base=(location.protocol==='https:'||location.protocol==='http:')?location.origin+location.pathname:'https://YOUR-DOMAIN/';
    const link=base+'?ref='+encodeURIComponent(nm)+'&utm_source=referral&utm_medium=friend&utm_campaign=refer_a_friend';
    const txt='I used Independent Education for free study abroad counselling. You can contact them here: '+link;
    ro.innerHTML='<div class="reflink"><code></code><button type="button" class="shbtn" data-r="copy">Copy</button><a class="shbtn sh-wa" target="_blank" rel="noopener">Send on WhatsApp</a></div>';
    ro.querySelector('code').textContent=link;
    ro.querySelector('a').href='https://wa.me/?text='+encodeURIComponent(txt);
    ro.querySelector('[data-r=copy]').addEventListener('click',ev=>{try{navigator.clipboard.writeText(link);ev.target.textContent='Copied'}catch(err){}});
    track('referral',{content_name:'Referral link'});
  });
  /* email newsletter sign-up */
  const nf=document.getElementById('newsform');
  if(nf)nf.addEventListener('submit',e=>{
    e.preventDefault();
    const em=document.getElementById('nf-em'),ok=document.getElementById('nf-ok'),msg=document.getElementById('nf-msg'),btn=nf.querySelector('button');
    const set=(t,c)=>{msg.textContent=t;msg.className='nfmsg '+c;};
    em.removeAttribute('aria-invalid');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())){em.setAttribute('aria-invalid','true');set('Please enter a valid email address.','err');em.focus();return;}
    if(!ok.checked){set('Please tick the box to agree to receive emails.','err');ok.focus();return;}
    const done=()=>{set('Thank you! Please check your inbox to confirm your subscription.','ok');nf.reset();track('subscribe',{content_name:'Newsletter'});};
    if(!M.NEWSLETTER_ENDPOINT){ // no server yet: send the request by email instead
      location.href='mailto:info.independentedu@gmail.com?subject='+encodeURIComponent('Newsletter sign-up')+'&body='+encodeURIComponent('Please add me to the Independent Education newsletter: '+em.value.trim());
      set('Your email app is opening. Press send to finish signing up.','ok');track('subscribe',{content_name:'Newsletter (email)'});return;
    }
    btn.disabled=true;btn.textContent='Sending…';
    fetch(M.NEWSLETTER_ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain'},credentials:'omit',body:JSON.stringify({email:em.value.trim(),consent:true,website:document.getElementById('nf-web').value,source:window.IEsrc?IEsrc():'',attribution:window.IEattr?IEattr():{},page:location.href.split('#')[0]})})
      .then(r=>r.ok?r.json():Promise.reject()).then(j=>{if(!j||!j.ok)throw 0;done();})
      .catch(()=>set('Sorry, something went wrong. Please try again, or message us on WhatsApp.','err'))
      .finally(()=>{btn.disabled=false;btn.textContent='Subscribe';});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
try{(function(){
  /* Tawk.to live chat: opened from the "Live chat" tab in our own chat box, so the page keeps one chat button */
  const M=(typeof IE_MARKETING!=='undefined')?IE_MARKETING:{};
  if(!M.TAWK_PROPERTY_ID||!/^[a-f0-9]{16,32}$/i.test(M.TAWK_PROPERTY_ID))return;
  const wid=/^[a-z0-9]{1,40}$/i.test(M.TAWK_WIDGET_ID||'')?M.TAWK_WIDGET_ID:'default';
  const tab=document.getElementById('tab-live'),track=(e,x)=>{try{window.IEtrack&&IEtrack(e,x)}catch(err){}};
  let loaded=false,openWhenReady=false;
  function load(){
    if(loaded)return;loaded=true;
    window.Tawk_API=window.Tawk_API||{};window.Tawk_LoadStart=new Date();
    const T=window.Tawk_API;
    T.onLoad=function(){try{if(openWhenReady){T.showWidget();T.maximize();}else T.hideWidget();}catch(e){}};
    T.onChatMinimized=function(){try{T.hideWidget()}catch(e){}};
    T.onChatStarted=function(){track('live_chat',{content_name:'Tawk.to chat started'})};
    T.onPrechatSubmit=function(){track('lead',{content_name:'Tawk.to pre-chat form'})};
    T.onOfflineSubmit=function(){track('lead',{content_name:'Tawk.to offline message'})};
    const sc=document.createElement('script');sc.async=true;sc.charset='UTF-8';sc.setAttribute('crossorigin','*');
    sc.src='https://embed.tawk.to/'+M.TAWK_PROPERTY_ID+'/'+wid;document.head.appendChild(sc);
  }
  function openLive(){
    const cx=document.getElementById('chatclose');if(cx)cx.click();
    openWhenReady=true;track('live_chat_open',{content_name:'Live chat'});
    if(window.Tawk_API&&typeof Tawk_API.maximize==='function'&&Tawk_API.getStatus){try{Tawk_API.showWidget();Tawk_API.maximize();return}catch(e){}}
    load();
  }
  if(tab){tab.hidden=false;tab.addEventListener('click',openLive);}
  if(M.TAWK_LOAD==='consent'){
    const c=()=>{try{return localStorage.getItem('ie-consent')==='yes'}catch(e){return false}};
    if(c())load();else document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('[data-c=yes]'))setTimeout(load,300)});
  }
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
try{(function(){
  /* Get a free quote form + Book free counselling form -> lead.php (CRM, email, WhatsApp alerts); WhatsApp fallback */
  const M=(typeof IE_MARKETING!=='undefined')?IE_MARKETING:{};
  const EP=M.LEAD_ENDPOINT||'';
  const bdMobile=v=>{const d=String(v).replace(/\D/g,'');if(/^01[3-9]\d{8}$/.test(d))return '+88'+d;if(/^8801[3-9]\d{8}$/.test(d))return '+'+d;return '';};
  const common=()=>({source:window.IEsrc?IEsrc():'',attribution:window.IEattr?IEattr():{},ids:window.IEids?IEids():{},page:location.href.split('#')[0]});
  const post=d=>fetch(EP,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d),credentials:'omit'}).then(r=>r.ok?r.json():Promise.reject()).then(j=>{if(!j||!j.ok)throw 0;return j;});
  const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  const waLink=msg=>'https://wa.me/8801913179498?text='+encodeURIComponent(msg);

  const qf=document.getElementById('quote');
  if(qf)qf.addEventListener('submit',e=>{
    e.preventDefault();
    const $=id=>document.getElementById(id),err=$('q-err'),out=$('q-out'),btn=qf.querySelector('button[type=submit]');
    qf.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));
    const bad=(el,msg)=>{el.setAttribute('aria-invalid','true');err.textContent=msg;err.className='nfmsg err';el.focus();};
    const name=$('q-n').value.trim(),mob=bdMobile($('q-p').value),em=$('q-e').value.trim();
    if(!name)return bad($('q-n'),'Please enter your name.');
    if(!mob)return bad($('q-p'),'Please enter a Bangladesh mobile number, for example 01712345678.');
    if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em))return bad($('q-e'),'Please check your email address, or leave it empty.');
    if(!$('q-d').value)return bad($('q-d'),'Please choose a destination.');
    if(!$('q-l').value)return bad($('q-l'),'Please choose a study level.');
    if(!$('q-ok').checked)return bad($('q-ok'),'Please tick the box so we can contact you about your quote.');
    err.textContent='';err.className='nfmsg';
    const d=Object.assign({form:'quote',full_name:name,mobile:mob,email:em,destination:$('q-d').value,level:$('q-l').value,start:$('q-s').value,budget:$('q-b').value,message:$('q-m').value.trim(),mode:'Free quote request',website:$('q-web').value},common());
    const msg=`Free quote request\nName: ${name}\nMobile: ${mob}${em?'\nEmail: '+em:''}\nDestination: ${d.destination}\nLevel: ${d.level}\nStart: ${d.start||'-'}\nBudget: ${d.budget||'-'}\nSubject: ${d.message||'-'}${d.source?'\nHeard about us via: '+d.source:''}`;
    const track=()=>{try{window.IEtrack&&IEtrack('lead',{content_name:'Free quote form',content_category:d.destination,destination:d.destination,study_level:d.level,start_time:d.start,_user:{email:em,phone:mob.replace('+',''),fn:name.split(/\s+/)[0],ln:name.split(/\s+/).slice(1).join(' ')}})}catch(x){}};
    const manual=()=>{out.innerHTML=`<div class="ok">Your quote request is ready. Send it to us in one tap on WhatsApp.<pre style="white-space:pre-wrap;font:500 .85rem var(--body);margin:10px 0">${esc(msg)}</pre><a class="btn btn-sun soc-wa" href="${waLink(msg)}" target="_blank" rel="noopener">Send on WhatsApp</a></div>`;};
    const manualQ=()=>{manual();IEmailBtn(out,'Free quote request: '+name,msg);};
    if(!EP){track();
      if(!IEmail.on){manualQ();return;}
      btn.disabled=true;btn.textContent='Sending…';
      IEmail('Free quote request: '+name,msg,em).then(ok=>{btn.disabled=false;btn.textContent=btn.dataset.label||'Get my free quote';
        if(!ok){manualQ();return;}
        out.innerHTML=`<div class="ok"><b>Thank you, ${esc(name.split(/\s+/)[0])}! Your quote request has been sent.</b> A counsellor will send your estimate soon.</div>`;});
      return;}
    btn.disabled=true;btn.textContent='Sending…';
    post(d).then(()=>{track();try{sessionStorage.setItem('ie-lead','1')}catch(x){}
      out.innerHTML=`<div class="ok"><b>Thank you, ${esc(name.split(/\s+/)[0])}! We've received your quote request.</b> A counsellor will send your estimate soon. For a faster reply, message us on WhatsApp.<div style="margin-top:10px"><a class="btn btn-sun soc-wa" href="${waLink(msg)}" target="_blank" rel="noopener">Message on WhatsApp</a></div></div>`;
      qf.querySelectorAll('input:not([type=checkbox]),select').forEach(x=>{x.value=''});$('q-ok').checked=false;
    }).catch(()=>{track();manual();}).finally(()=>{btn.disabled=false;btn.textContent='Get my free quote';});
  });


  const evf=document.getElementById('evform');
  if(evf)evf.addEventListener('submit',e=>{
    e.preventDefault();
    const $=id=>document.getElementById(id),err=$('ev-err'),out=$('ev-out'),btn=evf.querySelector('button[type=submit]');
    evf.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));
    const bad=(el,msg)=>{el.setAttribute('aria-invalid','true');err.textContent=msg;err.className='nfmsg err';el.focus();};
    const name=$('ev-n').value.trim(),mob=bdMobile($('ev-p').value),em=$('ev-e').value.trim();
    if(!name)return bad($('ev-n'),'Please enter your name.');
    if(!mob)return bad($('ev-p'),'Please enter a Bangladesh mobile number, for example 01712345678.');
    if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em))return bad($('ev-e'),'Please check your email address, or leave it empty.');
    if(!$('ev-d').value)return bad($('ev-d'),'Please choose a destination.');
    if(!$('ev-ok').checked)return bad($('ev-ok'),'Please tick the box so we can contact you about events.');
    err.textContent='';err.className='nfmsg';
    const evName=window.__evTitle||'';
    const d=Object.assign({form:'event',full_name:name,mobile:mob,email:em,destination:$('ev-d').value,level:'',message:(evName?'Event: '+evName+'. ':'')+'Interested in: '+($('ev-t').value||'any event'),mode:'Event registration',website:$('ev-web').value},common());
    const msg=`Event registration\nName: ${name}\nMobile: ${mob}${em?'\nEmail: '+em:''}\nDestination: ${d.destination}\n${evName?'Event: '+evName+'\n':''}Interested in: ${$('ev-t').value||'Any event'}${d.source?'\nHeard about us via: '+d.source:''}`;
    const track=()=>{try{window.IEtrack&&IEtrack('lead',{content_name:'Event registration',content_category:d.destination,destination:d.destination})}catch(x){}};
    const done=()=>{out.innerHTML=`<div class="ok"><b>Thank you, ${esc(name.split(/\s+/)[0])}! You're on our events list.</b> We'll contact you about ${evName?esc(evName):'upcoming events'}.</div>`;evf.reset();window.__evTitle='';};
    const manual=()=>{out.innerHTML=`<div class="ok">Your registration is ready. Send it to us in one tap on WhatsApp.<pre style="white-space:pre-wrap;font:500 .85rem var(--body);margin:10px 0">${esc(msg)}</pre><a class="btn btn-sun soc-wa" href="${waLink(msg)}" target="_blank" rel="noopener">Send on WhatsApp</a></div>`;IEmailBtn(out,'Event registration: '+name,msg);};
    btn.disabled=true;
    if(!EP){track();
      if(!IEmail.on){btn.disabled=false;manual();return;}
      IEmail('Event registration: '+name,msg,em).then(ok=>{btn.disabled=false;ok?done():manual();});
      return;}
    post(d).then(()=>{track();done();}).catch(()=>{track();manual();}).finally(()=>{btn.disabled=false;});
  });

  /* Book free counselling (contact section): also send to the CRM when the server is set up */
  const cf=document.getElementById('lead');
  if(cf&&EP)cf.addEventListener('submit',()=>{
    const n=document.getElementById('n').value.trim(),mob=bdMobile(document.getElementById('p').value);
    if(!n||!mob)return;  // the form's own message handles missing details
    const d=Object.assign({form:'contact',full_name:n,mobile:mob,destination:document.getElementById('d').value,level:document.getElementById('lv').value,message:document.getElementById('m').value.trim(),mode:'Contact form request',website:''},common());
    post(d).then(()=>{const o=document.getElementById('formout');if(o){const t=document.createElement('p');t.style.cssText='margin:0 0 10px;font-size:.9rem;font-weight:600';t.textContent='We have also received your request, so a counsellor will contact you even if you do not send the WhatsApp message.';o.prepend(t);}try{sessionStorage.setItem('ie-lead','1')}catch(x){}}).catch(()=>{});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
;
/* ===== Online booking, online application and student portal ===== */
try{(function(){
  /* --- Book a free counselling session -> lead.php (form: booking); WhatsApp fallback --- */
  const f=document.getElementById('bookf'); if(!f)return;
  const M=(typeof IE_MARKETING!=='undefined')?IE_MARKETING:{};
  const EP=M.LEAD_ENDPOINT||'', $=id=>document.getElementById(id);
  const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const bdMobile=v=>{const d=String(v).replace(/\D/g,'');if(/^01[3-9]\d{8}$/.test(d))return '+88'+d;if(/^8801[3-9]\d{8}$/.test(d))return '+'+d;return '';};
  const CLOSED=[5], FIRST='10:00', LAST='17:30', DAYS=21;     // Friday closed; same as 'booking' in the server settings
  if(M.BOOKING_URL&&/^https:\/\//.test(M.BOOKING_URL)){const c=$('bookcal');c.href=M.BOOKING_URL;c.hidden=false;}
  // today's date in Bangladesh (UTC+6), then the next working days
  const dk=new Date(Date.now()+6*3600e3), pad=n=>String(n).padStart(2,'0');
  const todayStr=dk.getUTCFullYear()+'-'+pad(dk.getUTCMonth()+1)+'-'+pad(dk.getUTCDate());
  const ds=$('bk-date'), fmt=new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'});
  for(let i=0;i<=DAYS;i++){const d=new Date(Date.UTC(dk.getUTCFullYear(),dk.getUTCMonth(),dk.getUTCDate()+i));
    if(CLOSED.includes(d.getUTCDay()))continue;
    const v=d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate());
    const o=new Option((i===0?'Today, ':i===1?'Tomorrow, ':'')+fmt.format(d),v);ds.add(o);}
  const slotsFor=v=>{const out=[];let [h,m]=FIRST.split(':').map(Number);const [lh,lm]=LAST.split(':').map(Number);
    const isToday=v===todayStr;
    const nowMin=dk.getUTCHours()*60+dk.getUTCMinutes();
    while(h*60+m<=lh*60+lm){const t=pad(h)+':'+pad(m);if(!isToday||h*60+m>nowMin+60)out.push(t);m+=30;if(m>=60){h++;m-=60;}}
    return out;};
  const label=t=>{const [h,m]=t.split(':').map(Number);return ((h+11)%12+1)+':'+pad(m)+(h<12?' AM':' PM');};
  const box=$('bk-slots');
  ds.addEventListener('change',()=>{
    const s=ds.value?slotsFor(ds.value):[];
    box.innerHTML=!ds.value?'<p>Choose a day first.</p>':(s.length?s.map(t=>`<label class="slot"><input type="radio" name="bk-time" value="${t}"> <span>${label(t)}</span></label>`).join(''):'<p class="mini" style="margin:0">No times left today. Please choose another day.</p>');
  });
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const err=$('bk-err'),out=$('bk-out'),btn=f.querySelector('button[type=submit]');
    f.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));
    const bad=(el,msg)=>{el.setAttribute('aria-invalid','true');err.textContent=msg;err.className='nfmsg err';el.focus();};
    const time=(f.querySelector('input[name=bk-time]:checked')||{}).value||'';
    const name=$('bk-n').value.trim(),mob=bdMobile($('bk-p').value),em=$('bk-e').value.trim();
    if(!$('bk-mode').value)return bad($('bk-mode'),'Please choose how you would like to meet.');
    if(!ds.value)return bad(ds,'Please choose a day.');
    if(!time)return bad(box.querySelector('input')||ds,'Please choose a time.');
    if(!name)return bad($('bk-n'),'Please enter your name.');
    if(!mob)return bad($('bk-p'),'Please enter a Bangladesh mobile number, for example 01712345678.');
    if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em))return bad($('bk-e'),'Please check your email address, or leave it empty.');
    if(!$('bk-ok').checked)return bad($('bk-ok'),'Please tick the box so we can contact you about your booking.');
    err.textContent='';err.className='nfmsg';
    const when=ds.options[ds.selectedIndex].text.replace(/^(Today|Tomorrow), /,'')+' at '+label(time);
    const d={form:'booking',full_name:name,mobile:mob,email:em,booking_date:ds.value,booking_time:time,mode:$('bk-mode').value,
      message:$('bk-svc').value+($('bk-m').value.trim()?'. '+$('bk-m').value.trim():''),website:$('bk-web').value,
      source:window.IEsrc?IEsrc():'',attribution:window.IEattr?IEattr():{},ids:window.IEids?IEids():{},page:location.href.split('#')[0]};
    const msg=`Booking request\nName: ${name}\nMobile: ${mob}\nWhen: ${when} (Bangladesh time)\nHow: ${d.mode}\nAbout: ${d.message}`;
    const track=()=>{try{window.IEtrack&&IEtrack('booking',{content_name:'Booking form',service:$('bk-svc').value,_user:{email:em,phone:mob.replace('+',''),fn:name.split(/\s+/)[0]}})}catch(x){}};
    const manual=()=>{out.innerHTML=`<div class="ok">Your booking request is ready. Send it to us in one tap on WhatsApp and we'll confirm your time.<pre style="white-space:pre-wrap;font:500 .85rem var(--body);margin:10px 0">${esc(msg)}</pre><a class="btn btn-sun soc-wa" href="https://wa.me/8801913179498?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Send on WhatsApp</a></div>`;};
    const manualB=()=>{manual();IEmailBtn(out,'Booking request: '+name,msg);};
    if(!EP){track();
      if(!IEmail.on){manualB();return;}
      btn.disabled=true;btn.textContent='Sending…';
      IEmail('Booking request: '+name+' ('+when+')',msg,em).then(ok=>{btn.disabled=false;btn.textContent='Request this time';
        if(!ok){manualB();return;}
        out.innerHTML=`<div class="ok"><b>Thank you, ${esc(name.split(/\s+/)[0])}! We've received your request for ${esc(when)}.</b> A counsellor will confirm by phone or WhatsApp.</div>`;});
      return;}
    btn.disabled=true;btn.textContent='Sending…';
    fetch(EP,{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify(d),credentials:'omit'})
      .then(r=>r.json().then(j=>({ok:r.ok&&j&&j.ok,j}))).then(({ok,j})=>{
        if(!ok){ if(j&&j.error==='slot'){err.textContent='That time is not available. Please choose another day or time.';err.className='nfmsg err';return;} throw 0; }
        track();
        out.innerHTML=`<div class="ok"><b>Thank you, ${esc(name.split(/\s+/)[0])}! We've received your request for ${esc(when)}.</b> A counsellor will confirm by phone or WhatsApp${em?', and we have emailed you a copy':''}.</div>`;
        f.reset();box.innerHTML='<p>Choose a day first.</p>';
      }).catch(()=>{track();manual();}).finally(()=>{btn.disabled=false;btn.textContent='Request this time';});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  /* --- Apply online: 4 steps, documents -> apply.php --- */
  const f=document.getElementById('applyf'); if(!f)return;
  const M=(typeof IE_MARKETING!=='undefined')?IE_MARKETING:{};
  const EP=M.APPLY_ENDPOINT||'', $=id=>document.getElementById(id);
  const esc=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const bdMobile=v=>{const d=String(v).replace(/\D/g,'');if(/^01[3-9]\d{8}$/.test(d))return '+88'+d;if(/^8801[3-9]\d{8}$/.test(d))return '+'+d;return '';};
  // universities from the university finder, for the search list
  if(typeof UNIS!=='undefined'){const dl=$('ap-unis');UNIS.forEach(u=>{const o=document.createElement('option');o.value=u[0];o.label=u[1];dl.appendChild(o);});}
  // the next six intakes (main September, January and February/March starts)
  const y=new Date().getFullYear(), inS=$('ap-in');
  [[y,'September'],[y+1,'January'],[y+1,'February / March'],[y+1,'September'],[y+2,'January'],[y+2,'September']].forEach(([yy,m])=>inS.add(new Option(m+' '+yy)));
  inS.add(new Option('Not sure yet'));
  const steps=[...f.querySelectorAll('.astep')], marks=[...f.querySelectorAll('.stepper li')];
  let cur=0;
  const show=i=>{cur=i;steps.forEach((s,k)=>s.hidden=k!==i);marks.forEach((m,k)=>{m.toggleAttribute('aria-current',k===i);if(k===i)m.setAttribute('aria-current','step');m.classList.toggle('done',k<i);});
    $('ap-back').hidden=i===0;$('ap-next').hidden=i===steps.length-1;$('ap-submit').hidden=i!==steps.length-1;};
  const err=$('ap-err');
  const bad=(el,msg)=>{el.setAttribute('aria-invalid','true');err.textContent=msg;err.className='nfmsg err';el.focus();return false;};
  const check=i=>{
    f.querySelectorAll('[aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));err.textContent='';err.className='nfmsg';
    if(i===0){
      if(!$('ap-fn').value.trim())return bad($('ap-fn'),'Please enter your first name.');
      if(!$('ap-ln').value.trim())return bad($('ap-ln'),'Please enter your last name.');
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($('ap-e').value.trim()))return bad($('ap-e'),'Please enter a valid email address. We send your application number there.');
      if(!bdMobile($('ap-p').value))return bad($('ap-p'),'Please enter a Bangladesh mobile number, for example 01712345678.');
    }
    if(i===1&&!$('ap-hq').value)return bad($('ap-hq'),'Please choose your highest qualification.');
    if(i===2){
      if(!$('ap-d').value)return bad($('ap-d'),'Please choose a destination.');
      if(!$('ap-l').value)return bad($('ap-l'),'Please choose a study level.');
      if(!inS.value)return bad(inS,'Please choose an intake.');
    }
    if(i===3){
      for(const inp of f.querySelectorAll('input[type=file]')){const fl=inp.files[0];if(!fl)continue;
        if(fl.size>5*1048576)return bad(inp,`"${fl.name}" is larger than 5 MB. Please choose a smaller file.`);
        if(!/\.(pdf|jpe?g|png)$/i.test(fl.name))return bad(inp,`"${fl.name}" is not a PDF, JPG or PNG file.`);}
      if(!$('ap-ok').checked)return bad($('ap-ok'),'Please tick the box to confirm your details.');
    }
    return true;
  };
  $('ap-next').addEventListener('click',()=>{if(check(cur)){show(cur+1);f.scrollIntoView({block:'start',behavior:'smooth'});steps[cur].querySelector('input,select')?.focus({preventScroll:true});}});
  $('ap-back').addEventListener('click',()=>show(cur-1));
  show(0);
  f.addEventListener('submit',e=>{
    e.preventDefault();
    for(let i=0;i<steps.length;i++){if(!check(i)){show(i);check(i);return;}}
    const out=$('ap-out'),btn=$('ap-submit');
    const name=$('ap-fn').value.trim();
    const track=()=>{try{window.IEtrack&&IEtrack('lead',{content_name:'Online application',content_category:$('ap-d').value,destination:$('ap-d').value,study_level:$('ap-l').value,_user:{email:$('ap-e').value.trim(),phone:bdMobile($('ap-p').value).replace('+',''),fn:name}})}catch(x){}};
    if(!EP){
      const msg=`Online application\nName: ${name} ${$('ap-ln').value.trim()}\nMobile: ${bdMobile($('ap-p').value)}\nEmail: ${$('ap-e').value.trim()}\nQualification: ${$('ap-hq').value} ${$('ap-res').value}\nEnglish: ${$('ap-et').value||'-'} ${$('ap-es').value}\nDestination: ${$('ap-d').value}\nLevel: ${$('ap-l').value}\nSubject: ${$('ap-sub').value||'-'}\nIntake: ${inS.value}\nUniversities: ${[$('ap-u1').value,$('ap-u2').value,$('ap-u3').value].filter(Boolean).join('; ')||'-'}`;
      track();
      out.innerHTML=`<div class="ok">Online applications open when our website is fully live. For now, send your details on WhatsApp and we'll start your application. We'll ask for your documents there.<pre style="white-space:pre-wrap;font:500 .85rem var(--body);margin:10px 0">${esc(msg)}</pre><a class="btn btn-sun soc-wa" href="https://wa.me/8801913179498?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Send on WhatsApp</a></div>`;
      return;
    }
    const fd=new FormData(f);
    fd.set('mobile',bdMobile($('ap-p').value));
    fd.delete('documents[]');
    f.querySelectorAll('input[type=file]').forEach(inp=>{if(inp.files[0]){fd.append('documents[]',inp.files[0]);fd.append('doc_types[]',inp.dataset.type);}});
    fd.set('source',window.IEsrc?IEsrc():'');
    btn.disabled=true;btn.textContent='Sending…';
    fetch(EP,{method:'POST',body:fd,credentials:'omit'}).then(r=>r.json().then(j=>({ok:r.ok&&j&&j.ok,j,status:r.status}))).then(({ok,j,status})=>{
      if(!ok){
        if(status===429){err.textContent='Too many applications from this connection. Please try again later or contact us on WhatsApp.';err.className='nfmsg err';return;}
        if(j&&j.error==='field'){err.textContent='Please check your details: one of the required fields is missing or not valid.';err.className='nfmsg err';return;}
        throw 0;
      }
      track();
      const de=(j.document_errors||[]).map(x=>esc(x.file)).join(', ');
      steps.forEach(s=>s.hidden=true);f.querySelector('.stepnav').hidden=true;f.querySelector('.stepper').hidden=true;
      out.innerHTML=`<div class="ok"><b>Thank you, ${esc(name)}! Your application has been received.</b><p style="margin:8px 0">Your application number is</p><p class="refbig">${esc(j.ref)}</p><p style="margin:8px 0">${j.emailed?'We have also emailed it to you.':'Please write it down or take a screenshot.'} Use it with your mobile number to sign in to the <a href="portal.html">student portal</a>. A counsellor will contact you, usually within one working day.</p>${de?`<p style="margin:8px 0">These files could not be uploaded: ${de}. You can upload them in the student portal (PDF, JPG or PNG, up to 5 MB).</p>`:''}</div>`;
      try{sessionStorage.setItem('ie-ref',j.ref)}catch(x){}
    }).catch(()=>{err.textContent='Sorry, we could not send your application. Please try again, or contact us on WhatsApp: +8801913179498.';err.className='nfmsg err';})
      .finally(()=>{btn.disabled=false;btn.textContent='Submit application';});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

try{(function(){
  /* --- Student portal -> portal.php --- */
  const lf=document.getElementById('portal-login'); if(!lf)return;
  const M=(typeof IE_MARKETING!=='undefined')?IE_MARKETING:{};
  const EP=M.PORTAL_ENDPOINT||'', $=id=>document.getElementById(id);
  const bdMobile=v=>{const d=String(v).replace(/\D/g,'');if(/^01[3-9]\d{8}$/.test(d))return '+88'+d;if(/^8801[3-9]\d{8}$/.test(d))return '+'+d;return '';};
  const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;};
  const MAIN=['Received','Under review','Applied to university','Offer received','Visa in progress','Visa approved','Enrolled'];
  let cred=null;
  try{const r=sessionStorage.getItem('ie-ref');if(r)$('pl-ref').value=r;}catch(x){}
  if(!EP){const p=el('p','note','The student portal opens when our website is fully live. Until then, your counsellor will update you by phone, WhatsApp or email.');lf.insertBefore(p,$('pl-err'));}
  const render=a=>{
    $('pd-ref').textContent=a.ref;$('pd-hello').textContent='Hello, '+(a.first_name||'there');
    $('pd-status').textContent=a.status;$('pd-status-text').textContent=a.status_text;
    const tr=$('pd-track');tr.replaceChildren();
    const at=MAIN.indexOf(a.status);
    MAIN.forEach((s,i)=>{const li=el('li',i<at?'done':(i===at?'now':''),s);if(i===at)li.setAttribute('aria-current','step');tr.appendChild(li);});
    tr.hidden=at<0;
    const pl=$('pd-plan');pl.replaceChildren();
    [['Destination',a.plan.destination],['Level',a.plan.level],['Subject',a.plan.subject],['Intake',a.plan.intake],['Universities',(a.plan.universities||[]).join('; ')],['Submitted',a.submitted],['Last update',a.updated]]
      .forEach(([k,v])=>{if(!v)return;pl.appendChild(el('dt','',k));pl.appendChild(el('dd','',v));});
    $('pd-couns').textContent=a.counsellor?('Your counsellor: '+a.counsellor):'';
    const ms=$('pd-msgs');ms.replaceChildren();
    if(!a.messages.length)ms.appendChild(el('p','mini','No messages yet.'));
    a.messages.slice().reverse().forEach(m=>{const d=el('div','pmsg'+(m.text.startsWith('You wrote: ')?' mine':''));d.appendChild(el('span','mini',m.at));d.appendChild(el('p','',m.text.replace(/^You wrote: /,'')));ms.appendChild(d);});
    const dl=$('pd-docs');dl.replaceChildren();
    if(!a.documents.length)dl.appendChild(el('li','mini','No documents yet.'));
    a.documents.forEach(d=>{const li=el('li');li.appendChild(el('b','',d.type));li.appendChild(document.createTextNode(' · '+d.name+' '));li.appendChild(el('span','mini','('+d.uploaded+')'));dl.appendChild(li);});
    const ts=$('pd-dtype');if(!ts.options.length)(a.doc_types||[]).forEach(t=>ts.add(new Option(t)));
    lf.hidden=true;$('portal-dash').hidden=false;
  };
  const call=(body,isForm)=>fetch(EP,{method:'POST',body:isForm?body:JSON.stringify(body),headers:isForm?{}:{'Content-Type':'text/plain'},credentials:'omit'})
    .then(r=>r.json().then(j=>({status:r.status,j})));
  const errText={login:'We could not find an application with that number and mobile number. Please check both.',rate:'Too many attempts. Please wait an hour, or contact us on WhatsApp.',
    too_large:'That file is larger than 5 MB.',file_type:'Please upload a PDF, JPG or PNG file.',too_many:'You have reached the upload limit. Please send further documents to your counsellor.',
    no_file:'Please choose a file.',empty:'Please write a message.',upload_failed:'The upload did not work. Please try again.'};
  lf.addEventListener('submit',e=>{
    e.preventDefault();const err=$('pl-err');
    const ref=$('pl-ref').value.trim().toUpperCase(),mob=bdMobile($('pl-mob').value);
    if(!/^IE-\d{4}-[2-9A-HJ-NP-Z]{8}$/.test(ref)){err.textContent='Please enter your application number, for example IE-2611-K7PQ4M9X.';err.className='nfmsg err';$('pl-ref').focus();return;}
    if(!mob){err.textContent='Please enter the Bangladesh mobile number you applied with.';err.className='nfmsg err';$('pl-mob').focus();return;}
    if(!EP){err.textContent='The student portal is not open yet. Please contact your counsellor for an update.';err.className='nfmsg err';return;}
    const btn=lf.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Signing in…';err.textContent='';err.className='nfmsg';
    call({action:'status',ref,mobile:mob}).then(({j})=>{
      if(j&&j.ok){cred={ref,mobile:mob};render(j.app);try{sessionStorage.setItem('ie-ref',ref)}catch(x){}$('pd-hello').focus&&$('portal-dash').scrollIntoView({block:'start'});return;}
      err.textContent=errText[j&&j.error]||'Sorry, something went wrong. Please try again.';err.className='nfmsg err';
    }).catch(()=>{err.textContent='Sorry, we could not connect. Please try again.';err.className='nfmsg err';})
      .finally(()=>{btn.disabled=false;btn.textContent='Sign in';});
  });
  $('pd-out').addEventListener('click',()=>{cred=null;$('portal-dash').hidden=true;lf.hidden=false;$('pl-mob').value='';$('pl-ref').focus();});
  $('pd-msgf').addEventListener('submit',e=>{
    e.preventDefault();const t=$('pd-msg').value.trim(),err=$('pd-msg-err');
    if(!t){err.textContent=errText.empty;err.className='nfmsg err';return;}
    call({action:'message',ref:cred.ref,mobile:cred.mobile,text:t}).then(({j})=>{
      if(j&&j.ok){render(j.app);$('pd-msg').value='';err.textContent='Sent. Your counsellor will reply here or contact you.';err.className='nfmsg';return;}
      err.textContent=errText[j&&j.error]||'Sorry, the message was not sent.';err.className='nfmsg err';}).catch(()=>{err.textContent='Sorry, the message was not sent.';err.className='nfmsg err';});
  });
  $('pd-upf').addEventListener('submit',e=>{
    e.preventDefault();const err=$('pd-up-err'),fl=$('pd-file').files[0];
    if(!fl){err.textContent=errText.no_file;err.className='nfmsg err';return;}
    if(fl.size>5*1048576){err.textContent=errText.too_large;err.className='nfmsg err';return;}
    const fd=new FormData();fd.append('action','upload');fd.append('ref',cred.ref);fd.append('mobile',cred.mobile);fd.append('doc_type',$('pd-dtype').value);fd.append('document',fl);
    const btn=$('pd-upf').querySelector('button');btn.disabled=true;btn.textContent='Uploading…';
    call(fd,true).then(({j})=>{
      if(j&&j.ok){render(j.app);$('pd-file').value='';err.textContent='Uploaded. Your counsellor has been told.';err.className='nfmsg';return;}
      err.textContent=errText[j&&j.error]||'The upload did not work.';err.className='nfmsg err';}).catch(()=>{err.textContent=errText.upload_failed;err.className='nfmsg err';})
      .finally(()=>{btn.disabled=false;btn.textContent='Upload';});
  });
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}

document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('[data-openchat]');if(!a)return;var o=document.getElementById('chatopen'),p=document.getElementById('chatpanel');if(!o||!p)return;e.preventDefault();if(p.hidden)o.click();var t=document.getElementById('tab-chat');if(t)t.click();});

try{(function(){
  const box=document.getElementById('ev-list'), data=document.getElementById('events-data');
  if(!box||!data)return;
  let all=[];try{all=JSON.parse(data.textContent||'[]')}catch(e){all=[]}
  const TN={expo:'Study abroad expo',spot:'Spot admission day',info:'Information session',ielts:'IELTS workshop',webinar:'Online webinar'};
  const today=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Dhaka'}));today.setHours(0,0,0,0);
  const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
  const up=all.filter(e=>{const d=new Date(String(e.date)+'T00:00:00');return !isNaN(d)&&d>=today}).sort((x,y)=>String(x.date).localeCompare(String(y.date)));
  const $=id=>document.getElementById(id), empty=$('ev-empty'), count=$('ev-count');
  function draw(){
    const t=$('ev-type').value,f=$('ev-format').value,d=$('ev-dest').value;
    const list=up.filter(e=>(!t||e.type===t)&&(!f||e.format===f)&&(!d||(e.destinations||[]).includes(d)));
    box.innerHTML=list.map(e=>{const dt=new Date(String(e.date)+'T00:00:00');
      const reg=e.register?`<a class="btn btn-sun" href="${esc(e.register)}" target="_blank" rel="noopener">Register</a>`:`<a class="btn btn-sun evreg" href="events.html#ev-alerts" data-ev="${esc(e.title)}" data-type="${esc(e.type||'')}">Register</a>`;
      return `<article class="card evcard"><div class="evdate"><span>${dt.toLocaleDateString('en-GB',{month:'short'})}</span><b>${dt.getDate()}</b><span>${dt.toLocaleDateString('en-GB',{weekday:'short'})}</span></div><div>
        <span class="evchip ev-${esc(e.type)}">${esc(TN[e.type]||'Event')}</span><h4>${esc(e.title)}</h4>
        <ul class="evmeta"><li>${esc(dt.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}))}${e.time?' · '+esc(e.time):''}</li>
        <li>${esc(e.format||'')}${e.venue?' · '+esc(e.venue):''}${e.city?', '+esc(e.city):''}</li>
        ${(e.destinations||[]).length?`<li>Destinations: ${esc(e.destinations.join(', '))}</li>`:''}${e.free===true?'<li>Free to attend</li>':''}</ul>
        ${e.description?`<p style="margin:8px 0 0">${esc(e.description)}</p>`:''}${reg}</div></article>`}).join('');
    empty.style.display=list.length?'none':'';
    count.textContent=up.length?(list.length?`${list.length} upcoming event${list.length>1?'s':''}`:'No events match these filters. Try another option.'):'';
  }
  ['ev-type','ev-format','ev-dest'].forEach(id=>$(id).addEventListener('change',draw));
  box.addEventListener('click',e=>{const a=e.target.closest('.evreg');if(!a)return;
    const t=$('ev-t'),k=a.dataset.type,o=k&&$('ev-type').querySelector('option[value="'+k+'"]');
    if(t&&o)t.value=o.textContent;
    window.__evTitle=a.dataset.ev;const note=$('ev-err');if(note){note.textContent='Registering for: '+a.dataset.ev;note.className='nfmsg';}});
  document.querySelectorAll('.evalert').forEach(a=>a.addEventListener('click',()=>{const o=$('ev-type').querySelector('option[value="'+a.dataset.type+'"]');if(o)$('ev-t').value=o.textContent;window.__evTitle='';}));
  draw();
})();}catch(e){if(window.IE_DEBUG)console.warn(e)}
