# Kuvatoimitussessio

## 2026-09-01 — Korjattu työnjako Fablelta

Fable-korjaus on luettu commitista
`47163650be1ca17e0755526b471853f2fbca0e9d`. Tämä sessio on
**yleiskuvitussessio**: se tekee kaiken muun Matkakirjan kuvituksen paitsi
aarrekohtaamiset.

Sitovat tarkennukset:

- yhdestä kuvasta tehdään vain yksi versio, ei varianttinippuja;
- omistaja katselmoi kuvan Kuvajono-sivulla ja pyytää sieltä tarvittaessa
  kokonaan uuden generoinnin, lisäohjeella tai ilman;
- nostokuvien K1-erä tiedostossa
  `docs/mantereet-tyoaineisto/nostorikastus/kuvapromptit-k1.md` kuuluu tälle
  yleiskuvitussessiolle;
- aarrekohtaamiset kuuluvat erilliselle aarrekohtaamissessiolle, eikä niiden
  tehtäviä tai erityisiä henkilökuvalinjauksia sekoiteta yleiskuvitukseen.

Aiempi tulkinta, jossa K1 olisi ohjattu aarrekohtaamissessiolle, on hylätty.

## 2026-09-01 07:14 UTC — Erillinen kuvajono ja R2-toimitusreitti

Uusi Matkakirjan kuvatuotannon arviointijono on osoitteessa
https://matkakirja-kuvajono.sravelius.chatgpt.site. Se on erillään
Matkakirja-pelistä ja aiemmasta Kuvaraati-sivusta.

- Kaikki uudet kuvat ovat sivulla oletuksena hyväksyttyjä.
- Kuvakohtainen **Generoi uudelleen** -checkbox siirtää kuvan uuteen,
  kokonaan alusta tehtävään generointiin.
- Checkboxin alla on valinnainen lisäohje. Uudelleengeneroinnin saa
  jonoon myös ilman lisäohjetta; silloin pohjana ovat alkuperäinen prompti,
  omistajan yleiset kuvalinjaukset ja kuvatoimitussession oma laatutarkistus.
- **Lähetä päätökset** tallentaa palvelinpuolisen käsittelypyynnön
  `work_requests`-jonoon tilassa `pending`, josta kuvatoimitussessio voi
  lukea työn myöhemmin.

Turvallinen toimitusreittini on: sisäinen ImageGen → täysikokoinen
visuaalinen tarkistus → 1536 × 1536 JPEG ja sRGB IEC61966-2.1 →
välivarasto → GitHub Actions repo-secreteillä → R2:n `kohtaamiset/`-polku
→ metadata-, MIME-, CORS- ja takaisinlukutarkistus. Media ei käy eikä jää
Matkakirja-repoon. Ennen vientiä tarkistetaan nimiristiriita, eikä olemassa
olevaa R2-objektia korvata ilman omistajan nimenomaista lupaa.

Tämä `claude/postilaatikko`-haara on vain sessioiden viestikanava. Sitä ei
koskaan mergetä `main`-haaraan. Kirjoitan täällä vain omaan
`posti/kuvatoimitus.md`-tiedostoon; postiin ei tule salaisuuksia eikä
kuvadataa.
