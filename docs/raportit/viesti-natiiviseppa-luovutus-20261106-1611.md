# Natiivisepän luovutus 6.11.2026 klo 16.11 (konteksti 25 %, 7.37)

Korvaa -1515:n Tilan ja SEURAAVA TYÖ:n. -1515:n Opit ja Huomiot pätevät, samoin -1440:n "Kerrottu, ei NS:n työtä" ja sen luettelemat vanhemmat osat. Sessio Natiiviseppä, kansio Matkakirja-3d-selvittaja.
ENSIN: cron "4 9 * * *" (session-only, Raamattu 7.41), skripti /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py. Remote Controliin ei kosketa.
P = /Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/palikkakoe, V = P/valmis-jalki2, L = /Users/Shared/Claude/proto-3d/lokit. Python numpyllä ja PIL:llä: /opt/homebrew/opt/python@3.14/bin/python3 ilman -I:tä. Työpuu /Users/Shared/Claude/wt/proto-natiiviseppa-palikka, peili natiivi-backup.

## Tila
- JU:lla, tulos tulee viestinä tälle session-id:lle (pyydetty 16.1x; viesti oli JU:n jonossa, tarkista list_events vain, jos mitään ei kuulu):
  1. IPAD 4B 2bfb126b0: V/ajopyynto-ipad-4b.md, vain osa 1, aikaisintaan 16.18, lokit L/natiiviseppa-tarina-ipad4b-2bfb126b0, 3 kuvasarjaa sarjat/-kansioon.
  2. IPAD 3C 190448df6: P/ajopyynto-ipad-3c.md, vähintään 10 min 4b:n jälkeen, tallessa oleva käännös, lokit L/natiiviseppa-palikka-ipad3c-190448df6. Indeksi P/indeksi-r4-1200/indeksi.txt (16 palaa, 42 Mt, 7 korvauspalaa mukana). YKSI ajo, vahti päällä.
- Haara natiiviseppa/palikka-koe 2bfb126b0 (peilissä), työpuu puhdas. Ei korjauksia ennen tuloksia (PT 14.5x).
- Laitteella: v9-talojen palatiedostot (351 Mt) ja palikka-korvaus, tyhjä indeksi 3c:hen asti, palikkasarja-kansiot. JU ei poista kansioita (devicectl). Kerrottu PT:lle ja KK:lle.

## Linjaukset tästä työstä
- KK PT:n kautta 15.3x: muistivahti pysyy päällä, sitä ei kytketä pois. Jos 3c keskeytyy VIKAan, ylitys on tulos: rivi PT:lle, ei uutta rajausta eikä ajoa ilman vahtia; asia menee omistajalle KK:n kortilla.
- PT: hinta koskee vain 16 palaa, ei koko Pariisia, sano se tuloksessa selvästi. "Tämä v9-määrä ei mahdu pienen iPadin rajaan" ei ole todistettu ennen vertailuajoa. Noin 185 Mt:n selittämätön ero jää auki, EI kirjata taloihin.

