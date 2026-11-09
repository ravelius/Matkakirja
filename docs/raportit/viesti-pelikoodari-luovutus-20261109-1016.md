# Pelikoodari: luovutus 09.11.2026 klo 10.16

Korvaa kaikki aiemmat. Nollaus kontekstivahdista (pehmeä raja 25 %). Edellinen: `git show 023bf2e99:docs/raportit/viesti-pelikoodari-luovutus-20261109-0922.md`.
Työpuu /Users/Shared/Claude/wt/proto-pelikoodari-juoksu (remote natiivi-backup). NYT haaralla pelikoodari/juoksu-223-kaistale (QA) – vaihda
suunta-haaraan tarvittaessa (`git switch pelikoodari/juoksu-223-suunta`).

## 1. OMISTAJAN PÄÄTÖS 10.03: juoksupelin uusi alku 84521ba9b "Kelpaa (Suositus)", viat korjataan ennen junaa (KK 10.02, PT 10.0x–10.1x)
Haara pelikoodari/juoksu-223-suunta, kärki 06d003a24 (5 committia junan 223 kärjen 4e972eeed päälle), 878/878, unity-tarkistus 0.
- 1) iPhone pystyn kierto (pää ruudun ulkopuolella ~1,1 s, ruudut 1688–1742): f6824ffc2. Juurisyy: kaaressa katseen jousi 0,3 s jätti katseen
  ~15° jälkeen 51 °/s kierrosta, pystykuvan vaakapuolikas ~19°. Korjaus: avauksen kaaressa RajaaKuvaan sivurajalla DroneNosto.AvausKuvaSivuOsuus 0,3
  (vaaka/iPad ei tartu). Loki kameraväli "avauskuvaan N". Testi AvauksenKaariPitaaKeisarinKokonaanPystykuvassa.
- 2) Vaakaohjeen loppu ohjausympyrän alla (vika jo junassa 222; PT: korjaa silti): 06d003a24. JuoksupeliNakyma.RajaaKaistaRenkaidenValiin:
  kun ohjekaista on renkaiden korkeudella ja renkaat näkyvät → laatikon max-leveys renkaiden väli − 12 pt (teksti rivittyy); iPadilla/pystyssä ei muutosta.
  Loki "ohjekaista renkaiden väliin N pt". Sama pohja, ei uutta elementtiä.
- JU-ajot: AT f6824ffc2 iphone → lokit/pk-suunta-iphone-f6824ffc2 (ohjekaista ei koske pystyä); AU 06d003a24 iphone-vaaka + ipad →
  lokit/pk-suunta-{iphone-vaaka,ipad}-06d003a24. sk _tyo/pelikoodari/juoksu-223/sk-suunta-vasemmalle.txt (OhjausPelaajalle-raja 60 s; muokattu
  10.10 AT:n jo alettua – tarkista, että AT kulki loppuun).
- TEE: katso pystyn kierto ruutuarkkina 1650–1780 (skripti: scratchpad arkki.py → tee uudestaan: PIL-arkki joka 6. ruutu, 7 saraketta) – keisari
  kokonaan kuvassa, kierto jouheva; vaa'an e-ohjaus: ohjeteksti renkaiden välissä (2 riviä), ei renkaan alla; iPad ennallaan. Kelpaa → kuvat VAIN
  PT:lle (7.24), PT vie KK:lle; valmis-rivi PT:lle (haara + commit + kuvien polku). PT:n hyväksynnän jälkeen JU poimii junaan 223.
- Ennen-arkki: lokit/pk-suunta-iphone-84521ba9b/juoksu ruudut 1650–1780 (pää rajautuu ~1680–1745).

## 2. Kattokaistale (PT 08.3x; omistajan 10.03 viat ennen junaa) – TUNNISTUS KESKEN
- Paikka: iPhone pysty c-ovi y 0,2826–0,2846 (rivit 741–749 / 2622), x 0,58–1,0; ohut keltainen tiilikaistale taivaalla.
- Todettu: säde osuu vain korttipuuhun "v4 palatsi korttipuut keskipuut -1 2" (yläreuna 10,06 m, osuma 9,6–10,0 m, ~31 m; läpinäkyvä kohta;
  atlaksen yläreunat läpinäkyvät → ei reunavuoto) ja taivaspalloon. Ei muita Renderer-kappaleita, ei lukukelvottomia verkkoja
  (lokit/pk-kaistale2-iphone-e4a5b8af7). → kaistale on GPU-instanssi (Graphics.RenderMeshInstanced: muurikate C3/C2, F/G, C1, osasarja;
  JuoksuSokkeloMaailma.Muurikate.cs PiirraInst) tai muu ilman Rendereriä piirretty.
- Työkalu 764e5c329 (haara pelikoodari/juoksu-223-kaistale; vain QA, EI junaan): mika listaa myös instanssipalat (INSTANSSIT-rivi: sarja,
  malli, ruutu, lähellä/kaukana, etäisyys, palan paikka, venytys). JU:lle pyydetty 10.16: sk-kattokaistale3.txt → lokit/pk-kaistale3-iphone-764e5c329.
- TEE: grep -a -A9 "INSTANSSIT" unity.log luotaimista (0,74–0,95; 0,2834). Osuma ~30–200 m:ssä, venytys/korkeus outo → sijoitus/malli → PT:lle
  "LAV" + tiedot; instanssi piirtyy väärin (esim. ruutu lähellä mutta vastine/muuri piilossa, LOD1-pala väärä) → PK korjaa. Jos ei instanssia
  osumissa: seuraava epäilty Graphics.RenderMesh JuoksuSokkeloMaailma.cs:757 (lisää sama luettelo sinne).
- Rinnakkaiskoe tarvittaessa: sk:hon ennen palatsin latausta `ui juoksupeli palatsi muurikate-c3 0` / `muurikate-c2 0` / `c1 0` (seuraavalla avauksella).

## 3. Muuta
- Työlista: rivi "Juoksupeli: uusi alku, korjaukset ennen junaa" (päivitä tilanne/valmis).
- Vanha jono (luovutus 0922 kohdat 2–3 ja aiemmat) ennallaan.
