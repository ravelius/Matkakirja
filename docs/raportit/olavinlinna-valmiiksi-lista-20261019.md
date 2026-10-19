# Olavinlinna: valmiiksi-lista (ali-agentti Päätoimittajalle, 19.10.2026)

Lähteet: Raamattu (OLAVINLINNA-kohdat), pelattavuusmalli, seikkailuehdotus, läpipeluuraportti, luovutukset 13.–15.10., proto-repon git-loki ja tiedostot. Vain luku, ei muutoksia koodiin.

## 1. Nykytila
- **Pelattavat tilat (5, junassa 187 oletuksena päällä):** keittiö, porttikäytävä, pikkupiha, linnantupa, voudin sali (Koehuone.KytkeOletukset). Lisäksi vanha pelattava pala Laituri → Keittiö → Kappeli (v44k–v49a) ja kappeli kalkittuna.
- **Hahmot:** 11 MetaHuman-hahmoa (soutaja, renki, portinvartija, kokki, apulainen, vesipoika, 2 vartijaa, kappalainen, kirjuri, vouti), vain laitteille RAM ≥ 6 Gt (MetaHumanPortti); muille FACEIT-kasvot. Asut 1499-tyylisiä (v48r–v48v).
- **Esineet:** Codexin esineet-v1 (mm. rukouskirja.glb), tarjotin, lyhdyt, ihralamput, keittokulho, avainrengas.
- **Kulku:** aloitusnäkymä veneestä, partiovartija, kehittäjätilan aloituskohdat, pelattavuusmalli (Thief-malli, ei väkivaltaa), botti 17/17 viidellä tilalla, Läpipeluutestit (ydin).
- **Äänet:** porttikäytävän 60 s äänimaisema (Äänittäjä), kolikot, askeleet; linnan ElevenLabs-puheet on tehty (keittiö 31 kpl); loppumusiikki The Bard's Tale CC0.
- **Teksti ja kartta:** olavinlinna.fi.json (historia-animaation tekstit 1475–1872 hyväksytty), tietokerroksen kortit luonnos, Olavinlinnan torni karttanappina (juna 184/195), pienoiskartta, sininen hehku poistettu 18.10. Pelit › Keskeneräiset.
- **Viimeisimmät shat (proto):** 0ca242e9b BUILD 202; ca6a05df1 hehku pois; 3e8408c20 / dd7fbb2cc viisi tilaa (juna 187); 0429ee8b2 v49a; 87cd75e03 v48z; f8c27b0fe v48s (jälkimmäiset 12.–13.10.).
- Tauko alkoi 13.10. (viisi tilaa valmiiksi, sitten tauko); omistaja purki sen 19.10. 08.33.

