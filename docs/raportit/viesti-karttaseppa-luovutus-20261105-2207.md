# Karttaseppä: luovutus 5.11.2026 klo 22.07 (KS)
Syy: pehmeä raja 25 % (7.37), luonteva tauko, koska KK:n vastaus odottaa. **Voittaa -2142:n.** W = /Users/Shared/Claude/wt/proto-karttaseppa-nd-kaanto-219, haara karttaseppa/nahtavyydet-219, etäpää natiivi-backup, kärki 93d41db55. Python `/opt/homebrew/bin/python3` ilman -I. Testit: `/bin/bash <W>/Kartta-testit/kaanna.sh PariisiKallistus` (zsh ei toimi), 13/13.

## ENSIN
1. Vahti Monitorilla: `/bin/zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/postilaatikko-vahti.sh`. Postilaatikon kuittaus 9aac32311 on oma.
2. Odota KK:n vastausta viestiin ajosta. KK:lta kysytty: Invalidit hyväksytään?, Riemukaaren muut alustat Codexille?, Eiffelin kiveys kuvan perusteella.

## AJO 22.00 (lokit/esikatselu-20261105-220020, L2, 269 s, 5 kuvaa, fbb5ba2e3)
- **Invalidit:** kunniapihan lattia yhtenäinen ylhäältä ja 45°:sta pohjoisesta. Katot harmaat, kupoli kirkas kulta, Savy oletus. **Etelästä ei ole kuvaa.** Id `invalides`, kokeena haarassa, ei junassa.
- **Malli:** Tripon lopputoimitus bea480912 on tavulleen sama kuin asennettu (55c1dbc6…). Kevyt versio hylätty (Tripokin: UV-rikkoja). PT:n koekytkentä on siis tehty.
- **Lattia:** `_tyo/karttaseppa/sarja24-asennus/invalidit-lattia.py`, X −42…40, Z −153…−55, Y 4,05. Tripon ehdotus Y 2,20 ei käytössä: upottaisi pihan noin 2 m. Ulkoreunalla nauha on lattian yläpuolella (Y ≥ 4,08, metrin ruudukko). Asennus `asenna-invalidit.py`, paikka `invalidit-paikka.py` (X 816,3, Y 823, Suunta 4,1). J-siiven kulma noin 17 m kiveyksen itäreunan yli.
- **Horisontti:** 45° kelpaa minusta; 75° ja 85° jäivät pois kuvarajan takia, omistaja ei ole nähnyt.
- **Eiffel:** kiveys ulottuu rantaan pohjoiskulmassa, ei näytä menevän veden päälle. Rannassa on rosoinen kohta ja veden päällä ruskea laikku, jonka alkuperää en selvittänyt (rajaus: aja kuva uudelleen tai katso eiffel-ylhaalta.png, noin 880,530 / 2000 px).
- **Riemukaari 24p:** aukio liittyy katuihin. Katto ylhäältä tasainen ja vaalea, reunoilla rosoa. KK päättää.
- **Valoseppä:** pyramidit eivät mustia; ND:tä ja puita ei nähty tässä ajossa, kerrottu VS:lle.

## SÄVY: yhä auki
`globaalit`-loki (unity.log rivi 3407) tumman kohdan (GP 75°, suunta 270) kohdalta: `_keilaHamaryys`, `_pallonTummuus`, `_radioHamara`, `_aurinko`, `_keilaRajat`, `_paljastus`, `_pohjaSavy` kaikki 0, `_overlayAlfa_0/1` 1, `_overlayAlfa_2` 0,002, `_lentoVaraTaso` 2,5.
**Toinen näyte (85°, vaalea) jäi saamatta:** ajo päättyi ennen komennon käsittelyä. Skenaarioon lisätty loppuun `odota 5`. Kuvia ei otettu, joten tumma tila ei ole varmistettu tässä ajossa. Epäillyt eivät tummenna tässä kohdassa, jos tila oli tumma. Seuraavaan ajoon samat kaksi pistettä kuvineen (2 kuvaa). Komento `globaalit` on haarassa (ei vaikuta peliin).

