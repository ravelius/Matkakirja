# Kujakivet v5 — vaakalaatat ja pitkät sokkelikivet

Lähde: Lavastajan 5658e3dfb1a46267ac59f582525476c597aa25db / 28.10.2026. Tuottaja: Matkakirjan kuvat -sessio. Tämä on uusi 2D/PBR-pintapaketti; hahmo- ja liikepaketit kuuluvat erilliselle Tripo 3D -sessiolle.

## Sisältö ja mitat

| Pinta | Versio | Metrit U × V | PNG | Toisto |
|---|---|---|---|---|
| lattialaatat | v02 | 2,00 × 2,00 | 1024 × 1024 | U ja V |
| sokkeli | v02 | 2,00 × 1,20 | 1024 × 614 | U |
| sokkelin-ylapinta | v02 | 2,00 × 0,10 | 1024 × 51 | U |
| pilarin-etu | v02 | 0,60 × 1,20 | 307 × 614 | ei |
| pilarin-sivu | v02 | 0,40 × 1,20 | 205 × 614 | ei |
| reunakivi | v01, muuttumaton | 0,70 × 0,52 | 360 × 266 | ei |

Jokaiselle pinnalle albedo, normal-opengl, roughness ja 16-bittinen height. Yhteensä 24 PNG-karttaa: 20 uutta ja neljä v4:n reunakivikarttaa tavutarkasti ennallaan.

Lattian kuusi poikittaista riviä ovat 0,33–0,34 m syviä; laatat 0,65–0,70 m leveitä. Pitkä sivu on **U-suunnassa kujan poikki**. V kulkee kujan pituussuunnassa. Rivien eri siirtymät katkaisevat pystysaumat; kyseessä ei ole säännöllinen puolilimitys. Älä venytä U:ta tai V:tä erikseen. Lähteen mineraalijuonitus on näytteistetty samalla metrikohtaisella mittakaavalla molemmissa suunnissa.

Kivijalassa kahdeksan 0,15 m kerrosta, kivien pituudet 0,45–0,55 m ja vaihtelevat saumapaikat. Pilarin etupuolen oikea reuna liittyy sivun vasempaan reunaan; yhteisen kiven albedo, korkeus ja karheus jatkuvat kulman yli. Sokkelin yläpinnan pystysaumat vastaavat sokkelin ylimmän rivin saumoja.

## Karttojen tuonti

- Albedo: sRGB. Kuvassa ei ole esikatselun valaistusta, varjoja tai AO:ta. Kivien sävyero on maltillinen; lopullinen pelivalo ja sävyt ovat pelin tekijän arvioitavia.
- Normal: lineaarinen tangenttiavaruuden **OpenGL +Y**. PNG:n rivit etenevät alas; glTF:n V ylös. Älä käännä vihreää kanavaa kahdesti.
- Roughness: lineaarinen 8-bittinen harmaasävy. Tämä on karheus, ei smoothness. Kiven noin 0,69; laasti 0,90.
- Height: lineaarinen 16-bittinen harmaasävy, metreiksi `-0.006 + (arvo / 65535) * 0.007`. Ei automaattista min–max-normalisointia.
- Metallisuus: 0. Height/normal eivät muuta mallin siluettia. Laatan normaaliin leivottu pyöristys on 18 mm ja kivijalan 10 mm leveä. Jos VS tekee saman reunan saumakartasta shaderissa, vältä pyöristyksen kaksinkertaistamista.
- Fyysinen laastisauma 5,4–7,6 mm; ei tummaa maalattua AO-ruudukkoa. Mip-suodatus ja pelivalo voivat vaikuttaa näkyvään paksuuteen.

## Saumakartta Valosepälle

`SEAMS.json` on muodostettu samasta metrisestä jaosta kuin kuvat. `materials.<nimi>` sisältää rivit:

- `vBoundsPngDown`: rajat 0–1 kuvassa ylhäältä alas. `vBoundsGltfUp` antaa samat rajat glTF-suunnassa. Rivin tunnus kulkee silti kuvan yläreunasta alas.
- `uJointCenters`: todelliset pystysaumojen keskilinjat 0–1 kyseisen pinnan leveydellä.
- `uClippedBounds`: mukaan myös tekstuurin 0/1-reunat. Nämä lisätyt reunat eivät yksin tarkoita fyysistä saumaa: toiston reuna voi kulkea kokonaisen kiven keskeltä.
- `periodicLengthsM`, `periodicOffsetM`, `periodM` säilyttävät koko 2 m toistojakson kivijaon, myös tekstuurin reunan ylittävän kiven. Pilarin `faceStartM` on etupuolella 0 ja sivulla 0,60 m.

Sauman keskilinjasta kumpaankin suuntaan puolet `jointWidthM`-leveydestä. Toistuvan tekstuurin etäisyys saumaan lasketaan myös viereisestä toistojaksosta. Yläpinnan V=0/1 ovat nauhan ulkoreunoja, eivät vaakasuuntaisia laastisaumoja.

## Näytöt ja rajaus

`qa/readback.json`: kaikki 24 karttaa avattu takaisin, koot/bittisyydet/normalien yksikköpituudet tarkistettu; toiston raja-arvot ja normalit, pilarikulman jatkuvuus, yläpinnan saumajako ja JSONin vastaavuus todelliseen laastiin tarkistettu. Reunakiven neljä SHA256:ta vastaavat v4:ää.

`esikatselu/kivipinnat-v5-vertailu.png`: ylhäällä Lavastajan alkuperäiset peli/tavoiteparit, alhaalla tämän paketin tekninen materiaaliesikatselu. Se ei ole pelissä otettu v5-kuva. `esikatselu/lattia-2x2-albedo.png` näyttää todellisen albedon toiston ilman esikatseluvaloa.

Uusi kivipohja tehtiin yhdellä sisäänrakennetulla ImageGen-kutsulla. Muuttumaton alkuperäinen (1254 × 1254), kehote ja työkalukuitti ovat `sources/`-kansiossa. Uusi metrinen materiaaligraafi leipoo kivijaon ja PBR-kartat lähteen ympärille; vanhaa v4-kuvaa ei venytetty tai maalattu uudelleen. Tripo-kutsuja 0. Alkuperäiset ja v4 säilyvät.

Vastaanotto, peliin kytkentä sekä KK:n/omistajan hyväksyntä odottavat erillistä kuittausta. Lavastaja kokoaa uuden vertailuparin samoista pelikameroista.
