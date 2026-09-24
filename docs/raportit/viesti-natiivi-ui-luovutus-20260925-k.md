# Natiivi-UI:n luovutus 25.9.2026 (k), klo 02.5x

Jatkaa luovutusta (j) (`viesti-natiivi-ui-luovutus-20260925.md`, haara natiivi-ui-luovutus-j). Proto-git:
`/Users/Shared/Claude/proto-3d/Matkakirja-proto`. Masterin mergeää Natiiviseppä, ja build 12 kulkee juna/b12:n kautta.
Kaikki kuvat, mitat ja merge-pyynnöt ovat kansiossa `proto-3d/lokit/pariteetti-b12/`. Pariteettiajon luenta on
tiedostossa `proto-3d/lokit/pariteetti-ajo/b12-2/natiivi-ui-vastaus.md`.

## Junassa (juna/b12, Natiiviseppä mergesi)
tyyppikuvake 79a49af, juliste-url de8852b, liuska-48 397b37f (sekä .metat b030e0a), intro-palstat 83e75d5 ja
pariteetti-b12-2 730f984 (#14, #25–#28, #35 ja iPhonen pisteskaala 042f361).

## Merge-pyynnöt Natiivisepällä (odottavat)
1. **natiivi-ui/radio-sulku 85539c2**: radiopaneelin sulku 0,8 s liukuna ja **iPhonen pistekerroin**. Kerroin dpi/132
   antoi iPhone 17 Pro -simulaattorissa ×2 ja paneelin 603 × 1311; nyt lyhyt sivu ≥ 1000 px = @3x. Pelikoodari
   todensi A2FD9C9F:ssä. **Mergettävä ennen seuraavaa TF-buildia** (Fable tietää).
2. **natiivi-ui/kirjainvali 8621a9b** (sisältää aihesivun 40992cb ja junan mergen). UITK:n letter-spacing on em/100
   eikä px (Pelikoodarin mittaus). `tyokalut/kirjainvali.py` muunsi 153 arvoa muodossa webin X px → X / fonttikoko
   × 100, ja webin arvo jää kommenttiin (`/* web 2.4px */`). Työkalu ohittaa merkityt rivit, ja tarkista.sh varoittaa
   merkitsemättömistä. Aloitusjulisteessa ovat webin puhelinmitat (mk-juliste--kapea). Aihesivu #35: aikamerkki,
   johdanto, kappaleväli ja kohdeotsikko.
3. **natiivi-ui/nostot-50 35df3b4** (löydös 50, vaihe 1): ryhmitys koelipun takana (`ui aihemerkit on`), koko
   zoomikertoimella, harmaa piste, mustevektori ja kuvamerkki vain tasolla 1, Liberation Serif kursiivi, lyhennys 18
   merkkiin, 8 nimiöasentoa ja väistö levossa. Kuvapari b12s. Merge-pyyntö: merge-pyynto-natiivi-ui-b12-nostot-50.md.

## Kesken
- **Löydös 50, vaihe 1b.** Kun natiiviseppa/nostot-50 tuo `NostoKerros.ZoomKerroin` ja `Nosto.Puoli`, vaihda
  NostotKartalla.cs:n kaksi sovitinta: ZoomKerroin (nyt maan syttymishetken osuus) ja DatanKylki (nyt null).
  Siirtoseppä vei ankkurin ja puolen skeemaan 1.39 (PR #3133). Natiiviseppä tekee portit (osa B).
- **Löydös 50, vaihe 2.** Kysytty Natiivisepältä ja Karttasepältä: Nimikerros.cs:328–332 varaa nostolaatikot ennen
  nimiä, mutta webissä nimet ovat kiinteitä. Pisteen hehku puuttuu.
- **Saapumiskamera** on webiä lähempänä. Kysymys on Natiivisepällä ja Pelikoodarilla (kamerareitti 6c2378e), ja
  webin mitat ovat mittatiedoston kohdassa I (72,8 px/°lat iPhonella).
- **Löydös 51 (maalehden tahmea vieritys)** on juurisyyn jäljillä. Jaettu **iPad Pro 11 503000D1 on vuorollasi**
  (Laitetestaajalle ilmoitettu; vapauta viestillä, kun lopetat).
  - Haara natiivi-ui/vieritys-51 703dd56: Kosketusvieritys.cs (oma 1:1-veto ja iOS-inertia 0,998/ms, `ui lehti
    vieritys oma|unity|loki`) ja lohkojen flex-shrink 0. Molemmat ovat todentamatta.
  - **Löytö:** vierityksen aikana sisältösäiliön korkeus heiluu 1496 ↔ 1063 (= näkymä + 18 täyte). Silloin
    ScrollView.UpdateScrollers laskee ylärajan 451 → 18 ja nollaa vierityksen. Tämä selittää todennäköisesti myös
    omistajan tahmeuden UITK:n omassa vierityksessä. flex-shrink 0 ei auttanut.
  - Viimeisin käännös (bji3lfcvn → 503000D1) kirjaa jokaisen lohkon korkeuden sillä hetkellä, kun raja putoaa.
    Aja se: `mittaa51`-apu oli scratchpadissa, joten tee uusi. Käynnistä `simctl launch --stdout=…`, sitten
    `ui lehti vieritys loki` ja `ui lehti marseille 1`, ja vedä 120 pt:n hidas veto (mcp touch_path).
  - Katso lokista `MATKAKIRJA vieritys arvo … lohkot [...]`, mikä lohko tyhjenee. Epäillyt ovat Kosketusnapin
    osuma-ala (PaivitaAla GeometryChanged), LehtiKainalon Virtaa/Lado (tyhjentää ja täyttää palstat) ja Porrasta.
  - Mittaa Safaria vasten: sama 120 pt:n heitto → 653 pt. UITK: 120 pt:n hidas veto → 258 pt (ei 1:1).
    Hidastuvuus ei vaikuttanut.
  - Kun juurisyy on korjattu, arvioi, tarvitaanko Kosketusvieritystä ollenkaan. Diagnoosiloki pois ennen
    merge-pyyntöä.
- Pariteetin avoimet: #8 (sisällyksen Etusivu-pienoiskuva), #29 (pulun chat 60 px), #18 (valikon leveys 240 vs 311)
  ja #1 (aloitus). #11/#40/#31 ovat Linssisepällä.
- Linssiseppä korjaa radion viivaimen vedon omassa haarassaan (lupa annettu, eri kohdat kuin radio-sulku).

## Worktreet (3)
- `/Users/Shared/Claude/wt/proto-natiivi-ui-pariteetti` → natiivi-ui/kirjainvali
- `/Users/Shared/Claude/wt/proto-natiivi-ui-nostot` → natiivi-ui/nostot-50
- `/Users/Shared/Claude/wt/proto-natiivi-ui-radio` → natiivi-ui/vieritys-51 (radio-sulku-haara on samasta worktreestä
  luotu, commitoitu)

## Opit
- **UITK letter-spacing = em/100** (TextCore characterSpacing). Käytä tyokalut/kirjainvali.py:tä ja merkitse `/* web Xpx */`.
- **TextCoren `<line-height=X%>`** on fontin oman rivin osuus. Käytä em-yksikköä. `<line-height>` ei lisää rivivälin
  puolikasta ensimmäisen rivin yläpuolelle eikä viimeisen alapuolelle, joten kappaleväliin lisätään (riviväli −
  luonnollinen rivi).
- **Tint kertoo värin:** musta alfa-tekstuuri ei sävyty. Käytä valkoista (Kuviot.ReunaHoyhen).
- **Pistekerroin:** iPhonella lyhyestä sivusta, iPadilla dpi/132.
- **kuvaa-b9.sh:** ui-komennot muodossa `ui:ui <komento>`, peli-komennot muodossa `peli:<komento>`.
- **Simulaattorin kuvakaappaus kestää kuormassa ~10 s.** Tallenna nopeat animaatiot `simctl io recordVideo` + ffmpeg.
- **Käännöspalvelu voi katketa toisen session pkill-komentoon.** Aja uudelleen. Juna voi tuoda merge-konflikteja:
  yhdistä juna/b12 omaan haaraan ja aja kirjainvali.py.
- **Kosketuksen mittaus:** mcp touch_path ja kuvanvertailu (PIL, siirtymähaku). Tarkista, ettei sivun loppu rajaa
  tulosta (504 pt oli ensimmäisessä mittauksessa sivun loppu).
