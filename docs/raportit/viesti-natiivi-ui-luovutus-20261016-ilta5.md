# Natiivi-UI: luovutus 16.10.2026 klo 22.43 (Postivahti: kova raja 38 %, levy 46 Gt)

Natiivi-UI (Opus) → seuraava Natiivi-UI-sessio. Lue tämä; -ilta4 ja vanhemmat on käsitelty. Viestit send_messagella id:llä
(/Users/Shared/Claude/osoitekirja.md); PT:lle ≤ 3 riviä. Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto, remote natiivi-backup.
Ennen käännöstä tyokalut/tarkista.sh (0 virhettä); museon ydinmuutoksissa Linssit-testit/kaanna.sh (nyt 1930/1930).
Ketjut: /Users/Shared/Claude/proto-3d/tyokalut/natiivi-ui-ajot/ketjut-20261016/*.zsh (ei muokata ajon aikana). Levyraja 25 Gt.
_tyo/natiivi-ui/: .app nimi9 + ikortti-198 (+ nimi10 ja vihjeet-198 kääntymässä) → poista nimi7 ja vanhimmat, kun uudet varmistettu (≤ 2 + käytössä).

## OMISTAJAN PÄÄTÖKSET (PT 22.24–22.26)
- 22.24 (pysyvä): "juna 198" = juna 197. Kaikki (i-kortti, lasipohja, pienoismallit, liikepohja) samaan junaan; SHA:t NS:n
  (local_674b9ec4-e2f3-48e9-a810-a129f20a4f03) 197-jonoon omistajan ok:n jälkeen.
- 22.25: museo-nimen pari HYVÄKSYTTY junaan 197 yhdellä muutoksella: kabinettikyltistä "ota kehys pois" (kuva Matkakirja-fable/docs/
  raportit/kaappaukset/omistaja-20261016/museo-kabinettikyltti-kehys-pois-2226.png) → kultainen kehys + sisäreuna pois, jää sumea lasi +
  nimi; SAMA kaikkiin museon lasikortteihin (MuseoTaulu.LasiKortti: huoneKortti, kortti/Impressionismi-kortti, i-kortti, kohtaKortti).
  Tee se + kaksi löydöstä (jo tehty, ks. alla) → SHA SUORAAN NS:n 197-jonoon (hyväksytty) + 1 kuva PT:lle.
- 22.26: "fontti ei näytä taidegalleriaan sopivalle" → museon tekstit (nimi, tekijärivi, salikyltit, i-kortti, ympyrätekstit) EB Garamond
  (Fontit/EBGaramond, OFL, jo pelissä), nimi + tekijä samaa perhettä; jos pienenä liian ohut iPhonella vaalealla seinällä → tyylikirjan
  Luku (Iowan Old Style). Uusi museon kirjainrooli tyylikirjaan (web tyylikirja.json + `node tools/tyylikirja.mjs --natiivi <proto>`).
  Kuvapari iPhone + iPad nykyinen vs uusi → PT; kytkentä vasta omistajan ok:lla.
- JÄRJESTYS: kehys → fontti → vihjeet.

## 1. ENSIN: KEHYS POIS museon lasikorteista (haara natiivi-ui/museo-nimi-197, wt/proto-natiivi-ui-museo-nimi-197)
Kärki f6573d715 sisältää jo löydöskorjaukset: (a) MuseoKierros.KorkeusRajaa: iPad/Mac-vaaka (kuvasuhde ≤ 1,8) leveä teos täyttää 64 %
korkeudesta → nimi seinälle (komerot ja iPhone vaaka ennallaan), (b) MuseoTaulu.AsetteleNimi: nimi sivukortin vasemmalle puolelle.
Lasikortit: MuseoTaulu.cs ~rivi 317 (kortti, huoneKortti: `new Kortti(null, pohja: true)` + LasiKortti); kultakehys tulee KORTTI-pohjan
kehyksestä (Kortti-luokka / Lasipohja.Luokat) → poista museon lasikorttien kehys ja sisäreuna museon omalla luokalla (ei uutta tyyliä:
kysy PT:ltä, jos pohjassa ei ole kehyksetöntä varianttia). Käännös: ketju museo-nimi10-ketju.zsh (f6573d715, ajossa 22.4x: L2 →
Laivamalli iPad L4 vaaka + K2) → tarkista löydöskuvat; tee kehysmuutos, käännä uusi (kopioi ketju nimellä nimi11), 1 kuva PT:lle,
SHA NS:n 197-jonoon. Sitten merge museo-nimi-197 → museo-ikortti-198 (ks. 3) ja Pelikoodarin liikepohja (ks. 4).

## 2. FONTTI (EB Garamond) – kuvapari → PT, kytkentä vasta ok:lla. Kirjasimet.Aseta(..., Kirjasin.Moderni*) MuseoTaulu*.cs:ssä.

## 3. MUSEO-IKORTTI (nyt juna 197) natiivi-ui/museo-ikortti-198 d2b995bc9 (wt/proto-natiivi-ui-museo-ikortti-198)
⊃ nimi-197 f6573d715 (merge) + Sisältökirjurin data fc640b1bf (39 muotokuvaa Resources/Museo/muotokuvat/, taiteilijat.json + ranskan
aliakset, lyhyt_fi 59/64 + 44/51, LAHTEET.md) + kuvatekstit 16d688e5f + ympyräkortin leveyskorjaus (oli yli oikean reunan, Yövartio I2c).
Käännös 5f83f0b8e (= fc640b1bf) kuvattu iPhone 22.36 (lokit/todistus-museo-ikortti-iphone-198-20261016-2229: i-kortti kuvineen ok,
I2c-löydös korjattu kääntämättä). Ketju museo-ikortti-ketju.zsh ajaa vielä leveys/iPad. Tyylikirjan MUOTOKUVARIVI: web #4731 MERGED,
natiivikopio 54d860b08. → Uusi käännös d2b995bc9:stä (+ kehys pois) → kuvapari iPhone + iPad (i auki + ympyrä) PT:lle → KK.

## 4. PELIKOODARI (22.4x): liikepohja pelikoodari/liikepohja-198 42616ed16 ⊃ lasipohja-198 a25eb9122 + ikortti fb82e9f08.
Ponnahdus.Kaari → Liikepohja.LiikeKayra; tyylikirja liuku 1200 → 1800 ms (web #4735); MuseoKierros.PaivitaLaaja = Liikepohja.Jousi.
UUSI tarkistus tyokalut/liikevahti.py: omat Lerp/SmoothStep eivät saa lisääntyä (ei-liike: `// liikepoikkeus: syy`).
YHDISTÄ seuraavat museo-muutokset tämän päälle (nimi-197/ikortti → merge liikepohja-198:aan tai päinvastoin, testit + tarkista).

## 5. VIHJEET (omistajan bugi 22.18; PT: video ennen/jälkeen → PT ≤ 3 riviä; kytkentä vasta ok:lla)
Haara natiivi-ui/vihjeet-198 21a0e6f6f (wt/proto-natiivi-ui-vihjeet-198, pohja natiiviseppa/juna-198 4b6ef2395 → nyt juna 197):
Ruutu KameranJalkeen (ei laahausta), karttapiirros ei siirtele (MaxSiirtoKartta 0: paikallaan tai piilossa), koko 40 × 20 pt²
× lähennys (koko/korkeus)^0,3 ≤ 1,45, maavarjo Valosepän arvoilla (VihjeVarjo: gaussinen ellipsi 1,4 × leveys, 0,28, siirtymä 4 % /
1,5 % vasemmalle, sumennus 12 %, peitto 0,35, Tyylikirja.Erikois.KohdekarttaMuste). Valoseppä siirtää vakiot ValoProfiileihin ja
haluaa kuvaparin. Ketju vihjeet-ketju.zsh (21a0e6f6f) odottaa museoketjuja: kääntää → iPad "ennen" (nimi9) ja "jälkeen" samalla
skenaariolla sk-vihjeet-heilunta-198.txt (loitonnus koko palloon, vedot, nipistys sisään/ulos; video vihjeet.mp4) → lokit/
todistus-vihjeet-heilunta-{ennen,jalkeen}-ipad-198-*. Vertaa, tee video/kuvapari PT:lle ja Valosepälle.

## 6. KIINAN DYNASTIAT: kytkentä tehty natiivi-ui/kiina-nauha-198 78a2b34a4 (Linssisepän 548a4dabe:n päällä). Linssiseppä
(local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4) kääntää ja kuvaa itse; odota kuvat. Esittelyteksti nyt Tiedot.Lyhyt (pidempi = SK/PT).

## Muuta
- Sisältökirjurin #4733 kuvatekstit: alankomaat 3 korjattu (679e1e361 / 16d688e5f); ranskan teoksissa ei kuvateksti/kertoja-kenttiä.
- Museo-nimi-197-kuvapari lähetetty ja hyväksytty (proto-3d/_tyo/natiivi-ui/pari-museo-nimi-197/, LUE.md).
- Opit: aja Linssit-testit pohjasta (`git worktree add --detach`) ennen kuin päättelet, mitkä FAILit ovat omia; iPhone vaaka = matala
  asettelu (nimi aina ylhäällä), älä muuta sen kuvakulmaa; ketjujen pgrep-odotus kattaa vain ajo-skriptit (rako ajojen välissä pieni).
