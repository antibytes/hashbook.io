webpackJsonp([1],{"S1+1":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("zIwb"),n=r.n(a),c=r("qbDP"),s=r.n(c),o=r("JtKo"),u=r.n(o),i=r("xw80"),p=function(e){var t,r=e.pkh,a=r.slice(0,2);return"tz"===a?t="manager":"KT"===a&&(t="origination"),{prefix:a,kind:t,keys:e,address:r}},l=function(){var e=u()(n.a.mark(function e(t,r){var a,c,s,o,u,l,d,f,y,v,w,x,k;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,console.log("[Unlock Wallet Type]",t),"mnemonic"!==t){e.next=9;break}return c=r.mnemonic,s=r.password,e.next=6,i.a.crypto.generateKeys(c,s);case 6:return o=e.sent,a=p(o),e.abrupt("return",a);case 9:if("ico"!==t){e.next=21;break}return u=r.seed,l=r.email,d=r.password,f=r.address,y=r.code,e.next=13,i.a.crypto.generateKeys(u,l+d);case 13:if(v=e.sent,!y){e.next=19;break}return e.next=17,i.a.rpc.activate(f,y);case 17:w=e.sent,console.log("[Activation Successful]",w);case 19:return a=p(v),e.abrupt("return",a);case 21:if("privateKey"!==t){e.next=28;break}if(x=r.privateKey,k=i.a.crypto.extractKeys(x)){e.next=26;break}throw new Error("Please enter private key starts with 'edsk' ");case 26:return a=p(k),e.abrupt("return",a);case 28:throw new Error("Wallet type not defined");case 31:throw e.prev=31,e.t0=e.catch(0),e.t0;case 34:case"end":return e.stop()}},e,this,[[0,31]])}));return function(t,r){return e.apply(this,arguments)}}();t.default={namespace:"accessWallet",state:{error:""},effects:{unlockWallet:n.a.mark(function e(t,r){var a,c,o,u,i,p;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.payload,c=r.call,o=r.put,e.next=4,o({type:"updateError",payload:""});case 4:return u=a.walletType,i=a.payload,e.prev=5,e.next=8,c(l,u,i);case 8:return p=e.sent,e.next=11,o({type:"myAccount/setIdentity",payload:p});case 11:s.a.push("/access-wallet/my-account"),e.next=18;break;case 14:throw e.prev=14,e.t0=e.catch(5),console.log(e.t0),e.t0;case 18:case"end":return e.stop()}},e,this,[[5,14]])})},reducers:{updateError:function(e,t){var r=t.payload;e.error=r}}}},qbDP:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=window.g_history;t.default=a}});