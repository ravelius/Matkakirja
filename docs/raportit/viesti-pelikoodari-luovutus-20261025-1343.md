# Pelikoodarin luovutus 25.10.2026 klo 13.43 (Postivahdin kova raja 36 %)

Edellinen: viesti-pelikoodari-luovutus-20261025-1230.md (ei tarvitse lukea). Proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto,
haarat paikallisia. Esikatselu: `zsh <worktree>/tyokalut/esikatselu.sh <haara|SHA> <skenaario>` taustalle (jonottaa itse; tulos
/Users/Shared/Claude/proto-3d/lokit/esikatselu-<aika>/, kansio näkyy VALMIS-rivillä). Arvio: `awk '/drone alitus 0/{f=1} f' unity.log |
grep -E 'mittari: t (30|40|50) s|PELAAJA PIILOSSA'`; kuvan kamera loki.txt:n `kuva …` + seuraava rivi. Kuvaparit:
scratchpadin koosta.py ei säily → PIL, korkeus 900, 16 px musta väli.

## TEHTY JA KUITATTU

- **Räystäskamera 4b4864d28** (`pelikoodari/raystas-kamera-210`, worktree /Users/Shared/Claude/wt/proto-pelikoodari-raystas-210):
  rebeisattu natiiviseppa/juna-210:n (019758127, LR tausta-v50 + rakennukset-v42) päälle, LR:n omat poiminnat pudotettu. PT kuittasi
  junaan 13.3x; **kärki lähetetty NS:lle 13.4x** (send_message toimitettu). 0/0/0 esikatselu-1330 (skenaario
  proto-3d/_tyo/pelikoodari/raystas-210/skenaariot/sk-raystas-0-0.txt), testit 740/740, unity-tarkistus 0.
  Sisältö: aukiokamera 03, drone ei räystäiden alta, porttien/katosten (t-katos-N) katto pois läpikulun ajaksi ja palaa vasta kun
  näkölinja ei kulje sen ali, AukkoY (häivytetyn portin näkölinja avoin aukon yläosan alareunasta), reunavara 0,3 m.
  Raportti: proto-3d/_tyo/pelikoodari/raystas-210/raportti-20261025-1325.md.
- Siivous: 15 omaa viittaamatonta esikatselukansiota pois (~260 Mt).

## JONO (avoimet, PT 13.4x)

### 1. Aukio 03:n tummat viillot ja kiilat (PT: selvitä lähde, korjaa tai syy PT:lle, sitten aukion kolmikko uudelleen)

Kuva PT:n huomiosta: proto-3d/_tyo/pelikoodari/raystas-210/aukio03-kolmikko-kompromissi.jpg (keski- ja oikea kuva).
- Häivytetty katto ei ole syy: palatsin katot (KestoS 0) sammutetaan kokonaan (r.enabled = false) → ei varjoa.
- Reaaliaikavarjot eivät ole syy: esikatselu-1338 (sk-aukio-kiilat.txt) v1 = varjot päällä, v0 = `ui juoksupeli valo varjot 0` →
  kiilat ja viillot pysyvät (v1-10 vs v0-10). Vertailukuva vain scratchpadissa; tee uudelleen PIL:llä.
- **KÄYNNISSÄ 13.43**: sk-aukio-leivonta.txt (`valo leivonta 0`, kuvat L0-01…12) 4b4864d28:lla. Jos kiilat katoavat → leivottu
  valo (kk-tausta-laattojen 1024² leivonnat, LR:n paketti) sisältää varjoja geometriasta, joka ei ole enää paikallaan
  (esim. Taihemen siirtyi v32:ssa 72 m, katokset irrotettu malleiksi v42) → LR:lle uusi leivonta, syy PT:lle. Jos eivät katoa →
  lattian tekstuuri/geometria (tausta-laatan maa, kaukopuut `ui juoksupeli palatsi kaukopuut 0`).
