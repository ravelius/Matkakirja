// Puhdas sääntölogiikka: laudan rakenne, siirtojen laskenta ja etäisyydet.
// Tämä moduuli ei tiedä mitään DOM:ista, joten sen voi testata suoraan Nodella.

// Matkustamisen hinnat ovat samat kaikilla laudoilla.
export const SEA_FEE = 100;
export const FLIGHT_PRICE = 300;

/**
 * Sijainti on joko kaupungissa tai reitin varrella:
 *   { type: 'city', city: 'kairo' }
 *   { type: 'edge', edge: 'kairo|suakin', idx: 2 }   idx = askelia a-päästä
 */
export function posKey(pos) {
  return pos.type === 'city' ? `c:${pos.city}` : `e:${pos.edge}:${pos.idx}`;
}

export function edgeId(a, b) {
  return `${a}|${b}`;
}

/** Catmull–Rom-pehmennys avoimelle polulle: tiheä pistejono piirtoa varten. */
function densify(points, perSpan = 14) {
  if (points.length < 3) return points;
  const p = (i) => points[Math.max(0, Math.min(points.length - 1, i))];
  const out = [points[0]];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = p(i - 1);
    const [x1, y1] = p(i);
    const [x2, y2] = p(i + 1);
    const [x3, y3] = p(i + 2);
    for (let s = 1; s <= perSpan; s++) {
      const t = s / perSpan;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push([
        0.5 * (2 * x1 + (x2 - x0) * t + (2 * x0 - 5 * x1 + 4 * x2 - x3) * t2 + (-x0 + 3 * x1 - 3 * x2 + x3) * t3),
        0.5 * (2 * y1 + (y2 - y0) * t + (2 * y0 - 5 * y1 + 4 * y2 - y3) * t2 + (-y0 + 3 * y1 - 3 * y2 + y3) * t3),
      ]);
    }
  }
  return out;
}

/** Deterministinen 0–1 -arvo merkkijonosta (sama kuin kartan piirrossa). */
function hashLuku01(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100003) / 100003;
}

/**
 * Reitin kulkema polku pisteinä. Merireitit kaartavat via-pisteiden kautta ja
 * maareitit saavat hyvin pienen, aina samanlaisen mutkan, jotta kartta näyttää
 * käsin piirretyltä.
 */
export function edgePolyline(edge, cityById, map = null) {
  const a = cityById.get(edge.a);
  const b = cityById.get(edge.b);
  let waypoints = edge.via ?? [];

  if (!edge.via && edge.type !== 'sea') {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;
    const bend = Math.min(len * 0.035, 7);
    waypoints = [0.33, 0.68].map((t, i) => {
      const swing = (hashLuku01(`${edge.id}:bend:${i}`) - 0.5) * 2 * bend;
      return [a.x + dx * t + nx * swing, a.y + dy * t + ny * swing];
    });
  }

  return densify(avaaSauma([[a.x, a.y], ...waypoints, [b.x, b.y]], map));
}

/*
 * Kiertävällä kartalla reitti voi kulkea laudan reunan yli.
 *
 * Kaupungit pidetään aina välillä [0, leveys), joten Tokio on laudan
 * oikeassa laidassa ja San Francisco vasemmassa — vaikka Tyynimeri
 * niiden välissä on kapea. Sellaisenaan viiva kulkisi koko kartan
 * poikki Aasian ja Euroopan yli.
 *
 * Tässä viiva avataan: jokainen piste siirretään kokonaisen laudan
 * verran niin, ettei peräkkäisten pisteiden väli ylitä puolta laudasta.
 * Lopputulos jatkuu reunan yli, ja piirtäjä toistaa kartan molemmin
 * puolin niin että viiva näkyy siellä missä sen kuuluukin.
 */