## VAHTIOSUMAT: valmiit (PT)
Komennot 1272 ja Nahtavyysalue 447, 829 valopoikkeuksia, PT hyväksyi. Nahtavyysalue 554 kasvu Liikepohjalle (Sisaan), ei nähty ilmestymisessä. Muut liikepoikkeuksia. Nimikerros 654 ja PariisiKallistus 141 ovat merkittyinä minun haarassani; PT:n viimeinen sana: älä muuta. **Yhdistettäessä NUI:n jousi (natiivi-ui/liikevahti-219 cbc744e21) voittaa PariisiKallistuksen rivillä.** `UI/MalliKyltit.cs` 4 > 0 ei ole minun. Perustelut `_tyo/karttaseppa/vahtiosumat-perustelut-20261105.md`. PT pyysi kertomaan nykimisestä: pysäytyskuvista ei näe.

## PÄIVITYS: KK:n päätökset ajosta (voittaa alla olevan)
Invalidit kelpaa kokeena, ei junaan. Riemukaaren aukio kelpaa. Eiffel pysyy paikallaan, kiveys kelpaa, kunnes Codexin alusta tulee. Tilaukset postissa: Codex jatkaa alustoihin (Eiffel lisätty listan loppuun; Grand Palais pois), Tripolle Riemukaaren katto `riemukaari-3d-v2`.
**Seuraava yhteinen ajo, ei omaa ajoa:** `_tyo/karttaseppa/sk-pariisi-yhteis-2.txt`, 7 kuvaa, kärki 93d41db55, vuoro pyydetty JU:lta perusteluineen. Tuloksista parit KK:lle; Eiffelin vanha pari `Matkakirja-fable/docs/raportit/kaappaukset/omistaja-20261105/eiffel-maa-puuttuu-2132.png`. Pystysauma tummumisen jälkeen.
**Grand Palais (KK kysyi syytä, vastattu):** suositus lisätä Codexin listalle; odottaa KK:n sanaa.

## TYÖJONO
1. Sävyn kaksi pistettä seuraavaan ajoon. Ajot: pyyntöön rivi "ratkaisee" ja enintään noin 5 kuvaa (JU, omistaja 17.58), muuten JU palauttaa. Vuoro JU:lta; ajat itse: `PROTO_LINJA=2 ESIKATSELU_PISTEKERROIN=0.465 /bin/zsh tyokalut/esikatselu.sh <sha> <sk> ipad --batch`, lopuksi LUKKO VAPAA.
2. **Katsepiste:** haara `karttaseppa/katsepiste-maa-219` (fb4379432), ei yhdistetä ilman omistajan sanaa. Suositus -2142:sta: ajohaara, jossa KatseNousu on komennolla kytkettävä; parit 45°, 75°, 85°. Aloittamatta.
3. **Pystysauma** (PT, sävyn jälkeen): -2128 kohta 2. Näkyy kuvassa hor-45-tuileries noin x 835 ja x 700–720 (2000 px).
4. Sacré-Cœur pelissä, Montparnasse mitoista, Opéra ja Eiffelin vaalea neliö: -2128 kohdat 4–6. Vaaleaa neliötä ei näy eiffel-ylhaalta-kuvassa.
5. Pois jääneet kuvat tarpeen mukaan: horisontti 75° ja 85°, Eiffel 45°, Riemukaari 45°, Invalidit etelästä.
6. **Pont Neufin nimi** (omistaja 21.49): `_tyo/karttaseppa/jono-pont-neuf-nimi.md`. Vasta kun VS:n kohteet ovat samassa haarassa ja sarjan työt tehty, ei omaa ajoa. Grand Palais ennallaan.

7. **Marais'n koe (omistaja 22.09, PT, Raamattu 2.213):** NS tekee 1 km²:n kokeen tavallisista taloista ohjelmalla Ateenan jälkeen. Karttasepälle vain: varmista NS:lle raja alueisiin v7, kun se kysyy. Sarja ei saa hidastua.

## Opit
- Viimeisen komennon jälkeen tarvitaan `odota`, muuten ajo päättyy ennen sen käsittelyä.
- Viestit ristesivät PT:n kanssa: kärki muuttui neljästi samoista riveistä. Kysy, jos vastuu vaihtuu kesken, tai odota yksi viesti ennen kuin palautat.
