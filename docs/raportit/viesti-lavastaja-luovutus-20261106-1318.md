# Lavastajan luovutus 6.11.2026 13.18 (reiät: kuvat ja v125-vertailu katsottu, syy mitattu) — LUE TÄMÄ KOKONAAN

Pohja: -1305 (commit 14398b0fb) pätee: vientiehto, PT:n sana 13.0x, Opetukset, Työkalut, kohdat 5-7. Tämä korvaa sen Tilan kohdan 1, lisäykset ja järjestyksen kohdat 3-4. A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstivahdin takia (25 %). EI VIENTIÄ.

## Tulos
1. Pisteet1 katsottu täysikoossa 12/12. Reikä näkyy kolmessa pahimmassa: väärä pinta, terävä reuna. Ei tyhjää.
2. V125-vertailu (A/kuvat-vrt125, koejuuri-vrt125 = ovi3 + tausta-v125 symlinkeillä, koodi 35140432d, 404: 4 tuttua). Katsottu 4/6; p--95p2-345p5 ja p-204-koillinen katsomatta.
   - r--265--248, r--109-227: v125:ssä lattia ehjä. Reikä on v125:n jälkeinen.
   - r--380-517: v125:ssä keskellä isot laatat, sivuilla pilkullinen vaalea pinta, sama vino raja. Ovi3:ssa tummat laatat sivuilla ja pienet vaaleat keskellä. Ei sama tapaus: selvitä erikseen, kumpi on oikea.
   - p-204: siniharmaat kaistat ovat myös v125:ssä, eivät levyistä. Rakennus eroaa, ei suora pari.
3. Mitattu (A/mittaa_levyt_syy.py, syy2.py, vain luku): 269:stä 268:lle solu. Uusi lista kadonneen kolmion kohdalla: säilynyt alempana 238 (2 029,5 m2: alle 30 cm 58, alle 2 m 125, yli 2 m 55), ylempänä 15, tyhjä 11, sama korkeus 4. Pahimmat: vanha V4_marmori y 0,11-0,42, uusi y 0, solu 164-287 m2.
4. Syy PÄÄTELTY, EI TODISTETTU: isossa koverassa solussa vanha ja uusi saavat yhden korkeuden yhdestä pisteestä, joten ero ei kerro koko solusta, ja v115_korjaa.py rivi 1 poistaa oikean ylemmän pinnan. Rivi 65 laskee muidenkin korkeuksien pinnat, joten "ei tyhjäksi" ei koske omaa korkeutta. Rivit 53 ja 66 jättävät naapurit, mikä sopisi tilkkuihin.
5. (-109,44; 227,53) 94,9 m2 katosi jo rungolle-askeleessa, ei levyissä: kuuluu seitsemän joukkoon. Sen kuvan reikä ei siis ole todiste levyistä.

## Muut kuvalöydökset, syy auki
p--133p4: kamera seinässä, ei kelpaa; uusi kamera tarvitaan (-133,4):lle. p--133p4-kauempaa ja p--144p4-sisalta: katkoviivat seinässä ikkuna-aukon muodossa (näkyvät v125:n p-204-kaakossakin vastaavina viivoina, ei verrattu suoraan). p--113p1: sokkelin yläreuna päättyy vinoon, alla punainen kaista. p-204-luode: irrallinen vaalea laatta. p--95: kaksi kiilaa auki. KK:n viiden pisteen ehto ei täyty vielä.

## Seuraajan järjestys
1. Lue Raamattu 7.47. Katso kaksi katsomatonta vrt125-kuvaa.
2. Todista syy yhdestä kohdasta ennen korjausta: (-265; -248), solu ja naapurikolmiot koejuuri-levyt:ssä. Python, jossa numpy: katso lajittele_reiat2.py:n ajotapa (/opt/homebrew/bin/python3 -I:llä ei ole numpya).
3. Korjaa säännöstä: kolmio ei lähde, ellei samalla korkeudella (±2 cm) tai sen yläpuolella ole korvaavaa pintaa kolmion sisäpisteissä. Sulje palautuksesta tarkoitukselliset poistot (levyt.json, ikkunakehyslevyt y 1,5-1,8). Tarkista 55 kolmiota y > 2 (625 m2, mm. y 9,72): oikea kulkupinta vai ei. Lisätyillä kolmioilla UV1 = 0: leivonta JU:n vuorolla, tai olemassa olevat kärjet (tee_aukot16.py).
4. Seitsemän syy yksitellen, r--380:n oikea pinta. Sitten -1305:n kohdat 6-7 (friisi: -151 ja jalka mitattava, punaisen siirtymä). S--185p9 ja s--81p1 seuraavaan listaan koodilla b0f94ac0a, kansio VS:lle (PT).
