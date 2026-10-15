# Pelikoodarin luovutus 15.10.2026 ilta (Postivahdin KOVA RAJA 37 %, klo 17.36)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, push remoteen
natiivi-backup peili/proto/<haara>). Edellinen luovutus viesti-pelikoodari-luovutus-20261015-iltapaiva.md (kaikki sen kohdat hoidettu).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä, osoitekirja /Users/Shared/Claude/osoitekirja.md
  (PT local_5df52e10-10e4-4b72-9554-0049db300dfe ≤ 3 riviä, Postivahti local_a24c43c0…, Julkaisija local_5cb16c00…, NS local_674b9ec4…,
  NUI local_44392b3c…, Linssiseppä local_771b401b…, Siirtoseppä local_86d0c984…, Äänittäjä local_16ee69c8…).
- OMISTAJAN PÄÄTÖS 16.05: juna 194 lukittiin 16.35 (BUILD 194); juna 195:n erät ovat nyt työn alla.
- Junan 195 muistio kaikkine rajapintoineen: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/mika-tama-on-195/MUISTIO.md (LUE).

## Tässä vuorossa valmiit (juna 194)
- Ateena pelaajille: PT KUITTASI 16.1x, NS:lle viety (57088358e…fccae7f47 + Valosepän 443eefe77). pallokierros-ateena-v9 (Zeus katse 225)
  ämpärissä (Julkaisija 15.57, aebe63f8…). Kuvat proto-3d/lokit/todistus-ateena-e02-194-20261015-1604/. Praha e4f10bb7d kuitattu aiemmin.
- Kertojan tekstin puuttuminen pallokierroksen kuvissa EI ole vika (Raamattu PUHE ÄÄNENÄ, EI KUPLINA; oppaassa ei tekstityskaistaletta).
- Isoisä v3: web PR #4625 MERGED (v2617): KAARI_AANITTEET_V3 (9 kaarta) + 5 fokus-luentaa -v3-poluille, aikaleimat, kaupunkiOsoitteesta ohittaa
  -vN. Worktree poistettu. Natiivi saa kaaret viennin kautta.

## KESKEN: juna 195 (PT:n erät)
1. LENTOKONE + RAKETIN PISTE — KOODI VALMIS, kuvatodistus puuttuu: proto pelikoodari/aloituskone-195 e36f3b880 (pohja natiivi-ui/aloitus-195
   8eaf6307c), pushattu. AloituslennonRata.KokoLahdossa 0,8 % → 2,5 % nousun käyrällä; Houkuttimet.AloituksessaPiilossa {andoya}
   (Pallovalinta-lippu Aloitusnakymasta + Nappula.AloitusAjossa). Kartta-testit 30/30 + Houkuttimet 6/6, tarkista.sh 0 virhettä. NUI:lle
   kerrottu Aloitusnakyma-riveistä. TEE: Julkaisijalta pyydetty (17.2x, jonossa) KÄÄNNÖS NYT L2 pelikoodari/aloituskone-195 → 39644E75 ja
   SIMULAATTORI NYT. Käännös: `PROTO_LINJA=2 PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/aloituskone-195-app zsh
   /Users/Shared/Claude/proto-3d/tyokalut/proto-kaanna.sh pelikoodari/aloituskone-195 39644E75-8BDA-4ED8-98B1-3FC864B73697 >
   …/aloituskone-195-app/kaannos.out`, sitten `zsh proto-3d/tyokalut/pelikoodari-ajot/ajo-aloituskone-195.zsh` (video + 3 stilliä). Katso
   kuvat, sitten SHA + kuvien polku PT:lle ja haara NS:lle junaan 195. LUKKO/SIMU VAPAA Julkaisijalle.
2. e02:n TUMMAT PUUT (Linssiseppä 17.3x: "en ota, tee sinä"): tee pallokierros-ateena-v11 = v10 (CDN:ssä, Linssisepän stadion + Tuulten torni)
   + Zeus (Q1123019) silma_m nykyisestä 45–60 ylöspäin. Kokeilu valmiina: `ajo-zeus-silma-195.zsh` (75–90 ja 95–115 korjaustiedostolla, sama app
   kuin kohta 1). Valitse, tee vienti _valmiit/opas-pallokierros-ateena-v11-vienti-<pvm> (SHA256SUMS + LAHTEET.md, kuten v9) → Julkaisija vie;
   Versiot-rivi ateena → v11 Linssisepän linssiseppa/kierrokset-195 66c5be330:n päälle (+ kultainen Linssit-testit/kultaiset/pallokierros-v1/
   ateena.json ja PallokierrosV1Testit-versio). v10-json: _tyo/pelikoodari/ateena-e02/ateena-v10.json.
3. MIKÄ TÄMÄ ON? (omistaja 16.21, Pariisi ensin): ei aloitettu. Pohja siirtoseppa/vapaalento-195 (VapaaTila → nykyinen nappi näkyy, ei uutta
   lippua). Nykyinen nappi = ruudun keskikohdan /opas/lahella → kertojan (William) vastaus; uusi: pelaaja NAPAUTTAA rakennusta → Pulu vastaa
   lyhyesti OMALLA äänellään (striimipuhe, AaniKanava.Puhe), esittelystä tiivistys, tuntemattomasta "en tunne". Selvitys aloitettiin Sonnet-
   agentilla (PuluChat-ääni, napautus → maapiste, Pariisin esittelytekstit): VALMIS, tulos ja suositus MUISTIO.md:n lopussa (SELVITYS).

## Avoimet / seurattavat
- Proto-worktreet: wt/proto-pelikoodari-pallot-pelaajille-194 (junassa 194, poista kun BUILD 194 TF:ssä), -aloituskone-195 (työn alla),
  -pallo-aanet-193 ja -kultaiset-193b (poistettavissa). Simu pelikoodari-iPad13 39644E75 sammutettu 16.08.
- Orpo `simctl recordVideo` pid 26437 (14.10. 23.02, museokohdat6) yhä käynnissä; ei kosketty.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-pelikoodari-luovutus-20261015-ilta.md
(haara pelikoodari-luovutus-20261014-paiva) sekä proto-3d/_tyo/pelikoodari/mika-tama-on-195/MUISTIO.md. Kärki: lentokone-erän kuvatodistus
(pelikoodari/aloituskone-195 e36f3b880, käännös + simu Julkaisijalta) → SHA ja kuvat PT:lle (local_5df52e10-10e4-4b72-9554-0049db300dfe),
sitten e02:n puut ateena-v11:nä ja Mikä tämä on? -erä."
