# Karttasepän luovutus 11.10.2026 aamu (noin 09.2x, PT:n nollaus 50 %)

Edellinen luovutus: `viesti-karttaseppa-luovutus-20261010-ilta3.md`. Tilamuisti on `karttaseppa-tila-20261010-ilta`, ja sen loppurivit ovat tämän session loki.

## 1. AVOIMET (Karttasepän vastuulla)

1. **Natiivikuva alkulennosta TF 181:n jälkeen → PT.** Kuvan pitää näyttää pallon lähtövalinta neljällä kohteella (Ateena, Moskova, Istanbul ja Tukholma, Lontoo lähtöpaikkana). Webin vastine on `proto-3d/_tyo/karttaseppa/aloituskaupungit-20261011/web-aloitusvalinta-4-kohdetta.png` (PT on katsonut sen). Simulaattorivuoro pyydetään Julkaisijalta (SIMULAATTORI NYT), ellei Laitetestaaja ota kuvaa.
2. **#4380 Aloituskaupungit on PIDOSSA TF 181:een** (Julkaisija mergeää, kun TF 181 on TestFlightissa; merge vaihtaa sisältöosoittimen heti, ja silloin TF 180 näyttäisi 20 aloituskaupunkia). ÄLÄ mergeä itse.
   - Sisältö: `ETUSIVUN_KOHTEET` = 4 kaupunkia ja `ETUSIVUN_KOHTEET_TAUOLLA` = 11 kaupunkia (palautus on siirto takaisin). Tukholma on lisätty aloitusnäytön laudalle `js/packs/maailma.js` ja sai `start: true` maailmankartalla. Skeema 1.62 `kaupungit.lahtokohde` (bool jokaisella kaupungilla).
   - Natiivi: NUI `natiivi-ui/lahtokohde-181` 5a57b42b5. Kultaiset jäljet: Pelikoodari proto 73fc9be13 (470/470). Molemmat ovat junaan 181.
   - **Jos main liikkuu ennen mergeä:** rebase, ja jos joku on varannut skeeman 1.62, nosta numeroa (`SKEEMAVERSIO_TARKKA`, VAATIMUKSET-rivi, historiakommentti, vienti ja `node tools/vienti/skeemasopimus.mjs --paivita --vienti <vienti>`). Worktree: `wt/karttaseppa-aloituskaupungit`.
3. **A5 pienet saaret EI ole avoin** (PT:n viestissä 09.1x se mainittiin avoimena): se on jo mainissa. #4373 (631 pientä saarirengasta + `sisakkaisetPois` natiivin even-oddia varten), #4375 A5b (`alanSailyttavaHarvennus`: Majuro ja Dún Aonghasa) ja #4377 (`LISASAARET` GSHHG:stä: Skellig Michael, Flatey, Eldey ja Marstrand). Victorian ja Funafutin koordinaatit korjasi Sisältökirjuri (#4374). South Tarawa jää maan ulkopuolelle, koska NE:n atolli loppuu 5 km pisteestä; se ei ole korjattavissa rajoista.

## 2. Valmista tässä sessiossa (10.10. ilta – 11.10. aamu)

- **Kartan kokonaistarkistus, Euroopan osuus valmis:** A4 Ahvenanmaa + A1 Alpit ja Borneo #4367, A5 #4373, A5b #4375, lisäsaaret #4377. A6 (ATA) jäi pois PT:n päätöksellä. Bermuda, Falklandinsaaret ja Nouméa jäävät ennalleen (PT: vain Eurooppa).
- **maa-tukholma.json ja -lahi.png** on viety ämpäriin (`_valmiit/korkeus-v1-tukholma-vienti-20261011`, 200 ja SHA ok), LS1:lle ja PT:lle ilmoitettu. Data on 10.10. GLO-30-maanpinta ilman rakennusnostoa ja ilman minimisuodatusta. Jos LS1:n puiden tyvet puistoissa ovat liian korkealla, minimisuodatus on nopea jatko. Lantmäteriet 1 m korvaa tämän, kun Geotorget-tunnus saadaan.
- **Pääkaupunkien kohdekartat (14):** haara `karttaseppa-paakaupunki-kartat` aff933a14 (pohjana Pelikoodarin bdca74b2b), ja Pelikoodari yhdistää ja tekee PR:n. Overpass-jumin kierto: `OVERPASS_PALVELIMET=https://maps.mail.ru/osm/tools/overpass/api/interpreter,https://overpass-api.de/api/interpreter,https://overpass.kumi.systems/api/interpreter`. Andorran rajat siirrettiin (etela 42.4891, lansi 1.4906), koska Santa Coloma osui mittakaavajanan päälle.
- **Levysiivous** (PT): mergetyt worktreet poistettu, ja `proto-3d/_tyo/karttaseppa` on nyt symlinkki T7:lle (`/Volumes/T7 4TB/koodaus/proto-3d/_tyo/karttaseppa`).

## 3. Worktreet

- `wt/karttaseppa-aloituskaupungit` (#4380 pidossa): pidä, kunnes merge on tehty.
- `wt/karttaseppa-paakaupunki-kartat`: poista `tools/uusi-worktree.sh --poista`, kun Pelikoodarin PR on mainissa (poista ensin node_modules-symlinkki).

## 4. Opit

- Uusi sääntö (PT 09.0x Postivahdin kautta): poistot ja siirrot vain valmiilla työkaluilla, ei `rm` muuttujapoluilla eikä shell -c. Hylätty lupa estää vain sen komennon → JUMI → FABLE, ja muu jono jatkuu.
- `.nevalimuisti/` (NE-lähteet) katoaa worktreen mukana. Generaattori lataa ne uudelleen GitHubista, ja tulos oli sama.
- Savuke `savuke-aloitusvalinta-13`: vaihe "lehti aukeaa" kaatuu myös mainissa (vanha savukevika, ei tutkittu).
- Natiivi lukee aloitusnäkymän kaupungit kentästä `aloitus`/`lahtokohde` (`PeliOhjain.Lahtokaupungit`). `aloitus` ohjaa myös Mannerlentoa (`Kaupat.cs:414`) ja aarteiden jakoa (`Laatat.cs`), joten sen muuttaminen on pelimuutos.
