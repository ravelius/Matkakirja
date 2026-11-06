# Valosepän luovutus 6.11.2026 klo 07.16

Korvaa luovutuksen -0702 kohdat LISÄYS: järjestys ja TILA. Muut pätevät: -0702 LISÄYS (TASAINEN KARTTA, SAINT-EUSTACHE, SAINT-SULPICE, UUSI TYÖ NUI + VS, ÄLÄ aja pinta.py kirjoita) ja SEURAAVAKSI: POMPIDOU, -0300 TEHTY: SAINT-SULPICE, -0235 SYY JA KORJAUS, -0221 SAINT-EUSTACHE, -0157 Pont Neuf ja AUKI AAMULLA, -0135 SUOJATARKISTUS, -0115 maa ja mittarit (paitsi helma). Syy: konteksti pehmeällä rajalla (Raamattu 7.37).

## TILA
Koodi c67e51922, haara `linssiseppa2/ohjelmakohteet`, natiivi-backupissa (etä on `natiivi-backup`, ei origin), worktree /Users/Shared/Claude/wt/proto-linssiseppa2-k30. Ei junaan. Testit 16/16. EI käännetty Unityssä eikä ajettu; OhjelmaKohteet.cs ei kuulu testikäännökseen. Mikään alla oleva ei ole nähty kartalla.
D = /Users/Shared/Claude/proto-3d/_tyo/linssiseppa2/ohjelmakohteet.

## JÄRJESTYS
1) Sillat TEHTY koodina. 2) SEURAAVAKSI Saint-Eustache ja Saint-Sulpice (-0702). 3) Pompidou. Ohessa nimien tiedot NUI:lle: EI VIELÄ LÄHETETTY (Lat, Lon, Akseli, verkon rajat kohteittain). Kaikki yhteiseen ajoon JU:lla, ei omaa ajoa.

## SILLAT c67e51922: MITÄ MUUTTUI
Koskee kaikkia 18 kaupunkisiltaa (yksi rakentaja). Pont Neuf ja Pont Alexandre III ovat omia rakentajiaan, eivät muuttuneet.
- Pilari: suora laatikko vedestä, kaaren alun yli 1,5 m, nokka 2,5 m, matala hattu 1,6 m. Piikki tuli terävästä nokasta ja sen vaaleasta kolmiokatosta.
- Kaari: ympyränkaari, ei puoliellipsi (ellipsi lähti pystysuoraan ja teki pilarin päälle piikin). Uudet kentät `KaariNousu`, `Aukot`.
- Seinä: lista ja vuorottelevat rengaskivet pois kivisilloilta, joten seinä on yhtä pintaa kannen reunaan. Metallisilloilla lista jäi.
- Viirut: SYY ON LYHTYPYLVÄÄT. Paikat osuvat pilareihin ja väri (73,73,67) täsmää Valurautaan kuvassa p-con. `SillanLyhdyt` poistettu. Tämä on oma ratkaisuni, ei KK:n käsky: KK pyysi vain syyn. Oikeilla silloilla on lyhdyt.
- Pont Neufin tummat pisteet: PÄÄTELTY samaksi (`Lyhty` OhjelmaKohdeGeometria.cs rivit 987–988), EI mitattu. Pont Neufia ei muutettu.
- Kiila: `Lasku(..., seina: false)`, joten laskulla ei ole sivuseinää; maavarjo rajattu vesiosaan (`SillanJoki`, `VarjoA/B`). RISKI: kannen reuna on laskulla ilmassa, ja sen alta näkyy kartta. Katso kuvista, näyttääkö se ohuelta levyltä.
- Aukoista näkyi kartan oma vaalea siltakuvio (PÄÄTELTY kuvasta): aukkoihin lisätty tumma vesi `SiltaVesi` 0x7A7A64 (väri arvio) y = 0:ssa. Pilarin kylki aukossa `SiltaKivi × 0,6` (täysi kivi täytti aukon esikatselussa). Musta pystyviiva (KK 02.5x) voi palata: katso.
- Testi: "pilari ≥ kaaren alku" poistettu, tilalle kaaren huippu kannen alla ja aukkojen summa.

