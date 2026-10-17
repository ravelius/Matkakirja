# Pelikoodarin luovutus 17.10.2026 klo 23.12 (KOVA RAJA 41 %, Postivahti)

Rooli Pelikoodari (Opus, high), checkout /Users/Shared/Claude/Matkakirja-pelikoodari (haara pelikoodari-luovutus-20261014-paiva), proto-git
/Users/Shared/Claude/proto-3d/Matkakirja-proto (haarat pelikoodari/<aihe>, worktreet /Users/Shared/Claude/wt/proto-pelikoodari-*; proto-gitillä
EI ole originia). Edellinen luovutus -20261017-2210 (6eb7e474c).

## Lue ensin
- CLAUDE.md, Raamatun Ydinajatus kohta 2, tämä raportti. Viestit `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md):
  PT local_5df52e10-…, JU local_5cb16c00-… (JU nollautui 23.0x, seuraaja jatkaa jonoa), LR local_996d60ab-…, KK local_dfa7296a-…, Postivahti local_a24c43c0-….
- KATSO JOKAINEN KUVA TÄYSIKOKOISENA ennen lähettämistä. Ei ajoja käynnissä minulla (simut JU:lla).

## 1) KIELLETYN KAUPUNGIN JUOKSUPELI, HARMAA VERSIO (omistaja 22.17/22.18/22.32 PT:n kautta; PT:n ENSIN-työ)
- PELIKIRJA (PT hyväksyi 22.2x, päivitetty kattoreitillä ja ruudukolla): /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/juoksupeli/PELIKIRJA.md.
- Haara pelikoodari/juoksupeli, worktree wt/proto-pelikoodari-juoksupeli, VIIMEISIN **99a83b3d9**:
  ce0a16cdf logiikka → a3a481f99 Unity-näkymä → bb34dd973 kattoreitti → 0b811328a RUUDUKKO (omistaja 22.32: 90° käännös risteyksen
  käännösikkunassa, kaksi samaa pyyhkäisyä = takaisin, muualla väylänvaihto; T-risteys ilman käännöstä = kompastus + kääntyy itse;
  umpimuurit vain parillisen solmun +x/+y-käytävillä → ei umpikujia; käytävät siemenestä paikan mukaan + välimuisti = sama kortteli palatessa;
  kattojaksot 3 käytävää linjalla, portaat/muurin kulma kummastakin päästä, raot 1,8 m hypyllä, huti = putoaa + kintereille; oma käännös
  kintereillä harhauttaa takaa-ajajan 8 s välein; takaa-ajaja seuraa Puyin polkua; kamera kääntyy pehmeästi) → 99a83b3d9 oma varjostin.
- Tiedostot: Peli/Juoksupeli/{JuoksuRata,JuoksuSaanto,JuoksuBotti}.cs (puhdas logiikka), Scripts/Juoksupeli/JuoksupeliMaailma.cs (harmaat
  laatikot, kerros 26, oma kamera) + Resources/JuoksuHarmaa.shader, UI/Pelit/JuoksupeliNakyma.cs (avaus Myllyn mallilla, syöte, HUD
  lentopelin pohjalla, tulos Vahvistus-kortilla, `ui juoksupeli alku [siemen]|pois|tila|botti 0|1|…`), kehittäjärivi Linssivalitsin.Kokeilut
  "Juoksupeli (harmaa)", UiKomennot + UiNakymat.SuljeKaikki. Peli-testit 15/15 (JuoksupeliTestit), tarkista.sh 0.
- SIMU 1 (JU 22.46, a3a481f99 = vanha suora rata): HARMAA RUUTU – "Value cannot be null. Parameter name: shader": URP/Unlit karsiutuu
  puhelinkäännöksestä. Korjattu 99a83b3d9: oma varjostin Resources-kansiossa + avaus palauttaa kaiken, jos luonti kaatuu. EI vielä ajettu.
- SEURAAVAKSI: JU:n seuraaja ajaa juoksupeli **99a83b3d9** + /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-juoksupeli-harmaa.txt
  (iPad vaaka, botti siemen 7: 15 käännöstä/70 s, katolle ~26 s, T-risteys ~36 s + harhautus ~40 s, botti pois ~42 s → kiinni → tuloskortti;
  video ~55 s + kuvat j1-alku, j2-katto, j3-tulos). Katso video ja kuvat täysikokoisina → PT (≤ 3 riviä) → PT vie KK:lle. Jos yhä harmaa:
  konsoli-stdout.log "juoksupeli" ja "VIRHE" (avaus kirjaa syyn LogErrorina).
- bb34dd973:n ajoa EI tarvita (pyysin JU:ta jättämään). Vaihe 3 (omistaja pelaa) alkaa videon jälkeen PT:n kautta.

## 2) GALLERIA ARKKI 4b → LR → PT (omistaja odottaa; EI junaan ennen omistajaa)
- Haara pelikoodari/galleria-200, worktree wt/proto-pelikoodari-galleria, **fa219040b**: omistajan 22.27 terävä pieni varjo kaikille
  karttaesineille (KarttaesineSaanto.VarjoReuna 0,01 ≈ ≤ 1 px; Karttaesineet.VarjoLeveys 1,05, VarjoKorkeus 0,3, VarjoMinPt 12, ei siirtoa;
  peitto 0,5 = sama vakio kuin nappulan sarjavarjolla), B-polun napit piiloon horisonttiusvan takana (KaupunkiPallot, Horisonttiusva.Peitto),
  pelinappula pitää oman kokonsa yhtenäisessä tilassa (Nappula.SarjaPaivita). Kartta-testit 502/502, tarkista.sh 0.
- LR:n kohta 3 vastattu: A-polun 3D-mallit (MSM, Peilisali, Carcassonne, Pont du Gard) ovat pelissä pois omistajan 29.9. päätöksellä
  (Symbolimallit.Paalla = false) → millään zoomilla ne eivät piirry; skenaariossa lisäkuvat n-y3d/e-y3d `komento symbolit paalle`.
- Arkki 4 (61d6b253c) ajettu JU 22.26 (lokit/todistus-galleria-arkki4-200-20261017-2226), LR tarkisti: galleria ok, varjo vanhentunut, Ranskassa 3 kohtaa → 4b.
- SEURAAVAKSI: JU:n seuraaja ajaa 4b (käännös ca3695f0 valmis) sk-galleria-arkki4b.txt → polku LR:lle ja minulle → katso täysikokoisena
  (varjo terävä ja pieni joka taustalla, ei leijuvia nappeja, nappula ei kortin päällä, y3d-kuvissa mallit 3D:nä) → LR yhdistää PT:lle.

## 3) EDITORIESIKATSELUN KOKEILU (PT 22.0x; omistaja "voiko kehitystä nopeuttaa") – JU:n jonossa viimeisenä
- Haara pelikoodari/esikatselu **8cc5c33ea** (fb05a4e3b + Lopeta kutsuu EditorApplication.Exit suoraan kuten BottiOsatAjo, ei delayCall-jumia),
  worktree wt/proto-pelikoodari-esikatselu. Ei vielä ajettu eikä käännetty Unityssä. JU antaa L1-NYT-vuoron galleria 4b:n ja juoksupelin jälkeen.
- Aja: `cd /Users/Shared/Claude/wt/proto-pelikoodari-esikatselu; tyokalut/esikatselu.sh pelikoodari/esikatselu
  /Users/Shared/Claude/proto-3d/tyokalut/pelikoodari-ajot/sk-esikatselu-galleria.txt` taustalle → arvio ≤ 8 riviä KK:lle + kopio PT:lle
  (aika vs. simuketju, kuvien ero simuun; ks. edellinen luovutus -2210 kohta 1). HUOM: puhelinkäännöksen varjostinkarsinta (kuten juoksupelin
  URP/Unlit) EI näy editorissa → yksi esikatselun rajoitus arvioon.

## Valmiit tässä sessiossa
- Pelikirja + harmaa versio (yllä), galleria 4b koodi (yllä), esikatselun Exit-korjaus.

## Worktreet
wt/proto-pelikoodari-juoksupeli (juoksupeli), -galleria (arkki 4b), -esikatselu (kokeilu), -cupola-suoja (junassa 200 → poistettavissa
mergen varmistuttua), -tivoli-vapaa-lento-200 + wt/pelikoodari-vapaa-lento-osio (Tivoli tauolla), wt/pelikoodari-posti.

## Aloitusviesti uudelle Pelikoodarille
"Olet Pelikoodari (Opus, high). Lue CLAUDE.md ja docs/raportit/viesti-pelikoodari-luovutus-20261017-2312.md (haara
pelikoodari-luovutus-20261014-paiva). ENSIN juoksupelin harmaa video (99a83b3d9, JU:n seuraajan simu) täysikokoisena → PT; sitten galleria
arkki 4b (fa219040b, JU:n simu) → LR; sitten editoriesikatselu JU:n NYT-vuorolla → arvio KK:lle + PT:lle."