function avaaSauma(pisteet, map) {
  if (!map?.kiertava || pisteet.length < 2) return pisteet;
  const leveys = map.width;
  const ulos = [pisteet[0]];
  let siirto = 0;
  for (let i = 1; i < pisteet.length; i++) {
    let x = pisteet[i][0] + siirto;
    const edellinen = ulos[i - 1][0];
    while (x - edellinen > leveys / 2) { siirto -= leveys; x -= leveys; }
    while (x - edellinen < -leveys / 2) { siirto += leveys; x += leveys; }
    ulos.push([x, pisteet[i][1]]);
  }
  return ulos;
}

/** Piste polulla suhteellisella etäisyydellä t (0–1), kaarenpituuden mukaan. */
export function pointAlong(poly, t) {
  if (poly.length === 1) return { x: poly[0][0], y: poly[0][1] };
  const lengths = [];
  let total = 0;
  for (let i = 1; i < poly.length; i++) {
    const d = Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
    lengths.push(d);
    total += d;
  }
  let target = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < lengths.length; i++) {
    if (target <= lengths[i] || i === lengths.length - 1) {
      const f = lengths[i] ? target / lengths[i] : 0;
      return {
        x: poly[i][0] + (poly[i + 1][0] - poly[i][0]) * f,
        y: poly[i][1] + (poly[i + 1][1] - poly[i][1]) * f,
      };
    }
    target -= lengths[i];
  }
  const last = poly[poly.length - 1];
  return { x: last[0], y: last[1] };
}

export function buildBoard(cities, edges, map = null) {
  const cityById = new Map(cities.map((c) => [c.id, c]));
  const edgeById = new Map();
  const adj = new Map(cities.map((c) => [c.id, []]));

  for (const raw of edges) {
    const id = edgeId(raw.a, raw.b);
    if (edgeById.has(id)) throw new Error(`Kaksoisreitti: ${id}`);
    if (!cityById.has(raw.a) || !cityById.has(raw.b)) {
      throw new Error(`Tuntematon kaupunki reitillä ${id}`);
    }
    const edge = {
      ...raw,
      id,
      type: raw.type ?? 'land',
      fee: raw.type === 'sea' ? (raw.fee ?? SEA_FEE) : 0,
    };
    edge.poly = edgePolyline(edge, cityById, map);
    edgeById.set(id, edge);
    adj.get(raw.a).push(id);
    adj.get(raw.b).push(id);
  }

  return { cities, cityById, edges: [...edgeById.values()], edgeById, adj };
}

/**
 * Yhden askeleen naapurit valitulla matkustustavalla.
 * 'land' käyttää vain maareittejä ja 'sea' vain laivareittejä; kesken reittiä
 * matka jatkuu aina samaa reittiä pitkin.
 */
export function stepsFrom(board, pos, mode = 'land') {
  const out = [];
  if (pos.type === 'city') {
    for (const eid of board.adj.get(pos.city)) {
      const e = board.edgeById.get(eid);
      if (e.type !== mode) continue;
      const other = e.a === pos.city ? e.b : e.a;
      if (e.steps === 1) {
        out.push({ pos: { type: 'city', city: other } });
      } else {
        const idx = e.a === pos.city ? 1 : e.steps - 1;
        out.push({ pos: { type: 'edge', edge: eid, idx } });
      }
    }
  } else {
    const e = board.edgeById.get(pos.edge);
    for (const dir of [-1, 1]) {
      const idx = pos.idx + dir;
      if (idx <= 0) out.push({ pos: { type: 'city', city: e.a } });
      else if (idx >= e.steps) out.push({ pos: { type: 'city', city: e.b } });
      else out.push({ pos: { type: 'edge', edge: e.id, idx } });
    }
  }
  return out;
}

/**
 * Kaikki lailliset päätepisteet kun nopan silmäluku on `roll`.
 *
 * Kaupunkiin saa pysähtyä jo ennen kuin koko silmäluku on käytetty — tasalukua
 * ei siis tarvita. Reitin varrelle pysähdytään vain silloin, kun silmäluku
 * loppuu kesken. Kesken reitin ei saa kääntyä takaisin, ja matka kulkee vain
 * valitun matkustustavan reittejä pitkin.
 *
 * @returns {Map<string, {pos, path}>}
 */
