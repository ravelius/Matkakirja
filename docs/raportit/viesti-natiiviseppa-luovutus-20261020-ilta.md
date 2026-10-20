# Natiivisepän luovutus 20.10.2026 klo 17.1x (juna 208 auki, runko cd1391001 isossa iPadissa)

Vain voimassa oleva tila (omistaja 15.11, Raamattu 7.22). Historia: juna208/jono-208.txt ja aiemmat luovutukset git-historiassa.
Pysyvät säännöt: proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt. Id:t AINA osoitekirjasta.

## TILA
- **BUILD 207 = proto master 7ffa2ed9a** (TF:ssä). 207:stä ei NS:n töitä.
- **JUNA 208 auki**: runko natiiviseppa/juna-208 (wt/proto-natiiviseppa-ehdokas) = **cd1391001**, peilissä (natiivi-backup peili/proto/natiiviseppa/juna-208).
  VIHREÄ 2177/677/517, tarkista 0, laite error CS 0. Sisältää mm. palatsi + lämmitys f6e92d277 (LT hyväksyi), AI Navigation 2.0.16, VS Editor 2.0.28,
  Cesium 1.26.0 (simu OK), VS Louvre-valot (af60d60f8, fbeae02dc, 100042f7c), NUI museo (7c10e9f71, 9aabbb409, d89496ea8), VS varjot 140 m c8c12fef4,
  PK ilmestymiset v5 7fef1e3df, Lavastaja katsojat c10fa7e37, LS askeleet e3e6e95f0.
- **Asennettu iPad Pro 13:een 16.33** (laiteappi lokit/natiiviseppa-app-208-runko-cd1391001-laite, kotinäytön nimi "MK kehitys").
- **208 lukitaan VAIN PT:n viestillä "OMISTAJA PYYSI JULKAISUA"** (omistaja 09.47). build208-viesti.txt: TÄYTÄ LUKITSE; muutosloki-208.txt puuttuu (PT:n teksti, ≤ 280 mrk).
- **GPU-selvitys käynnissä (veto PK:lla, PT 16.38)**: iPad Pro 13 juoksun sokkelo 21–23 ms (raja 14). LT mittaa mittauskäännöksellä a53817ef2
  (= PK f861b6fd3 gpu-208-yhdessa + VS jälkikäsittelyn QA-valinnat; EI runkoon). Korjaus tulee PT:n OK-rivillä erinä runkoon.
- Ei avoimia eriä, ei irrotettuja ajoja.

## TYÖNKULKU (voimassa)
- Erä runkoon vain PT:n OMALLA OK-rivillä (toisen roolin välittämä "PT OK" → kysy PT:ltä). merge-tree ensin; älä yhdistä testien aikana:
  pysäytä ketju/testit (pkill juna208/ketju208.sh, testit208*; dotnet cwd ehdokas), yhdistä --no-ff, push peiliin, käynnistä uudelleen.
- Vihreä runko: `MAX=0 zsh juna208/kokoa208.sh` (testit → ketju208 → laite208 → asenna208-kaikki) TAI erikseen
  `ketju208.sh <sha>` (testit → laite208, L1-lukko) → `asenna208-kaikki.sh <sha>`.
- **Asennus VAIN iPad Pro 13** (omistaja 13.57; iPhone/iPad Pro 11 vain omistajan pyynnöstä: LAITTEET="<udid>"). Langaton (localNetwork).
  Peli auki → ei asenneta, KK:lta kuittaus; PAKOTA=1 vain KK:n/PT:n luvalla (esim. omistaja poissa). Tulos rivinä KK:lle (+ PT).
- Jokaisesta laitekäännöksestä JU:lle "KÄÄNNETTY <sha>" (L1 vapaa). Mittauskäännökset muille: `laite208.sh <sha> <nimi>` → polku pyytäjälle/LT:lle.
- LT:n iPad-mittaukset vain KK:n luvalla, ei omistajan pelatessa.
- Simu vain uudelle tekniikalle (esim. native-kirjaston vaihto) JU:n SIMU NYT:llä, oma natiiviseppa-iPad13 D61642C8; todistusajo.sh (ks. juna208/sk-cesium-126.txt).

## SKRIPTIT juna208/
testit208(-odota), ketju208, laite208, asenna208 (U, PAKOTA, YRITYKSET, VALI), asenna208-kaikki (LAITTEET), kokoa208 (MAX), nui-ja-kokoa208,
yhdista, lukitse208-a/-b/-ajo, mac208, muisti208. laite-sha.sh asettaa kehityskäännöksen nimeksi "MK kehitys" (PlistBuddy ennen xcodebuildia).

## OPITUT 20.10.
- Laitekäännös ei kirjoita käännöspalvelun lokiin → JU/PT eivät näe sitä ilman KÄÄNNETTY-riviä.
- iPhone lukittuna: "The device is currently locked" → omistaja avaa; asenna208 YRITYKSET=30 VALI=20 odottaa.
- Simulla ei tule "kaupunki: vapaa muisti" -riviä (muisti ei tiedossa) → muistipiikki vain laitteella.
