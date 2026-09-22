# Laitetestaajalle: laattojen esilatauksen (v2090, #2760) hyöty oikealla iPhonella

Karttaseppä 22.9.2026. Esilataus levossa (`js/laattaesilataus.js` + `sw.js`
LAATTACACHE) on tuotannossa v2090:stä alkaen. Sen hyöty näkyy vasta hitaalla
verkolla (LTE), jota Macin savukkeet eivät mittaa: verkko ei ole Macilla
pullonkaula (z8-laatta 16–52 kt, TTFB 21–56 ms). Tämä on ohje siihen, miten
korin koko ja mittari `laatat.esilataus` luetaan puhelimella ja mitä verrataan.

## Miksi savuke ei kelpaa tähän

- **WebKit-savuke ei aja:** Playwrightin WebKit ei reititä palvelutyöntekijän
  noutoja kontekstin reitin kautta, joten ämpärin (`media.matkakirja.app`)
  laatat eivät päädy koriin. `tools/savukkeet/savuke-laattaesilataus.mjs`
  ajaa siksi vain Chromiumilla, ämpäri Noden kautta.
- **Laitepalvelin ei kelpaa:** `tools/laitepalvelin.mjs` (haara
  `pelikoodari-laitepalvelin`) palvelee `sw.js`:n tilalla itsensä purkavan
  stubin — palvelutyöntekijää ei ole, kori ei täyty, esilataus ei tee mitään.
- Siis: **mittaus tehdään tuotanto-osoitteessa** `https://matkakirja.app/`
  (v2090 tai uudempi; `Info`-ruudun versionumero), oikealla iPhonella,
  Safari Technology Preview'n Web Inspectorilla USB-kaapelin yli (Fablen
  muistio 22.9.: toimii vain STP:llä ja vain kun puhelin on auki;
  Screenshots-aikajana pois). Web Inspector kulkee kaapelissa, joten
  puhelimen Wi-Fi saa olla pois ja verkko LTE.

## Asetelma

1. iPhone: Wi-Fi pois, mobiilidata päällä (LTE; kirjaa kentän palkit ja
   operaattori). Automaattinen lukitus: Ei koskaan.
2. Avaa Safarissa `https://matkakirja.app/?lauta=pallo&dev=marseille`
   (kehittäjän pikatie: yksi pelaaja Marseillessa, ei tallenna peliä;
   maa FRA saa kohdemaan laatat jonoon). Odota, että pallo on pystyssä ja
   kamera levossa Ranskan päällä.
3. Kytke Web Inspector välilehteen ja käytä Console-välilehteä.

Vertailu A/B **samalla laitteella, sama verkko, tyhjä kori kummassakin**:

- A: `https://matkakirja.app/?lauta=pallo&dev=marseille&esilataus=0`
- B: `https://matkakirja.app/?lauta=pallo&dev=marseille`

Aja järjestyksessä A, B, A, B (vuorotellen — LTE vaihtelee). Tyhjennä kori
ennen jokaista ajoa konsolissa:

```js
await caches.delete('matkakirja-pallolaatat-v1')
```

ja lataa sivu uudestaan (SW säilyy, vain laattakori tyhjenee; selaimen
HTTP-välimuistin tyhjennys Asetukset → Safari → Poista historia ja
sivustotiedot tekee A:sta oikeasti kylmän — tee se ainakin kerran).

## Mitä luetaan (konsolissa, kameran ollessa levossa 6–8 s)

Palvelutyöntekijä hallitsee sivua (muuten kori ei täyty):

```js
Boolean(navigator.serviceWorker?.controller)
```

Esilatausjonon mittari (`laatat.esilataus`; A:ssa `null`):

```js
window.matkakirja.ui.pallolauta.lepokerros()?.mittarit()?.esilataus
// → { jonossa, lahetetty, eria, maa: 'FRA', maaOsoitteita }
```

