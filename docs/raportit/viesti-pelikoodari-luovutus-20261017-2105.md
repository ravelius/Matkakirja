# Pelikoodarin luovutus 17.10.2026 klo 21.05 (KOVA RAJA 36 %, Postivahti)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*, peili
natiivi-backup peili/proto/<haara>). Edellinen luovutus -20261017-1944 (764167961).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU (Julkaisija, käännökset ja simut) local_5cb16c00-…, LR (Linnanrakentaja) local_996d60ab-…, VS local_c238f4af-…,
  NS local_674b9ec4-…, Postivahti local_a24c43c0-….
- Skenaariot /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-*.txt. Kartan kamera: `komento aja lat lon kaari s` (EI `peli pallo aja`).
  Pelin uudelleenkäynnistys kesken: `kaynnista-uudelleen odota-tila Aloitus 40;uusi-peli 5 <kaupunki>;odota-tila Kartta 40`.

## PT:n järjestys (21.0x)
### 1) KARTAN 3D-ELEMENTIT, ARKKI 3 → LR → PT (omistaja 17.10. 19.27 "yhdenmukaisen värisiä ja kokoisia"; EI junaan ennen omistajaa)
- Haara pelikoodari/galleria-200, worktree wt/proto-pelikoodari-galleria, kärki **73e093235** (tarkista.sh 0) → JU:lle lähetetty 21.0x
  (sk-galleria.txt: galleria nyt | yhtenäinen + oikea kartta Ranska r-nyt | r-yhtenainen). ODOTA JU:n polku → katso kuvat → LR.
- Mitä 73e093235 tekee (LR:n arkki 3 -pyyntö, havainnot /Users/Shared/Claude/proto-3d/_valmiit/kartan-pienoismallit-v1/ARKKI-1-HAVAINNOT.md):
  - Kartta/Karttaesineet.cs = yksi paikka: Yhtenainen (→ KarttaSeepia.Aseta, Versio++), Mitta(kerroin) = KarttaesineKoko(pallo) × MalliOsuus ×
    0,85–1,15 (UI-yksikköä), MittaPx = Mitta × UiPx (UiPx = Screen.width / paneelin leveys; KaupunkiPallot ja galleria asettavat), RuutuRajat
    (projisoitu rajauslaatikko px), Korjaa (kokokorjaus kohti MittaPx:ää), AsetaVarjo (ruututason maavarjo: kameraan päin käännetty yksikkölevy
    Symbolimallit.MaaVarjoVerkko; leveys 1,4 × esine ≥ 28 pt, korkeus 0,35 × leveys, peitto 0,5, keskipiste juuren alla MatalaPudotus 0,6).
  - A Symbolimallit (peli + galleria): SarjaKorjaus/Korjaus joka kehys, levy vaihtuu MaaVarjoVerkkoon kytkimellä. C Maamerkit: Lit →
    AjattelijaPaa, rajat + korjaus, varjo georeferenssin lapsena, Versio-muutos rakentaa uudelleen. D Nappula: _Koko = MittaPx + varjo.
    B KaupunkiPallot: PiirraUudelleen kytkimellä, UI-soikio (KaupunkiPalloKuva.SarjaVarjoAlue/SarjaVarjoKuva), Louvren LS-varjo väistyy.
    Pallot pitävät värin (_KarttaSarja 0 AjattelijaPaa-varjostimessa). QA `ui galleria nyt|yhtenainen|pois|tila|kytkin nyt|kytkin yhtenainen`.
  - EI VIELÄ: kipsipäät (E) oikealla kartalla sarjassa (vain galleriassa). Ranskan kameran arvot (46,6 N 2,4 E, kaari 9) arvio – tarkista
    r-kuvista, näkyvätkö Mont-Saint-Michel, Carcassonne, Pont du Gard, Peilisali ja Louvre; säädä `komento aja` tarvittaessa.
- Aiemmat arkit: 1 = 605a9df4b (koko mittasi korkeutta), 2 = bd30b8e0e (PT palautti: B puolet A:sta, A/C-levy mallin alla).

### 2) CUPOLA M1-iPADIEN SUOJAPROFIILI → PT
- Kierros 3 tulkittu: lokit/cupola-kustannus3-ipad-20261017-1928/TULKINTA-pelikoodari.md (viileänä 1,0 → GPU ~70 ms; suojaprofiili 18–22 ms,
  30 fps, thermal 0 koko 5 min). PT hyväksyi → PERUI (KK: tyhjä meri ei todista).
- Kuvapari 2 (JU 20.48): lokit/todistus-cupola-kuvapari2-200-arkki2-20261017-2048/kuva-arkki-teksti-ylla.png – 0,7 näkyvästi pehmeämpi
  maastossa/nimissä (ohjauspöytä UI = sama). Cupolan auringon hehku (Kyytipino) pysyy suojaprofiilissakin.
- Sarja 3 JU:n jonossa: haara pelikoodari/cupola-suoja-200 (worktree wt/proto-pelikoodari-cupola-suoja) **61c84b66a** + sk-cupola-kuvapari3.txt
  (1,0 | 0,8 | 0,7). QA `peli lampo skaala 0,8|auto` (Ruudunpaivitys.KuumaSkaalaTesti). ODOTA JU:n polku → arkki PT:lle yhdellä rivillä.
- Koodi 492b38a91 (samassa haarassa): CupolaKerros asettaa Lampo.Vahintaan = Kuuma, kun Laitetaso.OnkoM1Ipad (iPad13,x M-sarja); Kartta-testit
  500/500. EI NS:lle ennen PT:n valintaa. Jos PT valitsee 0,8: Cupolalle oma skaala (esim. Lampo/Ruudunpaivitys: vähimmäistason skaala 0,8
  Cupolassa, muu kuuma 0,7) + testi → sha PT:lle → NS junaan 200.

## Valmiit tässä sessiossa
- Levy: 3 proto-worktreetä pois (fft-meri, kiina-kertova-kamera, laukaisin; haarat tallessa).
- FFT-meri sävy 2 (741eb6e1a) todettu jo junassa 200 (6aacfbd3c) – PT:lle kerrottu.

## Worktreet
wt/proto-pelikoodari-galleria (arkki 3), wt/proto-pelikoodari-cupola-suoja (Cupola), -tivoli-vapaa-lento-200 + wt/pelikoodari-vapaa-lento-osio
(Tivoli tauolla), wt/pelikoodari-posti.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-2105.md (haara
pelikoodari-luovutus-20261014-paiva). ENSIN JU:n arkki 3 -tulos (73e093235, sk-galleria) → tarkista kuvat → LR; sitten Cupola sarja 3
(61c84b66a) → arkki PT:lle, ja PT:n valitsema arvo koodiin 492b38a91:n päälle."
