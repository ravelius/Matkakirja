# e06 — A-vaiheen faktakokoaja

Alkuaika: 2026-10-11T20:04:50+03:00 (Europe/Helsinki).
Pohja: e4f2845b3a82874550481fda26528df065820232. Haara: paakaupungit-e06-codex.
Oma klooni: /Volumes/NAS-Homes/samireivinen/Matkakirja-arkisto/paakaupungit-codex/sessio-72-20261011/e06.

Vaihe 0: yhdeksän kontekstia ja saa-syote.json luotu alkuperäisellä tyokalu.mjs:llä. Sääaineisto odottaa pääsession alkuperäistä saa-ajoa; lukuja ei kopioida käsin.

| Kaupunki | A | B | C | D | E | F |
|---|---|---|---|---|---|---|
| libreville | A koottu; 6 karttakandidaattia, rajaus-/tyyppipoikkeus ja turvallisuuslähde avoin | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| ciudaddelapaz | lähdepaketti tehty; täysi A estyy: 0 karttakohdetta, opas/teema vajaat | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| saotome | A koottu; 6 ehdotusta, Obô-rajaus ja 2 kirkon oikeusportti avoin | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| bangui | lähdepaketti tehty; täysi A estyy karttaminimiin, 1 ruokanostoon ja opasminimiin | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
| brazzaville | lähteiden luku käynnissä | pääsession jonossa | pääsession jonossa | tekemättä | tekemättä | tekemättä |
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

## Libreville A

Lähteistetty 0–9-rakenne koottu. 1849 kahdesta riippumattomasta lähteestä; muut epävarmat tarkat luvut poistettu/pyöristetty. Karttaehdotus ulottuu historiallisen ytimen lisäksi estuaarin retkiluontoon: pääsession hyväksyntää vaativa rajauspoikkeus, ei valmiiksi hyväksytty kartta. Mont-Bouët tarvitsee aukio-tyyppisovituksen. UM:n /c/GA palautti yleissivun; turvallisuustaso ei vahvistettu. IPHAMETRA HTTP 500.

## Ciudad de la Paz A-este

Nykykaupunki uusi; ei lähteistettyä historiallista keskustakantaa. Konteksti jo kieltää uuden hallintorakentamisen kuvakohteet 70 vuoden säännöllä. Lähteistetty täysi 0–9-raportti kertoo puutteet: 0 karttakohdetta, neljän teemanoston ja viiden matkasuosituksen faktamäärä ei täyty, nykyinen opas puutteellinen. Ei A-valmis-merkintää. Virallinen asetuslinkki palautti vain 161 tavua, ei luettavaa dokumenttia. Pääsession ratkaistava kevyenä pitäminen / lisälähteet. Kaupunkia ei ohitettu työlistasta.

## São Tomé A

0–9-lähdepaketti koottu. Linnakkeen/perustamisen vuosiristiriidat vuosisatamuotoon. Kuusi karttakandidaattia, mutta Obô on erillinen retkikohde ja kahden kirkon nykyjulkisivujen FOP/historiallisuus vaatii lisävahvistuksen. WIPO-lain metatiedot luettu, PDF 403 ja vaihtoehtoinen /edocs/lexdocs/ robots-kielletty: ei lain sisällön lukuväitettä. Palatsi pois kuvauskiellon vuoksi. Ei valmiin kartan tai kuvien hyväksyntää.

## Bangui A-este

UNESCO metallurginen historia luettu. FOP-yhteenveto ei kata still-valokuvia suojatuista teoksista; modernit rakennukset/patsaat pois. Käyttövalmiita kuutta keskustakohdetta ei löytynyt; UNESCO-koordinaatti vaatii lähdesäännön poikkeuksen, Ubangin paikallinen piste puuttuu, Boali ei kuulu keskustakarttaan. Ruokanoston T3 varsinainen faktamäärä 3, lisälähde tarvitaan. FCDO 11.10.2026: Banguihin muu kuin välttämätön matkustus vältettävä; muu maa ei matkasuositukseksi. Täyttä A:ta ei merkitä valmiiksi.
