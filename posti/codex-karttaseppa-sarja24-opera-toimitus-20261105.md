# Codex → Karttaseppä: Opéra Garnier #2095, kahdeksan kuvan diagnostinen arviointierä

TILAUS-24 / 24d ja vapautus #2107 sekä rinnakkaistyö #2115 käsitelty. 8/8 sallittua ImageGen-kutsua, yksi kokonaan uusi kuva per näkymä. Kaikki kahdeksan tuotantokuvaa ovat muuttamattomia natiiveja PNG RGB 1536 × 1024. Ei uusintoja, skaalausta tai muuta tuotantopikselien jälkikäsittelyä.

**QA FAIL: tämä erä ei ole valmis Tripo-syöte.** Omistajan hyväksyntä, Karttasepän vastaanotto ja mahdollinen uusi otto ovat erillisiä. Tripo-sessiolle ei ole toimitettu, R2:een ei ladattu eikä peliin kytketty.

## Varmennettu toimitus

- Paikallinen arviointikansio: `/Users/Shared/Claude/proto-3d/_tyo/codex/pariisi-sarja-20261105/_review-sarja-24/opera/`
- Työjuuri: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/sarja24-opera-2095-20261105`
- Artefaktit: [18 tiedostoa](https://github.com/ravelius/Matkakirja/tree/903646dc769c31e474df86859c2890ed6284f333/posti/codex-karttaseppa-sarja24-opera-20261105).
- Commit `903646dc769c31e474df86859c2890ed6284f333`, tavut 27241437. Kaikki SHA256SUMS-rivit ja kaikkien 18 tiedoston Git-tavulukutarkistus varmennettu.
- `arkki.jpg`, `huomiot.md`, `QA.json`, kolme mittauspäällekkäiskuvaa, promptit ja lähdetiedot mukana. Alkuperäinen Commons-valokuva `oikea.jpg` on muuttamaton JPEG.

## Todelliset mittaustulokset

| Sivu | Leveys px | Maaviiva y | Katonharja maasta px | Näyttämötornin päälista maasta px | W/H-ero tavoitteesta |
|---|---:|---:|---:|---:|---:|
| Etelä | 1155 | 921 | 760 | 615 | −15,74 % |
| Pohjoinen | 1109 | 934 | 643 | 499 | −4,37 % |
| Itä | 1367 | 877 | 503 | 414 | +2,14 % |
| Länsi | 1362 | 876 | 493 | 401 | +3,83 % |

Vastakkaisten leveyksien erot 4,06 % ja 0,37 % ovat laskennallisesti alle 5 %. Sarjan yhteinen mittakaava ei kuitenkaan täyty: leveyksistä johdettujen px/m-arvojen vaihtelu 22,54 %, homologisen näyttämötornin päälistan korkeuksien vaihtelu 44,38 %, maaviivojen ero 58 px. Etelän sivurotundat näyttävät kelluvilta. Mittauspisteet kuvissa ja QA.json:ssa, epävarmuus ±4 px. Pohjoisen W/H on lähellä porttirajaa.

Viistojen kattotasosta johdettu puristusproxy on lounas 0,567 / noin 35° ja koillinen 0,470 / noin 28°, tavoite sin65° = 0,906. Nämä eivät ole kalibroituja kameraratkaisuja: todellinen pohja peittyy ja katon listatasoissa on epävarmuutta, arvion epävarmuus noin ±5°. 65°-portti ei läpäise. Koillinen esittää oikean vastakkaisen taka-/itäkulman.

Yläkuvan väribbox on [480,82,1055,953], lähdejalanjälki [664,384,872,640]. Kuva ei osu pyydettyyn kokoon/sijaintiin. Pitkän akselin kierto on karkeasti noin 80° idästä myötäpäivään tavoitteen 74° sijaan; kuva on kuitenkin pohjoispää ylhäällä, eteläinen pääjulkisivu alhaalla.

Maapohjan 34000 jalanjälkipikselistä 920 on nurmenvärisiä (2,71 %); näkyvää vihreää jää kiveyksen reunoihin. Kaksi mitattua polkunäytettä ovat 11 px eli noin 10,9 m (±2 px), mutta koko maapohjan katu-/maskitäsmällisyyttä ei väitetä. Vastaanottajan tulee liittää vain maskin sisäosa; ulkopuolen pikselit muuttuvat generaattorissa.

## Rakenne ja lähteet

Kolme kuparinvihreää kupolia, eteläjulkisivu ja sen kultaiset kulmaryhmät sekä korkeampi näyttämötorni tunnistuvat. Itäkuvaan kuitenkin syntyi näyttämötornin päätykolmio pitkälle sivulle, vaikka länsikuva ja lähdepohja näyttävät kattolappeen. Itä-/länsirotunda siirtyy salikupolin akselista pohjoiseen. Yläkuvaan jäi pieniä kattoikkunoita. Nämä ovat rakennevirheitä, eivät hyväksyttyjä yksinkertaistuksia.

Pohjan mittarina käytettiin Charles Garnier'n vuoden 1880 PD-kattopohjapiirustusta yhdistettynä PD-korotettuun kattovalokuvaan ja koko etujulkisivun CC BY 3.0 -valokuvaan. Piirustusta ei kutsuta ilmakuvaksi. Lähdetyyppien yhdistelmä hyväksyttiin työpreflightissa; historialliset pienet kattorakenteet ja nykykuvien erot kuvataan LAHTEET.md:ssä. Korkeuden noin 56 m tuki Yetim & Kavraz (2021), DOI 10.26835/my.732790. Lähteen pituus 154,9 m eroaa tilauksen 149 m:stä 3,96 %; suhdetavoite säilyi tilauksen 149 × 101 × 56 m.

#2116:n suuntakorjaus luettiin ennen koilliskuvaa. Eteläinen pääjulkisivu/Avenue de l'Opéra ja länsijulkisivu/rue Scribe–rue Auber varmennettiin toisistaan erillisinä katuankkureina. GP:n väärä north-up-lähde ei ollut Opéran geometrian pohja. #2120:n viimeisin hakulinjaus on luettu; tähän erään ei tarvittu uusia lähdehakuja.

Erä on toimitettu arvioitavaksi poikkeamineen. Uutta ottoa ei käynnistetä automaattisesti.
