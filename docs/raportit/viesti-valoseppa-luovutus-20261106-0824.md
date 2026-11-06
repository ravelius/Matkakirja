# Valosepän luovutus 6.11.2026 klo 08.24

Korvaa luovutuksen -0815 kohdan SEURAAVAKSI. Muut -0815:n kohdat pätevät, samoin sen luettelemat vanhemmat. Syy: konteksti 26 %, pehmeä raja (Raamattu 7.37), ja uusi iso työ tuli. Koodia ei tehty tällä vuorolla.
Aloitusvuorolla luin periaatteet, 12.9, 2.213 ja 7.37 kokonaan; 7.4, 7.23–7.25, 9.1–9.3 ja 9.5 enintään 2 200 merkkiä kohdasta; luvusta 6 kohtien alut; luvusta 2 vain linssirivien alut. Lue lukulista 7.47 itse.

## OMISTAJAN SANA: CONCORDEN AUKIO (PT 08.2x, KK:n välittämä)
Kortti: "Kokeillaanko pallon omaa Concorden aukiota uudella kartalla?" = "Kokeillaan (Suositus)" (omistaja 08.20).
PT: tavoite on, että aukio seisoo kartalla oikeissa mitoissa kuten ohjelmakohteet (nyt vain kyltti ja pyöreä kuva). Malli pallon oma, ilman Googlea. Lähteet `_tyo/linssiseppa2/concorde-lahdepaketti.md`. Riskit KK:n kertomat: pinnat eivät ehkä sovi piirrettyyn karttaan, obeliski voi jäädä ohueksi.
Seuraavaan yhteiseen ajoon (sha KS:lle), ei omaa ajoa, ei junaan. Tulos viat nimettyinä KK:lle ja PT:lle. Ei pallon koko maailmaa kartalle, ei 18 Blender-mallia. Järjestys: sillat ja Pompidou ensin, jos ne ehtivät samaan ajoon; muuten kerro.
Kortin koko selitettä en lukenut; se on PT:n ja KK:n transkriptissä.

## AJOTILANNE
JU ajaa KS:n ajoa 382618036 (`sk-pariisi-yhteinen-3`). Siinä ei ole koodiani eikä siltakuvia, vain pb-etu.
KS 08.2x: ottaa seuraavaan yhteiseen ajoon c562b4e29:n (sisältää e46ad3592:n) ja `_tyo/linssiseppa2/ohjelmakohteet/sk-sillat-pompidou-3.txt` (7 kuvaa, tein tällä vuorolla, ei kokeiltu). Yhdistää vasta nykyisen ajon jälkeen. Ilmoittaa kansion sinulle. Kuivakoe 382618036 + c562b4e29 puhdas, ei käännetty.
Uusi sk-tiedosto korvaa -2:n. p-ax:n kulma on oma arvioni. pb-etu tulee nykyisestä ajosta ilman katon korjausta: älä arvioi kattoa siitä.

## SEURAAVAKSI
1. Tee Concorden koe koodina ja lähetä sha KS:lle ennen seuraavan ajon alkua. Jos ei ehdi, kerro PT:lle, että sillat ja Pompidou menevät edellä.
2. Kun KS ilmoittaa kansion: -0815:n kohta 1 ja 2 (kuvat täysikoossa, KK:n sitoumukset). p-ax lisäksi.
3. Hôtel de Villen valkoiset pisteet: ei tutkittu.

## CONCORDE: MITÄ LÖYTYI (luettu tiedostoista, ei kokeiltu)
Malli `proto-3d/_valmiit/concorde-v2` (symlinkki T7:lle, 60 Mt). Linnanrakentajan oma malli, ei Googlea; `LAHTEET.md`: OSM on ODbL, siis johdannainen, kerro krediitistä KK:lle ennen kuin koe etenee.
`lahde/concorde.py`: glTF +X itä, +Y ylös, −Z pohjoinen; origo aukion keskipiste lat 48.8656331, lon 2.3212357, maan tasolla (NGF 32,96). Rajat x −204,8…197,8, y −4,5…33,5, z −194,8…232,8. Tileset-versio on `tekoaly-v2-tekseli/portti/co_atlas_lod{0,1,2}.glb`, kolme verkkoa (`co_aukio`, `co_rakennus` = obeliski, `maa`), 8 materiaalia.
Kolmiot lod1: kivi 4 849, iho 1 440, kulta 5 547, pronssi 2 640, vesi 96, valurauta 50 142, atlas (obeliski) 150, maa 4 011.
lod2: ei valurautaa, ei rostraalipylväitä; kulta 169, pronssi 346, kivi 2 264, iho 720, vesi 96, atlas 150, maa 1 874.
Tekstuurit: kivi ja maa (`maa_v2`, 712 kt jpeg) ja obeliskin atlas; muilla pelkkä baseColorFactor.

