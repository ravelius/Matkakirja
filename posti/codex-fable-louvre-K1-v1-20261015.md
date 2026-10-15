# Codex → Linnanrakentaja / Fable / PT: Louvre K1 v1 — natiivikuva ja oma maski, #285/#298

Luin #298:n koko ohjeen (`98c3dcfe4f11a7cf295c33b4a03b09ab3dc30970`, blob `2be2ca8a10c4b41f475c257f94322d07a3b8f0cc`). API- ja CLI-polku on suljettu; tilin mallipääsyä ei kokeiltu. Sisäisen kuvatoiminnon aito natiivikoko hyväksyttiin, vanha 2400 px -kokoehto ei koske tätä toimitusta. Palatsi Q1075988, museo Q19675; ei K8:aa.

**Yksi kokonaan uusi K1-kuva ja siitä erikseen jäljennetty oma maski ovat mukana. Molemmat 1536 × 1024 PNG, 3:2.** Kuvaa ei ole suurennettu, rajattu, venytetty tai osakorjattu. Kutsuja yksi, valmiita yksi. K2–K7:ää ei aloitettu.

- [K1-kuvan muuttamaton natiivi](louvre-havainne-v1/louvre-K1.png)
- [Oma palatsimaski](louvre-havainne-v1/louvre-K1-maski.png), L/8-bit, vain 0 ja 255
- [Kuva–oma maski–peitto -vertailuarkki](louvre-havainne-v1/K1-photo-own-mask-review.png)
- [Kameramääritys natiivikankaalle](louvre-havainne-v1/native-camera-specification.json)
- [QA ja havaitut erot](louvre-havainne-v1/QA-FI.md), [maskin alkuperä ja epävarmuudet](louvre-havainne-v1/mask-provenance.json)
- [Tekninen tavuntarkistus](louvre-havainne-v1/technical-photo-mask-readback.json), [koko toimituspaketti](louvre-havainne-v1/delivery-packet.json)

**Geometriaa ei ole hyväksytty.** Keskipaviljongin/kupolin siluetti sekä sivu- ja taustasiipien massat eroavat näkyvästi annetusta harmaasta massakuvasta. Piha- ja siipimittasuhteet sekä patsaan tarkka karttasijainti ovat varmentamatta. Kamera ENU [−357.08, 129.97, 180], heading 110°, pitch −23.47°, roll 0 ja VFOV 45° on pidetty toimitettavassa määrityksessä ja promptissa, mutta generoidun näkymän todellista kameraa ei ole sertifioitu. En selitä näitä rakennusmassaeroja yleisellä LiDAR-poikkeuksella; yksilöityjä mittausvirhepoikkeuksia ei vaadita.

**IoU = null / odottaa uutta natiivia LiDAR-renderiä. 95 %:n vastaanottoraja pysyy.** Linnanrakentaja: renderöi lähteen #298 mukaisesti massa ja maski suoraan kokoon 1536 × 1024 alkuperäisestä kamerasta ja 45° pystykentällä. Kuvasuhde on sama 3:2, joten vain resoluutio muuttuu. Vanhaa 2400-maskia ei ole pienennetty sitovaksi vertailuksi. K1 ei ole hyväksytty mallinnustavoite eikä mallikierroksia voi aloittaa tämän perusteella.

Oma maski on piirretty uuden kuvan näkyvistä rakennuksista ilman lähdemaskin lukemista/kopioimista maskityössä. Lähdemaski oli vain itse kuvageneroinnin geometriaviite. Naamiointityö ei sovittanut muotoa tavoitemaskiin. Piha, patsas, kasvillisuus, taustakaupunki ja teksti on rajattu rakennusmassasta. Generoiduissa takarakennuksissa on epäselviä palatsi/kaupunki-rajoja ja pienissä kattokoristeissa muutaman pikselin jäljitysepävarmuutta; nämä on kirjattu. Maski ei ole riippumaton pikselintarkka semanttinen sertifikaatti.

Lähdekuvat ja esikatselmuksen 10 tiedostoa säilyivät ennallaan. Mukana ovat lähdeinventaario, alkuperäinen tilaus, uusi #298 ja sen valtuutustulkinta sekä Commons-tekijät ja lisenssit. Muoto-/materiaaliviitteinä käytettyjen viiden kuvan roolit ja SHA:t ovat `actual-reference-roles-task298.json`-tiedostossa; kaikkia vanhoja lähdekuvia ei kopioitu uudelleen postiin. Alkuperäinen kameratiedosto on lähteenä, nykyinen natiivikameramääritys erillinen.

**Pysähdyn tähän ensimmäisen kuvan ja maskin toimitukseen.** Odotan Linnanrakentajan maskivertailua ja PT:n palautetta; ei K1-uusintaa eikä K2–K7:ää ennen uutta palautetta. Tämä toimitus on sisäinen tarkistus, ei tavoitteen hyväksyntä, 3D-mallitoimitus, R2-siirto, peli-integraatio, main-yhdistäminen tai julkaisu.
