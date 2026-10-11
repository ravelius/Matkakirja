# Natiivi-UI: luovutus 11.10.2026 iltapäivä (PT:n nollaus 50 %)

Säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md. Edellinen: viesti-natiivi-ui-luovutus-20261011-aamu3.md.
Simut: iPhone 17 96044270-92AA-4BD3-BE2D-772C8495AB19, iPad F7513985-C8BC-4E97-8D29-9C9BD420E962. Käännös/simu vain Julkaisijan
KÄÄNNÖS NYT / SIMU NYT -viestillä; linja 2 = `PROTO_LINJA=2` (oma lukko /tmp/matkakirja-kaannospalvelu-2.lukko). Ilmoita "lukko vapaa"
ja "simu vapaa". Ajoskriptit edellisen session scratchpadissa (kopioi): /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-natiivi-ui/3505be8a-9403-4a97-87ba-db4be53b2731/scratchpad
(linna-ajo.sh + sk-linnatekstit.txt, kyltit.sh + sk-esittely.txt, pulu-ajo.sh + sk-pulu.txt, pari.py). Raakakuvat: todistus-*/kuvat/raaka/.
Testikomennot: `ui konsoli pois` (Development Console pois kuvista), `ui seikkailutapit tietokerros oikea | jatkokysely | nimi`,
`linssi linssi poikkileikkaus` = Olavinlinnan esittely, `ui livia ensikerta | tuuraus alku|loppu`.

## 1. TEHTÄVÄ SEURAAVALLE: KUUMAILMAPALLOT KARTALLA (omistaja PT:n kautta 11.10. 13.5x; kärki 182, jos ehtii, muuten 183)
Olemassa olevilla pohjilla. Ensin ≤ 5 rivin suunnitelma PT:lle (alla luonnos), sitten toteutus → arkki iPhone + iPad.
a) Pelaajalle (ei kehittäjä) vain valmiit pallot (Kehityskaupungit Pariisi, Tukholma), näkyvät AINA kartalla (ei vain omassa maassa); muut ~35 vain kehittäjälle.
b) Pallolento maksaa 200 p kuten Visan 50:50 (80 p).
c) Kun pelaaja loitontaa koko Euroopan näkyviin: huntu pysyy, pallot näkyvät, kohdekaupungit pisteinä ja maiden rajat kevyesti.
Koodikartta (juna-182, Sonnet-haku 13.5x):
- UI/KaupunkiPallot.cs: Rakenna() l.96–123 (pallo per OpasSovitin.SallitutLista), Ruutu() l.135–206 suodattaa: oma =
  KaupunkiPalloMitat.Nakyy(PallonMaa, NostoKerros.NykyinenMaa, Paavalikko.MaailmaNakyma) l.184 → a): näytä vain
  Kehityskaupunki(id) || Asetukset.Kehittaja (UI/Asetukset.cs:75), Kehityskaupungeille oma = true. Testit Kartta-testit/KaupunkiPallotTestit.cs.
- b) Hinta jaetussa logiikassa: Peli/Kysely.cs:48 PuolitusHinta = 80, veloitus Kysely.Puolita() l.820–835 (P.Raha), leima
  PeliOhjain.Raha.cs RahaSyyt → lisää PalloLentoHinta = 200 + veloitusmetodi + RahaSyyt (KYSY Pelikoodarilta, jaettu logiikka);
  kutsu KaupunkiPallot.Avaa() l.129–133 ennen OpasSovitin.AvaaKaupunkitila (riittämätön raha → kieltäytyminen olemassa olevalla pohjalla).
- c) Loitonnuksen katto PalloKierto.cs:1412 EleKatto (maanKatto, RajatVoimassa) estää pelaajaa näkemästä Eurooppaa → nostettava.
  Huntu Kartta/Varitaso.cs (kaukoKorkeus 15 000 km l.150 poistaa, häivytys l.164–169 alimman tason mukaan, AlinKaytetty 3).
  Pisteet KaupunkiMerkit.cs (PeliSuodatin PeliOhjain.Matkareitit.cs:130–157, Himmeat l.210 = olemassa oleva himmeä pistepohja).
  Rajat Kartta/Rajat.cs (MinTiheys 30 px/aste → piirtyy vasta lähellä; Peitto 0,34, PeittoOhitus kevyempään).
