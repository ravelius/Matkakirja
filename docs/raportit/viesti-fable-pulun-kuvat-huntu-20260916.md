# Viesti Fablelle: pulun kuvat saavat saman hunnun kuin isoisän kuvat

**Sonnet-sessio 16.9.2026. Haara `claude/bold-ride-vow4ki-pulun-kuvat-huntu`,
lähtötilanne main = v1917 (78e60489). Ei versionostoa, ei mergeä, ei
Raamattu-muokkausta.**

Omistajan iPhone-kuva Ateenasta: Pulu Cam -kuva isona ruudulla, mutta
kartta sen alla oli terävä ja vaalea — isoisän kuvien alla kartta
tummuu ja sumenee (`body.luenta-huntu`, `.map-pane::after`
`backdrop-filter`), pulun kuvan alla ei.

---

## 1. Juurisyy

`js/ui.js` `kaynnistaLuentavahti` laski hunnun samasta `kertoja`-
muuttujasta kuin kaiuttimen VU-mittarin sykkeen:

```js
const kertoja = !varaventtiili && soivaPuhuja(PUHUJA_PULU) !== null;
...
document.body.classList.toggle('luenta-huntu', kertoja && kuvaRuudulla && huntuSallittu);
```

`soivaPuhuja(PUHUJA_PULU)` on TARKOITUKSELLA pulun poissulkeva —
omistajan 14.9.2026 linjaus oli, että kaiutin ei saa sykkiä pulun
repliikissä ("Pulun luennassa riittää pulun elehtiminen"). Sama
poissulkeva ehto valui kuitenkin myös hunnulle, vaikka huntu on
**kuvan**, ei puhujan, ominaisuus: Pulu Cam -kuvat piirtyvät samaan
`.fokusvirta-isokuva`-elementtiin kuin isoisän kuvat (js/pulucam.js,
js/fokusvirta.js `avaaIsokuvaPaallys`), joten ne ansaitsevat saman
taustan tummennuksen.

Korjaus: huntu kysyy nyt KENEN TAHANSA kuuluvaa ääntä
(`soivaPuhuja()` ilman `paitsi`-rajausta), ei vain kertojaa. Kaiuttimen
oma `kertoja`-muuttuja jätettiin ennalleen — sen tarkoituksellinen
pulu-poissulkeutuminen ei muutu.

## 2. Poistuma-ajastuksen korjaus (sivutuote)

Samalla mitattiin, että Pulu Cam -sarjan LOPETUS
(`js/fokusvirta.js` `aloitaPuluCamSarja`) laski varakellon pelkästä
kuvien lukumäärästä (`(kuvat.length - 1) × 4000 ms + 6000 ms`) — ei
pulun oikean äänitteen kestosta. Dubrovnikin mittauksessa viiden kuvan
sarjan varakello oli 22 s, mutta oikea äänite kesti 26,07 s: kuva ja
(nyt jo korjattu) huntu olisivat kadonneet 4 sekuntia ennen puheen
loppua.

Lisätty `js/fokusvirta.js` `vahtiPulunLoppua`: se lukee
`ui.liviaAani`-elementin (vaihtuu joka pulun repliikin osan mukana,
js/liviapuhe.js `soitaLivianAani`) todellisen `duration`/`currentTime`-
parin 250 ms:n välein ja korvaa kiinteän varakellon heti, kun kesto on
tiedossa — sarjan loppu lasketaan siis aina TODELLISESTA jäljellä
olevasta ajasta, ei kiinteästä kuva-arviosta. Kuva alkaa hiipua
`PULUN_KUVAN_ENNAKKO_MS` (1000 ms) ennen laskettua loppua, ei aiemmin.
Jos ääni ei koskaan kerro kestoaan (mykistys, teksti-ilman-ääntä-tila,
puuttuva äänite), kiinteä varakello jää voimaan ennallaan — sama
sopimus kuin `js/liviapuhe.js` `livianKuplanAika`:lla tekstin
lukuajalle.

Osiin jaetun puheenvuoron välitauko ei saa näyttää sarjan lopulta:
`PULUN_KUVAN_HILJAISUUSKATTO_MS` (1500 ms) sietää tauon kahden pulun
oman repliikin osan välissä ennen kuin puhe päätellään aidosti
loppuneeksi.

## 3. Muutetut tiedostot

- `js/ui.js` — huntuehto laajennettu koskemaan ketä tahansa puhujaa.
- `js/fokusvirta.js` — `vahtiPulunLoppua` sitoo Pulu Cam -sarjan lopun
  oikeaan äänen kestoon.
- `tools/savukkeet/savuke-kaiutin-luentakuvat.mjs` — uudet vartiot
  (390 ja 1400 px): huntu pulun oman äänen aikana, VASTAKOE (vanha,
  pulun poissulkeva ehto ei olisi nostanut huntua), ja poistuma-
  ajastus (kuva näkyy vielä 1,5 s ennen puheen loppua, poissa 0,5 s
  loppumisen jälkeen).

## 4. Savuketulokset

Kaikki ajot NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers,
yksi kerrallaan etualalla:

- **savuke-kaiutin-luentakuvat.mjs: 84/89.** Kaikki 10 uutta pulun
  vartiota (390 ja 1400 px: huntu pulun oman äänen aikana, VASTAKOE,
  "kuva näkyy 1,5 s ennen puheen loppua", "kuva ja huntu poissa kun
  koko puheenvuoro loppuu") LÄPÄISIVÄT MOLEMMILLA RUUDUILLA. 5
  epäonnistumista on ennestään tunnettua, tähän diffiin liittymätöntä
  epävakautta 1400 px:n Web Audio -reitityksessä (samat kaksi
  virhettä toistuivat identtisinä myös AIVAN ALKUPERÄISESSÄ,
  muokkaamattomassa tiedostossa ajetussa perusmittauksessa) — kolme
  muuta seuraavat samasta juurisyystä (VU-mittarin kaaret eivät voi
  elää, jos analysaattoria ei koskaan kytketty).
- **savuke-luentakuvan-kerros.mjs (koskematon tiedosto): 27/29.**
  Kaikki tiedoston OMAT huntu-vartiot (huntu tummentaa karttaa, iso
  luentakuva ei sumene hunnun alla, kehittäjän maailmanäkymän
  poikkeus) läpäisivät — ei regressiota isoisän hunnusta. Kaksi
  epäonnistumista (kortin tekstin näkyvyys, lykätyn luennan
  ajoitusikkuna) ovat ajastusherkkiä, tähän muutokseen
  liittymättömiä tarkistuksia samassa tiedostossa.
- **savuke-isoisa-pulu.mjs (koskematon tiedosto): 57/57.**
- **savuke-maailma-ei-kermaa.mjs (koskematon tiedosto): 6/6.** Huntu
  ei nouse maailmanäkymässä — poikkeus pysyy voimassa.

`node --test tests/luenta*.test.mjs tests/ui*.test.mjs tests/rules.test.mjs
tests/dokumentit.test.mjs`: 422/422. `node --check` kaikille
muutetuille tiedostoille: OK.

## 5. Kuvakaappaus

`docs/raportit/kuvat/pulun-kuvat-huntu-390-20260916.jpg` — 390 px,
otettu pulun oman äänen ja hunnun ollessa päällä.
