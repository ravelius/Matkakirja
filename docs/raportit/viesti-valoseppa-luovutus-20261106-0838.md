# Valosepän luovutus 6.11.2026 klo 08.38

Korvaa luovutuksen -0824 kohdat AJOTILANNE, SEURAAVAKSI ja CONCORDE: OMA SUUNNITELMA. Muut -0824:n ja -0815:n kohdat pätevät. Syy: konteksti 25 %, pehmeä raja (Raamattu 7.37), ja odotetaan ajoa.
Aloitusvuorolla luin periaatteet, 7.23–7.25, 7.37, 9.1–9.3, 9.5, 12.9, 2.213 ja luvun 6 kohtien alut. Lue lukulista 7.47 itse.

## TILA
Concorden aukio koodina: `linssiseppa2/ohjelmakohteet` 4647b2926, nimien kanssa `linssiseppa2/ohjelmakohteet-nimet` 080a6b3e6, molemmat natiivi-backupissa. Worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30 on haaralla `linssiseppa2/ohjelmakohteet`. Ei junaan.
Testit 18/18: `OHJELMAKOHTEET_RESURSSIT=$W/Assets/Matkakirja/Kartta/Resources/OhjelmaKohteet OHJELMAKOHTEET_VIENTI=$D/obj <dotnet> $D/rak/G.dll OhjelmaKohde`. Tämä muuttuja tarvitaan, koska testi lukee .bytes-tiedostot ja `aja-geometria.sh` ajetaan muualta (siksi sen tulos on nyt 9/10; ei vika koodissa).
KÄÄNTÄMÄTTÄ UNITYSSÄ: `OhjelmaKohteet.cs`, `Komennot.cs` ja varjostin. Tarkistettu vain, ettei Roslyn anna syntaksivirheitä nimihaaran `OhjelmaKohteet.cs`:stä. Ulkoasu nähty vain esikatselussa (esineet, ilman maata ja karttaa).

## AJOTILANNE
KS 08.3x: 080a6b3e6 on yhteisessä haarassa (0b4d74011), kääntämättä. Kuvarivit järjestyksessä `sk-sillat-pompidou-3.txt`, `sk-concorde.txt`. Ajoa ei ole pyydetty: KS odottaa NS:n palat-v4:ää. Jos Unity ei käänny, KS palaa c562b4e29:ään ja kertoo virheen sinulle. KS ilmoittaa kansion.
Ei omaa ajoa. Sillat ja Pompidou menevät samassa ajossa edellä, joten PT:lle ei tarvitse erikseen kertoa järjestyksestä.

## SEURAAVAKSI
1. Kun KS ilmoittaa kansion: kuvat täysikoossa. -0815:n kohdat 1 ja 2 (p-roy, p-con, p-roy-2, p-con-2, p-ax, po-la, se-et, KK:n sitoumukset). pb-etu tulee ilman katon korjausta, jos se on sk-3:sta: tarkista.
2. Concorde: co-yla, co-45, co-ob, kukin myös -maa. Viat nimettyinä KK:lle ja PT:lle. Vertaa oikeaan kuvaan lähdepaketin 10.1 #1 (CC BY 2.0, Eiffel-tornista, ei vielä ladattu). Pallonäkymän Googlen kuvia ei vertailuun. Kuvarivin suunta 60 on oma arvioni tuosta näkökulmasta.
3. keski-ylhaalta-hdv-2: näkyvätkö Hôtel de Villen reunan valkoiset pisteet yhä? Jos e46ad3592:n syvyyskorjaus vei ne, koodia ei tarvita. Muuten tutki; syytä ei tiedetä.
4. Jos Unity-virhe tulee KS:ltä, korjaa ja lähetä uusi sha KS:lle.

## CONCORDE: MITÄ TEHTIIN
Työkalu `_tyo/linssiseppa2/ohjelmakohteet/concorde-vie.py` lukee `_valmiit/concorde-v2/tekoaly-v2-tekseli/portti/co_atlas_lod1.glb` (T7) ja kirjoittaa `Resources/OhjelmaKohteet/`: `concorde-esineet.bytes` (14 722 kolmiota, 0,97 Mt), `concorde-maa.bytes` (2 993, 0,27 Mt), `concorde-maa.jpg` (2048 px, 0,73 Mt). Aja ilman -I:tä; numpy ei muuten löydy. Metat kirjoitettu käsin (GUID:t omia). Unity voi täydentää jpg:n metaa.
Lukija `OhjelmaKohdeGeometria.LueVerkko`, muoto "OKV1". Testi `ConcordenAukionMitat`.
Kaksi kohdetta listassa: "Concorden aukio" ja "Concorden aukion maa" (`OnMaa`, `Kuva`). Komento `concordemaa 0|1`, oletus pois.
Värit: glTF:n baseColorFactor sellaisenaan. Kivi tekstuurin keskiarvo (lineaarinen 0,809 0,747 0,611, voi olla liian kirkas). Obeliski atlaksen keskiväri kolmioittain. Kullalla syvyyslisäys 0,3 m. Vesi on esikatselussa selvästi turkoosi: katso kuvasta.
Varjostin: `_MainTex` (oletus valkoinen) ja `_Lahempana` (oletus 60, maa 30). Koskee kaikkia ohjelmakohteita; muiden pitäisi näyttää samalta, mutta sitä ei ole ajettu.
Maa jonossa 2992 ennen varjoja (2993), jotta varjot piirtyvät maan päälle. 30 m:n tarkoitus: maa voittaa kartan mutta ei Pont de la Concorden päätä. Väitteet todentamatta.

## POIKKEAMAT JA OMAT RATKAISUT (KK:lle kerrottu 08.33)
- `NimiEste` EI päällä aukiolla, vaikka -0730 sanoi ratkaisuksi true: este on kupera kuori, joka olisi koko aukio. Pelkän obeliskin este puuttuu; katso, kulkeeko nimi sen yli.
- 183 valaisinta pois (50 142 kolmiota). 18 rostraalipylvästä ja kulta jäävät; kultaa ei jää ilmaan, koska se on vain suihkulähteillä ja pylväillä (rajat tarkistettu, ei kuvasta).
- Maan pystyhelma pois: 1 018 kolmiota.
- Krediitti: OSM ODbL ja IGN; rivi `LAHTEET.md`:ssä, ☰ › Lähteet ei lisätty kokeessa.

## MITAT
Aukion pitkä akseli noin 25,5° pohjoisesta itään (Madeleinen suunta); lähdepaketin 1.2 on sen akseleissa. Testi käyttää samaa. Obeliskin keskipiste on paikallisesti x −7,85, z −16,9.
Suihkulähteet mallissa 63,5 m obeliskista, lähde 66–67 m ±3–5; testin raja ±5, jotta malli menee läpi. Ei korjattu mallia.
MaaH 32,0: esineiden matalin raaka korkeus 31,8 (etelä). Raaka pinta etelässä 32,5, keskellä enintään 43, pohjoisessa 40; kerroin 2. Ei-tasaisella kartalla malli on pohjoisessa noin 16 m pinnan alla; varjostin piirtää sen päälle. Oletuskuvissa kartta on tasainen.
Muistia, ruudunpäivitystä ja latausnykäystä ei mitattu. `LuoSeuraava` lukee ja rakentaa aukion yhdessä ruudussa (17 700 kolmiota yhteensä, 2× Pompidou): katso loki.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän. `sk-sillat-pompidou-3.txt`:n sisältö kuten -0824.
