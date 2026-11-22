const SB_URL="YOUR_SUPABASE_URL",SB_KEY="YOUR_SUPABASE_ANON_KEY",WA="213561068485",MAIL="webwisee.official@gmail.com";
const PG=[["index","Home"],["services","Services"],["work","Work"],["pricing","Pricing"],["contact","Contact"]];
const slug=(location.pathname.split("/").pop()||"index").replace(".html","")||"index";
document.getElementById("hdr").innerHTML=`<header class="nav"><a class="logo" href="/">Webwise<i>.</i></a><nav id="nv">${PG.map(([h,t])=>`<a href="${h==="index"?"/":h}"${h===slug?' class="on"':""}>${t}</a>`).join("")}</nav><a class="btn sm" href="#lead">Get a free quote</a><button id="mb" aria-label="Menu">☰</button></header>`;
document.getElementById("mb").onclick=()=>document.getElementById("nv").classList.toggle("open");
const L=document.createElement("section");L.id="lead";L.className="lead";
L.innerHTML=`<div class="wrap"><div><h2>Tell us about your business.</h2><p>Leave your details and we’ll message you on WhatsApp within a few hours with a free quote. No commitment.</p><p class="ct" style="margin-top:22px"><a href="https://wa.me/${WA}">WhatsApp: +213 561 06 84 85</a><br><a href="mailto:${MAIL}">${MAIL}</a></p></div>
<form id="f" novalidate><label>Your name<input name="name" autocomplete="name" required></label><label>WhatsApp number (with country code)<input name="whatsapp" type="tel" placeholder="+1 555 123 4567" autocomplete="tel" required></label><label>Email<input name="email" type="email" autocomplete="email" required></label><label>Your business and what you need<textarea name="business" rows="3" placeholder="Example: Dental clinic in Austin, I need a new website with online booking." required></textarea></label><input class="hp" name="website" tabindex="-1" autocomplete="off"><button class="btn sun" type="submit">Send my request</button><p class="msg" id="m" role="alert"></p></form></div>`;
document.querySelector("main").after(L);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap"><span>© ${new Date().getFullYear()} Webwise. Websites for small businesses.</span><span><a href="https://wa.me/${WA}">WhatsApp</a> &nbsp; <a href="mailto:${MAIL}">${MAIL}</a></span></div></footer>`);
const f=document.getElementById("f"),m=document.getElementById("m");
f.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(d.website)return;
if(!d.name.trim()||!d.business.trim()||!/^\+?[\d\s()-]{7,}$/.test(d.whatsapp)||!/^\S+@\S+\.\S+$/.test(d.email)){m.textContent="Please fill in every field with valid details.";return}
const b=f.querySelector("button");b.disabled=true;b.textContent="Sending…";m.textContent="";
try{const r=await fetch(SB_URL+"/rest/v1/leads",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({name:d.name.trim(),whatsapp:d.whatsapp.trim(),email:d.email.trim(),business:d.business.trim(),page:slug})});
if(!r.ok)throw 0;f.innerHTML='<div class="ok"><h3></h3><p>We received your request and will message you on WhatsApp soon.</p></div>';f.querySelector("h3").textContent="Thank you, "+d.name.trim().split(" ")[0]+"!"}
catch{m.innerHTML='Message not sent. Please <a href="https://wa.me/'+WA+'?text='+encodeURIComponent("Hi Webwise, I’m "+d.name+". "+d.business)+'">message us on WhatsApp</a> instead.';b.disabled=false;b.textContent="Send my request"}};
