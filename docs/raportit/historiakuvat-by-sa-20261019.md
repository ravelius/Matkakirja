# Historiakuvat: CC BY-SA sallittu, heikoimmat kuvat vaihdettu (Sisältökirjuri 19.10.2026)

PT:n erä (omistaja 19.10. 15.36, Raamattu 11.1): Commonsin CC BY-SA -kuvat sallittu tekijän nimellä kuten CC BY, muokattu (rajattu) kuva samalla lisenssillä.

## 1. kuva.py
BY-SA-suodatin pois: `lisenssi()` hyväksyy nyt `CC BY-SA x.y` (palauttaa tunnuksen `CC BY-SA 3.0` jne.); NC, ND, GFDL ja fair use hylätään edelleen. Docstring ja OHJE.md päivitetty. Työkalu ei ollut repossa (proto-3d/_tyo/...), joten kopio on nyt `tools/historiakuvat/kuva.py` + `OHJE.md`; kuvatyökalulla ei ole testejä. Tarkistettu yksikkökokeella: BY-SA 4.0/3.0/2.5 → OK, BY-NC, BY-ND, GFDL → EI, PD/CC0/CC BY → ennallaan.

## 2. Vaihdetut kuvat (katsottu täysikokoisina; lisenssi ja tekijä Commonsin rajapinnasta)

| kohde | ennen | jälkeen | lisenssi |
|---|---|---|---|
| Lontoo, Harrison, ankkuri "John Harrisonin H4-kello" | kirjan 1767 koneistopiirros, 595 px (PD) | **valokuva H4-kellosta Greenwichin Kansallisessa merimuseossa** (File:Harrison H4 chronometer.jpg, Colonel Warden at en.wikipedia), 882×1070 rajattuna (alkuperäinen 1102×1390); kuvateksti "Harrisonin H4-merikello Greenwichin Kansallisessa merimuseossa" | CC BY-SA 3.0 |
| Kööpenhamina, Absalon, ankkuri "piispa Absalon rakennutti" | mustavalkoinen valokuva 540×705 (PD) | **Vilhelm Bissenin ratsastajapatsas, pronssi ja Nikolaj-kirkon torni taustalla** (File:Biskop Absalon by Vilhelm Bissen - Copenhagen - DSC07748.JPG, Daderot), 1280×1707 (alkuperäinen 3240×4320); kuvateksti "Piispa Absalonin ratsastajapatsas, Vilhelm Bissenin veistämä" | CC BY-SA 3.0 |

Ennen/jälkeen-parit täysikokoisina: `/Users/Shared/Claude/proto-3d/_valmiit/historiakuvat-by-sa-vienti-20261019/ennen-jalkeen/` (Harrison-ennen/jalkeen, Absalon-ennen/jalkeen).

## 3. Vienti junaan 204 (Julkaisijalle)
`/Users/Shared/Claude/proto-3d/_valmiit/historiakuvat-by-sa-vienti-20261019/`: `esittely/lontoo-historia-v1/` ja `esittely/koopenhamina-historia-v1/` (päivitetty yksityiskohdat-JSON + yksi uusi kuva kummassakin; muut kentät ja kuvat ovat julkaistun version kanssa identtiset, tarkistuslippu `tarkistettu: true` säilytetty), LAHTEET.md. Vanhat kuvat jäävät R2:een (ei poistoa).

## Avoimet (muut)
- **Koodi (Pelikoodari):** yksityiskohdat-JSON:ssa on nyt lisenssi `CC BY-SA 3.0` ja `tekija`; pelin kuvatekstin/lähderivin pitää näyttää tekijä ja lisenssi (BY-SA 3.0, linkki Commons-sivulle `url`) kuten CC BY -kuville. Tarkista, että lähderivi ei oleta vain PD/CC0/CC BY.
- **Muut heikot historiakuvat, joita ei vaihdettu** (ei parempaa kuvaa tai kuva sopii aiheeseen): Kööpenhamina Nyhavn (Andersenin piirros 550 px, aiheeseen sopiva), Praha Rudolf II (Muchan piirros 666 px), Praha Kansallisteatterin palo (lehtikuva 760 px), Lontoon suuri löyhkä (Punch 1858, 758 px). Jos BY-SA-haku löytää näille valokuvia, tee seuraava erä; vaihdon vaatimus: kuva esittää tekstin kohdetta ja on täysikokoisena parempi.
