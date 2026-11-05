# Lavastajan luovutus 5.11.2026 2009 — LUE TÄMÄ, sitten muuri/KORJAUS.md loppu

Korvaa -1910:n. Ei vientejä. L = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/yleinen/lattiakoe. N = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/nd-maa-v9g. Vienti vasta PT:n sanalla ja PK:n vahvistuksella. Mac-ajot: Raamattu 10.5, JU:n vuorolla.

## Kaksi ajoa JU:lla, valmisrivit kuuluvat tälle sessiolle
1. N/aja-v6k30.zsh (fcba229ca, pistekerroin 0.465 PT:n säännöllä, kuvat N/kuvat: a1-lahto, g1-saapui). Linkki linjan 2 datakansioon, poistetaan lopuksi: tarkista, että se on poissa.
2. L/aja21.zsh (980bb115c, 5 kuvaa, L/kuvat21-koe), ND:n jälkeen. PT:lle kerrottu 20.09, että tämä on oma ajo; PT voi perua. Viesti oli PT:lle jonossa, ei kuittausta.

## Seuraava työ
A) Lattia21, kuvat kokonaan, saumat täysikoossa; PT odottaa tätä ennen vientisanaa (PT 20.08):
- Sävy aurinkoisesta: aja L/savy20.py (lisää versio 21). Tavoite tausta sRGB R/B 1,152. Kirkkaus laskee noin taustan tasolle (199; ero lattia17:n renkaaseen 218–229 kerrottava PT:lle, jos näkyy).
- z 675 ja z 700 eivät saa saada rajaa (s-rengas-pohj, z700-x300). Varjojen pitää pysyä tasaisina (lattia20: tumma viidennes 110–128).
- x 475 auringossa: sauma-ita-z520 ja sauma-ita-z120. Paikat valittu sokkona; jos varjossa, sano se, älä kirjaa OK:ta.
- Rinne: rinne-x136. Leivottu polku ei käytä normaalia, joten rinne ei saa enää valoa kaltevuuden mukaan.
- Sitten kuvat ja rivi PT:lle. Tiedossa: x 475:ssa laattakuvio katkeaa pystyyn (kuva 20).
B) ND v6k30, pari verrokkiin lokit/natiiviseppa-pallo-aani-fcba229ca/a1-lahto.png ja g1-saapui.png, PT:lle. Verrokki ajettiin pistekertoimella 1, tämä 0.465: terävyys ei ole verrattavissa. Katso, että lokissa lähde on Documents eikä R2 (unity.log, "omat mallit"); muuten kuva on vanha malli. Muurin kerroin [.19,.18,.21] on arvio (peli polttaa värin puhki, oikea kirkkaus tuntematon). Tavoite muuri noin 110–125, aukio hajonta 6–7, nurmi himmeämpi. Säätö: N/rakenna-v6k30.py (KIVI), N/tee_v9g.py; maa_v9g.ktx2 pitää koodata uudelleen (ktx create T7:n linssiseppa2-tyokalut/ktx, --encode basis-lz --qlevel 192 --generate-mipmap, DYLD_LIBRARY_PATH).
C) Sen jälkeen jono, KORJAUS.md.

## Tiedossa
- Lattia19 ok: poikkiviivat poissa, lila kaista ei palannut, ylempi kerros oli syy. Lattia21 perii tämän.
- Z 700:n hyppy: leipomaton pinta on varjossa ambient, leivottu saa oman tason (JuoksuValo.hlsl, JuoksuValaistusVarjolla). Siksi koko renkaan lattia on leivotulla polulla, kuva ei ole leivottu. Lattia nousu x 136:ssa 21 % kerrottu PT:lle, ei vastausta.
- Lattia20:n sävy oli oma virhe: viilensin kaistan (1,00; 1,03; 1,12) vanhaan renkaaseen, enkä kertonut sitä PT:lle ennen kuin PT huomasi. Sanoa muutokset itse.
- PUUTE (rengas-kauko, häivytyksessä 1) sama lattia18:ssa 90 s:lla; kohdetta ei tunnistettu.
- nd-jono4 ja _valmiit/…v6k29 ovat linkkejä T7:lle; $N/../ osoittaa T7:lle, käytä täysiä polkuja. v6k30 on sisäisellä levyllä. uusin-5.json lukevat julkaistutkin versiot: uusi osoitin tai PK:n vahvistus ennen vientiä.
- Rantamuuri: lod0/lod1 nd_kalkkikivi (värikerroin). Lod2:ssa ei kiveä, jyrkät maapinnat mediaani 82.
- Python: /opt/homebrew/bin/python3 ilman -I (numpy), paketin rakennus python3 -I.

## Jonossa, ei aloitettu (KORJAUS.md; LAV ei ole tarkistanut)
PK: konsoli, räystään alapinta, marmoriterassin nollatekselit; muurien ja porttien kiertosuunta + V4_gold-räystäs (KK: yksi yleinen korjaus generaattoriin, ei omaa ajoa, ei junaan); lähikoristeiden mitat h-zhongyoumen ja h-zhongzuomen; valkoinen viiva (13; -407) ja pystysauma; (-87,5; 302,5). S-rengas-itän harmaa vino levy. Vaakalevyt ilmassa x -420, pysty harmaa levy ja sälö x -60, puita ilman tyveä x 136 ja x 300.

## Lisäys 20.1x: ND ensimmäinen ajo katsottu
Muuri liian tumma (57/61/79, kuvat-kivi19). KIVI nyt [.45,.44,.42], paketti uudelleen rakennettu, toinen ajo pyydetty JU:lta aja21:n jälkeen (N/kuvat). Vaste ei ole lineaarinen, joten haarukoi. Nurmi hyvä. Aukion hajontamittaus puuttuu: mittaa puhtaalta alueelta. Polku rannalla kirkas, ei tilattu. KORJAUS.md:ssä.

## Lisäys 20.1x, PT 20.11: ND ODOTTAA, kohta B ei ole työn alla
Älä kytke uutta maaversiota. Omistaja hyväksyi pohja-alueen 4.11. Uusi maaversio saa muuttaa vain pallonäkymää, tai pari molemmista näkymistä KK:lle ennen kytkentää. Jonoon juoksupelin pintojen ja räystäiden jälkeen, ei omaa Mac-ajoa. Uusintaajo peruttu JU:lta; jos se ehti alkaa, katso kuvat ja jätä tulos odottamaan. PT hyväksyi aja21:n (5 kuvaa); sen jälkeen pari PT:lle, ei vientiä.
