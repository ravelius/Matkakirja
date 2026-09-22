# Esilataus levossa — suunnitelma (Pelikoodari 22.9.2026)

Omistajan tilaus (Fable 22.9.2026): esilatausta myös muualle kuin
laattoihin. Ei koodia vielä (kerma-shader ensin). Yksi budjetti kaikkialla —
EI erillistä mobiilibudjettia (omistaja 22.9.): mobiiliverkossa ladataan
yhtä lailla; vain tallennusraja ja keskeytys liikkeessä.

## Mitä service worker esilataa jo nyt (ei tehdä kahdesti)

| Kori (sw.js) | Sisältö | Milloin | Raja |
| --- | --- | --- | --- |
| `CACHE` (SHELL) | koko peli: html, css, js-moduulit, packs, kartat, fontit, liput, linssikuvat (MEDIA yksitellen) | asennus | – |
| `AANICACHE` | ydinäänet (huudahdukset, tehosteet) asennuksessa; luennat, musiikki ensimmäisellä kuuntelulla; Range → 206 leikataan korista | asennus + käyttö | – |
| `KUVACACHE` | ämpärin ja Commonsin kuvat ensimmäisellä katselulla (cors, vain ok) | käyttö | **ei kattoa** |
| `LAATTACACHE` | pallon laatat: `esilataa-pallolaatat`-viesti (js/pallo.js esilataaPallolaatat: saapumispiste, esilatauksenLaatat) ja lentoreitin laatat (esilataaLentoreitti, avaus.js) | saapuminen, avauslento | 3000 laattaa (≈ 30 Mt), siivous 200 kerralla, 6 rinnakkain |
| `VENDORCACHE` | kirjastot ämpärin vendor/-polusta | käyttö | – |

Sivun puolella lisäksi: `esilataaLuentakuva` (fokusvirta), `esilataaViereisetSivut`
(lehti), `esilataaIlme`, aikajanan kuvan `decode()`, puheen `preload=auto`.
Näistä mikään ei ole yhteinen jono eikä tunne lepoa/liikettä.

## Ehdotus: yksi lepoaikainen esilatausjono (js/esilataus.js + sw.js)

- **Jono** sivun puolella (`luoEsilatausjono(ui)`): kohteet `{ osoite, kori,
  prioriteetti, ryhmä }`; sivu lähettää SW:lle viestin `esilataa`
  (yleistys nykyisestä `esilataa-pallolaatat`), SW noutaa `fetch(mode: 'cors')`
  ja `cache.put` oikeaan koriin (KUVACACHE / AANICACHE / LAATTACACHE / uusi
  `ESILATAUSCACHE` lehdille ja kohdekartoille). **Ei kosketa GPU-muistiin**:
  vain Cache API, ei Image/decode, ei tekstuureja — pelin oma haku löytää
  ne korista, kun kuva/laatta oikeasti tarvitaan.
- **Lepo ja keskeytys**: jono etenee vain, kun lauta on levossa (sama
  ehto kuin kartta-liike.js `levossa()`: ei raahausta, kamera-ajoa, korttia,
  linssiä, lentoa) ja `document.visibilityState === 'visible'`. Liikkeen
  alkaessa sivu lähettää `esilataus-tauko`; SW keskeyttää aloittamatta
  uusia noutoja (kesken olevat ≤ 4 saavat valmistua). Rinnakkain 4, yksi
  aloitus per 50 ms — ei purskeita ämpärille (media.js katkaisija).
- **Budjetti** (sama kaikkialla): yksi erä levossa ≤ 3 Mt tai 40 kohdetta,
  seuraava erä vasta 2 s levon jälkeen; istunnossa yhteensä ≤ 60 Mt
  esilatausta (laskuri SW:ssä, nollautuu asennuksessa).
- **Tallennusraja**: `navigator.storage.estimate()` → jos käytössä yli 70 %
  kiintiöstä tai yli 400 Mt, esilataus pysähtyy ja KUVACACHE saa katon
  (LRU 1500 kuvaa, siivous kuten LAATTACACHE) — nyt kuvakorilla ei ole
  kattoa lainkaan. `Cache-Control: immutable`-vastaukset eivät vanhene;
  versioidut polut (kansio nimessä) vanhenevat nimen vaihtuessa.
