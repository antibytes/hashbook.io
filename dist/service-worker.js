"use strict";var precacheConfig=[["./static/common-umi.cd5e1334.async.js","16212c8fde2959a571a131efcbf4767d"],["./static/src__layouts__index.973e7c60.async.js","83e272ba9cc62c96102ce266b954e41f"],["./static/src__pages__404.ec0fef95.async.js","f9764464c194f6863127416732792c43"],["./static/src__pages__access-wallet__index.249d2c54.async.js","2a29d141b7863d9b4a56863c23560341"],["./static/src__pages__access-wallet__models__accessWallet.js.6292d8c6.async.js","07040133dc9d6732446c940dfb01211b"],["./static/src__pages__access-wallet__my-account__index.b961c92d.async.js","314682a3650337a77ccae6293676362c"],["./static/src__pages__access-wallet__my-account__models__myAccount.js.d24fe5ba.async.js","23dc8c5a4c9d52fab59316cf9ce30a05"],["./static/src__pages__create-wallet__index.885a0f59.async.js","e37dc208cf526b56526017f9e235c651"],["./static/src__pages__create-wallet__models__createWallet.js.1e955e54.async.js","6f7d5ae8c6c7c39282e88cd1706b6265"],["./static/src__pages__index.a85a6e73.async.js","8fd4cae0112f34b29d1f894799eaab19"],["./static/static/logo.7510241f.png","7510241f561c424d2794c05679f12d28"],["./static/umi.892fab5e.css","892fab5eb640f421cef656bcd92be288"],["./static/umi.a3f6820c.js","497dcfef258743c7c3592bea5640feac"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var c=new URL(e);return"/"===c.pathname.slice(-1)&&(c.pathname+=t),c.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,c,n){var a=new URL(e);return n&&a.pathname.match(n)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(c)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var c=new URL(t).pathname;return e.some(function(e){return c.match(e)})},stripIgnoredUrlParameters=function(e,t){var c=new URL(e);return c.hash="",c.search=c.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),c.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],c=e[1],n=new URL(t,self.location),a=createCacheKey(n,hashParamName,c,!1);return[n.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(c){if(!t.has(c)){var n=new Request(c,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+c+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(c,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(c){return Promise.all(c.map(function(c){if(!t.has(c.url))return e.delete(c)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,c=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(c))||(c=addDirectoryIndex(c,"index.html"),t=urlsToCacheKeys.has(c));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(c)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});