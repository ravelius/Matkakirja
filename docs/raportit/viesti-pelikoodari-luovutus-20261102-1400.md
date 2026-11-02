# Pelikoodari: luovutus 2.11.2026 klo 14.00 – juna 218

Edellinen: -20261102-1330 (PR 5985, lisäys a3dda9869). Syy: konteksti pehmeällä rajalla (26 %) ja KK:n 13.38-tehtävät (omistaja) alkavat.
Proto-worktree /Users/Shared/Claude/wt/proto-pelikoodari-tausta-v99, haara pelikoodari/kapea-reitti-218 (commitit paikallisia, protolla ei originia).

## 1. ENSIN: OMISTAJAN PÄÄTÖS 13.38 (KK ohjaa suoraan, PT ei; työlistalla)
Sanatarkasti KK:n viestissä: latauskuva liian kapea iPadilla (mustat reunat), alusta puuttuu dronelento keisarin luo, keisari kääntyy
itsestään ympäri ("Tarkista, ettei pelissä ole mitään automaattisia käännöksiä missään kohtaan"). Kuvat
docs/raportit/kaappaukset/omistaja-20261102/1338-*.png, runko MK kehitys 52ba93dea. KK:n järjestys:
1) EI AUTOMAATTISIA KÄÄNNÖKSIÄ: ensin lista käännöskohdista KK:lle (alla, LÄHETÄ KK:lle ensimmäisenä), sitten toteutus: seinä/umpikuja
   ilman ohjausta → keisari pysähtyy eteen ja odottaa pelaajan suuntaa. Jos huono/mahdoton → kerro KK:lle ennen toteutusta.
2) DRONELENTO TAKAISIN joka aloitukseen (omistajan hyväksymä 29.10. 07.57 "liike sopiva"); selvitä miksi puuttuu rungosta 52ba93dea.
3) LATAUSKUVA täyttää ruudun iPad pysty/vaaka + iPhone, otsikko ja poika aina kokonaan; Codexilta leveämpi versio, skaalaus täyttöön.
Todistus: tallenne taso 1:n alusta (dronelento → lähtö → 60 s ohjaamatonta ja ohjattua juoksua) + latauskuva pienen iPadin kokoisena
pysty ja vaaka → KK:lle ja PT:lle. Sen jälkeen eunukkikorjaus, eunukkimäärät (12.13), Yangxindian ja 储秀宫.

### KK HYVÄKSYI 13.4x (omistajan 13.38-päätöksen sisällä; lista lähetetty KK:lle 13.45) – sellaisenaan:
1) Autopilotti oletuksena pois, botti vain QA:ssa. 2–4) Umpikuja, muuri edessä ja yli 30°:n kulmat: ei käännöstä eikä kompastusta, keisari
pysähtyy seinän eteen ja odottaa pelaajan suuntaa. Eunukit jatkavat kohti, joten kiinniotto voi tulla luonnostaan. 5) Avauksessa kamera saa
lentää elokuvana, mutta keisari ei käänny itsestään: hän juoksee ovesta suoraan, ja ohjaus alkaa lähtölaskennan jälkeen ensimmäisellä suoralla
(27.10. 08.26). Jos avausreitillä on käännös ennen ohjausta, siirrä ohjauksen alku sitä ennen. 6) Vilkaisut saavat jäädä, kunhan niissä
kääntyvät vain pää ja hartiat, jolloin ne eivät näytä käännökseltä.
DRONELENTO: 2.177:n "tasolla 1 EI alkulentoa" oli tulkinta 27.10. 08.26:n ovialusta. Omistajan sanat koskivat vain liian pitkää kameraa.
13.38 → dronelento keisarin luo palaa tasolle 1 ja kaikkiin aloituksiin: lento → ovi ja huuto → nopea kierto keisarin taakse → 3-2-1. Pidä
lento ripeänä. PT päivittää 2.177:n.

### Löydökset (Sonnet-agentin kartoitus 13.4x, proto kapea-reitti-218; P = Assets/Matkakirja/Peli/Juoksupeli, S = Scripts/Juoksupeli, U = UI/Pelit)
- **PÄÄSYY TODENNÄKÖISESTI: U/JuoksupeliNakyma.cs:437 `Autopilotti = true` oletuksena** → rivillä 1118 `if (Botti || Autopilotti && !pelaajaOhjaa)
  saanto.BottiAskel()`: botti ohjaa (risteyskäännökset, väistöt, hypyt), kunnes LueSyote (1252) näkee ensimmäisen kosketuksen/näppäimen.
  Botti kääntää käännösikkunassa s.Vaihda(BottiKaanto) (P/JuoksuV4.cs:2419–2424; BottiKaanto 967, 973 BottiValinta 733–746, 1023–1030).
