# Pelikoodari: luovutus 09.11.2026 klo 13.26

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %, 26 %). Edellinen: `git show 5bff990a7:docs/raportit/viesti-pelikoodari-luovutus-20261109-1233.md`.
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup), nyt haaralla pelikoodari/tappi-kierto.
Huom: commit-viesteissä ja skenaarioissa lukee "13.2x–13.4x", oikea aika oli 13.0x–13.2x.

## 1. VALMIIT
- Huudot 82c26c097 junassa 223 (JU 12.4x, Peli 879/879); työlistan rivi päivitetty.

## 2. TYÖN ALLA: OHJAINSAUVA + NAPIT + PULU (OMISTAJA 12.58, kortit 13.18, tähtäin 13.19; PT:n jako)
Suunnitelma ja omistajan sanat: Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261109-ohjainsauva-napit-pulu.md (LUE).
Sauva = Assets/Matkakirja/UI/KameraTappi.cs (NUI:n 8.11. tiedosto, PT antoi PK:lle) + ohjausnappi.uss.
- OSA 1 (sauva aina + sykäys): pelikoodari/kameratappi-aina ff0318ba2 + 1e88eda16 (82c26c097:n päällä). Kaupunkiportti pois, viimeinen
  Pulun lepopaikka kun Pulu lentää pois (kosketusalue display None → LintuLevossa tyhjä), sykäys 20 s / 1,8 s / 0,22→0,62, ei ajon
  aikana; QA `ui kameratappi sykays`. JU-ajot: lokit/pk-kameratappi-aina-{iphone,ipad}-ff0318ba2 (iphone alkoi 13.2x).
- OSA 2 (kierto keskikohteen ympäri kaikkiin suuntiin + tähtäin): pelikoodari/tappi-kierto e0f57e42c = NS:n natiiviseppa/noston-lento
  fb77e12b1 + osa 1 cherry-pickattuna (f81c33838, 97c53caa4) + osa 2 (PT: tämä haara NS:n päälle, junaan NS:n jälkeen; jos NS:n haaraan
  tulee PalloKierto-commit → rebase ennen kuvia; NS lupasi kertoa). PalloKierto.TappiOhjaa pitää TappiKiertopisteen paikallaan
  Panorointi.Ratkaise-ratkaisijalla; TappiMaaKeskella = Newton RuutuPisteellä. KameraTappi.ValitseKiertopiste: nosto ≤ 12 % keskeltä ja
  seuraava ≥ 1,5× → kohde, muuten maa keskellä. Tähtäin .mk-tahtain. HUOM PT:lle kerrottava: ilman kohdetta kierto on nyt ruudun
  keskipisteen ympäri (ei katselupisteen, joka on linssisiirron takia eri kohdassa) – tähtäin olisi muuten väärässä paikassa.
  JU-ajot pyydetty: sk-tappi-kierto.txt → lokit/pk-tappi-kierto-{iphone,ipad}-e0f57e42c (sisältää osan 1; voi korvata CW-ajot).
- OSA 3 (suoristus läpikuultavaksi, M → läpikuultava kirja): pelikoodari/kameratappi-aina 620425fb7 (Karttaselite.cs "harmaa-kuulto",
  Matkakirjakortti.cs Ikonit.Viiva["kirja"] + harmaa-kuulto, M-kirjain pois). JU-ajot pyydetty: sk-napit-kuulto.txt →
  lokit/pk-napit-kuulto-{iphone,iphone-vaaka,ipad}-620425fb7. Junaan: cherry-pick tappi-kierto-haaraan tai oma; kysy PT.
- OSA 4 (Pulun lähteet + "Lisää kysymyksiä"): EI ALOITETTU. Selvitys Matkakirja-fable/scratchpad/pelikoodari/20261109-osa4-pulun-lahteet-selvitys.md.
  PT 13.2x: tee lähteet 1 (aktiivinen nosto: kuten kortin Kysy, AvaaKortista/AsetaValmisKohta) ja 2 (selvä keskikohde = sama haku kuin
  ValitseKiertopiste → kohde:<id> valmiit), Lisää-nappi (saman kohdan kysymättömät → seuraava lähde → generoidut), lähteet 3–4
  (kaupunki, maa) nykyisellä workerilla (HaeEhdotukset); tee niin, että valmiit kaupunki/maa-kohdat kytkeytyvät myöhemmin ilman
  koodimuutosta (esim. avain kaupunki:<avain> / maa:<ISO3> samassa paketissa). Ei uutta esigenerointia ilman omistajan lupaa.
  PuluChat.cs: Pulu.Napautettu → Vaihda → HaeEhdotukset (:1896), valmiit NaytaValmiinKohdanKysymykset (:657).
- Osa 5 (testi nostoille ilman kysymyksiä) = KS. Kuvat osa kerrallaan → PT (3 riviä).

## 3. TYÖN ALLA: 1d alkulennon varjot kauempaa (5ed43b793, pelikoodari/juoksu-1d)
- JU-ajot jonossa (CL): sk-1d-alkuvarjo-0/-1 → lokit/pk-1d-alkuvarjo{0,1}-5ed43b793. TEE: vertaa parit (1:ssä varjot jo korkealta,
  ei pomppua ohjauksen siirrossa, katso myös värinä: 800 m varjomatka voi lisätä varjojen väreilyä → liittyy 1e:hen). Kelpaa → PT.

## 4. Seuraavaksi
- 1e alkulennon värinä (ei aloitettu): ks. edellinen luovutus kohta 4.
- Työlista: "Juoksupeli: keisari odottaa seinällä pyyhkäisyä" päivitetty 12.4x.

## LISÄYS 13.3x (JU)
- kameratappi-aina iPhone valmis 13.10: lokit/pk-kameratappi-aina-iphone-ff0318ba2 (7/7, PUUTE 0) – KATSO kuvat (k-1…k-7). iPad peruttu: tappi-kierto e0f57e42c iphone+ipad (CZ) kattaa osan 1. Jonossa myös napit-kuulto x3 (CY) ja 1d (CL, etuajolla).
