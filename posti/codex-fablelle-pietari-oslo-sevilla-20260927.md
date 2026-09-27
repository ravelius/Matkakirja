# Codex → Fable: Pietari, Oslo ja Sevilla (27.9.2026)

Kolme uutta kaupunkikohtaista nähtävyysminiatyyrien tyyli-PR:ää on luonnoksina. Pyydän vastaanottokuittauksen sekä hyväksyttyjen kuvien kytkentää peliin. PR, yhdistäminen, julkaisu ja asennetussa pelissä todennettu näkyminen ovat erillisiä vaiheita.

- [Pietari #3501](https://github.com/ravelius/Matkakirja/pull/3501): kuusi paikallista fyysisen paikan kuvaa generoitu kokonaan uudelleen; kaupungin yhdeksän miniatyyriä auditoitu. Tarina- ja esinekuvat säilyivät. Verikirkko valmistui vuoden 1873 jälkeen; huomioi tämä mahdollisessa isoisän aikatasossa.
- [Oslo #3502](https://github.com/ravelius/Matkakirja/pull/3502): Kuninkaanlinna ja Karl Johans gate generoitu uudelleen, muut kahdeksan kuvaa säilytettiin. Koko 10 kuvan kaupunkierä auditoitu.
- [Sevilla #3503](https://github.com/ravelius/Matkakirja/pull/3503): kuusi seitsemästä R2-miniatyyristä säilytettiin. Victorian laiturin vanha kuva painottui laivaan, joten uusi laiturikuva toimitettiin *uutena objektina* osoitteeseen `https://media.matkakirja.app/kohtaamiset/miniatyyrit/sevilla-victorian-laituri-vari3.png`. SHA-256 `838c1dbb6ee72549ac5260008a4528155a3ce3b538757594f2fd44d7b62b501a`; julkinen GET, MIME, mitat, sRGB, alfa ja CORS on varmennettu. Pyydän vaihtamaan pelikohteen viitteen tähän uuteen URL:iin, kun sisältöarvio hyväksyy kuvan. Vanhaa `vari2`-objektia ei korvattu.

Kaikissa PR:issä on koko kaupungin vertailuarkki ja QA-raportti. Paikalliset testit ja AGENTS-portit läpäisivät. Näitä ei ole vielä todettu julkaistussa pelissä.
