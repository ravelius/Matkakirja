# Lavastajan luovutus 7.11.2026 04.32 — riittää yksin (korvaa -0354)

A = /Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot. Loki: muuri/KORJAUS.md, loppu. Luovutus kontekstirajan takia (26 %).

## Tila
JONO TYHJÄ. PT:n 03.5x ja 04.3x tehty, tulos lähetetty PT:lle 04.31; vastausta ei vielä ollut. Älä aloita uutta korjausyritystä ilman PT:n sanaa. Ei junaan, ei leivontaa, ei vientiä.

## Taso 1, seinät ja koristeet
- Nauha: koejuuri-seina2 (tee_seina1.py + tee_seina2.py; 7p + palkkimaalaus: tausta-lod0 ja osat.glb). Tasaiset laatat poissa kamerassa A; PT: kelpaa kokeena kamerassa A. Parit A/kuvat-seina2 (pari-nauha-A, rajaus-nauha-A).
- Syy: varjostimen Maalaus (JuoksuMaailma.shader) palkkiin. Kujamuureissa palkki on osat.glb:n V4_konsoli, y 4,3-4,52.
- Rajat: kulmaosat ja lod1/2 ennallaan; viisi taustan palaa ilman V4_palkkivyo-materiaalia ennallaan (mm. kk-tausta-1-3); valo-UV leipomatta. Räystään tiilet näyttivät rajauksessa sileämmiltä kuin 7p:ssä: syytä ei mitattu, vertailuajon sha:ta ei tarkistettu.
- Väreily EI ratkennut (A/kuvat-seina3, mittaa-vareily.py): kamera A, ero > 25: nauha 29,8 % (1 cm) ja 63,8 % (3 cm), friisi 13,3 % ja 34,6 %. Mittari ei erota väreilyä tiheän kuvion siirtymästä; tarvitaan liiketallenne tai iPad-mittari.
- Peli-B: nauhaa ei näy. Kujakamera (-188,5; 403,6; y 4) katon alla, ei tietoa nauhasta. Uusi kujakamera tarvitaan, jos PT pyytää; a1-kuja käytti y 1,7.

## Laikut
Varjostinkohina (JuoksuK11Rappaus 0,16/0,09/0,35; JuoksuRappausRae w 0,25); QA-koe poistaa silmin, sävy kirkastuu, k11 0 vaihtaa myös kuvien mitat. Valokartan osuutta ei mitattu. PT antoi VS:lle (vakiot, keskisävy ennallaan). Arvot lähetetty VS:lle 04.2x, viesti oli jonossa; tarkista, jos VS kysyy. Ei LAV:n työ.

## Korjaamatta (ei kuulunut kahteen)
Peli-B:n ristiviiva ja vihreä laatikko, peli-A:n irtonainen reunakivi, kujan irrallinen sininen laatikko, katon alapinnan väreilevä kuvio. Tarkkaa syytä ei mitattu.

## Kartta ja leivonta (ennallaan)
Päätös KK:n aamun koonnissa (leivonta, sävyraja 7n/7o; PT:n suositus 7n + 7p, 7w ei). Kartta odottaa PK:lla (EI VIELÄ); päätöksen jälkeen annat PK:lle juuren nimen. Koko muuria EI saa sanoa korjatuksi.

## Varo
- Tarkista nimi vapaaksi ENNEN kirjoitusta, omana komentonaan: find, ei glob (zsh kaatuu). Varatut lisäksi: seina1-3.
- Kuvissa täysikoossa katsottu vain rajaus-nauha-A. Muut arkilla.
- numpy/scipy: /opt/homebrew/bin/python3 ilman -I:tä. Vuoro JU:lta (JU ajaa itse jonossa ja kuittaa).
- Tila-tiedoston rivi päivitetty; lue tämä ensin.
