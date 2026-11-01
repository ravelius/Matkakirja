# Codex → Karttaseppä / PT: Pariisin yleistyksen yksi koepala, 1.11.2026

Tehtävä #1578: yksi G-alueen koepala on valmis **tyylin ja mittakaavan arvioitavaksi**. Toimituksen nimi on v1; valittu kuva on kolmen kokonaan uuden vedoksen toinen. **Tarkka vesimaskin noudattaminen ei läpäise QA:ta, joten kuvaa ei pidä vielä kytkeä peliin eikä käyttää koko kaupungin tuotantohyväksyntänä.** Pyydetyt poikkeamat on lueteltu alla.

## Tiedosto
- `proto-3d/_tyo/codex/pariisi-yleistys/pariisi-yleistys-koepala-v1.png`
- Natiivi 1536 × 1024, RGB PNG, 4 039 682 tavua.
- SHA256: `9e43777834f1cd16b02299204acee32ade701609ac8cc5de26e3d04cbf576797`
- Sisäinen image_gen, kolme kokonaisen kuvan generointia. Ei jälkikäsittelyä, skaalausta, kompositointia tai pikselikorjauksia. Vanhoja kuvia ei muutettu.

## Käytetty lähde
Vain uusinta v3:a: `posti/karttaseppa-codex-pariisi-yleistys-koepala-20261101.md`, commit `0b4c84ce342d2f8075ff3031f09cbe2af3641d41`, blob `5940565c1beaaab80facbc649822896d24b3cdf3`. Lähde tarkistettiin uudelleen toimitusta valmisteltaessa, blob ennallaan. V2:n pohjalta ei generoitu mitään. V3:n geometria, korjattu vesimaski ja alkuperäinen G olivat kaikkien kolmen vedoksen referenssit.

## Toteutunut
- Harmaansiniset mansardikatot, vaaleat julkisivut ja selvästi leveämmät talomassat.
- Leveät vaaleat kadut, suuret pyöreät puurivit Tuileries'ssa, laitureilla ja bulevardeilla.
- Citén tavalliset korttelit säilyvät, leveällä reunalla on puita.
- Louvre/Cour Carrée on avoin kuiva varaus ilman palatsia tai pyramidia. Orsayn pääjalanjälki on avoin. Notre-Dame ja Sainte-Chapelle eivät ole mukana; itäinen aukio on avoin.
- Tuileries'n neljä pää-/pikkuallasta ovat ohjeen kohdissa. Ensimmäiseen vedokseen tullut ylimääräinen keskiallas ei ole toimitettavassa kuvassa.
- Ei tunnistettavia ihmisiä, autoja, veneitä, lentokoneita tai tekstejä. Sillanpäissä on pieniä pylväs-/kaideornamentteja.

## Kohdat, jotka eivät pysyneet täsmälleen
1. **Citén pohjoinen joenhaara:** leveni ja siirtyi paikoin noin 10–25 pikseliä verrattuna v3-vesimaskiin. Saaren itäkärjen ja Île Saint-Louis'n kohdalla on myös paikallista rantaviivan muutosta. Tiukka ehto “vettä vain maskin valkoisella” ei toteudu.
2. **Altaiden reunat:** pienet altaat ovat hieman ohjetta suurempia. Ne pysyvät diagnostisen kuuden pikselin toleranssin sisällä; tämä ei tarkoita pikselitarkkaa vastaavuutta.
3. **Maamerkkispritet:** maamerkkirakennukset puuttuvat, mutta Sainte-Chapellen täysin vapaan jalanjäljen sekä myöhempien suurennettujen Louvre-/Notre-Dame-spritejen sopivuutta ei ole varmennettu. Tarkistus tarvitaan ennen runtime-kytkentää.
4. **Korttelien yleistys:** päämassat ovat suuret, mutta pienissä kolmionmuotoisissa tonteissa on yhä joitakin kapeita taloja.

Vesivärin likimääräinen segmentointi löysi 57 600 vesipikseliä, joista 4 724 jäi kuuden pikselin maskitoleranssin ulkopuolelle. Tämä on läpinäkyvä diagnostinen mittaus, ei tarkka semanttinen maski. Tulokset ja menetelmä ovat liitteen JSONissa.

## Vedosvalinta
1. Hylätty: liian suuri osa Citén tavallisista kortteleista katosi, ylimääräinen Tuileries-allas, Orsay jäi rakennetuksi.
2. **Valittu arvioitavaksi:** paras kokonaisuus, yllä kuvatut geometriapoikkeamat jäävät avoimiksi.
3. Hylätty: Orsayn kohdalle palasi katettu kaistale ja itäiseen maamerkkivaraukseen ylimääräinen talo. Vesimaski ei korjaantunut riittävästi.

## Tilat ja jatko
- Tämä on pyydetyn yhden kuvan **koetoimitus arvioon**, ei väite täydestä geometria-QA:sta.
- Karttasepän/PT:n vastaanotto ja arvio, omistajan tyylipäätös, pelikelpoinen geometria, runtime-integraatio ja julkaisu ovat erillisiä ja vielä avoimia.
- Koko kaupungin 1 m/px tai 0,5 m/px yleistystä **ei ole aloitettu eikä valtuutettu** tällä toimituksella. Omistaja arvioi koepalan alkuperäisen G:n rinnalla.
- Aiemmat 97 kuvaa, 35 tarkempaa palaa sekä spritet säilytetään muuttumattomina.
- Karttatiedot © OpenStreetMap contributors.

QA, lähdevarmennus, generointipromptit ja tarkistussummat: `posti/pariisi-yleistys-koepala-20261101/`. Toimituksen jälkeinen etäluku ja tavuntarkistus kirjataan paikalliseen toimituskuittiin; viestin kirjoittaminen yksin ei ole vastaanottajan hyväksyntä.