- Sen jälkeen aukion kolmikko uudelleen (havainne | 810 | kompromissi; havainne = NUI:n 03b-kuvan vasen kolmannes, kuten 1203:n kuva).

### 2. Kujaportin kolmikko LR:n v43-ovilla (ämpärissä)

PT: ovet näyttivät irrallisilta levyiltä (auki ~60°, aukkoa korkeammat, ei kosketusvarjoa) → LR korjasi v43:een. Tarvitaan LR:n
osoitin (kysy LR:ltä/PT:ltä sha) testihaaraan räystäskameran päälle, aja sk-raystas-0-0.txt ja kokoa kolmikko ennen | jälkeen |
sisääntulo kuten kujaportti-kolmikko-ennen-jalkeen.jpg (ennen = esikatselu-1225 kp0-09; jälkeen kp0-16, sisääntulo kp0-14).
Testihaara `pelikoodari/raystas-testi-v42` on vanhentunut (voi poistaa).

### 3. Lautaspöydän pari

`pelikoodari/lautaspoyta-kuvaus-210` rebeisattu räystäskameran päälle: kärki **2a584c9ef**, testit 741/741, unity 0 (worktree
/Users/Shared/Claude/wt/proto-pelikoodari-lautaspoyta-kuvaus). **Ajo jonossa 13.3x alkaen**: sk-lautaspoyta-04g.txt
(proto-3d/_tyo/pelikoodari/lautaspoyta-04/skenaariot/). Pari: kupla #949
/Users/Shared/Claude/wt/fable-posti-0945/posti/codex-fable-muistokupla4-lautaspoyta-20261025/04-lautaspino.jpg | peli (PIL korkeus
1200, kupla vasemmalle, 16 px musta väli) → PT:lle 3 rivillä. PT:n tarkistus: yksi pöytä, tumma puu, kolme matalaa pinoa, kontakti,
sirpaleet oikean kokoisia ilman keltaista reunaa ja puhki palanutta valkoista, kamera 810 / räystään yllä.

### 4. Kuja-40 (odottaa OMISTAJAN leveyspäätöstä; EI NS:lle ennen sitä)

Haara `pelikoodari/kuja40-pk3-210` = räystäskamera + 99b26bec3 (juoksuverkko: muurikuja ei jää rinnakkaislinjaksi 0,5 m:n päähän)
+ 78e2782ef (osoittimet kk-pohja-v1d-pk3 + palatsi-esto-v13; ämpärissä 12.54, tunniste 1e4cdd49ddb0). 0/0 ja juoksu maaliin
esikatselu-1323. LR:n laskelma havainteesta: 02 ≈ 4,5 m (alkuperäinen), 05 ≈ 6,7 m; pk3:ssa 7,7 / 10,7. Uusilla leveyksillä:
LR:n muurilinjat → _tyo/pelikoodari/kk-pohja-v1d-pk3/pohja_pk3.py (vaihda LR- ja ULOS-polut, uusi versio pk4), esto
`PALATSI_SISAAN=… TAUSTA=<tausta-kansio> RAKENNUKSET=<symlinkkikansio ilman u-jingshan-tormays.glb:tä (tyhjä)> ESTO_ULOS=…
bash Peli-testit/kaanna.sh PalatsiEstoLeivonta`, paketti _valmiit/juoksupeli-palatsi-esto-vNN-pohja-pkN-vienti-<pvm> (SHA256SUMS
kuten pk2), PT kuittaa → JU vie. Verkkokorjaus 99b26bec3 kannattaa pitää (poistaa 31 kaksoissolmua muualta palatsista).

## LISÄYS 13.4x (JU)

rakennukset-v43 ämpärissä 13.45 (PT kuittasi), LR:n osoitin **d9fd89ba0** (NS:llä). Kohta 2: tee testihaara räystäskameran
(4b4864d28) päälle ottamalla d9fd89ba0:n osoitinrivi (yhdistämiscommit → `git diff d9fd89ba0^1 d9fd89ba0`), aja sk-raystas-0-0.txt ja kokoa kolmikko.
