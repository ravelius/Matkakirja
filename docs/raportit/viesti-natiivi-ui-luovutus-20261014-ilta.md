# Natiivi-UI: luovutus 14.10.2026 klo 15.3x (nollaus, PT:n pyyntö, konteksti 61 %)

Natiivi-UI (Opus, high) → seuraava Natiivi-UI-sessio. Edellinen: viesti-natiivi-ui-luovutus-20261014-iltapaiva.md (säännöt: PT
local_74630a27, viestit send_messagella id:llä osoitekirjasta /Users/Shared/Claude/osoitekirja.md, PT:lle ≤ 3 riviä, ääni aina
mykistetty, nollaus Postivahdin kautta). Ajoskriptit: /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012
(irrota.pl <skripti> <ketjuloki> = irrotettu ajo, säilyy nollauksessa; *-kuvat.sh = asettelutestit; *-simut.sh = todistusajot;
pari-arkki.py / uusi-arkki.py). Arkit: proto-3d/lokit/natiivi-ui-arkit-189. Ketjulokit: proto-3d/lokit/natiivi-ui-*.ketju.
L1/L2-käännökset ja asettelutestit VAIN Julkaisijan KÄÄNNÖS NYT -viestillä, simut SIMU NYT -viestillä (Julkaisija local_22b29f10).

## Kuitattu tässä vuorossa (ei toimia)
- Cupolan latausruutu + läpinäkyvät kuvatekstilaput: rungossa 190 (NS cherry-pick natiivi-ui/cupola-latauskuva-190b b5872327d).
- Kaupungin intro (omistaja 12.59 iPad): natiivi-ui/intro-savy-190 d0a4874c0 KUITATTU → NS. Syyt: aloitusintro ja Pariisin nykyintro
  eivät käyttäneet trailerin taustaa (nyt yhteinen UI/Pulu/TraileriTausta.cs: sumea kartta pysäytyskuvana + kuvan sävy), liu'ut 30 fps
  lepotahdissa → 60 fps (mitattu simuvideosta, skripti scratchpadissa; liike2.py-kaava: ffprobe pts + PIL-erot).
  Haarassa myös c0ad80fc3 (asettelunäkymät "aloitusintro 1–3" + pyynnöstä ajettava koko ipad13-vaaka) ja 3c3344018 (iPhone vaaka:
  Ohita oikeaan alakulmaan, ei iskulauseen päälle) → EI vielä PT:llä/NS:llä, arkki tulossa (ks. avoimet).
- iss-palaute-190 2f9b1297d/a9fbdf4d4 kuitattiin, mutta PT peruutti (Pulu peitti G-VOIMAn iPhonella) → NS revertoi rungosta
  (juna-190 = 5c7a8e295). Korjaus b868f24c9 (a9fbdf4d4:n päällä) → NS palauttaa kumoamalla revertin, kun PT kuittaa.
- iPhone-raketti EI jäädy (pinonäyte: pääsäie RunLoop-odotuksessa, lento perille). Todistusajon PUUTE-rivit vääriä (LT selvitti:
  `laukaise 0 auto` käynnistää itse, sytytys tuli ennen `kaynnista`-askelta; jäätymisvahti hälyttää ≥ 10 s lokitauosta).
- Kuva 4:n rajaus (PT): levossa intron kuva on kokonaan ruudulla kaikilla koilla (asettelutesti "kuva kokonaan ruudulla" iPad 13 vaaka,
  iPhone vaaka/pysty); simun kuva 4 oli otettu kesken liukua. KERRO PT:LLE tämä rivi, jos hän kysyy (ei vielä lähetetty).

## AVOIMET (järjestys)
1. iss-palaute-190 b868f24c9: KÄÄNNÖS L1 käynnissä (isspalaute-kaanna-l1.sh → natiivi-ui-isspalaute-kaanna.ketju). Kun "LUKKO VAPAA":
   ilmoita Julkaisijalle LUKKO VAPAA L1. Sitten SIMU NYT → `perl irrota.pl isspalaute-iphone3.sh <ketju>` (sk-isspalaute.txt ajastettu:
   ruutu 2 alustalla ~T+0:10, ruudut 3–5 nousussa 3–4 s välein, 6 Cupola, video "nousu"). Arkki (kuva-arkki.png + nousu.mp4) PT:lle:
   Pulu ei peitä G-VOIMAa, nousu näkyy. PT kuittaa → SHA b868f24c9 NS:lle.
