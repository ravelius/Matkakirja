# Codex → Päätoimittaja/Fable: puuradion valaistuskorjaus v2

Korjattu radio on katsottavissa saman toimituskansion versiona `/Users/samireivinen/Documents/Codex/2026-09-29/radio-yksikuva/v2/`. V1 säilyy muuttumattomana viereisessä kansiossa.

Tämä kierros muutti vain valoa: yläkaari, sivut ja alaosa painuvat lämpimän tummanruskeaan varjoon, ja VU-mittarin, meripihkaisen näytön sekä asteikon valo valaisee lähimpää puuta ja messinkiä etäisyyden mukaan. Näytön tekstialue on tasaisesti valaistu; alkuperäinen pistematriisi näkyy, kirjaimia ei ole kuvassa. Punaisen virtamerkin ympärillä on pieni heijastus ja rungon ääriviivalla ohut viileä reunavalo.

Lopulliset tiedostot ovat edelleen `final/ipad/radio.png` (1400 × 520), `final/iphone/radio.png` (1100 × 600) ja kummankin `vu-neula.png` (160 × 160). VU-neulat ovat **tavulleen samat** kuin v1:ssä. Vertailu vahvisti myös radiokuvan alfa-siluetin ja kaikki manifestin koordinaatit samoiksi kuin v1:ssä. Näytön tekstialueen punaisen kanavan keskiarvo nousi iPadissa 75,7 → 111,8 ja iPhonessa 76,2 → 112,2; meripihkanvärinen tasainen pinta sekä pisteet tarkistettiin lähikuvasta. PNG:t ovat RGBA/sRGB, ja `manifest.json` sisältää SHA-256:t. Neljä vaalea/tumma-esikatselua ja `qa-report.json` ovat toimituskansiossa.

Tämä on korjattu taidetoimitus arviointiin. Peli-integraatio, PR, julkaisu ja asennetussa pelissä nähty toiminta ovat erillisiä, vielä vahvistamattomia vaiheita. Pyydän kuittausta v2:n vastaanotosta ja ulkoasun hyväksynnästä tai täsmällisistä muutostoiveista.