## 2. Puuttuu
| Osa-alue | Mitä puuttuu | Tekijä | Koko |
|---|---|---|---|
| Tilat | Laituri/ranta 1499-asussa (kallioranta, puusilta, ei bastioneja), Kirkkotorni, muurikäytävä, muurinharja + ulkoseinä, komero, tyrmä, pakoreitti köysilaskuna; Kuninkaansali pidetty voudin salina | Linnanrakentaja (Blender, valo), Codex (ainutlaatuiset pinnat) | L |
| Tilat | Itäsiipi ja Kellotornin komero + aarrearkku (aarre: Aarnivalkean hopea, pikari) | Linnanrakentaja + Codex | M |
| Pelikulku | Huoneet 6–10 (ydintestit olemassa, sovelluskytkentä tarkistettava; naamio, ohitus, avainrengas, köysi, tiilet, pako) pelilogiikkana; kamerat K2–K5, tarkistuspisteet, tyrmäpaluu | Olavinlinna-sessio / Pelikoodari | L |
| Pelikulku | Loppu: löytömerkki, kanteleaihe, aarteen paljastus, dronenäkymä nykylinnaan, tietokerros lopussa | Pelikoodari + Natiivi-UI | M |
| Pelikulku | Alussa valinta "katso linna / pelaa"; historia-animaatio (tyhjä saari → 1475 → nykylinna) | Linnanrakentaja + Siirtoseppä | L |
| Hahmot | Hahmojen realistisuus 1499-asuihin (omistaja: Tripo, ei MetaHuman-ketjua); uudet roolit: muurivartija, kellonvartija, hoitaja, talonpoika, linnaväki | Codex (Tripo) + Linnanrakentaja (kokoaminen) | L |
| Esineet | Rakennusosat ja rekvisiitta huoneisiin 6–10 (komeron tiilet, köysi, avaimet, arkku, kilvet) | Codex | M |
| Valo | Liekit ja kuu, huoneiden leivonta uusille tiloille, yö/päivä-versiot | Linnanrakentaja | M |
| Teksti | M-osan repliikit (~30 + 2 voudin valinnaista) luvalla; tietokerroksen kortit 7–12 lopulliseksi; vihjetekstit (☰ › Vihje, ei tekstiä ruudulle) | Sisältökirjuri | S |
| Äänet | Huoneiden 6–10 äänimaisemat, muuri- ja tyrmäpuheet (16 repliikkiä), kello, köysi; uudet puheet vain omistajan luvalla | Äänittäjä | M |
| Laatu | Muistiraja uusille tiloille (iPad Pro 13: vapaa 783 Mt kun 9 MH), LinnaMuistibudjetti-tarkistus | Natiiviseppä / Siirtoseppä | M |
| Testaus | Botti kaikille 10 huoneelle, läpipeluu koko ketju ~30 min, Laitetestaajan läpipeluu | Siirtoseppä, Laitetestaaja | M |
| Julkaisu | Pois Keskeneräiset-listalta, Pelit-osion jako valmistuttua, latauskuva/lataus | Pelikoodari, Natiivi-UI | S |

Puuttuvia kohtia yhteensä: 13.

## 3. Tripo-pilotti
- **Ehdotus:** kokki ja portinvartija (tai kokki ja yksi vartija) Tripolla; vertailuun jo olemassa olevat MetaHuman-kokki ja -portinvartija. Vartijan Tripo-malli on jo hyväksytty peliin (Raamattu 18.10.), joten vartija on nopein: kokki uutena.
- **Menetelmä:** Codex tekee referenssikuvat (etu, kolme neljännestä, takaa; 1499-asu, linnan väri), Tripo generoi mallin selaimessa (Max-krediitit, ei API-ostoja), Linnanrakentaja riggaa/asettaa samaan keittiön valoon samalle paikalle kuin MetaHuman.
- **Tulos:** kuvapari (MetaHuman vs Tripo, sama kamera ja valo), PT:lle ja omistajalle päätökseksi koko linnan hahmoille.
- **Generointimäärä omistajan kortille:** 2 hahmoa x 3 referenssikuvaa = 6 Codex-kuvaa (+ 2 uusintakierrosta varalle = 4 lisää) -> enintään 10 kuvaa; Tripo 2 mallia x 1–2 yritystä = 2–4 generointia. Yhteensä enintään 14 generointia.
- Jos pilotti hyväksytään: koko linna noin 11 nykyhahmoa + 5 uutta roolia = 16 hahmoa, noin 16 x 3 kuvaa + 16–32 Tripo-generointia (arvio 65–80 yhteensä).

## 4. Avoimet päätökset omistajalle
1. Hahmoketju: korvataanko kaikki MetaHuman-hahmot Tripolla pilotin jälkeen vai vain uudet roolit? (muistiraja ja ketjun vakaus)
2. Pelin laajuus: kaikki 10 huonetta (~25–35 min) vai ensin 5 nykyistä + loppu (kappeli, aarre, pako) lyhennettynä? (suositus: koko seikkailu)
3. Uudet äänet ja repliikit (~30 + 16 puhetta, kaiut): lupa generointiin, kun tekstit on hyväksytty.

## Havainto
Viisi tilaa on pelattavissa, mutta seikkailun loppu (huoneet 6–10: komero, aarre, pako, tyrmä) puuttuu pelattavina tiloina (ydinsimulaatio 1–10 on testeissä, mutta ei tarkistettu, onko logiikka sovelluksessa); suurin työ on tilat + pelikulku, ei hahmot.
