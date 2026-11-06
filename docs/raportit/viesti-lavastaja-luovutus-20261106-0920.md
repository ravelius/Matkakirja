# Lavastajan luovutus 6.11.2026 09.20 (seinät aukkoihin) — LUE TÄMÄ KOKONAAN

Pohja: -0905:n (git show b274c9ee7:docs/raportit/viesti-lavastaja-luovutus-20261106-0905.md) Opetukset, KK:n ja PT:n linja ja Työkalut pätevät. Tila ja järjestys korvattu tällä. Työkansio A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md (lopun 4 kirjausta). Luovutus kontekstirajan takia.

## KK:n linja 09.1x
Punainen levy kuuluu listaan, jos se näkyy rikkinäisenä kulkualueelta. Älä jää odottamaan. Tulos KK:lle PT:n kautta. Ei vientiä ennen valmista listaa.

## Opetukset
- Automaattilinja (suunnittele.py) ei kelpaa lisäyksille: 18/19 lipulla. Älä rakenna sen linjoille ilman näyttöä.
- Kamera vain T-ruudusta: tarkista ruutu ennen ajoa. Aukon no + 14 m päätyi toisen rakennuksen huoneeseen, ja 8 kameraa oli T:n ulkopuolella.
- T on kartalla yksi alue, joten yhtenäisyys ei kerro, pääseekö pelaaja kapealle kaistalle.
- Epäilin elävää varjoa ja osasarjan moduuleja: kumpikin kumottu. Kerro epäily epäilynä.

## Tila
`koejuuri-aukot8` = aukot7 + 5 tiheää friisiä. Ei vientiä. KK:lle ei ole lähetetty paria.
Tehty:
- Varjot 0 (kuvat-j): elävä varjo ei ole syy. Nauha, suorakaiteet, pystynauha ja porrasmuoto jäävät.
- 5 friisiä (kuvat-k, vain 900 px:n arkki): friisi samalla korkeudella kuin naapuri. Saumoja ei katsottu täysikoossa: tee rajaukset ennen väitettä.
- Punainen levy (-153; 290): näkyy kulkualueelta, lähimmillään noin 1 m (säde, kuva g--155-pohjoinen). KUULUU LISTAAN. Ei korjattu, syytä ei tutkittu.
Auki:
- Tumma nauha friisin yllä: a5:n lisäksi (-189,4), (-188,8), (-188,5). (-151,5) ja (-136,2): tumma suorakaide, (-151,5):n friisin sävy vaihtuu liitoksessa. a5:ssä sama pinta ja sama leivottu arvo nauhassa ja sen yllä, joten atlas ei selitä. Tarkista JuoksuLattia.shader, rappaus maailman koordinaateissa (rivit noin 309-316), ja mitä tapahtuu friisin yläreunan korkeudella.
- (-155,6):n suorakaiteet ovat naapuriseinällä ja tummentavat friisiäkin: mallin, syy mittaamatta. Ei tutkittu, ovatko ne listalla.
- k--188p8: musta ja tummanpunainen suuri pinta oikeassa reunassa, ei tutkittu.
14 lisäyksen seinää: YHTÄÄN EI RAKENNETTU. kuvat-l (15 kuvaa, 660 px:n arkki, ei täysikoossa), yksi kuva per kohta:
- Ehjä seinä, ei avointa aukkoa kuvassa: (-275,8), (206,2), (163,8), (204,7), (155,1), (-81,1), (-107,6).
- Vain seinä pistemäisesti: (-185,9), (-247,0), (-69,8), (-144,4), (-100,2).
- Kohde ei kuvassa, huone toisesta rakennuksesta: (-105,4), (-163,5), (-113,1).
- Kuvaamatta: (-120,8), (-95,2; 345,5), (-95,2; 351,1), (-133,4).
- Kameran ruutu ei T: (-185,9), (-247,0), (-69,8), (-105,4), (-163,5), (-113,1), (-95,2; 351,1), (-133,4).
- (-144,4): ei T-näytteitä no-puolella, no voi olla väärin päin.
Avoin kysymys: suunnitelman linja kulkee monessa tilassa neljän seinän sisällä (a7/lisays-arkki.png). Kaista seinien sisällä voi olla karttavirhe (päätelmä, ei todistettu). Jos se on, seinä on turha ja kohde putoaa listalta PK:n vahvistuksella.

## Seuraajan järjestys
1. Kysy PK:lta (kartta, ei kuvia): pääseekö pelaaja seinien sisäiselle T-kaistalle 14 tilassa, vai onko se kartan vuoto. Vastaus voi pudottaa suurimman osan listasta.
2. Jäljelle jääville kuvat T-ruudusta, 1,5-5 m linjasta kohti linjaa (tee_sk8l.py mallina, lisää T-tarkistus mittaa8e.py:stä). 25-28 m:n aukot ensin. Vasta sitten seinät uuteen juureen (tee_aukot8.py mallina, kaistan poisto mukana).
3. Friisit: rajaukset täysikoosta kuvat-k:sta. Nauhan syy (yllä), jos se näkyy täysikoossa.
4. Punainen levy: mallin korjaus listalle, kohde ja syy ensin.
5. -0905:n kohdat 4-6: paljaan taustan näkyvyys (54,8) ja (154,7), kaista (-251,8) myös v115- ja v124-juurissa, pari PT:lle, yksi vienti, PK vahvistaa viittaukset.

## Työkalut (A/), uudet
tee_sk7v.py (varjot), tee_aukot8.py -> rakenna8.log, sk-aukot8.txt, mittaa8.py (liitoskärjet), mittaa8b.py (säde pikselistä, uv ja atlas), mittaa8c.py (muut paketit ja osasarja), mittaa8d.py (näkyvyys kulkualueelta), mittaa8e.py (T-puoli ja kameran ruutu), suunnittele8.py -> lisays-suunnitelma.json/.png, tee_sk8l.py.
