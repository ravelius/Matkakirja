# Lavastajan luovutus 6.11.2026 12.51 (friisit ja on/pois-pari) — LUE TÄMÄ KOKONAAN

Pohja: -1233:n Tila, Avoin, Opetukset ja kohdat 2-6 pätevät (haara lavastaja/luovutus-20261106-1251, sama tiedosto mukana). Tämä korvaa järjestyksen. A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstivahdin takia (27 %). EI VIENTIÄ.

## Vientiehto nyt
-1233:n ehto (KK:n viisi kuvapistettä, 7 seinää, 3 tukkoa, 5 friisiä) ja lisäksi:
- PT: on/pois-pari tummista porrasaloista on viennin ehto. Räystäs-sha on 84872eaa9 (korvaa a309d43de:n, junassa 219).
- PT: friisin porras (kuvat5/r-k--151, x noin 650) on ehto, koska se näkyi uusimmassa juuressa.

## Tila
1. kuvat-friisi1 (JU L1, 35140432d, koejuuri-ovi1, 404: 4 tuttua) katsottu: f--151:ssä porras näkyy. Muut neljä katsottu 2000 px:n koossa, liitoksia ei rajattu täysikoossa.
2. Syy mitattu: naapurin friisi e -0,035, täytteen -0,020, kaikissa 5:ssä. Korkeus ja UV täsmäävät liitoksessa (-151,5):ssa. Laskettu: 1,5 cm antaa 1,65 m:n kamerasta noin 10 px täysikoossa. Laskettu, ei todistettu: todistus on friisi2.
3. Korjaus: tee_aukot15.py, rakenna11.py (kenttä `taka` 0,014), suunnitelma15.json, koejuuri-aukot15, koejuuri-ovi2 (= aukot15 + v127). Tasot mitattu: friisi -0,034, punainen -0,044.
4. kuvat-friisi2 (sk-friisi2, koejuuri-ovi2, 5 kuvaa samoista kameroista, liuku 0): JU L1:llä, odottaa NUI:n varausten väliä. KATSOMATTA.
5. kuvat-pari1 (84872eaa9, testikamera) EI KELPAA: kujan oikea seinä puuttuu kuvasta, räystäs ja friisi leijuvat, tummaa porrasta ei näy vasemmalla kummassakaan. Syy auki. Kysytty VS:ltä, johtuuko `v4 7`:stä; ei vastausta.
6. kuvat-pari2 (sk-pari2, 35140432d, koejuuri-ovi1, tarkastelukamera, VS:n alkuperäiset rivit): JU L1:llä friisi2:n jälkeen. KATSOMATTA.
7. PT:ltä kysytty: riittääkö pari2 ehdoksi, koska 84872eaa9:ssä ei ole tarkastelukameraa. Ei vastausta.
8. Taihedian pohjoisesta (kuvat-friisi1/ovi-taihedian-pohjoinen): sali näkyy, 4 kolmion kohdasta ei väitettä, ei mitattu. Kohta 5 -1233:sta tehty kuvan osalta.

## Seuraajan järjestys
1. Lue Raamattu 7.47.
2. Kun FRIISI2 AJETTU: tarkista 404, rajaa viisi liitosta täysikoossa, vertaa kuvat-friisi1:een (scratchpad-skripti katosi: rajaus 450-900 x 380-540 2000 px:n asteikolla f--151:lle). Katso myös, ettei 1 cm taaempi punainen näytä portaalta tai raolta, ja jalka: se siirtyi täytteen mukana, sitä ei mitattu. Tulos PT:lle; (-151,5):n rivi kiinni, jos porras on poissa.
3. Kun PARI2 AJETTU: kerro kansio VS:lle (local_3b36fe96-0199-4b17-9eb4-46a882ce7399). VS antaa tuloksen sinulle ja PT:lle. Seiniä ei muuteta porrasalojen takia ennen sitä.
4. PT:n vastaus pari2:n riittävyydestä; jos ei riitä, selvitä seinän katoaminen pari1:ssä.
5. Sitten -1233:n kohdat 2-4 (viisi kuvapistettä, -0939:n 5-6, PK:n rivi). Lopullinen juuri on nyt koejuuri-aukot15 / -ovi2, ei aukot14.

## Opetukset
- Sha, jossa ei ole tarkastelu-komentoa, ei ole sama kuva testikameralla: katso kuva ennen kuin annat parin eteenpäin. Pari1:n seinä puuttui, vaikka ajo meni läpi.
- Kun tasoero lasketaan kuvasta, käytä kameran todellista etäisyyttä ja nousukulmaa: aiempi 2,4 px oli väärin, ja selittämätön loppu jäi turhaan auki.
- Viestiä kirjoittaessa heittomerkki kuoressa kaataa koko komennon: pitkät kirjaukset tiedostoon.

## Työkalut (A/), uudet
tee_aukot15.py, rakenna11.py, sk-friisi1/2.txt, aja-friisi1/2.zsh, sk-pari1/2.txt, aja-pari1/2.zsh. Mittarit friisi151.py ja friisi5.py olivat scratchpadissa: kopioitu A/:hen.
