# Päätoimittajan luovutus 24.10.2026 klo 03.01 (konteksti 30 %; tili vvi@vvi.fi)

Id:t: /Users/Shared/Claude/osoitekirja.md. PT local_5df52e10. Edellinen luovutus -20261024-0135 (lue vain tämä).
ALOITA: lue tuotannonohjauksen osio 0 Periaatteet (git show origin/main:docs/tuotanto/tuotannonohjaus.md) ja oma rivisi
Raamatusta 7.47 (node tools/raamattu-luku.mjs 7.47, sitten luvut 7, 8, 9, 12, 14). OMISTAJA NUKKUU (02.31 "Menen nukkumaan.
Osaatko jatkaa yön yli automaattisesti?") → PT päättää yöllä oletuksella; KK näyttää omistajalle aamulla. Kaikki lokit mainissa
(PR 5193–5196). Asemataulu: Matkakirja-fable/scratchpad/asemataulu/data/talo/{junat,tyolista}.json (.tmp + os.replace + copymode).

## 1. JUNA 210 – TF VASTA OMISTAJAN AAMUHYVÄKSYNNÄN JÄLKEEN ("Odota kaikkea" 01.13)
NS kokoaa lukitusehdokkaan PK:n ja NUI:n kuitattujen SHA:iden jälkeen, LT ajaa yöjunan täyden kierroksen (iPad), lukitus/TF vasta
PT:n luvalla omistajan hyväksynnän jälkeen. Runko viimeksi 77afb4cf5 (vihreä).
- VAAKALATAUSKUVA (omistaja 02.17: "Olisiko piirtää olla keskellä. Ylös vähän lisää tilaa. Kengän kuva isommalla ja se pitää tulla
  ääni efektin kanssa vasta 2sek päästä. Mieti onko kuva hyvä itse ennen kuin laitat minulle uuden version"): PK 86b9301d3 KUVA OK
  (proto-3d/lokit/todistus-juoksu-kansi-kamera-210b-20261024-0249/kuvat/raaka/b2-vaaka.png). PALAUTETTU 03.0x videoiden takia:
  vaakavideon alussa ~0,35 s eri rajaus → hyppy; leima+ääni vaaka ~1,4 s, pysty ~2,4 s → molemmissa 2,0 s. Tarkista uudet mitat.
  Leiman ääni nyt askelääni, Äänittäjältä tilattu oma.
- ALKULENTO (omistaja 02.17: "Drone vaappuu liikaa. Kaarrokset pitää olla Kauniita eikä hätäisiä kuin nyt. Pitää näyttää
  ammattilaisen ohjaamalta. Itse pelissä drone on aivan liian kaukana pelaajasta"): NUI tekee yhden pehmeän kaaren (2.202),
  kulmanopeus mitataan → PT tarkistaa ruuduittain → KK aamulla.
- PELIKAMERA: PK vaaka 90e83d6f4 valmis (6,5 m); PT päätti 03.0x: pystyssä drone lähemmäs kentän mukaan (Puyi yhtä suuri kuin
  vaakassa), vaakakenttä 60° säilyy; ehdot: muurien yllä, ei hyppyä käännössä; kuvaparit pysty|vaaka iPad+iPhone + kapein kuja.

## 2. JUNA 211 / MUUT
- RAKETTI (VS yöajo ~5–6 h, 4 versiota; PNG:t pois jokaisen koonnin jälkeen, pysäytys jos levy < 50 Gi): v1 harmaa avaruus (korjattu
  9d30f06f9), ei omistajalle. Vertaa jokainen Codex r3/r4:ään → KK aamulla.
- JUOKSUPELIN 6 GRAFIIKKAPARANNUSTA (omistaja 02.38 "Kyllä (Suositus)"): VS jonossa, valo ja värit ensin, kuvapari havainnekuva|peli.
- CODEX-TILAUS lähikamerasta (omistaja 02.39 "Pyydä codexilta kuvia lähempää keisaria havainne kuviksi"): postissa 18e5ec45a
  (posti/paatoimittaja-codex-kuvat-juoksupeli-lahikamera-havainnekuvat-20261024.md); tarkista toimitus täysikokoisena → KK.
- KOTIKANSIOT: 7/17 mainissa; muut nollauksessa (Postivahdin NOLLAUS-askel pyydetty 02.0x – varmista, että se on tehty).
- Raamatun selkeytys (PT:n lukulista ~130 kt, luku 7 49 kt) junan 210 jälkeen.

## 3. Opit
- Juurisyy (omistaja 01.36 "miksi näin kävi?"): PT:n lukulistasta puuttui luku 9, ja 9.11 "mittaavat aina kysymättä" luettiin
  välimittausluvaksi. Korjattu 7.47 + 9.11; ohjeiden koe 11/11 (scratchpad/paatoimittaja/ohjeiden-koe/).
- Tarkista videot ruuduittain myös alusta (rajaushyppy) ja mittaa ajoitukset äänestä (silencedetect), älä luota roolin sanaan.
- Todistusajon pysäytyskuva voi olla kesken häivytyksen (3-2-1 näytti haalealta) → katso aina video.
