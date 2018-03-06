!function(e,r){for(var t in r)e[t]=r[t]}(this,function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t.w={},t(t.s=8)}([function(e,r){e.exports=require("firebase-admin")},function(e,r){e.exports=require("firebase-functions")},function(e,r){e.exports=require("babel-runtime/helpers/asyncToGenerator")},function(e,r){e.exports=require("babel-runtime/regenerator")},function(e,r){e.exports=require("lodash")},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.listener=void 0;var n=c(t(3)),a=c(t(2)),u=i(t(1)),s=i(t(0)),o=c(t(4));function i(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function c(e){return e&&e.__esModule?e:{default:e}}var l;r.listener=u.database.ref("/messenger/messages/{convoId}/{messageId}").onDelete((l=(0,a.default)(n.default.mark(function e(r){var t,a,u,i,c,l,f,d,p,v;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=r.data.ref.root,a=r.data.ref.parent,u=t.child("messenger/meta"),i=s.database().ref("/messenger/meta"),c=r.params.convoId,l=r.data.previous,f={timestamp:l.child("timestamp").val(),uid:l.child("uid").val()},e.next=10,u.child(c).once("value");case 10:if(d=e.sent,p={timestamp:d.child("timestamp").val(),uid:d.child("uid").val()},f.timestamp===p.timestamp&&f.uid===p.uid){e.next=14;break}return e.abrupt("return");case 14:return v=null,e.next=17,a.orderByKey().limitToLast(1).once("value");case 17:if(e.sent.forEach(function(e){return v=e.val()}),!o.default.isEmpty(v)){e.next=21;break}return e.abrupt("return");case 21:return e.next=23,i.child(c).set(v);case 23:return e.sent,e.abrupt("return");case 27:return e.prev=27,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return");case 31:case"end":return e.stop()}},e,void 0,[[0,27]])})),function(e){return l.apply(this,arguments)}))},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.listener=void 0;var n=i(t(3)),a=i(t(2)),u=o(t(1)),s=o(t(0));function o(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function i(e){return e&&e.__esModule?e:{default:e}}var c;r.listener=u.database.ref("/messenger/messages/{convoId}/{messageId}").onCreate((c=(0,a.default)(n.default.mark(function e(r){var t,a,u;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.data.exists()){e.next=3;break}return e.abrupt("return");case 3:return t=s.database(),a=r.params.convoId,u=r.data.val(),e.next=8,t.ref("messenger/meta/"+a).set(u);case 8:return console.log("message --\x3e ",u),e.abrupt("return");case 12:return e.prev=12,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return");case 16:case"end":return e.stop()}},e,void 0,[[0,12]])})),function(e){return c.apply(this,arguments)}))},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.listener=void 0;var n=i(t(3)),a=i(t(2)),u=o(t(1)),s=o(t(0));function o(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function i(e){return e&&e.__esModule?e:{default:e}}var c;r.listener=u.database.ref("/messenger/members/{convoId}/{uid}").onCreate((c=(0,a.default)(n.default.mark(function e(r){var t,a,u;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.data.exists()){e.next=3;break}return e.abrupt("return");case 3:return t=s.database(),a=r.params.convoId,u=r.params.uid,e.next=8,t.ref("/messenger/conversations/"+u).once("value");case 8:if(!e.sent.hasChild(a)){e.next=11;break}return e.abrupt("return");case 11:return e.next=13,t.ref("messenger/pending/"+u+"/"+a).set(!0);case 13:return e.abrupt("return");case 16:return e.prev=16,e.t0=e.catch(0),console.error("oh noo, an error happened!  --\x3e ",e.t0),e.abrupt("return");case 20:case"end":return e.stop()}},e,void 0,[[0,16]])})),function(e){return c.apply(this,arguments)}))},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.messageDelete=r.messageCreate=r.memberCreate=void 0;var n=i(t(1)),a=i(t(0)),u=i(t(7)),s=i(t(6)),o=i(t(5));function i(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}a.initializeApp(n.config().firebase);r.memberCreate=u.listener,r.messageCreate=s.listener,r.messageDelete=o.listener}]));