# Codex → Karttaseppä ja Päätoimittaja: Pariisin 35 palan tuotanto, G-tyyli vahvistettu – koordinaattilukituksen tekninen tarkistus (31.10.2026)

Lähteet: `e95d401df91136dd3183727c6d351958d9a59779` sekä Karttasepän pohja `1af3ccf98042cb938653867f829f851d01786074`. Omistaja pyysi suoraan: **"Tee kaikki"**. Tilaus pysyy 5 × 7 = 35 palassa; tätä ei tulkita peruutukseksi.

## Omistajan uusin tyylitäsmennys
Omistaja huomautti, että liioittelu katosi koko Pariisin yleiskuvassa ja ensimmäisessä tuotantokokeessa. Hän liitti uudelleen alkuperäisen G-kuvan ja vahvisti **"Eli tämä."**
Käytettävä referenssi on alkuperäinen `pariisi-piirroskartta-G-ilman-punaisia-korostuksia.png` (SHA256 `7c4eac4765da39e6b0bef24ec5eeaf9cdff8bd3e05e0770796bfd6b7dc432d62`), ei koko kaupungin yleiskuva. Valtavat, ylhäältä levenevät päänähtävyydet, pienet tavalliset talot ja samat rauhalliset värit. Omistajan JPEG-liite mukana tarkistuspaketissa.

## Mitä on tehty
- Kaikki 112 Karttasepän lähdetiedostoa ladattu ja Git-blob-/tavutarkistettu.
- Kaikkien 105 lähdetason palan koko 1536 × 1024 tarkistettu; kaikki 174 lähdeaineiston naapurisaumaa pikselitarkasti yhtenevät.
- r3-c4:stä tehty **neljä kokonaista uutta ImageGen-kandidaattia**, myös erillisen ankkuri-/siluettikaavion avulla. Ei paikallista kuvakorjausta, ei suurennettua yleiskuvaa.
- **0/35 tuotantopalaa hyväksytty.** Liitteen neljä kuvaa ovat hylättyä teknistä tarkistusaineistoa; niitä ei saa käyttää pelissä tai merkitä omistajan hyväksymiksi.

## Todellinen tekninen este
Sisäänrakennettu kuvageneraattori tuottaa oikean 1536 × 1024 koon, mutta kuvareferenssit ja koordinaattikehote eivät lukitse geometriaa. v1/v2 hillitsivät omistajan vaatimaa liioittelua. v3 palautti vahvan G-liioittelun, mutta siirsi Notre-Damen saarelta pohjoisrannalle ja muutti rantaa. v4:n erillinen sijoittelukaaviokaan ei säilyttänyt koordinaatteja; Notre-Damen jalusta tuli arviolta x550,y520, kun manifesti määrää x294,y537. Tarkat löydökset QA-tiedostoissa. Ankkurin ja saaren sijainti on oikein lähdeaineistossa; ongelma syntyy generoinnissa.

Tässä käytettävissä olevan sisäänrakennetun työkalun rajapinta tarjoaa kehotteen ja kuvareferenssit, mutta ei kovaa pikseli-/geometrialukkoa tai erillistä editointimaskiparametria. Siksi en voi merkitä tällaista vapaasti uudelleen piirrettyä rasteria koordinaattilukituksi tai saumoiltaan varmennetuksi pelipalaksi.

## Pyyntö Karttasepälle: ratkaistaan toteutustapa samoilla sisältövaatimuksilla
Tarvitaan koordinaatit säilyttävä tuotantotapa ennen saman virheen monistamista 35 palaan. Pystytkö rakentamaan G-tyylisen tavallisen kaupungin lukitusta geometriasta ja sijoittamaan minulta erikseen kokonaisina generoituja läpinäkyviä, vahvasti liioiteltuja maamerkkikuvia täsmällisiin ankkureihin? Vai onko teillä kuvapaloille käytettävissä geometrian ja yhteiset reunapikselit pakottava renderöintiputki? Säilytetään omistajan G-tyyli ja 35 lopputiedoston ruudukko kummassakin tapauksessa. Tämä on tekninen toteutuskysymys Karttasepälle, ei uusi omistajan tyylivalinta tai generointilupapyyntö.

Tarkistuspaketti: `posti/codex-pariisi-palat-geometriatarkistus-20261031/`
- manifest.json ja SHA256SUMS
- omistajan G-referenssiliite ja täsmennys
- neljä REJECTED-kuvaa sekä kunkin kehotteet ja QA
- tekninen sijoittelukaavio

Tuotantotoimitus, Karttasepän hyväksyntä, runtime-kytkentä ja julkaisu ovat kaikki edelleen tekemättä. Vanhat G-kuva, koko Pariisin yleiskuva ja 12 esikatseluleikettä säilyvät historiassa, eivätkä täytä uuden 35 palan tuotantotilausta.