- **Avaus**: U/JuoksupeliNakyma.cs:1099–1104 avauksen ajan BottiAskel, syötettä ei lueta ennen OhjausPelaajalle; käännökset tekee botti.
- **Dronelento puuttuu tasolla 1 TARKOITUKSELLA**: P/JuoksuAvaus.cs `AlkuT => Portilta ? PuyiLahteeT − OviOdotusS : 0` – kommentti
  "RAAMATTU 2.177 ALKU JA OPETUS (SITOVA, omistaja 27.10. 08.26–08.29): tasolla 1 EI alkulentoa". Uusi päätös 13.38 kumoaa tämän →
  kerro KK:lle ristiriita (Raamattu 2.177 päivitettävä PT:llä) ja palauta lento tasolle 1 (lento kujaan portin eteen, sitten ovikohtaus?).
- **Umpikuja = 180° itsestään**: P/JuoksuV4.cs:2194–2221 SokkeloRisteys (kutsu 2022–2031): ei suoraan eikä sivuja → valinta 2
  "kaanto ympari" (2201–2207); suoraan muuri ja sivu auki → kääntyy itsestään (2208–2215, oikea ensin) + Kompastus. TÄMÄ on uuden
  odotustilan paikka: S jää osan loppuun, Reitti.Jatka vasta kun Kaanto annettu ja suunta auki (nyt S += Nopeus*dt 1970, odotustilaa ei ole;
  myös Vauhti, takaa-ajaja AjajaEtaisyys 1996). Yangxindian on merkitty umpikujasali (UmpikujaSalit, P/JuoksuPalatsiVerkko.cs:898) → siellä 180°.
- KaannosSolmu P/JuoksuV4.cs:2223–2229 (vanhan graafireitin kulmat > 30°, kompastus "kaanto itsestaan"); KaantoMuistiS 1 s (2035–2045:
  pelaajan oma viivästetty pyyntö); suppilo/kaistanvaihto 2053–2058 (sivusiirto); profiilireitit Vaylia 1 (2060, VapaaKaanto 870).
- Ei suunnanmuutoksia: kiinniotto KiinniKaanto = false (S/JuoksuV4Maailma.cs:2726); vilkaisut (S 1136–1160, P/JuoksuNojaus.cs:72–75:
  taakse 65° 8–15 s, sivulle 25° 5–10 s, vain pää ja ylävartalo – voivat näyttää kääntymiseltä); PuyiKatsooTaakse 70° avauksessa.
- yaw seuraa reitin kaarta S/JuoksuV4Maailma.cs:979–980 → pysähtymisanimaatio lisättävä erikseen.
- Tason 1 avausreitillä on käännös etelään HuoneS = 9,5 m (P/JuoksuAvaus.cs, JuoksuTaso.cs:35, AlkuSuunta Lansi) ennen ohjausta →
  KK:n kohta 5: ohjauksen alku ennen sitä tai reitti ilman käännöstä.

## 2. Kamerasuoja (PT:n jono 1) – VALMIS, ajo käynnissä/tehtävä
- **53c8cdfa9** (kapea-reitti-218): DroneNosto.KameraSuoja + kytkentä JuoksuV4Maailma (hyppysuojan jälkeen, myös avaus ja maali): massassa
  oleva kamera vedetään näkölinjaa pitkin rintaa kohti vapaaseen kohtaan (0,1 m askel, vara 0,2 m, max 40 m, min 0,8 m rinnasta), ulos jousella
  0,35 s. Testit KameraSuojaVetaaMassastaUlos, KameraSuojaPurkautuuPehmeasti; 795/795, unity-tarkistus 0 virhettä. Loki "kamerasuoja veto".
- Diagnoosi (video sali-218/20261102-131246-sali.mp4): 36 s = alkulennon maailmaosuus 1,3 m:n korkeudella 77 m keisarista (QA-alku ei ole
  avauksen suunniteltu alku → lento seinien läpi); 41–42 s = avauksen kaarto keisarin ympäri esipihalla (massassa 1); 47 s = pelikamera
  72°:n kulmalla salin pohjoispään räystääseen (kamera rakennusmassassa s 107). Mittari ei laskenut avausta (AvausT ≥ 0 ohitetaan).
- Ajorunko **pelikoodari/kamera-218 = 4fdc3e59c** (sali-218 + kamerasuoja). Ajo: /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kamera-218/
  aja-kamera.zsh (sk-kamera.txt = sk-sali.txt, linja 1). Tehtiin taustaketjussa 218q:n perään (alkoi 13.39); jos sessio nollattiin kesken,
  aja uudelleen JU:n vuorolla. Pari PT:lle: sama kohta ennen (sali-218 video 36, 41–42, 47 s) vs jälkeen, tarkista "kamerasuoja veto" -rivit.

