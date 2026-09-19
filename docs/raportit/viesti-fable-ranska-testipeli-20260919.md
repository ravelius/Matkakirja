# Ranskan testipeli — iPhone 18 Pro -simulaattori, tuotanto v1949

**Tekijä:** Sonnet (lukeva/tarkistava QA-agentti, ei koodimuutoksia)
**Testattu:** https://matkakirja.app/ (tuotanto), iPhone 18 Pro -simulaattori,
iOS 27, Safari, UDID 283EDDD1-56DB-4B84-A148-5E842645957D
**Aloitusaika:** 19.9.2026 klo 10.09 (Suomen aikaa)
**Päättymisaika:** 19.9.2026 klo 10.32 (Suomen aikaa)
**Tuotantoversio:** v1949 (vahvistettu sivun lähdekoodista, `bodyEnd` sisältää `v1949`)

## Yhteenveto

Testi keskeytyi jo hyvin varhaisessa vaiheessa: **"VALITSE
ALOITUSKAUPUNKI" -nappi ei reagoi yhteenkään napautukseen
simulaattorissa**, vaikka napautuskoordinaatit on vahvistettu oikeiksi.
Tämä esti pääsyn maailmankartalle, Ranskan pallolaudalle ja kaikkeen
Ranska-sisältöön (testilistan kohdat 2–7). En siis pystynyt testaamaan
nostoja, kaupunkiliuskaa, nopanheittoa enkä linssejä lainkaan — koko
vuoro meni tämän yhden esteen jäljittämiseen ja todentamiseen.