Korin koko ja siitä pyramidin laatat (esilataus koskee vain näitä; loput
ovat pallon omia z0–z3-laattoja, jotka `esilataaPallolaatat` tuo aina):

```js
const kori = await caches.open('matkakirja-pallolaatat-v1');
const avaimet = await kori.keys();
({ korissa: avaimet.length, pyramidissa: avaimet.filter((p) => p.url.includes('/julisteet/pyramidi/')).length })
```

Kirjaa nämä kolme 1) levon jälkeen ja 2) zoomin jälkeen.

## Zoomimittaus: karkean tason näkymisaika

Sama mittari kuin savukkeissa: tason vaihdosta siihen, että 90 % näkyvän
alueen laatoista on scenessä. Käynnistä kehyskeräys ennen zoomia:

```js
window.__zoomi = { kehykset: [], kaynnissa: true };
(function askel() {
  if (!window.__zoomi.kaynnissa) return;
  const m = window.matkakirja.ui.pallolauta.lepokerros()?.mittarit() ?? {};
  window.__zoomi.kehykset.push({ t: performance.now(), taso: m.taso, nakyvia: m.nakyvia, scenessa: m.nakyviaScenessa });
  requestAnimationFrame(askel);
})();
```

Zoomaa kahdessa askeleessa kamera-ajolla (sama kuin savukkeessa, Marseille):

```js
const pov = { lat: 43.3, lng: 5.4 };
await window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.067 }, 1500);
// odota 2,5 s
await window.matkakirja.ui.pallonInstanssi.pointOfView({ ...pov, altitude: 0.022 }, 1500);
// odota 2,5 s
```

Pysäytä ja laske tasojen vaihdot:

```js
window.__zoomi.kaynnissa = false;
const k = window.__zoomi.kehykset; const out = [];
for (let i = 1; i < k.length; i++) {
  if (k[i].taso === k[i - 1].taso || k[i].taso == null) continue;
  const alku = k[i].t; let loppu = null;
  for (let j = i; j < k.length && k[j].taso === k[i].taso; j++) {
    if (k[j].nakyvia > 0 && k[j].scenessa / k[j].nakyvia >= 0.9) { loppu = k[j].t; break; }
  }
  out.push({ taso: k[i].taso, ms: loppu == null ? null : Math.round(loppu - alku) });
}
out
```

Sormizoomi käy myös (ja on lähempänä pelaajaa), mutta kamera-ajo tekee A:sta
ja B:stä vertailukelpoiset. Halutessasi tee molemmat.

## Mitä raportoidaan

Taulukko per ajo: ajo (A/B, järjestysnumero), verkko (LTE-palkit), SW
hallitsee (true/false), levon jälkeen `esilataus` (lahetetty, eria, maa,
maaOsoitteita), korissa/pyramidissa levon jälkeen ja zoomin jälkeen,
tasojen vaihdot ms (z6→z7, z7→z8). Vartio, jota katsotaan: B:n
karkean tason näkymisaika z7→z8 on lyhyempi kuin A:n ja B:n `pyramidissa`
on levon jälkeen > 0 (Macilla ~60–100 laattaa 6 s:n levossa).

Jos SW ei hallitse sivua (`controller` null), lataa sivu kerran uudestaan —
ensimmäisellä käynnillä SW asentuu mutta ei vielä hallitse.

Kun #2762 (laattakatkaisija) on tuotannossa, samasta mittarista löytyy
myös `laatat.katkaistu`: `lepokerros().mittarit().katkaistu` — LTE:llä
katkos (3 virhettä tai 429/5xx → 20 s tauko) saa näkyä vain, jos verkko
oikeasti pätkii; kirjaa, jos se laukesi.

Raportti: `docs/raportit/laitekierros-v2090-esilataus-iphone.md`, ja
viesti Karttasepälle (ListAgents-nimi "Karttaseppä") tai Fablelle.
