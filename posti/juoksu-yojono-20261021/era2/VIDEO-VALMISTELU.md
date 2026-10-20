# Kolme veljestä — #772 kevyt jatkovalmistelu

Todellinen Tripo-malli löytyi. Candidate02-alkuperäinen on tarkistettu SHA-256:lla aiempaa generaatiolokia ja tuottajan checkpointia vasten. Myös aiempi valmis materiaalikohtaus löytyi ja sen SHA vastaa jäädytetyn kohtauksen kuittia. Molemmat kopioitiin muuttumattomina tämän tehtävän inputs-kansioon. Tämä ei ole uusi malli eikä uusi Blender-kokoonpano.

- Malli: `inputs/model/candidate02-tripo-original.glb`, 4 866 444 tavua, SHA `76ff00a7c7592202d3a705f18379ec80ea150bf2b00e509751826fbd4a7a9c2f`.
- Aiempi materiaalikohtaus: `inputs/scene/pendant-frozen-before772.blend`, 7 803 783 tavua, SHA `0b675ac830c068b470d9c20b12a0121c08ace7aa614afa6664ee42668db6b7d9`.
- Aiempi Tripo-omistaja: `01a14ee0-3e23-72b2-82b1-510228c70b7d`. Budjetti yhteensä 3, aiemmassa lokissa 2 onnistunutta ladattua kutsua / 90 krediittiä. Ei uutta kutsua eikä budjetin nollausta.
- Kuusi hyväksyttyä taustatiedostoa: 2 natiivia ja 4 laite-/suuntarajausta. Kaikki vastaavat #669:n hyväksymiskuittia T7:llä, NAS-mirrorissa ja jaetussa vastaanottokansiossa. Taustat kopioitiin muuttumattomina `inputs/backgrounds/`-kansioon. Ei uutta kuvagenerointia.

Mallin muoto on aiemman tuottajan checkpointin mukaan omistajan hyväksymä. Materiaalien, valmiin videon tai pelikäytön lopullista hyväksyntää se ei osoita. Taustojen hyväksyntä koskee kokeilua ja edellyttää taustan pitämistä syväterävyyden takana: natiivit ovat 1086 × 1448 ja 1981 × 793, ja iPad-vaaka suurennettu noin 2,58-kertaisesti. Aiemman kohtauksen DOF säilytetään.

`scripts/assemble_existing_scene.py` on valmisteltu, mutta sitä EI AJETTU. Se avaisi vain kopion aiemmasta jäädytetystä kohtauksesta, käyttäisi aiempaa geometriaa ja optisia materiaaleja sekä saman taustan neljää rajausta. Se ei luo geometriaa eikä sisällä renderöintikutsua. Se vaatii tuoreen resurssitarkistuskuittitiedoston. Staattinen Python-jäsennystarkistus läpäisi, Blender-käyttäytymistä ei tässä tehtävässä testattu. Uusia koottuja `.blend`-tiedostoja ei ole: inputs-kansion `.blend` on vain aiemmin tehty tiedosto.

Aiemmassa tuottajakansiossa on 12 ehjäksi dekoodattua iPhone-pystyruutua 216:sta. Keskeytyneen ruudun 13 karanteeni säilyy. Valmiita videoita ei löytynyt tämän tuottajan nykyisestä kansiosta. Ruutuja ei renderöity tai muutettu tässä tehtävässä eikä niitä nimetä valmiiksi videoksi.

Uusi lähde sallii renderöinnin vasta yönä 21.–22.10.2026. Aiemman tuottajan #692-pysäytyskuittia tai automaatiota ei muutettu; oikea tekijä/root sovittaa uuden yöohjeen vartioituun käynnistimeen ennen ajoa. Juoksutyöt ja Unity-käännökset etusijalla, ei simulointia, 5 minuutin kuorma alle 16, enintään 4 CPU-säiettä, vain yksi renderöijä ja ajonaikainen valvonta. Tämä valmistelu ei käynnistä Blenderiä, renderöintiä tai ajastusta.

Jatko: root/aiempi Tripo-tekijä tarkistaa lähteet, nykyisen pidon ja tuoreen resurssitilanteen. Malli ja taustat eivät puutu. Varsinainen kohtauksen avaus, videon loppurenderöinti, HEVC 10-bit -pakkaus, täysikokoiset kuvaparit ja koko kierroksen visuaalinen QA ovat tekemättä. Muut kuusi aarretta odottavat yhä pilotin omistajahyväksyntää.

Näyttö: `SOURCE-USAGE.json`, `ASSEMBLY-MANIFEST.json`, `STATE.json` ja reports-kansio. Ei Git-muutoksia, postitoimitusta, R2-siirtoa, Unity-kytkentää tai julkaisua.

Rootin ajantasainen resurssitarkistus21.10. klo01.41 Suomen aikaa: viiden minuutin kuorma155,069, säilyvä raja16. Blenderiä ei avattu eikä kohtauksia koottu. Resurssiportti on kiinni. Renderöintipäivä21.–22.10. ei ole vielä alkanut. Tarkistus on reports/current-resource-observation.json; se ei osoita käynnissä olevan kuorman syytä eikä muuta muita prosesseja.