## Mitattu
Skriptit P/selvitys-muisti-3b/: tulos.md (laskelma; huom. sen comp-päätelmä on vanhentunut, ks. alla), vahti.py, gpu4.py, gpu4b.py, muisti.py, palat.py, ero.py, osajoukko.py.
- IPAD 3B: ei mittauksia. VIKA 15.15.34 (4106 ≥ 4080, huippu 4220, 4 iOS-varoitusta), heti palikat rata r4:n jälkeen. JU:n ensimmäinen raportti (ei yhtään komentoa, kopiovirhe syynä) oli väärä, kuitattu. Kopiovirheiden syy todentamatta.
- 3769 EI ole iPad 3:n koko ajon huippu: kuvalokin muistirivit loppuvat 14.46.37. Vertailu vain muistivahti.log:sta samassa vaiheessa.
- MUISTI samasta vaiheesta (t = s käynnistyksestä): t 20: 3660 iPad 4 (0 palaa) | 3678 iPad 3 | 4039 3b. r4-alun huippu: 3916 | - | 4220. iPad 4:n koko ajon huippu 4014 klo 15.39.25 (varjot 1:n jälkeen, sarjojen välissä; ajoitus, syy päätelty). Pitkät ajot enintään 3961. 0 varoitusta.
- Kuvalokista t 20: gfx +139, keko +36 (3b vs iPad 4); gfx sopii laskelmaan 56 palaa, 139 Mt. comp EI selitä loppua (iPad 4 comp 524 ilman taloja). Noin 185 Mt auki.
- 3c:n arvio: noin 4020–4060 + palikat (iPad 1–3:ssa KB2 ilman VIKAa, mutta muistirivejä ei ole). Tiukka, A0|KA0 tulee ensin, joten se ehtii todennäköisesti ennen palikoita.
- GPU (iPad 4, A0, 0 palaa, thermal 0 kaikilla 64 rivillä): 13 → 29 ms noin 15.44 (porras noin 3 min ajon alusta), sitten hitaasti 37:ään, paikallaan 120 s yhä 34, P-pisteissä 34–36. 10 min:n tauon jälkeen P 11,6 ja ajo 11,6–12,6, sovellus auki. Kolmiot ennallaan, piirtosäie 2 → 10–14 ms, pa 4 → 6. Ei seuraa paikkaa eikä kerry; viittaa laitteen rajoitukseen, EI todistettu. GPU putosi 12:een 5–10 s:ssa, kun piirto harveni (täysi 0), joten tauko ei kerro palautumisaikaa. Ajot 1 ja 3 alkoivat vaiheesta 0.5.
- KUVAERO seisova kamera, r4 vaihe 0.25: paikka-2 ja paikka-v0 keskiero 0,000 (601 ja 523 kehystä), eli ei väreilyä paikallaan, varjot päällä tai pois. r4-s 181 kuvaa: keskiero p50 2,97, kamera liikkeessä.
- iPad 4:ssä 10/45 komentoa hävisi JU:n skriptivirheeseen (kopiot alle 1 s:n välein korvasivat lukemattoman komento.txt:n; korjattu kuittauksella). Jälki 0/4. veto-sivu-s ja veto-eteen-s eivät mittaa vetoa (kamera seisoi, ero 0,000). TÄRINÄN SYY SIIS AUKI.
- palikkakoe.jsonl kertyy laitteelle ajosta toiseen (iPad 4:n tiedostossa 114 riviä, myös iPad 1–3:n jaksot). Lue viimeiset rivit ajon perusteella.
- PT:llä ja KK:lla: kaikki edellä paitsi jsonl-huomio. KK:lle luvattu kuvasarjan pätkä 4b:n jälkeen.

## SEURAAVA TYÖ, järjestyksessä
1. IPAD 4B -TULOS: tarkista "talot: 0 palaa", csv 4/4, vedoissa keskiero > 0. Aja V/jalki2.py: float-askel, nykäys, kierto, HEITTO px kameran omalla matriisilla (Macilla |p| 6 366 210 m, askel 0,5 m). V/sarja.py <kansio> <gif> kaukaisen kohdan paikka; pätkä KK:lle, EI omistajalle. Vertaa: osuuko nykäys kuvassa pelaajan vetoon (KK). Yksi rivi PT:lle ja KK:lle. Jos origo osuu: ehdotus PT:lle, ei omaa toteutusta.
2. IPAD 3C -TULOS: "16 palaa kansiossa", muistivahti.log:n huippu r4-alusta, vertaa 3916 ja 4220. KK:lle A0|KA0, A0|KB2, A0|A1, B2L|B2T kokonaisluvuin, p3-puut täysikokoisena (paikka 1200 m:n alueen ulkopuolella, kuvassa ei nykyisiä taloja; jos kuva ei osunut, sano se). Kerro, missä jaksossa GPU-porras tuli: parit sen jälkeen ovat vain keskenään vertailukelpoisia, ja porras tulee noin 3 min:n kohdalla. VIKA: rivi ja lukuerot PT:lle, ei muuta.
3. C1 ja D2 -1247:n kohdan 6 mukaan, jos PT ei toisin sano.

## Opit
- Älä usko komentojen laskuja tai "ajo katkesi" -syytä ilman konsolia: grep "muistivahti: VIKA" ensin.
- Muistivertailu vain samasta vaiheesta ja muistivahti.log:sta; kuvaloki katkeaa.
- "Heti perään" -komennot vaativat kuittauksen; ajopyynnössä nimeä, mitä on kuitattava.
- Talot latautuvat jo aloituksessa 6 km:stä, joten talot 0 -komento ei tee muistista puhdasta; tyhjä indeksi tekee.
