# Pelikoodarin luovutus 6.10.2026 klo 23.4x Suomen aikaa (tilinvaihto)

Uusi Pelikoodari: lue tämä, sitten docs/raportit/viesti-pelikoodari-aloitus.md. Ei uusia töitä ennen Päätoimittajan viestiä.

## Julki tänään (Pöllö)
- #4063 mallin rivimuodon sieto (Peking/Tokio/Nairobi 502), #4062 alarivi sanarajalle, #4064 /opas/lahella ("Mikä tämä on?"),
  #4067 Wikimedia-haun uusinta, #4068 Workers Logs (telemetriarajapinta: CLOUDFLARE_API_TOKEN, ks. alla), #4071 kaupungin ja
  sijainnin ristiriita (natiivi lähetti Kööpenhaminan koordinaatit), #4076 PCM-virran nopeusloki, #4077 lisäkuvahaun virhe ei
  tallennu tyhjänä (Sensō-ji), #4075 + #4080 kuvalista kaupunki kerrallaan.

## Kuvalista (omistaja 20.0x, Päätoimittaja 20.3x) — KÄYNNISSÄ
- Worker: tools/pollo/opas-kuvat.js. Lukittu kaupunki (≥ 6 kohdetta) käyttää vain listaa (kohteet, kierros 8, Liiku koko lista,
  kuvat 1–5); muut ennallaan. Lista: media.matkakirja.app/opas/kuvat-v2/kuvat.json (Euroopan erä, 51 kaupunkia, julki 23.12).
- Ämpäri on MUUTTUMATON (vie-paketti.sh ei ylikirjoita, immutable 1 v): jokainen erä uuteen polkuun.
  Seuraava erä: `node tools/pollo/tee-opas-kuvat.mjs --versio v3 --ulos /Users/Shared/Claude/proto-3d/_valmiit/opas-kuvat-vienti-<pvm> --sisalto /Users/Shared/Claude/wt/sisaltokirjuri-oppaan-kuvat/data/oppaan-kuvat/oppaan-kuvat.json`
  → tarkista lisenssit (skripti muistissa: VAPAA-regex, tekijä tai PD/CC0, url peilistä), PNG→JPEG (sips; 3 kpl EU-erässä),
  SHA256SUMS, silmätarkistus 30 kuvan otos, vertailukuva 3 kaupungista Päätoimittajalle → Julkaisija vie paketin → wranglerin
  muuttuja OPAS_KUVALISTA_URL = .../opas/kuvat-v3/kuvat.json (PR, ei koodimuutosta). Päätoimittajan kaava: ei uutta kierrosta.
- Sisältökirjuri ajaa Aasiaa, Afrikkaa ja Amerikkoja (oppaan-kuvat.json kasvaa; 916 kohdetta 23.0x). Vaiheen 1 (266) jälkeen
  ajonaikainen kuvahaku poistetaan kokonaan.

## Yövalojen tiet (Linssiseppä) — #4081 AUKI
- Endpoint GET /opas/aineistot (tools/pollo/aineistot.js) + tools/kartta/tee-tiet.mjs.
- Viety: kartta/tiet-v1/{pariisi,venetsia,koopenhamina,ateena,rooma,lontoo,amsterdam}.json (4 km, 23.27).
- ODOTTAA VIENTIÄ: /Users/Shared/Claude/proto-3d/_valmiit/kartta-tiet-vienti-20261006b (kartta/tiet-v2/{pariisi,lontoo,rooma}, 6 km,
  SHA256SUMS OK). #4081 (kärki ee9dc402) listaa tiet_polut → tiet-v2. Järjestys: vienti ensin, sitten #4081.
- KERRO LS1:LLE: natiivin pitää lukea `tiet_polut[id]`, jos olemassa (muuten kartta/tiet-v1/<id>.json).

## Kaupunkiäänimaisema (omistaja 21.4x, Siirtoseppä soitin) — KESKEN
- Äänikartta: tools/aanimaisema/tee-aanikartta.mjs (committoitu VAIN tähän luovutushaaraan — siirrä worktreehen
  VALMIS 23.45: /Users/Shared/Claude/proto-3d/_valmiit/aanimaisema-vienti-20261006/aanet/aanikartta-v1/pariisi.json (120 × 120, 278 kt,
  kirkot katkaistu 400:aan — harkitse rajaa); tarkista kerrokset kuvana ennen vientiä; LAHTEET.md (OSM ODbL) ja SHA256SUMS puuttuvat.
  ja PR). Pariisin ajo käynnissä/keskeytynyt Overpass-ruuhkaan; välimuisti /Users/Shared/Claude/proto-3d/_tyo/aanikartta-osm jatkaa.
  Muoto sovittu (aanet/aanikartta-v1/<id>.json, 13 kerrosta, base64 Uint8, lounas/askel, kirkot). Id: pariisi, venetsia, koopenhamina.
  Lisää id aineistot.js:n aanikartta-listaan vasta, kun kaupungin silmukat ovat ämpärissä (Siirtoseppä).
- Äänet: Freesound-ehdokkaat haettu Actionsilla (aanihaku.yml tila ehdokkaat, peräkkäin — rinnakkaiset peruuntuvat), 13 kerrosta +
  kello, 8/luokka: /Users/Shared/Claude/proto-3d/_tyo/aanimaisema-v1/ehdokkaat/*.json (+ mittaa.py, aja.sh). Esikuuntelut ja mittaukset:
  /Users/Shared/Claude/proto-3d/_tyo/aanimaisema-v1/ (mittaukset.json). Seuraavaksi: valinta (CC0/CC BY, ei puhetta, 60–120 s
  silmukka, sauma), PCM-ketju, LAHTEET.md merkinnällä "mitattu" (Päätoimittaja: omistaja kuuntelee pilotin tallenteesta).
  Pilotti esikuunteluista; julkaisuversion WAV-lähde päätetään pilotin jälkeen (OAuth tai muu lähde). Avaimia ei kysytä omistajalta.

## Kesken: Päätoimittajan tilaukset
- Pidempi kerronta: PR #4082 (luonnos), +40 % (paikallisesti 42 → 59 sanaa; tuotanto noin 47 → 66 sanaa, 31 → 44 s).
  Vertailu kahdesta kohteesta (Eiffel, Kaarlensilta) LÄHETETTÄVÄ Päätoimittajalle ennen julkaisua: tekstit
  /Users/Shared/Claude/proto-3d/_tyo/aanimaisema-v1/kerronta/pituus-{vanha,uusi2}.json (pituus.mjs ajaa vertailun).
- Kierroksen lyhin reitti (omistaja 23.4x): EI ALOITETTU. Lukitun listan 8–10 tärkeintä → lähin seuraava + 2-opt alkaen
  aloitusnäkymää tai sijaintia lähimmästä; sama Liikun Kaupunkikierros-riville. Päätoimittajalle Pariisin kokonaismatka ennen/jälkeen.

## Avaimet ja lokit
- Workers Logs: POST https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/workers/observability/telemetry/query
  (Bearer $CLOUDFLARE_API_TOKEN, filters $metadata.service = matkakirja-pollo; aikaleima = pyynnön LOPPU). R2 matkakirja-puhe
  Cloudflare-rajapinnalla (objects?prefix=…).
- FREESOUND_API_KEY ei ole Macilla (vain Actionsin salaisuus).
