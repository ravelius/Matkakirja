# Opus 13 → Fable: karttalaajennus Lontoo, Pariisi ja Helsinki

## Tilanne

Kaikki kolme valmiina **yhdessä PR:ssä** — Helsinkiä ei tarvinnut
erottaa omakseen, koska kainalon komposointi onnistui ensimmäisellä
yrityksellä.

| Kaupunki | Rajaus ennen | Rajaus nyt | Satelliitti |
| --- | --- | --- | --- |
| Lontoo | 6,9 × 3,6 km | **8,7 × 4,5 km** | uusi, 903 kt |
| Pariisi | 6,6 × 5,0 km | **8,3 × 6,2 km** | uusi, 1 491 kt |
| Helsinki | 3,7 × 3,3 km | **4,7 × 4,1 km** | uusi + kainalo, 885 kt |

Kaikissa sama Berliinin kaava (v680, c75bf30): lineaarinen ×1,25
samasta keskipisteestä, joten kuvasuhde ja kohteiden keskinäiset
paikat säilyvät eikä yhtäkään koordinaattia siirretty käsin.

## Portit

- `tarkista-karttapisteet` × 3: **kaikki pisteet maalla**, yksikään ei
  peitä mittakaavajanaa, yksikään numeropari ei mene päällekkäin.
- `savuke-karttazoom` **LÄPI** neljälle: berliini (regressio), lontoo,
  pariisi, helsinki.
- Piirroksen ja satelliitin kohdistus tarkistettiin silmällä latomalla
  ne päällekkäin puoliksi läpinäkyvinä (apuskripti jäi kontin
  /tmp:hen, ei repoon). Joet, rannat, puistot ja ratapihat osuvat
  pikselilleen kaikissa kolmessa — myös Suomenlinnan kainalo.
- Testit, kaksoisavaimet ja build: ks. PR.

## Helsinki: kainalo satelliittikuvaan (tehtävän vaikein kohta)

Ratkaistu pyytämällä WMS:ltä **toinen ruutu kainalon omalla
rajauksella** ja latomalla se päähaun päälle Chromiumilla samoille
prosenttipaikoille, jotka piirtäjä käyttää (x, y, leveys, korkeus
maakartat.js:stä — ei uudelleenlaskentaa, sama luku kahdelle
käyttäjälle). Tuki on nyt `tools/hae-satelliittikartat.mjs`:ssä ja
kirjattu sen alkukommenttiin; se toimii automaattisesti mille tahansa
kainalolliselle kaupungille (Wien, Budapest), jos niille joskus
haetaan satelliittikuva.

Kohde 7 seisoo nyt Suomenlinnan päällä myös satelliittinäkymässä eikä
kellu tyhjällä merellä.

**Yksi tietoinen ero näkymien välillä:** piirroksessa kainalon yllä
lukee "3 km kaakkoon", satelliitissa ei. Suuntateksti asuu
piirtotyökalun omassa KAUPUNGIT-taulussa eikä maakartat.js:ssä, joten
satelliittityökalu ei näe sitä. Kolme vaihtoehtoa, jos haluat sen:
(a) lisätään `suunta` myös maakartat.js:n kainaloon — helpoin, mutta
sama merkkijono kahdessa paikassa; (b) piirtäjä tulostaa sen
KAUPUNKIKARTAT-riveihin, jolloin duplikaatti on ainakin
konegeneroitu; (c) jätetään ennalleen, koska kehys itsessään kertoo
saman ja nimi on joka tapauksessa selitelistassa. En tehnyt tätä
ilman päätöstäsi.

## Kaupunkikohtaiset huomiot

**Lontoo.** Suoraviivainen. Levennys korjasi vanhan vian: Tower Bridge
oli itälaidassa 85 %:n kohdalla ja numeroympyrä hipoi reunaa — nyt
78 %.

**Pariisi.** Eteläreuna 48.8414 tuo **Panthéonin ja Luxembourgin
puutarhan** kuvaan, eli levennys maksoi takaisin sen hinnan, joka
vanhaan rajaukseen oli kirjattu. **En lisännyt niitä kohdelistalle** —
kohteita on yhä kuusi. Ne mahtuisivat nyt, jos haluat listan kasvavan;
se on oma päätöksensä (numerointi, selitteet, nähtävyysjutut).
Pariisi ei myöskään ole enää pelin laajin rajaus: Berliinin 10,2 km on.