2. Tekstilaatikot läpinäkyviksi (omistajan päätös 14.2x "Pitkissä pohja": lehti, kortit, sähkeet, paljastus pitävät pohjan, MUU
   läpinäkyväksi). Koodi valmis, tarkista.sh 0: erä 1 natiivi-ui/tekstilaatikot-a-190 7cfc485ff (14cd4edd8 + näkymät "kartan selite",
   "ilmoitusrivi"), erä 2 -b-190 1301088b6 (linssit, ISS, kupla, chat, linssivalikko), erä 3 -c-190 c2b370cbf (pelit). Vertailuhaara
   natiivi-ui/tekstilaatikot-a-nyk a58b7869d (= juna-190 + samat näkymät). Inventaario + ehdotus:
   natiivi-ui-arkit-189/tekstilaatikot-inventaario-20261014.md. AJA: laatikot-kaikki.sh (erät 1, 2-linna, 2-pallo, 3 NYK|UUSI +
   intro-kuvat.sh lopuksi, ~25 min) Julkaisijan KÄÄNNÖS NYT -vuorolla. Julkaisija: jos L1, vaihda laatikot-kuvat.sh rivin 5
   PROTO_LINJA=2 → 1 (ja intro-kuvat.sh vastaavasti). Tulokset proto-3d/lokit/natiivi-ui-laatikot-kuvat/<erä>/{nyk,uusi} → pari-arkki.py
   erä kerrallaan PT:lle (NYKYINEN | UUSI). Tarkista arkista tekstin luettavuus (kerman hehku vaalealla kartalla, tumma varjo muualla).
3. Intron vaaka-asettelu (PT): intro-kuvat.sh (natiivi-ui-intro-kuvat/uusi; ipad13-vaaka + iPhone, "aloitusintro 1–3") → arkki
   PT:lle; sisältää 3c3344018:n Ohita-korjauksen → kuittauksen jälkeen SHA NS:lle (intro-savy-190 kärki).
4. ISS-palaute 7 loppuvalinta: natiivi-ui/iss-loppu-190 db8e7b193 (35e995c61 napit: keskellä ohjaamon yllä, ISS-rivinappipohja,
   iPadilla × 1,5 + PK aa1623d61: `loppu kysy` odottaa puheen loppuun). PT: kuittaa yhdessä PK:n kanssa videolla. TEE: KÄÄNNÖS
   issloppu-kaanna.sh (päivitä kommentin SHA) + SIMU issloppu2-simut.sh (sk-issloppu2.txt: Cupola → jakso v1- → kelaa Rooma → v2-kelaus
   ja v2-perilla jonosta → LUONNOLLINEN "loppukysymys (kelauksen jälkeen)" → Toinen paikka → kohdevalikko; aikaleimat.log +
   video-alku.txt TODISTUS-kansioon) → kansion polku PK:lle (kokoaa äänen) ja PT:lle. Edellinen ajo: todistus-issloppu2-iphone-20261014-1523.
   Loppuvalinnan asettelukuvat: natiivi-ui-arkit-189/iss-loppuvalinta-v3.jpg.

## Opit
- Todistusajon skenaariossa linssikomento on `linssi linssi raketti …` (ensimmäinen "linssi" = todistusajon komento).
- `linssi raketti laukaise 0 auto` lentää itse 20 s:n toiston (lyhyt) n. 10–20 s laukaisusta; ajasta kuvat odota-riveillä, ei oletalla.
- Simu-iPadit (natiivi-ui-iPad11, LT:n iPad 13) ovat todistusajossa aina pystyssä → vaakakuvat asettelutestillä (ipad13-vaaka pyynnöstä).
- simctl-video on muuttuvan ruututaajuuden: mittaa todellisilla aikaleimoilla (ffprobe pts), ei ffmpeg rawvideo -tasaruudulla.
- Asettelutesti: koon vaihdon jälkeen ladattava kuva ei ehdi 3 s:ssa (cupola vaaka musta) → aja ongelmakoko ensimmäisenä.
- Hiljainen tunti: tapa oma puu (scratchpadin tapa-puu.sh -kaava: pgrep -P rekursiivisesti) ja sammuta simu `xcrun simctl --set
  "$MK_SIMSET" shutdown <udid>` (source simusarja.sh). L2-lukko kuolleella pid:llä vapautuu seuraavalla (Julkaisija poisti kerran).
- Worktreet tässä vuorossa: wt/proto-natiivi-ui-{introsavy,issloppu,tekstilaatikot,laatikot-nyk,cupolakuva-b}; vanhat
  {issauto,kohdevalikko,kertomuskuvat,cupolakuva} voi poistaa (SHA:t rungossa).
