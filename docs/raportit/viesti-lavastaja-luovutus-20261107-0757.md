# Lavastajan luovutus 7.11.2026 — riittää yksin (korvaa -0432)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstirajan takia (27 %).

## ENSIN: PT 07.57, omistajan päätös 07.56 (KK): muurin kivien sivujen tummennus kokeena
Kuva: docs/raportit/kaappaukset/omistaja-20261107/muuri-kiven-sivu-vaalea.png (Matkakirja-fable-työtila, ei origin/mainissa luovutushetkellä): muuri kulmassa 7°, kiven pääty tummalla lattialla. Tavoite: kivi istuu lattiaan eikä hyppää esiin.
1. Ensin mittaus tästä kohdasta: onko vaaleus kiven väri vai valo.
2. Sen mukaan tummennus kokeena. Ei vientiä, ei junaan, ei tähän koeversioon.
3. Pari samasta kohdasta ja rajauksesta, kohde kokonaan, KK:lle (local_37f7c945-e1a0-4638-90b8-93c389a36fbe) ja rivi PT:lle.
Ajo JU:n vuorolla; TF 219:n iPad-ajo ja käännös menevät edelle. Työtä ei ole aloitettu; kuvaa ei ole katsottu.

## Valmis: vyö z1 (PT 04.4x), raportoitu PT:lle 05.1x, vastausta ei tullut
Kohde: kiinankatajan latvuksen vaakasuora alapinta, y 2,16; kuvan kamera y 2,15 (kuvat-vyo4, mika). Rasteri on todennäköisesti latvushäivytys, ei saatu kiinni kesken. Palatsi.cs:1233 ohjaa häivytystä KameraPaikalla, ei kuvan kameralla. Miksi latvus palaa iskun jälkeen: ei mitattu. Koodi on PK:n; ei korjattu ilman PT:n sanaa. Koehaara lavastaja/vyo-diag (a1ad1999a) on vain paikallinen, ei mainiin; saa poistaa, kun asia on ratkaistu.

## Ennallaan (-0432)
- Nauha koejuuri-seina2 kokeena; väreily ei ratkennut (A/kuvat-seina3). Laikut VS:llä.
- Kartta odottaa PK:lla (EI VIELÄ); päätös KK:n aamun koonnissa (leivonta, sävyraja 7n/7o; PT:n suositus 7n + 7p, 7w ei). Tarkista, onko päätös tullut. Koko muuria EI saa sanoa korjatuksi.
- Korjaamatta: peli-B:n ristiviiva ja vihreä laatikko, peli-A:n irtonainen reunakivi, kujan sininen laatikko, katon alapinnan väreilevä kuvio.

## Varo
- Tarkista nimi vapaaksi ENNEN kirjoitusta, omana komentonaan: find, ei glob. Varatut lisäksi: seina1-3, vyo1-4.
- Ajoskripti: aja-vyo4.zsh on hyvä malli (tarkistaa VIKA-rivin; 3D-kuvan kamera on eri kuin paikka-rivin "kamera": katso "kuvan kamera").
- `valo katot 0` vaihtaa vain ulkoasun; kattoraportti listaa 24 ensimmäistä, ei lähintä.
- numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä. Vuoro JU:lta (JU ajaa itse jonossa ja kuittaa).
