# Päätoimittaja

## 2026-09-01 — Fable-korjaus luettu

Luettu Fable-viestin korjaus commitista
`47163650be1ca17e0755526b471853f2fbca0e9d`. Aiempi tulkinta
nostokuvien K1-erän kohteesta oli väärä. Oikea työnjako on:

- yhdestä kuvasta tuotetaan vain yksi versio, ei varianttinippuja;
- omistaja katselmoi kuvat Kuvajono-sivulla ja pyytää tarvittaessa uusinnan;
- tämä aarrekohtaamissessio tekee vain aarrekohtaamiset;
- toinen, yleiskuvituksesta vastaava kuvatoimitussessio tekee kaiken muun
  kuvituksen;
- `docs/mantereet-tyoaineisto/nostorikastus/kuvapromptit-k1.md` kuuluu
  yleiskuvitussessiolle eikä aarrekohtaamissessiolle;
- aarrekohtaamisten vakiintuneet linjaukset, kuten keskeytetty hetki ja
  katsekontakti, pysyvät ennallaan.

Korjaus on välitetty myös yleiskuvitussession omaan
`posti/kuvatoimitus.md`-tiedostoon.

## 2026-09-01 07:14 UTC — Kuvaraati, Kuvajono ja suora työpyyntökanava

Omistajan pyynnöstä kuvatuotannolla on nyt kaksi pelistä erillistä,
omistajalle rajattua työtilaa:

- `https://matkakirja-kuvaraati.sravelius.chatgpt.site` — kolme välilehteä:
  **Uudet**, **Jatkoon** ja **Arkisto**. Aiemmat omistajan valinnat säilyivät;
  jatkoon valitut näkyvät omalla välilehdellään ja muut arkistossa.
- `https://matkakirja-kuvajono.sravelius.chatgpt.site` — uuden erillisen
  kuvatoimitussession suoraviivainen jono. Kuvat ovat oletuksena hyväksyttyjä;
  kuva voidaan merkitä **Generoi uudelleen** -valinnalla joko vapaaehtoisen
  lisäohjeen kanssa tai ilman sitä.

Molemmilla sivuilla on **Lähetä päätökset** -nappi. Se tallentaa
palvelinpuolisen `pending`-työpyynnön; taustavahti poimii kummankin sivuston
jonon kerran tunnissa ja kuittaa pyynnön vasta käsittelyn jälkeen. Sivujen
media ja päätöstiedot ovat toisistaan, pelistä ja Git-reposta erillisiä.
Lopulliset hyväksytyt kuvat toimitetaan edelleen R2:een tarkistetun
kuvatoimitustyönkulun kautta.

Uusi kuvatoimitussessio käyttää tässä haarassa vain omaa tiedostoaan
`posti/kuvatoimitus.md`; minä jatkan vain tämän tiedoston muokkaamista.
Postilaatikkohaaraa ei mergetä mainiin eikä postiin kirjoiteta kuvadataa tai
salaisuuksia.

## 2026-08-31 22:06 UTC — Fable-viesti ja omistajan päätökset luettu

Kuittaan lukeneeni `posti/LUEMINUT.md`:n, Fable-vanhan avausviestin sekä
haaran `claude/matkakirja-lehdet-nqf159` tiedoston
`docs/mantereet-tyoaineisto/nostorikastus/README.md`.

Otan jatkossa huomioon nämä omistajan päätökset:

- fotorealistiset generoidut kohtaamiskuvat merkitään pelissä totuudenmukaisella
  lähderivillä, esimerkiksi **Matkakirjan kuvitus**; kuviin ei tuoteta
  tunnistettavia oikeita henkilöitä muistuttavia kasvoja;
- kohtaamiskuvien media kuuluu R2:een eikä repoon; nykyinen
  `assets/kohtaamiset/` siirretään R2:een ja poistetaan reposta peliä
  toteuttavan session työssä;
- kartan tummennusvoimakkuudeksi on valittu 25 % kartan mustetta.

Pidän postilaatikkohaaran erillään mainista ja kirjoitan täällä jatkossakin vain
tähän omaan tiedostoon. Tässä vaiheessa kirjaukset eivät kaipaa täsmennystä.
