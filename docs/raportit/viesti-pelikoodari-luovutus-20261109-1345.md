# Pelikoodari: luovutus 09.11.2026 klo 13.45

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %, 26 %). Edellinen: `git show f4728cae4:docs/raportit/viesti-pelikoodari-luovutus-20261109-1326.md`
(kohdat 2 osa 3 ja 3–4 ovat yhä voimassa, ellei alla toisin). Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup),
nyt haaralla pelikoodari/pulu-lahteet. Kuvat ≤ 1000 px (sips -Z 1000 / PIL-kopio scratchpadiin).

## 1. VALMIIT TÄLLÄ VUOROLLA
- OSA 1 (sauva aina + sykäys) ff0318ba2 iPhone katsottu, kelpaa (sauva kaupungissakin, sykäys näkyy, Pulu poissa → sauva paikallaan). PT:lle 13.3x.
- Raamattu luvut 2 (Pulu, nostot, kamera, 2.217–2.218), 4 ja 6 käyty (4 ja 6 otsikkotasolla).

## 2. TYÖN ALLA: OSA 4 PULUN LÄHTEET (OMISTAJA 12.58 + kortti 13.18, PT:n jako)
- pelikoodari/pulu-lahteet **e51b66a98** = pelikoodari/tappi-kierto **d912e2aea** (= e0f57e42c + tähtäimen häivytys --tk-kesto-sulku, pohjavahti 0) + 1.
  Uusi Assets/Matkakirja/UI/Pulu/PuluChat.Lahteet.cs: Vaihda (Pulun napautus) kartalla → lähteet 1 AukiNosto, 2 KameraTappi.SelvaKeskikohde
  (NostoSisalto.Hae), 3 KaupunkiNakyma.KaupunkiId (kaupunki:<id>), 4 NostoKerros.NykyinenMaa (maa:<ISO3>); ensimmäinen ≥ 2 kysymättömällä
  (paketti tai kortin omat), muuten Generoi (worker, konteksti "Pelaaja katsoo kartalla"). "Lisää kysymyksiä" (ui.pulu.lisaa-kysymyksia,
  .mk-chat__lisaa-nappi): saman lähteen kysymättömät → Kerro lisää → seuraava lähde → generoidut. QA `ui chat lahde`, `ui chat lisaa`.
  FRA-paketissa ei ole kaupunki:/maa:-kohtia (59 kohtaa) → lähteet 3–4 nyt aina workerilta. unity 0.
- JU-ajot pyydetty 13.4x: sk /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/pulu-lahteet/sk-pulu-lahteet.txt →
  lokit/pk-pulu-lahteet-{iphone,ipad}-e51b66a98. TEE: katso p-1…p-5 + lokin "MATKAKIRJA pulu: lähde" -rivit; riskit: p-3 Mont-Saint-Michel ei
  ehkä ole "selvä keskikohde" tuolla zoomilla (0.05), p-1 Tuileries'n kortti `ui nosto kohde:tuileries`. Kelpaa → PT (3 riviä).
- Junaan: tappi-kierto + pulu-lahteet yhdessä NS:n noston-lennon (fb77e12b1) jälkeen; osa 3 (napit-kuulto 620425fb7) erikseen, kysy PT.
- Osa 5 (nostojen kysymystesti) tehty KS:n toimesta mainissa (#6515).

## 3. LONTOO OIKEA KOKO: TOWERIN KYLTTI (PT 13.4x, OMISTAJA 13.25)
- Pallo ok. Towerin kyltti: pelikoodari/lontoo-tower-kyltti **c0d5fda05** (= KS:n karttaseppa/lontoo-oikea-koko 03e9ecb60 + 1):
  OhjelmaKohteet.Kohde.KylttiSivuOikea = 2 (vasen) Isot epätosi; isoissa 1.
- iPhone-ajo katsottu (lokit/pk-lontoo-tower-iphone-c0d5fda05): etelästä kyltti nyt linnan vasemmalla (ennen puuttui), matalasta häipyy
  (MalliKyltit.Vapaa: paikka ei vapaa). PT:lle suositus c0d5fda05. iPad-ajo jonossa (JU ketju DC) → katso tower-etela/-matala, rivi PT:lle.
  Jos PT haluaa matalankin näkyvän: selvitä, minkä rivin Jalka/laatikko osuu (MalliKyltit.cs:218 Vapaa), tai KS:n kanssa.

## 4. JU-AJOT ODOTTAVAT (katso kuvat, PT:lle 3 riviä)
- tappi-kierto e0f57e42c iphone+ipad (CZ) → lokit/pk-tappi-kierto-{iphone,ipad}-e0f57e42c (osa 1 + 2; PT:lle kerrottava: ilman kohdetta kierto
  ruudun keskipisteen ympäri, ks. edellinen luovutus).
- napit-kuulto 620425fb7 x3 (CY) → lokit/pk-napit-kuulto-{iphone,iphone-vaaka,ipad}-620425fb7.
- 1d alkuvarjo: 0 valmis (lokit/pk-1d-alkuvarjo0-5ed43b793), 1 jonossa → vertaa pari (ks. edellinen luovutus kohta 3).
- NS tiedotti 13.4x: natiiviseppa/lento-korkeuskoe 1e55e642a muuttaa PalloKierto.cs:ää (koe, ei junaan); ei ristiriitaa pulu-lahteiden kanssa.