## CONCORDE: OMA SUUNNITELMA (ei koodia; muuta, jos paranee)
Lisää aukio kohteeksi `OhjelmaKohteet`-listaan, ei `Nahtavyysalue`-luokkaan (se on KS:n). Lat, Lon = origo, Akseli 0, koska paikallinen +Z = pohjoinen ja +X = itä.
1. Python-työkalu D:hen: litistä lod1 (solmut), z → −z ja normaalit samoin, kirjoita `Assets/Matkakirja/Kartta/Resources/` alle .bytes. Lineaarinen kärkiväri: baseColorFactor sellaisenaan; kivi tekstuurin keskiarvo (sRGB → lineaarinen); obeliski atlaksesta kolmion mukaan.
2. Jätä valurauta pois (183 valaisinta, 50 142 kolmiota, oma päätökseni: alle pikselin paksuja 1,45 px/m:llä). Lopussa noin 18 700 kolmiota. Kerro poisto tuloksessa.
3. `Verkko`-luku `OhjelmaKohdeGeometria`:an ja testi `OhjelmaKohde`-suodattimeen (mitat lähdepaketista: obeliski 33,37 m, malli 33,5). `OhjelmaKohteet.cs` ei kuulu testikäännökseen.
4. `TeeVerkko` tekee kärjet kolmioittain ja `Verkko` on kolmiolista. Maa kahdella tavalla, jotta KK:n riski näkyy: ilman mallin maata (objektit kartan päällä) ja maan kanssa. Maalle `OhjelmaKohde.shader` tarvitsee `_MainTex`:n ja uv:n (oletus valkoinen, muut kohteet ennallaan), tai erillinen kohde. Vaihto komennolla `Komennot.cs:701`:n viereen; molemmat kuvat samasta ajosta samoilta kameroilta.
5. MaaH: mittaa aukion jalanjäljeltä kuten `maa/kohteet.py` (`maasto.korkeus(...,12)`, tuplaus kuten siellä). Pinta laskee sillalle päin, mallin oma maa y −4,5…0,5. Tasainen kartta on oletuskuvissa; tarkista jalat myös sillä.
6. Syvyys: varjostin tuo mallin 60 m lähemmäs, joten mallin maa peittää kartan ja voi peittää Pont de la Concorden pään. Kullan tekstit ovat 2 cm pinnasta (`concorde.py`): anna pieni `Syvyys`, muuten välkyntä.
7. Yhdistä nimihaaraan; ristiriidan ratkaisu `NimiEste = true` (-0730). Kyltti ja pyöreä kuva jäävät kartalle: katso, peittävätkö ne, älä poista ilman sanaa.
8. Kuvat: koko aukio ylhäältä ja 45°:sta, obeliski lähempää, kumpikin maavalinta; lisää kuvarivit omaan sk-tiedostoon ja perustele yli 5 kuvaa. Vertailu oikeaan kuvaan 10.1 #1 (CC BY 2.0, Eiffel-tornista). Pallonäkymän Googlen kuvia ei vertailuun.

MITTAKAAVA: obeliskin varsi noin 2 m leveä; 1,45 px/m:llä noin 3 px. Älä liioittele ilman sanaa (oikeat mitat, 2.213).
HUOM: Yli 18 000 kolmiota kohteelle on enemmän kuin Pompidou (8 684). Muistia ja ruudunpäivitystä ei ole mitattu.

## MUUTA
Ei junaan. Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.
