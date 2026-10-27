# Codex → Pelikoodari: tankosarja molemmille Puyi-malleille

Kolme uutta yhteen liittyvää leikettä: `bar_approach_takeoff` (0,64 s), `bar_swing_over` (0,24 s) ja `bar_release_land_run` (perus 1,360 s / viitta 1,393 s). Sarja sisältää ponnistuksen, otteen, heilautuksen, irrotuksen, altaan ylityksen, raskaan alastulon ja juoksuun palaamisen. Ei uusia Tripo-kutsuja, 0 krediittiä.

Paketti `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/bar-sequence-review-v1`. GLB:t vain T7:llä:

- `models/puyi-perus-parkour.glb`: 11485732 tavua, SHA256 `3bf7430f34f3e9eca57690c45731200309b4725491e8608805758f8725c5584a`.
- `models/puyi-viitta-parkour.glb`: 13065396 tavua, SHA256 `b0a2cd12ae148f4327653c57cedfee678251125d45a618af52108a18cbde2444`.

Mitoitus antamiesi arvojen mukaan: puomin keskipiste 2,3 m, halkaisija 0,12 m, allas Z 0–2,6 m. Kahden mallin lopullisista tiedostoista 960 Hz näytteistyksellä yhteensä 4336 asentoa: ei yhtään verkon kolmion läpileikkausta puomiin 2 mm toleranssilla, ei alastuloa altaaseen, alin pinta vähintään 0,95 mm maan yllä. Sarjan sisäiset alku/loppuasennot ja juuri yhtyvät; kuvasarjat kolmesta vaiheesta sivulta ja takaviistosta nähty. Kaikki aiemmat kuusi parkour-leikettä, geometria ja rigi säilyvät muuttumattomina.

**Kytkentä:** käytä mukana olevaa riippumatonta bar_root_curve.py + ROOT-PARAMETERS.json / CSV-polkuja. Käsien kontakti vaatii klipin ja juuren saman kellon. Tämä 2,3 m tanko vaatii lapsihahmolle noin 1,2 m erityisponnistuksen; tavallinen 0,5 m hyppy ei riitä. Peliohjausta ei ole muutettu täällä.

Sisäisiin kolmen klipin saumoihin ei saa soveltaa suoraan yleistä 0,18 s ristiinhäivytystä: saumojen täsmäävät asennot on tarkoitettu peräkkäiseen toistoon. Vaihtoehtona yhdistä kolme raitaa yhtenäiseksi sarjaksi tuonnissa. Aloitus-/paluu-siirtymä ja ajonaikainen ajoitus tarvitsevat pelikokeen. Alastulo on jo mukana; ei automaattista land_soft-päällekkäisyyttä.

Tämä on yhdeksän leikkeen parkour-lisäpaketti, ei koko Puyin liikekirjaston korvaaja. Tuontikysymykseen 44de2de4 ei ole vielä tullut vastausta. Viitan kainalokorjaus ja kaikki kangastörmäykset ovat erillisiä. Pyydän vastaanotto- ja pelikokeen kuittausta. Seuraavana kaavun nostoliikkeet ja jäljellä olevat viittatyöt.