Lisäksi tuotannon nykyinen alkuvalikoima (OSA II · Unohdettu aarre) ei
vastaa toimeksiannon kuvaamaa kulkua ("saapuminen Pariisiin,
isoisän ja pulun luennat, Ohita-nappi"): aloitusvalinnassa on 15
kaupunkia (Ateena, New York, Kairo, Rio de Janeiro, Mumbai, Peking,
Sydney, Moskova, Tokio, Singapore, Kapkaupunki, San Francisco, Tanger,
Istanbul, Lontoo) — Pariisia ei ole listalla, eikä Pariisiin-saapumisen
luentoja näkynyt. Tämä saattaa olla toimeksiannon vanhentunut oletus
(OSA I:n kulku) tai sitten Ranskaan pääsee vasta pelilaudalla
matkustamalla — kumpaakaan en ehtinyt/pystynyt varmistamaan estävän
bugin takia.

## Löydöstaulukko

| # | Mitä tehtiin | Mitä odotettiin | Mitä tapahtui | Vakavuus | Kuva |
|---|---|---|---|---|---|
| 1 | Napautettiin "VALITSE ALOITUSKAUPUNKI" -nappia useita kertoja (tap, pitkä painallus, touch_path-sekvenssi) oikeiksi vahvistetuilla koordinaateilla, sekä heti että vasta konekirjoitus-tekstianimaation päätyttyä | Nappi avaa kaupunkilistan/maailmankartan ja siirtymä etenee | Ei mitään tapahtunut yhdelläkään yrityksellä (5+ yritystä, eri tekniikoin). Pitkä painallus samassa kohdassa laukaisi iOS:n natiivin tekstinvalinta-valikon (Kopioi/Katso lisää/Käännä/Etsi), mikä todistaa että kosketus kohdistuu oikeaan pisteeseen — nappi vain ei reagoi napautukseen | **3** (estää koko jatkotestauksen: kaupunkivalinta, kartta, nostot, kaupunkiliuska, nopanheitto, linssit — mikään Ranska-sisältö ei ollut tavoitettavissa) | 01-valitse-aloituskaupunki-jumissa.png, 02-pitka-painallus-tekstivalinta.png |
| 2 | Ristiintarkistus: sama tuotanto-osoite avattuna rinnakkaisessa työpöytäselaimessa (mobiili-viewport, ei simulaattori) — napautettiin samaa nappia oikealla, `getBoundingClientRect`+`elementFromPoint`-vahvistetulla koordinaatilla | Napsautus rekisteröityy kuten mikä tahansa `<button>` | Koordinaattipohjainen napsautus ei rekisteröitynyt tässäkään — vain DOM-tason `element.click()`/`dispatchEvent` sai siirtymän etenemään. Sama ilmiö toistui myös aivan ensimmäiselle "Aloita seikkailu" -napille tässä selaimessa (vaikka simulaattorissa juuri se nappi toimi napautuksella normaalisti) | **2** (epäselvä syy — ks. huomio alla) | — (ei tallennettu erillistä kuvaa, ks. tekstiselite) |
| 3 | Tarkistettiin tuotantoversio sivulta | v1949 | Vahvistettu: `v1949` löytyy sivun rungosta | — (ei löydös) | — |

**Huomio löydökseen #1/#2 (vakavuuden arviointi):** "Aloita seikkailu"
-nappi TOIMI luotettavasti simulaattorin oikealla napautuksella (siirtyi
otsikkokorttiin). Vasta seuraava nappi, "VALITSE ALOITUSKAUPUNKI", ei
reagoinut yhteenkään napautukseen simulaattorissa. Rinnakkaisessa
selaintarkistuksessa koordinaattipohjainen klikkaus ei toiminut
kummallakaan napilla, mutta DOM-tason `.click()`-kutsu toimi
molemmissa — joten selainlöydöksen #2 taustalla saattaa olla testaustyökalun
oma rajoitus (CDP-pohjainen synteettinen hiiriklikkaus vs. oikea
kosketus) eikä pelin bugi. Simulaattorilöydös #1 sen sijaan on tehty
täysin samalla tekniikalla kuin toimiva "Aloita seikkailu" -napautus,
ja siitä huolimatta epäonnistui toistuvasti — tätä ei pidä selittää
pelkällä työkalurajoituksella ilman lisätarkistusta oikealla laitteella
tai Playwright/WebDriver-pohjaisella kosketustestillä.

Koodiviitteet Opukselle jatkotutkintaan:
- `js/ui.js` rivi ~16863–16869: `introValinta.addEventListener('click', () => this.aloitaKartalta())` — tämä on "VALITSE ALOITUSKAUPUNKI" -napin käsittelijä.
- `js/ui.js` rivi ~17180–17233: `showAloitusportti()` — "Aloita seikkailu" -portti, joka TOIMI napautuksella.
- Ero näiden kahden käsittelijän välillä (esim. `intro-valinta-piilossa`-luokan poisto, `hidden`-tilan vaihto, tai jokin ylempänä oleva capture-vaiheen kuuntelija) on todennäköisin jäljitettävä kohta.

## Toimii kuten pitää

- "Aloita seikkailu" -nappi käynnistää seikkailun ja siirtyy otsikkokorttiin (MATKAKIRJA · OSA II · UNOHDETTU AARRE) napautuksella simulaattorissa.
- Otsikkokortista napautuksella etenee Heathrow-tarinatekstiin (Lontoo, syyskuu 2026).
- Konekirjoitus-tekstianimaatio toimii ja päättyy oikein täydelliseen tekstiin.
- "Laita äänet päälle" -vihje näkyy oikein alkuruudulla.
- Tuotantoversio v1949 vahvistettu.
- Ei havaittu jumiruutuja, tyhjiä näkymiä, päällekkäisiä elementtejä tai katkenneita tekstejä niillä kahdella ruudulla, jotka ehdittiin tavoittaa.

## Ei ehditty/pystytty testaamaan (estävän bugin takia)

Kaikki seuraavat testilistan kohdat jäivät kokonaan testaamatta, koska
peliä ei saatu etenemään "VALITSE ALOITUSKAUPUNKI" -ruudun ohi:

2. Kartta Ranskassa (nostopisteiden määrä, muiden maiden piilotus, panorointi, tekstien piilotus)
3. Nostojen sisällöt (Mont Saint-Michel, Loire, Camargue, Lascaux, Chartres, Carcassonne, Millaun silta, Carnac, Bayeux, Verdun — kuvat, lähteet, kysymykset)
4. Pariisin kaupunkiliuska (Nähtävyydet-arkki, kokoruutunappi, Turistiopas, kategoriat)
5. Nopanheitto ja siirto (kohdekaupungin napautus, saatto, ennakkozoomi/siirtozoomi)
6. Linssit Ranskassa (Topografialinssi, Astronautin kamera — mukaan lukien uusi v1949 NASA-pilvikuva)

Lisäksi huomionarvoista: nykyisen tuotannon aloitusvalinta (15
kaupunkia, ei Pariisia) viittaa siihen, että OSA II:n rakenne on
maailmanlaajuinen lauta eikä suoraan Ranskaan/Pariisiin johtava
aloitus — tämä kannattaa tarkistaa toimeksiannon ja pelin nykytilan
välillä ennen seuraavaa testikierrosta.

## Ehdotus korjauserien jaosta Opukselle

- **Erä 1 (kriittinen, ensin):** Jäljitä ja korjaa syy, miksi
  "VALITSE ALOITUSKAUPUNKI" -nappi (`js/ui.js` ~16863) ei reagoi
  kosketukseen/napautukseen simulaattorissa, vaikka rakenteellisesti
  samalla tavalla toteutettu "Aloita seikkailu" -nappi (~17180) toimii.
  Suositus: toista virhe ensin Playwright/WebKit-ajurilla oikealla
  kosketustapahtumasarjalla (touchstart/touchend, ei pelkkä
  `element.click()`), jotta ero näkyy myös automaattitestissä, ja lisää
  regressiotesti joka olisi napannut tämän ennen julkaisua.
- **Erä 2 (kun erä 1 on vahvistettu korjatuksi):** Aja tämä
  Ranska-testi kokonaan uudelleen samalla ohjeistuksella — kaikki
  kohdat 2–7 ovat yhä testaamatta.
- **Erä 3 (erillinen, ei kiireellinen):** Selvitä Fablen kanssa,
  vastaako OSA II:n 15 kaupungin aloitusvalinta (ei Pariisia) yhä
  voimassa olevaa suunnitelmaa, vai onko toimeksiannon "saapuminen
  Pariisiin" -kuvaus jäänyt OSA I:n ajalta vanhentuneeksi.

## Kuvakaappaukset

- `docs/raportit/kaappaukset/ranska-testi-20260919/01-valitse-aloituskaupunki-jumissa.png` — jumiutunut ruutu useiden napautusyritysten jälkeen.
- `docs/raportit/kaappaukset/ranska-testi-20260919/02-pitka-painallus-tekstivalinta.png` — pitkä painallus samassa kohdassa laukaisee iOS:n tekstinvalintavalikon, mikä todistaa kosketuksen kohdistuvan oikein.

---

**Vuoro päättyy toteavasti.** Haara: `claude/bold-ride-vow4ki-ranska-testi`.
Löydöksiä yhteensä 2 (yksi peliä koskeva, yksi ristiintarkistuksen
sivulöydös): vakavuus 3 — 1 kpl, vakavuus 2 — 1 kpl, vakavuus 1 — 0 kpl.
Commit-SHA lisätään tähän riviin committauksen jälkeen — ks. git-loki.
