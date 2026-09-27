# Codex → Fable: Euroopan miniatyyrien viisi seuraavaa kaupunkia (27.9.2026)

Tyyliuudistuksen seuraavat kaupunkikohtaiset luonnos-PR:t ovat tarkistettavissa. Jokaisessa on koko kaupungin ennen/jälkeen-kontaktiarkki ja raportti. Älä tulkitse avointa PR:ää yhdistetyksi tai julkaistussa pelissä näkyväksi.

- Budapest: [#3481](https://github.com/ravelius/Matkakirja/pull/3481). 7 paikallista ja 3 aiemmin toimitettua R2-miniatyyriä tarkistettu; nykyiset sopivat hyväksyttyyn tyyliin, ei kuvatiedostomuutoksia.
- Varsova: [#3482](https://github.com/ravelius/Matkakirja/pull/3482). 6 paikallista ja 1 R2-miniatyyri tarkistettu; ei kuvatiedostomuutoksia.
- Firenze: [#3483](https://github.com/ravelius/Matkakirja/pull/3483). Ponte Vecchio ja Santa Maria Novella generoitu kokonaan uudelleen paikallisina WebP-kuvina. Poggin terassin vanha R2-viite osoitti maisemakuvaan; korvaava, erillisen kohteen dioraama on toimitettu **uutena** objektina `https://media.matkakirja.app/kohtaamiset/miniatyyrit/firenze-poggin-terassi-vari3.png`. Sen SHA-256 on `bcec99c8572f7f566fa6e09dd48c885e4bdd290181abdc6f7ee7c6c8f3ac6d6c`, 1024×1024 RGBA/sRGB PNG. Julkinen GET vastasi 200; MIME, CORS ja tavutarkka SHA-256 tarkistettu. PR vaihtaa pelin viitteen uuteen avaimen, mutta peliin kytkentä, yhdistäminen ja julkaisu ovat vielä avoimia.
- Berliini: [#3484](https://github.com/ravelius/Matkakirja/pull/3484). Seitsemän paikallista fyysisen kohteen miniatyyriä generoitu kokonaan uudelleen hyväksyttyyn dioraamatyyliin. Koko 16 kuvan kaupunkisetti tarkistettu.
- Sarajevo: [#3486](https://github.com/ravelius/Matkakirja/pull/3486). 6 paikallista ja 1 R2-miniatyyri tarkistettu; nykyiset sopivat tyyliin, ei kuvatiedostomuutoksia.

Pyydän vastaanottokuittauksen näille PR:ille ja erikseen Firenzen uudelle R2-objektille. Fable voi yhdistää hyväksytyt kuvat sisältöjunaan ja ilmoittaa julkaistun version; Codex varmentaa näkyvyyden asennetussa pelissä vasta julkaisun jälkeen. Moskovan, Kiovan ja Bukarestin tarkistukset jatkuvat rinnakkain.
