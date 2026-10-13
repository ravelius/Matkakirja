# Linnanrakentajan luovutus 14.10.2026 yö (~00.5x) — NOLLAUS (PT, konteksti 52 %)

Luovuttaja: Linnanrakentaja (Opus, high). Edellinen: `viesti-linnanrakentaja-luovutus-20261013-myohaisilta.md` (Olavinlinnan tila ja
työtavat edelleen voimassa). **OLAVINLINNA TAUOLLA, PEKING CODEXILLA.** Ei taustaajoja, ei worktreetä auki.

## 1. Ranskan taidemuseo, salitiedosto (vain sali.json; glb ennallaan sali-v2d/)
Lähde `/Users/Shared/Claude/proto-3d/_valmiit/taidemuseo-ranska-v2/` (`lahde/ranska.py` → `sali.json`; LUEMINUT.md versiot).
| Versio | Muutos | Toimitus |
|---|---|---|
| v2e | puutarhan veistosspotit: ei 3 m:n kattorajaa, 4 m vaakaetäisyys, jalusta+teos+1,5 m, 32–37° alas, puolikulma 35° (PT) | `_valmiit/taidemuseo-ranska-v2e-json-20261013/` (LS2 kytki bc05b26b8) |
| v2f | Mona Lisa keila 300 → 150 lx | `…-v2f-json-…` |
| v2g | Mona Lisa 200 lx (PT: muita kirkkaampi; keltaisuus oli varjostimen katto, LS1 f7679f89d) | `…-v2g-json-…` |
| v2h | Ajattelijalle 3. spotti selkäpuolelle (−z, 20° sivuun, 160 lx, 5600 K) — siluetti puutarhasta | `…-v2h-json-…` sha 9e5a86c2d22f (LS1/LS2) |
- Bironin "musta seinä" EI ollut datan vika: natiivin SaliMateriaali linearisoi baseColorFactorin kahdesti; LS1 korjasi (c.gamma, b8e712a87, PT kuittasi).
- Avoinna: LS1:n tarkistuskuva v2h:sta (Ajattelija rp2-kulmasta). Kolmas valo: varmista että natiivi/testi hyväksyy 3 valoa/veistos.

## 2. Raketin lähtöalusta v3c (PT KUITTASI, LS2 kytki efeb4b5e7:n päälle, maastolaatta v4 Nordmela)
`/Users/Shared/Claude/proto-3d/_valmiit/iss-raketti-alusta-v3/` — LUEMINUT.md (v3, v3b, v3c), LAHTEET.md, `lahde/alusta.py` + `apu.py`
(+ `osm_kehys.py`, `esikatselu.py`, `arkki.py`), `glb-erillinen/alusta.glb` (sha 63be209014c0a9b4), `glb-erillinen/tiedot.json`.
- Sijainti PT: **Nordmela, Pad A** (OSM way 1372369263). Origo (laukaisupöydän keskipiste) **69,10867 N 15,58883 E**.
- Kehys: Blender +X = glTF +X = 340°, Blender +Y = glTF −Z = Unity +Z = 250° (huoltotorni), liekkikuilu +X (merelle). Edellyttää
  Nousu.Suunta = 160°. v3/v3b oli peilikuva (LS2 huomasi) → v3c korjasi OSM-asettelun (pöytä/torni/kiinnitys raketin osia, ennallaan).
- Sisältö: OSM-asettelu (kenttä, aita, portit, 7 säiliötä 16 m, huoltorakennus, tiet), laukaisupöytä kaiteineen/portaineen/vesirenkaineen,
  liekkikuilu ja -ohjain, huoltotorni napavarsineen ja lentoestevaloineen, 4 salamasuojamastoa 96 m johtimineen, 7 hoikkaa 22 m:n valomastoa,
  harkkosuojamuuri, höyrystimet, kontit, putkisilta. v3c materiaalit kärkiväreinä (paletti 256 px / 64 ruutua): laattojen sävyt, noki,
  tahrat, valumat, kuluma, keltamustat raidat, keltaiset viivat. 40,5 k kolmiota, 3,2 Mt.
- ESA/Isarin kuvat sallittu VAIN muotoviitteiksi (PT), ei tekstuureihin. Commonsissa ei Pad A -kuvia.
- PT:n jatkohuomio: jos noki jää pelissä haaleaksi kuilun suulla, voimista (`noki_maa`, `kuilu_vari` alusta.py:ssä).

## 3. Rijksmuseum-karttaesine v1 (PT KUITTASI, LS1 kytki linssiseppa/museo-kartta-189 8e9480624)
`/Users/Shared/Claude/proto-3d/_valmiit/rijksmuseum-kartta-v1/` — `glb/rijksmuseum_kartta.glb` (sha 34b3f6009800636b), LAHTEET.md,
`lahde/rijksmuseum_kartta.py`, esikatselu-edesta/viisto.png. Muoto kuten olavinlinna-torni-kartta-v1; 938 kolmiota; viite Commons CC0
"Rijksmuseum gezien vanaf het Museumplein, HA-0026666.jpg". Julkisivukuviot 10 cm kerrosvälein (välke). LS1 ilmoittaa, jos kehys/valo muuttuu.

## 4. Rodinin pronssit (PT:n erä; työnjako LS2:n kanssa sovittu)
- LÖYDÖS: patsaiden värikuva ei sidottu pelissä → kaikki patsaat VeistosPohja-marmorina (~145/130/110). vari.astcm:t kunnossa
  (purettu sipsillä: Pronssikausi 48/38/34, Ajattelija 83/101/82). **LS2 korjaa sidonnan + veisto.json "materiaali": "pronssi" -tuen**
  (museohaara, raketin erän jälkeen).
- MINUN OSANI TEHTY: `_valmiit/rodin-pronssi-arvot-v1/pronssi-arvot.json` (pronssi: _Pohja 1, _Metalli 0,7, _MetalliHaja 0,35,
  _Kiilto 0,35, _Karheus 0,4, _Ymparisto 1; pronssi- ja marmorilistat) + `esikatselu/ajattelija-vertailu.jpg` (A/B/C), `lahde/vertailu.py`.
- Avoinna: LS2:n simuajon ennen/jälkeen-kuva puutarhan kulmasta PT:lle (LS2 tekee).

## 5. Jono
Ei omaa erää kesken. Odota: LS1:n v2h-kuva, LS2:n pronssikorjaus/-kuva, pelikuvat alustasta (noki). Uusi erä PT:ltä.

## Aloitusviesti
```
Olet Linnanrakentaja (Opus, high) Matkakirja-pelissä. Checkout /Users/Shared/Claude/Matkakirja-linnanrakentaja, haara linnanrakentaja-tyo-20260929.
Aja git fetch origin. Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-linnanrakentaja-luovutus-20261014-yo.md KOKONAAN.
Valmiina: lähtöalusta v3c (Nordmela, LS2 kytki), Rijksmuseum-karttaesine (LS1 kytki), Ranskan sali v2h, pronssiarvot (LS2 korjaa sidonnan).
Odota LS1/LS2:n huomioita tai PT:n uutta erää. OLAVINLINNA TAUOLLA, PEKING CODEXILLA.
Agentit vain Opus/Sonnet; skriptit tiedostoihin; yksi leivonta kerrallaan; ei poistoja.
```
