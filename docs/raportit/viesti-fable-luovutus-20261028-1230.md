# Päätoimittajan luovutus 28.10.2026 klo 12.30 (tili sami.reivinen@vvi.fi, PT local_8d8ebf72, konteksti 30 %)

Id:t: /Users/Shared/Claude/osoitekirja.md. Edellinen -20261028-0500.
Taulu https://claude.ai/artifact/R6VQFTUNq629zSzah719Uy. Kirjoitukset: muokkaa paikallista
scratchpad/asemataulu/data/talo/*.json (.tmp + os.replace) JA aseta myös tiedoston ylätason `d['ts']`
nykyhetkeen (muuten synkka näyttää VANHA; aamun oppi), sitten pyydä Asemataulua (local_9faa33de-9a2f-4627-972e-4ee40b4fab25)
viemään. Nyt junat v192, tyolista v224.
VIESTIT: mcp__ccd_session_mgmt__send_message täydellä session-id:llä (lyhyt id ei kelpaa). KIELI: omistajalle vain suomeksi.
Omistaja hereillä ja aktiivinen. Mac-uudelleenkäynnistys yhä tulossa tänään → taustaajojen jatkokomennot roolien luovutuksissa
(KS: zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/tasangot-poltto-20261027/jatka.sh; NS: ketju-mvt.sh, pieni-ipad.sh luovutuksessaan).
Lokikirjaukset tänään: PR 5403–5436 (kaikki mergattu). Lokin PR:t: `gh pr merge --squash` (auto-merge ei ole repossa sallittu).

## 1. JUNAT
- TF 212 testaajilla. Juna 213 auki, runko f687a1708 (NS), testit vihreät. Pieni iPad (iPad Pro 11) asennettu 11.56
  (32bbe0d01, omistaja testaa karttaa). Julkaisu vain omistajan pyynnöstä.
- Junaan 213 tullut aamulla (Valmiina-osio taulussa): maailmanperintö pieninä kipinöinä + nimet pienempinä/vaakasuorassa
  (08.38, 10.27), kartan elementit lukittuina karttaan Ranskan näkymästä ulospäin + Louvre kapeampi + merkit oikeilla paikoilla
  (11.51), harmaat kuumailmapallot pois/vain kohdekaupungit (09.18), suurennuslasin nimikytkimet + välilehtivärit
  (10.37; web PR 5420 mergattu), striimikartan lataus 1. ja 2. korjaus (10,5 → ~7,8 s).
- Muistimarginaali ohut (LT: 4483/4856 Mt, 33 muistivaroitusta) → muistiajo lukitusehdokkaalle ennen TF:ää (NS:n luovutuksessa).

## 2. KESKEN (kuka, mitä odottaa)
- KS: Louvren väistö pelaajan napista (11.51) + kohdemaan raja ohuemmaksi (11.52) → pari KK:lle. Sitten porrastus
  merkittävyyden mukaan (12.21, Wikidata sitelinks) ja nimien liukuminen vierityksessä (09.54) peräkkäin (samat tiedostot).
  R2-säästön b) (poltto vie vain muuttuneet palat; tarkista tasankopolton vientivaihe). Valtamerinimien uudelleenpoltto PERUTTU (09.16).
- NS: valmiiksipiirto lennon aikana af4c1866a → mittaus (lento + lähizoom + muisti) KK:lle. Esilataus sama kaikilla verkoilla.
- NUI: kohdekaupunkien nähtävyysnostot striimikartalle (12.28), SK hakee sijainnit Wikidatasta; sovittava KS:n porrastuksen kanssa.
- JU: R2-säästö a) paikallinen ämpäriluettelo (HEAD:t pois offline.mjs, amparitarkistus, tarkista-media, vie-paketti.sh) → PR;
  c) lista r2-kayttamattomat-20261028.md → PT TARKISTAA listan (myös TF 211/212 ja juna 213 käyttämät versiot) ENNEN poistoa;
  poisto vasta PT:n kuittauksella (pysyvä).
- PK: liito: Codexille glide_loop-korjaus (viitta siipinä, ei T-asentoa missään 8 ruudussa; KK:n päätös); enter/exit + vartijan
  väistö pidetään (6556d0e97). Dronekamera pehmeä (~5 cm, 3ff939c35), penkki v01d. Video KK:lle vasta uudella loopilla.
- LR: kujakivet v4d KK:lla OK, odottaa Codexin v5:tä (saumat, pinta). Työ odotusajalle: palatsipinnat-v1 (57e58354f) peliin
  katot → friisit → seinä, pari KK:lle joka vaiheesta. J4 hopea odottaa Codexia.
- VS: aukion valo havainnekuvien tasolle (junan 213 työlista), sävytys yhdessä LR:n parien kanssa.
- SK: Ruotsin maakuntatekstit + nähtävyysnostojen sijainnit NUI:lle.

## 3. OMISTAJAN PÄÄTÖKSET TÄNÄÄN (lokissa sanatarkasti)
07.33 hehku liian iso → 08.10 violetit hylätty → 08.38 kipinät kelpaa; 08.13/08.17 merkit lukittuina karttaan; 08.39 tekstit
pienemmiksi ja vaakasuoraan; 08.59 iso iPad ja simut VAAKA (Raamattu 9.11, PR 5411); 09.03 pieni iPad vasta kun kartta valmis;
09.05 dronekamera pehmeäksi; 09.16 poltettuja nimiä ei suoristeta; 09.17–09.18 nimet pienemmiksi, harmaat pallot pois;
09.29/09.45/10.23/10.37 suurennuslasi ja välilehtivärit; 09.45 KK:n kortit vasta oman RC:n kanssa; 09.5x huohotukset
poistettu (omistaja itse); 09.54 vieritys/lataus; 10.18/10.27 merkkien paikat + sama zoom-katto kaikille; 11.51 kohdemerkkierä
hyväksytty + Louvren väistö; 11.52 kohdemaan raja; 12.21 porrastus; 12.28 Cloudflare-säästöt ja nähtävyysnostot.
Oppi 08.10 (KK): "liian iso" → koko verrataan kartan pienimpiin merkkeihin, puolitus ei riitä. PT:n oppi: LR:n lattialaatat
– PT:n arvio "2× tiheämpi" vei väärään suuntaan; mitattava havainteesta, ei arvioitava.

## 4. KONE
- Levy 35–45 Gi, heiluu swapin mukana (swap ~25 G). proto-3d/lokit 51–52 Gt → yösiivous tai T7.
- Nollaukset tänään: LR 11., VS 6., PK 12.–13., KK 9.–10., NS 5.
