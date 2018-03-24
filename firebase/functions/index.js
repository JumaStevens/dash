!function(e,r){for(var t in r)e[t]=r[t]}(this,function(e){var r={};function t(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t.w={},t(t.s=9)}([function(e,r){e.exports=require("firebase-admin")},function(e,r){e.exports=require("firebase-functions")},function(e,r){e.exports=require("babel-runtime/helpers/asyncToGenerator")},function(e,r){e.exports=require("babel-runtime/regenerator")},function(e,r){e.exports=require("lodash")},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.listener=void 0;var n=c(t(3)),a=c(t(2)),s=i(t(1)),u=i(t(0)),o=c(t(4));function i(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function c(e){return e&&e.__esModule?e:{default:e}}var l;r.listener=s.database.ref("/messenger/messages/{convoId}/{messageId}").onDelete((l=(0,a.default)(n.default.mark(function e(r){var t,a,s,i,c,l,d,f,p,v;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=r.data.ref.root,a=r.data.ref.parent,s=t.child("messenger/meta"),i=u.database().ref("/messenger/meta"),c=r.params.convoId,l=r.data.previous,d={timestamp:l.child("timestamp").val(),uid:l.child("uid").val()},e.next=10,s.child(c).once("value");case 10:if(f=e.sent,p={timestamp:f.child("timestamp").val(),uid:f.child("uid").val()},d.timestamp===p.timestamp&&d.uid===p.uid){e.next=14;break}return e.abrupt("return");case 14:return v=null,e.next=17,a.orderByKey().limitToLast(1).once("value");case 17:if(e.sent.forEach(function(e){return v=e.val()}),!o.default.isEmpty(v)){e.next=21;break}return e.abrupt("return");case 21:return e.next=23,i.child(c).set(v);case 23:return e.sent,e.abrupt("return");case 27:return e.prev=27,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return");case 31:case"end":return e.stop()}},e,void 0,[[0,27]])})),function(e){return l.apply(this,arguments)}))},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.listener=void 0;var n=i(t(3)),a=i(t(2)),s=o(t(1)),u=o(t(0));function o(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function i(e){return e&&e.__esModule?e:{default:e}}var c;r.listener=s.database.ref("/messenger/messages/{convoId}/{messageId}").onCreate((c=(0,a.default)(n.default.mark(function e(r){var t,a,s;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.data.exists()){e.next=3;break}return e.abrupt("return");case 3:return t=u.database(),a=r.params.convoId,s=r.data.val(),e.next=8,t.ref("messenger/meta/"+a).set(s);case 8:return console.log("message --\x3e ",s),e.abrupt("return");case 12:return e.prev=12,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return");case 16:case"end":return e.stop()}},e,void 0,[[0,12]])})),function(e){return c.apply(this,arguments)}))},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.listener=void 0;var n=i(t(3)),a=i(t(2)),s=o(t(1)),u=o(t(0));i(t(4));function o(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function i(e){return e&&e.__esModule?e:{default:e}}var c;r.listener=s.database.ref("/messenger/members/{convoId}/{uid}").onDelete((c=(0,a.default)(n.default.mark(function e(r){var t,a,s,o,i,c,l,d,f,p,v,m,b,h,x,g;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("currentUser: ",r.auth),t=r.auth.variable?r.auth.variable.uid:null,a=r.params.uid,s=r.params.convoId,o=u.database().ref("/messenger/conversations"),i=u.database().ref("/messenger/members"),c=u.database().ref("/messenger/pending"),l=u.database().ref("/messenger/messages"),e.next=11,u.auth().getUser(t);case 11:return d=e.sent,console.log("authUserSnapshot: ",d),f=d.toJSON(),console.log("authUserRecord: ",f),console.log("authDisplayName: ",f.displayName),e.next=18,u.auth().getUser(a);case 18:if(p=e.sent,v=p.toJSON(),console.log("userSnapshot: ",p),console.log("userRecord: ",v),t!==a){e.next=36;break}return e.next=25,i.child(s).once("value");case 25:if(m=e.sent,!m.numChildren()){e.next=33;break}return b={message:f.displayName+" lefted the conversation.",timestamp:u.database.ServerValue.TIMESTAMP,uid:"bot"},e.next=31,l.child(s).push().set(b);case 31:e.next=34;break;case 33:console.log("clean up");case 34:e.next=55;break;case 36:return e.next=38,o.child(a).once("value");case 38:return h=e.sent,e.next=41,c.child(a).once("value");case 41:if(x=e.sent,console.log("conversationsSnapshot: ",h),console.log("pendingSnapshot: ",x),!h.hasChild(s)){e.next=49;break}return e.next=47,o.child(a+"/"+s).set(null);case 47:e.next=52;break;case 49:if(!x.hasChild(s)){e.next=52;break}return e.next=52,c.child(a+"/"+s).set(null);case 52:return g={message:f.displayName+" removed "+v.displayName+" from the conversation.",timestamp:u.database.ServerValue.TIMESTAMP,uid:"bot"},e.next=55,l.child(s).push().set(g);case 55:return e.abrupt("return");case 58:return e.prev=58,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return");case 62:case"end":return e.stop()}},e,void 0,[[0,58]])})),function(e){return c.apply(this,arguments)}))},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.listener=void 0;var n=i(t(3)),a=i(t(2)),s=o(t(1)),u=o(t(0));function o(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function i(e){return e&&e.__esModule?e:{default:e}}var c;r.listener=s.database.ref("/messenger/members/{convoId}/{uid}").onCreate((c=(0,a.default)(n.default.mark(function e(r){var t,a,s;return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,r.data.exists()){e.next=3;break}return e.abrupt("return");case 3:return t=u.database(),a=r.params.convoId,s=r.params.uid,e.next=8,t.ref("/messenger/conversations/"+s).once("value");case 8:if(!e.sent.hasChild(a)){e.next=11;break}return e.abrupt("return");case 11:return e.next=13,t.ref("messenger/pending/"+s+"/"+a).set(!0);case 13:return e.abrupt("return");case 16:return e.prev=16,e.t0=e.catch(0),console.error("oh noo, an error happened!  --\x3e ",e.t0),e.abrupt("return");case 20:case"end":return e.stop()}},e,void 0,[[0,16]])})),function(e){return c.apply(this,arguments)}))},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.messageDelete=r.messageCreate=r.memberDelete=r.memberCreate=void 0;var n=c(t(1)),a=c(t(0)),s=c(t(8)),u=c(t(7)),o=c(t(6)),i=c(t(5));function c(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}a.initializeApp(n.config().firebase);r.memberCreate=s.listener,r.memberDelete=u.listener,r.messageCreate=o.listener,r.messageDelete=i.listener}]));