Arvio: a) ja b) mahtuvat 182:een; c) on isompi (katto + huntu + rajat + pisteet) → todennäköisesti 183.

## Tänään kuitattu (Natiivisepälle ilmoitettu)
- natiivi-ui/lahtokohteet-182 **3b2d97f6d**: aloituskaupungit Ateena, Pariisi, Tukholma (varalista + testi; varsinainen lista paketin
  lahtokohde-kentässä, Karttaseppä #4380).
- natiivi-ui/linna-kyltit **bf81fe534** (PT kuittasi ja välitti Natiivisepälle): c703e4deb Olavinlinnan fraktuurakyltit (Goottilainen)
  → LukuLihava (historian/esittelyn vuosikyltit, linnatyylin huone-/paikkaotsikko, nimilaput; koko ja paikka ennallaan, koristeanfangi saa
  jäädä), cf41237e0 kortiston Takaisin flex-shrink 0, d254e1a3d + bf81fe534 testikomennot. Arkit lokit/todistus-linnakyltit-pari-{iphone,ipad}-20261011.jpg.
- PERUTTU: natiivi-ui/linna-tekstit 25f332fe1 (omistaja 12.3x: tekstit vanhoiksi; Natiiviseppä revertoi a5e0a4c7b).
- Museon ☰ ei ollut vika (LS2:n skenaario). LS2 jakaa yli 120 merkin kertojan virkkeet kahtia (PT hyväksyi) → museo-tekstitys 79fbb7a35 odottaa sitä.

## KESKEN (juna 182)
1. **Pulun aloituskaupunki** natiivi-ui/pulu-opastus **a568d9ac2** (PT kuittasi ehdolla → ohjerivit luennan jälkeen; SHA Natiivisepälle 13.5x yhdessä LS1:n aloitusintro-182 56fa83c34:n kanssa) (wt proto-natiivi-ui-pulu, juna-182 9f065a98d päällä):
   valinnan avaus v2 (4 repliikkiä, opastus-v1-äänet), Uusi matka nollaa ensikerran liput (LivianAvaus.NollaaEnsikerta), uusi
   LivianPaljastus: intro (LS1 KaupunkiIntro.Paattyi heijastuksella) → tuuraus-1/-2 → KaupunkiIntro.PuluValmis → luenta + tilarivit
   aloitus-ohje-1 (5 s, 7 s) ja -2 (10 s) → tuuraus-3/-4 (nosto odotetaan kiinni); aloituskaupungissa ei Pulun kommenttia;
   lykkäyksen varakutsu 60 s. Äänet aanet/pulu/tuuraus-v2/livia-tuuraus-n.mp3 (Pelikoodari).
   Todennettu edellinen ohjeajoitus 0936f326 iPhonella, 0 puutetta (todistus-pulu-alku-iphone-20261011-1333).
   JÄLJELLÄ: yksi iPhone-pystykuva PT:lle uudesta ajoituksesta (ohjerivi luennan jälkeen). Käännös
   `natiivi-ui/pulu-opastus+linssiseppa/aloitusintro-182` linjalla 2 käynnistettiin 13.46 (taustalla, loki scratchpad/pulu3-kaannos.log,
   app lokit/natiivi-ui-app-pulu2). Kun valmis: "lukko vapaa" Julkaisijalle → SIMU NYT → `zsh <scratchpad>/pulu-ajo.sh iphone`
   (sk-pulu.txt, kuva p2-ohje1) → kuva PT:lle. Pelikoodarille malli on jo kerrottu.

## AVOIMET (ennallaan)
- Tyrmän kynttilä: kadet-oikealle 60265de6d odottaa Siirtosepän arvoa (wt proto-natiivi-ui-kadet).
- Pääkaupunkilehti 4cb6c437b (rebase juna-182:n päälle), metrolinja c448e8f2e (kippi-käännös), web-pariteetti nostoriville (Pelikoodari).

## Muuta
- Worktreet: kadet, museoteksti, pklehti, pulu (linnateksti poistettu, haarat jäävät).
- Appit levyllä: natiivi-ui-app-linna-ennen/-jalkeen/-jalkeen2/-jalkeen3, -kyltit, -pulu, -pulu2 → poista kun eivät enää tarpeen.
- Linja 2 kaatui kerran IL2CPP-kopioon T7:llä (infra, Natiivisepälle ilmoitettu).
