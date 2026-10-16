# Natiivi-UI: luovutus 17.10.2026 klo 00.1x (Postivahti: kova raja 40 %)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -ilta5 ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, remote natiivi-backup.
Ennen käännöstä tyokalut/tarkista.sh (0 virhettä); museon ydinmuutoksissa Linssit-testit/kaanna.sh. Opit alla.

## OMISTAJAN SANATARKAT HAVAINNOT (PT:n välittäminä 01.0x–01.1x)
- 23.57 (i-kortin kuvasta museo-ikortti-tasot-heilahtaneet-2357.webp): "tasot näyttää heilahtaneen" → syy kortin varjolaatta lasin
  alla; POISTETTU (nimi-197 4f938ef4a), varmistettu kuvasta lokit/todistus-museo-juna-iphone-197-20261016-2356/kuvat/I1-ikortti-nyk.png.
- 23.58: "poista koko pelistä valinnat lukijan äänestä ja nopeudesta" → tehty natiiviin ja webiin (kohta 3).
- 23.59: "kaiutin ei näy tuossa ruutukaappauksessa juuri ollenkaan" → PT: kaiutin näkyy selvästi kaikissa museon korteissa, levossa ☰:n
  vaalea sävy, lukiessa kultainen; ilman kuunneltavaa ei kaiutinta lainkaan. TEHTY (nimi-197 c53e64010), kuva tulossa (kohta 1).

## TILA: junan 197 museo
- NS:llä (lähetetty): natiivi-ui/museo-juna-197 **9f1e78fd6** (korvaa b620ea8fc). Sisältö: kehys + varjo pois museon lasikorteista
  (Linssit.uss .mk-museo-lasikortti, MuseoTaulu.KehysPois), kaiutin, iPadin vaakaruudun nimi seinälle, kävelyn loppusuora
  MuseoKierros.TakaaSuoraM 1,2 m (korjasi liikepohjan kanssa testin KierrosLiikkuuPehmeastiIlmanHyppyja 5,65 → 2,62 m/s²), i-kortti +
  Sisältökirjurin #4736 (64/64 + 51/51, 40 muotokuvaa, 13 null → ei kuvaa eikä tyhjää ympyrää), EB Garamond PÄÄLLÄ (KK hyväksyi
  omistajan puolesta 00.5x; Kirjasimet.MuseoGaramond = true, `ui museofontti 0|1` jää testiin), Pelikoodarin liikepohja c32cbb200.
  Tyylikirja natiivissa generoitu: main + #4735 (liuku 1800) + #4742 (museon kirjainrooli). Linssit 1938/1938, tarkista 0 virhettä.
- WEB-PR:t avoinna (Julkaisija mergee): #4742 (tyylikirja: museon kirjainrooli, testit 4/4). #4735 on Pelikoodarin.
- Pelikoodarin intro-tasainen f596cae43 EI ole museo-junassa (merge koeajettu puhtaaksi); Pelikoodari lähettää itse.

## 1. ENSIN: KK:n LUKITUSEHTO – korttikuvat (käynnissä)
Ketju ketjut-20261016/museo-kortit-ketju.zsh **716614385** (= lukija-valinnat-197 ⊃ museo-juna-197 9f1e78fd6) → _tyo/natiivi-ui/
museo-kortit-197-app/ → iPhone + iPad skenaario sk-museo-kortit-197.txt (K1 kyltti, K2 kortti, N nimi, I i-kortti, Y ympyräkortti
lukiessa = kultainen kaiutin, Laivamalli + Yövartio, L1 lukijavalikko ilman Nopeus/Ääni) → sitten ajo-museo-leveys-198 iPhonella
(kohta 2). Klo 00.05 jonossa Karttasepän käännöksen takana (linja 2), arvio ~01.0x. Seuranta: museo-kortit-ketju.out.
TARKISTA: kaiutin näkyy levossa ☰:n sävyllä, lasi ja sisältö samoilla reunoilla, ei kehystä/varjoa. → polku PT:lle JA KK:lle
(KK local_dfa7296a-d3d3-41ef-a2b1-dbc42a652589 vain tähän; PT pyysi). Jos ok: NS:lle 9f1e78fd6 on jo perillä.

## 2. LEVEÄT TEOKSET iPhonella (pakollinen 197)
Sama ketju ajaa lopuksi ajo-museo-leveys-198 (iPhone) → lokit/todistus-museo-leveys-iphone-198-*; koodi (leveys f7ed065c7) on jo
museo-junassa. Kuvat PT:lle.