export function findMoves(board, start, roll, { mode = 'land' } = {}) {
  const results = new Map();
  const startKey = posKey(start);

  const record = (pos, path) => {
    const key = posKey(pos);
    if (key === startKey) return; // omalle ruudulle ei jäädä
    const prev = results.get(key);
    if (!prev || path.length < prev.path.length) results.set(key, { pos, path });
  };

  const walk = (pos, remaining, path, prevKey) => {
    // Kaupungissa matkan voi lopettaa vaikka silmälukua olisi jäljellä.
    if (path.length > 0 && (remaining === 0 || pos.type === 'city')) record(pos, path);
    if (remaining === 0) return;
    for (const step of stepsFrom(board, pos, mode)) {
      const key = posKey(step.pos);
      if (key === prevKey) continue; // ei peruutusta samaa reittiä
      walk(step.pos, remaining - 1, [...path, step.pos], posKey(pos));
    }
  };

  walk(start, roll, [], null);
  return results;
}

/** Onko pelaajalla laillisia siirtoja annetulla matkustustavalla. */
export function hasAnyMove(board, pos, mode = 'land') {
  for (let die = 1; die <= 6; die++) {
    if (findMoves(board, pos, die, { mode }).size > 0) return true;
  }
  return false;
}

/** Kaupungit, joihin sijainnista pääsee nykyisillä rahoilla (laivamaksut huomioiden). */
export function reachableCities(board, pos, money) {
  const seen = new Set();
  const queue = [];
  if (pos.type === 'city') {
    queue.push(pos.city);
  } else {
    // Reitin varrelta pääsee molempiin päihin ilman uutta maksua.
    const e = board.edgeById.get(pos.edge);
    queue.push(e.a, e.b);
  }
  for (const city of queue) seen.add(city);

  while (queue.length) {
    const city = queue.shift();
    for (const eid of board.adj.get(city)) {
      const e = board.edgeById.get(eid);
      if (e.fee > money) continue;
      const other = e.a === city ? e.b : e.a;
      if (!seen.has(other)) {
        seen.add(other);
        queue.push(other);
      }
    }
  }
  return seen;
}

/** Dijkstra askelina kaupungista kaikkiin kaupunkeihin. Laivareitit vain jos varaa. */
export function cityDistances(board, fromCity, money = Infinity) {
  const dist = new Map([[fromCity, 0]]);
  const queue = [[fromCity, 0]];
  while (queue.length) {
    queue.sort((x, y) => x[1] - y[1]);
    const [city, d] = queue.shift();
    if (d > (dist.get(city) ?? Infinity)) continue;
    for (const eid of board.adj.get(city)) {
      const e = board.edgeById.get(eid);
      if (e.fee > money) continue;
      const other = e.a === city ? e.b : e.a;
      const nd = d + e.steps;
      if (nd < (dist.get(other) ?? Infinity)) {
        dist.set(other, nd);
        queue.push([other, nd]);
      }
    }
  }
  return dist;
}

/** Sijainnin etäisyys valmiiksi lasketusta kaupunkietäisyyskartasta. */
export function distanceOf(board, pos, dist) {
  if (pos.type === 'city') return dist.get(pos.city) ?? Infinity;
  const e = board.edgeById.get(pos.edge);
  return Math.min(
    (dist.get(e.a) ?? Infinity) + pos.idx,
    (dist.get(e.b) ?? Infinity) + (e.steps - pos.idx),
  );
}

/** Sijainnin pikselikoordinaatit kartalla. */
export function pixelOf(board, pos) {
  if (pos.type === 'city') {
    const c = board.cityById.get(pos.city);
    return { x: c.x, y: c.y };
  }
  const e = board.edgeById.get(pos.edge);
  return pointAlong(e.poly, pos.idx / e.steps);
}