## MITAT
- Pont Royal: aukot 20,6 / 22,6 / 23,5 / 22,6 / 20,6, pilari 5,5, koko 132 m. 20,6–23,5 Structurae, 22,6 lasku summasta 109,88. Korkeudet kuvasta `a/viite/Pont Royal-0` (edestä, pilarista 10,9 px/m, vedenkorkeus vaihtelee): kaari alkaa 4,5, huippu 10,5, kansi 12,5 (oli 11,5). Hattu oikeasti noin 4 m, tehty 1,6, koska korkea näytti esikatselussa piikiltä: POIKKEAMA MITASTA.
- Pont de la Concorde: pilari 4,5 (oli 5), kaari alkaa 7, nousu 3, kansi 11 kuvasta `a/viite/Concorde-6` (7,1 px/m, perspektiiviä ei korjattu). Aukot 25,5 / 28 / 30 / 28 / 25,5: keskiaukko kuvasta, muut tasattu OSM-pituuteen 155 m, EI lähteestä. Oikea pilari on pyöreä, tehty suorana (KK).
- RISTIRIITA KK:lle: KK 02.5x pyysi matalia pilareita ja kaarta läheltä vettä; Concorden oikea pilari on korkeampi kuin leveä (7 / 4,5). Pont Royal on matala (4,5 / 5,5). Noudatin uudempaa sanaa "kaari alkaa pilarin yläosasta" ja kuvia.
- Molempien profiilit suoristettu, OSM:n levenevät päät pois. VesiA ja VesiB päivitetty käsin `maa/pinta.py`:n tulosteesta (Royal 25,3 ja 36,1, Concorde 26,8). Jäännös Royal 6,3 m, Concorde 4,9 m.
- Muilla silloilla pilarit ja kaaren alut ennallaan, eivät mitattuja; aukot tasajaolla. Lähteissä olisi Archevêché 15/17/15 ja Marie 14–18, ei käytetty.
- Kaarten ulompi pää on rannan päällä kuten oikeasti (kuvat -0, Concorde-6).
- Korkeuksia EI lukittu. PT:n ohje pätee: KYSY MAAN ARVOT KS:LTÄ ennen lukitusta. En ole kysynyt.

## ESIKATSELU (ei kartalla, ei todista lopputulosta)
Royal ja Concorde luettavia kivisiltoja 45°:ssa ja 12°:ssa: /private/tmp/claude-502/-Users-Shared-Claude-Matkakirja-linssiseppa-2/0d096b43-4151-4126-ab5e-15b512bbfa9e/scratchpad/esi.
OBJ:t: `aja-geometria.sh` vie vain Mitat-testit, silloille: `OHJELMAKOHTEET_VIENTI=$D/obj <dotnet> $D/rak/G.dll OhjelmaKohde`. Muuten esikatselu näyttää vanhan sillan (kävi minulle).

## AJO
`D/sk-maa5.txt` valmis (16 kuvaa: p-roy, p-lp, p-con, se-et, se-la, ss-la, ss-et, pohj, pb-etu, pb-piha, m-etu, m-sivu, p-pn-oik, tsj-pohj, tsj-et, hdv-110). JU:lle kerrottu 07.1x. Täydennä Eustachen ja Sulpicen muutokset samaan shaan ja kerro JU:lle uusi sha; Pompidou lisätään, jos ehtii. Älä muuta listaa ajon aikana.
KK:n "pari oikea silta | peli" voidaan tehdä vasta ajosta. Kuvat: Pont Royal-0 ja Concorde-6 (CC0 ja BY-SA 3.0); sama kohde kokonaan, sama rajaus.

## MUUTA
Seuraamattomat .claude/settings.local.json.ennen-kevennysta ja waveletNoiseTile.bin: en koskenut. Työlistahookin rivit eivät ole Valosepän.

## LISÄYS 07.2x
- KS 07.1x: Pariisin keskusta tasoitetaan 90 m:iin 10 km:n säteellä, reuna 14 km:iin, Montmartre reiäksi (oletukseksi vasta sovituksen jälkeen). Tämä on PT:n kysymä maan arvo. KS:lle vastattu "ei koske": `AsetaPaikka` lukee samat globaalit ja laskee saman kaavan kuin `KorkeusKerroin.TasaOsuus`; luettu koodista, ei ajettu. Tasaisella kartalla sillan pinta seuraa kerrointa 0.
- NIMET (NUI, PT): TEHTY haaraan `linssiseppa2/ohjelmakohteet-nimet` (14763c0c9 = c67e51922 + yksi commit, natiivi-backup): `Kohde.NimiEste`, kuusi rakennusta, `LisaaNimiEste`-kutsu. Pompidoulle sama kenttä, kun se tehdään. Nimien tiedot NUI:lle on näin hoidettu, muuta ei tarvita.
- EI POIMITTU 04d3835a8 + e7e8d7b5b: poiminta menee ristiriitaan, koska ne vaativat NUI:n kuusi aiempaa committia. Haara ei siis käänny yksin, vaan vasta yhdessä haaran `natiivi-ui/merkki-pinta-219` kanssa. Siksi oma haara: `linssiseppa2/ohjelmakohteet` kääntyy yhä yksin. Jatka töitä haarassa `linssiseppa2/ohjelmakohteet`.
- Yhdistys 14763c0c9 + e7e8d7b5b: ristiriita tiedostossa Assets/Matkakirja/UI/MalliKyltit.cs. Kerrottu NUI:lle ja JU:lle.
- JU palautti 16 kuvan listan (raja noin 5, omistaja 17.58). `D/sk-maa5.txt` karsittu 9 kuvaan, perustelu ja "mitä tämä ratkaisee" 1. rivillä; p-lp, se-la, ss-et, pohj, pb-piha, m-sivu, tsj-pohj pois. Korvaa kohdan AJO kuvaluettelon. Odottaa JU:n kuittausta. Jos JU vaatii viiteen, ensin pois hdv-110, tsj-et, m-etu, p-pn-oik.
