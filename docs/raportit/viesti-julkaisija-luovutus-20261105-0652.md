# Julkaisija: luovutus 5.11.2026 klo 06.52 (Macin kello)

Rooli: Julkaisija (JU). Korvaa -20261104-2216:n ALOITA- ja jono-osat; sen OPIT ja TF-koe-komento voimassa. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt.

## ALOITA TÄSTÄ
1. iPad-jono on tyhjä, ketjuja ei ole. Odota PT:n sanaa, että iso iPad on käynnistetty uudelleen ja auki.
2. Sen jälkeen heti: PK-sarja, sitten NS. Rungon nimi kummassakin ennallaan:
   zsh T/pk-hajonta.zsh 99999 ja zsh T/ns-astc.zsh <PK:n pid>, nohup + lokit samoihin (T/pk-hajonta.log, T/ns-astc.log). Käännökset ovat valmiit.
3. Monitor: tail -n0 -F T/ns-astc.log T/pk-hajonta.log | grep -a --line-buffered -E 'EI RIVIÄ|NS-ASTC|VALMIS normaali|^AJETTU |PK-HAJONTA|^VIKA|käynnistys yritys 3'
4. Rivit: NS: kansio lokit/natiiviseppa-normaali-astc-9ca48d7a2 (parit/ + kuvajako.txt) ja AJETTU-rivit. PK: pk-hajonta.log:n s1–s3- ja juoksu-rivit.
5. TF-lähtö vain PT:n välittämällä sanalla; KK pyytää omistajalta. Komento luovutuksessa -2216.

## TEHTY TÄLLÄ VUOROLLA
- TF-koe valmis 4.11. 23.32. Korjatut luvut T/tf-koe-tulos-korjattu.txt, viety KK + PT. PT: uudestaan-aika a5323:lta jää mittaamatta, ei uutta ajoa. Kartta 60bd 5118 Mt on aito (loki alkaa 23.19.20, signal 9, muistikuolema päätelmä).
- Viivat 1b/2b 10/10 + 10/10, VS:llä. Suomi-syy ja tapa2 2d8ec025c konsolittomina, VS:llä (kansiot lokit/julkaisija-suomi-syy-2d8ec025c-konsoliton ja lokit/julkaisija-suomi-tapa2-2d8ec025c). Omistajan 2.207: kartan kuva-ajot ennen muistiajoja, vahti pois vain niissä.
- Valovahti uudelleen 5.11. 06.50 (pid 15327), pysyvä taukolippu T/valovahti-tauko. /tmp-lippu katosi 4.–5.11. yöllä, syy auki; 6 turhaa käännöstä 00.00–05.45.

## OPIT
- Konsolikäynnistys antoi error 22:n joka yrityksellä 4.11. 23.43 alkaen (viim. onnistunut 23.37), syy auki. Pelkkä launch toimi: T/vs-suomisyy3.zsh on konsoliton malli (muisti-tarkka päälle, lokirivit L-riveiltä). NS ja PK tarvitsevat konsolin.
- tf-koe-mittaus: EPOCHSECONDS tyhjä ilman zmodload zsh/datetime, ajat 0 s. muistivahti-tulos.txt jää laitteelle: 60bd:n rivit vanhoja. Lue muisti aina muisti-tarkka.log:sta. Ajat saa L-riveiltä (ms alusta).
- Odottavan ketjun vaihto: tapa ensin vanha odottaja, muuten se karkaa lukkoon. Lapset haettava ennen emon tappoa (ajo-muisti jäi kerran 45 s käyntiin).
- kaanna-vapaa jäi 30 min silmukkaan, vaikka lukot olivat vapaat ja oma pgrep tyhjä; syy auki. Käännöksen ollessa valmis oman kaanna-vapaa-lapsen tappo jatkaa ketjua.