- **Ei kahdesti**: SW tarkistaa `cache.match` ennen noutoa; sivun jono
  hylkää osoitteet, jotka ovat jo SHELLissä tai jo jonossa.

## Prioriteetit (jono järjestyksessä, ylempi tyhjennetään ensin)

1. **Laatat**: näkymän ympäriltä taso z+1 (liikevaran laatikko × 1,5) ja
   kohdemaan z6–z8 — Karttaseppä tekee (laajentaa esilatauksenLaatat ja
   `esilataa-pallolaatat`-viestiä; LAATTAKATTO 3000 riittää: kohdemaa z8
   ≈ 400–900 laattaa).
2. **Nostokuvat**: ruudussa olevien nostojen ensimmäinen kuva (nostokuva.js
   kortin avauskuva) pienestä koosta alkaen (ämpärin pienet versiot ensin,
   isot vasta kun pienet on kaikilla) ja kohdemaan kaikkien nostojen
   ensimmäinen pieni kuva. Lähde: sovittimen näkyvät nostot
   (`l.nostot.osumat()`) + `maanKohdetiedot(iso)`.
3. **Matkan alkaessa** (liikenappi painettu, matka-animaation aikana —
   lauta ei ole levossa mutta pelaaja ei voi napauttaa): kohdekaupungin
   lehti (kansi + sivut, `esilataaViereisetSivut` laajennettuna), kohdekartta
   (nähtävyyskartan kuva ja merkit), pienoismallit, kohtaamiskuva,
   saapumispuhe ja luennat (AANICACHE, koko tiedosto — 206 leikataan
   korista). Tämä on ainoa erä, joka saa ajaa liikkeessä, koska liike on
   pelin oma animaatio eikä sormen alla.
4. **Linssi**: kun linssi on ansaittavissa (seuraava aarre), sen laatat
   (satelliitti/astronautti: LAATTACACHE) ja musiikki (AANICACHE).
5. **Fontit ja atlaksen rasterit**: kohdemaan nimien rasterointi levossa
   (nimiorasterit.js `puraJonoa` ilman liikkeen rajoitusta — ei SW:hen,
   vaan valmiiksi atlakseen) ja lehden fontit, jos jokin niistä ei ole
   SHELLissä (tarkistetaan; nyt fontit ovat).

## Mittarit (ennen/jälkeen, savuke + Laitetestaaja)

- **Nostokortin avausviive**: napautus → ensimmäinen kuva näkyvissä
  (`nostokuva.js` kuvan `load`), 10 nostoa Ranska z6, p50/p95 ms;
  välimuisti tyhjänä ja lämpimänä.
- **Kaupunkiin saapumisen ensikuva**: liikenappi → saapumisnäkymän
  ensimmäinen kuva (fokusvirta isokuva / kohtaamiskuva) piirretty, ms.
- Sivuvaikutukset: kehysprofiili levossa (esilataus ei saa tuottaa > 25 ms
  kehyksiä — fetch/cache.put ovat SW:ssä, joten pääsäie ei kuormitu),
  `navigator.storage.estimate()` ennen/jälkeen, ämpärin 429-määrä.
- Savuke `savuke-esilataus`: jono käynnistyy vain levossa, keskeytyy
  raahauksessa, ei ylitä eräbudjettia, kohteet löytyvät koreista, sama
  osoite ei lähde kahdesti (SW:n fetch-laskuri).

## Erät

1. SW:n yleinen `esilataa`-viesti + korikohtainen `put`, tallennusraja ja
   KUVACACHE-katto (Pelikoodari, ≈ ½ pv).
2. Sivun jono (lepo/keskeytys/budjetti) + prioriteetti 2 (nostokuvat) +
   mittarit (Pelikoodari, ≈ 1 pv).
3. Prioriteetti 1 laatat (Karttaseppä), 3 matkan erä (Pelikoodari +
   Sisältökirjuri lähteet), 4 linssit, 5 rasterit.