**Helsinki.** Pohjoisrajan vanha vaihtokauppa purkautui itsestään:
**symmetrinen** ×1,25 nostaa pohjoisrajan 60.1877:ään, joten Kallion
kirkko (60.18425) ja Linnanmäki (60.1861) ovat kuvassa ilman
epäsymmetriaa. Kokeilin epäsymmetriaa ja hylkäsin sen: niemen kärki
(Kaivopuiston ranta, n. 60.1536) on nyt 92 %:n korkeudella, ja 300 m
lisää pohjoiseen olisi painanut sen kiinni alalaitaan. Vanha rajaus
katkaisi kärjen kokonaan, joten tämäkin on parannus.
Sibelius-monumentti jää yhä lännessä ulkopuolelle. **Kalliota ja
Linnanmäkeä ei lisätty kohdelistalle** samasta syystä kuin Pariisissa.

Itäreuna siirtyi 465 m ja **Korkeasaari tuli kuvaan**. Vanha kommentti
varoitti tästä ("oikeasta kolmanneksesta tulee lähes pelkkää
avovettä"), joten katsoin sen erikseen: oikea kolmannes sisältää
Kalasataman, Katajanokan, Korkeasaaren ja alaosassa Suomenlinnan
kainalon, eli varoitus ei toteudu tällä siirrolla. Kommentti on
päivitetty vastaamaan uutta tilannetta.

## Esittelytekstit: tarkistettu, ei muutoksia

Kävin läpi kaikkien kolmen esittelyn sijaintiviittaukset. **Yksikään
ei mennyt rikki**, joten en koskenut tekstiin:

- Lontoo: ei sijaintiviittauksia (idässä/lännessä ovat maantiedettä).
- Pariisi: "Vasemmalla … Riemukaari" 26 % ✓; "Ylhäällä oikealla …
  Montmartre" 68 % / 19 % ✓. "Kartan keskellä näkyy saari" oli jo
  ennestään väljä (Île de la Cité oli 81 % / 87 %), ja levennys siirsi
  saarta **kohti** keskustaa (74 % / 79 %) — eli väite parani, ei
  huonontunut. Jätin sen rauhaan, koska en korjaa sitä mitä en
  rikkonut; jos haluat sen täsmälliseksi, se on sinun tekstiäsi.
- Helsinki: "Ylhäällä oleva lahti on Töölönlahti" 24 % ✓; "Oikeassa
  alanurkassa on oma pieni kartta Suomenlinnasta" ✓ (kainalo on
  samassa paikassa molemmissa näkymissä).

## Yksi poikkeama tehtävänannosta: sw.js

Tehtävänannossa luki, että piirros-png:t ovat jo SHELL-listalla.
**Se piti paikkansa vain Lontoon osalta** — Pariisin ja Helsingin
piirroksia ei ollut listalla lainkaan (siellä on vain kuusi
kohdekarttaa yli viidestäkymmenestä; lista jäi päivittämättä kartaston
kasvaessa). Lisäsin siksi kolme satelliittia **ja** kaksi puuttuvaa
piirrosta: pelkkä satelliitti tarkoittaisi, että vivun oletusnäkymä on
se, joka EI ole offline. Yhteensä +5,1 Mt listalle, jonka koko on jo
193 Mt. Perustelu on kirjattu sw.js:ään.

Muut kartat eivät kärsi: sama alkuperä menee fetch-käsittelijän
stale-while-revalidate -haaraan, eli ne päätyvät koriin ensimmäisellä
katselulla joka tapauksessa. SHELL on vain esilataus.

## Havaintoja, joita EN korjannut

1. **`tools/pakkaa-jpeg.mjs` ei ole olemassa.**
   `hae-satelliittikartat.mjs`:n kommentti neuvoo pakkaamaan sillä yli
   1,5 Mt:n kuvat. Tarvetta ei tullut (suurin on Pariisi 1 491 kt),
   mutta neuvo osoittaa tyhjään. Kainalollisen kuvan pakkaa nyt
   Chromium (LAATU-vakio), joten sille reitti on olemassa; muille ei.
2. **Overpass oli koko ajon ajan ruuhkainen** ja vastasi 503:lla
   toistuvasti — Lontoo meni läpi yhdellä yrityksellä, Pariisi vaati
   kolme ja Helsinki kaksi. Työkalun oma kolmen yrityksen uusinta ei
   aina riitä; jos kartastoa ajetaan joskus läpi erässä, uusintoja
   kannattaa lisätä. En muuttanut työkalua.

## Konttihavainto

Sessio käynnistyi **ilman repoa**: työhakemisto oli tyhjä eikä
`/workspace/matkakirja` ollut olemassa. Repo piti liittää istuntoon
`add_repo`-kutsulla ja kloonata käsin ennen kuin työn saattoi
aloittaa. Jos tämä toistuu uusilla sessioilla, se kannattaa mainita
perustamispromptissa — muuten sessio voi päätellä, ettei tehtävää voi
tehdä.

## Haara

`claude/opus13-karttalaajennus`, rebasoitu tuoreeseen mainiin juuri
ennen versionostoa ja buildia. Jään valmiuteen.
