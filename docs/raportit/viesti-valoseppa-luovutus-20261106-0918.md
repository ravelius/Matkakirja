# Valosepän luovutus 6.11.2026 klo 09.18

Korvaa luovutuksen -0903 kohdat TILA, ODOTTAA ja SEURAAVAKSI 1. Muut -0903:n ja -0838:n kohdat pätevät, paitsi maata koskevat. Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37).
Lue lukulista 7.47 itse. En lukenut tällä vuorolla Raamattua muilta kuin 11.8:n ja 11.10:n alkuriveiltä.

## PÄÄTÖKSET
Omistaja 09.07: Concorde kelpaa kokeena ilman mallin maata, ei junaan.
KK 09.1x: järjestys Concorde, sillat, Pompidou. Concordeen kyltti pois obeliskin päältä, obeliski ja pylväät vaaleammiksi, vesi Seinen sävyyn.
PT 09.1x: ei omaa ajoa, seuraavaan yhteiseen ajoon, EI Y c0bfef077:ään. Mittaa muisti. Lähteet-rivi vain, jos malli jää peliin.

## TILA
Koodi natiivi-backupissa: `linssiseppa2/ohjelmakohteet` 3230f37af, nimien kanssa `linssiseppa2/ohjelmakohteet-nimet` 3203aa555. Testit 18/18. Roslyn: ei syntaksivirheitä kolmessa tiedostossa. KÄÄNTÄMÄTTÄ UNITYSSÄ, ei nähty pelissä eikä esikatselussa.
Muutokset: maa, sen kuva, `concordemaa`, `OnMaa`, `Kuva` ja `Uv` pois; varjostin e46ad3592:n versioon. `NostotKartalla.PiirrosKyljet`: Concorden kyltti "oikea". `concorde-vie.py`: värit. `OhjelmaKohteet`: Concorden muisti ja rakennusaika lokiin.
Lähetetty: sha PT:lle, sha ja `_tyo/linssiseppa2/ohjelmakohteet/sk-concorde-2.txt` KS:lle (4 kuvaa, ei kokeiltu), lisäviat kuvineen KK:lle. Pompidou-pari KK:lla: `kuvat/yhteinen4-0b4d74011/pari-pompidou.png`.

## TODENTAMATTA JA OMAT RATKAISUT
Väri-arvot ovat omiani: vesi lineaarinen 0,312 0,389 0,180 (kerroin mitattu vanhan veden keskiarvosta, johon kuuluu reunapikseleitä); pronssi 0,42 0,44 0,38; obeliskin varsi 0,72 0,60 0,47, jalusta 0,42 0,40 0,36, kärki kullan väri. Mustan raidan 28–31 m tulkitsin atlaksen viaksi, en tarkistanut kuvasta.
`concorde_pronssi` kattaa myös suihkulähteiden pronssin, joten sekin vaaleni.
Kyltti "oikea": vanha viesti (PT 1.11.) kertoo kylkinimiön osuneen Louvreen, siksi co-kauko. Kyltin leveys kaukaa on päätelty koodista. Kohteen kuva oikealla on päätelty ajon kuvasta ja koodista.
Muisti: LASKETTU noin 1,26 Mt verkko (44 166 kärkeä × 28 t + indeksit), varjoverkko ei mukana. Ei mitattu. Loki antaa Macin luvun; Profiler antaa nollan, jos ajo ei ole kehitysversio. Laite mittaamatta. Rakennus yhdessä ruudussa ennallaan.
Lähteet: LAHTEET.md:n OSM ODbL koskee esineitä; IGN:n kuva lähti maan mukana, mutta tarkista esineiden muut rivit ennen krediittiä.
`Komennot`-rivi "concordemaa" poistui, joten vanha `sk-concorde.txt` ei enää toimi.
Merge: tein ensin virheellisen paikallisen commitin e5fee91d2 ristiriitamerkeillä (ketju jatkoi skriptin kaaduttua). Ei viety; haara palautettu, oikea on 3203aa555. Älä käytä e5fee91d2:ta.

## ODOTTAA
KS:n seuraava yhteinen ajo. KS ilmoittaa kansion.

## SEURAAVAKSI
1. Kun kansio tulee: co-yla, co-45, co-ob, co-kauko täysikoossa, loki `grep "MATKAKIRJA ohjelmakohteet:" unity.log`. Viat KK:lle ja PT:lle, muistiluku PT:lle. Vertaa ajon 0b4d74011 samoihin kameroihin.
2. Sillat ja Pompidou -0903:n kohtien 2 ja 3 mukaan. HdV:n pisteet ilman sanaa ei koodia. Concorden varjoläikät ja nimien väistö eivät ole KK:n sanassa: ei koodia ilman sanaa.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Asemataulu- ja työlistahookin rivit eivät ole Valosepän.