## 3. LUKIJAN VALINNAT POIS (jos ehtii; PT: SHA:t NS:lle sitä mukaa)
- Natiivi: natiivi-ui/lukija-valinnat-197 **716614385** (a4be79315 + merge juna): KortinLukija Luennan valikosta Nopeus- ja Ääni-rivit
  pois (kutsujan omat rivit kuten Pulun automaattinen luenta jäävät), Puhe.Saadot nollaa käynnistyksessä persoonien äänet/ohjeet,
  nopeuden ja ElevenLabs-äänen; tooltip "Luennan valikko — kappaleet ja kelaus". Tarkista 0 virhettä. Lukijaaani-ydin (Peli-testit) ennallaan.
  Kehittäjän Tyohuone (Lehti/Tyohuone.cs) säätimet jäivät, mutta niiden tallennus nollautuu käynnistyksessä. → kuvan L1 jälkeen SHA NS:lle.
- Web: haara natiivi-ui-lukija-valinnat **2e0923189** (wt/natiivi-ui-lukija-valinnat), EI PR:ää vielä: js/lukija.js saatoRivit pois,
  index.html + js/main.js puhe-nopeus-liuku pois, js/puhe.js puheenNopeus = NOPEUS_OLETUS ja vanhat avaimet poistetaan latautuessa;
  tests/lukija.test.mjs päivitetty. lukija.test 37/37 + puhe*-testit ok; KOKO `npm test` jäi kesken (tuloste katkesi testiin 413) → aja
  uudelleen, avaa PR (Julkaisija mergee), SHA PT:lle.

## Muuta
- Sisältökirjuri 00.3x: Ranskan i-napin ympyrät main 8d1feff05 (#4743) docs/kohtaukset/museoteokset/kohdat-ranska.json (51 teosta /
  152 ympyrää, luonnos) → vie Resources/Museo/ranska/kohdat.json:iin (MuseoKohdat lukee MuseoMaa.Resurssi("kohdat"), alankomaiden malli)
  VASTA kun PT hyväksyy.
- Kiinan nauha 78a2b34a4 meni NS:lle sellaisenaan (PT); Linssisepän 07e92803e jää käyttämättä. Lasipohja ennallaan (PT: ei muutosta).
- Karttaseppä otti vihjeet-198 21a0e6f6f + lasipohja-198 a4c257a4a (ketju vihjeet-ketju-siirretty-karttasepalle.zsh; käyttää
  _tyo/natiivi-ui/museo-nimi9-197-app:ia "ennen"-kuvaan → ÄLÄ POISTA ennen kuin Karttaseppä kuittaa).
- _tyo/natiivi-ui .app:t: museo-fontti-197 (9863c347d) + museo-nimi9 (Karttasepälle) + museo-juna-197 (3a173a737) → kun
  museo-kortit-197 varmistettu, poista museo-fontti- ja museo-juna-.app.
- Worktreet (proto): museo-nimi-197, museo-ikortti-198, museo-fontti-197, museo-juna-197, lukija-197, pohja-liikepohja (detached,
  vertailuun; poistettavissa). Web: natiivi-ui-tyylikirja-museo (#4742), natiivi-ui-lukija-valinnat.
- Kuvapari EB Garamond: _tyo/natiivi-ui/pari-museo-fontti-197/ (LUE.md), PT tarkisti ja KK hyväksyi.

## Opit
- Kuormitettu Mac (load 20–130): tap-teksti lukee vanhan ui-puun (1,5 s) → skenaarioon `ui puu` + `odota 5` + `nakyy 60 <teksti>` ennen
  napautusta (sk-museo-fontti-197 / -kortit-197 mallina).
- Älä tapa jonossa odottavaa ketjua kesken proto-kaanna.sh:n: jos se on jo saanut lukon, Unity jää orvoksi ja seuraava käännös kaatuu
  "another Unity instance". Tarkista lukko (/tmp/matkakirja-kaannospalvelu-2.lukko/kuka) ennen kill-komentoa.
- Liikepohjan kanssa museon katselupaikan muutos voi nostaa kävelyn kiihtyvyyttä: aja Linssit sekä yhdistelmälle että pohjalle
  (detached worktree) ja vertaa "pehmeä liike" -riviä.
