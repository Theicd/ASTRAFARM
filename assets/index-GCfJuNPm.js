(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lh="186",C0=0,Au=1,P0=2,Xr=1,L0=2,Hr=3,ki=0,xn=1,Sn=2,fi=0,$r=1,Ra=2,Ru=3,Cu=4,D0=5,ir=100,I0=101,N0=102,k0=103,U0=104,F0=200,O0=201,B0=202,z0=203,Uf=204,Ff=205,H0=206,G0=207,V0=208,W0=209,q0=210,X0=211,$0=212,Y0=213,K0=214,Lc=0,Dc=1,Ic=2,Kr=3,Nc=4,kc=5,Uc=6,Fc=7,Of=0,Z0=1,J0=2,Jn=0,Dh=1,Ih=2,Nh=3,Ya=4,kh=5,Uh=6,Fh=7,Bf=300,ws=301,ur=302,hl=303,ul=304,Ka=306,Zr=1e3,Ti=1001,Oc=1002,he=1003,Q0=1004,xo=1005,Ke=1006,dl=1007,_s=1008,wn=1009,zf=1010,Hf=1011,Jr=1012,Oh=1013,pi=1014,ui=1015,vn=1016,Bh=1017,zh=1018,Qr=1020,Gf=35902,Vf=35899,Wf=1021,qf=1022,Zn=1023,Ui=1026,bs=1027,Xf=1028,Hh=1029,Es=1030,Gh=1031,Vh=1033,ma=33776,ga=33777,xa=33778,va=33779,Bc=35840,zc=35841,Hc=35842,Gc=35843,Vc=36196,Wc=37492,qc=37496,Xc=37488,$c=37489,Ca=37490,Yc=37491,Kc=37808,Zc=37809,Jc=37810,Qc=37811,jc=37812,th=37813,eh=37814,nh=37815,ih=37816,sh=37817,rh=37818,oh=37819,ah=37820,lh=37821,ch=36492,hh=36494,uh=36495,dh=36283,fh=36284,Pa=36285,ph=36286,j0=3200,Pu=0,tm=1,Ji="",Ve="srgb",La="srgb-linear",Da="linear",me="srgb",fl=7680,em=519,nm=512,im=513,sm=514,Wh=515,rm=516,om=517,qh=518,am=519,$f=35044,vo=35048,Lu="300 es",di=2e3,jr=2001;function lm(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ia(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function cm(){const i=Ia("canvas");return i.style.display="block",i}const Du={};function Na(...i){const t="THREE."+i.shift();console.log(t,...i)}function Yf(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ht(...i){i=Yf(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function se(...i){i=Yf(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function or(...i){const t=i.join(" ");t in Du||(Du[t]=!0,Ht(...i))}function hm(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const um={[Lc]:Dc,[Ic]:Uc,[Nc]:Fc,[Kr]:kc,[Dc]:Lc,[Uc]:Ic,[Fc]:Nc,[kc]:Kr};class Cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ya=Math.PI/180,mh=180/Math.PI;function ts(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]+"-"+rn[t&255]+rn[t>>8&255]+"-"+rn[t>>16&15|64]+rn[t>>24&255]+"-"+rn[e&63|128]+rn[e>>8&255]+"-"+rn[e>>16&255]+rn[e>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function te(i,t,e){return Math.max(t,Math.min(e,i))}function dm(i,t){return(i%t+t)%t}function pl(i,t,e){return(1-e)*i+e*t}function ci(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ft{static{Ft.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class gr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(d!==x||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-a;if(m<.9995){const y=Math.acos(m),T=Math.sin(y);p=Math.sin(p*y)/T,a=Math.sin(a*y)/T,l=l*p+u*a,c=c*p+f*a,h=h*p+g*a,d=d*p+x*a}else{l=l*p+u*a,c=c*p+f*a,h=h*p+g*a,d=d*p+x*a;const y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Ht("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{static{U.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Iu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Iu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ml.copy(this).projectOnVector(t),this.sub(ml)}reflect(t){return this.sub(ml.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ml=new U,Iu=new gr;class Vt{static{Vt.prototype.isMatrix3=!0}constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],y=s[1],T=s[4],_=s[7],E=s[2],w=s[5],P=s[8];return r[0]=o*x+a*y+l*E,r[3]=o*m+a*T+l*w,r[6]=o*p+a*_+l*P,r[1]=c*x+h*y+d*E,r[4]=c*m+h*T+d*w,r[7]=c*p+h*_+d*P,r[2]=u*x+f*y+g*E,r[5]=u*m+f*T+g*w,r[8]=u*p+f*_+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=u*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return or("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(gl.makeScale(t,e)),this}rotate(t){return or("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(gl.makeRotation(-t)),this}translate(t,e){return or("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(gl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const gl=new Vt,Nu=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ku=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fm(){const i={enabled:!0,workingColorSpace:La,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===me&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===me&&(s.r=ar(s.r),s.g=ar(s.g),s.b=ar(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ji?Da:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return or("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return or("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[La]:{primaries:t,whitePoint:n,transfer:Da,toXYZ:Nu,fromXYZ:ku,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:t,whitePoint:n,transfer:me,toXYZ:Nu,fromXYZ:ku,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}}),i}const jt=fm();function Di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ar(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Ns;class pm{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ns===void 0&&(Ns=Ia("canvas")),Ns.width=t.width,Ns.height=t.height;const s=Ns.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Ns}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ia("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Di(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Di(e[n]/255)*255):e[n]=Di(e[n]);return{data:e,width:t.width,height:t.height}}else return Ht("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let mm=0;class Xh{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mm++}),this.uuid=ts(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(xl(s[o].image)):r.push(xl(s[o]))}else r=xl(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function xl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ht("Texture: Unable to serialize Texture."),{})}let gm=0;const vl=new U;class un extends Cs{constructor(t=un.DEFAULT_IMAGE,e=un.DEFAULT_MAPPING,n=Ti,s=Ti,r=Ke,o=_s,a=Zn,l=wn,c=un.DEFAULT_ANISOTROPY,h=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=ts(),this.name="",this.source=new Xh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vl).x}get height(){return this.source.getSize(vl).y}get depth(){return this.source.getSize(vl).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ht(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ht(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zr:t.x=t.x-Math.floor(t.x);break;case Ti:t.x=t.x<0?0:1;break;case Oc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zr:t.y=t.y-Math.floor(t.y);break;case Ti:t.y=t.y<0?0:1;break;case Oc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=Bf;un.DEFAULT_ANISOTROPY=1;class Fe{static{Fe.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,_=(f+1)/2,E=(p+1)/2,w=(h+u)/4,P=(d+x)/4,v=(g+m)/4;return T>_&&T>E?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=w/n,r=P/n):_>E?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=v/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=P/r,s=v/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-x)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xm extends Cs{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Fe(0,0,t,e),this.scissorTest=!1,this.viewport=new Fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:n.depth},r=new un(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Ke,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Xh(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends xm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Kf extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=he,this.minFilter=he,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vm extends un{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=he,this.minFilter=he,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class Ce{static{Ce.prototype.isMatrix4=!0}constructor(t,e,n,s,r,o,a,l,c,h,d,u,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,x,m)}set(t,e,n,s,r,o,a,l,c,h,d,u,f,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/ks.setFromMatrixColumn(t,0).length(),r=1/ks.setFromMatrixColumn(t,1).length(),o=1/ks.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-x*c,e[9]=-a*l,e[2]=x-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+u*a,e[10]=o*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u-x*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){const u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ym,t,_m)}lookAt(t,e,n){const s=this.elements;return Rn.subVectors(t,e),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Hi.crossVectors(n,Rn),Hi.lengthSq()===0&&(Math.abs(n.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Hi.crossVectors(n,Rn)),Hi.normalize(),yo.crossVectors(Rn,Hi),s[0]=Hi.x,s[4]=yo.x,s[8]=Rn.x,s[1]=Hi.y,s[5]=yo.y,s[9]=Rn.y,s[2]=Hi.z,s[6]=yo.z,s[10]=Rn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],y=n[3],T=n[7],_=n[11],E=n[15],w=s[0],P=s[4],v=s[8],R=s[12],N=s[1],F=s[5],B=s[9],S=s[13],M=s[2],C=s[6],I=s[10],D=s[14],q=s[3],O=s[7],z=s[11],$=s[15];return r[0]=o*w+a*N+l*M+c*q,r[4]=o*P+a*F+l*C+c*O,r[8]=o*v+a*B+l*I+c*z,r[12]=o*R+a*S+l*D+c*$,r[1]=h*w+d*N+u*M+f*q,r[5]=h*P+d*F+u*C+f*O,r[9]=h*v+d*B+u*I+f*z,r[13]=h*R+d*S+u*D+f*$,r[2]=g*w+x*N+m*M+p*q,r[6]=g*P+x*F+m*C+p*O,r[10]=g*v+x*B+m*I+p*z,r[14]=g*R+x*S+m*D+p*$,r[3]=y*w+T*N+_*M+E*q,r[7]=y*P+T*F+_*C+E*O,r[11]=y*v+T*B+_*I+E*z,r[15]=y*R+T*S+_*D+E*$,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],y=l*f-c*u,T=a*f-c*d,_=a*u-l*d,E=o*f-c*h,w=o*u-l*h,P=o*d-a*h;return e*(x*y-m*T+p*_)-n*(g*y-m*E+p*w)+s*(g*T-x*E+p*P)-r*(g*_-x*w+m*P)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=e*a-n*o,T=e*l-s*o,_=e*c-r*o,E=n*l-s*a,w=n*c-r*a,P=s*c-r*l,v=h*x-d*g,R=h*m-u*g,N=h*p-f*g,F=d*m-u*x,B=d*p-f*x,S=u*p-f*m,M=y*S-T*B+_*F+E*N-w*R+P*v;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/M;return t[0]=(a*S-l*B+c*F)*C,t[1]=(s*B-n*S-r*F)*C,t[2]=(x*P-m*w+p*E)*C,t[3]=(u*w-d*P-f*E)*C,t[4]=(l*N-o*S-c*R)*C,t[5]=(e*S-s*N+r*R)*C,t[6]=(m*_-g*P-p*T)*C,t[7]=(h*P-u*_+f*T)*C,t[8]=(o*B-a*N+c*v)*C,t[9]=(n*N-e*B-r*v)*C,t[10]=(g*w-x*_+p*y)*C,t[11]=(d*_-h*w-f*y)*C,t[12]=(a*R-o*F-l*v)*C,t[13]=(e*F-n*R+s*v)*C,t[14]=(x*T-g*E-m*y)*C,t[15]=(h*E-d*T+u*y)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,x=o*h,m=o*d,p=a*d,y=l*c,T=l*h,_=l*d,E=n.x,w=n.y,P=n.z;return s[0]=(1-(x+p))*E,s[1]=(f+_)*E,s[2]=(g-T)*E,s[3]=0,s[4]=(f-_)*w,s[5]=(1-(u+p))*w,s[6]=(m+y)*w,s[7]=0,s[8]=(g+T)*P,s[9]=(m-y)*P,s[10]=(1-(u+x))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=ks.set(s[0],s[1],s[2]).length();const a=ks.set(s[4],s[5],s[6]).length(),l=ks.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Hn.copy(this);const c=1/o,h=1/a,d=1/l;return Hn.elements[0]*=c,Hn.elements[1]*=c,Hn.elements[2]*=c,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=d,Hn.elements[9]*=d,Hn.elements[10]*=d,e.setFromRotationMatrix(Hn),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=di,l=!1){const c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===di)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===jr)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=di,l=!1){const c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===di)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===jr)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ks=new U,Hn=new Ce,ym=new U(0,0,0),_m=new U(1,1,1),Hi=new U,yo=new U,Rn=new U,Uu=new Ce,Fu=new gr;class Ts{constructor(t=0,e=0,n=0,s=Ts.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-te(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ht("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Uu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Uu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fu.setFromEuler(this),this.setFromQuaternion(Fu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ts.DEFAULT_ORDER="XYZ";class Zf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bm=0;const Ou=new U,Us=new gr,gi=new Ce,_o=new U,br=new U,Mm=new U,Sm=new gr,Bu=new U(1,0,0),zu=new U(0,1,0),Hu=new U(0,0,1),Gu={type:"added"},wm={type:"removed"},Fs={type:"childadded",child:null},yl={type:"childremoved",child:null};class en extends Cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const t=new U,e=new Ts,n=new gr,s=new U(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ce},normalMatrix:{value:new Vt}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Us.setFromAxisAngle(t,e),this.quaternion.multiply(Us),this}rotateOnWorldAxis(t,e){return Us.setFromAxisAngle(t,e),this.quaternion.premultiply(Us),this}rotateX(t){return this.rotateOnAxis(Bu,t)}rotateY(t){return this.rotateOnAxis(zu,t)}rotateZ(t){return this.rotateOnAxis(Hu,t)}translateOnAxis(t,e){return Ou.copy(t).applyQuaternion(this.quaternion),this.position.add(Ou.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bu,t)}translateY(t){return this.translateOnAxis(zu,t)}translateZ(t){return this.translateOnAxis(Hu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?_o.copy(t):_o.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(br,_o,this.up):gi.lookAt(_o,br,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),Us.setFromRotationMatrix(gi),this.quaternion.premultiply(Us.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Gu),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null):se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wm),yl.child=t,this.dispatchEvent(yl),yl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Gu),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,t,Mm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(br,Sm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}en.DEFAULT_UP=new U(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ne extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Em={type:"move"};class _l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Em)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ne;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Jf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},bo={h:0,s:0,l:0};function bl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ot{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,jt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=jt.workingColorSpace){if(t=dm(t,1),e=te(e,0,1),n=te(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=bl(o,r,t+1/3),this.g=bl(o,r,t),this.b=bl(o,r,t-1/3)}return jt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&Ht("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ht("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Ht("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){const n=Jf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ht("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Di(t.r),this.g=Di(t.g),this.b=Di(t.b),this}copyLinearToSRGB(t){return this.r=ar(t.r),this.g=ar(t.g),this.b=ar(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return jt.workingToColorSpace(on.copy(this),t),Math.round(te(on.r*255,0,255))*65536+Math.round(te(on.g*255,0,255))*256+Math.round(te(on.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(on.copy(this),e);const n=on.r,s=on.g,r=on.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=Ve){jt.workingToColorSpace(on.copy(this),t);const e=on.r,n=on.g,s=on.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Gi),this.setHSL(Gi.h+t,Gi.s+e,Gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gi),t.getHSL(bo);const n=pl(Gi.h,bo.h,e),s=pl(Gi.s,bo.s,e),r=pl(Gi.l,bo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new Ot;Ot.NAMES=Jf;class Tm extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ts,this.environmentIntensity=1,this.environmentRotation=new Ts,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Gn=new U,xi=new U,Ml=new U,vi=new U,Os=new U,Bs=new U,Vu=new U,Sl=new U,wl=new U,El=new U,Tl=new Fe,Al=new Fe,Rl=new Fe;class Dn{constructor(t=new U,e=new U,n=new U){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Gn.subVectors(t,e),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Gn.subVectors(s,e),xi.subVectors(n,e),Ml.subVectors(t,e);const o=Gn.dot(Gn),a=Gn.dot(xi),l=Gn.dot(Ml),c=xi.dot(xi),h=xi.dot(Ml),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(o,vi.y),l.addScaledVector(a,vi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Tl.setScalar(0),Al.setScalar(0),Rl.setScalar(0),Tl.fromBufferAttribute(t,e),Al.fromBufferAttribute(t,n),Rl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Tl,r.x),o.addScaledVector(Al,r.y),o.addScaledVector(Rl,r.z),o}static isFrontFacing(t,e,n,s){return Gn.subVectors(n,e),xi.subVectors(t,e),Gn.cross(xi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Gn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),Gn.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Dn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Os.subVectors(s,n),Bs.subVectors(r,n),Sl.subVectors(t,n);const l=Os.dot(Sl),c=Bs.dot(Sl);if(l<=0&&c<=0)return e.copy(n);wl.subVectors(t,s);const h=Os.dot(wl),d=Bs.dot(wl);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Os,o);El.subVectors(t,r);const f=Os.dot(El),g=Bs.dot(El);if(g>=0&&f<=g)return e.copy(r);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Bs,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Vu.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(Vu,a);const p=1/(m+x+u);return o=x*p,a=u*p,e.copy(n).addScaledVector(Os,o).addScaledVector(Bs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class so{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mo.copy(n.boundingBox)),Mo.applyMatrix4(t.matrixWorld),this.union(Mo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Mr),So.subVectors(this.max,Mr),zs.subVectors(t.a,Mr),Hs.subVectors(t.b,Mr),Gs.subVectors(t.c,Mr),Vi.subVectors(Hs,zs),Wi.subVectors(Gs,Hs),hs.subVectors(zs,Gs);let e=[0,-Vi.z,Vi.y,0,-Wi.z,Wi.y,0,-hs.z,hs.y,Vi.z,0,-Vi.x,Wi.z,0,-Wi.x,hs.z,0,-hs.x,-Vi.y,Vi.x,0,-Wi.y,Wi.x,0,-hs.y,hs.x,0];return!Cl(e,zs,Hs,Gs,So)||(e=[1,0,0,0,1,0,0,0,1],!Cl(e,zs,Hs,Gs,So))?!1:(wo.crossVectors(Vi,Wi),e=[wo.x,wo.y,wo.z],Cl(e,zs,Hs,Gs,So))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const yi=[new U,new U,new U,new U,new U,new U,new U,new U],Vn=new U,Mo=new so,zs=new U,Hs=new U,Gs=new U,Vi=new U,Wi=new U,hs=new U,Mr=new U,So=new U,wo=new U,us=new U;function Cl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){us.fromArray(i,r);const a=s.x*Math.abs(us.x)+s.y*Math.abs(us.y)+s.z*Math.abs(us.z),l=t.dot(us),c=e.dot(us),h=n.dot(us);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Xe=new U,Eo=new Ft;let Am=0;class En extends Cs{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Am++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=$f,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Eo.fromBufferAttribute(this,e),Eo.applyMatrix3(t),this.setXY(e,Eo.x,Eo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix3(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ci(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ci(e,this.array)),e}setX(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ci(e,this.array)),e}setY(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ci(e,this.array)),e}setZ(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ci(e,this.array)),e}setW(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array),r=be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class $h extends En{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Yh extends En{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class re extends En{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Rm=new so,Sr=new U,Pl=new U;class ro{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Rm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Sr.subVectors(t,this.center);const e=Sr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Sr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Pl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Sr.copy(t.center).add(Pl)),this.expandByPoint(Sr.copy(t.center).sub(Pl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Cm=0;const Un=new Ce,Ll=new en,Vs=new U,Cn=new so,wr=new so,tn=new U;class ke extends Cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(lm(t)?Yh:$h)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Un.makeRotationFromQuaternion(t),this.applyMatrix4(Un),this}rotateX(t){return Un.makeRotationX(t),this.applyMatrix4(Un),this}rotateY(t){return Un.makeRotationY(t),this.applyMatrix4(Un),this}rotateZ(t){return Un.makeRotationZ(t),this.applyMatrix4(Un),this}translate(t,e,n){return Un.makeTranslation(t,e,n),this.applyMatrix4(Un),this}scale(t,e,n){return Un.makeScale(t,e,n),this.applyMatrix4(Un),this}lookAt(t){return Ll.lookAt(t),Ll.updateMatrix(),this.applyMatrix4(Ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new re(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ht("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new so);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Cn.setFromBufferAttribute(r),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ro);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];wr.setFromBufferAttribute(a),this.morphTargetsRelative?(tn.addVectors(Cn.min,wr.min),Cn.expandByPoint(tn),tn.addVectors(Cn.max,wr.max),Cn.expandByPoint(tn)):(Cn.expandByPoint(wr.min),Cn.expandByPoint(wr.max))}Cn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)tn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(tn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)tn.fromBufferAttribute(a,c),l&&(Vs.fromBufferAttribute(t,c),tn.add(Vs)),s=Math.max(s,n.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new En(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let v=0;v<n.count;v++)a[v]=new U,l[v]=new U;const c=new U,h=new U,d=new U,u=new Ft,f=new Ft,g=new Ft,x=new U,m=new U;function p(v,R,N){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,N),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,R),g.fromBufferAttribute(r,N),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const F=1/(f.x*g.y-g.x*f.y);isFinite(F)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(F),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(F),a[v].add(x),a[R].add(x),a[N].add(x),l[v].add(m),l[R].add(m),l[N].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let v=0,R=y.length;v<R;++v){const N=y[v],F=N.start,B=N.count;for(let S=F,M=F+B;S<M;S+=3)p(t.getX(S+0),t.getX(S+1),t.getX(S+2))}const T=new U,_=new U,E=new U,w=new U;function P(v){E.fromBufferAttribute(s,v),w.copy(E);const R=a[v];T.copy(R),T.sub(E.multiplyScalar(E.dot(R))).normalize(),_.crossVectors(w,R);const F=_.dot(l[v])<0?-1:1;o.setXYZW(v,T.x,T.y,T.z,F)}for(let v=0,R=y.length;v<R;++v){const N=y[v],F=N.start,B=N.count;for(let S=F,M=F+B;S<M;S+=3)P(t.getX(S+0)),P(t.getX(S+1)),P(t.getX(S+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new U,r=new U,o=new U,a=new U,l=new U,c=new U,h=new U,d=new U;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)tn.fromBufferAttribute(t,e),tn.normalize(),t.setXYZ(e,tn.x,tn.y,tn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new En(u,h,d)}if(this.index===null)return Ht("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ke,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=$f,this.updateRanges=[],this.version=0,this.uuid=ts()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ts()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ts()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const e={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return e.usage=this.usage,e}}const mn=new U;class ka{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.applyMatrix4(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.applyNormalMatrix(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)mn.fromBufferAttribute(this,e),mn.transformDirection(t),this.setXYZ(e,mn.x,mn.y,mn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ci(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=be(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=be(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ci(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ci(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ci(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ci(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=be(e,this.array),n=be(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array),r=be(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Na("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new En(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ka(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Na("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Dl=new U,Lm=new U,Dm=new Vt;class Ki{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Dl.subVectors(n,e).cross(Lm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Dl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Dm.getNormalMatrix(t),s=this.coplanarPoint(Dl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Im=0;class Ps extends Cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Im++}),this.uuid=ts(),this.name="",this.type="Material",this.blending=$r,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Uf,this.blendDst=Ff,this.blendEquation=ir,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ot(0,0,0),this.blendAlpha=0,this.depthFunc=Kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=em,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fl,this.stencilZFail=fl,this.stencilZPass=fl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ht(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Ht(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ot().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ki().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ft().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ft().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Za extends Ps{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ws;const Er=new U,qs=new U,Xs=new U,$s=new Ft,Tr=new Ft,Qf=new Ce,To=new U,Ar=new U,Ao=new U,Wu=new Ft,Il=new Ft,qu=new Ft;class Kh extends en{constructor(t=new Za){if(super(),this.isSprite=!0,this.type="Sprite",Ws===void 0){Ws=new ke;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Pm(e,5);Ws.setIndex([0,1,2,0,2,3]),Ws.setAttribute("position",new ka(n,3,0,!1)),Ws.setAttribute("uv",new ka(n,2,3,!1))}this.geometry=Ws,this.material=t,this.center=new Ft(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&se('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qs.setFromMatrixScale(this.matrixWorld),Qf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qs.multiplyScalar(-Xs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ro(To.set(-.5,-.5,0),Xs,o,qs,s,r),Ro(Ar.set(.5,-.5,0),Xs,o,qs,s,r),Ro(Ao.set(.5,.5,0),Xs,o,qs,s,r),Wu.set(0,0),Il.set(1,0),qu.set(1,1);let a=t.ray.intersectTriangle(To,Ar,Ao,!1,Er);if(a===null&&(Ro(Ar.set(-.5,.5,0),Xs,o,qs,s,r),Il.set(0,1),a=t.ray.intersectTriangle(To,Ao,Ar,!1,Er),a===null))return;const l=t.ray.origin.distanceTo(Er);l<t.near||l>t.far||e.push({distance:l,point:Er.clone(),uv:Dn.getInterpolation(Er,To,Ar,Ao,Wu,Il,qu,new Ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ro(i,t,e,n,s,r){$s.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Tr.x=r*$s.x-s*$s.y,Tr.y=s*$s.x+r*$s.y):Tr.copy($s),i.copy(t),i.x+=Tr.x,i.y+=Tr.y,i.applyMatrix4(Qf)}const _i=new U,Nl=new U,Co=new U,Po=new U;class Zh{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_i)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=_i.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_i.copy(this.origin).addScaledVector(this.direction,e),_i.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Nl.copy(t).add(e).multiplyScalar(.5),Co.copy(e).sub(t).normalize(),Po.copy(this.origin).sub(Nl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Co),a=Po.dot(this.direction),l=-Po.dot(Co),c=Po.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Nl).addScaledVector(Co,u),f}intersectSphere(t,e){if(t.radius<0)return null;_i.subVectors(t.center,this.origin);const n=_i.dot(this.direction),s=_i.dot(_i)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,_i)!==null}intersectTriangle(t,e,n,s,r){const o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,g=e.x-o.x,x=e.y-o.y,m=e.z-o.z,p=n.x-o.x,y=n.y-o.y,T=n.z-o.z,_=Math.abs(l),E=Math.abs(c),w=Math.abs(h);let P,v,R,N,F,B,S,M,C,I,D,q;if(_>=E&&_>=w?(R=l,B=d,C=g,q=p,l>=0?(P=c,v=h,N=u,F=f,S=x,M=m,I=y,D=T):(P=h,v=c,N=f,F=u,S=m,M=x,I=T,D=y)):E>=w?(R=c,B=u,C=x,q=y,c>=0?(P=h,v=l,N=f,F=d,S=m,M=g,I=T,D=p):(P=l,v=h,N=d,F=f,S=g,M=m,I=p,D=T)):(R=h,B=f,C=m,q=T,h>=0?(P=l,v=c,N=d,F=u,S=g,M=x,I=p,D=y):(P=c,v=l,N=u,F=d,S=x,M=g,I=y,D=p)),R===0)return null;const O=P/R,z=v/R,$=1/R,tt=N-O*B,lt=F-z*B,It=S-O*C,ft=M-z*C,At=I-O*q,G=D-z*q,j=At*ft-G*It,ht=tt*G-lt*At,Pt=It*lt-ft*tt;if(s){if(j<0||ht<0||Pt<0)return null}else if((j<0||ht<0||Pt<0)&&(j>0||ht>0||Pt>0))return null;const St=j+ht+Pt;if(St===0)return null;const qt=$*(j*B+ht*C+Pt*q);return(St>0?qt<0:qt>0)?null:this.at(qt/St,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Fi extends Ps{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ts,this.combine=Of,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Xu=new Ce,ds=new Zh,Lo=new ro,$u=new U,Do=new U,Io=new U,No=new U,kl=new U,ko=new U,Yu=new U,Uo=new U;class le extends en{constructor(t=new ke,e=new Fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){ko.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(kl.fromBufferAttribute(d,t),o?ko.addScaledVector(kl,h):ko.addScaledVector(kl.sub(e),h))}e.add(ko)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Lo.copy(n.boundingSphere),Lo.applyMatrix4(r),ds.copy(t.ray).recast(t.near),!(Lo.containsPoint(ds.origin)===!1&&(ds.intersectSphere(Lo,$u)===null||ds.origin.distanceToSquared($u)>(t.far-t.near)**2))&&(Xu.copy(r).invert(),ds.copy(t.ray).applyMatrix4(Xu),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ds)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),T=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,E=T;_<E;_+=3){const w=a.getX(_),P=a.getX(_+1),v=a.getX(_+2);s=Fo(this,p,t,n,c,h,d,w,P,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=a.getX(m),T=a.getX(m+1),_=a.getX(m+2);s=Fo(this,o,t,n,c,h,d,y,T,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),T=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=y,E=T;_<E;_+=3){const w=_,P=_+1,v=_+2;s=Fo(this,p,t,n,c,h,d,w,P,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=m,T=m+1,_=m+2;s=Fo(this,o,t,n,c,h,d,y,T,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Nm(i,t,e,n,s,r,o,a){let l;if(t.side===xn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===ki,a),l===null)return null;Uo.copy(a),Uo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Uo);return c<e.near||c>e.far?null:{distance:c,point:Uo.clone(),object:i}}function Fo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Do),i.getVertexPosition(l,Io),i.getVertexPosition(c,No);const h=Nm(i,t,e,n,Do,Io,No,Yu);if(h){const d=new U;Dn.getBarycoord(Yu,Do,Io,No,d),s&&(h.uv=Dn.getInterpolatedAttribute(s,a,l,c,d,new Ft)),r&&(h.uv1=Dn.getInterpolatedAttribute(r,a,l,c,d,new Ft)),o&&(h.normal=Dn.getInterpolatedAttribute(o,a,l,c,d,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new U,materialIndex:0};Dn.getNormal(Do,Io,No,u.normal),h.face=u,h.barycoord=d}return h}class km extends un{constructor(t=null,e=1,n=1,s,r,o,a,l,c=he,h=he,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fs=new ro,Um=new Ft(.5,.5),Oo=new U;class Jh{constructor(t=new Ki,e=new Ki,n=new Ki,s=new Ki,r=new Ki,o=new Ki){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=di,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],y=r[12],T=r[13],_=r[14],E=r[15];if(s[0].setComponents(c-o,f-h,p-g,E-y).normalize(),s[1].setComponents(c+o,f+h,p+g,E+y).normalize(),s[2].setComponents(c+a,f+d,p+x,E+T).normalize(),s[3].setComponents(c-a,f-d,p-x,E-T).normalize(),n)s[4].setComponents(l,u,m,_).normalize(),s[5].setComponents(c-l,f-u,p-m,E-_).normalize();else if(s[4].setComponents(c-l,f-u,p-m,E-_).normalize(),e===di)s[5].setComponents(c+l,f+u,p+m,E+_).normalize();else if(e===jr)s[5].setComponents(l,u,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(t){fs.center.set(0,0,0);const e=Um.distanceTo(t.center);return fs.radius=.7071067811865476+e,fs.applyMatrix4(t.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Oo.x=s.normal.x>0?t.max.x:t.min.x,Oo.y=s.normal.y>0?t.max.y:t.min.y,Oo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Oo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class jf extends Ps{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ot(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ua=new U,Fa=new U,Ku=new Ce,Rr=new Zh,Bo=new ro,Ul=new U,Zu=new U;class Fm extends en{constructor(t=new ke,e=new jf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ua.fromBufferAttribute(e,s-1),Fa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ua.distanceTo(Fa);t.setAttribute("lineDistance",new re(n,1))}else Ht("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bo.copy(n.boundingSphere),Bo.applyMatrix4(s),Bo.radius+=r,t.ray.intersectsSphere(Bo)===!1)return;Ku.copy(s).invert(),Rr.copy(t.ray).applyMatrix4(Ku);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){const p=h.getX(x),y=h.getX(x+1),T=zo(this,t,Rr,l,p,y,x);T&&e.push(T)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(f),p=zo(this,t,Rr,l,x,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){const p=zo(this,t,Rr,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=zo(this,t,Rr,l,g-1,f,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function zo(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Ua.fromBufferAttribute(a,s),Fa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ua,Fa,Ul,Zu)>n)return;Ul.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ul);if(!(c<t.near||c>t.far))return{distance:c,point:Zu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Ju=new U,Qu=new U;class Om extends Fm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Ju.fromBufferAttribute(e,s),Qu.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ju.distanceTo(Qu);t.setAttribute("lineDistance",new re(n,1))}else Ht("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tp extends Ps{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ot(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ju=new Ce,gh=new Zh,Ho=new ro,Go=new U;class ep extends en{constructor(t=new ke,e=new tp){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(s),Ho.radius+=r,t.ray.intersectsSphere(Ho)===!1)return;ju.copy(s).invert(),gh.copy(t.ray).applyMatrix4(ju);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=u,x=f;g<x;g++){const m=c.getX(g);Go.fromBufferAttribute(d,m),td(Go,m,l,s,t,e,this)}}else{const u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=u,x=f;g<x;g++)Go.fromBufferAttribute(d,g),td(Go,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function td(i,t,e,n,s,r,o){const a=gh.distanceSqToPoint(i);if(a<e){const l=new U;gh.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class np extends un{constructor(t=[],e=ws,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class is extends un{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class to extends un{constructor(t,e,n=pi,s,r,o,a=he,l=he,c,h=Ui,d=1){if(h!==Ui&&h!==bs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Xh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Bm extends to{constructor(t,e=pi,n=ws,s,r,o=he,a=he,l,c=Ui){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class ip extends un{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class hn extends ke{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new re(c,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(d,2));function g(x,m,p,y,T,_,E,w,P,v,R){const N=_/P,F=E/v,B=_/2,S=E/2,M=w/2,C=P+1,I=v+1;let D=0,q=0;const O=new U;for(let z=0;z<I;z++){const $=z*F-S;for(let tt=0;tt<C;tt++){const lt=tt*N-B;O[x]=lt*y,O[m]=$*T,O[p]=M,c.push(O.x,O.y,O.z),O[x]=0,O[m]=0,O[p]=w>0?1:-1,h.push(O.x,O.y,O.z),d.push(tt/P),d.push(1-z/v),D+=1}}for(let z=0;z<v;z++)for(let $=0;$<P;$++){const tt=u+$+C*z,lt=u+$+C*(z+1),It=u+($+1)+C*(z+1),ft=u+($+1)+C*z;l.push(tt,lt,ft),l.push(lt,It,ft),q+=6}a.addGroup(f,q,R),f+=q,u+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const Vo=new U,Wo=new U,Fl=new U,qo=new Dn;class zm extends ke{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ya*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:p}=qo;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),qo.getNormal(Fl),d[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){const T=(y+1)%3,_=d[y],E=d[T],w=qo[h[y]],P=qo[h[T]],v=`${_}_${E}`,R=`${E}_${_}`;R in u&&u[R]?(Fl.dot(u[R].normal)<=r&&(f.push(w.x,w.y,w.z),f.push(P.x,P.y,P.z)),u[R]=null):v in u||(u[v]={index0:c[y],index1:c[T],normal:Fl.clone()})}}for(const g in u)if(u[g]){const{index0:x,index1:m}=u[g];Vo.fromBufferAttribute(a,x),Wo.fromBufferAttribute(a,m),f.push(Vo.x,Vo.y,Vo.z),f.push(Wo.x,Wo.y,Wo.z)}this.setAttribute("position",new re(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ii extends ke{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const y=p*u-o;for(let T=0;T<c;T++){const _=T*d-r;g.push(_,-y,0),x.push(0,0,1),m.push(T/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const T=y+c*p,_=y+c*(p+1),E=y+1+c*(p+1),w=y+1+c*p;f.push(T,_,w),f.push(_,E,w)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ii(t.width,t.height,t.widthSegments,t.heightSegments)}}class Qh extends ke{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let d=t;const u=(e-t)/s,f=new U,g=new Ft;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const y=p+m,T=y,_=y+n+1,E=y+n+2,w=y+1;a.push(T,_,w),a.push(_,E,w)}}this.setIndex(a),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(c,3)),this.setAttribute("uv",new re(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qh(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ja extends ke{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new U,u=new U,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const y=[],T=p/n,_=o+T*a,E=t*Math.cos(_),w=Math.sqrt(t*t-E*E);let P=0;p===0&&o===0?P=.5/e:p===n&&l===Math.PI&&(P=-.5/e);for(let v=0;v<=e;v++){const R=v/e,N=s+R*r;d.x=-w*Math.cos(N),d.y=E,d.z=w*Math.sin(N),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(R+P,1-T),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const T=h[p][y+1],_=h[p][y],E=h[p+1][y],w=h[p+1][y+1];(p!==0||o>0)&&f.push(T,_,w),(p!==n-1||l<Math.PI)&&f.push(_,E,w)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ja(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function dr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(ed(s))s.isRenderTargetTexture?(Ht("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(ed(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function gn(i){const t={};for(let e=0;e<i.length;e++){const n=dr(i[e]);for(const s in n)t[s]=n[s]}return t}function ed(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Hm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function sp(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const eo={clone:dr,merge:gn};var Gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ne extends Ps{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gm,this.fragmentShader=Vm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=dr(t.uniforms),this.uniformsGroups=Hm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ot().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ft().fromArray(s.value);break;case"v3":this.uniforms[n].value=new U().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Fe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Vt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Ce().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class rp extends Ne{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Wm extends Ps{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=j0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qm extends Ps{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Xm extends en{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ot(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}const Ol=new Ce,nd=new U,id=new U;class $m{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=wn,this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jh,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new Fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;nd.setFromMatrixPosition(t.matrixWorld),e.position.copy(nd),id.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(id),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Ol.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Ol,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===jr||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(Ol)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Xo=new U,$o=new gr,ei=new U;class op extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Xo,$o,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,$o,ei.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Xo,$o,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xo,$o,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qi=new U,sd=new Ft,rd=new Ft;class Ln extends op{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=mh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ya*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return mh*2*Math.atan(Math.tan(ya*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qi.x,qi.y).multiplyScalar(-t/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-t/qi.z)}getViewSize(t,e){return this.getViewBounds(t,sd,rd),e.subVectors(rd,sd)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ya*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Ym extends $m{constructor(){super(new Ln(90,1,.5,500)),this.isPointLightShadow=!0}}class ap extends Xm{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ym}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class jh extends op{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ys=-90,Ks=1;class Km extends en{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ln(Ys,Ks,t,e);s.layers=this.layers,this.add(s);const r=new Ln(Ys,Ks,t,e);r.layers=this.layers,this.add(r);const o=new Ln(Ys,Ks,t,e);o.layers=this.layers,this.add(o);const a=new Ln(Ys,Ks,t,e);a.layers=this.layers,this.add(a);const l=new Ln(Ys,Ks,t,e);l.layers=this.layers,this.add(l);const c=new Ln(Ys,Ks,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===di)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Zm extends Ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Jm{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Qm.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Qm(){this._document.hidden===!1&&this.reset()}class lp{static{lp.prototype.isMatrix2=!0}constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}}function od(i,t,e,n){const s=jm(n);switch(e){case Wf:return i*t;case Xf:return i*t/s.components*s.byteLength;case Hh:return i*t/s.components*s.byteLength;case Es:return i*t*2/s.components*s.byteLength;case Gh:return i*t*2/s.components*s.byteLength;case qf:return i*t*3/s.components*s.byteLength;case Zn:return i*t*4/s.components*s.byteLength;case Vh:return i*t*4/s.components*s.byteLength;case ma:case ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case xa:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case zc:case Gc:return Math.max(i,16)*Math.max(t,8)/4;case Bc:case Hc:return Math.max(i,8)*Math.max(t,8)/2;case Vc:case Wc:case Xc:case $c:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case qc:case Ca:case Yc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Kc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Zc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Jc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Qc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case jc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case th:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case eh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case nh:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ih:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case sh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case rh:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case oh:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ah:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case lh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ch:case hh:case uh:return Math.ceil(i/4)*Math.ceil(t/4)*16;case dh:case fh:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Pa:case ph:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function jm(i){switch(i){case wn:case zf:return{byteLength:1,components:1};case Jr:case Hf:case vn:return{byteLength:2,components:1};case Bh:case zh:return{byteLength:2,components:4};case pi:case Oh:case ui:return{byteLength:4,components:1};case Gf:case Vf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lh}}));typeof window<"u"&&(window.__THREE__?Ht("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function cp(){let i=null,t=!1,e=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),e(r,o)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function tg(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const x=d[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var eg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ng=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ig=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,og=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ag=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ug=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,xg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_g=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,wg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Eg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ag=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ig=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ng=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ug=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Fg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Og=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Vg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,$g=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Yg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ex=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ix=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,sx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ox=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ax=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ux=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,px=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_x=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ex=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ax=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Px=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Lx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ux=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$x=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ev=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ov=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,cv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,hv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,uv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_v=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ev=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Tv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Av=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Pv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Yt={alphahash_fragment:eg,alphahash_pars_fragment:ng,alphamap_fragment:ig,alphamap_pars_fragment:sg,alphatest_fragment:rg,alphatest_pars_fragment:og,aomap_fragment:ag,aomap_pars_fragment:lg,batching_pars_vertex:cg,batching_vertex:hg,begin_vertex:ug,beginnormal_vertex:dg,bsdfs:fg,iridescence_fragment:pg,bumpmap_pars_fragment:mg,clipping_planes_fragment:gg,clipping_planes_pars_fragment:xg,clipping_planes_pars_vertex:vg,clipping_planes_vertex:yg,color_fragment:_g,color_pars_fragment:bg,color_pars_vertex:Mg,color_vertex:Sg,common:wg,cube_uv_reflection_fragment:Eg,defaultnormal_vertex:Tg,displacementmap_pars_vertex:Ag,displacementmap_vertex:Rg,emissivemap_fragment:Cg,emissivemap_pars_fragment:Pg,colorspace_fragment:Lg,colorspace_pars_fragment:Dg,envmap_fragment:Ig,envmap_common_pars_fragment:Ng,envmap_pars_fragment:kg,envmap_pars_vertex:Ug,envmap_physical_pars_fragment:$g,envmap_vertex:Fg,fog_vertex:Og,fog_pars_vertex:Bg,fog_fragment:zg,fog_pars_fragment:Hg,gradientmap_pars_fragment:Gg,lightmap_pars_fragment:Vg,lights_lambert_fragment:Wg,lights_lambert_pars_fragment:qg,lights_pars_begin:Xg,lights_toon_fragment:Yg,lights_toon_pars_fragment:Kg,lights_phong_fragment:Zg,lights_phong_pars_fragment:Jg,lights_physical_fragment:Qg,lights_physical_pars_fragment:jg,lights_fragment_begin:tx,lights_fragment_maps:ex,lights_fragment_end:nx,lightprobes_pars_fragment:ix,logdepthbuf_fragment:sx,logdepthbuf_pars_fragment:rx,logdepthbuf_pars_vertex:ox,logdepthbuf_vertex:ax,map_fragment:lx,map_pars_fragment:cx,map_particle_fragment:hx,map_particle_pars_fragment:ux,metalnessmap_fragment:dx,metalnessmap_pars_fragment:fx,morphinstance_vertex:px,morphcolor_vertex:mx,morphnormal_vertex:gx,morphtarget_pars_vertex:xx,morphtarget_vertex:vx,normal_fragment_begin:yx,normal_fragment_maps:_x,normal_pars_fragment:bx,normal_pars_vertex:Mx,normal_vertex:Sx,normalmap_pars_fragment:wx,clearcoat_normal_fragment_begin:Ex,clearcoat_normal_fragment_maps:Tx,clearcoat_pars_fragment:Ax,iridescence_pars_fragment:Rx,opaque_fragment:Cx,packing:Px,premultiplied_alpha_fragment:Lx,project_vertex:Dx,dithering_fragment:Ix,dithering_pars_fragment:Nx,roughnessmap_fragment:kx,roughnessmap_pars_fragment:Ux,shadowmap_pars_fragment:Fx,shadowmap_pars_vertex:Ox,shadowmap_vertex:Bx,shadowmask_pars_fragment:zx,skinbase_vertex:Hx,skinning_pars_vertex:Gx,skinning_vertex:Vx,skinnormal_vertex:Wx,specularmap_fragment:qx,specularmap_pars_fragment:Xx,tonemapping_fragment:$x,tonemapping_pars_fragment:Yx,transmission_fragment:Kx,transmission_pars_fragment:Zx,uv_pars_fragment:Jx,uv_pars_vertex:Qx,uv_vertex:jx,worldpos_vertex:tv,background_vert:ev,background_frag:nv,backgroundCube_vert:iv,backgroundCube_frag:sv,cube_vert:rv,cube_frag:ov,depth_vert:av,depth_frag:lv,distance_vert:cv,distance_frag:hv,equirect_vert:uv,equirect_frag:dv,linedashed_vert:fv,linedashed_frag:pv,meshbasic_vert:mv,meshbasic_frag:gv,meshlambert_vert:xv,meshlambert_frag:vv,meshmatcap_vert:yv,meshmatcap_frag:_v,meshnormal_vert:bv,meshnormal_frag:Mv,meshphong_vert:Sv,meshphong_frag:wv,meshphysical_vert:Ev,meshphysical_frag:Tv,meshtoon_vert:Av,meshtoon_frag:Rv,points_vert:Cv,points_frag:Pv,shadow_vert:Lv,shadow_frag:Dv,sprite_vert:Iv,sprite_frag:Nv},_t={common:{diffuse:{value:new Ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new Ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Ot(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},li={basic:{uniforms:gn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:gn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ot(0)},envMapIntensity:{value:1}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:gn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ot(0)},specular:{value:new Ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:gn([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:gn([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Ot(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:gn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:gn([_t.points,_t.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:gn([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:gn([_t.common,_t.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:gn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:gn([_t.sprite,_t.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distance:{uniforms:gn([_t.common,_t.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distance_vert,fragmentShader:Yt.distance_frag},shadow:{uniforms:gn([_t.lights,_t.fog,{color:{value:new Ot(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};li.physical={uniforms:gn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Ot(0)},specularColor:{value:new Ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Yo={r:0,b:0,g:0},kv=new Ce,hp=new Vt;hp.set(-1,0,0,0,1,0,0,0,1);function Uv(i,t,e,n,s,r){const o=new Ot(0);let a=s===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let T=y.isScene===!0?y.background:null;if(T&&T.isTexture){const _=y.backgroundBlurriness>0;T=t.get(T,_)}return T}function g(y){let T=!1;const _=f(y);_===null?m(o,a):_&&_.isColor&&(m(_,1),T=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,T){const _=f(T);_&&(_.isCubeTexture||_.mapping===Ka)?(c===void 0&&(c=new le(new hn(1,1,1),new Ne({name:"BackgroundCubeMaterial",uniforms:dr(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(kv.makeRotationFromEuler(T.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(hp),c.material.toneMapped=jt.getTransfer(_.colorSpace)!==me,(h!==_||d!==_.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new le(new Ii(2,2),new Ne({name:"BackgroundMaterial",uniforms:dr(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=jt.getTransfer(_.colorSpace)!==me,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||d!==_.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=_,d=_.version,u=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,T){y.getRGB(Yo,sp(i)),e.buffers.color.setClear(Yo.r,Yo.g,Yo.b,T,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,T=1){o.set(y),a=T,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:g,addToRenderList:x,dispose:p}}function Fv(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,o=!1;function a(F,B,S,M,C){let I=!1;const D=d(F,M,S,B);r!==D&&(r=D,c(r.object)),I=f(F,M,S,C),I&&g(F,M,S,C),C!==null&&t.update(C,i.ELEMENT_ARRAY_BUFFER),(I||o)&&(o=!1,_(F,B,S,M),C!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(C).buffer))}function l(){return i.createVertexArray()}function c(F){return i.bindVertexArray(F)}function h(F){return i.deleteVertexArray(F)}function d(F,B,S,M){const C=M.wireframe===!0;let I=n[B.id];I===void 0&&(I={},n[B.id]=I);const D=F.isInstancedMesh===!0?F.id:0;let q=I[D];q===void 0&&(q={},I[D]=q);let O=q[S.id];O===void 0&&(O={},q[S.id]=O);let z=O[C];return z===void 0&&(z=u(l()),O[C]=z),z}function u(F){const B=[],S=[],M=[];for(let C=0;C<e;C++)B[C]=0,S[C]=0,M[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:S,attributeDivisors:M,object:F,attributes:{},index:null}}function f(F,B,S,M){const C=r.attributes,I=B.attributes;let D=0;const q=S.getAttributes();for(const O in q)if(q[O].location>=0){const $=C[O];let tt=I[O];if(tt===void 0&&(O==="instanceMatrix"&&F.instanceMatrix&&(tt=F.instanceMatrix),O==="instanceColor"&&F.instanceColor&&(tt=F.instanceColor)),$===void 0||$.attribute!==tt||tt&&$.data!==tt.data)return!0;D++}return r.attributesNum!==D||r.index!==M}function g(F,B,S,M){const C={},I=B.attributes;let D=0;const q=S.getAttributes();for(const O in q)if(q[O].location>=0){let $=I[O];$===void 0&&(O==="instanceMatrix"&&F.instanceMatrix&&($=F.instanceMatrix),O==="instanceColor"&&F.instanceColor&&($=F.instanceColor));const tt={};tt.attribute=$,$&&$.data&&(tt.data=$.data),C[O]=tt,D++}r.attributes=C,r.attributesNum=D,r.index=M}function x(){const F=r.newAttributes;for(let B=0,S=F.length;B<S;B++)F[B]=0}function m(F){p(F,0)}function p(F,B){const S=r.newAttributes,M=r.enabledAttributes,C=r.attributeDivisors;S[F]=1,M[F]===0&&(i.enableVertexAttribArray(F),M[F]=1),C[F]!==B&&(i.vertexAttribDivisor(F,B),C[F]=B)}function y(){const F=r.newAttributes,B=r.enabledAttributes;for(let S=0,M=B.length;S<M;S++)B[S]!==F[S]&&(i.disableVertexAttribArray(S),B[S]=0)}function T(F,B,S,M,C,I,D){D===!0?i.vertexAttribIPointer(F,B,S,C,I):i.vertexAttribPointer(F,B,S,M,C,I)}function _(F,B,S,M){x();const C=M.attributes,I=S.getAttributes(),D=B.defaultAttributeValues;for(const q in I){const O=I[q];if(O.location>=0){let z=C[q];if(z===void 0&&(q==="instanceMatrix"&&F.instanceMatrix&&(z=F.instanceMatrix),q==="instanceColor"&&F.instanceColor&&(z=F.instanceColor)),z!==void 0){const $=z.normalized,tt=z.itemSize,lt=t.get(z);if(lt===void 0)continue;const It=lt.buffer,ft=lt.type,At=lt.bytesPerElement,G=ft===i.INT||ft===i.UNSIGNED_INT||z.gpuType===Oh;if(z.isInterleavedBufferAttribute){const j=z.data,ht=j.stride,Pt=z.offset;if(j.isInstancedInterleavedBuffer){for(let St=0;St<O.locationSize;St++)p(O.location+St,j.meshPerAttribute);F.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let St=0;St<O.locationSize;St++)m(O.location+St);i.bindBuffer(i.ARRAY_BUFFER,It);for(let St=0;St<O.locationSize;St++)T(O.location+St,tt/O.locationSize,ft,$,ht*At,(Pt+tt/O.locationSize*St)*At,G)}else{if(z.isInstancedBufferAttribute){for(let j=0;j<O.locationSize;j++)p(O.location+j,z.meshPerAttribute);F.isInstancedMesh!==!0&&M._maxInstanceCount===void 0&&(M._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let j=0;j<O.locationSize;j++)m(O.location+j);i.bindBuffer(i.ARRAY_BUFFER,It);for(let j=0;j<O.locationSize;j++)T(O.location+j,tt/O.locationSize,ft,$,tt*At,tt/O.locationSize*j*At,G)}}else if(D!==void 0){const $=D[q];if($!==void 0)switch($.length){case 2:i.vertexAttrib2fv(O.location,$);break;case 3:i.vertexAttrib3fv(O.location,$);break;case 4:i.vertexAttrib4fv(O.location,$);break;default:i.vertexAttrib1fv(O.location,$)}}}}y()}function E(){R();for(const F in n){const B=n[F];for(const S in B){const M=B[S];for(const C in M){const I=M[C];for(const D in I)h(I[D].object),delete I[D];delete M[C]}}delete n[F]}}function w(F){if(n[F.id]===void 0)return;const B=n[F.id];for(const S in B){const M=B[S];for(const C in M){const I=M[C];for(const D in I)h(I[D].object),delete I[D];delete M[C]}}delete n[F.id]}function P(F){for(const B in n){const S=n[B];for(const M in S){const C=S[M];if(C[F.id]===void 0)continue;const I=C[F.id];for(const D in I)h(I[D].object),delete I[D];delete C[F.id]}}}function v(F){for(const B in n){const S=n[B],M=F.isInstancedMesh===!0?F.id:0,C=S[M];if(C!==void 0){for(const I in C){const D=C[I];for(const q in D)h(D[q].object),delete D[q];delete C[I]}delete S[M],Object.keys(S).length===0&&delete n[B]}}}function R(){N(),o=!0,r!==s&&(r=s,c(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:N,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function Ov(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Bv(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==Zn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const v=P===vn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==wn&&P!==ui&&!v&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Ht("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ht("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:T,maxFragmentUniforms:_,maxSamples:E,samples:w}}function zv(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Ki,a=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,T=y*4;let _=p.clippingState||null;l.value=_,_=h(g,u,T,f);for(let E=0;E!==T;++E)_[E]=e[E];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,_=f;T!==x;++T,_+=4)o.copy(d[T]).applyMatrix4(y,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}const rr=4,Hv=6,Gv=20,Vv=256,Cr=new jh,ad=new Ot;let Bl=null,zl=0,Hl=0,Gl=!1;const Wv=new U,ps=new U;class ld{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Wv}=r;Bl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ud(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Bl,zl,Hl),this._renderer.xr.enabled=Gl,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ws||t.mapping===ur?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:vn,format:Zn,colorSpace:La,depthBuffer:!1},s=cd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cd(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=qv(r)),this._blurMaterial=$v(r,t,e),this._ggxMaterial=Xv(r,t,e)}return s}_compileMaterial(t){const e=new le(new ke,t);this._renderer.compile(e,Cr)}_sceneToCubeUV(t,e,n,s,r){const l=new Ln(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(ad),d.toneMapping=Jn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new le(new hn,new Fi({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(ad),p=!0);for(let T=0;T<6;T++){const _=T%3;_===0?(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[T],r.y,r.z)):_===1?(l.up.set(0,0,c[T]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[T],r.z)):(l.up.set(0,c[T],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[T]));const E=this._cubeSize;Zs(s,_*E,T>2?E:0,E,E),d.setRenderTarget(s),p&&d.render(x,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ws||t.mapping===ur;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ud()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Zs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Cr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-rr?n-g+rr:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=g-e,Zs(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(a,Cr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-n,Zs(t,m,p,3*x,2*x),s.setRenderTarget(t),s.render(a,Cr)}_blur(t,e,n,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,o),this._blurPass(r,t,n,n,o)}_blurPass(t,e,n,s,r){const o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;const c=a.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],d=3*h*(s>this._lodMax-rr?s-this._lodMax+rr:0),u=4*(this._cubeSize-h);Zs(e,d,u,3*h,2*h),o.setRenderTarget(e),o.render(l,Cr)}}function qv(i){const t=[],e=[];let n=i;const s=i-rr+1+Hv;for(let r=0;r<s;r++){const o=Math.pow(2,n);t.push(o);const a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,g=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let p=0;p<d;p++){const y=p%3*2/3-1,T=p>2?0:-1,_=[y,T,0,y+2/3,T,0,y+2/3,T+1,0,y,T,0,y+2/3,T+1,0,y,T+1,0];g.set(_,f*u*p);for(let E=0;E<u;E++){const w=h[E*2]*2-1,P=h[E*2+1]*2-1;p===0?ps.set(1,P,w):p===1?ps.set(-w,1,-P):p===2?ps.set(-w,P,1):p===3?ps.set(-1,P,-w):p===4?ps.set(-w,-1,P):ps.set(w,P,-1),ps.toArray(x,(p*u+E)*f)}}const m=new ke;m.setAttribute("position",new En(g,f)),m.setAttribute("outputDirection",new En(x,f)),e.push(new le(m,null)),n>rr&&n--}return{lodMeshes:e,sizeLods:t}}function cd(i,t,e){const n=new dn(i,t,e);return n.texture.mapping=Ka,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Zs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Xv(i,t,e){return new Ne({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Vv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function $v(i,t,e){return new Ne({name:"SphericalGaussianBlur",defines:{SAMPLES:Gv,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Qa(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function hd(){return new Ne({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function ud(){return new Ne({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fi,depthTest:!1,depthWrite:!1})}function Qa(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class up extends dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new np(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new hn(5,5,5),r=new Ne({name:"CubemapFromEquirect",uniforms:dr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:fi});r.uniforms.tEquirect.value=e;const o=new le(s,r),a=e.minFilter;return e.minFilter===_s&&(e.minFilter=Ke),new Km(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}function Yv(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===hl||f===ul)if(t.has(u)){const g=t.get(u).texture;return a(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new up(g.height);return x.fromEquirectangularTexture(i,u),t.set(u,x),u.addEventListener("dispose",c),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const f=u.mapping,g=f===hl||f===ul,x=f===ws||f===ur;if(g||x){let m=e.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ld(i)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const y=u.image;return g&&y&&y.height>0||x&&y&&l(y)?(n===null&&(n=new ld(i)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,f){return f===hl?u.mapping=ws:f===ul&&(u.mapping=ur),u}function l(u){let f=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Kv(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&or("WebGLRenderer: "+n+" extension not supported."),s}}}function Zv(i,t,e,n){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(f!==null){const y=f.array;x=f.version;for(let T=0,_=y.length;T<_;T+=3){const E=y[T+0],w=y[T+1],P=y[T+2];u.push(E,w,w,P,P,E)}}else{const y=g.array;x=g.version;for(let T=0,_=y.length/3-1;T<_;T+=3){const E=T+0,w=T+1,P=T+2;u.push(E,w,w,P,P,E)}}const m=new(g.count>=65535?Yh:$h)(u,1);m.version=x;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Jv(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];e.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Qv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:se("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function jv(i,t,e){const n=new WeakMap,s=new Fe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(a);if(u===void 0||u.count!==d){let N=function(){v.dispose(),n.delete(a),a.removeEventListener("dispose",N)};var f=N;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],T=a.morphAttributes.color||[];let _=0;g===!0&&(_=1),x===!0&&(_=2),m===!0&&(_=3);let E=a.attributes.position.count*_,w=1;E>t.maxTextureSize&&(w=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const P=new Float32Array(E*w*4*d),v=new Kf(P,E,w,d);v.type=ui,v.needsUpdate=!0;const R=_*4;for(let F=0;F<d;F++){const B=p[F],S=y[F],M=T[F],C=E*w*4*F;for(let I=0;I<B.count;I++){const D=I*R;g===!0&&(s.fromBufferAttribute(B,I),P[C+D+0]=s.x,P[C+D+1]=s.y,P[C+D+2]=s.z,P[C+D+3]=0),x===!0&&(s.fromBufferAttribute(S,I),P[C+D+4]=s.x,P[C+D+5]=s.y,P[C+D+6]=s.z,P[C+D+7]=0),m===!0&&(s.fromBufferAttribute(M,I),P[C+D+8]=s.x,P[C+D+9]=s.y,P[C+D+10]=s.z,P[C+D+11]=M.itemSize===4?s.w:1)}}u={count:d,texture:v,size:new Ft(E,w)},n.set(a,u),a.addEventListener("dispose",N)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function ty(i,t,e,n,s){let r=new WeakMap;function o(c){const h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}const ey={[Dh]:"LINEAR_TONE_MAPPING",[Ih]:"REINHARD_TONE_MAPPING",[Nh]:"CINEON_TONE_MAPPING",[Ya]:"ACES_FILMIC_TONE_MAPPING",[Uh]:"AGX_TONE_MAPPING",[Fh]:"NEUTRAL_TONE_MAPPING",[kh]:"CUSTOM_TONE_MAPPING"};function ny(i,t,e,n,s,r){const o=new dn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,l=null;const c=new ke;c.setAttribute("position",new re([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new re([0,2,0,0,2,0],2));const h=new rp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new le(c,h),u=new jh(-1,1,1,-1,0,1);let f=null,g=null,x=!1,m,p=null,y=[],T=!1;this.setSize=function(_,E){o.setSize(_,E),a!==null&&a.setSize(_,E),l!==null&&l.setSize(_,E);for(let w=0;w<y.length;w++){const P=y[w];P.setSize&&P.setSize(_,E)}},this.setEffects=function(_){y=_,T=y.length>0&&y[0].isRenderPass===!0;const E=o.width,w=o.height;y.length>0&&a===null&&(a=new dn(E,w,{type:vn,depthBuffer:!1,stencilBuffer:!1}),l=new dn(E,w,{type:vn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<y.length;P++){const v=y[P];v.setSize&&v.setSize(E,w)}},this.begin=function(_,E){if(x||_.toneMapping===Jn&&y.length===0)return!1;if(p=E,E!==null){const w=E.width,P=E.height;(o.width!==w||o.height!==P)&&this.setSize(w,P)}return T===!1&&_.setRenderTarget(o),m=_.toneMapping,_.toneMapping=Jn,!0},this.hasRenderPass=function(){return T},this.end=function(_,E){_.toneMapping=m,x=!0;let w=o,P=a;for(let v=0;v<y.length;v++){const R=y[v];R.enabled!==!1&&(R.render(_,P,w,E),R.needsSwap!==!1&&(w=P,P=P===a?l:a))}if(f!==_.outputColorSpace||g!==_.toneMapping){f=_.outputColorSpace,g=_.toneMapping,h.defines={},jt.getTransfer(f)===me&&(h.defines.SRGB_TRANSFER="");const v=ey[g];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,_.setRenderTarget(p),_.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}const dp=new un,xh=new to(1,1),fp=new Kf,pp=new vm,mp=new np,dd=[],fd=[],pd=new Float32Array(16),md=new Float32Array(9),gd=new Float32Array(4);function xr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dd[s];if(r===void 0&&(r=new Float32Array(s),dd[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ze(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Je(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ja(i,t){let e=fd[t];e===void 0&&(e=new Int32Array(t),fd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function iy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function sy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2fv(this.addr,t),Je(e,t)}}function ry(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;i.uniform3fv(this.addr,t),Je(e,t)}}function oy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4fv(this.addr,t),Je(e,t)}}function ay(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,n))return;gd.set(n),i.uniformMatrix2fv(this.addr,!1,gd),Je(e,n)}}function ly(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,n))return;md.set(n),i.uniformMatrix3fv(this.addr,!1,md),Je(e,n)}}function cy(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Je(e,t)}else{if(Ze(e,n))return;pd.set(n),i.uniformMatrix4fv(this.addr,!1,pd),Je(e,n)}}function hy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function uy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2iv(this.addr,t),Je(e,t)}}function dy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;i.uniform3iv(this.addr,t),Je(e,t)}}function fy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4iv(this.addr,t),Je(e,t)}}function py(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function my(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2uiv(this.addr,t),Je(e,t)}}function gy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;i.uniform3uiv(this.addr,t),Je(e,t)}}function xy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4uiv(this.addr,t),Je(e,t)}}function vy(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(xh.compareFunction=e.isReversedDepthBuffer()?qh:Wh,r=xh):r=dp,e.setTexture2D(t||r,s)}function yy(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||pp,s)}function _y(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||mp,s)}function by(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||fp,s)}function My(i){switch(i){case 5126:return iy;case 35664:return sy;case 35665:return ry;case 35666:return oy;case 35674:return ay;case 35675:return ly;case 35676:return cy;case 5124:case 35670:return hy;case 35667:case 35671:return uy;case 35668:case 35672:return dy;case 35669:case 35673:return fy;case 5125:return py;case 36294:return my;case 36295:return gy;case 36296:return xy;case 35678:case 36198:case 36298:case 36306:case 35682:return vy;case 35679:case 36299:case 36307:return yy;case 35680:case 36300:case 36308:case 36293:return _y;case 36289:case 36303:case 36311:case 36292:return by}}function Sy(i,t){i.uniform1fv(this.addr,t)}function wy(i,t){const e=xr(t,this.size,2);i.uniform2fv(this.addr,e)}function Ey(i,t){const e=xr(t,this.size,3);i.uniform3fv(this.addr,e)}function Ty(i,t){const e=xr(t,this.size,4);i.uniform4fv(this.addr,e)}function Ay(i,t){const e=xr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ry(i,t){const e=xr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Cy(i,t){const e=xr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Py(i,t){i.uniform1iv(this.addr,t)}function Ly(i,t){i.uniform2iv(this.addr,t)}function Dy(i,t){i.uniform3iv(this.addr,t)}function Iy(i,t){i.uniform4iv(this.addr,t)}function Ny(i,t){i.uniform1uiv(this.addr,t)}function ky(i,t){i.uniform2uiv(this.addr,t)}function Uy(i,t){i.uniform3uiv(this.addr,t)}function Fy(i,t){i.uniform4uiv(this.addr,t)}function Oy(i,t,e){const n=this.cache,s=t.length,r=ja(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),Je(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=xh:o=dp;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function By(i,t,e){const n=this.cache,s=t.length,r=ja(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),Je(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||pp,r[o])}function zy(i,t,e){const n=this.cache,s=t.length,r=ja(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),Je(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||mp,r[o])}function Hy(i,t,e){const n=this.cache,s=t.length,r=ja(e,s);Ze(n,r)||(i.uniform1iv(this.addr,r),Je(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||fp,r[o])}function Gy(i){switch(i){case 5126:return Sy;case 35664:return wy;case 35665:return Ey;case 35666:return Ty;case 35674:return Ay;case 35675:return Ry;case 35676:return Cy;case 5124:case 35670:return Py;case 35667:case 35671:return Ly;case 35668:case 35672:return Dy;case 35669:case 35673:return Iy;case 5125:return Ny;case 36294:return ky;case 36295:return Uy;case 36296:return Fy;case 35678:case 36198:case 36298:case 36306:case 35682:return Oy;case 35679:case 36299:case 36307:return By;case 35680:case 36300:case 36308:case 36293:return zy;case 36289:case 36303:case 36311:case 36292:return Hy}}class Vy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=My(e.type)}}class Wy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gy(e.type)}}class qy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Vl=/(\w+)(\])?(\[|\.)?/g;function xd(i,t){i.seq.push(t),i.map[t.id]=t}function Xy(i,t,e){const n=i.name,s=n.length;for(Vl.lastIndex=0;;){const r=Vl.exec(n),o=Vl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){xd(e,c===void 0?new Vy(a,i,t):new Wy(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new qy(a),xd(e,d)),e=d}}}class _a{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);Xy(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function vd(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const $y=37297;let Yy=0;function Ky(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const yd=new Vt;function Zy(i){jt._getMatrix(yd,jt.workingColorSpace,i);const t=`mat3( ${yd.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(i)){case Da:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return Ht("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function _d(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Ky(i.getShaderSource(t),a)}else return r}function Jy(i,t){const e=Zy(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Qy={[Dh]:"Linear",[Ih]:"Reinhard",[Nh]:"Cineon",[Ya]:"ACESFilmic",[Uh]:"AgX",[Fh]:"Neutral",[kh]:"Custom"};function jy(i,t){const e=Qy[t];return e===void 0?(Ht("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ko=new U;function t_(){jt.getLuminanceCoefficients(Ko);const i=Ko.x.toFixed(4),t=Ko.y.toFixed(4),e=Ko.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function e_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gr).join(`
`)}function n_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function i_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Gr(i){return i!==""}function bd(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Md(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const s_=/^[ \t]*#include +<([\w\d./]+)>/gm;function vh(i){return i.replace(s_,o_)}const r_=new Map;function o_(i,t){let e=Yt[t];if(e===void 0){const n=r_.get(t);if(n!==void 0)e=Yt[n],Ht('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return vh(e)}const a_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sd(i){return i.replace(a_,l_)}function l_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const c_={[Xr]:"SHADOWMAP_TYPE_PCF",[Hr]:"SHADOWMAP_TYPE_VSM"};function h_(i){return c_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const u_={[ws]:"ENVMAP_TYPE_CUBE",[ur]:"ENVMAP_TYPE_CUBE",[Ka]:"ENVMAP_TYPE_CUBE_UV"};function d_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":u_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const f_={[ur]:"ENVMAP_MODE_REFRACTION"};function p_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":f_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const m_={[Of]:"ENVMAP_BLENDING_MULTIPLY",[Z0]:"ENVMAP_BLENDING_MIX",[J0]:"ENVMAP_BLENDING_ADD"};function g_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":m_[i.combine]||"ENVMAP_BLENDING_NONE"}function x_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function v_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=h_(e),c=d_(e),h=p_(e),d=g_(e),u=x_(e),f=e_(e),g=n_(r),x=s.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gr).join(`
`),p.length>0&&(p+=`
`)):(m=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gr).join(`
`),p=[wd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Jn?"#define TONE_MAPPING":"",e.toneMapping!==Jn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Jn?jy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,Jy("linearToOutputTexel",e.outputColorSpace),t_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gr).join(`
`)),o=vh(o),o=bd(o,e),o=Md(o,e),a=vh(a),a=bd(a,e),a=Md(a,e),o=Sd(o),a=Sd(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Lu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Lu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=y+m+o,_=y+p+a,E=vd(s,s.VERTEX_SHADER,T),w=vd(s,s.FRAGMENT_SHADER,_);s.attachShader(x,E),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(F){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(x)||"",S=s.getShaderInfoLog(E)||"",M=s.getShaderInfoLog(w)||"",C=B.trim(),I=S.trim(),D=M.trim();let q=!0,O=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,E,w);else{const z=_d(s,E,"vertex"),$=_d(s,w,"fragment");se("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+C+`
`+z+`
`+$)}else C!==""?Ht("WebGLProgram: Program Info Log:",C):(I===""||D==="")&&(O=!1);O&&(F.diagnostics={runnable:q,programLog:C,vertexShader:{log:I,prefix:m},fragmentShader:{log:D,prefix:p}})}s.deleteShader(E),s.deleteShader(w),v=new _a(s,x),R=i_(s,x)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let R;this.getAttributes=function(){return R===void 0&&P(this),R};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(x,$y)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yy++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=w,this}let y_=0;class __{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new b_(t),e.set(t,n)),n}}class b_{constructor(t){this.id=y_++,this.code=t,this.usedTimes=0}}function M_(i){return i===Es||i===Ca||i===Pa}function S_(i,t,e,n,s,r){const o=new Zf,a=new __,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,R,N,F,B,S){const M=F.fog,C=B.geometry,I=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?F.environment:null,D=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,q=t.get(v.envMap||I,D),O=q&&q.mapping===Ka?q.image.height:null,z=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Ht("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const $=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,tt=$!==void 0?$.length:0;let lt=0;C.morphAttributes.position!==void 0&&(lt=1),C.morphAttributes.normal!==void 0&&(lt=2),C.morphAttributes.color!==void 0&&(lt=3);let It,ft,At,G;if(z){const Te=li[z];It=Te.vertexShader,ft=Te.fragmentShader}else{It=v.vertexShader,ft=v.fragmentShader;const Te=a.getVertexShaderStage(v),ue=a.getFragmentShaderStage(v);a.update(v,Te,ue),At=Te.id,G=ue.id}const j=i.getRenderTarget(),ht=i.state.buffers.depth.getReversed(),Pt=B.isInstancedMesh===!0,St=B.isBatchedMesh===!0,qt=!!v.map,Oe=!!v.matcap,Kt=!!q,oe=!!v.aoMap,Ee=!!v.lightMap,Jt=!!v.bumpMap&&v.wireframe===!1,De=!!v.normalMap,je=!!v.displacementMap,_n=!!v.emissiveMap,Ue=!!v.metalnessMap,We=!!v.roughnessMap,X=v.anisotropy>0,nn=v.clearcoat>0,xe=v.dispersion>0,L=v.retroreflectivity>0,b=v.iridescence>0,Y=v.sheen>0,J=v.transmission>0,et=X&&!!v.anisotropyMap,dt=nn&&!!v.clearcoatMap,pt=nn&&!!v.clearcoatNormalMap,it=nn&&!!v.clearcoatRoughnessMap,rt=b&&!!v.iridescenceMap,mt=b&&!!v.iridescenceThicknessMap,Nt=Y&&!!v.sheenColorMap,yt=Y&&!!v.sheenRoughnessMap,gt=!!v.specularMap,kt=!!v.specularColorMap,Bt=!!v.specularIntensityMap,Wt=J&&!!v.transmissionMap,V=J&&!!v.thicknessMap,xt=!!v.gradientMap,st=!!v.alphaMap,vt=v.alphaTest>0,wt=!!v.alphaHash,ot=!!v.extensions;let Ut=Jn;v.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ut=i.toneMapping);const Lt={shaderID:z,shaderType:v.type,shaderName:v.name,vertexShader:It,fragmentShader:ft,defines:v.defines,customVertexShaderID:At,customFragmentShaderID:G,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:St,batchingColor:St&&B._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&B.instanceColor!==null,instancingMorph:Pt&&B.morphTexture!==null,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:qt,matcap:Oe,envMap:Kt,envMapMode:Kt&&q.mapping,envMapCubeUVHeight:O,aoMap:oe,lightMap:Ee,bumpMap:Jt,normalMap:De,displacementMap:je,emissiveMap:_n,normalMapObjectSpace:De&&v.normalMapType===tm,normalMapTangentSpace:De&&v.normalMapType===Pu,packedNormalMap:De&&v.normalMapType===Pu&&M_(v.normalMap.format),metalnessMap:Ue,roughnessMap:We,anisotropy:X,anisotropyMap:et,clearcoat:nn,clearcoatMap:dt,clearcoatNormalMap:pt,clearcoatRoughnessMap:it,dispersion:xe,retroreflection:L,iridescence:b,iridescenceMap:rt,iridescenceThicknessMap:mt,sheen:Y,sheenColorMap:Nt,sheenRoughnessMap:yt,specularMap:gt,specularColorMap:kt,specularIntensityMap:Bt,transmission:J,transmissionMap:Wt,thicknessMap:V,gradientMap:xt,opaque:v.transparent===!1&&v.blending===$r&&v.alphaToCoverage===!1,alphaMap:st,alphaTest:vt,alphaHash:wt,combine:v.combine,mapUv:qt&&g(v.map.channel),aoMapUv:oe&&g(v.aoMap.channel),lightMapUv:Ee&&g(v.lightMap.channel),bumpMapUv:Jt&&g(v.bumpMap.channel),normalMapUv:De&&g(v.normalMap.channel),displacementMapUv:je&&g(v.displacementMap.channel),emissiveMapUv:_n&&g(v.emissiveMap.channel),metalnessMapUv:Ue&&g(v.metalnessMap.channel),roughnessMapUv:We&&g(v.roughnessMap.channel),anisotropyMapUv:et&&g(v.anisotropyMap.channel),clearcoatMapUv:dt&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:pt&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:rt&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:yt&&g(v.sheenRoughnessMap.channel),specularMapUv:gt&&g(v.specularMap.channel),specularColorMapUv:kt&&g(v.specularColorMap.channel),specularIntensityMapUv:Bt&&g(v.specularIntensityMap.channel),transmissionMapUv:Wt&&g(v.transmissionMap.channel),thicknessMapUv:V&&g(v.thicknessMap.channel),alphaMapUv:st&&g(v.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(De||X),vertexNormals:!!C.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!C.attributes.uv&&(qt||st),fog:!!M,useFog:v.fog===!0,fogExp2:!!M&&M.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||C.attributes.normal===void 0&&De===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ht,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:lt,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:S.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ut,decodeVideoTexture:qt&&v.map.isVideoTexture===!0&&jt.getTransfer(v.map.colorSpace)===me,decodeVideoTextureEmissive:_n&&v.emissiveMap.isVideoTexture===!0&&jt.getTransfer(v.emissiveMap.colorSpace)===me,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Sn,flipSided:v.side===xn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ot&&v.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&v.extensions.multiDraw===!0||St)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Lt.vertexUv1s=l.has(1),Lt.vertexUv2s=l.has(2),Lt.vertexUv3s=l.has(3),l.clear(),Lt}function m(v){const R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(const N in v.defines)R.push(N),R.push(v.defines[N]);return v.isRawShaderMaterial===!1&&(p(R,v),y(R,v),R.push(i.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function p(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numSunLights),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numSunLightShadows),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function y(v,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.retroreflection&&o.enable(24),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function T(v){const R=f[v.type];let N;if(R){const F=li[R];N=eo.clone(F.uniforms)}else N=v.uniforms;return N}function _(v,R){let N=h.get(R);return N!==void 0?++N.usedTimes:(N=new v_(i,R,v,s),c.push(N),h.set(R,N)),N}function E(v){if(--v.usedTimes===0){const R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function w(v){a.remove(v)}function P(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:T,acquireProgram:_,releaseProgram:E,releaseShaderCache:w,programs:c,dispose:P}}function w_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function E_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Ed(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Td(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,g,x,m,p){let y=i[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:g,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},i[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=g,y.materialVariant=o(u),y.groupOrder=x,y.renderOrder=u.renderOrder,y.z=m,y.group=p),t++,y}function l(u,f,g,x,m,p,y){y.reversedDepth===!0&&(m=-m);const T=a(u,f,g,x,m,p);g.transmission>0?n.push(T):g.transparent===!0?s.push(T):e.push(T)}function c(u,f,g,x,m,p){const y=a(u,f,g,x,m,p);g.transmission>0?n.unshift(y):g.transparent===!0?s.unshift(y):e.unshift(y)}function h(u,f){e.length>1&&e.sort(u||E_),n.length>1&&n.sort(f||Ed),s.length>1&&s.sort(f||Ed)}function d(){for(let u=t,f=i.length;u<f;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function T_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Td,i.set(n,[o])):s>=r.length?(o=new Td,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function A_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new U,color:new Ot};break;case"SpotLight":e={position:new U,direction:new U,color:new Ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new Ot,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new Ot,groundColor:new Ot};break;case"RectAreaLight":e={color:new Ot,position:new U,halfWidth:new U,halfHeight:new U};break}return i[t.id]=e,e}}}function R_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let C_=0;function P_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function L_(i){const t=new A_,e=R_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new U);const s=new U,r=new Ce,o=new Ce;function a(c){let h=0,d=0,u=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,y=0,T=0,_=0,E=0,w=0,P=0,v=0,R=0,N=0;c.sort(P_);for(let B=0,S=c.length;B<S;B++){const M=c[B],C=M.color,I=M.intensity,D=M.distance;let q=null;if(M.shadow&&M.shadow.map&&(M.shadow.map.texture.format===Es?q=M.shadow.map.texture:q=M.shadow.map.depthTexture||M.shadow.map.texture),M.isAmbientLight)h+=C.r*I,d+=C.g*I,u+=C.b*I;else if(M.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(M.sh.coefficients[O],I);N++}else if(M.isSunLight){const O=t.get(M);if(O.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const z=M.shadow,$=e.get(M);$.shadowIntensity=z.intensity,$.shadowBias=z.bias,$.shadowNormalBias=z.normalBias,$.shadowRadius=z.radius,$.shadowMapSize.copy(z.mapSize).multiply(z.getFrameExtents()),n.sunShadow[g]=$,n.sunShadowMap[g]=q;const tt=z.getViewportCount();for(let lt=0;lt<tt;lt++)n.sunShadowMatrix[x+lt]=z.getMatrix(lt),n.sunShadowCascade[x+lt]=z._cascadeData[lt];x+=tt,g++}n.sun[f]=O,f++}else if(M.isDirectionalLight){const O=t.get(M);if(O.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const z=M.shadow,$=e.get(M);$.shadowIntensity=z.intensity,$.shadowBias=z.bias,$.shadowNormalBias=z.normalBias,$.shadowRadius=z.radius,$.shadowMapSize=z.mapSize,n.directionalShadow[m]=$,n.directionalShadowMap[m]=q,n.directionalShadowMatrix[m]=M.shadow.matrix,E++}n.directional[m]=O,m++}else if(M.isSpotLight){const O=t.get(M);O.position.setFromMatrixPosition(M.matrixWorld),O.color.copy(C).multiplyScalar(I),O.distance=D,O.coneCos=Math.cos(M.angle),O.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),O.decay=M.decay,n.spot[y]=O;const z=M.shadow;if(M.map&&(n.spotLightMap[v]=M.map,v++,z.updateMatrices(M),M.castShadow&&R++),n.spotLightMatrix[y]=z.matrix,M.castShadow){const $=e.get(M);$.shadowIntensity=z.intensity,$.shadowBias=z.bias,$.shadowNormalBias=z.normalBias,$.shadowRadius=z.radius,$.shadowMapSize=z.mapSize,n.spotShadow[y]=$,n.spotShadowMap[y]=q,P++}y++}else if(M.isRectAreaLight){const O=t.get(M);O.color.copy(C).multiplyScalar(I),O.halfWidth.set(M.width*.5,0,0),O.halfHeight.set(0,M.height*.5,0),n.rectArea[T]=O,T++}else if(M.isPointLight){const O=t.get(M);if(O.color.copy(M.color).multiplyScalar(M.intensity),O.distance=M.distance,O.decay=M.decay,M.castShadow){const z=M.shadow,$=e.get(M);$.shadowIntensity=z.intensity,$.shadowBias=z.bias,$.shadowNormalBias=z.normalBias,$.shadowRadius=z.radius,$.shadowMapSize=z.mapSize,$.shadowCameraNear=z.camera.near,$.shadowCameraFar=z.camera.far,n.pointShadow[p]=$,n.pointShadowMap[p]=q,n.pointShadowMatrix[p]=M.shadow.matrix,w++}n.point[p]=O,p++}else if(M.isHemisphereLight){const O=t.get(M);O.skyColor.copy(M.color).multiplyScalar(I),O.groundColor.copy(M.groundColor).multiplyScalar(I),n.hemi[_]=O,_++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const F=n.hash;(F.sunLength!==f||F.directionalLength!==m||F.pointLength!==p||F.spotLength!==y||F.rectAreaLength!==T||F.hemiLength!==_||F.numSunShadows!==g||F.numDirectionalShadows!==E||F.numPointShadows!==w||F.numSpotShadows!==P||F.numSpotMaps!==v||F.numLightProbes!==N)&&(n.sun.length=f,n.directional.length=m,n.spot.length=y,n.rectArea.length=T,n.point.length=p,n.hemi.length=_,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+v-R,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=N,F.sunLength=f,F.directionalLength=m,F.pointLength=p,F.spotLength=y,F.rectAreaLength=T,F.hemiLength=_,F.numSunShadows=g,F.numDirectionalShadows=E,F.numPointShadows=w,F.numSpotShadows=P,F.numSpotMaps=v,F.numLightProbes=N,n.version=C_++)}function l(c,h){let d=0,u=0,f=0,g=0,x=0,m=0;const p=h.matrixWorldInverse;for(let y=0,T=c.length;y<T;y++){const _=c[y];if(_.isSunLight){const E=n.sun[d];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(p),d++}else if(_.isDirectionalLight){const E=n.directional[u];E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),u++}else if(_.isSpotLight){const E=n.spot[g];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),g++}else if(_.isRectAreaLight){const E=n.rectArea[x];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(p),o.identity(),r.copy(_.matrixWorld),r.premultiply(p),o.extractRotation(r),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),x++}else if(_.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){const E=n.hemi[m];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(p),m++}}}return{setup:a,setupView:l,state:n}}function Ad(i){const t=new L_(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function D_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ad(i),t.set(s,[a])):r>=o.length?(a=new Ad(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const I_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,k_=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],U_=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Rd=new Ce,Pr=new U,Wl=new U;function F_(i,t,e){let n=new Jh;const s=new Ft,r=new Ft,o=new Fe,a=new Wm,l=new qm,c={},h=e.maxTextureSize,d={[ki]:xn,[xn]:ki,[Sn]:Sn},u=new Ne({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:I_,fragmentShader:N_}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new ke;g.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new le(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xr;let p=this.type;this.render=function(w,P,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===L0&&(Ht("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xr);const R=i.getRenderTarget(),N=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),B=i.state;B.setBlending(fi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const S=p!==this.type;S&&P.traverse(function(M){M.material&&(Array.isArray(M.material)?M.material.forEach(C=>C.needsUpdate=!0):M.material.needsUpdate=!0)});for(let M=0,C=w.length;M<C;M++){const I=w[M],D=I.shadow;if(D===void 0){Ht("WebGLShadowMap:",I,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const q=D.getFrameExtents();s.multiply(q),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,D.mapSize.y=r.y));const O=i.state.buffers.depth.getReversed();if(D.camera._reversedDepth=O,D.map===null||S===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===Hr){if(I.isPointLight){Ht("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new dn(s.x,s.y,{format:Es,type:vn,minFilter:Ke,magFilter:Ke,generateMipmaps:!1}),D.map.texture.name=I.name+".shadowMap",D.map.depthTexture=new to(s.x,s.y,ui),D.map.depthTexture.name=I.name+".shadowMapDepth",D.map.depthTexture.format=Ui,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=he,D.map.depthTexture.magFilter=he}else I.isPointLight?(D.map=new up(s.x),D.map.depthTexture=new Bm(s.x,pi)):(D.map=new dn(s.x,s.y),D.map.depthTexture=new to(s.x,s.y,pi)),D.map.depthTexture.name=I.name+".shadowMap",D.map.depthTexture.format=Ui,this.type===Xr?(D.map.depthTexture.compareFunction=O?qh:Wh,D.map.depthTexture.minFilter=Ke,D.map.depthTexture.magFilter=Ke):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=he,D.map.depthTexture.magFilter=he);D.camera.updateProjectionMatrix()}D.map.isWebGLCubeRenderTarget!==!0&&(D.map.width!==s.x||D.map.height!==s.y)&&D.map.setSize(s.x,s.y);const z=D.map.isWebGLCubeRenderTarget?6:D.getViewportCount();I.isPointLight!==!0&&D.updateMatrices(I,v);for(let $=0;$<z;$++){const tt=D.getCamera($);if(I.isPointLight){const lt=D.camera,It=D.matrix,ft=I.distance||lt.far;ft!==lt.far&&(lt.far=ft,lt.updateProjectionMatrix()),Pr.setFromMatrixPosition(I.matrixWorld),lt.position.copy(Pr),Wl.copy(lt.position),Wl.add(k_[$]),lt.up.copy(U_[$]),lt.lookAt(Wl),lt.updateMatrixWorld(),It.makeTranslation(-Pr.x,-Pr.y,-Pr.z),Rd.multiplyMatrices(lt.projectionMatrix,lt.matrixWorldInverse),D._frustum.setFromProjectionMatrix(Rd,lt.coordinateSystem,lt.reversedDepth)}if(D.map.isWebGLCubeRenderTarget)i.setRenderTarget(D.map,$),i.clear();else{$===0&&(i.setRenderTarget(D.map),i.clear());const lt=D.getViewport($);o.set(r.x*lt.x,r.y*lt.y,r.x*lt.z,r.y*lt.w),B.viewport(o)}n=D.getFrustum($),_(P,v,tt,I,this.type)}D.isPointLightShadow!==!0&&this.type===Hr&&y(D,v),D.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(R,N,F)};function y(w,P){const v=t.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new dn(s.x,s.y,{format:Es,type:vn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,v,u,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,v,f,x,null)}function T(w,P,v,R){let N=null;const F=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(F!==void 0)N=F;else if(N=v.isPointLight===!0?l:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=N.uuid,S=P.uuid;let M=c[B];M===void 0&&(M={},c[B]=M);let C=M[S];C===void 0&&(C=N.clone(),M[S]=C,P.addEventListener("dispose",E)),N=C}if(N.visible=P.visible,N.wireframe=P.wireframe,R===Hr?N.side=P.shadowSide!==null?P.shadowSide:P.side:N.side=P.shadowSide!==null?P.shadowSide:d[P.side],N.alphaMap=P.alphaMap,N.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,N.map=P.map,N.clipShadows=P.clipShadows,N.clippingPlanes=P.clippingPlanes,N.clipIntersection=P.clipIntersection,N.displacementMap=P.displacementMap,N.displacementScale=P.displacementScale,N.displacementBias=P.displacementBias,N.wireframeLinewidth=P.wireframeLinewidth,N.linewidth=P.linewidth,v.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const B=i.properties.get(N);B.light=v}return N}function _(w,P,v,R,N){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&N===Hr)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const S=t.update(w),M=w.material;if(Array.isArray(M)){const C=S.groups;for(let I=0,D=C.length;I<D;I++){const q=C[I],O=M[q.materialIndex];if(O&&O.visible){const z=T(w,O,R,N);w.onBeforeShadow(i,w,P,v,S,z,q),i.renderBufferDirect(v,null,S,z,w,q),w.onAfterShadow(i,w,P,v,S,z,q)}}}else if(M.visible){const C=T(w,M,R,N);w.onBeforeShadow(i,w,P,v,S,C,null),i.renderBufferDirect(v,null,S,C,w,null),w.onAfterShadow(i,w,P,v,S,C,null)}}const B=w.children;for(let S=0,M=B.length;S<M;S++)_(B[S],P,v,R,N)}function E(w){w.target.removeEventListener("dispose",E);for(const v in c){const R=c[v],N=w.target.uuid;N in R&&(R[N].dispose(),delete R[N])}}}function O_(i,t){function e(){let V=!1;const xt=new Fe;let st=null;const vt=new Fe(0,0,0,0);return{setMask:function(wt){st!==wt&&!V&&(i.colorMask(wt,wt,wt,wt),st=wt)},setLocked:function(wt){V=wt},setClear:function(wt,ot,Ut,Lt,Te){Te===!0&&(wt*=Lt,ot*=Lt,Ut*=Lt),xt.set(wt,ot,Ut,Lt),vt.equals(xt)===!1&&(i.clearColor(wt,ot,Ut,Lt),vt.copy(xt))},reset:function(){V=!1,st=null,vt.set(-1,0,0,0)}}}function n(){let V=!1,xt=!1,st=null,vt=null,wt=null;return{setReversed:function(ot){if(xt!==ot){const Ut=t.get("EXT_clip_control");ot?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),xt=ot;const Lt=wt;wt=null,this.setClear(Lt)}},getReversed:function(){return xt},setTest:function(ot){ot?j(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(ot){st!==ot&&!V&&(i.depthMask(ot),st=ot)},setFunc:function(ot){if(xt&&(ot=um[ot]),vt!==ot){switch(ot){case Lc:i.depthFunc(i.NEVER);break;case Dc:i.depthFunc(i.ALWAYS);break;case Ic:i.depthFunc(i.LESS);break;case Kr:i.depthFunc(i.LEQUAL);break;case Nc:i.depthFunc(i.EQUAL);break;case kc:i.depthFunc(i.GEQUAL);break;case Uc:i.depthFunc(i.GREATER);break;case Fc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}vt=ot}},setLocked:function(ot){V=ot},setClear:function(ot){wt!==ot&&(wt=ot,xt&&(ot=1-ot),i.clearDepth(ot))},reset:function(){V=!1,st=null,vt=null,wt=null,xt=!1}}}function s(){let V=!1,xt=null,st=null,vt=null,wt=null,ot=null,Ut=null,Lt=null,Te=null;return{setTest:function(ue){V||(ue?j(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(ue){xt!==ue&&!V&&(i.stencilMask(ue),xt=ue)},setFunc:function(ue,zn,jn){(st!==ue||vt!==zn||wt!==jn)&&(i.stencilFunc(ue,zn,jn),st=ue,vt=zn,wt=jn)},setOp:function(ue,zn,jn){(ot!==ue||Ut!==zn||Lt!==jn)&&(i.stencilOp(ue,zn,jn),ot=ue,Ut=zn,Lt=jn)},setLocked:function(ue){V=ue},setClear:function(ue){Te!==ue&&(i.clearStencil(ue),Te=ue)},reset:function(){V=!1,xt=null,st=null,vt=null,wt=null,ot=null,Ut=null,Lt=null,Te=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,T=null,_=null,E=null,w=null,P=null,v=new Ot(0,0,0),R=0,N=!1,F=null,B=null,S=null,M=null,C=null;const I=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,q=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(O)[1]),D=q>=1):O.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),D=q>=2);let z=null,$={};const tt=i.getParameter(i.SCISSOR_BOX),lt=i.getParameter(i.VIEWPORT),It=new Fe().fromArray(tt),ft=new Fe().fromArray(lt);function At(V,xt,st,vt){const wt=new Uint8Array(4),ot=i.createTexture();i.bindTexture(V,ot),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<st;Ut++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,vt,0,i.RGBA,i.UNSIGNED_BYTE,wt):i.texImage2D(xt+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,wt);return ot}const G={};G[i.TEXTURE_2D]=At(i.TEXTURE_2D,i.TEXTURE_2D,1),G[i.TEXTURE_CUBE_MAP]=At(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[i.TEXTURE_2D_ARRAY]=At(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),G[i.TEXTURE_3D]=At(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(i.DEPTH_TEST),o.setFunc(Kr),Jt(!1),De(Au),j(i.CULL_FACE),oe(fi);function j(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function ht(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function Pt(V,xt){return u[V]!==xt?(i.bindFramebuffer(V,xt),u[V]=xt,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=xt),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function St(V,xt){let st=g,vt=!1;if(V){st=f.get(xt),st===void 0&&(st=[],f.set(xt,st));const wt=V.textures;if(st.length!==wt.length||st[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,Ut=wt.length;ot<Ut;ot++)st[ot]=i.COLOR_ATTACHMENT0+ot;st.length=wt.length,vt=!0}}else st[0]!==i.BACK&&(st[0]=i.BACK,vt=!0);vt&&i.drawBuffers(st)}function qt(V){return x!==V?(i.useProgram(V),x=V,!0):!1}const Oe={[ir]:i.FUNC_ADD,[I0]:i.FUNC_SUBTRACT,[N0]:i.FUNC_REVERSE_SUBTRACT};Oe[k0]=i.MIN,Oe[U0]=i.MAX;const Kt={[F0]:i.ZERO,[O0]:i.ONE,[B0]:i.SRC_COLOR,[Uf]:i.SRC_ALPHA,[q0]:i.SRC_ALPHA_SATURATE,[V0]:i.DST_COLOR,[H0]:i.DST_ALPHA,[z0]:i.ONE_MINUS_SRC_COLOR,[Ff]:i.ONE_MINUS_SRC_ALPHA,[W0]:i.ONE_MINUS_DST_COLOR,[G0]:i.ONE_MINUS_DST_ALPHA,[X0]:i.CONSTANT_COLOR,[$0]:i.ONE_MINUS_CONSTANT_COLOR,[Y0]:i.CONSTANT_ALPHA,[K0]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(V,xt,st,vt,wt,ot,Ut,Lt,Te,ue){if(V===fi){m===!0&&(ht(i.BLEND),m=!1);return}if(m===!1&&(j(i.BLEND),m=!0),V!==D0){if(V!==p||ue!==N){if((y!==ir||E!==ir)&&(i.blendEquation(i.FUNC_ADD),y=ir,E=ir),ue)switch(V){case $r:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ra:i.blendFunc(i.ONE,i.ONE);break;case Ru:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Cu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:se("WebGLState: Invalid blending: ",V);break}else switch(V){case $r:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ra:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ru:se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cu:se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:se("WebGLState: Invalid blending: ",V);break}T=null,_=null,w=null,P=null,v.set(0,0,0),R=0,p=V,N=ue}return}wt=wt||xt,ot=ot||st,Ut=Ut||vt,(xt!==y||wt!==E)&&(i.blendEquationSeparate(Oe[xt],Oe[wt]),y=xt,E=wt),(st!==T||vt!==_||ot!==w||Ut!==P)&&(i.blendFuncSeparate(Kt[st],Kt[vt],Kt[ot],Kt[Ut]),T=st,_=vt,w=ot,P=Ut),(Lt.equals(v)===!1||Te!==R)&&(i.blendColor(Lt.r,Lt.g,Lt.b,Te),v.copy(Lt),R=Te),p=V,N=!1}function Ee(V,xt){V.side===Sn?ht(i.CULL_FACE):j(i.CULL_FACE);let st=V.side===xn;xt&&(st=!st),Jt(st),V.blending===$r&&V.transparent===!1?oe(fi):oe(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const vt=V.stencilWrite;a.setTest(vt),vt&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),_n(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function Jt(V){F!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),F=V)}function De(V){V!==C0?(j(i.CULL_FACE),V!==B&&(V===Au?i.cullFace(i.BACK):V===P0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),B=V}function je(V){V!==S&&(D&&i.lineWidth(V),S=V)}function _n(V,xt,st){V?(j(i.POLYGON_OFFSET_FILL),(M!==xt||C!==st)&&(M=xt,C=st,o.getReversed()&&(xt=-xt),i.polygonOffset(xt,st))):ht(i.POLYGON_OFFSET_FILL)}function Ue(V){V?j(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function We(V){V===void 0&&(V=i.TEXTURE0+I-1),z!==V&&(i.activeTexture(V),z=V)}function X(V,xt,st){st===void 0&&(z===null?st=i.TEXTURE0+I-1:st=z);let vt=$[st];vt===void 0&&(vt={type:void 0,texture:void 0},$[st]=vt),(vt.type!==V||vt.texture!==xt)&&(z!==st&&(i.activeTexture(st),z=st),i.bindTexture(V,xt||G[V]),vt.type=V,vt.texture=xt)}function nn(){const V=$[z];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function xe(){try{i.compressedTexImage2D(...arguments)}catch(V){se("WebGLState:",V)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(V){se("WebGLState:",V)}}function b(){try{i.texSubImage2D(...arguments)}catch(V){se("WebGLState:",V)}}function Y(){try{i.texSubImage3D(...arguments)}catch(V){se("WebGLState:",V)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(V){se("WebGLState:",V)}}function et(){try{i.compressedTexSubImage3D(...arguments)}catch(V){se("WebGLState:",V)}}function dt(){try{i.texStorage2D(...arguments)}catch(V){se("WebGLState:",V)}}function pt(){try{i.texStorage3D(...arguments)}catch(V){se("WebGLState:",V)}}function it(){try{i.texImage2D(...arguments)}catch(V){se("WebGLState:",V)}}function rt(){try{i.texImage3D(...arguments)}catch(V){se("WebGLState:",V)}}function mt(V){return d[V]!==void 0?d[V]:i.getParameter(V)}function Nt(V,xt){d[V]!==xt&&(i.pixelStorei(V,xt),d[V]=xt)}function yt(V){It.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),It.copy(V))}function gt(V){ft.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),ft.copy(V))}function kt(V,xt){let st=c.get(xt);st===void 0&&(st=new WeakMap,c.set(xt,st));let vt=st.get(V);vt===void 0&&(vt=i.getUniformBlockIndex(xt,V.name),st.set(V,vt))}function Bt(V,xt){const vt=c.get(xt).get(V);l.get(xt)!==vt&&(i.uniformBlockBinding(xt,vt,V.__bindingPointIndex),l.set(xt,vt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},z=null,$={},u={},f=new WeakMap,g=[],x=null,m=!1,p=null,y=null,T=null,_=null,E=null,w=null,P=null,v=new Ot(0,0,0),R=0,N=!1,F=null,B=null,S=null,M=null,C=null,It.set(0,0,i.canvas.width,i.canvas.height),ft.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:ht,bindFramebuffer:Pt,drawBuffers:St,useProgram:qt,setBlending:oe,setMaterial:Ee,setFlipSided:Jt,setCullFace:De,setLineWidth:je,setPolygonOffset:_n,setScissorTest:Ue,activeTexture:We,bindTexture:X,unbindTexture:nn,compressedTexImage2D:xe,compressedTexImage3D:L,texImage2D:it,texImage3D:rt,pixelStorei:Nt,getParameter:mt,updateUBOMapping:kt,uniformBlockBinding:Bt,texStorage2D:dt,texStorage3D:pt,texSubImage2D:b,texSubImage3D:Y,compressedTexSubImage2D:J,compressedTexSubImage3D:et,scissor:yt,viewport:gt,reset:Wt}}function B_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ft,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,b){return g?new OffscreenCanvas(L,b):Ia("canvas")}function m(L,b,Y){let J=1;const et=xe(L);if((et.width>Y||et.height>Y)&&(J=Y/Math.max(et.width,et.height)),J<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const dt=Math.floor(J*et.width),pt=Math.floor(J*et.height);u===void 0&&(u=x(dt,pt));const it=b?x(dt,pt):u;return it.width=dt,it.height=pt,it.getContext("2d").drawImage(L,0,0,dt,pt),Ht("WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+dt+"x"+pt+")."),it}else return"data"in L&&Ht("WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),L;return L}function p(L){return L.generateMipmaps}function y(L){i.generateMipmap(L)}function T(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(L,b,Y,J,et,dt=!1){if(L!==null){if(i[L]!==void 0)return i[L];Ht("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let pt;J&&(pt=t.get("EXT_texture_norm16"),pt||Ht("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let it=b;if(b===i.RED&&(Y===i.FLOAT&&(it=i.R32F),Y===i.HALF_FLOAT&&(it=i.R16F),Y===i.UNSIGNED_BYTE&&(it=i.R8),Y===i.UNSIGNED_SHORT&&pt&&(it=pt.R16_EXT),Y===i.SHORT&&pt&&(it=pt.R16_SNORM_EXT)),b===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.R8UI),Y===i.UNSIGNED_SHORT&&(it=i.R16UI),Y===i.UNSIGNED_INT&&(it=i.R32UI),Y===i.BYTE&&(it=i.R8I),Y===i.SHORT&&(it=i.R16I),Y===i.INT&&(it=i.R32I)),b===i.RG&&(Y===i.FLOAT&&(it=i.RG32F),Y===i.HALF_FLOAT&&(it=i.RG16F),Y===i.UNSIGNED_BYTE&&(it=i.RG8),Y===i.UNSIGNED_SHORT&&pt&&(it=pt.RG16_EXT),Y===i.SHORT&&pt&&(it=pt.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.RG8UI),Y===i.UNSIGNED_SHORT&&(it=i.RG16UI),Y===i.UNSIGNED_INT&&(it=i.RG32UI),Y===i.BYTE&&(it=i.RG8I),Y===i.SHORT&&(it=i.RG16I),Y===i.INT&&(it=i.RG32I)),b===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(it=i.RGB16UI),Y===i.UNSIGNED_INT&&(it=i.RGB32UI),Y===i.BYTE&&(it=i.RGB8I),Y===i.SHORT&&(it=i.RGB16I),Y===i.INT&&(it=i.RGB32I)),b===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(it=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(it=i.RGBA16UI),Y===i.UNSIGNED_INT&&(it=i.RGBA32UI),Y===i.BYTE&&(it=i.RGBA8I),Y===i.SHORT&&(it=i.RGBA16I),Y===i.INT&&(it=i.RGBA32I)),b===i.RGB&&(Y===i.UNSIGNED_SHORT&&pt&&(it=pt.RGB16_EXT),Y===i.SHORT&&pt&&(it=pt.RGB16_SNORM_EXT),Y===i.UNSIGNED_INT_5_9_9_9_REV&&(it=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(it=i.R11F_G11F_B10F)),b===i.RGBA){const rt=dt?Da:jt.getTransfer(et);Y===i.FLOAT&&(it=i.RGBA32F),Y===i.HALF_FLOAT&&(it=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(it=rt===me?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT&&pt&&(it=pt.RGBA16_EXT),Y===i.SHORT&&pt&&(it=pt.RGBA16_SNORM_EXT),Y===i.UNSIGNED_SHORT_4_4_4_4&&(it=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(it=i.RGB5_A1)}return(it===i.R16F||it===i.R32F||it===i.RG16F||it===i.RG32F||it===i.RGBA16F||it===i.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function E(L,b){let Y;return L?b===null||b===pi||b===Qr?Y=i.DEPTH24_STENCIL8:b===ui?Y=i.DEPTH32F_STENCIL8:b===Jr&&(Y=i.DEPTH24_STENCIL8,Ht("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===pi||b===Qr?Y=i.DEPTH_COMPONENT24:b===ui?Y=i.DEPTH_COMPONENT32F:b===Jr&&(Y=i.DEPTH_COMPONENT16),Y}function w(L,b){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==he&&L.minFilter!==Ke?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function P(L){const b=L.target;b.removeEventListener("dispose",P),R(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&d.delete(b)}function v(L){const b=L.target;b.removeEventListener("dispose",v),F(b)}function R(L){const b=n.get(L);if(b.__webglInit===void 0)return;const Y=L.source,J=f.get(Y);if(J){const et=J[b.__cacheKey];et.usedTimes--,et.usedTimes===0&&N(L),Object.keys(J).length===0&&f.delete(Y)}n.remove(L)}function N(L){const b=n.get(L);i.deleteTexture(b.__webglTexture);const Y=L.source,J=f.get(Y);delete J[b.__cacheKey],o.memory.textures--}function F(L){const b=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let et=0;et<b.__webglFramebuffer[J].length;et++)i.deleteFramebuffer(b.__webglFramebuffer[J][et]);else i.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)i.deleteFramebuffer(b.__webglFramebuffer[J]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const Y=L.textures;for(let J=0,et=Y.length;J<et;J++){const dt=n.get(Y[J]);dt.__webglTexture&&(i.deleteTexture(dt.__webglTexture),o.memory.textures--),n.remove(Y[J])}n.remove(L)}let B=0;function S(){B=0}function M(){return B}function C(L){B=L}function I(){const L=B;return L>=s.maxTextures&&Ht("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,L}function D(L){const b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.colorSpace),b.join()}function q(L,b){const Y=n.get(L);if(L.isVideoTexture&&X(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&Y.__version!==L.version){const J=L.image;if(J===null)Ht("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Ht("WebGLRenderer: Texture marked for update but image is incomplete");else{ht(Y,L,b);return}}else L.isExternalTexture&&(Y.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+b)}function O(L,b){const Y=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&Y.__version!==L.version){ht(Y,L,b);return}else L.isExternalTexture&&(Y.__webglTexture=L.sourceTexture?L.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+b)}function z(L,b){const Y=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&Y.__version!==L.version){ht(Y,L,b);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+b)}function $(L,b){const Y=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&Y.__version!==L.version){Pt(Y,L,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+b)}const tt={[Zr]:i.REPEAT,[Ti]:i.CLAMP_TO_EDGE,[Oc]:i.MIRRORED_REPEAT},lt={[he]:i.NEAREST,[Q0]:i.NEAREST_MIPMAP_NEAREST,[xo]:i.NEAREST_MIPMAP_LINEAR,[Ke]:i.LINEAR,[dl]:i.LINEAR_MIPMAP_NEAREST,[_s]:i.LINEAR_MIPMAP_LINEAR},It={[nm]:i.NEVER,[am]:i.ALWAYS,[im]:i.LESS,[Wh]:i.LEQUAL,[sm]:i.EQUAL,[qh]:i.GEQUAL,[rm]:i.GREATER,[om]:i.NOTEQUAL};function ft(L,b){if(b.type===ui&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Ke||b.magFilter===dl||b.magFilter===xo||b.magFilter===_s||b.minFilter===Ke||b.minFilter===dl||b.minFilter===xo||b.minFilter===_s)&&Ht("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,tt[b.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,tt[b.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,tt[b.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,lt[b.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,lt[b.minFilter]),b.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,It[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===he||b.minFilter!==xo&&b.minFilter!==_s||b.type===ui&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(L,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function At(L,b){let Y=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",P));const J=b.source;let et=f.get(J);et===void 0&&(et={},f.set(J,et));const dt=D(b);if(dt!==L.__cacheKey){et[dt]===void 0&&(et[dt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),et[dt].usedTimes++;const pt=et[L.__cacheKey];pt!==void 0&&(et[L.__cacheKey].usedTimes--,pt.usedTimes===0&&N(b)),L.__cacheKey=dt,L.__webglTexture=et[dt].texture}return Y}function G(L,b,Y){return Math.floor(Math.floor(L/Y)/b)}function j(L,b,Y,J){const dt=L.updateRanges;if(dt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,Y,J,b.data);else{dt.sort((Nt,yt)=>Nt.start-yt.start);let pt=0;for(let Nt=1;Nt<dt.length;Nt++){const yt=dt[pt],gt=dt[Nt],kt=yt.start+yt.count,Bt=G(gt.start,b.width,4),Wt=G(yt.start,b.width,4);gt.start<=kt+1&&Bt===Wt&&G(gt.start+gt.count-1,b.width,4)===Bt?yt.count=Math.max(yt.count,gt.start+gt.count-yt.start):(++pt,dt[pt]=gt)}dt.length=pt+1;const it=e.getParameter(i.UNPACK_ROW_LENGTH),rt=e.getParameter(i.UNPACK_SKIP_PIXELS),mt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Nt=0,yt=dt.length;Nt<yt;Nt++){const gt=dt[Nt],kt=Math.floor(gt.start/4),Bt=Math.ceil(gt.count/4),Wt=kt%b.width,V=Math.floor(kt/b.width),xt=Bt,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),e.pixelStorei(i.UNPACK_SKIP_ROWS,V),e.texSubImage2D(i.TEXTURE_2D,0,Wt,V,xt,st,Y,J,b.data)}L.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,it),e.pixelStorei(i.UNPACK_SKIP_PIXELS,rt),e.pixelStorei(i.UNPACK_SKIP_ROWS,mt)}}function ht(L,b,Y){let J=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(J=i.TEXTURE_3D);const et=At(L,b),dt=b.source;e.bindTexture(J,L.__webglTexture,i.TEXTURE0+Y);const pt=n.get(dt);if(dt.version!==pt.__version||et===!0){if(e.activeTexture(i.TEXTURE0+Y),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const st=jt.getPrimaries(jt.workingColorSpace),vt=b.colorSpace===Ji?null:jt.getPrimaries(b.colorSpace),wt=b.colorSpace===Ji||st===vt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt)}e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let rt=m(b.image,!1,s.maxTextureSize);rt=nn(b,rt);const mt=r.convert(b.format,b.colorSpace),Nt=r.convert(b.type);let yt=_(b.internalFormat,mt,Nt,b.normalized,b.colorSpace,b.isVideoTexture);ft(J,b);let gt;const kt=b.mipmaps,Bt=b.isVideoTexture!==!0,Wt=pt.__version===void 0||et===!0,V=dt.dataReady,xt=w(b,rt);if(b.isDepthTexture)yt=E(b.format===bs,b.type),Wt&&(Bt?e.texStorage2D(i.TEXTURE_2D,1,yt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,yt,rt.width,rt.height,0,mt,Nt,null));else if(b.isDataTexture)if(kt.length>0){Bt&&Wt&&e.texStorage2D(i.TEXTURE_2D,xt,yt,kt[0].width,kt[0].height);for(let st=0,vt=kt.length;st<vt;st++)gt=kt[st],Bt?V&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,st,yt,gt.width,gt.height,0,mt,Nt,gt.data);b.generateMipmaps=!1}else Bt?(Wt&&e.texStorage2D(i.TEXTURE_2D,xt,yt,rt.width,rt.height),V&&j(b,rt,mt,Nt)):e.texImage2D(i.TEXTURE_2D,0,yt,rt.width,rt.height,0,mt,Nt,rt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Bt&&Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,yt,kt[0].width,kt[0].height,rt.depth);for(let st=0,vt=kt.length;st<vt;st++)if(gt=kt[st],b.format!==Zn)if(mt!==null)if(Bt){if(V)if(b.layerUpdates.size>0){const wt=od(gt.width,gt.height,b.format,b.type);for(const ot of b.layerUpdates){const Ut=gt.data.subarray(ot*wt/gt.data.BYTES_PER_ELEMENT,(ot+1)*wt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,ot,gt.width,gt.height,1,mt,Ut)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,gt.width,gt.height,rt.depth,mt,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,yt,gt.width,gt.height,rt.depth,0,gt.data,0,0);else Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?V&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,gt.width,gt.height,rt.depth,mt,Nt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,yt,gt.width,gt.height,rt.depth,0,mt,Nt,gt.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Bt&&Wt&&e.texStorage2D(i.TEXTURE_2D,xt,yt,kt[0].width,kt[0].height);for(let st=0,vt=kt.length;st<vt;st++)gt=kt[st],b.format!==Zn?mt!==null?Bt?V&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,st,yt,gt.width,gt.height,0,gt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?V&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,gt.width,gt.height,mt,Nt,gt.data):e.texImage2D(i.TEXTURE_2D,st,yt,gt.width,gt.height,0,mt,Nt,gt.data)}else if(b.isDataArrayTexture)if(Bt){if(Wt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,yt,rt.width,rt.height,rt.depth),V)if(b.layerUpdates.size>0){const st=od(rt.width,rt.height,b.format,b.type);for(const vt of b.layerUpdates){const wt=rt.data.subarray(vt*st/rt.data.BYTES_PER_ELEMENT,(vt+1)*st/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,vt,rt.width,rt.height,1,mt,Nt,wt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,mt,Nt,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,yt,rt.width,rt.height,rt.depth,0,mt,Nt,rt.data);else if(b.isData3DTexture)Bt?(Wt&&e.texStorage3D(i.TEXTURE_3D,xt,yt,rt.width,rt.height,rt.depth),V&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,mt,Nt,rt.data)):e.texImage3D(i.TEXTURE_3D,0,yt,rt.width,rt.height,rt.depth,0,mt,Nt,rt.data);else if(b.isFramebufferTexture){if(Wt)if(Bt)e.texStorage2D(i.TEXTURE_2D,xt,yt,rt.width,rt.height);else{let st=rt.width,vt=rt.height;for(let wt=0;wt<xt;wt++)e.texImage2D(i.TEXTURE_2D,wt,yt,st,vt,0,mt,Nt,null),st>>=1,vt>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),rt.parentNode!==st){st.appendChild(rt),d.add(b),st.onpaint=vt=>{const wt=vt.changedElements;for(const ot of d)wt.includes(ot.image)&&(ot.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,rt);else{const wt=i.RGBA,ot=i.RGBA,Ut=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,wt,ot,Ut,rt)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(kt.length>0){if(Bt&&Wt){const st=xe(kt[0]);e.texStorage2D(i.TEXTURE_2D,xt,yt,st.width,st.height)}for(let st=0,vt=kt.length;st<vt;st++)gt=kt[st],Bt?V&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,mt,Nt,gt):e.texImage2D(i.TEXTURE_2D,st,yt,mt,Nt,gt);b.generateMipmaps=!1}else if(Bt){if(Wt){const st=xe(rt);e.texStorage2D(i.TEXTURE_2D,xt,yt,st.width,st.height)}V&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Nt,rt)}else e.texImage2D(i.TEXTURE_2D,0,yt,mt,Nt,rt);p(b)&&y(J),pt.__version=dt.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function Pt(L,b,Y){if(b.image.length!==6)return;const J=At(L,b),et=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+Y);const dt=n.get(et);if(et.version!==dt.__version||J===!0){e.activeTexture(i.TEXTURE0+Y);const pt=jt.getPrimaries(jt.workingColorSpace),it=b.colorSpace===Ji?null:jt.getPrimaries(b.colorSpace),rt=b.colorSpace===Ji||pt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt);const mt=b.isCompressedTexture||b.image[0].isCompressedTexture,Nt=b.image[0]&&b.image[0].isDataTexture,yt=[];for(let ot=0;ot<6;ot++)!mt&&!Nt?yt[ot]=m(b.image[ot],!0,s.maxCubemapSize):yt[ot]=Nt?b.image[ot].image:b.image[ot],yt[ot]=nn(b,yt[ot]);const gt=yt[0],kt=r.convert(b.format,b.colorSpace),Bt=r.convert(b.type),Wt=_(b.internalFormat,kt,Bt,b.normalized,b.colorSpace),V=b.isVideoTexture!==!0,xt=dt.__version===void 0||J===!0,st=et.dataReady;let vt=w(b,gt);ft(i.TEXTURE_CUBE_MAP,b);let wt;if(mt){V&&xt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,Wt,gt.width,gt.height);for(let ot=0;ot<6;ot++){wt=yt[ot].mipmaps;for(let Ut=0;Ut<wt.length;Ut++){const Lt=wt[Ut];b.format!==Zn?kt!==null?V?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,0,0,Lt.width,Lt.height,kt,Lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,Wt,Lt.width,Lt.height,0,Lt.data):Ht("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,0,0,Lt.width,Lt.height,kt,Bt,Lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut,Wt,Lt.width,Lt.height,0,kt,Bt,Lt.data)}}}else{if(wt=b.mipmaps,V&&xt){wt.length>0&&vt++;const ot=xe(yt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,vt,Wt,ot.width,ot.height)}for(let ot=0;ot<6;ot++)if(Nt){V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,yt[ot].width,yt[ot].height,kt,Bt,yt[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Wt,yt[ot].width,yt[ot].height,0,kt,Bt,yt[ot].data);for(let Ut=0;Ut<wt.length;Ut++){const Te=wt[Ut].image[ot].image;V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,0,0,Te.width,Te.height,kt,Bt,Te.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,Wt,Te.width,Te.height,0,kt,Bt,Te.data)}}else{V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,kt,Bt,yt[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,Wt,kt,Bt,yt[ot]);for(let Ut=0;Ut<wt.length;Ut++){const Lt=wt[Ut];V?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,0,0,kt,Bt,Lt.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Ut+1,Wt,kt,Bt,Lt.image[ot])}}}p(b)&&y(i.TEXTURE_CUBE_MAP),dt.__version=et.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function St(L,b,Y,J,et,dt){const pt=r.convert(Y.format,Y.colorSpace),it=r.convert(Y.type),rt=_(Y.internalFormat,pt,it,Y.normalized,Y.colorSpace),mt=n.get(b),Nt=n.get(Y);if(Nt.__renderTarget=b,!mt.__hasExternalTextures){const yt=Math.max(1,b.width>>dt),gt=Math.max(1,b.height>>dt);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,dt,rt,yt,gt,b.depth,0,pt,it,null):e.texImage2D(et,dt,rt,yt,gt,0,pt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,L),We(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,et,Nt.__webglTexture,0,Ue(b)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,et,Nt.__webglTexture,dt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function qt(L,b,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,L),b.depthBuffer){const J=b.depthTexture,et=J&&J.isDepthTexture?J.type:null,dt=E(b.stencilBuffer,et),pt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;We(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ue(b),dt,b.width,b.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue(b),dt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,dt,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pt,i.RENDERBUFFER,L)}else{const J=b.textures;for(let et=0;et<J.length;et++){const dt=J[et],pt=r.convert(dt.format,dt.colorSpace),it=r.convert(dt.type),rt=_(dt.internalFormat,pt,it,dt.normalized,dt.colorSpace);We(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ue(b),rt,b.width,b.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue(b),rt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,rt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(L,b,Y){const J=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const et=n.get(b.depthTexture);if(et.__renderTarget=b,(!et.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J){if(et.__webglInit===void 0&&(et.__webglInit=!0,b.depthTexture.addEventListener("dispose",P)),et.__webglTexture===void 0){et.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),ft(i.TEXTURE_CUBE_MAP,b.depthTexture);const mt=r.convert(b.depthTexture.format),Nt=r.convert(b.depthTexture.type);let yt;b.depthTexture.format===Ui?yt=i.DEPTH_COMPONENT24:b.depthTexture.format===bs&&(yt=i.DEPTH24_STENCIL8);for(let gt=0;gt<6;gt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,yt,b.width,b.height,0,mt,Nt,null)}}else q(b.depthTexture,0);const dt=et.__webglTexture,pt=Ue(b),it=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+Y:i.TEXTURE_2D,rt=b.depthTexture.format===bs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===Ui)We(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,it,dt,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,rt,it,dt,0);else if(b.depthTexture.format===bs)We(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,it,dt,0,pt):i.framebufferTexture2D(i.FRAMEBUFFER,rt,it,dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Kt(L){const b=n.get(L),Y=L.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==L.depthTexture){const J=L.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),J){const et=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,J.removeEventListener("dispose",et)};J.addEventListener("dispose",et),b.__depthDisposeCallback=et}b.__boundDepthTexture=J}if(L.depthTexture&&!b.__autoAllocateDepthBuffer)if(Y)for(let J=0;J<6;J++)Oe(b.__webglFramebuffer[J],L,J);else{const J=L.texture.mipmaps;J&&J.length>0?Oe(b.__webglFramebuffer[0],L,0):Oe(b.__webglFramebuffer,L,0)}else if(Y){b.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[J]),b.__webglDepthbuffer[J]===void 0)b.__webglDepthbuffer[J]=i.createRenderbuffer(),qt(b.__webglDepthbuffer[J],L,!1);else{const et=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=b.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,dt)}}else{const J=L.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),qt(b.__webglDepthbuffer,L,!1);else{const et=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,dt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(L,b,Y){const J=n.get(L);b!==void 0&&St(J.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&Kt(L)}function Ee(L){const b=L.texture,Y=n.get(L),J=n.get(b);L.addEventListener("dispose",v);const et=L.textures,dt=L.isWebGLCubeRenderTarget===!0,pt=et.length>1;if(pt||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=b.version,o.memory.textures++),dt){Y.__webglFramebuffer=[];for(let it=0;it<6;it++)if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer[it]=[];for(let rt=0;rt<b.mipmaps.length;rt++)Y.__webglFramebuffer[it][rt]=i.createFramebuffer()}else Y.__webglFramebuffer[it]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer=[];for(let it=0;it<b.mipmaps.length;it++)Y.__webglFramebuffer[it]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(pt)for(let it=0,rt=et.length;it<rt;it++){const mt=n.get(et[it]);mt.__webglTexture===void 0&&(mt.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&We(L)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let it=0;it<et.length;it++){const rt=et[it];Y.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[it]);const mt=r.convert(rt.format,rt.colorSpace),Nt=r.convert(rt.type),yt=_(rt.internalFormat,mt,Nt,rt.normalized,rt.colorSpace,L.isXRRenderTarget===!0),gt=Ue(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,yt,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,Y.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),qt(Y.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(dt){e.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),ft(i.TEXTURE_CUBE_MAP,b);for(let it=0;it<6;it++)if(b.mipmaps&&b.mipmaps.length>0)for(let rt=0;rt<b.mipmaps.length;rt++)St(Y.__webglFramebuffer[it][rt],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,rt);else St(Y.__webglFramebuffer[it],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(b)&&y(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(pt){for(let it=0,rt=et.length;it<rt;it++){const mt=et[it],Nt=n.get(mt);let yt=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(yt=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(yt,Nt.__webglTexture),ft(yt,mt),St(Y.__webglFramebuffer,L,mt,i.COLOR_ATTACHMENT0+it,yt,0),p(mt)&&y(yt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(it=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,J.__webglTexture),ft(it,b),b.mipmaps&&b.mipmaps.length>0)for(let rt=0;rt<b.mipmaps.length;rt++)St(Y.__webglFramebuffer[rt],L,b,i.COLOR_ATTACHMENT0,it,rt);else St(Y.__webglFramebuffer,L,b,i.COLOR_ATTACHMENT0,it,0);p(b)&&y(it),e.unbindTexture()}L.depthBuffer&&Kt(L)}function Jt(L){const b=L.textures;for(let Y=0,J=b.length;Y<J;Y++){const et=b[Y];if(p(et)){const dt=T(L),pt=n.get(et).__webglTexture;e.bindTexture(dt,pt),y(dt),e.unbindTexture()}}}const De=[],je=[];function _n(L){if(L.samples>0){if(We(L)===!1){const b=L.textures,Y=L.width,J=L.height;let et=i.COLOR_BUFFER_BIT;const dt=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=n.get(L),it=b.length>1;if(it)for(let mt=0;mt<b.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer);const rt=L.texture.mipmaps;rt&&rt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let mt=0;mt<b.length;mt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);const Nt=n.get(b[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Nt,0)}i.blitFramebuffer(0,0,Y,J,0,0,Y,J,et,i.NEAREST),l===!0&&(De.length=0,je.length=0,De.push(i.COLOR_ATTACHMENT0+mt),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(De.push(dt),je.push(dt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,De))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let mt=0;mt<b.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,pt.__webglColorRenderbuffer[mt]);const Nt=n.get(b[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,Nt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&l){const b=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Ue(L){return Math.min(s.maxSamples,L.samples)}function We(L){const b=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function X(L){const b=o.render.frame;h.get(L)!==b&&(h.set(L,b),L.update())}function nn(L,b){const Y=L.colorSpace,J=L.format,et=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||Y!==La&&Y!==Ji&&(jt.getTransfer(Y)===me?(J!==Zn||et!==wn)&&Ht("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):se("WebGLTextures: Unsupported texture color space:",Y)),b}function xe(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=S,this.getTextureUnits=M,this.setTextureUnits=C,this.setTexture2D=q,this.setTexture2DArray=O,this.setTexture3D=z,this.setTextureCube=$,this.rebindTextures=oe,this.setupRenderTarget=Ee,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=_n,this.setupDepthRenderbuffer=Kt,this.setupFrameBufferTexture=St,this.useMultisampledRTT=We,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function z_(i,t){function e(n,s=Ji){let r;const o=jt.getTransfer(s);if(n===wn)return i.UNSIGNED_BYTE;if(n===Bh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zf)return i.BYTE;if(n===Hf)return i.SHORT;if(n===Jr)return i.UNSIGNED_SHORT;if(n===Oh)return i.INT;if(n===pi)return i.UNSIGNED_INT;if(n===ui)return i.FLOAT;if(n===vn)return i.HALF_FLOAT;if(n===Wf)return i.ALPHA;if(n===qf)return i.RGB;if(n===Zn)return i.RGBA;if(n===Ui)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===Xf)return i.RED;if(n===Hh)return i.RED_INTEGER;if(n===Es)return i.RG;if(n===Gh)return i.RG_INTEGER;if(n===Vh)return i.RGBA_INTEGER;if(n===ma||n===ga||n===xa||n===va)if(o===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bc||n===zc||n===Hc||n===Gc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Bc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Gc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vc||n===Wc||n===qc||n===Xc||n===$c||n===Ca||n===Yc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Vc||n===Wc)return o===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qc)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Xc)return r.COMPRESSED_R11_EAC;if(n===$c)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ca)return r.COMPRESSED_RG11_EAC;if(n===Yc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Kc||n===Zc||n===Jc||n===Qc||n===jc||n===th||n===eh||n===nh||n===ih||n===sh||n===rh||n===oh||n===ah||n===lh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Kc)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zc)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jc)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Qc)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jc)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===th)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===eh)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===nh)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ih)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===sh)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===rh)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===oh)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ah)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===lh)return o===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ch||n===hh||n===uh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ch)return o===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===uh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dh||n===fh||n===Pa||n===ph)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===dh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===fh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Pa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ph)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const H_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,G_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class V_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new ip(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ne({vertexShader:H_,fragmentShader:G_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new le(new Ii(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W_ extends Cs{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new V_,p={},y=e.getContextAttributes();let T=null,_=null;const E=[],w=[],P=new Ft;let v=null,R=null;const N=new Ln;N.viewport=new Fe;const F=new Ln;F.viewport=new Fe;const B=[N,F],S=new Zm;let M=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let j=E[G];return j===void 0&&(j=new _l,E[G]=j),j.getTargetRaySpace()},this.getControllerGrip=function(G){let j=E[G];return j===void 0&&(j=new _l,E[G]=j),j.getGripSpace()},this.getHand=function(G){let j=E[G];return j===void 0&&(j=new _l,E[G]=j),j.getHandSpace()};function I(G){const j=w.indexOf(G.inputSource);if(j===-1)return;const ht=E[j];ht!==void 0&&(ht.update(G.inputSource,G.frame,c||o),ht.dispatchEvent({type:G.type,data:G.inputSource}))}function D(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",q);for(let G=0;G<E.length;G++){const j=w[G];j!==null&&(w[G]=null,E[G].disconnect(j))}M=null,C=null,m.reset();for(const G in p)delete p[G];if(t.setRenderTarget(T),f=null,u=null,d=null,s=null,_=null,At.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(P.width,P.height,!1),R!==null){const G=R.camera;G.fov=R.fov,G.zoom=R.zoom,G.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&Ht("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&Ht("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",D),s.addEventListener("inputsourceschange",q),y.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,Pt=null,St=null;y.depth&&(St=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=y.stencil?bs:Ui,Pt=y.stencil?Qr:pi);const qt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(qt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new dn(u.textureWidth,u.textureHeight,{format:Zn,type:wn,depthTexture:new to(u.textureWidth,u.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const ht={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ht),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new dn(f.framebufferWidth,f.framebufferHeight,{format:Zn,type:wn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),At.setContext(s),At.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(G){for(let j=0;j<G.removed.length;j++){const ht=G.removed[j],Pt=w.indexOf(ht);Pt>=0&&(w[Pt]=null,E[Pt].disconnect(ht))}for(let j=0;j<G.added.length;j++){const ht=G.added[j];let Pt=w.indexOf(ht);if(Pt===-1){for(let qt=0;qt<E.length;qt++)if(qt>=w.length){w.push(ht),Pt=qt;break}else if(w[qt]===null){w[qt]=ht,Pt=qt;break}if(Pt===-1)break}const St=E[Pt];St&&St.connect(ht)}}const O=new U,z=new U;function $(G,j,ht){O.setFromMatrixPosition(j.matrixWorld),z.setFromMatrixPosition(ht.matrixWorld);const Pt=O.distanceTo(z),St=j.projectionMatrix.elements,qt=ht.projectionMatrix.elements,Oe=St[14]/(St[10]-1),Kt=St[14]/(St[10]+1),oe=(St[9]+1)/St[5],Ee=(St[9]-1)/St[5],Jt=(St[8]-1)/St[0],De=(qt[8]+1)/qt[0],je=Oe*Jt,_n=Oe*De,Ue=Pt/(-Jt+De),We=Ue*-Jt;if(j.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(We),G.translateZ(Ue),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),St[10]===-1)G.projectionMatrix.copy(j.projectionMatrix),G.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const X=Oe+Ue,nn=Kt+Ue,xe=je-We,L=_n+(Pt-We),b=oe*Kt/nn*X,Y=Ee*Kt/nn*X;G.projectionMatrix.makePerspective(xe,L,b,Y,X,nn),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function tt(G,j){j===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(j.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let j=G.near,ht=G.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(ht=m.depthFar)),S.near=F.near=N.near=j,S.far=F.far=N.far=ht,(M!==S.near||C!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),M=S.near,C=S.far),S.layers.mask=G.layers.mask|6,N.layers.mask=S.layers.mask&-5,F.layers.mask=S.layers.mask&-3;const Pt=G.parent,St=S.cameras;tt(S,Pt);for(let qt=0;qt<St.length;qt++)tt(St[qt],Pt);St.length===2?$(S,N,F):S.projectionMatrix.copy(N.projectionMatrix),R===null&&G.isPerspectiveCamera&&(R={camera:G,fov:G.fov,zoom:G.zoom}),lt(G,S,Pt)};function lt(G,j,ht){ht===null?G.matrix.copy(j.matrixWorld):(G.matrix.copy(ht.matrixWorld),G.matrix.invert(),G.matrix.multiply(j.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(j.projectionMatrix),G.projectionMatrixInverse.copy(j.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=mh*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(G){l=G,u!==null&&(u.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(S)},this.getCameraTexture=function(G){return p[G]};let It=null;function ft(G,j){if(h=j.getViewerPose(c||o),g=j,h!==null){const ht=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Pt=!1;ht.length!==S.cameras.length&&(S.cameras.length=0,Pt=!0);for(let Kt=0;Kt<ht.length;Kt++){const oe=ht[Kt];let Ee=null;if(f!==null)Ee=f.getViewport(oe);else{const De=d.getViewSubImage(u,oe);Ee=De.viewport,Kt===0&&(t.setRenderTargetTextures(_,De.colorTexture,De.depthStencilTexture),t.setRenderTarget(_))}let Jt=B[Kt];Jt===void 0&&(Jt=new Ln,Jt.layers.enable(Kt),Jt.viewport=new Fe,B[Kt]=Jt),Jt.matrix.fromArray(oe.transform.matrix),Jt.matrix.decompose(Jt.position,Jt.quaternion,Jt.scale),Jt.projectionMatrix.fromArray(oe.projectionMatrix),Jt.projectionMatrixInverse.copy(Jt.projectionMatrix).invert(),Jt.viewport.set(Ee.x,Ee.y,Ee.width,Ee.height),Kt===0&&(S.matrix.copy(Jt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),Pt===!0&&S.cameras.push(Jt)}const St=s.enabledFeatures;if(St&&St.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Kt=d.getDepthInformation(ht[0]);Kt&&Kt.isValid&&Kt.texture&&m.init(Kt,s.renderState)}if(St&&St.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let Kt=0;Kt<ht.length;Kt++){const oe=ht[Kt].camera;if(oe){let Ee=p[oe];Ee||(Ee=new ip,p[oe]=Ee);const Jt=d.getCameraImage(oe);Ee.sourceTexture=Jt}}}}for(let ht=0;ht<E.length;ht++){const Pt=w[ht],St=E[ht];Pt!==null&&St!==void 0&&St.update(Pt,j,c||o)}It&&It(G,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const At=new cp;At.setAnimationLoop(ft),this.setAnimationLoop=function(G){It=G},this.dispose=function(){}}}const q_=new Ce,gp=new Vt;gp.set(-1,0,0,0,1,0,0,0,1);function X_(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,sp(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,T,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,T):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===xn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===xn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),T=y.envMap,_=y.envMapRotation;T&&(m.envMap.value=T,m.envMapRotation.value.setFromMatrix4(q_.makeRotationFromEuler(_)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(gp),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=T*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===xn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function $_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,E){const w=E.program;n.uniformBlockBinding(_,w)}function c(_,E){let w=s[_.id];w===void 0&&(m(_),w=h(_),s[_.id]=w,_.addEventListener("dispose",y));const P=E.program;n.updateUBOMapping(_,P);const v=t.render.frame;r[_.id]!==v&&(u(_),r[_.id]=v)}function h(_){const E=d();_.__bindingPointIndex=E;const w=i.createBuffer(),P=_.__size,v=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,P,v),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,w),w}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return se("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const E=s[_.id],w=_.uniforms,P=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let v=0,R=w.length;v<R;v++){const N=w[v];if(Array.isArray(N))for(let F=0,B=N.length;F<B;F++)f(N[F],v,F,P);else f(N,v,0,P)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,E,w,P){if(x(_,E,w,P)===!0){const v=_.__offset,R=_.value;if(Array.isArray(R)){let N=0;for(let F=0;F<R.length;F++){const B=R[F],S=p(B);g(B,_.__data,N),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(N+=S.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(R,_.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,v,_.__data)}}function g(_,E,w){typeof _=="number"||typeof _=="boolean"?E[0]=_:_.isMatrix3?(E[0]=_.elements[0],E[1]=_.elements[1],E[2]=_.elements[2],E[3]=0,E[4]=_.elements[3],E[5]=_.elements[4],E[6]=_.elements[5],E[7]=0,E[8]=_.elements[6],E[9]=_.elements[7],E[10]=_.elements[8],E[11]=0):ArrayBuffer.isView(_)?E.set(new _.constructor(_.buffer,_.byteOffset,E.length)):_.toArray(E,w)}function x(_,E,w,P){const v=_.value,R=E+"_"+w;if(P[R]===void 0)return typeof v=="number"||typeof v=="boolean"?P[R]=v:ArrayBuffer.isView(v)?P[R]=v.slice():P[R]=v.clone(),!0;{const N=P[R];if(typeof v=="number"||typeof v=="boolean"){if(N!==v)return P[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(N.equals(v)===!1)return N.copy(v),!0}}return!1}function m(_){const E=_.uniforms;let w=0;const P=16;for(let R=0,N=E.length;R<N;R++){const F=Array.isArray(E[R])?E[R]:[E[R]];for(let B=0,S=F.length;B<S;B++){const M=F[B],C=Array.isArray(M.value)?M.value:[M.value];for(let I=0,D=C.length;I<D;I++){const q=C[I],O=p(q),z=w%P,$=z%O.boundary,tt=z+$;w+=$,tt!==0&&P-tt<O.storage&&(w+=P-tt),M.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),M.__offset=w,w+=O.storage}}}const v=w%P;return v>0&&(w+=P-v),_.__size=w,_.__cache={},this}function p(_){const E={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(E.boundary=4,E.storage=4):_.isVector2?(E.boundary=8,E.storage=8):_.isVector3||_.isColor?(E.boundary=16,E.storage=12):_.isVector4?(E.boundary=16,E.storage=16):_.isMatrix3?(E.boundary=48,E.storage=48):_.isMatrix4?(E.boundary=64,E.storage=64):_.isTexture?Ht("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(E.boundary=16,E.storage=_.byteLength):Ht("WebGLRenderer: Unsupported uniform value type.",_),E}function y(_){const E=_.target;E.removeEventListener("dispose",y);const w=o.indexOf(E.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function T(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:T}}const Y_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ni=null;function K_(){return ni===null&&(ni=new km(Y_,16,16,Es,vn),ni.name="DFG_LUT",ni.minFilter=Ke,ni.magFilter=Ke,ni.wrapS=Ti,ni.wrapT=Ti,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class Z_{constructor(t={}){const{canvas:e=cm(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=wn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;const x=f,m=new Set([Vh,Gh,Hh]),p=new Set([wn,pi,Jr,Qr,Bh,zh]),y=new Uint32Array(4),T=new Int32Array(4),_=new U;let E=null,w=null;const P=[],v=[];let R=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let F=!1,B=null,S=null,M=null,C=null;this._outputColorSpace=Ve;let I=0,D=0,q=null,O=-1,z=null;const $=new Fe,tt=new Fe;let lt=null;const It=new Ot(0);let ft=0,At=e.width,G=e.height,j=1,ht=null,Pt=null;const St=new Fe(0,0,At,G),qt=new Fe(0,0,At,G);let Oe=!1;const Kt=new Jh;let oe=!1,Ee=!1;const Jt=new Ce,De=new U,je=new Fe,_n={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function We(){return q===null?j:1}let X=n;function nn(A,H){return e.getContext(A,H)}let xe,L,b,Y,J,et,dt,pt,it,rt,mt,Nt,yt,gt,kt,Bt,Wt,V,xt,st,vt,wt,ot;try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Lh}`),e.addEventListener("webglcontextlost",Te,!1),e.addEventListener("webglcontextrestored",ue,!1),e.addEventListener("webglcontextcreationerror",zn,!1),X===null){const H="webgl2";if(X=nn(H,A),X===null)throw nn(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ut()}catch(A){throw e.removeEventListener("webglcontextlost",Te,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",zn,!1),se("WebGLRenderer: "+A.message),A}function Ut(){xe=new Kv(X),xe.init(),vt=new z_(X,xe),L=new Bv(X,xe,t,vt),b=new O_(X,xe),L.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),S=X.createFramebuffer(),M=X.createFramebuffer(),C=X.createFramebuffer(),Y=new Qv(X),J=new w_,et=new B_(X,xe,b,J,L,vt,Y),dt=new Yv(N),pt=new tg(X),wt=new Fv(X,pt),it=new Zv(X,pt,Y,wt),rt=new ty(X,it,pt,wt,Y),V=new jv(X,L,et),kt=new zv(J),mt=new S_(N,dt,xe,L,wt,kt),Nt=new X_(N,J),yt=new T_,gt=new D_(xe),Wt=new Uv(N,dt,b,rt,g,l),Bt=new F_(N,rt,L),ot=new $_(X,Y,L,b),xt=new Ov(X,xe,Y),st=new Jv(X,xe,Y),Y.programs=mt.programs,N.capabilities=L,N.extensions=xe,N.properties=J,N.renderLists=yt,N.shadowMap=Bt,N.state=b,N.info=Y}x!==wn&&(R=new ny(x,e.width,e.height,a,s,r));const Lt=new W_(N,X);this.xr=Lt,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){const A=xe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=xe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(A){A!==void 0&&(j=A,this.setSize(At,G,!1))},this.getSize=function(A){return A.set(At,G)},this.setSize=function(A,H,Q=!0){if(Lt.isPresenting){Ht("WebGLRenderer: Can't change size while VR device is presenting.");return}At=A,G=H,e.width=Math.floor(A*j),e.height=Math.floor(H*j),Q===!0&&(e.style.width=A+"px",e.style.height=H+"px"),R!==null&&R.setSize(e.width,e.height),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(At*j,G*j).floor()},this.setDrawingBufferSize=function(A,H,Q){At=A,G=H,j=Q,e.width=Math.floor(A*Q),e.height=Math.floor(H*Q),this.setViewport(0,0,A,H)},this.setEffects=function(A){if(x===wn){se("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let H=0;H<A.length;H++)if(A[H].isOutputPass===!0){Ht("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy($)},this.getViewport=function(A){return A.copy(St)},this.setViewport=function(A,H,Q,K){A.isVector4?St.set(A.x,A.y,A.z,A.w):St.set(A,H,Q,K),b.viewport($.copy(St).multiplyScalar(j).round())},this.getScissor=function(A){return A.copy(qt)},this.setScissor=function(A,H,Q,K){A.isVector4?qt.set(A.x,A.y,A.z,A.w):qt.set(A,H,Q,K),b.scissor(tt.copy(qt).multiplyScalar(j).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(A){b.setScissorTest(Oe=A)},this.setOpaqueSort=function(A){ht=A},this.setTransparentSort=function(A){Pt=A},this.getClearColor=function(A){return A.copy(Wt.getClearColor())},this.setClearColor=function(){Wt.setClearColor(...arguments)},this.getClearAlpha=function(){return Wt.getClearAlpha()},this.setClearAlpha=function(){Wt.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,Q=!0){let K=0;if(A){let Z=!1;if(q!==null){const Mt=q.texture.format;Z=m.has(Mt)}if(Z){const Mt=q.texture.type,Tt=p.has(Mt),bt=Wt.getClearColor(),Rt=Wt.getClearAlpha(),Dt=bt.r,$t=bt.g,Zt=bt.b;Tt?(y[0]=Dt,y[1]=$t,y[2]=Zt,y[3]=Rt,X.clearBufferuiv(X.COLOR,0,y)):(T[0]=Dt,T[1]=$t,T[2]=Zt,T[3]=Rt,X.clearBufferiv(X.COLOR,0,T))}else K|=X.COLOR_BUFFER_BIT}H&&(K|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(K|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&X.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),B=A},this.dispose=function(){e.removeEventListener("webglcontextlost",Te,!1),e.removeEventListener("webglcontextrestored",ue,!1),e.removeEventListener("webglcontextcreationerror",zn,!1),Wt.dispose(),yt.dispose(),gt.dispose(),J.dispose(),dt.dispose(),rt.dispose(),wt.dispose(),ot.dispose(),mt.dispose(),Lt.dispose(),Lt.removeEventListener("sessionstart",vu),Lt.removeEventListener("sessionend",yu),cs.stop()};function Te(A){A.preventDefault(),Na("WebGLRenderer: Context Lost."),F=!0}function ue(){Na("WebGLRenderer: Context Restored."),F=!1;const A=Y.autoReset,H=Bt.enabled,Q=Bt.autoUpdate,K=Bt.needsUpdate,Z=Bt.type;Ut(),Y.autoReset=A,Bt.enabled=H,Bt.autoUpdate=Q,Bt.needsUpdate=K,Bt.type=Z}function zn(A){se("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function jn(A){const H=A.target;H.removeEventListener("dispose",jn),M0(H)}function M0(A){S0(A),J.remove(A)}function S0(A){const H=J.get(A).programs;H!==void 0&&(H.forEach(function(Q){mt.releaseProgram(Q)}),A.isShaderMaterial&&mt.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,Q,K,Z,Mt){H===null&&(H=_n);const Tt=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,bt=T0(A,H,Q,K,Z);b.setMaterial(K,Tt);let Rt=Q.index,Dt=1;if(K.wireframe===!0){if(Rt=it.getWireframeAttribute(Q),Rt===void 0)return;Dt=2}const $t=Q.drawRange,Zt=Q.attributes.position;let Ct=$t.start*Dt,de=($t.start+$t.count)*Dt;Mt!==null&&(Ct=Math.max(Ct,Mt.start*Dt),de=Math.min(de,(Mt.start+Mt.count)*Dt)),Rt!==null?(Ct=Math.max(Ct,0),de=Math.min(de,Rt.count)):Zt!=null&&(Ct=Math.max(Ct,0),de=Math.min(de,Zt.count));const qe=de-Ct;if(qe<0||qe===1/0)return;wt.setup(Z,K,bt,Q,Rt);let Pe,Me=xt;if(Rt!==null&&(Pe=pt.get(Rt),Me=st,Me.setIndex(Pe)),Z.isMesh)K.wireframe===!0?(b.setLineWidth(K.wireframeLinewidth*We()),Me.setMode(X.LINES)):Me.setMode(X.TRIANGLES);else if(Z.isLine){let sn=K.linewidth;sn===void 0&&(sn=1),b.setLineWidth(sn*We()),Z.isLineSegments?Me.setMode(X.LINES):Z.isLineLoop?Me.setMode(X.LINE_LOOP):Me.setMode(X.LINE_STRIP)}else Z.isPoints?Me.setMode(X.POINTS):Z.isSprite&&Me.setMode(X.TRIANGLES);if(Z.isBatchedMesh)if(xe.get("WEBGL_multi_draw"))Me.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const sn=Z._multiDrawStarts,Et=Z._multiDrawCounts,pn=Z._multiDrawCount,ie=Rt?pt.get(Rt).bytesPerElement:1,kn=J.get(K).currentProgram.getUniforms();for(let ti=0;ti<pn;ti++)kn.setValue(X,"_gl_DrawID",ti),Me.render(sn[ti]/ie,Et[ti])}else if(Z.isInstancedMesh)Me.renderInstances(Ct,qe,Z.count);else if(Q.isInstancedBufferGeometry){const sn=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Et=Math.min(Q.instanceCount,sn);Me.renderInstances(Ct,qe,Et)}else Me.render(Ct,qe)};function xu(A,H,Q,K){B!==null&&A.isNodeMaterial&&B.setObject(K,A),oe===!0&&kt.setState(A,Q,!1),A.transparent===!0&&A.side===Sn&&A.forceSinglePass===!1?(A.side=xn,A.needsUpdate=!0,go(A,H,K),A.side=ki,A.needsUpdate=!0,go(A,H,K),A.side=Sn):go(A,H,K)}this.compile=function(A,H,Q=null){Q===null&&(Q=A),B!==null&&B.renderStart(A,H,Q),w=gt.get(Q),w.init(H),v.push(w),Q.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(w.pushLight(Z),Z.castShadow&&w.pushShadow(Z))}),A!==Q&&A.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(w.pushLight(Z),Z.castShadow&&w.pushShadow(Z))}),w.setupLights(),B!==null&&B.updateLights(w.state.lightsArray),Ee=this.localClippingEnabled,oe=kt.init(this.clippingPlanes,Ee),oe===!0&&kt.setGlobalState(this.clippingPlanes,H),B!==null&&Bt.render(w.state.shadowsArray,Q,H);const K=new Set;return A.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Mt=Z.material;if(Mt)if(Array.isArray(Mt))for(let Tt=0;Tt<Mt.length;Tt++){const bt=Mt[Tt];xu(bt,Q,H,Z),K.add(bt)}else xu(Mt,Q,H,Z),K.add(Mt)}),w=v.pop(),B!==null&&B.renderEnd(),K},this.compileAsync=function(A,H,Q=null){const K=this.compile(A,H,Q);return new Promise(Z=>{function Mt(){if(K.forEach(function(Tt){const Rt=J.get(Tt).currentProgram;(Rt===void 0||Rt.isReady())&&K.delete(Tt)}),K.size===0){Z(A);return}setTimeout(Mt,10)}xe.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let ll=null;function w0(A){ll&&ll(A)}function vu(){cs.stop()}function yu(){cs.start()}const cs=new cp;cs.setAnimationLoop(w0),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(A){ll=A,Lt.setAnimationLoop(A),A===null?cs.stop():cs.start()},Lt.addEventListener("sessionstart",vu),Lt.addEventListener("sessionend",yu),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;B!==null&&B.renderStart(A,H);const Q=Lt.enabled===!0&&Lt.isPresenting===!0,K=R!==null&&(q===null||Q)&&R.begin(N,q);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Lt.enabled===!0&&Lt.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Lt.cameraAutoUpdate===!0&&Lt.updateCamera(H),H=Lt.getCamera()),A.isScene===!0&&A.onBeforeRender(N,A,H,q),w=gt.get(A,v.length),w.init(H),w.state.textureUnits=et.getTextureUnits(),v.push(w),Jt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Kt.setFromProjectionMatrix(Jt,di,H.reversedDepth),Ee=this.localClippingEnabled,oe=kt.init(this.clippingPlanes,Ee),E=yt.get(A,P.length),E.init(),P.push(E),Lt.enabled===!0&&Lt.isPresenting===!0){const Tt=N.xr.getDepthSensingMesh();Tt!==null&&cl(Tt,H,-1/0,N.sortObjects)}cl(A,H,0,N.sortObjects),E.finish(),B!==null&&B.updateLights(w.state.lightsArray),N.sortObjects===!0&&E.sort(ht,Pt),Ue=Lt.enabled===!1||Lt.isPresenting===!1||Lt.hasDepthSensing()===!1,Ue&&Wt.addToRenderList(E,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&kt.beginShadows();const Z=w.state.shadowsArray;if(Bt.render(Z,A,H),oe===!0&&kt.endShadows(),(K&&R.hasRenderPass())===!1){const Tt=E.opaque,bt=E.transmissive;if(w.setupLights(),H.isArrayCamera){const Rt=H.cameras;if(bt.length>0)for(let Dt=0,$t=Rt.length;Dt<$t;Dt++){const Zt=Rt[Dt];bu(Tt,bt,A,Zt)}Ue&&Wt.render(A);for(let Dt=0,$t=Rt.length;Dt<$t;Dt++){const Zt=Rt[Dt];_u(E,A,Zt,Zt.viewport)}}else bt.length>0&&bu(Tt,bt,A,H),Ue&&Wt.render(A),_u(E,A,H)}q!==null&&D===0&&(et.updateMultisampleRenderTarget(q),et.updateRenderTargetMipmap(q)),K&&R.end(N),A.isScene===!0&&A.onAfterRender(N,A,H),wt.resetDefaultState(),O=-1,z=null,v.pop(),v.length>0?(w=v[v.length-1],et.setTextureUnits(w.state.textureUnits),oe===!0&&kt.setGlobalState(N.clippingPlanes,w.state.camera)):w=null,P.pop(),P.length>0?E=P[P.length-1]:E=null,B!==null&&B.renderEnd()};function cl(A,H,Q,K){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)Q=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(Kt)){K&&je.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Jt);const Tt=rt.update(A),bt=A.material;bt.visible&&E.push(A,Tt,bt,Q,je.z,null,H)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(Kt))){const Tt=rt.update(A),bt=A.material;if(K&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),je.copy(A.boundingSphere.center)):(Tt.boundingSphere===null&&Tt.computeBoundingSphere(),je.copy(Tt.boundingSphere.center)),je.applyMatrix4(A.matrixWorld).applyMatrix4(Jt)),Array.isArray(bt)){const Rt=Tt.groups;for(let Dt=0,$t=Rt.length;Dt<$t;Dt++){const Zt=Rt[Dt],Ct=bt[Zt.materialIndex];Ct&&Ct.visible&&E.push(A,Tt,Ct,Q,je.z,Zt,H)}}else bt.visible&&E.push(A,Tt,bt,Q,je.z,null,H)}}const Mt=A.children;for(let Tt=0,bt=Mt.length;Tt<bt;Tt++)cl(Mt[Tt],H,Q,K)}function _u(A,H,Q,K){const{opaque:Z,transmissive:Mt,transparent:Tt}=A;w.setupLightsView(Q),oe===!0&&kt.setGlobalState(N.clippingPlanes,Q),K&&b.viewport($.copy(K)),Z.length>0&&mo(Z,H,Q),Mt.length>0&&mo(Mt,H,Q),Tt.length>0&&mo(Tt,H,Q),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function bu(A,H,Q,K){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[K.id]===void 0){const Ct=xe.has("EXT_color_buffer_half_float")||xe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[K.id]=new dn(1,1,{generateMipmaps:!0,type:Ct?vn:wn,minFilter:_s,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:jt.workingColorSpace})}const Mt=w.state.transmissionRenderTarget[K.id],Tt=K.viewport||$;Mt.setSize(Tt.z*N.transmissionResolutionScale,Tt.w*N.transmissionResolutionScale);const bt=N.getRenderTarget(),Rt=N.getActiveCubeFace(),Dt=N.getActiveMipmapLevel();N.setRenderTarget(Mt),N.getClearColor(It),ft=N.getClearAlpha(),ft<1&&N.setClearColor(16777215,.5),N.clear(),Ue&&Wt.render(Q);const $t=N.toneMapping;N.toneMapping=Jn;const Zt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),w.setupLightsView(K),oe===!0&&kt.setGlobalState(N.clippingPlanes,K),mo(A,Q,K),et.updateMultisampleRenderTarget(Mt),et.updateRenderTargetMipmap(Mt),xe.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let de=0,qe=H.length;de<qe;de++){const Pe=H[de],{object:Me,geometry:sn,material:Et,group:pn}=Pe;if(Et.side===Sn&&Me.layers.test(K.layers)){const ie=Et.side;Et.side=xn,Et.needsUpdate=!0,Mu(Me,Q,K,sn,Et,pn),Et.side=ie,Et.needsUpdate=!0,Ct=!0}}Ct===!0&&(et.updateMultisampleRenderTarget(Mt),et.updateRenderTargetMipmap(Mt))}N.setRenderTarget(bt,Rt,Dt),N.setClearColor(It,ft),Zt!==void 0&&(K.viewport=Zt),N.toneMapping=$t}function mo(A,H,Q){const K=H.isScene===!0?H.overrideMaterial:null;for(let Z=0,Mt=A.length;Z<Mt;Z++){const Tt=A[Z],{object:bt,geometry:Rt,group:Dt}=Tt;let $t=Tt.material;$t.allowOverride===!0&&K!==null&&($t=K),bt.layers.test(Q.layers)&&Mu(bt,H,Q,Rt,$t,Dt)}}function Mu(A,H,Q,K,Z,Mt){B!==null&&Z.isNodeMaterial&&B.setObject(A,Z),A.onBeforeRender(N,H,Q,K,Z,Mt),A.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Z.onBeforeRender(N,H,Q,K,A,Mt),Z.transparent===!0&&Z.side===Sn&&Z.forceSinglePass===!1?(Z.side=xn,Z.needsUpdate=!0,N.renderBufferDirect(Q,H,K,Z,A,Mt),Z.side=ki,Z.needsUpdate=!0,N.renderBufferDirect(Q,H,K,Z,A,Mt),Z.side=Sn):N.renderBufferDirect(Q,H,K,Z,A,Mt),A.onAfterRender(N,H,Q,K,Z,Mt)}function go(A,H,Q){H.isScene!==!0&&(H=_n);const K=J.get(A),Z=w.state.lights,Mt=w.state.shadowsArray,Tt=Z.state.version,bt=mt.getParameters(A,Z.state,Mt,H,Q,w.state.lightProbeGridArray),Rt=mt.getProgramCacheKey(bt);let Dt=K.programs;K.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,K.fog=H.fog;const $t=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;K.envMap=dt.get(A.envMap||K.environment,$t),K.envMapRotation=K.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,Dt===void 0&&(A.addEventListener("dispose",jn),Dt=new Map,K.programs=Dt);let Zt=Dt.get(Rt);if(Zt!==void 0){if(K.currentProgram===Zt&&K.lightsStateVersion===Tt)return wu(A,bt),Zt}else bt.uniforms=mt.getUniforms(A),B!==null&&A.isNodeMaterial&&B.build(A,Q,bt),A.onBeforeCompile(bt,N),Zt=mt.acquireProgram(bt,Rt),Dt.set(Rt,Zt),K.uniforms=bt.uniforms;const Ct=K.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ct.clippingPlanes=kt.uniform),wu(A,bt),K.needsLights=R0(A),K.lightsStateVersion=Tt,K.needsLights&&(Ct.ambientLightColor.value=Z.state.ambient,Ct.lightProbe.value=Z.state.probe,Ct.sunLights.value=Z.state.sun,Ct.sunLightShadows.value=Z.state.sunShadow,Ct.directionalLights.value=Z.state.directional,Ct.directionalLightShadows.value=Z.state.directionalShadow,Ct.spotLights.value=Z.state.spot,Ct.spotLightShadows.value=Z.state.spotShadow,Ct.rectAreaLights.value=Z.state.rectArea,Ct.ltc_1.value=Z.state.rectAreaLTC1,Ct.ltc_2.value=Z.state.rectAreaLTC2,Ct.pointLights.value=Z.state.point,Ct.pointLightShadows.value=Z.state.pointShadow,Ct.hemisphereLights.value=Z.state.hemi,Ct.sunShadowMatrix.value=Z.state.sunShadowMatrix,Ct.sunShadowCascade.value=Z.state.sunShadowCascade,Ct.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ct.spotLightMatrix.value=Z.state.spotLightMatrix,Ct.spotLightMap.value=Z.state.spotLightMap,Ct.pointShadowMatrix.value=Z.state.pointShadowMatrix),K.lightProbeGrid=w.state.lightProbeGridArray.length>0,K.currentProgram=Zt,K.uniformsList=null,Zt}function Su(A){if(A.uniformsList===null){const H=A.currentProgram.getUniforms();A.uniformsList=_a.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function wu(A,H){const Q=J.get(A);Q.outputColorSpace=H.outputColorSpace,Q.batching=H.batching,Q.batchingColor=H.batchingColor,Q.instancing=H.instancing,Q.instancingColor=H.instancingColor,Q.instancingMorph=H.instancingMorph,Q.skinning=H.skinning,Q.morphTargets=H.morphTargets,Q.morphNormals=H.morphNormals,Q.morphColors=H.morphColors,Q.morphTargetsCount=H.morphTargetsCount,Q.numClippingPlanes=H.numClippingPlanes,Q.numIntersection=H.numClipIntersection,Q.vertexAlphas=H.vertexAlphas,Q.vertexTangents=H.vertexTangents,Q.toneMapping=H.toneMapping}function E0(A,H){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;_.setFromMatrixPosition(H.matrixWorld);for(let Q=0,K=A.length;Q<K;Q++){const Z=A[Q];if(Z.texture!==null&&Z.boundingBox.containsPoint(_))return Z}return null}function T0(A,H,Q,K,Z){H.isScene!==!0&&(H=_n),et.resetTextureUnits();const Mt=H.fog,Tt=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?H.environment:null,bt=q===null?N.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:jt.workingColorSpace,Rt=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Dt=dt.get(K.envMap||Tt,Rt),$t=K.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Zt=!!Q.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ct=!!Q.morphAttributes.position,de=!!Q.morphAttributes.normal,qe=!!Q.morphAttributes.color;let Pe=Jn;K.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Pe=N.toneMapping);const Me=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,sn=Me!==void 0?Me.length:0,Et=J.get(K),pn=w.state.lights;if(oe===!0&&(Ee===!0||A!==z)){const Ae=A===z&&K.id===O;kt.setState(K,A,Ae)}let ie=!1;K.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==pn.state.version||Et.outputColorSpace!==bt||Z.isBatchedMesh&&Et.batching===!1||!Z.isBatchedMesh&&Et.batching===!0||Z.isBatchedMesh&&Et.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Et.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Et.instancing===!1||!Z.isInstancedMesh&&Et.instancing===!0||Z.isSkinnedMesh&&Et.skinning===!1||!Z.isSkinnedMesh&&Et.skinning===!0||Z.isInstancedMesh&&Et.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Et.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Et.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Et.instancingMorph===!1&&Z.morphTexture!==null||Et.envMap!==Dt||K.fog===!0&&Et.fog!==Mt||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==kt.numPlanes||Et.numIntersection!==kt.numIntersection)||Et.vertexAlphas!==$t||Et.vertexTangents!==Zt||Et.morphTargets!==Ct||Et.morphNormals!==de||Et.morphColors!==qe||Et.toneMapping!==Pe||Et.morphTargetsCount!==sn||!!Et.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,Et.__version=K.version);let kn=Et.currentProgram;ie===!0&&(kn=go(K,H,Z),B&&K.isNodeMaterial&&B.onUpdateProgram(K,kn,Et));let ti=!1,Oi=!1,Ds=!1;const ye=kn.getUniforms(),ze=Et.uniforms;if(b.useProgram(kn.program)&&(ti=!0,Oi=!0,Ds=!0),K.id!==O&&(O=K.id,Oi=!0),Et.needsLights){const Ae=E0(w.state.lightProbeGridArray,Z);Et.lightProbeGrid!==Ae&&(Et.lightProbeGrid=Ae,Oi=!0)}if(ti||z!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ye.setValue(X,"projectionMatrix",A.projectionMatrix),ye.setValue(X,"viewMatrix",A.matrixWorldInverse);const zi=ye.map.cameraPosition;zi!==void 0&&zi.setValue(X,De.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&ye.setValue(X,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ye.setValue(X,"isOrthographic",A.isOrthographicCamera===!0),z!==A&&(z=A,Oi=!0,Ds=!0)}if(Et.needsLights&&(pn.state.sunShadowMap.length>0&&ye.setValue(X,"sunShadowMap",pn.state.sunShadowMap,et),pn.state.directionalShadowMap.length>0&&ye.setValue(X,"directionalShadowMap",pn.state.directionalShadowMap,et),pn.state.spotShadowMap.length>0&&ye.setValue(X,"spotShadowMap",pn.state.spotShadowMap,et),pn.state.pointShadowMap.length>0&&ye.setValue(X,"pointShadowMap",pn.state.pointShadowMap,et)),Z.isSkinnedMesh){ye.setOptional(X,Z,"bindMatrix"),ye.setOptional(X,Z,"bindMatrixInverse");const Ae=Z.skeleton;Ae&&(Ae.boneTexture===null&&Ae.computeBoneTexture(),ye.setValue(X,"boneTexture",Ae.boneTexture,et))}Z.isBatchedMesh&&(ye.setOptional(X,Z,"batchingTexture"),ye.setValue(X,"batchingTexture",Z._matricesTexture,et),ye.setOptional(X,Z,"batchingIdTexture"),ye.setValue(X,"batchingIdTexture",Z._indirectTexture,et),ye.setOptional(X,Z,"batchingColorTexture"),Z._colorsTexture!==null&&ye.setValue(X,"batchingColorTexture",Z._colorsTexture,et));const Bi=Q.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&V.update(Z,Q,kn),(Oi||Et.receiveShadow!==Z.receiveShadow)&&(Et.receiveShadow=Z.receiveShadow,ye.setValue(X,"receiveShadow",Z.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&H.environment!==null&&(ze.envMapIntensity.value=H.environmentIntensity),ze.dfgLUT!==void 0&&(ze.dfgLUT.value=K_()),Oi){if(ye.setValue(X,"toneMappingExposure",N.toneMappingExposure),Et.needsLights&&A0(ze,Ds),Mt&&K.fog===!0&&Nt.refreshFogUniforms(ze,Mt),Nt.refreshMaterialUniforms(ze,K,j,G,w.state.transmissionRenderTarget[A.id]),Et.needsLights&&Et.lightProbeGrid){const Ae=Et.lightProbeGrid;ze.probesSH.value=Ae.texture,ze.probesMin.value.copy(Ae.boundingBox.min),ze.probesMax.value.copy(Ae.boundingBox.max),ze.probesResolution.value.copy(Ae.resolution)}_a.upload(X,Su(Et),ze,et)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(_a.upload(X,Su(Et),ze,et),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ye.setValue(X,"center",Z.center),ye.setValue(X,"modelViewMatrix",Z.modelViewMatrix),ye.setValue(X,"normalMatrix",Z.normalMatrix),ye.setValue(X,"modelMatrix",Z.matrixWorld),K.uniformsGroups!==void 0){const Ae=K.uniformsGroups;for(let zi=0,Is=Ae.length;zi<Is;zi++){const Tu=Ae[zi];ot.update(Tu,kn),ot.bind(Tu,kn)}}return kn}function A0(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.sunLights.needsUpdate=H,A.sunLightShadows.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function R0(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return q},this.setRenderTargetTextures=function(A,H,Q){const K=J.get(A);K.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),J.get(A.texture).__webglTexture=H,J.get(A.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:Q,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){const Q=J.get(A);Q.__webglFramebuffer=H,Q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,Q=0){q=A,I=H,D=Q;let K=null,Z=!1,Mt=!1;if(A){const bt=J.get(A);if(bt.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(X.FRAMEBUFFER,bt.__webglFramebuffer),$.copy(A.viewport),tt.copy(A.scissor),lt=A.scissorTest,b.viewport($),b.scissor(tt),b.setScissorTest(lt),O=-1;return}else if(bt.__webglFramebuffer===void 0)et.setupRenderTarget(A);else if(bt.__hasExternalTextures)et.rebindTextures(A,J.get(A.texture).__webglTexture,J.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const $t=A.depthTexture;if(bt.__boundDepthTexture!==$t){if($t!==null&&J.has($t)&&(A.width!==$t.image.width||A.height!==$t.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");et.setupDepthRenderbuffer(A)}}const Rt=A.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(Mt=!0);const Dt=J.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Dt[H])?K=Dt[H][Q]:K=Dt[H],Z=!0):A.samples>0&&et.useMultisampledRTT(A)===!1?K=J.get(A).__webglMultisampledFramebuffer:Array.isArray(Dt)?K=Dt[Q]:K=Dt,$.copy(A.viewport),tt.copy(A.scissor),lt=A.scissorTest}else $.copy(St).multiplyScalar(j).floor(),tt.copy(qt).multiplyScalar(j).floor(),lt=Oe;if(Q!==0&&(K=S),b.bindFramebuffer(X.FRAMEBUFFER,K)&&b.drawBuffers(A,K),b.viewport($),b.scissor(tt),b.setScissorTest(lt),Z){const bt=J.get(A.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+H,bt.__webglTexture,Q)}else if(Mt){const bt=H;for(let Rt=0;Rt<A.textures.length;Rt++){const Dt=J.get(A.textures[Rt]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+Rt,Dt.__webglTexture,Q,bt)}}else if(A!==null&&Q!==0){const bt=J.get(A.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,bt.__webglTexture,Q)}O=-1};function Eu(A){const H=J.get(A);return(H.__readFormat!==A.format||H.__readType!==A.type)&&(H.__readFormat=A.format,H.__readType=A.type,H.__formatReadable=L.textureFormatReadable(A.format),H.__typeReadable=L.textureTypeReadable(A.type)),H}this.readRenderTargetPixels=function(A,H,Q,K,Z,Mt,Tt,bt=0){if(!(A&&A.isWebGLRenderTarget)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt){b.bindFramebuffer(X.FRAMEBUFFER,Rt);try{const Dt=A.textures[bt],$t=Dt.format,Zt=Dt.type;A.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+bt);const Ct=Eu(Dt);if(Ct.__formatReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-K&&Q>=0&&Q<=A.height-Z&&X.readPixels(H,Q,K,Z,vt.convert($t),vt.convert(Zt),Mt)}finally{const Dt=q!==null?J.get(q).__webglFramebuffer:null;b.bindFramebuffer(X.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(A,H,Q,K,Z,Mt,Tt,bt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Tt!==void 0&&(Rt=Rt[Tt]),Rt)if(H>=0&&H<=A.width-K&&Q>=0&&Q<=A.height-Z){b.bindFramebuffer(X.FRAMEBUFFER,Rt);const Dt=A.textures[bt],$t=Dt.format,Zt=Dt.type;A.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+bt);const Ct=Eu(Dt);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const de=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,de),X.bufferData(X.PIXEL_PACK_BUFFER,Mt.byteLength,X.STREAM_READ),X.readPixels(H,Q,K,Z,vt.convert($t),vt.convert(Zt),0),X.bindBuffer(X.PIXEL_PACK_BUFFER,null);const qe=q!==null?J.get(q).__webglFramebuffer:null;b.bindFramebuffer(X.FRAMEBUFFER,qe);const Pe=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await hm(X,Pe,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,de),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,Mt),X.bindBuffer(X.PIXEL_PACK_BUFFER,null),X.deleteBuffer(de),X.deleteSync(Pe),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,H=null,Q=0){const K=Math.pow(2,-Q),Z=Math.floor(A.image.width*K),Mt=Math.floor(A.image.height*K),Tt=H!==null?H.x:0,bt=H!==null?H.y:0;et.setTexture2D(A,0),X.copyTexSubImage2D(X.TEXTURE_2D,Q,0,0,Tt,bt,Z,Mt),b.unbindTexture()},this.copyTextureToTexture=function(A,H,Q=null,K=null,Z=0,Mt=0){let Tt,bt,Rt,Dt,$t,Zt,Ct,de,qe;const Pe=A.isCompressedTexture?A.mipmaps[Mt]:A.image;if(Q!==null)Tt=Q.max.x-Q.min.x,bt=Q.max.y-Q.min.y,Rt=Q.isBox3?Q.max.z-Q.min.z:1,Dt=Q.min.x,$t=Q.min.y,Zt=Q.isBox3?Q.min.z:0;else{const ze=Math.pow(2,-Z);Tt=Math.floor(Pe.width*ze),bt=Math.floor(Pe.height*ze),A.isDataArrayTexture?Rt=Pe.depth:A.isData3DTexture?Rt=Math.floor(Pe.depth*ze):Rt=1,Dt=0,$t=0,Zt=0}K!==null?(Ct=K.x,de=K.y,qe=K.z):(Ct=0,de=0,qe=0);const Me=vt.convert(H.format),sn=vt.convert(H.type);let Et;H.isData3DTexture?(et.setTexture3D(H,0),Et=X.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(et.setTexture2DArray(H,0),Et=X.TEXTURE_2D_ARRAY):(et.setTexture2D(H,0),Et=X.TEXTURE_2D),b.activeTexture(X.TEXTURE0),b.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,H.flipY),b.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),b.pixelStorei(X.UNPACK_ALIGNMENT,H.unpackAlignment);const pn=b.getParameter(X.UNPACK_ROW_LENGTH),ie=b.getParameter(X.UNPACK_IMAGE_HEIGHT),kn=b.getParameter(X.UNPACK_SKIP_PIXELS),ti=b.getParameter(X.UNPACK_SKIP_ROWS),Oi=b.getParameter(X.UNPACK_SKIP_IMAGES);b.pixelStorei(X.UNPACK_ROW_LENGTH,Pe.width),b.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Pe.height),b.pixelStorei(X.UNPACK_SKIP_PIXELS,Dt),b.pixelStorei(X.UNPACK_SKIP_ROWS,$t),b.pixelStorei(X.UNPACK_SKIP_IMAGES,Zt);const Ds=A.isDataArrayTexture||A.isData3DTexture,ye=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){const ze=J.get(A),Bi=J.get(H),Ae=J.get(ze.__renderTarget),zi=J.get(Bi.__renderTarget);b.bindFramebuffer(X.READ_FRAMEBUFFER,Ae.__webglFramebuffer),b.bindFramebuffer(X.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Is=0;Is<Rt;Is++)Ds&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,J.get(A).__webglTexture,Z,Zt+Is),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,J.get(H).__webglTexture,Mt,qe+Is)),X.blitFramebuffer(Dt,$t,Tt,bt,Ct,de,Tt,bt,X.DEPTH_BUFFER_BIT,X.NEAREST);b.bindFramebuffer(X.READ_FRAMEBUFFER,null),b.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(Z!==0||A.isRenderTargetTexture||J.has(A)){const ze=J.get(A),Bi=J.get(H);b.bindFramebuffer(X.READ_FRAMEBUFFER,M),b.bindFramebuffer(X.DRAW_FRAMEBUFFER,C);for(let Ae=0;Ae<Rt;Ae++)Ds?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,ze.__webglTexture,Z,Zt+Ae):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,ze.__webglTexture,Z),ye?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Bi.__webglTexture,Mt,qe+Ae):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Bi.__webglTexture,Mt),Z!==0?X.blitFramebuffer(Dt,$t,Tt,bt,Ct,de,Tt,bt,X.COLOR_BUFFER_BIT,X.NEAREST):ye?X.copyTexSubImage3D(Et,Mt,Ct,de,qe+Ae,Dt,$t,Tt,bt):X.copyTexSubImage2D(Et,Mt,Ct,de,Dt,$t,Tt,bt);b.bindFramebuffer(X.READ_FRAMEBUFFER,null),b.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else ye?A.isDataTexture||A.isData3DTexture?X.texSubImage3D(Et,Mt,Ct,de,qe,Tt,bt,Rt,Me,sn,Pe.data):H.isCompressedArrayTexture?X.compressedTexSubImage3D(Et,Mt,Ct,de,qe,Tt,bt,Rt,Me,Pe.data):X.texSubImage3D(Et,Mt,Ct,de,qe,Tt,bt,Rt,Me,sn,Pe):A.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,Mt,Ct,de,Tt,bt,Me,sn,Pe.data):A.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,Mt,Ct,de,Pe.width,Pe.height,Me,Pe.data):X.texSubImage2D(X.TEXTURE_2D,Mt,Ct,de,Tt,bt,Me,sn,Pe);b.pixelStorei(X.UNPACK_ROW_LENGTH,pn),b.pixelStorei(X.UNPACK_IMAGE_HEIGHT,ie),b.pixelStorei(X.UNPACK_SKIP_PIXELS,kn),b.pixelStorei(X.UNPACK_SKIP_ROWS,ti),b.pixelStorei(X.UNPACK_SKIP_IMAGES,Oi),Mt===0&&H.generateMipmaps&&X.generateMipmap(Et),b.unbindTexture()},this.initRenderTarget=function(A){J.get(A).__webglFramebuffer===void 0&&et.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?et.setTextureCube(A,0):A.isData3DTexture?et.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?et.setTexture2DArray(A,0):et.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){I=0,D=0,q=null,b.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}const ba={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class vr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const J_=new jh(-1,1,1,-1,0,1);class Q_ extends ke{constructor(){super(),this.setAttribute("position",new re([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new re([0,2,0,0,2,0],2))}}const j_=new Q_;class tu{constructor(t){this._mesh=new le(j_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,J_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class xp extends vr{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Ne?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=eo.clone(t.uniforms),this.material=new Ne({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new tu(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Cd extends vr{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class tb extends vr{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class eb{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Ft);this._width=n.width,this._height=n.height,e=new dn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new xp(ba),this.copyPass.material.blending=fi,this.timer=new Jm}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Cd!==void 0&&(o instanceof Cd?n=!0:o instanceof tb&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Ft);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class nb extends vr{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ot}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const ib={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ot(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class fr extends vr{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Ft(t.x,t.y):new Ft(256,256),this.clearColor=new Ot(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new dn(r,o,{type:vn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new dn(r,o,{type:vn,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new dn(r,o,{type:vn,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),o=Math.round(o/2)}const a=ib;this.highPassUniforms=eo.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ne({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ft(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=eo.clone(ba.uniforms),this.blendMaterial=new Ne({uniforms:this.copyUniforms,vertexShader:ba.vertexShader,fragmentShader:ba.fragmentShader,premultipliedAlpha:!0,blending:Ra,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ot,this._oldClearAlpha=1,this._basic=new Fi,this._fsQuad=new tu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ft(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=fr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=fr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[],n=t/3;for(let o=0;o<t;o++)e.push(.39894*Math.exp(-.5*o*o/(n*n))/n);const s=[],r=[];for(let o=1;o<t;o+=2){const a=e[o],l=o+1<t?e[o+1]:0,c=a+l;s.push((o*a+(o+1)*l)/c),r.push(c)}return new Ne({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ft(.5,.5)},direction:{value:new Ft(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new Ne({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}fr.BlurDirectionX=new Ft(1,0);fr.BlurDirectionY=new Ft(0,1);const Zo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class sb extends vr{constructor(){super(),this.isOutputPass=!0,this.uniforms=eo.clone(Zo.uniforms),this.material=new rp({name:Zo.name,uniforms:this.uniforms,vertexShader:Zo.vertexShader,fragmentShader:Zo.fragmentShader}),this._fsQuad=new tu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},jt.getTransfer(this._outputColorSpace)===me&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Dh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ih?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Nh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ya?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Uh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Fh?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===kh&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}function rb(){if(typeof navigator>"u")return!1;try{if(typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches)return!0}catch{}return(navigator.maxTouchPoints|0)>0}function ob(){if(typeof navigator>"u")return!1;if(rb())return!0;const i=navigator.hardwareConcurrency|0,t=navigator.deviceMemory|0;if(i&&i<=4||t&&t<=4)return!0;try{if(navigator.connection?.saveData)return!0}catch{}return!1}const Jo={high:{pixelRatio:2,bloom:!0,shadows:!0,shadowSize:2048,msaa:4,halfFloat:!0,meshBudget:6,particleScale:1,fogFar:105},medium:{pixelRatio:1.25,bloom:!0,shadows:!0,shadowSize:1024,msaa:0,halfFloat:!0,meshBudget:3,particleScale:.7,fogFar:90},low:{pixelRatio:.85,bloom:!1,shadows:!1,shadowSize:512,msaa:0,halfFloat:!1,meshBudget:2,particleScale:.35,fogFar:62}},ab={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:.3},uSaturation:{value:1.05},uContrast:{value:1.03},uGamma:{value:1},uLift:{value:new Ot(0,0,0)},uGain:{value:new Ot(1,1,1)},uGrain:{value:0},uCA:{value:0},uFlash:{value:0},uFlashColor:{value:new Ot(1,1,1)},uFade:{value:0},uFadeColor:{value:new Ot(0,0,0)},uBars:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime, uVignette, uSaturation, uContrast, uGamma, uGrain, uCA, uFlash, uFade, uBars;
    uniform vec3 uLift, uGain, uFlashColor, uFadeColor;
    varying vec2 vUv;
    float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
    vec3 safe(vec3 c) { return (any(isnan(c)) || any(isinf(c))) ? vec3(0.0) : c; }
    void main() {
      vec2 dc = vUv - 0.5;
      vec3 col;
      if (uCA > 0.0) {
        vec2 off = dc * dot(dc, dc) * uCA * 0.03;
        col = vec3(texture2D(tDiffuse, vUv + off).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - off).b);
      } else col = texture2D(tDiffuse, vUv).rgb;
      col = clamp(safe(col), 0.0, 1.0);
      col = pow(max(col, vec3(0.0)), vec3(max(uGamma, 0.2)));
      col = uLift + col * (1.0 - uLift);
      col *= uGain;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
      col = mix(vec3(l), col, uSaturation);
      col = (col - 0.5) * uContrast + 0.5;
      float r = length(dc * vec2(1.0, 0.85));
      col *= 1.0 - uVignette * smoothstep(0.35, 0.95, r);
      col = mix(col, uFlashColor, clamp(uFlash, 0.0, 1.0));
      col = mix(col, uFadeColor, clamp(uFade, 0.0, 1.0));
      if (uGrain > 0.0) {
        float seed = floor(uTime * 24.0);
        float g = hash12(gl_FragCoord.xy + seed * 17.13) + hash12(gl_FragCoord.xy * 1.37 + seed * 3.7) - 1.0;
        col += g * uGrain * (1.0 - smoothstep(0.0, 0.85, dot(col, vec3(0.3333))) * 0.6);
      }
      float bar = uBars * 0.11;
      if (vUv.y < bar || vUv.y > 1.0 - bar) col = vec3(0.0);
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }`};class lb{constructor(t,{quality:e="auto"}={}){const n=ob(),s=new Z_({antialias:!1,powerPreference:n?"low-power":"high-performance",stencil:!1,depth:!0,alpha:!1});s.outputColorSpace=Ve,s.toneMapping=Ya,s.toneMappingExposure=1,s.shadowMap.enabled=!0,s.shadowMap.type=Xr,s.shadowMap.autoUpdate=!1,s.info.autoReset=!1,t.appendChild(s.domElement),this.renderer=s,this.scene=null,this.camera=null,this.before=[],this.fx={},this.weak=n,this.maxPixelRatio=Math.min(devicePixelRatio||1,n||e==="low"?1:2),this.composer=null,this._times=[],this._sinceAdjust=0,this._bloomForcedOff=!1,this.setQuality(e),addEventListener("resize",()=>this.resize())}get domElement(){return this.renderer.domElement}setScene(t,e){this.scene=t,this.camera=e,this.renderPass.scene=t,this.renderPass.camera=e,this.resize()}setQuality(t){this.quality=t,this.adaptive=t==="auto",this._bloomForcedOff=!1;let e;t==="auto"?(e={...this.weak?Jo.low:Jo.medium},this.weak?(e.pixelRatio=Math.min(1,this.maxPixelRatio),e.bloom=!1,e.shadows=!1):e.pixelRatio=Math.min(1.5,this.maxPixelRatio)):e={...Jo[t]||Jo.high},this.preset=e,this.pixelRatio=Math.min(this.maxPixelRatio,e.pixelRatio),this.minPixelRatio=this.weak?.5:.7,this.renderer.shadowMap.enabled=!!e.shadows,this._build(e),this.onQuality?.(e),this.resize()}setLook(t={}){const e={exposure:1,bloomStrength:.4,bloomRadius:.5,bloomThreshold:.9,vignette:.3,saturation:1.05,contrast:1.03,grain:0,ca:0,lift:[0,0,0],gain:[1,1,1]},n=this.look={...e,...t};this.renderer.toneMappingExposure=n.exposure,this.bloom&&Object.assign(this.bloom,{strength:n.bloomStrength,radius:n.bloomRadius,threshold:n.bloomThreshold});const s=this.finish.uniforms;s.uVignette.value=n.vignette,s.uSaturation.value=n.saturation,s.uContrast.value=n.contrast;const r=!this.preset?.bloom&&(this.quality==="low"||this.weak);s.uGrain.value=r?0:n.grain,s.uCA.value=r?0:n.ca,s.uLift.value.setRGB(...n.lift),s.uGain.value.setRGB(...n.gain)}setFx(t){Object.assign(this.fx,t);const e=this.finish.uniforms,n={time:"uTime",flash:"uFlash",fade:"uFade",bars:"uBars",gamma:"uGamma"};for(const[s,r]of Object.entries(n))t[s]!==void 0&&Number.isFinite(t[s])&&(e[r].value=t[s]);t.flashColor&&e.uFlashColor.value.set(t.flashColor),t.fadeColor&&e.uFadeColor.value.set(t.fadeColor)}_build(t){this.composer?.dispose();const e=t.halfFloat?vn:wn,n=new dn(1,1,{type:e,samples:t.msaa||0});this.composer=new eb(this.renderer,n),this.renderPass=new nb(this.scene,this.camera),this.composer.addPass(this.renderPass);const s=!!t.bloom&&!this._bloomForcedOff;this.bloom=s?new fr(new Ft(256,256),.4,.5,.9):null,this.bloom&&this.composer.addPass(this.bloom),this.composer.addPass(new sb),this.finish=new xp(ab),this.composer.addPass(this.finish),this.setLook(this.look),this.setFx(this.fx)}resize(t=innerWidth,e=innerHeight){this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(t,e,!0),this.composer.setPixelRatio(this.pixelRatio),this.composer.setSize(t,e),this.camera?.isPerspectiveCamera&&(this.camera.aspect=t/e,this.camera.updateProjectionMatrix()),this.onResize?.(t,e)}_adapt(t){if(!this.adaptive||document.hidden||!(t>0)||t>.12)return;this._times.push(t),this._sinceAdjust+=t;const e=this.weak?45:75,n=this.weak?1.1:2.2;if(this._times.length>e&&this._times.shift(),this._sinceAdjust<n||this._times.length<(this.weak?30:50))return;const s=[...this._times].sort((c,h)=>c-h),r=s[s.length>>1];let o=this.pixelRatio;const a=this.weak?1/42:1/50,l=this.weak?1/58:1/70;if(r>a?o=Math.max(this.minPixelRatio,this.pixelRatio-(this.weak?.2:.15)):r<l&&(o=Math.min(this.maxPixelRatio,this.pixelRatio+(this.weak?.08:.1))),r>1/36&&this.bloom&&!this._bloomForcedOff){this._bloomForcedOff=!0,this.preset={...this.preset,bloom:!1},this._build(this.preset),this.onQuality?.(this.preset),this._sinceAdjust=0,this._times.length=0,this.resize();return}Math.abs(o-this.pixelRatio)>.01?(this.pixelRatio=o,this._sinceAdjust=0,this._times.length=0,this.resize()):(this._sinceAdjust=0,this._times.length=0)}render(t=1/60){if(!this.scene||!this.camera)return;const e=this.renderer;e.info.reset(),e.shadowMap.needsUpdate=!!this.preset?.shadows;for(const n of this.before)n(e,this.scene,this.camera);this.composer.render(t),this._adapt(t)}}const Ma={jump:{keys:["Space"],pad:[0]},attack:{keys:["KeyF"],mouse:[0],pad:[7]},use:{keys:["KeyE","KeyR"],mouse:[2],pad:[6]},slotPrev:{keys:[],pad:[4]},slotNext:{keys:[],pad:[5]},eat:{keys:["KeyQ"],pad:[2]},sprint:{keys:["ShiftLeft","ControlLeft"],pad:[10]},pause:{keys:["Escape","KeyP"],pad:[9]},confirm:{keys:["Enter","Space"],pad:[0]},back:{keys:["Backspace"],pad:[1]}},Pd={up:["KeyW","ArrowUp"],down:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"]},ql=["up","down","left","right"],cb=.18,hb=new Set(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"]),ub=new Set(["pause","confirm","back"]);class db{constructor(t,e=Ma){this.dom=t,this.bindings=e,this.keys=new Set,this.keysPressed=new Set,this.move={x:0,y:0},this.look={x:0,y:0},this.menu={up:!1,down:!1,left:!1,right:!1,ok:!1,back:!1,start:!1},this.device="kb",this.padType="type1",this.mode="play",this.lookSpeed={mouse:.0026,pad:2.6,touch:.006},this.sens=1,this.mouseDown=new Set,this.mousePressed=new Set,this.mouseNeedsLock=!1,this.lockFailed=!1,this.wheel=0,this._wheelAcc=0,this._down={},this._pressed={},this._padPrev=[],this._rep=Object.fromEntries(ql.map(s=>[s,{held:!1,t:0}])),this._touch={x:0,y:0,buttons:{},edges:new Set},this._drag=null,this._lookAcc={x:0,y:0},this.onDevice=null,addEventListener("keydown",s=>{hb.has(s.code)&&!fb(s.target)&&s.preventDefault(),!s.repeat&&(this.keys.add(s.code),this.keysPressed.add(s.code),this._setDevice("kb"))}),addEventListener("keyup",s=>this.keys.delete(s.code));const n=()=>this.releaseAll();addEventListener("blur",n),addEventListener("pagehide",n),document.addEventListener("visibilitychange",()=>{document.hidden&&n()}),addEventListener("touchstart",()=>this._setDevice("touch"),{passive:!0}),t.addEventListener("pointerdown",s=>{s.pointerType!=="touch"&&((s.button===0||s.button===2)&&!this.pointerLocked&&(this._drag={x:s.clientX,y:s.clientY}),(this.pointerLocked||!this.mouseNeedsLock||this.lockFailed)&&(this.mouseDown.add(s.button),this.mousePressed.add(s.button)),this._setDevice("kb"))}),addEventListener("pointerup",s=>{s.pointerType!=="touch"&&this.mouseDown.delete(s.button)}),addEventListener("wheel",s=>{s.deltaY&&(this._wheelAcc+=Math.sign(s.deltaY))},{passive:!0}),document.addEventListener("pointerlockerror",()=>{this.lockFailed=!0}),addEventListener("mousemove",s=>{document.pointerLockElement===t?this._addLook(s.movementX*this.lookSpeed.mouse,s.movementY*this.lookSpeed.mouse):this._drag&&(this._addLook((s.clientX-this._drag.x)*this.lookSpeed.mouse,(s.clientY-this._drag.y)*this.lookSpeed.mouse),this._drag.x=s.clientX,this._drag.y=s.clientY)}),addEventListener("mouseup",()=>{this._drag=null}),t.addEventListener("contextmenu",s=>s.preventDefault()),addEventListener("gamepadconnected",s=>{this.padType=Ld(s.gamepad.id)}),document.addEventListener("pointerlockchange",()=>this.onPointerLock?.(this.pointerLocked))}get enabled(){return this.mode==="play"}set enabled(t){this.mode=t?"play":"menu"}get pointerLocked(){return document.pointerLockElement===this.dom}lockPointer(){if(!(this.pointerLocked||this.device==="touch"))try{if(!this.dom.requestPointerLock){this.lockFailed=!0;return}this.dom.requestPointerLock()?.catch?.(()=>{this.lockFailed=!0})}catch{this.lockFailed=!0}}unlockPointer(){this.pointerLocked&&document.exitPointerLock?.()}down(t){return!!this._down[t]}pressed(t){return!!this._pressed[t]}releaseAll(){this.keys.clear(),this.mouseDown.clear(),this._drag=null,this._touch.x=this._touch.y=0,this._touch.buttons={};for(const t of Object.values(this._rep))t.held=!1;this.onRelease?.()}setTouchStick(t,e){this._touch.x=t,this._touch.y=e,this._setDevice("touch")}setTouchButton(t,e){e&&!this._touch.buttons[t]&&this._touch.edges.add(t),this._touch.buttons[t]=e,this._setDevice("touch")}addTouchLook(t,e){this._addLook(t*this.lookSpeed.touch,e*this.lookSpeed.touch)}update(t){const e=this.keys,n=this.keysPressed,s={},r={};for(const[g,x]of Object.entries(this.bindings))s[g]=x.keys?.some(m=>e.has(m))||x.mouse?.some(m=>this.mouseDown.has(m))||!1,r[g]=x.keys?.some(m=>n.has(m))||x.mouse?.some(m=>this.mousePressed.has(m))||!1;const o=Object.fromEntries(ql.map(g=>[g,Pd[g].some(x=>e.has(x))]));let a=(o.right?1:0)-(o.left?1:0),l=(o.up?1:0)-(o.down?1:0),c=!1;const h=navigator.getGamepads?navigator.getGamepads():[];for(const g of h){if(!g)continue;const x=P=>Math.abs(P)<cb?0:P,m=x(g.axes[0]||0),p=x(g.axes[1]||0),y=x(g.axes[2]||0),T=x(g.axes[3]||0),_=P=>!!g.buttons[P]?.pressed,E=P=>_(P)&&!this._padPrev[P];let w=m||p||y||T;(m||p)&&(a=m,l=-p),(y||T)&&this._addLook(y*this.lookSpeed.pad*t,T*this.lookSpeed.pad*t*.6);for(const[P,v]of Object.entries(this.bindings))for(const R of v.pad||[])_(R)&&(s[P]=!0,w=!0),E(R)&&(r[P]=!0);o.up||=_(12)||p<-.5,o.down||=_(13)||p>.5,o.left||=_(14)||m<-.5,o.right||=_(15)||m>.5,(_(12)||_(13)||_(14)||_(15))&&(w=!0),E(9)&&(c=!0),this._padPrev=g.buttons.map(P=>P.pressed),w&&(this.padType=Ld(g.id),this._setDevice("pad"));break}const d=this._touch;Math.abs(d.x)+Math.abs(d.y)>.05&&(a=d.x,l=d.y);for(const[g,x]of Object.entries(d.buttons))x&&(s[g]=!0);for(const g of d.edges)r[g]=!0;d.edges.clear();for(const g of ql){const x=this._rep[g];let m=Pd[g].some(p=>n.has(p));o[g]&&(x.held?(x.t-=t)<=0&&(m=!0,x.t=.11):(m=!0,x.t=.38)),x.held=o[g],this.menu[g]=m}this.menu.ok=!!r.confirm,this.menu.back=!!r.back,this.menu.start=c;const u=Math.hypot(a,l);u>1&&(a/=u,l/=u);const f=this.mode==="play";this.wheel=f?this._wheelAcc:0,this._wheelAcc=0,this.move.x=f?a:0,this.move.y=f?l:0,this.look.x=f?this._lookAcc.x:0,this.look.y=f?this._lookAcc.y:0;for(const g of Object.keys(this.bindings)){const x=this.mode!=="menu"||ub.has(g);this._down[g]=s[g]&&x,this._pressed[g]=r[g]&&x}}endFrame(){this.keysPressed.clear(),this.mousePressed.clear(),this._lookAcc.x=this._lookAcc.y=0}devInput(){return{down:t=>{this.keys.add(t),this.keysPressed.add(t)},up:t=>{this.keys.delete(t)},tap:t=>{this.keysPressed.add(t)}}}_addLook(t,e){!Number.isFinite(t)||!Number.isFinite(e)||(this._lookAcc.x+=t*this.sens,this._lookAcc.y+=e*this.sens)}_setDevice(t){this.device!==t&&(this.device=t,this.onDevice?.(t))}}function Ld(i=""){return/054c|playstation|dualsense|dualshock|wireless controller/i.test(i)?"type2":"type1"}function fb(i){return i&&(i.tagName==="INPUT"||i.tagName==="TEXTAREA"||i.isContentEditable)&&i.type!=="range"}function vp(i,t,e=1){let n=structuredClone(t);try{const s=localStorage.getItem(i);if(s){const r=JSON.parse(s);r&&r.v===e&&r.data&&typeof r.data=="object"&&(n=yp(n,r.data))}}catch{}return{data:n,save(){try{return localStorage.setItem(i,JSON.stringify({v:e,data:this.data})),!0}catch{return!1}},reset(){this.data=structuredClone(t);try{localStorage.removeItem(i)}catch{}}}}function yp(i,t){for(const e of Object.keys(i)){if(!(e in t))continue;const n=i[e],s=t[e];n&&typeof n=="object"&&!Array.isArray(n)?i[e]=yp(n,s&&typeof s=="object"?s:{}):(typeof s==typeof n||n===null)&&(i[e]=s)}return i}const _p={"game.title":"AI Robot Farm","game.tagline":"~ Grow by day, defend by night ~","boot.loading":"Loading…","boot.noWebgl":"Could not start (please open this in a browser with WebGL)","boot.loadFailed":"Failed to load (please reload the page)","title.continue":"Continue","title.start":"Start","title.play":"PLAY","title.name":"Name","title.namePh":"Your name","title.newGame":"New game","title.howto":"How to play","title.settings":"Settings","title.best":"Best harvest: {n} crops","net.looking":"Looking for a room…","net.welcome":"{name} entered the farm","net.joined":"{name} joined","net.left":"A farmer left","install.btn":"Install game","install.title":"Install Spud Farm","install.body":"Add the game to your device and open it from the home screen or desktop.","install.perk0":"Full screen, no browser bars","install.perk1":"Opens faster","install.perk2":"One tap from home screen or desktop","install.confirm":"Tap Install to confirm.","install.ok":"Install","install.notNow":"Not now","install.gotIt":"Got it","install.already":"Spud Farm is already installed on this device.","install.ios":"Tap Share ⬆︎ at the bottom of Safari, then Add to Home Screen.","install.desktop":"Tap Install when the browser asks, or use the menu → Install app / Add to desktop.","splash.0":"Potatoes don't explode!","splash.1":"No chests!","splash.2":"It's sugarcane!","splash.3":"141 hours!","splash.4":"keepInventory: ON","splash.5":"Plop!","splash.6":"Don't chase pink pixels!","splash.7":"Always carry critical items!","pause.title":"Paused","pause.resume":"Resume","pause.retry":"Restart this morning","pause.toTitle":"Back to title","settings.title":"Settings","settings.master":"Master volume","settings.music":"Music","settings.sfx":"Sound effects","settings.sens":"Look speed","settings.mobGuide":"Green Thing guide","settings.mobGuide.on":"On (arrows, alerts)","settings.mobGuide.off":"Off (sound only)","settings.quality":"Quality","settings.quality.auto":"Auto (best for phones)","settings.quality.high":"High","settings.quality.medium":"Medium","settings.quality.low":"Low (smoother)","settings.lang":"Language","settings.pad":"Button prompts","settings.pad.auto":"Auto","settings.pad.type1":"Type 1 (A/B/X/Y)","settings.pad.type2":"Type 2 (×/○/□/△)","howto.title":"How to play","howto.body":"Day: grow and earn. Dusk: prepare. Night: strange pests attack. Morning: repair and grow stronger.","howto.body2":"Boom-booms explode. Golems smash towers. Thieves steal crops. Dragons snatch robots by day. At night robots charge by the wall — beds are for players. Stairs lead to the roof.","howto.tools":"Hotbar tools","howto.economy":"Prices","howto.tool.sword":"Hit hostiles and harvest ripe crops","howto.tool.hoe":"Till grass and dirt into farm plots","howto.tool.seed":"Plant — next seed from your bags in rotation","howto.tool.dirt":"Fill explosion holes","howto.tool.powder":"Fertilize crops to advance growth","howto.tool.turret":"Guard tower — {n} coins","howto.pig":"Penned pig","howto.pigVal":"Sell with Use — {n} coins","howto.sellVal":"Auto-sells for {n} coins","prompt.sellPig":"Sell pig ({n} coins)","prompt.pigWild":"Lure it into the apple sty first","sys.soldPig":"Sold a pig for {pay} coins","sys.pigWild":"Pigs sell only after they enter the apple sty","howto.move":"Move","howto.look":"Look","howto.jump":"Jump","howto.sprint":"Sprint","howto.attack":"Hit / harvest","howto.use":"Till / plant / fertilize / talk","howto.attack.short":"Hit","howto.use.short":"Use","howto.eat":"Eat (heal)","howto.pause":"Pause","howto.touch":"Phone: move with your left thumb, swipe on the right to look. Buttons at the bottom right: hit, use, jump, eat. Tap the item bar to switch items.","item.sword":"Sword","item.hoe":"Hoe","item.seed":"Seed","item.potato":"Potato","item.wheat":"Wheat","item.carrot":"Carrot","item.corn":"Corn","item.dirt":"Dirt","item.powder":"Gunpowder","item.turret":"Guard tower","item.green":"Green potato","prompt.placeTurret":"Place tower ({n} coins)","prompt.noMoney":"Need {n} coins","prompt.turretBlocked":"Cannot place here","prompt.turretMax":"Tower limit reached","sys.turretBlocked":"Cannot place a tower here","crop.potato":"Potato","crop.wheat":"Wheat","crop.carrot":"Carrot","crop.corn":"Corn","prompt.switch":"Switch to {item} to {act}","prompt.holeFirst":"Fill the hole with dirt first","prompt.noPowder":"No gunpowder","prompt.blocked":"Something is in the way","prompt.plantCrop":"Plant {crop}","prompt.noSeedCrop":"No {crop} seeds","sys.holeFirst":"You can't till inside a hole. Fill it with Dirt first","sys.noPowder":"No gunpowder (Green Things drop it)","sys.noSeedCrop":"No {crop} left to plant!","howto.slots":"Switch items (sword, hoe, seeds, dirt, gunpowder)","howto.slots.short":"Switch","endless.body":"Shore Season — farm without a day limit. Saves every morning. Walk south to the open beach. Every five days, something big comes at night.","endless.continue":"Continue (day {n})","endless.new":"New island (day 1)","report.toTitle":"Take a break (back to title)","hud.dayEndless":"Shore · Day {n}","astra.endless.hello":"Shore Season. The beach is open. We grow, you guard. Ready when you are.","astra.endless.start":"Trial complete. The southern beach is clear — supply boats can reach us. Day six: Shore Season begins.","astra.endless.boss":"Good morning. Day {n}. Sensors spike again… something big will hit the shore tonight.","astra.endless.milestone":"Day {n}! The shipping log is getting heavy. Nice work, Night Watch.","astra.endless.morning.0":"Good morning. Day {n}. Grow by day, guard by night — same deal.","astra.endless.morning.1":"Morning. Day {n}. If you need air, the beach path is south of the house.","astra.endless.morning.2":"Day {n}. Crops for the boats. Green Things for you.","astra.endless.morning.3":"Good morning. We are a real food crew now.","astra.endless.morning.4":"Day {n}. More harvest, more coins, more quiet nights… hopefully.","astra.endless.morning.5":"Day {n}. Still no chests. Critical items stay on us. Always.","astra.endless.morning.6":"Morning. Night Watch held the line again. Back to the fields.","ui.back":"Back","ui.close":"Close","touch.attack":"Hit","touch.use":"Use","touch.jump":"Jump","touch.eat":"Eat","name.astra":"Control","hud.day":"Day {n}","hud.goal":"Today's goal","hud.goalVal":"{n} / {m}","hud.phase.day":"Day","hud.phase.dusk":"Dusk","hud.phase.night":"Night","hud.phase.dawn":"Dawn","hud.robot.work":"field crew active","hud.robot.idle":"standby","hud.robot.scared":"ALERT","hud.robot.sulk":"recovering…","hud.robot.sleep":"night shelter","prompt.harvest":"Harvest","prompt.plant":"Plant","prompt.till":"Till","prompt.fertilize":"Gunpowder","prompt.growing":"Growing…","prompt.noSeed":"No seeds","howto.bodyCrops":"Plant potato, wheat, carrot, and corn from the hotbar. Today's goal counts every crop you harvest.","panel.warehouse":"Farm","panel.coins":"Coins","panel.money":"{n}","panel.helpers":"Growers {n}/{m}","panel.hoeLevel":"Hoe Lv.{n}","panel.turret":"Guard tower","panel.turretCost":"Guard tower ({n})","panel.stock":"Seeds","sys.sold":"Sold for {pay} coins","sys.hired":"A new AI robot joined the farm!","sys.noMoney":"Not enough coins","sys.turretBuilt":"Guard tower online — scanning!","sys.turretMax":"Tower limit reached","sys.alarm":"Alert! Enemy approaching!","sys.hoeUp":"Hoe upgraded to level {n}!","banner.daySub":"Goal: harvest {m} crops","banner.goalSub":"Great harvest! Hoe Lv.{hoe}","banner.helper":"New AI helper!","banner.helperSub":"They will work the fields with the crew","sys.goalHint":"Today's goal: harvest {m} crops","obj.harvest":"Harvest ripe crops ({n}/{m})","report.harvest":"Crops harvested","ending.total":"Total crops harvested","title.endless":"Shore Season","title.bestEndless":"Shore: day {d}, {n} crops","ending.unlock":"Shore Season unlocked — open beach, no day limit!","ending.endless":"Begin Shore Season","banner.dayEndless":"Shore Season · day {n}","banner.shore":"Shore Season","banner.shoreSub":"Trial done. Explore the southern beach — keep growing","prompt.fill":"Fill hole","prompt.talk":"Talk","prompt.cheer":"Cheer up","prompt.attack":"Hit","prompt.bonk":"Poke","prompt.pick":"Pull up","prompt.cut":"Cut","prompt.box":"Look","prompt.bed":"Look","obj.plant":"Plant seeds in empty plots ({n}/{m})","obj.till":"Switch to Hoe and till some grass ({n}/{m})","obj.mob":"Hit the Green Thing to drive it off","obj.night":"Protect the farm through the night","obj.boss":"Defeat the Big Green Thing","obj.done":"Goal reached! Keep harvesting","banner.day":"Day {n}","banner.night":"Night has come","banner.nightSub":"Crew is charging. Protect the farm","banner.nightSubBoss":"…something big is coming","banner.goal":"Goal reached!","banner.boss":"Big Green Thing","banner.bossSub":"Hit it. Hit it. Hit it.","banner.dead":"You were blown up…","banner.deadSub":"keepInventory: ON (your crops are safe)","sys.mob":"A Boom-Boom is approaching!","sys.boss":"A Big Boom-Boom appeared!","sys.kill":"Drove off a Boom-Boom!","sys.bossKill":"Defeated the Big Boom-Boom!","sys.golem":"Stone Golem inbound — it wants the towers!","sys.golemWind":"Golem winding up a smash!","sys.golemHit":"The tower took a hit!","sys.golemBroke":"A guard tower collapsed!","sys.golemKill":"Stone Golem down!","sys.thief":"Crop thief racing for the fields!","sys.thiefSteal":"Thief grabbed {n} crop(s)!","sys.thiefEscaped":"Thief escaped with {n}!","sys.thiefCaught":"Caught the thief — +{n} coins!","sys.thiefKill":"Thief stopped!","sys.dragon":"Sneaky dragon overhead!","sys.dragonGrab":"Dragon grabbed a robot!","sys.dragonEscaped":"Dragon fled with a robot… returns at dawn.","sys.dragonRescue":"Robot rescued from the dragon!","sys.dragonKill":"Dragon shooed away!","sys.turretDown":"Guard tower destroyed!","sys.robotReturned":"Kidnapped robot back online. Shaky, but OK.","banner.golem":"Stone Golem","banner.golemSub":"Protect the towers!","banner.thief":"Crop Thief","banner.thiefSub":"Catch them before they flee!","banner.dragon":"Sneaky Dragon","banner.dragonSub":"Save the robot!","sys.chomp":"A Chomper is headed for the fields!","sys.chompEat":"Chomper is munching the crops!","sys.chompKill":"Chomper stuffed!","sys.hop":"A Hopper is bouncing in!","sys.hopKill":"Hopper stopped!","banner.chomp":"Chomper","banner.chompSub":"It eats crops on the spot!","banner.hop":"Hopper","banner.hopSub":"It digs holes when it lands!","astra.kidnap":"HELP — airborne! Unscheduled flight!","astra.kidnapHelper":"Helper unit… airborne! Request intercept!","astra.report.night":"Night toll: {stolen} crops stolen, {towers} towers lost, {taken} robots taken, {saved} rescued.","sys.dusk":"The sun is setting…","sys.turretThreat":"ALERT: {n} towers — night brings ~{mobs} hostiles, and it lasts longer!","banner.nightSubTowers":"The towers drew attention — a big wave is coming!","sys.dawn":"In the morning light, the Green Things went home","sys.noSeed":"No seeds left!","sys.full":"Health is full","sys.powder":"Got gunpowder. Switch to Gunpowder and use it on crops as fertilizer","sys.greenPotato":"Got a green potato (a rarity)","sys.box":"A shipping box. Not a chest. Whatever goes in ships right away","intro.title":"AI Robot Farm","intro.p0":"Humanity left an automated farm island. The leftover AI and its robots still grow food, raise pigs, and expand the farm.","intro.p1":"By day you harvest, earn gold, tend pigs, and upgrade. You cannot buy everything — production or defense?","intro.p2":"At night, odd creatures are drawn to crops, coins, robots, and power. From forest, sea, and sky.","intro.p3":"Boom-booms explode. Stone golems crack towers. Crop thieves flee with sacks. Dragons kidnap robots for laughs.","intro.p4":"Survive, repair at dawn, and grow a tiny farm into a protected automatic factory. Funny. Colorful. Full of surprises.","intro.p5":"Five days to prove the island. Then Shore Season opens — longer nights, rarer pests, endless play.","intro.start":"Start the night watch","report.title":"End of day {n}","report.kills":"Green Things defeated","report.booms":"Explosions","report.goalOk":"Goal reached!","report.goalNg":"{n} short of the goal — crops will grow again tomorrow","report.next":"Next day","report.last":"See the results","ending.title":"First shipment clear","ending.stars":"Goals reached","ending.green":"Green potatoes (rare)","ending.rank":"Title","ending.best":"Best so far: {n}","ending.new":"New record!","ending.toTitle":"Back to title","ending.line.0":"Trial complete. The outpost works — thanks to Night Watch.","ending.line.1":"South of the house the rim is open: sand, sea, and room to breathe.","ending.line.2":"Stay for Shore Season? We grow. You guard. Deal.","rank.0":"Night Watch recruit","rank.1":"Outpost keeper","rank.2":"Shore guardian","rank.3":"Farm captain","astra.hello.0":"Control online. Field crew standing by.","astra.hello.1":"Mission: grow by day, defend by night. You are Night Watch.","astra.hello.2":"Crew works the fields. At night they shelter. You hold the line.","astra.hello.3":"ALERT: Green hostiles hiss before detonation. Keep sword ready.","astra.hello.4":"Order: harvest a ripe crop, then plant. Five-day trial begins.","astra.tut.harvest":"Confirm harvest. Switch to Seed and plant empty plots — bags rotate crops.","astra.tut.plant":"Seed queue linked. Next order: till grass with the Hoe.","astra.tut.till":"Expand plots for yield. Soil near water grows faster.","astra.tut.mob":"ALERT — hostile contact. Green Thing inbound. Engage.","astra.tut.done":"Threat cleared. Field secure. Resume farming.","astra.idle.0":"Status: fields stable. Yield trending up.","astra.idle.1":"Report: crew on schedule. No hostiles on sensors.","astra.idle.2":"Logistics: potatoes stocked for night shipments.","astra.idle.3":"PROTOCOL: carry critical items. Never stash in unguarded chests.","astra.idle.4":"Inventory check: tuber reserves look solid.","astra.idle.5":"Note: crop greens are safe — hostiles are the green squares.","astra.idle.6":"Ops log: planting cycle continues.","astra.idle.7":"Advisory: do not chase pigs off-mission at night.","astra.idle.8":"Sky clear. Sensor band quiet.","astra.idle.9":"Harvest audio nominal. Keep cutting.","astra.idle.10":"Perimeter trees tagged safe. Focus on fields.","astra.idle.11":"Till more soil — expand the grid.","astra.idle.12":"Goal track: more tubers, fewer holes.","astra.idle.13":"Standby. Night Watch, hold ready.","astra.cane.0":"ALERT: tall green contact ahead!","astra.cane.1":"Sensor spike — green vertical object!","astra.cane.2":"Possible hostile silhouette. Confirm!","astra.caneOk.0":"False alarm: sugarcane. Not a Green Thing.","astra.caneOk.1":"Cleared: sugarcane. Threat level zero.","astra.caneOk.2":"Sugarcane confirmed. Resume patrol.","astra.melon.0":"Contact: melon on grid. Green shell — ignore, not hostile.","astra.melonOk.0":"Melons off planting list. Focus tubers and grain.","astra.panic.0":"ALERT — Green Thing on the farm!","astra.panic.1":"HOSTILE HERE. Crew to shelter. Night Watch engage!","astra.panic.2":"Contact close. Intercept now!","astra.panic.3":"Hiss detected. Detonation risk high!","astra.panic.4":"EVACUATE CREW. Secure potatoes. Defend!","astra.calm.0":"All clear. Sensors quiet. Back to fields.","astra.calm.1":"Threat down. Resume harvest.","astra.calm.2":"Perimeter normal. Standby.","astra.thanks.0":"Assist logged. Reward tuber issued.","astra.thanks.1":"Crew safe. Take this potato — good work.","astra.thanks.2":"Threat handled. Supply drop: one potato.","astra.bossThanks":"Boss hostile down. Outstanding. Take a potato.","astra.farmHit.0":"Blast damage logged. Crops can be replanted.","astra.farmHit.1":"Hole on grid. Fill with Dirt — crew patches overnight.","astra.farmHit.2":"Terrain damaged. Repair when clear.","astra.flung":"Crew unit knocked back!","astra.sulk.0":"Crew stress high after green contact.","astra.sulk.1":"Crew recovering. Give them a moment.","astra.sulk.2":"Priority: keep greens off the plots.","astra.recover.0":"Crew back online. Resume work.","astra.recover.1":"Recovered. Field ops continue.","astra.cheered.0":"Morale up. Thanks, Night Watch.","astra.talk.0":"Control channel open. Ask away.","astra.talk.1":"Thanks for farm support.","astra.talk.2":"On green contact: crew shelters. You fight.","astra.talk.3":"Tip: gunpowder fertilizes crops. Use it.","astra.talk.4":"Plots near water grow faster.","astra.talk.5":"No side quests. Tubers first.","astra.talkHide.0":"Crew locked inside. Call when greens are gone.","astra.talkSleep.0":"Charging bay… counting tubers…","astra.dusk":"DUSK ALERT: hostiles multiply at night. Crew to charging bay. Defend the outpost.","astra.morning.0":"Morning brief — Day 1. Night Watch online.","astra.morning.1":"Morning: holes patched overnight. Push harvest.","astra.morning.2":"Day 3. Crew rhythm good. Keep it up.","astra.morning.3":"Morning. Crew rested because you held the night.","astra.morning.4":"Final trial day. Sensors: large hostile possible tonight.","astra.lesson":"[PROTOCOL] Carry critical items. Never leave them in an unguarded chest.","astra.death":"Inventory retained. Tubers secure. Respawn and continue.","astra.greenPotato":"Anomalous green potato logged. Yours to keep.","astra.pig":"Advisory: lure pigs to the sty — do not chase off-grid.","astra.caneBroken":"Sugarcane cleared. False-alarm risk reduced. Thanks.","astra.boss.0":"CRITICAL: oversized green hostile!","astra.boss.1":"Boss-class contact. Crew to shelter. Engage carefully!","astra.goal.0":"Daily goal complete. Shipment crate loading.","astra.goal.1":"Harvest target met. Excellent yield.","astra.bonk.0":"Friendly fire on crew unit. Not a hostile.","astra.bonk.1":"That is field crew — not a potato.","astra.powder":"Gunpowder doubles as fertilizer. Sprinkle on crops.","astra.box":"Shipping box — not a chest. Items leave immediately.","astra.warp":"Crew teleported out of a hole. Resume nearby.","astra.bed":"Open bunk for rest. Robots charge by the wall at night.","astra.report.good.0":"Goal hit. Night shipment will be heavy.","astra.report.good.1":"Harvest clear. Night Watch earned the quiet.","astra.report.good.2":"Food stocked for boats and crew.","astra.report.ok.0":"Under goal. Crops still growing. Push tomorrow.","astra.report.ok.1":"Missed tally. No detonations. Acceptable.","astra.report.ok.2":"Safe nights beat perfect numbers. Continue."},pb={..._p,"game.title":"חוות הרובוטים AI","game.tagline":"~ לגדל ביום, להגן בלילה ~","boot.loading":"טוען…","boot.noWebgl":"לא ניתן להתחיל (פתחו בדפדפן עם WebGL)","boot.loadFailed":"הטעינה נכשלה (רעננו את הדף)","title.continue":"המשך","title.start":"התחל","title.play":"PLAY","title.name":"שם","title.namePh":"השם שלך","title.newGame":"משחק חדש","title.howto":"איך משחקים","title.settings":"הגדרות","title.best":"שיא קציר: {n} יבולים","title.endless":"עונת החוף","title.bestEndless":"חוף: יום {d}, {n} יבולים","net.looking":"מחפש חדר…","net.welcome":"{name} נכנס לחווה","net.joined":"{name} הצטרף","net.left":"חקלאי עזב","install.btn":"התקן משחק","install.title":"התקנת חוות הרובוטים AI","install.body":"הוסיפו את המשחק למכשיר ופתחו מהמסך הראשי או משולחן העבודה.","install.perk0":"מסך מלא בלי שורת דפדפן","install.perk1":"נפתח מהר יותר","install.perk2":"לחיצה אחת מהמסך הראשי או מהמחשב","install.confirm":"לחצו התקן לאישור.","install.ok":"התקן","install.notNow":"לא עכשיו","install.gotIt":"הבנתי","install.already":"המשחק כבר מותקן במכשיר הזה.","install.ios":"ב־Safari לחצו Share ⬆︎ למטה ואז Add to Home Screen.","install.desktop":"לחצו התקן כשהדפדפן מבקש, או בתפריט → Install app / הוסף לשולחן העבודה.","pause.title":"השהיה","pause.resume":"המשך","pause.retry":"התחל בוקר מחדש","pause.toTitle":"חזרה לתפריט","settings.title":"הגדרות","settings.master":"עוצמת שמע","settings.music":"מוזיקה","settings.sfx":"אפקטים","settings.sens":"מהירות מבט","settings.mobGuide":"מדריך לאויבים הירוקים","settings.mobGuide.on":"פועל (חצים והתראות)","settings.mobGuide.off":"כבוי (רק צליל)","settings.quality":"איכות","settings.quality.auto":"אוטומטי (מומלץ לטלפון)","settings.quality.high":"גבוהה","settings.quality.medium":"בינונית","settings.quality.low":"נמוכה (חלק יותר)","settings.lang":"שפה","settings.pad":"כפתורי בקר","settings.pad.auto":"אוטומטי","howto.title":"איך משחקים","howto.body":"יום: מגדלים ומרוויחים. שקיעה: מתכוננים. לילה: יצורים מוזרים תוקפים. בוקר: מתקנים ומתקדמים.","howto.body2":"בום־בום מתפוצץ. גולם שובר מגדלים. גנב גונב יבול. דרקון חוטף ביום. בלילה הרובוטים בטעינה על הקיר — המיטות לשחקנים. מדרגות עולות לגג.","howto.tools":"סרגל הכלים","howto.economy":"מחירים","howto.tool.sword":"מכה באויבים וקציר יבול בשל","howto.tool.hoe":"חרישת דשא ואדמה לערוגות","howto.tool.seed":"שתילה — זרע הבא מהמלאי בתור","howto.tool.dirt":"מילוי חורים אחרי פיצוץ","howto.tool.powder":"דישון יבולים לקידום גדילה","howto.tool.turret":"מגדל שמירה — {n} מטבעות","howto.pig":"חזיר במכלאה","howto.pigVal":"מכירה בשימוש — {n} מטבעות","howto.sellVal":"נמכר אוטומטית תמורת {n} מטבעות","prompt.sellPig":"מכירת חזיר ({n} מטבעות)","prompt.pigWild":"קודם תנו לו להיכנס למתחם התפוחים","sys.soldPig":"נמכר חזיר תמורת {pay} מטבעות","sys.pigWild":"מוכרים חזירים רק אחרי שנכנסו למתחם","howto.move":"תנועה","howto.look":"מבט","howto.jump":"קפיצה","howto.sprint":"ריצה","howto.attack":"מכה / קציר","howto.use":"חרישה / שתילה / דישון / שיחה","howto.attack.short":"מכה","howto.use.short":"שימוש","howto.eat":"אכילה (ריפוי)","howto.pause":"השהיה","howto.touch":"בטלפון: אגודל שמאל לתנועה, החלקה מימין למבט. כפתורים למטה מימין. לחצו על סרגל הכלים להחלפה.","howto.slots":"החלפת פריטים (חרב, מעדר, זרעים, אדמה, אבק)","howto.slots.short":"החלפה","howto.bodyCrops":"שתלו תפוח אדמה, חיטה, גזר ותירס מסרגל הכלים. מטרת היום סופרת כל יבול שנקצר.","item.sword":"חרב","item.seed":"זריעה","item.hoe":"מעדר","item.potato":"תפוח אדמה","item.wheat":"חיטה","item.carrot":"גזר","item.corn":"תירס","item.dirt":"אדמה","item.powder":"אבק שריפה","item.turret":"מגדל שמירה","item.green":"תפוח ירוק","prompt.placeTurret":"מיקום מגדל ({n} מטבעות)","prompt.noMoney":"צריך {n} מטבעות","prompt.turretBlocked":"אי אפשר למקם כאן","prompt.turretMax":"הגעתם למכסת המגדלים","sys.turretBlocked":"אי אפשר למקם מגדל כאן","crop.potato":"תפוח אדמה","crop.wheat":"חיטה","crop.carrot":"גזר","crop.corn":"תירס","prompt.switch":"החליפו ל־{item} כדי {act}","prompt.holeFirst":"מלאו קודם את המכתש באדמה","prompt.noPowder":"אין אבק שריפה","prompt.blocked":"משהו חוסם","prompt.plantCrop":"שתילת {crop}","prompt.noSeedCrop":"אין זרעי {crop}","prompt.harvest":"קציר","prompt.plant":"שתילה","prompt.till":"חרישה","prompt.fertilize":"דישון","prompt.fill":"מילוי מכתש","prompt.talk":"שיחה","prompt.cheer":"עידוד","prompt.attack":"מכה","prompt.noSeed":"אין זרעים","ui.back":"חזרה","ui.close":"סגור","touch.attack":"מכה","touch.use":"שימוש","touch.jump":"קפיצה","touch.eat":"אכילה","name.astra":"מרכז בקרה","hud.day":"יום {n}","hud.goal":"מטרת היום","hud.goalVal":"{n} / {m}","hud.phase.day":"יום","hud.phase.dusk":"שקיעה","hud.phase.night":"לילה","hud.phase.dawn":"שחר","hud.robot.work":"צוות בשדה","hud.robot.idle":"המתנה","hud.robot.scared":"התרעה!","hud.robot.sulk":"מתאושש…","hud.robot.sleep":"מקלט לילה","panel.warehouse":"חווה","panel.coins":"מטבעות","panel.money":"{n}","panel.helpers":"רובוטים {n}/{m}","panel.hoeLevel":"מעדר רמה {n}","panel.turret":"מגדל שמירה","panel.turretCost":"מגדל שמירה ({n})","panel.stock":"זרעים","sys.sold":"נמכר תמורת {pay} מטבעות","sys.hired":"רובוט AI חדש הצטרף לחווה!","sys.noMoney":"אין מספיק מטבעות","sys.turretBuilt":"מגדל שמירה פעיל — סורק!","sys.turretMax":"הגעתם למכסת המגדלים","sys.alarm":"אזעקה! אויב מתקרב!","sys.hoeUp":"המעדר שודרג לרמה {n}!","banner.helper":"עוזר AI חדש!","banner.helperSub":"הם יעבדו בשדה עם הצוות","sys.mob":"בום־בום מתקרב!","sys.boss":"בום־בום גדול הופיע!","sys.kill":"הברחנו בום־בום!","sys.bossKill":"ניצחנו את הבום־בום הגדול!","sys.golem":"איש האבנים בדרך — הוא רוצה את המגדלים!","sys.golemWind":"הגולם מרים אגרוף!","sys.golemHit":"המגדל נסדק!","sys.golemBroke":"מגדל שמירה קרס!","sys.golemKill":"איש האבנים הובס!","sys.thief":"גנב גידולים רץ לשדה!","sys.thiefSteal":"הגנב חטף {n} יבולים!","sys.thiefEscaped":"הגנב ברח עם {n}!","sys.thiefCaught":"תפסנו את הגנב — +{n} מטבעות!","sys.thiefKill":"הגנב נעצר!","sys.dragon":"דרקון שובב מעל החווה!","sys.dragonGrab":"הדרקון חטף רובוט!","sys.dragonEscaped":"הדרקון ברח עם רובוט… יחזור בבוקר.","sys.dragonRescue":"הצלנו את הרובוט מהדרקון!","sys.dragonKill":"הברחנו את הדרקון!","sys.turretDown":"מגדל שמירה נהרס!","sys.robotReturned":"הרובוט שנחטף חזר. רועד, אבל בסדר.","banner.golem":"איש האבנים","banner.golemSub":"הגנו על המגדלים!","banner.thief":"גנב הגידולים","banner.thiefSub":"תפסו אותו לפני שהוא בורח!","banner.dragon":"הדרקון הגנב","banner.dragonSub":"הצילו את הרובוט!","sys.chomp":"אוכלן רץ לשדות!","sys.chompEat":"האוכלן מכרסם את היבולים!","sys.chompKill":"האוכלן נעצר!","sys.hop":"קופצן מגיע!","sys.hopKill":"הקופצן נעצר!","banner.chomp":"האוכלן","banner.chompSub":"אוכל יבולים במקום — לא בורח עם שק!","banner.hop":"הקופצן","banner.hopSub":"חופר בורות קטנים בכל נחיתה!","astra.kidnap":"עזרה — מעופף! טיסה לא מתוכננת!","astra.kidnapHelper":"יחידת עזר… באוויר! מבקשים יירוט!","astra.report.night":"סיכום לילה: {stolen} יבולים נגנבו, {towers} מגדלים אבדו, {taken} רובוטים נחטפו, {saved} הוצלנו.","sys.dusk":"השמש שוקעת…","sys.turretThreat":"התרעה: {n} מגדלים — הלילה יביא כ־{mobs} אויבים, והוא יהיה ארוך יותר!","banner.nightSubTowers":"המגדלים משכו תשומת לב — גל גדול בדרך!","sys.dawn":"עם האור, היצורים הירוקים חזרו הביתה","sys.noSeed":"נגמרו הזרעים!","sys.full":"הבריאות מלאה","sys.powder":"קיבלתם אבק שריפה. החליפו אליו והשתמשו כדשן","sys.greenPotato":"תפוח אדמה ירוק נדיר!","sys.goalHint":"מטרת היום: לקצור {m} יבולים","sys.box":"ארגז משלוח. לא תיבה. מה שנכנס נשלח מיד","sys.holeFirst":"אי אפשר לחרוש בתוך מכתש. מלאו באדמה קודם","sys.noPowder":"אין אבק שריפה (מפילים יצורים ירוקים)","sys.noSeedCrop":"אין {crop} לשתילה!","obj.harvest":"קצרו יבולים בשלים ({n}/{m})","obj.plant":"שתלו זרעים בערוגות ריקות ({n}/{m})","obj.till":"החליפו למעדר וחרשו דשא ({n}/{m})","obj.mob":"הכו ביצור הירוק כדי להבריח אותו","obj.night":"הגנו על החווה בלילה","obj.boss":"הביסו את היצור הירוק הענק","obj.done":"המטרה הושגה! המשיכו לקצור","banner.day":"יום {n}","banner.daySub":"מטרה: לקצור {m} יבולים","banner.dayEndless":"חיי חווה, יום {n}","banner.night":"הלילה ירד","banner.nightSub":"הצוות בטעינה. הגנו על החווה","banner.nightSubBoss":"…משהו גדול מגיע","banner.goal":"המטרה הושגה!","banner.goalSub":"קציר מצוין! מעדר רמה {hoe}","banner.boss":"יצור ירוק ענק","banner.bossSub":"הכו. הכו. הכו.","banner.dead":"התפוצצתם…","banner.deadSub":"keepInventory: פועל (היבולים בטוחים)","intro.title":"חוות הרובוטים AI","intro.p0":"האנושות עזבה אי חקלאי אוטומטי. שאריות הבינה המלאכותית והרובוטים שלה ממשיכות לגדל מזון, חזירים ואנרגיה.","intro.p1":"ביום קוצרים, אוספים מטבעות, מטפלים בחזירים ומשדרגים. אי אפשר לקנות הכול — ייצור או הגנה?","intro.p2":"בלילה יצורים מוזרים נמשכים ליבולים, למטבעות, לרובוטים ולמתקנים — מהיער, מהים ומהשמיים.","intro.p3":"בום־בום מתפוצץ. איש האבנים מכה במגדלים. גנב בורח עם שק. דרקון שובב חוטף רובוטים.","intro.p4":"המשימה: להפוך חווה קטנה למפעל חקלאי מוגן. הטון מצחיק, צבעוני ומלא הפתעות — לא אימה.","intro.p5":"חמישה ימים להוכיח את האי. אחר כך נפתחת עונת החוף — לילות ארוכים יותר ואתגרים מיוחדים.","intro.start":"להתחיל את המשמרת","report.title":"סוף יום {n}","report.harvest":"יבולים שנקטפו","report.kills":"יצורים שהובסו","report.booms":"פיצוצים","report.goalOk":"המטרה הושגה!","report.goalNg":"חסרים {n} למטרה — מחר יצמח שוב","report.next":"היום הבא","report.last":"לתוצאות","report.toTitle":"הפסקה (חזרה לתפריט)","ending.title":"המשלוח הראשון יצא","ending.total":"סה״כ יבולים שנקטפו","ending.stars":"מטרות שהושגו","ending.green":"תפוחים ירוקים (נדיר)","ending.rank":"תואר","ending.best":"שיא עד כה: {n}","ending.new":"שיא חדש!","ending.toTitle":"חזרה לתפריט","ending.unlock":"עונת החוף נפתחה — חוף פתוח, בלי הגבלת ימים!","ending.endless":"לצאת לעונת החוף","ending.line.0":"הניסיון הושלם. המוצב עובד — בזכות שומרי הלילה.","ending.line.1":"מדרום לבית נפתח החוף: חול, ים, ומקום לנשום.","ending.line.2":"נשארים לעונת החוף? אנחנו מגדלים. אתם שומרים. דיל.","rank.0":"מגויס לילה","rank.1":"שומר מוצב","rank.2":"שומר חוף","rank.3":"קפטן החווה","endless.body":"עונת החוף — בלי הגבלת ימים. נשמר כל בוקר. לכו דרומה לחוף הפתוח. כל חמישה ימים מגיע משהו גדול בלילה.","endless.continue":"המשך (יום {n})","endless.new":"אי חדש (יום 1)","hud.dayEndless":"חוף · יום {n}","banner.dayEndless":"עונת החוף · יום {n}","banner.shore":"עונת החוף","banner.shoreSub":"הניסיון הסתיים. חקרו את החוף הדרומי — המשיכו לגדל","astra.hello.0":"מרכז בקרה מחובר. צוות השדה במוכנות.","astra.hello.1":"משימה: לגדל ביום, להגן בלילה. אתם שומרי הלילה.","astra.hello.2":"הצוות בשדות ביום. בלילה במקלט. אתם מחזיקים את הקו.","astra.hello.3":"התרעה: ירוקים שורקים לפני פיצוץ. חרב מוכנה.","astra.hello.4":"פקודה: קצרו צמח בשל ואז שתלו. ניסיון של חמישה ימים.","astra.tut.harvest":"קציר אושר. עברו לזריעה ושתלו בערוגות ריקות — המלאי מתחלף.","astra.tut.plant":"מערכת זריעה פעילה. פקודה הבאה: חרשו דשא במעדר.","astra.tut.till":"הרחיבו ערוגות לתפוקה. ליד מים גדלים מהר יותר.","astra.tut.mob":"התרעה — מגע עוין. יצור ירוק מתקרב. התערבו.","astra.tut.done":"איום נוטרל. השדה מאובטח. חזרה לגידול.","astra.idle.0":"סטטוס: שדות יציבים. תפוקה בעלייה.","astra.idle.1":"דיווח: צוות בלו״ז. אין אויבים בחיישנים.","astra.idle.2":"לוגיסטיקה: פקעות מוכנות למשלוח לילה.","astra.idle.3":"פרוטוקול: לשאת פריטים קריטיים. לא להשאיר בתיבה בלי שמירה.","astra.idle.4":"בדיקת מלאי: עתודות הפקעות תקינות.","astra.idle.5":"הערה: ירק של יבולים בטוח — האויב הוא הריבוע הירוק.","astra.idle.6":"יומן מבצעים: מחזור שתילה נמשך.","astra.idle.7":"המלצה: לא לרדוף חזירים מחוץ למשימה בלילה.","astra.idle.8":"שמיים נקיים. חיישנים שקטים.","astra.idle.9":"קציר תקין. המשיכו.","astra.idle.10":"עצים בפרימטר מסומנים כבטוחים. מיקוד בשדות.","astra.idle.11":"חרשו עוד אדמה — הרחיבו את הרשת.","astra.idle.12":"יעד: יותר פקעות, פחות חורים.","astra.idle.13":"המתנה. שומרי לילה — היו מוכנים.","astra.cane.0":"התרעה: עצם ירוק גבוה קדימה!","astra.cane.1":"קפיצת חיישן — עצם ירוק אנכי!","astra.cane.2":"חשד למגע עוין. אשרו!","astra.caneOk.0":"אזעקת שווא: קנה סוכר. לא יצור ירוק.","astra.caneOk.1":"אושר: קנה סוכר. רמת איום אפס.","astra.caneOk.2":"קנה סוכר מאושר. חזרה לסיור.","astra.melon.0":"מגע: אבטיח ברשת. קליפה ירוקה — לא עוין.","astra.melonOk.0":"אבטיחים מחוץ לרשימת השתילה. מיקוד בפקעות ודגנים.","astra.panic.0":"התרעה — יצור ירוק בחווה!","astra.panic.1":"אויב כאן. צוות למקלט. שומרי לילה — התערבו!","astra.panic.2":"מגע קרוב. יירוט עכשיו!","astra.panic.3":"זוהה שריקה. סיכון פיצוץ גבוה!","astra.panic.4":"פינוי צוות. אבטחו פקעות. הגנו!","astra.calm.0":"הכול נקי. חיישנים שקטים. חזרה לשדות.","astra.calm.1":"האיום ירד. המשיכו לקצור.","astra.calm.2":"פרימטר תקין. המתנה.","astra.thanks.0":"סיוע נרשם. תגמול: פקעת.","astra.thanks.1":"הצוות בטוח. קחו פקעת — עבודה טובה.","astra.thanks.2":"איום טופל. אספקה: פקעת אחת.","astra.bossThanks":"בוס נוטרל. מצוין. קחו פקעת.","astra.farmHit.0":"נזק פיצוץ נרשם. אפשר לשתול מחדש.","astra.farmHit.1":"חור ברשת. מלאו באדמה — הצוות ישלים בלילה.","astra.farmHit.2":"נזק לשטח. תיקון כשהשטח נקי.","astra.flung":"יחידת צוות נדחפה!","astra.sulk.0":"לחץ צוות גבוה אחרי מגע ירוק.","astra.sulk.1":"הצוות מתאושש. תנו רגע.","astra.sulk.2":"עדיפות: להרחיק ירוקים מהערוגות.","astra.recover.0":"צוות חזר לפעילות. ממשיכים.","astra.recover.1":"התאוששות הושלמה. מבצעי שדה נמשכים.","astra.cheered.0":"מורל עלה. תודה, שומרי לילה.","astra.talk.0":"ערוץ בקרה פתוח.","astra.talk.1":"תודה על התמיכה בחווה.","astra.talk.2":"במגע ירוק: הצוות במקלט. אתם נלחמים.","astra.talk.3":"טיפ: אבקת שריפה מדשנת יבולים.","astra.talk.4":"ערוגות ליד מים גדלות מהר יותר.","astra.talk.5":"בלי משימות צד. קודם פקעות.","astra.talkHide.0":"צוות נעול בפנים. דווחו כשהירוקים נעלמו.","astra.talkSleep.0":"מצב טעינה… סופרים פקעות…","astra.dusk":"התרעת שקיעה: אויבים מתרבים בלילה. צוות לטעינה על הקיר. הגנו על המוצב.","astra.morning.0":"תדריך בוקר — יום 1. שומרי לילה פעילים.","astra.morning.1":"בוקר: חורים תוקנו בלילה. דחפו קציר.","astra.morning.2":"יום 3. קצב צוות טוב. המשיכו.","astra.morning.3":"בוקר. הצוות נח כי שמרתם בלילה.","astra.morning.4":"יום ניסיון אחרון. חיישנים: ייתכן אויב גדול הלילה.","astra.lesson":"[פרוטוקול] לשאת פריטים קריטיים. לא להשאיר בתיבה בלי שמירה.","astra.death":"המלאי נשמר. הפקעות בטוחות. המשיכו.","astra.greenPotato":"פקעת ירוקה חריגה נרשמה. שלכם.","astra.pig":"המלצה: פיתו חזירים לגדר — אל תרדפו מחוץ לשטח.","astra.caneBroken":"קנה סוכר פונה. פחות אזעקות שווא. תודה.","astra.boss.0":"קריטי: יצור ירוק ענק!","astra.boss.1":"מגע רמת בוס. צוות למקלט. זהירות בהתערבות!","astra.goal.0":"יעד יומי הושלם. ארגז משלוח נטען.","astra.goal.1":"יעד קציר הושג. תפוקה מצוינת.","astra.bonk.0":"אש ידידותית על יחידת צוות. לא אויב.","astra.bonk.1":"זה צוות שדה — לא פקעת.","astra.powder":"אבקת שריפה גם מדשנת. פזרו על יבולים.","astra.box":"ארגז משלוח — לא תיבה. פריטים יוצאים מיד.","astra.warp":"צוות שולח מחור. המשיכו בקרבת מקום.","astra.bed":"מיטה פנויה למנוחה. הרובוטים נטענים על הקיר בלילה.","astra.endless.hello":"עונת החוף. החוף פתוח. אנחנו מגדלים, אתם שומרים.","astra.endless.start":"הניסיון הושלם. החוף הדרומי פנוי — יום 6: עונת חוף.","astra.endless.boss":"בוקר. יום {n}. חיישנים קופצים — אויב גדול בחוף הלילה.","astra.endless.milestone":"יום {n}! יומן המשלוחים מתמלא. כל הכבוד.","astra.endless.morning.0":"בוקר. יום {n}. גידול ביום, שמירה בלילה.","astra.endless.morning.1":"בוקר. יום {n}. שביל החוף מדרום לבית.","astra.endless.morning.2":"יום {n}. יבולים לסירות. ירוקים בשבילכם.","astra.endless.morning.3":"בוקר. אנחנו צוות מזון אמיתי.","astra.endless.morning.4":"יום {n}. יותר קציר, יותר מטבעות, לילות שקטים יותר.","astra.endless.morning.5":"יום {n}. בלי תיבות. פריטים קריטיים עלינו. תמיד.","astra.endless.morning.6":"בוקר. שומרי הלילה החזיקו. חזרה לשדות.","astra.report.good.0":"יעד הושג. משלוח הלילה יהיה כבד.","astra.report.good.1":"קציר נקי. שומרי הלילה הרוויחו את השקט.","astra.report.good.2":"מספיק מזון לסירות ולצוות.","astra.report.ok.0":"מתחת ליעד. היבולים עוד גדלים. מחר דוחפים.","astra.report.ok.1":"פספסנו מספר. אף אחד לא התפוצץ. מקובל.","astra.report.ok.2":"לילות בטוחים חשובים ממספרים מושלמים. ממשיכים."},mb=[{id:"he",label:"עברית"},{id:"en",label:"English"}],pr={he:pb,en:_p};let bp="en";const yh=new Set,tl=i=>typeof i=="string"&&i in pr;function gb(){const i=navigator.languages?.length?navigator.languages:[navigator.language];for(const t of i){const e=String(t||"").toLowerCase().split("-")[0];if(e==="iw"||e==="he")return"he";if(tl(e))return e}return"en"}function Mp(i){if(tl(i)){bp=i,document.documentElement.lang=i,document.documentElement.dir=i==="he"?"rtl":"ltr",yr();for(const t of yh)t(i)}}function Sp(i){return yh.add(i),()=>yh.delete(i)}function W(i,t){const e=pr[bp][i]??pr.en[i]??i;return t?e.replace(/\{(\w+)\}/g,(n,s)=>s in t?String(t[s]):n):e}function yr(i=document){for(const t of i.querySelectorAll("[data-i18n]"))t.textContent=W(t.dataset.i18n);for(const t of i.querySelectorAll("[data-i18n-title]"))t.title=W(t.dataset.i18nTitle);for(const t of i.querySelectorAll("[data-i18n-aria]"))t.setAttribute("aria-label",W(t.dataset.i18nAria))}function xb(){const i=Object.keys(pr.en);return Object.fromEntries(Object.entries(pr).map(([t,e])=>[t,i.filter(n=>!(n in e))]))}function vb(){return pr.en}const wp=["auto","high","medium","low"],Ep=["auto","type1","type2"],Tp=["on","off"],eu=vp("astra-potato-farm.settings",{volume:{master:.9,music:.6,sfx:.8},quality:"low",lang:"",padType:"auto",sens:1,mobGuide:"on"},1),ee=eu.data;ee.lang==="ja"&&(ee.lang="he");tl(ee.lang)||(ee.lang=gb());ee.quality="low";Ep.includes(ee.padType)||(ee.padType="auto");ee.sens>=.2&&ee.sens<=2||(ee.sens=1);Tp.includes(ee.mobGuide)||(ee.mobGuide="on");eu.save();const Lr=new URLSearchParams(location.search),Oa={quality:wp.includes(Lr.get("quality"))?Lr.get("quality"):null,lang:tl(Lr.get("lang"))?Lr.get("lang"):null,mute:Lr.has("mute")},Ap={get quality(){return Oa.quality||ee.quality},get lang(){return Oa.lang||ee.lang}};function yb(){eu.save()}const Xl={master:.9,music:.6,sfx:.8},_b=.4,$l=.75,bb=.72,Yl=(i,t)=>typeof i=="number"&&Number.isFinite(i)?Math.min(1,Math.max(0,i)):t;function Mb(i=4096){const t=new Float32Array(i),e=.72,n=.2;for(let s=0;s<i;s++){const r=s/(i-1)*2-1,o=Math.abs(r);t[s]=Math.sign(r)*(o<=e?o:e+n*Math.tanh((o-e)/n))}return t}function Sb(i,t=1.4,e=3.6){const n=Math.floor(i.sampleRate*t),s=i.createBuffer(2,n,i.sampleRate);let r=12345;const o=()=>(r=r*1664525+1013904223>>>0)/4294967296*2-1;for(let a=0;a<2;a++){const l=s.getChannelData(a);for(let c=0;c<n;c++){const h=c/n;l[c]=o()*Math.pow(1-h,e)*(c<i.sampleRate*.01?c/(i.sampleRate*.01):1)}}return s}function wb(i,t=i.destination,e=Xl){const n=(T=1)=>{const _=i.createGain();return _.gain.value=T,_},s=n(Yl(e.master,Xl.master)),r=i.createBiquadFilter();r.type="highpass",r.frequency.value=24,r.Q.value=.6;const o=i.createDynamicsCompressor();o.threshold.value=-14,o.knee.value=10,o.ratio.value=3.5,o.attack.value=.004,o.release.value=.2;const a=n(bb),l=i.createWaveShaper();l.curve=Mb(),s.connect(r).connect(o).connect(a).connect(l).connect(t);const c=n(1),h=i.createConvolver();h.buffer=Sb(i),c.connect(h).connect(n(.5)).connect(s);const d=n(1),u=n(1);d.connect(s),u.connect(c);const f=(T,_,E)=>{const w={dry:n(T),wet:n(T)};return w.dry.connect(_),w.wet.connect(E),w},g={...Xl};for(const T of Object.keys(g))g[T]=Yl(e[T],g[T]);const x=f(g.music,d,u),m=f(g.sfx,s,c),p=f(g.sfx*$l,s,c),y=(T,_)=>{T.cancelScheduledValues(i.currentTime),T.setTargetAtTime(_,i.currentTime,.04)};return{ctx:i,master:s,music:x,sfx:m,amb:p,revIn:c,get volume(){return{...g}},setVolume(T={}){for(const _ of Object.keys(g))T[_]!==void 0&&(g[_]=Yl(T[_],g[_]));y(s.gain,g.master),y(x.dry.gain,g.music),y(x.wet.gain,g.music),y(m.dry.gain,g.sfx),y(m.wet.gain,g.sfx),y(p.dry.gain,g.sfx*$l),y(p.wet.gain,g.sfx*$l)},duck(T,_=i.currentTime){for(const E of[d.gain,u.gain])E.cancelScheduledValues(_),E.setTargetAtTime(T?_b:1,_,T?.05:.35)}}}const Ie=(i,t)=>typeof i=="number"&&Number.isFinite(i)?i:t,Eb=i=>440*Math.pow(2,(i-69)/12),Ai=1e-4,Dd=new WeakMap;function Tb(i){let t=Dd.get(i);if(!t){const e=i.sampleRate*1.5;t=i.createBuffer(1,e,i.sampleRate);const n=t.getChannelData(0);let s=22222;for(let r=0;r<e;r++)n[r]=(s=s*1664525+1013904223>>>0)/4294967296*2-1;Dd.set(i,t)}return t}function Gt(i,t,e,n){const s=i.createGain();s.gain.value=0;let r=t.connect(s);if(n.pan){const a=i.createStereoPanner();a.pan.value=Math.max(-1,Math.min(1,Ie(n.pan,0))),r=r.connect(a)}r.connect(e.dry);const o=Ie(n.rev,0);if(o>0){const a=i.createGain();a.gain.value=o,r.connect(a).connect(e.wet)}return s}function Xt(i,t,e,n,s){i.setValueAtTime(Ai,t),i.linearRampToValueAtTime(Math.max(Ai,e),t+n),i.exponentialRampToValueAtTime(Ai,t+n+s)}function Sa(i,t,e,n,s,r){i.setValueAtTime(Ai,t),i.linearRampToValueAtTime(Math.max(Ai,e),t+n),i.setValueAtTime(Math.max(Ai,e),t+n+s),i.exponentialRampToValueAtTime(Ai,t+n+s+r)}function ve(i,t,e,n,s){const r=i.createOscillator();return r.type=t,r.frequency.setValueAtTime(Math.max(1,e),n),r.start(n),r.stop(s+.05),r}function $e(i,t,e){const n=i.createBufferSource();return n.buffer=Tb(i),n.loop=!0,n.start(t,Math.random()*1.2),n.stop(e+.05),n}function ce(i,t,e,n=.8){const s=i.createBiquadFilter();return s.type=t,s.frequency.value=Math.max(10,e),s.Q.value=n,s}const Dr=(i,t)=>Ie(i.f,i.m!==void 0?Eb(Ie(i.m,69)):t),Be={lead(i,t,e,n){const s=Dr(n,440),r=Ie(n.dur,.25),o=Ie(n.vel,.8),a=ve(i,"square",s,e,e+r+.2),l=ce(i,"lowpass",Math.min(9e3,s*6),.7),c=Gt(i,a.connect(l),t,{rev:.18,...n});Sa(c.gain,e,.14*o,.006,Math.max(0,r-.03),.12)},bass(i,t,e,n){const s=Dr(n,55),r=Ie(n.dur,.25),o=Ie(n.vel,.8),a=ve(i,"sawtooth",s,e,e+r+.15),l=ce(i,"lowpass",900,3);l.frequency.setValueAtTime(220+2200*o,e),l.frequency.exponentialRampToValueAtTime(260,e+.18);const c=Gt(i,a.connect(l),t,n);Sa(c.gain,e,.3*o,.004,Math.max(0,r-.04),.08)},pad(i,t,e,n){const s=Dr(n,220),r=Ie(n.dur,1),o=Ie(n.vel,.6),a=ce(i,"lowpass",1800,.5),l=i.createGain();for(const h of[-7,6]){const d=ve(i,"sawtooth",s,e,e+r+.8);d.detune.value=h,d.connect(l)}l.gain.value=.45;const c=Gt(i,l.connect(a),t,{rev:.28,...n});Sa(c.gain,e,.09*o,.12,Math.max(0,r-.12),.6)},pluck(i,t,e,n){const s=Dr(n,440),r=Ie(n.vel,.8),o=ve(i,"triangle",s,e,e+.6),a=ve(i,"sine",s*2,e,e+.25),l=i.createGain();o.connect(l),a.connect(l);const c=Gt(i,l,t,{rev:.2,...n});Xt(c.gain,e,.25*r,.003,.45)},bell(i,t,e,n){const s=Dr(n,880),r=Ie(n.vel,.7),o=Ie(n.dur,1.4),a=ve(i,"sine",s,e,e+o),l=ve(i,"sine",s*3.5,e,e+o),c=i.createGain();c.gain.setValueAtTime(s*2.2,e),c.gain.exponentialRampToValueAtTime(Math.max(1,s*.05),e+o),l.connect(c).connect(a.frequency);const h=Gt(i,a,t,{rev:.35,...n});Xt(h.gain,e,.18*r,.002,o)},kick(i,t,e,n){const s=Ie(n.vel,.9),r=ve(i,"sine",150,e,e+.45);r.frequency.exponentialRampToValueAtTime(42,e+.12);const o=Gt(i,r,t,n);Xt(o.gain,e,.9*s,.002,.38)},snare(i,t,e,n){const s=Ie(n.vel,.8),r=$e(i,e,e+.25),o=Gt(i,r.connect(ce(i,"bandpass",1800,.7)),t,{rev:.15,...n});Xt(o.gain,e,.5*s,.001,.18);const a=ve(i,"triangle",190,e,e+.15),l=Gt(i,a,t,n);Xt(l.gain,e,.3*s,.001,.09)},hat(i,t,e,n){const s=Ie(n.vel,.6),r=!!n.open,o=$e(i,e,e+(r?.35:.08)),a=Gt(i,o.connect(ce(i,"highpass",7500,.7)),t,n);Xt(a.gain,e,.22*s,.001,r?.3:.05)}},Rp={ui_move(i,t,e){Be.pluck(i,t,e,{f:1320,vel:.35,rev:0})},ui_ok(i,t,e){Be.pluck(i,t,e,{f:988,vel:.5}),Be.pluck(i,t,e+.06,{f:1480,vel:.5})},ui_back(i,t,e){Be.pluck(i,t,e,{f:880,vel:.45}),Be.pluck(i,t,e+.06,{f:587,vel:.45})},pause(i,t,e){Be.bell(i,t,e,{f:784,vel:.9,dur:.6})},jump(i,t,e,n={}){const s=$e(i,e,e+.08),r=Gt(i,s.connect(ce(i,"bandpass",900,.9)),t,n);Xt(r.gain,e,.08,.003,.06)},land(i,t,e,n={}){const s=$e(i,e,e+.12),r=Gt(i,s.connect(ce(i,"lowpass",600,.9)),t,n);Xt(r.gain,e,.35*Ie(n.vel,1),.002,.1)},step(i,t,e,n={}){const s=n.kind==="sand",r=$e(i,e,e+.1),o=Gt(i,r.connect(ce(i,"bandpass",(s?2600:1500)*(.85+Math.random()*.3),1.1)),t,n);Xt(o.gain,e,s?.07:.09,.004,.07)},till(i,t,e,n={}){for(const[o,a,l]of[[0,800,.4],[.07,1100,.3]]){const c=$e(i,e+o,e+o+.15),h=Gt(i,c.connect(ce(i,"bandpass",a,1.4)),t,n);Xt(h.gain,e+o,l,.003,.11)}const s=ve(i,"sine",140,e,e+.15);s.frequency.exponentialRampToValueAtTime(70,e+.12);const r=Gt(i,s,t,n);Xt(r.gain,e,.25,.002,.12)},plant(i,t,e,n={}){const s=ve(i,"sine",560,e,e+.15);s.frequency.exponentialRampToValueAtTime(260,e+.09);const r=Gt(i,s,t,n);Xt(r.gain,e,.22,.002,.1);const o=$e(i,e,e+.1),a=Gt(i,o.connect(ce(i,"highpass",2500,.7)),t,n);Xt(a.gain,e,.05,.002,.08)},harvest(i,t,e,n={}){const s=ve(i,"sine",820,e,e+.2);s.frequency.exponentialRampToValueAtTime(330,e+.11);const r=Gt(i,s,t,{rev:.1,...n});Xt(r.gain,e,.38,.002,.13);const o=$e(i,e,e+.12),a=Gt(i,o.connect(ce(i,"bandpass",3e3,.8)),t,n);Xt(a.gain,e,.07,.002,.09),Be.pluck(i,t,e+.05,{f:1046,vel:.35,rev:.15})},pluck(i,t,e,n={}){const s=$e(i,e,e+.15),r=Gt(i,s.connect(ce(i,"highpass",2200,.7)),t,n);Xt(r.gain,e,.12,.002,.12);const o=ve(i,"triangle",600,e,e+.1);o.frequency.exponentialRampToValueAtTime(300,e+.06);const a=Gt(i,o,t,n);Xt(a.gain,e,.12,.002,.06)},pickup(i,t,e,n={}){const s=Ie(n.pitch,1),r=ve(i,"sine",900*s,e,e+.12);r.frequency.exponentialRampToValueAtTime(1500*s,e+.05);const o=Gt(i,r,t,n);Xt(o.gain,e,.16,.002,.08)},swing(i,t,e,n={}){const s=$e(i,e,e+.2),r=ce(i,"bandpass",600,1.4);r.frequency.setValueAtTime(500,e),r.frequency.exponentialRampToValueAtTime(2600,e+.14);const o=Gt(i,s.connect(r),t,n);Xt(o.gain,e,.3,.03,.12)},hit(i,t,e,n={}){const s=ve(i,"sine",200,e,e+.2);s.frequency.exponentialRampToValueAtTime(70,e+.12);const r=Gt(i,s,t,n);Xt(r.gain,e,.5,.002,.14);const o=$e(i,e,e+.1),a=Gt(i,o.connect(ce(i,"lowpass",1400,.8)),t,n);Xt(a.gain,e,.35,.002,.07),n.crit&&Be.pluck(i,t,e,{f:1760,vel:.5,rev:.1})},hiss(i,t,e,n={}){const s=n.big?2.4:1.5,r=$e(i,e,e+s+.1),o=ce(i,"highpass",n.big?1200:2400,.7),a=ce(i,"bandpass",3500,.6);a.frequency.setValueAtTime(n.big?1800:3e3,e),a.frequency.linearRampToValueAtTime(n.big?3500:6e3,e+s);const l=Gt(i,r.connect(o).connect(a),t,n);l.gain.setValueAtTime(Ai,e),l.gain.linearRampToValueAtTime(.45,e+.15),l.gain.linearRampToValueAtTime(.6,e+s),l.gain.exponentialRampToValueAtTime(Ai,e+s+.08)},explode(i,t,e,n={}){const s=Ie(n.dur,1.2),r=$e(i,e,e+s),o=ce(i,"lowpass",3e3,.6);o.frequency.setValueAtTime(n.big?2200:3200,e),o.frequency.exponentialRampToValueAtTime(90,e+s);const a=Gt(i,r.connect(o),t,{rev:.35,...n});Xt(a.gain,e,n.big?.95:.8,.004,s);const l=ve(i,"sine",n.big?70:95,e,e+s);l.frequency.exponentialRampToValueAtTime(28,e+s*.8);const c=Gt(i,l,t,n);Xt(c.gain,e,n.big?.9:.7,.004,s*.8)},poof(i,t,e,n={}){const s=$e(i,e,e+.4),r=ce(i,"lowpass",1600,.7);r.frequency.setValueAtTime(1600,e),r.frequency.exponentialRampToValueAtTime(300,e+.3);const o=Gt(i,s.connect(r),t,{rev:.2,...n});Xt(o.gain,e,.45,.01,.3),Be.pluck(i,t,e+.05,{f:523,vel:.4}),Be.pluck(i,t,e+.11,{f:784,vel:.4})},robot_talk(i,t,e,n={}){const s=Math.max(1,Math.min(7,Ie(n.n,3)));for(let r=0;r<s;r++){const o=620+Math.random()*520,a=ve(i,r%2?"square":"triangle",o,e+r*.075,e+r*.075+.07),l=Gt(i,a.connect(ce(i,"lowpass",2600,.7)),t,n);Xt(l.gain,e+r*.075,.07,.004,.05)}},robot_scream(i,t,e,n={}){for(let s=0;s<9;s++){const r=1500-s*80+s%2*200,o=ve(i,"square",r,e+s*.055,e+s*.055+.05),a=Gt(i,o.connect(ce(i,"lowpass",3500,.7)),t,n);Xt(a.gain,e+s*.055,.06,.003,.04)}},hurt(i,t,e,n={}){const s=ve(i,"square",n.big?180:240,e,e+.3);s.frequency.exponentialRampToValueAtTime(n.big?70:110,e+.2);const r=Gt(i,s.connect(ce(i,"lowpass",1200,.9)),t,n);Xt(r.gain,e,.22,.003,.22)},eat(i,t,e,n={}){for(let s=0;s<3;s++){const r=e+s*.13,o=$e(i,r,r+.08),a=Gt(i,o.connect(ce(i,"bandpass",1300+Math.random()*600,1.3)),t,n);Xt(a.gain,r,.3,.003,.06)}},fertilize(i,t,e,n={}){[1319,1568,2093,2637].forEach((o,a)=>Be.bell(i,t,e+a*.05,{f:o,vel:.35,dur:.6}));const s=$e(i,e,e+.2),r=Gt(i,s.connect(ce(i,"highpass",4e3,.7)),t,n);Xt(r.gain,e,.06,.01,.18)},place(i,t,e,n={}){const s=$e(i,e,e+.12),r=Gt(i,s.connect(ce(i,"lowpass",800,.9)),t,n);Xt(r.gain,e,.4,.002,.09);const o=ve(i,"sine",150,e,e+.12),a=Gt(i,o,t,n);Xt(a.gain,e,.25,.002,.09)},bonk(i,t,e,n={}){const s=ve(i,"triangle",420,e,e+.2),r=ve(i,"sine",1260,e,e+.1),o=i.createGain();s.connect(o),r.connect(o);const a=Gt(i,o,t,n);Xt(a.gain,e,.3,.002,.15)},pig(i,t,e,n={}){const s=ve(i,"sawtooth",230,e,e+.3);s.frequency.setValueAtTime(230,e),s.frequency.linearRampToValueAtTime(300,e+.08),s.frequency.linearRampToValueAtTime(190,e+.24);const r=ce(i,"bandpass",700,2.5),o=Gt(i,s.connect(r),t,n);Xt(o.gain,e,.35*Ie(n.vel,1),.02,.22)},splash(i,t,e,n={}){const s=$e(i,e,e+.5),r=ce(i,"bandpass",1200,.6);r.frequency.setValueAtTime(1800,e),r.frequency.exponentialRampToValueAtTime(500,e+.4);const o=Gt(i,s.connect(r),t,{rev:.2,...n});Xt(o.gain,e,.3,.01,.4)},morning(i,t,e){[523,659,784,1047].forEach((n,s)=>Be.pluck(i,t,e+s*.09,{f:n,vel:.45,rev:.3})),Be.bell(i,t,e+.4,{f:1568,vel:.35,dur:1.2})},night(i,t,e){Be.bell(i,t,e,{f:440,vel:.5,dur:1.6}),Be.bell(i,t,e+.35,{f:330,vel:.45,dur:2})},goal(i,t,e){[523,659,784,1047,1319].forEach((n,s)=>Be.pluck(i,t,e+s*.06,{f:n,vel:.55,rev:.25})),Be.bell(i,t,e+.32,{f:2093,vel:.45,dur:1.4}),Be.bell(i,t,e+.32,{f:1568,vel:.35,dur:1.4})},ding(i,t,e){Be.bell(i,t,e,{f:1319,vel:.5,dur:.9}),Be.bell(i,t,e+.1,{f:1760,vel:.4,dur:.9})},mob_spawn(i,t,e,n={}){for(let o=0;o<3;o++){const a=$e(i,e+o*.12,e+o*.12+.1),l=Gt(i,a.connect(ce(i,"bandpass",700,1.2)),t,n);Xt(l.gain,e+o*.12,.25,.003,.08)}const s=ve(i,"sine",90,e,e+.4),r=Gt(i,s,t,n);Xt(r.gain,e,.3,.01,.35)},boss_spawn(i,t,e,n={}){for(let s=0;s<2;s++){const r=ve(i,"sawtooth",55+s*27.5,e,e+1.6),o=Gt(i,r.connect(ce(i,"lowpass",400,1)),t,{rev:.3,...n});Sa(o.gain,e,.3,.1,.8,.6)}Rp.mob_spawn(i,t,e,n)},bird(i,t,e,n={}){const s=1+Math.floor(Math.random()*3),r=2400+Math.random()*1400;for(let o=0;o<s;o++){const a=e+o*(.09+Math.random()*.05),l=ve(i,"sine",r,a,a+.1);l.frequency.setValueAtTime(r,a),l.frequency.exponentialRampToValueAtTime(r*(1.25+Math.random()*.3),a+.05),l.frequency.exponentialRampToValueAtTime(r*.9,a+.08);const c=Gt(i,l,t,{pan:(Math.random()-.5)*1.4,rev:.4,...n});Xt(c.gain,a,.035,.005,.07)}},coin(i,t,e,n={}){const s=Ie(n.pitch,1);for(const[r,o]of[[0,1319],[.07,1976]]){const a=ve(i,"square",o*s,e+r,e+r+.3),l=Gt(i,a.connect(ce(i,"lowpass",6e3)),t,{rev:.15,...n});Xt(l.gain,e+r,.1,.002,r?.26:.08)}},turret_pop(i,t,e,n={}){const s=Ie(n.pitch,1),r=$e(i,e,e+.14),o=ce(i,"bandpass",1100*s,.85);o.frequency.setValueAtTime(1600*s,e),o.frequency.exponentialRampToValueAtTime(320*s,e+.11);const a=Gt(i,r.connect(o),t,{rev:.12,...n});Xt(a.gain,e,.5,.002,.1);const l=ve(i,"triangle",980*s,e,e+.14);l.frequency.exponentialRampToValueAtTime(420*s,e+.12);const c=Gt(i,l,t,n);Xt(c.gain,e,.2,.002,.1),Be.pluck(i,t,e+.03,{f:1245*s,vel:.38,rev:.1})},turret_coin(i,t,e,n={}){const s=Ie(n.pitch,1);[[0,1047],[.055,1319],[.11,1568],[.18,2093]].forEach(([r,o],a)=>{const l=ve(i,"square",o*s,e+r,e+r+.28),c=Gt(i,l.connect(ce(i,"lowpass",7200)),t,{rev:.2,...n});Xt(c.gain,e+r,.11-a*.01,.002,.2)})}},Ab={C:0,D:2,E:4,F:5,G:7,A:9,B:11};function Rb(i){if(i[0]==="n")return Number(i.slice(1));const t=/^([A-G])(#|b)?(-?\d)$/.exec(i);return t?12*(Number(t[3])+1)+Ab[t[1]]+(t[2]==="#"?1:t[2]==="b"?-1:0):NaN}function Cb(i){const t=i.steps||16,e=i.bars||Math.max(...Object.values(i.tracks).map(r=>r.bars.length)),n=[],s=Array.from({length:e},()=>[]);for(const[r,o]of Object.entries(i.tracks))for(let a=0;a<e;a++){const l=o.bars[a%o.bars.length];if(!l)continue;if(typeof l=="object"){for(const[d,u]of Object.entries(l))[...u.replace(/\s/g,"")].forEach((f,g)=>{if(f==="."||g>=t)return;const x=f==="X"?1:f==="o"?.45:.75;s[a].push({step:g,inst:d,len:1,vel:x*(o.vol??1),pan:o.pan,rev:o.rev,open:d==="hat"&&f==="O"})});continue}const c=l.trim().split(/\s+/);c.length!==t&&n.push(`${r} 小節 ${a+1}: ${c.length} 個（${t} 個のはず）`);let h=null;c.forEach((d,u)=>{if(d==="-"){h&&h.forEach(m=>m.len++);return}if(h=null,d===".")return;const f=/^([^!?]+)([!?]?)$/.exec(d),g=f?f[1].split("+").map(Rb):[NaN];if(g.some(m=>!Number.isFinite(m))){n.push(`${r} 小節 ${a+1}: '${d}' が読めない`);return}const x=(f[2]==="!"?1:f[2]==="?"?.5:.8)*(o.vol??1);h=g.map(m=>({step:u,inst:o.inst,m:m+(o.transpose||0),len:1,vel:x,pan:o.pan,rev:o.rev})),s[a].push(...h)})}return{bars:s,steps:t,warn:n}}const Pb=.45,Lb=50,Db=.03;class Ib{constructor(t,e,n){this.ctx=t,this.song=n;const s=Cb(n);s.warn.length&&console.warn("[sequencer]",n.id||"",s.warn),this.bars=s.bars,this.steps=s.steps,this.stepDur=60/(n.bpm||120)/4,this.gain=t.createGain(),this.gain.gain.value=0,this.dry=t.createGain(),this.wet=t.createGain(),this.dry.connect(this.gain).connect(e.dry),this.wet.connect(e.wet),this.bus={dry:this.dry,wet:this.wet},this.timer=0,this.playing=!1}prime(t,e=0){this.playing=!0,this.t0=e,this.next=0,this.gain.gain.setValueAtTime(this.song.gain??1,e),this._schedule(t),this.playing=!1}start(t=this.ctx.currentTime+.05,e=.3){this.playing=!0,this.t0=t,this.next=0;const n=this.gain.gain;n.cancelScheduledValues(t),n.setValueAtTime(1e-4,t),n.linearRampToValueAtTime(this.song.gain??1,t+Math.max(.01,e)),this._tick(),this.timer=setInterval(()=>this._tick(),Lb)}tick(){this._tick()}stop(t=.5){if(!this.playing)return;this.playing=!1,clearInterval(this.timer);const e=this.ctx.currentTime,n=this.gain.gain;n.cancelScheduledValues(e),n.setValueAtTime(n.value,e),n.linearRampToValueAtTime(0,e+Math.max(.02,t)),setTimeout(()=>{this.dry.disconnect(),this.wet.disconnect()},(t+1.5)*1e3)}_finish(t){if(!this.playing)return;this.playing=!1,clearInterval(this.timer);const e=this.gain.gain;e.setValueAtTime(this.song.gain??1,t),e.linearRampToValueAtTime(0,t+2.5);const n=Math.max(0,t-this.ctx.currentTime)+4;setTimeout(()=>{this.dry.disconnect(),this.wet.disconnect()},n*1e3)}_tick(){this.playing&&this._schedule(this.ctx.currentTime+Pb)}_schedule(t){const e=this.bars.length*this.steps,n=this.ctx.currentTime;for(;this.playing&&this.t0+this.next*this.stepDur<n-Db;){if(this.next>=e&&this.song.loop===!1){this._finish(this.t0+e*this.stepDur);return}this.next++}for(;this.t0+this.next*this.stepDur<t;){if(this.next>=e&&this.song.loop===!1){this._finish(this.t0+e*this.stepDur);return}const s=this.next%e,r=this.bars[Math.floor(s/this.steps)],o=s%this.steps,a=this.t0+this.next*this.stepDur;for(const l of r){if(l.step!==o)continue;const c=Be[l.inst];if(c)try{c(this.ctx,this.bus,a,{m:l.m,dur:l.len*this.stepDur,vel:l.vel,pan:l.pan,rev:l.rev,open:l.open})}catch(h){console.warn("[sequencer]",l.inst,h)}}this.next++}}}const Qo=". . . . . . . . . . . . . . . .",Id={title:{id:"title",bpm:80,gain:.85,tracks:{pad:{inst:"pad",vol:.7,bars:["C4+E4+G4+B4 - - - - - - - - - - - - - - -","A3+C4+E4+G4 - - - - - - - - - - - - - - -","F3+A3+C4+E4 - - - - - - - - - - - - - - -","G3+B3+D4+E4 - - - - - - - - - - - - - - -"]},pluck:{inst:"pluck",vol:.45,pan:.2,bars:["C5 . G4 . E5 . G4 . B4 . G4 . E5 . D5 .","A4 . E4 . C5 . E4 . G4 . E4 . C5 . B4 .","F4 . C5 . A4 . C5 . E5 . C5 . A4 . G4 .","G4 . D5 . B4 . D5 . E5 . D5 . B4 . . ."]},bell:{inst:"bell",vol:.5,pan:-.2,bars:["E6 - - - . . . . G6 - - - . . . .",". . . . C6 - - - . . . . B5 - - -","A5 - - - . . . . C6 - - - . . . .","B5 - - - - - - - . . . . . . . .","E6 - - - . . . . D6 - - - . . . .",". . . . C6 - - - . . . . E6 - - -","F6 - - - . . . . E6 - - - C6 - - -","D6 - - - - - - - . . . . . . . ."]},bass:{inst:"bass",vol:.35,bars:["C2 - - - - - - - . . . . . . . .","A1 - - - - - - - . . . . . . . .","F1 - - - - - - - . . . . . . . .","G1 - - - - - - - . . . . . . . ."]}}},day:{id:"day",bpm:108,gain:.7,tracks:{drums:{inst:"drums",vol:.55,bars:[{kick:"x.......x.......",hat:"..o...o...o...o."},{kick:"x.......x.....o.",hat:"..o...o...o.o.o."}]},bass:{inst:"bass",vol:.45,bars:["F2 . . . C3 . . . F2 . . . C3 . A2 .","C2 . . . G2 . . . C2 . . . G2 . E2 .","D2 . . . A2 . . . D2 . . . A2 . F2 .","Bb1 . . . F2 . . . Bb1 . . . C2 . E2 .","F2 . . . C3 . . . F2 . . . C3 . A2 .","C2 . . . G2 . . . C2 . . . G2 . E2 .","Bb1 . . . F2 . . . Bb1 . . . D2 . F2 .","C2 . . . G2 . . . C2 . E2 . G2 . . ."]},chords:{inst:"pluck",vol:.32,pan:.25,bars:[". . A4+C5 . . . A4+C5 . . . A4+C5 . . . A4+C5 .",". . G4+C5 . . . G4+C5 . . . G4+E5 . . . G4+C5 .",". . F4+A4 . . . F4+A4 . . . F4+D5 . . . F4+A4 .",". . F4+Bb4 . . . F4+Bb4 . . . G4+C5 . . . G4+Bb4 .",". . A4+C5 . . . A4+C5 . . . A4+C5 . . . A4+C5 .",". . G4+C5 . . . G4+C5 . . . G4+E5 . . . G4+C5 .",". . F4+Bb4 . . . F4+Bb4 . . . F4+D5 . . . F4+Bb4 .",". . G4+C5 . . . G4+C5 . . . G4+E5 . . . G4+Bb4 ."]},lead:{inst:"lead",vol:.42,pan:-.15,bars:["C5 - A4 - C5 - F5 - - - E5 - D5 - C5 -","E5 - - - D5 - C5 - D5 - - - . . . .","D5 - F5 - A5 - - - G5 - F5 - E5 - D5 -","F5 - - - - - - - . . . . C5 - E5 -","F5 - E5 - F5 - A5 - - - G5 - F5 - E5 -","G5 - - - E5 - C5 - E5 - - - . . . .","D5 - - - F5 - - - Bb4 - D5 - F5 - E5 -","E5 - - - - - - - . . . . . . . ."]}}},night:{id:"night",bpm:76,gain:.75,tracks:{pad:{inst:"pad",vol:.55,bars:["A3+C4+E4 - - - - - - - - - - - - - - -","F3+A3+C4 - - - - - - - - - - - - - - -","G3+B3+D4 - - - - - - - - - - - - - - -","E3+G3+B3 - - - - - - - - - - - - - - -"]},arp:{inst:"pluck",vol:.4,pan:.2,bars:["A3 . E4 . A4 . C5 . E5 . C5 . A4 . E4 .","F3 . C4 . F4 . A4 . C5 . A4 . F4 . C4 .","G3 . D4 . G4 . B4 . D5 . B4 . G4 . D4 .","E3 . B3 . E4 . G4 . B4 . G4 . E4 . B3 ."]},bell:{inst:"bell",vol:.4,pan:-.25,bars:["E5 - - - - - - - . . . . . . . .",". . . . . . . . C5 - - - - - - -","D5 - - - - - - - . . . . B4 - - -",Qo]},bass:{inst:"bass",vol:.3,bars:["A1 - - - - - - - - - - - - - - -","F1 - - - - - - - - - - - - - - -","G1 - - - - - - - - - - - - - - -","E1 - - - - - - - - - - - - - - -"]}}},boss:{id:"boss",bpm:126,gain:.72,tracks:{drums:{inst:"drums",vol:.75,bars:[{kick:"x...x...x...x...",snare:"....x.......x...",hat:"x.x.x.x.x.x.x.x."},{kick:"x...x...x...x.x.",snare:"....x.......x..o",hat:"x.x.x.x.x.x.xxxx"}]},bass:{inst:"bass",vol:.6,bars:["D2 . D2 . D3 . D2 . D2 . D2 . C3 . A2 .","Bb1 . Bb1 . Bb2 . Bb1 . C2 . C2 . C3 . A1 ."]},pad:{inst:"pad",vol:.35,bars:["D3+F3+A3 - - - - - - - - - - - - - - -","Bb2+D3+F3 - - - - - - - C3+E3+G3 - - - - - - -"]},lead:{inst:"lead",vol:.5,pan:-.1,bars:["D5 - - F5 - - A5 - G5 - F5 - E5 - - -","F5 - - E5 - - D5 - C5 - - - A4 - - -","D5 - - F5 - - A5 - D6 - C6 - A5 - - -","Bb5 - - A5 - - G5 - A5 - - - - - - -"]}}},report:{id:"report",bpm:120,gain:.85,loop:!1,bars:2,tracks:{pluck:{inst:"pluck",vol:.7,bars:["C5 E5 G5 C6 - - - - . . . . . . . .",Qo]},bell:{inst:"bell",vol:.6,bars:[". . . . C6+E6+G6 - - - - - - - . . . .",Qo]},pad:{inst:"pad",vol:.5,bars:["C4+E4+G4 - - - - - - - - - - - - - - -",Qo]}}},ending:{id:"ending",bpm:92,gain:.8,tracks:{pad:{inst:"pad",vol:.55,bars:["C4+E4+G4 - - - - - - - - - - - - - - -","B3+D4+G4 - - - - - - - - - - - - - - -","A3+C4+E4 - - - - - - - - - - - - - - -","F3+A3+C4 - - - - - - - - - - - - - - -","C4+E4+G4 - - - - - - - - - - - - - - -","B3+D4+G4 - - - - - - - - - - - - - - -","F3+A3+C4 - - - - - - - G3+B3+D4 - - - - - - -","C4+E4+G4 - - - - - - - - - - - - - - -"]},arp:{inst:"pluck",vol:.38,pan:.2,bars:["C4 . G4 . C5 . E5 . G4 . C5 . E5 . G5 .","G3 . D4 . G4 . B4 . D4 . G4 . B4 . D5 .","A3 . E4 . A4 . C5 . E4 . A4 . C5 . E5 .","F3 . C4 . F4 . A4 . C4 . F4 . A4 . C5 ."]},bell:{inst:"bell",vol:.5,pan:-.2,bars:["E5 - - - G5 - - - C6 - - - B5 - G5 -","D5 - - - - - - - . . . . G5 - A5 -","C6 - - - B5 - A5 - E5 - - - . . . .","F5 - - - A5 - - - C6 - - - A5 - - -","G5 - - - E5 - - - C5 - - - E5 - G5 -","D6 - - - - - - - B5 - - - G5 - - -","A5 - - - C6 - - - F5 - - - A5 - - -","C6 - - - - - - - - - - - . . . ."]},bass:{inst:"bass",vol:.35,bars:["C2 - - - - - - - C2 - - - . . . .","G1 - - - - - - - G1 - - - . . . .","A1 - - - - - - - A1 - - - . . . .","F1 - - - - - - - F1 - - - . . . ."]}}}},Nb={wind:{level:.25,build(i,t){const e=t.filter("bandpass",380,.8);return t.noise().connect(e),t.lfo(.07,180,e.frequency),e}},rain:{level:.5,build(i,t){const e=t.gain(1);return t.noise().connect(t.filter("highpass",500)).connect(t.filter("lowpass",7500)).connect(e),t.noise(1.3).connect(t.filter("lowpass",420,.9)).connect(t.gain(.7)).connect(e),e}},rainIndoor:{level:.5,build(i,t){return t.noise(.7).connect(t.filter("lowpass",900,.8))}},drone:{level:.08,build(i,t){const e=t.filter("lowpass",380,.9);for(const[n,s]of[[55,0],[82.6,4],[110.3,-3],[164.8,7]]){const r=t.osc(n>100?"sine":"sawtooth",n);r.detune.value=s,r.connect(t.gain(n>100?.25:.12)).connect(e)}return t.lfo(.05,140,e.frequency),e}},crickets:{level:.045,build(i,t){const e=t.gain(1);for(const[n,s,r]of[[4400,23,.7],[3900,19,.45],[4800,27,.9]]){const o=t.gain(.5);t.lfo(s,.5,o.gain);const a=t.gain(.5);t.lfo(r,.5,a.gain),t.osc("sine",n).connect(o).connect(a).connect(e)}return e.connect(t.filter("highpass",2500))}},hum:{level:.025,build(i,t){const e=t.gain(1);for(const[n,s]of[[100,.5],[200,.25],[300,.12]])t.osc("sine",n).connect(t.gain(s)).connect(e);return e}}};function kb(i,t){const e=i.sampleRate*3,n=i.createBuffer(2,e,i.sampleRate);let s=4242;for(let a=0;a<2;a++){const l=n.getChannelData(a);let c=0,h=0,d=0;for(let u=0;u<e;u++){const f=(s=s*1664525+1013904223>>>0)/4294967296*2-1;c=.99765*c+f*.099,h=.963*h+f*.2965,d=.57*d+f*1.0527,l[u]=(c+h+d+f*.1848)*.2}}const r={gain:(a=0)=>{const l=i.createGain();return l.gain.value=a,l},filter:(a,l,c=.7)=>{const h=i.createBiquadFilter();return h.type=a,h.frequency.value=l,h.Q.value=c,h},noise:(a=1)=>{const l=i.createBufferSource();return l.buffer=n,l.loop=!0,l.playbackRate.value=a,l.start(i.currentTime,Math.random()*2),l},osc:(a,l)=>{const c=i.createOscillator();return c.type=a,c.frequency.value=l,c.start(),c},lfo:(a,l,c)=>{const h=r.osc("sine",a);return h.connect(r.gain(l)).connect(c),h}},o={};for(const[a,l]of Object.entries(Nb)){const c=r.gain(0);l.build(i,r).connect(c),c.connect(t.dry),c.connect(r.gain(.4)).connect(t.wet),o[a]={gain:c,level:l.level}}return o}let Ub=0;const Wn=(i,t)=>{Ub++<8&&console.warn("[audio] "+i+":",t)};class Fb{constructor(t,{muted:e=!1}={}){this.vol={...t},this.muted=e,this.ctx=null,this.mix=null,this.seq=null,this.songId=null,this.pending=null,this._last=new Map,this.loops=new Map,this.amb=null,this.ambWant={},document.addEventListener("visibilitychange",()=>{this.ctx&&(document.hidden?this.ctx.suspend().catch(()=>{}):this._unlocked&&this.ctx.resume().catch(()=>{}))})}get ready(){return!!this.ctx&&this.ctx.state==="running"}async unlock(){if(this.muted)return!1;try{if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;if(!t)return!1;this.ctx=new t({latencyHint:"playback"}),this.mix=wb(this.ctx,this.ctx.destination,this.vol)}if(this.ctx.state!=="running"&&await this.ctx.resume(),this._unlocked=!0,!this.amb)try{this.amb=kb(this.ctx,this.mix.amb),this.setAmbience(this.ambWant)}catch(t){Wn("ambience",t)}if(this.pending&&!this.seq){const t=this.pending;this.pending=null,this.music(t.id,t.opts)}}catch(t){Wn("unlock",t)}return this.ready}sfx(t,e={}){try{if(!this.ready)return;const n=Rp[t];if(!n){Wn("sfx",`unknown "${t}"`);return}const s=this.ctx.currentTime;if(s-(this._last.get(t)??-1)<(e.minGap??.03))return;this._last.set(t,s);const r=e.pos?this._spatial(e.pos,e):e.bus==="amb"?this.mix.amb:this.mix.sfx;n(this.ctx,r,s+.005,e)}catch(n){Wn("sfx "+t,n)}}_spatial(t,{refDistance:e=2.5,rolloff:n=1.1,rev:s=.35}={}){const r=this.ctx,o=r.createPanner();o.panningModel="HRTF",o.distanceModel="inverse",o.refDistance=e,o.rolloffFactor=n,o.maxDistance=500;const a=d=>Number.isFinite(d)?d:0;o.positionX.value=a(t.x),o.positionY.value=a(t.y),o.positionZ.value=a(t.z),o.connect(this.mix.sfx.dry);const l=r.createGain();l.gain.value=s,o.connect(l).connect(this.mix.sfx.wet);const c=r.createGain(),h=r.createGain();return c.connect(o),h.connect(o),{dry:c,wet:h}}loop(t,e,{period:n=2,jitter:s=0,...r}={}){this.loops.set(t,{name:e,period:n,jitter:s,p:r,wait:0})}stopLoop(t){this.loops.delete(t)}tick(t){if(this.ready){try{this.seq?.tick()}catch(e){Wn("seq.tick",e)}for(const e of this.loops.values())(e.wait-=t)>0||(e.wait=Math.max(.05,e.period+(Math.random()*2-1)*e.jitter),this.sfx(e.name,{minGap:0,...e.p}))}}listen(t){if(this.ctx)try{const e=this.ctx.listener,n=t.position,s=t.matrixWorld.elements,r=this.ctx.currentTime;e.positionX?(e.positionX.setValueAtTime(n.x,r),e.positionY.setValueAtTime(n.y,r),e.positionZ.setValueAtTime(n.z,r),e.forwardX.setValueAtTime(-s[8],r),e.forwardY.setValueAtTime(-s[9],r),e.forwardZ.setValueAtTime(-s[10],r),e.upX.setValueAtTime(s[4],r),e.upY.setValueAtTime(s[5],r),e.upZ.setValueAtTime(s[6],r)):(e.setPosition(n.x,n.y,n.z),e.setOrientation(-s[8],-s[9],-s[10],s[4],s[5],s[6]))}catch(e){Wn("listen",e)}}setAmbience(t={}){if(this.ambWant={...t},!this.amb||!this.ctx)return;const e=this.ctx.currentTime;for(const[n,s]of Object.entries(this.amb)){const r=Math.max(0,Math.min(1,Number(t[n])||0))*s.level;s.gain.gain.cancelScheduledValues(e),s.gain.gain.setTargetAtTime(r,e,.8)}}music(t,e={}){try{if(!Id[t]){Wn("music",`unknown "${t}"`);return}if(!this.ctx||!this.ready){this.pending={id:t,opts:e};return}if(this.seq&&this.songId===t)return;this.seq?.stop(e.crossfade??.6),this.seq=new Ib(this.ctx,this.mix.music,Id[t]),this.seq.start(this.ctx.currentTime+.08,e.fadeIn??.6),this.songId=t}catch(n){Wn("music",n)}}stopMusic(t=.8){try{this.pending=null,this.seq?.stop(t),this.seq=null,this.songId=null}catch(e){Wn("stopMusic",e)}}duck(t){try{this.mix?.duck(t)}catch(e){Wn("duck",e)}}setVolume(t){Object.assign(this.vol,t);try{this.mix?.setVolume(this.vol)}catch(e){Wn("setVolume",e)}}}const Cp="astra-farm-name",Pp=12;function Ri(i){return typeof i!="string"?"":i.replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,Pp)}function Ob(){try{return Ri(localStorage.getItem(Cp))}catch{return""}}const Kn={player:Ob(),setPlayer(i){this.player=Ri(i);try{localStorage.setItem(Cp,this.player)}catch{}}},jo=()=>matchMedia("(display-mode: fullscreen), (display-mode: standalone)").matches||navigator.standalone===!0,Bb=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,Nd="./icons/icon-192.png",zb=`
/* Lives in #title .title-tools (download left of settings gear) */
.af-install-btn{
  width:48px;height:48px;padding:0;min-width:0;border-radius:0;cursor:pointer;
  display:grid;place-items:center;background:#6a6a6a;border:2px solid #000;
  box-shadow:inset 2px 2px 0 #aaa,inset -2px -2px 0 #444;color:#fff;
  -webkit-tap-highlight-color:transparent;pointer-events:auto;position:relative;z-index:5;
}
.af-install-btn:hover,.af-install-btn.gp-focus{background:#7d88c4}
.af-install-btn svg{width:26px;height:26px;display:block;pointer-events:none}
.af-install-btn.hide{display:none!important}
.af-idlg{position:fixed;inset:0;z-index:220;display:none;place-items:center;padding:16px;
  background:rgba(0,0,0,.62);pointer-events:auto}
.af-idlg.show{display:grid}
.af-idlg-card{width:min(420px,100%);padding:1.15em 1.25em;background:var(--paper,#c6c6c6);
  border:3px solid #000;box-shadow:inset 3px 3px 0 #fff,inset -3px -3px 0 #555,0 10px 40px rgba(0,0,0,.45);
  color:#3a3a3a;text-align:center;font:inherit;max-height:calc(100dvh - 32px);overflow:auto;box-sizing:border-box}
.af-idlg-card img{width:64px;height:64px;image-rendering:pixelated;border:2px solid #000}
.af-idlg-card h3{margin:.6em 0 .35em;font-weight:400;font-size:1.25em}
.af-idlg-card p{margin:0 0 .4em;font-size:.92em;line-height:1.55}
.af-idlg-card ul{margin:.4em 0 .8em;padding:0;list-style:none;font-size:.88em;color:#444}
.af-idlg-card li{margin:.25em 0}
.af-idlg-card b{color:#7a4a10}
.af-idlg-row{display:flex;gap:10px;justify-content:center;margin-top:.4em}
.af-idlg-row button{flex:1;min-width:0;min-height:2.6em}
`,Hb='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>';let lr=null;function wa(){try{window.__astraDeferredInstall&&(lr=window.__astraDeferredInstall)}catch{}return lr}function Lp(){lr=null;try{window.__astraDeferredInstall=null}catch{}}async function kd(){const i=wa();if(!i||typeof i.prompt!="function")return!1;Lp();try{await i.prompt(),await i.userChoice}catch{}return!0}function Gb(){if(!document.getElementById("af-install-css")){const a=document.createElement("style");a.id="af-install-css",a.textContent=zb,document.head.appendChild(a)}if(wa(),"serviceWorker"in navigator){const a=()=>navigator.serviceWorker.register("./sw.js?v=2").catch(()=>{});document.readyState==="complete"?a():addEventListener("load",a,{once:!0})}if(jo())return;let i=document.getElementById("af-install-btn");i||(i=document.createElement("button"),i.type="button",i.id="af-install-btn",i.className="af-install-btn tool-btn",(document.querySelector("#title .title-tools")||document.body).appendChild(i)),i.classList.add("af-install-btn","tool-btn"),i.querySelector("svg")||(i.innerHTML=Hb),i.title=W("install.btn"),i.setAttribute("aria-label",W("install.btn")),i.classList.remove("hide");let t=document.getElementById("af-install-dlg");t||(t=document.createElement("div"),t.id="af-install-dlg",t.className="af-idlg",document.body.appendChild(t));const e=()=>t.classList.remove("show");t.onclick=a=>{a.target===t&&e()};const n=()=>{i.classList.toggle("hide",jo())},s=a=>{const l=Array.isArray(a.perks)?`<ul>${a.perks.map(h=>`<li>${h}</li>`).join("")}</ul>`:"",c=a.ios?`<p>${W("install.ios")}</p>`:"";a.install?(t.innerHTML=`<div class="af-idlg-card">
        <img alt="" src="${Nd}">
        <h3>${a.title}</h3>
        <p>${a.body}</p>
        ${l}
        <p>${W("install.confirm")}</p>
        <div class="af-idlg-row">
          <button type="button" class="af-idlg-no">${W("install.notNow")}</button>
          <button type="button" class="af-idlg-ok">${W("install.ok")}</button>
        </div>
      </div>`,t.querySelector(".af-idlg-no").onclick=e,t.querySelector(".af-idlg-ok").onclick=async()=>{e();for(let h=0;h<25;h++){if(wa(),lr){await kd(),n();return}await new Promise(d=>setTimeout(d,100))}}):(t.innerHTML=`<div class="af-idlg-card">
        <img alt="" src="${Nd}">
        <h3>${a.title}</h3>
        <p>${a.body}</p>
        ${l}
        ${c}
        <div class="af-idlg-row">
          <button type="button" class="af-idlg-ok">${a.ok||W("install.gotIt")}</button>
        </div>
      </div>`,t.querySelector(".af-idlg-ok").onclick=e),t.classList.add("show")};async function r(){if(jo()){s({title:W("install.title"),body:W("install.already"),ok:W("install.gotIt")});return}if(wa(),lr){await kd(),n();return}if(Bb()){s({title:W("install.title"),body:W("install.body"),perks:[W("install.perk0"),W("install.perk1"),W("install.perk2")],ios:!0,ok:W("install.gotIt")});return}s({title:W("install.title"),body:W("install.body"),perks:[W("install.perk0"),W("install.perk1"),W("install.perk2")],install:!0})}addEventListener("beforeinstallprompt",a=>{a.preventDefault(),lr=a;try{window.__astraDeferredInstall=a}catch{}n()}),addEventListener("appinstalled",()=>{Lp(),e(),n()}),i.onpointerdown=a=>a.stopPropagation(),i.onclick=a=>{a.stopPropagation(),a.preventDefault(),r()};const o=()=>{const a=document.getElementById("title"),l=a&&!a.classList.contains("hidden");i.classList.toggle("hide",jo()||!l)};setInterval(o,500),o(),n()}const Kl=(i,t)=>`<option value="${i}" data-i18n="${t}">${W(t)}</option>`,Zl=i=>`<label class="row"><span data-i18n="settings.${i}">${W("settings."+i)}</span>
  <input type="range" min="0" max="100" step="5" data-vol="${i}" value="${Math.round(ee.volume[i]*100)}"></label>`,bi=(i,t)=>`<dt data-glyph="${i}"></dt><dd data-i18n="${t}">${W(t)}</dd>`,Vb='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>';class Wb{constructor(t,e){this.cb=e,this.root=t,this.stack=[],t.insertAdjacentHTML("beforeend",`
<section id="title" class="screen hidden">
  <div class="title-tools" dir="ltr">
    <button type="button" id="af-install-btn" class="tool-btn af-install-btn" data-i18n-aria="install.btn" aria-label="${W("install.btn")}"></button>
    <button type="button" data-act="settings" class="tool-btn tool-gear" data-i18n-aria="title.settings" aria-label="${W("title.settings")}">${Vb}</button>
  </div>
  <div class="logo">
    <h1 data-i18n="game.title">${W("game.title")}</h1>
    <div class="splash"></div>
  </div>
  <p class="tagline" data-i18n="game.tagline">${W("game.tagline")}</p>
  <div class="menu">
    <button data-act="continue" class="continue hidden" data-i18n="title.continue">${W("title.continue")}</button>
    <label class="af-name">
      <span data-i18n="title.name">${W("title.name")}</span>
      <input class="af-name-input" type="text" maxlength="${Pp}" autocomplete="off" spellcheck="false"
        placeholder="${W("title.namePh")}" value="${Kn.player.replace(/"/g,"&quot;")}">
    </label>
    <button data-act="start" class="start" data-i18n="title.play">${W("title.play")}</button>
    <p class="af-net-status" aria-live="polite"></p>
    <button data-act="howto" data-i18n="title.howto">${W("title.howto")}</button>
  </div>
  <p class="best"></p>
  <footer class="copyright">© 2026 <span data-i18n="game.title">${W("game.title")}</span></footer>
</section>
<section id="m-pause" class="modal hidden"><div class="card">
  <h2 data-i18n="pause.title">${W("pause.title")}</h2>
  <button data-act="resume" data-i18n="pause.resume">${W("pause.resume")}</button>
  <button data-act="howto" data-i18n="title.howto">${W("title.howto")}</button>
  <button data-act="settings" data-i18n="title.settings">${W("title.settings")}</button>
  <button data-act="retry" data-i18n="pause.retry">${W("pause.retry")}</button>
  <button data-act="toTitle" data-i18n="pause.toTitle">${W("pause.toTitle")}</button>
</div></section>
<section id="m-settings" class="modal hidden"><div class="card settings">
  <header class="card-head">
    <h2 data-i18n="settings.title">${W("settings.title")}</h2>
    <button type="button" class="card-x" data-act="back" data-i18n-aria="ui.close" aria-label="${W("ui.close")}">✕</button>
  </header>
  <div class="card-scroll">
    ${Zl("master")}${Zl("music")}${Zl("sfx")}
    <label class="row"><span data-i18n="settings.sens">${W("settings.sens")}</span>
      <input type="range" min="20" max="200" step="10" data-set-num="sens" value="${Math.round((ee.sens??1)*100)}"></label>
    <label class="row"><span data-i18n="settings.mobGuide">${W("settings.mobGuide")}</span>
      <select data-set="mobGuide">${Tp.map(r=>Kl(r,"settings.mobGuide."+r)).join("")}</select></label>
    <label class="row"><span data-i18n="settings.quality">${W("settings.quality")}</span>
      <select data-set="quality">${wp.map(r=>Kl(r,"settings.quality."+r)).join("")}</select></label>
    <label class="row"><span data-i18n="settings.lang">${W("settings.lang")}</span>
      <select data-set="lang">${mb.map(r=>`<option value="${r.id}">${r.label}</option>`).join("")}</select></label>
    <label class="row pad-only"><span data-i18n="settings.pad">${W("settings.pad")}</span>
      <select data-set="padType">${Ep.map(r=>Kl(r,"settings.pad."+r)).join("")}</select></label>
  </div>
  <button data-act="back" class="card-close" data-i18n="ui.close">${W("ui.close")}</button>
</div></section>
<section id="m-howto" class="modal hidden"><div class="card wide howto">
  <header class="card-head">
    <h2 data-i18n="howto.title">${W("howto.title")}</h2>
    <button type="button" class="card-x" data-act="back" data-i18n-aria="ui.close" aria-label="${W("ui.close")}">✕</button>
  </header>
  <div class="card-scroll howto-body">
    <p class="body" data-i18n="howto.body">${W("howto.body")}</p>
    <p class="body" data-i18n="howto.body2">${W("howto.body2")}</p>
    <div class="howto-guide"></div>
    <dl class="keys">
      ${bi("move","howto.move")}${bi("look","howto.look")}${bi("jump","howto.jump")}${bi("sprint","howto.sprint")}
      ${bi("attack","howto.attack")}${bi("use","howto.use")}${bi("slots","howto.slots")}${bi("eat","howto.eat")}${bi("pause","howto.pause")}
    </dl>
    <p class="body touchonly" data-i18n="howto.touch">${W("howto.touch")}</p>
  </div>
  <button data-act="back" class="card-close" data-i18n="ui.close">${W("ui.close")}</button>
</div></section>`),this.title=t.querySelector("#title"),this.modals={pause:t.querySelector("#m-pause"),settings:t.querySelector("#m-settings"),howto:t.querySelector("#m-howto")},this.netStatus=this.title.querySelector(".af-net-status"),Gb();const n=this.title.querySelector(".af-name-input");if(n){n.value=Kn.player,n.addEventListener("input",()=>Kn.setPlayer(n.value)),n.addEventListener("blur",()=>{n.value=Kn.player});for(const r of["pointerdown","click","touchstart","keyup"])n.addEventListener(r,o=>o.stopPropagation());n.addEventListener("keydown",r=>{r.stopPropagation(),(r.key==="Enter"||r.key==="Escape")&&n.blur()})}t.addEventListener("click",r=>{const o=r.target.closest("[data-act]");if(!o)return;const a=o.dataset.act;if(e.onClick?.(a),a==="start"){const l=t.querySelector(".af-name-input")?.value;l!=null&&Kn.setPlayer(l),e.onStart?.()}else a==="continue"?e.onContinue?.():a==="howto"?this.open("howto"):a==="settings"?this.open("settings"):a==="resume"?e.onResume?.():a==="retry"?e.onRetry?.():a==="toTitle"?e.onToTitle?.():a==="back"?this.back():e.onAction?.(a,o)});const s=this.modals.settings;for(const r of s.querySelectorAll("[data-vol]"))r.addEventListener("input",()=>{ee.volume[r.dataset.vol]=+r.value/100,e.onSettings?.("volume")});for(const r of s.querySelectorAll("[data-set-num]"))r.addEventListener("input",()=>{ee[r.dataset.setNum]=+r.value/100,e.onSettings?.(r.dataset.setNum)});for(const r of s.querySelectorAll("[data-set]"))r.addEventListener("change",()=>{ee[r.dataset.set]=r.value,e.onSettings?.(r.dataset.set)})}addModal(t,e){return this.root.insertAdjacentHTML("beforeend",e),this.modals[t]=this.root.querySelector("#m-"+t),this.modals[t]}syncSettings(){const t=this.modals.settings;for(const e of t.querySelectorAll("[data-vol]"))e.value=Math.round(ee.volume[e.dataset.vol]*100);for(const e of t.querySelectorAll("[data-set-num]"))e.value=Math.round((ee[e.dataset.setNum]??1)*100);for(const e of t.querySelectorAll("[data-set]"))e.value=ee[e.dataset.set]}showTitle(t){this.title.classList.toggle("hidden",!t)}setNetStatus(t){this.netStatus&&(this.netStatus.textContent=t||"",this.netStatus.classList.toggle("on",!!t))}setPlayBusy(t){const e=this.title.querySelector(".start");e&&(e.disabled=!!t)}setContinue(t){this.title.querySelector(".continue")?.classList.toggle("hidden",!t);const e=this.title.querySelector(".start");e.dataset.i18n="title.play",e.textContent=W("title.play")}setEndless(){this.title.querySelector(".endless")?.classList.add("hidden")}open(t){const e=this.modals[t];t==="settings"&&this.syncSettings(),yr(e),e.classList.remove("hidden");const n=this.stack.indexOf(e);n>=0&&this.stack.splice(n,1),this.stack.push(e),n<0&&this.cb.onModal?.(t,!0)}back(){const t=this.stack.pop();return t?(t.classList.add("hidden"),this.cb.onModal?.(t.id.slice(2),!1),!0):!1}closeAll(){for(;this.back(););}get top(){return this.stack[this.stack.length-1]||null}isOpen(t){return this.stack.includes(this.modals[t])}current(){return this.top?this.top:this.title.classList.contains("hidden")?null:this.title.querySelector(".menu")}}const qb='button:not([disabled]), input[type="range"], select';class Xb{constructor(t,e=()=>{}){this.getContainer=t,this.onMove=e,this.index=new WeakMap,this.el=null,this.shown=!1,this.last=null;const n=()=>this.show(!1);addEventListener("pointerdown",n),addEventListener("mousemove",s=>{(s.movementX||s.movementY)&&n()})}items(t){return[...t.querySelectorAll(qb)].filter(e=>e.offsetParent!==null&&!e.closest("[data-nav-skip]"))}show(t){this.shown=t,this.el?.classList.toggle("gp-focus",t)}setFocus(t){this.el&&this.el!==t&&this.el.classList.remove("gp-focus"),this.el=t,t?.classList.toggle("gp-focus",this.shown),t&&this.shown&&t.scrollIntoView?.({block:"nearest"})}update(t){const e=this.getContainer();e!==this.last&&(e&&this.index.delete(e),this.last=e);const n=e?this.items(e):[];if(!n.length){this.setFocus(null);return}let s=this.index.get(e)??0;s>=n.length&&(s=0);const r=n[s],o=t.up||t.down||t.left||t.right;if(o&&!this.shown){this.show(!0),this.setFocus(r),this.onMove();return}if(t.up||t.down){const a=e.querySelector("[data-scroll]");n.length===1&&a&&a.scrollHeight>a.clientHeight+4?a.scrollBy(0,t.down?90:-90):(s=(s+(t.down?1:-1)+n.length)%n.length,this.onMove())}if(t.left||t.right){const a=t.right?1:-1;if(r.type==="range"){const l=+r.step||5,c=Math.max(+r.min||0,Math.min(+r.max||100,+r.value+a*l));c!==+r.value&&(r.value=String(c),r.dispatchEvent(new Event("input",{bubbles:!0})),this.onMove())}else r.tagName==="SELECT"?this.cycle(r,a):(s=(s+a+n.length)%n.length,this.onMove())}if(o&&this.show(!0),this.index.set(e,s),this.setFocus(n[s]),t.ok){const a=n[s];a.tagName==="SELECT"?this.cycle(a,1):a.tagName==="BUTTON"&&a.click()}}cycle(t,e){const n=t.options.length;t.selectedIndex=(t.selectedIndex+e+n)%n,t.dispatchEvent(new Event("change",{bubbles:!0})),this.onMove()}}const ta=[{action:"attack",label:"touch.attack",slot:0},{action:"use",label:"touch.use",slot:1},{action:"jump",label:"touch.jump",slot:2},{action:"eat",label:"touch.eat",slot:3}];class $b{constructor(t,e,n,{onPause:s}={}){this.input=n,this.visible=!1,this.enabled=!1;const r=document.createElement("div");r.id="touch",r.className="hidden",r.innerHTML=`<div class="stick"><div class="knob"></div></div>
      ${ta.map((g,x)=>`<button class="tbtn slot-${g.slot??x} ${g.cls||""}" data-i="${x}" data-i18n="${g.label}">${W(g.label)}</button>`).join("")}
      <button class="tbtn pause" data-i18n-aria="pause.title" aria-label="${W("pause.title")}">Ⅱ</button>`,t.appendChild(r),this.el=r,this.stick=r.querySelector(".stick"),this.knob=r.querySelector(".knob");for(const g of r.querySelectorAll(".tbtn[data-i]")){const x=ta[+g.dataset.i].action,m=p=>y=>{y.preventDefault(),n.setTouchButton(x,p),g.classList.toggle("on",p)};g.addEventListener("touchstart",m(!0),{passive:!1}),g.addEventListener("touchend",m(!1),{passive:!1}),g.addEventListener("touchcancel",m(!1),{passive:!1})}r.querySelector(".tbtn.pause").addEventListener("touchstart",g=>{g.preventDefault(),s?.()},{passive:!1});let o=null,a=null,l=0,c=0,h=0,d=0;const u=55;e.addEventListener("touchstart",g=>{for(const x of g.changedTouches)x.clientX<innerWidth*.45&&o===null?(o=x.identifier,l=x.clientX,c=x.clientY,this.stick.style.left=`${l-60}px`,this.stick.style.top=`${c-60}px`,this.stick.classList.add("on")):a===null&&(a=x.identifier,h=x.clientX,d=x.clientY)},{passive:!0}),e.addEventListener("touchmove",g=>{for(const x of g.changedTouches)if(x.identifier===o){let m=x.clientX-l,p=x.clientY-c;const y=Math.hypot(m,p);y>u&&(m*=u/y,p*=u/y),this.knob.style.transform=`translate(${m}px, ${p}px)`,n.setTouchStick(m/u,-p/u)}else x.identifier===a&&(n.addTouchLook(x.clientX-h,x.clientY-d),h=x.clientX,d=x.clientY)},{passive:!0});const f=g=>{for(const x of g.changedTouches)x.identifier===o?(o=null,this.resetStick()):x.identifier===a&&(a=null)};e.addEventListener("touchend",f,{passive:!0}),e.addEventListener("touchcancel",f,{passive:!0}),addEventListener("touchstart",()=>{this.enabled=!0,this.refresh()},{once:!0,passive:!0}),n.onRelease=()=>{o=a=null,this.resetStick();for(const g of r.querySelectorAll(".tbtn.on"))g.classList.remove("on")}}resetStick(){this.knob.style.transform="",this.stick.classList.remove("on"),this.input.setTouchStick(0,0)}setLabel(t,e){const n=ta.findIndex(o=>o.action===t),s=this.el.querySelector(`.tbtn[data-i="${n}"]`);if(!s)return;const r=e||W(ta[n].label);s.textContent!==r&&(s.textContent=r),s.classList.toggle("ctx",!!e)}setVisible(t){this.visible=t,this.refresh()}refresh(){this.el.classList.toggle("hidden",!(this.visible&&this.enabled))}}const Ba=i=>`<svg viewBox="0 0 24 24" aria-hidden="true">${i}</svg>`,Yb={0:'<path d="M7.5 7.5 L16.5 16.5 M16.5 7.5 L7.5 16.5" stroke="#86b6ff" stroke-width="2.4" stroke-linecap="round" fill="none"/>',1:'<circle cx="12" cy="12" r="5.2" stroke="#ff7d86" stroke-width="2.2" fill="none"/>',2:'<rect x="7.2" y="7.2" width="9.6" height="9.6" rx="0.6" stroke="#f3a0d6" stroke-width="2.2" fill="none"/>',3:'<path d="M12 6.6 L17.6 16.2 H6.4 Z" stroke="#56d6a9" stroke-width="2.1" stroke-linejoin="round" fill="none"/>'},Kb={0:["A","#7bd36a"],1:["B","#ff6a5c"],2:["X","#5aa2ff"],3:["Y","#ffd24a"]},Zb={type1:{4:"LB",5:"RB",6:"LT",7:"RT",8:"View",9:"Menu"},type2:{4:"L1",5:"R1",6:"L2",7:"R2",8:"Share",9:"Options"}},Ud={12:"u",13:"d",14:"l",15:"r"},Jb={Space:"Space",Enter:"Enter",Escape:"Esc",Backspace:"Back",Tab:"Tab",ShiftLeft:"Shift",ShiftRight:"Shift",ControlLeft:"Ctrl",AltLeft:"Alt",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→"},Fd=i=>Jb[i]||i.replace(/^Key|^Digit/,"");function Jl(i,t){if(i<=3){if(t==="type2")return`<span class="gl gl-face">${Ba(Yb[i])}</span>`;const[e,n]=Kb[i];return`<span class="gl gl-face" style="color:${n}">${e}</span>`}if(Ud[i]){const e=n=>Ud[i]===n?"#fff":"rgba(255,255,255,0.28)";return`<span class="gl gl-dpad">${Ba(`<rect x="9" y="2.5" width="6" height="7" rx="1.2" fill="${e("u")}"/><rect x="9" y="14.5" width="6" height="7" rx="1.2" fill="${e("d")}"/><rect x="2.5" y="9" width="7" height="6" rx="1.2" fill="${e("l")}"/><rect x="14.5" y="9" width="7" height="6" rx="1.2" fill="${e("r")}"/>`)}</span>`}return`<span class="gl gl-pill">${Zb[t][i]||"#"+i}</span>`}const Od=i=>`<span class="gl gl-stick">${Ba('<circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.4" fill="currentColor" opacity="0.35"/>')}<b>${i}</b></span>`,Mi=i=>`<kbd class="gl gl-key">${i}</kbd>`,Ql=i=>`<span class="gl gl-mouse">${Ba(`<rect x="6" y="3" width="12" height="18" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>
  <path d="M12 3 V11" stroke="currentColor" stroke-width="1.4"/>${i===0?'<path d="M12 3.8 A5.2 5.2 0 0 0 6.8 9 V11 H12 Z" fill="#ffd34a"/>':i===2?'<path d="M12 3.8 A5.2 5.2 0 0 1 17.2 9 V11 H12 Z" fill="#ffd34a"/>':i===1?'<rect x="10.8" y="5" width="2.4" height="4.5" rx="1" fill="#ffd34a"/>':'<path d="M3 12 H1.5 M21 12 H22.5" stroke="currentColor" stroke-width="1.6"/>'}`)}</span>`;function _h(i,t,e){if(i==="move")return t==="pad"?Od("L"):`${Mi("W")}${Mi("A")}${Mi("S")}${Mi("D")}`;if(i==="look")return t==="pad"?Od("R"):Ql(-1);if(i==="slots")return t==="pad"?Jl(Ma.slotPrev.pad[0],e)+Jl(Ma.slotNext.pad[0],e):`${Mi("1")}<small class="gl-or">–</small>${Mi("5")}${Ql(1)}`;const n=Ma[i];return n?t==="pad"&&n.pad?.length?Jl(n.pad[0],e):n.mouse?.length?Ql(n.mouse[0])+(n.keys?.length?`<small class="gl-or">/</small>${Mi(Fd(n.keys[0]))}`:""):n.keys?.length?Mi(Fd(n.keys[0])):"":Mi(i)}function jl(i,t,e=document){const n=t.padType==="auto"?i.padType:t.padType;document.documentElement.dataset.device=i.device;for(const s of e.querySelectorAll("[data-glyph]"))s.innerHTML=i.device==="touch"?"":_h(s.dataset.glyph,i.device,n)}function Qb(){for(const t of["gesturestart","gesturechange","gestureend"])document.addEventListener(t,e=>e.preventDefault(),{passive:!1});let i=0;document.addEventListener("touchend",t=>{const e=performance.now();e-i<320&&!t.target.closest?.("input, select, textarea, button")&&t.preventDefault(),i=e},{passive:!1}),document.addEventListener("touchmove",t=>{t.touches.length>1&&t.preventDefault()},{passive:!1})}class jb{constructor(){this.map=new Map}on(t,e){return this.map.has(t)||this.map.set(t,new Set),this.map.get(t).add(e),()=>this.map.get(t)?.delete(e)}once(t,e){const n=this.on(t,s=>{n(),e(s)});return n}emit(t,e){for(const n of[...this.map.get(t)||[]])try{n(e)}catch(s){console.error(`[events] ${t}:`,s)}}}const Bd=new jb,zd=Math.PI*2,oo=(i,t=0,e=1)=>i<t?t:i>e?e:i,As=(i,t,e)=>i+(t-i)*e,t1=(i,t,e)=>t===i?0:(e-i)/(t-i),Qi=(i,t,e)=>{const n=oo(t1(i,t,e));return n*n*(3-2*n)},Le=(i,t,e,n)=>As(i,t,1-Math.exp(-e*n)),e1=i=>(i=(i+Math.PI)%zd,(i<0?i+zd:i)-Math.PI),Rs=(i,t,e,n)=>i+e1(t-i)*(1-Math.exp(-e*n));function es(i=1){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function n1(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}const _e=16,Vr=16,Ir=_e*Vr,Ea=i=>[i>>16&255,i>>8&255,i&255],tc=i=>i<0?0:i>255?255:Math.round(i),ec=(i,t)=>[tc(i[0]*t),tc(i[1]*t),tc(i[2]*t)];class i1{constructor(t){this.d=new Uint8ClampedArray(_e*_e*4);const e=es(t);this.r=e}ri(t){return Math.floor(this.r()*t)}set(t,e,n,s=255){if(t<0||e<0||t>=_e||e>=_e)return;const r=(e*_e+t)*4,o=typeof n=="number"?Ea(n):n;this.d[r]=o[0],this.d[r+1]=o[1],this.d[r+2]=o[2],this.d[r+3]=s}get(t,e){const n=(e*_e+t)*4;return[this.d[n],this.d[n+1],this.d[n+2],this.d[n+3]]}alpha(t,e){return t<0||e<0||t>=_e||e>=_e?0:this.d[(e*_e+t)*4+3]}fill(t,e=255){for(let n=0;n<_e;n++)for(let s=0;s<_e;s++)this.set(s,n,t,e)}noise(t,e=0,n=0,s=_e,r=_e){for(let o=n;o<r;o++)for(let a=e;a<s;a++)this.set(a,o,t[this.ri(t.length)])}outline(t){const e=[];for(let n=0;n<_e;n++)for(let s=0;s<_e;s++)this.alpha(s,n)||(this.alpha(s-1,n)>200||this.alpha(s+1,n)>200||this.alpha(s,n-1)>200||this.alpha(s,n+1)>200)&&e.push([s,n]);for(const[n,s]of e)this.set(n,s,t)}ellipse(t,e,n,s,r){for(let o=0;o<_e;o++)for(let a=0;a<_e;a++){const l=(a+.5-t)/n,c=(o+.5-e)/s;l*l+c*c<=1&&this.set(a,o,r[this.ri(r.length)])}}}const an={grass:[6135354,6991427,7846732,5541683,6529854,6991427],dirt:[9068866,8017209,9857866,7228467,8543294],stone:[8224125,7631988,8816262,7105644,8026746],sand:[14406560,13814164,14932907,13353612],leaves:[4164138,4889138,3504674,5679162,3108382],plank:[10779980,10122310,11437653,10713673],potato:[14069090,13212754,14267244],greenPotato:[11057242,10136654,11715174]};function ea(i,t,e,n){const s=[5216814,6270522,4097060,7126084];for(const r of e){for(let o=15;o>=t;o--)if(i.set(r,o,4097060),n&&(15-o)%2===1){const a=Math.min(3,1+Math.floor((o-t)/3));for(let l=1;l<=a;l++)i.r()<.85&&i.set(r-l,o-(l>1?1:0),s[i.ri(s.length)]),i.r()<.85&&i.set(r+l,o-(l>1?1:0),s[i.ri(s.length)])}i.set(r,t-1,s[3])}}function nc(i,t){[".XX...XX.","XooX.XooX","XoooXoooX","XoooooooX",".XoooooX.","..XoooX..","...XoX...","....X...."].forEach((n,s)=>[...n].forEach((r,o)=>{const a=o+3,l=s+4;r==="X"?i.set(a,l,1710618):r==="o"&&(t==="full"||t==="half"&&o<4.5?i.set(a,l,s<2&&(o===1||o===2||o===6)?16751258:14690344):i.set(a,l,3810854))}))}const bh={grass_top(i){i.noise(an.grass);for(let t=0;t<10;t++)i.set(i.ri(16),i.ri(16),8702040)},grass_side(i){i.noise(an.dirt);for(let t=0;t<16;t++){const e=3+(i.r()<.5?1:0)+(i.r()<.2?1:0);for(let n=0;n<e;n++)i.set(t,n,an.grass[i.ri(an.grass.length)])}},dirt(i){i.noise(an.dirt);for(let t=0;t<5;t++)i.set(i.ri(16),i.ri(16),10127994)},farm_dry(i){i.noise([8017462,7360049,8674619]);for(let t=0;t<16;t++)for(let e=0;e<16;e++)t%4===0?i.set(e,t,i.r()<.8?5914151:6637104):t%4===1&&i.set(e,t,i.r()<.6?9398339:8674619);for(let t=0;t<16;t++)i.set(t,15,5914151),i.set(0,t,5914151),i.set(15,t,6637104)},farm_wet(i){i.noise([5190946,4730911,5716518]);for(let t=0;t<16;t++)for(let e=0;e<16;e++)t%4===0?i.set(e,t,i.r()<.8?3088147:3811096):t%4===1&&i.set(e,t,i.r()<.6?6703155:5914154);for(let t=0;t<16;t++)i.set(t,15,3088147),i.set(0,t,3088147),i.set(15,t,3811096)},path_top(i){i.noise([10256202,11045717,9664330,11572576,10453581])},path_side(i){i.noise(an.dirt);for(let t=0;t<16;t++)for(let e=0;e<2+(i.r()<.4?1:0);e++)i.set(t,e+1,[10256202,11045717][i.ri(2)]);for(let t=0;t<16;t++)i.set(t,0,0,0)},stone(i){i.noise(an.stone);for(let t=0;t<6;t++){const e=i.ri(14),n=i.ri(16);i.set(e,n,6250335),i.set(e+1,n,6710886)}},cobble(i){const t=Array.from({length:8},()=>[i.r()*16,i.r()*16,.85+i.r()*.3]);for(let e=0;e<16;e++)for(let n=0;n<16;n++){let s=1e9,r=1e9,o=0;for(let a=0;a<t.length;a++)for(const l of[-16,0,16])for(const c of[-16,0,16]){const h=n+.5-(t[a][0]+l),d=e+.5-(t[a][1]+c),u=Math.hypot(h,d);u<s?(r=s,s=u,o=a):u<r&&(r=u)}r-s<1?i.set(n,e,4868682):i.set(n,e,ec(Ea(9079434),t[o][2]*(.92+i.r()*.12)))}},sand(i){i.noise(an.sand)},gravel(i){i.noise([8682616,7235686,10130060,6051412,9076594])},bedrock(i){i.noise([3815994,5592405,2763306,6974058])},water(i){for(let t=0;t<16;t++)for(let e=0;e<16;e++){const n=Math.sin((e+t*.5)*.8)+Math.sin(t*1.3+e*.2);i.set(e,t,n>1.3?6262760:n>.6?4749014:3826372,190)}},log_side(i){const t=Array.from({length:16},()=>[7033395,5915690,8019772,6507310][i.ri(4)]);for(let e=0;e<16;e++)for(let n=0;n<16;n++)i.set(n,e,ec(Ea(t[n]),.9+i.r()*.2));for(let e=0;e<4;e++){const n=i.ri(16),s=i.ri(12);for(let r=0;r<4;r++)i.set(n,s+r,4864032)}},log_top(i){for(let t=0;t<16;t++)for(let e=0;e<16;e++){const n=Math.max(Math.abs(e-7.5),Math.abs(t-7.5))+(i.r()-.5)*.6;n>=7?i.set(e,t,[5915690,7033395][i.ri(2)]):i.set(e,t,Math.floor(n)%2?11570519:10254920)}},leaves(i){for(let t=0;t<16;t++)for(let e=0;e<16;e++)i.r()<.2?i.set(e,t,0,0):i.set(e,t,an.leaves[i.ri(an.leaves.length)])},planks(i){for(let t=0;t<16;t++){const e=Math.floor(t/4);for(let n=0;n<16;n++){const s=e%2?4:11;t%4===3?i.set(n,t,8018484):n===s?i.set(n,t,8807482):i.set(n,t,ec(Ea(an.plank[i.ri(an.plank.length)]),.95+i.r()*.1))}}},glass(i){i.fill(0,0);for(let t=0;t<16;t++)i.set(t,0,14019824),i.set(t,15,12179164),i.set(0,t,14019824),i.set(15,t,12179164);for(const[t,e]of[[3,3],[4,2],[2,4],[5,5],[11,12],[12,11]])i.set(t,e,16777215)},lantern(i){i.fill(0,0);for(let t=8;t<16;t++)for(let e=5;e<11;e++){const n=e===5||e===10||t===8||t===15;i.set(e,t,n?3816004:t<10?5592415:[16765562,16773296,16762976][i.ri(3)])}for(let t=0;t<6;t++)for(let e=5;e<11;e++)i.set(e,t,e===5||e===10||t===0||t===5?3026486:4868693);i.set(7,2,16769162),i.set(8,3,16769162)},tallgrass(i){i.fill(0,0);for(let t=0;t<9;t++){let e=1+i.ri(14);const n=5+i.ri(9),s=i.r()<.5?-1:1;for(let r=0;r<n;r++)r>n*.6&&i.r()<.3&&(e+=s),i.set(e,15-r,[6135354,5212720,6991427,7846732][i.ri(4)])}},flower_r(i){Hd(i,[13777466,15224912,12069418],15781952)},flower_y(i){Hd(i,[15781952,16310384,14727216],14191136)},apple(i){i.fill(0,0);for(let t=8;t<16;t++)i.set(7,t,4097060);i.set(6,11,5216814),i.set(8,12,5216814);for(const[t,e]of[[6,4],[7,3],[8,4],[6,5],[7,5],[8,5],[7,6],[5,5],[9,5]])i.set(t,e,[13777466,15224912,12593192][i.ri(3)]);i.set(7,2,4880936),i.outline(2760210)},cane(i){i.fill(0,0);for(const t of[2,7,12]){const e=i.ri(4);for(let s=0;s<16;s++){const r=(s+e)%5===0;i.set(t,s,r?6199862:10147944),i.set(t+1,s,r?5146156:8109896)}const n=3+i.ri(8);i.set(t+2,n,8109896),i.set(t+3,n-1,9424730),i.set(t-1,n+3,8109896),i.set(t-2,n+2,9424730)}},potato0(i){i.fill(0,0),ea(i,14,[3,8,12],!1)},potato1(i){i.fill(0,0),ea(i,10,[2,6,10,13],!0)},potato2(i){i.fill(0,0),ea(i,6,[2,6,9,13],!0)},potato3(i){i.fill(0,0),ea(i,4,[2,6,9,13],!0);for(const[t,e]of[[1,13],[4,14],[7,13],[11,14],[13,13]])i.set(t,e,14069090),i.set(t+1,e,13212754),i.set(t,e+1,12094024),i.set(t+1,e+1,14069090);for(const[t,e]of[[2,3],[9,3],[13,4],[6,5]])i.set(t,e,16052479),i.set(t,e-1,13154544)},wheat0(i){i.fill(0,0);for(const t of[3,8,12])i.set(t,14,5216814),i.set(t,13,6270522)},wheat1(i){i.fill(0,0);for(const t of[2,5,8,11,13])for(let e=10;e<16;e++)i.set(t,e,e%2?6270522:5216814)},wheat2(i){i.fill(0,0);for(const t of[2,5,8,11,13]){for(let e=5;e<16;e++)i.set(t,e,e<8?9424730:6270522);i.set(t,4,13214778),i.set(t-1,5,12096303),i.set(t+1,5,14201418)}},wheat3(i){i.fill(0,0);for(const t of[2,5,8,11,13]){for(let e=4;e<16;e++)i.set(t,e,e<9?13214778:9083450);for(let e=0;e<3;e++)i.set(t,2+e,[15255642,14201418,15784040][e]),i.set(t-1,3+e,14201418),i.set(t+1,3+e,14728533)}},carrot0(i){i.fill(0,0),i.set(7,14,5216814),i.set(8,14,6270522),i.set(7,13,6270522)},carrot1(i){i.fill(0,0);for(const[t,e]of[[6,12],[7,11],[8,12],[9,11],[7,13],[8,14],[6,14],[9,13]])i.set(t,e,[5216814,6270522,7126084][i.ri(3)])},carrot2(i){i.fill(0,0);for(let t=8;t<16;t++)for(let e=4;e<12;e++)(i.r()<.7||e>5&&e<10)&&i.set(e,t,[4097060,5216814,6270522][i.ri(3)]);i.set(7,14,15764008),i.set(8,15,14710816)},carrot3(i){i.fill(0,0);for(let t=6;t<16;t++)for(let e=3;e<13;e++)Math.abs(e-7.5)+(t-10)*.3<5.5&&i.set(e,t,[4097060,5216814,6270522,7126084][i.ri(4)]);for(const[t,e]of[[6,13],[7,14],[8,13],[9,14],[7,12],[8,15]])i.set(t,e,[15764008,14710816,16751162][i.ri(3)])},corn0(i){i.fill(0,0),i.set(7,14,5216814),i.set(8,14,6270522),i.set(7,13,4097060)},corn1(i){i.fill(0,0);for(let t=8;t<16;t++)i.set(7,t,5216814),i.set(8,t,6270522);i.set(5,10,7126084),i.set(6,11,6270522),i.set(9,10,7126084),i.set(10,11,6270522)},corn2(i){i.fill(0,0);for(let t=3;t<16;t++)i.set(7,t,t%2?5216814:4097060),i.set(8,t,6270522);for(const t of[5,8,11,14])for(let e=1;e<=3;e++)i.set(7-e,t-(e>1?1:0),6270522),i.set(8+e,t-(e>1?1:0),7126084)},corn3(i){i.fill(0,0);for(let t=1;t<16;t++)i.set(7,t,t%2?5216814:4097060),i.set(8,t,6270522);for(const t of[4,7,10,13])for(let e=1;e<=4;e++)i.set(7-e,t,6270522),i.set(8+e,t,7126084);for(const[t,e]of[[5,7],[6,8],[5,9],[10,7],[9,8],[10,9]])i.set(t,e,[15781952,15253552,16769120][i.ri(3)])},bed_top(i){i.noise([12071474,11020842,12597818]);for(let t=1;t<6;t++)for(let e=2;e<14;e++)i.set(e,t,t===5?13158600:[15263976,15790320,14474460][i.ri(3)]);for(let t=0;t<16;t++)i.set(t,0,9071168),i.set(0,t,9071168),i.set(15,t,9071168)},bed_foot(i){i.noise([12071474,11020842,12597818]);for(let t=0;t<16;t+=5)for(let e=1;e<15;e++)(e+t)%3===0&&i.set(e,t,10101796);for(let t=0;t<16;t++)i.set(t,15,9071168),i.set(0,t,9071168),i.set(15,t,9071168)},bed_side(i){i.noise([12071474,11020842]);for(let t=9;t<16;t++)for(let e=0;e<16;e++)i.set(e,t,e<3||e>12?7230002:9071168)},hay_top(i){i.noise([13214778,14201418,12096303,14728533]);for(let t=0;t<16;t++)i.set(t,0,10123818),i.set(t,15,10123818),i.set(0,t,10123818),i.set(15,t,10123818)},hay_side(i){for(let t=0;t<16;t++)for(let e=0;e<16;e++)i.set(e,t,e%3===0?12096303:[14201418,13214778,14728533][i.ri(3)]);for(let t=0;t<16;t++)i.set(t,3,10107434),i.set(t,12,10107434)},box_top(i){bh.planks(i);for(let t=4;t<12;t++)for(let e=3;e<13;e++)i.set(e,t,t===4||t===11||e===3||e===12?5914662:2760210)},box_side(i){i.noise(an.plank);for(let t=0;t<16;t++)for(const e of[0,1,14,15])i.set(t,e,7230002),i.set(e,t,7230002);i.ellipse(8,8.5,4,3,an.potato),i.set(6,8,10253368),i.set(9,9,10253368),i.set(8,7,10253368)},melon_top(i){for(let t=0;t<16;t++)for(let e=0;e<16;e++){const n=Math.hypot(e-7.5,t-7.5);i.set(e,t,Math.floor(n*.9+i.r()*.6)%2?7313962:8367668)}i.set(7,7,4876826),i.set(8,8,4876826)},melon_side(i){for(let t=0;t<16;t++)for(let e=0;e<16;e++){const n=Math.floor((e+(i.r()<.15?1:0))/2)%2;i.set(e,t,n?5208604:[8828986,8039472][i.ri(2)])}},item_seed(i){i.fill(0,0);for(let t=5;t<14;t++)for(let e=4;e<12;e++){const n=e===4||e===11||t===5||t===13;i.set(e,t,n?7230002:[10779980,11437653,10122310][i.ri(3)])}i.set(6,8,14069090),i.set(7,9,15255642),i.set(9,8,15764008),i.set(8,10,15781952),i.set(7,4,6270522),i.set(8,3,5216814),i.set(9,4,6270522),i.outline(4863264)},item_potato(i){i.fill(0,0),i.ellipse(8,8.5,5.6,4.4,an.potato);for(const[t,e]of[[5,7],[9,10],[10,6],[7,11]])i.set(t,e,10253368);i.set(5,6,15782032),i.set(6,5,15782032),i.outline(7228964)},item_wheat(i){i.fill(0,0);for(let t=0;t<9;t++)i.set(7,14-t,t<4?13214778:6270522);for(const[t,e]of[[5,4],[6,3],[7,2],[8,3],[9,4],[6,5],[8,5]])i.set(t,e,[15255642,14201418,15784040][i.ri(3)]);i.outline(7230002)},item_carrot(i){i.fill(0,0);for(let t=5;t<14;t++){const e=Math.max(1,3-Math.floor((t-5)/3));for(let n=8-e;n<=8+e;n++)i.set(n,t,[15764008,14710816,16751162][i.ri(3)])}i.set(7,4,5216814),i.set(8,3,6270522),i.set(9,4,5216814),i.set(6,4,6270522),i.outline(7223826)},item_corn(i){i.fill(0,0);for(let t=4;t<13;t++)for(let e=5;e<11;e++)i.set(e,t,(e+t)%2?15781952:15253552);i.set(7,3,5216814),i.set(8,2,6270522),i.set(6,3,6270522),i.set(9,3,5216814),i.set(7,13,5216814),i.set(8,14,4097060),i.outline(7230002)},item_green(i){i.fill(0,0),i.ellipse(8,8.5,5.6,4.4,an.greenPotato);for(const[t,e]of[[5,7],[9,10],[10,6],[7,11]])i.set(t,e,6978090);i.set(5,6,14215312),i.set(6,5,14215312),i.outline(4608540)},item_powder(i){i.fill(0,0);for(let t=6;t<14;t++){const e=Math.min(6,1+(t-6));for(let n=8-e;n<8+e;n++)(i.r()<.92||t>9)&&i.set(n,t,[4868682,5921370,3815994,6974058,8026746][i.ri(5)])}i.set(8,5,5921370),i.outline(1973790)},item_sword(i){i.fill(0,0);for(let t=0;t<9;t++)i.set(5+t,10-t,15134192),i.set(6+t,10-t,12042952),i.set(5+t,9-t,13226968);i.set(14,1,15134192);for(const[t,e]of[[3,9],[4,10],[5,11],[6,12],[4,11]])i.set(t,e,7031338);for(const[t,e]of[[3,13],[2,13],[3,12],[2,14]])i.set(t,e,5913632);i.outline(2501166)},item_hoe(i){i.fill(0,0);for(let t=0;t<10;t++)i.set(3+t,13-t,t%3?9069112:7031338);for(const[t,e]of[[9,2],[10,2],[11,2],[12,3],[13,3],[12,2],[13,4]])i.set(t,e,13226968);i.outline(2501166)},item_turret(i){i.fill(0,0);for(let t=10;t<15;t++)for(let e=6;e<10;e++)i.set(e,t,t===10?7031338:9069112);for(let t=5;t<10;t++)for(let e=5;e<11;e++)i.set(e,t,6978184);for(const[t,e]of[[7,4],[8,4],[7,3],[8,3]])i.set(t,e,16738874);i.set(6,6,975),i.set(9,6,3893),i.outline(2501166)},item_dirt(i){i.fill(0,0);const t=[6991427,6135354,7846732],e=[8017209,7228467,8543294],n=[9857866,9068866,10252872];for(let s=0;s<16;s++)for(let r=0;r<16;r++){const o=r-7.5,a=4+Math.abs(o)*.5,l=4-(7.5-Math.abs(o))*.5;if(!(Math.abs(o)>7)){if(s>=l+.5&&s<a+.5)i.set(r,s,t[i.ri(3)]);else if(s>=a+.5&&s<a+8.5){const c=s<a+2;i.set(r,s,c?t[i.ri(3)]:o<0?e[i.ri(3)]:n[i.ri(3)])}}}i.outline(2760210)},heart_full(i){i.fill(0,0),nc(i,"full")},heart_half(i){i.fill(0,0),nc(i,"half")},heart_empty(i){i.fill(0,0),nc(i,"empty")}};function Hd(i,t,e){i.fill(0,0);for(let n=8;n<16;n++)i.set(7,n,4097060);i.set(6,11,5216814),i.set(5,10,6270522),i.set(8,12,5216814),i.set(9,11,6270522);for(const[n,s]of[[7,4],[6,5],[8,5],[7,6],[6,4],[8,6],[6,6],[8,4]])i.set(n,s,t[i.ri(t.length)]);i.set(7,5,e),i.set(5,5,t[0]),i.set(9,5,t[0]),i.set(7,3,t[0]),i.set(7,7,t[0])}let na=null;function s1(){if(na)return na;const i=document.createElement("canvas");i.width=i.height=Ir;const t=i.getContext("2d"),e={},n={};Object.keys(bh).forEach((l,c)=>{const h=new i1(n1("tile:"+l));bh[l](h);const d=new ImageData(h.d,_e,_e);n[l]=d;const u=c%Vr,f=Math.floor(c/Vr);t.putImageData(d,u*_e,f*_e),e[l]=c});const s=new is(i);s.colorSpace=Ve,s.magFilter=he,s.minFilter=he,s.generateMipmaps=!1;const r=document.createElement("canvas");r.width=r.height=_e,r.getContext("2d").putImageData(n.water,0,0);const o=new is(r);o.colorSpace=Ve,o.magFilter=he,o.minFilter=he,o.generateMipmaps=!1,o.wrapS=o.wrapT=Zr;const a={};return na={texture:s,water:o,canvas:i,images:n,uv(l){const c=e[l];if(c===void 0)throw new Error("タイルがありません: "+l);const h=c%Vr,d=Math.floor(c/Vr),u=h*_e/Ir,f=(h+1)*_e/Ir,g=1-d*_e/Ir,x=1-(d+1)*_e/Ir;return[u,x,f,g]},iconURL(l){if(a[l])return a[l];const c=document.createElement("canvas");return c.width=c.height=_e,c.getContext("2d").putImageData(n[l],0,0),a[l]=c.toDataURL()}},na}const k={AIR:0,GRASS:1,DIRT:2,FARM:3,FARM_WET:4,STONE:5,SAND:6,WATER:7,LOG:8,LEAVES:9,PLANKS:10,COBBLE:11,GLASS:12,LANTERN:13,TALLGRASS:14,FLOWER_R:15,FLOWER_Y:16,CANE:17,POTATO0:18,POTATO1:19,POTATO2:20,POTATO3:21,BED:22,HAY:23,BEDROCK:24,BOX:25,MELON:26,PATH:27,GRAVEL:28,BED_FOOT:29,WHEAT0:30,WHEAT1:31,WHEAT2:32,WHEAT3:33,CARROT0:34,CARROT1:35,CARROT2:36,CARROT3:37,CORN0:38,CORN1:39,CORN2:40,CORN3:41,APPLE:42,STAIRS_Z:43,STAIRS_X:44},Qe=(i,t={})=>({shape:"cube",tex:i,full:!0,opaque:!0,solid:!0,blast:!0,...t}),ao=(i,t={})=>({shape:"cross",tex:i,full:!1,opaque:!1,solid:!1,blast:!0,plant:!0,...t}),fn=(i,t,e,n=6135354)=>({shape:"crop",tex:e,full:!1,opaque:!1,solid:!1,blast:!0,crop:t,cropKind:i,particle:n}),ct=[];ct[k.AIR]={shape:"none",full:!1,opaque:!1,solid:!1,blast:!1};ct[k.GRASS]=Qe({top:"grass_top",side:"grass_side",bottom:"dirt"},{particle:6991427,restore:k.GRASS});ct[k.DIRT]=Qe("dirt",{particle:9068866,restore:k.DIRT});ct[k.FARM]=Qe({top:"farm_dry",side:"dirt",bottom:"dirt"},{shape:"low",full:!1,h:15/16,particle:8017462,farm:!0,restore:k.DIRT});ct[k.FARM_WET]=Qe({top:"farm_wet",side:"dirt",bottom:"dirt"},{shape:"low",full:!1,h:15/16,particle:5190946,farm:!0,wet:!0,restore:k.DIRT});ct[k.STONE]=Qe("stone",{particle:8224125,restore:k.STONE});ct[k.SAND]=Qe("sand",{particle:14406560,restore:k.SAND});ct[k.WATER]={shape:"water",tex:"water",full:!1,opaque:!1,solid:!1,blast:!1,liquid:!0,skyAtten:2};ct[k.LOG]=Qe({top:"log_top",side:"log_side",bottom:"log_top"},{particle:7033395,blast:!1});ct[k.LEAVES]=Qe("leaves",{full:!1,opaque:!1,cutout:!0,particle:4889138,skyAtten:1,green:!1});ct[k.PLANKS]=Qe("planks",{particle:10779980,blast:!1});ct[k.COBBLE]=Qe("cobble",{particle:9079434,blast:!1});ct[k.GLASS]=Qe("glass",{full:!1,opaque:!1,cutout:!0,particle:14019824,blast:!1,glass:!0});ct[k.LANTERN]={shape:"lantern",tex:"lantern",full:!1,opaque:!1,solid:!1,blast:!1,light:14,particle:16765562};ct[k.TALLGRASS]=ao("tallgrass",{particle:6135354});ct[k.FLOWER_R]=ao("flower_r",{particle:13777466});ct[k.FLOWER_Y]=ao("flower_y",{particle:15781952});ct[k.CANE]=ao("cane",{particle:9424730,green:"cane"});ct[k.POTATO0]=fn("potato",0,"potato0");ct[k.POTATO1]=fn("potato",1,"potato1");ct[k.POTATO2]=fn("potato",2,"potato2");ct[k.POTATO3]=fn("potato",3,"potato3");ct[k.BED]=Qe({top:"bed_top",side:"bed_side",bottom:"planks"},{shape:"half",full:!1,opaque:!1,h:9/16,particle:12071474,blast:!1});ct[k.BED_FOOT]=Qe({top:"bed_foot",side:"bed_side",bottom:"planks"},{shape:"half",full:!1,opaque:!1,h:9/16,particle:12071474,blast:!1});ct[k.HAY]=Qe({top:"hay_top",side:"hay_side",bottom:"hay_top"},{particle:14201418,blast:!1});ct[k.BEDROCK]=Qe("bedrock",{particle:3815994,blast:!1});ct[k.BOX]=Qe({top:"box_top",side:"box_side",bottom:"planks"},{particle:10779980,blast:!1});ct[k.MELON]=Qe({top:"melon_top",side:"melon_side",bottom:"melon_top"},{particle:7313962,green:"melon",blast:!1});ct[k.PATH]=Qe({top:"path_top",side:"path_side",bottom:"dirt"},{shape:"low",full:!1,h:15/16,particle:10256202,restore:k.PATH});ct[k.GRAVEL]=Qe("gravel",{particle:8682616,restore:k.GRAVEL});ct[k.WHEAT0]=fn("wheat",0,"wheat0",8109896);ct[k.WHEAT1]=fn("wheat",1,"wheat1",8109896);ct[k.WHEAT2]=fn("wheat",2,"wheat2",13214778);ct[k.WHEAT3]=fn("wheat",3,"wheat3",14728533);ct[k.CARROT0]=fn("carrot",0,"carrot0",6270522);ct[k.CARROT1]=fn("carrot",1,"carrot1",6270522);ct[k.CARROT2]=fn("carrot",2,"carrot2",5216814);ct[k.CARROT3]=fn("carrot",3,"carrot3",15764008);ct[k.CORN0]=fn("corn",0,"corn0",5216814);ct[k.CORN1]=fn("corn",1,"corn1",6270522);ct[k.CORN2]=fn("corn",2,"corn2",5216814);ct[k.CORN3]=fn("corn",3,"corn3",15781952);ct[k.APPLE]=ao("apple",{particle:13777466,apple:!0});ct[k.STAIRS_Z]={shape:"stairs",tex:"planks",full:!1,opaque:!1,solid:!0,blast:!1,h:1,stair:"+z",particle:10779980};ct[k.STAIRS_X]={shape:"stairs",tex:"planks",full:!1,opaque:!1,solid:!0,blast:!1,h:1,stair:"+x",particle:10779980};for(const i of ct)i&&(i.h??=1,i.skyAtten??=0,i.light??=0,i.particle??=8947848);const cn=i=>!!ct[i]?.cropKind,nu=i=>cn(i)?ct[i].crop:-1,oi=i=>i===k.FARM||i===k.FARM_WET,r1=i=>!!ct[i]?.plant||cn(i),ss=[{id:"potato",stages:[k.POTATO0,k.POTATO1,k.POTATO2,k.POTATO3],seedTool:"potato",dropKind:"potato",growWet:25,growDry:50,yieldMin:1,yieldMax:4,particle:6135354,sparkle:14069090,countsForGoal:!0,edible:!0,rareDrop:"green",rareChance:.035,heights:[.25,.45,.65,.85]},{id:"wheat",stages:[k.WHEAT0,k.WHEAT1,k.WHEAT2,k.WHEAT3],seedTool:"wheat",dropKind:"wheat",growWet:22,growDry:44,yieldMin:1,yieldMax:3,particle:8109896,sparkle:15255642,countsForGoal:!0,edible:!1,heights:[.3,.5,.72,.95]},{id:"carrot",stages:[k.CARROT0,k.CARROT1,k.CARROT2,k.CARROT3],seedTool:"carrot",dropKind:"carrot",growWet:18,growDry:36,yieldMin:1,yieldMax:2,particle:6270522,sparkle:15764008,countsForGoal:!0,edible:!1,heights:[.22,.38,.52,.7]},{id:"corn",stages:[k.CORN0,k.CORN1,k.CORN2,k.CORN3],seedTool:"corn",dropKind:"corn",growWet:28,growDry:56,yieldMin:1,yieldMax:3,particle:5216814,sparkle:15781952,countsForGoal:!0,edible:!1,heights:[.35,.55,.78,.98]}],o1=Object.fromEntries(ss.map(i=>[i.id,i]));ss.map(i=>i.seedTool);const Nr=["wheat","corn","potato","carrot"],_r=new Map;for(const i of ss)for(const t of i.stages)_r.set(t,i);function kr(i){return _r.get(i)||null}function ai(i){const t=_r.get(i);return!!t&&i===t.stages[t.stages.length-1]}function a1(i){const t=_r.get(i);if(!t)return 1;const e=nu(i);return t.heights[e]??t.heights[t.heights.length-1]}function l1(i){if(i.id==="potato"){const e=Math.random();return e<.25?1:e<.7?2:e<.94?3:4}const t=i.yieldMax-i.yieldMin;return i.yieldMin+Math.floor(Math.random()*(t+1))}function c1(i){const t=_r.get(i);if(!t)return i;const e=nu(i);return e>=t.stages.length-1?i:t.stages[e+1]}function h1(i){const t=_r.get(i);if(!t||ai(i))return null;const e=nu(i),n=Math.random()<.45?2:1;return t.stages[Math.min(t.stages.length-1,e+n)]}function u1(i){return ss.find(t=>t.seedTool===i)||null}function Ur(i={}){const t={potato:0,wheat:0,carrot:0,corn:0};for(const[e,n]of Object.entries(i))e in t&&(t[e]=n|0);return t}const at=96,$n=32,zt=96,bn=16,Xn=8,nt=9,ms=at*$n*zt,fe=16,pe=16,ut={center:[32+fe,32+pe],fieldA:{x0:21+fe,x1:29+fe,z0:30+pe,z1:38+pe,water:[25+fe,34+pe]},fieldB:{x0:31+fe,x1:39+fe,z0:30+pe,z1:38+pe,water:[35+fe,34+pe]},pathX:30+fe,house:{x0:24+fe,x1:36+fe,z0:16+pe,z1:26+pe,door:[30+fe,26+pe]},bed:[25+fe,18+pe],beds:[[25+fe,18+pe],[25+fe,21+pe],[25+fe,24+pe]],charge:[[27+fe,17+pe],[30+fe,17+pe],[33+fe,17+pe]],box:[38+fe,27+pe],pond:[42.5+fe,42.5+pe],farmZone:{x0:19+fe,x1:41+fe,z0:28+pe,z1:40+pe},spawn:[30.5+fe,nt+1,27.5+pe],posts:[[20+fe,29+pe],[40+fe,29+pe],[20+fe,39+pe],[40+fe,39+pe]],pigPen:{x0:43+fe,x1:51+fe,z0:29+pe,z1:37+pe,gateX:43+fe,gateZ0:32+pe,gateZ1:34+pe},beachDir:-Math.PI/2,beachHalfWidth:.72};function Wr(i,t,e){let n=Math.imul(i|0,668265261)^Math.imul(t|0,374761393)^Math.imul(e|0,2654435769);return n=Math.imul(n^n>>>15,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296}function d1(i,t,e){const n=Math.floor(i),s=Math.floor(t),r=i-n,o=t-s,a=r*r*(3-2*r),l=o*o*(3-2*o),c=Wr(n,s,e),h=Wr(n+1,s,e),d=Wr(n,s+1,e),u=Wr(n+1,s+1,e);return c+(h-c)*a+(d-c)*l+(c-h-d+u)*a*l}function ic(i,t,e,n=3){let s=0,r=1,o=1,a=0;for(let l=0;l<n;l++)s+=r*d1(i*o,t*o,e+l*17),a+=r,r*=.5,o*=2;return s/a}const Pn=(i,t,e,n=0)=>i>=e.x0-n&&i<=e.x1+n&&t>=e.z0-n&&t<=e.z1+n;class f1{constructor(t=20261007){this.seed=t,this.data=new Uint8Array(ms),this.base=null,this.sky=new Uint8Array(ms),this.blk=new Uint8Array(ms),this.floor=new Int8Array(at*zt),this.water=new Uint8Array(at*zt),this.dirty=new Set,this.lightDirty=!1,this.navDirty=new Set,this.spawnCells=[],this.pigCells=[]}idx(t,e,n){return t+at*(n+zt*e)}inside(t,e,n){return t>=0&&e>=0&&n>=0&&t<at&&e<$n&&n<zt}get(t,e,n){return e<0?k.BEDROCK:t<0||n<0||t>=at||n>=zt||e>=$n?k.AIR:this.data[t+at*(n+zt*e)]}def(t,e,n){return ct[this.get(t,e,n)]}baseAt(t,e,n){return this.inside(t,e,n)?this.base[this.idx(t,e,n)]:k.AIR}set(t,e,n,s){if(!this.inside(t,e,n))return;const r=this.idx(t,e,n),o=this.data[r];if(o===s)return;this.data[r]=s;const a=ct[o],l=ct[s];(a.opaque!==l.opaque||a.light!==l.light||a.skyAtten!==l.skyAtten)&&(this.lightDirty=!0),this.markDirty(t,n);for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++){const d=t+h,u=n+c;d>=0&&u>=0&&d<at&&u<zt&&this.navDirty.add(d+u*at)}}markDirty(t,e){const n=t>>4,s=e>>4;for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){const a=t+o>>4,l=e+r>>4;a<0||l<0||a>=at/bn||l>=zt/bn||(a!==n||l!==s||o===0&&r===0)&&this.dirty.add(a+l*(at/bn))}}generate(){const t=this.seed,e=es(t),n=this.data;n.fill(0);const[s,r]=ut.center,o=new Int8Array(at*zt),a=(S,M)=>{let C=Math.abs(S-M)%(Math.PI*2);return C>Math.PI&&(C=Math.PI*2-C),C};for(let S=0;S<zt;S++)for(let M=0;M<at;M++){const C=M+.5-s,I=S+.5-r,D=Math.hypot(C,I),q=Math.atan2(I,C),O=40.5+(ic(Math.cos(q)*1.6+7,Math.sin(q)*1.6+7,t,2)-.5)*9,z=D/O,$=a(q,ut.beachDir)<ut.beachHalfWidth;let tt;if(z>=1)tt=Xn-2-Math.min(3,(z-1)*14);else{const ft=ic(M*.09,S*.09,t+1,3),At=Qi(1,.86,z);let G=Qi(.5,.7,z)*(1-Qi(.84,.97,z));if($&&(G*=.05),tt=Xn-1+At*2.2+G*(ft*6.5+.5)+(ft-.5)*1.2*At,$&&z>.52){const ht=Xn+.15+At*1.35+(1-z)*1.8;tt=As(tt,ht,Qi(.52,.78,z))}const j=1-Qi(15.5,19.5,D);tt=As(tt,nt,j)}const lt=Math.max(2,Math.min($n-8,Math.round(tt)));o[M+S*at]=lt;const It=lt<=Xn+1&&z>.72||$&&z>.58&&lt<=nt-1;for(let ft=0;ft<=lt;ft++){let At;ft===0?At=k.BEDROCK:ft<lt-3?At=k.STONE:ft<lt?At=It||lt<Xn-1?k.SAND:k.DIRT:At=It||lt<Xn-1?lt<Xn-2&&Wr(M,S,t+5)<.25?k.GRAVEL:k.SAND:k.GRASS,n[this.idx(M,ft,S)]=At}for(let ft=lt+1;ft<Xn;ft++)n[this.idx(M,ft,S)]=k.WATER}const l=(S,M,C,I)=>{this.inside(S,M,C)&&(n[this.idx(S,M,C)]=I)},c=(S,M,C)=>this.inside(S,M,C)?n[this.idx(S,M,C)]:k.AIR,h=ut.fieldA,d=ut.fieldB;let u=0;for(let S=h.z0;S<=h.z1;S++)for(let M=h.x0;M<=h.x1;M++){l(M,nt,S,k.FARM_WET);const C=M-h.x0;let I=-1;if(C<=1?I=3:C<=5&&(I=Math.floor(e()*3)),I>=0){const D=ss[u%ss.length];u++,l(M,nt+1,S,D.stages[I])}}l(h.water[0],nt,h.water[1],k.WATER),l(h.water[0],nt+1,h.water[1],k.AIR),l(d.water[0],nt,d.water[1],k.WATER);for(let S=ut.house.z1+1;S<=h.z1+1;S++)l(ut.pathX,nt,S,k.PATH);for(let S=h.x0-1;S<=d.x1+1;S++)l(S,nt,h.z0-1,k.PATH);const f=ut.house;for(let S=f.z0;S<=f.z1;S++)for(let M=f.x0;M<=f.x1;M++){l(M,nt,S,k.COBBLE);const C=M===f.x0||M===f.x1||S===f.z0||S===f.z1,I=(M===f.x0||M===f.x1)&&(S===f.z0||S===f.z1);for(let D=nt+1;D<=nt+3;D++)l(M,D,S,C?I?k.LOG:k.PLANKS:k.AIR)}const g=f.x0+f.x1>>1;for(const[S,M]of[[f.x0,f.z0+3],[f.x0,f.z0+5],[f.x0,f.z0+7],[f.x1,f.z0+3],[f.x1,f.z0+5],[f.x1,f.z0+7],[g-3,f.z1],[g+3,f.z1]])l(S,nt+2,M,k.GLASS);l(f.door[0],nt+1,f.door[1],k.AIR),l(f.door[0],nt+2,f.door[1],k.AIR);for(let S=f.z0;S<=f.z1;S++)for(let M=f.x0;M<=f.x1;M++){l(M,nt+4,S,k.PLANKS);for(let C=nt+5;C<=nt+7;C++)l(M,C,S,k.AIR)}for(let S=f.z0;S<=f.z1;S++)for(let M=f.x0;M<=f.x1;M++)(M===f.x0||M===f.x1||S===f.z0||S===f.z1)&&l(M,nt+5,S,k.COBBLE);const x=f.x1-2,m=f.z1-5;for(let S=0;S<3;S++){const M=m+S,C=nt+1+S;l(x,C,M,k.STAIRS_Z),l(x-1,C,M,k.STAIRS_Z);for(let I=C+1;I<=nt+6;I++)l(x,I,M,k.AIR),l(x-1,I,M,k.AIR)}for(let S=nt+2;S<=nt+5;S++)l(x,S,m-1,k.AIR),l(x-1,S,m-1,k.AIR);l(x,nt+4,m+2,k.AIR),l(x-1,nt+4,m+2,k.AIR),l(x,nt+5,m+2,k.AIR),l(x-1,nt+5,m+2,k.AIR),l(g,nt+5,f.z0+f.z1>>1,k.LANTERN);for(const[S,M]of ut.beds||[ut.bed])l(S,nt+1,M,k.BED),l(S,nt+1,M+1,k.BED_FOOT);for(const[S,M]of ut.charge||[])l(S,nt,M,k.COBBLE),l(S,nt+1,M,k.AIR),l(S,nt+2,M,k.AIR),l(S,nt+1,f.z0,k.PLANKS),l(S,nt+2,f.z0,k.PLANKS),l(S,nt+3,f.z0,k.PLANKS);l(g-4,nt+1,f.z0+2,k.HAY),l(g-3,nt+1,f.z0+2,k.HAY),l(ut.box[0],nt+1,ut.box[1],k.BOX),l(f.x1+2,nt+1,f.z0+2,k.HAY),l(f.x1+2,nt+1,f.z0+3,k.HAY),l(f.x1+2,nt+2,f.z0+2,k.HAY),l(g-1,nt+1,f.z1+1,k.LANTERN),l(g+1,nt+1,f.z1+1,k.LANTERN);for(const[S,M]of ut.posts)l(S,nt+1,M,k.LOG),l(S,nt+2,M,k.LANTERN);for(let S=f.z0-1;S>=f.z0-10;S--)(c(g,nt,S)===k.GRASS||c(g,nt,S)===k.DIRT||c(g,nt,S)===k.SAND)&&(l(g,nt,S,k.PATH),l(g,nt+1,S,k.AIR));const p=ut.pigPen,y=(S,M)=>S===p.gateX&&M>=p.gateZ0&&M<=p.gateZ1,T=(S,M)=>(S===p.x0||S===p.x1)&&(M===p.z0||M===p.z1),_=(S,M)=>S===p.x0||S===p.x1||M===p.z0||M===p.z1?T(S,M)?!0:S===p.x0||S===p.x1?(M-p.z0)%2===0:(S-p.x0)%2===0:!1;for(let S=p.z0;S<=p.z1;S++)for(let M=p.x0;M<=p.x1;M++){l(M,nt,S,k.GRASS);for(let C=nt+1;C<=nt+5;C++)l(M,C,S,k.AIR)}for(let S=ut.fieldB.x1+1;S<=p.gateX+2;S++)for(let M=p.gateZ0;M<=p.gateZ1;M++)l(S,nt,M,k.PATH),l(S,nt+1,M,k.AIR);const E=(S,M)=>S===p.gateX&&(M===p.gateZ0-1||M===p.gateZ1+1);for(let S=p.z0;S<=p.z1;S++)for(let M=p.x0;M<=p.x1;M++)!(M===p.x0||M===p.x1||S===p.z0||S===p.z1)||y(M,S)||(_(M,S)?(l(M,nt+1,S,k.LOG),(T(M,S)||E(M,S))&&l(M,nt+2,S,k.LANTERN)):l(M,nt+1,S,k.PLANKS));const w=p.x0+p.x1>>1,P=p.z0+p.z1>>1;l(w-1,nt+1,p.z1-1,k.HAY),l(w,nt+1,p.z1-1,k.HAY),l(w+1,nt+1,p.z1-1,k.HAY),l(w,nt+2,p.z1-1,k.HAY),l(w,nt,P,k.DIRT),l(w,nt+1,P,k.LOG),l(w,nt+2,P,k.LOG),l(w,nt+3,P,k.LEAVES);for(const[S,M]of[[1,0],[-1,0],[0,1],[0,-1]])l(w+S,nt+3,P+M,k.LEAVES);l(w,nt+4,P,k.LEAVES);for(const[S,M]of[[w-2,P],[w+2,P],[w,P+2],[w-1,P+1],[w+1,P-1],[w+2,P+1]])S>p.x0&&S<p.x1&&M>p.z0&&M<p.z1&&c(S,nt+1,M)===k.AIR&&l(S,nt+1,M,k.APPLE);const[v,R]=ut.pond;for(let S=Math.floor(R-5);S<=R+5;S++)for(let M=Math.floor(v-5);M<=v+5;M++){const C=Math.hypot(M+.5-v,S+.5-R);if(C<=2.7){l(M,nt,S,k.WATER),C<=1.6&&l(M,nt-1,S,k.WATER);for(let I=nt+1;I<nt+4;I++)l(M,I,S,k.AIR)}else C<=3.7&&c(M,nt,S)===k.GRASS&&l(M,nt,S,k.SAND)}for(let S=Math.floor(R-5);S<=R+5;S++)for(let M=Math.floor(v-5);M<=v+5;M++){if(c(M,nt,S)!==k.SAND)continue;if([[1,0],[-1,0],[0,1],[0,-1]].some(([I,D])=>c(M+I,nt,S+D)===k.WATER)&&e()<.55){const I=2+Math.floor(e()*2);for(let D=1;D<=I;D++)l(M,nt+D,S,k.CANE)}}let N=0;for(let S=0;S<80&&N<2;S++){const M=e()*Math.PI*2,C=4.6+e(),I=Math.floor(v+Math.cos(M)*C),D=Math.floor(R+Math.sin(M)*C);c(I,nt,D)===k.GRASS&&c(I,nt+1,D)===k.AIR&&!Pn(I,D,ut.farmZone)&&(l(I,nt+1,D,k.MELON),N++)}const F=[],B=(S,M)=>Pn(S,M,ut.farmZone,2)||Pn(S,M,f,3)||Pn(S,M,ut.pigPen,2)||Math.hypot(S-v,M-R)<7;for(let S=0;S<520&&F.length<28;S++){const M=3+Math.floor(e()*(at-6)),C=3+Math.floor(e()*(zt-6)),I=o[M+C*at],D=Math.hypot(M+.5-s,C+.5-r);if(D<14||I<Xn||c(M,I,C)!==k.GRASS||B(M,C)||a(Math.atan2(C+.5-r,M+.5-s),ut.beachDir)<ut.beachHalfWidth*.85&&D>18||F.some(([O,z])=>Math.hypot(O-M,z-C)<4.2))continue;F.push([M,C]);const q=4+Math.floor(e()*2);l(M,I,C,k.DIRT);for(let O=1;O<=q;O++)l(M,I+O,C,k.LOG);for(let O=I+q-2;O<=I+q+1;O++){const z=O>=I+q?1:2;for(let $=-z;$<=z;$++)for(let tt=-z;tt<=z;tt++)Math.abs(tt)===z&&Math.abs($)===z&&(O===I+q+1||e()<.5)||c(M+tt,O,C+$)===k.AIR&&l(M+tt,O,C+$,k.LEAVES)}}for(let S=1;S<zt-1;S++)for(let M=1;M<at-1;M++){const C=o[M+S*at];if(c(M,C,S)!==k.GRASS||c(M,C+1,S)!==k.AIR||Pn(M,S,ut.farmZone,1)||Pn(M,S,f,2)||Pn(M,S,ut.pigPen,1)||M===ut.pathX)continue;const I=ic(M*.2,S*.2,t+9,2),D=e();D<.03?l(M,C+1,S,e()<.5?k.FLOWER_R:k.FLOWER_Y):D<.03+I*.32&&l(M,C+1,S,k.TALLGRASS)}this.base=n.slice(),this.recomputeLight(!0),this.computeNav(),this.collectSpawns();for(let S=0;S<at/bn*(zt/bn);S++)this.dirty.add(S)}collectSpawns(){const[t,e]=ut.center;this.spawnCells=[],this.pigCells=[];for(let n=2;n<zt-2;n++)for(let s=2;s<at-2;s++){const r=s+n*at,o=this.floor[r];if(o<Xn||this.water[r]||ct[this.get(s,o-1,n)].cutout)continue;const a=Math.hypot(s+.5-t,n+.5-e);a>22&&a<38&&this.spawnCells.push(r),a>14&&a<28&&!Pn(s,n,ut.farmZone,2)&&this.pigCells.push(r)}}diff(){const t=[];for(let e=0;e<ms;e++)this.data[e]!==this.base[e]&&t.push(e,this.data[e]);return t}applyDiff(t){this.data.set(this.base);for(let e=0;e+1<t.length;e+=2){const n=t[e],s=t[e+1];n>=0&&n<ms&&ct[s]&&(this.data[n]=s)}this.recomputeLight(!0),this.computeNav();for(let e=0;e<at/bn*(zt/bn);e++)this.dirty.add(e)}recomputeLight(t=!1){const e=t?null:this.sky.slice(),n=t?null:this.blk.slice(),s=this.sky,r=this.blk,o=this.data;s.fill(0),r.fill(0);const a=new Uint8Array(ct.length),l=new Uint8Array(ct.length),c=new Uint8Array(ct.length);ct.forEach((x,m)=>{x&&(a[m]=x.opaque?1:0,l[m]=x.skyAtten,c[m]=x.light)});const h=new Int32Array(1<<20),d=h.length-1,u=at*zt,f=(x,m,p)=>{for(;m!==p;){const y=h[m];m=m+1&d;const T=x[y];if(T<=1)continue;const _=y%at,E=(y/at|0)%zt,w=y/u|0,P=[_>0?y-1:-1,_<at-1?y+1:-1,E>0?y-at:-1,E<zt-1?y+at:-1,w>0?y-u:-1,w<$n-1?y+u:-1];for(let v=0;v<6;v++){const R=P[v];if(R<0)continue;const N=o[R];if(a[N])continue;const F=T-1-l[N];F>x[R]&&(x[R]=F,h[p]=R,p=p+1&d)}}};let g=0;for(let x=0;x<zt;x++)for(let m=0;m<at;m++){let p=15;for(let y=$n-1;y>=0;y--){const T=m+at*(x+zt*y),_=o[T];if(a[_]||(p-=l[_],p<=0))break;s[T]=p,h[g]=T,g=g+1&d}}f(s,0,g),g=0;for(let x=0;x<ms;x++)c[o[x]]&&(r[x]=c[o[x]],h[g++]=x);if(f(r,0,g),this.lightDirty=!1,e){const x=at/bn;for(let m=0;m<ms;m++)if(s[m]!==e[m]||r[m]!==n[m]){const p=m%at,y=(m/at|0)%zt;this.dirty.add((p>>4)+(y>>4)*x),(p&15)===0&&p>0&&this.dirty.add((p-1>>4)+(y>>4)*x),(p&15)===15&&p<at-1&&this.dirty.add((p+1>>4)+(y>>4)*x),(y&15)===0&&y>0&&this.dirty.add((p>>4)+(y-1>>4)*x),(y&15)===15&&y<zt-1&&this.dirty.add((p>>4)+(y+1>>4)*x)}}}lightAt(t,e,n){if(t=Math.floor(t),e=Math.floor(e),n=Math.floor(n),!this.inside(t,e,n))return[e>=0?15:0,0];const s=this.idx(t,e,n);return[this.sky[s],this.blk[s]]}floorAt(t,e){for(let n=1;n<$n-2;n++)if(ct[this.get(t,n-1,e)].solid&&!(ct[this.get(t,n,e)].solid||ct[this.get(t,n+1,e)].solid))return n;return-1}computeNav(){for(let t=0;t<zt;t++)for(let e=0;e<at;e++)this.updateNavCell(e,t);this.navDirty.clear()}updateNavCell(t,e){const n=t+e*at,s=this.floorAt(t,e);this.floor[n]=s,this.water[n]=s>=0&&(this.get(t,s,e)===k.WATER||this.get(t,s-1,e)===k.WATER)?1:0}flushNav(){if(this.navDirty.size){for(const t of this.navDirty)this.updateNavCell(t%at,t/at|0);this.navDirty.clear()}}groundBelow(t,e,n){const s=Math.floor(t),r=Math.floor(n);for(let o=Math.min($n-1,Math.floor(e));o>=0;o--){const a=ct[this.get(s,o,r)];if(a.solid&&o+a.h<=e+.001)return o+a.h}return 0}raycast(t,e,n,s,r,o,a,l=c=>c!==k.AIR&&c!==k.WATER){let c=Math.floor(t),h=Math.floor(e),d=Math.floor(n);const u=s>0?1:s<0?-1:0,f=r>0?1:r<0?-1:0,g=o>0?1:o<0?-1:0,x=Math.abs(s)||1e-9,m=Math.abs(r)||1e-9,p=Math.abs(o)||1e-9;let y=u>0?(c+1-t)/x:u<0?(t-c)/x:1/0,T=f>0?(h+1-e)/m:f<0?(e-h)/m:1/0,_=g>0?(d+1-n)/p:g<0?(n-d)/p:1/0;const E=1/x,w=1/m,P=1/p;let v=0,R=0,N=0,F=0;for(let B=0;B<64&&F<=a;B++){const S=this.get(c,h,d);if(l(S,c,h,d)){const M=ct[S],C=cn(S)?.25+.2*(S-k.POTATO0):M.h;if(C>=.999||this._hitsLow(t,e,n,s,r,o,c,h,d,C,F))return{x:c,y:h,z:d,id:S,nx:v,ny:R,nz:N,dist:F}}if(y<T&&y<_?(c+=u,F=y,y+=E,v=-u,R=0,N=0):T<_?(h+=f,F=T,T+=w,v=0,R=-f,N=0):(d+=g,F=_,_+=P,v=0,R=0,N=-g),h<0||h>=$n+2)break}return null}_hitsLow(t,e,n,s,r,o,a,l,c,h,d){let u=d,f=1/0;const g=(x,m,p,y)=>{if(Math.abs(m)<1e-9)return x>=p&&x<=y;let T=(p-x)/m,_=(y-x)/m;return T>_&&([T,_]=[_,T]),u=Math.max(u,T),f=Math.min(f,_),u<=f};return g(t,s,a,a+1)&&g(e,r,l,l+h)&&g(n,o,c,c+1)}}const Se={uSky:{value:1},uSkyColor:{value:new Ot(1,1,1)},uBlockColor:{value:new Ot(1,.82,.55)},uMinLight:{value:.035},uFogColor:{value:new Ot(.75,.85,1)},uFogNear:{value:42},uFogFar:{value:105},uTime:{value:0}},lo=`
  uniform float uSky, uMinLight, uFogNear, uFogFar;
  uniform vec3 uSkyColor, uBlockColor, uFogColor;
  vec3 lightOf(float sky, float blk) {
    float s = clamp(sky, 0.0, 1.0);
    float b = clamp(blk, 0.0, 1.0);
    float sk = pow(max(s, 0.0), 1.6) * uSky;
    float bk = pow(max(b, 0.0), 1.7);
    vec3 L = max(uSkyColor * sk, uBlockColor * bk);
    return max(L, vec3(uMinLight));
  }
  vec3 fogged(vec3 col, float depth) {
    float f = smoothstep(uFogNear, max(uFogFar, uFogNear + 0.01), depth);
    return mix(col, uFogColor, f);
  }
`;function Gd(i,t="opaque"){return new Ne({uniforms:{...Se,map:{value:i}},vertexShader:`
      attribute vec3 light;
      varying vec2 vUv;
      varying vec3 vLight;
      varying float vDepth;
      void main() {
        vUv = uv;
        vLight = light;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform sampler2D map;
      varying vec2 vUv;
      varying vec3 vLight;
      varying float vDepth;
      ${lo}
      void main() {
        vec4 tex = texture2D(map, vUv);
        if (tex.a < 0.5) discard;
        vec3 col = tex.rgb * lightOf(vLight.y, vLight.z) * clamp(vLight.x, 0.0, 1.0);
        gl_FragColor = vec4(fogged(col, vDepth), 1.0);
      }`,side:t==="cutout"?Sn:ki})}function p1(i){return new Ne({uniforms:{...Se,map:{value:i}},vertexShader:`
      attribute vec3 light;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vLight;
      varying float vDepth;
      void main() {
        vUv = uv + vec2(uTime * 0.05, uTime * 0.11);
        vLight = light;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform sampler2D map;
      varying vec2 vUv;
      varying vec3 vLight;
      varying float vDepth;
      ${lo}
      void main() {
        vec4 tex = texture2D(map, vUv);
        vec3 col = tex.rgb * lightOf(vLight.y, vLight.z) * clamp(vLight.x, 0.0, 1.0);
        gl_FragColor = vec4(fogged(col, vDepth), clamp(tex.a, 0.0, 1.0) * 0.92);
      }`,transparent:!0,depthWrite:!1,side:Sn})}function m1(i){return new Ne({uniforms:{...Se,map:{value:i}},vertexShader:`
      uniform float uTime;
      varying vec2 vUv;
      varying float vDepth;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vUv = wp.xz + vec2(uTime * 0.05, uTime * 0.11);
        vec4 mv = viewMatrix * wp;
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform sampler2D map;
      varying vec2 vUv;
      varying float vDepth;
      ${lo}
      void main() {
        vec4 tex = texture2D(map, vUv);
        vec3 deep = vec3(0.02, 0.05, 0.16);
        vec3 col = mix(deep, tex.rgb, 0.7) * lightOf(1.0, 0.0);
        gl_FragColor = vec4(fogged(col, vDepth), 1.0);
      }`})}function Bn(i,{cutout:t=!0,side:e=ki}={}){return new Ne({uniforms:{uFogColor:Se.uFogColor,uFogNear:Se.uFogNear,uFogFar:Se.uFogFar,uSky:Se.uSky,uSkyColor:Se.uSkyColor,uBlockColor:Se.uBlockColor,uMinLight:Se.uMinLight,map:{value:i},uLight:{value:new Ft(1,0)},uFlash:{value:0},uHurt:{value:0},uAlpha:{value:1}},vertexShader:`
      attribute float shade;
      varying vec2 vUv;
      varying float vShade;
      varying float vDepth;
      void main() {
        vUv = uv;
        vShade = shade;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform sampler2D map;
      uniform vec2 uLight;
      uniform float uFlash, uHurt, uAlpha;
      varying vec2 vUv;
      varying float vShade;
      varying float vDepth;
      ${lo}
      void main() {
        vec4 tex = texture2D(map, vUv);
        if (tex.a < 0.5) discard;
        vec3 col = tex.rgb * lightOf(uLight.x, uLight.y) * clamp(vShade, 0.0, 1.0);
        col = mix(col, vec3(1.0, 0.25, 0.2) * max(0.35, uLight.x * uSky), clamp(uHurt, 0.0, 1.0) * 0.55);
        col = mix(col, vec3(1.0), clamp(uFlash, 0.0, 1.0) * 0.8);
        gl_FragColor = vec4(fogged(col, vDepth), clamp(uAlpha, 0.0, 1.0));
      }`,side:e,transparent:!1})}function mi(i,t,e){i.uniforms.uLight.value.set(Math.max(0,Math.min(15,t))/15,Math.max(0,Math.min(15,e))/15)}function Mn(i,{side:t=Sn,shade:e=.9}={}){return new Ne({uniforms:{uFogColor:Se.uFogColor,uFogNear:Se.uFogNear,uFogFar:Se.uFogFar,uSky:Se.uSky,uSkyColor:Se.uSkyColor,uBlockColor:Se.uBlockColor,uMinLight:Se.uMinLight,uColor:{value:new Ot(i)},uLight:{value:new Ft(1,0)},uShade:{value:e}},vertexShader:`
      varying float vDepth;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vDepth = -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform vec3 uColor;
      uniform vec2 uLight;
      uniform float uShade;
      varying float vDepth;
      ${lo}
      void main() {
        vec3 col = uColor * lightOf(uLight.x, uLight.y) * clamp(uShade, 0.0, 1.0);
        gl_FragColor = vec4(fogged(col, vDepth), 1.0);
      }`,side:t})}const Vd=[{n:[1,0,0],o:[1,0,1],u:[0,0,-1],v:[0,1,0],shade:.6,key:"side"},{n:[-1,0,0],o:[0,0,0],u:[0,0,1],v:[0,1,0],shade:.6,key:"side"},{n:[0,0,1],o:[0,0,1],u:[1,0,0],v:[0,1,0],shade:.8,key:"side"},{n:[0,0,-1],o:[1,0,0],u:[-1,0,0],v:[0,1,0],shade:.8,key:"side"},{n:[0,1,0],o:[0,1,1],u:[1,0,0],v:[0,0,-1],shade:1,key:"top"},{n:[0,-1,0],o:[0,0,0],u:[1,0,0],v:[0,0,1],shade:.5,key:"bottom"}],g1=[.42,.62,.8,1],ln=4e-4;class sc{constructor(){this.pos=[],this.uv=[],this.light=[],this.idx=[],this.n=0}quad(t,e,n,s=!1){for(let o=0;o<4;o++)this.pos.push(t[o][0],t[o][1],t[o][2]),this.uv.push(e[o][0],e[o][1]),this.light.push(n[o][0],n[o][1],n[o][2]);const r=this.n;s?this.idx.push(r,r+1,r+3,r+1,r+2,r+3):this.idx.push(r,r+1,r+2,r,r+2,r+3),this.n+=4}geometry(){const t=new ke;return t.setAttribute("position",new re(this.pos,3)),t.setAttribute("uv",new re(this.uv,2)),t.setAttribute("light",new re(this.light,3)),t.setIndex(this.n>65e3?new Yh(this.idx,1):new $h(this.idx,1)),t.computeBoundingSphere(),t}}class x1{constructor(t,e){this.world=t,this.atlas=e,this.group=new ne,this.group.name="world",this.mats={opaque:Gd(e.texture,"opaque"),cutout:Gd(e.texture,"cutout"),water:p1(e.water)},this.chunks=[];const n=at/bn;for(let s=0;s<zt/bn;s++)for(let r=0;r<n;r++){const o={cx:r,cz:s,meshes:{}};for(const a of["opaque","cutout","water"]){const l=new le(new ke,this.mats[a]);l.name=`chunk_${r}_${s}_${a}`,l.matrixAutoUpdate=!1,l.frustumCulled=!0,a==="water"&&(l.renderOrder=2),a==="cutout"&&(l.renderOrder=1),this.group.add(l),o.meshes[a]=l}this.chunks.push(o)}this.uvCache=new Map}tileUV(t){let e=this.uvCache.get(t);return e||(e=this.atlas.uv(t),this.uvCache.set(t,e)),e}update(t=16){const e=this.world;e.lightDirty&&e.recomputeLight();let n=0;for(const s of[...e.dirty]){if(n++>=t)break;e.dirty.delete(s),this.build(this.chunks[s])}}build(t){const e=this.world,n={opaque:new sc,cutout:new sc,water:new sc},s=t.cx*bn,r=t.cz*bn,o=e.data;for(let a=0;a<$n;a++)for(let l=r;l<r+bn;l++)for(let c=s;c<s+bn;c++){const h=o[c+at*(l+zt*a)];if(!h)continue;const d=ct[h];switch(d.shape){case"cube":case"low":case"half":this.cube(d.cutout?n.cutout:n.opaque,c,a,l,h,d);break;case"stairs":this.stairs(n.opaque,c,a,l,d);break;case"cross":this.cross(n.cutout,c,a,l,d);break;case"crop":this.crop(n.cutout,c,a,l,d);break;case"lantern":this.lantern(n.cutout,c,a,l,d);break;case"water":this.water(n.water,c,a,l);break}}for(const a of["opaque","cutout","water"]){const l=t.meshes[a];l.geometry.dispose(),l.geometry=n[a].n?n[a].geometry():new ke,l.visible=n[a].n>0}}occ(t,e,n){const s=ct[this.world.get(t,e,n)];return s.full||s.cutout&&!s.glass?1:0}lightCell(t,e,n){const s=this.world;if(e>=$n)return[15,0,!0];if(e<0)return[0,0,!1];if(t<0||n<0||t>=at||n>=zt)return[15,0,!0];const r=t+at*(n+zt*e);return ct[s.data[r]].opaque?[0,0,!1]:[s.sky[r],s.blk[r],!0]}vertexLight(t,e,n,s,r,o,a,l,c){const h=this.occ(t+s[0]*o,e+s[1]*o,n+s[2]*o),d=this.occ(t+r[0]*a,e+r[1]*a,n+r[2]*a),u=this.occ(t+s[0]*o+r[0]*a,e+s[1]*o+r[1]*a,n+s[2]*o+r[2]*a),f=h&&d?0:3-(h+d+u);let g=0,x=0,m=0;const p=(y,T,_)=>{const E=this.lightCell(y,T,_);E[2]&&(g+=E[0],x+=E[1],m++)};return p(t,e,n),h||p(t+s[0]*o,e+s[1]*o,n+s[2]*o),d||p(t+r[0]*a,e+r[1]*a,n+r[2]*a),!(h&&d)&&!u&&p(t+s[0]*o+r[0]*a,e+s[1]*o+r[1]*a,n+s[2]*o+r[2]*a),m||(g=c[0],x=c[1],m=1),{L:[l*g1[f],g/m/15,x/m/15],ao:f}}cube(t,e,n,s,r,o){const a=this.world,l=o.h,c=this.lightCell(e,n,s);for(const h of Vd){const d=e+h.n[0],u=n+h.n[1],f=s+h.n[2],g=a.get(d,u,f),x=ct[g];if(!(h.n[1]===1&&l<1)&&(x.full||g===r&&(o.cutout||o.glass)&&o.glass||h.n[1]===1&&(x.shape==="low"||x.shape==="half")))continue;const p=typeof o.tex=="string"?o.tex:o.tex[h.key],[y,T,_,E]=this.tileUV(p),w=h.n[1]===0?l:1,P=[];for(let D=0;D<4;D++){const q=D===1||D===2?1:0,O=D>=2?1:0;let z=h.o[0]+h.u[0]*q+h.v[0]*O,$=h.o[1]+h.u[1]*q+h.v[1]*O*w,tt=h.o[2]+h.u[2]*q+h.v[2]*O;h.n[1]===1&&($=l),P.push([e+z,n+$,s+tt])}const v=h.n[1]===0?T+(E-T)*w:E,R=[[y+ln,T+ln],[_-ln,T+ln],[_-ln,v-ln],[y+ln,v-ln]],N=d,F=u,B=f,S=[[-1,-1],[1,-1],[1,1],[-1,1]],M=[],C=[];for(let D=0;D<4;D++){const q=this.vertexLight(N,F,B,h.u,h.v,S[D][0],S[D][1],h.shade,c);M.push(q.L),C.push(q.ao)}const I=C[0]+C[2]<C[1]+C[3];t.quad(P,R,M,I)}}plantLight(t,e,n){const s=this.lightCell(t,e,n);return s[2]?[s[0]/15,s[1]/15]:[1,0]}cross(t,e,n,s,r){const[o,a,l,c]=this.tileUV(r.tex),d=ct[this.world.get(e,n-1,s)].shape==="low"?n-1/16:n,[u,f]=this.plantLight(e,n,s),g=[[.9,u,f],[.9,u,f],[.9,u,f],[.9,u,f]],x=.45,m=[[o,a],[l,a],[l,c],[o,c]],p=(y,T,_,E)=>t.quad([[e+y,d,s+T],[e+_,d,s+E],[e+_,d+1,s+E],[e+y,d+1,s+T]],m,g);p(.5-x,.5-x,.5+x,.5+x),p(.5-x,.5+x,.5+x,.5-x)}crop(t,e,n,s,r){const[o,a,l,c]=this.tileUV(r.tex),h=n-1/16,[d,u]=this.plantLight(e,n,s),f=[[.92,d,u],[.92,d,u],[.92,d,u],[.92,d,u]],g=[[o,a],[l,a],[l,c],[o,c]];for(const x of[4/16,12/16])t.quad([[e+x,h,s],[e+x,h,s+1],[e+x,h+1,s+1],[e+x,h+1,s]],g,f),t.quad([[e,h,s+x],[e+1,h,s+x],[e+1,h+1,s+x],[e,h+1,s+x]],g,f)}stairs(t,e,n,s,r){const[o,a,l,c]=this.tileUV(typeof r.tex=="string"?r.tex:"planks"),h=this.lightCell(e,n,s),d=g=>{const x=h[2]?h[0]/15:1,m=h[2]?h[1]/15:0;return[[g,x,m],[g,x,m],[g,x,m],[g,x,m]]},u=[[o+ln,a+ln],[l-ln,a+ln],[l-ln,c-ln],[o+ln,c-ln]],f=(g,x,m,p,y,T)=>{t.quad([[g,x,T],[p,x,T],[p,y,T],[g,y,T]],u,d(.85)),t.quad([[p,x,m],[g,x,m],[g,y,m],[p,y,m]],u,d(.7)),t.quad([[p,x,T],[p,x,m],[p,y,m],[p,y,T]],u,d(.6)),t.quad([[g,x,m],[g,x,T],[g,y,T],[g,y,m]],u,d(.6)),t.quad([[g,y,T],[p,y,T],[p,y,m],[g,y,m]],u,d(1)),t.quad([[g,x,m],[p,x,m],[p,x,T],[g,x,T]],u,d(.5))};f(e,n,s,e+1,n+.5,s+1),r.stair==="+x"?f(e+.5,n+.5,s,e+1,n+1,s+1):f(e,n+.5,s+.5,e+1,n+1,s+1)}lantern(t,e,n,s){const[r,o,a,l]=this.tileUV("lantern"),c=a-r,h=l-o,d=5/16,u=11/16,f=8/16,g=P=>[[P,1,1],[P,1,1],[P,1,1],[P,1,1]],x=[[r+c*d,o],[r+c*u,o],[r+c*u,o+h*f],[r+c*d,o+h*f]],m=[[r+c*d,l-h*6/16],[r+c*u,l-h*6/16],[r+c*u,l],[r+c*d,l]],p=e+d,y=e+u,T=s+d,_=s+u,E=n,w=n+f;t.quad([[p,E,_],[y,E,_],[y,w,_],[p,w,_]],x,g(.95)),t.quad([[y,E,T],[p,E,T],[p,w,T],[y,w,T]],x,g(.95)),t.quad([[y,E,_],[y,E,T],[y,w,T],[y,w,_]],x,g(.9)),t.quad([[p,E,T],[p,E,_],[p,w,_],[p,w,T]],x,g(.9)),t.quad([[p,w,_],[y,w,_],[y,w,T],[p,w,T]],m,g(1))}water(t,e,n,s){const r=this.world,o=r.get(e,n+1,s),a=o===k.WATER?1:14/16,l=this.lightCell(e,n,s),c=(h,d,u,f)=>{const g=this.lightCell(h,d,u),x=g[2]?g:l;return[f,x[0]/15,x[1]/15]};if(o!==k.WATER&&!ct[o].full){const h=c(e,n+1,s,1);t.quad([[e,n+a,s+1],[e+1,n+a,s+1],[e+1,n+a,s],[e,n+a,s]],[[e,s+1],[e+1,s+1],[e+1,s],[e,s]],[h,h,h,h])}for(const h of Vd){if(h.n[1]!==0)continue;const d=r.get(e+h.n[0],n,s+h.n[2]);if(d===k.WATER||ct[d].full)continue;const u=c(e+h.n[0],n,s+h.n[2],h.shade),f=[];for(let x=0;x<4;x++){const m=x===1||x===2?1:0,p=x>=2?1:0;f.push([e+h.o[0]+h.u[0]*m,n+p*a,s+h.o[2]+h.u[2]*m])}const g=x=>h.n[0]!==0?x[2]:x[0];t.quad(f,f.map(x=>[g(x),x[1]]),[u,u,u,u])}}}const qr={potato:2,wheat:3,carrot:2,corn:4},v1=4,ys={turret:100},Mh=50,rc=5,gs=16,Wd=34,Sh=2,Js=4,y1=12;function _1(i=0){return Math.min(2,Math.max(0,i|0))}function b1({stars:i=0,lifetimeCoins:t=0}={}){let e=0;return t>=y1&&(e+=1),(i|0)>=1&&(e+=1),Math.min(Sh,e)}function M1(i,t){return(qr[i]||1)*Math.max(0,t|0)}const He=i=>new Ot(i),ia=[{t:0,top:He(3824282),hor:He(16034170),sky:.55,tint:He(16765616)},{t:.06,top:He(6132704),hor:He(12574975),sky:1,tint:He(16777215)},{t:.44,top:He(6132704),hor:He(12574975),sky:1,tint:He(16777215)},{t:.5,top:He(4874138),hor:He(16095850),sky:.7,tint:He(16762010)},{t:.56,top:He(725032),hor:He(2238544),sky:.2,tint:He(9412832)},{t:.94,top:He(725032),hor:He(2238544),sky:.2,tint:He(9412832)},{t:1,top:He(3824282),hor:He(16034170),sky:.55,tint:He(16765616)}];function qd(i){i=(i%1+1)%1;let t=0;for(;t<ia.length-2&&ia[t+1].t<i;)t++;const e=ia[t],n=ia[t+1],s=oo((i-e.t)/Math.max(1e-6,n.t-e.t));return{top:e.top.clone().lerp(n.top,s),hor:e.hor.clone().lerp(n.hor,s),sky:As(e.sky,n.sky,s),tint:e.tint.clone().lerp(n.tint,s)}}function oc(i,t=32){const e=document.createElement("canvas");e.width=e.height=t,i(e.getContext("2d"),t);const n=new is(e);return n.colorSpace=Ve,n.magFilter=he,n.minFilter=he,n.generateMipmaps=!1,n}class S1{constructor(t,e){this.group=new ne,this.group.name="sky",t.add(this.group),this.uniforms={uTop:{value:new Ot},uHor:{value:new Ot},uSun:{value:new U(0,1,0)},uGlow:{value:new Ot(16756848)},uGlowAmt:{value:0}};const n=new le(new Ja(300,24,16),new Ne({uniforms:this.uniforms,vertexShader:"varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform vec3 uTop, uHor, uSun, uGlow; uniform float uGlowAmt; varying vec3 vDir;
        void main() {
          vec3 d = normalize(vDir + vec3(0.0, 1e-4, 0.0));
          float h = clamp(d.y, -1.0, 1.0);
          vec3 col = mix(uHor, uTop, smoothstep(-0.05, 0.55, h));
          col = mix(col, uHor * 0.55, smoothstep(0.0, -0.4, h));
          float g = max(dot(d, normalize(uSun + vec3(0.0, 1e-4, 0.0))), 0.0);
          col += uGlow * pow(g, 6.0) * uGlowAmt * (1.0 - smoothstep(0.1, 0.6, abs(h)));
          gl_FragColor = vec4(col, 1.0);
        }`,side:xn,depthWrite:!1,depthTest:!1}));n.name="skyDome",n.renderOrder=-10,n.frustumCulled=!1,this.group.add(n),this.dome=n;const s=oc((m,p)=>{m.fillStyle="rgba(255,240,170,0.35)",m.fillRect(0,0,p,p),m.fillStyle="#fff7c8",m.fillRect(6,6,p-12,p-12),m.fillStyle="#ffffff",m.fillRect(9,9,p-18,p-18)}),r=oc((m,p)=>{m.fillStyle="rgba(200,210,255,0.2)",m.fillRect(0,0,p,p),m.fillStyle="#e8ecf8",m.fillRect(8,8,p-16,p-16),m.fillStyle="#b8c0d8",m.fillRect(11,12,4,4),m.fillRect(17,17,5,4),m.fillRect(14,20,3,2)}),o=(m,p)=>{const y=new le(new Ii(p,p),new Fi({map:m,transparent:!0,depthWrite:!1,depthTest:!0,fog:!1,toneMapped:!1}));return y.renderOrder=-9,y.frustumCulled=!1,this.group.add(y),y};this.sun=o(s,20),this.sun.name="sun",this.moon=o(r,15),this.moon.name="moon";const a=es(7),l=[];for(let m=0;m<500;m++){const p=a()*2-1,y=a()*Math.PI*2,T=Math.sqrt(1-p*p),_=Math.abs(p)*.95+.05;l.push(Math.cos(y)*T*250,_*250,Math.sin(y)*T*250)}const c=new ke;c.setAttribute("position",new re(l,3)),this.stars=new ep(c,new tp({color:16777215,size:1.6,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,depthTest:!0,fog:!1})),this.stars.name="stars",this.stars.renderOrder=-9,this.stars.frustumCulled=!1,this.group.add(this.stars);const h=oc((m,p)=>{const y=es(11);m.clearRect(0,0,p,p),m.fillStyle="#ffffff";for(let T=0;T<22;T++){const _=Math.floor(y()*p),E=Math.floor(y()*p),w=2+Math.floor(y()*7),P=1+Math.floor(y()*4);for(const[v,R]of[[0,0],[-p,0],[0,-p],[-p,-p]])m.fillRect(_+v,E+R,w,P)}},64);h.wrapS=h.wrapT=Zr,this.cloudU={map:{value:h},uOff:{value:new Ft},uTint:{value:new Ot(1,1,1)},uCam:{value:new U}};const d=new le(new Ii(640,640),new Ne({uniforms:this.cloudU,vertexShader:"varying vec2 vUv; varying vec3 vW; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vUv = w.xz / 768.0; gl_Position = projectionMatrix * viewMatrix * w; }",fragmentShader:`
        uniform sampler2D map; uniform vec2 uOff; uniform vec3 uTint, uCam; varying vec2 vUv; varying vec3 vW;
        void main() {
          vec4 t = texture2D(map, vUv + uOff);
          if (t.a < 0.5) discard;
          float d = length(vW.xz - uCam.xz);
          float a = 0.92 * (1.0 - smoothstep(140.0, 340.0, d));
          gl_FragColor = vec4(uTint * t.rgb, a);
        }`,transparent:!0,depthWrite:!1,side:Sn}));d.rotation.x=-Math.PI/2,d.position.y=52,d.name="clouds",d.renderOrder=3,d.frustumCulled=!1,this.clouds=d,t.add(d);const u=new ne;u.name="ocean";const f=m1(e.water),g=Xn-1+14/16-.01,x=600;for(const[m,p,y,T]of[[-x,-x,at+x,0],[-x,zt,at+x,zt+x],[-x,0,0,zt],[at,0,at+x,zt]]){const _=new Ii(y-m,T-p);_.rotateX(-Math.PI/2),_.translate((m+y)/2,g,(p+T)/2),u.add(new le(_,f))}t.add(u),this.ocean=u,this.state=qd(.2)}update(t,e,n,s){const r=this.state=qd(t);this.uniforms.uTop.value.copy(r.top),this.uniforms.uHor.value.copy(r.hor),this.group.position.copy(e.position),this.group.updateMatrixWorld(!0);const o=t*Math.PI*2,a=new U(Math.cos(o),Math.sin(o),.25).normalize();this.uniforms.uSun.value.copy(a),this.uniforms.uGlowAmt.value=1-Qi(.06,.16,Math.min(Math.abs(t-.5),Math.abs(t),Math.abs(t-1))),this.sun.position.copy(a).multiplyScalar(180),this.moon.position.copy(a).multiplyScalar(-180),this.group.updateMatrixWorld(!0),this.sun.lookAt(e.position),this.moon.lookAt(e.position),this.sun.visible=a.y>-.15,this.moon.visible=a.y<.15;const l=Qi(.52,.6,t)*(1-Qi(.93,.99,t));this.stars.material.opacity=l*.9,this.stars.rotation.y=s*.004,Se.uSky.value=r.sky,Se.uSkyColor.value.copy(r.tint),Se.uFogColor.value.copy(r.hor).lerp(r.top,.15),this.cloudU.uOff.value.x=s*.0025,this.cloudU.uCam.value.copy(e.position),this.cloudU.uTint.value.setRGB(1,1,1).multiplyScalar(As(.25,1,r.sky)).lerp(r.hor,.15),this.clouds.position.x=e.position.x,this.clouds.position.z=e.position.z}}const Ye=1e-4,Xd=.14;function $d(i,t,e,n){return Math.min(t,n)-Math.max(i,e)}function ac(i,t,e,n,s,r,o,a,l,c,h,d){return i<c-Ye&&n>o+Ye&&t<h-Ye&&s>a+Ye&&e<d-Ye&&r>l+Ye}function w1(i,t,e,n,s,r,o,a,l,c,h){if(i.stair==="+z"||i.stair==="+x"){ac(s,r,o,a,l,c,t,e,n,t+1,e+.5,n+1)&&h(t,e,n,e+.5,t,t+1,n,n+1,e);let u=t,f=t+1,g=n,x=n+1;i.stair==="+z"?(g=n+.5,x=n+1):(u=t+.5,f=t+1),ac(s,r,o,a,l,c,u,e+.5,g,f,e+1,x)&&h(t,e,n,e+1,u,f,g,x,e+.5);return}const d=e+i.h;ac(s,r,o,a,l,c,t,e,n,t+1,d,n+1)&&h(t,e,n,d,t,t+1,n,n+1,e)}function Dp(i,t,e,n,s,r,o,a){const l=Math.floor(t),c=Math.floor(s-Ye),h=Math.floor(e)-1,d=Math.floor(r-Ye),u=Math.floor(n),f=Math.floor(o-Ye);for(let g=h;g<=d;g++)for(let x=u;x<=f;x++)for(let m=l;m<=c;m++){const p=ct[i.get(m,g,x)];p?.solid&&w1(p,m,g,x,t,e,n,s,r,o,(y,T,_,E,w,P,v,R,N)=>{e+Ye>=E||$d(t,s,w,P)<Xd||$d(n,o,v,R)<Xd||a(y,T,_,E,w,P,v,R,N)})}}function Yd(i,t,e,n,s,r,o){let a=1/0;return Dp(i,t-s,e,n-s,t+s,e+r,n+s,(l,c,h,d)=>{d>e+Ye&&d<=e+o+Ye&&(a=Math.min(a,d))}),a===1/0?null:a}function qn(i,t,e,n){if(n===0)return!1;const s=t.pos;s[e]+=n;let r=!1,o=n>0?1/0:-1/0;return Dp(i,s.x-t.hw,s.y,s.z-t.hw,s.x+t.hw,s.y+t.h,s.z+t.hw,(a,l,c,h,d,u,f,g,x)=>{r=!0,e==="y"?n<0?o=Math.max(o,h):o=Math.min(o,x):e==="x"?o=n>0?Math.min(o,d):Math.max(o,u):o=n>0?Math.min(o,f):Math.max(o,g)}),r&&(e==="y"?s.y=n<0?o+Ye:o-t.h-Ye:s[e]=n>0?o-t.hw-Ye:o+t.hw+Ye),r}function Kd(i){const t=i.pos,e=i.vel,n=i.hw+.2;t.x<n&&(t.x=n,e.x=Math.max(0,e.x)),t.x>at-n&&(t.x=at-n,e.x=Math.min(0,e.x)),t.z<n&&(t.z=n,e.z=Math.max(0,e.z)),t.z>zt-n&&(t.z=zt-n,e.z=Math.min(0,e.z)),t.y<-4&&(t.y=12,e.y=0)}function as(i,t,e){const n=t.pos,s=t.vel,r=t.onGround,o=qn(i,t,"y",s.y*e);t.onGround=o&&s.y<=0,o&&(s.y=0);const a=n.x,l=n.y,c=n.z,h=s.x*e,d=s.z*e;let u=!1,f=!1,g=0;const x=t.onGround||r;if(x&&t.step>0&&(h!==0||d!==0)){const m=Yd(i,a+h,l,c+d,t.hw,t.h,t.step);if(m!=null){const p=m-l;if(p>Ye&&p<=t.step+Ye){if(n.set(a,l,c),!qn(i,t,"y",p+.002)){u=qn(i,t,"x",h),f=qn(i,t,"z",d),qn(i,t,"y",-p-.12);const y=Math.hypot(n.x-a,n.z-c)>Math.hypot(h,d)*.2,T=n.y>=m-.15;if(y&&T)return g=Math.max(0,n.y-l),t.onGround=!0,s.y=0,u&&(s.x=0),f&&(s.z=0),Kd(t),t.inWater=i.get(Math.floor(n.x),Math.floor(n.y+.3),Math.floor(n.z))===k.WATER,t.headInWater=i.get(Math.floor(n.x),Math.floor(n.y+t.h*.85),Math.floor(n.z))===k.WATER,{hitX:u,hitZ:f,stepped:g}}n.set(a,l,c)}}}if(u=qn(i,t,"x",h),f=qn(i,t,"z",d),(u||f)&&x&&t.step>0){const m=Yd(i,a+h,l,c+d,t.hw,t.h,t.step);if(m!=null){const p=m-l;if(p>Ye&&p<=t.step+Ye){const y=n.x,T=n.y,_=n.z;if(n.set(a,l,c),qn(i,t,"y",p+.002))n.set(y,T,_);else{const E=qn(i,t,"x",h),w=qn(i,t,"z",d);qn(i,t,"y",-p-.12);const P=Math.hypot(n.x-a,n.z-c),v=Math.hypot(y-a,_-c);P>v+1e-4&&n.y>=m-.15?(g=Math.max(0,n.y-l),u=E,f=w,t.onGround=!0,s.y=0):n.set(y,T,_)}}}}return u&&(s.x=0),f&&(s.z=0),Kd(t),t.inWater=i.get(Math.floor(n.x),Math.floor(n.y+.3),Math.floor(n.z))===k.WATER,t.headInWater=i.get(Math.floor(n.x),Math.floor(n.y+t.h*.85),Math.floor(n.z))===k.WATER,{hitX:u,hitZ:f,stepped:g}}function ls(i,t,e=28){i.inWater?(i.vel.y=Math.max(i.vel.y-e*.18*t,-2.2),i.vel.y*=Math.exp(-2*t)):i.vel.y=Math.max(i.vel.y-e*t,-40)}const Ge=1/16;class Qn{constructor(t,e,n=1){this.canvas=document.createElement("canvas"),this.canvas.width=t,this.canvas.height=e,this.g=this.canvas.getContext("2d"),this.r=es(n),this.W=t,this.H=e}rect(t,e,n,s,r){this.g.fillStyle=r,this.g.fillRect(t,e,n,s)}px(t,e,n){this.g.fillStyle=n,this.g.fillRect(t,e,1,1)}noise(t,e,n,s,r){for(let o=0;o<s;o++)for(let a=0;a<n;a++)this.px(t+a,e+o,r[Math.floor(this.r()*r.length)])}static layout(t,e,n,s,r){return{top:[t+r,e,n,r],bottom:[t+r+n,e,n,r],left:[t,e+r,r,s],front:[t+r,e+r,n,s],right:[t+r+n,e+r,r,s],back:[t+2*r+n,e+r,n,s]}}boxNoise(t,e,n,s,r,o){const a=Qn.layout(t,e,n,s,r);for(const l of Object.keys(a))this.noise(...a[l],o);return a}texture(){const t=new is(this.canvas);return t.colorSpace=Ve,t.magFilter=he,t.minFilter=he,t.generateMipmaps=!1,t}}function E1(i,t,e,n,s,r,o,a=-i/2,l=0,c=-e/2,h=0){const d=(a-h)*Ge,u=(a+i+h)*Ge,f=(l-h)*Ge,g=(l+t+h)*Ge,x=(c-h)*Ge,m=(c+e+h)*Ge,p=Qn.layout(n,s,i,t,e),y=[],T=[],_=[],E=[],w=(v,R,N,F=!1)=>{const[B,S,M,C]=R,I=B/r,D=(B+M)/r,q=1-S/o,O=1-(S+C)/o,z=F?[[D,O],[I,O],[I,q],[D,q]]:[[I,O],[D,O],[D,q],[I,q]],$=y.length/3;for(let tt=0;tt<4;tt++)y.push(...v[tt]),T.push(...z[tt]),_.push(N);E.push($,$+1,$+2,$,$+2,$+3)};w([[d,f,m],[u,f,m],[u,g,m],[d,g,m]],p.front,.85),w([[u,f,x],[d,f,x],[d,g,x],[u,g,x]],p.back,.7),w([[u,f,m],[u,f,x],[u,g,x],[u,g,m]],p.right,.62),w([[d,f,x],[d,f,m],[d,g,m],[d,g,x]],p.left,.62),w([[d,g,m],[u,g,m],[u,g,x],[d,g,x]],p.top,1),w([[d,f,x],[u,f,x],[u,f,m],[d,f,m]],p.bottom,.5);const P=new ke;return P.setAttribute("position",new re(y,3)),P.setAttribute("uv",new re(T,2)),P.setAttribute("shade",new re(_,1)),P.setIndex(E),P.computeBoundingSphere(),P}function ge(i,t,e,n,{size:s,uv:r,at:o=[0,0,0],off:a,inflate:l=0}){const[c,h,d]=s,u=new ne;u.name=i,u.position.set(o[0]*Ge,o[1]*Ge,o[2]*Ge);const f=a||[-c/2,0,-d/2],g=new le(E1(c,h,d,r[0],r[1],n.W,n.H,f[0],f[1],f[2],l),e);return g.name=i+"Box",u.add(g),t.add(u),u}const T1=["normal","happy","scared","sad","sleep","surprise","work","blink"];function Ip(i,t,e=0){i.fillStyle="#152038",i.fillRect(0,0,16,12),i.fillStyle="#1d2c4c",i.fillRect(1,1,14,10);const n=t==="scared"?"#8ff4ff":t==="sad"?"#7fb4ff":"#6ff0ff";i.fillStyle=n;const s=(a,l)=>l.forEach((c,h)=>[...c].forEach((d,u)=>{d==="#"&&i.fillRect(a+u,3+h,1,1)})),r={normal:[".##.","####","####",".##."],blink:["....","....","####","...."],happy:[".##.","#..#","....","...."],work:["....","####","####","...."],scared:["#..#",".##.",".##.","#..#"],sad:["....","##..",".###","...."],sleep:["....","....","####","...."],surprise:["####","#..#","#..#","####"]}[t]||[".##.","####","####",".##."],o=t==="sad"?["....","..##","###.","...."]:r;s(2,r),s(10,o),t==="happy"||t==="work"?(i.fillRect(6,8,4,1),i.fillRect(5,7,1,1),i.fillRect(10,7,1,1)):t==="scared"?(i.fillRect(5,9,6,1),i.fillRect(6,8,1,1),i.fillRect(8,8,1,1),i.fillRect(10,8,1,1)):t==="sad"?(i.fillRect(6,9,4,1),i.fillRect(5,10,1,1),i.fillRect(10,10,1,1)):t==="surprise"?i.fillRect(7,8,2,2):i.fillRect(7,9,2,1),t==="happy"&&(i.fillStyle="#ff8fb0",i.fillRect(1,8,2,1),i.fillRect(13,8,2,1)),t==="scared"&&(i.fillStyle="#9fd8ff",i.fillRect(14,2+Math.floor(e*8)%3,1,2))}function xs(i,t,e,n){const s=String(i).replace("#",""),r=s.length===3?s.split("").map(h=>h+h).join(""):s,o=parseInt(r,16),a=Math.min(255,Math.round((o>>16&255)*t)),l=Math.min(255,Math.round((o>>8&255)*e)),c=Math.min(255,Math.round((o&255)*n));return"#"+(1<<24|a<<16|l<<8|c).toString(16).slice(1)}const Zd=[4045055,16739146,5955450,16761933,13134847,16744118];function A1(i){const t=String(i||"");let e=2166136261;for(let n=0;n<t.length;n++)e=Math.imul(e^t.charCodeAt(n),16777619);return Zd[(e>>>0)%Zd.length]}function Np({tint:i=16777215,seed:t=101}={}){const e=new Qn(64,64,t),n=new Ot(i),s=n.r,r=n.g,o=n.b,a=s>.97&&r>.97&&o>.97,l=a?["#eeeae0","#e6e2d8","#f2efe6","#e9e5db"]:["#eeeae0","#e6e2d8","#f2efe6","#e9e5db"].map(G=>xs(G,s,r,o)),c=a?["#b9bcc4","#aeb1b9","#c2c5cc"]:["#b9bcc4","#aeb1b9","#c2c5cc"].map(G=>xs(G,Math.min(1,s+.08),Math.min(1,r+.08),Math.min(1,o+.08))),h=a?"#d8d4ca":xs("#d8d4ca",s,r,o),d=a?"#c8c4ba":xs("#c8c4ba",s*.9,r*.9,o*.9),u=e.boxNoise(0,0,10,8,8,l);e.rect(...u.front,h),e.rect(u.front[0],u.front[1]+7,10,1,d);for(const G of["left","right"])e.rect(u[G][0]+3,u[G][1]+3,2,2,"#ff9a4d"),e.px(u[G][0]+3,u[G][1]+3,"#ffc08a");e.rect(u.back[0]+2,u.back[1]+2,6,1,d),e.rect(u.back[0]+2,u.back[1]+4,6,1,d),e.boxNoise(40,0,1,4,1,c),e.boxNoise(44,0,2,2,2,[a?"#ffffff":xs("#ffffff",s,r,o)]);const f=e.boxNoise(0,16,8,7,5,l);e.rect(f.front[0]+2,f.front[1]+2,4,3,"#2a3550"),e.px(f.front[0]+3,f.front[1]+3,"#ffcf6a"),e.px(f.front[0]+4,f.front[1]+3,"#d6ad62"),e.rect(f.front[0],f.front[1]+6,8,1,d);const g=e.boxNoise(28,16,2,6,2,l);for(const G of["front","back","left","right"])e.rect(g[G][0],g[G][1]+5,g[G][2],1,a?"#9aa0aa":xs("#9aa0aa",s,r,o));e.boxNoise(40,16,3,3,3,a?["#8a8f9a","#7e838e","#959aa4"]:["#8a8f9a","#7e838e","#959aa4"].map(G=>xs(G,s*.85,r*.85,o*.85)));const x=["#d8b880","#cdae74","#e0c28c","#c4a46a"],m=e.boxNoise(0,32,9,9,5,x);e.rect(m.top[0],m.top[1],9,5,"#7a5a34");for(const[G,j]of[[0,1],[3,0],[5,2],[7,1],[2,3],[6,3]])e.rect(m.top[0]+G,m.top[1]+j,2,2,"#e8bd6a"),e.px(m.top[0]+G,m.top[1]+j,"#f4d68e");for(const G of["back","left","right","front"])e.rect(m[G][0],m[G][1]+1,m[G][2],1,"#8a5a2a");for(let G=1;G<9;G+=2)e.px(m.back[0]+G,m.back[1]+5,"#a8865a"),e.px(m.back[0]+4,m.back[1]+3+G%4,"#a8865a");e.rect(m.back[0]+5,m.back[1]+5,3,3,"#a8c0d8"),e.px(m.back[0]+5,m.back[1]+5,"#c8d8e8");const p=["#e8c66a","#dcb85a","#f0d27a","#d4ae52"],y=e.boxNoise(28,32,7,3,7,p);for(const G of["front","back","left","right"])e.rect(y[G][0],y[G][1]+2,y[G][2],1,"#d9534f");e.boxNoise(0,48,14,1,14,p);const T=e.texture(),_=Bn(T),E=new ne;E.name="astra";const w=new ne;w.name="bodyRoot",E.add(w);const P=ge("legL",w,_,e,{size:[3,3,3],uv:[40,16],at:[-2,3,0],off:[-1.5,-3,-1.5]}),v=ge("legR",w,_,e,{size:[3,3,3],uv:[40,16],at:[2,3,0],off:[-1.5,-3,-1.5]}),R=ge("torso",w,_,e,{size:[8,7,5],uv:[0,16],at:[0,3,0]}),N=ge("armL",R,_,e,{size:[2,6,2],uv:[28,16],at:[-5,6.5,0],off:[-1,-6,-1]}),F=ge("armR",R,_,e,{size:[2,6,2],uv:[28,16],at:[5,6.5,0],off:[-1,-6,-1]}),B=ge("sack",R,_,e,{size:[9,9,5],uv:[0,32],at:[0,1,-2.5],off:[-4.5,0,-5]}),S=ge("head",R,_,e,{size:[10,8,8],uv:[0,0],at:[0,7,0]}),M=ge("antenna",S,_,e,{size:[1,4,1],uv:[40,0],at:[1.5,8,-1]}),C=new Fi({color:a?7336191:i,toneMapped:!1}),I=new le(new hn(2.2*Ge,2.2*Ge,2.2*Ge),C);I.name="antennaBall",I.position.y=5*Ge,M.add(I);const D=new ne;D.name="hat",D.position.set(0,8*Ge,0),D.rotation.z=-.08,S.add(D),ge("hatTop",D,_,e,{size:[7,3,7],uv:[28,32],at:[0,.5,0]}),ge("hatBrim",D,_,e,{size:[14,1,14],uv:[0,48],at:[0,0,0]});const q=document.createElement("canvas");q.width=16,q.height=12;const O=q.getContext("2d"),z=new is(q);z.colorSpace=Ve,z.magFilter=he,z.minFilter=he,z.generateMipmaps=!1;const $=new Fi({map:z,toneMapped:!1}),tt=new le(new Ii(8*Ge,6*Ge),$);tt.name="screen",tt.position.set(0,4*Ge,4*Ge+.002),S.add(tt);let lt="",It=0;const ft=(G,j=0)=>{G===lt&&G!=="scared"||G==="scared"&&Math.floor(j*8)===Math.floor(It*8)&&lt===G||(lt=G,It=j,Ip(O,G,j),z.needsUpdate=!0)};return ft("normal"),{root:E,parts:{body:w,torso:R,head:S,armL:N,armR:F,legL:P,legR:v,sack:B,antenna:M,hat:D,ball:I,screen:tt},mat:_,faceMat:$,ballMat:C,setFace:ft,FACES:T1,get face(){return lt},setLight(G,j){_.uniforms.uLight.value.set(G/15,j/15);const ht=Math.max(.35,Math.max(G/15,j/15));$.color.setScalar(Math.min(1,ht+.4))},setAntenna(G){C.color.setHex(G)},setSack(G){const j=.75+Math.min(1,G/150)*.6;B.scale.set(j,j,j)}}}function R1({big:i=!1}={}){const t=new Qn(64,32,i?303:202),e=["#6cbc4c","#5cae40","#78c858","#52a03a","#66b448","#88d466"],n=t.boxNoise(0,0,10,9,8,e),[s,r]=n.front;for(const f of[2,6])t.rect(s+f,r+2,2,3,"#10180c"),t.px(s+f,r+2,"#f4fff0");for(const[f,g]of[[3,7],[4,6],[5,7],[6,6]])t.px(s+f,r+g,"#10180c");t.rect(s+1,r+5,1,1,"#a8f088"),t.rect(s+8,r+5,1,1,"#a8f088");for(const[f,g]of[[2,2],[6,3],[4,6]])t.rect(n.back[0]+f,n.back[1]+g,2,2,"#46902e");t.boxNoise(40,0,4,4,4,["#4e9a34","#448a2c","#56a83a"]);const o=t.texture(),a=Bn(o),l=new ne;l.name=i?"bigGreen":"green";const c=new ne;c.name="scale",l.add(c);const h=ge("body",c,a,t,{size:[10,9,8],uv:[0,0],at:[0,4,0]}),d=[];for(const[f,g,x]of[[0,-3,2],[1,3,2],[2,-3,-2],[3,3,-2]])d.push(ge("leg"+f,c,a,t,{size:[4,4,4],uv:[40,0],at:[g,4,x],off:[-2,-4,-2]}));const u=i?2.4:1.5;return c.scale.setScalar(u),{root:l,scale:c,body:h,legs:d,mat:a,baseScale:u,height:13*Ge*u,width:10*Ge*u}}function C1(){const i=new Qn(64,32,808),t=["#f0a040","#e89030","#f8b050","#d87828"],e=i.boxNoise(0,0,12,10,10,t),[n,s]=e.front;i.rect(n+2,s+2,2,2,"#201008"),i.rect(n+8,s+2,2,2,"#201008"),i.px(n+2,s+2,"#fff8c0"),i.px(n+8,s+2,"#fff8c0"),i.rect(n+2,s+5,8,4,"#301810");for(let u=0;u<4;u++)i.px(n+3+u*2,s+5,"#fff0e0");i.boxNoise(40,0,4,4,4,["#d87828","#c86820"]);const r=i.texture(),o=Bn(r),a=new ne;a.name="chomper";const l=new ne;l.name="scale",a.add(l);const c=ge("body",l,o,i,{size:[12,10,10],uv:[0,0],at:[0,5,0]}),h=[];for(const[u,f,g]of[[0,-3.5,3],[1,3.5,3],[2,-3.5,-3],[3,3.5,-3]])h.push(ge("leg"+u,l,o,i,{size:[4,4,4],uv:[40,0],at:[f,5,g],off:[-2,-4,-2]}));const d=1.45;return l.scale.setScalar(d),{root:a,scale:l,body:c,legs:h,mat:o,baseScale:d}}function P1(){const i=new Qn(64,32,909),t=["#48a0e8","#3890d8","#58b0f0","#2880c8"],e=i.boxNoise(0,0,8,8,8,t),[n,s]=e.front;i.rect(n+1,s+2,2,3,"#081018"),i.rect(n+5,s+2,2,3,"#081018"),i.px(n+1,s+2,"#e0ffff"),i.px(n+5,s+2,"#e0ffff"),i.rect(n+2,s+6,4,1,"#102030"),i.boxNoise(32,0,3,5,3,["#2880c8","#1868b0"]);const r=i.texture(),o=Bn(r),a=new ne;a.name="hopper";const l=new ne;l.name="scale",a.add(l);const c=ge("body",l,o,i,{size:[8,8,8],uv:[0,0],at:[0,7,0]}),h=[];for(const[u,f]of[[0,-2.5],[1,2.5]])h.push(ge("leg"+u,l,o,i,{size:[3,5,3],uv:[32,0],at:[f,7,0],off:[-1.5,-5,-1.5]}));const d=1.4;return l.scale.setScalar(d),{root:a,scale:l,body:c,legs:h,mat:o,baseScale:d}}function L1(){const i=new Qn(64,48,505),t=["#8a8680","#7a7670","#9a9690","#6e6a64","#a8a49c"],e=i.boxNoise(0,0,14,16,10,t),[n,s]=e.front;i.rect(n+3,s+5,3,3,"#1a1208"),i.rect(n+8,s+5,3,3,"#1a1208"),i.px(n+4,s+6,"#ffd060"),i.px(n+9,s+6,"#ffd060"),i.rect(n+5,s+11,4,2,"#3a342c"),i.boxNoise(40,0,6,8,6,["#6e6a64","#8a8680"]),i.boxNoise(0,28,5,6,5,t);const r=i.texture(),o=Bn(r),a=new ne;a.name="golem";const l=new ne;l.name="scale",a.add(l);const c=ge("body",l,o,i,{size:[14,16,10],uv:[0,0],at:[0,8,0]}),h=[];for(const[f,g]of[[0,-9],[1,9]])h.push(ge("arm"+f,l,o,i,{size:[6,8,6],uv:[40,0],at:[g,12,0],off:[-3,-6,-3]}));const d=[];for(const[f,g]of[[0,-4],[1,4]])d.push(ge("leg"+f,l,o,i,{size:[5,6,5],uv:[0,28],at:[g,8,0],off:[-2.5,-6,-2.5]}));const u=1.85;return l.scale.setScalar(u),{root:a,scale:l,body:c,arms:h,legs:d,mat:o,baseScale:u}}function D1(){const i=new Qn(64,32,606),t=["#7a4ab0","#6a3a9a","#8a5ac0","#5a2a8a"],e=i.boxNoise(0,0,8,10,6,t),[n,s]=e.front;i.rect(n+1,s+2,2,3,"#101018"),i.rect(n+5,s+2,2,3,"#101018"),i.px(n+1,s+2,"#fff8a0"),i.px(n+5,s+2,"#fff8a0"),i.rect(n+2,s+7,4,1,"#201028"),i.boxNoise(32,0,4,5,4,["#5a2a8a","#4a1a7a"]),i.boxNoise(48,0,6,6,6,["#c4a060","#b09050","#d4b070"]);const r=i.texture(),o=Bn(r),a=new ne;a.name="thief";const l=new ne;l.name="scale",a.add(l);const c=ge("body",l,o,i,{size:[8,10,6],uv:[0,0],at:[0,5,0]}),h=[];for(const[f,g]of[[0,-2.5],[1,2.5]])h.push(ge("leg"+f,l,o,i,{size:[4,5,4],uv:[32,0],at:[g,5,0],off:[-2,-5,-2]}));const d=ge("sack",l,o,i,{size:[6,6,6],uv:[48,0],at:[0,8,-5],off:[-3,-3,-3]});d.visible=!1;const u=1.35;return l.scale.setScalar(u),{root:a,scale:l,body:c,legs:h,sack:d,mat:o,baseScale:u}}function I1(){const i=new Qn(64,48,707),t=["#e85848","#d04838","#f06858","#c03830"],e=i.boxNoise(0,0,10,8,12,t),[n,s]=e.front;i.rect(n+2,s+2,2,2,"#101010"),i.rect(n+6,s+2,2,2,"#101010"),i.px(n+2,s+2,"#ffe080"),i.px(n+6,s+2,"#ffe080"),i.rect(n+3,s+5,4,2,"#301010"),i.px(n+4,s+5,"#fff0a0"),i.boxNoise(40,0,4,4,4,["#c03830","#a02820"]),i.boxNoise(0,24,14,10,2,["#f08870","#e07058","#d06048"]);const r=i.texture(),o=Bn(r),a=new ne;a.name="dragon";const l=new ne;l.name="scale",a.add(l);const c=ge("body",l,o,i,{size:[10,8,12],uv:[0,0],at:[0,6,0]}),h=ge("head",l,o,i,{size:[8,7,6],uv:[0,0],at:[0,10,7],off:[-4,-3,-3]}),d=[];for(const[g,x,m]of[[0,-8,.4],[1,8,-.4]]){const p=ge("wing"+g,l,o,i,{size:[14,10,2],uv:[0,24],at:[x,10,0],off:[g===0?-14:0,-5,-1]});p.rotation.z=m,d.push(p)}const u=[];for(const[g,x]of[[0,-3],[1,3]])u.push(ge("leg"+g,l,o,i,{size:[4,4,4],uv:[40,0],at:[x,6,-2],off:[-2,-4,-2]}));const f=1.55;return l.scale.setScalar(f),{root:a,scale:l,body:c,head:h,wings:d,legs:u,mat:o,baseScale:f}}function N1(){const i=new Qn(64,32,404),t=["#f0a8a8","#e89c9c","#f4b2b2","#e29494"];i.boxNoise(0,0,10,8,14,t);const e=i.boxNoise(0,22,8,7,3,t);i.rect(e.front[0]+1,e.front[1]+2,2,1,"#2a1a1a"),i.rect(e.front[0]+5,e.front[1]+2,2,1,"#2a1a1a"),i.px(e.front[0]+1,e.front[1]+2,"#ffffff"),i.px(e.front[0]+6,e.front[1]+2,"#ffffff");const n=i.boxNoise(24,22,4,3,1,["#e48a96"]);i.px(n.front[0]+1,n.front[1]+1,"#a8505a"),i.px(n.front[0]+2,n.front[1]+1,"#a8505a"),i.boxNoise(48,16,3,4,3,["#e29494","#d88a8a"]);const s=i.texture(),r=Bn(s),o=new ne;o.name="pig";const a=ge("body",o,r,i,{size:[10,8,14],uv:[0,0],at:[0,4,0]}),l=ge("head",o,r,i,{size:[8,7,3],uv:[0,22],at:[0,6,7],off:[-4,0,0]});ge("snout",l,r,i,{size:[4,3,1],uv:[24,22],at:[0,1,3],off:[-2,0,0]});const c=[];for(const[h,d,u]of[[0,-3,5],[1,3,5],[2,-3,-5],[3,3,-5]])c.push(ge("leg"+h,o,r,i,{size:[3,4,3],uv:[48,16],at:[d,4,u],off:[-1.5,-4,-1.5]}));return{root:o,body:a,head:l,legs:c,mat:r}}const cr=new Map;function k1(i,t){if(cr.has(t))return cr.get(t);const e=i.images[t],[n,s,r,o]=i.uv(t),a=(r-n)/16,l=(o-s)/16,c=(E,w)=>E<0||w<0||E>15||w>15?0:e.data[(w*16+E)*4+3],h=[],d=[],u=[],f=[],g=.5*Ge,x=(E,w,P)=>{const v=h.length/3;for(let R=0;R<4;R++)h.push(...E[R]),d.push(...w[R]),u.push(P);f.push(v,v+1,v+2,v,v+2,v+3)},m=-.5,p=.5,y=-.5,T=.5;x([[m,y,g],[p,y,g],[p,T,g],[m,T,g]],[[n,s],[r,s],[r,o],[n,o]],1),x([[p,y,-g],[m,y,-g],[m,T,-g],[p,T,-g]],[[r,s],[n,s],[n,o],[r,o]],.75);for(let E=0;E<16;E++)for(let w=0;w<16;w++){if(c(w,E)<128)continue;const P=-.5+w/16,v=P+1/16,R=.5-E/16,N=R-1/16,F=n+(w+.5)*a,B=o-(E+.5)*l,S=[[F,B],[F,B],[F,B],[F,B]];c(w-1,E)<128&&x([[P,N,-g],[P,N,g],[P,R,g],[P,R,-g]],S,.6),c(w+1,E)<128&&x([[v,N,g],[v,N,-g],[v,R,-g],[v,R,g]],S,.6),c(w,E-1)<128&&x([[P,R,g],[v,R,g],[v,R,-g],[P,R,-g]],S,.95),c(w,E+1)<128&&x([[P,N,-g],[v,N,-g],[v,N,g],[P,N,g]],S,.5)}const _=new ke;return _.setAttribute("position",new re(h,3)),_.setAttribute("uv",new re(d,2)),_.setAttribute("shade",new re(u,1)),_.setIndex(f),_.computeBoundingSphere(),cr.set(t,_),_}function iu(i,t,e){const n=new le(k1(i,t),e||Bn(i.texture));return n.name="item_"+t,n}function U1(i,t){const e="block:"+JSON.stringify(t);if(cr.has(e))return cr.get(e);const n=u=>i.uv(typeof t=="string"?t:t[u]),s=[],r=[],o=[],a=[],l=(u,f,g)=>{const[x,m,p,y]=n(f),T=s.length/3,_=[[x,m],[p,m],[p,y],[x,y]];for(let E=0;E<4;E++)s.push(...u[E]),r.push(..._[E]),o.push(g);a.push(T,T+1,T+2,T,T+2,T+3)},c=-.5,h=.5;l([[c,c,h],[h,c,h],[h,h,h],[c,h,h]],"side",.85),l([[h,c,c],[c,c,c],[c,h,c],[h,h,c]],"side",.7),l([[h,c,h],[h,c,c],[h,h,c],[h,h,h]],"side",.62),l([[c,c,c],[c,c,h],[c,h,h],[c,h,c]],"side",.62),l([[c,h,h],[h,h,h],[h,h,c],[c,h,c]],"top",1),l([[c,c,c],[h,c,c],[h,c,h],[c,c,h]],"bottom",.5);const d=new ke;return d.setAttribute("position",new re(s,3)),d.setAttribute("uv",new re(r,2)),d.setAttribute("shade",new re(o,1)),d.setIndex(a),d.computeBoundingSphere(),cr.set(e,d),d}const Jd=4.3,F1=5.9,O1=8.6;class B1{constructor(t,e){this.game=t,this.camera=e,this.body={pos:new U,vel:new U,hw:.3,h:1.8,onGround:!1,step:1.05,inWater:!1},this.eye=1.62,this.yaw=Math.PI,this.pitch=0,this.maxHp=20,this.hp=20,this.alive=!0,this.handMat=Bn(t.atlas.texture),this.hand=new ne,this.hand.name="viewHand",e.add(this.hand),this.items={};for(const s of["sword","hoe","seed","potato","wheat","carrot","corn","powder","turret"]){const r=iu(t.atlas,"item_"+s,this.handMat);r.visible=!1,this.hand.add(r),this.items[s]=r}const n=new le(U1(t.atlas,{top:"grass_top",side:"grass_side",bottom:"dirt"}),this.handMat);n.name="item_dirt",n.visible=!1,this.hand.add(n),this.items.dirt=n,this.tool="sword",this.held="sword",this.showT=0,this.reset([0,10,0])}get pos(){return this.body.pos}reset(t,e=Math.PI){this.body.pos.set(t[0],t[1],t[2]),this.body.vel.set(0,0,0),this.yaw=e,this.pitch=-.08,this.hp=this.maxHp,this.alive=!0,this.hurtT=0,this.sinceHurt=10,this.regenT=0,this.swing=1,this.bob=0,this.bobAmt=0,this.stepT=0,this.eyeOff=0,this.sprinting=!1,this.deadT=0}show(t,e=.6){this.held=t,this.showT=e}setTool(t){this.tool!==t&&(this.tool=t,this.showT<=0&&(this.held=t),this.equipT=.18)}swingHand(){this.swing=0}damage(t,e){if(!(!this.alive||t<=0)){if(this.hp=Math.max(0,this.hp-t),this.hurtT=.5,this.sinceHurt=0,e){const n=new U(this.body.pos.x-e.x,0,this.body.pos.z-e.z);n.lengthSq()<1e-4&&n.set(0,0,1),n.normalize().multiplyScalar(Math.min(14,4+t*.8)),this.body.vel.x+=n.x,this.body.vel.z+=n.z,this.body.vel.y=Math.max(this.body.vel.y,5+t*.15),this.body.onGround=!1}this.hp<=0&&(this.alive=!1)}}heal(t){this.hp=Math.min(this.maxHp,this.hp+t)}update(t,e,n=!0){const s=this.body;n&&this.alive&&(this.yaw-=e.look.x,this.pitch=oo(this.pitch-e.look.y,-1.55,1.55));const r=n&&this.alive?e.move:{x:0,y:0},o=Math.hypot(r.x,r.y);this.sprinting=n&&(e.down("sprint")||e.device==="touch"&&o>.95)&&r.y>.3;const a=(this.sprinting?F1:Jd)*(s.inWater?.55:1),l=-Math.sin(this.yaw),c=-Math.cos(this.yaw),h=-c,d=l,u=(l*r.y+h*r.x)*a,f=(c*r.y+d*r.x)*a,g=s.onGround?14:s.inWater?4:3.2;s.vel.x=Le(s.vel.x,u,g,t),s.vel.z=Le(s.vel.z,f,g,t),n&&this.alive&&e.down("jump")&&(s.inWater?s.vel.y=Math.max(s.vel.y,3.2):s.onGround&&!this.game.grace&&(s.vel.y=O1,s.onGround=!1,this.game.audio.sfx("jump")));const x=s.onGround,m=s.vel.y;ls(s,t);const p=as(this.game.world,s,t);p.stepped&&(this.eyeOff-=p.stepped),this.eyeOff=Le(this.eyeOff,0,14,t),!x&&s.onGround&&m<-6&&this.game.audio.sfx("land",{vel:Math.min(1,-m/16)});const y=Math.hypot(s.vel.x,s.vel.z);if(this.bobAmt=Le(this.bobAmt,s.onGround&&y>.5?Math.min(1,y/Jd):0,10,t),this.bob+=t*y*1.9,s.onGround&&y>1&&(this.stepT-=t*y,this.stepT<=0)){this.stepT=2.2;const T=this.game.world.get(Math.floor(s.pos.x),Math.floor(s.pos.y-.05),Math.floor(s.pos.z));this.game.audio.sfx("step",{kind:ct[T]?.particle===14406560?"sand":"grass"})}s.inWater&&!this.wasInWater&&this.game.audio.sfx("splash"),this.wasInWater=s.inWater,this.hurtT=Math.max(0,this.hurtT-t),this.sinceHurt+=t,this.alive&&this.hp<this.maxHp&&this.sinceHurt>5&&(this.regenT+=t,this.regenT>2.5&&(this.regenT=0,this.heal(1))),this.swing=Math.min(1,this.swing+t*3.2),this.showT-=t,this.showT<=0&&(this.held=this.tool),this.equipT=Math.max(0,(this.equipT||0)-t)}updateCamera(t,e){const n=this.body,s=this.camera,r=Math.abs(Math.sin(this.bob))*.055*this.bobAmt,o=Math.cos(this.bob)*.035*this.bobAmt;s.position.set(n.pos.x,n.pos.y+this.eye+this.eyeOff+r,n.pos.z),s.rotation.set(this.pitch,this.yaw,Math.sin(this.bob)*.006*this.bobAmt,"YXZ"),this.alive?this.deadT=0:(this.deadT+=t,s.position.y=n.pos.y+Math.max(.25,this.eye-this.deadT*3),s.rotation.z=Math.min(1.2,this.deadT*2.5));const a=this.sprinting?78:72;Math.abs(s.fov-a)>.05&&(s.fov=Le(s.fov,a,8,t),s.updateProjectionMatrix());let l=this.held;l==="seed"&&(l=this.game.peekNextSeed?.()||"seed");for(const[m,p]of Object.entries(this.items))p.visible=m===l&&this.alive;const c=this.swing,h=Math.sin(c*Math.PI),d=Math.sin(Math.sqrt(c)*Math.PI),u=this.hand;u.position.set(.4+o-d*.14,-.36-r*.6+h*.06,-.62-h*.12);const f=this.items[l];if(f){const m=l,p=m==="sword"||m==="hoe";m==="dirt"?(f.scale.setScalar(.17),f.rotation.set(.25-h*.6,.75,.05),f.position.set(-.02,-.02,0)):(f.scale.setScalar(p?.3:.2),f.rotation.set(p?.15-h*1.2:-.3-h*.6,p?-1.15:-.5,p?.1+d*.5:-.2),f.position.set(0,p?.04:-.02,0))}u.position.y-=(this.equipT||0)*1.6,u.rotation.set(0,0,Math.sin(e*1.3)*.01);const[g,x]=this.game.world.lightAt(n.pos.x,n.pos.y+this.eye,n.pos.z);mi(this.handMat,g,x)}ray(){const t=this.camera,e=t.position.clone(),n=new U(0,0,-1).applyQuaternion(t.quaternion);return{o:e,d:n}}}const Qd=i=>{const t=new Ot(i);return[t.r,t.g,t.b]};class z1{constructor(t,e=1500){this.max=e,this.n=0,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.alpha=new Float32Array(e),this.size=new Float32Array(e),this.vel=new Float32Array(e*3),this.life=new Float32Array(e),this.age=new Float32Array(e),this.grav=new Float32Array(e),this.drag=new Float32Array(e),this.grow=new Float32Array(e),this.base=new Float32Array(e);const n=new ke;n.setAttribute("position",new En(this.pos,3).setUsage(vo)),n.setAttribute("color",new En(this.col,3).setUsage(vo)),n.setAttribute("alpha",new En(this.alpha,1).setUsage(vo)),n.setAttribute("size",new En(this.size,1).setUsage(vo)),n.setDrawRange(0,0),this.uniforms={uScale:{value:400}};const s=new Ne({uniforms:this.uniforms,vertexShader:`
        attribute float alpha; attribute float size; attribute vec3 color;
        uniform float uScale; varying vec3 vCol; varying float vA;
        void main() {
          vCol = color; vA = alpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(size * uScale / max(-mv.z, 0.1), 1.0, 256.0);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying vec3 vCol; varying float vA;
        void main() { if (vA < 0.01) discard; gl_FragColor = vec4(vCol, clamp(vA, 0.0, 1.0)); }`,transparent:!0,depthWrite:!1});this.points=new ep(n,s),this.points.name="particles",this.points.frustumCulled=!1,this.points.renderOrder=5,t.add(this.points),this.geo=n}setScale(t,e){this.uniforms.uScale.value=t/(2*Math.tan(e*Math.PI/360))}spawn(t){if(this.n>=this.max)return;const e=this.n++;this.pos.set([t.x,t.y,t.z],e*3),this.vel.set([t.vx||0,t.vy||0,t.vz||0],e*3);const n=Array.isArray(t.color)?t.color:Qd(t.color??16777215),s=t.bright??1;this.col.set([n[0]*s,n[1]*s,n[2]*s],e*3),this.base[e]=t.size??.1,this.size[e]=this.base[e],this.life[e]=t.life??1,this.age[e]=0,this.grav[e]=t.grav??12,this.drag[e]=t.drag??1,this.grow[e]=t.grow??0,this.alpha[e]=t.alpha??1}burst(t,e,n,s,r=14,o=1,a=1){const l=Qd(s),c=Math.min(r,Math.max(2,this.max>=800?r:Math.ceil(r*.45)));for(let h=0;h<c;h++){const d=.75+Math.random()*.35;this.spawn({x:t+Math.random()*a,y:e+Math.random()*a,z:n+Math.random()*a,vx:(Math.random()-.5)*3,vy:1+Math.random()*3,vz:(Math.random()-.5)*3,color:[l[0]*d,l[1]*d,l[2]*d],size:.07+Math.random()*.06,life:.5+Math.random()*.5,grav:14,drag:.5,bright:o})}}smoke(t,e,n,s=10,r=.5,o=1,a=1){const l=Math.min(s,Math.max(3,this.max>=800?s:Math.ceil(s*.4)));for(let c=0;c<l;c++){const h=.75+Math.random()*.25;this.spawn({x:t+(Math.random()-.5)*r*2,y:e+(Math.random()-.3)*r*2,z:n+(Math.random()-.5)*r*2,vx:(Math.random()-.5)*2*a,vy:.5+Math.random()*1.5,vz:(Math.random()-.5)*2*a,color:[h,h,h],size:(.25+Math.random()*.3)*a,life:.6+Math.random()*.7,grav:-.5,drag:2,grow:.6*a,bright:o,alpha:.9})}}sparkle(t,e,n,s=10,r=16773792){const o=Math.min(s,Math.max(2,this.max>=800?s:Math.ceil(s*.45)));for(let a=0;a<o;a++)this.spawn({x:t+Math.random(),y:e+Math.random()*.8,z:n+Math.random(),vx:(Math.random()-.5)*.6,vy:.8+Math.random()*1.2,vz:(Math.random()-.5)*.6,color:r,size:.06+Math.random()*.05,life:.6+Math.random()*.5,grav:.5,drag:1,bright:1.2})}update(t){let e=0;for(;e<this.n;){if(this.age[e]+=t,this.age[e]>=this.life[e]){this._kill(e);continue}const n=e*3,s=Math.exp(-this.drag[e]*t);this.vel[n]*=s,this.vel[n+2]*=s,this.vel[n+1]=this.vel[n+1]*s-this.grav[e]*t,this.pos[n]+=this.vel[n]*t,this.pos[n+1]+=this.vel[n+1]*t,this.pos[n+2]+=this.vel[n+2]*t;const r=this.age[e]/this.life[e];this.size[e]=this.base[e]*(1+this.grow[e]*r*3),this.grow[e]>0?this.alpha[e]=.9*(1-r):this.alpha[e]=r>.75?(1-r)*4:1,e++}for(const n of["position","color","alpha","size"])this.geo.attributes[n].needsUpdate=!0;this.geo.setDrawRange(0,this.n)}_kill(t){const e=--this.n;if(t!==e){for(const[n,s]of[[this.pos,3],[this.col,3],[this.vel,3]])for(let r=0;r<s;r++)n[t*s+r]=n[e*s+r];for(const n of[this.alpha,this.size,this.life,this.age,this.grav,this.drag,this.grow,this.base])n[t]=n[e]}}clear(){this.n=0,this.geo.setDrawRange(0,0)}}const H1='"DotGothic16", "Hiragino Maru Gothic ProN", monospace';function kp(i){const t=new is(i);return t.colorSpace=Ve,t.magFilter=he,t.minFilter=Ke,t.generateMipmaps=!1,t}const lc=new Map;function G1(i,t){const e=i+"|"+t;if(lc.has(e))return lc.get(e);const n=document.createElement("canvas");n.width=128,n.height=48;const s=n.getContext("2d");s.font=`bold 34px ${H1}`,s.textAlign="center",s.textBaseline="middle",s.fillStyle="rgba(0,0,0,0.75)",s.fillText(i,67,27),s.fillStyle=t,s.fillText(i,64,24);const r=kp(n);return lc.set(e,r),r}class V1{constructor(t){this.scene=t,this.items=[]}add(t,e,n,s,r="#ffe27a"){const o=new Kh(new Za({map:G1(t,r),transparent:!0,depthTest:!1,toneMapped:!1}));o.name="float",o.scale.set(1.2,.45,1),o.position.set(e,n,s),o.renderOrder=20,this.scene.add(o),this.items.push({s:o,t:0,y:n})}update(t){for(let e=this.items.length-1;e>=0;e--){const n=this.items[e];n.t+=t,n.s.position.y=n.y+n.t*.9,n.s.material.opacity=n.t>.9?Math.max(0,1-(n.t-.9)/.5):1,n.t>1.4&&(this.scene.remove(n.s),n.s.material.dispose(),this.items.splice(e,1))}}clear(){for(const t of this.items)this.scene.remove(t.s);this.items=[]}}const jd={"!":["......##......","......##......","......##......","......##......","......##......","..............","......##......"],"?":["....######....","...##....##...",".........##...",".......###....","......##......","..............","......##......"],note:[".......####...",".......#..#...",".......#......",".......#......","....####......","...#####......","....###......."],zzz:["..######......","......#.......",".....#..####..","....#.....#...","..######.#....","........####..",".............."],bolt:[".......##.....","......##......",".....####.....","....##........","...########...",".......##.....","......##......"],sweat:["......#.......",".....###......","....#####.....","....#####.....",".....###......","..............",".............."],heart:["...##..##.....","..####.####...","..#########...","...#######....","....#####.....",".....###......","......#......."],dots:["..............","..............","..............","..............",".##..##..##...",".##..##..##...",".............."],rain:["...######.....",".##########...","############..",".##########...","..#..#..#.....",".#..#..#......",".............."]},W1={"!":"#e83a2a","?":"#3a6ae8",note:"#3a6ae8",zzz:"#6a6aa8",bolt:"#3ad8ff",sweat:"#4aa8e8",heart:"#e84a7a",dots:"#444444",rain:"#6a7a8a"},cc=new Map;function tf(i){if(cc.has(i))return cc.get(i);const t=document.createElement("canvas");t.width=18,t.height=14;const e=t.getContext("2d");e.fillStyle="#222",e.fillRect(1,0,16,11),e.fillRect(0,1,18,9),e.fillRect(6,11,4,1),e.fillRect(7,12,2,1),e.fillStyle="#fff",e.fillRect(1,1,16,9),e.fillRect(7,10,2,1),e.fillStyle=W1[i]||"#222",(jd[i]||jd["?"]).forEach((s,r)=>[...s].forEach((o,a)=>{o==="#"&&e.fillRect(a+2,r+2,1,1)}));const n=kp(t);return n.minFilter=he,cc.set(i,n),n}class q1{constructor(t,e=1.9){this.sprite=new Kh(new Za({map:tf("!"),transparent:!0,depthTest:!0,toneMapped:!1})),this.sprite.name="emote",this.sprite.scale.set(.6,.47,1),this.sprite.position.y=e,this.sprite.visible=!1,this.sprite.renderOrder=15,this.y=e,t.add(this.sprite),this.t=0,this.kind=null}show(t,e=2){this.kind=t,this.sprite.material.map=tf(t),this.sprite.material.needsUpdate=!0,this.sprite.visible=!0,this.t=e}hide(){this.t=0,this.sprite.visible=!1,this.kind=null}update(t,e){this.t<=0||(this.t-=t,this.sprite.position.y=this.y+Math.sin(e*6)*.04,this.t<=0&&this.hide())}}function X1(){const i=new zm(new hn(1,1,1)),t=new Om(i,new jf({color:0,transparent:!0,opacity:.55,depthWrite:!1}));return t.name="selection",t.visible=!1,t.renderOrder=6,t}class $1{constructor(){this.a=[],this.p=[]}get size(){return this.a.length}push(t,e){const n=this.a,s=this.p;n.push(t),s.push(e);let r=n.length-1;for(;r>0;){const o=r-1>>1;if(s[o]<=e)break;n[r]=n[o],s[r]=s[o],r=o}n[r]=t,s[r]=e}pop(){const t=this.a,e=this.p,n=t[0],s=t.pop(),r=e.pop();if(t.length){let o=0;const a=t.length;for(;;){const l=2*o+1,c=l+1;let h=o,d=r;if(l<a&&e[l]<d&&(h=l,d=e[l]),c<a&&e[c]<d&&(h=c,d=e[c]),h===o)break;t[o]=t[h],e[o]=e[h],o=h}t[o]=s,e[o]=r}return n}}const Y1=[[1,0,1],[-1,0,1],[0,1,1],[0,-1,1],[1,1,1.414],[1,-1,1.414],[-1,1,1.414],[-1,-1,1.414]],sa=new Float32Array(at*zt),hc=new Int32Array(at*zt),uc=new Uint32Array(at*zt);let ra=1;function co(i,t,e,n,s,r={}){const{maxNodes:o=3e3,avoidWater:a=!0,near:l=0,blocked:c=null}=r,h=i.floor,d=i.water,u=(E,w)=>{if(E<1||w<1||E>=at-1||w>=zt-1)return!1;const P=E+w*at;return!(h[P]<0||a&&d[P]||c&&c(P))};t=Math.floor(t),e=Math.floor(e),n=Math.floor(n),s=Math.floor(s);const f=t+e*at,g=n+s*at;if(t<0||e<0||t>=at||e>=zt)return{path:[],reached:!1};ra++;const x=new $1,m=(E,w)=>{const P=Math.abs(E-n),v=Math.abs(w-s);return Math.max(P,v)+.414*Math.min(P,v)};uc[f]=ra,sa[f]=0,hc[f]=-1,x.push(f,m(t,e));let p=0,y=f,T=m(t,e);for(;x.size;){const E=x.pop(),w=E%at,P=E/at|0,v=m(w,P);if(v<T&&(T=v,y=E),E===g||v<=l){y=E;break}if(++p>o)break;const R=h[E];for(const[N,F,B]of Y1){const S=w+N,M=P+F;if(!u(S,M))continue;const C=S+M*at;if(Math.abs(h[C]-R)>1)continue;if(N&&F){const q=w+N+P*at,O=w+(P+F)*at;if(!u(w+N,P)||!u(w,P+F)||Math.abs(h[q]-R)>0||Math.abs(h[O]-R)>0||h[C]!==R)continue}const I=h[C]>R?.6:0,D=sa[E]+B+I;uc[C]===ra&&D>=sa[C]||(uc[C]=ra,sa[C]=D,hc[C]=E,x.push(C,D+m(S,M)*1.05))}}if(y===f)return{path:[],reached:m(t,e)<=Math.max(l,.01)};const _=[];for(let E=y;E!==f&&E>=0;E=hc[E])_.push([E%at,E/at|0]);return _.reverse(),{path:_,reached:T<=Math.max(l,.01)||y===g}}const oa=1/16,In=ut.house,Ci={x0:In.x0+1,x1:In.x1-1,z0:In.z0+1,z1:In.z1-1},K1={x0:ut.farmZone.x0-5,x1:ut.farmZone.x1+5,z0:ut.house.z0-4,z1:ut.farmZone.z1+6},Xi={hide:[In.x0+3.5,In.z0+3.5],wake:[In.door[0]-.4,In.door[1]-1.6]};function Z1(i){const t=ut.charge||[];let e=0;return i.helper&&(e=1+Math.max(0,i.game.helpers.indexOf(i))),{x:(t[e%Math.max(1,t.length)]||[In.x0+3,In.z0+1])[0]+.5,y:nt+1,z:In.z0+1.28,yaw:0}}const Fr={work:1.9,panic:4.6};class ef{constructor(t,{helper:e=!1}={}){this.game=t,this.helper=e,this.model=Np(),this.root=this.model.root,e&&this.root.scale.setScalar(.92),t.scene.add(this.root),this.body={pos:new U,vel:new U,hw:.3,h:1.2,onGround:!1,step:1.05,inWater:!1},this.emote=new q1(this.root,1.65),this.handMat=Bn(t.atlas.texture),this.hand=new ne,this.hand.name="hand",this.hand.position.set(0,-5.5*oa,.5*oa),this.model.parts.armR.add(this.hand),this.handItems={};for(const n of["item_hoe","item_potato","item_wheat","item_carrot","item_corn"]){const s=iu(t.atlas,n,this.handMat);s.scale.setScalar(.42),s.rotation.set(0,Math.PI/2,n==="item_hoe"?Math.PI*.75:0),s.position.set(0,-.1,.12),s.visible=!1,this.hand.add(s),this.handItems[n]=s}this.reset()}reset(t=[ut.spawn[0]-3,nt+1,ut.fieldA.z0-1.5]){this.body.pos.set(t[0],t[1],t[2]),this.body.vel.set(0,0,0),this.yaw=0,this.headYaw=0,this.state="work",this.stateT=0,this.task=null,this.path=null,this.thinkT=1,this.talkT=25,this.scareCool=15,this.checkT=0,this.calmT=0,this.sulkDur=10,this.walk=0,this.phase=0,this.t=0,this.stuckT=0,this.lastPos=new U().copy(this.body.pos),this.root.rotation.set(0,0,0),this.blinkT=2,this.emote.hide(),this.setHand(null)}get status(){const t=this.state;return t==="panic"||t==="hide"||t==="scare"?"scared":t==="sulk"||t==="flung"?"sulk":t==="sleep"||t==="toBed"?"sleep":t==="work"&&this.task&&this.task.type!=="wander"?"work":"idle"}get inHouse(){const t=this.body.pos;return Pn(Math.floor(t.x),Math.floor(t.z),Ci)}get exposed(){return!this.inHouse&&this.state!=="sleep"&&this.state!=="kidnapped"&&!this.captive}setState(t){this.state=t,this.stateT=0,t!=="work"&&(this.task=null,this.setHand(null))}kidnapBy(t){this.endTask(),this.setState("kidnapped"),this.captor=t,this.captive=!1,this.root.visible=!0,this.emote.show("!",2),this.game.say(this.helper?"astra.kidnapHelper":"astra.kidnap",{cool:0})}releaseKidnap(t,e){this.captor=null,this.captive=!1,this.root.visible=!0,t&&(this.body.pos.set(t.x,Math.max(nt+1,t.y),t.z),this.body.vel.set(0,2,0)),this.root.rotation.set(0,0,0),e?(this.setState("sulk"),this.sulkDur=5,this.emote.show("heart",1.5)):this.setState("flung")}returnFromCaptivity(){return!this.captive&&this.state!=="kidnapped"?!1:(this.captor=null,this.captive=!1,this.root.visible=!0,this.wake(),this.emote.show("sweat",2),this.game.talk.sys("sys.robotReturned"),!0)}setHand(t){for(const[e,n]of Object.entries(this.handItems))n.visible=e===t}goTo(t,e,n=.6){const s=co(this.game.world,this.body.pos.x,this.body.pos.z,t,e,{near:Math.max(0,n-.5),maxNodes:2500});return this.path=s.path,this.pathI=0,this.goal=[t,e,n],this.stuckT=0,this.lastPos.copy(this.body.pos),s.reached||s.path.length>0}follow(t,e){const n=this.body.pos;if(!this.goal)return"arrived";let s,r;if(this.path&&this.pathI<this.path.length){const[c,h]=this.path[this.pathI];if(s=c+.5,r=h+.5,Math.hypot(s-n.x,r-n.z)<.35)return this.pathI++,this.follow(t,e)}else if(s=this.goal[0],r=this.goal[1],Math.hypot(s-n.x,r-n.z)<=this.goal[2])return this.goal=null,"arrived";const o=s-n.x,a=r-n.z,l=Math.hypot(o,a)||1;if(this.wantVel(o/l*e,a/l*e,t),this.yaw=Rs(this.yaw,Math.atan2(o,a),10,t),this.stuckT+=t,this.stuckT>1.2){const c=this.lastPos.distanceTo(n);if(this.lastPos.copy(n),this.stuckT=0,c<.25){if(this.stuckN=(this.stuckN||0)+1,this.body.onGround&&(this.body.vel.y=7.5),this.stuckN>2)return this.stuckN=0,this.goal=null,n.y<nt+.6&&this.warpHome(),"stuck"}else this.stuckN=0}return"moving"}wantVel(t,e,n,s=12){this.body.vel.x=Le(this.body.vel.x,t,s,n),this.body.vel.z=Le(this.body.vel.z,e,s,n)}crewIndex(){if(!this.helper)return 0;const t=this.game.helpers.indexOf(this);return 1+Math.max(0,t)}findTask(){const t=this.game,e=t.world,n=ut.farmZone,s=this.body.pos,r=1+t.helpers.length,o=this.crewIndex(),a=(n.x1-n.x0+1)/r,l=n.x0+o*a,c=l+a,h=m=>m>=l&&m<c?0:Math.abs(m-(l+c)*.5)*.4;let d=null,u=0;const f=(m,p,y,T,_,E=null)=>{(!d||_<d.score)&&(d={type:m,x:p,y,z:T,score:_,crop:E})},g=this.helper?2:3;for(let m=n.z0;m<=n.z1;m++)for(let p=n.x0;p<=n.x1;p++){const y=e.get(p,nt,m),T=e.get(p,nt+1,m),_=Math.hypot(p+.5-s.x,m+.5-s.z)+h(p);if(!t.isReserved(p,m))if(ai(T))f("harvest",p,nt+1,m,_);else if(oi(y)&&T===k.AIR){u++;const E=t.pickPlantSeed?.(g);E&&f("plant",p,nt+1,m,_+.5,E)}else(y===k.GRASS||y===k.DIRT)&&(T===k.AIR||ct[T].plant&&T!==k.CANE)&&f("till",p,nt,m,_+(u<4?1.2:4.5))}for(const m of[ut.fieldA,ut.fieldB])for(let p=m.z0;p<=m.z1;p++)for(let y=m.x0;y<=m.x1;y++){if(t.isReserved(y,p))continue;const T=e.get(y,nt,p),_=e.get(y,nt+1,p);if((T===k.GRASS||T===k.DIRT)&&(_===k.AIR||ct[_].plant&&_!==k.CANE)){const E=Math.hypot(y+.5-s.x,p+.5-s.z)+h(y);f("till",y,nt,p,E+2.5)}}const x=K1;for(let m=x.z0;m<=x.z1;m++)for(let p=x.x0;p<=x.x1;p++){if(t.isReserved(p,m))continue;const y=this.holeAt(p,m);y>=0&&f("repair",p,y,m,Math.hypot(p+.5-s.x,m+.5-s.z)+1.2+h(p))}return d}holeAt(t,e){for(let n=nt-4;n<=nt+6;n++)if(this.game.isHole(t,n,e))return n;return-1}startTask(t){this.task={...t,phase:"go",actT:0},this.game.reserve(t.x,t.z,!0);const e=t.type==="repair"?1.6:1.25;this.goTo(t.x+.5,t.z+.5,e)||(this.endTask(),this.thinkT=1.5)}endTask(){this.task&&this.game.reserve(this.task.x,this.task.z,!1),this.task=null,this.setHand(null)}doTask(t){const e=this.game,n=e.world;if(e.isNetClient?.())return;const s=r=>e.syncFarm?e.syncFarm(r):r();if(t.type==="harvest")ai(n.get(t.x,t.y,t.z))&&s(()=>e.harvest(t.x,t.y,t.z,"robot"));else if(t.type==="plant"){const r=t.crop||e.pickPlantSeed?.(2);r&&oi(n.get(t.x,t.y-1,t.z))&&n.get(t.x,t.y,t.z)===k.AIR&&s(()=>e.plant(t.x,t.y,t.z,"robot",r))}else t.type==="till"?s(()=>e.till(t.x,t.y,t.z,"robot")):t.type==="repair"&&s(()=>e.repair(t.x,t.y,t.z,"robot"))}fling(t,e){const n=this.body.pos,s=new U(n.x-t.x,0,n.z-t.z);s.lengthSq()<1e-4&&s.set(1,0,0),s.normalize().multiplyScalar(5+e*4),this.body.vel.set(s.x,7+e*3,s.z),this.body.onGround=!1,this.state==="sleep"&&this.root.rotation.set(0,0,0),this.endTask(),this.setState("flung"),this.emote.show("!",1.2),this.game.say("astra.flung",{cool:0})}cheer(){return this.state!=="sulk"?!1:(this.sulkDur=Math.min(this.sulkDur,this.stateT+1.2),this.emote.show("heart",1.5),this.game.say("astra.cheered",{random:!0,cool:0}),!0)}sleepSpot(){const t=Z1(this);return[t.x,t.y,t.z,t.yaw]}goToBed(){this.state==="sleep"||this.state==="toBed"||(this.endTask(),this.setState("toBed"),this.sleepPos=this.sleepSpot(),this.goTo(this.sleepPos[0],this.sleepPos[2],.55))}wake(){if(this.root.rotation.set(0,0,0),this.helper){const t=Math.max(0,this.game.helpers.indexOf(this));this.body.pos.set(In.x0+2+t*.9,nt+1,In.z1-1.2)}else this.body.pos.set(Xi.wake[0],nt+1,Xi.wake[1]);this.body.vel.set(0,0,0),this.yaw=0,this.sleepPos=null,this.setState("work"),this.thinkT=this.helper?1.2:2.5,this.emote.show("note",2)}warpHome(){const t=this.game;t.particles.smoke(this.body.pos.x,this.body.pos.y+.5,this.body.pos.z,10,.4),this.body.pos.set(Xi.wake[0],nt+1,Xi.wake[1]+2.5),this.body.vel.set(0,0,0),t.particles.sparkle(this.body.pos.x-.5,this.body.pos.y,this.body.pos.z-.5,12,9434367),t.say("astra.warp",{cool:30})}sleepNow(){this.endTask(),this.setState("sleep"),this.body.vel.set(0,0,0)}update(t){const e=this.game;this.t+=t,this.stateT+=t,this.scareCool-=t,this.talkT-=t,this.checkT-=t;const n=this.body.pos;if(this.captive){this.root.visible=!1;return}if(this.state==="kidnapped"){this.root.rotation.x+=t*6,this.root.rotation.z=Math.sin(this.t*8)*.3,this.animate(t,0);return}if(this.checkT<=0&&(this.checkT=.25,["work","scare"].includes(this.state)&&e.robotCanPanic)){const r=e.nearestMob(n,!0);if(r){const o=r.mob.kind||"boom";(r.dist<8||r.mob.state==="fuse"&&r.dist<12||o==="dragon"&&r.dist<16||o==="thief"&&r.dist<10||o==="chomp"&&r.dist<10||o==="hop"&&r.dist<9||o==="golem"&&(r.mob.state==="windup"||r.mob.state==="smash")&&r.dist<14)&&this.panic(r.mob)}}let s=0;switch(this.state){case"work":s=this.updateWork(t);break;case"scare":this.wantVel(0,0,t),this.stateT>1.7&&!this.saidOk&&(this.saidOk=!0,e.say(this.scareKind==="melon"?"astra.melonOk":"astra.caneOk",{random:!0}),this.emote.show("sweat",1.5)),this.stateT>3&&this.setState("work");break;case"panic":{const r=this.follow(t,Fr.panic);s=Fr.panic,(r!=="moving"||this.inHouse&&Math.hypot(n.x-Xi.hide[0],n.z-Xi.hide[1])<1.2)&&this.setState("hide");break}case"hide":{this.wantVel(0,0,t);const r=e.nearestMob(n,!0);if(this.calmT=!r||r.dist>12?this.calmT+t:0,e.isNightish){this.goToBed();break}this.calmT>3&&this.stateT>2&&(e.say("astra.calm",{random:!0}),this.setState("work"),this.thinkT=1);break}case"flung":this.root.rotation.x+=t*9,this.body.onGround&&this.stateT>.3&&(this.root.rotation.x=0,this.setState("sulk"),this.sulkDur=9+Math.random()*3,e.say("astra.sulk",{random:!0,delay:1.2}));break;case"sulk":this.wantVel(0,0,t),Math.floor(this.stateT/3)!==Math.floor((this.stateT-t)/3)&&this.emote.show("rain",2),this.stateT>this.sulkDur&&(e.say("astra.recover",{random:!0}),this.emote.show("note",1.5),this.setState("work"),this.thinkT=.5,e.isNightish&&this.goToBed());break;case"toBed":{const r=this.follow(t,Fr.work*1.1);if(s=Fr.work,r!=="moving"||this.stateT>25){this.setState("sleep"),this.body.vel.set(0,0,0);const o=this.sleepPos||this.sleepSpot();n.set(o[0],o[1],o[2]),this.yaw=o[3]??Math.PI/2}break}case"sleep":Math.floor(this.stateT/2.5)!==Math.floor((this.stateT-t)/2.5)&&this.emote.show("bolt",2.2);break}if(this.state==="sleep"){const r=this.sleepPos||this.sleepSpot();n.set(r[0],r[1],r[2]),this.body.vel.set(0,0,0),this.yaw=r[3]??this.yaw}else ls(this.body,t),this.body.inWater&&(this.body.vel.y=Math.max(this.body.vel.y,2.5)),this.state==="flung"&&(this.body.vel.x*=Math.exp(-.6*t),this.body.vel.z*=Math.exp(-.6*t)),as(e.world,this.body,t);this.animate(t,s)}updateWork(t){const e=this.game,n=this.task;if(e.isNightish&&!e.titleMode)return this.goToBed(),0;if(!this.helper&&this.talkT<=0&&(this.talkT=26+Math.random()*22,e.say("astra.idle",{random:!0})),!n){if(this.wantVel(0,0,t),this.thinkT-=t,this.thinkT<=0){const r=this.restNext?null:this.findTask();this.restNext=!1,r?this.startTask(r):this.startWander()}return this.lookAtPlayer(t),0}const s=Fr.work*(this.helper?1.08:1);if(n.phase==="go"){const r=this.follow(t,n.type==="wander"?s*.75:s);if(this.scareCool<=0){const o=this.greenNearby();if(o)return this.startScare(o),0}if(r==="arrived"){n.phase="act";const o={harvest:1.35,plant:.85,till:1.35,repair:1,wander:2.2+Math.random()*2};n.actT=(o[n.type]||1.2)*(this.helper?.9:1);const a=n.crop?`item_${n.crop}`:"item_potato";this.setHand(n.type==="till"||n.type==="repair"?"item_hoe":n.type==="plant"?a:null),n.type==="wander"&&Math.random()<.35&&this.emote.show("note",1.6)}else r==="stuck"&&(this.endTask(),this.thinkT=.8);return n.type==="wander"?s*.75:s}return this.wantVel(0,0,t),n.type!=="wander"?this.yaw=Rs(this.yaw,Math.atan2(n.x+.5-this.body.pos.x,n.z+.5-this.body.pos.z),12,t):this.lookAtPlayer(t),n.actT-=t,n.actT<=0&&(this.doTask(n),this.endTask(),this.thinkT=(this.helper?.25:.7)+Math.random()*(this.helper?.35:.8),n.type!=="wander"&&Math.random()<(this.helper?.05:.16)&&(this.restNext=!0)),0}startWander(){const t=ut.farmZone,e=Math.random();let n,s;if(e<.22){const r=Math.random()*Math.PI*2;n=ut.pond[0]+Math.cos(r)*4.2,s=ut.pond[1]+Math.sin(r)*4.2}else n=t.x0+1+Math.random()*(t.x1-t.x0-2),s=t.z0+Math.random()*(t.z1-t.z0);this.task={type:"wander",x:Math.floor(n),z:Math.floor(s),y:nt+1,phase:"go"},this.goTo(n,s,.8)||(this.task=null,this.thinkT=2)}greenNearby(){const t=this.game.world,e=this.body.pos,n=Math.floor(e.x),s=Math.floor(e.y),r=Math.floor(e.z);for(let o=s;o<=s+1;o++)for(let a=r-2;a<=r+2;a++)for(let l=n-2;l<=n+2;l++){const c=ct[t.get(l,o,a)].green;if(c)return c}return null}startScare(t){this.scareKind=t,this.scareCool=40+Math.random()*25,this.saidOk=!1,this.endTask(),this.setState("scare"),this.emote.show("!",1.6),this.game.say(t==="melon"?"astra.melon":"astra.cane",{random:!0,cool:0}),this.game.audio.sfx("robot_scream",{pos:this.body.pos,refDistance:4})}panic(t){this.endTask(),this.setState("panic"),this.emote.show("!",1.2),this.game.say(t.big?"astra.boss":"astra.panic",{random:!0,cool:6}),this.game.audio.sfx("robot_scream",{pos:this.body.pos,refDistance:4}),this.goTo(Xi.hide[0],Xi.hide[1],.6)}lookAtPlayer(t){const e=this.game.player,n=this.body.pos,s=Math.hypot(e.pos.x-n.x,e.pos.z-n.z);let r=0;if(s<5&&!this.game.titleMode){const o=Math.atan2(e.pos.x-n.x,e.pos.z-n.z)-this.yaw;r=oo(Math.atan2(Math.sin(o),Math.cos(o)),-.9,.9)}this.headYaw=Le(this.headYaw,r,6,t)}animate(t,e){const n=this.model,s=n.parts,r=this.body.pos,o=this.state,a=Math.hypot(this.body.vel.x,this.body.vel.z);this.walk=Le(this.walk,Math.min(1,a/2),10,t),this.phase+=t*(5+a*2.6);const l=Math.sin(this.phase),c=this.t;s.body.position.set(0,0,0),s.torso.rotation.set(0,0,0),s.head.rotation.set(0,this.headYaw,0),s.legL.rotation.set(l*.8*this.walk,0,0),s.legR.rotation.set(-l*.8*this.walk,0,0),s.armL.rotation.set(-l*.6*this.walk,0,-.08),s.armR.rotation.set(l*.6*this.walk,0,.08),s.body.position.y=Math.abs(l)*.5*oa*this.walk;let h="normal",d=7336191,u=0;if(o==="work"&&this.task?.phase==="act"&&this.task.type!=="wander"){const x=Math.sin(c*11);s.armR.rotation.x=-1.3+x*.7,s.armL.rotation.x=-.4,s.torso.rotation.x=.18,s.head.rotation.x=.3,h="work"}else o==="work"&&this.task?.type==="wander"&&this.task.phase==="act"?(s.head.rotation.z=Math.sin(c*1.4)*.12,s.armL.rotation.z=-.25+Math.sin(c*2)*.1,h="happy"):o==="work"&&!this.task?s.head.rotation.z=Math.sin(c*1.2)*.06:o==="panic"?(s.armL.rotation.set(0,0,-2.6+Math.sin(c*25)*.3),s.armR.rotation.set(0,0,2.6-Math.sin(c*25+1)*.3),h="scared",d=16730682):o==="hide"||o==="scare"?(s.armL.rotation.set(-1.4,0,.5),s.armR.rotation.set(-1.4,0,-.5),s.head.rotation.x=.25,s.torso.rotation.x=.12,h=o==="scare"&&this.stateT<.5?"surprise":o==="scare"&&this.saidOk?"happy":"scared",d=o==="scare"&&this.saidOk?16765770:16730682,u=o==="scare"&&this.saidOk?0:.025):o==="flung"?(s.armL.rotation.set(0,0,-2.4),s.armR.rotation.set(0,0,2.4),h="surprise",d=16730682):o==="sulk"?(s.body.position.y=-2.5*oa,s.legL.rotation.set(-1.45,0,-.15),s.legR.rotation.set(-1.45,0,.15),s.head.rotation.x=.45,s.armL.rotation.set(-.5,0,.2),s.armR.rotation.set(-.5,0,-.2),h="sad",d=6978208):o==="sleep"&&(h="work",d=Math.floor(c*5)%2?8057087:2788026,s.armL.rotation.set(.15,0,.25),s.armR.rotation.set(.15,0,-.25),s.head.rotation.x=0,this.setHand(null),s.sack&&(s.sack.visible=!1));o!=="sleep"&&s.sack&&(s.sack.visible=!0),this.blinkT-=t,h==="normal"&&this.blinkT<.12&&(h="blink"),this.blinkT<=0&&(this.blinkT=2+Math.random()*3),n.setFace(h,c),n.setAntenna(d),n.setSack(this.game.stock),this.root.position.set(r.x+(u?(Math.random()-.5)*u*2:0),r.y,r.z+(u?(Math.random()-.5)*u*2:0)),o!=="flung"?this.root.rotation.set(0,this.yaw,0):this.root.rotation.y=this.yaw;const[f,g]=this.game.world.lightAt(r.x,r.y+.6,r.z);n.setLight(f,g),mi(this.handMat,f,g),this.emote.update(t,c)}}/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */function su(i){return i instanceof Uint8Array||ArrayBuffer.isView(i)&&i.constructor.name==="Uint8Array"}function rs(i,t=""){if(!Number.isSafeInteger(i)||i<0){const e=t&&`"${t}" `;throw new Error(`${e}expected integer >= 0, got ${i}`)}}function we(i,t,e=""){const n=su(i),s=i?.length,r=t!==void 0;if(!n||r&&s!==t){const o=e&&`"${e}" `,a=r?` of length ${t}`:"",l=n?`length=${s}`:`type=${typeof i}`;throw new Error(o+"expected Uint8Array"+a+", got "+l)}return i}function el(i){if(typeof i!="function"||typeof i.create!="function")throw new Error("Hash must wrapped by utils.createHasher");rs(i.outputLen),rs(i.blockLen)}function za(i,t=!0){if(i.destroyed)throw new Error("Hash instance has been destroyed");if(t&&i.finished)throw new Error("Hash#digest() has already been called")}function J1(i,t){we(i,void 0,"digestInto() output");const e=t.outputLen;if(i.length<e)throw new Error('"digestInto() output" expected to be of length >='+e)}function no(...i){for(let t=0;t<i.length;t++)i[t].fill(0)}function dc(i){return new DataView(i.buffer,i.byteOffset,i.byteLength)}function ii(i,t){return i<<32-t|i>>>t}const Up=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",Q1=Array.from({length:256},(i,t)=>t.toString(16).padStart(2,"0"));function On(i){if(we(i),Up)return i.toHex();let t="";for(let e=0;e<i.length;e++)t+=Q1[i[e]];return t}const Si={_0:48,_9:57,A:65,F:70,a:97,f:102};function nf(i){if(i>=Si._0&&i<=Si._9)return i-Si._0;if(i>=Si.A&&i<=Si.F)return i-(Si.A-10);if(i>=Si.a&&i<=Si.f)return i-(Si.a-10)}function Nn(i){if(typeof i!="string")throw new Error("hex string expected, got "+typeof i);if(Up)return Uint8Array.fromHex(i);const t=i.length,e=t/2;if(t%2)throw new Error("hex string expected, got unpadded hex of length "+t);const n=new Uint8Array(e);for(let s=0,r=0;s<e;s++,r+=2){const o=nf(i.charCodeAt(r)),a=nf(i.charCodeAt(r+1));if(o===void 0||a===void 0){const l=i[r]+i[r+1];throw new Error('hex string expected, got non-hex character "'+l+'" at index '+r)}n[s]=o*16+a}return n}function Tn(...i){let t=0;for(let n=0;n<i.length;n++){const s=i[n];we(s),t+=s.length}const e=new Uint8Array(t);for(let n=0,s=0;n<i.length;n++){const r=i[n];e.set(r,s),s+=r.length}return e}function j1(i,t={}){const e=(s,r)=>i(r).update(s).digest(),n=i(void 0);return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=s=>i(s),Object.assign(e,t),Object.freeze(e)}function ho(i=32){const t=typeof globalThis=="object"?globalThis.crypto:null;if(typeof t?.getRandomValues!="function")throw new Error("crypto.getRandomValues must be defined");return t.getRandomValues(new Uint8Array(i))}const tM=i=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,i])});function eM(i,t,e){return i&t^~i&e}function nM(i,t,e){return i&t^i&e^t&e}class iM{blockLen;outputLen;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(t,e,n,s){this.blockLen=t,this.outputLen=e,this.padOffset=n,this.isLE=s,this.buffer=new Uint8Array(t),this.view=dc(this.buffer)}update(t){za(this),we(t);const{view:e,buffer:n,blockLen:s}=this,r=t.length;for(let o=0;o<r;){const a=Math.min(s-this.pos,r-o);if(a===s){const l=dc(t);for(;s<=r-o;o+=s)this.process(l,o);continue}n.set(t.subarray(o,o+a),this.pos),this.pos+=a,o+=a,this.pos===s&&(this.process(e,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){za(this),J1(t,this),this.finished=!0;const{buffer:e,view:n,blockLen:s,isLE:r}=this;let{pos:o}=this;e[o++]=128,no(this.buffer.subarray(o)),this.padOffset>s-o&&(this.process(n,0),o=0);for(let d=o;d<s;d++)e[d]=0;n.setBigUint64(s-8,BigInt(this.length*8),r),this.process(n,0);const a=dc(t),l=this.outputLen;if(l%4)throw new Error("_sha2: outputLen must be aligned to 32bit");const c=l/4,h=this.get();if(c>h.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<c;d++)a.setUint32(4*d,h[d],r)}digest(){const{buffer:t,outputLen:e}=this;this.digestInto(t);const n=t.slice(0,e);return this.destroy(),n}_cloneInto(t){t||=new this.constructor,t.set(...this.get());const{blockLen:e,buffer:n,length:s,finished:r,destroyed:o,pos:a}=this;return t.destroyed=o,t.finished=r,t.length=s,t.pos=a,s%e&&t.buffer.set(n),t}clone(){return this._cloneInto()}}const $i=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),sM=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),Yi=new Uint32Array(64);class rM extends iM{constructor(t){super(64,t,8,!1)}get(){const{A:t,B:e,C:n,D:s,E:r,F:o,G:a,H:l}=this;return[t,e,n,s,r,o,a,l]}set(t,e,n,s,r,o,a,l){this.A=t|0,this.B=e|0,this.C=n|0,this.D=s|0,this.E=r|0,this.F=o|0,this.G=a|0,this.H=l|0}process(t,e){for(let d=0;d<16;d++,e+=4)Yi[d]=t.getUint32(e,!1);for(let d=16;d<64;d++){const u=Yi[d-15],f=Yi[d-2],g=ii(u,7)^ii(u,18)^u>>>3,x=ii(f,17)^ii(f,19)^f>>>10;Yi[d]=x+Yi[d-7]+g+Yi[d-16]|0}let{A:n,B:s,C:r,D:o,E:a,F:l,G:c,H:h}=this;for(let d=0;d<64;d++){const u=ii(a,6)^ii(a,11)^ii(a,25),f=h+u+eM(a,l,c)+sM[d]+Yi[d]|0,x=(ii(n,2)^ii(n,13)^ii(n,22))+nM(n,s,r)|0;h=c,c=l,l=a,a=o+f|0,o=r,r=s,s=n,n=f+x|0}n=n+this.A|0,s=s+this.B|0,r=r+this.C|0,o=o+this.D|0,a=a+this.E|0,l=l+this.F|0,c=c+this.G|0,h=h+this.H|0,this.set(n,s,r,o,a,l,c,h)}roundClean(){no(Yi)}destroy(){this.set(0,0,0,0,0,0,0,0),no(this.buffer)}}class oM extends rM{A=$i[0]|0;B=$i[1]|0;C=$i[2]|0;D=$i[3]|0;E=$i[4]|0;F=$i[5]|0;G=$i[6]|0;H=$i[7]|0;constructor(){super(32)}}const os=j1(()=>new oM,tM(1));/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const ru=BigInt(0),wh=BigInt(1);function Ha(i,t=""){if(typeof i!="boolean"){const e=t&&`"${t}" `;throw new Error(e+"expected boolean, got type="+typeof i)}return i}function Fp(i){if(typeof i=="bigint"){if(!Ta(i))throw new Error("positive bigint expected, got "+i)}else rs(i);return i}function aa(i){const t=Fp(i).toString(16);return t.length&1?"0"+t:t}function Op(i){if(typeof i!="string")throw new Error("hex string expected, got "+typeof i);return i===""?ru:BigInt("0x"+i)}function uo(i){return Op(On(i))}function Bp(i){return Op(On(aM(we(i)).reverse()))}function ou(i,t){rs(t),i=Fp(i);const e=Nn(i.toString(16).padStart(t*2,"0"));if(e.length!==t)throw new Error("number too large");return e}function zp(i,t){return ou(i,t).reverse()}function aM(i){return Uint8Array.from(i)}function lM(i){return Uint8Array.from(i,(t,e)=>{const n=t.charCodeAt(0);if(t.length!==1||n>127)throw new Error(`string contains non-ASCII character "${i[e]}" with code ${n} at position ${e}`);return n})}const Ta=i=>typeof i=="bigint"&&ru<=i;function cM(i,t,e){return Ta(i)&&Ta(t)&&Ta(e)&&t<=i&&i<e}function hM(i,t,e,n){if(!cM(t,e,n))throw new Error("expected valid "+i+": "+e+" <= n < "+n+", got "+t)}function uM(i){let t;for(t=0;i>ru;i>>=wh,t+=1);return t}const au=i=>(wh<<BigInt(i))-wh;function dM(i,t,e){if(rs(i,"hashLen"),rs(t,"qByteLen"),typeof e!="function")throw new Error("hmacFn must be a function");const n=m=>new Uint8Array(m),s=Uint8Array.of(),r=Uint8Array.of(0),o=Uint8Array.of(1),a=1e3;let l=n(i),c=n(i),h=0;const d=()=>{l.fill(1),c.fill(0),h=0},u=(...m)=>e(c,Tn(l,...m)),f=(m=s)=>{c=u(r,m),l=u(),m.length!==0&&(c=u(o,m),l=u())},g=()=>{if(h++>=a)throw new Error("drbg: tried max amount of iterations");let m=0;const p=[];for(;m<t;){l=u();const y=l.slice();p.push(y),m+=l.length}return Tn(...p)};return(m,p)=>{d(),f(m);let y;for(;!(y=p(g()));)f();return d(),y}}function lu(i,t={},e={}){if(!i||typeof i!="object")throw new Error("expected valid options object");function n(r,o,a){const l=i[r];if(a&&l===void 0)return;const c=typeof l;if(c!==o||l===null)throw new Error(`param "${r}" is invalid: expected ${o}, got ${c}`)}const s=(r,o)=>Object.entries(r).forEach(([a,l])=>n(a,l,o));s(t,!1),s(e,!0)}function sf(i){const t=new WeakMap;return(e,...n)=>{const s=t.get(e);if(s!==void 0)return s;const r=i(e,...n);return t.set(e,r),r}}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const An=BigInt(0),yn=BigInt(1),Ms=BigInt(2),Hp=BigInt(3),Gp=BigInt(4),Vp=BigInt(5),fM=BigInt(7),Wp=BigInt(8),pM=BigInt(9),qp=BigInt(16);function Yn(i,t){const e=i%t;return e>=An?e:t+e}function Fn(i,t,e){let n=i;for(;t-- >An;)n*=n,n%=e;return n}function rf(i,t){if(i===An)throw new Error("invert: expected non-zero number");if(t<=An)throw new Error("invert: expected positive modulus, got "+t);let e=Yn(i,t),n=t,s=An,r=yn;for(;e!==An;){const a=n/e,l=n%e,c=s-r*a;n=e,e=l,s=r,r=c}if(n!==yn)throw new Error("invert: does not exist");return Yn(s,t)}function cu(i,t,e){if(!i.eql(i.sqr(t),e))throw new Error("Cannot find square root")}function Xp(i,t){const e=(i.ORDER+yn)/Gp,n=i.pow(t,e);return cu(i,n,t),n}function mM(i,t){const e=(i.ORDER-Vp)/Wp,n=i.mul(t,Ms),s=i.pow(n,e),r=i.mul(t,s),o=i.mul(i.mul(r,Ms),s),a=i.mul(r,i.sub(o,i.ONE));return cu(i,a,t),a}function gM(i){const t=nl(i),e=$p(i),n=e(t,t.neg(t.ONE)),s=e(t,n),r=e(t,t.neg(n)),o=(i+fM)/qp;return(a,l)=>{let c=a.pow(l,o),h=a.mul(c,n);const d=a.mul(c,s),u=a.mul(c,r),f=a.eql(a.sqr(h),l),g=a.eql(a.sqr(d),l);c=a.cmov(c,h,f),h=a.cmov(u,d,g);const x=a.eql(a.sqr(h),l),m=a.cmov(c,h,x);return cu(a,m,l),m}}function $p(i){if(i<Hp)throw new Error("sqrt is not defined for small field");let t=i-yn,e=0;for(;t%Ms===An;)t/=Ms,e++;let n=Ms;const s=nl(i);for(;of(s,n)===1;)if(n++>1e3)throw new Error("Cannot find square root: probably non-prime P");if(e===1)return Xp;let r=s.pow(n,t);const o=(t+yn)/Ms;return function(l,c){if(l.is0(c))return c;if(of(l,c)!==1)throw new Error("Cannot find square root");let h=e,d=l.mul(l.ONE,r),u=l.pow(c,t),f=l.pow(c,o);for(;!l.eql(u,l.ONE);){if(l.is0(u))return l.ZERO;let g=1,x=l.sqr(u);for(;!l.eql(x,l.ONE);)if(g++,x=l.sqr(x),g===h)throw new Error("Cannot find square root");const m=yn<<BigInt(h-g-1),p=l.pow(d,m);h=g,d=l.sqr(p),u=l.mul(u,d),f=l.mul(f,p)}return f}}function xM(i){return i%Gp===Hp?Xp:i%Wp===Vp?mM:i%qp===pM?gM(i):$p(i)}const vM=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function yM(i){const t={ORDER:"bigint",BYTES:"number",BITS:"number"},e=vM.reduce((n,s)=>(n[s]="function",n),t);return lu(i,e),i}function _M(i,t,e){if(e<An)throw new Error("invalid exponent, negatives unsupported");if(e===An)return i.ONE;if(e===yn)return t;let n=i.ONE,s=t;for(;e>An;)e&yn&&(n=i.mul(n,s)),s=i.sqr(s),e>>=yn;return n}function Yp(i,t,e=!1){const n=new Array(t.length).fill(e?i.ZERO:void 0),s=t.reduce((o,a,l)=>i.is0(a)?o:(n[l]=o,i.mul(o,a)),i.ONE),r=i.inv(s);return t.reduceRight((o,a,l)=>i.is0(a)?o:(n[l]=i.mul(o,n[l]),i.mul(o,a)),r),n}function of(i,t){const e=(i.ORDER-yn)/Ms,n=i.pow(t,e),s=i.eql(n,i.ONE),r=i.eql(n,i.ZERO),o=i.eql(n,i.neg(i.ONE));if(!s&&!r&&!o)throw new Error("invalid Legendre symbol result");return s?1:r?0:-1}function bM(i,t){t!==void 0&&rs(t);const e=t!==void 0?t:i.toString(2).length,n=Math.ceil(e/8);return{nBitLength:e,nByteLength:n}}class MM{ORDER;BITS;BYTES;isLE;ZERO=An;ONE=yn;_lengths;_sqrt;_mod;constructor(t,e={}){if(t<=An)throw new Error("invalid field: expected ORDER > 0, got "+t);let n;this.isLE=!1,e!=null&&typeof e=="object"&&(typeof e.BITS=="number"&&(n=e.BITS),typeof e.sqrt=="function"&&(this.sqrt=e.sqrt),typeof e.isLE=="boolean"&&(this.isLE=e.isLE),e.allowedLengths&&(this._lengths=e.allowedLengths?.slice()),typeof e.modFromBytes=="boolean"&&(this._mod=e.modFromBytes));const{nBitLength:s,nByteLength:r}=bM(t,n);if(r>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");this.ORDER=t,this.BITS=s,this.BYTES=r,this._sqrt=void 0,Object.preventExtensions(this)}create(t){return Yn(t,this.ORDER)}isValid(t){if(typeof t!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof t);return An<=t&&t<this.ORDER}is0(t){return t===An}isValidNot0(t){return!this.is0(t)&&this.isValid(t)}isOdd(t){return(t&yn)===yn}neg(t){return Yn(-t,this.ORDER)}eql(t,e){return t===e}sqr(t){return Yn(t*t,this.ORDER)}add(t,e){return Yn(t+e,this.ORDER)}sub(t,e){return Yn(t-e,this.ORDER)}mul(t,e){return Yn(t*e,this.ORDER)}pow(t,e){return _M(this,t,e)}div(t,e){return Yn(t*rf(e,this.ORDER),this.ORDER)}sqrN(t){return t*t}addN(t,e){return t+e}subN(t,e){return t-e}mulN(t,e){return t*e}inv(t){return rf(t,this.ORDER)}sqrt(t){return this._sqrt||(this._sqrt=xM(this.ORDER)),this._sqrt(this,t)}toBytes(t){return this.isLE?zp(t,this.BYTES):ou(t,this.BYTES)}fromBytes(t,e=!1){we(t);const{_lengths:n,BYTES:s,isLE:r,ORDER:o,_mod:a}=this;if(n){if(!n.includes(t.length)||t.length>s)throw new Error("Field.fromBytes: expected "+n+" bytes, got "+t.length);const c=new Uint8Array(s);c.set(t,r?0:c.length-t.length),t=c}if(t.length!==s)throw new Error("Field.fromBytes: expected "+s+" bytes, got "+t.length);let l=r?Bp(t):uo(t);if(a&&(l=Yn(l,o)),!e&&!this.isValid(l))throw new Error("invalid field element: outside of range 0..ORDER");return l}invertBatch(t){return Yp(this,t)}cmov(t,e,n){return n?e:t}}function nl(i,t={}){return new MM(i,t)}function Kp(i){if(typeof i!="bigint")throw new Error("field order must be bigint");const t=i.toString(2).length;return Math.ceil(t/8)}function Zp(i){const t=Kp(i);return t+Math.ceil(t/2)}function Jp(i,t,e=!1){we(i);const n=i.length,s=Kp(t),r=Zp(t);if(n<16||n<r||n>1024)throw new Error("expected "+r+"-1024 bytes of input, got "+n);const o=e?Bp(i):uo(i),a=Yn(o,t-yn)+yn;return e?zp(a,s):ou(a,s)}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const mr=BigInt(0),Ss=BigInt(1);function Ga(i,t){const e=t.negate();return i?e:t}function af(i,t){const e=Yp(i.Fp,t.map(n=>n.Z));return t.map((n,s)=>i.fromAffine(n.toAffine(e[s])))}function Qp(i,t){if(!Number.isSafeInteger(i)||i<=0||i>t)throw new Error("invalid window size, expected [1.."+t+"], got W="+i)}function fc(i,t){Qp(i,t);const e=Math.ceil(t/i)+1,n=2**(i-1),s=2**i,r=au(i),o=BigInt(i);return{windows:e,windowSize:n,mask:r,maxNumber:s,shiftBy:o}}function lf(i,t,e){const{windowSize:n,mask:s,maxNumber:r,shiftBy:o}=e;let a=Number(i&s),l=i>>o;a>n&&(a-=r,l+=Ss);const c=t*n,h=c+Math.abs(a)-1,d=a===0,u=a<0,f=t%2!==0;return{nextN:l,offset:h,isZero:d,isNeg:u,isNegF:f,offsetF:c}}const pc=new WeakMap,jp=new WeakMap;function mc(i){return jp.get(i)||1}function cf(i){if(i!==mr)throw new Error("invalid wNAF")}class SM{BASE;ZERO;Fn;bits;constructor(t,e){this.BASE=t.BASE,this.ZERO=t.ZERO,this.Fn=t.Fn,this.bits=e}_unsafeLadder(t,e,n=this.ZERO){let s=t;for(;e>mr;)e&Ss&&(n=n.add(s)),s=s.double(),e>>=Ss;return n}precomputeWindow(t,e){const{windows:n,windowSize:s}=fc(e,this.bits),r=[];let o=t,a=o;for(let l=0;l<n;l++){a=o,r.push(a);for(let c=1;c<s;c++)a=a.add(o),r.push(a);o=a.double()}return r}wNAF(t,e,n){if(!this.Fn.isValid(n))throw new Error("invalid scalar");let s=this.ZERO,r=this.BASE;const o=fc(t,this.bits);for(let a=0;a<o.windows;a++){const{nextN:l,offset:c,isZero:h,isNeg:d,isNegF:u,offsetF:f}=lf(n,a,o);n=l,h?r=r.add(Ga(u,e[f])):s=s.add(Ga(d,e[c]))}return cf(n),{p:s,f:r}}wNAFUnsafe(t,e,n,s=this.ZERO){const r=fc(t,this.bits);for(let o=0;o<r.windows&&n!==mr;o++){const{nextN:a,offset:l,isZero:c,isNeg:h}=lf(n,o,r);if(n=a,!c){const d=e[l];s=s.add(h?d.negate():d)}}return cf(n),s}getPrecomputes(t,e,n){let s=pc.get(e);return s||(s=this.precomputeWindow(e,t),t!==1&&(typeof n=="function"&&(s=n(s)),pc.set(e,s))),s}cached(t,e,n){const s=mc(t);return this.wNAF(s,this.getPrecomputes(s,t,n),e)}unsafe(t,e,n,s){const r=mc(t);return r===1?this._unsafeLadder(t,e,s):this.wNAFUnsafe(r,this.getPrecomputes(r,t,n),e,s)}createCache(t,e){Qp(e,this.bits),jp.set(t,e),pc.delete(t)}hasCache(t){return mc(t)!==1}}function wM(i,t,e,n){let s=t,r=i.ZERO,o=i.ZERO;for(;e>mr||n>mr;)e&Ss&&(r=r.add(s)),n&Ss&&(o=o.add(s)),s=s.double(),e>>=Ss,n>>=Ss;return{p1:r,p2:o}}function hf(i,t,e){if(t){if(t.ORDER!==i)throw new Error("Field.ORDER must match order: Fp == p, Fn == n");return yM(t),t}else return nl(i,{isLE:e})}function EM(i,t,e={},n){if(n===void 0&&(n=i==="edwards"),!t||typeof t!="object")throw new Error(`expected valid ${i} CURVE object`);for(const l of["p","n","h"]){const c=t[l];if(!(typeof c=="bigint"&&c>mr))throw new Error(`CURVE.${l} must be positive bigint`)}const s=hf(t.p,e.Fp,n),r=hf(t.n,e.Fn,n),a=["Gx","Gy","a","b"];for(const l of a)if(!s.isValid(t[l]))throw new Error(`CURVE.${l} must be valid field element of CURVE.Fp`);return t=Object.freeze(Object.assign({},t)),{CURVE:t,Fp:s,Fn:r}}function t0(i,t){return function(n){const s=i(n);return{secretKey:s,publicKey:t(s)}}}class e0{oHash;iHash;blockLen;outputLen;finished=!1;destroyed=!1;constructor(t,e){if(el(t),we(e,void 0,"key"),this.iHash=t.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const n=this.blockLen,s=new Uint8Array(n);s.set(e.length>n?t.create().update(e).digest():e);for(let r=0;r<s.length;r++)s[r]^=54;this.iHash.update(s),this.oHash=t.create();for(let r=0;r<s.length;r++)s[r]^=106;this.oHash.update(s),no(s)}update(t){return za(this),this.iHash.update(t),this}digestInto(t){za(this),we(t,this.outputLen,"output"),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||=Object.create(Object.getPrototypeOf(this),{});const{oHash:e,iHash:n,finished:s,destroyed:r,blockLen:o,outputLen:a}=this;return t=t,t.finished=s,t.destroyed=r,t.blockLen=o,t.outputLen=a,t.oHash=e._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const fo=(i,t,e)=>new e0(i,t).update(e).digest();fo.create=(i,t)=>new e0(i,t);/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const uf=(i,t)=>(i+(i>=0?t:-t)/n0)/t;function TM(i,t,e){const[[n,s],[r,o]]=t,a=uf(o*i,e),l=uf(-s*i,e);let c=i-a*n-l*r,h=-a*s-l*o;const d=c<Pi,u=h<Pi;d&&(c=-c),u&&(h=-h);const f=au(Math.ceil(uM(e)/2))+hr;if(c<Pi||c>=f||h<Pi||h>=f)throw new Error("splitScalar (endomorphism): failed, k="+i);return{k1neg:d,k1:c,k2neg:u,k2:h}}function Eh(i){if(!["compact","recovered","der"].includes(i))throw new Error('Signature format must be "compact", "recovered", or "der"');return i}function gc(i,t){const e={};for(let n of Object.keys(t))e[n]=i[n]===void 0?t[n]:i[n];return Ha(e.lowS,"lowS"),Ha(e.prehash,"prehash"),e.format!==void 0&&Eh(e.format),e}class AM extends Error{constructor(t=""){super(t)}}const Zi={Err:AM,_tlv:{encode:(i,t)=>{const{Err:e}=Zi;if(i<0||i>256)throw new e("tlv.encode: wrong tag");if(t.length&1)throw new e("tlv.encode: unpadded data");const n=t.length/2,s=aa(n);if(s.length/2&128)throw new e("tlv.encode: long form length too big");const r=n>127?aa(s.length/2|128):"";return aa(i)+r+s+t},decode(i,t){const{Err:e}=Zi;let n=0;if(i<0||i>256)throw new e("tlv.encode: wrong tag");if(t.length<2||t[n++]!==i)throw new e("tlv.decode: wrong tlv");const s=t[n++],r=!!(s&128);let o=0;if(!r)o=s;else{const l=s&127;if(!l)throw new e("tlv.decode(long): indefinite length not supported");if(l>4)throw new e("tlv.decode(long): byte length is too big");const c=t.subarray(n,n+l);if(c.length!==l)throw new e("tlv.decode: length bytes not complete");if(c[0]===0)throw new e("tlv.decode(long): zero leftmost byte");for(const h of c)o=o<<8|h;if(n+=l,o<128)throw new e("tlv.decode(long): not minimal encoding")}const a=t.subarray(n,n+o);if(a.length!==o)throw new e("tlv.decode: wrong value length");return{v:a,l:t.subarray(n+o)}}},_int:{encode(i){const{Err:t}=Zi;if(i<Pi)throw new t("integer: negative integers are not allowed");let e=aa(i);if(Number.parseInt(e[0],16)&8&&(e="00"+e),e.length&1)throw new t("unexpected DER parsing assertion: unpadded hex");return e},decode(i){const{Err:t}=Zi;if(i[0]&128)throw new t("invalid signature integer: negative");if(i[0]===0&&!(i[1]&128))throw new t("invalid signature integer: unnecessary leading zero");return uo(i)}},toSig(i){const{Err:t,_int:e,_tlv:n}=Zi,s=we(i,void 0,"signature"),{v:r,l:o}=n.decode(48,s);if(o.length)throw new t("invalid signature: left bytes after parsing");const{v:a,l}=n.decode(2,r),{v:c,l:h}=n.decode(2,l);if(h.length)throw new t("invalid signature: left bytes after parsing");return{r:e.decode(a),s:e.decode(c)}},hexFromSig(i){const{_tlv:t,_int:e}=Zi,n=t.encode(2,e.encode(i.r)),s=t.encode(2,e.encode(i.s)),r=n+s;return t.encode(48,r)}},Pi=BigInt(0),hr=BigInt(1),n0=BigInt(2),la=BigInt(3),RM=BigInt(4);function CM(i,t={}){const e=EM("weierstrass",i,t),{Fp:n,Fn:s}=e;let r=e.CURVE;const{h:o,n:a}=r;lu(t,{},{allowInfinityPoint:"boolean",clearCofactor:"function",isTorsionFree:"function",fromBytes:"function",toBytes:"function",endo:"object"});const{endo:l}=t;if(l&&(!n.is0(r.a)||typeof l.beta!="bigint"||!Array.isArray(l.basises)))throw new Error('invalid endo: expected "beta": bigint and "basises": array');const c=s0(n,s);function h(){if(!n.isOdd)throw new Error("compression is not supported: Field does not have .isOdd()")}function d(B,S,M){const{x:C,y:I}=S.toAffine(),D=n.toBytes(C);if(Ha(M,"isCompressed"),M){h();const q=!n.isOdd(I);return Tn(i0(q),D)}else return Tn(Uint8Array.of(4),D,n.toBytes(I))}function u(B){we(B,void 0,"Point");const{publicKey:S,publicKeyUncompressed:M}=c,C=B.length,I=B[0],D=B.subarray(1);if(C===S&&(I===2||I===3)){const q=n.fromBytes(D);if(!n.isValid(q))throw new Error("bad point: is not on curve, wrong x");const O=x(q);let z;try{z=n.sqrt(O)}catch(lt){const It=lt instanceof Error?": "+lt.message:"";throw new Error("bad point: is not on curve, sqrt error"+It)}h();const $=n.isOdd(z);return(I&1)===1!==$&&(z=n.neg(z)),{x:q,y:z}}else if(C===M&&I===4){const q=n.BYTES,O=n.fromBytes(D.subarray(0,q)),z=n.fromBytes(D.subarray(q,q*2));if(!m(O,z))throw new Error("bad point: is not on curve");return{x:O,y:z}}else throw new Error(`bad point: got length ${C}, expected compressed=${S} or uncompressed=${M}`)}const f=t.toBytes||d,g=t.fromBytes||u;function x(B){const S=n.sqr(B),M=n.mul(S,B);return n.add(n.add(M,n.mul(B,r.a)),r.b)}function m(B,S){const M=n.sqr(S),C=x(B);return n.eql(M,C)}if(!m(r.Gx,r.Gy))throw new Error("bad curve params: generator point");const p=n.mul(n.pow(r.a,la),RM),y=n.mul(n.sqr(r.b),BigInt(27));if(n.is0(n.add(p,y)))throw new Error("bad curve params: a or b");function T(B,S,M=!1){if(!n.isValid(S)||M&&n.is0(S))throw new Error(`bad point coordinate ${B}`);return S}function _(B){if(!(B instanceof R))throw new Error("Weierstrass Point expected")}function E(B){if(!l||!l.basises)throw new Error("no endo");return TM(B,l.basises,s.ORDER)}const w=sf((B,S)=>{const{X:M,Y:C,Z:I}=B;if(n.eql(I,n.ONE))return{x:M,y:C};const D=B.is0();S==null&&(S=D?n.ONE:n.inv(I));const q=n.mul(M,S),O=n.mul(C,S),z=n.mul(I,S);if(D)return{x:n.ZERO,y:n.ZERO};if(!n.eql(z,n.ONE))throw new Error("invZ was invalid");return{x:q,y:O}}),P=sf(B=>{if(B.is0()){if(t.allowInfinityPoint&&!n.is0(B.Y))return;throw new Error("bad point: ZERO")}const{x:S,y:M}=B.toAffine();if(!n.isValid(S)||!n.isValid(M))throw new Error("bad point: x or y not field elements");if(!m(S,M))throw new Error("bad point: equation left != right");if(!B.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});function v(B,S,M,C,I){return M=new R(n.mul(M.X,B),M.Y,M.Z),S=Ga(C,S),M=Ga(I,M),S.add(M)}class R{static BASE=new R(r.Gx,r.Gy,n.ONE);static ZERO=new R(n.ZERO,n.ONE,n.ZERO);static Fp=n;static Fn=s;X;Y;Z;constructor(S,M,C){this.X=T("x",S),this.Y=T("y",M,!0),this.Z=T("z",C),Object.freeze(this)}static CURVE(){return r}static fromAffine(S){const{x:M,y:C}=S||{};if(!S||!n.isValid(M)||!n.isValid(C))throw new Error("invalid affine point");if(S instanceof R)throw new Error("projective point not allowed");return n.is0(M)&&n.is0(C)?R.ZERO:new R(M,C,n.ONE)}static fromBytes(S){const M=R.fromAffine(g(we(S,void 0,"point")));return M.assertValidity(),M}static fromHex(S){return R.fromBytes(Nn(S))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(S=8,M=!0){return F.createCache(this,S),M||this.multiply(la),this}assertValidity(){P(this)}hasEvenY(){const{y:S}=this.toAffine();if(!n.isOdd)throw new Error("Field doesn't support isOdd");return!n.isOdd(S)}equals(S){_(S);const{X:M,Y:C,Z:I}=this,{X:D,Y:q,Z:O}=S,z=n.eql(n.mul(M,O),n.mul(D,I)),$=n.eql(n.mul(C,O),n.mul(q,I));return z&&$}negate(){return new R(this.X,n.neg(this.Y),this.Z)}double(){const{a:S,b:M}=r,C=n.mul(M,la),{X:I,Y:D,Z:q}=this;let O=n.ZERO,z=n.ZERO,$=n.ZERO,tt=n.mul(I,I),lt=n.mul(D,D),It=n.mul(q,q),ft=n.mul(I,D);return ft=n.add(ft,ft),$=n.mul(I,q),$=n.add($,$),O=n.mul(S,$),z=n.mul(C,It),z=n.add(O,z),O=n.sub(lt,z),z=n.add(lt,z),z=n.mul(O,z),O=n.mul(ft,O),$=n.mul(C,$),It=n.mul(S,It),ft=n.sub(tt,It),ft=n.mul(S,ft),ft=n.add(ft,$),$=n.add(tt,tt),tt=n.add($,tt),tt=n.add(tt,It),tt=n.mul(tt,ft),z=n.add(z,tt),It=n.mul(D,q),It=n.add(It,It),tt=n.mul(It,ft),O=n.sub(O,tt),$=n.mul(It,lt),$=n.add($,$),$=n.add($,$),new R(O,z,$)}add(S){_(S);const{X:M,Y:C,Z:I}=this,{X:D,Y:q,Z:O}=S;let z=n.ZERO,$=n.ZERO,tt=n.ZERO;const lt=r.a,It=n.mul(r.b,la);let ft=n.mul(M,D),At=n.mul(C,q),G=n.mul(I,O),j=n.add(M,C),ht=n.add(D,q);j=n.mul(j,ht),ht=n.add(ft,At),j=n.sub(j,ht),ht=n.add(M,I);let Pt=n.add(D,O);return ht=n.mul(ht,Pt),Pt=n.add(ft,G),ht=n.sub(ht,Pt),Pt=n.add(C,I),z=n.add(q,O),Pt=n.mul(Pt,z),z=n.add(At,G),Pt=n.sub(Pt,z),tt=n.mul(lt,ht),z=n.mul(It,G),tt=n.add(z,tt),z=n.sub(At,tt),tt=n.add(At,tt),$=n.mul(z,tt),At=n.add(ft,ft),At=n.add(At,ft),G=n.mul(lt,G),ht=n.mul(It,ht),At=n.add(At,G),G=n.sub(ft,G),G=n.mul(lt,G),ht=n.add(ht,G),ft=n.mul(At,ht),$=n.add($,ft),ft=n.mul(Pt,ht),z=n.mul(j,z),z=n.sub(z,ft),ft=n.mul(j,At),tt=n.mul(Pt,tt),tt=n.add(tt,ft),new R(z,$,tt)}subtract(S){return this.add(S.negate())}is0(){return this.equals(R.ZERO)}multiply(S){const{endo:M}=t;if(!s.isValidNot0(S))throw new Error("invalid scalar: out of range");let C,I;const D=q=>F.cached(this,q,O=>af(R,O));if(M){const{k1neg:q,k1:O,k2neg:z,k2:$}=E(S),{p:tt,f:lt}=D(O),{p:It,f:ft}=D($);I=lt.add(ft),C=v(M.beta,tt,It,q,z)}else{const{p:q,f:O}=D(S);C=q,I=O}return af(R,[C,I])[0]}multiplyUnsafe(S){const{endo:M}=t,C=this;if(!s.isValid(S))throw new Error("invalid scalar: out of range");if(S===Pi||C.is0())return R.ZERO;if(S===hr)return C;if(F.hasCache(this))return this.multiply(S);if(M){const{k1neg:I,k1:D,k2neg:q,k2:O}=E(S),{p1:z,p2:$}=wM(R,C,D,O);return v(M.beta,z,$,I,q)}else return F.unsafe(C,S)}toAffine(S){return w(this,S)}isTorsionFree(){const{isTorsionFree:S}=t;return o===hr?!0:S?S(R,this):F.unsafe(this,a).is0()}clearCofactor(){const{clearCofactor:S}=t;return o===hr?this:S?S(R,this):this.multiplyUnsafe(o)}isSmallOrder(){return this.multiplyUnsafe(o).is0()}toBytes(S=!0){return Ha(S,"isCompressed"),this.assertValidity(),f(R,this,S)}toHex(S=!0){return On(this.toBytes(S))}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}}const N=s.BITS,F=new SM(R,t.endo?Math.ceil(N/2):N);return R.BASE.precompute(8),R}function i0(i){return Uint8Array.of(i?2:3)}function s0(i,t){return{secretKey:t.BYTES,publicKey:1+i.BYTES,publicKeyUncompressed:1+2*i.BYTES,publicKeyHasPrefix:!0,signature:2*t.BYTES}}function PM(i,t={}){const{Fn:e}=i,n=t.randomBytes||ho,s=Object.assign(s0(i.Fp,e),{seed:Zp(e.ORDER)});function r(f){try{const g=e.fromBytes(f);return e.isValidNot0(g)}catch{return!1}}function o(f,g){const{publicKey:x,publicKeyUncompressed:m}=s;try{const p=f.length;return g===!0&&p!==x||g===!1&&p!==m?!1:!!i.fromBytes(f)}catch{return!1}}function a(f=n(s.seed)){return Jp(we(f,s.seed,"seed"),e.ORDER)}function l(f,g=!0){return i.BASE.multiply(e.fromBytes(f)).toBytes(g)}function c(f){const{secretKey:g,publicKey:x,publicKeyUncompressed:m}=s;if(!su(f)||"_lengths"in e&&e._lengths||g===x)return;const p=we(f,void 0,"key").length;return p===x||p===m}function h(f,g,x=!0){if(c(f)===!0)throw new Error("first arg must be private key");if(c(g)===!1)throw new Error("second arg must be public key");const m=e.fromBytes(f);return i.fromBytes(g).multiply(m).toBytes(x)}const d={isValidSecretKey:r,isValidPublicKey:o,randomSecretKey:a},u=t0(a,l);return Object.freeze({getPublicKey:l,getSharedSecret:h,keygen:u,Point:i,utils:d,lengths:s})}function LM(i,t,e={}){el(t),lu(e,{},{hmac:"function",lowS:"boolean",randomBytes:"function",bits2int:"function",bits2int_modN:"function"}),e=Object.assign({},e);const n=e.randomBytes||ho,s=e.hmac||((M,C)=>fo(t,M,C)),{Fp:r,Fn:o}=i,{ORDER:a,BITS:l}=o,{keygen:c,getPublicKey:h,getSharedSecret:d,utils:u,lengths:f}=PM(i,e),g={prehash:!0,lowS:typeof e.lowS=="boolean"?e.lowS:!0,format:"compact",extraEntropy:!1},x=a*n0<r.ORDER;function m(M){const C=a>>hr;return M>C}function p(M,C){if(!o.isValidNot0(C))throw new Error(`invalid signature ${M}: out of range 1..Point.Fn.ORDER`);return C}function y(){if(x)throw new Error('"recovered" sig type is not supported for cofactor >2 curves')}function T(M,C){Eh(C);const I=f.signature,D=C==="compact"?I:C==="recovered"?I+1:void 0;return we(M,D)}class _{r;s;recovery;constructor(C,I,D){if(this.r=p("r",C),this.s=p("s",I),D!=null){if(y(),![0,1,2,3].includes(D))throw new Error("invalid recovery id");this.recovery=D}Object.freeze(this)}static fromBytes(C,I=g.format){T(C,I);let D;if(I==="der"){const{r:$,s:tt}=Zi.toSig(we(C));return new _($,tt)}I==="recovered"&&(D=C[0],I="compact",C=C.subarray(1));const q=f.signature/2,O=C.subarray(0,q),z=C.subarray(q,q*2);return new _(o.fromBytes(O),o.fromBytes(z),D)}static fromHex(C,I){return this.fromBytes(Nn(C),I)}assertRecovery(){const{recovery:C}=this;if(C==null)throw new Error("invalid recovery id: must be present");return C}addRecoveryBit(C){return new _(this.r,this.s,C)}recoverPublicKey(C){const{r:I,s:D}=this,q=this.assertRecovery(),O=q===2||q===3?I+a:I;if(!r.isValid(O))throw new Error("invalid recovery id: sig.r+curve.n != R.x");const z=r.toBytes(O),$=i.fromBytes(Tn(i0((q&1)===0),z)),tt=o.inv(O),lt=w(we(C,void 0,"msgHash")),It=o.create(-lt*tt),ft=o.create(D*tt),At=i.BASE.multiplyUnsafe(It).add($.multiplyUnsafe(ft));if(At.is0())throw new Error("invalid recovery: point at infinify");return At.assertValidity(),At}hasHighS(){return m(this.s)}toBytes(C=g.format){if(Eh(C),C==="der")return Nn(Zi.hexFromSig(this));const{r:I,s:D}=this,q=o.toBytes(I),O=o.toBytes(D);return C==="recovered"?(y(),Tn(Uint8Array.of(this.assertRecovery()),q,O)):Tn(q,O)}toHex(C){return On(this.toBytes(C))}}const E=e.bits2int||function(C){if(C.length>8192)throw new Error("input is too large");const I=uo(C),D=C.length*8-l;return D>0?I>>BigInt(D):I},w=e.bits2int_modN||function(C){return o.create(E(C))},P=au(l);function v(M){return hM("num < 2^"+l,M,Pi,P),o.toBytes(M)}function R(M,C){return we(M,void 0,"message"),C?we(t(M),void 0,"prehashed message"):M}function N(M,C,I){const{lowS:D,prehash:q,extraEntropy:O}=gc(I,g);M=R(M,q);const z=w(M),$=o.fromBytes(C);if(!o.isValidNot0($))throw new Error("invalid private key");const tt=[v($),v(z)];if(O!=null&&O!==!1){const At=O===!0?n(f.secretKey):O;tt.push(we(At,void 0,"extraEntropy"))}const lt=Tn(...tt),It=z;function ft(At){const G=E(At);if(!o.isValidNot0(G))return;const j=o.inv(G),ht=i.BASE.multiply(G).toAffine(),Pt=o.create(ht.x);if(Pt===Pi)return;const St=o.create(j*o.create(It+Pt*$));if(St===Pi)return;let qt=(ht.x===Pt?0:2)|Number(ht.y&hr),Oe=St;return D&&m(St)&&(Oe=o.neg(St),qt^=1),new _(Pt,Oe,x?void 0:qt)}return{seed:lt,k2sig:ft}}function F(M,C,I={}){const{seed:D,k2sig:q}=N(M,C,I);return dM(t.outputLen,o.BYTES,s)(D,q).toBytes(I.format)}function B(M,C,I,D={}){const{lowS:q,prehash:O,format:z}=gc(D,g);if(I=we(I,void 0,"publicKey"),C=R(C,O),!su(M)){const $=M instanceof _?", use sig.toBytes()":"";throw new Error("verify expects Uint8Array signature"+$)}T(M,z);try{const $=_.fromBytes(M,z),tt=i.fromBytes(I);if(q&&$.hasHighS())return!1;const{r:lt,s:It}=$,ft=w(C),At=o.inv(It),G=o.create(ft*At),j=o.create(lt*At),ht=i.BASE.multiplyUnsafe(G).add(tt.multiplyUnsafe(j));return ht.is0()?!1:o.create(ht.x)===lt}catch{return!1}}function S(M,C,I={}){const{prehash:D}=gc(I,g);return C=R(C,D),_.fromBytes(M,"recovered").recoverPublicKey(C).toBytes()}return Object.freeze({keygen:c,getPublicKey:h,getSharedSecret:d,utils:u,lengths:f,Point:i,sign:F,verify:B,recoverPublicKey:S,Signature:_,hash:t})}/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const il={p:BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),n:BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),h:BigInt(1),a:BigInt(0),b:BigInt(7),Gx:BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),Gy:BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")},DM={beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),basises:[[BigInt("0x3086d221a7d46bcde86c90e49284eb15"),-BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],[BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]},IM=BigInt(0),Th=BigInt(2);function NM(i){const t=il.p,e=BigInt(3),n=BigInt(6),s=BigInt(11),r=BigInt(22),o=BigInt(23),a=BigInt(44),l=BigInt(88),c=i*i*i%t,h=c*c*i%t,d=Fn(h,e,t)*h%t,u=Fn(d,e,t)*h%t,f=Fn(u,Th,t)*c%t,g=Fn(f,s,t)*f%t,x=Fn(g,r,t)*g%t,m=Fn(x,a,t)*x%t,p=Fn(m,l,t)*m%t,y=Fn(p,a,t)*x%t,T=Fn(y,e,t)*h%t,_=Fn(T,o,t)*g%t,E=Fn(_,n,t)*c%t,w=Fn(E,Th,t);if(!Va.eql(Va.sqr(w),i))throw new Error("Cannot find square root");return w}const Va=nl(il.p,{sqrt:NM}),Ls=CM(il,{Fp:Va,endo:DM}),kM=LM(Ls,os),df={};function Wa(i,...t){let e=df[i];if(e===void 0){const n=os(lM(i));e=Tn(n,n),df[i]=e}return os(Tn(e,...t))}const hu=i=>i.toBytes(!0).slice(1),uu=i=>i%Th===IM;function Ah(i){const{Fn:t,BASE:e}=Ls,n=t.fromBytes(i),s=e.multiply(n);return{scalar:uu(s.y)?n:t.neg(n),bytes:hu(s)}}function r0(i){const t=Va;if(!t.isValidNot0(i))throw new Error("invalid x: Fail if x ≥ p");const e=t.create(i*i),n=t.create(e*i+BigInt(7));let s=t.sqrt(n);uu(s)||(s=t.neg(s));const r=Ls.fromAffine({x:i,y:s});return r.assertValidity(),r}const Yr=uo;function o0(...i){return Ls.Fn.create(Yr(Wa("BIP0340/challenge",...i)))}function ff(i){return Ah(i).bytes}function UM(i,t,e=ho(32)){const{Fn:n}=Ls,s=we(i,void 0,"message"),{bytes:r,scalar:o}=Ah(t),a=we(e,32,"auxRand"),l=n.toBytes(o^Yr(Wa("BIP0340/aux",a))),c=Wa("BIP0340/nonce",l,r,s),{bytes:h,scalar:d}=Ah(c),u=o0(h,r,s),f=new Uint8Array(64);if(f.set(h,0),f.set(n.toBytes(n.create(d+u*o)),32),!a0(f,s,r))throw new Error("sign: Invalid signature produced");return f}function a0(i,t,e){const{Fp:n,Fn:s,BASE:r}=Ls,o=we(i,64,"signature"),a=we(t,void 0,"message"),l=we(e,32,"publicKey");try{const c=r0(Yr(l)),h=Yr(o.subarray(0,32));if(!n.isValidNot0(h))return!1;const d=Yr(o.subarray(32,64));if(!s.isValidNot0(d))return!1;const u=o0(s.toBytes(h),hu(c),a),f=r.multiplyUnsafe(d).add(c.multiplyUnsafe(s.neg(u))),{x:g,y:x}=f.toAffine();return!(f.is0()||!uu(x)||g!==h)}catch{return!1}}const hi=(()=>{const e=(n=ho(48))=>Jp(n,il.n);return{keygen:t0(e,ff),getPublicKey:ff,sign:UM,verify:a0,Point:Ls,utils:{randomSecretKey:e,taggedHash:Wa,lift_x:r0,pointToBytes:hu},lengths:{secretKey:32,publicKey:32,publicKeyHasPrefix:!1,signature:64,seed:48}}})();new TextDecoder("utf-8");var FM=new TextEncoder;function sr(i){try{i.indexOf("://")===-1&&(i="wss://"+i);let t=new URL(i);return t.protocol==="http:"?t.protocol="ws:":t.protocol==="https:"&&(t.protocol="wss:"),t.pathname=t.pathname.replace(/\/+/g,"/"),t.pathname.endsWith("/")&&(t.pathname=t.pathname.slice(0,-1)),(t.port==="80"&&t.protocol==="ws:"||t.port==="443"&&t.protocol==="wss:")&&(t.port=""),t.searchParams.sort(),t.hash="",t.toString()}catch{throw new Error(`Invalid URL: ${i}`)}}function OM(i){if(i.length!==64)return!1;for(let t=0;t<64;t++){let e=i.charCodeAt(t);if(isNaN(e)||e<48||e>102||e>57&&e<97)return!1}return!0}var Qs=Symbol("verified"),BM=i=>i instanceof Object;function zM(i){if(!BM(i)||typeof i.kind!="number"||typeof i.content!="string"||typeof i.created_at!="number"||typeof i.pubkey!="string"||!OM(i.pubkey)||!Array.isArray(i.tags))return!1;for(let t=0;t<i.tags.length;t++){let e=i.tags[t];if(!Array.isArray(e))return!1;for(let n=0;n<e.length;n++)if(typeof e[n]!="string")return!1}return!0}var HM=class{generateSecretKey(){return hi.utils.randomSecretKey()}getPublicKey(t){return On(hi.getPublicKey(t))}finalizeEvent(t,e){const n=t;return n.pubkey=On(hi.getPublicKey(e)),n.id=xc(n),n.sig=On(hi.sign(Nn(xc(n)),e)),n[Qs]=!0,n}verifyEvent(t){if(typeof t[Qs]=="boolean")return t[Qs];try{const e=xc(t);if(e!==t.id)return t[Qs]=!1,!1;const n=hi.verify(Nn(t.sig),Nn(e),Nn(t.pubkey));return t[Qs]=n,n}catch{return t[Qs]=!1,!1}}};function GM(i){if(!zM(i))throw new Error("can't serialize event with wrong or missing properties");return JSON.stringify([0,i.pubkey,i.created_at,i.kind,i.tags,i.content])}function xc(i){let t=os(FM.encode(GM(i)));return On(t)}var sl=new HM;sl.generateSecretKey;sl.getPublicKey;sl.finalizeEvent;var VM=sl.verifyEvent,WM=22242;function qM(i,t){if(i.ids&&i.ids.indexOf(t.id)===-1||i.kinds&&i.kinds.indexOf(t.kind)===-1||i.authors&&i.authors.indexOf(t.pubkey)===-1)return!1;for(let e in i)if(e[0]==="#"){let n=e.slice(1),s=i[`#${n}`];if(s&&!t.tags.find(([r,o])=>r===e.slice(1)&&s.indexOf(o)!==-1))return!1}return!(i.since&&t.created_at<i.since||i.until&&t.created_at>i.until)}function XM(i,t){for(let e=0;e<i.length;e++)if(qM(i[e],t))return!0;return!1}function $M(i,t){let e=t.length+3,n=i.indexOf(`"${t}":`)+e,s=i.slice(n).indexOf('"')+n+1;return i.slice(s,s+64)}function YM(i){let t=i.slice(0,22).indexOf('"EVENT"');if(t===-1)return null;let e=i.slice(t+7+1).indexOf('"');if(e===-1)return null;let n=t+7+1+e,s=i.slice(n+1,80).indexOf('"');if(s===-1)return null;let r=n+1+s;return i.slice(n+1,r)}function KM(i,t){return{kind:WM,created_at:Math.floor(Date.now()/1e3),tags:[["relay",i],["challenge",t]],content:""}}var Rh=class extends Error{constructor(i,t){super(`Tried to send message '${i} on a closed connection to ${t}.`),this.name="SendingOnClosedConnection"}},l0=class{url;_connected=!1;onclose=null;onnotice=i=>console.debug(`NOTICE from ${this.url}: ${i}`);onauth;baseEoseTimeout=4400;publishTimeout=4400;pingFrequency=29e3;pingTimeout=2e4;resubscribeBackoff=[1e4,1e4,1e4,2e4,2e4,3e4,6e4];openSubs=new Map;enablePing;enableReconnect;idleTimeout=0;idleSince=Date.now();ongoingOperations=0;reconnectTimeoutHandle;pingIntervalHandle;reconnectAttempts=0;skipReconnection=!1;idleTimeoutHandle;connectionPromise;openCountRequests=new Map;openEventPublishes=new Map;ws;challenge;authPromise;serial=0;verifyEvent;_WebSocket;constructor(i,t){this.url=sr(i),this.verifyEvent=t.verifyEvent,this._WebSocket=t.websocketImplementation||WebSocket,this.enablePing=t.enablePing,this.enableReconnect=t.enableReconnect||!1,t.idleTimeout&&(this.idleTimeout=t.idleTimeout)}static async connect(i,t){const e=new l0(i,t);return await e.connect(t),e}closeAllSubscriptions(i){for(let[t,e]of this.openSubs)e.close(i);this.openSubs.clear();for(let[t,e]of this.openEventPublishes)e.reject(new Error(i));this.openEventPublishes.clear();for(let[t,e]of this.openCountRequests)e.reject(new Error(i));this.openCountRequests.clear()}get connected(){return this._connected}clearIdleTimeout(){this.idleTimeoutHandle&&(clearTimeout(this.idleTimeoutHandle),this.idleTimeoutHandle=void 0)}scheduleIdleClose(){this.clearIdleTimeout(),this.idleTimeout>0&&(this.idleTimeoutHandle=setTimeout(()=>{this.ongoingOperations===0&&this.idleSince&&this.close()},this.idleTimeout))}async reconnect(){const i=this.resubscribeBackoff[Math.min(this.reconnectAttempts,this.resubscribeBackoff.length-1)];this.reconnectAttempts++,this.reconnectTimeoutHandle=setTimeout(async()=>{try{await this.connect()}catch{}},i)}handleHardClose(i){this.ws&&(this.ws.onopen=null,this.ws.onerror=null,this.ws.onclose=null),this.pingIntervalHandle&&(clearInterval(this.pingIntervalHandle),this.pingIntervalHandle=void 0),this._connected=!1,this.connectionPromise=void 0,this.idleSince=void 0,this.clearIdleTimeout(),this.enableReconnect&&!this.skipReconnection?this.reconnect():(this.onclose?.(),this.closeAllSubscriptions(i))}async connect(i){let t;return this.connectionPromise?this.connectionPromise:(this.challenge=void 0,this.authPromise=void 0,this.skipReconnection=!1,this.connectionPromise=new Promise((e,n)=>{i?.timeout&&(t=setTimeout(()=>{n("connection timed out"),this.connectionPromise=void 0,this.reconnectAttempts===0&&(this.skipReconnection=!0),this.ws?.close?.(),this.handleHardClose("relay connection timed out")},i.timeout)),i?.abort&&(i.abort.onabort=n);try{this.ws=new this._WebSocket(this.url)}catch(s){clearTimeout(t),n(s);return}this.ws.onopen=()=>{this.reconnectTimeoutHandle&&(clearTimeout(this.reconnectTimeoutHandle),this.reconnectTimeoutHandle=void 0),clearTimeout(t),this._connected=!0;const s=this.reconnectAttempts>0;this.reconnectAttempts=0;for(const r of this.openSubs.values()){if(r.eosed=!1,s)for(let o=0;o<r.filters.length;o++)r.lastEmitted&&(r.filters[o].since=r.lastEmitted+1);r.fire()}this.enablePing&&(this.pingIntervalHandle=setInterval(()=>this.pingpong(),this.pingFrequency)),e()},this.ws.onerror=()=>{clearTimeout(t),n("connection failed"),this.connectionPromise=void 0,this.reconnectAttempts===0&&(this.skipReconnection=!0),this.ws?.close?.(),this.handleHardClose("relay connection failed")},this.ws.onclose=s=>{clearTimeout(t),n(s.message||"websocket closed"),this.handleHardClose("relay connection closed")},this.ws.onmessage=this._onmessage.bind(this)}),this.connectionPromise)}waitForPingPong(){return new Promise(i=>{this.ws.once("pong",()=>i(!0)),this.ws.ping()})}waitForDummyReq(){return new Promise((i,t)=>{if(!this.connectionPromise)return t(new Error(`no connection to ${this.url}, can't ping`));try{const e=this.subscribe([{ids:["aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],limit:1}],{label:"<forced-ping>",oneose:()=>{i(!0),e.close()},onclose(){i(!0)},eoseTimeout:this.pingTimeout+1e3})}catch(e){t(e)}})}async pingpong(){this.ws?.readyState===1&&(await Promise.any([this.ws&&this.ws.ping&&this.ws.once?this.waitForPingPong():this.waitForDummyReq(),new Promise(t=>setTimeout(()=>t(!1),this.pingTimeout))])||this.ws?.readyState===this._WebSocket.OPEN&&this.ws?.close())}async send(i){if(!this.connectionPromise)throw new Rh(i,this.url);this.connectionPromise.then(()=>{this.ws?.send(i)})}async auth(i){const t=this.challenge;if(!t)throw new Error("can't perform auth, no challenge was received");return this.authPromise?this.authPromise:(this.authPromise=new Promise(async(e,n)=>{try{let s=await i(KM(this.url,t)),r=setTimeout(()=>{let o=this.openEventPublishes.get(s.id);o&&(o.reject(new Error("auth timed out")),this.openEventPublishes.delete(s.id))},this.publishTimeout);this.openEventPublishes.set(s.id,{resolve:e,reject:n,timeout:r}),this.send('["AUTH",'+JSON.stringify(s)+"]")}catch(s){console.warn("subscribe auth function failed:",s)}}),this.authPromise)}async publish(i){this.idleSince=void 0,this.clearIdleTimeout(),this.ongoingOperations++;const t=new Promise((e,n)=>{const s=setTimeout(()=>{const r=this.openEventPublishes.get(i.id);r&&(r.reject(new Error("publish timed out")),this.openEventPublishes.delete(i.id))},this.publishTimeout);this.openEventPublishes.set(i.id,{resolve:e,reject:n,timeout:s})});try{await this.send('["EVENT",'+JSON.stringify(i)+"]")}catch(e){const n=this.openEventPublishes.get(i.id);n&&(n.reject(e),this.openEventPublishes.delete(i.id))}return this.ongoingOperations--,this.ongoingOperations===0&&(this.idleSince=Date.now(),this.scheduleIdleClose()),t}async count(i,t){return(await this.countWithHLL(i,t)).count}async countWithHLL(i,t){this.serial++;const e=t?.id||"count:"+this.serial,n=new Promise((s,r)=>{this.openCountRequests.set(e,{resolve:s,reject:r})});try{await this.send('["COUNT","'+e+'",'+JSON.stringify(i).substring(1))}catch(s){const r=this.openCountRequests.get(e);r&&(r.reject(s),this.openCountRequests.delete(e))}return n}subscribe(i,t){t.label!=="<forced-ping>"&&(this.idleSince=void 0,this.clearIdleTimeout(),this.ongoingOperations++);const e=this.prepareSubscription(i,t);return e.fire(),t.abort&&(t.abort.onabort=()=>e.close(String(t.abort.reason||"<aborted>"))),e}prepareSubscription(i,t){this.serial++;const e=t.id||(t.label?t.label+":":"sub:")+this.serial,n=new ZM(this,e,i,t);return this.openSubs.set(e,n),n}close(){this.skipReconnection=!0,this.reconnectTimeoutHandle&&(clearTimeout(this.reconnectTimeoutHandle),this.reconnectTimeoutHandle=void 0),this.pingIntervalHandle&&(clearInterval(this.pingIntervalHandle),this.pingIntervalHandle=void 0),this.closeAllSubscriptions("relay connection closed by us"),this._connected=!1,this.connectionPromise=void 0,this.idleSince=void 0,this.clearIdleTimeout(),this.onclose?.(),this.ws&&(this.ws.onopen=null,this.ws.onerror=null,this.ws.onclose=null,this.ws.readyState!==this._WebSocket.CLOSING&&this.ws.readyState!==this._WebSocket.CLOSED&&this.ws.close())}_onmessage(i){const t=i.data;if(!t)return;const e=YM(t);if(e){const n=this.openSubs.get(e);if(!n)return;const s=$M(t,"id"),r=n.alreadyHaveEvent?.(s);if(n.receivedEvent?.(this,s),r)return}try{let n=JSON.parse(t);switch(n[0]){case"EVENT":{const s=this.openSubs.get(n[1]),r=n[2];XM(s.filters,r)&&this.verifyEvent(r,this.url)?s.onevent(r):s.oninvalidevent?.(r),(!s.lastEmitted||s.lastEmitted<r.created_at)&&(s.lastEmitted=r.created_at);return}case"COUNT":{const s=n[1],r=n[2],o=this.openCountRequests.get(s);o&&(o.resolve(r),this.openCountRequests.delete(s));return}case"EOSE":{const s=this.openSubs.get(n[1]);if(!s)return;s.receivedEose();return}case"OK":{const s=n[1],r=n[2],o=n[3],a=this.openEventPublishes.get(s);a&&(clearTimeout(a.timeout),r?a.resolve(o):a.reject(new Error(o)),this.openEventPublishes.delete(s));return}case"CLOSED":{const s=n[1],r=this.openSubs.get(s);if(!r){const o=this.openCountRequests.get(s);o&&(o.reject(new Error(n[2])),this.openCountRequests.delete(s));return}r.closed=!0,r.close(n[2]);return}case"NOTICE":{this.onnotice(n[1]);return}case"AUTH":{this.challenge=n[1],this.onauth&&this.auth(this.onauth).catch(s=>{if(!(s instanceof Rh))throw s});return}default:{this.openSubs.get(n[1])?.oncustom?.(n);return}}}catch(n){try{const[s,r,o]=JSON.parse(t);console.warn(`[nostr] relay ${this.url} error processing message:`,n,o)}catch{console.warn(`[nostr] relay ${this.url} error processing message:`,n)}return}}},ZM=class{relay;id;lastEmitted;closed=!1;eosed=!1;filters;alreadyHaveEvent;receivedEvent;onevent;oninvalidevent;oneose;onclose;oncustom;eoseTimeout;eoseTimeoutHandle;constructor(i,t,e,n){if(e.length===0)throw new Error("subscription can't be created with zero filters");this.relay=i,this.filters=e,this.id=t,this.alreadyHaveEvent=n.alreadyHaveEvent,this.receivedEvent=n.receivedEvent,this.eoseTimeout=n.eoseTimeout||i.baseEoseTimeout,this.oneose=n.oneose,this.onclose=n.onclose,this.oninvalidevent=n.oninvalidevent,this.onevent=n.onevent||(s=>{console.warn(`onevent() callback not defined for subscription '${this.id}' in relay ${this.relay.url}. event received:`,s)})}fire(){this.relay.send('["REQ","'+this.id+'",'+JSON.stringify(this.filters).substring(1)),this.eoseTimeoutHandle=setTimeout(this.receivedEose.bind(this),this.eoseTimeout)}receivedEose(){this.eosed||(clearTimeout(this.eoseTimeoutHandle),this.eosed=!0,this.oneose?.())}close(i="closed by caller"){if(!this.closed&&this.relay.connected){try{this.relay.send('["CLOSE",'+JSON.stringify(this.id)+"]")}catch(t){if(!(t instanceof Rh))throw t}this.closed=!0}this.relay.openSubs.delete(this.id),this.id.startsWith("<forced-ping>")||(this.relay.ongoingOperations--,this.relay.ongoingOperations===0&&(this.relay.idleSince=Date.now(),this.relay.scheduleIdleClose())),this.onclose?.(i)}},Ni=256,JM=Ni*2;new TextEncoder;function QM(i,t){switch(t){case"reactions":return{"#e":[i],kinds:[7]};case"reposts":return{"#e":[i],kinds:[6]};case"quotes":return{"#q":[i],kinds:[1,1111]};case"replies":return{"#e":[i],kinds:[1]};case"comments":return{"#E":[i],kinds:[1111]};case"followers":return{"#p":[i],kinds:[3]}}}function jM(){return new Uint8Array(Ni)}function tS(i){if(i.length!==JM||!/^[0-9a-f]+$/.test(i))return;const t=new Uint8Array(Ni);for(let e=0;e<Ni;e++)t[e]=parseInt(i.slice(e*2,e*2+2),16);return t}function eS(i){if(i.length!==Ni)throw new Error(`invalid number of registers ${i.length}`);let t="";for(let e=0;e<Ni;e++)t+=i[e].toString(16).padStart(2,"0");return t}function nS(i,t){if(i.length===0&&(i=jM()),i.length!==Ni)throw new Error(`invalid number of registers ${i.length}`);if(t.length!==Ni)throw new Error(`invalid number of registers ${t.length}`);for(let e=0;e<Ni;e++)t[e]>i[e]&&(i[e]=t[e]);return i}var iS=class{relays=new Map;seenOn=new Map;trackRelays=!1;verifyEvent;enablePing;enableReconnect;idleTimeout=2e4;automaticallyAuth;onRelayConnectionFailure;onRelayConnectionSuccess;allowConnectingToRelay;maxWaitForConnection;_WebSocket;constructor(i){this.verifyEvent=i.verifyEvent,this._WebSocket=i.websocketImplementation,this.enablePing=i.enablePing,this.enableReconnect=i.enableReconnect||!1,i.idleTimeout&&(this.idleTimeout=i.idleTimeout),this.automaticallyAuth=i.automaticallyAuth,this.onRelayConnectionFailure=i.onRelayConnectionFailure,this.onRelayConnectionSuccess=i.onRelayConnectionSuccess,this.allowConnectingToRelay=i.allowConnectingToRelay,this.maxWaitForConnection=i.maxWaitForConnection||3e3}async ensureRelay(i,t){i=sr(i);let e=this.relays.get(i);if(e||(e=new l0(i,{verifyEvent:this.verifyEvent,websocketImplementation:this._WebSocket,enablePing:this.enablePing,enableReconnect:this.enableReconnect,idleTimeout:this.idleTimeout}),e.onclose=()=>{this.relays.delete(i)},this.relays.set(i,e)),this.automaticallyAuth){const n=this.automaticallyAuth(i);n&&(e.onauth=n)}try{await e.connect({timeout:t?.connectionTimeout,abort:t?.abort})}catch(n){throw this.relays.delete(i),n}return e}close(i){i.map(sr).forEach(t=>{this.relays.get(t)?.close(),this.relays.delete(t)})}subscribe(i,t,e){const n=[],s=[];for(let r=0;r<i.length;r++){const o=sr(i[r]);n.find(a=>a.url===o)||s.indexOf(o)===-1&&(s.push(o),n.push({url:o,filter:t}))}return this.subscribeMap(n,e)}subscribeMany(i,t,e){return this.subscribe(i,t,e)}subscribeMap(i,t){const e=new Map;for(const u of i){const{url:f,filter:g}=u;e.has(f)||e.set(f,[]),e.get(f).push(g)}const n=Array.from(e.entries()).map(([u,f])=>({url:u,filters:f}));this.trackRelays&&(t.receivedEvent=(u,f)=>{let g=this.seenOn.get(f);g||(g=new Set,this.seenOn.set(f,g)),g.add(u)});const s=new Set,r=[],o=[];let a=u=>{o[u]||(o[u]=!0,o.filter(f=>f).length===n.length&&(t.oneose?.(),a=()=>{}))};const l=[];let c=(u,f,g)=>{l[u]||(a(u),l[u]={url:f,reason:g},l.filter(x=>x).length===n.length&&(t.onclose?.(l),c=()=>{}))};const h=u=>{if(t.alreadyHaveEvent?.(u))return!0;const f=s.has(u);return s.add(u),f},d=Promise.all(n.map(async({url:u,filters:f},g)=>{if(this.allowConnectingToRelay?.(u,["read",f])===!1){c(g,u,"connection skipped by allowConnectingToRelay");return}let x;try{x=await this.ensureRelay(u,{connectionTimeout:this.maxWaitForConnection<(t.maxWait||0)?Math.max(t.maxWait*.8,t.maxWait-1e3):this.maxWaitForConnection,abort:t.abort})}catch(p){this.onRelayConnectionFailure?.(u),c(g,u,p?.message||String(p));return}this.onRelayConnectionSuccess?.(u);let m=x.subscribe(f,{...t,oneose:()=>a(g),onclose:p=>{p.startsWith("auth-required: ")&&t.onauth?x.auth(t.onauth).then(()=>{x.subscribe(f,{...t,oneose:()=>a(g),onclose:y=>{c(g,u,y)},alreadyHaveEvent:h,eoseTimeout:t.maxWait,abort:t.abort})}).catch(y=>{c(g,u,`auth was required and attempted, but failed with: ${y}`)}):c(g,u,p)},alreadyHaveEvent:h,eoseTimeout:t.maxWait,abort:t.abort});r.push(m)}));return{async close(u){await d,r.forEach(f=>{f.close(u)})}}}subscribeEose(i,t,e){let n;return n=this.subscribe(i,t,{...e,oneose(){const s="closed automatically on eose";n?n.close(s):e.onclose?.(i.map(r=>({url:r,reason:s})))}}),n}subscribeManyEose(i,t,e){return this.subscribeEose(i,t,e)}async querySync(i,t,e){return new Promise(async n=>{const s=[];this.subscribeEose(i,t,{...e,onevent(r){s.push(r)},onclose(r){n(s)}})})}async get(i,t,e){t.limit=1;const n=await this.querySync(i,t,e);return n.sort((s,r)=>r.created_at-s.created_at),n[0]||null}async countMany(i,t,e,n){const s=QM(t,e),r=[];for(let c=0;c<i.length;c++){const h=sr(i[c]);r.indexOf(h)===-1&&r.push(h)}const o=await Promise.all(r.map(async c=>{if(this.allowConnectingToRelay?.(c,["read",[s]])===!1)return null;let h;try{h=await this.ensureRelay(c,{connectionTimeout:this.maxWaitForConnection<(n?.maxWait||0)?Math.max(n.maxWait*.8,n.maxWait-1e3):this.maxWaitForConnection,abort:n?.abort})}catch{return this.onRelayConnectionFailure?.(c),null}return this.onRelayConnectionSuccess?.(c),h.countWithHLL([s],{id:n?.id}).catch(()=>null)}));let a=0,l;for(const c of o){if(!c||(c.count>a&&(a=c.count),!c.hll||c.hll.length!==512))continue;const h=tS(c.hll);h&&(l=nS(l||new Uint8Array(0),h))}return l?{count:a,hll:eS(l)}:{count:a}}publish(i,t,e){return i.map(sr).map(async(n,s,r)=>{if(r.indexOf(n)!==s)return Promise.reject("duplicate url");if(this.allowConnectingToRelay?.(n,["write",t])===!1)return Promise.reject("connection skipped by allowConnectingToRelay");let o;try{o=await this.ensureRelay(n,{connectionTimeout:this.maxWaitForConnection<(e?.maxWait||0)?Math.max(e.maxWait*.8,e.maxWait-1e3):this.maxWaitForConnection,abort:e?.abort})}catch(a){return this.onRelayConnectionFailure?.(n),Promise.reject("connection failure: "+String(a))}return o.publish(t).catch(async a=>{if(a instanceof Error&&a.message.startsWith("auth-required: ")&&e?.onauth)return await o.auth(e.onauth),o.publish(t);throw a}).then(a=>{if(this.trackRelays){let l=this.seenOn.get(t.id);l||(l=new Set,this.seenOn.set(t.id,l)),l.add(o)}return a})})}listConnectionStatus(){const i=new Map;return this.relays.forEach((t,e)=>i.set(e,t.connected)),i}destroy(){this.relays.forEach(i=>i.close()),this.relays=new Map}pruneIdleRelays(i=1e4){const t=[];for(const[e,n]of this.relays)n.idleSince&&Date.now()-n.idleSince>=i&&(this.relays.delete(e),t.push(e),n.close());return t}},c0;try{c0=WebSocket}catch{}var sS=class extends iS{constructor(i){super({verifyEvent:VM,websocketImplementation:c0,maxWaitForConnection:3e3,...i})}};new TextDecoder("utf-8");var rS=new TextEncoder;function oS(i){if(i.length!==64)return!1;for(let t=0;t<64;t++){let e=i.charCodeAt(t);if(isNaN(e)||e<48||e>102||e>57&&e<97)return!1}return!0}var js=Symbol("verified"),aS=i=>i instanceof Object;function lS(i){if(!aS(i)||typeof i.kind!="number"||typeof i.content!="string"||typeof i.created_at!="number"||typeof i.pubkey!="string"||!oS(i.pubkey)||!Array.isArray(i.tags))return!1;for(let t=0;t<i.tags.length;t++){let e=i.tags[t];if(!Array.isArray(e))return!1;for(let n=0;n<e.length;n++)if(typeof e[n]!="string")return!1}return!0}var cS=class{generateSecretKey(){return hi.utils.randomSecretKey()}getPublicKey(i){return On(hi.getPublicKey(i))}finalizeEvent(i,t){const e=i;return e.pubkey=On(hi.getPublicKey(t)),e.id=vc(e),e.sig=On(hi.sign(Nn(vc(e)),t)),e[js]=!0,e}verifyEvent(i){if(typeof i[js]=="boolean")return i[js];try{const t=vc(i);if(t!==i.id)return i[js]=!1,!1;const e=hi.verify(Nn(i.sig),Nn(t),Nn(i.pubkey));return i[js]=e,e}catch{return i[js]=!1,!1}}};function hS(i){if(!lS(i))throw new Error("can't serialize event with wrong or missing properties");return JSON.stringify([0,i.pubkey,i.created_at,i.kind,i.tags,i.content])}function vc(i){let t=os(rS.encode(hS(i)));return On(t)}var rl=new cS,uS=rl.generateSecretKey,dS=rl.getPublicKey,pf=rl.finalizeEvent;rl.verifyEvent;/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */function fS(i){return i instanceof Uint8Array||ArrayBuffer.isView(i)&&i.constructor.name==="Uint8Array"}function mf(i){if(typeof i!="boolean")throw new Error(`boolean expected, not ${i}`)}function yc(i){if(!Number.isSafeInteger(i)||i<0)throw new Error("positive integer expected, got "+i)}function Or(i,t,e=""){const n=fS(i),s=i?.length,r=t!==void 0;if(!n||r&&s!==t){const o=e&&`"${e}" `,a=r?` of length ${t}`:"",l=n?`length=${s}`:`type=${typeof i}`;throw new Error(o+"expected Uint8Array"+a+", got "+l)}return i}function ns(i){return new Uint32Array(i.buffer,i.byteOffset,Math.floor(i.byteLength/4))}function pS(...i){for(let t=0;t<i.length;t++)i[t].fill(0)}function mS(i,t){if(t==null||typeof t!="object")throw new Error("options must be defined");return Object.assign(i,t)}function gS(i,t){if(i.length!==t.length)return!1;let e=0;for(let n=0;n<i.length;n++)e|=i[n]^t[n];return e===0}function gf(i){return Uint8Array.from(i)}const h0=i=>Uint8Array.from(i.split(""),t=>t.charCodeAt(0)),xS=h0("expand 16-byte k"),vS=h0("expand 32-byte k"),yS=ns(xS),_S=ns(vS);function ae(i,t){return i<<t|i>>>32-t}function Ch(i){return i.byteOffset%4===0}const ca=64,bS=16,u0=2**32-1,xf=Uint32Array.of();function MS(i,t,e,n,s,r,o,a){const l=s.length,c=new Uint8Array(ca),h=ns(c),d=Ch(s)&&Ch(r),u=d?ns(s):xf,f=d?ns(r):xf;for(let g=0;g<l;o++){if(i(t,e,n,h,o,a),o>=u0)throw new Error("arx: counter overflow");const x=Math.min(ca,l-g);if(d&&x===ca){const m=g/4;if(g%4!==0)throw new Error("arx: invalid block position");for(let p=0,y;p<bS;p++)y=m+p,f[y]=u[y]^h[p];g+=ca;continue}for(let m=0,p;m<x;m++)p=g+m,r[p]=s[p]^c[m];g+=x}}function SS(i,t){const{allowShortKeys:e,extendNonceFn:n,counterLength:s,counterRight:r,rounds:o}=mS({allowShortKeys:!1,counterLength:8,counterRight:!1,rounds:20},t);if(typeof i!="function")throw new Error("core must be a function");return yc(s),yc(o),mf(r),mf(e),(a,l,c,h,d=0)=>{Or(a,void 0,"key"),Or(l,void 0,"nonce"),Or(c,void 0,"data");const u=c.length;if(h===void 0&&(h=new Uint8Array(u)),Or(h,void 0,"output"),yc(d),d<0||d>=u0)throw new Error("arx: counter overflow");if(h.length<u)throw new Error(`arx: output (${h.length}) is shorter than data (${u})`);const f=[];let g=a.length,x,m;if(g===32)f.push(x=gf(a)),m=_S;else if(g===16&&e)x=new Uint8Array(32),x.set(a),x.set(a,16),m=yS,f.push(x);else throw Or(a,32,"arx key"),new Error("invalid key size");Ch(l)||f.push(l=gf(l));const p=ns(x);if(n){if(l.length!==24)throw new Error("arx: extended nonce must be 24 bytes");n(m,p,ns(l.subarray(0,16)),p),l=l.subarray(16)}const y=16-s;if(y!==l.length)throw new Error(`arx: nonce must be ${y} or 16 bytes`);if(y!==12){const _=new Uint8Array(12);_.set(l,r?0:12-l.length),l=_,f.push(l)}const T=ns(l);return MS(i,m,p,T,c,h,d,o),pS(...f),h}}function wS(i,t,e,n,s,r=20){let o=i[0],a=i[1],l=i[2],c=i[3],h=t[0],d=t[1],u=t[2],f=t[3],g=t[4],x=t[5],m=t[6],p=t[7],y=s,T=e[0],_=e[1],E=e[2],w=o,P=a,v=l,R=c,N=h,F=d,B=u,S=f,M=g,C=x,I=m,D=p,q=y,O=T,z=_,$=E;for(let lt=0;lt<r;lt+=2)w=w+N|0,q=ae(q^w,16),M=M+q|0,N=ae(N^M,12),w=w+N|0,q=ae(q^w,8),M=M+q|0,N=ae(N^M,7),P=P+F|0,O=ae(O^P,16),C=C+O|0,F=ae(F^C,12),P=P+F|0,O=ae(O^P,8),C=C+O|0,F=ae(F^C,7),v=v+B|0,z=ae(z^v,16),I=I+z|0,B=ae(B^I,12),v=v+B|0,z=ae(z^v,8),I=I+z|0,B=ae(B^I,7),R=R+S|0,$=ae($^R,16),D=D+$|0,S=ae(S^D,12),R=R+S|0,$=ae($^R,8),D=D+$|0,S=ae(S^D,7),w=w+F|0,$=ae($^w,16),I=I+$|0,F=ae(F^I,12),w=w+F|0,$=ae($^w,8),I=I+$|0,F=ae(F^I,7),P=P+B|0,q=ae(q^P,16),D=D+q|0,B=ae(B^D,12),P=P+B|0,q=ae(q^P,8),D=D+q|0,B=ae(B^D,7),v=v+S|0,O=ae(O^v,16),M=M+O|0,S=ae(S^M,12),v=v+S|0,O=ae(O^v,8),M=M+O|0,S=ae(S^M,7),R=R+N|0,z=ae(z^R,16),C=C+z|0,N=ae(N^C,12),R=R+N|0,z=ae(z^R,8),C=C+z|0,N=ae(N^C,7);let tt=0;n[tt++]=o+w|0,n[tt++]=a+P|0,n[tt++]=l+v|0,n[tt++]=c+R|0,n[tt++]=h+N|0,n[tt++]=d+F|0,n[tt++]=u+B|0,n[tt++]=f+S|0,n[tt++]=g+M|0,n[tt++]=x+C|0,n[tt++]=m+I|0,n[tt++]=p+D|0,n[tt++]=y+q|0,n[tt++]=T+O|0,n[tt++]=_+z|0,n[tt++]=E+$|0}const d0=SS(wS,{counterRight:!1,counterLength:4,allowShortKeys:!1});function ES(i,t,e){return el(i),e===void 0&&(e=new Uint8Array(i.outputLen)),fo(i,e,t)}const _c=Uint8Array.of(0),vf=Uint8Array.of();function TS(i,t,e,n=32){el(i),rs(n,"length");const s=i.outputLen;if(n>255*s)throw new Error("Length must be <= 255*HashLen");const r=Math.ceil(n/s);e===void 0?e=vf:we(e,void 0,"info");const o=new Uint8Array(r*s),a=fo.create(i,t),l=a._cloneInto(),c=new Uint8Array(a.outputLen);for(let h=0;h<r;h++)_c[0]=h+1,l.update(h===0?vf:c).update(e).update(_c).digestInto(c),o.set(c,s*h),a._cloneInto(l);return a.destroy(),l.destroy(),no(c,_c),o.slice(0,n)}/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */function f0(i){return i instanceof Uint8Array||ArrayBuffer.isView(i)&&i.constructor.name==="Uint8Array"}function AS(i){if(!f0(i))throw new Error("Uint8Array expected")}function p0(i,t){return Array.isArray(t)?t.length===0?!0:i?t.every(e=>typeof e=="string"):t.every(e=>Number.isSafeInteger(e)):!1}function io(i,t){if(typeof t!="string")throw new Error(`${i}: string expected`);return!0}function du(i){if(!Number.isSafeInteger(i))throw new Error(`invalid integer: ${i}`)}function Ph(i){if(!Array.isArray(i))throw new Error("array expected")}function qa(i,t){if(!p0(!0,t))throw new Error(`${i}: array of strings expected`)}function RS(i,t){if(!p0(!1,t))throw new Error(`${i}: array of numbers expected`)}function CS(...i){const t=r=>r,e=(r,o)=>a=>r(o(a)),n=i.map(r=>r.encode).reduceRight(e,t),s=i.map(r=>r.decode).reduce(e,t);return{encode:n,decode:s}}function PS(i){const t=typeof i=="string"?i.split(""):i,e=t.length;qa("alphabet",t);const n=new Map(t.map((s,r)=>[s,r]));return{encode:s=>(Ph(s),s.map(r=>{if(!Number.isSafeInteger(r)||r<0||r>=e)throw new Error(`alphabet.encode: digit index outside alphabet "${r}". Allowed: ${i}`);return t[r]})),decode:s=>(Ph(s),s.map(r=>{io("alphabet.decode",r);const o=n.get(r);if(o===void 0)throw new Error(`Unknown letter: "${r}". Allowed: ${i}`);return o}))}}function LS(i=""){return io("join",i),{encode:t=>(qa("join.decode",t),t.join(i)),decode:t=>(io("join.decode",t),t.split(i))}}function DS(i,t="="){return du(i),io("padding",t),{encode(e){for(qa("padding.encode",e);e.length*i%8;)e.push(t);return e},decode(e){qa("padding.decode",e);let n=e.length;if(n*i%8)throw new Error("padding: invalid, string should have whole number of bytes");for(;n>0&&e[n-1]===t;n--)if((n-1)*i%8===0)throw new Error("padding: invalid, string has too much padding");return e.slice(0,n)}}}const m0=(i,t)=>t===0?i:m0(t,i%t),Xa=(i,t)=>i+(t-m0(i,t)),bc=(()=>{let i=[];for(let t=0;t<40;t++)i.push(2**t);return i})();function yf(i,t,e,n){if(Ph(i),t<=0||t>32)throw new Error(`convertRadix2: wrong from=${t}`);if(e<=0||e>32)throw new Error(`convertRadix2: wrong to=${e}`);if(Xa(t,e)>32)throw new Error(`convertRadix2: carry overflow from=${t} to=${e} carryBits=${Xa(t,e)}`);let s=0,r=0;const o=bc[t],a=bc[e]-1,l=[];for(const c of i){if(du(c),c>=o)throw new Error(`convertRadix2: invalid data word=${c} from=${t}`);if(s=s<<t|c,r+t>32)throw new Error(`convertRadix2: carry overflow pos=${r} from=${t}`);for(r+=t;r>=e;r-=e)l.push((s>>r-e&a)>>>0);const h=bc[r];if(h===void 0)throw new Error("invalid carry");s&=h-1}if(s=s<<e-r&a,!n&&r>=t)throw new Error("Excess padding");if(!n&&s>0)throw new Error(`Non-zero padding: ${s}`);return n&&r>0&&l.push(s>>>0),l}function IS(i,t=!1){if(du(i),i<=0||i>32)throw new Error("radix2: bits should be in (0..32]");if(Xa(8,i)>32||Xa(i,8)>32)throw new Error("radix2: carry overflow");return{encode:e=>{if(!f0(e))throw new Error("radix2.encode input should be Uint8Array");return yf(Array.from(e),8,i,!t)},decode:e=>(RS("radix2.decode",e),Uint8Array.from(yf(e,i,8,t)))}}const NS=typeof Uint8Array.from([]).toBase64=="function"&&typeof Uint8Array.fromBase64=="function",kS=(i,t)=>{io("base64",i);const e=/^[A-Za-z0-9=+/]+$/,n="base64";if(i.length>0&&!e.test(i))throw new Error("invalid base64");return Uint8Array.fromBase64(i,{alphabet:n,lastChunkHandling:"strict"})},g0=NS?{encode(i){return AS(i),i.toBase64()},decode(i){return kS(i)}}:CS(IS(6),PS("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),DS(6),LS(""));var US=new TextDecoder("utf-8"),x0=new TextEncoder,fu=1,pu=4294967295,mu=65536;function FS(i,t){const e=kM.getSharedSecret(i,Nn("02"+t)).subarray(1,33);return ES(os,e,x0.encode("nip44-v2"))}function v0(i,t){const e=TS(os,i,t,76);return{chacha_key:e.subarray(0,32),chacha_nonce:e.subarray(32,44),hmac_key:e.subarray(44,76)}}function y0(i){if(!Number.isSafeInteger(i)||i<1)throw new Error("expected positive integer");if(i<=32)return 32;const t=2**(Math.floor(Math.log2(i-1))+1),e=t<=256?32:t/8;return e*(Math.floor((i-1)/e)+1)}function OS(i){if(!Number.isSafeInteger(i)||i<fu||i>65535)throw new Error("invalid plaintext size: must be between 1 and 65535 bytes");const t=new Uint8Array(2);return new DataView(t.buffer).setUint16(0,i,!1),t}function BS(i){if(!Number.isSafeInteger(i)||i<mu||i>pu)throw new Error("invalid plaintext size: must be between 65536 and 4294967295 bytes");const t=new Uint8Array(4);return new DataView(t.buffer).setUint32(0,i,!1),t}function zS(i){const t=x0.encode(i),e=t.length;if(e<fu||e>pu)throw new Error("invalid plaintext size: must be between 1 and 4294967295 bytes");const n=e>=mu?Tn(new Uint8Array([0,0]),BS(e)):OS(e),s=new Uint8Array(y0(e)-e);return Tn(n,t,s)}function HS(i){const t=new DataView(i.buffer,i.byteOffset,i.byteLength),e=t.getUint16(0);let n,s;if(e===0){if(n=t.getUint32(2),n<mu)throw new Error("invalid padding");s=6}else n=e,s=2;const r=i.subarray(s,s+n);if(n<fu||n>pu||r.length!==n||i.length!==s+y0(n))throw new Error("invalid padding");return US.decode(r)}function _0(i,t,e){if(e.length!==32)throw new Error("AAD associated data must be 32 bytes");const n=Tn(e,t);return fo(os,i,n)}function GS(i){if(typeof i!="string")throw new Error("payload must be a valid string");const t=i.length;if(t<132)throw new Error("invalid payload length: "+t);if(i[0]==="#")throw new Error("unknown encryption version");let e;try{e=g0.decode(i)}catch(r){throw new Error("invalid base64: "+r.message)}const n=e.length;if(n<99)throw new Error("invalid data length: "+n);const s=e[0];if(s!==2)throw new Error("unknown encryption version "+s);return{nonce:e.subarray(1,33),ciphertext:e.subarray(33,-32),mac:e.subarray(-32)}}function VS(i,t,e=ho(32)){const{chacha_key:n,chacha_nonce:s,hmac_key:r}=v0(t,e),o=zS(i),a=d0(n,s,o),l=_0(r,a,e);return g0.encode(Tn(new Uint8Array([2]),e,a,l))}function WS(i,t){const{nonce:e,ciphertext:n,mac:s}=GS(i),{chacha_key:r,chacha_nonce:o,hmac_key:a}=v0(t,e),l=_0(a,n,e);if(!gS(l,s))throw new Error("invalid MAC");const c=d0(r,o,n);return HS(c)}const ha="sos_astra_v1",_f=33215,bf=25215,ua=["wss://relay.damus.io","wss://nos.lol","wss://relay.primal.net","wss://relay.snort.social"],qS=[{urls:["stun:stun.l.google.com:19302","stun:stun1.l.google.com:19302"]},{urls:"stun:stun.cloudflare.com:3478"},{urls:["turn:freeturn.net:3478","turn:freeturn.net:3478?transport=tcp"],username:"free",credential:"free"},{urls:"turns:freeturn.net:5349",username:"free",credential:"free"}],Mf={iceServers:qS,iceTransportPolicy:new URLSearchParams(location.search).get("relay")==="1"?"relay":"all"},vs=4,Sf=40,XS=1e4,$S=2e3,YS=2500,wf=12e3,KS=4e3,ZS=15,Br=8e3,JS=1200,QS="sos_astra_bus_v1",Ef="sos_astra_v1_rooms",da=18,tr=()=>performance.now(),wi=()=>Math.floor(Date.now()/1e3),jS=()=>Math.random().toString(36).slice(2,10);function Tf(i){return i.iceGatheringState==="complete"?Promise.resolve():new Promise(t=>{const e=()=>{i.removeEventListener("icegatheringstatechange",n),t()},n=()=>{i.iceGatheringState==="complete"&&e()};i.addEventListener("icegatheringstatechange",n),setTimeout(e,KS)})}const tw=`
.af-net-lamp {
  position: fixed; z-index: 80; pointer-events: none;
  top: calc(env(safe-area-inset-top, 0px) + 10px); right: 12px;
  min-width: 28px; height: 26px; padding: 0 8px; box-sizing: border-box; border-radius: 999px;
  display: none; align-items: center; justify-content: center; gap: 4px;
  font: 800 12px/1 system-ui, sans-serif; color: #062312;
  background: #3aa0ff; box-shadow: 0 0 10px #3aa0ff;
  animation: af-lamp 1.2s ease-in-out infinite;
}
.af-net-lamp.show { display: flex; }
.af-net-lamp.on { background: #38d86b; box-shadow: 0 0 12px #38d86b; animation: none; }
@keyframes af-lamp { 50% { opacity: 0.35; } }
/* Docked on control-center face — badge corner, not a second floating lamp */
.af-net-lamp.docked {
  position: absolute; z-index: 2;
  top: auto; right: auto; left: auto; bottom: auto;
  inset-inline-end: -7px; inset-block-end: -7px;
  min-width: 20px; height: 20px; padding: 0 5px;
  font-size: 11px; border: 2px solid #152038;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.35), 0 0 8px rgba(58,160,255,0.55);
  animation: none;
}
.af-net-lamp.docked.on {
  box-shadow: 0 0 0 1px rgba(0,0,0,0.35), 0 0 8px rgba(56,216,107,0.65);
}
`,Re={beginFarm:null,setStatus:null,booted:!1,getPose:null,onRemotePose:null,onRoster:null,onGame:null,myIdx:0};let Af=null;function ew(){return Af??=new sS,Af}class nw{constructor(t=[]){if(this.sk=uS(),this.pk=dS(this.sk),this.pool=ew(),this.subs=[],this.convKeys=new Map,this.seen=new Set,this.rooms=new Map,this.peers=new Map,this.host=null,this.joining=null,this.role="searching",this.myIdx=0,this.wantStart=!0,this.started=!1,this.gatherFrom=0,this.sentReady=!1,this.lastAnnounce=0,this.announceTimer=0,this.heartbeat=0,this.timers=[],this.disposed=!1,this.bus=null,this.roster=new Map,!document.getElementById("af-net-lamp-css")){const e=document.createElement("style");e.id="af-net-lamp-css",e.textContent=tw,document.head.appendChild(e)}this.badge=document.createElement("div"),this.badge.className="af-net-lamp show",document.body.appendChild(this.badge);for(const e of t)this.rooms.set(e.pubkey,e);this._loadLocalRooms(),this.listen(),this.setStatus("Looking for a room…"),this.setLamp(!1),this.timers.push(window.setTimeout(()=>void this.matchmake(),this.liveRooms().length?400:YS),window.setInterval(()=>this.sendPoses(),1e3/ZS),window.setInterval(()=>this.tick(),250)),addEventListener("pagehide",this.onPageHide)}onPageHide=()=>this.leave();dispose(){if(this.disposed)return;this.disposed=!0,this.leave(),removeEventListener("pagehide",this.onPageHide);for(const e of this.timers)clearTimeout(e),clearInterval(e);clearInterval(this.heartbeat),clearTimeout(this.announceTimer);const t=this.subs.splice(0);setTimeout(()=>{for(const e of t)try{e.close()}catch{}},800);try{this.bus?.close()}catch{}this.badge.remove(),Re.booted=!1}setStatus(t){this.badge.title=t,Re.setStatus?.(t)}dockBadge(){const t=document.querySelector("#hud:not(.hidden) .robot .net-slot");if(t){this.badge.parentElement!==t&&t.appendChild(this.badge),this.badge.classList.add("docked");return}this.badge.parentElement!==document.body&&document.body.appendChild(this.badge),this.badge.classList.remove("docked")}setLamp(t){const e=this.role==="host"?this.humans():this.role==="client"?Math.max(2,this.roster.size+1):1;this.badge.classList.toggle("on",!!t||e>1),this.badge.classList.add("show"),this.badge.textContent=e>1?String(e):"·",this.dockBadge()}convKey(t){let e=this.convKeys.get(t);return e||(e=FS(this.sk,t),this.convKeys.set(t,e)),e}listen(){if(!this.subs.length){this.subs.push(this.pool.subscribeMany(ua,{kinds:[_f],"#t":[ha],since:wi()-60},{onevent:t=>this._ingestRoom(t.pubkey,(()=>{try{return JSON.parse(t.content)}catch{return null}})(),t.created_at)})),this.subs.push(this.pool.subscribeMany(ua,{kinds:[bf],"#p":[this.pk],since:wi()-10},{onevent:t=>{if(this.seen.has(t.id))return;this.seen.add(t.id);let e;try{e=JSON.parse(WS(t.content,this.convKey(t.pubkey)))}catch{return}this.onSignal(t.pubkey,e)}}));try{this.bus=new BroadcastChannel(QS),this.bus.onmessage=t=>{const e=t?.data;!e||typeof e!="object"||(e.t==="room"?this._ingestRoom(e.pubkey,e,Number(e.ts)||wi()):e.t==="signal"&&e.to===this.pk&&e.from&&e.msg&&this.onSignal(e.from,e.msg))}}catch{}}}_ingestRoom(t,e,n){if(!t||t===this.pk||!e)return;if(e.closed){this.rooms.delete(t),this._persistLocalRooms();return}const s=this.rooms.get(t);s&&s.ts>n||(this.rooms.set(t,{pubkey:t,players:Math.max(1,Math.min(vs,Number(e.players)||1)),max:vs,ts:n,farming:!!e.farming}),this._persistLocalRooms())}_persistLocalRooms(){try{const t=wi()-Sf;localStorage.setItem(Ef,JSON.stringify([...this.rooms.values()].filter(e=>e.ts>=t)))}catch{}}_loadLocalRooms(){try{const t=JSON.parse(localStorage.getItem(Ef)||"[]");if(!Array.isArray(t))return;for(const e of t)e?.pubkey&&this._ingestRoom(e.pubkey,e,Number(e.ts)||wi())}catch{}}signal(t,e){const n={type:e.type,sid:e.sid,sdp:e.sdp},s=pf({kind:bf,created_at:wi(),tags:[["p",t],["t",ha]],content:VS(JSON.stringify(n),this.convKey(t))},this.sk);Promise.allSettled(this.pool.publish(ua,s));try{this.bus?.postMessage({t:"signal",to:t,from:this.pk,msg:n})}catch{}}announce(t=!1){clearTimeout(this.announceTimer);const e=t?0:this.lastAnnounce+$S-tr();if(e>0){this.announceTimer=window.setTimeout(()=>{this.disposed||this.announce()},e);return}this.lastAnnounce=tr();const n={v:1,room:this.pk,players:this.humans(),max:vs,closed:t,farming:!t&&this.started},s=pf({kind:_f,created_at:wi(),tags:[["d",ha],["t",ha]],content:JSON.stringify(n)},this.sk);Promise.allSettled(this.pool.publish(ua,s));try{this.bus?.postMessage({t:"room",pubkey:this.pk,ts:wi(),...n})}catch{}}liveRooms(){const t=wi()-Sf;return[...this.rooms.values()].filter(e=>e.ts>=t&&e.players<e.max).sort((e,n)=>n.players-e.players||n.ts-e.ts)}async matchmake(){for(const t of this.liveRooms())if(this.disposed||await this.tryJoin(t.pubkey))return;this.disposed||this.becomeHost()}becomeHost(){this.role="host",this.host=null,this.myIdx=0,Re.myIdx=0,this.roster.set(this.pk,{idx:0,nm:Kn.player||"Host"}),this.announce(),clearInterval(this.heartbeat),this.heartbeat=window.setInterval(()=>{this.role==="host"&&(this.announce(),this.mergeLoneHost())},XS),this.gatherFrom=tr(),this.setStatus(`Room open · waiting… (${Math.ceil(Br/1e3)}s)`),this.setLamp(!1)}async mergeLoneHost(){if(this.peers.size>0||this.joining||this.started)return;const t=this.liveRooms().find(e=>e.players>1||e.pubkey<this.pk);t&&await this.tryJoin(t.pubkey)&&(clearInterval(this.heartbeat),this.announce(!0))}tryJoin(t){return new Promise(e=>{const n=new RTCPeerConnection(Mf),s={hostSide:!1,pk:t,sid:jS(),pc:n,ctl:null,st:null,open:!1,name:""};this.joining=s;let r=!1;const o=l=>{if(!r){if(r=!0,clearTimeout(a),this.joining===s&&(this.joining=null),!l)try{n.close()}catch{}e(l)}},a=setTimeout(()=>o(!1),wf);s.fail=()=>o(!1),s.ctl=n.createDataChannel("ctl",{ordered:!0}),s.st=n.createDataChannel("st",{ordered:!1,maxRetransmits:0}),s.st.binaryType="arraybuffer",s.ctl.onopen=()=>{s.open=!0,this.becomeClient(s),o(!0)},this.wireChannels(s),(async()=>{try{await n.setLocalDescription(await n.createOffer()),await Tf(n),this.signal(t,{type:"offer",sid:s.sid,sdp:n.localDescription?.sdp})}catch{o(!1)}})()})}becomeClient(t){for(const e of this.peers.values())this.dropPeer(e,!1);this.role="client",this.host=t,this.sentReady=!1,this.gatherFrom=0,clearInterval(this.heartbeat),this.setStatus("Joined · connecting…"),this.setLamp(!0)}async onSignal(t,e){if(!e||typeof e.type!="string"||typeof e.sid!="string")return;if(e.type==="offer"&&typeof e.sdp=="string"){if(this.role!=="host"||this.peers.has(t))return;if(this.humans()>=vs||this.joining){this.signal(t,{type:"full",sid:e.sid});return}const s=new RTCPeerConnection(Mf),r={hostSide:!0,pk:t,sid:e.sid,pc:s,ctl:null,st:null,open:!1,name:"",idx:-1};this.peers.set(t,r),s.ondatachannel=o=>{o.channel.label==="ctl"?r.ctl=o.channel:o.channel.label==="st"&&(r.st=o.channel,r.st.binaryType="arraybuffer"),this.wireChannels(r)},setTimeout(()=>{r.open||this.dropPeer(r,!0)},wf);try{await s.setRemoteDescription({type:"offer",sdp:e.sdp}),await s.setLocalDescription(await s.createAnswer()),await Tf(s),this.signal(t,{type:"answer",sid:e.sid,sdp:s.localDescription?.sdp})}catch{this.dropPeer(r,!0)}return}const n=this.joining;if(!(!n||n.pk!==t||n.sid!==e.sid))if(e.type==="answer"&&typeof e.sdp=="string")try{await n.pc.setRemoteDescription({type:"answer",sdp:e.sdp})}catch{n.fail?.()}else e.type==="full"&&n.fail?.()}wireChannels(t){const{ctl:e,st:n,pc:s}=t;e&&!e.__wired&&(e.__wired=!0,e.onmessage=r=>{let o;try{o=JSON.parse(String(r.data))}catch{return}this.onCtl(t,o)},e.onclose=()=>this.lost(t),t.hostSide&&(e.onopen=()=>{t.open=!0,this.onClientJoined(t)},e.readyState==="open"&&(t.open=!0,this.onClientJoined(t)))),n&&!n.__wired&&(n.__wired=!0,n.onmessage=r=>{r.data instanceof ArrayBuffer&&this.onPoses(t,r.data)}),s.onconnectionstatechange=()=>{(s.connectionState==="failed"||s.connectionState==="closed")&&this.lost(t)}}send(t,e){t.ctl?.readyState==="open"&&t.ctl.send(JSON.stringify(e))}broadcastGame(t){if(!t||typeof t.t!="string")return;const e={...t,t:"game",g:t.t};if(this.role==="host"){for(const n of this.peers.values())n.open&&this.send(n,e);return}this.host&&this.send(this.host,e)}humans(){if(this.role==="client")return Math.max(2,this.roster.size+(this.roster.has(this.pk)?0:1));let t=1;for(const e of this.peers.values())e.open&&t++;return t}freeIdx(){const t=new Set([0]);for(const e of this.peers.values())e.idx>=0&&t.add(e.idx);for(let e=1;e<vs;e++)if(!t.has(e))return e;return-1}onClientJoined(t){this.announce(),this.setLamp(!0),this.setStatus(`Player joined · ${this.humans()}/${vs}`),this.started||this.gatherFrom||(this.gatherFrom=tr())}onCtl(t,e){if(!(!e||typeof e.t!="string")){if(this.role==="client"&&t===this.host){if(e.t==="welcome"){if(this.myIdx=Number(e.idx)|0,Re.myIdx=this.myIdx,this.roster.clear(),Array.isArray(e.roster))for(const n of e.roster)n?.pk&&this.roster.set(n.pk,{idx:n.idx|0,nm:Ri(n.nm)||"Farmer"});this.pushRoster(),this.setStatus("In room · get ready…")}else if(e.t==="start")this.myIdx=Number(e.idx)|0,Re.myIdx=this.myIdx,this.beginLocal();else if(e.t==="join"&&e.pk&&e.pk!==this.pk)this.roster.set(e.pk,{idx:e.idx|0,nm:Ri(e.nm)||"Farmer"}),Re.onRoster?.(e.pk,Ri(e.nm)||"Farmer",!0),this.setLamp(!0);else if(e.t==="leave"&&e.pk)this.roster.delete(e.pk),Re.onRoster?.(e.pk,"",!1);else if(e.t==="wait"&&typeof e.text=="string")this.setStatus(e.text);else if(e.t==="game"&&typeof e.g=="string"){const{t:n,g:s,...r}=e;Re.onGame?.({t:s,from:t.pk,...r})}return}if(this.role==="host"){if(e.t==="game"&&typeof e.g=="string"){const{t:n,g:s,...r}=e;Re.onGame?.({t:s,from:t.pk,...r});for(const o of this.peers.values())o.open&&o!==t&&this.send(o,e);return}if(e.t==="ready"){if(t.name=Ri(e.nm)||"Farmer",t.idx<0&&(t.idx=this.freeIdx()),t.idx<0){this.send(t,{t:"full"});return}this.roster.set(t.pk,{idx:t.idx,nm:t.name});const n=[{pk:this.pk,idx:0,nm:Kn.player||"Host"}];for(const s of this.peers.values())s.open&&s.idx>=0&&n.push({pk:s.pk,idx:s.idx,nm:s.name||"Farmer"});this.send(t,{t:"welcome",idx:t.idx,roster:n});for(const s of this.peers.values())s!==t&&s.open&&this.send(s,{t:"join",pk:t.pk,idx:t.idx,nm:t.name});Re.onRoster?.(t.pk,t.name,!0),this.announce(),this.setLamp(!0),this.started?this.send(t,{t:"start",idx:t.idx}):this.gatherFrom||(this.gatherFrom=tr())}}}}tick(){if(this.role==="client"){!this.sentReady&&this.host?.ctl?.readyState==="open"&&(this.sentReady=!0,this.send(this.host,{t:"ready",nm:Kn.player||"Farmer"}));return}if(this.role!=="host"||this.started||!this.gatherFrom)return;const t=tr()-this.gatherFrom,e=Math.ceil((Br-t)/1e3),n=this.humans(),s=e>0?`Starting in ${e}s · ${n}/${vs}`:n>1?"Starting…":"Starting solo…";this.setStatus(s);for(const l of this.peers.values())l.open&&this.send(l,{t:"wait",text:s});const r=[...this.peers.values()].some(l=>!l.open),o=[...this.peers.values()].filter(l=>l.open&&l.idx>=0),a=!r&&o.length===[...this.peers.values()].filter(l=>l.open).length;t>=Br&&(n===1||a||t>=Br+5e3)?this.startAll():n>1&&a&&t>=JS&&t>=Br*.55&&this.startAll()}startAll(){if(!this.started){this.started=!0,this.gatherFrom=0;for(const t of this.peers.values())t.open&&t.idx>=0&&this.send(t,{t:"start",idx:t.idx});this.announce(),this.beginLocal()}}beginLocal(){this._began||(this._began=!0,this.started=!0,this.setStatus(this.humans()>1?`Online · ${this.humans()} farmers`:"Farm open"),this.setLamp(this.humans()>1),Re.beginFarm?.())}pushRoster(){for(const[t,e]of this.roster)t!==this.pk&&Re.onRoster?.(t,e.nm,!0)}packPose(){const t=Re.getPose?.();if(!t)return null;const e=new ArrayBuffer(2+da),n=new DataView(e);n.setUint8(0,1),n.setUint8(1,1);const s=2;return n.setUint8(s,this.myIdx&255),n.setUint8(s+1,t.flags&255),n.setFloat32(s+2,t.x,!0),n.setFloat32(s+6,t.y,!0),n.setFloat32(s+10,t.z,!0),n.setFloat32(s+14,t.yaw,!0),e}sendPoses(){if(!this.started||!Re.getPose)return;if(this.role==="client"){const e=this.host?.st,n=this.packPose();n&&e?.readyState==="open"&&e.bufferedAmount<16384&&e.send(n);return}if(this.role!=="host")return;const t=this.packPose();for(const e of this.peers.values())e.st?.readyState!=="open"||e.st.bufferedAmount>16384||t&&e.st.send(t)}onPoses(t,e){if(e.byteLength<2+da)return;const n=new DataView(e);if(n.getUint8(0)!==1)return;const s=n.getUint8(1);for(let r=0;r<s;r++){const o=2+r*da;if(o+da>e.byteLength)break;const a=n.getUint8(o),l=n.getUint8(o+1),c=n.getFloat32(o+2,!0),h=n.getFloat32(o+6,!0),d=n.getFloat32(o+10,!0),u=n.getFloat32(o+14,!0);if(![c,h,d,u].every(Number.isFinite))continue;let f=t.pk;if(this.role==="client"){for(const[g,x]of this.roster)if(x.idx===a){f=g;break}}else if(this.role==="host"){f=t.pk;for(const g of this.peers.values())g===t||g.st?.readyState!=="open"||g.st.send(e)}f!==this.pk&&Re.onRemotePose?.(f,c,h,d,u,l)}}lost(t){if(!this.disposed){if(this.role==="client"&&this.host===t){this.host=null,Re.onRoster?.(t.pk,"",!1),this.becomeHost();return}this.peers.get(t.pk)===t&&this.dropPeer(t,!0)}}dropPeer(t,e){this.peers.delete(t.pk),this.roster.delete(t.pk);try{t.pc.close()}catch{}if(Re.onRoster?.(t.pk,"",!1),e&&this.role==="host"){for(const n of this.peers.values())n.open&&this.send(n,{t:"leave",pk:t.pk});this.announce()}this.setLamp(this.humans()>1)}leave(){this.role==="host"&&this.announce(!0);for(const t of this.peers.values())try{t.pc.close()}catch{}try{this.host?.pc.close()}catch{}}}let Li=null;function b0(){const i=new URLSearchParams(location.search);return i.get("net")!=="0"&&i.get("solo")!=="1"&&typeof WebSocket<"u"&&typeof RTCPeerConnection<"u"}function iw(){if(Li)return Li;if(!b0())return null;try{return Li=new nw,Li}catch(i){return console.warn("[net] disabled",i),null}}function Mc(){Li?.dispose(),Li=null}function sw(){return Li}function Rf(){const i=Li?.role;return i==="host"||i==="client"?i:null}function ri(i){Li?.broadcastGame(i)}const er={plank:10779980,plankLite:11437653,log:7033395,brace:9069112,roof:8017209,lens:16756832},zr=new U;class rw{constructor(t,e,n){this.game=t,this.dead=!1,this.hp=8,this.maxHp=8,this.cool=0,this.range=14,this.damage=1,this.scan=0,this._muzzle=0,this._shake=0,this.root=new ne,this.root.name="turret";const s=Mn(er.plank,{shade:.92}),r=Mn(er.plankLite,{shade:.98}),o=Mn(er.log,{shade:.75}),a=Mn(er.brace,{shade:.85}),l=Mn(er.roof,{shade:.8}),c=Mn(er.lens,{shade:1.35});this.matLens=c,this._mats=[s,r,o,a,l,c];const h=(y,T,_,E,w,P,v)=>{const R=new le(new hn(T,_,E),y);return R.position.set(w,P,v),this.root.add(R),R},d=2.85;h(o,.32,d,.32,0,d*.5,0),h(a,.42,.12,.42,0,d*.45,0);for(const y of[Math.PI*.25,-Math.PI*.25]){const T=new le(new hn(.1,.1,1.1),a);T.position.set(0,d*.55,0),T.rotation.y=y,this.root.add(T)}const u=d+.06;h(s,1.15,.12,1.15,0,u,0);for(const[y,T]of[[-.48,-.48],[.48,-.48],[-.48,.48],[.48,.48]])h(o,.1,.55,.1,y,u+.28,T);for(const[y,T,_,E]of[[0,-.48,.95,.08],[0,.48,.95,.08],[-.48,0,.08,.95],[.48,0,.08,.95]])h(r,_,.08,E,y,u+.48,T);this.head=new ne,this.head.position.y=u+.55;const f=new le(new hn(.62,.38,.62),s);f.position.y=.12,this.head.add(f);const g=new le(new hn(.78,.14,.78),l);g.position.y=.38,this.head.add(g);const x=new le(new hn(.28,.12,.28),o);x.position.y=.5,this.head.add(x),this.lens=new le(new hn(.22,.18,.16),c),this.lens.position.set(0,.14,.36),this.head.add(this.lens),this.glowMat=new Fi({color:16760944,transparent:!0,opacity:0,depthWrite:!1,blending:Ra}),this.glow=new le(new Ja(.34,10,8),this.glowMat),this.glow.position.copy(this.lens.position),this.glow.renderOrder=2,this.head.add(this.glow),this.lamp=new ap(16760944,0,14,2),this.lamp.position.copy(this.lens.position),this.head.add(this.lamp),this.root.add(this.head);const m=t.world.floorAt?.(e,n),p=m>=1?m:nt+1;this.root.position.set(e+.5,p,n+.5),t.scene.add(this.root),this.x=e,this.z=n,this.y=p}hit(t=1){return this.dead?!1:(this.hp-=t,this._shake=.45,this.game.particles?.burst?.(this.root.position.x-.3,this.y+1.5,this.root.position.z-.3,10779980,8,1),this.hp<=0&&(this.hp=0,this.dead=!0,this.game.onTurretDestroyed?.(this)),!0)}mend(t=3){if(this.dead)return!1;const e=this.hp;return this.hp=Math.min(this.maxHp,this.hp+t),this.hp>e}update(t){const e=this.game;if(this.dead)return;this.cool=Math.max(0,this.cool-t),this._muzzle=Math.max(0,this._muzzle-t*5),this._shake=Math.max(0,this._shake-t),this.scan+=t;{const u=1-this.hp/this.maxHp,f=this._shake>0?Math.sin(this.scan*40)*.1*this._shake:0;this.root.rotation.z=u*.12+f}let n=null,s=1/0;for(const u of e.mobs){if(u.dead||u.state==="leave")continue;const f=Math.hypot(u.pos.x-this.root.position.x,u.pos.z-this.root.position.z);if(f>this.range)continue;const g=u.kind==="golem"?.55:u.kind==="dragon"?.7:1,x=f*g;x<s&&(s=x,n=u)}if(n){const u=Math.atan2(n.pos.x-this.root.position.x,n.pos.z-this.root.position.z);this.head.rotation.y=u,this.cool<=0&&(this.cool=.75,this._muzzle=1,this.lens.getWorldPosition(zr),e.particles.sparkle(zr.x,zr.y,zr.z,6,16769162),e.particles.sparkle(n.pos.x-.2,n.pos.y+.45,n.pos.z-.2,5,16747082),e.audio.sfx("turret_pop",{pos:zr,pitch:.92+Math.random()*.2,refDistance:5}),e.isNetClient?.()&&n.netId!=null?(ri({t:"hitMob",id:n.netId,dmg:this.damage,knock:.55,x:this.root.position.x,z:this.root.position.z}),n.hurt=.35):(n.hit(this.damage,this.root.position,.55),n.dead&&e.onMobKilled(n,"turret")))}else this.head.rotation.y=this.scan*1.1;const o=(Se.uSky?.value??1)<.55||!!e.isNightish,a=.5+.5*Math.sin(this.scan*(n?10:5)),l=this._muzzle,c=(o?1.55+a*.45:1.05)+l*1.4;this.matLens.uniforms?.uShade&&(this.matLens.uniforms.uShade.value=c),this.glowMat.opacity=o?.35+a*.25+l*.45:l*.35,this.glow.scale.setScalar(o?1+a*.15+l*.35:.7+l*.4),this.lamp.intensity=o?1.6+a*.5+l*2.2:l*1.4,this.lamp.distance=o?14:6,this.lamp.color.setHex(l>.2?16773312:16756832);const[h,d]=e.world.lightAt?.(this.x,(this.y|0)+2,this.z)||[15,8];for(const u of this._mats)u===this.matLens?mi(u,Math.max(h,o?10:h),Math.max(d,o?8:d)):mi(u,h,d)}dispose(){this.game.scene.remove(this.root);for(const t of this._mats)t.dispose();this.glowMat.dispose(),this.root.traverse(t=>{t.geometry&&t.geometry.dispose()})}}const fa={plank:10779980,plankLite:11437653,log:7033395,brace:9069112};function Cf(i,t,e=1){const n=new ne,s=.08,r=.92,o=e<0?-1:1,a=(c,h,d,u,f,g,x)=>{const m=new le(new hn(h,d,u),c);m.position.set(f,g,x),n.add(m)};a(i.log,s*1.15,r,.09,0,r*.5,o*.04),a(i.log,s*1.15,r,.09,0,r*.5,o*(t-.04));for(let c=0;c<3;c++){const h=.14+c*(r-.22)/2;a(i.plank,s,.13,t-.1,.01,h,o*t*.5)}const l=new le(new hn(s*.85,.09,t*.78),i.brace);return l.position.set(.02,r*.48,o*t*.5),l.rotation.x=o*.48,n.add(l),a(i.plankLite,s*1.25,.07,t-.02,0,r-.03,o*t*.5),n}class ow{constructor(t){this.game=t,this.t=0,this.root=new ne,this.root.name="pigGates",this._mats={plank:Mn(fa.plank,{shade:.92}),plankLite:Mn(fa.plankLite,{shade:.98}),log:Mn(fa.log,{shade:.78}),brace:Mn(fa.brace,{shade:.85})},this._matList=Object.values(this._mats);const e=ut.pigPen,n=e.gateZ0,s=e.gateZ1+1,o=(s-n)*.42,a=e.gateX+.1,l=nt+1;this.hingeL=new ne,this.hingeL.position.set(a,l,n+.02),this.hingeL.add(Cf(this._mats,o,1)),this.root.add(this.hingeL),this.hingeR=new ne,this.hingeR.position.set(a,l,s-.02),this.hingeR.add(Cf(this._mats,o,-1)),this.root.add(this.hingeR),this.baseOpen=1.55,this.hingeL.rotation.y=-this.baseOpen,this.hingeR.rotation.y=this.baseOpen,t.scene.add(this.root)}update(t){this.t+=t;const e=this.t,n=Math.sin(e*1.15)*.06+Math.sin(e*2.35+.8)*.03,s=Math.sin(e*.37)*Math.sin(e*.37)*Math.sin(e*.11)*.1;this.hingeL.rotation.y=-this.baseOpen+n+s+Math.sin(e*1.7+1.2)*.02,this.hingeR.rotation.y=this.baseOpen-n*.9+s*.85+Math.sin(e*1.55+2.4)*.02;const r=this.game.world,o=ut.pigPen,[a,l]=r.lightAt?.(o.gateX,nt+1,(o.gateZ0+o.gateZ1)*.5)||[15,0];for(const c of this._matList)mi(c,a,l)}dispose(){this.game.scene.remove(this.root);for(const t of this._matList)t.dispose();this.root.traverse(t=>{t.geometry&&t.geometry.dispose()})}}function aw(){const i=document.createElement("canvas");i.width=32,i.height=32;const t=i.getContext("2d");t.fillStyle="#1a2430",t.fillRect(0,0,32,32),t.fillStyle="#2a3a48",t.fillRect(2,2,28,28),t.fillStyle="#5ef0ff",t.beginPath(),t.moveTo(18,4),t.lineTo(10,16),t.lineTo(15,16),t.lineTo(12,28),t.lineTo(22,12),t.lineTo(17,12),t.closePath(),t.fill(),t.fillStyle="#b8ffff",t.fillRect(15,8,2,3);const e=new is(i);return e.magFilter=he,e.minFilter=he,e.colorSpace=Ve,e}let Sc=null;function lw(){return Sc||(Sc=aw()),Sc}class Pf{constructor(t){this.game=t,this.root=new ne,this.root.name="chargeBay",this.docks=[],this._mats=[],t.scene.add(this.root),this.rebuild()}rebuild(){this.disposeMeshes();const t=ut.charge||[],e=ut.house;for(let n=0;n<t.length;n++){const[s,r]=t[n],o=new ne,a=s+.5,l=e.z0+.08;o.position.set(a,nt+1,l);const c=Mn(2765632,{shade:.85}),h=Mn(6977672,{shade:1.05}),d=Mn(4905215,{shade:1.4}),u=Mn(3818837,{shade:.9});this._mats.push(c,h,d,u);const f=(p,y,T,_,E,w,P)=>{const v=new le(new hn(y,T,_),p);return v.position.set(E,w,P),o.add(v),v};f(u,.85,.06,.7,0,.03,.45),f(d,.55,.04,.12,0,.07,.55),f(d,.12,.04,.45,0,.07,.45),f(c,.95,1.35,.12,0,.85,.06),f(h,.08,1.2,.14,-.42,.8,.1),f(h,.08,1.2,.14,.42,.8,.1),f(h,.95,.08,.14,0,1.45,.1),f(h,.95,.08,.14,0,.22,.1),f(d,.08,.35,.18,-.22,.75,.22),f(d,.08,.35,.18,.22,.75,.22);const g=new Fi({map:lw(),transparent:!1,toneMapped:!1});this._mats.push(g);const x=new le(new Ii(.55,.55),g);x.position.set(0,1.05,.14),o.add(x);const m=new ap(5953791,0,4.5,2);m.position.set(0,1.1,.4),o.add(m),this.root.add(o),this.docks.push({root:o,lamp:m,mats:[c,h,d,u]})}}update(t){const e=!!this.game.isNightish,n=this.game.time||0,s=.55+.45*Math.sin(n*5);for(const r of this.docks){r.lamp.intensity=e?.9+s*.8:.15;for(const o of r.mats){const[a,l]=this.game.world.lightAt?.(r.root.position.x,nt+2,r.root.position.z)||[8,6];mi(o,Math.max(a,e?9:a),Math.max(l,e?10:l))}}}disposeMeshes(){for(const t of this.docks)this.root.remove(t.root);this.docks=[];for(const t of this._mats)t.dispose?.();this._mats=[],this.root.traverse(t=>{t.geometry&&t.geometry.dispose()})}dispose(){this.disposeMeshes(),this.game.scene.remove(this.root)}}const cw=()=>{const i=ut.pigPen;return[(i.x0+i.x1)*.5+.5,(i.z0+i.z1)*.5+.5]},hw=i=>{const t=i%at,e=i/at|0;return t>=Ci.x0&&t<=Ci.x1&&e>=Ci.z0-0&&e<=Ci.z1+1};class uw{constructor(t,e,n,{big:s=!1,night:r=!1}={}){this.game=t,this.kind="boom",this.big=s,this.model=R1({big:s}),this.root=this.model.root,t.scene.add(this.root);const o=this.model.baseScale;this.body={pos:new U(e,t.world.floor[Math.floor(e)+Math.floor(n)*at]||nt+1,n),vel:new U,hw:.3*o,h:.8*o,onGround:!1,step:1.05,inWater:!1},this.hp=s?14:3,this.maxHp=this.hp,this.speed=s?1.8:r?2.75:2.45,this.fuseTime=s?2.4:1.5,this.radius=s?4.3:2.9,this.fuse=0,this.state="emerge",this.stateT=0,this.yaw=Math.atan2(ut.center[0]-e,ut.center[1]-n),this.repathT=0,this.path=null,this.target=null,this.hurt=0,this.stun=0,this.phase=Math.random()*6,this.t=0,this.dead=!1,this.root.position.copy(this.body.pos)}get pos(){return this.body.pos}get center(){return new U(this.body.pos.x,this.body.pos.y+this.body.h*.5,this.body.pos.z)}pickTarget(){const t=this.game,e=this.body.pos,n=[];if(t.player.alive&&n.push({kind:"player",pos:t.player.pos,d:e.distanceTo(t.player.pos)}),t.robot.exposed&&n.push({kind:"robot",pos:t.robot.body.pos,d:e.distanceTo(t.robot.body.pos)}),n.sort((r,o)=>r.d-o.d),n.length&&n[0].d<16)return n[0];const s=t.nearestCrop(e);return s?{kind:"crop",pos:new U(s[0]+.5,nt+1,s[1]+.5),d:0}:{kind:"farm",pos:new U(ut.fieldA.water[0]+.5,nt+1,ut.fieldA.water[1]+2.5),d:0}}hit(t,e,n=1){if(this.dead||this.state==="emerge"||this.state==="leave")return!1;this.hp-=t,this.hurt=.35,this.fuse=0,this.stun=.45;const s=new U(this.body.pos.x-e.x,0,this.body.pos.z-e.z);return s.lengthSq()<1e-4&&s.set(0,0,1),s.normalize().multiplyScalar((this.big?3:8.5)*n),this.body.vel.set(s.x,this.big?3:5.5,s.z),this.body.onGround=!1,this.state==="fuse"&&(this.state="chase"),this.hp<=0&&(this.dead=!0,this.state="dead"),!0}leave(){!this.dead&&this.state!=="leave"&&(this.state="leave",this.stateT=0,this.fuse=0)}update(t){const e=this.game;if(this.t+=t,this.stateT+=t,this.hurt=Math.max(0,this.hurt-t),this.stun=Math.max(0,this.stun-t),this.netPuppet){const a=this.body.pos;if(this.state==="emerge"){const l=Math.min(1,this.stateT/1);this.root.position.set(a.x,a.y-(1-l)*this.body.h*1.1,a.z)}else if(this.state==="leave"){const l=Math.min(1,this.stateT/1.2);this.root.position.set(a.x,a.y-l*this.body.h*1.2,a.z)}else this.root.position.copy(a);this.animate(t,!!this._netMoving);return}const n=this.body.pos;let s=!1;if(this.state==="emerge"){const a=Math.min(1,this.stateT/1);this.root.position.set(n.x,n.y-(1-a)*this.body.h*1.1,n.z),this.stateT<.9&&Math.random()<.5&&e.particles.burst(n.x-.5,n.y-.1,n.z-.5,8017209,1,1),a>=1&&(this.state="chase",this.stateT=0),this.animate(t,!1);return}if(this.state==="leave"){const a=Math.min(1,this.stateT/1.2);this.root.position.set(n.x,n.y-a*this.body.h*1.2,n.z),Math.random()<.4&&e.particles.burst(n.x-.5,n.y-.1,n.z-.5,8017209,1,1),a>=1&&(this.dead=!0),this.animate(t,!1);return}if(this.repathT-=t,this.repathT<=0&&this.stun<=0){this.repathT=.7+Math.random()*.3,this.target=this.pickTarget();const a=this.target,l=co(e.world,n.x,n.z,a.pos.x,a.pos.z,{near:a.kind==="crop"?0:1,maxNodes:2200,blocked:hw});this.path=l.path,this.pathI=0}const r=this.target;if(this.state==="chase"&&r&&this.stun<=0){const a=r.kind==="crop"||r.kind==="farm"?Math.hypot(r.pos.x-n.x,r.pos.z-n.z):n.distanceTo(r.pos);if(r.kind==="crop"?a<.9:r.kind==="farm"?a<1.5:a<(this.big?3:2.3))this.state="fuse",this.stateT=0,e.onFuse(this);else{let c=r.pos.x,h=r.pos.z;if(this.path&&this.pathI<this.path.length){const[g,x]=this.path[this.pathI];c=g+.5,h=x+.5,Math.hypot(c-n.x,h-n.z)<.4&&this.pathI++}const d=c-n.x,u=h-n.z,f=Math.hypot(d,u)||1;this.body.vel.x=Le(this.body.vel.x,d/f*this.speed,8,t),this.body.vel.z=Le(this.body.vel.z,u/f*this.speed,8,t),this.yaw=Rs(this.yaw,Math.atan2(d,u),8,t),s=!0}}if(this.state==="fuse"&&(this.body.vel.x=Le(this.body.vel.x,0,10,t),this.body.vel.z=Le(this.body.vel.z,0,10,t),r&&(this.yaw=Rs(this.yaw,Math.atan2(r.pos.x-n.x,r.pos.z-n.z),8,t)),r&&(r.kind==="player"||r.kind==="robot")&&n.distanceTo(r.pos)>(this.big?6:4.5)?(this.fuse-=t*1.5,this.fuse<=0&&(this.fuse=0,this.state="chase",e.onDefuse(this))):this.fuse+=t,this.fuse>=this.fuseTime)){e.explode(this);return}this.stun>0&&(this.body.vel.x*=Math.exp(-2.5*t),this.body.vel.z*=Math.exp(-2.5*t)),ls(this.body,t),this.body.inWater&&(this.body.vel.y=Math.max(this.body.vel.y,2));const o=as(e.world,this.body,t);(o.hitX||o.hitZ)&&this.body.onGround&&s&&(this.body.vel.y=7.5),this.root.position.copy(n),this.animate(t,s)}animate(t,e){const n=this.model;this.phase+=t*(e?9:2);const s=Math.sin(this.phase),r=e?.6:.05;n.legs[0].rotation.x=s*r,n.legs[3].rotation.x=s*r,n.legs[1].rotation.x=-s*r,n.legs[2].rotation.x=-s*r,n.body.rotation.z=Math.sin(this.t*3)*.03;let o=n.baseScale,a=0;if(this.state==="fuse"){const d=this.fuse/this.fuseTime;o*=1+d*.22+Math.sin(this.t*30)*.02*d,a=Math.sin(this.t*(8+d*30))>0?.25+d*.6:0}n.scale.scale.set(o,o*(1-(this.state==="fuse"?.04:0)),o),n.mat.uniforms.uFlash.value=a,n.mat.uniforms.uHurt.value=this.hurt>0?1:0,this.root.rotation.y=this.yaw;const l=this.body.pos,[c,h]=this.game.world.lightAt(l.x,l.y+.5,l.z);mi(n.mat,c,h)}dispose(){this.game.scene.remove(this.root)}}class wc{constructor(t,e,n,{penned:s=!1}={}){this.game=t,this.model=N1(),this.root=this.model.root,t.scene.add(this.root),this.body={pos:new U(e,nt+2,n),vel:new U,hw:.4,h:.85,onGround:!1,step:1.05,inWater:!1},this.yaw=Math.random()*6,this.wantYaw=this.yaw,this.walkT=0,this.idleT=1+Math.random()*3,this.run=0,this.hurt=0,this.phase=0,this.t=0,this.penned=!!s,this.dead=!1}get pos(){return this.body.pos}inPen(){const t=Math.floor(this.body.pos.x),e=Math.floor(this.body.pos.z);return Pn(t,e,ut.pigPen)}hit(t){this.hurt=.35,this.run=3;const e=new U(this.body.pos.x-t.x,0,this.body.pos.z-t.z).normalize();return this.body.vel.set(e.x*6,4.5,e.z*6),this.wantYaw=Math.atan2(e.x,e.z),this.game.audio.sfx("pig",{pos:this.body.pos}),!0}update(t){const e=this.game;if(this.dead)return;this.t+=t,this.hurt=Math.max(0,this.hurt-t),this.run=Math.max(0,this.run-t),!this.penned&&this.inPen()&&(this.penned=!0,e.floats?.add?.("♥",this.body.pos.x,this.body.pos.y+1.1,this.body.pos.z,"#ffb0c8"),e.audio.sfx("pig",{pos:this.body.pos,pitch:1.15}));const[n,s]=cw();let r=0;if(this.run>0)r=this.penned?2.2:4.2,Math.random()<t*1.5&&(this.wantYaw+=(Math.random()-.5)*2);else if(this.walkT>0)this.walkT-=t,r=this.penned?.95:this.inPen()?1.35:1.55;else if(this.idleT-=t,this.idleT<=0){if(this.idleT=1.6+Math.random()*3.5,this.walkT=1.2+Math.random()*2.8,this.penned){const m=ut.pigPen,p=m.x0+1.2+Math.random()*(m.x1-m.x0-2.4),y=m.z0+1.2+Math.random()*(m.z1-m.z0-2.4);this.wantYaw=Math.atan2(p-this.body.pos.x,y-this.body.pos.z)}else{const m=Math.atan2(n-this.body.pos.x,s-this.body.pos.z);this.wantYaw=Math.random()<.78?m+(Math.random()-.5)*.7:Math.random()*Math.PI*2}Math.random()<.28&&e.audio.sfx("pig",{pos:this.body.pos,vel:.5})}this.yaw=Rs(this.yaw,this.wantYaw,5,t),(this.hurt<=.1||this.body.onGround)&&(this.body.vel.x=Le(this.body.vel.x,Math.sin(this.yaw)*r,6,t),this.body.vel.z=Le(this.body.vel.z,Math.cos(this.yaw)*r,6,t));const o=Math.floor(this.body.pos.x+Math.sin(this.yaw)*.9),a=Math.floor(this.body.pos.z+Math.cos(this.yaw)*.9),l=o+a*at;r>0&&((e.world.water[l]||e.isFarmCell(l))&&(this.wantYaw+=Math.PI*(.6+Math.random()*.8),this.body.vel.x*=.2,this.body.vel.z*=.2),this.penned&&!Pn(o,a,ut.pigPen)&&(this.wantYaw=Math.atan2(n-this.body.pos.x,s-this.body.pos.z),this.body.vel.x*=.15,this.body.vel.z*=.15)),ls(this.body,t),this.body.inWater&&(this.body.vel.y=Math.max(this.body.vel.y,2.5));const c=as(e.world,this.body,t);if((c.hitX||c.hitZ)&&this.body.onGround&&r>0&&(this.body.vel.y=7),this.penned){const m=ut.pigPen;this.body.pos.x=Math.min(m.x1+.65,Math.max(m.x0+.35,this.body.pos.x)),this.body.pos.z=Math.min(m.z1+.65,Math.max(m.z0+.35,this.body.pos.z))}const h=this.model,d=Math.hypot(this.body.vel.x,this.body.vel.z);this.phase+=t*(3+d*4);const u=Math.sin(this.phase)*Math.min(.7,d*.4);h.legs[0].rotation.x=u,h.legs[3].rotation.x=u,h.legs[1].rotation.x=-u,h.legs[2].rotation.x=-u,h.head.rotation.x=Math.sin(this.t*.7)*.08,h.mat.uniforms.uHurt.value=this.hurt>0?1:0,this.root.position.copy(this.body.pos),this.root.rotation.y=this.yaw;const f=this.body.pos,[g,x]=e.world.lightAt(f.x,f.y+.5,f.z);mi(h.mat,g,x)}dispose(){this.game.scene.remove(this.root),this.dead=!0}}const gu=i=>{const t=i%at,e=i/at|0;return t>=Ci.x0&&t<=Ci.x1&&e>=Ci.z0&&e<=Ci.z1+1};function $a(i,t,e,n,s){const r=i.body.pos;let o=e,a=n;if(i.path&&i.pathI<i.path.length){const[d,u]=i.path[i.pathI];o=d+.5,a=u+.5,Math.hypot(o-r.x,a-r.z)<.45&&i.pathI++}const l=o-r.x,c=a-r.z,h=Math.hypot(l,c)||1;return i.body.vel.x=Le(i.body.vel.x,l/h*s,8,t),i.body.vel.z=Le(i.body.vel.z,c/h*s,8,t),i.yaw=Rs(i.yaw,Math.atan2(l,c),8,t),!0}function ol(i,t,e,n=1,s=6){if(i.dead||i.state==="emerge"||i.state==="leave")return!1;i.hp-=t,i.hurt=.35,i.stun=.4;const r=new U(i.body.pos.x-e.x,0,i.body.pos.z-e.z);return r.lengthSq()<1e-4&&r.set(0,0,1),r.normalize().multiplyScalar(s*n),i.body.vel.set(r.x,4.5,r.z),i.body.onGround=!1,i.hp<=0&&(i.dead=!0,i.state="dead"),!0}function al(i,t,e){const n=i.body.pos;if(i.state==="emerge"){const s=Math.min(1,i.stateT/1);return i.root.position.set(n.x,n.y-(1-s)*i.body.h*1.1,n.z),i.stateT<.9&&Math.random()<.4&&e.particles.burst(n.x-.5,n.y-.1,n.z-.5,8017209,1,1),s>=1&&(i.state=i.afterEmerge||"chase",i.stateT=0),!0}if(i.state==="leave"){const s=Math.min(1,i.stateT/1.2);return i.root.position.set(n.x,n.y-s*i.body.h*1.2,n.z),s>=1&&(i.dead=!0),!0}return!1}function po(i){const t=i.body.pos,[e,n]=i.game.world.lightAt(t.x,t.y+.5,t.z);mi(i.model.mat,e,n),i.model.mat.uniforms?.uHurt&&(i.model.mat.uniforms.uHurt.value=i.hurt>0?1:0)}class dw{constructor(t,e,n){this.game=t,this.kind="chomp",this.big=!1,this.model=C1(),this.root=this.model.root,t.scene.add(this.root);const s=this.model.baseScale;this.body={pos:new U(e,t.world.floor[Math.floor(e)+Math.floor(n)*at]||nt+1,n),vel:new U,hw:.4*s,h:.7*s,onGround:!1,step:1.05,inWater:!1},this.hp=3,this.maxHp=3,this.speed=2.35,this.fuse=0,this.state="emerge",this.afterEmerge="hunt",this.stateT=0,this.yaw=Math.atan2(ut.center[0]-e,ut.center[1]-n),this.repathT=0,this.path=null,this.target=null,this.hurt=0,this.stun=0,this.phase=Math.random()*6,this.t=0,this.dead=!1,this.bites=0,this.maxBites=3+Math.floor(Math.random()*2),this.eatT=0,this.root.position.copy(this.body.pos)}get pos(){return this.body.pos}get center(){return new U(this.body.pos.x,this.body.pos.y+this.body.h*.45,this.body.pos.z)}leave(){!this.dead&&this.state!=="leave"&&(this.state="leave",this.stateT=0)}hit(t,e,n=1){return ol(this,t,e,n,7)}update(t){const e=this.game;if(this.t+=t,this.stateT+=t,this.hurt=Math.max(0,this.hurt-t),this.stun=Math.max(0,this.stun-t),this.netPuppet){this.root.position.copy(this.body.pos),this.animate(t,!!this._netMoving);return}if(al(this,t,e)){this.animate(t,!1);return}const n=this.body.pos;let s=!1;if(this.state==="eat")this.body.vel.x=Le(this.body.vel.x,0,10,t),this.body.vel.z=Le(this.body.vel.z,0,10,t),this.eatT+=t,this.eatT>=.55&&(this.eatT=0,this.target&&e.munchCrop(this.target.x,this.target.z,this),this.bites++,e.particles.burst(n.x-.3,n.y+.2,n.z-.3,15769664,6,1),e.audio.sfx("harvest",{pos:n,pitch:.7+Math.random()*.2}),this.bites>=this.maxBites?this.leave():(this.state="hunt",this.stateT=0,this.target=null,this.repathT=0));else if(this.state==="hunt"&&this.stun<=0){if(this.repathT-=t,this.repathT<=0){this.repathT=.5;const a=e.nearestCrop(n);if(a){this.target={x:a[0],z:a[1],pos:new U(a[0]+.5,nt+1,a[1]+.5)};const l=co(e.world,n.x,n.z,this.target.pos.x,this.target.pos.z,{near:0,maxNodes:2200,blocked:gu});this.path=l.path,this.pathI=0}else this.target={x:ut.fieldA.water[0]+2,z:ut.fieldA.water[1]+2,pos:new U(ut.fieldA.water[0]+2.5,nt+1,ut.fieldA.water[1]+2.5)},this.path=null}const o=this.target;o&&(Math.hypot(o.pos.x-n.x,o.pos.z-n.z)<.9?(this.state="eat",this.stateT=0,this.eatT=0):($a(this,t,o.pos.x,o.pos.z,this.speed),s=!0))}this.stun>0&&(this.body.vel.x*=Math.exp(-2.5*t),this.body.vel.z*=Math.exp(-2.5*t)),ls(this.body,t),this.body.inWater&&(this.body.vel.y=Math.max(this.body.vel.y,2));const r=as(e.world,this.body,t);(r.hitX||r.hitZ)&&this.body.onGround&&s&&(this.body.vel.y=7.5),this.root.position.copy(n),this.animate(t,s)}animate(t,e){const n=this.model;this.phase+=t*(this.state==="eat"?18:e?10:2);const s=Math.sin(this.phase);if(n.legs){const o=this.state==="eat"?.15:e?.55:.06;n.legs[0].rotation.x=s*o,n.legs[3].rotation.x=s*o,n.legs[1].rotation.x=-s*o,n.legs[2].rotation.x=-s*o}const r=this.state==="eat"?1+Math.abs(Math.sin(this.phase))*.18:1;n.scale.scale.set(n.baseScale*r,n.baseScale*(2-r*.15),n.baseScale*r),this.root.rotation.y=this.yaw,po(this)}dispose(){this.game.scene.remove(this.root)}}class fw{constructor(t,e,n){this.game=t,this.kind="hop",this.big=!1,this.model=P1(),this.root=this.model.root,t.scene.add(this.root);const s=this.model.baseScale;this.body={pos:new U(e,t.world.floor[Math.floor(e)+Math.floor(n)*at]||nt+1,n),vel:new U,hw:.32*s,h:.85*s,onGround:!1,step:1.2,inWater:!1},this.hp=3,this.maxHp=3,this.speed=2.8,this.fuse=0,this.state="emerge",this.afterEmerge="bounce",this.stateT=0,this.yaw=Math.atan2(ut.center[0]-e,ut.center[1]-n),this.hurt=0,this.stun=0,this.phase=Math.random()*6,this.t=0,this.dead=!1,this.digs=0,this.maxDigs=2+Math.floor(Math.random()*2),this.hopCool=.4,this.root.position.copy(this.body.pos)}get pos(){return this.body.pos}get center(){return new U(this.body.pos.x,this.body.pos.y+this.body.h*.5,this.body.pos.z)}leave(){!this.dead&&this.state!=="leave"&&(this.state="leave",this.stateT=0)}hit(t,e,n=1){return ol(this,t,e,n,8)}update(t){const e=this.game;if(this.t+=t,this.stateT+=t,this.hurt=Math.max(0,this.hurt-t),this.stun=Math.max(0,this.stun-t),this.hopCool=Math.max(0,this.hopCool-t),this.netPuppet){this.root.position.copy(this.body.pos),this.animate(t,!!this._netMoving);return}if(al(this,t,e)){this.animate(t,!1);return}const n=this.body.pos;if(this.state==="bounce"&&this.stun<=0){const s=ut.center[0]+(Math.random()-.5)*10,r=ut.center[1]+(Math.random()-.5)*10;if(this.body.onGround&&this.hopCool<=0){if(e.hopperDig(Math.floor(n.x),Math.floor(n.z),this)&&(this.digs++,e.audio.sfx("place",{pos:n,pitch:.6}),this.digs>=this.maxDigs)){this.leave();return}const o=s-n.x,a=r-n.z,l=Math.hypot(o,a)||1;this.body.vel.x=o/l*this.speed*1.4,this.body.vel.z=a/l*this.speed*1.4,this.body.vel.y=7.2,this.body.onGround=!1,this.hopCool=.85+Math.random()*.35,this.yaw=Math.atan2(o,a)}else if(!this.body.onGround){const o=ut.center[0]-n.x,a=ut.center[1]-n.z,l=Math.hypot(o,a)||1;this.body.vel.x=Le(this.body.vel.x,o/l*this.speed,3,t),this.body.vel.z=Le(this.body.vel.z,a/l*this.speed,3,t)}}this.stun>0&&(this.body.vel.x*=Math.exp(-2*t),this.body.vel.z*=Math.exp(-2*t)),ls(this.body,t),this.body.inWater&&(this.body.vel.y=Math.max(this.body.vel.y,3)),as(e.world,this.body,t),this.root.position.copy(n),this.animate(t,!this.body.onGround)}animate(t,e){const n=this.model;this.phase+=t*(e?14:4);const s=e?.85:1+Math.sin(this.phase)*.08;n.scale.scale.set(n.baseScale/s,n.baseScale*s,n.baseScale/s),n.legs?.[0]&&(n.legs[0].rotation.x=e?-.8:Math.sin(this.phase)*.3,n.legs[1].rotation.x=e?-.8:-Math.sin(this.phase)*.3),this.root.rotation.y=this.yaw,po(this)}dispose(){this.game.scene.remove(this.root)}}class pw{constructor(t,e,n){this.game=t,this.kind="golem",this.big=!1,this.model=L1(),this.root=this.model.root,t.scene.add(this.root);const s=this.model.baseScale;this.body={pos:new U(e,t.world.floor[Math.floor(e)+Math.floor(n)*at]||nt+1,n),vel:new U,hw:.55*s,h:1.15*s,onGround:!1,step:1.2,inWater:!1},this.hp=10,this.maxHp=10,this.speed=1.35,this.fuse=0,this.state="emerge",this.afterEmerge="chase",this.stateT=0,this.yaw=Math.atan2(ut.center[0]-e,ut.center[1]-n),this.repathT=0,this.path=null,this.target=null,this.hurt=0,this.stun=0,this.phase=Math.random()*6,this.t=0,this.dead=!1,this.smashT=0,this.marker=null,this.root.position.copy(this.body.pos)}get pos(){return this.body.pos}get center(){return new U(this.body.pos.x,this.body.pos.y+this.body.h*.5,this.body.pos.z)}leave(){!this.dead&&this.state!=="leave"&&(this.state="leave",this.stateT=0,this.clearMarker())}hit(t,e,n=1){return ol(this,t,e,n,3.5)}pickTurret(){let t=null,e=1/0;for(const n of this.game.turrets){if(n.dead)continue;const s=Math.hypot(n.root.position.x-this.body.pos.x,n.root.position.z-this.body.pos.z);s<e&&(e=s,t=n)}return t}clearMarker(){this.marker&&(this.game.scene.remove(this.marker),this.marker.geometry?.dispose(),this.marker.material?.dispose(),this.marker=null)}showMarker(t,e){this.clearMarker();const n=new Qh(.55,.9,20),s=new Fi({color:16736320,transparent:!0,opacity:.55,side:Sn,depthWrite:!1}),r=new le(n,s);r.rotation.x=-Math.PI/2;const o=(this.game.world.floorAt?.(t,e)??nt+1)+.06;r.position.set(t,o,e),this.game.scene.add(r),this.marker=r}update(t){const e=this.game;if(this.t+=t,this.stateT+=t,this.hurt=Math.max(0,this.hurt-t),this.stun=Math.max(0,this.stun-t),this.netPuppet){this.root.position.copy(this.body.pos),this.animate(t,!!this._netMoving);return}if(al(this,t,e)){this.animate(t,!1);return}const n=this.body.pos;let s=!1;if(this.state==="windup"){this.body.vel.x=Le(this.body.vel.x,0,10,t),this.body.vel.z=Le(this.body.vel.z,0,10,t);const o=Math.min(1,this.stateT/1.1);this.marker?.material&&(this.marker.material.opacity=.35+o*.45),this.model.arms?.[0]&&(this.model.arms[0].rotation.x=-o*1.4),this.model.arms?.[1]&&(this.model.arms[1].rotation.x=-o*1.1),this.stateT>=1.1&&(this.state="smash",this.stateT=0)}else if(this.state==="smash"){const o=this.target?.turret&&!this.target.turret.dead?this.target.turret:null;if(this.model.arms?.[0]&&(this.model.arms[0].rotation.x=.9),this.model.arms?.[1]&&(this.model.arms[1].rotation.x=.7),this.stateT<.08){if(e.particles.burst(n.x-.4,n.y,n.z-.4,9078400,14,1.2),e.audio.sfx("explode",{pos:n,refDistance:5,pitch:.55,dur:.5}),o){const a=o.hit(3);e.talk.sys(a&&o.dead?"sys.golemBroke":"sys.golemHit",null,"warn"),a&&!o.dead&&e.floats.add("!",o.root.position.x,o.root.position.y+3.2,o.root.position.z,"#ff8060")}this.clearMarker()}if(this.stateT>=.55){if(this.model.arms)for(const a of this.model.arms)a.rotation.x=0;this.state="chase",this.stateT=0,this.smashT=1.8}}else{if(this.smashT=Math.max(0,this.smashT-t),this.repathT-=t,this.repathT<=0&&this.stun<=0){this.repathT=.9;const a=this.pickTurret();if(a){this.target={kind:"turret",turret:a,pos:a.root.position.clone()};const l=co(e.world,n.x,n.z,a.root.position.x,a.root.position.z,{near:1.2,maxNodes:2200,blocked:gu});this.path=l.path,this.pathI=0}else this.target={kind:"farm",pos:new U(ut.center[0],nt+1,ut.center[1])},this.path=null}const o=this.target;if(o&&this.stun<=0){const a=Math.hypot(o.pos.x-n.x,o.pos.z-n.z);o.kind==="turret"&&a<2.4&&this.smashT<=0?(this.state="windup",this.stateT=0,this.showMarker(o.pos.x,o.pos.z),e.talk.sys("sys.golemWind",null,"warn")):($a(this,t,o.pos.x,o.pos.z,this.speed),s=!0)}}this.stun>0&&(this.body.vel.x*=Math.exp(-2.5*t),this.body.vel.z*=Math.exp(-2.5*t)),ls(this.body,t),this.body.inWater&&(this.body.vel.y=Math.max(this.body.vel.y,1.5));const r=as(e.world,this.body,t);(r.hitX||r.hitZ)&&this.body.onGround&&s&&(this.body.vel.y=6.5),this.root.position.copy(n),this.animate(t,s)}animate(t,e){const n=this.model;this.phase+=t*(e?5:1.5);const s=Math.sin(this.phase)*(e?.45:.05);n.legs?.[0]&&(n.legs[0].rotation.x=s,n.legs[1].rotation.x=-s),n.scale.scale.setScalar(n.baseScale*(1+(this.state==="windup"?Math.sin(this.t*12)*.03:0))),this.root.rotation.y=this.yaw,po(this)}dispose(){this.clearMarker(),this.game.scene.remove(this.root)}}class mw{constructor(t,e,n){this.game=t,this.kind="thief",this.big=!1,this.model=D1(),this.root=this.model.root,t.scene.add(this.root);const s=this.model.baseScale;this.body={pos:new U(e,t.world.floor[Math.floor(e)+Math.floor(n)*at]||nt+1,n),vel:new U,hw:.28*s,h:.75*s,onGround:!1,step:1.05,inWater:!1},this.hp=2,this.maxHp=2,this.speed=3.6,this.fuse=0,this.state="emerge",this.afterEmerge="hunt",this.stateT=0,this.yaw=0,this.repathT=0,this.path=null,this.target=null,this.hurt=0,this.stun=0,this.phase=Math.random()*6,this.t=0,this.dead=!1,this.loot=0,this.fleeTo=null,this.root.position.copy(this.body.pos)}get pos(){return this.body.pos}get center(){return new U(this.body.pos.x,this.body.pos.y+this.body.h*.5,this.body.pos.z)}leave(){!this.dead&&this.state!=="leave"&&(this.state="leave",this.stateT=0)}hit(t,e,n=1){const s=ol(this,t,e,n,9);return this.dead&&this.loot>0&&this.game.onThiefDropped(this),s}update(t){const e=this.game;if(this.t+=t,this.stateT+=t,this.hurt=Math.max(0,this.hurt-t),this.stun=Math.max(0,this.stun-t),this.netPuppet){this.root.position.copy(this.body.pos),this.animate(t,!!this._netMoving);return}if(al(this,t,e)){this.animate(t,!1);return}const n=this.body.pos;let s=!1;const r=this.state==="flee"?this.speed*1.15:this.speed;if(this.state==="hunt"){if(this.repathT-=t,this.repathT<=0&&this.stun<=0){this.repathT=.45;const l=e.nearestCrop(n);if(l){this.target={x:l[0],z:l[1],pos:new U(l[0]+.5,nt+1,l[1]+.5),crop:!0};const c=co(e.world,n.x,n.z,this.target.pos.x,this.target.pos.z,{near:0,maxNodes:2200,blocked:gu});this.path=c.path,this.pathI=0}else{const c=ut.fieldA.water[0]+2+Math.floor(Math.random()*4),h=ut.fieldA.water[1]+2+Math.floor(Math.random()*4);this.target={x:c,z:h,pos:new U(c+.5,nt+1,h+.5),crop:!1},this.path=null}}const a=this.target;if(a&&this.stun<=0)if(Math.hypot(a.pos.x-n.x,a.pos.z-n.z)<.85){const c=a.crop?e.stealCrop(a.x,a.z,this):0;c>0?(this.loot+=c,this.model.sack&&(this.model.sack.visible=!0),e.talk.sys("sys.thiefSteal",{n:c},"warn"),e.audio.sfx("harvest",{pos:n,pitch:1.4})):(this.loot+=1,this.model.sack&&(this.model.sack.visible=!0),e.money=Math.max(0,(e.money|0)-3),e.talk.sys("sys.thiefSteal",{n:1},"warn"),e.floats.add("-3¢",n.x,n.y+1.2,n.z,"#ff8080")),this.beginFlee()}else $a(this,t,a.pos.x,a.pos.z,r),s=!0}else if(this.state==="flee"){this.fleeTo||this.beginFlee();const[a,l]=this.fleeTo;if($a(this,t,a,l,r),s=!0,Math.hypot(a-n.x,l-n.z)<2.2||this.stateT>18){e.onThiefEscaped(this),this.dead=!0,this.state="dead";return}}this.stun>0&&(this.body.vel.x*=Math.exp(-2.5*t),this.body.vel.z*=Math.exp(-2.5*t)),ls(this.body,t),this.body.inWater&&(this.body.vel.y=Math.max(this.body.vel.y,2));const o=as(e.world,this.body,t);(o.hitX||o.hitZ)&&this.body.onGround&&s&&(this.body.vel.y=8),this.root.position.copy(n),this.animate(t,s)}beginFlee(){this.state="flee",this.stateT=0;const t=this.game.world.spawnCells;let e=null,n=-1;const s=this.body.pos;for(let r=0;r<24;r++){const o=t[Math.floor(Math.random()*t.length)];if(o==null)continue;const a=o%at+.5,l=(o/at|0)+.5,c=Math.hypot(a-s.x,l-s.z);c>n&&(n=c,e=[a,l])}this.fleeTo=e||[2,2],this.path=null}animate(t,e){const n=this.model;this.phase+=t*(e?14:3);const s=Math.sin(this.phase)*(e?.75:.08);n.legs?.[0]&&(n.legs[0].rotation.x=s,n.legs[1].rotation.x=-s),n.body.rotation.z=Math.sin(this.t*8)*(e?.12:.03),n.sack?.visible&&(n.sack.rotation.z=Math.sin(this.t*10)*.2),this.root.rotation.y=this.yaw,po(this)}dispose(){this.game.scene.remove(this.root)}}class gw{constructor(t,e,n){this.game=t,this.kind="dragon",this.big=!1,this.model=I1(),this.root=this.model.root,t.scene.add(this.root);const s=this.model.baseScale,r=t.world.floor[Math.floor(e)+Math.floor(n)*at]||nt+1;this.body={pos:new U(e,r+4,n),vel:new U,hw:.4*s,h:.7*s,onGround:!1,step:1,inWater:!1},this.hp=6,this.maxHp=6,this.speed=4.2,this.fuse=0,this.state="swoop",this.stateT=0,this.yaw=Math.atan2(ut.center[0]-e,ut.center[1]-n),this.hurt=0,this.stun=0,this.phase=Math.random()*6,this.t=0,this.dead=!1,this.carrying=null,this.prey=null,this.flyY=r+4,this.root.position.copy(this.body.pos)}get pos(){return this.body.pos}get center(){return new U(this.body.pos.x,this.body.pos.y+.4,this.body.pos.z)}leave(){this.dead||this.state==="leave"||(this.carrying&&this.dropRobot(!1),this.state="leave",this.stateT=0)}hit(t,e,n=1){if(this.dead||this.state==="leave")return!1;this.hp-=t,this.hurt=.35,this.stun=.25;const s=new U(this.body.pos.x-e.x,0,this.body.pos.z-e.z);return s.lengthSq()<1e-4&&s.set(0,0,1),s.normalize().multiplyScalar(5*n),this.body.vel.x+=s.x,this.body.vel.z+=s.z,this.hp<=0&&(this.dead=!0,this.state="dead",this.carrying&&this.dropRobot(!0)),!0}pickPrey(){const t=this.game,e=[t.robot,...t.helpers||[]].filter(r=>!r||r.dead||r.captive||r.state==="kidnapped"||r.state==="sleep"||r.state==="toBed"||r.state==="hide"||!r.exposed||r.inHouse?!1:r.state==="work"||r.state==="scare"||r.state==="panic"||r.state==="sulk"||r.state==="flung");if(!e.length)return null;let n=null,s=1/0;for(const r of e){const o=Math.hypot(r.body.pos.x-this.body.pos.x,r.body.pos.z-this.body.pos.z);o<s&&(s=o,n=r)}return n}dropRobot(t){const e=this.carrying;this.carrying=null,e&&(e.releaseKidnap(this.body.pos.clone(),t),t&&(this.game.today.rescued=(this.game.today.rescued|0)+1,this.game.talk.sys("sys.dragonRescue"),this.game.money+=8,this.game.floats.add("+8",this.body.pos.x,this.body.pos.y+1,this.body.pos.z,"#ffe080")))}update(t){const e=this.game;if(this.t+=t,this.stateT+=t,this.hurt=Math.max(0,this.hurt-t),this.stun=Math.max(0,this.stun-t),this.netPuppet){this.root.position.copy(this.body.pos),this.animate(t);return}if(this.state==="leave"){this.body.pos.y+=t*6,this.body.pos.x+=Math.sin(this.yaw)*t*5,this.body.pos.z+=Math.cos(this.yaw)*t*5,this.root.position.copy(this.body.pos),this.stateT>2.5&&(this.dead=!0),this.animate(t);return}if(this.state==="swoop"){if(e.isNightish){this.leave();return}if((!this.prey||this.prey.dead||this.prey.state==="kidnapped"||this.prey.inHouse||!this.prey.exposed)&&(this.prey=this.pickPrey()),this.prey){const n=this.prey.body.pos,s=n.y+(this.prey.state==="sleep"?1.2:2.2),r=n.x-this.body.pos.x,o=n.z-this.body.pos.z,a=Math.hypot(r,o);this.yaw=Rs(this.yaw,Math.atan2(r,o),6,t);const l=this.stun>0?this.speed*.4:this.speed;a>.01&&(this.body.pos.x+=r/a*l*t,this.body.pos.z+=o/a*l*t),this.body.pos.y=Le(this.body.pos.y,s,4,t),a<1.4&&(this.carrying=this.prey,this.prey.kidnapBy(this),this.state="flee",this.stateT=0,e.talk.sys("sys.dragonGrab",null,"warn"),e.hud.banner(W("banner.dragon"),W("banner.dragonSub"),2.8),e.audio.sfx("boss_spawn",{pos:this.body.pos,pitch:1.35}),e.particles.sparkle(n.x-.3,n.y+1,n.z-.3,16,16744544))}else{if(this.stateT>6){this.leave();return}this.yaw+=t*1.2,this.body.pos.x+=Math.sin(this.yaw)*this.speed*t*.5,this.body.pos.z+=Math.cos(this.yaw)*this.speed*t*.5}}else if(this.state==="flee"){const n=ut.center[0],s=ut.center[1],r=this.body.pos.x-n,o=this.body.pos.z-s,a=Math.hypot(r,o)||1,l=r/a,c=o/a;this.yaw=Math.atan2(l,c);const h=this.stun>0?this.speed*.5:this.speed*1.1;if(this.body.pos.x+=l*h*t,this.body.pos.z+=c*h*t,this.body.pos.y=Le(this.body.pos.y,this.flyY+3,3,t),this.carrying&&(this.carrying.body.pos.set(this.body.pos.x,this.body.pos.y-.9,this.body.pos.z),this.carrying.root.position.copy(this.carrying.body.pos)),Math.hypot(this.body.pos.x-n,this.body.pos.z-s)>34||this.stateT>14){e.onDragonEscaped(this),this.carrying&&(this.carrying.captive=!0,this.carrying.root.visible=!1,this.carrying=null),this.dead=!0,this.state="dead";return}}this.root.position.copy(this.body.pos),this.animate(t)}animate(t){const e=this.model;this.phase+=t*10;const n=Math.sin(this.phase)*.55;e.wings?.[0]&&(e.wings[0].rotation.z=.35+n),e.wings?.[1]&&(e.wings[1].rotation.z=-.35-n),e.head&&(e.head.rotation.x=Math.sin(this.t*3)*.1),e.scale.scale.setScalar(e.baseScale*(1+Math.sin(this.t*6)*.03)),this.root.rotation.y=this.yaw,po(this)}dispose(){this.carrying&&this.dropRobot(!1),this.game.scene.remove(this.root)}}const xw={potato:"item_potato",powder:"item_powder",green:"item_green",wheat:"item_wheat",carrot:"item_carrot",corn:"item_corn"};class vw{constructor(t){this.game=t,this.list=[]}spawn(t,e,n,s,{vx:r,vy:o,vz:a,delay:l=.35}={}){const c=xw[t];if(!c)return;const h=Bn(this.game.atlas.texture),d=iu(this.game.atlas,c,h);d.scale.setScalar(.32),d.position.set(e,n,s),this.game.scene.add(d),this.list.push({kind:t,m:d,mat:h,pos:new U(e,n,s),vel:new U(r??(Math.random()-.5)*2.4,o??3.2+Math.random()*1.6,a??(Math.random()-.5)*2.4),age:0,delay:l,spin:Math.random()*6,ground:!1})}update(t){const e=this.game,n=e.world,s=e.player,r=new U(s.pos.x,s.pos.y+.9,s.pos.z);for(let o=this.list.length-1;o>=0;o--){const a=this.list[o];a.age+=t;const l=a.pos,c=r.clone().sub(l),h=c.length();if(s.alive&&a.age>a.delay&&h<2.6){if(a.vel.lerp(c.normalize().multiplyScalar(9),Math.min(1,t*10)),l.addScaledVector(a.vel,t),h<.6){e.collect(a.kind),this.remove(o);continue}}else{a.vel.y-=16*t,a.vel.x*=Math.exp(-(a.ground?6:.8)*t),a.vel.z*=Math.exp(-(a.ground?6:.8)*t);const f=l.x+a.vel.x*t,g=l.z+a.vel.z*t;ct[n.get(Math.floor(f),Math.floor(l.y),Math.floor(l.z))].solid?a.vel.x*=-.3:l.x=f,ct[n.get(Math.floor(l.x),Math.floor(l.y),Math.floor(g))].solid?a.vel.z*=-.3:l.z=g,l.y+=a.vel.y*t;const x=n.groundBelow(l.x,l.y+.3,l.z)+.12;l.y<x?(l.y=x,a.vel.y=a.vel.y<-3?-a.vel.y*.25:0,a.ground=!0):a.ground=!1}a.spin+=t*2,a.m.position.set(l.x,l.y+.1+Math.sin(a.age*3+a.spin)*.05,l.z),a.m.rotation.y=a.spin;const[d,u]=n.lightAt(l.x,l.y+.2,l.z);mi(a.mat,d,u),a.age>120&&this.remove(o)}}remove(t){const e=this.list[t];this.game.scene.remove(e.m),e.mat.dispose(),this.list.splice(t,1)}clear(){for(let t=this.list.length-1;t>=0;t--)this.remove(t)}}const Ec=new Map;function yw(i){if(Ec.has(i))return Ec.get(i);const t=vb();let e=0;for(;`${i}.${e}`in t;)e++;return Ec.set(i,e),e}class _w{constructor({onLine:t,onSys:e}){this.onLine=t,this.onSys=e,this.queue=[],this.gap=0,this.cool=new Map,this.last=new Map,this.time=0}reset(){this.queue=[],this.gap=0,this.cool.clear()}say(t,e={}){const{random:n=!1,cool:s=3,delay:r=0,vars:o,low:a=!1}=e;if((this.cool.get(t)??-1e9)>this.time||a&&(this.queue.length||this.gap>0))return!1;let l=t;if(n){const c=yw(t);if(!c)return!1;let h=Math.floor(Math.random()*c);c>1&&h===this.last.get(t)&&(h=(h+1)%c),this.last.set(t,h),l=`${t}.${h}`}return this.cool.set(t,this.time+s),this.queue.push({k:l,vars:o,at:this.time+r}),!0}sys(t,e,n="sys"){this.onSys(W(t,e),n)}update(t){if(this.time+=t,this.gap-=t,this.gap>0||!this.queue.length)return;const e=this.queue.findIndex(r=>r.at<=this.time);if(e<0)return;const n=this.queue.splice(e,1)[0],s=W(n.k,n.vars);this.onLine(s,n.k),this.gap=Math.min(3.2,1.2+s.length*.045)}}const Tc=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);class bw{constructor(t,{atlas:e,drawFace:n,glyphCtx:s,onSlot:r}){this.atlas=e,this.onSlot=r,this.drawFace=n,this.glyphCtx=s;const o=c=>e.iconURL(c);t.insertAdjacentHTML("beforeend",`
<div id="hud" class="hidden">
  <div class="hurt"></div>
  <div class="arrows"></div>
  <div class="alarm" aria-hidden="true"><div class="kozak"><i class="blue"></i><i class="red"></i></div></div>
  <div class="crosshair"></div>
  <div class="prompt hidden"><span class="pg"></span><b></b></div>
  <div class="tl">
    <div class="day"><span class="sunmoon"></span><b class="dayname"></b><span class="clock"><i></i></span></div>
    <div class="goal"><span class="lbl" data-i18n="hud.goal">${W("hud.goal")}</span><b class="goalval"></b><div class="bar"><i></i></div></div>
    <div class="obj hidden"></div>
    <div class="warehouse">
      <div class="wh-top">
        <span class="wh-title" data-i18n="panel.coins">${W("panel.coins")}</span>
        <b class="wh-money"></b>
      </div>
      <div class="wh-meta">
        <span class="wh-helpers"></span>
        <span class="wh-hoe"></span>
      </div>
      <div class="wh-stock"></div>
    </div>
    <div class="chat" aria-live="polite"></div>
  </div>
  <div class="robot"><div class="rface"><canvas width="16" height="12"></canvas><span class="net-slot" aria-hidden="true"></span></div><div class="rtext"><b data-i18n="name.astra">${W("name.astra")}</b><span class="rstate"></span></div></div>
  <div class="bottom">
    <div class="hearts">${Array.from({length:10},()=>`<img alt="" src="${o("heart_full")}">`).join("")}</div>
    <div class="slotname"></div>
    <div class="hotbar">
      <i class="hb-side" data-glyph="slotPrev"></i>
      ${["sword","hoe","seed","dirt","powder","turret"].map((c,h)=>{const d=c==="seed"||c==="powder"||c==="turret";return`<div class="slot" data-k="${c}" data-n="${h+1}"><img alt="" src="${o("item_"+c)}"><em>${h+1}</em>${d?"<span></span>":""}</div>`}).join("")}
      <div class="slot extra" data-k="green"><img alt="" src="${o("item_green")}"><span></span></div>
      <i class="hb-side" data-glyph="slotNext"></i>
    </div>
  </div>
  <div class="hints">
    <span><i data-glyph="attack"></i><b data-i18n="howto.attack.short">${W("howto.attack.short")}</b></span>
    <span><i data-glyph="use"></i><b data-i18n="howto.use.short">${W("howto.use.short")}</b></span>
    <span><i data-glyph="slots"></i><b data-i18n="howto.slots.short">${W("howto.slots.short")}</b></span>
    <span><i data-glyph="eat"></i><b data-i18n="howto.eat">${W("howto.eat")}</b></span>
    <span><i data-glyph="pause"></i><b data-i18n="howto.pause">${W("howto.pause")}</b></span>
  </div>
  <div class="banner"><h2></h2><p></p></div>
  <div class="deadmsg hidden"><h2 data-i18n="banner.dead">${W("banner.dead")}</h2><p data-i18n="banner.deadSub">${W("banner.deadSub")}</p></div>
</div>`);const a=this.el=t.querySelector("#hud"),l=c=>a.querySelector(c);this.$={hurt:l(".hurt"),arrows:l(".arrows"),alarm:l(".alarm"),prompt:l(".prompt"),pg:l(".prompt .pg"),pt:l(".prompt b"),sunmoon:l(".sunmoon"),dayname:l(".dayname"),clock:l(".clock i"),goal:l(".goal"),goalval:l(".goalval"),goalbar:l(".goal .bar i"),obj:l(".obj"),face:l(".robot canvas"),rstate:l(".rstate"),robot:l(".robot"),chat:l(".chat"),hearts:[...a.querySelectorAll(".hearts img")],slots:Object.fromEntries([...a.querySelectorAll(".slot")].map(c=>[c.dataset.k,c])),banner:l(".banner"),bh:l(".banner h2"),bp:l(".banner p"),dead:l(".deadmsg"),slotname:l(".slotname"),wh:l(".warehouse"),whMoney:l(".wh-money"),whStock:l(".wh-stock"),whHelpers:l(".wh-helpers"),whHoe:l(".wh-hoe")},this.faceCtx=this.$.face.getContext("2d");for(const c of a.querySelectorAll(".slot[data-n]"))c.addEventListener("pointerdown",h=>{h.preventDefault(),h.stopPropagation(),this.onSlot?.(c.dataset.k)});this.nameT=0,this.prev={},this.lines=[],this.bannerT=0,this.arrowEls=[],this.hurtK=0,this.heartIcons={full:o("heart_full"),half:o("heart_half"),empty:o("heart_empty")},Sp(()=>{this.prev={},yr(this.el)})}show(t){this.el.classList.toggle("hidden",!t);try{sw()?.dockBadge?.()}catch{}}_set(t,e,n){this.prev[t]!==e&&(this.prev[t]=e,n(e))}setHearts(t,e=20){this._set("hp",t,()=>{for(let n=0;n<this.$.hearts.length;n++){const s=t-n*2,r=s>=2?"full":s===1?"half":"empty";this.$.hearts[n].src=this.heartIcons[r]}this.$.hearts[0].parentElement.classList.toggle("low",t<=6)})}setInventory({bags:t,powder:e,green:n,stock:s,turretsAfford:r=0,seedTotal:o=0,nextSeed:a=null}){const l=t||{potato:s??0,wheat:0,carrot:0,corn:0},c=o||(l.potato|0)+(l.wheat|0)+(l.carrot|0)+(l.corn|0);this._set("inv",`${c}|${a||""}|${e}|${n}|${r}`,()=>{const h=this.$.slots;if(h.seed){const d=h.seed.querySelector("span");d&&(d.textContent=c),h.seed.classList.toggle("empty",c<=0);const u=h.seed.querySelector("img");u&&(u.src=this.atlas.iconURL(a?"item_"+a:"item_seed"))}h.powder.querySelector("span").textContent=e,h.green.querySelector("span").textContent=n,h.powder.classList.toggle("empty",e<=0),h.green.classList.toggle("empty",n<=0),h.turret&&(h.turret.querySelector("span").textContent=r,h.turret.classList.toggle("empty",r<=0),h.turret.classList.toggle("ready",r>0))})}setWarehouse({money:t=0,bags:e={},helpers:n=0,helperCap:s=0,hoeLevel:r=0}={}){const o=`${t}|${e.potato}|${e.wheat}|${e.carrot}|${e.corn}|${n}|${s}|${r}`;this._set("wh",o,()=>{this.$.whMoney.textContent=W("panel.money",{n:t|0}),this.$.whHelpers.textContent=W("panel.helpers",{n:1+(n|0),m:1+(s|0)}),this.$.whHoe.textContent=W("panel.hoeLevel",{n:(r|0)+1});const a=["potato","wheat","carrot","corn"].map(l=>{const c=e[l]|0;return`<div class="wh-row" data-crop="${l}">
          <img alt="" src="${this.atlas.iconURL("item_"+l)}"><b>${W("item."+l)}</b><em>×${c}</em>
        </div>`}).join("");this.$.whStock.innerHTML=a})}setAlarm(t){this._set("alarm",t?1:0,()=>this.$.alarm.classList.toggle("on",!!t))}setHeld(t,e=null){this._set("held",`${t}|${e||""}`,()=>{for(const[n,s]of Object.entries(this.$.slots))s.classList.toggle("sel",n===t);t==="seed"&&e?this.$.slotname.textContent=W("item.seed")+" · "+W("item."+e):this.$.slotname.textContent=W("item."+t),this.nameT=this.prev.heldShown?1.6:0,this.prev.heldShown=!0})}setDay(t,e,n,s=!1){this._set("day",`${t}|${e}|${s}`,()=>{this.$.dayname.textContent=W(s?"hud.dayEndless":"hud.day",{n:t}),this.$.sunmoon.className="sunmoon "+(e==="night"||e==="dusk"?"moon":"sun"),this.$.sunmoon.title=W("hud.phase."+e)});const r=Math.round(n*100);this._set("clock",r,()=>{this.$.clock.style.width=r+"%"})}setGoal(t,e){this._set("goal",`${t}/${e}`,()=>{this.$.goalval.textContent=W("hud.goalVal",{n:t,m:e}),this.$.goalbar.style.width=Math.min(100,t/Math.max(1,e)*100)+"%",this.$.goal.classList.toggle("done",t>=e)})}setObjective(t){this._set("obj",t||"",e=>{this.$.obj.classList.toggle("hidden",!e),this.$.obj.textContent=e})}setRobot(t,e,n){this._set("rstate",t,()=>{this.$.rstate.textContent=W("hud.robot."+t),this.$.robot.dataset.s=t});const s=e+(e==="scared"?Math.floor(n*8)%3:"");this._set("rface",s,()=>this.drawFace(this.faceCtx,e,n))}setPrompt(t,e,n=!1){const{device:s,padType:r}=this.glyphCtx(),o=t?`${t}|${e}|${s}|${r}|${n}`:"";this._set("prompt",o,()=>{if(this.$.prompt.classList.toggle("hidden",!t),this.$.prompt.classList.toggle("dim",n),!t)return;let a="";s!=="touch"&&(t.startsWith("slot:")?a=s==="pad"?_h("slots",s,r):`<kbd class="gl gl-key">${t.slice(5)}</kbd>`:a=_h(t,s,r)),this.$.pg.innerHTML=a,this.$.pt.textContent=e})}chat(t,e="astra",n=""){const s=document.createElement("div");s.className="line "+e;const r=n||W("name.astra");s.innerHTML=e==="astra"?`<span class="who">${Tc(r)}</span> ${Tc(t)}`:Tc(t),this.$.chat.appendChild(s),this.lines.push({div:s,t:0});const o=document.documentElement.dataset.device==="touch"?3:5;for(;this.lines.length>o;)this.lines.shift().div.remove()}clearChat(){for(const t of this.lines)t.div.remove();this.lines=[]}banner(t,e="",n=3){this.$.bh.textContent=t,this.$.bp.textContent=e,this.bannerT=n,this.bannerDur=n}setDead(t){this.$.dead.classList.toggle("hidden",!t)}hurt(t){this.hurtK=Math.max(this.hurtK,t)}setArrows(t){for(;this.arrowEls.length<t.length;){const e=document.createElement("div");e.className="arrow",e.innerHTML="<i></i>",this.$.arrows.appendChild(e),this.arrowEls.push(e)}this.arrowEls.forEach((e,n)=>{const s=t[n];if(!s){e.style.display="none";return}e.style.display="",e.style.left=(s.x*100).toFixed(2)+"%",e.style.top=(s.y*100).toFixed(2)+"%",e.style.transform=`translate(-50%, -50%) rotate(${s.ang.toFixed(3)}rad)`,e.classList.toggle("fuse",!!s.fuse),e.classList.toggle("big",!!s.big)})}update(t){for(const e of this.lines){e.t+=t;const n=e.t<9?1:Math.max(0,1-(e.t-9)/1.5);e.div.style.opacity=n.toFixed(2)}if(this.bannerT>0){this.bannerT-=t;const e=this.bannerDur-this.bannerT,n=Math.min(1,e/.35,Math.max(0,this.bannerT)/.6);this.$.banner.style.opacity=n.toFixed(2)}else this.$.banner.style.opacity="0";this.nameT=Math.max(0,this.nameT-t),this.$.slotname.style.opacity=Math.min(1,this.nameT/.4).toFixed(2),this.hurtK=Math.max(0,this.hurtK-t*1.6),this.$.hurt.style.opacity=this.hurtK.toFixed(2)}}const ji=i=>String(i).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function Mw(i,t){const e=n=>t.iconURL(n);Lf(i,t),Sp(()=>Lf(i,t)),i.addModal("intro",`
<section id="m-intro" class="modal hidden"><div class="card story" data-scroll>
  <h2 data-i18n="intro.title">${W("intro.title")}</h2>
  <div class="story-body">
    ${[0,1,2,3,4,5].map(n=>`<p data-i18n="intro.p${n}">${W("intro.p"+n)}</p>`).join("")}
  </div>
  <button data-act="introGo" data-i18n="intro.start">${W("intro.start")}</button>
</div></section>`),i.addModal("report",`
<section id="m-report" class="modal hidden"><div class="card report">
  <h2 class="r-title"></h2>
  <div class="r-stats">
    <div class="st"><img alt="" src="${e("item_potato")}"><span data-i18n="report.harvest">${W("report.harvest")}</span><b class="v-h"></b></div>
    <div class="st"><img alt="" src="${e("item_powder")}"><span data-i18n="report.kills">${W("report.kills")}</span><b class="v-k"></b></div>
    <div class="st"><span class="boom"></span><span data-i18n="report.booms">${W("report.booms")}</span><b class="v-b"></b></div>
  </div>
  <p class="r-goal"></p>
  <p class="r-line"></p>
  <button data-act="nextDay" class="r-next" data-i18n="report.next">${W("report.next")}</button>
  <button data-act="toTitle" class="r-title-btn hidden" data-i18n="report.toTitle">${W("report.toTitle")}</button>
</div></section>`),i.addModal("ending",`
<section id="m-ending" class="modal hidden"><div class="card ending" data-scroll>
  <h2 data-i18n="ending.title">${W("ending.title")}</h2>
  <p class="e-rank"></p>
  <div class="r-stats">
    <div class="st"><img alt="" src="${e("item_potato")}"><span data-i18n="ending.total">${W("ending.total")}</span><b class="v-h"></b></div>
    <div class="st"><img alt="" src="${e("item_powder")}"><span data-i18n="report.kills">${W("report.kills")}</span><b class="v-k"></b></div>
    <div class="st"><span class="star"></span><span data-i18n="ending.stars">${W("ending.stars")}</span><b class="v-s"></b></div>
    <div class="st"><img alt="" src="${e("item_green")}"><span data-i18n="ending.green">${W("ending.green")}</span><b class="v-g"></b></div>
  </div>
  <p class="e-best"></p>
  <div class="e-lines"></div>
  <p class="e-unlock hidden" data-i18n="ending.unlock">${W("ending.unlock")}</p>
  <button data-act="endlessGo" data-i18n="ending.endless">${W("ending.endless")}</button>
  <button data-act="toTitle" data-i18n="ending.toTitle">${W("ending.toTitle")}</button>
</div></section>`),i.addModal("endless",`
<section id="m-endless" class="modal hidden"><div class="card">
  <h2 data-i18n="title.endless">${W("title.endless")}</h2>
  <p class="body" data-i18n="endless.body">${W("endless.body")}</p>
  <button data-act="endlessContinue" class="en-cont"></button>
  <button data-act="endlessNew" data-i18n="endless.new">${W("endless.new")}</button>
  <button data-act="back" data-i18n="ui.back">${W("ui.back")}</button>
</div></section>`)}function Lf(i,t){const e=i.modals?.howto?.querySelector(".howto-guide");if(!e||!t)return;const n=a=>t.iconURL(a),s=(a,l,c,h="")=>`
    <div class="guide-row">
      <img alt="" src="${a}">
      <div><b data-i18n="${l}">${W(l)}</b><span>${ji(c)}${h}</span></div>
    </div>`,r=[["item_sword","item.sword",W("howto.tool.sword")],["item_hoe","item.hoe",W("howto.tool.hoe")],["item_seed","item.seed",W("howto.tool.seed")],["item_dirt","item.dirt",W("howto.tool.dirt")],["item_powder","item.powder",W("howto.tool.powder")],["item_turret","item.turret",W("howto.tool.turret",{n:ys.turret})]],o=[["item_potato","item.potato",qr.potato],["item_wheat","item.wheat",qr.wheat],["item_carrot","item.carrot",qr.carrot],["item_corn","item.corn",qr.corn]];e.innerHTML=`
    <h3 data-i18n="howto.tools">${W("howto.tools")}</h3>
    <div class="guide-grid">${r.map(([a,l,c])=>s(n(a),l,c)).join("")}</div>
    <h3 data-i18n="howto.economy">${W("howto.economy")}</h3>
    <div class="guide-grid">
      <div class="guide-row">
        <span class="guide-pig" aria-hidden="true"></span>
        <div><b data-i18n="howto.pig">${W("howto.pig")}</b><span>${ji(W("howto.pigVal",{n:Mh}))}</span></div>
      </div>
      ${o.map(([a,l,c])=>s(n(a),l,W("howto.sellVal",{n:c}))).join("")}
    </div>`,yr(e)}function Sw(i,t){const e=i.modals.endless.querySelector(".en-cont");e.textContent=W("endless.continue",{n:t})}function ww(i,t){const e=i.modals.report;e.querySelector(".r-title").textContent=W("report.title",{n:t.day}),e.querySelector(".v-h").textContent=t.harvest,e.querySelector(".v-k").textContent=t.kills,e.querySelector(".v-b").textContent=t.booms;const n=e.querySelector(".r-goal");n.textContent=t.harvest>=t.goal?W("report.goalOk"):W("report.goalNg",{n:t.goal-t.harvest}),n.classList.toggle("ok",t.harvest>=t.goal),e.querySelector(".r-line").innerHTML=`<span class="who">${ji(W("name.astra"))}</span> ${ji(t.line)}`;const s=e.querySelector(".r-next");s.dataset.i18n=t.last?"report.last":"report.next",e.querySelector(".r-title-btn").classList.toggle("hidden",!t.endless),yr(e)}function Ew(i,t){const e=i.modals.ending;e.querySelector(".e-rank").innerHTML=`<small>${ji(W("ending.rank"))}</small>${ji(W("rank."+t.rank))}`,e.querySelector(".v-h").textContent=t.harvest,e.querySelector(".v-k").textContent=t.kills,e.querySelector(".v-s").textContent=`${t.stars} / 5`,e.querySelector(".v-g").textContent=t.green,e.querySelector(".e-best").textContent=t.newBest?W("ending.new"):t.best?W("ending.best",{n:t.best}):"",e.querySelector(".e-best").classList.toggle("new",!!t.newBest),e.querySelector(".e-unlock").classList.toggle("hidden",!t.unlocked),e.querySelector(".e-lines").innerHTML=[0,1,2].map(n=>`<p><span class="who">&lt;${ji(W("name.astra"))}&gt;</span> ${ji(W("ending.line."+n))}</p>`).join("")}function Df(i,t){const e=document.createElement("canvas");e.width=256,e.height=64;const n=e.getContext("2d");n.clearRect(0,0,256,64),n.font="bold 28px system-ui,Segoe UI,sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(16,12,224,40);const s="#"+(t>>>0).toString(16).padStart(6,"0");n.strokeStyle=s,n.lineWidth=3,n.strokeRect(18,14,220,36),n.fillStyle="#fff6d8",n.fillText(i.slice(0,14),128,34);const r=new is(e);r.colorSpace=Ve,r.magFilter=Ke,r.minFilter=Ke;const o=new Za({map:r,transparent:!0,depthTest:!0}),a=new Kh(o);return a.scale.set(1.8,.45,1),a.position.y=2.2,a}class Tw{constructor(t){this.scene=t,this.byPk=new Map}upsert(t,e){let n=this.byPk.get(t);if(n)return e&&e!==n.name&&(n.name=Ri(e)||n.name,n.root.remove(n.label),n.label.material.map?.dispose(),n.label.material.dispose(),n.label=Df(n.name,n.color),n.root.add(n.label)),n;const s=A1(t),r=Np({tint:s,seed:120+(s&31)});r.setFace("normal"),r.setAntenna(s);const o=r.root;o.name="remote:"+t.slice(0,8),o.scale.setScalar(.92);const a=Df(Ri(e)||"Farmer",s);return o.add(a),this.scene.add(o),n={pk:t,color:s,name:Ri(e)||"Farmer",model:r,root:o,label:a,pos:new U,yaw:Math.PI,target:new U,targetYaw:Math.PI,moving:!1,t:0},this.byPk.set(t,n),n}remove(t){const e=this.byPk.get(t);e&&(this.scene.remove(e.root),e.label.material.map?.dispose(),e.label.material.dispose(),this.byPk.delete(t))}clear(){for(const t of[...this.byPk.keys()])this.remove(t)}applyPose(t,e,n,s,r,o=0){const a=this.byPk.get(t);a&&(a.target.set(e,n,s),a.targetYaw=r,a.moving=!!(o&1))}update(t,e=12){for(const n of this.byPk.values()){n.t+=t,n.pos.lerp(n.target,1-Math.exp(-12*t));let s=n.targetYaw-n.yaw;for(;s>Math.PI;)s-=Math.PI*2;for(;s<-Math.PI;)s+=Math.PI*2;n.yaw+=s*(1-Math.exp(-10*t)),n.root.position.copy(n.pos),n.root.rotation.y=n.yaw+Math.PI;const r=n.moving?Math.sin(n.t*10)*.35:0,{legL:o,legR:a,armL:l,armR:c}=n.model.parts;o.rotation.x=r,a.rotation.x=-r,l.rotation.x=-r*.6,c.rotation.x=r*.6,n.model.setLight(e,0)}}}const nr=[{goal:40,day:170,night:50,mobsDay:1,mobsNight:3},{goal:70,day:145,night:55,mobsDay:2,mobsNight:4},{goal:100,day:145,night:60,mobsDay:3,mobsNight:6},{goal:130,day:145,night:65,mobsDay:4,mobsNight:8},{goal:160,day:145,night:75,mobsDay:5,mobsNight:9,boss:!0}],si=12,If=7,Ac=4.8,Nf=[0,300,600,900],Ei=["sword","hoe","seed","dirt","powder","turret"],Aw={title:{title:!0,input:"menu",music:"title"},intro:{input:"menu",modal:"intro",music:"title"},play:{hud:!0,touch:!0,input:"play"},paused:{hud:!0,input:"menu",modal:"pause",duck:!0},dead:{hud:!0,input:"actions"},report:{input:"menu",modal:"report",music:"report"},ending:{input:"menu",modal:"ending",music:"ending"}};class Rw{constructor({renderer:t,input:e,audio:n,screens:s,touch:r,ui:o}){Object.assign(this,{renderer:t,input:e,audio:n,screens:s,touch:r}),this.save=vp("astra-potato-farm.save",{best:0,run:null,cleared:!1,endless:null,endlessBest:null},1),this.mode="story",this.time=0,this.state="title",this.atlas=s1();const a=this.scene=new Tm;a.background=new Ot(9356287),this.camera=new Ln(72,innerWidth/innerHeight,.05,420),this.camera.name="camera",a.add(this.camera),this.world=new f1,this.mesher=new x1(this.world,this.atlas),a.add(this.mesher.group),this.sky=new S1(a,this.atlas),this.particles=new z1(a),this.floats=new V1(a),this.sel=X1(),a.add(this.sel),this.player=new B1(this,this.camera),this.robot=new ef(this),this.helpers=[],this.turrets=[],this.pigGates=null,this.chargeBay=null,this.mobs=[],this.pigs=[],this.drops=new vw(this),this.crops=new Map,this.reserved=new Set,this.money=20,this.lifetimeCoins=0,this._alarmLit=!1,this.seedCursor=0,this.online=!1,this.remotes=new Tw(a),this._mobNetSeq=1,this._netSyncT=0,this._netPhase=null,this.hud=new bw(o,{atlas:this.atlas,drawFace:Ip,glyphCtx:()=>({device:e.device,padType:ee.padType==="auto"?e.padType:ee.padType}),onSlot:h=>{this.state==="play"&&this.selectTool(h)}}),this.talk=new _w({onLine:h=>{this.hud.chat(h,"astra",W("name.astra")),this.audio.sfx("robot_talk",{pos:this.robot.body.pos,refDistance:6,n:Math.min(6,2+Math.floor(h.length/10))})},onSys:(h,d)=>this.hud.chat(h,d)}),Mw(s,this.atlas),s.cb.onAction=h=>this.onAction(h),t.setScene(a,this.camera),t.renderer.toneMapping=Jn,t.setLook({exposure:1,bloomStrength:.32,bloomRadius:.4,bloomThreshold:.92,vignette:.22,saturation:1.06,contrast:1.02}),this.meshBudget=4,this.particleScale=1,this.fogFar=105;const l=(h={})=>{this.meshBudget=h.meshBudget??4,this.particleScale=h.particleScale??1,this.fogFar=h.fogFar??105,this.particles&&h.particleScale!=null&&(this.particles.max=Math.max(200,Math.floor(1500*Math.min(1,h.particleScale*1.4)))),this.camera&&Math.abs(this.camera.far-420)>1&&(this.camera.far=420,this.camera.updateProjectionMatrix())};l(t.preset),t.onQuality=l;const c=()=>{const h=t.renderer,d=new Ft;h.getDrawingBufferSize(d),this.particles.setScale(d.y,this.camera.fov)};t.onResize=c,c(),this.titleMode=!0,this.titleAng=.6,this.shake=0,this.flash=0,this.fade=0,this.grace=0,this.attackCool=0,this.useCool=0,this.eatCool=0,this.target=null,this.targetMob=null,this.targetRobot=!1,this.useDecision=null,this.tool="sword",this.bags=Ur({potato:6,wheat:4,carrot:4,corn:3}),this.money=20,this.lifetimeCoins=0,this.powder=0,this.green=0,this.dayIndex=0,this.clock=30,this.phase="day",this.today=this.freshToday(),this.totals={harvest:0,kills:0,booms:0,stars:0,green:0,wheat:0,carrot:0,corn:0}}get stock(){return this.bags.potato}set stock(t){this.bags.potato=Math.max(0,t|0)}get seedTotal(){return Nr.reduce((t,e)=>t+(this.bags[e]|0),0)}peekNextSeed(){const t=Nr.length;for(let e=0;e<t;e++){const n=Nr[(this.seedCursor+e)%t];if(this.seedCount(n)>0)return n}return null}advanceSeedCursor(t){const e=Nr.indexOf(t);e>=0&&(this.seedCursor=(e+1)%Nr.length)}seedCount(t){return this.bags[t]??0}addSeed(t,e=1){t in this.bags&&(this.bags[t]=Math.max(0,(this.bags[t]|0)+e))}takeSeed(t,e=1){return this.seedCount(t)<e?!1:(this.bags[t]-=e,!0)}say(t,e){return this.titleMode?!1:this.talk.say(t,e)}freshToday(){return{harvest:0,kills:0,booms:0,lost:0,goalDone:!1,stolen:0,turretsLost:0,kidnapped:0,rescued:0}}async init(){await document.fonts?.ready,this.world.generate(),this.rebuildCrops(),this.mesher.update(999),this.chargeBay?.dispose(),this.chargeBay=new Pf(this),this.spawnPigs(),this.robot.reset(),this.player.reset(ut.spawn),this.updateTitleCamera(0),this.sky.update(.12,this.camera,0,0),this.screens.setContinue(!!this.save.data.run),this.screens.setEndless?.(!!this.save.data.cleared),this.updateBestLabel(),this.setSplash(),this.setState("title")}setState(t){const e=Aw[t];if(!e)throw new Error("状態がありません: "+t);const n=this.state;this.state=t,this.screens.showTitle(!!e.title),this.hud.show(!!e.hud),this.touch.setVisible(!!e.touch),this.input.mode=e.input||"menu",e.modal?this.screens.isOpen(e.modal)||(this.screens.closeAll(),this.screens.open(e.modal)):this.screens.closeAll(),e.music&&this.audio.music(e.music),this.audio.duck(!!e.duck),t!=="play"&&t!=="paused"&&t!=="dead"&&this.input.unlockPointer?.(),this[`enter_${t}`]?.(n),n!==t&&Bd.emit("state",{from:n,to:t})}enter_title(){this.titleMode=!0,this.mode="story",this.screens.setContinue(!!this.save.data.run),this.screens.setEndless?.(!!this.save.data.cleared),this.updateBestLabel(),this.setSplash(),this.audio.setAmbience({wind:.3}),this.audio.loop("birds","bird",{period:2.6,jitter:1.6}),this.audio.stopLoop("crickets")}enter_play(t){this.grace=.25,this.titleMode=!1,t!=="paused"&&this.updateMusic(!0)}enter_paused(){this.audio.sfx("pause")}enter_dead(){this.deadT=0,this.hud.setDead(!0),this.audio.sfx("hurt",{big:!0})}start(){if(this._netStarting)return;if(!b0()){this.startSolo();return}Kn.player||Kn.setPlayer("Farmer"),this._netStarting=!0,this.screens.setPlayBusy(!0),this.screens.setNetStatus(W("net.looking")),this.wireNetHooks(),iw()||(this._netStarting=!1,this.screens.setPlayBusy(!1),this.startSolo())}startSolo(){this.online=!1,Mc(),this.remotes.clear(),this.mode="story",this.tool="sword",this.player.setTool("sword"),this.save.data.run=null,this.save.save(),this.newWorld(),this.bags=Ur({potato:6,wheat:4,carrot:4,corn:3}),this.money=20,this.lifetimeCoins=0,this.powder=0,this.green=0,this.totals={harvest:0,kills:0,booms:0,stars:0,green:0,wheat:0,carrot:0,corn:0},this.tut={step:0,harvest:0,plant:0,till:0},this.setState("intro")}wireNetHooks(){Re.setStatus=t=>this.screens.setNetStatus(t),Re.getPose=()=>{const t=this.player;if(!t)return null;const e=t.body.vel,n=Math.hypot(e.x,e.z)>.4?1:0;return{x:t.pos.x,y:t.pos.y,z:t.pos.z,yaw:t.yaw,flags:n}},Re.onRemotePose=(t,e,n,s,r,o)=>{this.remotes.upsert(t),this.remotes.applyPose(t,e,n,s,r,o)},Re.onRoster=(t,e,n)=>{n?(this.remotes.upsert(t,e),this.hud.chat(W("net.joined",{name:e||"Farmer"}),"sys")):(this.remotes.remove(t),this.hud.chat(W("net.left"),"sys"))},Re.onGame=t=>this.onNetGame(t),Re.beginFarm=()=>this.beginOnlineFarm()}isNetHost(){return this.online&&Rf()==="host"}isNetClient(){return this.online&&Rf()==="client"}onNetGame(t){if(!(!t||!this.online))if(t.t==="pigSell"&&t.id!=null)this.removePigNet(t.id);else if(t.t==="sim"&&this.isNetClient())this.applyNetSim(t);else if(t.t==="boom"&&this.isNetClient())this.applyNetBoom(t);else if(t.t==="hitMob"&&this.isNetHost())this.applyNetHit(t);else if(t.t==="endDay"&&this.isNetClient())this.endDay({fromNet:!0});else if(t.t==="turretPlaced")this.applyNetTurret(t);else if(t.t==="turretDown"&&this.isNetClient()){const e=this.turrets.find(n=>Math.hypot(n.x-(t.x|0),n.z-(t.z|0))<1.2);e&&!e.dead&&this.onTurretDestroyed(e)}else t.t==="pigSpawn"?this.applyNetPigSpawn(t):t.t==="world"&&this.applyNetWorld(t)}syncFarm(t){if(!this.online)return t();const e=this.world,n=e.set.bind(e),s=[];e.set=(l,c,h,d)=>{n(l,c,h,d),e.inside(l,c,h)&&s.push(e.idx(l,c,h),d&255)};let r;try{r=t()}finally{e.set=n}if(!s.length)return r;const o=new Map;for(let l=0;l<s.length;l+=2)o.set(s[l],s[l+1]);const a=[];for(const[l,c]of o)a.push(l,c);return ri({t:"world",p:a}),r}applyNetWorld(t){if(!Array.isArray(t.p)||!t.p.length)return;const e=this.world,n=at*zt,s=e.data.length;for(let r=0;r+1<t.p.length;r+=2){const o=t.p[r]|0,a=t.p[r+1]|0;if(o<0||o>=s)continue;const l=o%at,c=(o/at|0)%zt,h=o/n|0;e.set(l,h,c,a),cn(a)?this.crops.set(o,0):this.crops.delete(o)}}makeMob(t,e,n,{big:s=!1}={}){return t==="golem"?new pw(this,e,n):t==="thief"?new mw(this,e,n):t==="dragon"?new gw(this,e,n):t==="chomp"?new dw(this,e,n):t==="hop"?new fw(this,e,n):new uw(this,e,n,{big:s,night:this.phase==="night"})}pickSwarmKind(t){const e=t();return e<.34?"boom":e<.62?"chomp":e<.88?"hop":"boom"}applyNetTurret(t){const e=t.x|0,n=t.z|0;for(const s of this.turrets)if(Math.hypot(s.x-e,s.z-n)<1.2)return;this.spawnTurretAt(e,n,!0)}removePigNet(t){const e=this.pigs.find(n=>n.netId===t);if(!(!e||e.dead)&&(e.dispose(),this.pigs=this.pigs.filter(n=>n!==e),!this.isNetClient())){const n=this.pigs.filter(s=>!s.dead).length;n<rc&&(this._pigRespawnT=Math.min(this._pigRespawnT??gs,n===0?8:12))}}pushNetSim(t=!1){if(!this.isNetHost()||this.state==="title")return;this._netSyncT=0;const e=this.mobs.filter(n=>!n.dead).map(n=>({id:n.netId,x:+n.pos.x.toFixed(2),y:+n.pos.y.toFixed(2),z:+n.pos.z.toFixed(2),yaw:+n.yaw.toFixed(2),big:!!n.big,kind:n.kind||"boom",st:n.state,fuse:+(n.fuse||0).toFixed(2),hp:n.hp|0,mv:Math.hypot(n.body?.vel?.x||0,n.body?.vel?.z||0)>.35?1:0}));ri({t:"sim",clock:+this.clock.toFixed(2),phase:this.phase,day:this.dayIndex|0,mobs:e})}applyNetSim(t){typeof t.clock=="number"&&(this.clock=t.clock),Number.isInteger(t.day)&&t.day!==this.dayIndex&&this.cfg,typeof t.phase=="string"&&t.phase!==this.phase&&this.applyNetPhase(t.phase);const e=Array.isArray(t.mobs)?t.mobs:[],n=new Set;for(const s of e){if(s==null||s.id==null)continue;n.add(s.id);let r=this.mobs.find(o=>o.netId===s.id);r||(r=this.makeMob(s.kind||"boom",s.x,s.z,{big:!!s.big}),r.netId=s.id,r.netPuppet=!0,this.mobs.push(r)),r.netPuppet=!0,r.big=!!s.big,r.kind=s.kind||r.kind||"boom",r.body.pos.set(s.x,s.y,s.z),r.yaw=s.yaw,s.st&&s.st!==r.state&&(r.state=s.st,r.stateT=0),r.fuse=s.fuse||0,typeof s.hp=="number"&&(r.hp=s.hp),r._netMoving=!!s.mv,r.dead=!1}for(const s of[...this.mobs])s.netPuppet&&!n.has(s.netId)&&this.removeMob(s)}applyNetPhase(t){const e=this.phase;if(this.phase=t,this._netPhase=t,t===e)return;const n=this.cfg;if(t==="dusk")this.talk.sys("sys.dusk"),this.talk.say("astra.dusk",{cool:0}),this.sendCrewToBed();else if(t==="night"){const s=this.turrets.length,r=n?.boss?W("banner.nightSubBoss"):s>0?W("banner.nightSubTowers",{n:s}):W("banner.nightSub");this.hud.banner(W("banner.night"),r,3.2),this.audio.sfx("night"),this.updateMusic(),this.sendCrewToBed()}else t==="dawn"?(this.talk.sys("sys.dawn"),this.audio.sfx("morning"),this.updateMusic(),this.wakeCrew()):t==="day"&&(e==="dawn"||e==="night")&&this.updateMusic()}applyNetBoom(t){const e=+t.x||0,n=+t.y||0,s=+t.z||0,r=!!t.big,o=new U(e,n,s);if(Array.isArray(t.cells)){const f=this.world,g=at*zt,x=f.data.length;for(const m of t.cells){const p=m|0;if(p<0||p>=x)continue;const y=p%at,T=(p/at|0)%zt,_=p/g|0;f.set(y,_,T,k.AIR)}}const a=this.lightBright(e,n+1,s);this.particles.smoke(e,n,s,r?60:36,r?2:1.2,Math.max(.35,a),r?1.8:1.2),this.audio.sfx("explode",{pos:o,refDistance:6,big:r,dur:r?1.8:1.2});const l=this.player.pos.distanceTo(o);this.shake=Math.max(this.shake,Math.max(0,1-l/(r?28:18))*(r?1.6:1)),this.flash=Math.max(this.flash,Math.max(0,1-l/14)*.55);const c=r?4.3:2.9,h=this.player.pos.clone();h.y+=.9;const d=h.distanceTo(o),u=Math.round(Math.max(0,1-d/(c*1.9))*(r?24:15));u>0&&this.state==="play"&&(this.player.damage(u,o),this.hud.hurt(Math.min(1,.4+u/15)),this.audio.sfx("hurt"))}applyNetHit(t){const e=this.mobs.find(r=>r.netId===t.id);if(!e||e.dead)return;const n=Math.max(1,t.dmg|0),s=new U(+t.x||e.pos.x,e.pos.y,+t.z||e.pos.z);e.hit(n,s,t.knock||1),e.dead&&this.onMobKilled(e,"player")}beginOnlineFarm(){this._netStarting=!1,this.screens.setPlayBusy(!1),this.online=!0,Re.booted=!0;const t=Re.myIdx|0;this.mode="story",this.tool="sword",this.player.setTool("sword"),this.save.data.run=null,this.save.save(),this.newWorld(),this.bags=Ur({potato:6,wheat:4,carrot:4,corn:3}),this.money=20,this.lifetimeCoins=0,this.powder=0,this.green=0,this.totals={harvest:0,kills:0,booms:0,stars:0,green:0,wheat:0,carrot:0,corn:0},this.tut=null;const e=ut.spawn,n=t%2*1.4-(t>0?.7:0),s=Math.floor(t/2)*1.2;this.player.reset([e[0]+n,e[1],e[2]+s]),this.startDay(0),this.setState("play"),this.lockPointer?.(),this.screens.setNetStatus(""),this.hud.chat(W("net.welcome",{name:Kn.player||"Farmer"}),"sys")}continueGame(){this.online=!1,Mc(),this.remotes.clear();const t=this.save.data.run;if(!t){this.startSolo();return}this.mode="story",this.loadRun(t),this.startDay(t.day,{fromSave:!0}),this.setState("play")}startEndless(t=!1){const e=this.save.data.endless;this.mode="endless",e&&!t?(this.loadRun(e),this.startDay(e.day,{fromSave:!0})):(this.newWorld(),this.tool="sword",this.player.setTool("sword"),this.bags=Ur({potato:6,wheat:4,carrot:4,corn:3}),this.money=20,this.lifetimeCoins=0,this.powder=0,this.green=0,this.totals={harvest:0,kills:0,booms:0,stars:0,green:0,wheat:0,carrot:0,corn:0},this.tut=null,this.startDay(0,{endlessHello:!0})),this.setState("play"),this.lockPointer?.()}retry(){this.mode==="endless"?this.startEndless():this.continueGame()}reset(){this.online=!1,this._netStarting=!1,Re.booted=!1,Mc(),this.remotes.clear(),this.screens.setPlayBusy(!1),this.screens.setNetStatus(""),this.newWorld(),this.titleMode=!0,this.hud.clearChat(),this.renderer.setFx({fade:0,flash:0})}clearHired(){for(const t of this.helpers)t.root&&this.scene.remove(t.root);this.helpers=[];for(const t of this.turrets)t.dispose();this.turrets=[]}newWorld(){for(const t of this.mobs)t.dispose();this.mobs=[],this.clearHired(),this.pigGates&&(this.pigGates.dispose(),this.pigGates=null),this.chargeBay&&(this.chargeBay.dispose(),this.chargeBay=null),this.drops.clear(),this.particles.clear(),this.floats.clear(),this.reserved.clear(),this.world.generate(),this.rebuildCrops(),this.mesher.update(999),this.robot.reset(),this.player.reset(ut.spawn),this.pigGates=new ow(this),this.chargeBay=new Pf(this),this.spawnPigs(),this.talk.reset(),this.hud.clearChat(),this.tut=null}loadRun(t){this.newWorld(),this.world.applyDiff(t.diff||[]),this.world.collectSpawns(),this.rebuildCrops(),this.mesher.update(999),this.bags=Ur({potato:t.stock??t.bags?.potato??6,wheat:t.bags?.wheat??t.seeds?.wheat??0,carrot:t.bags?.carrot??t.seeds?.carrot??0,corn:t.bags?.corn??t.seeds?.corn??0}),this.money=t.money??20,this.lifetimeCoins=t.lifetimeCoins??this.money,this.powder=t.powder??0,this.green=t.green??0,this.totals={harvest:0,kills:0,booms:0,stars:0,green:0,wheat:0,carrot:0,corn:0,...t.totals||{}};const e=Math.min(Sh,t.helpers|0);for(let s=0;s<e;s++)this.spawnHelper(!0);const n=Math.min(Js,t.turrets|0);for(let s=0;s<n;s++)this.placeTurret(!0);this.tut=null,this.syncHelpers(!0)}saveRun(){this.save.data[this.mode==="endless"?"endless":"run"]={day:this.dayIndex,stock:this.stock,bags:{...this.bags},money:this.money,lifetimeCoins:this.lifetimeCoins,helpers:this.helpers.length,turrets:this.turrets.length,powder:this.powder,green:this.green,totals:{...this.totals},diff:this.world.diff()},this.save.save()}dayConfig(t){if(t<nr.length)return nr[t];const e=t+1,n=e-nr.length;return{goal:Math.min(160,70+n*12),day:150,night:Math.min(78,55+Math.floor(n*1.5)),mobsDay:Math.min(5,2+Math.floor(n/3)),mobsNight:Math.min(10,4+Math.floor(n*.7)),boss:e%5===0}}get lastDay(){return this.mode==="story"&&this.dayIndex>=nr.length-1}onAction(t){t==="introGo"?(this.startDay(0),this.setState("play"),this.lockPointer?.()):t==="nextDay"?this.lastDay?this.finish():(this.startDay(this.dayIndex+1),this.setState("play"),this.lockPointer?.()):t==="endlessGo"?(this.mode="endless",this.startDay(nr.length,{endlessStart:!0}),this.setState("play"),this.lockPointer?.()):t==="endless"?this.save.data.endless?(Sw(this.screens,this.save.data.endless.day+1),this.screens.open("endless")):this.startEndless(!0):t==="endlessContinue"?this.startEndless(!1):t==="endlessNew"&&this.startEndless(!0)}startDay(t,{fromSave:e=!1,endlessStart:n=!1,endlessHello:s=!1}={}){this.dayIndex=t,this.cfg={...this.dayConfig(t)},this.clock=0,this.phase="day",this._turretNightApplied=!1,this.today=this.freshToday();for(const r of this.mobs)r.dispose();this.mobs=[],this.schedule=this.buildSchedule(this.cfg,t),this.player.reset(ut.spawn),this.talk.reset(),this.hud.clearChat(),this.renderer.setFx({fade:0,flash:0}),this.fade=0,this.hud.setDead(!1),t===0&&!e&&this.tut?["astra.hello.0","astra.hello.1","astra.hello.2","astra.hello.3","astra.hello.4"].forEach((r,o)=>this.talk.say(r,{delay:1.5+o*.2,cool:0})):(this.tut=null,this.morningLine(t,{endlessStart:n,endlessHello:s})),this.hud.banner(W(this.mode==="endless"?"banner.dayEndless":"banner.day",{n:t+1}),W("banner.daySub",{m:this.cfg.goal}),3.6),this.audio.sfx("morning"),this.wakeCrew(),this.syncHelpers(!0),this.saveRun(),this.updateMusic(!0)}sendCrewToBed(){for(const t of[this.robot,...this.helpers])t.captive||t.state==="kidnapped"||t.goToBed()}wakeCrew(){for(const t of[this.robot,...this.helpers]){if(t.captive||t.state==="kidnapped"){t.returnFromCaptivity();continue}t.wake()}for(const t of this.turrets)!t.dead&&t.hp<t.maxHp&&t.mend(4)}hoeLevel(){return _1(this.totals.stars|0)}turretsAfford(){const t=Js-this.turrets.length;return t<=0?0:Math.min(t,Math.floor((this.money|0)/ys.turret))}helperCap(){return b1({stars:this.totals.stars|0,lifetimeCoins:this.lifetimeCoins|0})}syncHelpers(t=!1){const e=this.helperCap();for(;this.helpers.length<e&&this.spawnHelper(t);)t||(this.audio.sfx("ding"),this.talk.sys("sys.hired"),this.hud.banner(W("banner.helper"),W("banner.helperSub"),2.4))}autoSellSurplus(t=null){if(this.titleMode)return 0;let e=0;for(const s of ss){const r=s.dropKind,o=(this.bags[r]|0)-v1;o<=0||(this.bags[r]-=o,e+=M1(r,o))}if(e<=0)return 0;this.money+=e,this.lifetimeCoins+=e;const n=t||this.player.pos;return this.coinBurst(n.x,(n.y??nt+1)+1.2,n.z,e),this.audio.sfx("coin",{pitch:.95+Math.min(.25,e*.01)}),this.floats.add("+"+e+"¢",n.x,(n.y??nt+1)+1.5,n.z,"#ffe25a"),this.syncHelpers(!1),e}coinBurst(t,e,n,s=1){const r=Math.min(18,6+Math.floor(s/2));this.particles.sparkle(t-.4,e-.2,n-.4,r,16765514),this.particles.burst(t-.2,e,n-.2,16762954,Math.min(12,4+(s/3|0)),1.2,.55)}spawnHelper(t=!1){if(this.helpers.length>=Sh)return null;const e=new ef(this,{helper:!0});return e.reset([ut.house.x0+this.helpers.length*.8,nt+1,ut.house.z1+5]),e.setState("work"),this.helpers.push(e),t||this.floats.add("+AI",e.body.pos.x,e.body.pos.y+1.6,e.body.pos.z,"#8ff4ff"),e}placeTurret(t=!1){if(this.turrets.length>=Js)return null;const e=ut.posts,[n,s]=e[this.turrets.length%e.length],r=n+(this.turrets.length>3?1:0);return this.spawnTurretAt(r,s,t)}canPlaceTurret(t,e){const n=this.world,s=n.floorAt(t,e);if(s<1||!n.inside(t,s,e))return!1;const r=n.get(t,s-1,e),o=n.get(t,s,e);if(!ct[r]?.solid&&!oi(r)||o!==k.AIR||this.cellBlocked(t,s,e))return!1;for(const a of this.turrets)if(Math.hypot(a.x-t,a.z-e)<1.2)return!1;return!0}spawnTurretAt(t,e,n=!1){if(this.turrets.length>=Js)return null;const s=new rw(this,t,e);return this.turrets.push(s),n||(this.particles.sparkle(t+.5,nt+1.2,e+.5,10,16765562),this.audio.sfx("ding"),this.talk.sys("sys.turretBuilt")),s}tryPlaceTurret(t,e){if(this.turrets.length>=Js)return this.talk.sys("sys.turretMax"),!1;if(this.money<ys.turret)return this.talk.sys("sys.noMoney"),!1;if(!this.canPlaceTurret(t,e))return this.talk.sys("sys.turretBlocked"),!1;this.money-=ys.turret;const n=!!this.spawnTurretAt(t,e,!1);return n&&this.online&&ri({t:"turretPlaced",x:t|0,z:e|0}),n}morningLine(t,{endlessStart:e=!1,endlessHello:n=!1}={}){const s=t+1,r=(o,a={})=>this.talk.say(o,{delay:1.2,cool:0,...a});if(n){r("astra.endless.hello");return}if(e){r("astra.endless.start"),this.hud.banner(W("banner.shore"),W("banner.shoreSub"),4.2);return}if(t<nr.length&&!(this.mode==="endless"&&this.cfg.boss)){r("astra.morning."+t),t===1&&this.talk.say("astra.lesson",{delay:1.4,cool:0});return}this.cfg.boss?r("astra.endless.boss",{vars:{n:s}}):s%10===0?r("astra.endless.milestone",{vars:{n:s}}):r("astra.endless.morning",{random:!0,vars:{n:s}})}buildSchedule(t,e){const n=es(((this.world?.seed||1)^e*9973^6089985)>>>0),s=[],r=e===0?1e9:35,o=t.day-15,a=[];for(let h=0;h<t.mobsDay;h++){const d=e===0&&h===0?"boom":this.pickSwarmKind(n);a.push({t:r+(o-r)*(h+.3+n()*.4)/Math.max(1,t.mobsDay),kind:d})}if(e===0)for(let h=0;h<a.length;h++)a[h].t=130+h*15;if(e>=1&&a.length>=1){const h=n();a[0].kind=h<.4?"thief":h<.7?"golem":this.pickSwarmKind(n)}e>=1&&a.length>=2&&(a[1].kind=n()<.5?"thief":"golem"),e===0?a.push({t:150,kind:"dragon"}):(a.push({t:r+(o-r)*(.4+n()*.35),kind:"dragon"}),n()<.35&&a.push({t:r+(o-r)*(.15+n()*.2),kind:"dragon"}));for(const h of a)s.push(h);const l=t.day+si,c=[];for(let h=0;h<t.mobsNight;h++)c.push({t:l+3+(t.night-14)*(h+n()*.6)/Math.max(1,t.mobsNight),kind:this.pickSwarmKind(n)});c.length>=2&&(c[1].kind="thief"),c.length>=3&&(c[2].kind="golem"),c.length>=5&&(c[4].kind=n()<.5?"thief":"chomp");for(const h of c)s.push(h);return t.boss&&s.push({t:l+t.night*.35,big:!0,kind:"boom"}),s.sort((h,d)=>h.t-d.t)}applyTurretNightPressure(){if(this._turretNightApplied||!this.cfg)return;this._turretNightApplied=!0;const t=this.turrets.length;if(t<=0)return;const e=this.cfg.night,n=this.cfg.mobsNight|0,s=1+t,r=Math.min(28,Math.max(n,Math.round(n*s))),o=Math.max(0,r-n),a=Math.min(110,Math.round(e*.45*t));this.cfg={...this.cfg,night:e+a,mobsNight:r};const l=es(((this.world?.seed||1)^this.dayIndex*4243^t*9176^41246)>>>0),c=this.cfg.day+si,h=this.cfg.night;for(const d of this.schedule){if(d.t<c||d.big)continue;const u=(d.t-c)/Math.max(1,e-8);d.t=c+3+Math.max(0,Math.min(.95,u))*(h-14)}for(let d=0;d<o;d++){const u=(d+.15+l()*.7)/Math.max(1,o),f=l(),g=f<.25?"thief":f<.4?"golem":this.pickSwarmKind(l);this.schedule.push({t:c+5+u*(h-18),surge:!0,kind:g})}if(t>=2&&l()<.65){const d=c+h*(.38+l()*.22),u=Math.min(4,1+t);for(let f=0;f<u;f++)this.schedule.push({t:d+f*(.9+l()*.4),surge:!0,kind:this.pickSwarmKind(l)})}this.schedule.sort((d,u)=>d.t-u.t),this.talk.sys("sys.turretThreat",{n:t,mobs:r})}get dayLength(){return this.cfg.day+si+this.cfg.night+If}get isNightish(){return this.phase==="dusk"||this.phase==="night"}get robotCanPanic(){return!this.titleMode}get skyTime(){if(this.titleMode)return .13;const t=this.cfg,e=this.clock;return e<t.day?.02+.44*(e/t.day):e<t.day+si?.46+.12*((e-t.day)/si):e<t.day+si+t.night?.58+.36*((e-t.day-si)/t.night):.94+.08*Math.min(1,(e-t.day-si-t.night)/If)}updateDay(t){if(this.isNetClient())return;const e=this.cfg;this.clock+=t;const n=this.clock,s=n<e.day?"day":n<e.day+si?"dusk":n<e.day+si+e.night?"night":"dawn";if(s!==this.phase){if(this.phase=s,s==="dusk")this.applyTurretNightPressure(),this.talk.sys("sys.dusk"),this.talk.say("astra.dusk",{cool:0}),this.sendCrewToBed();else if(s==="night"){const c=this.turrets.length,h=e.boss?W("banner.nightSubBoss"):c>0?W("banner.nightSubTowers",{n:c}):W("banner.nightSub");this.hud.banner(W("banner.night"),h,3.2),this.audio.sfx("night"),this.updateMusic(),this.sendCrewToBed()}else if(s==="dawn"){for(const c of this.mobs)c.leave();this.talk.sys("sys.dawn"),this.audio.sfx("morning"),this.updateMusic(),this.wakeCrew()}this.isNetHost()&&this.pushNetSim(!0)}let r=this.mobs.filter(c=>!c.dead&&c.state!=="leave").length;const o=this.turrets.length,a=s==="night"?Math.min(14,5+o*2):3;let l=0;for(;this.schedule.length&&n>=this.schedule[0].t;){if(s==="dawn"){this.schedule.shift();continue}const c=this.schedule[0];if(r>=a&&!c.big||l>=1){c.t=Math.max(c.t,n)+(l?1.5:4),this.schedule.sort((h,d)=>h.t-d.t);break}this.schedule.shift(),this.spawnMob({big:!!c.big,kind:c.kind||"boom"})&&(r++,l++)}this.updateTutorial(),n>=this.dayLength&&this.endDay()}updateTutorial(){const t=this.tut;!t||t.step<0||(t.step===0&&t.harvest>=3?(t.step=1,this.talk.say("astra.tut.harvest",{cool:0}),this.audio.sfx("ding")):t.step===1&&t.plant>=3?(t.step=2,this.talk.say("astra.tut.plant",{cool:0}),this.audio.sfx("ding")):t.step===2&&t.till>=2?(t.step=3,this.talk.say("astra.tut.till",{cool:0}),this.audio.sfx("ding"),t.mobAt=this.clock+6):t.step===3&&(t.mobAt&&this.clock>=t.mobAt&&(t.mobAt=0,t.mob=this.spawnMob({near:!0}),this.talk.say("astra.tut.mob",{cool:0,delay:.5}),this.schedule=this.schedule.filter(e=>e.t>this.cfg.day)),t.mob&&(t.mob.dead||!this.mobs.includes(t.mob))&&(t.step=-1,this.talk.say("astra.tut.done",{cool:0,delay:1}),this.talk.sys("sys.goalHint",{m:this.cfg.goal}))))}objectiveText(){const t=this.tut;return t&&t.step>=0?t.step===0?W("obj.harvest",{n:Math.min(3,t.harvest),m:3}):t.step===1?W("obj.plant",{n:Math.min(3,t.plant),m:3}):t.step===2?W("obj.till",{n:Math.min(2,t.till),m:2}):W("obj.mob"):this.mobs.some(e=>e.big&&!e.dead)?W("obj.boss"):this.phase==="night"||this.phase==="dusk"?W("obj.night"):this.phase==="dawn"?"":this.today.goalDone?W("obj.done"):""}endDay({fromNet:t=!1}={}){if(this.isNetHost()&&!t&&ri({t:"endDay"}),this.isNetClient()&&!t)return;const e=this.cfg,n=this.today.harvest>=e.goal;for(const o of this.mobs)o.dispose();this.mobs=[];const s=this.lastDay;if(this.mode==="endless"){const o=this.save.data.endlessBest||{day:0,harvest:0};this.save.data.endlessBest={day:Math.max(o.day,this.dayIndex+1),harvest:Math.max(o.harvest,this.totals.harvest)}}let r=W(`astra.report.${n?"good":"ok"}.${Math.floor(Math.random()*3)}`);if((this.today.stolen||this.today.turretsLost||this.today.kidnapped||this.today.rescued)&&(r=W("astra.report.night",{stolen:this.today.stolen|0,towers:this.today.turretsLost|0,taken:this.today.kidnapped|0,saved:this.today.rescued|0})),ww(this.screens,{day:this.dayIndex+1,harvest:this.today.harvest,kills:this.today.kills,booms:this.today.booms,goal:e.goal,line:r,last:s,endless:this.mode==="endless"}),this.syncFarm(()=>this.repairAll()),!s){const o=this.dayIndex;this.dayIndex=o+1,this.saveRun(),this.dayIndex=o}this.audio.sfx(n?"goal":"ding"),this.setState("report")}finish(){const t=this.totals.harvest;let e=0;for(let r=0;r<Nf.length;r++)t>=Nf[r]&&(e=r);const n=t>(this.save.data.best||0);n&&(this.save.data.best=t);const s=!this.save.data.cleared;this.save.data.cleared=!0,this.save.data.run=null,this.save.save(),Ew(this.screens,{harvest:t,kills:this.totals.kills,stars:this.totals.stars,green:this.totals.green,rank:e,best:this.save.data.best,newBest:n,unlocked:s}),this.setState("ending")}updateMusic(t=!1){if(this.state!=="play"&&!t)return;const e=this.phase==="night"||this.phase==="dusk",n=e?this.cfg?.boss?"boss":"night":"day";this.audio.music(n,{crossfade:2}),e?(this.audio.setAmbience({wind:.18,crickets:.8}),this.audio.stopLoop("birds")):(this.audio.setAmbience({wind:.28}),this.audio.loop("birds","bird",{period:2.4,jitter:1.6}))}spawnPigs(){for(const o of this.pigs)o.dispose();this.pigs=[],this._pigNetSeq=0,this._pigRespawnT=gs+Math.random()*(Wd-gs);const t=es((this.world.seed^1346979667)>>>0),e=this.world.pigCells;for(let o=0;o<4&&e.length;o++){const a=e[Math.floor((o+.5)/4*e.length+t()*20)%e.length];this.makePig(a%at+.5,(a/at|0)+.5,{})}const n=ut.pigPen,s=(n.x0+n.x1)*.5+.5,r=(n.z0+n.z1)*.5+.5;this.makePig(s+1.2,r-.8,{penned:!0})}makePig(t,e,{penned:n=!1,netId:s=null}={}){const r=new wc(this,t,e,{penned:n});return s!=null?(r.netId=s|0,this._pigNetSeq=Math.max(this._pigNetSeq|0,(s|0)+1)):(r.netId=this._pigNetSeq|0,this._pigNetSeq=(this._pigNetSeq|0)+1),this.pigs.push(r),r}pickPigSpawnCell(){const t=this.world.pigCells;if(!t.length)return null;for(let n=0;n<48;n++){const s=t[Math.floor(Math.random()*t.length)],r=s%at+.5,o=(s/at|0)+.5;if(!this.pigs.some(a=>!a.dead&&Math.hypot(a.pos.x-r,a.pos.z-o)<3.5))return{x:r,z:o,penned:!1}}const e=t[Math.floor(Math.random()*t.length)];return{x:e%at+.5,z:(e/at|0)+.5,penned:!1}}tickPigRespawn(t){if(this.titleMode||this.state==="title"||this.state==="intro"||this.isNetClient())return;const e=this.pigs.filter(o=>!o.dead).length;if(e>=rc||(this._pigRespawnT=(this._pigRespawnT??gs)-t*(e===0?1.75:1),this._pigRespawnT>0))return;this._pigRespawnT=gs+Math.random()*(Wd-gs);const n=this.pigs.filter(o=>!o.dead&&o.penned).length;let s=null;if(n===0&&e<=1&&Math.random()<.5){const o=ut.pigPen;s={x:(o.x0+o.x1)*.5+.5+(Math.random()-.5)*2.2,z:(o.z0+o.z1)*.5+.5+(Math.random()-.5)*2.2,penned:!0}}else s=this.pickPigSpawnCell();if(!s)return;const r=this.makePig(s.x,s.z,{penned:s.penned});this.online&&ri({t:"pigSpawn",id:r.netId,x:+s.x.toFixed(2),z:+s.z.toFixed(2),penned:!!s.penned})}applyNetPigSpawn(t){if(t?.id==null)return;const e=t.id|0;this.pigs.some(n=>n.netId===e)||this.makePig(+t.x||0,+t.z||0,{penned:!!t.penned,netId:e})}sellPig(t){if(!t||t.dead||!t.penned)return!1;const e=Mh,n=t.netId;this.money+=e,this.lifetimeCoins+=e;const s=t.pos;this.coinBurst(s.x,s.y+.8,s.z,e),this.floats.add("+"+e+"¢",s.x,s.y+1.3,s.z,"#ffe25a"),this.audio.sfx("coin",{pitch:1.05}),this.talk.sys("sys.soldPig",{pay:e}),t.dispose(),this.pigs=this.pigs.filter(o=>o!==t),this.syncHelpers(!1),this.online&&n!=null&&ri({t:"pigSell",id:n});const r=this.pigs.filter(o=>!o.dead).length;return r<rc&&(this._pigRespawnT=Math.min(this._pigRespawnT??gs,r===0?8:12)),!0}spawnMob({big:t=!1,near:e=!1,kind:n="boom"}={}){const s=this.world,r=this.player.pos,o=this.robot.body.pos;let a=null;for(let u=0;u<60;u++){const f=s.spawnCells[Math.floor(Math.random()*s.spawnCells.length)];if(f===void 0)break;const g=f%at+.5,x=(f/at|0)+.5,m=s.floor[f],p=Math.hypot(g-r.x,x-r.z),y=Math.hypot(g-o.x,x-o.z);if(!(s.lightAt(g,m,x)[1]>=8)&&!(p<(e?10:13)||y<10)&&!(e&&p>22)){a=[g,x];break}}if(!a||this.isNetClient())return null;let l=n||"boom";l==="dragon"&&this.mobs.some(u=>u.kind==="dragon"&&!u.dead)&&(l="thief"),l==="dragon"&&this.isNightish&&(l=this.pickSwarmKind(()=>Math.random()));const c=this.makeMob(l,a[0],a[1],{big:t});c.netId=this._mobNetSeq++,this.mobs.push(c),this.isNetHost()&&this.pushNetSim(!0);const h=ee.mobGuide!=="off",d=t?"sys.boss":l==="golem"?"sys.golem":l==="thief"?"sys.thief":l==="dragon"?"sys.dragon":l==="chomp"?"sys.chomp":l==="hop"?"sys.hop":"sys.mob";return(t||l!=="boom"||h&&this.time-(this.lastMobMsg??-99)>10)&&(this.lastMobMsg=this.time,this.talk.sys(d,null,"warn")),(h||t||l!=="boom")&&this.audio.sfx(t||l==="dragon"?"boss_spawn":"mob_spawn",{pos:c.pos,refDistance:8}),t?this.hud.banner(W("banner.boss"),W("banner.bossSub"),3.2):l==="golem"?this.hud.banner(W("banner.golem"),W("banner.golemSub"),2.6):l==="thief"?this.hud.banner(W("banner.thief"),W("banner.thiefSub"),2.4):l==="chomp"?this.hud.banner(W("banner.chomp"),W("banner.chompSub"),2.2):l==="hop"&&this.hud.banner(W("banner.hop"),W("banner.hopSub"),2.2),c}munchCrop(t,e,n){const s=this.stealCrop(t,e,n);return s>0&&this.talk.sys("sys.chompEat",null,"warn"),s}hopperDig(t,e,n){const s=this.world;if(!this.isFarmCell(t+e*at)&&!Pn(t,e,ut.farmZone))return!1;const r=nt,o=s.get(t,r+1,e);return cn(o)&&(this.crops.delete(s.idx(t,r+1,e)),this.today.lost++,s.set(t,r+1,e,k.AIR)),ct[s.get(t,r,e)]?.solid||oi(s.get(t,r,e))?(s.set(t,r,e,k.AIR),this.particles.burst(t,r,e,8017209,10,1.1),this.floats.add("!",t+.5,r+1.3,e+.5,"#80c0ff"),this.today.lost++,!0):!1}stealCrop(t,e,n){const s=this.world,r=nt+1,o=s.get(t,r,e);return cn(o)?(s.set(t,r,e,k.AIR),this.crops.delete(s.idx(t,r,e)),this.today.stolen++,this.today.lost++,this.particles.burst(t,r,e,12886112,8,1),this.floats.add("-1",t+.5,r+1.2,e+.5,"#ff8080"),1):0}onThiefEscaped(t){t.loot>0&&(this.talk.sys("sys.thiefEscaped",{n:t.loot},"warn"),this.audio.sfx("hurt",{pitch:1.4}))}onThiefDropped(t){const e=t.loot|0;e<=0||(this.money+=e*2,this.lifetimeCoins=(this.lifetimeCoins|0)+e*2,this.floats.add("+"+e*2,t.pos.x,t.pos.y+1.4,t.pos.z,"#ffe080"),this.talk.sys("sys.thiefCaught",{n:e*2}),t.loot=0)}onTurretDestroyed(t){this.today.turretsLost++,this.particles.smoke(t.root.position.x,t.y+1.5,t.root.position.z,16,.7),this.audio.sfx("explode",{pos:t.root.position,pitch:.7,dur:.7}),this.talk.sys("sys.turretDown",null,"warn"),t.dispose(),this.turrets=this.turrets.filter(e=>e!==t),this.isNetHost()&&ri({t:"turretDown",x:t.x,z:t.z})}onDragonEscaped(t){this.today.kidnapped++,this.talk.sys("sys.dragonEscaped",null,"warn"),this.audio.sfx("hurt",{pitch:.7})}nearestMob(t){let e=null;for(const n of this.mobs){if(n.dead||n.state==="leave")continue;const s=Math.hypot(n.pos.x-t.x,n.pos.z-t.z);(!e||s<e.dist)&&(e={mob:n,dist:s})}return e}nearestCrop(t){let e=null,n=1/0;for(const s of this.crops.keys()){const r=s%at,o=Math.floor(s/at)%zt,a=(r+.5-t.x)**2+(o+.5-t.z)**2;a<n&&(n=a,e=[r,o])}return e}isFarmCell(t){if(t<0||t>=at*zt)return!1;const e=t%at,n=t/at|0;return oi(this.world.get(e,nt,n))||Pn(e,n,ut.farmZone)}reserve(t,e,n){const s=t+e*at;n?this.reserved.add(s):this.reserved.delete(s)}isReserved(t,e){return this.reserved.has(t+e*at)}rebuildCrops(){this.crops.clear();const t=this.world;for(let e=1;e<20;e++)for(let n=0;n<zt;n++)for(let s=0;s<at;s++)cn(t.get(s,e,n))&&this.crops.set(t.idx(s,e,n),Math.random()*.6)}growCrops(t){const e=this.world;for(const[n,s]of this.crops){const r=e.data[n],o=kr(r);if(!o||ai(r)){cn(r)||this.crops.delete(n);continue}const a=e.data[n-at*zt],l=ct[a]?.wet,c=.8+(n*2654435761>>>0)%1e3/2500,h=s+t*(l?1/o.growWet:1/o.growDry)*c;if(h>=1){const d=n%at,u=Math.floor(n/at)%zt,f=Math.floor(n/(at*zt)),g=c1(r);e.set(d,f,u,g),this.crops.set(n,0),ai(g)&&Math.random()<.3&&this.particles.sparkle(d,f,u,2,o.sparkle)}else this.crops.set(n,h)}}harvest(t,e,n,s){const r=this.world,o=r.get(t,e,n),a=kr(o);if(!a||!ai(o))return 0;const l=l1(a);r.set(t,e,n,k.AIR),this.crops.delete(r.idx(t,e,n));const c=this.lightBright(t,e,n);this.particles.burst(t,e,n,a.particle,10,c,.8),this.audio.sfx("harvest",{pos:{x:t+.5,y:e+.5,z:n+.5}});const h=a.rareDrop&&Math.random()<(a.rareChance??0);if(s==="player"){const d=a.id==="carrot"?5.5+Math.random()*2:void 0;for(let u=0;u<l;u++)this.drops.spawn(a.dropKind,t+.5,e+.4,n+.5,d!=null?{vy:d}:{});h&&this.drops.spawn(a.rareDrop,t+.5,e+.5,n+.5),this.tut&&this.tut.harvest++}else this.addSeed(a.dropKind,l),this.floats.add("+"+l,t+.5,e+1.3,n+.5),h&&(this.green++,this.totals.green++,this.talk.say("astra.greenPotato",{cool:30}),this.robot.emote.show("!",1.5));return this.totals[a.id]=(this.totals[a.id]||0)+l,a.countsForGoal&&this.countHarvest(l),this.autoSellSurplus({x:t+.5,y:e+1,z:n+.5}),l}pickPlantSeed(t=2){const e=ss.filter(n=>this.seedCount(n.dropKind)>t).map(n=>n.id);return e.length?e[Math.floor(Math.random()*e.length)]:null}countHarvest(t){this.today.harvest+=t,this.totals.harvest+=t,!this.today.goalDone&&this.cfg&&this.today.harvest>=this.cfg.goal&&!this.titleMode&&(this.today.goalDone=!0,this.totals.stars=(this.totals.stars|0)+1,this.hud.banner(W("banner.goal"),W("banner.goalSub",{hoe:this.hoeLevel()+1}),2.8),this.audio.sfx("goal"),this.talk.say("astra.goal",{random:!0,cool:0,delay:.8}),this.hoeLevel()>0&&this.talk.sys("sys.hoeUp",{n:this.hoeLevel()+1}),this.syncHelpers(!1))}plant(t,e,n,s,r="potato"){const o=this.world,a=o1[r]||u1(r);return!a||!oi(o.get(t,e-1,n))||o.get(t,e,n)!==k.AIR||this.isHole(t,e,n)||!this.takeSeed(a.dropKind,1)?!1:(o.set(t,e,n,a.stages[0]),this.crops.set(o.idx(t,e,n),0),this.audio.sfx("plant",{pos:{x:t+.5,y:e+.2,z:n+.5}}),this.particles.burst(t+.2,e-.05,n+.2,8017209,5,this.lightBright(t,e,n),.6),s==="player"&&this.tut&&this.tut.plant++,!0)}isWetSpot(t,e,n){const s=this.world;for(let r=-4;r<=4;r++)for(let o=-4;o<=4;o++)for(const a of[0,1])if(s.get(t+o,e+a,n+r)===k.WATER)return!0;return!1}till(t,e,n,s){const r=s==="player"?this.hoeLevel():Math.min(1,this.hoeLevel()),o=[[0,0]];r>=1&&o.push([1,0],[-1,0],[0,1],[0,-1]),r>=2&&o.push([1,1],[1,-1],[-1,1],[-1,-1]);let a=0;for(const[l,c]of o)this.tillOne(t+l,e,n+c,s)&&a++;return a>0&&this.audio.sfx("till",{pos:{x:t+.5,y:e+1,z:n+.5},pitch:.9+r*.08}),a>0}tillOne(t,e,n,s){const r=this.world,o=r.get(t,e,n),a=r.get(t,e+1,n);return o!==k.GRASS&&o!==k.DIRT||a!==k.AIR&&!(ct[a].plant&&a!==k.CANE)||this.isHole(t,e+1,n)?!1:(a!==k.AIR&&r.set(t,e+1,n,k.AIR),r.set(t,e,n,this.isWetSpot(t,e,n)?k.FARM_WET:k.FARM),this.particles.burst(t,e+.9,n,8017209,6,this.lightBright(t,e+1,n),1),s==="player"&&this.tut&&this.tut.till++,!0)}isHole(t,e,n){const s=this.world;if(!s.inside(t,e,n))return!1;const r=s.baseAt(t,e,n);if(!ct[r].restore&&!oi(r))return!1;const o=s.get(t,e,n);return o!==k.WATER&&!ct[o].solid}restoreId(t,e,n){const s=this.world.baseAt(t,e,n);let r=oi(s)?k.DIRT:ct[s].restore;return r===k.GRASS&&(ct[this.world.get(t,e+1,n)].solid||this.isHole(t,e+1,n))&&(r=k.DIRT),r}repair(t,e,n,s="player"){const r=this.world;if(!this.isHole(t,e,n))return!1;const o=r.get(t,e,n);if(cn(o)){this.crops.delete(r.idx(t,e,n));const l=kr(o)?.dropKind||"potato";s==="player"?this.drops.spawn(l,t+.5,e+1.1,n+.5):this.addSeed(l,1)}const a=this.restoreId(t,e,n);return r.set(t,e,n,a),r.get(t,e-1,n)===k.GRASS&&r.set(t,e-1,n,k.DIRT),this.audio.sfx("place",{pos:{x:t+.5,y:e+.5,z:n+.5}}),this.particles.burst(t,e+.9,n,ct[a].particle,6,this.lightBright(t,e+1,n),1),s==="player"&&this.tut&&(this.tut.fill=(this.tut.fill||0)+1),!0}repairAll(){const t=this.world;let e=0;for(let n=1;n<24;n++)for(let s=0;s<zt;s++)for(let r=0;r<at;r++){if(!this.isHole(r,n,s))continue;const o=t.get(r,n,s);cn(o)&&(this.crops.delete(t.idx(r,n,s)),this.addSeed(kr(o)?.dropKind||"potato",1)),t.set(r,n,s,this.restoreId(r,n,s)),e++}return e}fertilize(t,e,n){const s=this.world,r=s.get(t,e,n),o=h1(r);return o==null||this.powder<=0?!1:(this.powder--,s.set(t,e,n,o),this.crops.set(s.idx(t,e,n),0),this.particles.sparkle(t,e,n,12,12124042),this.audio.sfx("fertilize",{pos:{x:t+.5,y:e+.5,z:n+.5}}),!0)}collect(t){t in this.bags?(this.addSeed(t,1),t!=="potato"&&(this.totals[t]=this.totals[t]||0),this.autoSellSurplus(this.player.pos)):t==="powder"?(this.powder++,this.powderHinted||(this.powderHinted=!0,this.talk.sys("sys.powder"),this.talk.say("astra.powder",{cool:0,delay:.8}))):t==="green"&&(this.green++,this.totals.green++,this.talk.sys("sys.greenPotato"),this.talk.say("astra.greenPotato",{cool:30,delay:.6})),this.audio.sfx("pickup",{pitch:.9+Math.random()*.3})}lightBright(t,e,n){const[s,r]=this.world.lightAt(t,e,n);return Math.max(.12,Math.max((s/15)**1.6*Se.uSky.value,(r/15)**1.7))}onFuse(t){this.audio.sfx("hiss",{pos:t.pos,refDistance:3,big:t.big})}onDefuse(){}explode(t){const e=this.world,n=t.center,s=t.radius,r=Math.ceil(s+1),o=[],a=[];let l=0;const c=Math.floor(n.x),h=Math.floor(n.y),d=Math.floor(n.z);for(let T=-r;T<=r;T++)for(let _=-r;_<=r;_++)for(let E=-r;E<=r;E++){const w=c+E,P=h+T,v=d+_,R=e.get(w,P,v);!R||!ct[R].blast||P<=1||Math.hypot(w+.5-n.x,P+.5-n.y,v+.5-n.z)>s-Math.random()*.9||o.push([w,P,v,R])}for(const[T,_,E,w]of o){if(cn(w)){l++;const v=kr(w)?.dropKind||"potato";(ai(w)||Math.random()<.35)&&this.drops.spawn(v,T+.5,_+.5,E+.5,{vy:5+Math.random()*3})}e.set(T,_,E,k.AIR),a.push(e.idx(T,_,E))}for(const[T,_,E]of o)for(let w=_+1;w<_+4;w++){const P=e.get(T,w,E);if(!r1(P))break;cn(P)&&l++,e.set(T,w,E,k.AIR),a.push(e.idx(T,w,E))}const u=this.lightBright(n.x,n.y+1,n.z);this.particles.smoke(n.x,n.y,n.z,t.big?60:36,s*.5,Math.max(.35,u),t.big?1.8:1.2),o.slice(0,22).forEach(([T,_,E,w])=>this.particles.burst(T,_,E,ct[w].particle,4,u,1)),this.audio.sfx("explode",{pos:n,refDistance:6,big:t.big,dur:t.big?1.8:1.2});const f=this.player.pos.distanceTo(n);this.shake=Math.max(this.shake,Math.max(0,1-f/(t.big?28:18))*(t.big?1.6:1)),this.flash=Math.max(this.flash,Math.max(0,1-f/14)*.55);const g=this.player.pos.clone();g.y+=.9;const x=g.distanceTo(n),m=Math.round(Math.max(0,1-x/(s*1.9))*(t.big?24:15));m>0&&this.state==="play"&&(this.player.damage(m,n),this.hud.hurt(Math.min(1,.4+m/15)),this.audio.sfx("hurt"));const p=this.robot.body.pos,y=Math.hypot(p.x-n.x,p.y+.6-n.y,p.z-n.z);y<s*1.7&&this.robot.state!=="flung"&&this.robot.fling(n,1-y/(s*1.7));for(const T of this.mobs){if(T===t||T.dead)continue;T.center.distanceTo(n)<s*1.6&&T.hit(t.big?6:2,n,1.3)&&T.dead&&this.onMobKilled(T,"boom")}for(const T of this.pigs)T.pos.distanceTo(n)<s*1.8&&T.hit(n);this.today.booms++,this.totals.booms++,this.today.lost+=l,this.isNetHost()&&ri({t:"boom",x:n.x,y:n.y,z:n.z,big:!!t.big,cells:a}),t.dead=!0,this.removeMob(t),this.isNetHost()&&this.pushNetSim(!0),l>0&&!this.robot.state.match(/sleep|flung/)&&this.talk.say("astra.farmHit",{random:!0,delay:1.6,cool:12}),Bd.emit("explode",{lost:l})}removeMob(t){t.dispose();const e=this.mobs.indexOf(t);e>=0&&this.mobs.splice(e,1)}onMobKilled(t,e="player"){const n=t.center;this.particles.smoke(n.x,n.y-.2,n.z,t.big?30:14,.4,Math.max(.4,this.lightBright(n.x,n.y,n.z)),t.big?1.3:.8),this.audio.sfx("poof",{pos:n}),e==="turret"&&(this.audio.sfx("turret_coin",{pos:n,pitch:t.big?.85:1}),this.floats.add(t.big?"$$$":"¢",n.x,n.y+1.35,n.z,"#ffe25a"),this.particles.sparkle(n.x,n.y+.5,n.z,t.big?16:8,16769626));const s=t.big?6:1+(Math.random()<.5?1:0);for(let r=0;r<s;r++)this.drops.spawn("powder",n.x,n.y,n.z);if(t.big)for(let r=0;r<10;r++)this.drops.spawn("potato",n.x,n.y+.3,n.z,{vy:5+Math.random()*3});if(this.today.kills++,this.totals.kills++,this.removeMob(t),e==="player"||e==="turret"){const r=t.big?"sys.bossKill":t.kind==="golem"?"sys.golemKill":t.kind==="thief"?"sys.thiefKill":t.kind==="dragon"?"sys.dragonKill":t.kind==="chomp"?"sys.chompKill":t.kind==="hop"?"sys.hopKill":"sys.kill";e==="player"&&this.talk.sys(r);const o=this.robot.body.pos.distanceTo(n);if(e==="player"&&o<16&&!["sleep","flung","sulk","toBed","kidnapped"].includes(this.robot.state)&&(this.thankCool??0)<=this.time){this.thankCool=this.time+25,this.talk.say(t.big?"astra.bossThanks":"astra.thanks",{random:!t.big,delay:.8,cool:0}),this.stock+=1;const a=this.robot.body.pos;this.floats.add("+1",a.x,a.y+1.9,a.z),this.robot.emote.show("heart",1.8)}}}step(t){const e=this.input;e.update(t),this.time+=t,this[`update_${this.state}`]?.(t),(this.state==="play"||this.state==="dead"||this.titleMode&&(this.state==="title"||this.state==="intro"))&&this.updateWorld(t),this.updateView(t),this.audio.listen(this.camera),this.audio.tick(t),e.endFrame()}update_title(){this.input.menu.back&&this.screens.back()&&this.audio.sfx("ui_back")}update_intro(){this.input.menu.back&&(this.audio.sfx("ui_back"),this.setState("title"))}update_paused(){const t=this.input;(t.menu.back||t.menu.start||t.pressed("pause"))&&(this.screens.top!==this.screens.modals.pause?(this.screens.back(),this.audio.sfx("ui_back")):(this.setState("play"),this.lockPointer?.()))}update_dead(t){this.deadT+=t,this.player.update(t,this.input,!1),this.updateDay(t),this.fade=Math.min(.55,this.deadT*.4),this.deadT>2.8&&this.state==="dead"&&(this.player.reset(ut.spawn),this.hud.setDead(!1),this.fade=0,this.talk.say("astra.death",{cool:0,delay:.5}),this.setState("play"))}update_play(t){const e=this.input;if(e.pressed("pause")||e.menu.start){this.setState("paused");return}this.grace=Math.max(0,this.grace-t),this.player.update(t,e,!0),this.updateTargeting(),this.handleActions(t),this.updateDay(t),!this.player.alive&&this.state==="play"&&this.setState("dead")}updateTargeting(){const{o:t,d:e}=this.player.ray();this.target=this.world.raycast(t.x,t.y,t.z,e.x,e.y,e.z,Ac+.5),this.target&&this.target.dist>Ac&&(this.target=null);const n=this.target?this.target.dist:Ac;let s=null,r=Math.min(n,4.2);const o=(l,c,h,d,u,f)=>{const g=Cw(t,e,c-u,h,d-u,c+u,h+f,d+u);g!==null&&g<r&&(r=g,s=l)};for(const l of this.mobs)!l.dead&&l.state!=="emerge"&&o(l,l.pos.x,l.pos.y,l.pos.z,l.body.hw+.12,l.body.h+.1);for(const l of this.pigs)o(l,l.pos.x,l.pos.y,l.pos.z,.5,.95);const a=this.robot.body.pos;if(o(this.robot,a.x,a.y,a.z,.4,1.35),!s){let l=.32;for(const c of this.mobs){if(c.dead||c.state==="emerge")continue;const h=c.center.sub(t),d=h.length();if(d>3.6||d>n+.5)continue;const u=h.normalize().angleTo(e);u<l&&(l=u,s=c)}}this.targetMob=s&&typeof s.hit=="function"&&!(s instanceof wc)?s:null,this.targetPig=s instanceof wc?s:null,this.targetRobot=s===this.robot,s&&(this.target=null)}useFor(t,e){const n=this.world,s=e.id,r=n.get(e.x,e.y+1,e.z);switch(t){case"hoe":return(s===k.GRASS||s===k.DIRT)&&(r===k.AIR||ct[r].plant&&r!==k.CANE)?this.isHole(e.x,e.y+1,e.z)?{act:"holeFirst",off:!0}:{act:"till"}:null;case"seed":{if(oi(s)&&r===k.AIR){if(this.isHole(e.x,e.y+1,e.z))return{act:"holeFirst",off:!0};const o=this.peekNextSeed();return o?{act:"plant",crop:o}:{act:"noSeed",off:!0}}return null}case"powder":return cn(s)&&!ai(s)?this.powder>0?{act:"fertilize"}:{act:"noPowder",off:!0}:null;case"dirt":{if(!ct[s].solid&&this.isHole(e.x,e.y,e.z)&&!this.cellBlocked(e.x,e.y,e.z))return{act:"fill",at:[e.x,e.y,e.z]};const o=[e.x+e.nx,e.y+e.ny,e.z+e.nz];return this.isHole(...o)?this.cellBlocked(...o)?{act:"blocked",off:!0}:{act:"fill",at:o}:null}case"turret":{let o=e.x,a=e.z;return e.ny===1||ct[s]?.solid||oi(s)?(o=e.x,a=e.z):(e.nx||e.nz)&&(o=e.x+(e.nx||0),a=e.z+(e.nz||0)),this.turrets.length>=Js?{act:"turretMax",off:!0}:this.money<ys.turret?{act:"noMoney",off:!0}:this.canPlaceTurret(o,a)?{act:"placeTurret",x:o,z:a}:{act:"turretBlocked",off:!0}}default:return null}}decideUse(){if(this.targetPig)return this.targetPig.penned?{act:"sellPig"}:{act:"pigWild",off:!0};if(this.targetRobot)return{act:this.robot.state==="sulk"?"cheer":"talk"};const t=this.target;if(!t)return null;if(ai(t.id))return{act:"harvest"};const e=this.useFor(this.tool,t);if(e)return e;for(const n of Ei){if(n===this.tool)continue;const s=this.useFor(n,t);if(s&&!s.off)return{act:"switch",tool:n,want:s.act,off:!0}}return t.id===k.BOX?{act:"box"}:t.id===k.BED||t.id===k.BED_FOOT?{act:"bed"}:null}promptLabel(t){return t.act==="switch"?W("prompt.switch",{item:W("item."+t.tool),act:W("prompt."+t.want)}):t.act==="noSeed"&&t.crop?W("prompt.noSeedCrop",{crop:W("item."+t.crop)}):t.act==="plant"&&t.crop?W("prompt.plantCrop",{crop:W("item."+t.crop)}):t.act==="placeTurret"?W("prompt.placeTurret",{n:ys.turret}):t.act==="noMoney"?W("prompt.noMoney",{n:ys.turret}):t.act==="sellPig"?W("prompt.sellPig",{n:Mh}):t.act==="pigWild"?W("prompt.pigWild"):W("prompt."+t.act)}selectTool(t){!Ei.includes(t)||this.tool===t||(this.tool=t,this.player.setTool(t),this.audio.sfx("ui_move"),this.tut&&(this.tut.switched=!0))}decideAttack(){if(this.targetMob||this.targetPig)return{act:"attack"};if(this.targetRobot)return{act:"bonk"};const t=this.target;return t?ai(t.id)?{act:"harvest"}:cn(t.id)?null:ct[t.id].plant?{act:"cut"}:null:null}cellBlocked(t,e,n){const s=(r,o,a)=>t+1>r.x-o&&t<r.x+o&&n+1>r.z-o&&n<r.z+o&&e+1>r.y&&e<r.y+a;return s(this.player.pos,.3,1.8)||s(this.robot.body.pos,.3,1.2)?!0:this.mobs.some(r=>s(r.pos,r.body.hw,r.body.h))}handleActions(t){const e=this.input;this.attackCool-=t,this.useCool-=t,this.eatCool-=t;for(let l=0;l<Ei.length;l++)(e.keysPressed.has("Digit"+(l+1))||e.keysPressed.has("Numpad"+(l+1)))&&this.selectTool(Ei[l]);this.wheelCool=Math.max(0,(this.wheelCool||0)-t);let n=0;e.wheel&&this.wheelCool<=0&&(n=Math.sign(e.wheel),this.wheelCool=.14);const s=(e.pressed("slotNext")?1:0)-(e.pressed("slotPrev")?1:0)+n;s&&this.selectTool(Ei[(Ei.indexOf(this.tool)+s+Ei.length)%Ei.length]);const r=this.decideUse(),o=this.decideAttack();this.useDecision=r,this.targetMob?this.hud.setPrompt("attack",W("prompt.attack")):r&&!r.off?this.hud.setPrompt("use",this.promptLabel(r)):o?this.hud.setPrompt("attack",W("prompt."+o.act)):r?.act==="switch"?this.hud.setPrompt("slot:"+(Ei.indexOf(r.tool)+1),this.promptLabel(r),!0):r?this.hud.setPrompt("use",this.promptLabel(r),!0):this.hud.setPrompt(null,""),this.touch.setLabel("use",r&&!r.off?this.promptLabel(r):null),this.touch.setLabel("attack",o&&o.act!=="attack"&&o.act!=="bonk"?W("prompt."+o.act):null);const a=this.target;if(a){const l=ct[a.id],c=cn(a.id)?a1(a.id):l.shape==="lantern"?.5:l.h;this.sel.visible=!0,this.sel.scale.set(1.004,c+.004,1.004),this.sel.position.set(a.x+.5,a.y+c/2-(cn(a.id)?1/16:0),a.z+.5)}else this.sel.visible=!1;if(!(this.grace>0)){if((e.down("attack")||e.pressed("attack"))&&this.attackCool<=0&&(this.attackCool=.36,this.player.swingHand(),this.doAttack(o)),(e.down("use")||e.pressed("use"))&&this.useCool<=0&&r){const l=this.doUse(r,e.pressed("use"));this.useCool=l?.24:.12}e.pressed("eat")&&this.eatCool<=0&&this.eat()}}doAttack(t){const e=this.player;if(this.audio.sfx("swing"),!t)return;if(t.act==="attack"&&this.targetMob){const s=this.targetMob,r=e.body.vel.y<-1&&!e.body.onGround,o=r?2:1,a=(e.sprinting?1.5:1)*(this.tool==="sword"?1:.6);this.audio.sfx("hit",{pos:s.pos,crit:r});const l=s.center;if(this.particles.burst(l.x-.3,l.y-.2,l.z-.3,r?16777215:5941310,r?10:6,1,.6),this.isNetClient()&&s.netId!=null){ri({t:"hitMob",id:s.netId,dmg:o,knock:a,x:e.pos.x,z:e.pos.z}),s.hurt=.35;return}s.hit(o,e.pos,a),s.dead&&this.onMobKilled(s,"player");return}if(t.act==="attack"&&this.targetPig){this.targetPig.hit(e.pos),this.talk.say("astra.pig",{cool:40,delay:.5});return}if(t.act==="bonk"){this.robot.emote.show("?",1.2),this.audio.sfx("bonk",{pos:this.robot.body.pos}),this.talk.say("astra.bonk",{random:!0,cool:6});return}const n=this.target;n&&(t.act==="harvest"?this.syncFarm(()=>this.harvest(n.x,n.y,n.z,"player")):t.act==="cut"&&this.syncFarm(()=>{const s=n.id;let r=n.y;for(;this.world.get(n.x,r+1,n.z)===s&&s===k.CANE;)r++;for(let o=r;o>=n.y;o--)this.world.set(n.x,o,n.z,k.AIR);this.particles.burst(n.x,n.y,n.z,ct[s].particle,8,this.lightBright(n.x,n.y,n.z),.8),this.audio.sfx("pluck",{pos:{x:n.x+.5,y:n.y+.3,z:n.z+.5}}),s===k.CANE&&this.talk.say("astra.caneBroken",{cool:60,delay:.6})}))}doUse(t,e){const n=this.target,s=this.player;switch(t.act){case"harvest":return s.swingHand(),this.syncFarm(()=>this.harvest(n.x,n.y,n.z,"player")>0);case"plant":{s.swingHand();const r=t.crop||this.peekNextSeed();if(!r)return!1;const o=this.syncFarm(()=>this.plant(n.x,n.y+1,n.z,"player",r));return o&&this.advanceSeedCursor(r),o}case"till":return s.swingHand(),this.syncFarm(()=>this.till(n.x,n.y,n.z,"player"));case"fertilize":return s.swingHand(),this.syncFarm(()=>this.fertilize(n.x,n.y,n.z));case"fill":return s.swingHand(),this.syncFarm(()=>this.repair(...t.at,"player"));case"placeTurret":return s.swingHand(),this.tryPlaceTurret(t.x,t.z);case"sellPig":return e?(s.swingHand(),this.sellPig(this.targetPig)):!1;case"pigWild":return e&&this.talk.sys("sys.pigWild"),!1;case"talk":return e&&(this.robot.emote.show("note",1.4),this.talk.say(this.robot.state==="hide"?"astra.talkHide":this.robot.state==="sleep"?"astra.talkSleep":"astra.talk",{random:!0,cool:1.5})),e;case"cheer":return e&&this.robot.cheer(),e;case"box":return e&&(this.talk.sys("sys.box"),this.talk.say("astra.box",{cool:20,delay:.4})),e;case"bed":return e&&this.talk.say("astra.bed",{cool:20}),e;case"noSeed":return e&&this.talk.sys(t.crop&&t.crop!=="potato"?"sys.noSeedCrop":"sys.noSeed",t.crop?{crop:W("item."+t.crop)}:void 0),!1;case"holeFirst":return e&&this.talk.sys("sys.holeFirst"),!1;case"noPowder":return e&&this.talk.sys("sys.noPowder"),!1;case"noMoney":return e&&this.talk.sys("sys.noMoney"),!1;case"turretMax":return e&&this.talk.sys("sys.turretMax"),!1;case"turretBlocked":return e&&this.talk.sys("sys.turretBlocked"),!1;default:return!1}}eat(){const t=this.player;if(t.hp>=t.maxHp){this.talk.sys("sys.full"),this.eatCool=.6;return}if(this.stock<=0){this.talk.sys("sys.noSeed"),this.eatCool=.6;return}this.stock--,t.heal(5),t.show("potato",.7),t.swingHand(),this.eatCool=.9,this.audio.sfx("eat");const e=this.camera,n=new U(0,-.25,-.6).applyQuaternion(e.quaternion).add(e.position);this.particles.burst(n.x-.15,n.y-.1,n.z-.15,14069090,6,1,.3)}updateWorld(t){this.world.flushNav(),this.talk.update(t),this.titleMode?this.growCrops(t*.5):this.growCrops(t),this.robot.update(t);for(const e of this.helpers)e.update(t);for(const e of this.turrets)e.update(t);this.pigGates?.update(t),this.chargeBay?.update(t);for(const e of[...this.mobs])e.update(t),e.dead&&this.mobs.includes(e)&&this.removeMob(e);for(const e of this.pigs)e.update(t);this.tickPigRespawn(t),this.titleMode||this.drops.update(t),this.online&&this.remotes.update(t,(Se.uSky?.value??1)*15),this.isNetHost()&&this.state==="play"&&(this._netSyncT=(this._netSyncT||0)+t,this._netSyncT>=.12&&this.pushNetSim()),this.mesher.update(this.meshBudget|0||4)}updateView(t){const e=this.titleMode&&(this.state==="title"||this.state==="intro");if(e?this.updateTitleCamera(t):this.player.updateCamera(t,this.time),this.player.hand.visible=!e&&(this.state==="play"||this.state==="dead"||this.state==="paused"),this.shake>.001){const r=this.shake*.22;this.camera.position.x+=(Math.random()-.5)*r,this.camera.position.y+=(Math.random()-.5)*r,this.camera.position.z+=(Math.random()-.5)*r,this.shake=Math.max(0,this.shake-t*2.2)}this.camera.updateMatrixWorld(!0),Se.uTime.value=this.time,this.sky.update(this.skyTime,this.camera,t,this.time);const n=1-Se.uSky.value,s=this.fogFar||105;Se.uFogNear.value=As(s*.4,s*.28,n),Se.uFogFar.value=As(s,s*.74,n),this.state!=="paused"&&this.state!=="report"&&this.state!=="ending"&&(this.particles.update(t),this.floats.update(t)),this.flash=Math.max(0,this.flash-t*2.5),this.renderer.setFx({flash:this.flash,flashColor:"#fff6e0",fade:this.fade,fadeColor:"#3a0808",time:this.time}),(this.state==="play"||this.state==="dead"||this.state==="paused")&&this.updateHud(t),this.hud.update(t)}updateTitleCamera(t){this.titleAng+=t*.045;const e=this.titleAng,n=ut.spawn[0],s=(ut.fieldA.z0+ut.fieldA.z1)*.5,r=18;this.camera.position.set(n+Math.sin(e)*r,17.5,s+Math.cos(e)*r),this.camera.rotation.order="YXZ",this.camera.lookAt(n,10.2,s),Math.abs(this.camera.fov-60)>.01&&(this.camera.fov=60,this.camera.updateProjectionMatrix()),this.sel.visible=!1}updateHud(){const t=this.hud,e=this.player;t.setHearts(e.hp,e.maxHp),t.setInventory({bags:this.bags,powder:this.powder,green:this.green,turretsAfford:this.turretsAfford(),seedTotal:this.seedTotal,nextSeed:this.peekNextSeed()}),t.setWarehouse({money:this.money,bags:this.bags,helpers:this.helpers.length,helperCap:this.helperCap(),hoeLevel:this.hoeLevel()});const s=this.mobs.some(c=>!c.dead&&c.state!=="leave")&&this.state==="play";s&&!this._alarmLit?(this._alarmLit=!0,this.tool!=="sword"?this.selectTool("sword"):this.player.show("sword",.55)):s||(this._alarmLit=!1),t.setAlarm(s),t.setHeld(this.tool,this.tool==="seed"?this.peekNextSeed():null),this.cfg&&(t.setDay(this.dayIndex+1,this.phase,oo(this.clock/this.dayLength),this.mode==="endless"),t.setGoal(this.today.harvest,this.cfg.goal)),t.setObjective(this.objectiveText());const r=this.robot.status;t.setRobot(r,this.robot.model.face||"normal",this.time);const o=[],a=this.camera,l=a.matrixWorldInverse;for(const c of this.mobs){if(c.dead||c.state==="leave")continue;const h=c.center;if(h.distanceTo(a.position)>40)continue;const d=h.clone().project(a),u=h.clone().applyMatrix4(l);if(u.z<0&&Math.abs(d.x)<.95&&Math.abs(d.y)<.92)continue;let f=u.x,g=u.y;u.z>0&&(f=u.x,g=-Math.abs(u.y)-.01);const x=Math.hypot(f,g)||1;f/=x,g/=x,o.push({x:.5+f*.44,y:.5-g*.4,ang:Math.atan2(f,g),fuse:c.state==="fuse",big:c.big})}t.setArrows(ee.mobGuide==="off"?[]:o)}render(t){this.renderer.render(t)}updateBestLabel(){const t=document.querySelector("#title .best");if(!t)return;const e=[];this.save.data.best&&e.push(W("title.best",{n:this.save.data.best}));const n=this.save.data.endlessBest;n?.day&&e.push(W("title.bestEndless",{d:n.day,n:n.harvest})),t.textContent=e.join("　")}setSplash(){const t=document.querySelector("#title .splash");if(!t)return;let e=0;for(;W("splash."+e)!=="splash."+e;)e++;const n="splash."+Math.floor(Math.random()*Math.max(1,e));t.dataset.i18n=n,t.textContent=W(n)}snapshot(){const t=this.player.pos,e=this.robot.body.pos,n=s=>+s.toFixed(2);return{state:this.state,mode:this.mode,day:this.dayIndex+1,phase:this.phase,clock:n(this.clock),hp:this.player.hp,stock:this.stock,powder:this.powder,green:this.green,today:{...this.today},goal:this.cfg?.goal,totals:{...this.totals},tut:this.tut?this.tut.step:null,crops:this.crops.size,mature:[...this.crops.keys()].filter(s=>this.world.data[s]===k.POTATO3).length,mobs:this.mobs.map(s=>({s:s.state,big:s.big,hp:s.hp,p:[n(s.pos.x),n(s.pos.y),n(s.pos.z)]})),robot:{s:this.robot.state,task:this.robot.task?.type||null,p:[n(e.x),n(e.y),n(e.z)]},player:[n(t.x),n(t.y),n(t.z)],yaw:n(this.player.yaw),pitch:n(this.player.pitch),target:this.target?{id:this.target.id,at:[this.target.x,this.target.y,this.target.z]}:this.targetMob?"mob":this.targetRobot?"robot":null,use:this.useDecision?.act||null}}debugSkip(t){this.cfg&&(this.clock+=t)}debugLook(t,e,n){const s=this.player.pos.clone();s.y+=this.player.eye;const r=new U(t,e,n).sub(s);this.player.yaw=Math.atan2(-r.x,-r.z),this.player.pitch=Math.atan2(r.y,Math.hypot(r.x,r.z))}}function Cw(i,t,e,n,s,r,o,a){let l=0,c=1/0;for(const[h,d,u,f]of[[i.x,t.x,e,r],[i.y,t.y,n,o],[i.z,t.z,s,a]]){if(Math.abs(d)<1e-9){if(h<u||h>f)return null;continue}let g=(u-h)/d,x=(f-h)/d;if(g>x&&([g,x]=[x,g]),l=Math.max(l,g),c=Math.min(c,x),l>c)return null}return l}const kf=1;function Pw(){let i=!1;try{i=!1}catch{}return i||new URLSearchParams(location.search).has("dev")}function Lw(i){if(!(i.enabled??Pw()))return null;const e=c=>typeof c=="function"?c():c,n=i.renderer,s=()=>e(i.scene),r=()=>e(i.camera),o=i.render||(()=>n.render(s(),r()));function a(c,h){if(i.resize)return i.resize(c,h);n.setSize(c,h,!1);const d=r();d?.isPerspectiveCamera&&(d.aspect=c/h,d.updateProjectionMatrix())}const l={version:kf,ready:!1,paused:!1,frames:0,time:0,markReady(){l.ready=!0},pause(c=!0){return l.paused=!!c,l.paused},advance(c,h=1/60){l.paused=!0;const d=Math.max(0,Math.round(c/h));for(let u=0;u<d;u++)i.step(h);return l.frames+=d,l.time+=d*h,o(),d},render(){o()},snapshot({w:c,h,type:d="image/png",quality:u=.92}={}){const f=n.domElement,g=c&&h;let x;g&&(x={pr:n.getPixelRatio(),w:f.clientWidth||innerWidth,h:f.clientHeight||innerHeight},n.setPixelRatio(1),a(c,h)),o();const m=f.toDataURL(d,u);return g&&(n.setPixelRatio(x.pr),a(x.w,x.h),o()),m},async shot(c="shot",h={}){const d=l.snapshot(h),u=await fetch("/__shot?name="+encodeURIComponent(c),{method:"POST",body:d});if(!u.ok)throw new Error("/__shot に保存できません（vite-plugin-dev-shot か dev-server.mjs で開いていますか）: "+u.status);return u.text()},state(){return i.state?i.state():{}},info(){const c=n.info;return{version:kf,ready:l.ready,paused:l.paused,frames:l.frames,time:+l.time.toFixed(4),tris:c.render.triangles,calls:c.render.calls,geometries:c.memory.geometries,textures:c.memory.textures,programs:c.programs?.length??0,size:[n.domElement.width,n.domElement.height],pixelRatio:n.getPixelRatio(),state:l.state()}},look({pos:c,target:h,fov:d}={}){const u=r();return c&&u.position.set(...c),d&&u.isPerspectiveCamera&&(u.fov=d,u.updateProjectionMatrix()),h&&(i.controls?(i.controls.target.set(...h),i.controls.update()):u.lookAt(...h)),o(),{pos:u.position.toArray(),fov:u.fov}},checkNaN(c=s()){const h=[];return c.updateMatrixWorld(!0),c.traverse(d=>{d.matrixWorld.elements.every(Number.isFinite)||h.push({path:Aa(d,c),what:"matrixWorld"});const u=d.geometry;if(u?.attributes)for(const[f,g]of Object.entries(u.attributes)){const x=g.array;if(x){for(let m=0;m<x.length;m++)if(!Number.isFinite(x[m])){h.push({path:Aa(d,c),what:f,index:Math.floor(m/g.itemSize)});break}}}}),h},parts(c=s(),h=4){const d=[],u=(f,g)=>{f!==c&&d.push({path:Aa(f,c),type:f.type,visible:f.visible}),g<h&&f.children.forEach(x=>u(x,g+1))};return u(c,0),d},setVisible(c,h,d=s()){const u=Dw(d,c);if(!u)throw new Error("見つかりません: "+c);return u.visible=!!h,o(),u.visible},scene:s,camera:r,input:i.input||null,goto:i.goto||null};return Object.assign(l,i.extra||{}),window.__dev=l,l}function Aa(i,t){const e=[];for(let n=i;n&&n!==t;n=n.parent){const s=n.parent?n.parent.children.indexOf(n):0;e.unshift(n.name||`${n.type}#${s}`)}return e.join("/")}function Dw(i,t){let e=null;return i.traverse(n=>{!e&&(Aa(n,i)===t||n.name&&n.name===t)&&(e=n)}),e}const Rc=!0,Iw=document.getElementById("app"),Cc=document.getElementById("ui"),pa=document.getElementById("loading");Mp(Ap.lang);Qb();let Qt,Pc=null;try{const i=new lb(Iw,{quality:Ap.quality}),t=new db(i.domElement),e=new Fb(ee.volume,{muted:Oa.mute}),n=new $b(Cc,i.domElement,t,{onPause:()=>Qt.state==="play"&&Qt.setState("paused")}),s=()=>{Rc&&t.lockPointer()},r=new Wb(Cc,{onClick:u=>e.sfx(u==="back"?"ui_back":"ui_ok"),onStart:()=>{Qt.start()},onContinue:()=>{Qt.continueGame?.(),s()},onResume:()=>{Qt.setState("play"),s()},onRetry:()=>{Qt.retry(),s()},onToTitle:()=>{Qt.reset(),Qt.setState("title")},onSettings:u=>{u==="volume"&&e.setVolume(ee.volume),u==="quality"&&!Oa.quality&&i.setQuality(ee.quality),u==="lang"&&Mp(ee.lang),(u==="padType"||u==="lang")&&jl(t,ee),u==="sens"&&(t.sens=ee.sens),u==="lang"&&Qt.setSplash?.(),yb()}}),o=new Xb(()=>r.current(),()=>e.sfx("ui_move"));t.sens=ee.sens,t.mouseNeedsLock=Rc,Qt=new Rw({renderer:i,input:t,audio:e,screens:r,touch:n,ui:Cc}),Qt.lockPointer=s,t.onDevice=()=>jl(t,ee),Rc&&(i.domElement.addEventListener("click",()=>{Qt.state==="play"&&t.lockPointer()}),t.onPointerLock=u=>{!u&&Qt.state==="play"&&t.device==="kb"&&Qt.setState("paused")}),yr(),jl(t,ee);const a=()=>e.unlock();for(const u of["pointerdown","keydown","touchstart"])addEventListener(u,a,{passive:!0});const l=u=>{Qt.step(u),Qt.state!=="play"&&o.update(t.menu)};Pc=Lw({renderer:i.renderer,scene:()=>Qt.scene,camera:()=>Qt.camera,step:l,render:()=>Qt.render(1/60),resize:(u,f)=>i.resize(u,f),state:()=>Qt.snapshot(),input:t.devInput(),goto:u=>(u==="title"?(Qt.reset(),Qt.setState("title")):u==="play"?(Qt.start(),Qt.onAction("introGo")):u==="paused"?(Qt.state!=="play"&&(Qt.start(),Qt.onAction("introGo")),Qt.setState("paused")):/^day[1-5]$/.test(u)&&(Qt.start(),Qt.tut=null,Qt.startDay(+u[3]-1),Qt.setState("play")),Qt.state),extra:{game:Qt,audio:e,i18nMissing:xb}});let c=performance.now(),h=!1;const d=u=>{const f=Math.min(.05,Math.max(0,(u-c)/1e3));c=u,h&&(Pc?.paused||l(f),Qt.render(f)),requestAnimationFrame(d)};requestAnimationFrame(d),Qt.init().then(()=>{h=!0,c=performance.now(),requestAnimationFrame(()=>requestAnimationFrame(()=>{pa.classList.add("done"),setTimeout(()=>{pa.remove(),Pc?.markReady()},600)}))}).catch(u=>{pa.querySelector(".ld-text").textContent=W("boot.loadFailed"),console.error(u)})}catch(i){throw pa.querySelector(".ld-text").textContent=W("boot.noWebgl"),i}