## 3. Bugi 2 jälkeen (218q) – AJETTU 13.59–14.19, PARI PT:LLE 14.2x: EI KORJAANTUNUT
- Pari korjaus-218/218p-vs-218q-104-105.5.png: ruudut identtiset (ajo deterministinen). lahipuut-v13 latautui (unity.log), mutta
  "lahikoriste dougong-intercolumn(Clone)" piirtyy yhä: 117 riviä piirtäjälistassa molemmissa (218q: lokit/esikatselu-20261102-135937/
  piirtajat.txt), kohta z −382,6, y 9,6. Ristikko on LÄHIKORISTE, ei lähipuu → v13 ei koske sitä; PT päättää (LAV/PK lähikoristeen sijoitus).
- Kameratallenne PIDÄTETTY: kamera-218/SEIS-tiedosto (aja-kamera.zsh lopettaa heti); poista SEIS ja aja JU:n vuorolla.
(Alkuperäinen ohje alla.)
- Ajo PROTO_LINJA=1 zsh korjaus-218/aja-218q.zsh alkoi 13.39 (ensimmäinen yritys 13.32 pysähtyi levyrajaan 29 Gi). Tulos korjaus-218/
  aja-218q.ulos + *-218q.mp4. Pari PT:lle: 218p (20261102-125154-218p.mp4) vs 218q kohta 104–105,5 s (ffmpeg -ss), dougong-ristikko ei näy;
  "ESIKATSELU VAPAA" JU:lle. Jos ajo katkesi, aja uudelleen.

## 4. Jono KK:n tehtävien jälkeen
- 储秀宫 (c-chuxiugong): JU vei 13.52 **kielletty-rakennukset-v100/** (6e2192d48ce4; pystyviirut poissa, KÄYTÄ TÄTÄ v99:n sijaan) +
  kielletty-tausta-v101/ (29abaa4c7a51). LAV: reitti S-N
  12 pistettä rakennukset.json:n c-chuxiugong-merkinnässä (päät (−128,974; 417,91) / (−129,613; 439,89), leveys 1,4, lattia_y 1,2), uudet
  materiaalit V4_kujakivi_sokkeli(_yla), V4_ikkunakehys, V4_konsoli, V4_ristikko → tarkista sidonta; kytke kuten Yangxindian (7347c1f28,
  be73a2795: TaustaKansio/RakennusKansio JuoksuV4Maailma.cs ja JuoksuSokkeloMaailma.Palatsi.cs; sali UmpikujaSalit?). EstoTiedosto
  **palatsi-esto-v26/esto.bin** (JU vei 13.54, 25b4bee0ad01; 12 ruutua pois 储秀宫:n kohdalta). Kaikki kolme mediassa.
- 翊坤宫 (PT 13.5x, 储秀宫:n jälkeen): LAV:n rakennukset-v101 + tausta-v102 + esto-v27 (sisältää myös 储秀宫:n; JU vie) → kytke reitti ja
  sali kuten edelliset; salitallenne molemmista (储秀宫 ja 翊坤宫) PT:lle. Jos v101/v102/v27 ehtivät ensin, kytke suoraan ne.
  LAV 13.5x: y-yikungong, kansiot "kielletty-rakennukset-v101/", "kielletty-tausta-v102/" (taustan halli pois), "palatsi-esto-v27/"; reitti S-N
  (leveys 1,4, lattia_y 0,54): työhuoneen eteläliitoksen kulma → etupiha → pääovi → valtaistuimen länsipuolelta → sermin takaa → takaovi →
  työhuoneen pohjoisliitoksen kulma (pisteet rakennukset.json:n y-yikungong-merkinnässä). Ei uusia materiaaleja.
  JU 14.15 VIETY: rakennukset-v101 (8baeb9015b45), **tausta-v102** (d728125f84e1), **palatsi-esto-v27** (61212366d095); korvaavat v100/v101/v26.
  LAV 14.1x: **kielletty-rakennukset-v102/** korvaa v101:n (储秀宫 c-v4: länsiseinä; reitit ja törmäys ennallaan); JU vie → kytke v102.
- Taso1ReittiPortiltaAukiolle03-testin siivous (PT:n jono 3; f4d65d024 ohittaa jo puuttuvan juuren).
- Salitallenteen PT-kuittaus → NS (runkoon kapea-reitti-218 = 53c8cdfa9 tai uudempi).

## Huomiot
- Levy: aja-sk.zsh vaatii ≥ 30 Gi; PT siirtää vanhoja esikatseluja NAS:iin.
- Scratchpad (vanha 31f7cd7e…/scratchpad/kam): ennen-koonnit ennen.jpg ja s1.jpg (32–49 s, 1 fps).
