/** Matkakirja: first animation pilot. No audio/network dependencies. */
export function createPuluAnimator(button, { ink = '#392b1e', paper = '#fff9e9' } = {}) {
  if (!(button instanceof HTMLElement)) throw new TypeError('Pass the existing pigeon button');
  const uid = `pulu-${Math.random().toString(36).slice(2)}`;
  const root = document.createElement('div');
  root.setAttribute('aria-hidden', 'true');
  root.style.cssText = 'position:fixed;width:220px;height:180px;pointer-events:none;z-index:41;overflow:visible';
  root.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 180" width="220" height="180" style="overflow:visible"><defs><clipPath id="${uid}"><rect x="-220" y="-170" width="440" height="185"/></clipPath></defs><g data-anchor stroke="${ink}" fill="${paper}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M-21 15H21"/><g clip-path="url(#${uid})"><g data-card opacity="0"><rect x="-15" y="-21" width="30" height="34" rx="3"/><path d="M-9-13L-8-19 0-15 8-19 9-13V4Q0 14-9 4Z"/><circle cx="-4" cy="-8" r="3"/><circle cx="4" cy="-8" r="3"/><path d="M-2-2L0 1 2-2"/></g><g data-bird><path d="M-9 8L-17 11-14 3M-5 12V15M5 12V15"/><path d="M-12 2Q-15-9-5-12Q8-15 12-3Q17 12 2 13Q-9 14-12 2Z"/><path data-wing d="M-8-2Q-11 10 4 8Q-4 4-8-2Z"/><g data-head><path d="M-10-9Q-14-23 0-25Q12-26 13-13L9-7"/><path d="M-5-24L-7-28M-2-25L0-29"/><g data-eyes><ellipse cx="-3" cy="-17" rx="4" ry="5"/><ellipse cx="6" cy="-17" rx="4" ry="5"/><g data-pupils fill="${ink}" stroke="none"><circle cx="-2" cy="-17" r="1.6"/><circle cx="7" cy="-17" r="1.6"/></g></g><path d="M5-11L15-11 9-7Z"/><path data-jaw d="M7-8L13-8 9-5Z"/><path d="M-7-11Q-4-8 0-9"/></g></g></g><g data-crumbs opacity="0" fill="${ink}"><circle cx="-17" cy="12" r="1.3"/><circle cx="-10" cy="14" r="1"/><circle cx="-23" cy="14" r="1"/></g></g></svg>`;
  document.body.append(root);
  const el = name => root.querySelector(`[data-${name}]`);
  const glyph = button.querySelector('.viiva-ikoni, svg, img');
  const oldVisibility = glyph?.style.visibility;
  if (glyph) glyph.style.visibility = 'hidden';
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  let dead = false, request = null, audio = null, unbind = () => {}, idleEligible = false;
  let state = 'idle'; const animations = new Set(), timers = new Set();
  const delay = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); if (!dead) fn(); }, ms); timers.add(id); };
  const animate = (node, frames, options) => {
    if (mq.matches || dead || document.hidden) return;
    const a = node.animate(frames, options); animations.add(a);
    a.onfinish = () => { if (options.fill !== 'forwards') animations.delete(a); }; return a;
  };
  function reset(next = 'idle') {
    animations.forEach(a => a.cancel()); animations.clear();
    timers.forEach(clearTimeout); timers.clear();
    for (const n of ['bird','head','eyes','pupils','jaw','wing','card','crumbs']) el(n).style.transform = '';
    el('bird').style.opacity = '1'; el('bird').style.transform = 'scale(.78)';
    el('card').style.opacity = '0'; el('crumbs').style.opacity = '0';
    state = next; root.dataset.state = next;
  }
  function position() {
    if (dead) return;
    const r = button.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2 + 3;
    const left = Math.max(0, Math.min(innerWidth - 220, x - 180));
    const top = Math.max(0, Math.min(innerHeight - 180, y - 145));
    root.style.left = `${left}px`; root.style.top = `${top}px`;
    el('anchor').setAttribute('transform', `translate(${x-left} ${y-top})`);
    root.style.display = r.width && r.height && button.getClientRects().length ? '' : 'none';
  }
  function idle() { if (dead) return; request = null; reset(); scheduleBlink(); }
  function scheduleBlink() {
    if (mq.matches || document.hidden) return;
    delay(() => {
      if (state !== 'idle') return;
      animate(el('eyes'), [{transform:'translateY(-17px) scaleY(1) translateY(17px)'},{transform:'translateY(-17px) scaleY(.1) translateY(17px)'},{transform:'translateY(-17px) scaleY(1) translateY(17px)'}], {duration:160});
      if (idleEligible && Math.random() < .25) animate(el('head'), [{transform:'rotate(0deg)'},{transform:'rotate(-12deg)'},{transform:'rotate(0deg)'}], {duration:900});
      scheduleBlink();
    }, 3200 + Math.random()*3000);
  }
  function waiting({requestId, motionId = 'owl'} = {}) {
    if (dead) return; request = requestId; reset('waiting');
    if (motionId === 'crumbs') { crumbs(true); return; }
    if (motionId !== 'owl') { animate(el('head'), [{transform:'rotate(0deg)'},{transform:'rotate(12deg)'},{transform:'rotate(0deg)'}], {duration:1200,iterations:1}); return; }
    animate(el('bird'), [{transform:'translate(0px,0px) scale(.78)'},{transform:'translate(-50px,-45px) rotate(-18deg) scale(.95)',offset:.55},{transform:'translate(-58px,44px) scale(.78)'}], {duration:750,fill:'forwards'});
    if (!mq.matches) delay(() => { el('bird').style.transform='translate(-16px,32px) scale(.78)'; animations.forEach(a=>a.cancel()); animations.clear(); }, 760);
  }
  function answer(requestId) {
    if (dead || request !== requestId || state !== 'waiting') return false;
    request = null; reset('returning');
    animate(el('bird'), [{transform:'translate(-16px,32px) scale(.78)'},{transform:'translate(0px,-3px) scale(.78)'},{transform:'scale(.78)'}], {duration:280});
    delay(idle, mq.matches ? 0 : 280); return true;
  }
  function crumbs(keepWaiting = false) {
    if (dead) return; reset(keepWaiting ? 'waiting' : 'crumbs'); el('crumbs').style.opacity='1';
    animate(el('head'), [{transform:'rotate(0deg)'},{transform:'translate(-7px,13px) rotate(-32deg)',offset:.28},{transform:'rotate(0deg)',offset:.5},{transform:'translate(-7px,13px) rotate(-32deg)',offset:.7},{transform:'rotate(0deg)'}], {duration:1500});
    delay(() => { el('crumbs').style.opacity='0'; if (!keepWaiting) idle(); }, mq.matches ? 450 : 1700);
  }
  function arrival() {
    if (dead) return; reset('arrival'); el('card').style.opacity='1';
    animate(el('bird'), [{transform:'translate(-90px,-45px) rotate(15deg) scale(.9)'},{transform:'translate(-25px,0px) scale(.78)',offset:.45},{transform:'scale(.78)'}], {duration:1400});
    animate(el('card'), [{transform:'translateX(0)',offset:0},{transform:'translateX(0)',offset:.45},{transform:'translate(35px,45px) rotate(40deg)'}], {duration:1400,fill:'forwards'});
    delay(idle, mq.matches ? 0 : 1450);
  }
  function bindAudio(nextAudio) {
    unbind(); audio = nextAudio;
    if (!audio) { idle(); return; }
    const owner = audio;
    const start = () => {
      if (dead || audio !== owner) return; request = null; reset('speaking');
      animate(el('jaw'), [{transform:'translateY(0)'},{transform:'translateY(3px)'},{transform:'translateY(0)'}], {duration:230,iterations:Infinity});
    };
    const stop = () => { if (audio === owner) idle(); };
    const events = [['playing',start],['pause',stop],['ended',stop],['error',stop],['emptied',stop]];
    events.forEach(([event,fn])=>owner.addEventListener(event,fn));
    unbind = () => { events.forEach(([event,fn])=>owner.removeEventListener(event,fn)); audio=null; };
    if (!owner.paused && !owner.ended) start(); else idle();
  }
  function visibility() { if(document.hidden) reset(); else if(audio && !audio.paused && !audio.ended) bindAudio(audio); else idle(); }
  const resize = new ResizeObserver(position); resize.observe(button);
  addEventListener('resize',position); addEventListener('scroll',position,true);
  visualViewport?.addEventListener('resize',position); visualViewport?.addEventListener('scroll',position);
  document.addEventListener('visibilitychange',visibility); mq.addEventListener('change',visibility);
  reset(); position(); scheduleBlink();
  return {
    idle, waiting, answer, crumbs, arrival, bindAudio, reposition:position,
    setContext({allowIdleFidgets=false}={}) { idleEligible=allowIdleFidgets; },
    cancel() { request=null; unbind(); idle(); },
    get state() { return state; },
    destroy() {
      if(dead) return; reset(); dead=true; unbind(); resize.disconnect(); root.remove();
      if(glyph) glyph.style.visibility=oldVisibility;
      removeEventListener('resize',position); removeEventListener('scroll',position,true);
      visualViewport?.removeEventListener('resize',position); visualViewport?.removeEventListener('scroll',position);
      document.removeEventListener('visibilitychange',visibility); mq.removeEventListener('change',visibility);
    }
  };
}
