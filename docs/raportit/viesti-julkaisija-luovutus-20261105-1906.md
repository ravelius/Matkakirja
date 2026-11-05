# Julkaisija: luovutus 5.11.2026 klo 19.06

Rooli: Julkaisija (JU). Korvaa -1812:n ALOITA-osan; sen SITOVAT LINJAT, VIRHEET ja OPIT ovat voimassa (lue -1812 myös: git show origin/julkaisija-luovutus-20261105-1812:docs/raportit/viesti-julkaisija-luovutus-20261105-1812.md). T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt (lue 30 viimeistä riviä).

## ALOITA TÄSTÄ
1. Jono on tyhjä, L1 ja L2 vapaat 19.05. Tarkista `ps` ja lukot, sitten odota pyyntöjä.
2. Valovahti käynnissä (pid 90769, T/valovahti-tauko ennallaan). Lukkovahti on Monitorina ja kuolee nollauksessa: käynnistä uudelleen (Monitor, zsh T/lukkovahti.zsh, 30 min, uudelleen vanhentuessa).
3. Päätilin KK local_231e4bad: sen "OMISTAJAN PÄÄTÖS klo …" -rivit ovat omistajan päätöksiä.

## TAPA TÄLLÄ VUOROLLA
- Ajot taustalla: `zsh T/mac-ajo.zsh <linja> <sha> <skenaario> <kansio>`; pieni iPad: AJO_KOKO=2420,1668,0,40,2420,1580,2,1 eteen. NS:n kansio natiiviseppa-*, NUI:n julkaisija-pariisi-kyltit-<sha>. SHA:t näkyvät molemmissa työkalupuissa (yhteinen objektivarasto).
- LAV:n ajot aja<N>.zsh (kiinteästi PROTO_LINJA=1, lattiakoe/kuvat<N>-koe): kesto ja kuvamäärä käsin jonolokiin. PK ajaa itse: anna "ESIKATSELU NYT, PROTO_LINJA=2" ja kirjaa sen LUKKO VAPAA -rivi.
- NUI: KK:n linja "ei omaa ajoa": SHA odottaa seuraavaa Pariisin ajoa. Tulkintani (ei KK:n vahvistama): NUI ajetaan NS:n Pariisin opasajon rinnalla vapaalla linjalla. Uudempi SHA korvaa jonossa odottavan.

## TEHTY 18.12–19.05 (kaikki rc 0)
LAV lattia15 (265 s, 2 kuvaa), lattia16 (366 s, 4), lattia17 (392 s, 5), lattia18 (356 s, 3). PK f25ccb55a (190 s, 7), 8d2d95b9a (204 s, 9). NS 7d719ae76 (100 s, 3), 6fc1cda8b lauseet (77 s, 1), 6fc1cda8b google (72 s, 2), 8e217ddc7 (71 s, 2), d12a5d046 (83 s, 2), 265fa7a20 (83 s, 3; Google 429 → Ion-varadata, NS:n mukaan ei kelpaa), uusinta nopea2 (68 s, 3). NUI 4daf2c152 (194 s, 5), 2174c6785 (175 s, 5), 6ea480e73 (202 s, 6), 23485f753 (276 s lukkoa odotellen, 4). Kuvia en katsonut: tekijät tarkistavat ne itse.
- T/mac-ajo.zsh korjattu: yhden kuvan ajo kirjasi polun merkkimäärän kuvamääräksi (86). Korjaus todentui ajoissa 2 ja 3 kuvalla; yhden kuvan ajoa ei ole ajettu korjauksen jälkeen.

## AUKI
- LAV:n jokaisessa lattia-ajossa PUUTE odota-maailma aikaraja (häivytyksessä 1). Ajo kestää 356–392 s kuvamäärästä riippumatta; LAV:lle kerrottu, että kannattaa katsoa loki.txt:n aikaleimat. En ole mitannut, mihin aika kuluu.
- Google 429: NS:n uusinta odotti 2 min. Haku " 429" osui unity.logissa vain ruutunumeroon, eli hakuni ei todista, ettei rajaa tullut; NS tarkistaa portti.py:llä. Google-ajot NS:llä peräkkäin → väli jonoon.

## VIRHEET, JOTKA EIVÄT SAA TOISTUA
- Sanoin PT:lle ajon loppuvan pian tarkistamatta aikaa; se oli alkanut minuuttia aiemmin. Oikaisin. Katso `date` ja lukon `kuka` ennen arviota.
- Turvatarkistus esti lukukomennon, jossa oli zsh-silmukka ja ${(f)…}, vaikka siinä ei ollut poistoa. En muotoillut sitä uudelleen; rivi PT:lle. Pidä lukukomennot suoraviivaisina, ilman silmukkaa ja ${(f)…}-muotoa.

## OPIT
- Tallenna pysäytettäväksi mahdollisen ajon pid käynnistäessä (puuttui 4daf2c152:lta; ei pysäytetty). Jos rooli muuttaa pyyntöä kesken, kysy ensin, kelpaako käynnissä oleva ajo.
- Pyynnössä täytyy olla "mitä tämä ratkaisee" ja kuvamäärä (10.5). Riitti, kun NS:llä ne olivat skenaarion otsikossa; pyysin silti pyyntöön.
