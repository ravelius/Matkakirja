# e06 — A-vaiheen faktakokoaja

Alkuaika: 2026-10-11T20:04:50+03:00 (Europe/Helsinki).
Pohja: e4f2845b3a82874550481fda26528df065820232. Haara: paakaupungit-e06-codex.
Oma klooni: /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/e06.

Vaihe 0: yhdeksän kontekstia ja saa-syote.json luotu alkuperäisellä tyokalu.mjs:llä. Sääaineisto odottaa pääsession alkuperäistä saa-ajoa; lukuja ei kopioida käsin.

| Kaupunki | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| libreville | lähteiden luku käynnissä | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| ciudaddelapaz | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| saotome | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| bangui | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| brazzaville | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| kinshasa | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| luanda | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| kigali | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| gitega | jonossa | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |

A-valmis tarkoittaa vain lähteistettyä faktapohjaa. Kaupunkia ei ole kirjoitettu, kuvitettu, kytketty tai julkaistu.

## Poikkeukset ja lähdekuri

- Omistajan 11.10.2026 lähdepoikkeus: robots-sallitut tavalliset /wiki/-lähdesivut hyväksytään estettyjen API-polkujen sijaan. /w/, /api/ ja Commons Special:Search ovat kiellettyjä. Kaikki lähdesivut haetaan yhteisellä sallittu_haku.py-apurilla (Claude-User ja Matkakirja, redirectit, lähdevarasto, globaali 1/s). Commons-hakuja tai lisenssivalintoja ei tehdä tässä A-sessiossa.
- Omistajan rajaus: erillinen faktakokoaja, ei apuagentteja tai lisäsessioita, ei postilaatikkoa eikä viestejä pääsessioon. Pääsessio lukee tilan.
- Kaikki kirjoitukset ja väliaineisto NAS-tehtäväjuuressa. TMPDIR ja PYTHONPYCACHEPREFIX valiaikainen/e06:ssa; NAS AppleDouble ._* suljettu oman .git/info/exclude:n kautta.
- Hiekkalaatikon prosessin alustus epäonnistui symbolisen työtilapolun vuoksi. NAS-komennot suoritetaan hyväksytyllä eskalaatiolla; yhteiseen checkoutiin ei kosketa.
- Sisältötyön CODEX/PILVIOHJE-poikkeus: ei koko npm test -ajoa; ei sisalto.json:ia, PR:ää tai mergeä.
- Tarkat luvut: kaksi riippumatonta lähdettä; muuten noin/vuosisata tai poisto. Kontekstin hyväksytty väestöluku kirjataan laajuuksineen lähdehuomioksi, ei kopioida tarkkana ilman lisävahvistusta.
- Kaupallinen peli (#74): modernit suojatut teokset ja rakennukset jätetään pois, jos kaupallinen FOP teostyypille ei ole varma. Luontokohteet ensisijaisia; kuvien tiedostolisenssi ja kohteen oikeudet kuuluvat myöhempään B-vaiheeseen.
