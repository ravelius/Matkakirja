# Antananarivo — C-luonnos 12.10.2026

Rajattu lähdekooste ja uusi tekstiluonnos kirjoitettu omaan NAS-kaupunkikansioon. Työ ei ole hyväksytty täysi kaupunki eikä pelikytkentä. Ohjeina luettu oman kloonin AGENTS.md, paakaupungit-pilvi/CODEX.md, PILVIOHJE luvut 3–7, 13 ja LISÄSÄÄNTÖ sekä sitovat resepti-, kaupunkilehti- ja manner/Asia-linjaukset. Dakar-malli luettu rakenteena omasta väliaineistosta.

## Tekstit

- Kaupunkiartikkeli: intro ja kolmikappaleinen Lue lisää.
- Kansi 4 nostoa, historia-teemasivu 4 nostoa ja eri aihetta kysyvä minitehtävä.
- Matkailijaosio, opas 5 jaksoa, 5 parasta-riviä ja 4 hyvä tietää -riviä.
- Visa 5 kysymystä, tasot 1–3; 3 tietoa ilman isoisän ääntä.
- Kartta partial: Anosy-järvi ja yksi kaksikappaleinen kohdejuttu, oma WP-piste.
- Kaikki kuva- ja credit-kentät tyhjät; sää null.

Nostot 463–493 merkkiä, ei lisätty lähteettömiä väitteitä merkkirajan vuoksi. Ensimmäisen version intro 995 merkkiä, Lue lisää 962, kohdejuttu 840. Lopulliset mitat omassa `mitat.json`:ssä. Maalehden kansiaiheet ja Ambohimanga vältetty.

## Alkuperäisen tarkistimen tulos

`node paakaupungit-pilvi/tyokalu.mjs tarkista e08 antananarivo --lyhyt` tehty NAS-kloonissa. Ensimmäinen ajo: **19 virhettä, 2 varoitusta, 0 kuvaa**, exit 1. Jokainen virhe on `tiedosto puuttuu` seuraavissa rooleissa: valokuva 1, kansikuvat 3, kannen nostot 4, matkailijalle 1, oppaan jaksot 5, teeman nostot 4, kohdejuttu 1. Tarkistinta ei muutettu.

Varoitusten näkyvää tulostusta varten alkuperäinen tarkistin ajettiin myös ilman --lyhyt-valitsinta. Todelliset varoitustyypit: `kohteita 1 (pohjataso 6; perustele RAPORTTI.md:ssä)` ja `saatiedot puuttuu (kirjaa syy RAPORTTI.md:hen)`. Omistusraja ei salli erän RAPORTTI.md:n muokkausta: nämä perusteet annetaan tässä ja faktapohjassa pääsessiolle. Tekstien tai muun rakenteen virheitä/varoituksia ei ollut.

## Avoinna ja kuvaputken puutelista

19 kuvaroolia: valokuva, kolme eri yleiskansikuvaa, kahdeksan noston aihekuvaa, matkailijalle pysty, viisi opasjakson kuvaa ja Anosy-järven kohdekuva. Järven saaren muistomerkkiä ei saa ottaa mukaan kohdekuvaksi; teosraja ei varmennettu. Kuvat tulevat erillisestä putkesta eikä niiden nimiä tai Commons-crediittejä ennakoida.

Kartta ei ole valmis (1/6–8). Muiden kohteiden pisteet, paikkahistoria ja mahdolliset tekijärajat avoinna. Sääauditointi, oppaan muuttuvien palvelutietojen D-varmennus, D/E/F, toimituksellinen hyväksyntä, integrointi ja julkaisu avoinna. Ei Git-operaatioita eikä pelitiedostomuutoksia.

Lähdetallenteet, robots-todisteet, tarkistinlokit ja tiedosto-SHA:t: `sessio-72-20261011/valiaikainen/nopea-e08-antananarivo/`.

## Primäärilähteen lukeminen ja loppuajo

Madagascar Tourism -organisaation oma Antananarivo-sivu luettu tallenteesta `tourism-city.txt`. Se vahvistaa kaupungin aseman, yläkaupungin historiallisen luonteen ja Analakelyn kauppapaviljongit. Sen markkinointilukuja, eläinsuperlatiiveja, matka-aikoja ja selitystä ”tuhannen aarteen kaupungista” ei käytetty. Ravinala Airports -operaattorin sivu luettu: Antananarivon kansainvälisen lentoaseman toiminta vahvistuu.

Lopullinen intro 974 merkkiä. Lopullinen alkuperäisen --lyhyt-tarkistimen ajo `tarkistus-lopullinen.txt`: **19 virhettä, 2 varoitusta, 0 kuvaa**, exit 1; virheet edelleen yksinomaan 19 puuttuvaa kuvatiedostoa. Ei tekstien tai rakenteen virheitä. Kartan määrä ja sää ovat yllä nimetyt kaksi varoitusta. Lopulliset SHA256:t `SHA256SUMS.txt`:ssä; ei commit-SHA:ta, koska Git-operaatiot kuuluvat pääsessiolle.
