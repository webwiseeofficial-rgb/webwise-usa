var SB_URL="YOUR_SUPABASE_URL",SB_KEY="YOUR_SUPABASE_ANON_KEY",NUM="213561068485",MAIL="webwisee.official@gmail.com";
var PG=[["/","Home"],["services","Services"],["pricing","Pricing"],["how-it-works","How it works"],["contact","Contact"]];
var slug=(location.pathname.split("/").pop()||"index").replace(".html","")||"index";
function wa(t){return"https://wa.me/"+NUM+"?text="+encodeURIComponent(t)}
document.getElementById("hdr").innerHTML='<header><div class="wrap"><a class="logo" href="/">Web<span>Wise</span></a><button id="mb" aria-label="Menu">☰</button><nav id="nv">'+PG.map(function(p){var s=p[0]==="/"?"index":p[0];return'<a href="'+p[0]+'"'+(s===slug?' class="on"':"")+">"+p[1]+"</a>"}).join("")+'<a class="btn" href="#book">Book a project</a></nav></div></header>';
document.getElementById("mb").onclick=function(){document.getElementById("nv").classList.toggle("open")};
var B=document.createElement("section");B.id="book";
B.innerHTML='<div class="wrap book"><div><h2>Book your website</h2><p class="sub">Tell us a little about your project and we’ll message you on WhatsApp with next steps.</p><a class="btn wa" href="#" target="_blank" rel="noopener">Or message us directly</a></div><form id="f" novalidate><div class="two"><label>Your name<input id="name" autocomplete="name" required></label><label>Email<input id="email" type="email" autocomplete="email" required></label></div><div class="two"><label>WhatsApp number<input id="phone" type="tel" placeholder="+1 555 123 4567" autocomplete="tel" required></label><label>Business name<input id="biz" autocomplete="organization" required></label></div><label>Package<select id="plan"><option>One-Page Website ($125)</option><option>5-Page Website ($325)</option><option>Something custom</option></select></label><label>Tell us about your project<textarea id="msg" placeholder="What does your business do? Do you have a logo or an existing site?"></textarea></label><input id="hp" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px"><p class="err" id="err" role="alert"></p><button class="btn" type="submit">Send my request</button><p class="fine">We never share your details.</p></form></div>';
document.querySelector("main").after(B);
document.body.insertAdjacentHTML("beforeend",'<footer><div class="wrap"><p><strong>WebWise</strong>: websites that work as hard as you do.</p><p class="links"><a class="wa" href="#" target="_blank" rel="noopener">WhatsApp +213 561 068 485</a><a href="mailto:'+MAIL+'">'+MAIL+'</a></p><p class="fine" style="margin-top:14px">© '+new Date().getFullYear()+' WebWise. All rights reserved.</p></div></footer><a class="float wa" href="#" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">Chat on WhatsApp</a>');
var EVENT_NAME="Purchase";
function track(v,l){try{if(window.fbq)fbq("track",EVENT_NAME,{value:v,currency:"USD",content_name:l})}catch(e){}}
document.querySelectorAll(".wa").forEach(function(a){a.href=wa("Hi WebWise! I’d like to talk about getting a website.");a.addEventListener("click",function(){track(125,"WhatsApp click")})});
document.querySelectorAll("[data-plan]").forEach(function(a){a.addEventListener("click",function(){document.getElementById("plan").value=a.dataset.plan})});
var f=document.getElementById("f"),err=document.getElementById("err");
f.addEventListener("submit",function(e){e.preventDefault();
var v=function(i){return document.getElementById(i).value.trim()};if(v("hp"))return;
if(!v("name")||!v("biz")||!/^\+?[\d\s()-]{7,}$/.test(v("phone"))||!/^\S+@\S+\.\S+$/.test(v("email"))){err.textContent="Please enter your name, WhatsApp number, email, and business name.";return}
err.textContent="";var btn=f.querySelector("button");btn.disabled=true;btn.textContent="Sending…";
track(v("plan").indexOf("$325")>-1?325:125,"Form: "+v("plan"));
var d={name:v("name"),whatsapp:v("phone"),email:v("email"),business:v("biz"),plan:v("plan"),message:v("msg"),page:slug};
fetch(SB_URL+"/rest/v1/leads",{method:"POST",headers:{apikey:SB_KEY,Authorization:"Bearer "+SB_KEY,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(d)}).then(function(r){
if(!r.ok)throw 0;f.innerHTML='<div class="ok"><h3></h3><p>We received your request and will message you on WhatsApp soon.</p></div>';f.querySelector("h3").textContent="Thank you, "+d.name.split(" ")[0]+"!"}).catch(function(){
err.innerHTML='Your request could not be sent. <a href="'+wa("Hi WebWise! I’d like to book a website.\nName: "+d.name+"\nEmail: "+d.email+"\nBusiness: "+d.business+"\nPackage: "+d.plan+"\nDetails: "+(d.message||"-"))+'" target="_blank" rel="noopener">Send it on WhatsApp instead</a>.';btn.disabled=false;btn.textContent="Send my request"})});
